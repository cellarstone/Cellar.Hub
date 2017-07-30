using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Cellar.Hub.Core
{
    public class CellarSpace
    {
        
        [BsonId]
        public ObjectId Id { get; set; }

        
        public string Name { get; set; }

        
        public CellarSpaceType Type { get; set; }


        public ICollection<CellarSenzor> Senzors {get;set;} = new List<CellarSenzor>();


        
        // GPS - latitude, longtitude
        // Country, City, Street


        // Height, Weight, Z = 3D view

        //GameObject

        


    }
}