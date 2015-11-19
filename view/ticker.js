'use strict'
$(function() {

	nodecg.listenFor('jukebox_in', showJukebox);
	nodecg.listenFor('jukebox_out', function (data) {
		hideJukebox();

	});

	function showJukebox(data) {
            var tl = new TimelineLite({paused: true});

            //add our tweens to the timeline
            tl.to($('#ticker-heading'), 0.5, {left: '5px'}, '0');
            tl.to($('#matchid'), 0.6, {left: '110px', ease: Quad.easeOut}, '0.5');
            tl.to($('#shape'), 0.5, {left: '-60px', ease: Quad.easeOut}, '0');
           // tl.to($('#lowerthirdtextcontainer'), 0.6, {left: '0%', ease: Quad.easeOut}, '0.025');

            tl.play();





updateJson();

	
	}
	
	function hideJukebox() {
	
	    var t2 = new TimelineLite({paused: true});
            t2.to($('#ticker-heading'), 0.5, {left: '-150px'}, '0.5');
            t2.to($('#matchid'), 0.6, {left: '-450px', ease: Quad.easeOut}, '0');
            t2.to($('#shape'), 0.5, {left: '-100px', ease: Quad.easeOut}, '0.6');

  	    t2.play();


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

                                        //var matchBlock = "<div class='team-names'>" +  value.losing_team.tag  + "vs" + value.winning_team.tag +  "</div>"

                                                var matchBlock = "<div class='match-info'> <div class='map-state'>" + state + "</div>"
                                                                + " <div class='team-names'>" + team1  + " vs " + team2 + "</div>"
                                                                + "<div class='team-scores'>" + score1 + " to " + score2 + "</div>"
                                                                + "<div class='map-info'>" + "Map: " + map + "</div>"
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
    $obj.first().fadeIn().delay(1000).fadeOut(function () {
        $obj.first().insertAfter($obj.last());
        
	tick();
    });
}
tick();

