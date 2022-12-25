import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'
function App() {

  //state for loading the data
  const [loading, setLoading] = useState(true);

  //state for job array which is fetched via the api
  const [jobs, setJobs] = useState([]);

  //state to maintain the current value of the object from the array
  const [value, setValue] = useState(0);

  //make call to the api
  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  // side effects only run initially
  useEffect(() => {
    fetchJobs();
  }, [])

  //loading state , used between fetching the data to and fro
  if (loading) {
    return (
      <section className="section loading">
        <h1>Loading...</h1>
      </section>
    )
  }
  //fetches data after loading, if used before laoding raise an error as initially it is an empty, but after the api call we can get the jobs array
  const { company, dates, duties, title } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* btn container */}
        <div className="btn-container">
          {/* maps over the job buttons , sets the state of value of the currently selected index and apply active  */}
          {jobs.map((item, index) => {
            return <button key={item.id} onClick={() => setValue(index)} className={`job-btn ${index === value && 'active-btn'}`}>{item.company}</button>
          })}
        </div>
        {/* job info */}
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {/* as duties is an array , map over all the elements */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className="job-desc">
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App
