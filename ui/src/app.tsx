
import * as React from 'react';
import * as ReactDOM from "react-dom";

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Root } from 'root';

//let port = process.argv[2]
//console.log()

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "rgba(255, 255, 255, 0.5)",
      default: "rgba(250, 250, 250, 0.5)"
    },
    secondary: {
      light: "rgba(236, 239, 241, 0.2)",
      main: "rgba(176, 190, 197, 0.2)",
      dark: "rgba(144, 164, 174, 0.2)",
      contrastText: "rgba(0, 0, 0, 1)"
    },
    primary: {
      light: "rgba(38, 166, 154, 1)",
      main: "rgba(0, 137, 123, 1)",
      dark: "rgba(0, 77, 64, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});


const id = 'reactRoot'
let body = document.getElementsByTagName("body")[0];
let reactRoot = document.createElement("div");
reactRoot.id = id
body.appendChild(reactRoot);

ReactDOM.render(
  <div>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Root />
    </MuiThemeProvider>
  </div>,
  document.getElementById(id)
);

