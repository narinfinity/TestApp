using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace TestApp.Infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {            
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            var conStr = "Server=\\NSERVER;Database=TestApp;User ID=sa;Password=pass;Trusted_Connection=False;Encrypt=False;TrustServerCertificate=False;MultipleActiveResultSets=True;";
            builder.UseSqlServer(conStr);
            return new AppDbContext(builder.Options);
        }
    }
}
