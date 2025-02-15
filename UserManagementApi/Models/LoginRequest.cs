using System.ComponentModel.DataAnnotations;

namespace UserManagementApi.Models
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }
    }
}
