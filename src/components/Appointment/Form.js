import React , { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

export default function Form (props) {
  const [name, setName ] = useState(props.name || '');
  const [error, setError ] = useState("");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const save = () => {
    if (!name) {
      setError("Student name cannot be blank");
      return ;
    }
    const id = interviewer ? interviewer.id : null
    props.onSave(name, id)
  }

  const onInterviewerChangeHandler = (id) => {
    setInterviewer(props.interviewers.find(i => i.id === id))
  }

  const onStudentChangeHandler = (e) => {
    setError(false);
    setName(e.target.value)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => onStudentChangeHandler(e)}
            /*
              This must be a controlled component
            */
           data-testid="student-name-input"
          />
          { error ? <p style={{color: 'red'}}>{error}</p> : ""}
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(id) => onInterviewerChangeHandler(id)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
}