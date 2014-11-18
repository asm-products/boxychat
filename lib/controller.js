// A controller that all others can inherit from

module.exports = {

    actions: {
        // Search
        'get /': function (req, res, next) {
            this.model.find().exec(function (err, modelsFound) {
                if (err) return res.json(500, {err: err});
                res.json(modelsFound);
            });
        },
        // Create
        'post /': function (req, res, next) {
            this.model.create(req.body, function (err, modelCreated) {
                if (err) return res.json(500, {err: err});
                res.json(modelCreated);
            });
        },
        // Read
        'get /:id': function (req, res, next) {
            this.model.findOne({id: req.params.id}, function (err, modelFound) {
                if (err) return res.json(500, {err: err});
                res.json(modelFound);
            });
        },
        // Update
        'put /:id': function (req, res, next) {
            // Don't pass ID to update
            delete req.body.id;

            this.model.update({id: req.params.id}, req.body, function (err, modelUpdated) {
                if (err) return res.json(500, {err: err});
                res.json(modelUpdated);
            });
        },
        // Delete
        'delete /:id': function (req, res, next) {
            this.model.destroy({id: req.params.id}, function (err) {
                if (err) return res.json(500, {err: err});
                res.json({status: 'ok'});
            });
        }
    },

    sockets: {

    }
};


