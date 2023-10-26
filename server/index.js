import express from "express";
import logger from 'morgan'
import { Server } from "socket.io";
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from "@libsql/client";

dotenv.config()
const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server)

const db = createClient({
    url:"libsql://sincere-looker-gonzaleznacho.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE ID NOT EXISTS messages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conten TEXT
    )
`)

io.on('connection', (socket) => {
    console.log('a user has connected!')

    socket.on('disconnect', () => {
        console.log('an user has disconnected')
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

app.use(logger('dev'))

app.get('/', (req,res)=> {
    res.sendFile(process.cwd() + '/client/index.html')
})

app.get('/style.css', (req,res)=> {
    res.sendFile(process.cwd() + '/client/css/style.css')
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})