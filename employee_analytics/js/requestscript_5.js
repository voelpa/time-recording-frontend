console.log("execute REST script for chart_5");

function cloneX(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


function drawChart_5(labelX, myHours, avgHours, res, res_2){

  var ctx_5 = document.getElementById("chart_5").getContext('2d');
  var chart_5 = new Chart(ctx_5, {
      type: 'horizontalBar',
      data: {
          labels: labelX,
          datasets: [
            {
              label: 'Stunden aktueller Monat',
              data: myHours,
              backgroundColor: res.background,
              borderColor: res.border,
              borderWidth: 1
          },
          {
            label: 'Durschnittliche Stunden aller Mitarbeiter',
            data: avgHours,
            backgroundColor: res_2.background,
            borderColor: res_2.border,
            borderWidth: 1
          }

        ]
      },
      options: {
        scales: {
            xAxes: [/*{
                ticks: {
                    beginAtZero:true
                }
            },*/
          {
            scaleLabel: {
              display: true,
              labelString: 'Stunden'
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

        'url' : 'http://localhost:9000/employee/' + user_id + '/overallWorkingHours',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
          console.log(JSON.stringify(data));
              var payload = data.payload;
              var items = payload.employeeWorkingHours;
              var ownData = undefined;
              var summed = 0;

              var myHours = 0;

              for (var i = 0; i < items.length; i++) {
                  var inner = items[i];
                  //console.log(inner.employeeId + " | " + user_id);
                  if(inner.employeeId == user_id){
                    myHours = inner.workingHours;
                    summed += inner.workingHours;
                    console.log("HERE");
                  }else{
                      summed += inner.workingHours;
                  }
              }

              console.log(JSON.stringify(ownData));

              var avg = Math.round(summed/items.length);
              console.log("OWN" + myHours + " | summed" + summed + " | avg=" + avg );

              var res = createColors(1, 1);
              var res_2 = createColors(1, 0);
              console.log(JSON.stringify(res));
              console.log(JSON.stringify(res_2));

              var labelX = [''];
              var avgArray = [avg];
              var myHoursArray = [myHours];

                drawChart_5(labelX, myHoursArray, avgArray, res, res_2)
                console.log("end script chart_5");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
         }
    });
