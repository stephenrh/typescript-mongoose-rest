import * as mail from 'nodemailer'
import { EMAILCONFIG } from '../config/email.config'
export class EmailService {
    public static send(template: string, subject: string, recp: string[]) {
        console.log("Sending Email", template);
         var trans = mail.createTransport({
            service: 'gmail',
            auth: {
                user: EMAILCONFIG.user,
                pass: EMAILCONFIG.pass
            }
        })
        var mailOptions: mail.SendMailOptions = {
            from: EMAILCONFIG.from,
            to: recp,
            subject: subject,
            html: template
        }
        trans.sendMail(mailOptions, (err, info) => {
            console.log(info);
        })
    }
}