const { CloudflareClient } = require('../../utils/cloudflare');
const { DatabaseClient } = require('../../utils/database');

class AutomationService {
  constructor(config) {
    this.config = config;
    this.cloudflare = new CloudflareClient();
    this.database = new DatabaseClient();
    this.scalingStatus = new Map();
  }

  initializeScaling() {
    console.log('⚖️ Initializing auto-scaling system...');
    
    if (this.config.scaling.enabled) {
      this.setupScalingRules();
    }
  }

  setupScalingRules() {
    for (const rule of this.config.scaling.rules) {
      this.setupScalingRule(rule);
    }
  }

  setupScalingRule(rule) {
    console.log(`📐 Setting up scaling rule for ${rule.metric}`);
    
    const checkInterval = setInterval(async () => {
      try {
        await this.evaluateScalingRule(rule);
      } catch (error) {
        console.error(`Error evaluating scaling rule for ${rule.metric}:`, error);
      }
    }, 60 * 1000); // فحص كل دقيقة
    
    return checkInterval;
  }

  async evaluateScalingRule(rule) {
    const currentValue = await this.getMetricValue(rule.metric);
    const lastScaleTime = this.scalingStatus.get(rule.metric) || 0;
    const cooldownPassed = (Date.now() - lastScaleTime) > (rule.cooldown_minutes * 60 * 1000);

    if (currentValue > rule.threshold && cooldownPassed) {
      await this.scaleResource(rule);
      this.scalingStatus.set(rule.metric, Date.now());
    }
  }

  async getMetricValue(metric) {
    switch (metric) {
      case 'cpu_usage':
        return await this.cloudflare.getCPUUsage();
      case 'memory_usage':
        return await this.cloudflare.getMemoryUsage();
      default:
        throw new Error(`Unknown metric: ${metric}`);
    }
  }

  async scaleResource(rule) {
    console.log(`🔄 Scaling resource for ${rule.metric}`);
    
    switch (rule.action) {
      case 'scale_up':
        await this.scaleUp(rule);
        break;
      case 'scale_down':
        await this.scaleDown(rule);
        break;
      default:
        console.error(`Unknown scaling action: ${rule.action}`);
    }
  }

  async scaleUp(rule) {
    try {
      await this.cloudflare.increaseWorkers();
      console.log(`✅ Successfully scaled up for ${rule.metric}`);
    } catch (error) {
      console.error('Error scaling up:', error);
    }
  }

  async scaleDown(rule) {
    try {
      await this.cloudflare.decreaseWorkers();
      console.log(`✅ Successfully scaled down for ${rule.metric}`);
    } catch (error) {
      console.error('Error scaling down:', error);
    }
  }

  setupOptimization() {
    console.log('🔧 Setting up optimization systems...');
    
    if (this.config.optimization.cache_management.enabled) {
      this.setupCacheManagement();
    }
    
    if (this.config.optimization.database.auto_vacuum) {
      this.setupDatabaseOptimization();
    }
  }

  setupCacheManagement() {
    console.log('💾 Initializing cache management...');
    
    setInterval(async () => {
      try {
        await this.optimizeCache();
      } catch (error) {
        console.error('Error optimizing cache:', error);
      }
    }, 60 * 60 * 1000); // كل ساعة
  }

  async optimizeCache() {
    const cacheConfig = this.config.optimization.cache_management;
    
    try {
      // تنظيف ذاكرة التخزين المؤقت القديمة
      await this.cloudflare.cleanupCache({
        maxSize: cacheConfig.max_size_mb,
        ttl: cacheConfig.ttl_hours
      });
      
      console.log('✅ Cache optimization completed');
    } catch (error) {
      console.error('Cache optimization failed:', error);
    }
  }

  setupDatabaseOptimization() {
    console.log('🗄️ Initializing database optimization...');
    
    setInterval(async () => {
      try {
        await this.optimizeDatabase();
      } catch (error) {
        console.error('Error optimizing database:', error);
      }
    }, 24 * 60 * 60 * 1000); // يومياً
  }

  async optimizeDatabase() {
    try {
      if (this.config.optimization.database.auto_vacuum) {
        await this.database.vacuum();
      }
      
      if (this.config.optimization.database.index_optimization) {
        await this.database.optimizeIndexes();
      }
      
      console.log('✅ Database optimization completed');
    } catch (error) {
      console.error('Database optimization failed:', error);
    }
  }

  async resolveIssue(alert, resolution) {
    console.log(`🔧 Attempting to resolve issue: ${alert.type}`);
    
    try {
      switch (resolution.type) {
        case 'scale':
          await this.handleScalingResolution(resolution);
          break;
        case 'optimize':
          await this.handleOptimizationResolution(resolution);
          break;
        case 'restart':
          await this.handleRestartResolution(resolution);
          break;
        default:
          console.log(`Unknown resolution type: ${resolution.type}`);
      }
      
      console.log('✅ Issue resolved successfully');
      return true;
    } catch (error) {
      console.error('Failed to resolve issue:', error);
      return false;
    }
  }

  async stop() {
    console.log('⏹️ Stopping automation service...');
    // إيقاف جميع عمليات الأتمتة
    this.scalingStatus.clear();
    console.log('✅ Automation service stopped');
  }
}

module.exports = AutomationService;