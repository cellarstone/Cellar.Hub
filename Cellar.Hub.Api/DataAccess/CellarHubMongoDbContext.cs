// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System;
using MongoDB.Driver;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.Extensions.Configuration;
using Cellar.Hub.Api.Models;

namespace Cellar.Hub.Api.DataAccess
{
    /// <summary>
    /// Store for users
    /// </summary>
    public class CellarHubMongoDbContext
    {
        private readonly IConfigurationRoot _config;

        public string DatabaseName { get; set; } = "HubDatabase";
        public bool IsSSL { get; set; } = false;

        private IMongoDatabase _database { get; }

        private readonly ILogger _logger;

        public CellarHubMongoDbContext(IConfigurationRoot config,
                                      ILogger<CellarHubMongoDbContext> logger)
        {
            _config = config;
            _logger = logger;


            var mongoDBConnectionString =_config["ConnectionStrings:mongoDb"];

            try
            {
                MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(mongoDBConnectionString));
                if (IsSSL)
                {
                    settings.SslSettings = new SslSettings { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };
                }
                var mongoClient = new MongoClient(settings);
                _database = mongoClient.GetDatabase(DatabaseName);



                //UNIKATNI POLE
                // var options = new CreateIndexOptions() { Unique = true };
                // var field = new StringFieldDefinition<Category>("Name");
                // var indexDefinition = new IndexKeysDefinitionBuilder<Category>().Ascending(field);
                // _database.GetCollection<Category>("Categories").Indexes.CreateOne(indexDefinition, options);


                // CellarUser asdf = new CellarUser();
                // asdf.Email = "user@user.com";
                // asdf.Password = "password";

                // Users.InsertOne(asdf);

            }
            catch (Exception ex)
            {
                LogException(ex);
                throw new Exception("Can not access to mongo db server.", ex);
            }
        }

        public IMongoCollection<CellarSpace> Spaces
        {
            get
            {
                return _database.GetCollection<CellarSpace>("Spaces");
            }
        }
        public IMongoCollection<CellarSenzor> Senzors
        {
            get
            {
                return _database.GetCollection<CellarSenzor>("Senzors");
            }
        }
        public IMongoCollection<CellarSenzorData> SenzorsData
        {
            get
            {
                return _database.GetCollection<CellarSenzorData>("SenzorsData");
            }
        }







        public async void InsertToSenzorData(string senzorId, string measurement, string value)
        {
            try
            {

                var filterBuilder = Builders<CellarSenzorData>.Filter;
                var filter = filterBuilder.Eq("SenzorId", senzorId) &
                    filterBuilder.Eq("Date", new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, 0, 0, DateTimeKind.Utc)) &
                    filterBuilder.Eq("Measurement", measurement);

                var update = Builders<CellarSenzorData>.Update.Push(p => p.values, value);

                //updatuje zaznam, kdyz neexistuje tak ho vytvori 
                var aaa = await SenzorsData.UpdateOneAsync(filter, update, new UpdateOptions() { IsUpsert = true });

                //Console.WriteLine(aaa.Values);

                //Console.WriteLine("MatchedCount: " + aaa.MatchedCount + " - ModifiedCount: " + aaa.ModifiedCount + " - UpsertId: " + aaa.UpsertedId);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

        }









        /// </// <summary>
        /// HELPER return and log exception
        /// </summary>
        public void LogException(Exception exception)
        {
            Guid errNo = Guid.NewGuid();

            StringBuilder sb = new StringBuilder();
            sb.AppendLine(errNo.ToString());
            sb.AppendLine(exception.Message);
            if (exception.InnerException != null)
                sb.AppendLine(exception.InnerException.Message);
            sb.AppendLine(exception.StackTrace);

            _logger.LogCritical(sb.ToString());
        }
    }
}