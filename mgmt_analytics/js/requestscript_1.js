console.log("execute REST script for chart_1");

function sortUnorderedList(vals, sortDescending) {


  // Sort it
  vals.sort();

  // Sometimes you gotta DESC
  if(sortDescending)
    vals.reverse();

    return vals;
}

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
  //var colorIndex = getRandomColor(backColorPool.length);

  //console.log("INDEX=" + colorIndex);

  backgroundColor.push(backColorPool[i]);
  borderColor.push(borderColorPool[i]);

//console.log("backgroundColor" + backgroundColor);
//console.log("borderColor" + borderColor);

  //backColorPool.splice(colorIndex,1);
  //borderColorPool.splice(colorIndex,1);

  //console.log(JSON.stringify(backColorPool));
}

  var res = {
    background: backgroundColor,
    border: borderColor
  };

return res;
}

function drawChart_1(labels, dataX, background, border){
  var ctx_1 = document.getElementById("chart_1").getContext('2d');
  var chart_1 = new Chart(ctx_1, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              //label: 'Stundenverlauf',
              data: dataX,
              fill: false,
              //steppedLine: true,
              backgroundColor: background ,
              borderColor: border,
              borderWidth: 1
          }]
      },
      options: {
        elements: {
            line: {
                tension: 0, // disables bezier curves
            }
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

//chart_1

var cw = [];
var hours = [];

$.ajax({

        'url' : 'http://localhost:9000/mgmt/projects',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
          //console.log(JSON.stringify(data));
            var items = data.payload.hoursPerProject;
            var projectNames = [];
            var  hours = [];
            for(var i = 0; i < items.length; i++){
              var json = items[i];
              projectNames[i] = json.projectName;
              hours[i] = json.workingHours;
            }
            //console.log("Project-Names: " + JSON.stringify(projectNames));
            projectNames = sortUnorderedList(projectNames, true);
            //console.log(JSON.stringify(projectNames));
            var colors = createColorArray(projectNames.length);

              drawChart_1(projectNames, hours, colors. background, colors.border);
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
