const fs = require('fs');
const path = require('path');
const { CloudflareClient } = require('../utils/cloudflare');
const { MonitoringService } = require('./services/monitoring');
const { AutomationService } = require('./services/automation');
const { NotificationService } = require('./services/notification');
const { AIService } = require('./services/ai');

class CEOAgent {
  constructor() {
    this.config = this.loadConfig();
    this.cloudflare = new CloudflareClient();
    this.monitoring = new MonitoringService(this.config.monitoring);
    this.automation = new AutomationService(this.config.automation);
    this.notification = new NotificationService(this.config.notifications);
    this.ai = new AIService(this.config.ai_capabilities);
  }

  loadConfig() {
    const configPath = path.join(__dirname, 'ceo-agent.config.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  async start() {
    console.log('🤖 StreamX CEO Agent is starting...');
    
    // بدء خدمات المراقبة
    await this.monitoring.startMetricsCollection();
    await this.monitoring.startSecurityScans();
    await this.monitoring.setupBackups();

    // تفعيل الأتمتة الذكية
    this.automation.initializeScaling();
    this.automation.setupOptimization();

    // تهيئة نظام الإشعارات
    this.notification.initialize();

    // تفعيل القدرات الذكية
    await this.ai.startAnomalyDetection();
    await this.ai.enablePredictiveMaintenance();
    await this.ai.optimizeResources();

    // جدولة التقارير
    this.scheduleReports();

    console.log('✅ CEO Agent is now operational');
  }

  async scheduleReports() {
    if (this.config.reporting.daily_summary) {
      this.scheduleDailyReport();
    }
    if (this.config.reporting.weekly_analysis) {
      this.scheduleWeeklyReport();
    }
    if (this.config.reporting.monthly_trends) {
      this.scheduleMonthlyReport();
    }
  }

  async scheduleDailyReport() {
    // تنفيذ في الساعة 00:00 كل يوم
    const report = await this.generateDailyReport();
    await this.notification.sendReport('daily', report);
  }

  async scheduleWeeklyReport() {
    // تنفيذ في يوم الأحد الساعة 00:00
    const report = await this.generateWeeklyReport();
    await this.notification.sendReport('weekly', report);
  }

  async scheduleMonthlyReport() {
    // تنفيذ في اليوم الأول من كل شهر
    const report = await this.generateMonthlyReport();
    await this.notification.sendReport('monthly', report);
  }

  async generateDailyReport() {
    const metrics = await this.monitoring.getMetrics('daily');
    const insights = await this.ai.analyzeMetrics(metrics);
    return {
      timestamp: new Date().toISOString(),
      metrics,
      insights,
      recommendations: await this.ai.generateRecommendations(insights)
    };
  }

  async generateWeeklyReport() {
    const metrics = await this.monitoring.getMetrics('weekly');
    const trends = await this.ai.analyzeTrends(metrics);
    return {
      timestamp: new Date().toISOString(),
      metrics,
      trends,
      performance_analysis: await this.ai.analyzePerformance(metrics)
    };
  }

  async generateMonthlyReport() {
    const metrics = await this.monitoring.getMetrics('monthly');
    const analysis = await this.ai.performDeepAnalysis(metrics);
    return {
      timestamp: new Date().toISOString(),
      metrics,
      analysis,
      strategic_recommendations: await this.ai.generateStrategicPlan(analysis)
    };
  }

  async handleAlert(alert) {
    console.log(`🚨 Alert received: ${alert.type}`);
    
    // تحليل الحالة باستخدام الذكاء الاصطناعي
    const analysis = await this.ai.analyzeAlert(alert);
    
    // اتخاذ إجراء تلقائي إذا كان ممكناً
    if (analysis.canAutoResolve) {
      await this.automation.resolveIssue(alert, analysis.resolution);
    }
    
    // إرسال إشعار بناءً على مستوى الخطورة
    await this.notification.sendAlert({
      ...alert,
      analysis,
      timestamp: new Date().toISOString()
    });
  }

  async shutdown() {
    console.log('🛑 Gracefully shutting down CEO Agent...');
    await this.monitoring.stop();
    await this.automation.stop();
    await this.notification.stop();
    await this.ai.stop();
    console.log('👋 CEO Agent shutdown complete');
  }
}

// تصدير الوكيل للاستخدام في النظام
module.exports = CEOAgent;

// إذا تم تشغيل الملف مباشرة
if (require.main === module) {
  const agent = new CEOAgent();
  agent.start().catch(console.error);

  // التعامل مع إشارات إيقاف التشغيل
  process.on('SIGTERM', () => agent.shutdown());
  process.on('SIGINT', () => agent.shutdown());
}