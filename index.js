const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000
const fs = require('fs')
const path = require('path')
const SocketController = require('./Socket-controller')

app.use(cors())
app.use(express.json())

app.ws('/', (ws) => {
    ws.on('message', (msg) => SocketController.onMessage(msg, ws, aWss))
})

// app.post('/image', (req, res) => {
//     try {
//         const img = req.body.img
//
//         const data = img.replace(`data:image/png;base64,`, '')
//         fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`), data, 'base64')
//         return res.status(200).json({message: "Загружено"})
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('error')
//     }
// })
// app.get('/image', (req, res) => {
//     try {
//
//
//         if (!fs.existsSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))) res.json('file does not exist')
//
//         const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
//         const data = `data:image/png;base64,` + file.toString('base64')
//         res.json(data)
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json('error')
//     }
// })

app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))



