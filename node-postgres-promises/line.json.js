var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var datatemps = [], datax = [], datay = [], dataz = [], datapoint = [];

db.any({
  name: "graphs",
  text: "select * from donnees where id_deploiement = 2"
})
  .then(function (data) {
    for (var i = 0; i < 6; i++){
      datatemps[i]=data[i].temps
      datax[i]=data[i].x;
      datay[i]=data[i].y;
      dataz[i]=data[i].z
    }
    console.log(datatemps);
    console.log(datax);

  })
  .catch(function (err) {
    return next(err);
  });

for (var i = 0; i < 6; i++){
  datapoint[i]='{x:'+datax[i]+', y:'+ datay[i]+'}';
}
console.log(datapoint);


		var lineChartData = {
			labels : ["1","2","3","4","5","6"],
			datasets : [
				{
					label: "My First dataset",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					dataPoints : datax
				},
				{
					label: "My Second dataset",
					fillColor : "rgba(151,187,205,0.2)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(151,187,205,1)",
					data : datay
				}
			]
		}

module.exports = lineChartData;
