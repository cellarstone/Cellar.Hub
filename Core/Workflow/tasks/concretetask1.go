package tasks

type ConcreteTask1 struct {
	BaseTask
	Name string
}

func (t *ConcreteTask1) Execute() {

	// go func() {
	// 	<-t.ChannelClose
	// 	fmt.Println("closing ConcreteTask1")
	// 	close(t.ChannelOut)
	// }()

	// //STATUS CHANNEL
	// go func() {
	// 	for _ = range t.ChannelStatus {
	// 		t.ChannelStatus <- "OK"
	// 	}
	// }()

	// for item := range t.ChannelIn {
	// 	item += "1111111111"
	// 	//fmt.Println(item)
	// 	t.ChannelOut <- item
	// }

	for {
		select {
		case tempR := <-t.ChannelIn:
			tempR += "1111111111"
			t.ChannelOut <- tempR
		case _ = <-t.ChannelStatus:
			t.ChannelStatus <- "OK"
		case _ = <-t.ChannelClose:
			close(t.ChannelOut)
		}
	}
}
