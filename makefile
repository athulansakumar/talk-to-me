dev :
	cd messenger-auth; nodemon --inspect=9229 server/server.js &
	cd messenger-web; nodemon --inspect=9228 server/server.js &
	cd messenger-web; npm run start-dev
