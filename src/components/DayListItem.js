import React from 'react';
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem (props) {
  let listClass = classnames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })
  return (
    <li
      className={listClass} 
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{props.spots ? props.spots : 'no'} {props.spots === 1 ? 'spot' : 'spots'} remaining</h3>
    </li>
  )
}