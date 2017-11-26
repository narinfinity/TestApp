using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using TestApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace TestApp.Infrastructure.Dependency
{
    public static class DependencyServiceExtensions
    {
        public static IServiceCollection AddDbContext(this IServiceCollection services, Action<DbContextOptionsBuilder> optionsAction)
        {
            return services.AddDbContext<AppDbContext>(optionsAction);
        }
        public static IdentityBuilder AddEntityFrameworkStores(this IdentityBuilder builder)
        {
            return builder.AddEntityFrameworkStores<AppDbContext>();
        }
        public static IServiceProvider AddExternalDependencyServiceProvider(this IServiceCollection services, out IContainer container)
        {
            var containerBuilder = new ContainerBuilder();
            containerBuilder.RegisterModule<DefaultRegistrationModule>();
            containerBuilder.Populate(services);
            container = containerBuilder.Build();
            return new AutofacServiceProvider(container);
        }


    }
}
