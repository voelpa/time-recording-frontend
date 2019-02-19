console.log("execute REST script for chart_1");

function getRandomColor(val){
   return (Math.floor(Math.random() * val));
}

function createColorArray(size){
  var backgroundColor = [];
  var borderColor = [];

var backColorPool = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(114, 107, 107, 0.2)'
];

var borderColorPool = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(114, 107, 107, 1)'
];


for(var i = 0; i < size; i++){
  var colorIndex = getRandomColor(backColorPool.length);

  //console.log("INDEX=" + colorIndex);

  backgroundColor.push(backColorPool[colorIndex]);
  borderColor.push(borderColorPool[colorIndex]);

//console.log("backgroundColor" + backgroundColor);
//console.log("borderColor" + borderColor);

  backColorPool.splice(colorIndex,1);
  borderColorPool.splice(colorIndex,1);

  //console.log(JSON.stringify(backColorPool));
}

  var res = {
    background: backgroundColor,
    border: borderColor
  };

return res;
}

function drawChart_1(labels, dataX, backgroundColor, borderColor){
  var ctx_1 = document.getElementById("chart_1").getContext('2d');
  var chart_1 = new Chart(ctx_1, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Stundenverlauf',
              data: dataX,
              fill: false,
              //steppedLine: true,
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
/*
scales: {
  xAxes : [
    {
      scaleLabel : {
        display: true,
        labelString: 'Tage bis Deadline'
      }
    }
  ]
},
*/

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
            }]
            ,
            xAxes:
              [
                {
                scaleLabel: {
                  display: true,
                  labelString: 'Kalenderwoche'
                }
              }
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

var user_id = '1';
console.log("LOCATION=" + window.location.href);
locURL = window.location.href;
/*var user = locURL.replace("http://localhost/employee_analytics/index.html" ,"");
user = user.replace("?", "");
user = user.replace("userid=", "");*/


var user = locURL.split("?userid=")[1];
console.log("TESTUSER = " + JSON.stringify(user));

console.log(user);
if(typeof(user) !== 'undefined' && user !== '' && user.length > 0){
  user_id = user;
}
console.log(user_id);
//chart_1

var cw = [];
var hours = [];

$.ajax({

        'url' : 'http://localhost:9000/employee/' + user_id + '/weeklyWorkingHours',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
              //console.log(JSON.stringify(data));
              var payload = data.payload;
              var workingHours = payload.weeklyWorkingHours;


              for(var i = 0; i < workingHours.length; i++){
                  var oneItem = workingHours[i];
                  if(oneItem.year == '2017'){
                    //console.log(oneItem);

                    cw.push("KW " + oneItem.calendarWeek);
                    hours.push(oneItem.workingHours);
                  }
              }
              //update chart_1

              var  data = [{
                      label: "Hours per Calendar Week",
                      data: hours,

                      borderWidth: 1
                  }]

                  //console.log(data);
                  //console.log(hours);
                  //console.log(cw);

                  var res = createColorArray(cw.length);

                drawChart_1(cw, hours, res.background, res.border);
                console.log("end script chart_1");
        },
        error: function(jqXHR, textStatus, errorThrown) {
           //var val = $("#register_area").text(jqxhr.responseText); // @text = response error, it is will be errors: 324, 500, 404 or anythings else
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
          // console.log(JSON.stringify(xhr) + "|" + JSON.stringify(status) + "|" + JSON.stringify(error));
         }
    });
