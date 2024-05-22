using Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services;
using Services;
using System;
using System.Threading.Tasks;

namespace Mike.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AuthenticationService _authenticationService;
        private readonly LoggingService _loggingService;
        
        public UserController(UserService userService, AuthenticationService authenticationService, LoggingService loggingService)
        {
            _userService = userService;
            _authenticationService = authenticationService;
            _loggingService = loggingService;
            
        }

        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            try
            {
                var response = await _authenticationService.Login(request);
                await _loggingService.LogInformation("User logged in", "Login", request.Email);
                return Ok(response);
            }
            catch (Exception ex)
            {
                string exceptionMessage = ex != null ? ex.ToString() : "No exception provided";
                await _loggingService.LogError($"Error registering user: {ex.Message}", exceptionMessage, "Register", request.Email);
                return StatusCode(500, $"Error logging in: {ex.Message}");
            }
        }

        [Authorize(Roles = "admin")]
        /*        [AllowAnonymous]*/
        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            try
            {
                var response = await _authenticationService.Register(request);
                await _loggingService.LogInformation("User registered", "Register", request.Email);
                return Ok(response);
            }
            catch (Exception ex)
            {
                string exceptionMessage = ex != null ? ex.ToString() : "No exception provided";
                await _loggingService.LogError($"Error registering user: {ex.Message}", exceptionMessage, "Register", User.Identity.Name);
                return StatusCode(500, $"Error registering user: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("edit")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> EditAccount([FromBody] EditAccountDto request)
        {
            try
            {
                var response = await _userService.EditUserAccount(request);
                await _loggingService.LogInformation("User account edited", "EditAccount",request.Email );
                return Ok(response);
            }
            catch (Exception ex)
            {
                string exceptionMessage = ex != null ? ex.ToString() : "No exception provided";
                await _loggingService.LogError($"Error registering user: {ex.Message}", exceptionMessage, "Register", User.Identity.Name);
                return StatusCode(500, $"Error editing user account: {ex.Message}");
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("DeleteAccount/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAccount(string email)
        {
            try
            {
                var response = await _userService.DeleteUser(email);
                await _loggingService.LogInformation("User account deleted", "DeleteAccount",email );
                return Ok(response);
            }
            catch (Exception ex)
            {
                string exceptionMessage = ex != null ? ex.ToString() : "No exception provided";
                await _loggingService.LogError($"Error registering user: {ex.Message}", exceptionMessage, "Register", User.Identity.Name);
                return StatusCode(500, $"Error deleting user account: {ex.Message}");
            }
        }
    }
}
