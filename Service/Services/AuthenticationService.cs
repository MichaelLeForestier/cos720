using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Domain.DTO;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Services
{
    public class AuthenticationService
    {
        private readonly UserManager<MikeUser> _userManager;
        private readonly SignInManager<MikeUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly TokenService _tokenService;

        public AuthenticationService(UserManager<MikeUser> userManager, SignInManager<MikeUser> signInManager, IConfiguration configuration,
        TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _tokenService = tokenService;
        }

        public async Task<string> Register(RegisterDto request)
        {
            var existingUser = await _userManager.FindByEmailAsync(request.Email);

            if (existingUser != null)
            {
                throw new ArgumentException($"User with email {request.Email} already exists.");
            }

            var user = new MikeUser
            {
                UserName = request.Email,
                Email = request.Email,
                Role = request.Role?.ToLower() == "admin" ? "admin" : "student", // Default to "student" if role is not specified or invalid
                StudentNumber = request.StudentNumber,
                CreatedAt = DateTime.UtcNow
                // Add other properties as needed
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new ArgumentException($"Unable to register user {request.Email} errors: {GetErrorsText(result.Errors)}");
            }

            // Assign the user to the role
            if (!string.IsNullOrWhiteSpace(user.Role))
            {
                await _userManager.AddToRoleAsync(user, user.Role);
            }

            return "User registered successfully"; // Return a success message
        }

        public async Task<LoginResponseDto> Login(LoginDto request)
        {
            var user = await _userManager.FindByNameAsync(request.Email);

            if (user is null)
            {
                user = await _userManager.FindByEmailAsync(request.Email);
            }

            if (user != null && await _userManager.CheckPasswordAsync(user, request.Password))
            {
                var roles = await _userManager.GetRolesAsync(user);
                var token = _tokenService.GenerateToken(user, roles);
                var role = user.Role;
                var Id = user.Id;
                return new LoginResponseDto
                {
                    Token = token ,
                    Role = role,
                    Id = Id
                };
            }
             throw new ArgumentException($"Unable to authenticate user {request.Email}");


        }

        private string GenerateToken(string email)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, email) // Assuming email is used as the user identifier
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private string GetErrorsText(IEnumerable<IdentityError> errors)
        {
            return string.Join(", ", errors.Select(error => error.Description).ToArray());
        }
    }
}
