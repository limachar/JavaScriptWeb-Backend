const cors = require("cors")
const express = require("express")
const rug = require('random-username-generator');



const app = express()
const PORT = process.env.PORT || 3000
let messages = ["hello world"]
let users = {};
app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.urlencoded({
    extended : true}));
app.use(cors())
app.get('/', (req, res)=>{
    headers={
        "http_status":200, "cache-control": "no-cache"}
    body={
        "status": "available"}
    res.status(200).send(body)
    
})
app.post('/messages', (req,res) =>{
    const message = req.body

    console.log(message)
    messages.push(message)

    res.send('message added')
})
app.get('/message', (req, res) =>{
    res.json(messages)
})

app.get('/auth', (req, res) => {
    let user = rug.generate();
    users[user] = 0
    res.status(200).send({"user":user})
 });

app.listen(PORT, ()=>{
    console.log(`STARTED LISTENING ON PORT ${PORT}`)});
