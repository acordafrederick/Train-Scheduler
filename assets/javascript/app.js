$(document).ready(function(){
//FIREBASE=========================================================
var config = {
    apiKey: "AIzaSyAGJcaKARMGOSpC1yuoqoyEFSpZP_kj9Dw",
    authDomain: "train-scheduler-a56ba.firebaseapp.com",
    databaseURL: "https://train-scheduler-a56ba.firebaseio.com",
    projectId: "train-scheduler-a56ba",
    storageBucket: "",
    messagingSenderId: "989857219782"
};
firebase.initializeApp(config);
//VARIABLES=========================================================
var database = firebase.database();
//CONVERT TRAIN TIME================================================
//var currentTime = moment();
//console.log("Current Time: " + currentTime);
//FUNCTIONS=========================================================

// CAPTURE BUTTON CLICK
$("#submit").on("click", function() {

//VALUES FOR EACH VARIABLE IN HTML
	var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var time = $("#time").val().trim();
    var frequency = $("#frequency").val().trim();

// PUSH NEW ENTRY TO FIREBASE
	database.ref().push({
		name: name,
		destination: destination,
    	time: time,
    	frequency: frequency,
    	//timeAdded: firebase.database.ServerValue.TIMESTAMP
	});
	// NO REFRESH
	$("#name").val("");
	$("#destination").val("");
	$("#time").val("");
	$("#frequency").val("");
});

//ON CLICK CHILD FUNCTION
database.ref().on("child_added", function(childSnapshot){
	// console.log(childSnapshot.val());
	var name = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequency;

	//console.log("Name: " + name);
	//console.log("Destination: " + dest);
	//console.log("Time: " + time);
	//console.log("Frequency: " + freq);
	//console.log(moment().format("HH:mm"));

//CONVERT TRAIN TIME================================================
	var name = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequency;

	var currentTime = moment();
	var timeDifference = moment().diff(moment(time), "minutes");
	console.log(timeDifference);
	var timeRemainder = timeDifference % frequency;
	console.log(timeRemainder);
	var minutesAway = frequency - timeRemainder;
	console.log(minutesAway);
	var nextTrain = moment().add(minutesAway).format("HH:mm");
	console.log(nextTrain);
	/*var freq = parseInt(freq);
	//CURRENT TIME
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment().format('HH:mm'));
	//FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
	// var dConverted = moment(time,'hh:mm').subtract(1, 'years');
	var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
	console.log("DATE CONVERTED: " + dConverted);
	var trainTime = moment(dConverted).format('HH:mm');
	console.log("TRAIN TIME : " + trainTime);
	
	//DIFFERENCE B/T THE TIMES 
	var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
	var tDifference = moment().diff(moment(tConverted), 'minutes');
	console.log("DIFFERENCE IN TIME: " + tDifference);
	//REMAINDER 
	var tRemainder = tDifference % freq;
	console.log("TIME REMAINING: " + tRemainder);
	//MINUTES UNTIL NEXT TRAIN
	var minsAway = freq - tRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
	//NEXT TRAIN
	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
	//console.log(==============================);*/

 //TABLE DATA=====================================================
 //APPEND TO DISPLAY IN TRAIN TABLE
$('#currentTime').text(currentTime);
$('#trainTable').append(
		"<tr><td id='name'>" + name +
		"</td><td id='destination'>" + destination +
		"</td><td id='frequency'>" + frequency +
		"</td><td id='nextTrain'>" + nextTrain +
		"</td><td id='minutesAway'>" + minutesAway  + "</td></tr>");
 },

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});

// database.ref().orderByChild("timeAdded").limitToLast(1).on("child_added", function(snapshot){
//     // Change the HTML to reflect
//     $("#nameDisplay").html(snapshot.val().name);
//     $("#destDisplay").html(snapshot.val().dest);
//     $("#timeDisplay").html(snapshot.val().time);
//     $("#freqDisplay").html(snapshot.val().freq);
// })

}); //END DOCUMENT.READY



/*
// Initialize Firebase
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

var currentTime = moment().format("HH:mm");
var name = "";
var destination = "";
var time;
var frequency;

$("#add-user").on("click", function(event) {
	event.preventDefault();

	name = $("#name").val().trim();
	destination = $("#destination").val().trim();
	time = moment($("time"), "HH:mm").subtract(1, "years");
	frequency = $("#frequency").val().trim();

	database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

	$("#name").val("");
	$("#destination").val("");
	$("#time").val("");
	$("#frequency").val("");

});

database.ref().on("child_added", function(childSnapshot) {

	var name = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var time = childSnapshot.val().time;
	var frequency = childSnapshot.val().frequency;

	var timeDifference = moment().diff(moment(time), "minutes");
	console.log(timeDifference);
	var timeRemainder = timeDifference % frequency;
	console.log(timeRemainder);
	var minutesAway = frequency - timeRemainder;
	console.log(minutesAway);
	var nextTrain = moment().add(minutesAway, "minutes").format("HH:mm");
	console.log(nextTrain);

	$("trainTable").append(
		"<tr><td id='name'>" + name +
		"</td><td id='destination>" + destination +
		"</td><td id='frequency'>" + frequency +
		"</td><td id='nextTrain'>" + nextTrain +
		"</td><td id='minutesAway'>" + minutesAway + "</td></tr>");

	console.log(name);
	console.log(destination);
	console.log(frequency);
	console.log(nextTrain);
	console.log(minutesAway);

}); */

