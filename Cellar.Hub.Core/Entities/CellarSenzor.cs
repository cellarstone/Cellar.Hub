using System;
using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Cellar.Hub.Core
{
    public class CellarSenzor
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("state")]
        public string State { get; set; }

        [BsonElement("path")]
        public string Path { get; set; }


        //Cellar Code/Type = Senzor1,Senzor2,Senzor3..OpenClose1..WaterPump1...etc
        [BsonElement("type")]
        public string Type { get; set; }
        [BsonElement("firmware")]
        public string Firmware { get; set; }


        [BsonElement("wifiSSID")]
        public string WifiSSID { get; set; }
        [BsonElement("wifiPassword")]
        public string WifiPassword { get; set; }
        [BsonElement("mqttUrl")]
        public string MQTTUrl { get; set; }
        //position in Space - x,y on image ?? 



    }
}