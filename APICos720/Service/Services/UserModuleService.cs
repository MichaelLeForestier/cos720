using System;
using System.Threading.Tasks;
using Domain.DTO;
using Domain.Entities;
using Repository.Repositories;

namespace Services
{
    public class UserModuleService 
    {
        private readonly IRepository<UserModule, (string UserId, int ModuleId)> _userModuleRepository;

        public UserModuleService(IRepository<UserModule, (string UserId, int ModuleId)> userModuleRepository)
        {
            _userModuleRepository = userModuleRepository;
        }

        public async Task<bool> RegisterUserModuleAsync(UserModuleDto userModuleDto)
        {
            try
            {

                var existingRecord = await _userModuleRepository.Find(u => u.UserId == userModuleDto.UserId && u.ModuleId == userModuleDto.ModuleId);

                if (existingRecord.Any())
                {
                    return false; // Record already exists
                }

                var newUserModule = new UserModule
                {
                    UserId = userModuleDto.UserId,
                    ModuleId = userModuleDto.ModuleId,
                    RegistrationDate = DateTime.UtcNow
                };

                await _userModuleRepository.Add(newUserModule);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to register user for module: {ex.Message}");
            }
        }


        public async Task<bool> DeregisterUserModuleAsync(UserModuleDto userModuleDto)
        {
            try
            {
                var existingRecord = await _userModuleRepository.Find(u => u.UserId == userModuleDto.UserId && u.ModuleId == userModuleDto.ModuleId);

                if (!existingRecord.Any())
                {
                    return false; // Record does not exist, nothing to delete
                }

                // Assuming you want to delete all existing records that match the condition
                foreach (var record in existingRecord)
                {
                    await _userModuleRepository.Delete(record);
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to deregister user from module: {ex.Message}");
            }
        }
        public async Task<IEnumerable<UserModuleDto>> GetUserModulesAsync(string userId)
        {
            try
            {
                var userModules = await _userModuleRepository.Find(u => u.UserId == userId);
                return userModules.Select(u => new UserModuleDto
                {
                    UserId = u.UserId,
                    ModuleId = u.ModuleId,
                    RegistrationDate = u.RegistrationDate
                });
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to fetch user modules: {ex.Message}");
            }
        }
    }

    public interface IUserModuleService
    {
        Task<bool> RegisterUserModuleAsync(UserModuleDto userModuleDto);
        Task<bool> DeregisterUserModuleAsync(UserModuleDto userModuleDto);
    }
}
