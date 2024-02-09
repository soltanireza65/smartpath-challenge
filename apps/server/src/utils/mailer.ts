import { MAILER_HOST, MAILER_PASS, MAILER_PORT, MAILER_SECURE, MAILER_USER } from '@/config'
import { server } from '@/main';
import { SendMailOptions, createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer'


const transporter = createTransport({
    host: MAILER_HOST,
    port: +MAILER_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: MAILER_USER, // generated ethereal user
        pass: MAILER_PASS, // generated ethereal password
    },
});

export class Mailer {

    public static async sendEmail(payload: SendMailOptions) {
        // const testAccount = await createTestAcc();
        // console.log("🚀 ~ Mailer ~ sendEmail ~ testAccount:", testAccount)

        transporter.sendMail(payload, (err, info) => {
            if (err) {
                server.log.error("🚀 ~ Mailer::sendMail ~ err:", err)
                return;
            }
            server.log.info("===============================================================")
            server.log.info("Preview URL: %s", getTestMessageUrl(info))
            server.log.info("===============================================================")
            // console.log("🚀 ~ Mailer::sendMail preview LINK ========================>", getTestMessageUrl(info))
        })
    }
}