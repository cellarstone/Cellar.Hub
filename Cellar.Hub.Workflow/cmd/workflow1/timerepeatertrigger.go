package main

import (
	"errors"
	"math/rand"
	"strconv"
	"time"
)

func RunTimeRepeaterTrigger(numberOfSeconds int) {

	go func() {

		var exceptionCount = 0

		for {
			time.Sleep(time.Duration(numberOfSeconds) * time.Second)
			randomNumberFloat := rand.Float64() * 1000

			// logger.Information("BBB0") //funguje, jen kdyz to je DLogger
			// log.Println("BBB1")        //nefunguje
			// fmt.Println("BBB2")        //funguje

			if exceptionCount == 120 {
				errTest := errors.New("TEST PANIC time repeater")
				panic(errTest)
			}
			exceptionCount++

			//send value to the channel
			workflowIn <- strconv.FormatFloat(randomNumberFloat, 'E', -1, 64)
		}
	}()
}
