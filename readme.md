# Flickr Task App by Matt Pilcher

To run the web app locally
- clone from git
- run "npm install"
- run "npm install --save bootstrap@4.0.0-alpha.6" (Bootstrap is overwritten otherwise unfortunately have run out of time this weekend to debug this further)
- run "webpack" to generate production code
- run "webpack-dev-server" for local development server

DEMO - www.mattpilcher.co.uk/sites/flickr

##### Features of the application
- Displaying Flickr public images
- Ability to search Flickr feed and display results based on tag and input
- Ability to click on tags of already found images to search for that tag
- Created as a single page application in React
- Using Sass and Bootstrap, Webpack
- Using Masonry React Component for clean alignment of images
- Creation of infinite scrolling
- Cross Browser tested (IE, Chrome, Firefox & safari), Responsive


Features which could be added in the future
- Polish the infinite scrolling, I'd have the images come in one by one to reduce load time.
- Add an initial loading animation
- Add more filters

***

###### Cross browser tested, however would recommend viewing in Chrome for best results.

###### Please note the API KEY may need updating before viewing as it expires quickly, if no images load this will be the reason and simply a new api key needs to be used. However hopefully this is not an issue

##### To view an older version of the task I created which uses the exact public api provided -> (https://api.flickr.com/services/feeds/photos_public.gne?format=json), Please visit this link https://github.com/howlomogo/flickr-task-publicfeed-old
