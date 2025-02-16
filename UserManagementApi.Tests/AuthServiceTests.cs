using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using UserManagementApi.Data;
using UserManagementApi.Models;
using UserManagementApi.Services;
using Xunit;

namespace UserManagementApi.Tests
{
    public class AuthServiceTests
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
        public async Task TestRegisterUser_Success()
        {
            using var dbContext = CreateTestDbContext();
            var config = BuildTestConfiguration();
            var authService = new AuthService(dbContext, config);
            string testName = "Junior Tester";
            string testEmail = "junior@test.com";
            int testAge = 25;
            string testPassword = "mypassword";
            var newUser = await authService.RegisterUser(testName, testEmail, testAge, testPassword);
            Assert.NotNull(newUser);
            Assert.Equal(testEmail, newUser.Email);
            Assert.NotEqual(testPassword, newUser.PasswordHash);
        }

        [Fact]
        public async Task TestRegisterUser_Failure_UserExists()
        {
            using var dbContext = CreateTestDbContext();
            var config = BuildTestConfiguration();
            var authService = new AuthService(dbContext, config);
            string testName = "Junior Tester";
            string testEmail = "duplicate@test.com";
            int testAge = 30;
            string testPassword = "securepwd";
            var firstUser = await authService.RegisterUser(testName, testEmail, testAge, testPassword);
            var duplicateUser = await authService.RegisterUser("Another Tester", testEmail, 35, "anotherpwd");
            Assert.NotNull(firstUser);
            Assert.Null(duplicateUser);
        }

        [Fact]
        public async Task TestAuthenticateUser_Success_ReturnsToken()
        {
            using var dbContext = CreateTestDbContext();
            var config = BuildTestConfiguration();
            var authService = new AuthService(dbContext, config);
            string testName = "Valid Tester";
            string testEmail = "valid@test.com";
            int testAge = 28;
            string testPassword = "validpwd";
            var registeredUser = await authService.RegisterUser(testName, testEmail, testAge, testPassword);
            var token = await authService.AuthenticateUser(testEmail, testPassword);
            Assert.NotNull(token);
            Assert.IsType<string>(token);
        }

        [Fact]
        public async Task TestAuthenticateUser_Failure_WrongPassword()
        {
            using var dbContext = CreateTestDbContext();
            var config = BuildTestConfiguration();
            var authService = new AuthService(dbContext, config);
            string testName = "Invalid Tester";
            string testEmail = "invalid@test.com";
            int testAge = 28;
            string correctPassword = "correctpwd";
            var registeredUser = await authService.RegisterUser(testName, testEmail, testAge, correctPassword);
            var token = await authService.AuthenticateUser(testEmail, "wrongpwd");
            Assert.Null(token);
        }
    }
}
