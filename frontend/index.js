// Fetch dynamic Load Balancer IP from the config.js file
const loadBalancerIp = window.ENV.LOAD_BALANCER_IP || "http://localhost";
const addport = window.ENV.ADD_PORT || "3001";
const searchport = window.ENV.SEARCH_PORT || "3002";
const addPatientApiBaseUrl = `${loadBalancerIp}:${addport}/patients/add`;
const searchPatientApiBaseUrl = `${loadBalancerIp}:${searchport}/patients/search`;

document.getElementById('addPatientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;

    const data = { name, age, address };

    fetch(addPatientApiBaseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        alert('Patient added successfully!');
    })
    .catch(error => {
        console.error('Error adding patient:', error);
    });
});

document.getElementById('searchPatientForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const searchName = document.getElementById('searchName').value;

    fetch(`${searchPatientApiBaseUrl}?name=${searchName}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            alert('Patient found: ' + JSON.stringify(data[0]));
        } else {
            alert('Patient not found');
        }
    })
    .catch(error => {
        console.error('Error searching for patient:', error);
    });
});