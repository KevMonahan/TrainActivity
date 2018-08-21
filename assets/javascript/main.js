var config = {
    apiKey: "AIzaSyArCG17XU4GAwS7pO__3vWksezxWZQcytY",
    authDomain: "trainproject-93d61.firebaseapp.com",
    databaseURL: "https://trainproject-93d61.firebaseio.com",
    projectId: "trainproject-93d61",
    storageBucket: "",
    messagingSenderId: "43068438357"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

$(document).ready(function() {

    $("#submit").on("click", function(event) {
        event.preventDefault();
      
      
          trainName = $("#trainName").val();
      
          destination = $("#destination").val();
      
          firstTrain = $("#firstTrain").val();
      
          frequency = $("#frequency").val();
      
        $("#trainName").val("");
        $("#destination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");
      
          database.ref().push({
      
              trainName: trainName,
              destination: destination,
              firstTrain: firstTrain,
              frequency: frequency
      
          });
      });

      database.ref().on("child_added", function(childSnapshot) {



        var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "days");
  
         var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    
      var remainder = timeDiff % childSnapshot.val().frequency;
    
      var minsUntilTrain = childSnapshot.val().frequency - remainder;
   
      var nextTrainTime = moment().add(minsUntilTrain, "minutes");
    
            
      $("#schedule > tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" +
          childSnapshot.val().frequency + "</td><td>" + moment(nextTrainTime).format("hh:mm") + "</td><td>" + minsUntilTrain + "</td></tr>");
  
           
      }, function(err) {
        console.log("Errors handled: " + err);
  
  });
})