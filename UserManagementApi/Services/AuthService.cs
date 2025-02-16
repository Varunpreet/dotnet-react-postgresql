using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
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

        // Register a new user.
        public async Task<User?> RegisterUser(string name, string email, int age, string password)
        {
            if (_context.Users.Any(u => u.Email == email))
            {
                Console.WriteLine($"🔴 User with email {email} already exists.");
                return null;
            }

            var newUser = new User
            {
                Id = Guid.NewGuid(),
                Name = name,
                Email = email,
                Age = age,
                PasswordHash = HashPassword(password)
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            Console.WriteLine($"✅ Registered new user: {email}");

            return newUser;
        }

        // Authenticate User & Generate JWT Token.
        public async Task<string?> AuthenticateUser(string email, string password)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == email);
            if (user == null)
            {
                Console.WriteLine("🔴 Authentication failed: User not found.");
                return null;
            }

            if (!VerifyPassword(password, user.PasswordHash))
            {
                Console.WriteLine("🔴 Authentication failed: Incorrect password.");
                return null;
            }

            string token = GenerateJwtToken(user);
            Console.WriteLine($"✅ Authentication successful. Token generated for {user.Email}.");
            return token;
        }

        // Generate JWT Token.
        public string GenerateJwtToken(User user)
        {
            var secret = _configuration["JwtSettings:Secret"] 
                         ?? throw new ArgumentNullException("JwtSettings:Secret is missing");

            var issuer = _configuration["JwtSettings:Issuer"] 
                         ?? throw new ArgumentNullException("JwtSettings:Issuer is missing");

            var audience = _configuration["JwtSettings:Audience"] 
                           ?? throw new ArgumentNullException("JwtSettings:Audience is missing");

            var expirationMinutesStr = _configuration["JwtSettings:ExpirationMinutes"];
            if (string.IsNullOrEmpty(expirationMinutesStr) || !int.TryParse(expirationMinutesStr, out int expirationMinutes))
            {
                throw new ArgumentNullException("JwtSettings:ExpirationMinutes is missing or invalid");
            }

            var key = Encoding.UTF8.GetBytes(secret);
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(expirationMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = issuer,
                Audience = audience
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(token);

            Console.WriteLine($"✅ Generated Token: {tokenString}");

            return tokenString;
        }

        // Hash Password.
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        // Verify Password.
        private bool VerifyPassword(string enteredPassword, string storedHash)
        {
            var enteredHash = HashPassword(enteredPassword);
            return enteredHash == storedHash;
        }
    }
}
