var io = require('socket.io'),
  connect = require('connect');

var app = connect().use(connect.static('public')).listen(3000);

// All chatters(sockets) in chatroom
var chatroom = io.listen(app);

chatroom.sockets.on('connection', function(socket){
	// Only individual chatters (sockets) will see this message
	socket.emit('entrance', {
		message: 'Welcome to the chatroom.'
	});

	socket.on('disconnect', function(){
		chatroom.sockets.emit('exit', {
			message: 'A chatter has disconnected.'
		});
	});

	socket.on('chat', function(data){
		chatroom.sockets.emit('chat', {
			message: '#' + data.message
		});
	});

	chatroom.sockets.emit('entrance', {
		message: 'A new chatter is online.'
	});
});
