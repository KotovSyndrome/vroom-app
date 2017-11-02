import React, { Component } from 'react';
import Login from './src/components/Login/Login';
import Onboarding from './src/components/Onboarding/Onboarding';
import Dashboard from './src/components/Dashboard/Dashboard';
import EmailPasswordLogin from './src/components/EmailPasswordLogin/EmailPasswordLogin';
import Revi from './src/Revi'
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import * as firebase from 'firebase';

GLOBAL = require('./src/Globals');

/*
 * Constant: Vroom
 * Author: Elton C. Rego
 *
 * Purpose: Creates a stack of the possible screens
 *   that can be used in the application
 */
const vroom = StackNavigator({
  // DEBUG: Uncomment Following Line to Test Revi
  //Revi: {screen: Revi},

  Login: {screen: Login},
  EmailPasswordLogin: {screen: EmailPasswordLogin},
  Onboarding: {screen: Onboarding},
  Dashboard: {screen: Dashboard},

});

/*
 * Congfiguration: firebase.initializeApp
 * Author: Alec Felt
 * Purpose: Attach our app to our database
 */
 // Initialize Firebase
 const config = {
   apiKey: "AIzaSyBqhwQ347WWd_LraUv25AKsog5Xl-uiXKg",
   authDomain: "vroom-d5c0e.firebaseapp.com",
   databaseURL: "https://vroom-d5c0e.firebaseio.com",
   projectId: "vroom-d5c0e",
   storageBucket: "vroom-d5c0e.appspot.com",
   messagingSenderId: "52629805323"
 };
 export const firebaseRef = firebase.initializeApp(config);

// Pushes the Navigation Stack onto the View
AppRegistry.registerComponent('vroom', () => vroom);
