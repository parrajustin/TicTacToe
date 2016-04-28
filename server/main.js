import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Games = new Mongo.Collection("games");

Meteor.startup(() => {
    Games.remove({});
});

// Games.permit(['insert', 'update', 'remove']).never().apply();
// Players.permit(['insert', 'update', 'remove']).never().apply();
// Moves.permit(['insert', 'update', 'remove']).never().apply();
// Chat.permit(['insert', 'update', 'remove']).never().apply();
// Connections.permit(['insert', 'update', 'remove']).never().apply();