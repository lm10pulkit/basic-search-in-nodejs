const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/testsearch');
var schema = mongoose.Schema;
var textschema = new schema ({
    text :{
       type:String ,
       required: true
    }
});
var  {
    removeextraspaces,
    search,
    magic
} = require('./productsearch.js');

var text = mongoose.model('text', textschema);
var save = function(body){
   removeextraspaces(body.text,function(str){
   	body.text=str;
     var new_text = new text(body);
   new_text.save().then(function(val){
   	console.log(val);
   },function(err){
   	console.log(err);
   });
   });
};
var searcharr= function(search1,callback){
     removeextraspaces(search1,function(str){
     	console.log('hello world');
     	 console.log(str);
       text.find({},function(err,data){
       	   console.log(data);
           add(str,data,callback); 
       });     
     });
};

var add= function(str, data, callback){
	var num=0;
	var arr=[];
	for(var x =0;x<data.length;x++)
	{
        search(data[x].text,str,function(ismatch, val){
        	console.log(ismatch);
            if(ismatch)
            	arr.push(data[x].text);
            num++;
        });
        if(num==data.length)
        	return callback(arr);
	}
};
var fzzysearch = function(str, callback){
   text.find({},function(err,data){
     magic (str,data,callback);      
   });
};
module.exports={
   save,
   searcharr,
   fzzysearch
};