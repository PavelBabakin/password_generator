function checkPassword(req, res, next) {
    if(req.body.p) {
        return next();
    } else {
        return res.status(400).send(`Password string can't be empty`);
    }
}

module.exports = {
    checkPassword
}