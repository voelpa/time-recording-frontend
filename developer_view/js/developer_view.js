var userID = window.location.search;
userID = userID.replace("?", '');
userID = userID.replace("userid", '');
userID = userID.replace("=", '');

$(document).ready(function postUserId() {
	
	var request = new XMLHttpRequest();
	request.open('POST', 'http://localhost:9000/name', true);
	request.setRequestHeader('Content-type', 'application/json');
	request.onreadystatechange = function() {

		if (request.readyState === 4 && request.status === 200) {
			var json = JSON.parse(request.responseText);
			console.log(json);
			$("#nameTag").append("<strong>"+ json.name +"</strong>");
			console.log(json.name);
		}
	};
	var data = JSON.stringify({"employeeId":parseInt(userID)});
	request.send(data);
	console.log("Data send: " + data.toString());
});


var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:9000/recording/' + userID
		+ '/projects', true);
ourRequest.onload = function() {
	data = JSON.parse(ourRequest.responseText);
	payload = data.payload;
	projects = payload.employeeProjects;

	console.log(projects);
	// select = document.getElementById("project_select");

	for (i = 0; i < projects.length; i++) {
		$("#project_select").append(
				"<option>" + projects[i].projectName + "</option>");
		console.log(projects[i].projectName);
		// select.options[select.options.length] = new
		// Option(projects[i].projectName, projects[i].projectName);
	}

};
ourRequest.send();

var counter = 0;

var employeeProject;

var dataArray = new Array();
var flagArray = new Array();


function addDataToTable() {

	var selectedValue = $('#project_select').find(":selected").text();
	var help = -1; // Used to get the project name
	for (i = 0; i < projects.length; i++) {
		if (selectedValue === projects[i].projectName) {
			project_id = projects[i].projectId;
			help = i;
		}
	}
	var date = $("#datetimepicker1").data("DateTimePicker").date();
	console.log(date);
	var task = document.getElementById("task").value;
	var hours = document.getElementById("hours_field").value;
	var quarterHours = $("#minutes_field").val(); // TBD - NEEDS TO BE
	// IMPLEMENTED (SEND WITH
	// JSON AND HANDLED FROM
	// BACKEND)
	console.log(task);
	console.log(hours);
	console.log(quarterHours);

	var day = date._d.getDate();
	console.log(day);
	var month = (date._d.getMonth() + 1);
	console.log(month);
	var year = date._d.getFullYear();
	console.log(year);
	var display_date = '' + day + '-' + month + '-' + year;

	var timeSpent = (hours * 60 + +quarterHours)/60; // NOW in HOURS

	console.log(timeSpent);

	var data = JSON.stringify({
		"timeSpent" : parseFloat(timeSpent),
		"date" : display_date,
		"notes" : task,
		"projectId" : parseInt(project_id),
		"employeeId" : parseInt(userID)
	});

	// var dataJS = JSON.parse(data);
	
	
	dataArray.push(data);
	flagArray.push(true);
	
	console.log("This is the Data: " + dataArray);
	console.log("This Works: " + flagArray);

	$("#output_data1")
			.append(
					"<tr id=\"row"
							+ counter
							+ "\"><th>"
							+ display_date
							+ "</th><th>"
							+ projects[help].projectName
							+ "</th><th>"
							+ task
							+ "</th><th>"
							+ parseFloat(timeSpent)
							+ "</th><th> <button id=\"id"
							+ counter
							+ "\" type=\"button\" class=\"btn btn-danger\" onclick=\"delete"
							+ counter
							+ "()\">Löschen</button> </th></tr><script>function delete"
							+ counter + "() {$(\"#row" + counter
							+ "\").remove(); flagArray[" + counter + "] = false;}</script>");
	counter++;

	console.log("Counter Variable currently: " + counter);
	console.log(display_date);
	console.log(project_id);
	console.log(task);
	console.log(hours);

}

function postData() {
	
	var finalDataArray = new Array();
	
	for(i=0; i<flagArray.length; i++){
		if(flagArray[i] === true)
			finalDataArray.push(dataArray[i]);
	}
	
	for(i=0; i<finalDataArray.length; i++){
		var request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:9000/recording/task', true);
		request.setRequestHeader('Content-type', 'application/json');
		request.onreadystatechange = function() {

			if (request.readyState === 4 && request.status === 200) {
				var json = JSON.parse(request.responseText);
				if (json.successful) {
					console.log(json.successful);

				} else {
					console.log("failed to post data");
				}
			}
		};
		request.send(finalDataArray[i]);
		console.log("Data send: " + finalDataArray[i].toString());
		console.log();
	}
	
	
	// location.reload();
}

function openAnalytics() {
	window.location = '../employee_analytics/employee_analytics.html?userid='
			+ userID;
};
function openLogin() {
	window.location = '../login/login.html';
};