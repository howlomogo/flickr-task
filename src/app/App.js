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
			photos: []
		}
		this.getFlickrImages = this.getFlickrImages.bind(this);
	}

	componentDidMount() {
		this.getFlickrImages('skateboarding');
	}

	getFlickrImages(tags) {
		const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

		let state = this;
		$.getJSON( flickrAPI, {
			tags: tags,
			tagmode: "any",
			format: "json"
		})
		.done(function( data ) {
			state.setState({
				photos: data.items
			})
		});
	}


	render() {
		return (
			<div>
				<Header />
				<Filter
					getFlickrImages={this.getFlickrImages}
				/>

				<PhotoList state={this.state} />

				<DevHelper
					state={this.state}
					getFlickrImages={this.getFlickrImages}
				/>
			</div>
		)
	}
}

export default App;
