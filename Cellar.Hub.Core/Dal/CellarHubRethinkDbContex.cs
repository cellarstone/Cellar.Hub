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

namespace Cellar.Hub.Core
{
    /// <summary>
    /// Store for users
    /// </summary>
    public class CellarHubRethinkDbContext
    {
        public string DatabaseName { get; set; } = "HubDatabase";

        public static string CellarHubRethinkDB_url = "cellar.hub.rethinkdb";

        public static RethinkDB R = RethinkDB.R;
        public static Connection conn;


        private readonly ILogger _logger;

        public CellarHubRethinkDbContext(
            ILogger<CellarHubRethinkDbContext> logger)
        {
            //this.ConnectionString = connString;
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
                throw new Exception("Can not access to db server.", ex);
            }
        }


        public void can_connect()
        {
            conn = R.Connection()
                .Hostname(CellarHubRethinkDB_url)
                .Port(28015)
                .Timeout(60)
                .Connect();

        }


        public void create_database()
        {
            List<string> tableNames = new List<string>();
            tableNames.Add("SenzorData");

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



        public void InsertToSenzorData(string senzorId, string measurement, string value)
        {
            try
            {
                //FIND
                var results = R.Db("HubDatabase").Table("SenzorData")
                .Filter(x => x["SenzorId"] == senzorId)
                .Filter(x => x["Date"] == new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, 0, 0, DateTimeKind.Utc))
                .Filter(x => x["Measurement"] == measurement)
                //.Update(x => x["Values"].Add(value))
                .RunResult<List<CellarSenzorData>>(conn);


                if (results.Count == 0)
                {
                    CellarSenzorData newOne = new CellarSenzorData();
                    newOne.SenzorId = senzorId;
                    newOne.Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, DateTime.Now.Hour, 0, 0, DateTimeKind.Utc);
                    newOne.Measurement = measurement;
                    newOne.Values = new List<string>();
                    newOne.Values.Add(value);

                    R.Db("HubDatabase").Table("SenzorData").Insert(newOne).Run(conn);
                }
                else
                {
                    var aaa = results.First();

                    //CHANGE
                    aaa.Values.Add(value);



                    //UPDATE
                    var updateResult = R
                    .Db("HubDatabase")
                    .Table("SenzorData")
                    .Update(aaa)
                    .RunResult(conn);

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