import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const myelement = (
  <div>
    <header>
      <div className="row col-12 titleSection">
      </div>
    </header>
    <main id="jobListingMainWrapper">
      
    </main>
    <footer>
      <div className="row col-12">
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>. 
          Coded by <a href="https://www.frontendmentor.io/profile/cwebdev" target="_blank" rel="noreferrer">Chitrang Shah</a>.
        </div>
      </div>
    </footer>
  </div>
)

ReactDOM.render(myelement, document.getElementById('root'));