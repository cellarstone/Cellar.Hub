using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cellar.Hub.Core;

namespace Cellar.Hub.Api.Controllers
{
    // [Route("[controller]")]
    public class ApiController : Controller
    {
        CellarHubMongoDbContext _db;

        public ApiController(CellarHubMongoDbContext db)
        {
            _db = db;
        }


        [HttpGet]
        public int GetValue()
        {
            return 5;
        }


        [HttpGet]
        public CellarDTO GetCellarSpace()
        {


            CellarSpace newOne = new CellarSpace();
            newOne.Name = "HALL";
            newOne.Type = CellarSpaceType.Building;

            _db.Spaces.InsertOne(newOne);



            return CellarDTO.Ok();
        }

        [HttpPost]
        public CellarDTO AddCellarSpace([FromBody]CellarSpace space)
        {
            return CellarDTO.Ok();
        }

        [HttpPost]
        public CellarDTO RemoveCellarSpace([FromBody]int id)
        {
            return CellarDTO.Ok();
        }

        [HttpPost]
        public CellarDTO UpdateCellarSpace([FromBody]CellarSpace space)
        {
            return CellarDTO.Ok();
        }
    }
}
