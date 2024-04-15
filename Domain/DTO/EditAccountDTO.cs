using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.DTO
{
    public class EditAccountDto
    {
        public string editorEmail { get; set; }
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at most {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
        public string CurrentPassword { get; set; }
    }
}
