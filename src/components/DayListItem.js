import React  from "react";
import classNames  from "classnames";

import "components/DayListItem.scss"

const formastSpots = (spots) => {
  if (spots > 1) {
    return spots + " spots remaining"
  } else if (spots === 1) {
    return spots + " spot remaining"
  }
  return "no spots remaining";
};

export default function DayListItem(props) {
  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2>{props.name}</h2>
      <h3>{formastSpots(props.spots)}</h3>
    </li>
  );
}