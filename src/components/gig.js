import React, { Component } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const LAT_LNG_DELTA_DEFAULT = 1;

export default class Gig extends Component {
  getSupportActs(artists) {
    const supportActs = artists.filter((artist, index) => {return index > 0;}).map(artist => artist.name);

    return supportActs.length ? supportActs.join(', ') : '-';
  }

  handleButtonPress(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const { button, buttonText, container, map, separator, textContainer, text } = styles;
    const { gig } = this.props;
    const { artists, formatted_datetime, ticket_status, title } = gig;
    const time = formatted_datetime.split(' at ')[1];
    const artistWebsiteUrl = artists[0].website;

    return (
      <View>
        <View style={container}>
          <View>
            <Text style={text}>{title}</Text>
            <Text style={text}>With: {this.getSupportActs(artists)}</Text>
            <Text style={text}>Time: {time}</Text>
            <Text style={text}>Ticket status: {ticket_status}</Text>
            <TouchableHighlight style={button} underlayColor='#99d9f4' onPress={() => this.handleButtonPress(artistWebsiteUrl)}>
              <Text style={buttonText}>Artist website</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#0E7E8B',
    borderColor: '#0E7E8B',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    height: 36,
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18
  },
  container: {
    marginTop: 60,
    padding: 10
  },
  text: {
    color: '#656565',
    fontSize: 20,
    margin: 5
  },
});
