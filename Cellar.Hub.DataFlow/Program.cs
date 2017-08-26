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
                        o.mongoDbConnectionString = Configuration.GetSection("ConnectionStrings:mongoDb").Value;
                        o.rethinkDbConnectionString = Configuration.GetSection("ConnectionStrings:rethinkDb").Value;
                        o.mosquittoMqttConnectionString = Configuration.GetSection("ConnectionStrings:mosquittoMqtt").Value;
                    })
                    // .AddSingleton<IConfigurationRoot>(Configuration)
                    .AddSingleton<CellarMqttClient>()
                    .Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"))
                    .BuildServiceProvider();

                

                // _mongodbcontext = serviceProvider.GetService<CellarHubMongoDbContext>();
                // _rethinkdbcontext = serviceProvider.GetService<CellarHubRethinkDbContext>();
                _logger = serviceProvider.GetService<ILogger>();

                // // create client instance 
                // MqttClient client = new MqttClient(Configuration.GetSection("ConnectionStrings:mosquittoMqtt").Value);

                // register to message received 
                CellarMqttClient celllarclient = serviceProvider.GetService<CellarMqttClient>();
                // client.MqttMsgPublishReceived += celllarclient.client_MqttMsgPublishReceived;

                // string clientId = Guid.NewGuid().ToString();
                // client.Connect(clientId);



                /***********************************************/
                /* PRECIST Z DB, KTERE SENZORID MAME SLEDOVAT */
                /***********************************************/

                // subscribe to the topic "/home/temperature" with QoS 2 
                celllarclient.client.Subscribe(new string[] { "+/temperature" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                celllarclient.client.Subscribe(new string[] { "+/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2316/temperature" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2316/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2317/temperature" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2317/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2318/temperature" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2318/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2319/temperature" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "s2319/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                
                // celllarclient.client.Subscribe(new string[] { "*/humidity" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "alza/p1/z1/s2317/teplota" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "alza/p1/z1/s2318/teplota" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });

                // celllarclient.client.Subscribe(new string[] { "alza/p1/z1/s2315/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "alza/p1/z1/s2316/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "alza/p1/z1/s2317/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                // celllarclient.client.Subscribe(new string[] { "alza/p1/z1/s2318/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });








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