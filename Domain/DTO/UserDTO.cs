using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Domain.DTO
{
    public class UserDto
    {
        public  string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int StudentNumber { get; set; }
        public DateTime CreatedAt { get; set; }
    }


}