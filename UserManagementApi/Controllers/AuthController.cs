using Microsoft.AspNetCore.Mvc;
using UserManagementApi.Models;
using UserManagementApi.Services;

namespace UserManagementApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var success = await _authService.RegisterUser(user.Name, user.Email, user.Age, user.PasswordHash);
            if (!success)
                return BadRequest("User already exists.");
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var authenticatedUser = await _authService.AuthenticateUser(request.Email, request.PasswordHash);
            if (authenticatedUser == null)
                return Unauthorized("Invalid email or password.");

            var token = _authService.GenerateJwtToken(authenticatedUser);
            return Ok(new { token });
        }
    }
}
