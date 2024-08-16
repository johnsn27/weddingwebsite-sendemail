const { handler } = require('./index.js');

const testEvent = {
    email: 'nathanjohnson036@gmail.com',
    rsvpId: '1234567890'
};

handler(testEvent)
    .then(response => console.log(response))
    .catch(error => console.error(error));
