const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

searchBtn.addEventListener("click",async function() {
    const location = searchInput.value;
    if(location == "") {
        alert("Please enter a location.");
    } else {
        const data = await fetchWeatherData(location);

        if(data == null) {
            alert("Please enter a valid location.");
            return;
        }
        updateDOM(data);
        searchInput.value = "";
    }
});

async function fetchWeatherData(location) {
    const Url = `http://api.weatherapi.com/v1/current.json?key=053a62b02bb440dd92a165302250604&q=${location}&aqi=yes`;
    const DataResponse = await fetch(Url);

    if(DataResponse.status == 400) {
        return null;
    } else if(DataResponse.status == 200) {
        const json = await DataResponse.json();
        console.log(json);
        return json;
    }
}

function updateDOM(data) {
    console.log("function to update DOM data",data);

    /* After the conversion of data into json format. 
       1.) inspect the keyword for the data which you 
           wanted to update.
       2.) and then update the DOM with the data 
           using the keyword.
       3.) The data is in json format so you can access
           the data using the keyword and dot operator.
    */

    const temp = data.current.temp_c;
    const location = data.location.name;
    const condition = data.current.condition.text;
    const TimeDate = data.location.localtime;
    const [date,time] = TimeDate.split(" ");
    const iconLink = data.current.condition.icon;
    
    console.log("temperature: ", temp, "\nlocation: ", location, "\ndate", date, "\ntime", time, "\niconLink", iconLink);

    document.querySelector("#temperature").textContent = `${temp}°C`;
    document.querySelector("#location").textContent = location;
    document.querySelector("#date").textContent = date;
    document.querySelector("#time").textContent = time;
    document.querySelector("#icon").src = iconLink;
    document.querySelector("#condition").textContent = condition;   
}