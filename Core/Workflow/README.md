# Dodelat

- status pro kazdou spustenou goroutine (task) + workflow
provolam workflow, on provola kazdy task a zpet posle stav


- store = ukladani workflow 
muze byt stejne jako jsou requesty na spusteni

```JSON
{
	"workflowtype": "workflow1",
	"name": "test1",
	"params": {
		"triggertype": "mqtt",
		"topic": "randomValues1"
	}
}
``` 

nebo 


```JSON
{
	"workflowtype": "rand2mqtt",
	"name": "randomValues1",
	"params": {
		"triggertype": "time"
	}
	
}
``` 


- store = nacitani workflow z DB pri startu