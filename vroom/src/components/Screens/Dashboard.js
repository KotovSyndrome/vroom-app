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
  StatusBar,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
  ScrollView,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import moment from 'moment';
import {
  pushFillup,
  removeFillup,
  pullFillups,
  updateMPG,
  pullAverageMPG,
  updateODO,
  pullODOReading,
} from '../Database/Database.js';

// Custom components
import GasList from '../Custom/GasList';
import Settings from '../Screens/Settings.js'
import {InputField} from './../Custom/InputField';
import {Button} from './../Custom/Button';

/*
 * Class: Dashboard
 * Author: Elton C.  Rego
 *
 * Purpose: Be the main screen on the application
 * TODO: Add items to list
 * TODO: Remove items from list properly
 */
export default class Dashboard extends Component {

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
      translation: new Animated.Value(0),
      settingsShift: new Animated.Value(1),
      fadeIn: new Animated.Value(0),
      modalFade: new Animated.Value(0),
      directionToSwipe: "down here to show",
      cardState: 1,
      scrollEnable: true,

      // Values for the add-gas modal
      modalVisible: false,

      // Input state variables
      user_paid: 0,
      user_filled: 0,
      user_ODO: 0,

      // Below are some dummy objects of stuff
      // we will sync with firebase
      updatedODO: 0,
      averageMPG: 0, // update this calculation as user enters
      list_i: 0, // index should update with initial pull and increment
      textDataArr: [],
    };
  }

 /*
  * Function: openModal()
  * Author: Elton C. Rego
  * Purpose: Opens the modal to add a gas item
  */
  openModal() {
    this.setState({
      modalVisible:true
    });
    Animated.timing(
      this.state.modalFade,
      {
        toValue: 1,
        duration: 400,
      }
    ).start();
  }

 /*
  * Function: closeModal()
  * Author: Elton C. Rego
  * Purpose: Closes the modal to add a gas item
  */
  closeModal() {
    Animated.timing(
      this.state.modalFade,
      {
        toValue: 0,
        duration: 400,
      }
    ).start();
    this.setState({modalVisible:false});
  }

  getFormattedTime() {
    var todaysDate = moment().format('MMM DD, YYYY - h:mma');
    return todaysDate;
  }

 /*
  * Function: addItem()
  * Author: Elton C. Rego
  * Purpose: Adds an object to the GasList item used for gas
  *
  * //TODO actually calculate the math
  */
  addItem() {

    var userODO = parseInt(this.state.user_ODO, 10);

    if(userODO == null || this.state.user_filled == "" || this.state.user_paid == ""){
      alert("Please use a valid amount");
      return;
    } else if (userODO <= this.state.updatedODO) {
      alert("Your odometer reading cannot go backwards or stay constant between fillups!"
      +"\nPlease verify it is correct.");
      return;
    }

    const distance = userODO - this.state.updatedODO;
    const mpg = distance/this.state.user_filled;
    const average =
      ((this.state.averageMPG * (this.state.textDataArr.length))+mpg)/(this.state.textDataArr.length+1);
    const creationDate = this.getFormattedTime();

    this.closeModal();

    // instead of setting textDataArr here, try newfillup.concat(textDataArr) instead
    var newFillup = {
      list_i: this.state.list_i + 1,
      totalPrice: parseFloat(this.state.user_paid),
      date: creationDate,
      gallonsFilled: this.state.user_filled,
      odometer: userODO,
      distanceSinceLast: distance
    };

    this.setState({
      averageMPG: average,
      updatedODO: userODO,
      textDataArr:
      [
        {
          list_i: this.state.list_i + 1,
          totalPrice: parseFloat(this.state.user_paid),
          date: creationDate,
          gallonsFilled: this.state.user_filled,
          odometer: userODO,
          distanceSinceLast: distance
        }, ...this.state.textDataArr
      ],
      user_paid: 0,
      user_filled: 0,
      userODO: 0,
      list_i: this.state.list_i + 1,
    });

    // TODO: Push to Firebase

    pushFillup(newFillup);
    updateMPG(average);
    updateODO(userODO);
  }

  removeItem(key){

    // TODO: Push to firebase
    // We want to delete a specific Fillup from the user, based
    // on these variables
    const itemToRemove =
    this.state.textDataArr.find(function (obj){
      return obj.list_i === key;
    });
    const indexOf = this.state.textDataArr.indexOf(itemToRemove);

    const mpgRemoved = itemToRemove.distanceSinceLast
      /itemToRemove.gallonsFilled;

    const averageMPG = this.state.textDataArr.length == 1 ? 0 :
      (this.state.averageMPG * this.state.textDataArr.length - mpgRemoved)
      /(this.state.textDataArr.length - 1);

    const ODO = this.state.textDataArr.length == 1 ? 0 :
      this.state.textDataArr[this.state.textDataArr.length - 1].odometer;

    removeFillup(key);
    updateMPG(averageMPG);
    updateODO(ODO);

    this.state.textDataArr.pop(itemToRemove);
    for (var i = indexOf; i < this.state.textDataArr.length; i++){
      this.state.textDataArr[i].list_i -= 1;
    }
    this.setState({
      list_i: this.state.list_i - 1,
      averageMPG: averageMPG,
      updatedODO: ODO,
    });

  }

  /*
   * Function: componentWillMount()
   * Author: Elton C. Rego
   * Purpose: Called when the component is called from the stack
   *    - sets up the pan responder for the GasList transition
   */
  componentWillMount() {

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderMove: (e, {dy}) => {
        // put animation code here
        this.setState({scrollEnable: false});
        if((dy < -8) && this.state.cardState == 1){
          Animated.spring(
            this.state.translation,
            { toValue: 0, friction: 5}
          ).start();
          this.setState({
            directionToSwipe: "down here to show",
          });
        } else if ((dy >= 8) && this.state.cardState == 0) {
          Animated.spring(
            this.state.translation,
            { toValue: 1, friction: 5}
          ).start();
          this.setState({
            directionToSwipe: "up here to hide",
          });
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          cardState: !this.state.cardState,
          scrollEnable: !this.state.scrollEnable,
        });
      },
    });
  }

  openSettings(){
    Animated.timing(
      this.state.settingsShift,
      {
        toValue: 0,
        duration: 150,
      }
    ).start();
  }

  closeSettings(){
    Animated.timing(
      this.state.settingsShift,
      {
        toValue: 1,
        duration: 150,
      }
    ).start();
  }

  componentDidMount() {

    var that = this;
    pullAverageMPG().then(function(fData){
      if(fData){
        that.setState({
          averageMPG: fData,
        });
      }
    }).catch(function(error) {
      console.log('Failed to load average mpg data into state:', error);
    });

    pullODOReading().then(function(fData){
      if(fData){
        that.setState({
          updatedODO: fData,
        });
      }
    }).catch(function(error) {
      console.log('Failed to load odometer data into state:', error);
    });

    pullFillups().then(function(fData){
      if(fData){
        that.setState({
          textDataArr: fData,
          list_i: fData.length,
        });
      }
      Animated.timing(
        that.state.fadeIn,
        {
          toValue: 1,
          duration: 250,
        }
      ).start();
    }).catch(function(error) {
      console.log('Failed to load fill up data into state:', error);
    });
  }

  /*
   * Function: render()
   * Author: Elton C. Rego
   * Purpose: renders the component
   *
   * @return: Component Views
   */
  render(){
    var cardTranslation = this.state.translation.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 0]
    });

    var settingsTranslation = this.state.settingsShift.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 400]
    });

    var modalBG = this.state.modalFade.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.1],
    });

    // Calculate the x and y transform from the pan value
    var [translateY] = [cardTranslation];
    var [translateX] = [settingsTranslation];

    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    var transformList = {transform: [{translateY}]};
    var settingsList = {transform: [{translateX}]};

    return(
      <View style={
        [styleguide.container,
        {
          backgroundColor: GLOBAL.COLOR.DARKGRAY,
        }]
      }>
      <StatusBar barStyle="light-content"/>
        <Animated.View style={[styles.settings, settingsList]}>
          <Settings closeCallBack={() => this.closeSettings()}/>
        </Animated.View>
        <View style={styles.navbar}>
          <Text style={styleguide.dark_title2}>
            vroom
            <Text style={styleguide.dark_title2_accent}>
              .
            </Text>
          </Text>
          <TouchableOpacity onPress={() => this.openSettings()}>
            <Animated.View style={{opacity: modalBG}}>
                <Text style={styleguide.dark_title2}>
                  <FontAwesome>{Icons.gear}</FontAwesome>
                </Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView behavior="padding">
              <View style={[styles.innerContainer]}>
                <Text style={[styleguide.light_title2, {width: '100%'}]}>Add Transaction
                  <Text style={styleguide.light_title2_accent}>.</Text>
                </Text>
                <InputField
                  icon={Icons.dollar}
                  label={"amount paid in dollars"}
                  labelColor={"rgba(37,50,55,0.5)"}
                  inactiveColor={GLOBAL.COLOR.DARKGRAY}
                  activeColor={GLOBAL.COLOR.GREEN}
                  autoCapitalize={"none"}
                  type={"numeric"}
                  topMargin={24}
                  onChangeText={(text) => {this.setState({user_paid: text})}}
                />
                <InputField
                  icon={Icons.tint}
                  label={"gallons filled"}
                  labelColor={"rgba(37,50,55,0.5)"}
                  inactiveColor={GLOBAL.COLOR.DARKGRAY}
                  activeColor={GLOBAL.COLOR.GREEN}
                  autoCapitalize={"none"}
                  type={"numeric"}
                  topMargin={24}
                  onChangeText={(text) => {this.setState({user_filled: text})}}
                />
                <InputField
                  icon={Icons.automobile}
                  label={"odometer reading in miles"}
                  labelColor={"rgba(37,50,55,0.5)"}
                  inactiveColor={GLOBAL.COLOR.DARKGRAY}
                  activeColor={GLOBAL.COLOR.GREEN}
                  autoCapitalize={"none"}
                  type={"numeric"}
                  topMargin={24}
                  onChangeText={(text) => {this.setState({user_ODO: text})}}
                />
                <Button
                  backgroundColor={GLOBAL.COLOR.GREEN}
                  label={"Add Item"}
                  height={64}
                  marginTop={64}
                  shadowColor={GLOBAL.COLOR.GREEN}
                  width={"100%"}
                  onPress={() => this.addItem()}
                >
                </Button>
                <Button
                  backgroundColor={GLOBAL.COLOR.GRAY}
                  label={"Cancel"}
                  height={64}
                  marginTop={24}
                  shadowColor={'rgba(0,0,0,0)'}
                  width={"100%"}
                  onPress={() => this.closeModal()}
                  title="Close modal"
                >
                </Button>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>

        <View style={styles.content}>
          <View style={styles.graph}>
          </View>
          <Animated.View
            style={[
              styles.card,
              transformList,
              {opacity: modalBG}]
            }>
            {/*<Text style={[styleguide.light_caption_secondary, {alignSelf: 'center', paddingTop: 8}]}>swipe {this.state.directionToSwipe} graph</Text>
            ...this._panResponder.panHandlers*/}
            <View  style={styles.statistics}>
              <View>
                <Text style={styleguide.light_subheader2}>{this.state.averageMPG.toFixed(2)}mpg</Text>
                <Text style={styleguide.light_body_secondary}>Average Efficiency</Text>
              </View>
              <View style={{alignItems:'flex-end'}}>
                <Text style={styleguide.light_subheader2}>{this.state.updatedODO}mi</Text>
                <Text style={styleguide.light_body_secondary}>Odometer</Text>
              </View>
            </View>
            <GasList
              onRef={ref => (this.gaslist = ref)}
              enable={this.state.scrollEnable}
              data={this.state.textDataArr}
              average={this.state.averageMPG.toFixed(2)}
              removeItem={key => this.removeItem(key)}/>
          </Animated.View>
        </View>


        <TouchableOpacity style={
            {
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: GLOBAL.COLOR.GREEN,
              shadowColor: GLOBAL.COLOR.DARKGRAY,
              shadowOpacity: 0.3,
              shadowOffset: {x: 0, y: 0},
              shadowRadius: 30,

              position: 'absolute',
              zIndex: 2,
              bottom: 32,
              right: 32,
            }
          } onPress={() => this.openModal()}>
          <View style={styles.floating_button}>
              <Text style={styleguide.dark_title2}>
                <FontAwesome>{Icons.plus}</FontAwesome>
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  settings: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  navbar: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  floating_button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  graph:{
    zIndex: 0,
    width: '100%',
    height: 250,
  },
  card: {
    width: '100%',
    maxHeight: 578,
    backgroundColor: GLOBAL.COLOR.WHITE,
    zIndex: 1,
  },
  ico: {
    fontSize: 24,
    color: GLOBAL.COLOR.WHITE,
  },
  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(37,50,55,0.50)',
  },


  // FOR PROTOTYPING
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    alignItems: 'center',
    padding: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: GLOBAL.COLOR.WHITE,
  },

});
