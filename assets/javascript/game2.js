$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC6NBhyPfBluqpvMCw-C5NMQlfAJmzhVKw",
    authDomain: "inconceivable-wits.firebaseapp.com",
    databaseURL: "https://inconceivable-wits.firebaseio.com",
    projectId: "inconceivable-wits",
    storageBucket: "inconceivable-wits.appspot.com",
    messagingSenderId: "582818727826"
  };
  firebase.initializeApp(config);

  //Global Variables -------
  var playerOneName = "";
  var playerTwoName = "";

  //Firebase Variables
  var database = firebase.database();
  //All connections will be stored in this database
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref("info/connected");
  var con = "";
  
  //Firebase Functionality ----

  //When the client state is connected add to connection list
  connectedRef.on("value", function (snap) {
    if (snap.val()) {
      var con = connectionsRef.push(true);
      //remove them if not connected
      con.onDisconnect().remove();
    }
  })

 $("#playBtn").on("click",function(event) {
  event.preventDefault();
  console.log("trigger"); 

  //Get database inputs
  var name = $("#name-input").val().trim();
  var message = $("#message-input").val().trim();

  database.ref().set({
    name: name, 
    message: message
  })

  database.ref().on("value", function(snapshot){
    console.log(snapshot.val());
    var characters = ["Dread Pirate Roberts", "Vizzini"];
    var selectCharacter = characters[Math.floor(Math.random() * characters.length)];
    console.log(selectCharacter);
    if (selectCharacter === "Dread Pirate Roberts") {
      $("#dprplayer").text(snapshot.val().name);
    }
    else if (selectCharacter === "Vizzini")
      $("#vizziniplayer").text(snapshot.val().name);

  })

 })
  

  /*firebase.database().ref("Username.Messages[]").on('value', function (dataSnapshot) {

    console.log(dataSnapshot.val());
    $("#messages").empty();
    $(dataSnapshot.val()).each(function (index, message) {
      // Use jquery to make a single message div
      // append name p to message div with jquery
      // Use jquery to add a p for text inside the message dive
      // same with time
      // append message div $('#messages'):
    })
  })
  */

  /* var myDataRef = new Firebase('https://inconceivable-wits.firebaseio.com"');
   $('#messageInput').keypress(function (e) {
     if (e.keyCode == 13) {
       var name = $('#nameInput').val();
       var text = $('#messageInput').val();
       myDataRef.push({name: name, text: text});
       $('#messageInput').val('');
     }
   });
   myDataRef.on('child_added', function(snapshot) {
     var message = snapshot.val();
     displayChatMessage(message.name, message.text);
   });
   function displayChatMessage(name, text) {
     $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
     $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
   };
  */


  //Functionality of the game. On Launch Game Click .. everything is emptied
  //Youtube link is changed to autoplay
$("#launchBtn").on("click", function () {
  $("#challengeVid").attr("src", "https://www.youtube.com/embed/EZSx3zNZOaU?rel=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0&amp;start=38&end=65");
  newGame();
})

//----Functions -----

function newGame() {
  $("#launchBtn").hide();
  $("#dprplayer").empty();
  $("#vizzini").empty();
  $("#dprWins").empty();
  $("#dprLosses").empty();
  $("#vizziniWins").empty();
  $("#vizziniLosses").empty();
}

  
  // On click Events - Change Color when clicking on icons --
  $("#vizziniRock").on("click", function () {
    $(this).css("color", "black");
  })

  $("#dprRock").on("click", function () {
    $(this).css("color", "red");
    $(this).attr("id");
  })

  $("#vizziniPaper").on("click", function () {
    $(this).css("color", "black");
  })

  $("#dprPaper").on("click", function () {
    $(this).css("color", "red");
  })

  $("#dprScissors").on("click", function () {
    $(this).css("color", "red");
  })

  $("#vizziniScissors").on("click", function () {
    $(this).css("color", "black");
  })

  //Game Play Variables
  var dprRock = $("#dprRock");
  var dprPaper = $("#dprPaper");
  var dprScissor = $("#dprScissors");
  var vizziniRock = $("#vizziniRock");
  var vizziniPaper = $("#vizziniPaper");
  var vizziniScissors = $("#vizziniScissors");
  var vizziniWins = 0;
  var vizziniLosses = 0;
  var dprWins = 0;
  var dprLosses = 0;

  if (dprRock.css("color") === "red" && vizziniRock.css("color") === "black") {
    alert(Tie);
  }
  if (dprRock.css("color") === "red" && vizziniPaper.css("color") === "black") {
    vizziniWins++;
    dprLosses++;
  }
  if (dprRock.css("color") === "red" && vizziniScissors.css("color") === "black") {
    dprWins();
  }

  //win/Loss Functions
  function dprWins() {
    dprWins++;
    vizziniLosses++;
    $("#dprWins").html(dprWins);
  }



  /*
  firebase.database().ref("Messages").on('value', function(dataSnapshot) {
  
    console.log(dataSnapshot.val());
    $("#messages").empty();
    $(dataSnapshot.val()).each(function(index, message) {
      // Use jquery to make a single message div
      // append name p to message div with jquery
      // Use jquery to add a p for text inside the message dive
      // same with time
      // append message div $('#messages'):
    });
  
  });
  */

  /*function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new firebase.database();
    firebase.auth().signInWithPopup(provider);
  },
          // Signs-out of Friendly Chat.
      function signOut() {
        // Sign out of Firebase.
        firebase.auth().signOut();
      },
    // Initiate firebase auth.
      function initFirebaseAuth() {
      // Listen to auth state changes.
      firebase.auth().onAuthStateChanged(authStateObserver);
    },
    // Returns the signed-in user's profile Pic URL.
      function getProfilePicUrl() {
      return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
    },
    
    // Returns the signed-in user's display name.
      function getUserName() {
      return firebase.auth().currentUser.displayName;
    },
    
    // Returns true if a user is signed-in.
      function isUserSignedIn() {
      return !!firebase.auth().currentUser;
    },
    
    // Loads chat messages history and listens for upcoming ones.
      function loadMessages() {
      // Loads the last 3 messages and listen for new ones.
    
      firebase.database().ref('/messages/').limitToLast(3).on('child_added', callback);
      firebase.database().ref('/messages/').limitToLast(3).on('child_changed', callback);
    },
    
    // Saves a new message on the Firebase DB.
      function saveMessage(messageText) {
      // Add a new message entry to the Firebase Database.
        return firebase.database().ref('/messages/').push({
          name: getUserName(),
          text: messageText,
          profilePicUrl: getProfilePicUrl()
        }).catch(function(error) {
          console.error('Error writing new message to Firebase Database', error);
        })
 
  })
 
});
*/

  /* Pseudo Code -------------------------------------------------
  Launch New Game Function
     Empties both player names
     Empties the wins and losses for each player
     Signs out of firebase connected
  Let's Play Function 
    Randomly Chooses which character they will play: Dread Pirate Roberts or Vizzini the Sicilian
       if Dread Pirate Roberts already has a display name, it will default to Vizzini the Sicilian
    Loads the display name in the correct area
       If DPR is choosen, a message will state: "Will you outwit the Sicilian and save Princess Buttercup?" 
       If Vizzini is chosen, a message will state: "Who is this masked man? He is no match for a Sicilian
       
  Game Function
   If Rock vs Scissors, DRP wins++, Vizzini losses++
    DPR win modal triggered...now chose your next weapon
   If Rock vs Paper, DRP losses++, Vizzini wins++
    Vizzini win modal triggered...now chose your next weapon
   If Rock vs Rock, 
    No one wins modal triggered...now chose your next weapon
  
  Game Stop Function
    Once DPR wins + losses = 10 
    Game Over Modal shows
    If DPR wins > Vizzini wins = YOU TUBE Vizzini dies occurs
    If DPR wins < Vizzini wins = YOU TUBE WESLEY in the pit of despair
  
  On Close btn of Game Over Modal =  Launch New Game Button Shows
  
  
  The CHALLENGE VIDEO = <iframe width="300" height="200" src="https://www.youtube.com/embed/EZSx3zNZOaU?rel=0&amp;controls=0&amp;showinfo=0&amp;start=38&end=65" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  
  
  DPR Loses Video =<iframe width="300" height="200" src="https://www.youtube.com/embed/JFo6iLDNzX0?rel=0&amp;controls=0&amp;showinfo=0&amp;start=122&end=135" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  
  
  Vizzini Loses Video = <iframe width="300" height="200" src="https://www.youtube.com/embed/EZSx3zNZOaU?rel=0&amp;controls=0&amp;showinfo=0&amp;start=256&end=286" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
   */
})
