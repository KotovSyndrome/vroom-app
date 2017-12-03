import React from 'react';
import {goTo, clearNavStack} from '../Navigation/Navigation';
import * as firebase from 'firebase';
import "firebase/firestore";

  /*
   * Congfiguration: firebase.initializeApp
   * Author: Alec Felt
   *   Purpose: Attach our app to our database
   */
   // Initialize Firebase
  const config = {
     apiKey: "AIzaSyAmJxDUilgKOlQDyji9qmMNh2Bb73WcP7U",
     authDomain: "vroom-d5c0e.firebaseapp.com",
     databaseURL: "https://vroom-d5c0e.firebaseio.com",
     projectId: "vroom-d5c0e",
     storageBucket: "vroom-d5c0e.appspot.com",
     messagingSenderId: "52629805323"
  };

  export const firebaseRef = firebase.initializeApp(config);

  /*
  * Database function: pushTask()
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: push Task object to database,
  *          link user with task
  *
  * @param: (ttr) = task type reference
  *         (d) = date string (yyyy-mm-dd)
  * @return: void
  * TODO create error message, update task object fields, add notifications?
  */
  export function pushTask(ttr, d) {
    var u = firebaseRef.auth().currentUser.uid;
    if(u != null) {
      var taskObject = {
          ttRef: ttr,
          date: d,
          uid: u,
      }
      var key="";
      firebaseRef.firestore().collection("tasks").add(taskObject);
      // .then(function(docRef) {
      //   key = docRef.id;
      //   date = ""+y+"-"+m+"-"+d;
      //   taskRef = firebaseRef.firestore().collection("tasks").doc(key);
      //   firebaseRef.firestore().collection("users").doc(u).collection("tasks").doc(date).set({taskRef})
      //   .catch(function(error) {
      //     console.log(error.message);
      //     alert("Error: can't push task key to user object");
      //   });
      // })
      // .catch(function(error) {
      //   console.log(error.message);
      //   alert("Error: can't push task object to the database");
      // });
  }}

  /*
  * Database function: databaseLogin()
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: login the user
  *
  * @param: (e) = email
  *         (p) = password
  * @return: boolean
  */
  export function databaseLogin(e, p) {
    firebaseRef.auth().signInWithEmailAndPassword(e, p).then((user) => {
      if(user){
        console.log("signed user in");
      }
    }, error => {
      console.log(error.message);
      alert(error.message);
    });
  }

  /*
  * Database function: databaseSignup
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: signup a user with email/password
  *
  * @param: (e) = email
  *         (p) = password
  * @return: boolean
  */
  export function databaseSignup(e, p) {
    firebaseRef.auth().createUserWithEmailAndPassword(e, p)
      .then((user) => {
        if(user){
          console.log("signed user up");
        }
      }, error => {
        console.log(error.message);
        if(error.code == "auth/email-already-in-use"){
          alert("Your email is already registered. Attemping to sign you in automatically.")
          databaseLogin(e, p);
          return;
        }
        alert(error.message);
      });
  }

  /*
  * Database function: logOut()
  * Author: Alec Felt and Connick Shields
  *
  * Purpose: log the current user out
  *
  * @param: void
  * @return: boolean
  */
  export function logOut() {
    // if signOut() returns void, then go back to login
    firebaseRef.auth().signOut().then((vo) => {
      if(!vo){
        console.log("signed user out");
      }
    }, error => {
      console.log(error.message);
      alert(error.message);
    });
  }

  /*
  * Database function: updateUserProfile
  * Author: Alec Felt
  *
  * Purpose: updates built-in user profile info
  *
  * @param: (jsonObj) = JSON object with profile info
  * @return: boolean

  TODO rewrite
  */
  export function updateUserProfile (jsonObj) {
    var user = firebaseRef.auth().currentUser;

    if(user != undefined && user != null) {
      user.updateProfile(jsonObj).then(function() {
        // Update successful.
        alert("success!");
        return true;
      }, error => {
        // An error happened.
        console.log(error.message);
        alert("Error updating user profile info");
      });
    }
    return false;
  }

  /*
  * Database function: deleteUser()
  * Author: Elton C. Rego
  *
  * Purpose: Deletes the current user account
  */
  export function deleteUser(){
    var user = firebaseRef.auth().currentUser;
      if (user) {
        user.delete().then(function() {
          logOut()
        }).catch(function(error) {
          alert("Sorry, your account is unable to be deleted at this time.")
          console.log(error.message);
        });
      } else {
        alert("user is null");
      }
  }
