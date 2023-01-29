$(document).ready(function() {
    var daySchedule = ["9am","10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    var scheduledEvents = [];
    $("#currentDate").text(moment().format("dddd, MMMM Do"));
    var currentHour = moment().hour();

    if (!getDaysEvents()) {
        scheduledEvents = ["","","","","","","","",""];
    }

    function getDaysEvents() {
        var daysEvents = localStorage.getItem("scheduledEvents");
        //console.log("days events ", daysEvents);
        if (daysEvents) {
            scheduledEvents = JSON.parse(daysEvents);
            //console.log(scheduledEvents);
            return true;
        }
        return false;
    }

    for(var i = 0; i < daySchedule.length; i++) { 
        $("#"+i+"a").append("<div class='col-md-1' id='scheduleTime'><p>"+daySchedule[i]+"</p></div>"+
                        "<form class='col-md-10' id='formSchedule"+i+"'><div class='form-group'><textarea class='col-md-10 description scheduleText' rows='3' id='textSchedule"+i+"'></textarea></div></form>"+
                        "<button class='col-md-1 saveBtn' id='eventSave"+i+"'><i class='fa fa-save' data-index='"+i+"' style='font-size:24px'></i></button>");

        if(i+9 < currentHour) {
            $("#textSchedule"+i).addClass("past 'form-control' required");
        }
        else if(i+9 == currentHour) {
            $("#textSchedule"+i).addClass("present 'form-control' required");
        }
        else {
            $("#textSchedule"+i).addClass("future 'form-control' required");
        }

        $("#textSchedule"+i).val(scheduledEvents[i]);
        $("#eventSave"+i).on("click", eventSave);

    }
    function eventSave(event) {
        var index = event.target.getAttribute("data-index");
        console.log(index);

        scheduledEvents.splice(index, 1, $("#textSchedule"+index).val());

/*
        for (var i = 0; i < scheduledEvents.length; i++) {
            scheduledEvents[i] = $("#textSchedule"+i).val();
        }
*/

//console.log(scheduledEvents);
        localStorage.setItem("scheduledEvents", JSON.stringify(scheduledEvents));

        $("#msgSaved").append("<div class='col-md-12 msgSaved'><p>The scheduled event has been saved <i class='fa fa-check' aria-hidden='true'></i></p></div>");
        //wait just enough for the user to see the saved schedule message
        setTimeout(() => {
            $("#msgSaved").empty();
        }, 1000);

        return;
    }
});