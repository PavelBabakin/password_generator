const crypto = require ("crypto");

const createPass = async function (data) {
    let hash = '';
    if(data.p) {
        hash = crypto.createHash('md5').update(data.p).digest("hex");
    }

    return hash;
}

module.exports = {
    createPass
};