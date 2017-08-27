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
			pageNumber: 1,
			searchedTag: 'themepark' // Default search tag
		}
		this.gotoNextResults = this.gotoNextResults.bind(this);
		this.getFlickrImages = this.getFlickrImages.bind(this);
	}

	// Get images once component is loaded
	componentDidMount() {
		this.getFlickrImages(this.state.searchedTag);
	}

	// When you reach the bottom of page use infinite scroll to show more, load in the next page of results from flickr and append them to the masonry grid.
	gotoNextResults() {
		console.log('Get next results');
		this.setState({
			pageNumber: this.state.pageNumber + 1
		}, this.getFlickrImages(this.state.searchedTag, false))
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

		const flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&";

		let state = this;
		$.getJSON( flickrAPI, {
			nojsoncallback: 1,
			format: 'json',
			api_key: '8d3a64fc8d70ca2536d92ce9a4d70281',
			tags: tag,
			per_page: 20,
			page: this.state.pageNumber
		})
		.done(function( data ) {
			console.log(data.photos.photo);
			state.setState({
				photos: data.photos.photo,
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
					gotoNextResults={this.gotoNextResults}
				/>

				<DevHelper
					state={this.state}
				/>
			</div>
		)
	}
}

export default App;
