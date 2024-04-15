using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public interface IRepository<TEntity, TType> where TEntity : class
    {
        // Retrieve a single entity by its ID
        Task<TEntity> GetById(TType id);

        // Retrieve all entities
        Task<IEnumerable<TEntity>> GetAllAsync();

        // Retrieve entities based on a predicate
        Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate);

        // Create a new entity
        Task Add(TEntity entity);

        // Create multiple entities
        Task AddRange(IEnumerable<TEntity> entities);

        // Update an existing entity
        void Update(TEntity entity);

        // Update multiple existing entities
        void UpdateRange(IEnumerable<TEntity> entities);

        // Delete an entity
        Task Delete(TEntity entity);

        // Delete multiple entities
        void DeleteRange(IEnumerable<TEntity> entities);

        // Save changes asynchronously
        Task<int> SaveChangesAsync();
    }
}
