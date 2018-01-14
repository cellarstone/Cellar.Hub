
//Cellar libraries
#include <cellar_server.h>
#include <cellar_pubsubclient.h>

using namespace std;

CellarServer myserver;
CellarPubSubClient mypubsub;

void setup()
{
    Serial.begin(115200);

    myserver.start();
    mypubsub.start();
}

void loop()
{
    myserver.handle();
    mypubsub.updateTimer();
}