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
      <div className="filter--container">
        <div className="container">
          <div className="row align-items-center py-4">
            <div className="col-md-12">
              <form className="form-inline filter--form" onSubmit={this.handleSubmit}>
                <div className="input-group mr-4">
                  <label className="mr-1">Search By Tag: </label>
                  <input type="text" className="form-control filter--search-input" placeholder="Search for..." onChange={this.searchFilter} value={this.state.searchTerm} />
                  <span className="input-group-btn">
                    <button className="btn btn--primary" type='submit' value='Search'>Search</button>
                  </span>
                </div>

                <div className="input-group">
                  <label className="mr-1">Search By Title: </label>
                  <input type="text" className="form-control filter--search-input" placeholder="Search for..." onChange={this.searchFilter} value={this.state.searchTerm} />
                  <span className="input-group-btn">
                    <button className="btn btn--primary" type='submit' value='Search'>Search</button>
                  </span>
                </div>

              </form>
            </div>
            <div className="col-md-12">
              <p className="text-center mb-0">Searching for photos based on tags: 'the tag'</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Filter;
