using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Cellar.Hub.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;

using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace Cellar.Hub.DataFlow
{
    class Program
    {
        // public static CellarHubMongoDbContext _mongodbcontext { get; set; }
        // public static CellarHubRethinkDbContext _rethinkdbcontext { get; set; }
        public static ILogger _logger { get; set; }
        public static IConfigurationRoot Configuration { get; set; }


        //public static string CellarHubMQTT_url = "cellar.hub.mqtt";





        static void Main(string[] args)
        {
            try
            {

                string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
                Console.WriteLine("************************ " + environment + " ************************");

                var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true);
                Configuration = builder.Build();


                Console.WriteLine("----" + Configuration.GetSection("ConnectionStrings:rethinkDb").Value + "----");
                Console.WriteLine("----" + Configuration.GetSection("ConnectionStrings:mosquitoMqtt").Value + "----");


                //setup our DI
                var serviceProvider = new ServiceCollection()
                    .AddLogging()
                    .AddCellarHubCore(o =>
                    {
                        o.rethinkDbConnectionString = Configuration.GetSection("ConnectionStrings:rethinkDb").Value;
                        o.mosquittoMqttConnectionString = Configuration.GetSection("ConnectionStrings:mosquittoMqtt").Value;
                    })
                    .AddSingleton<CellarMqttClient>()
                    .Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"))
                    .BuildServiceProvider();

                

                _logger = serviceProvider.GetService<ILogger>();

                // create client instance 
                CellarMqttClient celllarclient = serviceProvider.GetService<CellarMqttClient>();
                
                /***********************************************/
                /* DODELAT PRECIST Z DB, KTERE SENZORID MAME SLEDOVAT */
                /***********************************************/

                // subscribe 
                celllarclient.client.Subscribe(new string[] { "+/temperature" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                celllarclient.client.Subscribe(new string[] { "+/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                celllarclient.client.Subscribe(new string[] { "+/pir" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                

                Console.ReadLine();

            }
            catch (Exception ex)
            {
                LogException(ex);
            }
        }

        






        /// </// <summary>
        /// HELPER return and log exception
        /// </summary>
        public static void LogException(Exception exception)
        {
            Guid errNo = Guid.NewGuid();

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(errNo.ToString());
            sb.AppendLine(exception.Message);
            if (exception.InnerException != null)
                sb.AppendLine(exception.InnerException.Message);
            sb.AppendLine(exception.StackTrace);

            Console.WriteLine(sb.ToString());
            // _logger.LogCritical(sb.ToString());
        }
    }
}