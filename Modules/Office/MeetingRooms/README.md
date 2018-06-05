
This is application for meeting rooms

# Run development

```Shell
ng serve --port 44511
```

# Run PWA

```Shell
ng build --prod
node server.js
```

# Run production (in docker)

```Shell
docker build -t cellar.office.meetingrooms .
docker run -d -p 44511:44511 -t cellar.office.meetingrooms
```



# K2 - Exchange GraphQL


## Send Mail

GQL
```JS
mutation SendMailMethod($in: SendMailInput!) {
  sendMail(input: $in)
}
```

Input
```JSON
{ 
  "in": {
    "recipients": ["lukas.kellerstein@alza.cz"],
    "subject": "Test mail",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
}
```

## Create Meeting

GQL
```JS
mutation CreateMeetingMethod($in: CreateMeetingInput!) {
  createMeeting(input: $in)
}
```

Input
```JSON
{ 
  "in": {
    "attendeeMails": ["lukas.kellerstein@alza.cz", "jednacka.butan@alza.cz"],
    "start": "1.1.2018 22:00:00",
    "end": "1.1.2018 22:15:00",
    "location": "Jednačka Butan 10",
    "subject": "Test Meeting :-)",
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
}
```


## Get Room Lists

GQL
```JS
query GetRoomLists {
  roomLists
}
```

Result
```JSON
{
  "data": {
    "roomLists": [
      "bratislavaroomlist@alza.cz",
      "hallroomlist@alza.cz",
      "jatecniroomlist@alza.cz",
      "lcsroomlist@alza.cz",
      "ostravaroomlist@alza.cz",
      "vgproomlist@alza.cz"
    ]
  },
  "metadata": {
    "authorization": {
      "restrictions": []
    }
  }
}
```

## Get Rooms (from specific room list)

GQL
```JS
query GetRooms($in: String) {
  rooms(roomList: $in)
}
```

Input
```JSON
{
  "in": "hallroomlist@alza.cz"
}
```


## Get Info about Free/Busy state of user (email address)


GQL
```JS
  query GetInfoMethod($in: GetInfoInput!) {
    info(input: $in){
      status,
      subject,
      location,
      start,
      end
    }
  }
```

Input

> WARNING ! - date format must be yyyy-MM-ddTHH:mm:ssZ
> TIME WINDOW MUST BE MINIMAL 24hours !!!


```JSON
{ 
  "in": {
    "attendeeMails": ["jednacka.butan@alza.cz"],
    "start": "2018-04-05T00:00:00Z",
    "end": "2018-04-06T12:30:00Z",
	"goodSuggestionThreshold": 49,
	"maximumNonWorkHoursSuggestionsPerDay": 0,
	"maximumSuggestionsPerDay": 48,
	"meetingDuration": 60,
	"minimumSuggestionQuality": 0,
	"requestedFreeBusyView": 4
  }
}
```