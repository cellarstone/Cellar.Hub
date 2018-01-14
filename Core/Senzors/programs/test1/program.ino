
//Internal libraries
#include <cellar_pubsubclient.h>

using namespace std;

CellarPubSubClient mypubsub;

void setup()
{
    Serial.begin(115200);

    mypubsub.Start();
}

void loop()
{
    mypubsub.UpdateTimer();
}