import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const myelement = (
  <div>
    <header>
      <div className="row col-12 titleSection">
      </div>
    </header>
    <main>
      <div id="FilterMenu">
        <div className="filteredElemsWrapper">
          <div className="filteredElem">
            <div className="filteredJobCategory">
              <div className="filteredJobName">HTML</div>
              <div className="cancelBtn">                
              </div>
            </div>            
          </div>
        </div>
        <div className="ClearButton">
          <span className="ClearBtnText">Clear</span>
        </div>
      </div>
      <div id="jobListingMainWrapper">

      </div>
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






class JobListingElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  updateClickState = () => {    
    if(this.state.selected === true)
      this.setState({selected: false});
    else
      this.setState({selected: true});
  }

  render() {
    const jobCategories = [];
    Array.from(this.props.categories).forEach((item,index) => {
      jobCategories.push(
        <div className="jobCategory" key={index}>{item}</div>
      );
    })
    
    return (
      <div className="row jobListingRow boxShadow" onClick={this.updateClickState}>
        <div className="jobListingImage" style={{backgroundImage:`url(${this.props.logo})`}}>

        </div>
        <div className={"selectionIndicator " + (this.state.selected === true ? "visible" : "")}>
        </div>
        <div className="jobListingSection">
          <div className="jobListingFullImage col-2" style={{backgroundImage:`url(${this.props.logo})`}}>          
          </div>
          <div className="JobDetailsWrapper col-6">
            <div className="jobTitleWrapper">
              <span>{this.props.company}</span>
              <div className={"NewJobIndicator " + (this.props.new !== true ? "hideDisplay" : "")}>NEW!</div>
              <div className={"FeaturedJobIndicator " + (this.props.featured !== true ? "hideDisplay" : "")}>FEATURED</div>
            </div>
            <div className="jobTitle">
              {this.props.position}
            </div>
            <div className="jobDataWrapper">
              <span>{this.props.postedAt}</span>
              <span>{this.props.contract}</span>
              <span>{this.props.location}</span>
            </div>
          </div>
          <div className="linebreak">
          </div>
          <div className="jobCategoriesWrapper col-4">
            <div className="categoriesWrapper">
              {jobCategories}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const getData=()=>{
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

      const JobListings = [];

      
      for(var i = 0; i < myJson.length;i++) { 
        JobListings.push(<JobListingElement key={myJson[i]['id']} company={myJson[i]['company']} 
          new={myJson[i]['new']} featured={myJson[i]['featured']} position={myJson[i]['position']}
          categories={myJson[i]['languages']} postedAt={myJson[i]['postedAt']} contract={myJson[i]['contract']} 
          location={myJson[i]['location']} logo={myJson[i]['logo']} selected="false" />);
      }
      
      const finalElement = (
        <div>
          {JobListings}
        </div>
      );

      ReactDOM.render(finalElement, document.getElementById('jobListingMainWrapper'));
    });
}

getData();

