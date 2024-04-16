using Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Repository.Repositories
{
    public class Repository<TEntity, TType> : IRepository<TEntity, TType> where TEntity : class
    {
        private readonly Context.MikeDbContext _context;
        private readonly DbSet<TEntity> _dbSet;

        public Repository(Context.MikeDbContext context)
        {
            _context = context;
            _dbSet = context.Set<TEntity>();
        }

        public async Task<TEntity> GetById(TType id)
        {
            return await _dbSet.FindAsync(id);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _dbSet.ToList();
        }

        public async Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }

        public async Task Add(TEntity entity)
        {
            _dbSet.Add(entity);
            await SaveChangesAsync();
        }


        public Task AddRange(IEnumerable<TEntity> entities)
        {
            _dbSet.AddRange(entities);
            return Task.CompletedTask;
        }


        public void Update(TEntity entity)
        {
            _dbSet.Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                _dbSet.Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
            }
        }

        public async Task Delete(TEntity entity)
        {
            _dbSet.Remove(entity);
            await SaveChangesAsync();
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            _dbSet.RemoveRange(entities);
        }
        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

    }
}
