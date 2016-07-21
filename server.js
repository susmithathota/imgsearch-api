var express= require("express");
var mongoose = require("mongoose");
var path=require("path");
var seacrch_api= require("./search_api.js");
var Schema=mongoose.Schema;
require('dotenv').config({
  silent: true
});
var app=express();

var historySchema = new Schema({
  term: String,
  when: String
});
var searchHistory = mongoose.model('History',historySchema);
var mongouri = process.env.MONGOLAB_URI || "mongodb://" + process.env.IP + ":27017/img-sal";
mongoose.connect(mongouri);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/',function(req,res){
    res.send('hello world');
});

seacrch_api(app,searchHistory);
app.listen(8080,function(){
    console.log('Ex runnig at 8080');
})