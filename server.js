var io = require('socket.io'),
  connect = require('connect');

var app = connect().use(connect.static('public')).listen(3000);
var chatroom = io.listen(app);

chatroom.sockets.on('connection', function(socket){
	socket.sockets.emit('entrance', {
		message: 'A new chatter is online.'
	});
});
