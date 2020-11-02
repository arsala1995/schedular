import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {

const [studentName, setStudentName] = useState(props.studentName || "");
const [selectedInterviewerId, setInterviewer] = useState(props.selectedInterviewerId || null);

function reset() {
  setStudentName("");
  setInterviewer(null)
}
function cancel() {
 reset()
 props.onCancel()
}
 
   return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={(event) => setStudentName(event.target.value)} 
          /*
            This must be a controlled component
          */
        />
      </form>
      <InterviewerList interviewers={props.interviewers} selectedInterviewerId={selectedInterviewerId} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={ () => props.onSave(studentName, selectedInterviewerId) }>Save</Button>
      </section>
    </section>
  </main>
  
  
  
   );
 }
 
 
