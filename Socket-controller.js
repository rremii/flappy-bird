const SocketService = require('./Socket-service')

class SocketController {

    async onMessage(msg, ws, aWss) {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                SocketService.connectionHandler(ws, msg, aWss)
                break
            case "start":
                SocketService.startHandler(ws, msg, aWss)
                break
            case "join":
                SocketService.joinHandler(ws, msg, aWss)
                break
            case "jump":
                SocketService.jumpHandler(ws, msg, aWss)
                break
        }
    }


}

module.exports = new SocketController()
