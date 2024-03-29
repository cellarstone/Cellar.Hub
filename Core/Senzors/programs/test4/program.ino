

int relayPin = D5;

void setup()
{
    Serial.begin(115200);

    pinMode(relayPin, OUTPUT);
}

void loop()
{

    Serial.println("LOW");
    digitalWrite(relayPin, LOW);

    delay(1000);

    Serial.println("HIGH");
    digitalWrite(relayPin, HIGH);

    delay(1000);

    // myserver.handle();
    // if (!myserver.IS_AP_MODE)
    // {
    //     mypubsub.updateTimer();
    // }
}

/****************************************************************/
/*               CUSTOM CALLBACK FOR MQTT Subscribe                  */
/****************************************************************/
// void mycallback(char *topic, byte *payload, unsigned int length)
// {
//     string str_actualTopic = string(topic);
//     string str_SetRelayTopic = string(senzoridstring + subscribe_setRelay);
//     string str_CheckRelayTopic = string(senzoridstring + subscribe_checkRelay);

//     if (str_actualTopic == str_SetRelayTopic)
//     {
//         string str_payload = "";
//         for (int i = 0; i < length; i++)
//         {
//             str_payload += (char)payload[i];
//         }

//         //RELAY ON-OFF
//         if (str_payload == "1")
//         {
//             digitalWrite(relayPin, LOW);
//             mypubsub.send_Relay(str_payload);
//         }
//         if (str_payload == "0")
//         {
//             digitalWrite(relayPin, HIGH);
//             mypubsub.send_Relay(str_payload);
//         }
//     }
//     else if (str_actualTopic == str_CheckRelayTopic)
//     {
//         //RELAY CHECK
//         int val = digitalRead(relayPin);
//         string valstr = int_to_string(val);

//         //HACK, because value is opaque of reality
//         // 0 = ON
//         // 1 = OFF
//         string resvalstr = "";
//         if (valstr == "0")
//         {
//             resvalstr = "1";
//         }
//         else if (valstr == "1")
//         {
//             resvalstr = "0";
//         }

//         mypubsub.send_Relay(resvalstr);
//     }
// }