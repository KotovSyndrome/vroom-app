/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

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

  render() {
    return (
      <View>
      </View>
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