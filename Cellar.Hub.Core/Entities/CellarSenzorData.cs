using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace Cellar.Hub.Core
{

    public class CellarSenzorData
    {
        // [BsonId]
        public string Id { get; set; }


        public string SenzorId { get; set; }
        public DateTime Date { get; set; }

        public string Measurement { get; set; }

        public List<string> Values { get; set; } = new List<string>();

    }
}