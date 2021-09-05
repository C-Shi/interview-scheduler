import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import './styles.scss';

import { useVisualMode } from '../../hooks/useVisualMode';
import Confirm from './Confirm';

const EMPTY = 'EMPYT';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const CONFIRM = 'CONFIRM';
const DELETING = 'DELETING';
const EDIT = 'EDIT';

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  const remove = () => {
    transition(DELETING)
    props.deleteInterview(props.id)
    .then(() => transition(EMPTY, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/> }
      { mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />}
      { mode === EDIT && <Form interviewers={props.interviewers} onCancel={back} onSave={save} name={props.interview.student} interviewer={props.interview.interviewer} />}
      { mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      { mode === SAVING && <Status message="Saving"></Status>}
      { mode === DELETING && <Status message="Deleting"></Status>}
      { mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={remove} onCancel={() => transition(SHOW)}></Confirm>}
    </article>
  )
}