import nodemailer from "nodemailer";

export async function sendEmail({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) {
    const {SMTP_PASSWORD, SMTP_ORDER_EMAIL} = process.env;

    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        auth: {
            user: SMTP_ORDER_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    try {
        const sendResult = await transport.sendMail({
            from: `Benji Bakes <${SMTP_ORDER_EMAIL}>`,
            to,
            subject,
            html: body,
        });

        return {
            result: sendResult,
            status: "success",
        };
    } catch (error) {
        return {
            error: error instanceof Error && error.message,
            status: "error",
        };
    }
}
