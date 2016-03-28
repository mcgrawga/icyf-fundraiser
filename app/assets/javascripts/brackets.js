  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-12551082-6', 'auto');
  ga('send', 'pageview');

function prep_bracket(){
	$( '.team_name, .team_name_rs, .nat_champ_team' ).contextmenu(function() {
	  	$(this).text('');
	  	var currentHiddenFieldTag = getHiddenFieldTag($(this).attr('id'));
	  	$("#" + currentHiddenFieldTag).val('');
	  	return false;
	});
		
    $('.team_name').click(function(){
			var title = $(document).attr('title');
			if (title != 'College Basketball Tournament Pool - View Bracket' && title != 'NCAA Tournament Pool - View Master Bracket')
		  {	
							var currentHiddenFieldTag = getHiddenFieldTag($(this).attr('id'));
							var nextSpanTag = getNextSpanTag($(this).attr('id'));
							var nextHiddenFieldTag = getHiddenFieldTag(nextSpanTag);

							//alert($(this).text());
							if ( $(this).text() != $("#" + nextSpanTag).text() )
								clearPicks(nextSpanTag, 8); 

							$("#" + nextSpanTag).text($(this).text());
							$("#" + nextHiddenFieldTag).val($("#" + currentHiddenFieldTag).val());
							
							if (nextSpanTag == 'round8_team1')
								$('.nat_champ_team').css({"left":($('.nat_champ_team').parent().width() - $('.nat_champ_team').width()) / 2});
			}
    });

    $('.team_name_rs').click(function(){
			var title = $(document).attr('title');
			//alert(title);
			if (title != 'College Basketball Tournament Pool - View Bracket' && title != 'NCAA Tournament Pool - View Master Bracket')
		  {	
							var currentHiddenFieldTag = getHiddenFieldTag($(this).attr('id'));
							var nextSpanTag = getNextSpanTag($(this).attr('id'));
							var nextHiddenFieldTag = getHiddenFieldTag(nextSpanTag);

							if ( $(this).text() != $("#" + nextSpanTag).text() )
								clearPicks(nextSpanTag, 8); 

							$("#" + nextSpanTag).text($(this).text());
							$("#" + nextHiddenFieldTag).val($("#" + currentHiddenFieldTag).val());
							
							if (nextSpanTag == 'round8_team1')
								$('.nat_champ_team').css({"left":($('.nat_champ_team').parent().width() - $('.nat_champ_team').width()) / 2});
			}
    });


    $('.link_column_1').click(function(){
			var title = $(document).attr('title');
			if (title != 'College Basketball Tournament Pool - View Bracket' && title != 'NCAA Tournament Pool - View Master Bracket')
		  {	
							var currentHiddenFieldTag = getHiddenFieldTag($(this).find('.team_name').attr('id'));
							var nextSpanTag = getNextSpanTag($(this).find('.team_name').attr('id'));
							var nextHiddenFieldTag = getHiddenFieldTag(nextSpanTag);

							//alert($(this).text());
							if ( $(this).find('.team_name').text() != $("#" + nextSpanTag).text() )
								clearPicks(nextSpanTag, 8); 

							$("#" + nextSpanTag).text($(this).find('.team_name').text());
							$("#" + nextHiddenFieldTag).val($("#" + currentHiddenFieldTag).val());
							
							if (nextSpanTag == 'round8_team1')
								$('.nat_champ_team').css({"left":($('.nat_champ_team').parent().width() - $('.nat_champ_team').width()) / 2});
			}
    });

		$('.nat_champ_team').each(function(){
				$(this).css({
      	//"position":"relative",
      	"left":($(this).parent().width() - $(this).width()) / 2
    	});
    });

		//alert("Yo 2");
		$('.nat_champ_text').each(function(){
				$(this).css({
      	//"position":"relative",
      	"left":($(this).parent().width() - $(this).width()) / 2
    	});
    });


	// Strikethrough all the team names that have lost, however far they go in the bracket.
    $('.team_name').each(function(){
    	if ( $(this).hasClass("strikethrough"))
    	{
			var teamName = $(this).text();
			var id = $(this).attr('id');
			var round = id.charAt(5);
			for (var i = round; i <= 8; i++)
			{
				var partialSpanTagID = "round" + i + "_team";
				$('span[id^=' + partialSpanTagID + ']').each(function(){
		   			if ($(this).text() == teamName)
		   				$(this).addClass("strikethrough");		
				});
			}
		}
    });
    $('.team_name_rs').each(function(){
    	if ( $(this).hasClass("strikethrough"))
    	{
			var teamName = $(this).text();
			var id = $(this).attr('id');
			var round = id.charAt(5);
			for (var i = round; i <= 8; i++)
			{
				var partialSpanTagID = "round" + i + "_team";
				$('span[id^=' + partialSpanTagID + ']').each(function(){
		   			if ($(this).text() == teamName)
		   				$(this).addClass("strikethrough");		
				});
			}
		}
    });


		var title = $(document).attr('title');
		if (title == 'NCAA Tournament Pool - View Bracket' || title == 'NCAA Tournament Pool - View Master Bracket'){
			$('.column_format').each(function(){
					$(this).css({'cursor' : 'auto'});
    	});
			$('.column_format_rs').each(function(){
					$(this).css({'cursor' : 'auto'});
    	});
			$('.team_name').each(function(){
					$(this).css({'cursor' : 'auto'});
    	});
		}

};


$(document).ready(prep_bracket);
$(document).on('page:load', prep_bracket)

function clearPicks(spanTag, endRound){
    var roundNum = spanTag.charAt(5);
		var teamName = $("#" + spanTag).text();
   	var nextSpanTag = getNextSpanTag(spanTag);
   	var nextHiddenFieldTag = getHiddenFieldTag(nextSpanTag);

		while (roundNum < endRound){
			if ( teamName == $("#" + nextSpanTag).text()	){
				$("#" + nextSpanTag).text('');
				$("#" + nextHiddenFieldTag).val('');
				roundNum = nextSpanTag.charAt(5);
				nextSpanTag = getNextSpanTag(nextSpanTag);
   			nextHiddenFieldTag = getHiddenFieldTag(nextSpanTag);
			}
			else
				break;
		}
}

function getHiddenFieldTag(spanTag){
    var roundNum, teamNum;
    roundNum = spanTag.charAt(5);
    if (spanTag.length == 13) 
        teamNum = spanTag.slice(11);
    else
        teamNum = spanTag.charAt(11);
		var hiddenFieldTag = "bracket_round" + roundNum + "_team" + teamNum;
		return hiddenFieldTag;
}

function getNextSpanTag(spanTag) {
    var roundNum, nextRoundNum, teamNum, nextTeamNum;
    roundNum = spanTag.charAt(5);
    nextRoundNum = (parseInt(roundNum) + 1);

    if (spanTag.length == 13) 
        teamNum = spanTag.slice(11);
    else
        teamNum = spanTag.charAt(11);

    if (teamNum % 2 == 0)
        nextTeamNum = parseInt(teamNum) / 2;
    else
        nextTeamNum = (parseInt(teamNum) + 1) / 2;

    var nextSpanTag = "round" + nextRoundNum + "_team" + nextTeamNum;
    return nextSpanTag;
}
