
//Cellar libraries
#include <cellar_server.h>
#include <cellar_pubsubclient.h>
#include <cellar_helper.h>
#include <cellar_eeprom.h>

//Senzor libraries
#include <DHT_U.h>
#include <DHT.h>

CellarServer myserver;
CellarPubSubClient mypubsub;
CellarEeprom myeeprom;

string subscribe_checkTemperature = "/check_Temperature";
string subscribe_checkHumidity = "/check_Humidity";
string senzoridstring = "x";

int inputPin = D5;
int actual_temperature = 0;
int actual_humidity = 0;
int oldval_temperature = 0;
int oldval_humidity = 0;
DHT mojeDHT(inputPin, DHT11);

// MQTT subscribe callback
void mycallback(char *topic, byte *payload, unsigned int length);

void setup()
{
    // -------- FIRMWARE version ---------------
    myeeprom.save_firmware("CELLAR_DHT11_0.0.3");
    //------------------------------------------

    senzoridstring = myeeprom.get_senzorid();

    mypubsub.set_Callback(mycallback);
    mypubsub.add_Subscribe(senzoridstring + subscribe_checkTemperature);
    mypubsub.add_Subscribe(senzoridstring + subscribe_checkHumidity);

    myserver.start();
    mypubsub.start();

    mojeDHT.begin();
}

void loop()
{
    myserver.handle();
    if (!myserver.IS_AP_MODE)
    {
        mypubsub.updateTimer();

        actual_temperature = mojeDHT.readTemperature();
        actual_humidity = mojeDHT.readHumidity();

        if (actual_temperature < 999 && actual_temperature != oldval_temperature)
        {
            Serial.print("temp: ");
            Serial.println(actual_temperature);

            string valstr = int_to_string(actual_temperature);

            mypubsub.send_Temperature(valstr);

            oldval_temperature = actual_temperature;
        }

        if (actual_humidity < 999 && actual_humidity != oldval_humidity)
        {
            Serial.print("vlh: ");
            Serial.println(actual_humidity);

            string valstr = int_to_string(actual_humidity);

            mypubsub.send_Humidity(valstr);

            oldval_humidity = actual_humidity;
        }
    }
}

/****************************************************************/
/*               CUSTOM CALLBACK FOR MQTT Subscribe                  */
/****************************************************************/
void mycallback(char *topic, byte *payload, unsigned int length)
{
    string str_actualTopic = string(topic);
    string str_CheckTemperatureTopic = string(senzoridstring + subscribe_checkTemperature);
    string str_CheckHumidityTopic = string(senzoridstring + subscribe_checkHumidity);

    if (str_actualTopic == str_CheckTemperatureTopic)
    {
        //TEMPERATURE CHECK
        float val = mojeDHT.readTemperature();
        string valstr = float_to_string(val);

        mypubsub.send_Temperature(valstr);
    }
    else if (str_actualTopic == str_CheckHumidityTopic)
    {
        //HUMIDITY CHECK
        float val = mojeDHT.readHumidity();
        string valstr = float_to_string(val);

        mypubsub.send_Humidity(valstr);
    }
}