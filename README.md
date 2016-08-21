# Gigs

This is a very simple [React Native](https://github.com/facebook/react-native) test app for iOS. It allows you to search for upcoming gigs of an artist. The data for this is coming from from the [Bandsintown API](https://www.bandsintown.com/api/overview).

## Requirements

Please check the requirements [listed](http://facebook.github.io/react-native/docs/getting-started.html#requirements) on the React Native site.

## Setup

1. Clone repository
2. Install dependencies:

	```
	npm install
	```

## For iOS

You need to have Xcode installed. Then go to the iOS folder of the Gigs app, double-click ```Gigs.xcodeproj``` to start Xcode. In there, click "Run" to start the simulator and open the app.

## For Android

Developing for Android requires a bit more preparation. The [React Native site](http://facebook.github.io/react-native/docs/getting-started.html#requirements) has infos on what you need to do.

I use [Genymotion](https://www.genymotion.com) for Android testing since I had issues when trying to work with virtual devices of Android Studio.

## Tests

Setting up [Jest](http://facebook.github.io/jest/) for a React Native project seems to be a bit tricky (though that might have changed by now). There is an issue on Github that helped me getting it to work: https://github.com/facebook/react-native/issues/700 (hat tip to [naoufal](https://github.com/naoufal)).

To run the tests:

```
npm test
```