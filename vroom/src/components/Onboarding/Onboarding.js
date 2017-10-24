/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Sound,
} from 'react-native';
import Animation from 'lottie-react-native';
import Login from '../Login/Login';
import revi from '../../../assets/animations/revi-hi.json';

GLOBAL = require('../../Globals');

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
   * Method: goToLoginPage()
   * Author: Elton C. Rego
   *
   * Purpose: On invocation, will push the LoginPage
   *   component onto the view stack.
   *   (Loads the screen.)
   */
  goToLoginPage() {
    const { navigate } = this.props.navigation;
    navigate('Login');
  }

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = {
    title: 'Welcome',
    header: null,
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
      this.scrollView.scrollTo({x: -16})
    }, 1);
    this.animation.play();
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
    };
  }

  /*
   * Method: nameEntered()
   * Author: Elton C. Rego
   *
   * Purpose: On invocation, show the last card
   *   and scroll to it
   */
  nameEntered() {
    this.setState({show_last_card: true});
    this.scrollView.scrollTo({x: 672, y:0, animated: true});
    this.setState({scroll_enabled: false});
  }

  /*
   * Method: goToScrollView()
   * Author: Teeny
   *
   * Purpose: On invocation scrolls to the next page
   *   in the onboarding
   */
  goToScrollView() {
    if(this.state.scroll_enabled){
      this.scrollView.scrollTo({x: 328, y: 0, animated: true});
    }
  }




  /*
   * Method: render
   * Author: Elton C. Rego
   *
   * Purpose: Renders the onboarding page.
   *  The onboarding page has nothing right now.
   *
   */
  render() {

    var last_card = this.state.show_last_card ?
      <View style={styles.card}>
        <Text style={styles.card_title}>{this.state.text}</Text>
          <Image
            style={styles.revi_super}
            source={require('../../../assets/img/car-super-good.png')}
          />
        <Text style={styles.card_text}>{"I love it!"}</Text>
      </View>
      : null;

    var next_button = this.state.scroll_enabled ?
      <TouchableOpacity
          style={styles.buttonContainer}
          activeOpacity={0.8}
          onPress={
            () => this.goToScrollView()
        }>
          <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      : null;


    // Grabs the width of the device screen and sets it to 'width'
    const { width } = Dimensions.get('window');

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >

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
            <Text style={styles.card_title}>{"My name is.."}</Text>
            <Image
              style={styles.revi}
              source={require('../../../assets/img/car-good.png')}
            />
            <TextInput
              style={styles.card_text_input}
              placeholder="Type in my name!"
              onChangeText={(text) => this.setState({text})}
              underlineColorAndroid={'#ffffff'}
              onSubmitEditing={ () => this.nameEntered()}
            />
          </View>

          {/* Card 3: Hide if no name*/}
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
   * Author: Tianyi Zhang
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
  scroll: { },

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

  inactive: {},
});
