# Services

### A service is a sub-system or server running from within the applications main server

- Any sub-system requiring a child-process should be placed here
- The socket server running here requires interfacing with the application directly, so it is running from within the same process
- Review the workings of the socket server to understand how to design a service that can interface with the main application.