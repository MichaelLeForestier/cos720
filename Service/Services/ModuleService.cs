using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.DTO;
using Domain.Entities;
using Repository.Repositories;

namespace Services
{
    public class ModuleService 
    {
        private readonly IRepository<Module, int> _moduleRepository;

        public ModuleService(IRepository<Module, int> moduleRepository)
        {
            _moduleRepository = moduleRepository;
        }

        public async Task<IEnumerable<ModuleDto>> GetAllModules()
        {
            var modules = await _moduleRepository.GetAllAsync();

            var moduleDtos = modules.Select(module => new ModuleDto
            {
                Id = module.Id,
                Code = module.Code,
                Name = module.Name,
                Description = module.Description,
                CreatedAt = module.CreatedAt
            });

            return moduleDtos;
        }

        public async Task<ModuleDto> GetModuleById(int moduleId)
        {
            var module = await _moduleRepository.GetById(moduleId);

            if (module == null)
            {
                return null;
            }

            var moduleDto = new ModuleDto
            {
                Id = module.Id,
                Code = module.Code,
                Name = module.Name,
                Description = module.Description,
                CreatedAt = module.CreatedAt
            };

            return moduleDto;
        }

        public async Task<string> AddModule(ModuleDto moduleDto)
        {
            try
            {
                var module = new Module
                {
                    Code = moduleDto.Code,
                    Name = moduleDto.Name,
                    Description = moduleDto.Description,
                    CreatedAt = DateTime.Now
                };

                await _moduleRepository.Add(module);
                return "Module added successfully";
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to add module: {ex.Message}");
            }
        }

        public async Task<IEnumerable<ModuleDto>> SearchModules(string name, string code)
        {
            // Construct predicate for searching modules based on provided name and code
            Expression<Func<Module, bool>> predicate = module =>
                (string.IsNullOrEmpty(name) || module.Name.Contains(name)) &&
                (string.IsNullOrEmpty(code) || module.Code.Contains(code));

            // Use repository Find method with the constructed predicate
            var modules = await _moduleRepository.Find(predicate);

            // Map found modules to ModuleDto
            var moduleDtos = modules.Select(module => new ModuleDto
            {
                Id = module.Id,
                Code = module.Code,
                Name = module.Name,
                Description = module.Description,
                CreatedAt = module.CreatedAt
            });

            return moduleDtos;
        }
        public async Task<string> DeleteModule(int moduleId)
        {
            try
            {
                var module = await _moduleRepository.GetById(moduleId);
                if (module == null)
                {
                    throw new Exception("Module not found");
                }

                await _moduleRepository.Delete(module);
                return "Module deleted successfully";
            }
            catch (Exception ex)
            {
                throw new Exception($"Failed to delete module: {ex.Message}");
            }
        }

    }

    public interface IModuleService
    {
        Task<IEnumerable<ModuleDto>> GetAllModules();
        Task<ModuleDto> GetModuleById(int moduleId);
        Task AddModule(ModuleDto moduleDto);
        Task<IEnumerable<ModuleDto>> SearchModules(string name, string code);
        Task<string> DeleteModule(int moduleId);
    }
}
