console.log("execute REST script for chart_2");


function convertMonth(num){
  switch(num){
    case "1": return "January";
    case "2": return "February";
    case "3": return "March";
    case "4": return "April";
    case "5": return "Mai";
    case "6": return "June";
    case "7": return "July";
    case "8": return "August";
    case "9": return "September";
    case "10": return "October";
    case "11": return "November";
    case "12": return "Dezember";
    default: return "January";
  }
}



function drawChart_2(labels, dataX, backgroundColor, borderColor){
  var ctx_2 = document.getElementById("chart_2").getContext('2d');
  var chart_2 = new Chart(ctx_2, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Stundenverlauf',
              data: dataX,
              fill: false,
//              backgroundColor: backgroundColor,
//              borderColor: borderColor,
              backgroundColor:   ['rgba(54, 162, 235, 0.2)'],
              borderColor: ['rgba(54, 162, 235,1)'],
              borderWidth: 1
          }]
      },
      options: {
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
        },
          scales: {
              yAxes: [/*{
                  ticks: {
                      beginAtZero:true
                  }
              },*/
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Stunden'
                }
              }/*],
              xAxes: [
                {
                  scaleLabel : {
                    display: true,
                    labelString: 'Monate'
                  }
                }*/
              ]
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

//chart_1

var month = [];
var hours_2 = [];
//hours.del

$.ajax({

        'url' : 'http://localhost:9000/employee/' + user_id + '/monthlyWorkingHours',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
            //  console.log(JSON.stringify(data));
              var payload = data.payload;
              var workingHours = payload.monthlyWorkingHours;
              //console.log(workingHours);


              for(var i = 0; i < workingHours.length; i++){
                  var oneItem = workingHours[i];
                  if(oneItem.year == '2017'){
                    //console.log("ONE_ITEM" + JSON.stringify(oneItem));

                    month.push("" + convertMonth(oneItem.month));
                    hours_2.push(oneItem.workingHours);
                  }
              }
              //update chart_2

              var  data = [{
                      label: "Hours per Month",
                      data: hours_2,
                      borderWidth: 1
                  }]

                  //console.log(data);
                  //console.log("HOURS=" + hours_2);
                  //console.log("MONTH=" + month);

                  var res = createColorArray(month.length);

                drawChart_2(month, hours_2, res.background, res.border);
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
