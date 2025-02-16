using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using UserManagementApi.Controllers;
using UserManagementApi.Data;
using UserManagementApi.Models;
using UserManagementApi.Services;
using Xunit;

namespace UserManagementApi.Tests
{
    public class UsersControllerTests
    {
        private AppDbContext CreateTestDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        private IConfiguration BuildTestConfiguration()
        {
            var testSettings = new Dictionary<string, string>
            {
                {"JwtSettings:Secret", "aXo9tM7pQw3yLdVgXkZmB2R5sNtF6YHp"},
                {"JwtSettings:Issuer", "testIssuer"},
                {"JwtSettings:Audience", "testAudience"},
                {"JwtSettings:ExpirationMinutes", "60"}
            };

            return new ConfigurationBuilder()
                .AddInMemoryCollection(testSettings)
                .Build();
        }

        [Fact]
        public async Task TestGetUsers_ReturnsAllUsers()
        {
            using var dbContext = CreateTestDbContext();
            var user1 = new User { Id = Guid.NewGuid(), Name = "User One", Email = "user1@test.com", Age = 30, PasswordHash = "hash1" };
            var user2 = new User { Id = Guid.NewGuid(), Name = "User Two", Email = "user2@test.com", Age = 25, PasswordHash = "hash2" };

            dbContext.Users.AddRange(user1, user2);
            await dbContext.SaveChangesAsync();
            var config = BuildTestConfiguration();
            var authService = new AuthService(dbContext, config);
            var usersController = new UsersController(dbContext, authService);
            var result = await usersController.GetUsers();
            var actionResult = Assert.IsAssignableFrom<ActionResult<IEnumerable<User>>>(result);
            var usersList = actionResult.Value;
            Assert.Equal(2, usersList.Count());
        }
    }
}
