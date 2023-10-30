const { smtp } = require("../config/smtp.js");

async function sendCode(newUser) {

    await smtp.sendMail({
        from: process.env.SMTP_USER, // sender address
        to: newUser.email, // list of receivers
        subject: 'Welcome to Quale!', // Subject line
        text: `Please active your account`, // plain text body
        html: `
        
        <h1>Qual é amigo!</h1>
        <h3>Welcome to the community, ${newUser.username}! Let's get you started!</h3>

        <p>Use the following code to activate your account on your first login.</p>
        <div style='
        margin: 1rem;
        padding: 1rem;
        background-color: orange;
        color: white;
        font-family: calibri;
        border-radius: 0.5rem;
        '>${newUser.activateCode}</div>

        <p>After logging in, you can chat with other members and make friends! ...Maybe ask if they like cheese?  After you log in, consider adding some details in your about me so other members can know everything about you.  Also so we can harvest your data and send it to our web overlords! ...lol just kidding, we wouldn't do that.</p>

        `, // html body
    });

}

module.exports = {

    sendCode,

}