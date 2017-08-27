import React, {Component} from 'react';
import $ from 'jquery';

class FlickrImage extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      tags: '',
      authorUsername: '',
      authorRealname: ''
		}
  }

  // Use Flickrs getInfo call to retrieve data for this image.
  componentWillMount() {

    const flickerAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.getInfo";

    let state = this;
    $.getJSON( flickerAPI, {
      api_key: '8d3a64fc8d70ca2536d92ce9a4d70281',
      photo_id: this.props.photo.id,
      format: 'json',
      nojsoncallback: 1
      // auth_token: '72157685746730583-b9beea5e43fbfd11',
      // api_sig: '0421587924739ed3e518e67bd9bd1fb2'
    })
    .done(function( info ) {
      console.log(info.photo);



      state.setState({
        description: info.photo.description._content,
        tags: info.photo.tags.tag,
        authorUsername: info.photo.owner.username,
        authorRealname: info.photo.owner.realname
      }, console.log(state));
    });

  }




  render() {

    // Masonry should be loaded after componentWillMount


 // https://farm{this.props.photo.farm}.staticflickr.com/{this.props.photo.server}/{this.props.photo.id}_{this.props.photo.secret}.jpg


    return(
      <div className="photo--container">
        <img className="photo--img" src={"https://farm" + this.props.photo.farm + ".staticflickr.com/" + this.props.photo.server + "/" + this.props.photo.id + "_" + this.props.photo.secret + ".jpg"} />
        <div className="photo--content-container">
          <a className="photo--font-title mb-2" href={this.props.photoLink} target='_blank'>
            {this.props.photo.title}
          </a>

          <a className="photo--font-author" href={this.props.authorLink} target='_blank'>
            <span className="font-weight-bold">By: </span>
            {this.state.authorUsername}
          </a>

          <p className="photo--font-description">
            <span className="font-weight-bold">Description: </span>
            {this.state.description}
          </p>
          <hr />
          <p className="photo--font-tag font-weight-bold">
            Tags:
          </p>
          <div className="photo--tag-container">
            <h5>Tag List</h5>
          </div>
        </div>
      </div>
    )
  }
}


export default FlickrImage;
