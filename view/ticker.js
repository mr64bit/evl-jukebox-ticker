'use strict;'
$(function() {

	var entries = [];
	var myJSON = "http://dal4.evlbr.com:3000/events";
		
		$("#matchid").hide();

		$.getJSON( myJSON, function(data) {
  		$.each(data, function(key, value) {
      			console.log(key, value);
		var eventType = value.event_type;

		if (eventType != "server_ready") {

		var team1 = value.winning_team.tag;
		var team2 = value.losing_team.tag;
		var score1 = value.winning_team_score;
		var score2 = value.losing_team_score;
		var map = value.match_map.map;
		var state = value.match_map.state;		

		//var matchBlock = "<div class='team-names'>" +  value.losing_team.tag  + "vs" + value.winning_team.tag +  "</div>"
	
		var matchBlock = "<div class='match-info'> <div class='team-names'>" + team1  + " vs " + team2 + "</div>"
				+ "<div class='team-scores'>" + score1 + " to " + score2 + "</div>" 
				+ "<div class='map-info'>" + "Map: " + map + "</div>"
				+ "<div class='map-state'>" + state + "</div>"
				+ "</div>"


      			$(matchBlock).appendTo("#matchid ").hide();

		}
 
		 });
 

tick();

 $("#matchid").show();

	

		});

});
function tick() {
    var $obj = $("#container #matchid .match-info");
    $obj.first().fadeIn().delay(1000).fadeOut(function () {
        $obj.first().insertAfter($obj.last());
        
	tick();
    });
}
tick();

