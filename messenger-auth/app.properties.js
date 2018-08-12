module.exports = {
    dev:{
        authBaseUrl:'http://localhost:8081',
        webBaseUrl:'http://localhost:8080',
        dbUrl: 'mongodb://localhost:27017/MessengerAuth'
    },
    production:{
        authBaseUrl:'https://talk-to-me-messenger-auth.herokuapp.com',
        webBaseUrl:'https://talk-to-me-messenger.herokuapp.com',
        dbUrl: ''
    },
    jwtSecret: '$2b$04$V6jOXcDoWXUHKqNgzanR/O'
};
