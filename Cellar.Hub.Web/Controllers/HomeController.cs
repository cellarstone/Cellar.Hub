using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Cellar.Hub.Web
{
  public class HomeController : Controller
  {
    [HttpPost]
    public ActionResult MyTest()
    {
      return Json("Tohel je muj test");
    }
  }
}