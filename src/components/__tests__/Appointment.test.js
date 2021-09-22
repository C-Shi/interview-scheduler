import React from 'react';

import { cleanup, render } from '@testing-library/react';

import Application from 'components/Application';
import Appointment from 'components/Appointment';

afterEach(cleanup);

describe("Appointment", () => {
  it("renders with crashing", () => {
    render(<Appointment></Appointment>)
  })

  it("shows proper timing if passing", () => {
    const { getByText } = render(<Appointment time="12pm"></Appointment>)
    expect(getByText('12pm')).toBeInTheDocument()
  })

  it("show student name with booked appointment", () => {
    const interview = {
      student: 'Jane Smith',
      interviewer: {
        name: 'Muler Lee'
      }
    }
    const { getByText } = render(<Appointment time="12pm" interview={interview} ></Appointment>)
    expect(getByText('Jane Smith')).toBeInTheDocument()
  })
})