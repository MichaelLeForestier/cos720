using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Domain.DTO
{
    public class UserModuleDto
    {
        public int Id { get; set; }
        public  string UserId { get; set; }
        public int ModuleId { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
