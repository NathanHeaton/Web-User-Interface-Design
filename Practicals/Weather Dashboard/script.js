// Attach event listener to the submit button to trigger fetching weather data
document.getElementById('submitBtn').addEventListener('click', function() {
    // Retrieve the city name from the input field
    const city = document.getElementById('cityInput').value;
    // Call the function to fetch and display weather data for the specified city
    fetchWeatherData(city);
});

// Attach event listeners to sorting buttons for sorting by city name or temperature
document.getElementById('sortByCity').addEventListener('click', sortByCity);
document.getElementById('sortByTemp').addEventListener('click', sortByTemperature);
document.getElementById('sortByCondition').addEventListener('click', sortByCondition);

// Function to fetch weather data from OpenWeatherMap API for a given city
function fetchWeatherData(city) {
    // Your OpenWeatherMap API key (should be kept private and not hard-coded in production)
    const apiKey = '14b6af5f6e2a49e946076710b751d7b9';
    // Construct the API URL with the city name and API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json()) // Parse the JSON response
        .then(data => createWeatherLog(data)) // Pass the data to create a log entry
        .catch(error => console.error('Error:', error)); // Log errors to the console
}

// Function to generate a universally unique identifier (UUID)
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to create a log entry for the weather data
function createWeatherLog(data) {
    // Create DOM elements for the city name, temperature, and weather conditions
    const logEntry = document.createElement('li');
    const cityName = document.createElement('span');
    const temperature = document.createElement('span');
    const conditions = document.createElement('span');

    // Generate a unique ID for each log entry and enable drag-and-drop
    const uniqueId = uuidv4();
    logEntry.setAttribute('id', uniqueId);
    enableDragAndDrop(logEntry);

    // Assign class names for styling purposes
    cityName.className = "city";
    temperature.className = "temperature";
    conditions.className = "conditions";

    // Set the content of the elements based on the weather data
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    conditions.textContent = `Conditions: ${data.weather[0].main}`;

    // Add classes to the temperature based on its value for styling (e.g., color coding)
    temperature.classList.remove('cold', 'mild', 'hot');
    if(data.main.temp < 10) {
        temperature.classList.add('cold');
    } else if(data.main.temp >= 10 && data.main.temp < 25) {
        temperature.classList.add('mild');
    } else {
        temperature.classList.add('hot');
    }

    // Append the elements to the log entry and then to the log list
    logEntry.appendChild(cityName);
    logEntry.appendChild(temperature);
    logEntry.appendChild(conditions);
    document.getElementById('logList').appendChild(logEntry);

    // Animate the log entry's appearance using opacity
    logEntry.style.opacity = 0;
    setTimeout(() => logEntry.style.opacity = 1, 10);
}

// Function to enable drag-and-drop functionality for log entries
function enableDragAndDrop(logEntry) {
    logEntry.setAttribute('draggable', true);
    logEntry.addEventListener('dragstart', handleDragStart);
    logEntry.addEventListener('dragover', handleDragOver);
    logEntry.addEventListener('drop', handleDrop);
}

// Function to handle the drag start event
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.getAttribute('id'));
}

// Function to allow a drop by preventing the default handling of the event
function handleDragOver(event) {
    event.preventDefault();
}

// Function to handle the drop event, reordering log entries
function handleDrop(event) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    const droppedOn = event.target.closest('li');
    const list = droppedOn.parentNode;
    const draggedElement = document.getElementById(draggedId);
    list.insertBefore(draggedElement, droppedOn.nextSibling);
}

// Function to sort the weather log entries by city name
let citysort = true; //true for accending 

function sortByCity() {
    const logList = document.getElementById('logList');
    const logs = Array.from(logList.children);

    logs.sort((a, b) => {
        const cityA = a.querySelector('span.city').textContent;
        const cityB = b.querySelector('span.city').textContent;
        if (citysort == true)
        {
            return cityA.localeCompare(cityB);
        }
        else{
            return cityB.localeCompare(cityA);            
        }
    });

    logs.forEach(log => logList.appendChild(log)); // Re-append to apply the new order  
    citysort= !citysort;
}

// Function to sort the weather log entries by temperature

let tempSort = true; //true for accending 

function sortByTemperature() {
    const logList = document.getElementById('logList');
    const logs = Array.from(logList.children);

    logs.sort((a, b) => {
        const tempA = parseFloat(a.querySelector('span.temperature').textContent.split(':')[1]);
        const tempB = parseFloat(b.querySelector('span.temperature').textContent.split(':')[1]);
        if (tempSort == true)
        {
            document.getElementById("sortByTemp").innerHTML = "Sort by Temprature (accending)";
            return tempA - tempB;
        }
        else{
            document.getElementById("sortByTemp").innerHTML = "Sort by Temprature (decending)";
            return tempB - tempA;
        }
    });

    logs.forEach(log => logList.appendChild(log)); // Re-append to apply the new order
    tempSort = !tempSort; // swaps order
}

// Function to sort conditions
let conditionSort = true; //true for accending

function sortByCondition() {
    const logList = document.getElementById('logList');
    const logs = Array.from(logList.children);
    logs.sort((a, b) => {
        const conditionA = a.querySelector('span.conditions').textContent;
        const conditionB = b.querySelector('span.conditions').textContent;
        if (conditionSort == true)
        {
            document.getElementById("sortByCondition").innerHTML = "Sort by Condition (accending)";// tells user if it's the order it's in
            return conditionA.localeCompare(conditionB); // compares a to b                    
        }  
        else
        {
            document.getElementById("sortByCondition").innerHTML = "Sort by Condition (decending)";
            return conditionB.localeCompare(conditionA); // compares a to b            
        }   
       
    });

    logs.forEach(log => logList.appendChild(log)); // Re-append to apply the new order
    conditionSort = !conditionSort;// swaps order
    
}

