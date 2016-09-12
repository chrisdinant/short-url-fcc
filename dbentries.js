function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
console.log(process.env.MONGOLAB_URI);
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://user1:user1234@ds021026.mlab.com:21026/short-url-fcc';
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    var urls = db.collection('urls');
    var entryOne = {key: makeid(), address : 'http://www.github.com', clicked : 0};
    urls.insert([entryOne], function(err, result){
      if (err) {
        console.log(err);
      } else {
        console.log('inserted url number one', result);
      }
    });

    //Close connection
    db.close();
  }
});