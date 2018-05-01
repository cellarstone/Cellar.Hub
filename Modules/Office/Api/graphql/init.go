package cellargraphql

import (
	"sync"

	"github.com/cellarstone/Cellar.Hub/Modules/Office/Api/service"
)

var MyService *service.OfficeApiService
var MyServiceLock sync.Mutex
