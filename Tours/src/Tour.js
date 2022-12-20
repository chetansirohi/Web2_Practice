import React, { useState } from 'react';

const Tour = (props) => {
  // can destructure the props as well to avoid using props.property
  // State to show the content based on read more/less
  const [readMore, setReadMore] = useState(false);
  return (
    <article className="single-tour">
      <img src={props.image} />
      <footer>
        <div className="tour-info">
          <h4>{props.name}</h4>
          <h4 className="tour-price">${props.price}</h4>
        </div>
        {/* Conditional Rendering for Show more/less button */}
        <p>{readMore ? props.info : `${props.info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>{readMore ? 'show less' : 'read more'}</button></p>
        {/* Now as the Tours component takes in the RemoveTour props we can remove a tour based on the id of that tour */}
        <button className="delete-btn" onClick={() => { props.removeTour(props.id) }}>Not Interested</button>
      </footer>
    </article>
  );
};

export default Tour;
