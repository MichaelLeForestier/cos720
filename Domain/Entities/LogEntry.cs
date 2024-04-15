using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Domain.Entities
{
    public class LogEntry
    {
        public int Id { get; set; }
        public DateTimeOffset Timestamp { get; set; }
        public string LogLevel { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }
        public string Action { get; set; }
        public string UserId { get; set; }
    }
}
