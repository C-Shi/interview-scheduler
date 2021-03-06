import React from 'react';

import { render, cleanup, fireEvent  } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup)

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("render without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers}/>)
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("Renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} name="Lydia Miller-Jones"></Form>)
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    /* 1. validation is shown */
    const { getByText } = render(<Form interviewers={interviewers} onSave={onSave} />)

    fireEvent.click(getByText('Save'));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });
  
  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn()
    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText } = render(<Form interviewers={interviewers} name="Lydia Miller-Jones" onSave={onSave} />)
    /* 3. Click the save button */
    fireEvent.click(queryByText('Save'));
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });


});