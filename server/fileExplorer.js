var express = require('express'), router = express.Router();
var fs = require('fs');
 

router.get("/getFolder", function(req, res){
    const dir = "./server/";  //Have to make it dynamic  
    res.send(JSON.stringify(walk(dir, "server")));
});

router.post("/getFileContent", function(req, res){
    const dir = "./server/";  //Have to make it dynamic  

    const body = req.body;
    res.send(fs.readFileSync(dir+body.fileName));
});

const walk = (dir, dirName) => {
    var retObj = {
        type: "head",
        headName: dirName,
        children:[]
    }
    var files = fs.readdirSync(dir);
    for(var i in files){
        if(fs.lstatSync(dir+"/"+files[i]).isDirectory()){
            retObj.children.push(walk(dir+"/"+files[i], files[i]));
        }
        else{
            retObj.children.push(createNode(files[i]));
        }
    }
    return retObj;
}

const createNode = (fileName) => {
    return {
        type:"node",
        name:fileName
    }
}

module.exports = router

