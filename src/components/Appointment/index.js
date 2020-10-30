import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";

import "components/Appointment/styles.scss";


export default function Appointment(props){
  // console.log("getinterviewersfor day", getInterviewersForDay);
  console.log("interviewers being processed:", props.interviewers)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );

  return ( 
      <>
      <Header time={props.time}/>
      {mode === CREATE && <Form onAdd={() => transition(CREATE)} interviewers={props.interviewers} onCancel={ () => back()} />}
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
 
  )}
   </>
)






//   if(props.interview){

// return ( 
//   <>
//    <Header time={props.time}/>
//   <Show name={props.interview.student} interviewer={props.interview.interviewer}/>

// </>
// )
//   }
// else {
//   return (
//     <>
// <Header time={props.time}/>,
// <Empty />
// </>
//   )
  
// }
  }


