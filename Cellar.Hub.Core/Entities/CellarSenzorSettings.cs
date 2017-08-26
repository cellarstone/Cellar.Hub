using System.Collections.Generic;
using System.Security.Claims;

namespace Cellar.Hub.Core
{
    public class CellarSenzorSettings
    {
        public string WifiSSID { get; set; }
        public string WifiPassword { get; set; }

        public string MQTTUrl { get; set; }
        public string MQTTTopic { get; set; }

    }
}