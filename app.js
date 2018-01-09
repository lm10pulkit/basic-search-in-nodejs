var express= require('express');
var app = express();
var bodyparser = require('body-parser');
var {save,searcharr,fzzysearch}= require('./db.js');
app.set('view engine','hbs');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get('/',function(req,res){
   res.render('search');
});
app.post('/search',function(req,res){
    fzzysearch(req.body.text, function(arr){
     res.send(arr);
    });
});
app.post('/add',function(req,res){
    save(req.body);
       res.redirect('/');
});
app.get('/search', function(req,res){
     
});
app.listen(8080,function(err){
   if(err)
   	console.log(err);
   else 
   	console.log('connected to the port 8080');
});