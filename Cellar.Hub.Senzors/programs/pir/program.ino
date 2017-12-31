
//Cellar libraries
#include <cellar_server.h>
#include <cellar_pubsubclient.h>
#include <cellar_helper.h>
#include <cellar_eeprom.h>

CellarServer myserver;
CellarPubSubClient mypubsub;
CellarEeprom myeeprom;

string subscribe_checkPir = "/check_Pir";
string senzoridstring = "x";

int ledPin = LED_BUILTIN;
int inputPin = D5;
int actual_val = 0;
int old_val = 0;

// MQTT subscribe callback
void mycallback(char *topic, byte *payload, unsigned int length);

void setup()
{
    // -------- FIRMWARE version ---------------
    myeeprom.save_firmware("CELLAR_Pir_0.0.3");
    //------------------------------------------

    senzoridstring = myeeprom.get_senzorid();

    mypubsub.set_Callback(mycallback);
    mypubsub.add_Subscribe(senzoridstring + subscribe_checkPir);

    myserver.start();
    mypubsub.start();

    pinMode(ledPin, OUTPUT);
    pinMode(inputPin, INPUT);
}

void loop()
{
    myserver.handle();
    if (!myserver.IS_AP_MODE)
    {
        mypubsub.updateTimer();

        actual_val = digitalRead(inputPin);

        if (actual_val == HIGH)
        {

            if (old_val == LOW)
            {
                digitalWrite(ledPin, LOW);

                Serial.println("Motion detected!");

                string valstr = int_to_string(actual_val);

                mypubsub.send_Pir(valstr);

                old_val = HIGH;
            }
        }
        else
        {

            if (old_val == HIGH)
            {
                digitalWrite(ledPin, HIGH);

                Serial.println("Motion ended!");

                string valstr = int_to_string(actual_val);

                mypubsub.send_Pir(valstr);

                old_val = LOW;
            }
        }
    }
}

/****************************************************************/
/*               CUSTOM CALLBACK FOR MQTT Subscribe                  */
/****************************************************************/
void mycallback(char *topic, byte *payload, unsigned int length)
{
    string str_actualTopic = string(topic);
    string str_CheckPirTopic = string(senzoridstring + subscribe_checkPir);

    if (str_actualTopic == str_CheckPirTopic)
    {
        //PIR CHECK
        int val = digitalRead(inputPin);
        string valstr = int_to_string(val);

        mypubsub.send_Pir(valstr);
    }
}