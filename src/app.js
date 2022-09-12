const express= require('express')
const path= require('path')
const hbs=require('hbs')
const forecast= require('./utils/forecast.js')
const { createSecureContext } = require('tls')

const app= express()
console.log(__dirname)

const publicpath=path.join(__dirname,'../public')
const viewpath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
// console.log(viewpath)

app.set('views',viewpath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicpath))

app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name: "Precipitation chances"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Page",
        name: "The chances of rain. "
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help Page",
        name: "God helps those who help themselves"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: "Provide an address"
        })
    }else{
        forecast(req.query.address,(error,data)=>{
            if(error){
                return res.send(error)
            }
            return res.send(data)
        })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('help-error',{
        title: "Not Found",
        name : "Help-article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404 Error",
        name: "Page not found"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})