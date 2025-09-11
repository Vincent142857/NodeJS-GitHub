// server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New client connected!");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString()); // { user: "...", text: "..." }
      console.log(`Message from ${data.user}: ${data.text}`);

      // Gửi lại cho tất cả client (broadcast)
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (err) {
      console.error("Invalid message format", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:8080");
