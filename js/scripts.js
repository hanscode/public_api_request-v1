/******************************************
Treehouse FSJS Techdegree:
Project 5 - Public API Requests
Author - Hans Steffens
******************************************/

const usersUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,picture,cell,dob,nat&nat=us';
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

fetch(usersUrl)
    .then(response => response.json())
    .then(data => getEmployees(data.results))
    .catch(error => console.log('Looks like there was a problem!', error))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function getEmployees(data) {
    data.map((employee, index) => {
        // Creating the elements needed to display the employee information.
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', index);
        gallery.appendChild(card);

        // insert the above cards elements
        card.insertAdjacentHTML("afterbegin",
            `<div class="card-img-container">
                 <img class="card-img" src="${employee.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        `);
        triggerModal(employee, index);

    }).join('');
}

function createModal(employee) {
    const modal = document.createElement('div');
    modal.className = 'modal-container';
    modal.insertAdjacentHTML("afterbegin", `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="modal-text">${employee.email}</p>
                <p class="modal-text cap">${employee.location.city}</p>
                <hr>
                <p class="modal-text">${employee.cell}</p>
                <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}., ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
                <p class="modal-text">Birthday:  ${getBirthdayFormat(employee.dob.date)}</p>
            </div>
        </div>
    `);
    body.insertBefore(modal, gallery.nextSibling);
    document.getElementById('modal-close-btn').addEventListener('click', e => modal.remove());
}

function getBirthdayFormat(date) {
    const dob = new Date(date);
    const month = dob.getMonth() + 1;
    const day = dob.getDate();
    const year = dob.getFullYear();
    return `${month}/${day}/${year}`;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

function triggerModal(employee, index) {
    const employeeID = document.getElementById(`${index}`);
    employeeID.addEventListener('click', (e) => createModal(employee));
}