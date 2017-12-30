using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;

namespace Cellar.Hub.Api.Business
{
    public class CellarMqttService
    {
        MqttClient client;

        public CellarMqttService(IConfigurationRoot conf){


            string aaa = conf.GetSection("ConnectionStrings:mqtt").Value;


            client = new MqttClient(aaa); 

        }


        public CellarDTO PublishToMqtt(string topic, string value)
        {
            if(!client.IsConnected){
                client.Connect("api"); 
            }

            var result = client.Publish(topic, Encoding.UTF8.GetBytes(value), MqttMsgBase.QOS_LEVEL_EXACTLY_ONCE, false); 
 
            return CellarDTO.Data(result);
        }


    }
}
