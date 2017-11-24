using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Cellar.Hub.Admin
{
    public class Startup
    {

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }



        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc()
                .AddJsonOptions(options => {
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                }); ;
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            
            // var angularRoutes = new[] {
            //     "/app/",
            //     "/hck/",
            //     "/catalog/"
            // };



            // app.Use(async (context, next) =>
            // {
            //     if (context.Request.Path.HasValue && null != angularRoutes.FirstOrDefault(
            //         (ar) => context.Request.Path.Value.StartsWith(ar, StringComparison.OrdinalIgnoreCase)))
            //     {
            //         context.Request.Path = new PathString("/");
            //     }

            //     await next();
            // });








            app.UseDefaultFiles();
            app.UseStaticFiles();


            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");


                // when the user types in a link handled by client side routing to the address bar 
                // or refreshes the page, that triggers the server routing. The server should pass 
                // that onto the client, so Angular can handle the route
                routes.MapRoute(
                    name: "spa-fallback",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" }
                );
            });
        }
    }
}
