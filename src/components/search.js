import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import SearchResults from './search-results';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    };
  }

  getQueryUrl(searchString) {
    return `http://api.bandsintown.com/artists/${searchString}/events.json?api_version=2.0&app_id=gigs`;
  };

  handleResponse(response) {
    this.setState({ isLoading: false , message: '' });
    this.props.navigator.push({
      title: 'Gigs',
      name: 'searchResults',
      passProps: {response}
    });
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  executeQuery(queryUrl) {
    this.setState({ isLoading: true });
    fetch(queryUrl)
      .then(response => response.json())
      .then(json => this.handleResponse(json))
      .catch(error =>
         this.setState({
          isLoading: false,
          message: 'An error occurred: ' + error
       }));
  }

  handleSearchTextChange(event) {
    this.setState({ searchString: event.nativeEvent.text });
  }

  handleSearchPress() {
    const queryUrl = this.getQueryUrl(this.state.searchString);

    this.executeQuery(queryUrl);
  }

  render() {
    const { message, searchString } = this.state;
    const {
      button,
      buttonText,
      container,
      description,
      descriptionSmall,
      searchForm,
      searchInput,
      searchInputWrapper
    } = styles;
    const spinner = this.state.isLoading ? (<ActivityIndicator hidden='true' size='large'/>) : (<View/>);

    return (
      <View>
        <View style={container}>
          <Text style={description}>
            Search for upcoming gigs of an artist
          </Text>
          <Text style={descriptionSmall}>
            (powered by Bandsintown)
          </Text>
          <View style={searchForm}>
            <View style={searchInputWrapper}>
              <TextInput
                style={searchInput}
                value={searchString}
                underlineColorAndroid={'transparent'}
                onChange={event => this.handleSearchTextChange(event)}
                placeholder='artist name'
              />
            </View>
            <TouchableHighlight style={button} underlayColor="#99d9f4" onPress={() => this.handleSearchPress()}>
              <Text style={buttonText}>Go</Text>
            </TouchableHighlight>
          </View>
          {spinner}
          <Text style={description}>{message}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0E7E8B',
    flex: 1,
    flexDirection: 'row',
    height: 38,
    justifyContent: 'center',
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18
  },
  container: {
    alignItems: 'center',
    marginTop: 65,
    padding: 30
  },
  description: {
    color: '#656565',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
  descriptionSmall: {
    color: '#656565',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center'
  },
  searchForm: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    color: '#0E7E8B',
    fontSize: 18,
    height: 36,
    padding: 4,
  },
  searchInputWrapper: {
    borderWidth: 1,
    borderColor: '#0E7E8B',
    flex: 4,
    marginRight: 5,
  }
});
