console.log("execute REST script for chart_5");

function createColorArray_5(size){
  var backgroundColor = [];
  var borderColor = [];

var backColorPool = [
  'rgba(255, 206, 86, 0.2)',
  'rgba(0, 0, 250, 0.2)',
  //'rgba(54, 162, 235, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(114, 107, 107, 0.2)'
];

var borderColorPool = [
  'rgba(255, 206, 86, 1)',
  'rgba(0,0,250,1)',
//  'rgba(54, 162, 235, 1)',
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


function drawChart_5(nameP, hoursInProject, res , comps){
  var barOptions_stacked = {
    tooltips: {
        enabled: false
    },
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            gridLines: {
            },
            stacked: true
        }],
        yAxes: [/*{
            gridLines: {
            },
            stacked: true
        },*/
        {
          scaleLabel : {
            display: true,
            labelString: 'Stunden'
          }
        }]
    },
};

var datasets = [];

nameP.pop();
nameP.pop();
nameP.pop();
nameP.pop();
for(var i = 0; i < nameP.length; i++){
  var data = {};
  data.label = comps[i];
  data.data = hoursInProject[i];
  data.backgroundColor = res.background[i];
  data.borderColor = res.border[i];

  datasets.push(data);
}

console.log(datasets);


  var ctx_5 = document.getElementById("chart_5").getContext('2d');
  var chart_5 = new Chart(ctx_5, {
    type: 'bar',
    data: {
     labels: nameP,

     datasets:datasets
   },

  options: barOptions_stacked,
  });
}

function getProjects(items){
  var nameP = [];
    for(var i = 0; i < items.length; i++){
        var json = items[i];
        if( !(nameP.indexOf(json.projectName) > -1) ){
            nameP.push(json.projectName);
        }
    }
    return nameP;
}

function getCompanies(items){
  var nameC = [];

  for(var i = 0; i < items.length; i++){
      var json = items[i];
      var innerCompArray = json.companies;
      //console.log(innerCompArray);
      for(var j = 0; j < innerCompArray.length; j++){
        var comp = innerCompArray[j].companyName;
        //console.log(comp);
        if( !(nameC.indexOf(comp) > -1) ){
          nameC.push(comp);
        }
      }
  }

  return nameC;
}

function getCompanyHours(companyO){
  var sum = 0;

  for(var l = 0; l < companyO.employees.length; l++){
    sum += (companyO.employees[l].workingHoursPerEmployee);
  }

  return sum;
}

$.ajax({
        'url' : 'http://localhost:9000/mgmt/projectStaffing',
        'type' : 'GET',
        'success' : function(data) {//parseJSON()
            var items = data.payload.projectStaffing;
            var nameP = getProjects(items);
            var comps = getCompanies(items);

            //console.log(nameP);
            //console.log(comps);

            var workingHoursPerProject = [];
            for(var i = 0; i < items.length; i++){
              var oneProject = items[i];
              //console.log(oneProject);
              var hoursInProject = [];

              var companyArray = oneProject.companies;
              for(var j = 0; j < companyArray.length; j++){
                var oneComp = companyArray[j];
                //console.log(oneComp.employees);
                if(oneComp.employees == null){
                  hoursInProject.push(0);
                  //console.log(oneComp.employees);
                }else{
                  var hours = getCompanyHours(oneComp);
                  hoursInProject.push(hours);
                }
              }
              //console.log(hoursInProject);

              workingHoursPerProject.push(hoursInProject);
            }



              var colorsY = createColorArray_5(nameP.length);

            drawChart_5(nameP, workingHoursPerProject, colorsY, comps);
            console.log("end script chart_5");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log(jqXHR.responseText);
          console.log(textStatus);
          console.log(errorThrown);
         }
    });
