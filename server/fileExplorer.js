var express = require('express'), router = express.Router();
var fs = require('fs');
 

router.post("/getFolder", function(req, res){
    const body = req.body;
    res.send(JSON.stringify(walk(body.dir, body.dirName)));
});

router.post("/getFileContent", function(req, res){
    const body = req.body;
    res.send(fs.readFileSync(body.dir+body.fileName));
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

