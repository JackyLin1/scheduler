import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Confirm from 'components/Appointment/Confirm';
// import Status from 'components/Appointment/Status';
// import Error from 'components/Appointment/Error';
// import Form from 'components/Appointment/Form';

import "components/Appointment/styles.scss";


export default function Appointment (props) {
  return(
    <article className="appointment">
    <Header time={props.time}/>
    {props.interview ? <Show student={props.interview.student} 
    name={props.interview.interviewer.name}/> : <Empty/>}
    </article>
  );
}