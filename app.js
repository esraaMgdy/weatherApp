window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.getElementById("temperature-description");
    let temperatureDegree = document.getElementById("temperature-degree");
    let locationTimezone = document.getElementById("location-timezone");


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Cairo%2C%20C%2C%20EG?unitGroup=metric&key=YK9MHUPC83Y5BUU6JKVDZ44G2`;

            fetch(api)
                .then(Response =>{
                    return Response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp, conditions, icon } = data.currentConditions;
                    
                    //set DOM elements from the api
                    temperatureDegree.innerHTML = data.currentConditions.temp;
                    temperatureDescription.innerHTML = data.currentConditions.conditions;
                    locationTimezone.innerHTML = data.timezone;

                    //set icon
                    setIcons(icon, document.getElementById("icon"));
                });
        });
    } 




    function setIcons(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});