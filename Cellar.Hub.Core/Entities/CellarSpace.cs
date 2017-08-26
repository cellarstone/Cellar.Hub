using System.Collections.Generic;
using System.Security.Claims;

namespace Cellar.Hub.Core
{
    public class CellarSpace
    {
        
        public string Id { get; set; }

        
        public string Name { get; set; }

        // Building, Room, Floor, Land
        public string Type { get; set; }


        public ICollection<CellarSenzor> Senzors {get;set;} = new List<CellarSenzor>();

public ICollection<CellarSpace> Subspaces {get;set;} = new List<CellarSpace>();

        
        // GPS - latitude, longtitude
        // Country, City, Street


        // Height, Weight, Z = 3D view

        //GameObject

        


    }
}