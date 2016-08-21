import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import Search from './components/search';
import SearchResults from './components/search-results';
import Gig from './components/gig';

const routes = {
  search: Search,
  searchResults: SearchResults,
  gig: Gig,
};

export default class Gigs extends Component {
  renderScene(route, navigator) {
    const Component = routes[route.name];

    return <Component {...route.passProps} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'search'}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            navigationStyles={Navigator.NavigationBar.StylesIOS}
            style={styles.navigationBar}
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.name === 'search') {
                  return null;
                } else {
                  return (
                    <TouchableHighlight onPress={navigator.pop} underlayColor="#0E7E8B">
                      <Text style={styles.navigationButton}>Back</Text>
                    </TouchableHighlight>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) => {
                return null;
              },
              Title: (route, navigator, index, navState) =>
                { return (<Text style={styles.title}>Gigs</Text>); },
            }}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationBar: {
    backgroundColor: '#0E7E8B',
    height: 50,
  },
  navigationButton: {
    color: 'white',
    marginLeft: 10,
  },
  title: {
    alignItems: 'center',
    color: 'white',
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
