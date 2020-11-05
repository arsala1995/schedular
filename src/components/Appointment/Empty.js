import React from "react";

export default function Empty(props) {
//if there is free slot a user will see add button where he can press and add an appointment
 
   return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>

  
   );
 }
 
 
