var express = require('express');
var app = express();
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
      host: '140.135.113.73',
      port:'3307',
      user: '%',
      password: '',
      database: 'mad'
}); 

var server = app.listen(8899,function(){
      var host = server.address().address
      var port = server.address().port
      console.log('server start')
  });

// connection.connect(function(err) {
//   if (err) {
//       console.log('connecting error');
//       return;
//   }
//   console.log('connecting success');
// });
function RandomNumber()
{
    var array1 = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");
    var Str = "";
    for (var i=1; i<=26; i++)
    {
        index = Math.floor(Math.random() * array1.length);
        Str = Str +array1[index];
    }

    return Str;
}

const num = RandomNumber()

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

app.get('/:id',function(req,res){
      var  sql = 'UPDATE user SET img = ? WHERE id = ?';    ////update/////
      var insql = [ num , req.params.id ];               ////update/////
      connection.query(sql,insql,function(err, rows) {    ////update/////
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
      });
      var  sql = 'SELECT * FROM user WHERE id=?'
      connection.query(sql,req.params.id,function(err, rows) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       console.log(rows);
       res.send(JSON.stringify(rows));
          });
      sleep(15000).then(() => {
            var  sql = 'UPDATE user SET img = ? WHERE id = ?';    ////update/////
            var insql = [ "null" , req.params.id ];               ////update/////
            connection.query(sql,insql,function(err, rows) {      ////update/////
              if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
              }
            });
        })
    });



