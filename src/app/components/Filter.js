import React, {Component} from 'react';

class Filter extends Component {

  constructor() {
    super();
    this.state = {
      searchTerm: ''
    }
    this.searchFilter = this.searchFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchFilter(event) {
    this.setState({
      searchTerm: event.target.value
    }, function() {
      console.log(this.state.searchTerm);
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.getFlickrImages(this.state.searchTerm);
    // Do search
    this.setState({
      searchTerm: ''
    })
  }

  render() {
    return(
      <div className="container">
        <div className="row align-items-center py-4">
          <div className="col-md-12 mb-2">
            <hr className="hr" />
          </div>
          <div className="col-md-6">
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="input-group mr-2">
                <label className="mr-2">Search By Tag: </label>
                <input className="form-control" type="text" onChange={this.searchFilter} value={this.state.searchTerm} />
              </div>
              <input className="btn btn-success" type='submit' value='Search' />
            </form>
          </div>
          <div className="col-md-6">
            <p className="text-right mb-0">Searching for photos based on tags: 'the tag'</p>
          </div>
          <div className="col-md-12 mt-2">
            <hr className="hr" />
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
