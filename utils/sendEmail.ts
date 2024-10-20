import nodemailer from "nodemailer";

export async function sendEmail({
    to,
    name,
    subject,
    body,
}: {
    to: string;
    name: string;
    subject: string;
    body: string;
}) {
    const {SMTP_PASSWORD, SMTP_EMAIL} = process.env;

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    try {
        const testResult = await transport.verify();
        console.log({testResult});
    } catch (error) {
        return {
            error: error instanceof Error && error.message,
            status: "error",
        };
    }

    try {
        const sendResult = await transport.sendMail({
            from: `Benji <${SMTP_EMAIL}>`,
            to,
            subject,
            text: `Hey ${name}, how ya doin?`,
            html: body,
        });

        return {
            result: sendResult,
            status: "success",
        };

        console.log({sendResult});
    } catch (error) {
        return {
            error: error instanceof Error && error.message,
            status: "error",
        };
    }
}
