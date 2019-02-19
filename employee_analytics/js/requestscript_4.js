console.log("execute REST script for chart_4");

function createColors(size, colorIndex){
    var backgroundColor = [];
    var borderColor = [];

  var backColorPool = [
    //'rgba(255, 99, 132, 0.2)',
    'rgba(34,139,34,0.2)',
    'rgba(54, 162, 235, 0.2)'
  ];

  var borderColorPool = [
    //'rgba(255,99,132,1)',
    'rgba(34,139,34,1)',
    'rgba(54, 162, 235, 1)',
  ];


  for(var i = 0; i < size; i++){
    backgroundColor.push(backColorPool[colorIndex]);
    borderColor.push(borderColorPool[colorIndex]);
  }

  var res = {
    background: backgroundColor,
    border: borderColor
  };

  return res;
}


function drawChart_4(projectName, currentWorkingHours, estimatedWorkingHours, res, res_2){

  var ctx_4 = document.getElementById("chart_4").getContext('2d');
  var chart_4 = new Chart(ctx_4, {
      type: 'bar',
      data: {
          labels: projectName,
          datasets: [
            {
              label: 'Stunden pro Projekt',
              data: currentWorkingHours,
              backgroundColor: res.background,
              borderColor: res.border,
              borderWidth: 1
          },
          {
            label: 'Geschätzte Stunden',
            data: estimatedWorkingHours,
            backgroundColor: res_2.background,
            borderColor: res_2.border,
            borderWidth: 1
          }

        ]
      },
      options: {
        scales: {
            yAxes: [/*{
                ticks: {
                    beginAtZero:true
                }
            },*/
          {
            scaleLabel: {
              display: true,
              labelString: 'Strunden'
            }
          }]
        },
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



$.ajax({

        'url' : 'http://localhost:9000/employee/' + user_id + '/projectBudgets',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
              var payload = data.payload;
              var items = payload.employeeProjectBudgets;

              console.log(items);

              var currentWorkingHours = [];
              var estimatedWorkingHours = [];
              var projectName = [];


              for(var i = 0; i < items.length; i++){
                  var inner = items[i];
                  projectName.push(inner.projectName);
                  currentWorkingHours.push(inner.currentWorkingHours);
                  estimatedWorkingHours.push(inner.estimatedWorkingHours);
              }



                  var res = createColors(projectName.length, 1);
                  var res_2 = createColors(projectName.length, 0);
                  //console.log(JSON.stringify(res));
                  //console.log(JSON.stringify(res_2));

                drawChart_4(projectName, currentWorkingHours, estimatedWorkingHours, res, res_2);
                console.log("end script chart_4");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
         }
    });
