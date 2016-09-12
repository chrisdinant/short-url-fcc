function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://user1:user1234@ds021026.mlab.com:21026/short-url-fcc';

app.get('/new/*', function(req, res){
    var para = req.params["0"];
    console.log(para);
    
   MongoClient.connect(url, function (err, db) {
  if (err) {
    res.send('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    
    var urls = db.collection('urls');
    urls.find({address : para}).toArray(function(err, data){
     if(err) throw err;
     if(data.length === 0){
         var entry = {key: makeid(), address : para, clicked : 0};
         urls.insert([entry], function(err, result){
        if (err) {
            console.log(err);
        } else {
            res.send(result.ops[0].key);
        }
    });
         
     } else res.send(data[0].key); 
        
    db.close();
    });
  }
});
});


app.get('/*', function(req, res){
    var para = req.params["0"];
    console.log(para);
    
   MongoClient.connect(url, function (err, db) {
  if (err) {
    res.send('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    
    var urls = db.collection('urls');
    urls.find({key : para}).toArray(function(err, data){
     if(err) throw err;
     if(data.length === 0){
         res.send('no record with this key in our database');
     } else res.redirect(data[0].address); 
        
    db.close();
    });
  }
});
});




var port = Number(process.env.PORT || 8080);
app.listen(port, function(){
    console.log("check");
});