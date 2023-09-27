/******************************************
Treehouse FSJS Techdegree:
Project 5 - Public API Requests
Author - Hans Steffens
******************************************/

const usersUrl = 'https://randomuser.me/api/?results=12&inc=name,email,location,picture,cell,dob,nat&nat=us';
const search = document.querySelector('.search-container');
const h1 = document.querySelector('h1');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

/**
 * Asycn function that uses a fetch() call
 * to get data and return a response in json format.
 * @param {string} url - the ramdonuser.me endpoint url.
 */
async function getJSON(url) {
    const response = await fetch(url);
    const users = await response.json();
    return users;
}


/**
 * Using the getJSON() function to get 12 ramdom users data.
 */
getJSON(usersUrl)
    .then(data => getEmployees(data.results))
    .catch(error => console.log('Looks like there was a problem!', error))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

/**
 * Loops through the data and appends
 * the data according to the mockups referred in the index.html
 * @param {object} data - data from the Random User Generator API.
 */
function getEmployees(data) {
    data.map((employee, index) => {
        // Creating the elements needed to display the employee information.
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('id', index); // Adds the index element value as identifier for each card.
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
        // Function that triggers/opens a modal once a correspond card is clicked
        triggerModal(employee, data, index);

    }).join('');
}

/**
 * Creates a modal window and appends to the page.
 * Adds a click event to the close, prev and next buttons.
 * @param {object} employee - data on individual ramdon user/employee.
 * @param {object} data - all the Random User Generator API data.
 * @param {object} index - current user/employee index.
 */
function createModal(employee, data, index) {
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
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    `);
    // Appends the modal HTML after the gallery div element and before the `<script>` tag.
    body.insertBefore(modal, gallery.nextSibling);

    // Show/Hide next and prev buttons according to the index value.
    const next = document.getElementById('modal-next');
    const prev = document.getElementById('modal-prev');
    if (index >= 11) {
        next.style.display = 'none';
    } else if (index == 0) {
        prev.style.display = 'none';
    } else {
        next.style.display = 'inline-block';
        prev.style.display = 'inline-block';
    }

    // Event Listener for displaying the next employee modal on the list.
    next.addEventListener('click', e => {
        let nextModal = data[index += 1];
        modal.remove();
        createModal(nextModal, data, index);
    });

    // Event Listener for displaying the previous employee modal on the list.
    prev.addEventListener('click', e => {
        let prevModal = data[index -= 1];
        modal.remove();
        createModal(prevModal, data, index);
    });

    // Event listener for closing the modal after click on the close button.
    document.getElementById('modal-close-btn').addEventListener('click', e => modal.remove());
}

/**
 * Formatting the Birthday data to MM/DD/YYYY.
 * @param {string} date - Date of birth `dob` to be formated.
 * @return {string} - formated date.
 */
function getBirthdayFormat(date) {
    const dob = new Date(date);
    // The getMonth() method gets the month as a number (0-11). Hence it's necessary to add 1 to the returned value.
    const month = dob.getMonth() + 1;
    const day = dob.getDate();
    const year = dob.getFullYear();
    return `${month}/${day}/${year}`;
}

/**
 * Appends search form to the page and based of the sample markup included in the index.html
 */
function appendSearch() {
    const form = `<form action="#" method="get">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                </form>`;
    search.innerHTML = form;
}

appendSearch();

/**
 * Arrow funtion that allows the user to search/filter for a specific employee in the employees directory!
 */
const filterEmployees = (e) => {
    let currentValue = e.target.value.toLowerCase();
    let employees = document.querySelectorAll('h3.card-name');
    let addText = '';
    const results = [];

    employees.forEach(employee => {
        if (employee.textContent.toLocaleLowerCase().includes(currentValue)) {
            employee.parentNode.parentNode.style.display = 'flex';
            results.push(employee);
        } else {
            employee.parentNode.parentNode.style.display = 'none';
        }
    });
    // If no matches are found for an employee search, display a “No results found” text message on the page.
    if (results.length === 0) {
        addText = 'no results found';
        h1.textContent = addText.toUpperCase();
    } else {
        addText = 'awesome startup employee directory';
        h1.textContent = addText.toUpperCase();
    }
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

/**
 * Click event to trigger the modal.
 * @param {object} employee - the individual employee data.
 * @param {object} data - all the Random User Generator API data.
 * @param {object} index - the current employee index.
 */
function triggerModal(employee, data, index) {
    const employeeID = document.getElementById(`${index}`);
    employeeID.addEventListener('click', (e) => createModal(employee, data, index));
}

// Event Handler for displaying the filtered employees.
const employeeSearch = document.getElementById('search-input');
employeeSearch.addEventListener('keyup', filterEmployees);

// Event listener to prevent the default behaviour of re-load the page on submit form.
const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
});