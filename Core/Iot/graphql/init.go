package cellargraphql

import (
	"sync"

	"github.com/cellarstone/Cellar.Hub/Core/Iot/service"
)

var MyService *service.IotService
var MyServiceLock sync.Mutex
