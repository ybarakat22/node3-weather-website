const request = require('request')

const forecast = (latitude , longitude , callback)=> {

    const url = "http://api.weatherstack.com/current?access_key=681bf1b5526973daaf706eed4c88ceda&query="+latitude+","+longitude
    request({ url , json:true} , (error , {body})=>{

        if(error){
            callback('Unable to connect to location services',undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        }
        else {

            callback(undefined , body.current.weather_descriptions[0]+ ' .It is currently '+body.current.temperature+ ' degrees out, It feels like '+body.current.feelslike + ' degrees out.')
        }
            
    })

}















module.exports = forecast