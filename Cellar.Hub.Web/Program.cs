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
                .UseUrls("http://localhost:5001","http://0.0.0.0:5001")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
