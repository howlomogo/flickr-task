import React, {Component} from 'react';
import Masonry from 'react-masonry-component';

// Components
import FlickrImage from './FlickrImage';

class PhotoList extends Component {
  constructor() {
    super();
  }

  render() {
    const photosList = this.props.state.photos.map((photo) => {
      return(
        <FlickrImage
          key={photo.link}
          photo={photo}
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
