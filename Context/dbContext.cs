using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace Context
{
    public class MikeDbContext : IdentityDbContext<MikeUser, IdentityRole, string>
    {
        public MikeDbContext(DbContextOptions<MikeDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Specify custom table names
            modelBuilder.Entity<MikeUser>().ToTable("Users");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
        }

        // Define DbSet properties for your entities
        public DbSet<Module> Modules { get; set; }
        public DbSet<UserModule> UserModules { get; set; }
        public DbSet<LogEntry> Logs { get; set; }
    }
}
