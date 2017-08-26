using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Cellar.Hub.Core
{
    public class CellarSenzor
    {
        
        public string id { get; set; } = Guid.NewGuid().ToString();
        
        public string Name { get; set; }

        //Cellar Code/Type = Senzor1,Senzor2,Senzor3..OpenClose1..WaterPump1...etc
        public string Type { get; set; }

        public string Firmware { get; set; }

        public CellarSenzorSettings Settings {get;set;} = new CellarSenzorSettings();






        
        // GPS - latitude, longtitude
        // Country, City, Street


        // Height, Weight, Z = 3D view

        //GameObject

        


    }
}