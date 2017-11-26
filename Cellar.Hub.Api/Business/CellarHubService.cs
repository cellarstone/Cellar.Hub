using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Cellar.Hub.Api.DataAccess;
using Cellar.Hub.Api.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Cellar.Hub.Api.Business
{
    public class CellarHubService
    {
        CellarHubMongoDbContext _db;

        public CellarHubService(CellarHubMongoDbContext db)
        {
            _db = db;
        }

        public CellarDTO GetAllCellarSpaces()
        {
            var result = _db.Spaces.AsQueryable<CellarSpace>();
            return CellarDTO.Data(result);
        }


         public CellarDTO GetRootCellarSpaces()
        {
            string bsonQuery = @"{path: /^\/[A-Za-z0-9]*$/ }";
            var filter = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(bsonQuery);
            var result = _db.Spaces.FindSync(filter).ToList();

            return CellarDTO.Data(result);
        }

         public CellarDTO GetCellarSpaces(string path)
        {
            // string changed = path.Replace(@"/",@"\/");

            string bsonQuery = @"{path: '"+path+"'}";
            var filter = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(bsonQuery);
            var result = _db.Spaces.FindSync(filter).ToList();

            return CellarDTO.Data(result);
        }

        public CellarDTO GetCellarSpace(string id)
        {
            var filter = Builders<CellarSpace>.Filter.Eq("_id", id);
            var result = _db.Spaces.Find(filter).FirstOrDefault();
            return CellarDTO.Data(result);
        }

        public CellarDTO AddCellarSpace(CellarSpace item)
        {
            _db.Spaces.InsertOne(item);
            return CellarDTO.Data(item);
        }

        public CellarDTO RemoveCellarSpace(CellarSpace item)
        {

            //Get All senzors, meetings, orders ... etc.

            //Remove senzors

            //Remove meetings

            //Remove orders


            //Remove space
            _db.Spaces.DeleteOne(Builders<CellarSpace>.Filter.Eq(r => r.Id, item.Id));
            return CellarDTO.Ok();
        }

        public CellarDTO UpdateCellarSpace(CellarSpace item)
        {
            _db.Spaces.ReplaceOne(Builders<CellarSpace>.Filter.Eq(r => r.Id, item.Id), item, new UpdateOptions() { IsUpsert = true });
            return CellarDTO.Ok();
        }




        public CellarDTO GetAllCellarSenzors()
        {
            var result = _db.Senzors.AsQueryable<CellarSenzor>();
            return CellarDTO.Data(result);
        }

         public CellarDTO GetCellarSenzors(string path)
        {
            // string changed = path.Replace(@"/",@"\/");

            string bsonQuery = @"{path: '"+path+"'}";
            var filter = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(bsonQuery);
            var result = _db.Senzors.FindSync(filter).ToList();

            return CellarDTO.Data(result);
        }

        public CellarDTO GetCellarSenzor(string id)
        {
            var filter = Builders<CellarSenzor>.Filter.Eq("_id", id);
            var result = _db.Senzors.Find(filter).FirstOrDefault();
            return CellarDTO.Data(result);
        }

        public CellarDTO AddCellarSenzor(CellarSenzor item)
        {
            _db.Senzors.InsertOne(item);
            return CellarDTO.Data(item);
        }

        public CellarDTO RemoveCellarSenzor(string id)
        {
            _db.Senzors.DeleteOne(Builders<CellarSenzor>.Filter.Eq(r => r.Id, id));
            return CellarDTO.Ok();
        }

        public CellarDTO UpdateCellarSenzor(CellarSenzor item)
        {
            _db.Senzors.ReplaceOne(Builders<CellarSenzor>.Filter.Eq(r => r.Id, item.Id), item, new UpdateOptions() { IsUpsert = true });
            return CellarDTO.Ok();
        }

    }
}
