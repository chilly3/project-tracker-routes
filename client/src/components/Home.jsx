import React from 'react';

const Home = () => {
  
  return (
    <div className="content">
      <div>
        <div>
          <hr></hr>
          <h2 className="content-title">Home</h2>
          <p>Welcome to <em>Project Tracker Database</em>, a basic website built with react, express, and mongoose for keeping track of coding projects.</p>
          <ul className="counts">
            <li><strong>Projects: </strong></li>
            <li><strong>Technologies: </strong></li>
            <li><strong>Total Logged Time: </strong></li>
          </ul>
        </div>
      </div>
    </div>
  );

}

export default Home;