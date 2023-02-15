// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

// set this as window load
// $(document).ready(function() {
window.onload = function () {
  let currentDate = dayjs();
  // let currentHour = currentDate.hour();
  let currentHour = 12;
  var currentDay = document.querySelector("#currentDay");

  // can't get the o to fucking work. Adds format to p tag
  currentDay.textContent = "Today is the " + currentDate.format("MMM DD, 'YY")

  // use currentHour to validate against time listed in calendar and apply classes as necessary
  var hourBlocks = document.querySelectorAll(".time-block");

  for (let i = 0; i < hourBlocks.length; i++) {
    idCheck = hourBlocks[i].getAttribute("id");
    let specificHour = getHour(idCheck);

    function addClass(event) {
      hourBlocks[i].classList.add(event);
    }

    if (specificHour === currentHour) {
      addClass("present");
    } else if (specificHour < currentHour) {
      addClass("past");
    } else {
      addClass("future");
    }
  }

  // make an event listener for save button click (use event delegation to help?)
  var btnsArr = document.querySelectorAll(".saveBtn");
  
  btnsArr.forEach(function(btn) {
    btn.addEventListener("click", function(event){
      let scheduledEv = event.target.previousElementSibling.value;
      let evTime = event.target.parentElement.getAttribute("id");
  
      let hourAndValue = {
        timeSlot: evTime,
        textValue: scheduledEv
      }
      console.log(hourAndValue);
      localStorage.setItem("savedEvent"+evTime, JSON.stringify(hourAndValue));
    })
  });



  

  // button defined by parent to detect where to save
  // save that to local storage
  // get the local storage on load (maybe if else for if it exists)
}

function getHour(string) {
  let checkHour = string.split("-")[1];
  return(Number(checkHour));
}



  //eliinate for loop with this map function, requires an array conversion
    // var allIDs = Array.from(hourBlocks).map(function(elem){
      //   return elem.getAttribute("id");
      // })