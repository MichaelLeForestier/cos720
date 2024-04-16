using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Repository.Repositories;

namespace Services
{
    public class LoggingService
    {
        private readonly IRepository<LogEntry, int> _logRepository;
      

        public LoggingService(IRepository<LogEntry, int> logRepository)
        {
            _logRepository = logRepository;
               
        }
        

        
        public async Task LogInformation(string message, string action, string userEmail)
        {
            try
            {
                
                var log = new LogEntry
                {
                    Message = message,
                    Action = action,
                    UserId = userEmail,
                    Timestamp = DateTime.Now
                };

                await _logRepository.Add(log);
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to log information: {ex.Message}");
            }
        }

        public async Task LogError(string message, string ex, string action, string userId)
        {
            try
            {
                var log = new LogEntry
                {
                    Message = message,
                    Exception = ex.ToString(),
                    Action = action,
                    UserId = userId,
                    Timestamp = DateTime.Now
                };

                await _logRepository.Add(log);
            }
            catch (Exception innerEx)
            {
                throw new Exception($"Failed to log error: {innerEx.Message}");
            }
        }
    }

    public interface ILoggingService
    {
        Task LogInformation(string message, string action, string userId);
        Task LogError(string message, string ex, string action, string userId);
    }
}
