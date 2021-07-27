import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import './styles.scss';

export default function Appointment (props) {
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? 
        <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : 
        <Empty onAdd={props.onAdd}/>}
    </article>
  )
}