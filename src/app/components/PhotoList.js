import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import $ from 'jquery';

// Components
import FlickrImage from './FlickrImage';

// Component to handle the listing the Flickr Images
class PhotoList extends Component {
  constructor() {
    super();
    this.state = {
      reachedEnd: true
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.pageLoadReset = this.pageLoadReset.bind(this);
    // Initially set a cooldown on the reached bottom of page
    this.pageLoadReset();
  }

  // Function to check if user has scrolled to the bottom of page, if so load in more images from Flickr
  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if ((windowBottom >= docHeight) && (this.state.reachedEnd === false)) {
      this.props.gotoNextResults();
      this.setState({
        reachedEnd: true
      })
      this.pageLoadReset();
    }
  }

  pageLoadReset() {
    // Add a small timeout to avoid scrolling too fast down
    setTimeout(
      function(){
        this.setState({
          reachedEnd: false
        });
      }.bind(this), 2000);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const photosList = this.props.appState.photos.map((photo) => {
      return(
        <FlickrImage
          key={photo.id}
          photo={photo}
          getFlickrImages={this.props.getFlickrImages}
          masonry={this.masonry}
          appState={this.props.appState}
        />
      )
    })

    // fitWidth + margin auto for centered items
    const masonryOptions = {
      fitWidth: true
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {/* Masonry React Component, set a reference to masonry to allow for use elsewhere */}
            <Masonry
                ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                className={'masonry--container'}
                elementType={'div'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={false}
            >
              {photosList}
            </Masonry>
          </div>
        </div>
      </div>
    )
  }
}


export default PhotoList;
