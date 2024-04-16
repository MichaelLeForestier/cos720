using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("users")] // Map to the 'users' table in the database
    public class MikeUser : IdentityUser
    {
        [Key]
        [Column("id")]
        public override string Id { get; set; } // Override Id property to match column name and type

        [Required]
        [MaxLength(50)]
        [Column("username")]
        public override string UserName { get; set; } // Override UserName property to match column name and type

        [Required]
        [MaxLength(100)]
        [Column("email")]
        public override string Email { get; set; } // Override Email property to match column name and type

        [Required]
        [Column("password_hash")]
        public override string PasswordHash { get; set; } // Override PasswordHash property to match column name and type

        [Required]
        [MaxLength(20)]
        [Column("role")]
        public string Role { get; set; } // Custom role property

       

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; } // Custom CreatedAt property
        public string StudentNumber { get; set; }

        // Other custom properties if needed
    }
}
