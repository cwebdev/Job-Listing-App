import React from 'react';
import FilterElementComponent from './FilterElementComponent.js';

class FilterMenuComponent extends React.Component {
  clearCategories = () => {
    this.props.clearfilter();
  }

  render() {     
    if(this.props.filteredValues.length > 0)
    {
      const filteredCategoryElems = [];

       // Create and render job listing elements
       for(var i = 0; i < this.props.filteredValues.length;i++)
       { 
          filteredCategoryElems.push(<FilterElementComponent key={"category-" + i} categoryName={this.props.filteredValues[i]} action={this.props.action} />);
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

export default FilterMenuComponent;