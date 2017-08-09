using MQTTnet;
using MQTTnet.Core.Client;
using MQTTnet.Core.Packets;
using MQTTnet.Core.Protocol;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Cellar.Hub.Core;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Cellar.Hub.DataFlow
{
    class Program
    {
        public static CellarHubDbContext dbcontext { get; set; }


        static void Main(string[] args)
        {

            //setup our DI
            var serviceProvider = new ServiceCollection()
                .AddLogging()
                .AddScoped<CellarHubDbContext, CellarHubDbContext>()
                .BuildServiceProvider();


            dbcontext = serviceProvider.GetService<CellarHubDbContext>();



            var options = new MqttClientOptions
            {
                Server = "127.0.0.1"
            };

            var client = new MqttClientFactory().CreateMqttClient(options);
            client.ApplicationMessageReceived += (s, e) =>
            {
                Console.WriteLine("### RECEIVED APPLICATION MESSAGE ###");
                Console.WriteLine($"+ Topic = {e.ApplicationMessage.Topic}");
                Console.WriteLine($"+ Payload = {Encoding.UTF8.GetString(e.ApplicationMessage.Payload)}");
                Console.WriteLine($"+ QoS = {e.ApplicationMessage.QualityOfServiceLevel}");
                Console.WriteLine($"+ Retain = {e.ApplicationMessage.Retain}");
                Console.WriteLine();


                var topic = e.ApplicationMessage.Topic;

                //prozatimni hack nez prenastavim senzory
                string senzorId = topic.Split('/')[3];
                string measurement = topic.Split('/')[4];
                string value = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);

                //exist senzorId and Timestamp (Hourly)


                InsertToDB(senzorId, measurement, value);


            };

            client.Connected += async (s, e) =>
            {
                Console.WriteLine("### CONNECTED WITH SERVER ###");

                await client.SubscribeAsync(new List<TopicFilter>
                {
                    new TopicFilter("#", MqttQualityOfServiceLevel.AtMostOnce)
                });

                Console.WriteLine("### SUBSCRIBED ###");
            };

            client.Disconnected += async (s, e) =>
            {
                Console.WriteLine("### DISCONNECTED FROM SERVER ###");
                await Task.Delay(TimeSpan.FromSeconds(5));

                try
                {
                    await client.ConnectAsync();
                }
                catch
                {
                    Console.WriteLine("### RECONNECTING FAILED ###");
                }
            };

            try
            {
                client.ConnectAsync();
            }
            catch
            {
                Console.WriteLine("### CONNECTING FAILED ###");
            }

            Console.WriteLine("### WAITING FOR APPLICATION MESSAGES ###");



            Console.ReadLine();
        }





        public static async void InsertToDB(string senzorId, string measurement, string value)
        {
            try
            {

                var filterBuilder = Builders<CellarSenzorData>.Filter;
                var filter = filterBuilder.Eq("SenzorId", senzorId)
                                 & filterBuilder.Eq("Date", new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, 0, 0, DateTimeKind.Utc))
                                 & filterBuilder.Eq("Measurement", measurement);

                var update = Builders<CellarSenzorData>.Update.Push(p => p.Values, value);

                //updatuje zaznam, kdyz neexistuje tak ho vytvori 
                var aaa = await dbcontext.SenzorsData.UpdateOneAsync(filter, update, new UpdateOptions(){IsUpsert=true});

                //Console.WriteLine(aaa.Values);

                //Console.WriteLine("MatchedCount: " + aaa.MatchedCount + " - ModifiedCount: " + aaa.ModifiedCount + " - UpsertId: " + aaa.UpsertedId);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }




        }
    }
}
