package main

import (
	"github.com/Equanox/gotron"
	"log"
)

type Counter struct {
	value int

	Changed chan int
}

func NewCounter() *Counter {
	return &Counter{Changed: make(chan int)}
}

func (c *Counter) Plus() {
	c.value++
	c.emit()
}
func (c *Counter) Minus() {
	c.value--
	c.emit()
}

func (c *Counter) emit() {
	c.Changed <- c.value
}

// CounterUpdate is used to notify
// frontend when counter changed.
type CounterUpdate struct {
	*gotron.Event
	Value int `json:"value"`
}

func main() {

	counter := NewCounter()

	// Run gotron with ui in ui/build
	window, err := gotron.New("ui/build")
	if err != nil {
		log.Fatal(err)
	}

	done, err := window.Start()
	if err != nil {
		log.Fatal(err)
	}

	// Send value of counter to fronted.
	go func() {
		for {
			select {
			case value := <-counter.Changed:
				window.Send(&CounterUpdate{Event: &gotron.Event{Event: "update"}, Value: value})
			}
		}
	}()

	// Listen on plus/minus events from frontend.
	window.On(&gotron.Event{Event: "plus"}, func(bin []byte) {
		counter.Plus()
	})
	window.On(&gotron.Event{Event: "minus"}, func(bin []byte) {
		counter.Minus()
	})

	// Wait for window to close.
	<-done
}
