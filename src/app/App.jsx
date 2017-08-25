import React, { Component } from 'react';
import $ from 'jquery';

// Components
import FlickrImage from './components/FlickrImage';

class App extends Component {
	constructor() {
		super();
		this.state = {
			items: []
		}
		this.getFlickrImages = this.getFlickrImages.bind(this);
		this.showProps = this.showProps.bind(this);
	}

	componentDidMount() {
		this.getFlickrImages('skateboarding');
	}

	showProps() {
		console.log(this.state);
	}

	// tags
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
				items: data.items
			})
		});
	}


	render() {
		return (
			<div className="container someclass">
				<div className="row">
					<FlickrImage />


					<div id="images"></div>
					<button onClick={this.showProps.bind(this)}>Show props</button>
					<button onClick={this.getFlickrImages('snowboarding')}>Get snowboard images</button>
				</div>
			</div>
		)
	}
}

export default App;
