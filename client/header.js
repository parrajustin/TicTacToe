
/**
 * purpose is to store the status of the navigation animation
 * [0] = status of animation, true if animation is still playing
 * [1] = status of menu, true if menu is open
 * @type {ReactiveVar}
 */
var navigationHolder = new ReactiveVar({0:false,1:false});

Template.header.onRendered( function() {

	/**
	 * initial text change to make sure the navigation menu doesn't go off the header bar
	 */
	if($('.header_container').width() < $('.header_title').width() + $('.header_navigation').width() + 50)
		$('.header_title h5').text("T");

	/**
	 * runs the text change for the header title when the window is too small or too large
	 */
	$(window).resize(function(evt) {
		if($('.header_container').width() < 171+20 + 244+20)
			$('.header_title h5').text("T");
		else 
			$('.header_title h5').text("Massive Triple-T");
	});

	/**
	 * The next two lines purpose is to hide the navigation menu options so that the open button may work
	 */
	$('.navigation_option_container').css('visibility', 'hidden');
	$('.navigation_extender').css('right', "-"+($('.navigation_option_container').width()+10)+"px");
	$('.navigation_option_container')[0].style.opacity = '0';
});

Template.header.events({
	/**
	 * Handels the event for clicking the shortcut inside the navigation pullout
	 * @return {[type]} [description]
	 */
	'click .nav_shortcuts': function () {

	},

	/**
	 * When navigation extender has been clicked
	 * Main purpose is to operate the navigation option animation
	 */
    'click .navigation_extender': function() {
    	if( navigationHolder.get()[0] )
    		return;

    	if( !navigationHolder.get()[1] ) {
    		navigationHolder.set({0:true,1:false});

			$('.navigation_option_container').css('visibility', 'visible');
	        $('.navigation_extender').animate({right: "0px"}, 400);
			$('.navigation_extender h6').text("Close >");
	        $('.navigation_option_container').animate({opacity: "100"}, 800, function () {
	           	navigationHolder.set({0:false,1:true});
	        });
	    } else {
    		navigationHolder.set({0:true,1:true});
	        $('.navigation_extender').animate({right: "-"+($('.navigation_option_container').width()+10)+"px"}, 400);
			$('.navigation_extender h6').text("< Open");
	        $('.navigation_option_container').animate({opacity: "0"}, 800, function () {
				$('.navigation_option_container').css('visibility', 'hidden');
	           	navigationHolder.set({0:false,1:false});
	        });
	    }
    }
});

//49.3125 10 104.938