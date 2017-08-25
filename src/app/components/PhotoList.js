import React, {Component} from 'react';

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
      <div>
        {photosList}
      </div>
    )
  }
}


export default PhotoList;
