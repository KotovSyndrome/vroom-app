/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

// Components
import {
  FlatList,
  StyleSheet,
  View} 
from 'react-native';
import ListItem from './ListItem';

/*
 * Class: SwipeableList
 * Author: Elton C.  Rego
 *
 * Purpose: Takes in an array of items and displays a swipe-to-delete list
 */
export default class SwipeableList extends Component {

  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.success = this.success.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      data: this.props.data,
      border_color: this.props.borderColor,
    };
  }

  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  success(key) {
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({
      data,
    });
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  renderItem(item) {
    return (
      <ListItem
        text={item.key}
        success={this.success}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.state.data}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => this.renderItem(item)}
        scrollEnabled={this.state.enable}
      />
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 2,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 4,
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
});