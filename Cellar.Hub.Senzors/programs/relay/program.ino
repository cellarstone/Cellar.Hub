
//Cellar libraries
#include <cellar_server.h>
#include <cellar_pubsubclient.h>
#include <cellar_helper.h>
#include <cellar_eeprom.h>

CellarServer myserver;
CellarPubSubClient mypubsub;
CellarEeprom myeeprom;

int relayPin = D5;
string subscribeTopic = "/relay";
string senzoridstring = "x";

void mycallback(char *topic, byte *payload, unsigned int length);

void setup()
{
    // -------- FIRMWARE version ---------------
    myeeprom.save_firmware("CELLAR_Relay_0.0.1");
    //------------------------------------------

    senzoridstring = myeeprom.get_senzorid();

    mypubsub.set_Callback(mycallback);
    mypubsub.set_Subscribe(senzoridstring + subscribeTopic);

    myserver.start();
    mypubsub.start();

    pinMode(relayPin, OUTPUT);
}

void loop()
{
    myserver.handle();
    mypubsub.updateTimer();
}



/****************************************************************/
/*               CUSTOM CALLBACK FOR Subscribe                  */
/****************************************************************/
void mycallback(char *topic, byte *payload, unsigned int length)
{
    string str_actualTopic = string(topic);
    string str_RelayTopic = string(senzoridstring + subscribeTopic);

    if (str_actualTopic == str_RelayTopic)
    {
        string str_payload = "";
        for (int i = 0; i < length; i++)
        {
            str_payload += (char)payload[i];
        }

        //RELAY ON-OFF
        if(str_payload == "1"){
            digitalWrite(relayPin, LOW);
        }
        if(str_payload == "0"){
            digitalWrite(relayPin, HIGH);
        }
    }
}