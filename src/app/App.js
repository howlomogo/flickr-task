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
			// The API_KEY may need to be updated
			API_KEY: 'e55481fc46aa96c8aeb7e1c6aa665780',
			photos: [],
			pageNumber: 1,
			searchedTag: 'themepark' // Default search tag
		}
		this.gotoNextResults = this.gotoNextResults.bind(this);
		this.getFlickrImages = this.getFlickrImages.bind(this);

		this.getFlickrImages(this.state.searchedTag);
	}

	// Get images once component is loaded
	componentDidMount() {
		this.getFlickrImages(this.state.searchedTag);
	}

	// When you reach the bottom of page load in the next page of results from flickr and append them to the masonry grid.
	gotoNextResults() {
		const flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&";

		let state = this;
		$.getJSON( flickrAPI, {
			nojsoncallback: 1,
			format: 'json',
			api_key: this.state.API_KEY,
			tags: this.state.searchedTag,
			per_page: 20,
			page: this.state.pageNumber + 1
		})
		.done(function( data ) {
			if(data.stat === 'fail') {
				console.log('Check API KEY / use another API_KEY');
			}
			else {
				state.setState({
					photos: state.state.photos.concat(data.photos.photo),
					pageNumber: state.state.pageNumber + 1
				});
			}
		});
	}

	// getFlickrImages(tag to search for, should page navigate to top)
	getFlickrImages(tag, moveTop) {
		// Scroll to top of page if user selects a tag
		if(moveTop) {
				var $target = $('#top');
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 200, 'swing');
		}

		const flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&";

		let state = this;
		$.getJSON( flickrAPI, {
			nojsoncallback: 1,
			format: 'json',
			api_key: this.state.API_KEY,
			tags: tag,
			per_page: 20,
			page: this.state.pageNumber
		})
		.done(function( data ) {
			if(data.stat === 'fail') {
				console.log('Check API KEY / use another API_KEY');
			}
			else {
				state.setState({
					photos: data.photos.photo,
					searchedTag: tag
				})
			}
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
					gotoNextResults={this.gotoNextResults}
				/>

				{/* <DevHelper
					state={this.state}
				/> */}
			</div>
		)
	}
}

export default App;
