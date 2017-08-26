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

    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Masonry
                className={'masonry--container'}
                elementType={'div'}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
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
