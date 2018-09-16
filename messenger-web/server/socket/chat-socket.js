const { ObjectID } = require('mongodb');
const webpush = require('web-push');

const properties = require('./../../app.properties');

webpush.setVapidDetails(
    properties.vapid.email,
    properties.vapid.public,
    properties.vapid.private
);

var userList={};

var loadSockets = (io) => {
    io.on('connection', (client) => {
        // console.log('client connected ..',client);
        // client.emit('whoaru',{});
        console.log('user : ',client._id, client.name);
        if(client._id){
            if(!userList[client._id]) userList[client._id] = {};
             userList[client._id].socket = client;
            io.emit('users',Object.keys(userList));
        }
        client.on('msg',(msg,ack) => {
            msg.id= new ObjectID().toHexString();
            msg.from = client._id;
            if(msg.to && userList[msg.to]){
                if(userList[msg.to].socket){
                    userList[msg.to].socket.emit('msg',msg,(reAck) => {
                        client.emit('ack',reAck);
                    });
                }else if(userList[msg.to].pushSub){
                    console.log("Sending notification -- >")
                    webpush.sendNotification(userList[msg.to].pushSub,
                        JSON.stringify({
                            "notification": {
                                "title": `You Have a message from ${client.name}`,
                                "body": `${client.name} : ${msg.text}`,
                                "icon": "assets/user.png",
                                "vibrate": [100, 50, 100],
                                "data": {
                                    "dateOfArrival": Date.now(),
                                    "primaryKey": 1,
                                    "message":msg
                                },
                                "actions": [{
                                    "action": "explore",
                                    "title": "Go to the site"
                                }]
                            }
                        })
                    );
                }
            }
            ack({id:msg.id,sent:true});
        });
        client.on('push-sub',(sub)=>{
            console.log(sub);
            if(!userList[client._id]) userList[client._id] = {};
            userList[client._id].pushSub = sub;
        })
        client.on('disconnect', function() {
            console.log('Got disconnect!');
            for(let c in userList){
                if(client == userList[c].socket){
                    userList[c].socket = null;
                    io.emit('users',Object.keys(userList));
                    break;
                }
            }
        });
    });
};


module.exports = loadSockets;
