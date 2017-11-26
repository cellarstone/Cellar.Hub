using System;
using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Cellar.Hub.Api.Models
{
    //OBJECT FOR TREE STRUCTURE
    public class CellarSortimentItem
    {

        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }  


        [BsonElement("name")]
        public string Name { get; set; }


        // READY
        // HIDDEN
        [BsonElement("state")]
        public string State { get; set; }

        


        [BsonElement("price")]
        public int Price { get; set; }




       
        /*****************************/
        /*  Solve Tree structure     */
        /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
        /*****************************/
        [BsonElement("path")]
        public string Path { get; set; }

    }
}