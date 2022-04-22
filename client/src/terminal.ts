import { Terminal } from "xterm";

var socket: any;
window.addEventListener(
  "load",
  function () {
    var terminalContainer = document.getElementById("terminal-container");
    var term = new Terminal({ cursorBlink: true });
    term.open(terminalContainer);
    term.fit();

    socket = io.connect();
    socket.on("connect", function () {
      term.write("\r\n*** Connected to backend***\r\n");

      // Browser -> Backend
      term.on("data", function (data) {
        //console.log(data);
        //                        alert("Not allowd to write. Please don't remove this alert without permission of Ankit or Samir sir. It will be a problem for server'");
        socket.emit("data", data);
      });

      // Backend -> Browser
      socket.on("data", function (data) {
        term.write(data);
      });

      socket.on("disconnect", function () {
        term.write("\r\n*** Disconnected from backend***\r\n");
      });
    });
  },
  false
);
