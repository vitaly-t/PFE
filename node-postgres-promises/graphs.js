function graphiques(req, res, next) {
  var Canvas = require('canvas')
  , canvas1 = new Canvas(4000, 4000)
  , ctx1 = canvas1.getContext('2d')
  , canvas2 = new Canvas(1000, 1000)
  , ctx2 = canvas2.getContext('2d')
  , Chart = require('nchart')
  , fs = require('fs')

var datatemps = [], datax = [], datay = [], dataz = [];
var datatemps2 = [], datax2 = [], datay2 = [], dataz2 = [];

  db.any({
    name: "graphs",
    text: "select * from donnees where id_deploiement = 2"
  })
    .then(function (data) {
      for (var i = 0; i < data.length; i++){
        datatemps[i]=data[i].temps
        datax[i]=data[i].x;
        datay[i]=data[i].y;
        dataz[i]=data[i].z
      }

      for (var i = 0; i < 70; i++){
        datatemps2[i]=datatemps[i]
        datax2[i]=datax[i]
        datay2[i]=datay[i]
        dataz2[i]=dataz[i]
      }






      var lineChartData1 = {
      	labels : datatemps,
      	datasets : [
      		{
      			label: "Accélération X",
      			fillColor : "rgba(255,51,166,0.2)",
      			strokeColor : "rgba(255,51,166,1)",
      			pointColor : "rgba(255,51,166,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(255,51,166,1)",
      			data : datax
      		},
      		{
      			label: "Accélération Y",
      			fillColor : "rgba(51,157,255,0.2)",
      			strokeColor : "rgba(51,157,255,1)",
      			pointColor : "rgba(51,157,255,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(51,157,255,1)",
      			data : datay
      		},
          {
      			label: "Accélération Z",
      			fillColor : "rgba(242,202,39,0.2)",
      			strokeColor : "rgba(242,202,39,1)",
      			pointColor : "rgba(242,202,39,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(242,202,39,1)",
      			data : dataz
      		}
      	]
      }






      var lineChartData2 = {
      	labels : datatemps2,
      	datasets : [
      		{
      			label: "Accélération X",
      			fillColor : "rgba(255,51,166,0.2)",
      			strokeColor : "rgba(255,51,166,1)",
      			pointColor : "rgba(255,51,166,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(255,51,166,1)",
      			data : datax2
      		},
      		{
      			label: "Accélération Y",
      			fillColor : "rgba(51,157,255,0.2)",
      			strokeColor : "rgba(51,157,255,1)",
      			pointColor : "rgba(51,157,255,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(51,157,255,1)",
      			data : datay2
      		},
          {
      			label: "Accélération Z",
      			fillColor : "rgba(242,202,39,0.2)",
      			strokeColor : "rgba(242,202,39,1)",
      			pointColor : "rgba(242,202,39,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(242,202,39,1)",
      			data : dataz2
      		}
      	]
      }




      ctx1.fillStyle = '#fff';
      ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
      new Chart(ctx1).Line(lineChartData1);

      ctx2.fillStyle = '#fff';
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
      new Chart(ctx2).Line(lineChartData2);




      canvas1.toBuffer(function (err, buf) {
        if (err) throw err;
        fs.writeFile(__dirname + '/public'+'/images'+'/graph1.png', buf);
      });

      canvas2.toBuffer(function (err, buf) {
        if (err) throw err;
        fs.writeFile(__dirname + '/public'+'/images'+'/graph2.png', buf);
      });




      res.render('graphiques', {title: 'LUL'});
    })

    .catch(function (err) {
      return next(err);
    });
  }


  module.exports = {
    graphiques: graphiques
  };
