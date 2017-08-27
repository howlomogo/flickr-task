import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import $ from 'jquery';

// Components
import FlickrImage from './FlickrImage';

class PhotoList extends Component {
  constructor() {
    super();
    // this.addItems = this.addItems.bind(this);
    // this.getItemElement = this.getItemElement.bind(this);
  }

  //
  // create new element - clikrimagecomponent
  // getItemElement() {
  //   var elem = document.createElement('div');
  //   elem.className = 'photo--container';
  //   return elem;
  // }

  // do not need to add items this way, as instead will update via state.
  // I will create own infinate scroll for this.
  // addItems() {
  //   // create new item elements
  //   var grid = document.querySelector('.masonry--container');
  //   var elems = [];
  //   var fragment = document.createDocumentFragment();
  //   for ( var i = 0; i < 3; i++ ) {
  //     var elem = this.getItemElement();
  //     fragment.appendChild( elem );
  //     elems.push( elem );
  //   }

  //   // append elements to container
  //   grid.appendChild( fragment );
  //   // add and lay out newly appended elements
  //   // msnry.appended( elems );
  //
  //   this.masonry.appended( elems );
  // }

  render() {

    $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
         console.log('Reached bottom of page, gotoNextResults');
       }
    });

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

            {/* Call get flickers for next page. append the items dont replace them*/}
            {/* <button className="btn btn-primary" onClick={() => this.addItems()}>
              Add Items
            </button> */}
          </div>
        </div>
      </div>
    )
  }
}


export default PhotoList;
