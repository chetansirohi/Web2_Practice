import React, { useState } from 'react';
import data from './data';
function App() {
  //state to maintain the count of text to be generated
  const [count, setCount] = useState(0);

  //state to maintain the text form data
  const [text, setText] = useState([]);

  //function which acts on form submission,by default if negative or 0 => 1 text,more than the data, return at most the length of data, here 9
  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);
    if (count <= 0) {
      amount = 1;
    }
    if (count > 9) {
      amount = 9;
    }
    setText(data.slice(0, amount));
  };
  return (
    <section className='section-center'>
      <h3>tired of boring lorem ipsum?</h3>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <label htmlFor='amount'>paragraphs:</label>
        {/* Input for number of texts to be generated */}
        <input
          type='number'
          name='amount'
          id='amount'
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className='btn'>generate</button>
      </form>
      {/* map over the amount of the text passed as number */}
      <article className='lorem-text'>
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
