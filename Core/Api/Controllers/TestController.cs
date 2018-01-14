using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System.IO;
using Microsoft.Extensions.Configuration;
using Serilog;
using Microsoft.Extensions.Logging;

namespace Cellar.Hub.Api.Controllers
{
    public class TestController : Controller
    {
        ILogger<TestController> _log;
        public TestController(ILogger<TestController> log)
        {
            _log = log;
            
        }

        [HttpGet]
        public void ThrowException()
        {
            throw new Exception("XXXXXXXXXXX");
        }

        [HttpGet]
        public int GetValue()
        {
            _log.LogInformation("Test of logging");
            return 5;
        }

        [HttpGet]
        public bool TestLogging()
        {
            _log.LogInformation("Test of logging");
            return true;
        }



    }
}
