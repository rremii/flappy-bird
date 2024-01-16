const {gameService} = require('./Game-service')


class SocketService {
    players = []
    interval = null
    // imageframe = 0

    connectionHandler = (ws, msg, aWss) => {
        // this.finish(ws, msg, aWss)

        // if (aWss.clients.has(ws)) return
        // debugger
        ws.sessionId = msg.sessionId
        this.broadcastConnection(ws, msg, aWss)
    }

    finish = (ws, msg, aWss) => {
        const winner = gameService.winner
        gameService.finish()
        // this.players = []
        clearInterval(this.interval)
        this.interval = null

        const response = {
            method: 'finish',
            sessionId: msg.sessionId,
            data: {
                winner
            }
        }
        this.broadcastConnection(ws, response, aWss)
    }

    makeDeadSound = (ws, msg, aWss) => {
        const response = {
            method: 'deadSound',
            sessionId: msg.sessionId,
        }
        this.broadcastConnection(ws, response, aWss)
    }
    makeScoreSound = (ws, msg, aWss) => {
        const response = {
            method: 'scoreSound',
            sessionId: msg.sessionId,
        }
        this.broadcastConnection(ws, response, aWss)
    }


    draw = (ws, msg, aWss) => {

        this.imageframe++
        if (this.imageframe >= 5) this.imageframe = 0

        const data = gameService.update(() => this.makeScoreSound(ws, msg, aWss), () => this.makeDeadSound(ws, msg, aWss))

        const response = {
            method: 'draw',
            sessionId: msg.sessionId,
            data
        }

        if (!data || !data?.birds || data?.birds.length === 0) return this.finish(ws, response, aWss)

        this.broadcastConnection(ws, response, aWss)
    }

    startHandler = (ws, msg, aWss) => {

        const data = gameService.start(this.players)

        this.interval = setInterval(() => this.draw(ws, msg, aWss), 25)


        const response = {
            method: 'start',
            sessionId: msg.sessionId,
            data
        }
        this.broadcastConnection(ws, response, aWss)
    }

    jumpHandler = (ws, msg, aWss) => {
        const {name} = msg.data

        gameService.jump(name)
    }


    joinHandler = (ws, msg, aWss) => {

        const player = {
            name: msg.data.name,
            color: msg.data.color,
            playerId: msg.data.playerId
        }

        this.players = this.players.filter(({playerId}) => playerId !== msg.data.playerId)

        this.players = [...this.players, player]

        const response = {
            method: 'join',
            sessionId: msg.sessionId,
            data: "player " + msg.data.name + ' joined'
        }

        this.broadcastConnection(ws, response, aWss)
    }

    broadcastConnection = (ws, msg, aWss) => {
        aWss.clients.forEach(client => {
            if (client.sessionId === msg.sessionId) {
                client.send(JSON.stringify(msg))
            }
        })
    }
}

module.exports = new SocketService()
