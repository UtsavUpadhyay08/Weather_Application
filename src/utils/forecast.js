const request = require("request")

const forecast = (address, callback)=>{
    const url= "http://api.weatherapi.com/v1/current.json?key=64cd797da7bd44e39ea101100220209&q="+encodeURIComponent(address)+"&aqi=no"
    request({url, json:true},(error,{body})=>{
        if(error){
            callback({error:"Unable to connect to location services."},undefined)
        }else if(body.error){
            callback({error:"Unable to find location"},undefined)
        }else{
            callback(undefined,{
                text: body.current.condition.text,
                precip: body.current.precip_mm
            })
        }
    })
}


module.exports= forecast