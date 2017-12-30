
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

int inputPin = D5;
int actual_temperature = 0;
int actual_humidity = 0;
int oldval_temperature = 0;
int oldval_humidity = 0;
DHT mojeDHT(inputPin, DHT11);

void setup()
{
    // -------- FIRMWARE version ---------------
    myeeprom.save_firmware("CELLAR_DHT11_0.0.1");
    //------------------------------------------

    myserver.start();
    mypubsub.start();

    mojeDHT.begin();
}

void loop()
{
    myserver.handle();
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
