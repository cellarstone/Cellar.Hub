using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Cellar.Hub.Core
{
    //OBJECT FOR PLACE STRUCTURE (solve World problem)
    public class CellarPlace
    {

        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }  

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("state")]
        public string State { get; set; }

        // Country, City, Street
        [BsonElement("country")]
        public string Country {get;set;}
        [BsonElement("city")]
        public string City {get;set;}
        [BsonElement("street")]
        public string Street{get;set;}
        [BsonElement("zipCode")]
        public string ZipCode{get;set;}

        // GPS - latitude, longtitude
        [BsonElement("latitude")]
        public string Latitude {get;set;}
        [BsonElement("longtitude")]
        public string Longtitude {get;set;}

        
         [BsonElement("rootSpaces")]
        public ICollection<string> RootSpaces { get; set; } = new List<string>();




    }
}