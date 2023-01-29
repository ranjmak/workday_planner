//ensure html page is loaded before JS
$(document).ready(function() {

    var daySchedule = ["9am","10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]; // workday hours
    var scheduledEvents = []; // array holds the scheduled events 
    $("#currentDate").text(moment().format("dddd, MMMM Do")); //get todays day and date
    var currentHour = moment().hour(); // used to set the colour of the scheduled time-blocks

    scheduledEvents = getDaysEvents(); // get the days scheduled events if present in local storage else an empty array

    // main loop using JQuery to render the time-blocks with:
    //  the hour    |    the test area where the user can input the event they want to schedule    |    save button
    for(var i = 0; i < daySchedule.length; i++) {
        $("#"+i+"a").append("<div class='col-md-1 col-1' id='scheduleTime'><p>"+daySchedule[i]+"</p></div>"+
                        "<form class='col-md-10 col-10' id='formSchedule"+i+"'><div class='form-group'>"+
                        "<textarea class='col-md-10 col-10 description scheduleText' rows='3' id='textSchedule"+i+"'></textarea>"+
                        "</div></form><button class='col-md-1 col-1 saveBtn' id='eventSave"+i+"'>"+
                        "<i class='fa fa-save' data-index='"+i+"' style='font-size:20px'></i></button>");

        // colour the time-blocks
        // note - 9 is added to the index as we check against 24hr clock (9-17)
        if(i+9 < currentHour) {
            $("#textSchedule"+i).addClass("past 'form-control' required");
        }
        else if(i+9 == currentHour) {
            $("#textSchedule"+i).addClass("present 'form-control' required");
        }
        else {
            $("#textSchedule"+i).addClass("future 'form-control' required");
        }
        
        $("#textSchedule"+i).val(scheduledEvents[i]); // add the user text to the relevant time-block
        $("#eventSave"+i).on("click", eventSave); // add an event listener to the save button

    }

    // function to retrive data from local storage and return it, or an empty array
    function getDaysEvents() {
        var daysEvents = localStorage.getItem("scheduledEvents"); // retrive data from local storage if any there
        var tempSchedEvents = ["","","","","","","","",""];

        if (daysEvents) {
            tempSchedEvents = JSON.parse(daysEvents); // parse it into the array and return it
        }
        return tempSchedEvents; // return the filled array or an empty scheduled events array for the first time
    }

    // the save button listener function that saves the scheduled events to local storage
    // it only stores an event if a change is made in the time-block!
    function eventSave(event) {
        var index = event.target.getAttribute("data-index");

        var tempSchedEvents = getDaysEvents();

        // only update the changed event and store it
        if ($("#textSchedule"+index).val() !== tempSchedEvents[index]) {
            scheduledEvents.splice(index, 1, $("#textSchedule"+index).val());
            localStorage.setItem("scheduledEvents", JSON.stringify(scheduledEvents));
            $("#msgSaved").append("<div class='col-md-12 msgSaved'><p>The scheduled event has been saved <i class='fa fa-check' aria-hidden='true'></i></p></div>");
            //wait just long enough for the user to see the saved schedule message before deleting it
            setTimeout(() => {
                $("#msgSaved").empty();
            }, 1000);
        }
        return;
    }
});