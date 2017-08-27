import React, {Component} from 'react';

class Header extends Component {

  render() {
    return(
      <div id="top" className="container--fluid text-center">
          <div className="banner--container">
            <div className="banner--overlay"></div>
            <h1 className="banner--text">FLICKR PHOTO STREAM</h1>
        </div>
      </div>
    )
  }
}

export default Header;
