using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cellar.Hub.Core;
using Cellar.Hub.Core.Business;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System.IO;
using ImageCore = ImageProcessorCore;
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
        public int ThrowException()
        {
            throw new Exception("XXXXXXXXXXX");
        }



    }
}
