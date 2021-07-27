import React from 'react';

class FilterElementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: this.props.categoryName      
    };    
  }

  removeCategory = () => {        
    this.props.action(this.state.categoryName);
  }

  render() {
    return (
      <div className="filteredElem">
        <div className="filteredJobCategory">
            <div className="filteredJobName">{this.state.categoryName}</div>
            <div className="cancelBtn" onClick={this.removeCategory}>
            </div>
        </div>            
      </div>
    )
  }
}

export default FilterElementComponent;