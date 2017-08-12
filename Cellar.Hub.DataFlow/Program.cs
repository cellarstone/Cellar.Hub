using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Cellar.Hub.Core;
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
        public static CellarHubMongoDbContext _mongodbcontext { get; set; }
        public static CellarHubRethinkDbContext _rethinkdbcontext { get; set; }
        public static ILogger _logger { get; set; }



        public static string CellarHubMQTT_url = "cellar.hub.mqtt";
        


        static void Main(string[] args)
        {
            try
            {

                //setup our DI
                var serviceProvider = new ServiceCollection()
                    .AddLogging()
                    .AddScoped<CellarHubMongoDbContext, CellarHubMongoDbContext>()
                    .AddScoped<CellarHubRethinkDbContext, CellarHubRethinkDbContext>()
                    .BuildServiceProvider();

                _mongodbcontext = serviceProvider.GetService<CellarHubMongoDbContext>();
                _rethinkdbcontext = serviceProvider.GetService<CellarHubRethinkDbContext>();
                _logger = serviceProvider.GetService<ILogger>();

                // create client instance 
                MqttClient client = new MqttClient(CellarHubMQTT_url);

                // register to message received 
                client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

                string clientId = Guid.NewGuid().ToString();
                client.Connect(clientId);



                /***********************************************/
                /* PRECIST Z DB, KTERE SENZORID MAME SLEDOVAT */
                /***********************************************/

                // subscribe to the topic "/home/temperature" with QoS 2 
                client.Subscribe(new string[] { "alza/p1/z1/s2315/teplota" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                client.Subscribe(new string[] { "alza/p1/z1/s2316/teplota" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                client.Subscribe(new string[] { "alza/p1/z1/s2317/teplota" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                client.Subscribe(new string[] { "alza/p1/z1/s2318/teplota" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });

                client.Subscribe(new string[] { "alza/p1/z1/s2315/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                client.Subscribe(new string[] { "alza/p1/z1/s2316/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                client.Subscribe(new string[] { "alza/p1/z1/s2317/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });
                client.Subscribe(new string[] { "alza/p1/z1/s2318/vlhkost" }, new byte[] { MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE });

                




                

                Console.ReadLine();

            }
            catch (Exception ex)
            {
                LogException(ex);
            }
        }

        static void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            try
            {

                Console.WriteLine("### RECEIVED APPLICATION MESSAGE ###");
                Console.WriteLine($"+ Topic = {e.Topic}");
                Console.WriteLine($"+ Payload = {Encoding.UTF8.GetString(e.Message)}");
                Console.WriteLine($"+ QoS = {e.QosLevel}");
                Console.WriteLine($"+ Retain = {e.Retain}");
                Console.WriteLine();

                var topic = e.Topic;

                //prozatimni hack nez prenastavim senzory
                string senzorId = topic.Split('/')[3];
                string measurement = topic.Split('/')[4];
                string value = Encoding.UTF8.GetString(e.Message);

                //exist senzorId and Timestamp (Hourly)


                // _mongodbcontext.InsertToSenzorData(senzorId, measurement, value);
                _rethinkdbcontext.InsertToSenzorData(senzorId, measurement, value);
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
            _logger.LogCritical(sb.ToString());
        }
    }
}