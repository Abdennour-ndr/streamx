const cron = require('node-cron');
const AIAutomation = require('./ai-automation');
const config = require('../automation.config.json');

class AutomationRunner {
  constructor() {
    this.ai = new AIAutomation();
    this.setupCronJobs();
  }

  setupCronJobs() {
    // مراجعة الكود كل 6 ساعات
    cron.schedule('0 */6 * * *', async () => {
      console.log('🤖 بدء مراجعة الكود...');
      await this.ai.runCodeReview();
    });

    // فحص الأمان يومياً
    cron.schedule('0 0 * * *', async () => {
      console.log('🔒 بدء فحص الأمان...');
      await this.ai.runSecurityScan();
    });

    // المهام التسويقية كل 4 ساعات
    cron.schedule('0 */4 * * *', async () => {
      console.log('📢 بدء المهام التسويقية...');
      await this.ai.handleMarketing();
    });

    // مراقبة الأداء كل ساعة
    cron.schedule('0 * * * *', async () => {
      console.log('📊 مراقبة الأداء...');
      await this.ai.monitorPerformance();
    });

    // التقارير اليومية
    cron.schedule('0 0 * * *', async () => {
      console.log('📄 إنشاء التقرير اليومي...');
      await this.ai.generateReport('Daily');
    });

    // التقارير الأسبوعية
    cron.schedule('0 0 * * 1', async () => {
      console.log('📄 إنشاء التقرير الأسبوعي...');
      await this.ai.generateReport('Weekly');
    });

    // التقارير الشهرية
    cron.schedule('0 0 1 * *', async () => {
      console.log('📄 إنشاء التقرير الشهري...');
      await this.ai.generateReport('Monthly');
    });
  }

  async start() {
    console.log('🚀 بدء نظام الأتمتة...');
    
    // تشغيل المهام الأولية
    await Promise.all([
      this.ai.runCodeReview(),
      this.ai.runSecurityScan(),
      this.ai.handleMarketing(),
      this.ai.monitorPerformance(),
      this.ai.generateReport('Initial')
    ]);

    console.log('✅ تم بدء جميع المهام بنجاح!');
  }
}

// تشغيل النظام
const runner = new AutomationRunner();
runner.start().catch(console.error); 