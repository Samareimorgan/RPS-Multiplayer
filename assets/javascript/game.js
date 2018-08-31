$(document).ready(function () {

  /*<i class="far fa-hand-rock"></i>
  <i class="far fa-hand-paper"></i>
  <i class="far fa-hand-scissors"></i> */

  //Firebase Initialization-----

  var config = {
    apiKey: "AIzaSyC6NBhyPfBluqpvMCw-C5NMQlfAJmzhVKw",
    authDomain: "inconceivable-wits.firebaseapp.com",
    databaseURL: "https://inconceivable-wits.firebaseio.com",
    projectId: "inconceivable-wits",
    storageBucket: "",
    messagingSenderId: "582818727826"
  };
  firebase.initializeApp(config);

  ///Variables ------
  var database = firebase.database;
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref("info/connected");
  var con = "";
  var defaultMessaging = firebase.messaging();


  //Functions ----------
  /*function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
      // Signs-out of Friendly Chat.
  function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
// Initiate firebase auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}
// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!firebase.auth().currentUser;
}

// Loads chat messages history and listens for upcoming ones.
function loadMessages() {
  // Loads the last 12 messages and listen for new ones.
  var callback = function(snap) {
    var data = snap.val();
    displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
  };

  firebase.database().ref('/messages/').limitToLast(12).on('child_added', callback);
  firebase.database().ref('/messages/').limitToLast(12).on('child_changed', callback);
}

// Saves a new message on the Firebase DB.
function saveMessage(messageText) {
  // Add a new message entry to the Firebase Database.
  return firebase.database().ref('/messages/').push({
    name: getUserName(),
    text: messageText,
    profilePicUrl: getProfilePicUrl()
  }).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
  });
  */

  // Main Process -----
  /* On document load the the characters are randomly selected in the left and right columns 
  above the player name.
  //When someone goes to the website, they are asked to enter their name.  
  Once they press enter/return, the name gets pushed to the player name selection. 
  A name goes to the left player name first, if that is already filled, then it fills the second player name section
  The person is also then connected to the connected database. 
  The name then appears one of photos of either Wesley or Vizinni.   And an announcement says "you are playing...vizinni or dread pirate roberts"
  // 




})