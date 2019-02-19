console.log("execute REST script for chart_4");


function getNamesOfAllProjects(items){
  var names = [];
  var k = 0;

  for(var i = 0; i < items.length; i++){
      var innerArray = items[i].weeklyProjectHours;

      for(var j = 0; j < innerArray.length; j++){
          var pName = innerArray[j].projectName;
          //console.log(pName);
          if(!(names.indexOf(pName) > -1)){
            names[k] = pName;
            k++;
          }

      }
  }
  //console.log(names);
  return names;
}



function drawChart_4(cw, hoursX, res, projectN){

  var ctx_4 = document.getElementById("chart_4").getContext('2d');

  var datasets = [];
  for(var i = 0; i < hoursX.length; i++){
      var obj = {};
      obj.label = projectN[i];
      obj.data = hoursX[i];
      obj.fill = false;
      obj.backgroundColor = res.background[i];
      obj.borderColor = res.border[i];
      obj.borderWidth = 1;
      datasets.push(obj);
  }

  var chart_4 = new Chart(ctx_4, {
      type: 'line',
      data: {
          labels: cw,
          datasets: datasets
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
            scaleLabel : {
              display: true,
              labelString: 'Stunden'
            }
          }],
          xAxes : [
            {
              scaleLabel : {
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



$.ajax({
        'url' : 'http://localhost:9000/mgmt/weeklyHoursPerProject',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
              var payload = data.payload;
              var items = payload.weeklyHoursPerProject;

              var hoursX  = [];
              var cw = [];
              var projectN = getNamesOfAllProjects(items);
              sortUnorderedList(projectN, true);
          //    console.log(JSON.stringify(projectN));

              for(var i = 0; i < projectN.length; i++){
                  var pName = projectN[i];
                  var tempArray = [];
                  for(var j = 0; j < items.length; j++){
                    var innerObj = items[j];
                    var innerArr = innerObj.weeklyProjectHours;
                    for(var k = 0; k < innerArr.length; k++){
                      var json = innerArr[k];
                        if(pName == json.projectName ){
                            tempArray.push(json.weeklyWorkingHours);
                        }else {
                            tempArray.push(0);
                        }
                    }
                  }
                  hoursX.push(tempArray);
              }
            //  console.log(hoursX);

              for (var i = 0; i < items.length; i++) {
                cw.push("KW " + items[i].calendarWeek);

              }
          //    console.log(cw);

              var colorsX = createColorArray(projectN.length);

              drawChart_4(cw, hoursX, colorsX, projectN);
            //    console.log("end script chart_4");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
         }
    });
