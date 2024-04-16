using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.Data.SqlClient;

namespace Mike.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DatabaseTestController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<DatabaseTestController> _logger;

        public DatabaseTestController(IConfiguration configuration, ILogger<DatabaseTestController> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        [HttpGet("TestConnection")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(string))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult TestDatabaseConnection()
        {
            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            try
            {
                using SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                // Perform a simple query or operation to check database connectivity
                // For example: check the count of records in a table
                SqlCommand command = new SqlCommand("SELECT COUNT(*) FROM users", connection);
                long count = (long)command.ExecuteScalar();
                connection.Close();
                return Ok($"Database Connection Successful. Record count: {count}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error connecting to the database.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Error connecting to the database.");
            }
        }
    }
}
