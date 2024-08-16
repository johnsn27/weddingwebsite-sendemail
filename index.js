const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const ses = new SESClient({ region: 'us-east-1' });

exports.handler = async (event) => {
    const { email, rsvpId } = event;

    const params = {
        Destination: {
            ToAddresses: [email],
        },
        Message: {
            Body: {
                Text: { Data: `Your RSVP ID is: ${rsvpId}` },
            },
            Subject: { Data: 'Your RSVP ID' },
        },
        Source: 'rsvp@mnwedding.co.uk', // Replace with your verified SES email
    };

    try {
        const command = new SendEmailCommand(params);
        await ses.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify('Email sent successfully!'),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Failed to send email.'),
        };
    }
};
