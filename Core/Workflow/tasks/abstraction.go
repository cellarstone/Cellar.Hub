package tasks

type Task interface {
	Execute()
}

type BaseTask struct {
	ChannelIn     chan string
	ChannelOut    chan string
	ChannelStatus chan string
	ChannelClose  chan string
}
