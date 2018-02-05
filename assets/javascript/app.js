// standard document ready function =====

$(document).ready(function() {

	// initializing firebase =====
	var config = {
	    apiKey: "AIzaSyAGJcaKARMGOSpC1yuoqoyEFSpZP_kj9Dw",
	    authDomain: "train-scheduler-a56ba.firebaseapp.com",
	    databaseURL: "https://train-scheduler-a56ba.firebaseio.com",
	    projectId: "train-scheduler-a56ba",
	    storageBucket: "",
	    messagingSenderId: "989857219782"
	};

	firebase.initializeApp(config);

	var database = firebase.database();

	// submit function for when button is clicked =====
	$("#submit").on("click", function() {

		// setting variables for generated user input ======
		var name = $("#name").val().trim();
	    var destination = $("#destination").val().trim();
	    var time = $("#time").val().trim();
	    var frequency = $("#frequency").val().trim();

		// pushing information to firebase
		database.ref().push({
			name: name,
			destination: destination,
	    	time: time,
	    	frequency: frequency,
	    	timeAdded: firebase.database.ServerValue.TIMESTAMP
		});
	
		// delete text in the form without refreshing the page ======
		$("#name").val("");
		$("#destination").val("");
		$("#time").val("");
		$("#frequency").val("");
	
	});

	// on child function =====
	database.ref().on("child_added", function(childSnapshot) {
		
		var name = childSnapshot.val().name;
		var destination = childSnapshot.val().destination;
		var time = childSnapshot.val().time;
		var frequency = childSnapshot.val().frequency;

		// assigning time as the firstTime ======
		var firstTime = time; 
		// converting firstTime pushed back 1 year ======
		var convertedFirstTime = moment(firstTime, 'HH:mm').subtract(1, 'years');
		// difference between current time and convertedFirstTime =====
		var timeDifference = moment().diff(moment(convertedFirstTime), 'minutes');
		// getting timeRemainder =====
		var timeRemainder = timeDifference % frequency;
		// getting the minutes before train arrival =====
		var minutesAway = frequency - timeRemainder;
		// getting exact trian arrival time =====
		var nextTrain = moment().add(minutesAway, 'minutes');

	// appending the info to the train table
	$('#trainTable').append(
			"<tr><td id='name'>" + name +
			"</td><td id='destination'>" + destination +
			"</td><td id='frequency'>" + frequency +
			"</td><td id='nextTrain'>" + moment(nextTrain).format("HH:mm") +
			"</td><td id='minutesAway'>" + minutesAway  + "</td></tr>");
	});

});