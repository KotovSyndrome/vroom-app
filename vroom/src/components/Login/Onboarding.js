/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');

// Components
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Animation from 'lottie-react-native';
import {firebaseRef} from '../../../index';
import { goTo, clearNavStack } from '../Navigation/Navigation';
import { Dropdown } from 'react-native-material-dropdown';

// Files Needed
import revi from '../../../assets/animations/revi-hi.json';
import revi_on from '../../../assets/animations/revi-on.json';
import revi_super_happy from '../../../assets/animations/revi-super-happy.json';

/*
 * Class: Onboarding
 * Author: Elton C.  Rego
 *
 * Purpose: Walks the user through naming their car and then
 *   takes in the make, model, and year of their vehicle.
 *
 * TODO: Create a Revi object
 * TODO: Animate a Revi object
 * TODO: Take in make, model, and year and end this screen
 */

export default class Onboarding extends Component {

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = {
    title: 'Welcome',
    header: null,
    drawerLockMode: 'locked-closed',
  };

   /*
   * Method: componentDidMount()
   * Author: Elton C. Rego
   *
   * Purpose: When a component specified sucessfully is rendered,
   *   it runs the action
   */
  componentDidMount() {
    setTimeout(() => {
      if(this.scrollView != null){
        this.scrollView.scrollTo({x: -16})
      }
    }, 1);
    this.animation.play();
    this.animation2.play();
  }

   /*
   * Method: constructor(props)
   * Author: Elton C. Rego
   *
   * Purpose: Sets the state text for the card naming
   * props: the properties passed in from the super class (index.js)
   */
  constructor(props) {
    super(props);
    this.state = {
      text: 'My Car',
      show_last_card: false,
      scroll_enabled: true,
      text_button: 'Next',
      button_switch: false,
      user: firebaseRef.database().ref("users/").child(firebaseRef.auth().currentUser.uid),
      scroll_pos: 0,
      make: null,
      model: null,
      year: null,
    };
  }

  /*
   * Method: nameEntered()
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: On invocation, check dropdown input,
   *          update user's database entry, show the last card,
   *          and scroll to it
   */
  nameEntered() {
    // Checks the state variables associated with the make,year,model dropdowns
    if(!(this.state.make==null) && !(this.state.model==null) && !(this.state.year==null)) {
      this.setState({show_last_card: true});
      this.scrollView.scrollTo({x: this.state.scroll_pos + 344, y:0, animated: true});
      this.setState({
        scroll_enabled: false,
        text_button: `Continue to ${this.state.text}`
      });
      this.animation3.play();
      // populates user's Firebase entry
      this.state.user.child('vehicles').set({
        1:{
          name: this.state.text,
          year: this.state.year,
          make: this.state.make,
          model: this.state.model,
        }
      });
    // make,year,model dropdowns haven't been properly set
    } else {
      alert("Error: please set Make, Year, and Model dropdowns");
    }
  }

  /*
   * Method: goToScrollView()
   * Author: Teeny
   *
   * Purpose: On invocation scrolls to the next page
   *   in the onboarding
   */
  goToScrollView() {
    if(this.state.button_switch){
      Keyboard.dismiss();
      this.nameEntered();
    } else {
      if(this.state.scroll_enabled && this.state.scroll_pos != 672){
        this.scrollView.scrollTo({x: this.state.scroll_pos + 344, y: 0, animated: true});
      }
    }
  }


  handleScroll(event){
    if(event.nativeEvent.contentOffset.x == 672){
      this.setState({
        scroll_pos: event.nativeEvent.contentOffset.x,
        button_switch: true,
        text_button: 'Submit',
      })
    } else {
      this.setState({scroll_pos: event.nativeEvent.contentOffset.x});
    }
  }

  /*
   * Method: goToDashboard()
   * Author: Elton C. Rego
   *
   * Purpose: On invocation, clears the stack and navigates
   *   to the dashboard.
   */
  goToDashboard() {
     clearNavStack(this.props.navigation, 'MainApp');
  }

  /*
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Renders the onboarding page.
   *  There are three current cards with information about how
   *  to name your car
   *
   */
  render() {

    /*
     * Variable: last_card
     * Author: Elton C. Rego
     *
     * Purpose: Sets the value of last_card based on the
     *   boolean value of show_last_card. If true, card
     *   is visible and animation is playable, if not vise
     *   versa.
     */
    var last_card = this.state.show_last_card ?
      <View style={styles.card}>
        <Text style={styles.card_title}>{this.state.text}</Text>
          <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation3 = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi_super_happy}
              />
          </View>
        <Text style={styles.card_text}>{"I love it!"}</Text>
      </View>
      :
      <View style={styles.card_inactive}>
        <Text style={styles.card_title}>{this.state.text}</Text>
          <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation3 = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi_super_happy}
              />
          </View>
        <Text style={styles.card_text}>{"I love it!"}</Text>
      </View>;

    /*
     * Variable: next_button
     * Author: Elton C. Rego
     *
     * Purpose: Sets the value of next_button based on the
     *   boolean value of scroll_enabled. If scrolling is
     *   possible, allow button to be show, if not do not show
     *   button.
     */
    var next_button = this.state.scroll_enabled ?
      <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={
            () => this.goToScrollView()
        }>
          <Text style={styles.buttonText}>{this.state.text_button}</Text>
      </TouchableOpacity>
      : <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={
            () => this.goToDashboard()
        }>
          <Text style={styles.buttonText}>{this.state.text_button}</Text>
      </TouchableOpacity>;

      /*
     * Variable: year-make-model
     * Author: Tianyi Zhang
     *
     * Purpose: Data for the dropdown picker
     */
      let year = [{
      value: '1990',
    }, {
      value: '1991',
    }, {
      value: '1992',
    }, {
      value: '1993',
    },{
      value: '1994',
    },{
      value: '1995',
    },{
      value: '1996',
    },{
      value: '1997',
    },{
      value: '1998',
    }];

    let make = [{
      value: 'Acura',
    }, {
      value: 'BMW',
    }, {
      value: 'Civic',
    }];

    let model = [{
      value: 'Model 1',
    }, {
      value: 'Jetta',
    }, {
      value: 'Model 3',
    }];

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <StatusBar
         barStyle="light-content"
       />
        <View style={styles.cards_container}>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollView
          ref={(scrollView) => { this.scrollView = scrollView; }}
          style={styles.scroll}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={312+32}
          snapToAlignment={"center"}
          showsHorizontalScrollIndicator={false}
          contentInset={{
            top: 0,
            left: 16,
            bottom: 0,
            right: 16,
          }}
          scrollEnabled={this.state.scroll_enabled}
          onScroll={(event) => {this.handleScroll(event);}}
        >
          {/* Card 1 */}
          <View style={styles.card}>
            <Text style={styles.card_title}>{"Hello!"}</Text>
            <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={false}
                source={revi}
              />
            </View>
            <Text style={styles.card_text}>{"I'm your car!"}</Text>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <Text style={styles.card_title}>{"I am a:"}</Text>
            <View style={{
              backgroundColor: 'white',
              alignSelf: 'stretch',
              marginHorizontal: 20,
              marginTop: -10,
            }}>
              <Dropdown
                label='Year'
                data={year}
                onChangeText={(value,index,data) => {this.setState({year: value});}}
              />
              <Dropdown
                label='Make'
                data={make}
                onChangeText={(value,index,data) => {this.setState({make: value});}}
              />
              <Dropdown
                label='Model'
                data={model}
                onChangeText={(value,index,data) => {this.setState({model: value});}}
              />
            </View>
            <Text style={styles.card_text}></Text>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <Text style={styles.card_title}>{"My name is..."}</Text>
             <View style={styles.revi_animations}>
              <Animation
                ref={animation => {this.animation2 = animation;}}
                style={{width: '100%', height: '100%',}}
                loop={true}
                source={revi_on}
              />
            </View>
            <TextInput
              style={styles.card_text_input}
              placeholder="Type in my name!"
              onChangeText={(text) => {this.setState({text});}}
              underlineColorAndroid={'#ffffff'}
              onSubmitEditing={ () => {
                this.nameEntered();
              }}
            />
          </View>

          {/* Card 4: Hide if no name*/}
          {last_card}
        </ScrollView>
        </View>
        {next_button}
      </KeyboardAvoidingView>
    );
  }
}

/*
 * Styles for this Page
 * Author: Elton C. Rego
 */
const styles = StyleSheet.create({

  /*
   * Style: Button
   * Author: Elton C. Rego
   * Purpose: This styles the Next button
   */
  buttonContainer: {
    backgroundColor: GLOBAL.COLOR.GREEN,
    padding: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Nunito',
    color: GLOBAL.COLOR.DARKGRAY,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '600',
  },

  /*
   * Style: Container
   * Author: Elton C. Rego
   * Purpose: This styles the entire background of this page
   */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GLOBAL.COLOR.DARKGRAY,
  },

  /*
   * Style: scroll
   * Author: Elton C. Rego
   * Purpose: This styles the scroll
   */
  cards_container: {
    height: 350,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 32,
  },

   /*
   * Style: Card
   * Author: Elton C. Rego
   * Purpose: This styles the card view within this page
   */
  card: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: 312,
    height: 344,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    margin: 16,
  },

  /*
   * Style: Card
   * Author: Elton C. Rego
   * Purpose: This styles the card view within this page
   */
  card_inactive: {
    display: 'none',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    width: 312,
    height: 344,
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    margin: 16,
  },

   /*
   * Style: Card Title
   * Author: Elton C. Rego
   * Purpose: This styles the card titles on this page
   */
  card_title: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    color: GLOBAL.COLOR.DARKGRAY,
    textAlign: 'center',
    fontSize: 40,
    marginTop: 32,
  },

   /*
   * Style: Card Text
   * Author: Elton C. Rego
   * Purpose: This styles the card descriptions
   */
  card_text: {
    fontFamily: 'Nunito',
    textAlign: 'center',
    color: GLOBAL.COLOR.DARKGRAY,
    fontSize: 20,
    marginBottom: 32,
  },

  /*
   * Style: Card Text Input
   * Author: Elton C. Rego
   * Purpose: This styles the card descriptions
   */
  card_text_input: {
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
   * Style: Revi
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi: {
    resizeMode: 'contain',
    height: 120,
    width: 120,
  },

   /*
   * Style: Revi Animations
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi_animations: {
    alignSelf: 'center',
    height: 240,
    width: 240,
    zIndex:2,
    marginTop: -32,
  },

  /*
   * Style: Revi Super
   * Author: Elton C. Rego
   * Purpose: This styles the Revis on each card
   */
  revi_super: {
    resizeMode: 'contain',
    height: 120,
    width: 120,
  },

});
