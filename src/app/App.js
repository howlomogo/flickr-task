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

		const flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&";

		let state = this;
		$.getJSON( flickrAPI, {
			nojsoncallback: 1,
			format: 'json',
			api_key: '8d3a64fc8d70ca2536d92ce9a4d70281',
			// api_sig: 'ce3324b11aafc3e834d2ed98f1d56404',
			tags: tag,
			per_page: 20
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
				/>


				{/* <DevHelper
					state={this.state}
				/> */}
			</div>
		)
	}
}

export default App;
