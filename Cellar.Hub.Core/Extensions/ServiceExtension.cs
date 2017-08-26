using Cellar.Hub.Core;
using System;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServicesExtension
    {
        public static IServiceCollection AddCellarHubCore(this IServiceCollection services, Action<HubCoreOptions> setupAction)
        {
            if (services == null)
            {
                throw new ArgumentNullException(nameof(services));
            }
            if (setupAction == null)
            {
                throw new ArgumentNullException(nameof(setupAction));
            }

            
            //registruje nastaveni modulu
            services.Configure(setupAction);

            //connectionString si vezme sam DbContext z IOptions<>
            //services.AddDbContext<GamingDbContext>();

            //REPOSITORY - Mozne ADO nebo EF
            services.AddScoped<CellarHubMongoDbContext, CellarHubMongoDbContext>();
            services.AddScoped<CellarHubRethinkDbContext, CellarHubRethinkDbContext>();


            return services;
        }
    }
}
