using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.DTO;
using Domain.Entities;

namespace Service.Services
{
    public class UserService
    {
        private readonly UserManager<MikeUser> _userManager;

        public UserService(UserManager<MikeUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<string> EditUserAccount(EditAccountDto request)
        {
            var user = await _userManager.FindByNameAsync(request.Email);
            var editorUser = await _userManager.FindByNameAsync(request.editorEmail);

            if (user == null)
            {
                throw new ArgumentException($"User with email {request.Email} not found.");
            }

            var isAdmin = false;
            // Check if the current user is an admin
            if ( editorUser.Role == "admin")
            {
                isAdmin = true;
            }

            if (isAdmin)
            {
                // Directly set the hashed password without requiring the current password
                user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, request.NewPassword);
                var iresult = await _userManager.UpdateAsync(user);

                if (!iresult.Succeeded)
                {
                    throw new ArgumentException($"Unable to update password for user {request.Email}. Errors: {string.Join(", ", iresult.Errors)}");
                }
            }
            else
            {
                // For non-admin users, require the current password to change the password
                var iresult = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);

                if (!iresult.Succeeded)
                {
                    throw new ArgumentException($"Unable to update password for user {request.Email}. Errors: {string.Join(", ", iresult.Errors)}");
                }
            }

    

            return "Password updated successfully";
        }

        public async Task<bool> DeleteUser(string email)
        {
            var user = await _userManager.FindByNameAsync(email);

            if (user == null)
            {
                throw new ArgumentException($"User with email {email} not found.");
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                throw new ArgumentException($"Unable to delete user {email}. Errors: {string.Join(", ", result.Errors)}");
            }

            return true; // User deleted successfully
        }
    }
}
