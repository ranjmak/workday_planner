
    var daySchedule = ["9am","10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];
    var scheduledEvents = [];
    $("#currentDate").text(moment().format("dddd, MMMM Do"));
    var currentHour = moment().hour();

    if (!getDaysEvents()) {
        scheduledEvents = ["","","","","","","","",""];
    }

    function getDaysEvents() {
        var daysEvents = localStorage.getItem("scheduledEvents");
        console.log("days events ", daysEvents);
        if (daysEvents) {
            scheduledEvents = JSON.parse(daysEvents);
            console.log(scheduledEvents);
            return true;
        }
        return false;
    }

    for(var i = 0; i < daySchedule.length; i++) { 
        $("#"+i+"a").append("<div class='col-md-1' id='scheduleTime'><p>"+daySchedule[i]+"</p></div>"+
                        "<form class='col-md-10' id='formSchedule"+i+"'><div class='form-group'><textarea class='col-md-10 description scheduleText' rows='3' id='textSchedule"+i+"'></textarea></div></form>"+
                        "<button class='col-md-1 saveBtn' id='eventSave"+i+"'><i class='fa fa-save' style='font-size:24px'></i></button>");

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
