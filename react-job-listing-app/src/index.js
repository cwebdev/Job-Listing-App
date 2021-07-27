import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';

const getData=() =>
{
  fetch('data.json'
  ,{
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }
  }
  )
    .then(function(response){
      console.log(response);
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);

      ReactDOM.render(<App jsonData={myJson} />, document.getElementById('root'));
    });
}

getData();



