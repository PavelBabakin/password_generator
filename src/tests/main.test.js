const passService = require('../services/passService');

describe('Password service', () => {

    test('if password present', async () => {
        const password = await passService.createPass({'p': 'pa55w0rd'});
        expect(password).toEqual('97bf34d31a8710e6b1649fd33357f783');
    })

    test('if password not presented', async () => {
        const password = await passService.createPass({'p': ''});
        expect(password).toEqual('');
    })
})