using MQTTnet;
using MQTTnet.Core.Client;
using MQTTnet.Core.Packets;
using MQTTnet.Core.Protocol;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Cellar.Hub.DataFlow
{
    class Program
    {
        static void Main(string[] args)
        {
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
    }
}
