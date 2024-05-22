using Domain.DTO;
using Domain.Entities;
using Repository.Repositories;
using System.Linq.Expressions;

public class LoggingService 
{
    private readonly IRepository<LogEntry, int> _logRepository;

    public LoggingService(IRepository<LogEntry, int> logRepository)
    {
        _logRepository = logRepository;
    }

    public async Task LogInformation(string message, string action, string userId)
    {
        try
        {
            var log = new LogEntry
            {
                Message = message,
                Action = action,
                UserId = userId,
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
                Exception = ex,
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
    public async Task<IEnumerable<LogEntryDTO>> GetAllLogs()
    {
        var logs = await _logRepository.GetAllAsync();

        var logDtos = logs.Select(log => new LogEntryDTO
        {
            Id = log.Id,
            Timestamp = log.Timestamp,
            Message = log.Message ,
            Exception = log.Exception,
            Action = log.Action ,
            UserId = log.UserId 
        });

        return logDtos;
    }
    public async Task<IEnumerable<LogEntryDTO>> SearchLogs(string action, string UserId)
    {
        try
        {
            Expression<Func<LogEntry, bool>> predicate = log =>
                (string.IsNullOrEmpty(action) || log.Action.Contains(action)) &&
                (string.IsNullOrEmpty(UserId) || log.UserId.Contains(UserId));

            var logs = await _logRepository.Find(predicate);

            var logDtos = logs.Select(log => new LogEntryDTO
            {
                Id = log.Id,
                Timestamp = log.Timestamp,
                Message = log.Message ,
                Exception = log.Exception,
                Action = log.Action ,
                UserId = log.UserId 
            });

            return logDtos;
        }
        catch (Exception ex)
        {
            // Log the exception details for debugging
            Console.WriteLine($"Error occurred while searching logs: {ex.Message}");
            throw new Exception($"Failed to search logs: {ex.Message}");
        }
    }
    public interface ILoggingService
    {
        Task LogInformation(string message, string action, string userId);
        Task LogError(string message, string ex, string action, string userId);
        Task<IEnumerable<LogEntryDTO>> GetAllModules();
        Task<IEnumerable<LogEntryDTO>> SearchLogs(string action, string UserId);
    }
}
