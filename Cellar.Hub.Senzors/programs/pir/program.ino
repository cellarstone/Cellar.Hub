
//Cellar libraries
#include <cellar_server.h>
#include <cellar_pubsubclient.h>
#include <cellar_helper.h>
#include <cellar_eeprom.h>

CellarServer myserver;
CellarPubSubClient mypubsub;
CellarEeprom myeeprom;

int ledPin = LED_BUILTIN;
int inputPin = D5;
int actual_val = 0;
int old_val = 0; 

void setup()
{
    // -------- FIRMWARE version ---------------
    myeeprom.save_firmware("CELLAR_PIR_0.0.1");
    //------------------------------------------

    myserver.start();
    mypubsub.start();

    pinMode(ledPin, OUTPUT);
    pinMode(inputPin, INPUT); 
}

void loop()
{
    myserver.handle();
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