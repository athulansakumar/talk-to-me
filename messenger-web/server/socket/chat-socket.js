var { ObjectID } = require('mongodb');
var userList={};

var loadSockets = (io) => {
    io.on('connection', (client) => {
        // console.log('client connected ..',client);
        // client.emit('whoaru',{});
        console.log('user : ',client._id);
        if(client._id){
            userList[client._id] = client;
            io.emit('users',Object.keys(userList));
        }
        client.on('msg',(msg,ack) => {
            msg.id= new ObjectID().toHexString();
            msg.from = client._id;
            if(msg.to && userList[msg.to]){
                userList[msg.to].emit('msg',msg,(reAck) => {
                    client.emit('ack',reAck);
                });
            }
            ack({id:msg.id,sent:true});
        });
        client.on('disconnect', function() {
            console.log('Got disconnect!');
            for(let c in userList){
                if(client == userList[c]){
                    delete userList[c];
                    io.emit('users',Object.keys(userList));
                    break;
                }
            }
        });
    });
};


module.exports = loadSockets;
