﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Cellar.Hub.Admin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.Title = "Cellar Hub Admin";

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseUrls("http://*:8889")
                // .UseUrls("http://127.0.0.1:8881", "http://0.0.0.0:8881", "http://localhost:8881")
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
