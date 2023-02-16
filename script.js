// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

// originally used similar vanilla JS  window.onload = function () {, but switched to jQuery method to make sure browswer had finished rendering all elements
$(document).ready(function() {
  let currentDate = dayjs();
  let currentHour = currentDate.hour();
  var currentDay = document.querySelector("#currentDay");
  var hourBlocks = document.querySelectorAll(".time-block");


  // Adds text content to title of page with todays date
  currentDay.textContent = "Today is " + currentDate.format("MMM DD, 'YY")

  // checks if there is stored value, and if so, prints it in appropriate slot
  for (let z = 0; z < hourBlocks.length; z++) {
    var savedEventInfo = localStorage.getItem(hourBlocks[z].getAttribute("id"));
    var textAreaArr = document.querySelectorAll("textarea");
    if (savedEventInfo !== null) {
      textAreaArr[z].textContent = savedEventInfo;      
    }
  }

  // use currentHour to validate against time listed in calendar and apply classes as necessary
  // cycles through all time blocks
  for (let i = 0; i < hourBlocks.length; i++) {

    // probably doesn't need to be its own function, but separates id attribute at the - to utilize numbers only
    function getHour(string) {
      let checkHour = string.split("-")[1];
      return(Number(checkHour));
    }

    // utilizes above function to assign number/hour value to each timeslot for validation against current time
    var idCheck = hourBlocks[i].getAttribute("id");
    let specificHour = getHour(idCheck);

    function addClass(event) {
      hourBlocks[i].classList.add(event);
    }
    // checks current actual hour against hour values of scheduler 
    if (specificHour === currentHour) {
      addClass("present");
    } else if (specificHour < currentHour) {
      addClass("past");
    } else {
      addClass("future");
    }
  }

  // utilizes forEach function for an array of all buttons to add event listeners to each one
  var btnsArr = document.querySelectorAll(".saveBtn");
  

  btnsArr.forEach(function(btn) {
    btn.addEventListener("click", function(event){
      // defines as variables the sibling and parents needed to identify the proper timeslot and value typed in by user
      let scheduledEv = event.currentTarget.previousElementSibling.value;
      let evTime = event.currentTarget.parentElement.getAttribute("id");

      // saves to localStorage the savedEvent with key referring to the time and the value being the content to save
      localStorage.setItem(evTime, scheduledEv);
    });
  });
    // could be accomplished in jQuery utilizing a similar array and using 'this' to help locate the click and the appropriate surrounding elements rather than event.currentTarget. This method can be seen below:

      // var $btnsArr = $(".saveBtn");
      
      // $btnsArr.each(function() {
      //   $(this).on("click", function() {
      //     // defines as variables the sibling and parents needed to identify the proper timeslot and value typed in by user
      //     let scheduledEv = $(this).prev().val();
      //     let evTime = $(this).parent().attr("id");
      
      //     // saves to localStorage the savedEvent with key referring to the time and the value being the content to save
      //     localStorage.setItem(evTime, scheduledEv);
      //   });
      // });
  
});
