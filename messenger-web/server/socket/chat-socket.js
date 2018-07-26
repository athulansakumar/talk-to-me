var { ObjectID } = require('mongodb');
var userList={};

var loadSockets = (io) => {
    io.on('connection', (client) => {
        // console.log('client connected ..',client);
        // client.emit('whoaru',{});
        console.log('user : ',client.username);
        if(client.username){
            userList[client.username] = client;
            io.emit('users',Object.keys(userList));
        }
        client.on('msg',(msg,ack) => {
            msg.id= new ObjectID().toHexString();
            msg.from = client.username;
            if(msg.to && userList[msg.to]){
                userList[msg.to].emit('msg',msg,(reAck) => {
                    client.emit('ack',reAck);
                });
                ack({id:msg.id,sent:true});
            }
            ack({id:msg.id,sent:false});
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
