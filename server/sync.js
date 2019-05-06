var express = require('express'), router = express.Router();
const Room = require('ipfs-pubsub-room');
const IPFS = require('ipfs');

const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
});

router.post("/sendUpdate", function(req, res){
  var val = (req.body.changes);
  const room = Room(ipfs, "alex.cpp")
  room.broadcast(JSON.stringify(val));
  res.end();
});

router.get("/update", function(req, res){
  initialiseSSE(req, res);
});

function initialiseSSE(req, res) {
  res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*"
  });

  var messageEvent = new ServerEvent();
  messageEvent.addData("online");
  outputSSE(req, res, messageEvent.payload());

  const room = Room(ipfs, "alex.cpp")
  room.on('message', (message) => {
    if (ipfs._peerInfo.id._idB58String != message.from) {
      var value = ((message.data).toString('utf8'));
      var messageEvent = new ServerEvent();
      messageEvent.addData(value);
      outputSSE(req, res, messageEvent.payload());
    }
  });
  
}

function outputSSE(req, res, data) {
  res.write(data);
}

function ServerEvent() {
   this.data = "";
};
ServerEvent.prototype.addData = function(data) {
  var lines = data.split(/\n/);

  for (var i = 0; i < lines.length; i++) {
      var element = lines[i];
      this.data += "data:" + element + "\n";
  }
}
ServerEvent.prototype.payload = function() {
  var payload = "";
  payload += this.data;
  return payload + "\n";
}

module.exports = router

