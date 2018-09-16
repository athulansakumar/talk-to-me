module.exports = {
    dev:{
        authBaseUrl:'http://localhost:8081',
        webBaseUrl:'http://localhost:8080'
    },
    production:{
        authBaseUrl:'https://talk-to-me-messenger-auth.herokuapp.com',
        webBaseUrl:'https://talk-to-me-messenger.herokuapp.com'
    },
    jwtSecret: '$2b$04$V6jOXcDoWXUHKqNgzanR/O',
    vapid:{
        email:'mailto:athul.ansakumar@gmail.com',
        public:"BBSRewFnUapsBoOax_-i0xi9hAhBU0PoF3ehhvZZutA3N2mNxx1emTlLjMchh0zF-n8-_Sk95EpD9o4amRcTHWA",
        private:"3ClggSA7wVqhE42LrJtig8UF8xSO6V5jxQOy5ZFvPS0"
    }
};
