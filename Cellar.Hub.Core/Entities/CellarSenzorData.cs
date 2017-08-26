using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Cellar.Hub.Core
{
    public class CellarSenzorData
    {
        
        public string id { get; set; } = Guid.NewGuid().ToString();
        
        public string senzorId { get; set; }

        public string measurement { get; set; }

        public List<string> values { get; set; }

        public DateTime date {get; set;}


    }
}