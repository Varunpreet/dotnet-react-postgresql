using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserManagementApi.Controllers;
using UserManagementApi.Data;
using UserManagementApi.Models;
using Xunit;

public class UsersControllerTests
{
    private AppDbContext GetDatabaseContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString()) // Unique DB for each test
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetUsers_Should_ReturnEmptyList_WhenNoUsersExist()
    {
        // Arrange
        var context = GetDatabaseContext();
        var controller = new UsersController(context);

        // Act
        var result = await controller.GetUsers();

        // Assert
        var actionResult = Assert.IsType<ActionResult<IEnumerable<User>>>(result);
        var users = Assert.IsType<List<User>>(actionResult.Value);
        Assert.Empty(users);
    }

[Fact]
public async Task AddUser_Should_ReturnCreatedUser()
{
    // Arrange
    var context = GetDatabaseContext();
    var controller = new UsersController(context);
    var user = new User { Name = "Charlie", Email = "charlie@example.com", Age = 28 };

    // Act
    var result = await controller.AddUser(user);

    // Assert
    var actionResult = Assert.IsType<ActionResult<User>>(result);
    var createdUser = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
    var returnedUser = Assert.IsType<User>(createdUser.Value); // ✅ Extracts the actual User object

    Assert.Equal("Charlie", returnedUser.Name);
    Assert.Equal(28, returnedUser.Age);
}


    [Fact]
    public async Task DeleteUser_Should_ReturnNotFound_WhenUserDoesNotExist()
    {
        // Arrange
        var context = GetDatabaseContext();
        var controller = new UsersController(context);
        var nonExistentUserId = System.Guid.NewGuid();

        // Act
        var result = await controller.DeleteUser(nonExistentUserId);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteUser_Should_RemoveUser_WhenUserExists()
    {
        // Arrange
        var context = GetDatabaseContext();
        var user = new User { Name = "David", Email = "david@example.com", Age = 40 };
        context.Users.Add(user);
        await context.SaveChangesAsync();
        var controller = new UsersController(context);

        // Act
        var result = await controller.DeleteUser(user.Id);
        var deletedUser = await context.Users.FindAsync(user.Id);

        // Assert
        Assert.IsType<NoContentResult>(result);
        Assert.Null(deletedUser);
    }
}
