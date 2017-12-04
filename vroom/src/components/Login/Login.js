// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  ScrollView,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
} from 'react-native';
import Onboarding from '../Screens/Onboarding';
import Dashboard from '../Screens/Dashboard';
import {
  goTo,
  clearNavStack,
  goToDrawerNav
} from '../Navigation/Navigation';
import {
  databaseLogin,
  databaseSignup,
  authListener,
  firebaseRef,
} from '../Database/Database';

export default class EmailPasswordLogin extends Component {

 /*
  * Author: Alec Felt
  * Purpose: Set up state for this specific component
  */
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      email_signup: null,
      password: null,
      password_signup: null,
      password_signup_verification: null,
      signup: true,
    }
  }

  componentDidMount() {
    console.log("Login component mounted");
  }

  // Author: Alec Felt, Connick Shields
  // Purpose: Checks state.email and state.password and
  //          authenticates the user with Firebase
  login = () => {
    //check to see if any text fields are empty
    if((!this.state.email) || (!this.state.password)){
        alert('Please make sure to fill in all fields.');
        return;
    }

    // login the user
    databaseLogin(this.state.email, this.state.password);
  }

  // Author: Connick Shields
  // Purpose: navigates to a signup component

  signup = () => {
    // check to see if any text fields are empty
    if((!this.state.email_signup) || (!this.state.password_signup)){
        Alert.alert('Please make sure to fill in all fields.');
        return;
    }
    // make sure passwords match
    if(this.state.password_signup != this.state.password_signup_verification){
        Alert.alert('Please make sure both passwords match.');
        return;
    }

    // sign up the user
    databaseSignup(this.state.email_signup, this.state.password_signup);
  }

  // Author: Connick Shields
  // Purpose: swap view cards
  swapCards(){
    if(this.state.signup){
      // go to sign up
      this.setState({signup:!this.state.signup});
    } else {
      // go to sign in
      this.setState({signup:!this.state.signup});
    }
  }

  // Author: Alec Felt
  // Purpose: Renders UI for login
  render() {

    var sign_in_card = this.state.signup ?
      <View style={styles.card}>
        <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="email"
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({email: text});
              this.setState({email_signup: text});
            }}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({password: text});
              this.setState({password_signup: text});
            }}
            onSubmitEditing={ () => {
              this.login();
            }}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => this.login() }
            style={styles.button_container}
          >
            <View>
              <Text style={styles.button}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.signin}
            onPress={ () => this.swapCards() }
            >No account? Sign up!</Text>
          </View>
        </View>
          :
        <View style={styles.card}>
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="email"
            autoCapitalize="none"
            onChangeText={(text) => {
              this.setState({email: text});
              this.setState({email_signup: text});
            }}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({password: text});
              this.setState({password_signup: text});
            }}
            underlineColorAndroid='transparent'
          />
          <TextInput
            placeholderTextColor={GLOBAL.COLOR.GRAY}
            style={styles.input}
            placeholder="retype password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={ (text) => this.setState( {password_signup_verification: text} ) }
            onSubmitEditing={ () => {
              this.signup();
            }}
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={ () => {
              this.signup();
            }}
            style={styles.button_container}
          >
            <View>
              <Text style={styles.button}>Sign Up</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.signin}
            onPress={ () => this.swapCards() }
            >Have an account? Sign in!</Text>
          </View>
        </View>;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
       <StatusBar
         barStyle="light-content"
       />
        <View style={styles.header}>
          <Text style={styles.vroom}>vroom</Text>
          <Text style={styles.tag_line}>The app that keeps your car happy!</Text>
        </View>
        {sign_in_card}
      </KeyboardAvoidingView>
    );
  }

}

/*
 * Styles for this Page
 * Author: Connick Shields
 *
 */
const styles = StyleSheet.create({

  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the card titles on this page
   */
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the header part of this page
   */
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the title page of the app
   */
  vroom: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 80,
    color: GLOBAL.COLOR.GREEN,
    marginTop: 20,
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the tagline of the application
   */
  tag_line: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffff',
    marginBottom: 20
  },
  /*
   * Style: Container
   * Author: Connick Shields
   * Purpose: This styles the sign in line
   */
  signin: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    fontSize: 15,
    color: GLOBAL.COLOR.GRAY,
    marginTop: 10,
  },
  /*
   * Style: button
   * Author: Elton C. Rego
   * Purpose: Adds styling to the touchable opacity elements
   */
   button_container: {
      backgroundColor: GLOBAL.COLOR.GREEN,
      padding: 12,
      paddingHorizontal: 24,
      borderRadius: 20,
      margin: 8,
   },
  /*
   * Style: button
   * Author: Alec Felt
   * Purpose: add style to the login and signup buttons
   */
  button: {
    textAlign: 'center',
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.WHITE,
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: '600',
  },
  /*
   * Style: input
   * Author: Alec Felt
   * Purpose: adds alignment/spacing to the textInputs
   */
  input: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: 32,
    borderBottomWidth: 2,
    paddingBottom: 2,
    width: '80%',
    borderColor: GLOBAL.COLOR.GREEN,
  },
  /*
   * Style: input_container
   * Author: Elton
   * Purpose: Creates a card for the inputs to sit on
   */
  card: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: 312,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    paddingTop: 32,
    paddingBottom: 32,
  },
});