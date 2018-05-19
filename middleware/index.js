const utils = {};

utils.verifyAdmin = (req, res, next) => {
    if (req.session && req.session.user === process.env.USER && req.session.admin)
        return next();
    else
        return res.sendStatus(401);
};

module.exports = utils;