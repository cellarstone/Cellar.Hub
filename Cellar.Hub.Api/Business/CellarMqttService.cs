using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace Cellar.Hub.Api.Business
{
    public class CellarMqttService
    {
        string mqttUrl;

        ILogger<CellarMqttService> _log;
        public CellarMqttService(IConfigurationRoot conf,
            ILogger<CellarMqttService> log)
        {
            _log = log;

            mqttUrl = conf.GetSection("ConnectionStrings:mqtt").Value;
        }


        public CellarDTO PublishToMqtt(string topic, string value)
        {
            MqttClient client = new MqttClient(mqttUrl);

            string clientId = Guid.NewGuid().ToString();

            client.Connect(clientId);

            // _log.LogError("clientId : " + clientId + " ,topic : " + topic + ", connected : " + client.IsConnected);

            var result = client.Publish(topic, Encoding.UTF8.GetBytes(value), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false);

            //client.Disconnect();

            return CellarDTO.Data(result);
        }


    }
}
