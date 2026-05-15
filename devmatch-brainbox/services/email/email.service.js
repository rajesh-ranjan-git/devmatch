import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";
import {
  CLIENT_URL,
  AWS_EMAIL_FROM,
  AWS_EMAIL_TO,
  AWS_SES_REGION,
  AWS_SES_ACCESS_KEY_ID,
  AWS_SES_SECRET_ACCESS_KEY,
} from "../../constants/env.constants.js";
import { appConfig } from "../../config/common.config.js";
import { httpStatusConfig } from "../../config/http.config.js";
import AppError from "../../services/error/error.service.js";
import {
  accountLockedEmail,
  passwordResetConfirmationEmail,
  passwordResetEmail,
  verificationEmail,
  welcomeEmail,
} from "./email.templates.js";

class EmailService {
  constructor() {
    this.client = new SESClient({
      region: AWS_SES_REGION,
      credentials: {
        accessKeyId: AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: AWS_SES_SECRET_ACCESS_KEY,
      },
    });
  }

  normalizeRecipients(recipients) {
    if (Array.isArray(recipients)) {
      return recipients.map((recipient) => recipient?.trim()).filter(Boolean);
    }

    return recipients
      ?.split(",")
      .map((recipient) => recipient.trim())
      .filter(Boolean);
  }

  isLocalAccount(recipients) {
    return this.normalizeRecipients(recipients)?.some(
      (recipient) =>
        recipient.endsWith("@server.com") ||
        recipient.endsWith("@devmatch.com"),
    );
  }

  getRecipients(to) {
    return this.normalizeRecipients(AWS_EMAIL_TO || to);
  }

  async send({ to, subject, template }) {
    try {
      logger.debug("debugging from send");
      logger.info("debug to:", to);
      logger.info("debug subject:", subject);
      logger.info("debug CLIENT_URL:", CLIENT_URL);
      logger.info("debug template:", template);

      if (this.isLocalAccount(to)) {
        throw new AppError({
          message: "Email Service is not available for local accounts!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      const recipients = this.getRecipients(to);

      logger.info("debug recipients:", recipients);

      if (!AWS_EMAIL_FROM || !recipients?.length) {
        throw new AppError({
          message: "Email Service is not configured!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      const html = await render(template);
      logger.info("debug html:", html);

      const text = await render(template, { plainText: true });
      logger.info("debug text:", text);

      const command = new SendEmailCommand({
        Source: AWS_EMAIL_FROM,
        Destination: {
          ToAddresses: recipients,
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: html,
              Charset: "UTF-8",
            },
            Text: {
              Data: text,
              Charset: "UTF-8",
            },
          },
        },
      });
      logger.info("debug command:", command);

      return await this.client.send(command);
    } catch (error) {
      logger.error("[EmailService] Failed to send email:", error);
      return null;
    }
  }

  async sendVerificationEmail(to, token) {
    try {
      if (to.endsWith("@server.com") | to.endsWith("@devmatch.com")) {
        throw new AppError({
          message: "Email Service is not available for local accounts!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      const verificationUrl = `${CLIENT_URL}/verify-email?token=${token}`;

      await this.send({
        to,
        subject: `Verify your email - ${appConfig.name}`,
        template: verificationEmail({
          appName: appConfig.name,
          verificationUrl,
        }),
      });
    } catch (error) {
      logger.error("[EmailService] Failed to send email:", error);
      return null;
    }
  }

  async sendPasswordResetEmail(to, token) {
    try {
      logger.debug("debugging from sendPasswordResetConfirmationEmail");
      logger.info("debug to:", to);
      logger.info("debug AWS_SES_REGION:", AWS_SES_REGION);
      logger.info("debug CLIENT_URL:", CLIENT_URL);
      logger.info("debug AWS_EMAIL_FROM:", AWS_EMAIL_FROM);
      logger.info("debug AWS_EMAIL_TO:", AWS_EMAIL_TO);

      if (to.endsWith("@server.com") | to.endsWith("@devmatch.com")) {
        throw new AppError({
          message: "Email Service is not available for local accounts!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      const resetUrl = `${CLIENT_URL}/reset-password?token=${token}`;

      await this.send({
        to,
        subject: `Reset your password - ${appConfig.name}`,
        template: passwordResetEmail({
          appName: appConfig.name,
          resetUrl,
        }),
      });

      logger.info("debug after send");
    } catch (error) {
      logger.info("debug in catch with error");
      logger.error("[EmailService] Failed to send email:", error);
      return null;
    }
  }

  async sendPasswordResetConfirmationEmail(to) {
    try {
      if (to.endsWith("@server.com") | to.endsWith("@devmatch.com")) {
        throw new AppError({
          message: "Email Service is not available for local accounts!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      await this.send({
        to,
        subject: `Your password has been reset - ${appConfig.name}`,
        template: passwordResetConfirmationEmail({
          appName: appConfig.name,
          resetPasswordUrl: `${CLIENT_URL}/forgot-password`,
        }),
      });
    } catch (error) {
      logger.error("[EmailService] Failed to send email:", error);
      return null;
    }
  }

  async sendWelcomeEmail(to, userName) {
    try {
      if (to.endsWith("@server.com") | to.endsWith("@devmatch.com")) {
        throw new AppError({
          message: "Email Service is not available for local accounts!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      await this.send({
        to,
        subject: `Welcome to ${appConfig.name}!`,
        template: welcomeEmail({
          appName: appConfig.name,
          profileUrl: `${CLIENT_URL}/profile`,
          userName,
        }),
      });
    } catch (error) {
      logger.error("[EmailService] Failed to send email:", error);
      return null;
    }
  }

  async sendAccountLockedEmail(to) {
    try {
      if (to.endsWith("@server.com") | to.endsWith("@devmatch.com")) {
        throw new AppError({
          message: "Email Service is not available for local accounts!",
          code: "EMAIL SERVICE FAILED",
          statusCode: httpStatusConfig.serviceUnavailable.statusCode,
        });
      }

      await this.send({
        to,
        subject: `Your account has been temporarily locked - ${appConfig.name}`,
        template: accountLockedEmail({
          appName: appConfig.name,
          resetPasswordUrl: `${CLIENT_URL}/forgot-password`,
        }),
      });
    } catch (error) {
      logger.error("[EmailService] Failed to send email:", error);
      return null;
    }
  }
}

export const emailService = new EmailService();
