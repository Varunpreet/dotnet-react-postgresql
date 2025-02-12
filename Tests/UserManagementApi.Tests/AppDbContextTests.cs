using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using UserManagementApi.Data;
using UserManagementApi.Models;
using Xunit;

public class AppDbContextTests
{
    private AppDbContext GetDatabaseContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task AddUser_Should_AddUserToDatabase()
    {
        // Arrange
        var context = GetDatabaseContext();
        var user = new User { Name = "John Doe", Email = "john@example.com", Age = 30 };

        // Act
        context.Users.Add(user);
        await context.SaveChangesAsync();

        // Assert
        var storedUser = context.Users.FirstOrDefault(u => u.Email == "john@example.com");
        Assert.NotNull(storedUser);
        Assert.Equal("John Doe", storedUser.Name);
        Assert.Equal(30, storedUser.Age);
    }

    [Fact]
    public async Task GetUsers_Should_ReturnAllUsers()
    {
        // Arrange
        var context = GetDatabaseContext();
        context.Users.Add(new User { Name = "Alice", Email = "alice@example.com", Age = 25 });
        context.Users.Add(new User { Name = "Bob", Email = "bob@example.com", Age = 35 });
        await context.SaveChangesAsync();

        // Act
        var users = await context.Users.ToListAsync();

        // Assert
        Assert.Equal(2, users.Count);
    }
}
