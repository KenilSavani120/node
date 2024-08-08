import express from "express"
import jwt from 'jsonwebtoken'
const app = express()
const secretKey  = "secretkey"


app.use(express.json());


app.get("/",(req,res)=>{
    return res.json({message:"A simple App"})
})

// app.post('/',(req,res)=>{
//     const user = {
//         id:1,
//         username:"kenilsavani",
//         email:"abc"
//     }
//     jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
//         res.json({token})

//     })
// })

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const token = bearer[1]
        req.token = token
        next()
    }else{
        res.send({
            result : 'token in not valid'
        })
    }
}

app.post('/signup',(req,res)=>{
    const user = {
        id:1,
        username:"kenil savani",
        password:"Kenil@123",
        email:"abc"
    }
    jwt.sign({user},secretKey,{expiresIn:'300s'},(err,token)=>{
        res.json({token})

    })
})

app.post("/login",verifyToken,(req,res)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.send({result:"invalid token"})
        }else{
            res.json({message:"profile Accessed", authData},
                
            )
        }
    })    

})



app.listen(6000,()=>{
    console.log("App is Running on 6000 port");
    
})