const { Client } = require('@notionhq/client');
const { Octokit } = require('@octokit/rest');
const { CloudflareAPI } = require('cloudflare');
const { OpenAI } = require('openai');
const config = require('../automation.config.json');

class AIAutomation {
  constructor() {
    this.notion = new Client({ auth: config.integrations.notion.api_key });
    this.github = new Octokit({ auth: config.integrations.github.api_token });
    this.cloudflare = new CloudflareAPI({
      token: config.integrations.cloudflare.api_token,
      accountId: config.integrations.cloudflare.account_id
    });
    this.openai = new OpenAI(process.env.OPENAI_API_KEY);
  }

  async runCodeReview() {
    try {
      const changes = await this.github.pulls.list({
        owner: 'inncomm16',
        repo: 'streamx',
        state: 'open'
      });

      for (const pr of changes.data) {
        const review = await this.generateCodeReview(pr);
        await this.github.pulls.createReview({
          owner: 'inncomm16',
          repo: 'streamx',
          pull_number: pr.number,
          body: review,
          event: 'COMMENT'
        });
      }
    } catch (error) {
      console.error('Code review error:', error);
    }
  }

  async generateCodeReview(pr) {
    const prompt = `Review this pull request: ${pr.title}\n${pr.body}`;
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a code reviewer. Provide detailed feedback on code quality, security, and best practices."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
    return response.choices[0].message.content;
  }

  async runTests() {
    try {
      const testResults = await this.runAutomatedTests();
      await this.updateNotion('Test Results', testResults);
    } catch (error) {
      console.error('Test automation error:', error);
    }
  }

  async runSecurityScan() {
    try {
      const securityReport = await this.performSecurityScan();
      await this.updateNotion('Security Report', securityReport);
    } catch (error) {
      console.error('Security scan error:', error);
    }
  }

  async handleMarketing() {
    try {
      const content = await this.generateMarketingContent();
      await this.postToSocialMedia(content);
      await this.updateNotion('Marketing Activities', content);
    } catch (error) {
      console.error('Marketing automation error:', error);
    }
  }

  async generateMarketingContent() {
    const prompt = "Generate engaging social media content for StreamX platform";
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a marketing expert. Create engaging content for social media."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
    return response.choices[0].message.content;
  }

  async updateNotion(title, content) {
    try {
      await this.notion.pages.create({
        parent: { database_id: config.integrations.notion.database_id },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: title
                }
              }
            ]
          },
          Content: {
            rich_text: [
              {
                text: {
                  content: content
                }
              }
            ]
          },
          Date: {
            date: {
              start: new Date().toISOString()
            }
          }
        }
      });
    } catch (error) {
      console.error('Notion update error:', error);
    }
  }

  async monitorPerformance() {
    try {
      const metrics = await this.cloudflare.analytics.get({
        zone_id: config.integrations.cloudflare.zone_id,
        metrics: ['requests', 'bandwidth', 'threats']
      });
      await this.updateNotion('Performance Metrics', JSON.stringify(metrics));
    } catch (error) {
      console.error('Performance monitoring error:', error);
    }
  }

  async generateReport(type) {
    try {
      const report = await this.generateAIReport(type);
      await this.updateNotion(`${type} Report`, report);
    } catch (error) {
      console.error('Report generation error:', error);
    }
  }

  async generateAIReport(type) {
    const prompt = `Generate a ${type} report for StreamX platform`;
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a business analyst. Generate detailed reports with insights and recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });
    return response.choices[0].message.content;
  }
}

module.exports = AIAutomation; 