import React, {Component} from 'react';
// import bannerimg from 'images/bannerimg.jpg';
class Header extends Component {

  render() {
    return(
      <div id="top" className="container--fluid text-center">
          <div className="banner--container">
            {/* <img className="banner--img" src={bannerimg} alt=""/> */}
            <div className="banner--overlay"></div>
            <h1 className="banner--text">FLICKR PHOTO STREAM</h1>
        </div>
      </div>
    )
  }
}

export default Header;
