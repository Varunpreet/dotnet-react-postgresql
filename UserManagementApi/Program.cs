using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using UserManagementApi.Data;
using UserManagementApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add database context
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("UserDb"));

// ✅ Enable CORS before app.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// ✅ Add controllers
builder.Services.AddControllers();

// ✅ Configure Swagger UI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "User Management API", Version = "v1" });
});

var app = builder.Build();

// ✅ Ensure database is seeded with initial data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!dbContext.Users.Any())
    {
        dbContext.Users.Add(new User { Name = "Alice", Email = "alice@example.com", Age = 25 });
        dbContext.SaveChanges();
    }
}

// ✅ Apply CORS before routing
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Enable API Routing
app.UseAuthorization();
app.MapControllers();

app.Run();
