#!/usr/bin/env node
/**
 * SorryBob.net 每日流量报告脚本
 * 
 * 功能：
 * 1. 从 Cloudflare Analytics API 获取流量数据
 * 2. 生成可读的流量报告
 * 3. 保存报告到 reports/ 目录
 * 4. 可选：推送到飞书群（需要配置 FEISHU_WEBHOOK_URL）
 * 
 * 使用方法：
 * - 真实数据: CF_API_TOKEN=xxx CF_ZONE_ID=xxx node scripts/daily-traffic-report.js
 * - 模拟数据: node scripts/daily-traffic-report.js --mock
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Cloudflare Analytics API 配置
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const CF_ZONE_ID = process.env.CF_ZONE_ID;
const FEISHU_WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL;
const USE_MOCK = process.argv.includes('--mock');

// 获取日期范围（过去 7 天）
function getDateRange() {
  const dates = [];
  for (let i = 7; i >= 1; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

// 模拟数据（用于测试）
function getMockData() {
  const dates = getDateRange();
  return {
    data: {
      viewer: {
        zones: [{
          httpRequests1dGroups: dates.map((date, index) => ({
            dimensions: { date },
            sum: {
              requests: Math.floor(1000 + Math.random() * 500),
              pageViews: Math.floor(300 + Math.random() * 200),
              bytes: Math.floor(5000000 + Math.random() * 2000000)
            },
            uniq: {
              uniques: Math.floor(100 + Math.random() * 80)
            }
          }))
        }]
      }
    }
  };
}

// GraphQL 查询
function buildQuery() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const dateFilter = sevenDaysAgo.toISOString().split('T')[0];

  return `
    query {
      viewer {
        zones(filter: {zoneTag: "${CF_ZONE_ID}"}) {
          httpRequests1dGroups(
            orderBy: [date_ASC]
            limit: 7
            filter: {date_gt: "${dateFilter}"}
          ) {
            dimensions {
              date
            }
            sum {
              requests
              pageViews
              bytes
            }
            uniq {
              uniques
            }
          }
        }
      }
    }
  `;
}

// 从 Cloudflare API 获取数据
async function fetchAnalytics() {
  if (USE_MOCK) {
    console.log('📝 使用模拟数据模式\n');
    return getMockData();
  }

  if (!CF_API_TOKEN || !CF_ZONE_ID) {
    console.error('❌ 缺少环境变量：');
    console.error('   - CF_API_TOKEN: ' + (CF_API_TOKEN ? '✓' : '✗'));
    console.error('   - CF_ZONE_ID: ' + (CF_ZONE_ID ? '✓' : '✗'));
    console.error('\n💡 使用 --mock 参数测试脚本，或设置环境变量');
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    const query = buildQuery();
    const data = JSON.stringify({ query });
    
    const options = {
      hostname: 'api.cloudflare.com',
      path: '/client/v4/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CF_API_TOKEN}`,
        'Content-Length': data.length
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.errors) {
            reject(new Error(JSON.stringify(result.errors)));
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 计算环比变化
function calculateChange(current, previous) {
  if (previous === 0) return '+100%';
  const change = ((current - previous) / previous * 100).toFixed(1);
  return change > 0 ? `+${change}%` : `${change}%`;
}

// 生成报告
function generateReport(data) {
  const zones = data.data.viewer.zones[0];
  
  if (!zones || !zones.httpRequests1dGroups || zones.httpRequests1dGroups.length === 0) {
    throw new Error('未获取到流量数据');
  }
  
  const groups = zones.httpRequests1dGroups;
  
  const now = new Date();
  const today = now.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });
  
  let report = '📊 **SorryBob.net 每日流量报告**\n\n';
  report += `📅 日期: ${today}\n\n`;
  
  // 最近一天的数据
  const latest = groups[groups.length - 1];
  const previous = groups.length > 1 ? groups[groups.length - 2] : null;
  
  report += `**📈 今日数据** (${latest.dimensions.date})\n`;
  report += `- 页面浏览: **${latest.sum.pageViews.toLocaleString()}**`;
  if (previous) {
    report += ` (${calculateChange(latest.sum.pageViews, previous.sum.pageViews)})`;
  }
  report += '\n';
  
  report += `- 访客数: **${latest.uniq.uniques.toLocaleString()}**`;
  if (previous) {
    report += ` (${calculateChange(latest.uniq.uniques, previous.uniq.uniques)})`;
  }
  report += '\n';
  
  report += `- 请求数: ${latest.sum.requests.toLocaleString()}\n`;
  report += `- 流量: ${(latest.sum.bytes / 1024 / 1024).toFixed(2)} MB\n\n`;
  
  // 计算周统计
  const weekStats = groups.reduce((acc, g) => ({
    pageViews: acc.pageViews + g.sum.pageViews,
    uniques: acc.uniques + (g.uniq ? g.uniq.uniques : 0),
    requests: acc.requests + g.sum.requests,
    bytes: acc.bytes + g.sum.bytes
  }), { pageViews: 0, uniques: 0, requests: 0, bytes: 0 });

  report += `**📊 本周汇总** (7 天)\n`;
  report += `- 总页面浏览: ${weekStats.pageViews.toLocaleString()}\n`;
  report += `- 总访客数: ${weekStats.uniques.toLocaleString()}\n`;
  report += `- 总请求数: ${weekStats.requests.toLocaleString()}\n`;
  report += `- 总流量: ${(weekStats.bytes / 1024 / 1024).toFixed(2)} MB\n\n`;
  
  // 7 天趋势
  report += `**📅 7 天趋势**\n`;
  report += '```\n';
  groups.forEach(g => {
    const date = g.dimensions.date;
    const views = g.sum.pageViews;
    const bar = '█'.repeat(Math.floor(views / 50));
    report += `${date} ${bar} ${views.toLocaleString()}\n`;
  });
  report += '```\n';
  
  // 添加来源说明
  report += `\n_数据来源: ${USE_MOCK ? '模拟数据' : 'Cloudflare Analytics'}_`;
  
  return report;
}

// 推送到飞书
async function pushToFeishu(report) {
  if (!FEISHU_WEBHOOK_URL) {
    console.log('\n⚠️  未配置 FEISHU_WEBHOOK_URL，跳过推送');
    return false;
  }
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      msg_type: 'text',
      content: {
        text: report
      }
    });
    
    const url = new URL(FEISHU_WEBHOOK_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.StatusCode === 0 || result.code === 0) {
            resolve(true);
          } else {
            reject(new Error(JSON.stringify(result)));
          }
        } catch (err) {
          reject(err);
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// 主函数
async function main() {
  console.log('🚀 SorryBob.net 流量报告生成器\n');
  console.log('=' .repeat(50));
  
  try {
    // 获取数据
    console.log('\n🔍 正在获取流量数据...');
    const data = await fetchAnalytics();
    console.log('✅ 数据获取成功\n');
    
    // 生成报告
    const report = generateReport(data);
    console.log(report);
    
    // 保存报告
    const reportsDir = path.join(__dirname, '..', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const timestamp = Date.now();
    const dateStr = new Date().toISOString().split('T')[0];
    const reportFile = path.join(reportsDir, `traffic-report-${dateStr}.txt`);
    
    fs.writeFileSync(reportFile, report);
    console.log(`\n✅ 报告已保存: ${reportFile}`);
    
    // 推送到飞书
    if (FEISHU_WEBHOOK_URL) {
      console.log('\n📤 正在推送到飞书...');
      await pushToFeishu(report);
      console.log('✅ 推送成功');
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ 任务完成！');
    
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    
    if (error.message.includes('缺少环境变量')) {
      console.log('\n📖 使用说明:');
      console.log('1. 获取 Cloudflare API Token: https://dash.cloudflare.com/profile/api-tokens');
      console.log('2. 创建 Token，选择 "Analytics Read" 权限');
      console.log('3. 获取 Zone ID: 在 sorrybob.net 项目概览页面');
      console.log('4. 设置环境变量:');
      console.log('   export CF_API_TOKEN=your_token');
      console.log('   export CF_ZONE_ID=your_zone_id');
      console.log('5. 运行脚本: node scripts/daily-traffic-report.js');
    }
    
    process.exit(1);
  }
}

main();
