using System.Collections.Generic;
using System.Security.Claims;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace Cellar.Hub.Api.Models
{
    //OBJECT FOR TREE STRUCTURE
    public class CellarSpace
    {

        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        [BsonElement("id")]
        public string Id { get; set; }  

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("state")]
        public string State { get; set; }

        // Building, Room, Floor, Land
        // [BsonElement("type")]
        // public string Type { get; set; }


        [BsonElement("image")]
        public string Image {get; set;}

       
        /*****************************/
        /*  Solve Tree structure     */
        /* https://docs.mongodb.com/manual/tutorial/model-tree-structures-with-child-references/ */
        /*****************************/
        [BsonElement("path")]
        public string Path { get; set; }

    }
}