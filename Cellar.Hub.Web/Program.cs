using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace Cellar.Hub.Web                
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.Title = "Cellar Hub Web";

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseUrls("http://*:8881")
                // .UseUrls("http://127.0.0.1:8881", "http://0.0.0.0:8881", "http://localhost:8881")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
