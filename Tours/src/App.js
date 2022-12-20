import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
const url = 'https://course-api.com/react-tours-project'
function App() {
  //Loading Screen state for when we are fetching the data
  const [loading, setLoading] = useState(true);
  //Tour state for the tour data object
  const [tours, setTours] = useState([]);

  //Removes the tour from the list of given tours based on id
  //Prop drilling, fetching the id from Tour and using it udner App
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  //fetching the data from api
  //try catch block 
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);

    }

  };
  //only when loading for the first time
  useEffect(() => {
    fetchTours();
  }, [])

  if (loading) {
    return (<main><Loading /></main>);
  }
  if (tours.length === 0) {
    return (<main>
      <div className="title">
        <h2>No Tours Left</h2>
        <button className='btn' onClick={fetchTours}>Refresh</button>
      </div>
    </main>)
  }
  return (
    <main>
      {/* through here we are importing the props */}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
