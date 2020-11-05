import React, {
  useState,
  useEffect
} from "react";
import "components/Application.scss";
import "components/Appointment";
import axios from 'axios';

export default function useApplicationData(props) {


  const [state, setState] = useState({
    day: "Monday",
    days: [],

    appointments: [{
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


  function bookInterview(appointmentId, interview) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: {
        ...interview
      }
    };

    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    };

    // console.log(id, interview);

    return axios.put(`/api/appointments/${appointmentId}`, {
        interview
      })
      .then(() => {
        Promise.all([
          axios.get("/api/days"),
        ]).then((all) => {

          setState(prev => ({
            ...prev,
            days: all[0].data
          }));

        });
        setState({
          ...state,
          appointments
        });


      });

  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {

        Promise.all([
          axios.get("/api/days"),
        ]).then((all) => {

          setState(prev => ({
            ...prev,
            days: all[0].data
          }));

        });
        setState({
          ...state,
          appointments
        });


      });

  }

  const setDay = day => setState({
    ...state,
    day
  });


  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {

      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));


    });
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}