//Dark Mode Toggle
var darkModeOn = false;

$("#darkMode").click(function() {
  darkModeOn = !darkModeOn;
  var xAxisTicks = $(".x.axis line");
  var yAxisTicks = $(".y.axis line");
  var xAxisText = $(".x.axis text");
  var yAxisText = $(".y.axis text");
  var rowxAxisText = $("g text");

  console.log(rowxAxisText);

  $("body").toggleClass("darkmode-class");
  xAxisText.toggleClass("darkmode-text ");
  yAxisText.toggleClass("darkmode-text ");
  xAxisTicks.toggleClass("darkmode-ticks");
  yAxisTicks.toggleClass("darkmode-ticks");
  rowxAxisText.toggleClass("darkmode-ticks");
  console.log(darkModeOn);
});

// start intro.js
$("#tour").click(function() {
  javascript: introJs().start();
});

// nav-display

$("#nav-btn").on("click", function() {
  var navMenu = $(".nav-menu-main");
  navMenu.toggleClass("nav-active");
  $(".overlay").toggleClass("active");
  $(".overlay").empty();
});

$("#dash").on("click", function() {
  var navMenu = $(".nav-menu-main");
  navMenu.toggleClass("nav-active");
  $(".overlay").toggleClass("active");
  var overlay = $(".overlay");
  overlay.empty();
});

// Calendar Section

$("#calendar-menu").on("click", function() {
  var overlay = $(".overlay");
  var calendarMenu = `<div id='calendar-container'>
  <div class="events">
  <input type="text" id="eventName" placeholder='Event Name..'>
  <input type="text" id="eventStart" placeholder='Enter Date..'>
  <input type="text" id="eventEnd" placeholder='Enter lenght in days'>
</div>
    <div id='calendar'></div>
    <form id="event-form" action="" >
        <button id='deleteEvent' type="button" class="btn btn-danger btn-small">Delete</button>
      </form>
  </div>`;
  overlay.html(calendarMenu);
});

//#########################TEST#####################
$("#calendar-menu").on("click", function() {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list"],
    height: "parent",
    timeZone: "Europe/Ireland",
    header: {
      left: "prev,next today",
      center: "addEventButton",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    },
    customButtons: {
      addEventButton: {
        text: "add event...",
        click: function() {
          var eventName = $("#eventName");
          var eventStart = $("#eventStart");
          var eventEnd = $("#eventEnd");

          var eventNameValue = eventName[0].value;
          console.log(eventNameValue);

          var eventStartValue = eventStart[0].value;
          console.log(eventStartValue);

          var date = new Date(eventStartValue + "T00:00:00"); // will be in local time

          var eventEndValue = eventEnd[0].value;
          var endDate = parseInt(eventEndValue);
          console.log(typeof endDate);

          var eventendDate = moment(date).add(endDate, "days");
          var finalDate = eventendDate._d;

          if (!isNaN(date.valueOf()) && eventName.length > 0) {
            // valid?
            calendar.addEvent({
              title: eventNameValue,
              start: date,
              end: finalDate,
              allDay: true
            });
            eventNameValue = "";
            eventEndValue = "";
            eventEndValue = "";
            alert("Event Added");
          } else {
            alert("Invalid date.");
          }
        }
      }
    },
    defaultView: "dayGridMonth",
    defaultDate: new Date(),
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true // allow "more" link when too many events
    // events: [
    //   {
    //     title: "Poject Dead Line",
    //     start: "2019-06-09"
    //   },
    //   {
    //     title: "Big Event",
    //     start: "2019-06-14",
    //     end: "2019-06-18"
    //   },
    //   {
    //     title: "Meeting",
    //     start: "2019-06-14",
    //     end: "2019-06-17"
    //   },
    //   {
    //     title: "hi",
    //     start: "2019-06-09T12:30:00Z"
    //   }
    // ]
  });

  var path = calendar.state.eventStore.defs;

  console.log(path);
  $(document).on("click", "#deleteEvent", function() {
    $("#calendar").fullCalendar("removeEvents", 2); //Remove events with the id: 2
  });
  calendar.render();
});
