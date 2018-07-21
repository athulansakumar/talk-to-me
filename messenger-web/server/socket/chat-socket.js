var userList={};

var loadSockets = (io) => {
    io.on('connection', (client) => {
        // console.log('client connected ..',client);
        client.emit('whoaru',{});
        client.on('identify',(data)=>{
            console.log('user : ',data);
            if(data.userName){
                userList[data.userName] = client;
                io.emit('users',Object.keys(userList));
            }
            client.on('msg',(msg) => {
                if(msg.to && userList[msg.to]){
                    userList[msg.to].emit('msg',msg);
                }
            });
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
