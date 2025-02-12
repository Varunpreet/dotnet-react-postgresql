using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementApi.Data;
using UserManagementApi.Models;

namespace UserManagementApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: Fetch all users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // ✅ POST: Add a new user
        [HttpPost]
        public async Task<ActionResult<User>> AddUser(User user)
        {
        if (user.Age < 1 || user.Age > 120)
            return BadRequest("Age must be between 1 and 120.");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
    
            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }


        // ✅ DELETE: Remove a user by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
