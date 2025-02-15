using Microsoft.EntityFrameworkCore;
using UserManagementApi.Models;

namespace UserManagementApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public"); // ✅ Ensures EF Core looks in the public schema
            modelBuilder.Entity<User>().ToTable("users"); // ✅ Explicitly set lowercase table name
            base.OnModelCreating(modelBuilder);
        }
    }
}
