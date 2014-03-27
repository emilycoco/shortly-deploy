var mongoose = require('mongoose');
var crypto = require('crypto');
var Promise = require('bluebird');

var linkSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number
});

linkSchema.pre('save', function(next){
  this.addLink(this, function(){
    next();
  });
});

linkSchema.methods.addLink = function(link, callback){
  var shasum = crypto.createHash('sha1');
  shasum.update(link.url);
  link.code = shasum.digest('hex').slice(0, 5);
  callback();
};


var Link = mongoose.model('Link', linkSchema);

module.exports = Link;


// var db = require('../config');
// var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// module.exports = Link;
