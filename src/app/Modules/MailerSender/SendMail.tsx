import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { Email } from './Mail';
import { render } from '@react-email/render';

export const SendEmail = async (name: string, email: string, message: string) => {
    const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API_KEY || '',
    });

    const sentFrom = new Sender('lapos@aconsulting.sk', "Contact Formular");
    const recipients = [new Recipient('lapos@aconsulting.sk', 'Contact Formular')];
    const emailHtml = render(<Email name={name} email={email} message={message} />);

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject('Contact Form - ' + name)
        .setHtml(emailHtml);

    try {
        const response = await mailerSend.email.send(emailParams);
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
