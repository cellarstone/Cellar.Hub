#include <cellar_server.h>

using namespace std;

CellarServer myserver;

void setup()
{
    Serial.begin(115200);

    myserver.start();
}

void loop()
{
    myserver.handle();
}