const fs = require('fs');
const https = require('https');
const path = require('path');

// 读取竞品清单
const competitorsPath = path.join(__dirname, 'competitors.json');
const competitors = JSON.parse(fs.readFileSync(competitorsPath, 'utf8')).competitors;

// 监控函数
async function monitorCompetitor(competitor) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    https.get(competitor.url, (res) => {
      const loadTime = Date.now() - startTime;
      
      resolve({
        name: competitor.name,
        url: competitor.url,
        status: res.statusCode,
        loadTime: loadTime,
        timestamp: new Date().toISOString()
      });
    }).on('error', (err) => {
      resolve({
        name: competitor.name,
        url: competitor.url,
        error: err.message,
        timestamp: new Date().toISOString()
      });
    });
  });
}

// 主函数
async function main() {
  console.log('🔍 Starting competitor monitoring...\n');
  
  const results = await Promise.all(
    competitors.map(monitorCompetitor)
  );
  
  // 保存结果
  const report = {
    date: new Date().toISOString(),
    results: results
  };
  
  // 创建报告目录（如果不存在）
  const reportsDir = path.join(__dirname, '..', 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportPath = path.join(reportsDir, `competitor-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // 输出摘要
  console.log('📊 Monitoring Results:\n');
  results.forEach(r => {
    if (r.error) {
      console.log(`❌ ${r.name}: ${r.error}`);
    } else {
      console.log(`✅ ${r.name}: ${r.status} (${r.loadTime}ms)`);
    }
  });
  
  console.log(`\n✅ Report saved to: ${reportPath}`);
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
