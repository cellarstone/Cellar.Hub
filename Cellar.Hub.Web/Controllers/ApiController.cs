using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Cellar.Hub.Core;

namespace Cellar.Hub.Web
{
    public class ApiController : Controller
    {
        CellarHubDbContext _db;

        public ApiController(CellarHubDbContext db)
        {
            _db = db;
        }

        


        [HttpPost]
        public CellarDTO GetCellarSpace([FromBody]int id)
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
