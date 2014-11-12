exports.index = function(req, res, next) {
  var User = req.app.models.user;

  User.findOne({ id: 1 }).exec(function(err, user) {
    res.send('Have a user: ' + user.name + ' - ' + user.breed);
  });
};
