using System;
using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Cellar.Hub.Api.Models
{
    //OBJECT FOR TREE STRUCTURE
    public class CellarMeeting
    {

        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }  

        [BsonElement("name")]
        public string Name { get; set; }


        // NEW
        // IN PROGRESS
        // DONE
        [BsonElement("state")]
        public string State { get; set; }

        
        [BsonElement("start")]
        public DateTime Start {get; set;}


        [BsonElement("end")]
        public DateTime End {get; set;}



        [BsonElement("author")]
        public string Author { get; set; }


       
        /*****************************/
        /*  Solve Tree structure     */
        /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
        /*****************************/
        [BsonElement("path")]
        public string Path { get; set; }

    }
}