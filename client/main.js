import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './header.html';
import './header.js';

//
//reactive Variable
//  currentView :    Where they are on the interface
//  gameID      :    The Current game the user is in
//  playerID    :    The current playerID for said game
//  token       :    The Encrypted string used to identify this user by way of cookie
//  string      :    The encrypted string used to varify this user by way of account
//  userName    :    The username of this user
//  options     :    the options you set inside the settings for peoples colors and such
//  bufferSquare:    The variable that keeps track of where you have last clicked but haven't submited the move
var currentView = new ReactiveVar(undefined);
var gameID = new ReactiveVar(undefined);
var playerID = new ReactiveVar(undefined);
var token = new ReactiveVar(undefined);
var string = new ReactiveVar(undefined);
var userName = new ReactiveVar(undefined);
var options = new ReactiveVar(undefined);
var bufferSquare = new ReactiveVar('');
var slideTemp = new ReactiveVar('0');
var gameCollection = new ReactiveVar(undefined);

Router.route('/', function() {
    // render the Home template with a custom data context
    this.render('platform');
    // currentView.set("home");
    currentView.set("createGame");

});

Template.platform.helpers({
    whichView: function() {
        return currentView.get();
    }
});

Template.platform.onRendered( function() {

	/**
	 * Will keep Body container the height of the winow
	 * NOTE: Could be combined with header window resize function
	 */
	$('.container').css('height', $(window).height()-39);
	$(window).resize(function(evt) {
		$('.container').css('height', $(window).height()-39);
	});
});




 //////////////////////////////////
//  _   _                       //
// | | | | ___  _ __ ___   ___  //
// | |_| |/ _ \| '_ ` _ \ / _ \ //
// |  _  | (_) | | | | | |  __/ //
// |_| |_|\___/|_| |_| |_|\___| //
 //////////////////////////////////

/**
 * Contains user account panel information
 * where [0] = {acc} if the panel animation is done
 * where [1] = {chat} if the panel animation is done
 * @type {Object}
 */
var isOpenPanel = {0:true,1:true};

Template.home.events({
	/**
	 * Account panel Events
	 */
	'click .acc_icon_circle_up' : function() {
		if( isOpenPanel[0] ) {
			isOpenPanel = {0:false,1:isOpenPanel[1]};
			$('.account_container .acc_icon_circle_up').css('visibility', 'hidden');
			$('.account_container .acc_icon_circle_down').css('visibility', 'visible');
			$('.account_container .body').css('visibility', 'hidden');
			$('.account_container').animate({height: $('.account_container .header').height()}, 800, function() {
				isOpenPanel= {0:true,1:isOpenPanel[1]};
			});
		}
	},
	'click .acc_icon_circle_down' : function() {
		if( isOpenPanel[0] ) {
			isOpenPanel = {0:false,1:isOpenPanel[1]};
			$('.account_container .acc_icon_circle_down').css('visibility', 'hidden');
			$('.account_container .body').css('visibility', 'visible');
			$('.account_container .acc_icon_circle_up').css('visibility', 'visible');
			$('.account_container').animate({height: $('.account_container .body').height() + $('.account_container .header').height()}, 800, function() {
				isOpenPanel = {0:true,1:isOpenPanel[1]};
			});
		}
	},
	'click .chat_icon_circle_up' : function() {
		if( isOpenPanel[1] ) {
			isOpenPanel = {0:isOpenPanel[0],1:false};
			$('.chat_container .chat_icon_circle_up').css('visibility', 'hidden');
			$('.chat_container .chat_icon_circle_down').css('visibility', 'visible');
			$('.chat_container .body').css('visibility', 'hidden');

			$('.chat_container').animate({height: $('.chat_container .header').height()}, 800, function() {
				isOpenPanel = {0:isOpenPanel[0],1:true};
			});
		}
	},
	'click .chat_icon_circle_down' : function() {
		if( isOpenPanel[1] ) {
			isOpenPanel = {0:isOpenPanel[0],1:false};
			$('.chat_container .chat_icon_circle_down').css('visibility', 'hidden');
			$('.chat_container .body').css('visibility', 'visible');
			$('.chat_container .chat_icon_circle_up').css('visibility', 'visible');

			$('.chat_container').animate({height: $('.chat_container .body').height() + $('.chat_container .header').height()}, 800, function() {
				isOpenPanel = {0:isOpenPanel[0],1:true};
			});
		}
	},

	/**
	 * Option Panel Events
	 */
	'click .option_container .option_create_game' : function() {
		console.log("worked");
		currentView.set("createGame");
	}
});






////////////////////////////////////
//   ____                _        //
//  / ___|_ __ ___  __ _| |_ ___  //
// | |   | '__/ _ \/ _` | __/ _ \ //
// | |___| | |  __/ (_| | ||  __/ //
//  \____|_|  \___|\__,_|\__\___| //
////////////////////////////////////
Template.createGame.events( {
	'click .return_home' : function () {
		currentView.set("home");
	},
	'click .make_game' : function () {
		var nick = $('.create_game_nick').val();

		if (/\S/.test(nick)) {
			alert("Either enter a nick name or don't enter anything!");
			$('.create_game_nick').val("");
		} else {
			makeGame();
		}
	}
})
