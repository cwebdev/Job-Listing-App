import React from 'react';
import FilterMenuComponent from './FilterMenuComponent';
import JobListingComponent from './JobListingComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredValues: [],
      appJSONData: this.props.jsonData
    };
  }

  updateCategoryValues = (event) =>
  {
    let categoryToRemove = event.target.innerText;
    let currentFilteredValues = this.state.filteredValues;
    if(currentFilteredValues.indexOf(categoryToRemove) === -1)
      currentFilteredValues.push(categoryToRemove); 
    this.setState({filteredValues : currentFilteredValues});
  }

  removeCategoryValue = (categoryToRemove) =>
  {  
    const index = this.state.filteredValues.indexOf(categoryToRemove);
    if (index > -1) {
      let newFilteredValues = this.state.filteredValues;
      newFilteredValues.splice(index, 1);
      this.setState({filteredValues : newFilteredValues});
    } 
  }

  clearFilterData = () =>
  {
    this.setState({filteredValues : []});
  }

  render()
  {
    let JobListings = [];
    // Create and render job listing elements
    for(var i = 0; i < this.state.appJSONData.length;i++) { 
      let listingFiltered = true;
      if(this.state.filteredValues.length > 0)
      {
        listingFiltered = false;   
        let filteredElements = [];   
        Array.from(this.state.appJSONData[i]['languages']).forEach((item,index) => {               
          for(var j = 0; j < this.state.filteredValues.length;j++)
          {            
            if(item === this.state.filteredValues[j])
            {
              if(filteredElements.indexOf(item) === -1)
                filteredElements.push(item);
              
            }
          }
        });

        if(filteredElements.length === this.state.filteredValues.length)
        {
          listingFiltered = true;
        }
      }
      
      
      if(listingFiltered)
      {
        JobListings.push(<JobListingComponent key={this.state.appJSONData[i]['id']} company={this.state.appJSONData[i]['company']} new={this.state.appJSONData[i]['new']} featured={this.state.appJSONData[i]['featured']} position={this.state.appJSONData[i]['position']} categories={this.state.appJSONData[i]['languages']} postedAt={this.state.appJSONData[i]['postedAt']} contract={this.state.appJSONData[i]['contract']} 
        location={this.state.appJSONData[i]['location']} logo={this.state.appJSONData[i]['logo']} selected="false" 
        filteredValues={this.state.filteredValues} action={this.updateCategoryValues} role={this.state.appJSONData[i]['role']} tools={this.state.appJSONData[i]['tools']} level={this.state.appJSONData[i]['level']} />);
      }
    }
    
    const finalJobListingElement = (
      <div>
        {JobListings}
      </div>
    );
    
    return (
      <div>
        <header>
          <div className="row col-12 titleSection">
          </div>
        </header>
        <main>
          <div id="FilterMenu">
            <FilterMenuComponent filteredValues={this.state.filteredValues} action={this.removeCategoryValue} clearfilter={this.clearFilterData} />
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
  }
}

export default App;