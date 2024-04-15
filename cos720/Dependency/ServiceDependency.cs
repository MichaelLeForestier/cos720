using Microsoft.Extensions.Configuration;
using Repository.Repositories;
using Service.Services;
using Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceDependency
    {
        public static IServiceCollection AddConfig(
             this IServiceCollection services, IConfiguration config)
        {
            //services.Configure<PositionOptions>(
            //    config.GetSection(PositionOptions.Position));
            //services.Configure<ColorOptions>(
            //    config.GetSection(ColorOptions.Color));

            return services;
        }

        public static IServiceCollection AddServiceDependency(
             this IServiceCollection services)
        {

            services.AddScoped(typeof(IRepository<,>), typeof(Repository<,>));
            services.AddScoped(typeof(UserService));
            services.AddScoped(typeof(AuthenticationService));
            services.AddScoped(typeof(ModuleService));
            services.AddScoped(typeof(UserModuleService));
            services.AddScoped(typeof(LoggingService));
            services.AddScoped(typeof(TokenService));


            return services;
        }
    }
}