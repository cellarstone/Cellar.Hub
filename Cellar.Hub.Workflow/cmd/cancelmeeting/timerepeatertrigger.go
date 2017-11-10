package main

import (
	"math/rand"
	"strconv"
	"time"
)

func RunTimeRepeaterTrigger(numberOfSeconds int) {

	go func() {
		for {
			time.Sleep(time.Duration(numberOfSeconds) * time.Second)
			randomNumberFloat := rand.Float64() * 1000

			//send value to the channel
			workflowIn <- strconv.FormatFloat(randomNumberFloat, 'E', -1, 64)
		}
		close(workflowIn)
	}()
}
