function graphiques(req, res, next) {
  var Canvas = require('canvas')
  , canvas1 = new Canvas(4000, 4000)
  , ctx1 = canvas1.getContext('2d')
  , canvas2 = new Canvas(1000, 1000)
  , ctx2 = canvas2.getContext('2d')
  , canvas3 = new Canvas(1000, 1000)
  , ctx3 = canvas3.getContext('2d')
  , canvas4 = new Canvas(1000, 1000)
  , ctx4 = canvas4.getContext('2d')
  , Chart = require('nchart')
  , fs = require('fs')

console.log('ID de déploiement :')
console.log(req.param("id_deploiement"))

var datatemps = [], datax = [], datay = [], dataz = [];
var datatemps2 = [], datax2 = [], datay2 = [], dataz2 = [];
var datatemps3 = [], datax3 = [], datay3 = [], dataz3 = [];
var datatemps4 = [], datax4 = [], datay4 = [], dataz4 = [];

  db.any({
    name: "graphs",
    text: "select * from donnees where id_deploiement = $1",
    values: [req.body.id_deploiement]
  })
    .then(function (data) {
      var max = data.length;

      for (var i = 0; i < max; i++){
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
        datatemps3[i]=datatemps[i+max-70]
        datax3[i]=datax[i+max-70]
        datay3[i]=datay[i+max-70]
        dataz3[i]=dataz[i+max-70]
        datatemps4[i]=datatemps[i+(max/2)]
        datax4[i]=datax[i+(max/2)]
        datay4[i]=datay[i+(max/2)]
        dataz4[i]=dataz[i+(max/2)]
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


      var lineChartData3 = {
      	labels : datatemps3,
      	datasets : [
      		{
      			label: "Accélération X",
      			fillColor : "rgba(255,51,166,0.2)",
      			strokeColor : "rgba(255,51,166,1)",
      			pointColor : "rgba(255,51,166,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(255,51,166,1)",
      			data : datax3
      		},
      		{
      			label: "Accélération Y",
      			fillColor : "rgba(51,157,255,0.2)",
      			strokeColor : "rgba(51,157,255,1)",
      			pointColor : "rgba(51,157,255,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(51,157,255,1)",
      			data : datay3
      		},
          {
      			label: "Accélération Z",
      			fillColor : "rgba(242,202,39,0.2)",
      			strokeColor : "rgba(242,202,39,1)",
      			pointColor : "rgba(242,202,39,1)",
      			pointStrokeColor : "#fff",
      			pointHighlightFill : "#fff",
      			pointHighlightStroke : "rgba(242,202,39,1)",
      			data : dataz3
      		}
      	]
      }


      var lineChartData4 = {
        labels : datatemps4,
        datasets : [
          {
            label: "Accélération X",
            fillColor : "rgba(255,51,166,0.2)",
            strokeColor : "rgba(255,51,166,1)",
            pointColor : "rgba(255,51,166,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(255,51,166,1)",
            data : datax4
          },
          {
            label: "Accélération Y",
            fillColor : "rgba(51,157,255,0.2)",
            strokeColor : "rgba(51,157,255,1)",
            pointColor : "rgba(51,157,255,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(51,157,255,1)",
            data : datay4
          },
          {
            label: "Accélération Z",
            fillColor : "rgba(242,202,39,0.2)",
            strokeColor : "rgba(242,202,39,1)",
            pointColor : "rgba(242,202,39,1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(242,202,39,1)",
            data : dataz4
          }
        ]
      }







      ctx1.fillStyle = '#fff';
      ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
      new Chart(ctx1).Line(lineChartData1);

      ctx2.fillStyle = '#fff';
      ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
      new Chart(ctx2).Line(lineChartData2);

      ctx3.fillStyle = '#fff';
      ctx3.fillRect(0, 0, canvas3.width, canvas3.height);
      new Chart(ctx3).Line(lineChartData3);

      ctx4.fillStyle = '#fff';
      ctx4.fillRect(0, 0, canvas4.width, canvas4.height);
      new Chart(ctx4).Line(lineChartData4);




      canvas1.toBuffer(function (err, buf) {
        if (err) throw err;
        fs.writeFile(__dirname + '/public'+'/images'+'/graph1.png', buf);
      });

      canvas2.toBuffer(function (err, buf) {
        if (err) throw err;
        fs.writeFile(__dirname + '/public'+'/images'+'/graph2.png', buf);
      });

      canvas3.toBuffer(function (err, buf) {
        if (err) throw err;
        fs.writeFile(__dirname + '/public'+'/images'+'/graph3.png', buf);
      });

      canvas4.toBuffer(function (err, buf) {
        if (err) throw err;
        fs.writeFile(__dirname + '/public'+'/images'+'/graph4.png', buf);
      });




      res.render('graphs', {title: 'LUL'});
    })

    .catch(function (err) {
      return next(err);
    });
  }


  module.exports = {
    graphiques: graphiques
  };
