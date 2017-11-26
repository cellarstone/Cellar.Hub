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
    public class SpaceController : Controller
    {
        CellarHubService _service;

        ILogger<SpaceController> _log;


        public SpaceController(CellarHubService service, ILogger<SpaceController> log)
        {
            _log = log;
            _service = service;
            
        }


        

        [HttpGet]
        public CellarDTO GetAllCellarSpaces()
        {
            var result = _service.GetAllCellarSpaces();
            return result;
        }



        [HttpGet]
        public CellarDTO GetRootCellarSpaces()
        {
            var result = _service.GetRootCellarSpaces();
            return result;
        }

        [HttpPost]
        public CellarDTO GetCellarSpaces([FromBody]string path)
        {
            var result = _service.GetCellarSpaces(path);
            return result;
        }


        [HttpPost]
        public CellarDTO GetCellarSpace([FromBody]string id)
        {
            var result = _service.GetCellarSpace(id);
            return result;
        }


        [HttpPost]
        public CellarDTO AddCellarSpace([FromBody]CellarSpace item)
        {
            var result = _service.AddCellarSpace(item);
            return result;
        }


        [HttpPost]
        public CellarDTO RemoveCellarSpace([FromBody]CellarSpace item)
        {
            var result = _service.RemoveCellarSpace(item);
            return result;
        }


        [HttpPost]
        public CellarDTO UpdateCellarSpace([FromBody]CellarSpace item)
        {
            var result = _service.UpdateCellarSpace(item);
            return result;
        }






        [HttpGet]
        public CellarDTO GetAllCellarSenzors()
        {
            var result = _service.GetAllCellarSenzors();
            return result;
        }


        [HttpPost]
        public CellarDTO GetCellarSenzors([FromBody]string path)
        {
            var result = _service.GetCellarSenzors(path);
            return result;
        }


        [HttpPost]
        public CellarDTO GetCellarSenzor([FromBody]string id)
        {
            var result = _service.GetCellarSenzor(id);
            return result;
        }

        [HttpPost]
        public CellarDTO AddCellarSenzor([FromBody]CellarSenzor item)
        {
            var result = _service.AddCellarSenzor(item);
            return result;
        }

        [HttpPost]
        public CellarDTO RemoveCellarSenzor([FromBody]string item)
        {
            var result = _service.RemoveCellarSenzor(item);
            return result;
        }
        
        [HttpPost]
        public CellarDTO UpdateCellarSenzor([FromBody]CellarSenzor item)
        {
            var result = _service.UpdateCellarSenzor(item);
            return result;
        }


    }
}
