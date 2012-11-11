$(function(){
	var log_chat_message = function(message, type){
		var li = $('<li/>').text(message);
		
		if (type === 'system') {
			li.css({'font-weight' : 'bold'});
		}else if (type === 'leave') {
			li.css({'font-weight' : 'bold', 'color' : '#F00'});
		}

		$('#chat_log').append(li);
	};

	var socket = io.connect('http://localhost:3000');

	socket.on('entrance', function(data){
		log_chat_message(data.message, 'system');
	});

	socket.on('exit', function(data){
		log_chat_message(data.message, 'leave');
	});

	socket.on('chat', function(data){
		log_chat_message(data.message, 'normal');
		$("#typing").hide();
	});

	socket.on('typing', function(data){
		$("#typing").show();
	});

	$('#chat_box').keydown(function(event){
		var message = $('#chat_box').val();

		if (event.which == 13) {
			socket.emit('chat', { message: message});
			$('#chat_box').val('');
			$("#typing").hide();
		} else if (event.which == 8 || event.which == 127){
			if (message.length == 1) {
				$("#typing").hide();
			}
		} else if (event.which >= 32 && event.which <= 127) {
			socket.emit('typing');
		}
	});
});