using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.DTO
{
    public class RegisterDto : IValidatableObject
    {
        [Required(ErrorMessage = "The Name field is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Surname field is required.")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

        [ConditionalRequired("student", ErrorMessage = "The Student Number field is required.")]
        public string StudentNumber { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at most {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "The Role field is required.")]
        public string Role { get; set; } // 'student' or 'admin'

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            // Custom validation logic can be implemented here if needed
            yield return ValidationResult.Success;
        }
    }

    public class ConditionalRequiredAttribute : ValidationAttribute
    {
        private readonly string _role;

        public ConditionalRequiredAttribute(string role)
        {
            _role = role;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var instance = validationContext.ObjectInstance as RegisterDto;
            if (instance != null && instance.Role == _role)
            {
                if (string.IsNullOrEmpty((string)value))
                {
                    return new ValidationResult(ErrorMessage);
                }
            }
            return ValidationResult.Success;
        }
    }
}
