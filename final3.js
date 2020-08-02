// Antonina Barankevich, CS 81 Final, Last Edited: July 30, 2020

const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');
let draggedItem = null;

// Drag initiated
for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];
    item.addEventListener('dragstart', function () {
        draggedItem = item;
        // Hide the initial position of the item after it is dragged
        setTimeout(function() {
            item.style.display = 'none';
        }, 0);
    });
    item.addEventListener('dragend', function() {
        setTimeout(function() {
            draggedItem.style.display = 'block';
            draggedItem = null;
        }, 0);
    });

    // Drop 
    for (let j = 0; j < lists.length; j++) {
        const list = lists[j];
        list.addEventListener('dragover', function(e) {
            e.preventDefault();
            
        });
        list.addEventListener('dragenter', function(e) {
            e.preventDefault();
            // Make background darker
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
            list_item = document.getElementsByClassName("list_item");
            // for (item in list_item) { }
            list_item[0].style.backgroundColor = 'black';
            
        });
        list.addEventListener('dragleave', function(e) {
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            
        })
        list.addEventListener('drop', function(e) {
            console.log('drop');
            this.append(draggedItem);
            this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            
        });
    }
}

// CLOCK
function showTime() {
    let date = new Date()// Global object
    let year = date.getFullYear();
        if (year < 1000) {
            year += 1900;
        }
    let month = date.getMonth(); 
    let daym = date.getDate();
    let day = date.getDay();
    let dayArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var monthArray = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December")

    let hours = date.getHours(); // 0-23
    let minutes = date.getMinutes(); //0-59
    let seconds = date.getSeconds(); // 0-59
    // Format hours
    let formatHours = convertFormat(hours); // pm or am  
    hours = checkTime(hours) // convert from 24 to 12
    minutes = addZero(minutes);
    seconds = addZero(seconds);
    document.getElementById('clock').innerHTML = `${dayArray[day]},<br> ${monthArray[month]} ${daym}, ${year}<br>${hours} : ${minutes} : ${seconds} ${formatHours}`
}
// pm or am
function convertFormat(time){
    let format = 'am';
    if(time >= 12) {
        format = 'pm';
    }
    return format; // will be stored in formatHours variable
}
// from 24 to 12hr sysem
function checkTime(time) {
    if (time > 12) {
        time = time - 12;
    }
    if (time == 0) {
        time = 12; 
    }
    return time; // stored in variable hours
}

// add Zero
function addZero(time) {
    if (time < 10) {
        time = '0' + time; 
    }
    return time;
}

// Callback function set interval function
showTime();
setInterval(showTime, 1000);


// NAVBAR
const navbarBtn = document.querySelector('.navbar_btn');
const navbarLinks = document.querySelector('.navbar_links');

// Show menu
navbarBtn.addEventListener('mouseover', function() {
    navbarLinks.classList.add('navbar_collapse');
    navbarBtn.classList.add('change');
})
// Make sure the menu is open when hover over links
navbarLinks.addEventListener('mouseover', function() {
    navbarLinks.classList.add('navbar_collapse');
    navbarBtn.classList.add('change');
})
    /*let value = navbarLinks.classList.contains('navbar_collapse')
    if (value) {
        navbarLinks.classList.remove('navbar_collapse');
        navbarBtn.classList.remove('change');

    } else {
        navbarLinks.classList.add('navbar_collapse');
        navbarBtn.classList.add('change');
    }*/

// Hide menu
navbarBtn.addEventListener('mouseout', function() {
    navbarLinks.classList.remove('navbar_collapse');
    navbarBtn.classList.remove('change');
})
navbarLinks.addEventListener('mouseout', function() {
    navbarLinks.classList.remove('navbar_collapse');
    navbarBtn.classList.remove('change');
})

// ANALOGOUS CLOCK
setInterval(setClock, 1000) // call the function every second
const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');
console.log(hourHand)

function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds()/60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes())/60;
    const hoursRatio = (minutesRatio + currentDate.getHours())/12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}
