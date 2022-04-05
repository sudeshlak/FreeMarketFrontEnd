import React from "react";
import StrengthBar from "./StrengthBar";

type GetBarsProps = {
  strength: number
};
const GetBars: React.FC<GetBarsProps> = (props) => {
  const {strength} = props;
  const colors: string[] = ['', 'bg-danger', 'bg-warning', 'bg-success'];
  let statusColor: string = '';
  switch (strength) {
    case 1:
      statusColor = colors[1];
      break;
    case 2:
      statusColor = colors[1];
      break;
    case 3:
      statusColor = colors[2];
      break;
    case 4:
      statusColor = colors[2];
      break;
    case 5:
      statusColor = colors[3];
      break;
    case 6:
      statusColor = colors[3];
      break;
    default:
      statusColor = colors[0];
  }
  return (
    <React.Fragment>
      { [...Array(6)].map((e, index) => {
        return <StrengthBar status={index + 1 <= strength ? statusColor : ''} key={index}/>
      })}
    </React.Fragment>
  )
}

export default GetBars;