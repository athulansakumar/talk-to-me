dev :
	nohup mongod --dbpath=/var/mongodb &
	sleep 5
	cd messenger-auth; nodemon --inspect=9229 server/server.js &
	cd messenger-web; nodemon --inspect=9228 server/server.js &
	cd messenger-web; npm run start-dev

web:
	cd messenger-web; npm run start-dev

auth:
	nohup mongod --dbpath=/var/mongodb &
	sleep 5
	cd messenger-auth; nodemon --inspect=9229 server/server.js

heroku:
	git subtree push --prefix messenger-web heroku master

heroku-web:
	git subtree push --prefix messenger-web heroku master

heroku-auth:
	git subtree push --prefix messenger-auth heroku-auth master
