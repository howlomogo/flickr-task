import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import $ from 'jquery';

// Components
import FlickrImage from './FlickrImage';

class PhotoList extends Component {
  constructor() {
    super();
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
            {/* create reference to masonry so layout can be called when image sizes update */}
            <Masonry
                ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                onImagesLoaded={this.handleImagesLoaded}
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
