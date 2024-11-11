"use server";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { Email, EmailResponse } from "../types/email";
dotenv.config(); // Load environment variables from .env file

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail({
  name,
  telephone,
  email,
  message,
}: Email): Promise<EmailResponse> {
  // Verify the connection configuration
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error(
      "Something Went Wrong",
      SMTP_SERVER_USERNAME,
      SMTP_SERVER_PASSWORD,
      error
    );
    return {
      status: 500,
      message: `Błąd, nie udało sie wysłać wiadomości. Spróbuj ponownie później`,
    };
  }
  // Prepare email content
  const sendDateTime = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
  const subject = `Nowa wiadomość z formularza kontaktowego od ${name} z dnia ${sendDateTime}`;
  const html = `Wiadomość od: <b>${name}</b> <br> Data wysłania: <b>${sendDateTime}</b> <br> Telefon: <b>${telephone}</b> <br> Email: <b>${email}</b> <br> Wiadomość:<br>&emsp;<b>${message}</b>`;
  
  // Send email
  const info = await transporter.sendMail({
    from: SMTP_SERVER_USERNAME,
    to: SMTP_SERVER_USERNAME,
    subject: subject,
    html: html,
  });
  console.log("Message Sent", info);
  return { status: 200, message: "Wiadomość wysłana pomyślnie" };
}
