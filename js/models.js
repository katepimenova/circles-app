import Backbone from 'backbone';

var models = {};

models.Round = Backbone.Model.extend({
  constructorName: 'Round',
  urlRoot: '/api/round'
});

models.Rounds = Backbone.Collection.extend({
  constructorName: 'Rounds',
  model: models.Round,
  url: '/api/rounds'
});

export default models;