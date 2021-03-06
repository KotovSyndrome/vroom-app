/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */

// Global Requirements
import React, { Component } from 'react';
GLOBAL = require('../../Globals');
styleguide = require('../../global-styles');

// Components
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {InputField} from './../Custom/InputField'
import SwipeableList from "./../Custom/SwipeableList";


/*
 * Class: Loading
 * Author: Elton C.  Rego
 *
 * Purpose: A screen to be displayed while the app is loading
 */
export default class Loading extends Component {

  /*
   * Method: constructor(props)
   * Author: Will Coates 
   * State variables:
   * -planSelected: Which of the recommended plans the user has currently selected.
   *                Begins at 0, is updated to 1, 2, or 3 depending on which they click.
   * -plan(n)Company: the company that offers the #(n) recommended insurance plan.
   *                  Format: "Geico", or "Progressive"
   * -plan(n)Price:   the price (per month) of the #(n) recommended insurance plan
   *                  Format: "$X/mo"
   *  -plan(n)Blurb:  A brief description of the #(n) recommended insurance plan, and why we're recommending it in that slot.
   */
  constructor(props) {
    super(props);
   this.state = {
      planSelected: 0,

      plan1Company: "",
      plan1Price: "",
      plan1Blurb: "",

      plan2Company: "",
      plan2Price: "",
      plan2Blurb: "",

      plan3Company: "",
      plan3Price: "",
      plan3Blurb: "",

    };
    this.color1 = new Animated.Value(0);
    this.color2 = new Animated.Value(0);
    this.color3 = new Animated.Value(0);
  }

  // Moved the data from componentDidMount() to componentWillMount() so that the user will never see blank items
  componentWillMount(){
    // fetch data from the database
    // for now, we have dummy variables
    // TODO: actually calculate and fetch data for plans

    // set state variables (which plans are recommended, which plan is selected, etc.)
    this.state.plan1Company = "Geico";
    this.state.plan1Price = "$20/mo";
    this.state.plan1Blurb = "In your case, Geico offers the best liability and comprehensive coverage for the money.";

    this.state.plan2Company = "AAA";
    this.state.plan2Price = "$25/mo";
    this.state.plan2Blurb = "Assuming the same coverage, AAA comes in at a close second.";

    this.state.plan3Company = "Progressive";
    this.state.plan3Price = "$28/mo";
    this.state.plan3Blurb = "Progressive has a plan that fits your needs, but is a bit more expensive than the other options.";

  }

  componentDidMount() {
    console.log("Insurance Recommendations component mounted");

  }

  /*
   * Static: navigationOptions
   * Author: Elton C. Rego, Alec Felt
   *
   * Purpose: To set the navigation bar options for this page
   */
  static navigationOptions = ({navigation, screenProps}) => ({

      /*
       * navigationOptions: headerStyle, headerRight
       * Author: Elton C. Rego, Alec Felt
       *
       * Purpose: Add color/font to navbar
       *          Add button on headerRight for navigation
       *          options in the future
       */
      header: null,
  });

/*
 * Method: selectThis()
 * Author: Will Coates (with guidance from Elton Rego)
 *
 * Purpose: When a plan is selected, change its styling and
 *          record that it has been (temporarily) selected
 * @param: planNum: the number in the list that has been selected
 */
 selectThis(planNum){
  //change styling to accent, and the other two to non-accent
  if(planNum == 1){
    this.setActive(1);
    this.setInactive(2);
    this.setInactive(3);
  }
  else if(planNum == 2){
    this.setActive(2);
    this.setInactive(1);
    this.setInactive(3);
  }
  else if(planNum == 3){
    this.setActive(3);
    this.setInactive(1);
    this.setInactive(2);
  }

  //update selection variable (set planSelected to planNum)
  this.state.planSelected = planNum;
  console.log("planSelected: " + this.state.planSelected);
 }

/*
 * Method: accented
 * Author: Will Coates
 * Purpose: determines if style of list header is accented or
 *          not, depending on the plan selected
 * @param: confirm (boolean): if true, then return accented
                              if false, then return unaccented
 */
accented(confirm){
  if(confirm){
    console.log("set plan to accented");
    // the style(green) for accented
    return styleguide.light_title2_accent;
  }
  else{
    // the style(dark gray) for unaccented
    return styleguide.light_title2;
  }
}
/*
 * Method: confirmedSelection()
 * Author: Will Coates (with guidance from Elton Rego)
 *
 * Purpose: When the user wants to confirm their selected plan,
 *          push that to Firebase (now just console logs)
 * TODO: push the data for the selected plan to the user in Firebase
 */
 confirmedSelection(planNum){
  console.log("Plan " + planNum + " selection confirmed");
  //push record of selected plan to database
 }

  /*
  * Author: Elton C. Rego (modified by Will Coates)
  * Purpose: When called, fades the styling of Plan i to accented
  */
setActive(i){
      if(i == 1){
        Animated.timing(
          this.color1,
          {
          toValue: 1,
          duration: 200,
          easing: Easing.inout
          }
        ).start();
    }
    else if(i == 2){
        Animated.timing(
          this.color2,
          {
          toValue: 1,
          duration: 200,
          easing: Easing.inout
          }
        ).start();
    }
    else if (i == 3){
        Animated.timing(
          this.color3,
          {
            toValue: 1,
            duration: 200,
            easing: Easing.inout
          }
        ).start();
  }
}
  /*
  * Author: Elton C. Rego (modified by Will Coates)
  * Purpose: When called, fades the styling of Plan i to unaccented 
  */

  setInactive(i){
    if(i == 1){
      Animated.timing(
        this.color1,
        {
          toValue: 0,
          duration: 200,
          easing: Easing.inout
        }
      ).start();
    }
    else if(i == 2){
      Animated.timing(
        this.color2,
        {
          toValue: 0,
          duration: 200,
          easing: Easing.inout
        }
      ).start();
    }
    else if(i == 3){
      Animated.timing(
        this.color3,
        {
          toValue: 0,
          duration: 200,
          easing: Easing.inout
        }
      ).start();
    }
  }

  /*
   * Method: render
   * Author: Alec Felt (modified by Elton Rego and Will Coates)
   *
   * Purpose: Renders the insurance recommendations page.
   *
   */
  render() {
    // the styling for option 1
    // set up this way to allow fade-in/out
    var styling1 = this.color1.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.GREEN]
    });
    // the styling for option 2 
    // set up this way to allow fade-in/out
    var styling2 = this.color2.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.GREEN]
    });
    // the styling for option 2
    // set up this way to allow fade-in/out
    var styling3 = this.color3.interpolate({
      inputRange: [0, 1],
      outputRange: [GLOBAL.COLOR.DARKGRAY, GLOBAL.COLOR.GREEN]
    });

    return (
      
      <SafeAreaView style={styles.screen_container}>

        <StatusBar
           barStyle="light-content"
        />
      <View style={styles.container}>

        <ScrollView>

          <Animated.Text style={[styles.ico, {color: GLOBAL.COLOR.RED}]}><FontAwesome>{Icons.checkSquareO}</FontAwesome></Animated.Text>
          <Text style={styleguide.light_display2}>
            Insurance
            <Text style={styleguide.light_display2_accent}>.</Text>
          </Text>

          <Text style={styleguide.light_headline_secondary}>Select one of the options below to log it to this car.</Text>

          <TouchableOpacity onPress={() => { this.selectThis(1); }}>
            <Animated.View style={[styles.company_item, {borderBottomColor: styling1}]}>
              <Animated.Text style={[styleguide.light_title2, {color: styling1}]}>1. { this.state.plan1Company }</Animated.Text>
              <Text style={styleguide.light_subheader_secondary}>At { this.state.plan1Company }, you will pay { this.state.plan1Price } for your coverage.</Text>

              <Text style={[styleguide.light_body, {marginTop: 24}]}>{ this.state.plan1Blurb }</Text>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.selectThis(2); }}>
            <Animated.View style={[styles.company_item, {borderBottomColor: styling2}]}>
              <Animated.Text style={[styleguide.light_title2, {color: styling2}]}>2. { this.state.plan2Company }</Animated.Text>
              <Text style={styleguide.light_subheader_secondary}>At { this.state.plan2Company }, you will pay { this.state.plan2Price } for your coverage.</Text>

              <Text style={[styleguide.light_body, {marginTop: 24}]}>{ this.state.plan2Blurb }</Text>
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.selectThis(3); }}>
            <Animated.View style={[styles.company_item, {borderBottomColor: styling3}]}>
              <Animated.Text style={[styleguide.light_title2, {color: styling3}]}>3. { this.state.plan3Company }</Animated.Text>
              <Text style={styleguide.light_subheader_secondary}>At { this.state.plan3Company }, you will pay { this.state.plan3Price } for your coverage.</Text>

              <Text style={[styleguide.light_body, {marginTop: 24}]}>{ this.state.plan3Blurb }</Text>
            </Animated.View>
          </TouchableOpacity>

        </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

  /*
    * Style: Button Header
    * Author: Elton C. Rego
    * Purpose: Add style to the navbar button
    *          to stay consistent with project theme
    */
    screen_container: {
      flex: 1,
      backgroundColor: GLOBAL.COLOR.WHITE,
      justifyContent: 'flex-start',
    },
    container:{
      flex: 1,
      padding: 32,
      alignItems: 'flex-start',
    },
    ico: {
      fontSize: 24,
    },
    company_item: {
      marginTop: 32,
      borderBottomWidth: 2,
      paddingBottom: 4,
    }

});
