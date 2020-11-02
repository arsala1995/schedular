import React from "react";
import Header from "components/Appointment/Header";
import Status from "components/Appointment/Status";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode"
import "components/Appointment/styles.scss";


export default function Appointment(props){
  console.log("props inside the appointment component:", props);

 const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

 
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    
  );

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then( () => {
      transition(SHOW);
    })
    .catch(error => transition(ERROR_SAVE, true));
  };

  function deleting(event){
    transition(DELETE, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
   }

  function editing() {

      transition(EDIT);
   
  }
  
 
  return ( 
      <>
      <Header time={props.time}/>
      {mode === CREATE && <Form onAdd={() => transition(CREATE)} interviewers={props.interviewers} onCancel={ () => back()} onSave={ save }/>}
      {mode === EDIT && <Form onSave={ save } studentName={props.interview.student} selectedInterviewerId={props.interview.interviewer.id} interviewers={props.interviewers} />}

      {mode === DELETE && <Status message = "Deleting"/>}

      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm = {() => deleting()} message="Delete this appointment?"/> }

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === ERROR_DELETE && <Error message="Could not cancel appointment" onClose={() => back()} />}

    {mode === ERROR_SAVE && <Error message="Could not cancel appointment" onClose={() => back()}/>}

    {mode === SAVING && <Status message = "Saving" />}
   
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() =>  transition(CONFIRM) }
      onEdit={() => editing() }
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


