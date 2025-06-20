/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shaikfarhat79@gmail.com',
      pass: 'logfhjbomczyjsjm',
    },
  });

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const resetLink = `https://mawosfs-anonymous-8081.exp.direct/reset-password?token=${token}`;
    const mailOptions = {
      from: `"Mydent" <shaikfarhat79@gmail.com>`,
      to: email,
      subject: 'Password Reset - Mydent',
      html: `
        <p>Hi,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
