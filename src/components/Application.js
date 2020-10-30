import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment/index";
import axios from 'axios';
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import {getInterviewersForDay} from "helpers/selectors";




export default function Application(props) {
 

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "2pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      {
        id: 2,
        time: "3pm",
        interview: {
          student: "Torry",
          interviewer: {
            id: 3,
            name: "Tori Malcolm",
            avatar: "https://i.imgur.com/Nmx0Qxo.png",
          }
        }
      },
      {
        id: 2,
        time: "4pm",
        interview: {
          student: "Linda",
          interviewer: {
            id: 4,
            name: "Mildred Nazir",
            avatar: "https://i.imgur.com/T2WwVfS.png",
          }
        }
      },
      {
        id: 1,
        time: "5pm",
        interview: {
          student: "Sarah",
          interviewer: {
            id: 5,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/FK8V841.jpg",
          }
        }
      }
    ]
    
  });

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  
  useEffect(() => {
   
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
     
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    
    
    });
  }, [])


  return (
    <main className="layout">
      <section className="sidebar">
        
          <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu" >
<DayList days={state.days} day={state.day} setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>

      </section>
      <section className="schedule">
        {
  appointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);

  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={interviewers}
    />
  );
})}
      </section>
    </main>
  );
}






