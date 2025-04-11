const { CloudflareClient } = require('../../utils/cloudflare');
const { DatabaseClient } = require('../../utils/database');
const { StorageClient } = require('../../utils/storage');

class MonitoringService {
  constructor(config) {
    this.config = config;
    this.cloudflare = new CloudflareClient();
    this.database = new DatabaseClient();
    this.storage = new StorageClient();
    this.metrics = new Map();
    this.intervals = new Set();
  }

  async startMetricsCollection() {
    console.log('📊 Starting metrics collection...');
    
    // جمع مقاييس الأداء
    const interval = setInterval(async () => {
      try {
        const metrics = await this.collectPerformanceMetrics();
        this.metrics.set('performance', metrics);
        
        // التحقق من تجاوز العتبات
        await this.checkThresholds(metrics);
      } catch (error) {
        console.error('Error collecting performance metrics:', error);
      }
    }, this.config.performance.interval_minutes * 60 * 1000);
    
    this.intervals.add(interval);
  }

  async startSecurityScans() {
    console.log('🔒 Starting security scans...');
    
    const interval = setInterval(async () => {
      try {
        const securityReport = await this.performSecurityScan();
        this.metrics.set('security', securityReport);
        
        // التحقق من التنبيهات الأمنية
        await this.checkSecurityAlerts(securityReport);
      } catch (error) {
        console.error('Error performing security scan:', error);
      }
    }, this.config.security.scan_interval_hours * 60 * 60 * 1000);
    
    this.intervals.add(interval);
  }

  async setupBackups() {
    console.log('💾 Setting up backup system...');
    
    // جدولة النسخ الاحتياطية
    const interval = setInterval(async () => {
      try {
        await this.performBackup();
      } catch (error) {
        console.error('Error performing backup:', error);
      }
    }, 24 * 60 * 60 * 1000); // يومياً
    
    this.intervals.add(interval);
  }

  async collectPerformanceMetrics() {
    const metrics = {
      timestamp: new Date().toISOString(),
      cpu: await this.getCPUUsage(),
      memory: await this.getMemoryUsage(),
      latency: await this.getLatencyMetrics(),
      errors: await this.getErrorMetrics(),
      requests: await this.getRequestMetrics()
    };

    return metrics;
  }

  async getCPUUsage() {
    // جمع استخدام المعالج من Cloudflare Workers
    const stats = await this.cloudflare.getWorkerMetrics('cpu');
    return stats;
  }

  async getMemoryUsage() {
    // جمع استخدام الذاكرة من Cloudflare Workers
    const stats = await this.cloudflare.getWorkerMetrics('memory');
    return stats;
  }

  async getLatencyMetrics() {
    // قياس زمن الاستجابة للطلبات
    const stats = await this.cloudflare.getLatencyStats();
    return stats;
  }

  async getErrorMetrics() {
    // جمع إحصائيات الأخطاء
    const stats = await this.cloudflare.getErrorStats();
    return stats;
  }

  async getRequestMetrics() {
    // جمع إحصائيات الطلبات
    const stats = await this.cloudflare.getRequestStats();
    return stats;
  }

  async checkThresholds(metrics) {
    const thresholds = this.config.performance.thresholds;
    
    if (metrics.cpu > thresholds.cpu_usage) {
      await this.triggerAlert('performance', 'high_cpu_usage', metrics.cpu);
    }
    
    if (metrics.memory > thresholds.memory_usage) {
      await this.triggerAlert('performance', 'high_memory_usage', metrics.memory);
    }
    
    if (metrics.latency > thresholds.latency_ms) {
      await this.triggerAlert('performance', 'high_latency', metrics.latency);
    }
    
    if (metrics.errors.rate > thresholds.error_rate) {
      await this.triggerAlert('performance', 'high_error_rate', metrics.errors.rate);
    }
  }

  async performSecurityScan() {
    const securityReport = {
      timestamp: new Date().toISOString(),
      unauthorized_access: await this.checkUnauthorizedAccess(),
      suspicious_activity: await this.checkSuspiciousActivity(),
      data_breach: await this.checkDataBreach()
    };

    return securityReport;
  }

  async checkSecurityAlerts(report) {
    for (const [type, status] of Object.entries(report)) {
      if (status.detected) {
        await this.triggerAlert('security', type, status);
      }
    }
  }

  async performBackup() {
    console.log('📦 Starting backup process...');
    
    try {
      // نسخ احتياطي لقاعدة البيانات
      const dbBackup = await this.database.backup();
      
      // نسخ احتياطي للملفات
      const storageBackup = await this.storage.backup();
      
      // التحقق من سلامة النسخ الاحتياطية
      if (this.config.backups.verify_integrity) {
        await this.verifyBackup(dbBackup);
        await this.verifyBackup(storageBackup);
      }
      
      // حذف النسخ الاحتياطية القديمة
      await this.cleanupOldBackups();
      
      console.log('✅ Backup completed successfully');
    } catch (error) {
      console.error('❌ Backup failed:', error);
      await this.triggerAlert('backup', 'backup_failed', error);
    }
  }

  async triggerAlert(category, type, data) {
    const alert = {
      category,
      type,
      data,
      timestamp: new Date().toISOString()
    };

    // إرسال التنبيه إلى نظام المعالجة
    this.emit('alert', alert);
  }

  async getMetrics(timeframe) {
    const metrics = {};
    
    for (const [key, value] of this.metrics) {
      metrics[key] = await this.aggregateMetrics(value, timeframe);
    }
    
    return metrics;
  }

  async aggregateMetrics(metrics, timeframe) {
    // تجميع وتحليل المقاييس حسب الإطار الزمني
    switch (timeframe) {
      case 'daily':
        return this.aggregateDaily(metrics);
      case 'weekly':
        return this.aggregateWeekly(metrics);
      case 'monthly':
        return this.aggregateMonthly(metrics);
      default:
        return metrics;
    }
  }

  async stop() {
    console.log('⏹️ Stopping monitoring service...');
    
    // إيقاف جميع الفواصل الزمنية
    for (const interval of this.intervals) {
      clearInterval(interval);
    }
    
    this.intervals.clear();
    console.log('✅ Monitoring service stopped');
  }
}

module.exports = MonitoringService;