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
using Cellar.Hub.Api.Business;
using Cellar.Hub.Api.Models;

namespace Cellar.Hub.Api.Controllers
{
    public class MeetingsController : Controller
    {
        CellarMqttService _service;

        ILogger<MqttController> _log;

        public MeetingsController(CellarMqttService service, ILogger<MqttController> log)
        {
            _log = log;
            _service = service;
        }

        [HttpPost]
        public CellarDTO PublishToMqtt([FromBody]MqttVM vm)
        {
            // _log.LogError("Topic : " + vm.topic + ", Value : " + vm.value);

            var result = _service.PublishToMqtt(vm.topic, vm.value);
            return result;
        }


    }

}

