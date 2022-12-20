import React, { useState } from 'react';
import data from './data';
import Question from './Question';
import SingleQuestion from './Question';
function App() {
  //state for passing the data
  const [questions, setQuestions] = useState(data);
  return (
    <div className="container">
      <h3>questions and answers about login</h3>
      <section className="info">
        {questions.map((question) => {
          //props drilling for id and all the remaining props
          return <SingleQuestion key={question.id} {...question} />
        })}
      </section>
    </div>
  );
}

export default App;
