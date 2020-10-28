import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props){
 console.log("props for interviewer list:", props);
  return(
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{props.interviewers.map(interviewer =>{
        return (< InterviewerListItem 
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewer={event => props.onChange(interviewer.id)}/>)
        })}
   </ul>
  </section>
    
  )
}