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
			searchedTag: 'themepark' // Default search tag
		}
		this.getFlickrImages = this.getFlickrImages.bind(this);
	}

	// Get images once component is loaded
	componentDidMount() {
		this.getFlickrImages(this.state.searchedTag);
	}

	// (tag to search for, should page navigate to searchbar)
	getFlickrImages(tag, moveTop) {
		// Scroll to top of page if user selects a tag
		if(moveTop) {
				var $target = $('#top');
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 200, 'swing');
		}

		{ /*retrieving data using JSONP, This is my older version of the task using the exact public feed URL given for the task, please see updated version, for better approach */}
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

	// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg img url


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
