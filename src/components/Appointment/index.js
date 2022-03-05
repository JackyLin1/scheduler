import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
import Error from 'components/Appointment/Error';
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
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(student, interviewer) {
    const interview = {
      student,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  };

  function destroy() {
    transition(DELETING, true);

    props.onDelete(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
  
  return(
    <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && 
      <Status message={'Saving...'}/>}

    {mode === DELETING && 
      <Status message={'Deleteing...'}/>}

    {mode === ERROR_SAVE && 
      <Error message={'Unable to save your appointment'} 
      onClose={back} />}
      
    {mode === ERROR_DELETE && 
      <Error message={'Unable to delete your appointment'} 
      onClose={back} />}
    
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
        onConfirm={destroy}/>}
    
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