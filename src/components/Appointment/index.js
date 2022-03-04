import React from 'react';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Confirm from 'components/Appointment/Confirm';
// import Status from 'components/Appointment/Status';
// import Error from 'components/Appointment/Error';
import Form from 'components/Appointment/Form';
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return(
    <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && 
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    }
    {mode === CREATE && 
      <Form 
      interviewers={[]}
      onCancel={back}
      />
    }

    </article>
  );
}