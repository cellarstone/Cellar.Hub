using System;
using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Cellar.Hub.Api.Models
{
    //OBJECT FOR TREE STRUCTURE
    public class CellarOrder
    {

        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }  

        // NEW
        // IN PROGRESS
        // DONE
        [BsonElement("state")]
        public string State { get; set; }

        
        [BsonElement("author")]
        public string Author { get; set; }



        [BsonElement("sumprice")]
        public int SumPrice { get; set; }




        [BsonElement("items")]
        public Dictionary<CellarSortimentItem, int> Items { get; set; }




       
        /*****************************/
        /*  Solve Tree structure     */
        /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
        /*****************************/
        [BsonElement("path")]
        public string Path { get; set; }

    }
}