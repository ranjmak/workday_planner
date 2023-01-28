
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

