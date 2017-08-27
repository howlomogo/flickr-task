import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import $ from 'jquery';

// Components
import FlickrImage from './FlickrImage';

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

  handleScroll() {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if ((windowBottom >= docHeight) && (this.state.reachedEnd === false)) {
      console.log('reachedEnd');
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
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={() => this.props.gotoNextResults()}>
              Next page
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default PhotoList;
