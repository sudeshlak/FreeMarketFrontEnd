import React from 'react';

type StrengthBarProps = {
  status: string
};

const StrengthBar: React.FC<StrengthBarProps> = (props) => {
  const {status} = props;

  return (
    <div className={`strength-bar ${status}`}/>
  );
}

export default StrengthBar;