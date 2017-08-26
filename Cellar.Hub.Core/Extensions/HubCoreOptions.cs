namespace Cellar.Hub.Core
{
    public class HubCoreOptions
    {
        public string mosquittoMqttConnectionString { get; set; }
        public string mongoDbConnectionString { get; set; }
        public string rethinkDbConnectionString { get; set; }
    }
}
