

		function login(){
			
			var user = {
                employeeId:document.getElementById("employeeId").value,
                password:document.getElementById("password").value
			};

			
			var ourRequest = new XMLHttpRequest();
			ourRequest.open('POST', 'http://localhost:9000/login', true);
			ourRequest.setRequestHeader('Content-type', 'application/json');
			ourRequest.onreadystatechange = function () {
				if (ourRequest.readyState === 4 && ourRequest.status === 200) {
					var json = JSON.parse(ourRequest.responseText);
					console.log(json);
					if(json.authenticated){
						if(json.isController){
							window.location = '../mgmt_analytics/mgmt_analytics.html?userid='+user.employeeId;
						}else{
							window.location = '../developer_view/developer_view.html?userid='+user.employeeId;
						}
					}else{
						alert("Wrong credentials");
					}
				}


			};
			
			var data = JSON.stringify({"employeeId":parseInt(user.employeeId),"pw":user.password});
			ourRequest.send(data);
		}
		
		function inputKeyUp(e) {
			e.which = e.which || e.keyCode;
			if(e.which == 13) {
				document.getElementById("login_btn").click();
			}
		}

		document.onkeydown = function (e) {
			var keyCode = e.keyCode;
			if(keyCode == 13) {
				login();
			}
		};
