
using System;
using System.Text;
using System.Net.WebSockets;
using Cellar.Hub.Core;
using Microsoft.Extensions.Logging;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Cellar.Hub.DataFlow
{
    public class CellarMqttClient
    {
        // CellarHubMongoDbContext _mongodbcontext;
        CellarHubRethinkDbContext _rethinkdbcontext;
        ConnectionStrings _configuration;
        ILogger _logger;


        // create client instance 
        public MqttClient client;
        // public ClientWebSocket clientWS_s2315_temperature;
        // public ClientWebSocket clientWS_s2316_temperature;
        // public ClientWebSocket clientWS_s2317_temperature;
        // public ClientWebSocket clientWS_s2318_temperature;

        // public ClientWebSocket clientWS_s2315_humidity;
        // public ClientWebSocket clientWS_s2316_humidity;
        // public ClientWebSocket clientWS_s2317_humidity;
        // public ClientWebSocket clientWS_s2318_humidity;


        public CellarMqttClient(
            // CellarHubMongoDbContext mongodbcontext,
                                CellarHubRethinkDbContext rethinkdbcontext,
                                IOptions<ConnectionStrings> configuration,
                                ILogger<CellarMqttClient> logger)
        {
            // _mongodbcontext = mongodbcontext;
            _rethinkdbcontext = rethinkdbcontext;
            _configuration = configuration.Value;
            _logger = logger;

            var mqttUrl = _configuration.mosquittoMqtt;
            var wsUrl = _configuration.websocketserver;



            /******************************/
            /* MQTT */
            /******************************/

            // create client instance 
            client = new MqttClient(mqttUrl);

            // register to message received 
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

            string clientId = Guid.NewGuid().ToString();
            client.Connect(clientId);



            /******************************/
            /* WebSockets */
            /******************************/

            // clientWS_s2315_temperature = new ClientWebSocket();
            // clientWS_s2315_temperature.ConnectAsync(new Uri("ws://" + wsUrl + "/s2315/temperature"), CancellationToken.None);

            // clientWS_s2316_temperature = new ClientWebSocket();
            // clientWS_s2316_temperature.ConnectAsync(new Uri("ws://" + wsUrl + "/s2316/temperature"), CancellationToken.None);

            // clientWS_s2317_temperature = new ClientWebSocket();
            // clientWS_s2317_temperature.ConnectAsync(new Uri("ws://" + wsUrl + "/s2317/temperature"), CancellationToken.None);

            // clientWS_s2318_temperature = new ClientWebSocket();
            // clientWS_s2318_temperature.ConnectAsync(new Uri("ws://" + wsUrl + "/s2318/temperature"), CancellationToken.None);

            // clientWS_s2315_humidity = new ClientWebSocket();
            // clientWS_s2315_humidity.ConnectAsync(new Uri("ws://" + wsUrl + "/s2315/humidity"), CancellationToken.None);

            // clientWS_s2316_humidity = new ClientWebSocket();
            // clientWS_s2316_humidity.ConnectAsync(new Uri("ws://" + wsUrl + "/s2316/humidity"), CancellationToken.None);

            // clientWS_s2317_humidity = new ClientWebSocket();
            // clientWS_s2317_humidity.ConnectAsync(new Uri("ws://" + wsUrl + "/s2317/humidity"), CancellationToken.None);

            // clientWS_s2318_humidity = new ClientWebSocket();
            // clientWS_s2318_humidity.ConnectAsync(new Uri("ws://" + wsUrl + "/s2318/humidity"), CancellationToken.None);




            Console.WriteLine("Connected!");


        }




        public void client_MqttMsgPublishReceived(object sender, MqttMsgPublishEventArgs e)
        {
            try
            {

                // Console.WriteLine("### RECEIVED APPLICATION MESSAGE ###");
                // Console.WriteLine($"+ Topic = {e.Topic}");
                // Console.WriteLine($"+ Payload = {Encoding.UTF8.GetString(e.Message)}");
                // Console.WriteLine($"+ QoS = {e.QosLevel}");
                // Console.WriteLine($"+ Retain = {e.Retain}");
                // Console.WriteLine();

                var topic = e.Topic;

                //prozatimni hack nez prenastavim senzory
                string senzorId = topic.Split('/')[0];
                string measurement = topic.Split('/')[1];
                string value = Encoding.UTF8.GetString(e.Message);

                //exist senzorId and Timestamp (Hourly)
                // ClientWebSocket usedSocketClient = null;
                // if (senzorId == "s2315" && measurement == "teplota")
                // {
                //     usedSocketClient = clientWS_s2315_temperature;
                // }
                // else if (senzorId == "s2316" && measurement == "teplota")
                // {
                //     usedSocketClient = clientWS_s2316_temperature;
                // }
                // else if (senzorId == "s2317" && measurement == "teplota")
                // {
                //     usedSocketClient = clientWS_s2317_temperature;
                // }
                // else if (senzorId == "s2318" && measurement == "teplota")
                // {
                //     usedSocketClient = clientWS_s2318_temperature;
                // }
                // else if (senzorId == "s2315" && measurement == "vlhkost")
                // {
                //     usedSocketClient = clientWS_s2315_humidity;
                // }
                // else if (senzorId == "s2316" && measurement == "vlhkost")
                // {
                //     usedSocketClient = clientWS_s2316_humidity;
                // }
                // else if (senzorId == "s2317" && measurement == "vlhkost")
                // {
                //     usedSocketClient = clientWS_s2317_humidity;
                // }
                // else if (senzorId == "s2318" && measurement == "vlhkost")
                // {
                //     usedSocketClient = clientWS_s2318_humidity;
                // }


                // SendWebSockets(usedSocketClient, senzorId, measurement, value);

                // _mongodbcontext.InsertToSenzorData(senzorId, measurement, value);
                // _rethinkdbcontext.InsertToSenzorData(senzorId, measurement, value);
                Task.Run(() => _rethinkdbcontext.InsertToSenzorData(senzorId, measurement, value));


            }
            catch (Exception ex)
            {
                LogException(ex);
            }
        }



        // private async Task SendWebSockets(ClientWebSocket socket, string senzorId, string measurement, string value)
        // {
        //     // if (clientWS.State != WebSocketState.Open)
        //     // {
        //     //     if (clientWS.State != WebSocketState.Connecting)
        //     //     {
        //     //         // clientWS = new ClientWebSocket();
        //     //         Console.Write("reconnecting . . . ");
        //     //         clientWS = new ClientWebSocket();
        //     //         await clientWS.ConnectAsync(new Uri("ws://localhost:5000/test"), CancellationToken.None);
        //     //         Console.WriteLine(". . . reconnected");
        //     //     }
        //     // }

        //     if (socket.State == WebSocketState.Open)
        //     {
        //         string line = senzorId + "|" + measurement + "|" + value;
        //         Console.WriteLine("SendWebSockets start - " + line);

        //         var bytes = Encoding.UTF8.GetBytes(line);
        //         await socket.SendAsync(new ArraySegment<byte>(bytes), WebSocketMessageType.Text, true, CancellationToken.None);

        //         Console.WriteLine("SendWebSockets end - " + line);
        //     }
        // }




        public void LogException(Exception exception)
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