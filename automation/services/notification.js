const nodemailer = require('nodemailer');
const { WebClient } = require('@slack/web-api');
const twilio = require('twilio');

class NotificationService {
  constructor(config) {
    this.config = config;
    this.emailTransporter = null;
    this.slackClient = null;
    this.twilioClient = null;
  }

  initialize() {
    console.log('🔔 Initializing notification service...');
    
    // تهيئة خدمة البريد الإلكتروني
    this.setupEmailTransporter();
    
    // تهيئة خدمة Slack
    this.setupSlackClient();
    
    // تهيئة خدمة الرسائل النصية
    this.setupSMSClient();
  }

  setupEmailTransporter() {
    this.emailTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  setupSlackClient() {
    this.slackClient = new WebClient(process.env.SLACK_TOKEN);
  }

  setupSMSClient() {
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  async sendAlert(alert) {
    console.log(`🚨 Sending alert: ${alert.type}`);
    
    const priority = this.determineAlertPriority(alert);
    const channels = this.config.priorities[priority];
    
    for (const channel of channels) {
      await this.sendNotification(channel, alert);
    }
  }

  determineAlertPriority(alert) {
    switch (alert.category) {
      case 'security':
        return 'critical';
      case 'performance':
        return alert.data > 90 ? 'critical' : 'warning';
      default:
        return 'info';
    }
  }

  async sendNotification(channel, content) {
    try {
      switch (channel) {
        case 'email':
          await this.sendEmail(content);
          break;
        case 'slack':
          await this.sendSlackMessage(content);
          break;
        case 'sms':
          await this.sendSMS(content);
          break;
        default:
          console.error(`Unknown notification channel: ${channel}`);
      }
    } catch (error) {
      console.error(`Failed to send notification via ${channel}:`, error);
    }
  }

  async sendEmail(content) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: this.config.contacts.admin.email,
      subject: `StreamX Alert: ${content.type}`,
      text: this.formatAlertContent(content),
      html: this.formatAlertHtml(content)
    };

    await this.emailTransporter.sendMail(mailOptions);
  }

  async sendSlackMessage(content) {
    await this.slackClient.chat.postMessage({
      channel: this.config.contacts.admin.slack,
      text: this.formatAlertContent(content),
      blocks: this.formatSlackBlocks(content)
    });
  }

  async sendSMS(content) {
    const message = this.formatSMSContent(content);
    
    await this.twilioClient.messages.create({
      body: message,
      to: this.config.contacts.admin.phone,
      from: process.env.TWILIO_PHONE_NUMBER
    });
  }

  formatAlertContent(alert) {
    return `
      Alert Type: ${alert.type}
      Category: ${alert.category}
      Timestamp: ${alert.timestamp}
      Details: ${JSON.stringify(alert.data)}
      ${alert.analysis ? `Analysis: ${alert.analysis.description}` : ''}
    `.trim();
  }

  formatAlertHtml(alert) {
    return `
      <h2>StreamX Alert</h2>
      <p><strong>Type:</strong> ${alert.type}</p>
      <p><strong>Category:</strong> ${alert.category}</p>
      <p><strong>Timestamp:</strong> ${alert.timestamp}</p>
      <p><strong>Details:</strong></p>
      <pre>${JSON.stringify(alert.data, null, 2)}</pre>
      ${alert.analysis ? `<p><strong>Analysis:</strong> ${alert.analysis.description}</p>` : ''}
    `;
  }

  formatSlackBlocks(alert) {
    return [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🚨 StreamX Alert: ${alert.type}`,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Category:*\n${alert.category}`
          },
          {
            type: 'mrkdwn',
            text: `*Timestamp:*\n${alert.timestamp}`
          }
        ]
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Details:*\n\`\`\`${JSON.stringify(alert.data, null, 2)}\`\`\``
        }
      }
    ];
  }

  formatSMSContent(alert) {
    return `StreamX Alert: ${alert.type}\n${alert.category} - ${new Date(alert.timestamp).toLocaleString()}`;
  }

  async sendReport(type, report) {
    console.log(`📊 Sending ${type} report...`);
    
    const formattedReport = this.formatReport(type, report);
    
    // إرسال التقرير عبر البريد الإلكتروني
    await this.sendEmail({
      type: `${type}_report`,
      category: 'report',
      data: formattedReport,
      timestamp: new Date().toISOString()
    });
    
    // إرسال ملخص إلى Slack
    await this.sendSlackMessage({
      type: `${type}_report_summary`,
      category: 'report',
      data: this.formatReportSummary(report),
      timestamp: new Date().toISOString()
    });
  }

  formatReport(type, report) {
    switch (type) {
      case 'daily':
        return this.formatDailyReport(report);
      case 'weekly':
        return this.formatWeeklyReport(report);
      case 'monthly':
        return this.formatMonthlyReport(report);
      default:
        return report;
    }
  }

  formatReportSummary(report) {
    return {
      timestamp: report.timestamp,
      metrics: this.summarizeMetrics(report.metrics),
      highlights: this.getReportHighlights(report)
    };
  }

  summarizeMetrics(metrics) {
    // تلخيص المقاييس الرئيسية
    return Object.entries(metrics).reduce((summary, [key, value]) => {
      summary[key] = typeof value === 'object' ? 
        this.calculateMetricAverage(value) : value;
      return summary;
    }, {});
  }

  calculateMetricAverage(metricData) {
    if (Array.isArray(metricData)) {
      return metricData.reduce((sum, val) => sum + val, 0) / metricData.length;
    }
    return metricData;
  }

  getReportHighlights(report) {
    // استخراج النقاط البارزة من التقرير
    return {
      performance: this.extractPerformanceHighlights(report),
      security: this.extractSecurityHighlights(report),
      recommendations: this.extractTopRecommendations(report)
    };
  }

  async stop() {
    console.log('⏹️ Stopping notification service...');
    // إغلاق اتصالات الخدمة
    if (this.emailTransporter) {
      this.emailTransporter.close();
    }
    console.log('✅ Notification service stopped');
  }
}

module.exports = NotificationService;