import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

var JobListings = [];
var filteredCategoriesArray = [];


class FilterMenuComponent extends React.Component {
  clearCategories = () => {
    
    filteredCategoriesArray = [];
    JobListings = [];
    ReactDOM.render(<div></div>, document.getElementById('root'));    
    getData();
  }

  render() {     
    if(this.props.categories.length > 0)
    {
      const filteredCategoryElems = [];

       // Create and render job listing elements
       for(var i = 0; i < this.props.categories.length;i++)
       { 
        filteredCategoryElems.push(<div className="filteredElem" key={"category-" + i}>
          <div className="filteredJobCategory">
              <div className="filteredJobName">{this.props.categories[i]}</div>
              <div className="cancelBtn">                
              </div>
          </div>            
        </div>
        );
      }
      
      const finalFilteredCategoryElement = (
        <div>
          {filteredCategoryElems}
        </div>
      );

      return (
        <div>
          <div className="filteredElemsWrapper">
              {finalFilteredCategoryElement}              
          </div>
          <div className="ClearButton">
              <span className="ClearBtnText" onClick={this.clearCategories}>Clear</span>
          </div>
        </div>
      );
    }
    else
    {
      return (    
        <div></div>    
      );
    }
  }
}



class JobListingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      originalCategories: [],
      categories: []
    };
    Array.from(this.props.categories).forEach((item,index) => {
      this.state.categories.push(item);
      this.state.originalCategories.push(item);      
    });    
  }

  updateClickState = () => {    
    if(this.state.selected === true)
      this.setState({selected: false});
    else
      this.setState({selected: true});
  }

  updateCategories = (event) => {
    let newCategories = this.state.categories;
    let categoryToRemove = event.target.innerText;
    const index = newCategories.indexOf(categoryToRemove);
    if (index > -1) {
      newCategories.splice(index, 1);
    }    
    this.setState({categories: newCategories});

    let filteredCategories = filteredCategoriesArray;
    if(filteredCategories.indexOf(categoryToRemove) === -1)
      filteredCategories.push(categoryToRemove);    
    filteredCategoriesArray = filteredCategories;    
    ReactDOM.render(<FilterMenuComponent categories={filteredCategoriesArray} />,document.getElementById('FilterMenu'));
  }

  render() {    
    const jobCategories = [];
    Array.from(this.state.categories).forEach((item,index) => {      
      jobCategories.push(
        <div className="jobCategory" key={index} onClick={this.updateCategories}>{item}</div>
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

      /*
      // Create and render filter menu component
      const finalFilterMenuElement = (
        <FilterMenuComponent />          
      );
      FilterMenuComponentInstance = finalFilterMenuElement;
      ReactDOM.render(finalFilterMenuElement, document.getElementById('FilterMenu'));
      //ReactDOM.render(finalJobListingElement, document.getElementById('jobListingMainWrapper'));
      */

      // Create and render job listing elements
      for(var i = 0; i < myJson.length;i++) { 
        JobListings.push(<JobListingComponent key={myJson[i]['id']} company={myJson[i]['company']} 
          new={myJson[i]['new']} featured={myJson[i]['featured']} position={myJson[i]['position']}
          categories={myJson[i]['languages']} postedAt={myJson[i]['postedAt']} contract={myJson[i]['contract']} 
          location={myJson[i]['location']} logo={myJson[i]['logo']} selected="false" />);
      }
      
      const finalJobListingElement = (
        <div>
          {JobListings}
        </div>
      );
      
      const mainElement = (
        <div>
          <header>
            <div className="row col-12 titleSection">
            </div>
          </header>
          <main>
            <div id="FilterMenu">
              
            </div>
            <div id="jobListingMainWrapper">
              {finalJobListingElement}
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

      ReactDOM.render(mainElement, document.getElementById('root'));

    });
}

getData();



