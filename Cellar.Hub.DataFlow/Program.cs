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
                Server = "192.168.1.234"
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











            // var cItem = db.SenzorsData.Find(filter).SingleOrDefault();
            // if (cItem != null)
            // {
            //     cItem.Values.Add(value);

            //     var updateBuilder = Builders<CellarSenzorData>.Update;
            //     var update = updateBuilder;

            //     //                 db.SenzorsData.Update({ }, Update.Replace(modifiedCar), UpdateFlags.Upsert);



            //     //                 FindAndModifyArgs args = new FindAndModifyArgs()
            //     //                 {
            //     //                     Query = Query.EQ("_id", ObjectId.Parse(updateCarViewModel.Id))
            //     // ,
            //     //                     Update = Update<Car>.Set(c => c.DailyRentalFee, 3)
            //     // ,
            //     //                     Upsert = false
            //     // ,
            //     //                     SortBy = SortBy<Car>.Ascending(c => c.Id)
            //     // ,
            //     //                     VersionReturned = FindAndModifyDocumentVersion.Original
            //     //                 };
            //     //                 FindAndModifyResult res = CarRentalContext.Cars.FindAndModify(args);


            // }
            // else
            // {
            //     CellarSenzorData data = new CellarSenzorData();
            //     data.SenzorId = senzorId;
            //     data.Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 1, 0, 0);
            //     data.Measurement = measurement;
            //     data.Values.Add(Encoding.UTF8.GetString(e.ApplicationMessage.Payload));

            //     db.SenzorsData.InsertOneAsync(data);
            // }

            // var filter2 = Builders<CellarSenzorData>.Filter.Eq("SenzorId", senzorId).Filter.Eq("Date", new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 1, 0, 0));
            // var update2 = Builders<CellarSenzorData>.Update.Push("Values", value);
            // var options2 = new FindOneAndUpdateOptions<CellarSenzorData> { IsUpsert = true, ReturnDocument = ReturnDocument.After };
            // var result2 = db.SenzorsData.FindOneAndUpdate(filter2, update2, options2);


            // var filter = new BsonDocument("SenzorId", senzorId);
            // db.SenzorsData.FindOneAndUpdateAsync(Builders<BsonDocument>.Filter.Eq("MasterID", 1110),
            //       Builders<BsonDocument>.Update.Set("MasterID", 1120), new FindOneAndUpdateOptions().returnDocument(ReturnDocument.after));



        }
    }
}
