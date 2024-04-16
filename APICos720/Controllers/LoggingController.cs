using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using Services;

namespace Mike.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoggingController : ControllerBase
    {
        private readonly ILoggingService _loggingService;

        public LoggingController(ILoggingService loggingService)
        {
            _loggingService = loggingService;
        }

        [HttpPost("info")]
        public async Task<IActionResult> LogInfo([FromBody] LogEntry log)
        {
            try
            {
                _loggingService.LogInformation(log.Message,log.Action,log.UserId);
                return Ok("Info logged successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error logging info: {ex.Message}");
            }
        }

        [HttpPost("error")]
        public async Task<IActionResult> LogError([FromBody] LogEntry log)
        {
            try
            {
                string exceptionMessage = log.Exception != null ? log.Exception.ToString() : "No exception provided";
                _loggingService.LogError(log.Message, exceptionMessage, log.Action,log.UserId);
                return Ok("Error logged successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error logging error: {ex.Message}");
            }
        }
    }
}
