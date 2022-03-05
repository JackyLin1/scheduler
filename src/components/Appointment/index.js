import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
// import Error from 'components/Appointment/Error';
import Form from 'components/Appointment/Form';
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = "EDIT";

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(student, interviewer) {
    transition(SAVING);
    const interview = {
      student,
      interviewer
    };

    props.bookInterview(props.id, interview)
    transition(SHOW)
  };

  function deleteAppointment() {
    transition(DELETING);
    props.onDelete(props.id)
    .then(transition(EMPTY))
  }
  
  return(
    <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && 
    <Status message={'Saving...'}/>}

    {mode === DELETING && 
    <Status message={'Deleteing...'}/>}
    {mode === SHOW && 
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      
      />
    }
    {mode === CREATE && 
      <Form 
        interviewers={props.interviewer}
        onCancel={back}
        onSave={save}
      />
    }

    {mode === CONFIRM && 
      <Confirm 
        onCancel={back} 
        onConfirm={deleteAppointment}/>}
    
    {mode === EDIT &&
      <Form
        interviewers={props.interviewer}
        onCancel={back}
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />}

    </article>
  );
}