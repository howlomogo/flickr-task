import React, { Component } from 'react';
import $ from 'jquery';

// Components
import Header from './components/Header';
import PhotoList from './components/PhotoList';
import DevHelper from './components/DevHelper';
import Filter from './components/Filter';

class App extends Component {
	constructor() {
		super();
		this.state = {
			photos: [],
			searchedTag: 'themepark'
		}
		this.getFlickrImages = this.getFlickrImages.bind(this);
	}

	componentDidMount() {
		this.getFlickrImages(this.state.searchedTag);
	}

	// tag to search for, should page navigate to searchbar
	getFlickrImages(tag, moveTop) {
		if(moveTop) {
				var $target = $('#top');
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 200, 'swing');
		}

		const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

		let state = this;
		$.getJSON( flickrAPI, {
			tags: tag,
			tagmode: "any",
			format: "json"
		})
		.done(function( data ) {
			state.setState({
				photos: data.items,
				searchedTag: tag
			})
		});
	}


	render() {
		return (
			<div>
				<Header />
				<Filter
					appState={this.state}
					getFlickrImages={this.getFlickrImages}
				/>

				<PhotoList
					appState={this.state}
					getFlickrImages={this.getFlickrImages}
				/>

				{/* <DevHelper
					state={this.state}
				/> */}
			</div>
		)
	}
}

export default App;
