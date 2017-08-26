// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System;
using RethinkDb.Driver;
using RethinkDb.Driver.Ast;
using RethinkDb.Driver.Net;
using Microsoft.Extensions.Logging;
using System.Text;
using Microsoft.Extensions.Options;

namespace Cellar.Hub.Core
{
    /// <summary>
    /// Store for users
    /// </summary>
    public class CellarHubRethinkDbContext
    {
        private readonly HubCoreOptions _options;

        public string DatabaseName { get; set; } = "HubDatabase";

        public RethinkDB R = RethinkDB.R;
        public Connection conn;


        private readonly ILogger _logger;

        public CellarHubRethinkDbContext(IOptions<HubCoreOptions> options,
                                        ILogger<CellarHubRethinkDbContext> logger)
        {
            if (options == null)
            {
                throw new ArgumentNullException(nameof(options));
            }
            _options = options.Value;
            _logger = logger;

            try
            {
                //rethinkdb
                can_connect();
                create_database();

            }
            catch (Exception ex)
            {
                LogException(ex);
                throw new Exception("Can not access to rethink db server.", ex);
            }
        }


        public void can_connect()
        {
            Console.WriteLine("---" + _options.rethinkDbConnectionString + "---");

            conn = R.Connection()
                .Hostname(_options.rethinkDbConnectionString)
                .Port(28015)
                .Timeout(60)
                .Connect();

        }


        public void create_database()
        {
            List<string> tableNames = new List<string>();
            tableNames.Add("SenzorData");
            tableNames.Add("Spaces");

            //create database
            var resultDb = R.DbList().RunAtom<List<string>>(conn);
            if (!resultDb.Contains(DatabaseName))
            {
                R.DbCreate(DatabaseName).Run(conn);
            }

            //create tables
            var resultTable = R.Db(DatabaseName).TableList().RunAtom<List<string>>(conn);

            foreach (var item in tableNames)
            {
                if (!resultTable.Contains(item))
                {
                    R.Db(DatabaseName).TableCreate(item).Run(conn);
                }
            }



        }


        public List<CellarSpace> GetSpaces()
        {
            try
            {


                Cursor<CellarSpace> asdf = R.Db("HubDatabase").Table("Spaces").Run<CellarSpace>(conn);

                List<CellarSpace> foo = asdf.ToList();


                return foo;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }


        public async void InsertToSenzorData(string senzorId, string measurement, string value)
        {

            try
            {

                var utcnow = DateTime.UtcNow;
                var localTime = DateTime.Now;

                //FIND - podle local time
                var results = await R.Db("HubDatabase").Table("SenzorData")
                .Filter(x => x["senzorId"] == senzorId)
                .Filter(x => x["date"] == new DateTime(utcnow.Year, utcnow.Month, utcnow.Day, utcnow.Hour, 0, 0, DateTimeKind.Utc))
                .Filter(x => x["measurement"] == measurement)
                .RunResultAsync<List<CellarSenzorData>>(conn);

                var results2 = await R.Db("HubDatabase").Table("SenzorData")
                .Filter(x => x["senzorId"] == senzorId)
                .Filter(x => x["date"] == new DateTime(localTime.Year, localTime.Month, localTime.Day, localTime.Hour, 0, 0, DateTimeKind.Local))
                .Filter(x => x["measurement"] == measurement)
                .RunResultAsync<List<CellarSenzorData>>(conn);

                var results3 = await R.Db("HubDatabase").Table("SenzorData")
                .Filter(x => x["senzorId"] == senzorId)
                // .Filter(x => x["date"] == new DateTime(utcnow.Year, utcnow.Month, utcnow.Day, utcnow.Hour, 0, 0, DateTimeKind.Local))
                .Filter(x => x["measurement"] == measurement)
                .RunResultAsync<List<CellarSenzorData>>(conn);


                if (results2.Count == 0)
                {
                    CellarSenzorData newOne = new CellarSenzorData();
                    newOne.senzorId = senzorId;
                    newOne.date = new DateTime(utcnow.Year, utcnow.Month, utcnow.Day, utcnow.Hour, 0, 0, DateTimeKind.Utc);
                    newOne.measurement = measurement;
                    newOne.values = new List<string>();
                    newOne.values.Add(value);

                    var aaa = R.Db("HubDatabase").Table("SenzorData").Insert(newOne).Run(conn);
                }
                else
                {
                    var aaa = results2.First();

                    //CHANGE
                    aaa.values.Add(value);



                    //UPDATE
                    var updateResult = await R
                    .Db("HubDatabase")
                    .Table("SenzorData")
                    .Update(aaa)
                    .RunResultAsync(conn);

                }

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