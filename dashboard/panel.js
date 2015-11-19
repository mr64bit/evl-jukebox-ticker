'use strict'

$('#evl-jukebox_in').click(function () {
	nodecg.sendMessage('jukebox_in');
});

$('#evl-jukebox_out').click(function () {
	nodecg.sendMessage('jukebox_out');
});

$('#evl-jukebox_getdata').click(function () {
	nodecg.sendMessage('jukebox_data');
});
