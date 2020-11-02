import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

function InterviewerList(props){
 console.log("props for interviewer list:", props);
  return(
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{props.interviewers.map(interviewer =>{
        return (<InterviewerListItem 
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.selectedInterviewerId}
          setInterviewer={event => props.onChange(interviewer.id)}/>)
        })}
   </ul>
  </section>
    
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;
