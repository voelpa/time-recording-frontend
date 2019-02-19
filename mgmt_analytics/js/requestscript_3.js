console.log("execute REST script for chart_3");

function createColorArray_2(size){
  var backgroundColor = [];
  var borderColor = [];

var backColorPool = [
  'rgba(255, 99, 132, 0.2)',
  //'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(114, 107, 107, 0.2)'
];

var borderColorPool = [
  'rgba(255,99,132,1)',
//  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(114, 107, 107, 1)'
];


for(var i = 0; i < size; i++){
  backgroundColor.push(backColorPool[i]);
  borderColor.push(borderColorPool[i]);
}

  var res = {
    background: backgroundColor,
    border: borderColor
  };

return res;
}

function drawChart_3(labels, dataX, backgroundColor, borderColor){
  var ctx_3 = document.getElementById("chart_3").getContext('2d');
  var chart_3 = new Chart(ctx_3, {
      type: 'horizontalBar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Projektlaufzeit',
              data: dataX,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1
          }]
      },
      options: {
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


//chart_3
$.ajax({

        'url' : 'http://localhost:9000/mgmt/projectDuration',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
              //console.log(JSON.stringify(data));
              var items = data.payload.projectDuration;
              var projName = [];
              var duration = [];
              for(var i = 0; i < items.length; i++){
                var json = items[i];
                projName[i] = json.projectName;
                duration[i] = json.durationInDays;
              }

              //projName = sortUnorderedList(projName, true);



              var colors = createColorArray(projName.length);


              drawChart_3(projName, duration, colors.background, colors.border);
              console.log("end script chart_3");
        },
        error: function(jqXHR, textStatus, errorThrown) {
           //var val = $("#register_area").text(jqxhr.responseText); // @text = response error, it is will be errors: 324, 500, 404 or anythings else
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
          // console.log(JSON.stringify(xhr) + "|" + JSON.stringify(status) + "|" + JSON.stringify(error));
         }
    });
