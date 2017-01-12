var csv = require('csv-stream');
var request = require('request');
var fs = require('fs');

// All of these arguments are optional.
var options = {
    delimiter : ';', // default is ,
    endLine : '\n', // default is \n,
// by default read the first line and use values found as columns
    columns : ['tag', 'temps','x','y','z'],
    escapeChar : '"', // default is an empty string
    enclosedChar : '"' // default is an empty string
}

var csvStream = csv.createStream(options);



function importDonnees(req, res, next) {
  console.log('File Uploaded :');
  console.log(req.file);
  console.log('...');
  console.log('ID de déploiement :')
  console.log (req.body.id_deploiement)

  if(req.fileValidationError) {
              return res.end(req.fileValidationError);
        }

    var path = '/home/lalanne/PFE/PFE/node-postgres-promises/' + req.file.path
    console.log('PATH:' + path)
    fs.createReadStream(path).pipe(csvStream)
       .on('error',function(err){
           console.error(err);
       })
       .on('data',function(data){
           // outputs an object containing a set of key/value pair representing a line found in the csv file.
           //console.log(data);
           db.none({
             name: "importDonnees",
             text: "insert into donnees values($1, $2, $3, $4, $5)",
             values: [req.body.id_deploiement, data.temps, data.x, data.y, data.z]
           });

       })
       .on('column',function(key,value){
           // outputs the column name associated with the value found
          //console.log('#' + key + ' = ' + value);

       })
       console.log('File Imported into DB');
       res.render('upload', { title: 'LUL' })
}



module.exports = {
  importDonnees: importDonnees,
};
