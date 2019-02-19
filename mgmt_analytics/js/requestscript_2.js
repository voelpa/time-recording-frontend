console.log("execute REST script for chart_2");



function drawChart_2(labels, dataX, dataY){
  var ctx_2 = document.getElementById("chart_2").getContext('2d');
  var chart_2 = new Chart(ctx_2, {
      type: 'radar',
      data: {
          labels: labels,
          datasets: [{
              label: 'abgearbeitete Stunden',
              data: dataX,
              fill: true,
//              backgroundColor: backgroundColor,
//              borderColor: borderColor,
              backgroundColor:   ['rgba(10, 10, 10, 0.2)'],
              borderColor: ['rgba(10, 10, 10,1)'],
              borderWidth: 1
          },
          {
            label: 'geschätzte Stunden insgesamt',
            data: dataY,
            fill: true,
  //              backgroundColor: backgroundColor,
  //              borderColor: borderColor,
            backgroundColor:   'rgba(34,139,34, 0.2)',
            borderColor: ['rgba(34,139,34, 1)'],
            borderWidth: 1
          }]
      },
      options: {
      layout: {
              padding: {
                  left: 5,
                  right: 5,
                  top: 5,
                  bottom: 5
              }
          }
      }
  });

}

//chart_1

var month = [];
var hours_2 = [];
//hours.del

$.ajax({

        'url' : 'http://localhost:9000/mgmt/projectBudgets',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
              //console.log(JSON.stringify(data));

              var items = data.payload.projectBudgets;
              var projectNames = [];
              var currentHours = [];
              var estimatedHours = [];

              for(var i = 0; i < items.length; i++){
                var json = items[i];
                projectNames[i] = json.projectName;
                currentHours[i] = json.currentWorkingHours;
                estimatedHours[i] = json.estimatedWorkingHours;
              }


                drawChart_2(projectNames, currentHours, estimatedHours);
                console.log("end script chart_2");
        },
        error: function(jqXHR, textStatus, errorThrown) {
           //var val = $("#register_area").text(jqxhr.responseText); // @text = response error, it is will be errors: 324, 500, 404 or anythings else
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
          // console.log(JSON.stringify(xhr) + "|" + JSON.stringify(status) + "|" + JSON.stringify(error));
         }
    });
