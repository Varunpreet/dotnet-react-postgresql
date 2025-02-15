using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UserManagementApi.Data;
using UserManagementApi.Models;

namespace UserManagementApi.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<User?> AuthenticateUser(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !VerifyPassword(password, user.PasswordHash))
                return null;
            return user;
        }

        public async Task<bool> RegisterUser(string name, string email, int age, string password)
        {
            if (await _context.Users.AnyAsync(u => u.Email == email))
                return false;

            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = name,
                Email = email,
                Age = age,
                PasswordHash = HashPassword(password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public string GenerateJwtToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:ExpirationMinutes"])),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["JwtSettings:Issuer"],
                Audience = _configuration["JwtSettings:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }

        private bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }
    }
}
