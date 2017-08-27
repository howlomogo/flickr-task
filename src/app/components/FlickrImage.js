import React, {Component} from 'react';
import $ from 'jquery';
import imagesLoaded from 'imagesloaded';

class FlickrImage extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      tags: [],
      authorUsername: '',
      authorRealname: ''
		}
    this.checkDescription = this.checkDescription.bind(this);
  }

  componentWillMount() {
    // Use Flickrs getInfo call to get data for this photo
    const flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo";

    let state = this;
    $.getJSON( flickrAPI, {
      api_key: '8d3a64fc8d70ca2536d92ce9a4d70281',
      photo_id: this.props.photo.id,
      format: 'json',
      nojsoncallback: 1
    })
    .done(function( info ) {
      // Get properties we need for this photo and put them in state
      state.setState({
        description: info.photo.description._content,
        tags: info.photo.tags.tag,
        authorUsername: info.photo.owner.username,
        authorRealname: info.photo.owner.realname
      });
    });
  }

  // Return 'No Description' for images which have empty descriptions
  checkDescription(description) {
    return description.trim() !== '';
  }

  render() {

    // Update masonry layout when images load - to prevent any overlap
    imagesLoaded('.photo--tag', function() {
      this.props.masonry.layout();
    }.bind(this));

    // Rendered too early for masonry
    const tagList = this.state.tags.map((tag) => {
      return(
        <div onClick={() => this.props.getFlickrImages(tag._content, true)} className="photo--tag" key={tag.id}>{tag._content}</div>
      )
    })

    return(
      <div className="photo--container">
        <img className="photo--img" src={"https://farm" + this.props.photo.farm + ".staticflickr.com/" + this.props.photo.server + "/" + this.props.photo.id + "_" + this.props.photo.secret + ".jpg"} />
        <div className="photo--content-container">
          <a className="photo--font-title mb-2" href={"https://www.flickr.com/photos/" + this.props.photo.owner + "/" + this.props.photo.id} target='_blank'>
            {this.props.photo.title}
          </a>

          <a className="photo--font-author" href={"https://www.flickr.com/photos/" + this.props.photo.owner} target='_blank'>
            <span className="font-weight-bold">By: </span>
            {this.state.authorUsername}
          </a>

          <p className="photo--font-description">
            <span className="font-weight-bold">Description: </span>
            {this.checkDescription(this.state.description) ? (
              this.state.description
            ) : (
              <span>No description</span>
            )}
          </p>
          <hr />
          <p className="photo--font-tag font-weight-bold">
            Tags:
          </p>
          <div className="photo--tag-container">
            {tagList}
          </div>
        </div>
      </div>
    )
  }
}


export default FlickrImage;
