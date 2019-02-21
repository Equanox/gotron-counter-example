import * as React from 'react';
import { Button, Typography } from '@material-ui/core';
import * as styles from 'style.css'

declare var global: any;

interface RootProps {
}

interface RootState {
  counter: number
}

export class Root extends React.Component<RootProps, RootState> {
  private ws: WebSocket
  constructor(props: RootProps) {
    super(props);

    this.state = {
      counter: 0
    }
  }

  componentWillMount() {
    console.log("connecting ws")
    this.connectWebsocket("ws://localhost:" + global.backendPort + "/web/app/events")
  }

  connectWebsocket = async (endpoint: string) => {
    if (this.ws != undefined) {
      console.error("Websocket already connected")
      return
    }

    //Connect to Websocket
    this.ws = new WebSocket(endpoint);
    this.ws.binaryType = 'blob';

    this.ws.onopen = function () {
      console.log('Websocket Open');
    }
    this.ws.onerror = function (error: any) {
      console.error('WebSocket Error ' + error);
    }
    this.ws.onmessage = (e: any) => {
      let obj = JSON.parse(e.data)
      if (obj.event === "update") {
        this.setState({ ...this.state, counter: obj.value })
      }
      else {
        console.error("unknown message")
      }

    }
    this.ws.onclose = function () {
      console.log('Websocket Closed');
    }
  }


  render() {
    return (
      <div>
        <h1 className={styles.topic}>
          Gophers Stuttgart
        </h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            let obj = { "event": "plus" }
            this.ws.send(JSON.stringify(obj))
          }}
        >
          Plus +
         </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            let obj = { "event": "minus" }
            this.ws.send(JSON.stringify(obj))
          }}
        >
          Minus -
         </Button>
        <br />
        <br />
        <Typography>
          {
            "Counter: " + this.state.counter
          }
        </Typography>
      </div>
    )
  }
}

export default Root;


