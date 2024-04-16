using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Service.Services;
using Domain.DTO;
using Services;
using System;
using System.Threading.Tasks;

namespace Mike.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ModuleController : ControllerBase
    {
        private readonly ModuleService _moduleService;
        private readonly LoggingService _loggingService;

        public ModuleController(ModuleService moduleService, LoggingService loggingService)
        {
            _moduleService = moduleService;
            _loggingService = loggingService;
        }

        [HttpPost("AddModule")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddModule(ModuleDto moduleDTO)
        {
            try
            {
                var response = await _moduleService.AddModule(moduleDTO);
                // Log the action
                await _loggingService.LogInformation($"Module added: {moduleDTO.Name}, Code: {moduleDTO.Code}, Description: {moduleDTO.Description}", "AddModule", GetUserId());
                return Ok(response);
            }
            catch (Exception ex)
            {
                // Log the error
                string exceptionMessage = ex != null ? ex.ToString() : "No exception provided";
                await _loggingService.LogError($"Failed to add module: {ex.Message}", exceptionMessage, "AddModule", GetUserId());
                return BadRequest($"Failed to add module: {ex.Message}");
            }
        }

        /*[AllowAnonymous]*/
        [Authorize(Roles ="admin,student")]
        [HttpGet("SearchModule")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SearchModules(string? name = null, string? code = null)
        {
            try
            {
                var result = await _moduleService.SearchModules(name, code);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to search modules: {ex.Message}");
            }
        }

        [HttpDelete("DeleteModule/{moduleId}")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> DeleteModule(int moduleId)
        {
            try
            {
                await _moduleService.DeleteModule(moduleId);
                // Log the action
                await _loggingService.LogInformation($"Module deleted: Id: {moduleId}", "DeleteModule", GetUserId());
                return Ok("Module deleted successfully");
            }
            catch (Exception ex)
            {
                // Log the error
                string exceptionMessage = ex != null ? ex.ToString() : "No exception provided";
                await _loggingService.LogError($"Failed to delete module: {ex.Message}", exceptionMessage, "DeleteModule", GetUserId());
                return BadRequest($"Failed to delete module: {ex.Message}");
            }
        }

        private string GetUserId()
        {
            // Get the user ID from the current request
            return User.Identity.Name;
        }
    }
}
