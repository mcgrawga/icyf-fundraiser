// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .


var go;
go = function() {
	$('#new_player').submit(function(event) {
		console.log("submit");
		console.log("pathname  " + window.location.pathname);
		// Devise names the forms for different things the same name.
		// We only want to do this when creating a new user, not recovering a password
		// or something else.
		if (window.location.pathname == '/players/sign_up')
		{
			// Disable the submit button to prevent repeated clicks:
			$(this).find('.submit').prop('disabled', true);

			// Request a token from Stripe:
			Stripe.card.createToken($(this), stripeResponseHandler);

			// Prevent the form from being submitted:
			return false;
		}
	});

	function stripeResponseHandler(status, response) {
		// Grab the form:
		var $form = $('#new_player');

		if (response.error) { // Problem!
			// Show the errors on the form:
			$form.find('.payment-errors').text(response.error.message);
			$form.find('.submit').prop('disabled', false); // Re-enable submission

		} else { // Token was created!
			console.log("no error");
			// Get the token ID:
			var token = response.id;

			// Insert the token ID into the form so it gets submitted to the server:
			$form.append($('<input type="hidden" name="stripeToken">').val(token));

			// Submit the form:
			$form.get(0).submit();
			console.log("submitted");
		}
	}
}

//$(document).on('turbolinks:load', ready);
$(document).ready(go);
$(document).on('page:load', go)