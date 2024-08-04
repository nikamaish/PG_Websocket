### Polling
Polling can be defined as a method, which performs periodic requests regardless of the data that exists in the transmission. The periodic requests are sent in a synchronous way. The client makes a periodic request in a specified time interval to the Server. The response of the server includes available data or some warning message in it. So basically normal http request are the based on Polling, which checks whether Any msg is coming  or not?

### Websocket 
Create connection and its bi directional, it remains open until task done


# Socket.io
- Socket.IO is a library that enables real-time, bidirectional and event-based communication between web clients and servers. It consists of two parts: a client-side library that runs in the browser, and a server-side library for Node.js. Both components have nearly identical APIs.

Here’s a basic overview of how Socket.IO works:

## Architecture

### Connection Establishment:
Transport Protocols: Socket.IO supports multiple transport protocols, including WebSocket, which is the default, and HTTP long polling as a fallback. When a client attempts to connect, Socket.IO first tries to establish a WebSocket connection, and if that fails, it falls back to HTTP long polling.
Handshake: The client and server perform a handshake to establish the connection. This involves exchanging some initial data to set up the connection parameters.


### Communication:
Events: Communication between the client and server is event-driven. Both can emit and listen to events. For example, the client might emit an event called message to the server, and the server can listen for this event and respond accordingly.
Rooms and Namespaces: Socket.IO allows you to create rooms and namespaces to organize communication. Rooms allow you to broadcast messages to a subset of connected clients, while namespaces provide a way to segment communication channels on a single connection.

### Disconnection:
Graceful Disconnection: The client or server can gracefully disconnect by sending a specific event.
Unexpected Disconnection: If the connection is unexpectedly interrupted, Socket.IO attempts to reconnect automatically.

- If a WebSocket connection fails mid-session, Socket.IO has built-in mechanisms to handle such disruptions gracefully. Here's how it manages these scenarios:

- Automatic Reconnection
Socket.IO provides automatic reconnection capabilities. When a connection is lost, the client attempts to reconnect to the server at regular intervals. This process continues until the connection is re-established or a specified number of attempts are reached.

- Reconnection Events
Socket.IO emits specific events during the reconnection process, allowing you to handle these events and provide feedback to the user or take other actions.


I'm going to implement Websocket in Node.js using Socket.io
- Read tutorial point documentation
- Websocket Implementation
- HTML Implementation
- Redis Implementation

 
