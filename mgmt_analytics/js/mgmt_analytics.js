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

function openLogin() {
	window.location = '../login/login.html';
};
