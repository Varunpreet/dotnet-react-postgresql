using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementApi.Data;
using UserManagementApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<User>> AddUser([FromBody] User user)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString();
            Console.WriteLine($"🔍 Received Token: {token}");

            if (string.IsNullOrEmpty(token))
            {
                Console.WriteLine("🔴 No Authorization token received.");
                return Unauthorized("🔴 No token received in request.");
            }

            if (user.Age < 1 || user.Age > 120)
                return BadRequest("🔴 Age must be between 1 and 120.");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsers), new { id = user.Id }, user);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var token = HttpContext.Request.Headers["Authorization"].ToString();
            Console.WriteLine($"🔍 Received Token: {token}");

            if (string.IsNullOrEmpty(token))
            {
                Console.WriteLine("🔴 No Authorization token received.");
                return Unauthorized("🔴 No token received in request.");
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                Console.WriteLine($"🔴 User with ID {id} not found.");
                return NotFound("🔴 User not found.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ User with ID {id} deleted.");
            return NoContent();
        }
    }
}
