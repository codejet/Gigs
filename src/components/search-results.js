import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.response)
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  handleRowPress(gigId) {
    const gig = this.props.response.filter(prop => prop.id === gigId)[0];

    this.props.navigator.push({
      title: 'Gig',
      name: 'gig',
      passProps: { gig }
    });
  }

  renderRow(rowData, sectionID, rowID) {
    const { date, rowContainer, separator, textContainer, title } = styles;
    const { formatted_datetime, formatted_location, id, venue } = rowData;
    const dateWithoutTime = formatted_datetime.split(' at ')[0];

    return (
      <TouchableHighlight onPress={() => this.handleRowPress(id)}
          underlayColor='#dddddd'>
        <View>
          <View style={rowContainer}>
            <View style={textContainer}>
              <Text style={date}>{dateWithoutTime}</Text>
              <Text style={title} numberOfLines={1}>Location: {formatted_location}</Text>
              <Text style={title} numberOfLines={1}>Venue: {venue.name}</Text>
            </View>
          </View>
          <View style={separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  renderHeader() {
    const thumbUrl = this.props.response[0].artists[0].thumb_url;
    const {thumb, containerCenteredContent} = styles;

    if (!thumbUrl) { return };

    return (
      <View style={containerCenteredContent}>
        <Image style={thumb} source={{ uri: thumbUrl }} />
      </View>
    );
  }

  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader} />
    );
  }

  renderMessage(errors) {
    const { containerCenteredContent, text } = styles;
    const message = errors ? errors[0] : 'No gigs found';

    return (
      <View style={containerCenteredContent}>
        <Text style={text}>
          {message}
        </Text>
      </View>
    );
  }

  render() {
    const errors = this.props.response.errors;

    return (errors != null || !this.props.response.length) ? this.renderMessage(errors) : this.renderListView();
  }
}

const styles = StyleSheet.create({
  containerCenteredContent: {
    alignItems: 'center',
    marginTop: 65
  },
  date: {
    color: '#0E7E8B',
    fontSize: 20,
    fontWeight: 'bold'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  separator: {
    backgroundColor: '#dddddd',
    height: 1
  },
  textContainer: {
    flex: 1
  },
  text: {
    color: '#656565',
    fontSize: 20
  },
  thumb: {
    height: 80,
    width: 80
  },
  title: {
    color: '#656565',
    fontSize: 20
  }
});
