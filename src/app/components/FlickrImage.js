import React, {Component} from 'react';

class FlickrImage extends Component {
  constructor() {
    super();
    this.getAuthor = this.getAuthor.bind(this);
    this.getAuthorLink = this.getAuthorLink.bind(this);
  }

  getAuthor(author) {
    // Get username without email
    const start = author.indexOf('"');
    const name = author.slice(start + 1, author.length -2);
    return name;
  }

  getAuthorLink(link) {
    // Remove photo id from end of link and link to authors page
    const authorLink = link.split('/').slice(4,5);
    return 'https://www.flickr.com/photos/' + authorLink;
  }


  render() {
    const tags = this.props.photo.tags.split(' ');
    const tagList = tags.map((tag) => {
      return(
        <div className="photo--tag" key={tag}>{tag}</div>
      )
    })

    return(
      <div className="photo--container">
        <img className="photo--img" src={this.props.photo.media.m} />
        <div className="photo--content-container">
          <a className="photo--font-title" href={this.props.photo.link} target='_blank'>
            {this.props.photo.title}
          </a>


          <a className="photo--font-author" href={this.getAuthorLink(this.props.photo.link)} target='_blank'>
            by: {this.getAuthor(this.props.photo.author)}
          </a>

          <p className="photo--font-description">
            Description: {this.props.photo.decription}
          </p>
          <p className="photo--font-tag">
            Tags:
          </p>
          <hr />
          <div className="photo--tag-container">
            {tagList}
          </div>
        </div>
      </div>
    )
  }
}


export default FlickrImage;
