/******************************************
Treehouse FSJS Techdegree:
Project 5 - Public API Requests
Author - Hans Steffens
******************************************/

const usersUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,picture,nat&nat=us';
const gallery = document.querySelector('.gallery');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch(usersUrl)
  .then(response => response.json())
  .then(data => {
    generateHTML(data.results);
    console.log(data.results);
  })


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function generateHTML(data) {

    for (let i = 0; i < data.length; i++) {  
        let employee = document.createElement('div');
        employee.className = 'card';
        gallery.appendChild(employee);
        // insert the above elements
        employee.insertAdjacentHTML("afterbegin",
           `<div class="card-img-container">
                 <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        `);
    }
}