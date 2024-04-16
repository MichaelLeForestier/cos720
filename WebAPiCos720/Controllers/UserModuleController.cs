using System;
using System.Threading.Tasks;
using Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserModuleController : ControllerBase
    {
        private readonly UserModuleService _userModuleService;
        private readonly LoggingService _loggingService;

        public UserModuleController(UserModuleService userModuleService, LoggingService loggingService)
        {
            _userModuleService = userModuleService;
            _loggingService = loggingService;
        }

        [HttpPost("ModuleRegistration")]
        [Authorize(Roles = "student")]
        public async Task<IActionResult> RegisterUserModule(UserModuleDto userModuleDto)
        {
            try
            {
                var result = await _userModuleService.RegisterUserModuleAsync(userModuleDto);
                if (result)
                {
                    await _loggingService.LogInformation($"User registered for module: {userModuleDto.ModuleId}", "RegisterUserModule", GetUserId());
                    return Ok("User registered for module successfully");
                }
                else
                {
                    return BadRequest("User is already registered for this module");
                }
            }
            catch (Exception ex)
            {
                await _loggingService.LogError($"Error registering user for module: {ex.Message}", ex.ToString(), "RegisterUserModule", GetUserId());
                return StatusCode(500, $"An error occurred while registering user for module: {ex.Message}");
            }
        }

        [HttpPost("ModuleDeregistration")]
        [Authorize(Roles = "student")]
        public async Task<IActionResult> DeregisterUserModule(UserModuleDto userModuleDto)
        {
            try
            {
                var result = await _userModuleService.DeregisterUserModuleAsync(userModuleDto);
                if (result)
                {
                    await _loggingService.LogInformation($"User deregistered from module: {userModuleDto.ModuleId}", "DeregisterUserModule", GetUserId());
                    return Ok("User deregistered from module successfully");
                }
                else
                {
                    return BadRequest("User is not registered for this module");
                }
            }
            catch (Exception ex)
            {
                await _loggingService.LogError($"Error deregistering user from module: {ex.Message}", ex.ToString(), "DeregisterUserModule", GetUserId());
                return StatusCode(500, $"An error occurred while deregistering user from module: {ex.Message}");
            }
        }

        [HttpGet("UserModules/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetUserModules(string userId)
        {
            try
            {
                var userModules = await _userModuleService.GetUserModulesAsync(userId);
                return Ok(userModules);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while fetching user modules: {ex.Message}");
            }
        }

        private string GetUserId()
        {
            // Get the user ID from the current request
            return User.Identity.Name;
        }
    }
}
