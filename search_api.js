var Search = require('bing.search');
module.exports=function(app,searchHistory){
    
    app.get('/latest',function(req,res){
      searchHistory.find({},null,{
        "limit":10,
        "sort":{
            "when":-1
             }
        },function(err,history){
            if(err) return console.error(err);
            console.log(history);
            res.send(history.map(function(args){
                return {
                    "term": args.term,
                    "when": args.when
                };
            }));
        });  
    });
    
    app.get('/:query',function(req,res){
        var query=req.params.query;
        var size=req.query.offset || 10;
        var search=new Search('qMOVeD1GwMXman6W7Q+ed7x0TndMzanR3UZltSYteuc');

        var history = {
          "term": query,
          "when": new Date().toLocaleString()
        };
        if (query !== 'favicon.ico') {
          var obj=new searchHistory(history);
          obj.save(function(err,obj){
              if(err) throw err;
              console.log('saved' + obj);
          })
        }
        search.images(query,{top:size},function(err,result){
            if(err) throw err;
            res.send(result.map(imgDetailList));
        });
        
        function imgDetailList(img){
            return {
                      "url": img.url,
                      "snippet": img.title,
                      "thumbnail": img.thumbnail.url,
                      "context": img.sourceUrl
            };
        }
       
    });
};