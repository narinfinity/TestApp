using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace TestApp.Infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {            
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            var conStr = "Server=D\\NSERVER;Database=TestApp;User ID=sa;Password=p;Trusted_Connection=False;Encrypt=False;TrustServerCertificate=False;MultipleActiveResultSets=True;";
            builder.UseSqlServer(conStr);
            return new AppDbContext(builder.Options);
        }
    }
}
