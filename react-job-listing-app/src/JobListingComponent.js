import React from 'react';

class JobListingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,      
      categories: []
    };

    Array.from(this.props.categories).forEach((item,index) => {      
        this.state.categories.push(item);      
    });    

    Array.from(this.props.tools).forEach((item,index) => {      
        this.state.categories.push(item);      
    });

    this.state.categories.push(this.props.role);
    this.state.categories.push(this.props.level);
  }

  updateClickState = () => {    
    if(this.state.selected === true)
      this.setState({selected: false});
    else
      this.setState({selected: true});
  }

  updateCategories = (event) => {
    this.props.action(event);       
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

export default JobListingComponent;