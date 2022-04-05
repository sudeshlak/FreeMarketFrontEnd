import React, {useState} from 'react';
import {Button, Row, Collapse} from 'react-bootstrap';

type QuestionProps = {
  question: string
  answer: string
  index: number
}

const Question:React.FC<QuestionProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Row className='one-faq'>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className='question'
      >

      {props.index + 1} . {props.question}
                       
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text" className='answer py-2'>
          {props.answer}
        </div>
      </Collapse>
    </Row>
  )
}

export default Question;