require('dotenv').config()
const PORT = process.env.PORT || 8000
const path = require('path')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, '/client/build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname + '/client/build/index.html'));

})

app.listen(PORT,()=>{
    console.log("Server on port: "+PORT)
})