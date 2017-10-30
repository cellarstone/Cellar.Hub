
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
        ConnectionStrings _configuration;
        ILogger _logger;


        // MQTT client
        public MqttClient client;

        // Rethink DB
        CellarHubRethinkDbContext _rethinkdbcontext;


        public CellarMqttClient(CellarHubRethinkDbContext rethinkdbcontext,
                                IOptions<ConnectionStrings> configuration,
                                ILogger<CellarMqttClient> logger)
        {
            _rethinkdbcontext = rethinkdbcontext;
            _configuration = configuration.Value;
            _logger = logger;



            var mqttUrl = _configuration.mosquittoMqtt;
            Console.WriteLine("-" + _configuration.rethinkDb + "-");
            Console.WriteLine("-" + mqttUrl + "-");

            /******************************/
            /* MQTT */
            /******************************/

            // create client instance 
            client = new MqttClient(mqttUrl);

            // register to message received 
            client.MqttMsgPublishReceived += client_MqttMsgPublishReceived;

            string clientId = Guid.NewGuid().ToString();
            client.Connect(clientId);
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
                string value = Encoding.UTF8.GetString(e.Message);

                //prozatimni hack nez prenastavim senzory
                string senzorId = topic.Split('/')[0];
                string measurement = topic.Split('/')[1];

                Task.Run(() => _rethinkdbcontext.InsertToSenzorData(senzorId, measurement, value));


            }
            catch (Exception ex)
            {
                LogException(ex);
            }
        }


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