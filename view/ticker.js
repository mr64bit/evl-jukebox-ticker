'use strict'
$(function() {
	nodecg.listenFor('jukebox_data', refreshJukebox);
	nodecg.listenFor('jukebox_in', showJukebox);
	nodecg.listenFor('jukebox_out', function (data) {
		hideJukebox();

	});

 	$.ionSound({
        	sounds: [           // set needed sounds names
            	'lowerthird_in',
            	'lowerthird_out'
        	],
       		 path: 'snd/',       // set path to sounds
       		 multiPlay: true,    // can play multiple sounds at once
        	 volume: '0.15'      // not so loud please
    		});

	function showJukebox(data) {
            var tl = new TimelineLite({paused: true});

            //add our tweens to the timeline
            tl.to($('#ticker-heading'), 0.5, {left: '0px'}, '0');
            tl.to($('#matchid'), 0.6, {left: '0px', ease: Quad.easeOut}, '0.5');
            tl.to($('#shape'), 0.5, {left: '-70px', ease: Quad.easeOut}, '0');
           // tl.to($('#lowerthirdtextcontainer'), 0.6, {left: '0%', ease: Quad.easeOut}, '0.025');
	     $.ionSound.play('lowerthird_in');
            tl.play();





		updateJson();

	
	}
	
	function hideJukebox() {
	
	    var t2 = new TimelineLite({paused: true});
            t2.to($('#ticker-heading'), 0.5, {left: '-190px'}, '0.5');
            t2.to($('#matchid'), 0.6, {left: '-450px', ease: Quad.easeOut}, '0');
            t2.to($('#shape'), 0.5, {left: '-100px', ease: Quad.easeOut}, '0.6');
	    $.ionSound.play('lowerthird_out');
  	    t2.play();


	}

	function refreshJukebox() {
	
	updateJson();
	
	}

	function updateJson(data) {
                var entries = [];
                var myJSON = "http://dal4.evlbr.com:3000/events";
		$("#matchid").empty();
                //$("#matchid").hide();

                        $.getJSON( myJSON, function(data) {
                                $.each(data, function(key, value) {
                                //      console.log(key, value);
                                        var eventType = value.event_type;

                                        if (eventType != "server_ready") {

                                                var team1 = value.winning_team.tag;
                                                var team2 = value.losing_team.tag;
                                                var score1 = value.winning_team_score;
                                                var score2 = value.losing_team_score;
                                                var map = value.match_map.map;
                                                var state = value.match_map.state;
						
						if (state == 'pregame' || 'playing') {
							state =  'In Progress'; }
						if (state == 'golden_cap') {
							state = 'OT';}
						if (state == 'postgame' || 'ended') {
							state = 'Final'; }
                                        //var matchBlock = "<div class='team-names'>" +  value.losing_team.tag  + "vs" + value.winning_team.tag +  "</div>"

                                                var matchBlock = "<div class='match-info'> <div class='map-state'>" + state.toUpperCase() + "</div>"
                                                                + " <div class='team-names'>" + team1  + " vs " + team2 + "</div>"
                                                                + "<div class='team-scores'>" + score1 + " to " + score2 + "</div>"
                                                                + "<div class='map-info'>" + map + "</div>"
                                                                + "</div>"


                                                                $(matchBlock).appendTo("#matchid ").hide();
                //           $(matchBlock).appendTo("#matchid ");
                                        }

                                 });
                        tick();

                        $("#matchid").show();



                        });



	}

});
function tick() {
    var $obj = $("#container #matchid .match-info");
    $obj.first().fadeIn().delay(5000).fadeOut(function () {
        $obj.first().insertAfter($obj.last());
        
	tick();
    });
}
tick();

