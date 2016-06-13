/* globals $, document */

$(document).ready(function() {
	
	$(".field-search").keypress(function (e) {
		var key = e.which;
		if (key == 13)  // the 'enter' key code
		{
			$(".link-search").trigger("click");
			return false;  
		}
	});
	
	$('.link-search').on("click", function() {
		$.ajax({
			type: 'GET',
			url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=?&search=" + $('.field-search').val(),
			async: false,
			dataType: 'json',
			success: function(data) {
				$(".result-list").html("");
				if (data[1].length > 0) {
					$(".search-result").text("Search result:");
					for (var i = 0; i < data[1].length; i++) {
						$(".result-list").append("<li class='result-item'>" + (i + 1) + ". <a href=" + data[3][i] + " class='result-link' target='_blank'>" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>");
					}
				}
				else {
					$(".search-result").text("Nothing found... Try again.");
				}
			},
			error: function(errorMessage) {
				$(".search-result").text("Service unavailable.").css( "color", "red" );
			}
		});
	});
});