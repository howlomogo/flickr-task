import React, {Component} from 'react';

class DevHelper extends Component {

  constructor() {
    super();
    this.showProps = this.showProps.bind(this);
  }

  showProps() {
		console.log(this.props.state);
	}
  
  render() {
    return(
      <div>
        <button onClick={this.showProps.bind(this)}>Show props</button>
        <button onClick={() => this.props.getFlickrImages('snowboarding')}>Get snowboard images</button>
      </div>
    )
  }
}

export default DevHelper;
