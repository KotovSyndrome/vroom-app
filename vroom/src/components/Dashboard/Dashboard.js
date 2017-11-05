/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';


/*
 * Class: Dashboard
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main screen on the application
 */
export default class Dashboard extends Component {

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => ({

      /*
       * navigationOptions: title
       * Author: Alec Felt
       *
       * Purpose: Add logo to navbar
       */
      title: <Image style={styles.icon_header} source={require('../../../assets/img/ios.png')}/>,

      /*
       * navigationOptions: headerStyle, headerRight
       * Author: Elton C. Rego, Alec Felt
       *
       * Purpose: Add color/font to navbar
       *          Add button on headerRight for navigation
       *          options in the future
       *
       * TODO: style Back button on the navbar
       * TODO: add navigation functionaility to Next button
       * TODO: get Next/Back button styled with Nunito fontFamily
       *       (for some reason I couldn't figure out how to)
       */
      headerStyle: {
        fontFamily: 'Nunito',
        backgroundColor: GLOBAL.COLOR.DARKGRAY
      },
      headerRight: (
        // example navigation:
        //  onPress={() => {navigation.navigate('Login');}}
        <TouchableOpacity onPress={() => { ; }}>
          <Text style={styles.button_header}>Next</Text>
        </TouchableOpacity>
      )
  });

  /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   *
   * Purpose: Sets the state text for the card naming
   * props: the properties passed in from the super class (index.js)
   */
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    };

  /*
   * Method: updateMenuState, onMenuItemSelected, toggle
   * Author: Tianyi Zhang
   *
   * Purpose: Functions for SideMenu
   * props:
   */

  toggle() {
    this.setState({
      isOpen:!this.state.isOpen,
      });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    return (
  /*
   * Method: SideMenu
   * Author: Tianyi Zhang
   *
   * Purpose: SideMenu Bar
   */
     <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
      
      <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
      <Text>Menu</Text>        
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </SideMenu>
    );
  }
}


const styles = StyleSheet.create({
  /*
   * Style: Icon Header
   * Author: Alec Felt
   * Purpose: Add style to the navbar icon
   *          to stay consistent with project theme
   */
   icon_header: {
     height: 35,
     width: 35,
     marginTop: 7
   },

   /*
    * Style: Button Header
    * Author: Alec Felt
    * Purpose: Add style to the navbar button
    *          to stay consistent with project theme
    */
    button_header: {
      fontSize: 16,
      fontFamily: 'Nunito',
      color: GLOBAL.COLOR.GREEN,
      marginTop: 5,
      marginRight: 4
    },
});
