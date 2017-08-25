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
        <h5>
          <span>
            <a href={this.props.photo.link} target='_blank'>
              {this.props.photo.title}
            </a>
          </span>
        </h5>
        <h5>
          by &nbsp;
          <span>
            <a href={this.getAuthorLink(this.props.photo.link)} target='_blank'>
              {this.getAuthor(this.props.photo.author)}
            </a>
          </span>
        </h5>
        <p>
          Description: Description of the image
        </p>
        <h5>
          Tags:
        </h5>
        <hr />
        <div className="photo--tag-container">
          {tagList}          
        </div>
      </div>
    )
  }
}


export default FlickrImage;
