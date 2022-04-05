import React, {useState, useEffect} from "react";
import {Col} from "react-bootstrap";
import StrengthBar from "./StrengthBar";

type PasswordStrengthProps = {
  password: string
};

const PasswordStrength: React.FC<PasswordStrengthProps> = (props) => {
  const {password} = props;
  const [strength, setStrength] = useState<number>(0);
  const colors = ['', 'bg-danger', 'bg-warning', 'bg-success'];

  const calcStrength = React.useCallback(() => {
    let strengthVal = [/[$@!%*#?&]/, /[A-Z]/, /[0-9]/, /[a-z]/]
      .reduce((val, test) => val + (test.test(password) ? 1 : 0), 0);
    if (strengthVal > 2 && password.length > 7) {
      strengthVal++;
      if (strengthVal > 3 && password.length > 9) {
        strengthVal++;
      }
    }
    if (password.length < 6 && strengthVal > 3) {
      strengthVal = 3;
    }
    return strengthVal;
  }, [password]);

  useEffect(() => {
    const strengthValue = calcStrength();
    setStrength(strengthValue);
    return (() => {
      setStrength(0);
    });
  }, [calcStrength, password]);

  const getBars = () => {
    let statusColor = '';
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
      [...Array(6)].map((e, index) => {
        return <StrengthBar status={index + 1 <= strength ? statusColor : ''} key={index}/>
      })
    );
  };

  return (
    <Col md={12} className='strength-bars'>
      {getBars()}
    </Col>
  );
}

export default PasswordStrength;