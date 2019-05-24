const express = require('express')
const bodyparser = require('body-parser')
const app= express()
const port = 3000
let count =0; //global variable

app.use(bodyparser.json())
app.post('/messages',(req,res)=>{
    if(req.body.hasOwnProperty('text')=== true) {
      if( count <5 ){
        console.log('req.body: text', req.body)
        count ++;
        console.log(count);
        res.status(200).json({
          message:'you have a text in your request!!'
        })
      } else {
        res.status(500).json({
          message:'Internal server error'
        })
      } 
      
    }
    else{
      res.status(400).json({
        message:'Bad Request'
      })
    }
    
})

app.listen(port , ()=>console.log(`Message-api listening on port ${port}`))