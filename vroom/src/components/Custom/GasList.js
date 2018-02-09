/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
STYLE = require('../../global-styles');

import {
  FlatList,
  StyleSheet,
  View
} from 'react-native';
import GasListItem from './GasListItem';

export default class GasList extends Component {

  /*
  * Method: Constructor()
  * Author: Elton C. Rego
  * Purpose: Sets up the component for use
  *   - sets renderSeparator to it's own name
  *   - sets success to it's own name
  *   - sets setScrollEnabled to it's own name
  *   - sets state variables
  *       > enable : whether or not the scholling is enabled
  *       > data : the list data passed in as a prop
  *
  * @param props - the props passed in from the parent component
  */
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.success = this.success.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: this.props.enable,
      data: this.props.data,
    };
  }


  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  success(key) {
    const data = this.state.data.filter((item) => {item.list_i.toString() !== key});
    this.setState({
      data: data,
    });
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  renderItem(item) {
    return (
      <GasListItem
        index={item.list_i.toString()}
        date={item.date}
        totalPrice={item.totalPrice}
        gallonsFilled={item.gallonsFilled}
        distanceSinceLast={item.distanceSinceLast}
        success={this.success}
        average={this.props.average}
        setScrollEnabled={enable => this.setScrollEnabled(enable)}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={this.props.style}
        data={this.state.data}
        keyExtractor={(item) => item.list_i.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => this.renderItem(item)}
        scrollEnabled={this.state.enable}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  separatorStyle: {
    height: 1,
    backgroundColor: 'rgba(37,50,55,0.20)',
  },
});
