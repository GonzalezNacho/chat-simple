import express from "express";
import logger from 'morgan'

const port = process.env.PORT ?? 3000

const app = express()
app.use(logger('dev'))

app.get('/', (req,res)=> {
    res.sendFile(process.cwd() + '/client/index.html')
})

app.get('/style.css', (req,res)=> {
    res.sendFile(process.cwd() + '/client/css/style.css')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})