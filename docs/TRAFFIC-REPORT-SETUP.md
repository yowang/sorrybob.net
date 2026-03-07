# 每日流量报告配置说明

## 功能概述

自动从 Cloudflare Analytics API 获取流量数据，生成可读的流量报告，并可推送到飞书群。

## 文件位置

- **脚本**: `scripts/daily-traffic-report.js`
- **工作流**: `.github/workflows/daily-traffic.yml`
- **报告目录**: `reports/`

## 使用方法

### 本地测试（模拟数据）

```bash
cd /Users/andrew/Documents/GitHub/sorrybob.net
node scripts/daily-traffic-report.js --mock
```

### 本地测试（真实数据）

```bash
export CF_API_TOKEN=your_token
export CF_ZONE_ID=your_zone_id
export FEISHU_WEBHOOK_URL=your_webhook_url  # 可选

node scripts/daily-traffic-report.js
```

## 获取 API 凭证

### 1. Cloudflare API Token

1. 访问: https://dash.cloudflare.com/profile/api-tokens
2. 点击 "Create Token"
3. 选择 "Custom token"
4. 配置权限:
   - Account > Analytics > Read
   - Zone > Analytics > Read
5. 创建并保存 Token

### 2. Zone ID

1. 访问: https://dash.cloudflare.com/
2. 选择 sorrybob.net 项目
3. 在右侧 "API" 区域找到 Zone ID

### 3. 飞书 Webhook URL（可选）

1. 在飞书群中添加 "自定义机器人"
2. 获取 Webhook 地址

## GitHub Actions 配置

### 设置 Secrets

在 GitHub 仓库设置中添加以下 Secrets:

1. 进入 Settings > Secrets and variables > Actions
2. 添加以下 secrets:
   - `CF_API_TOKEN`: Cloudflare API Token
   - `CF_ZONE_ID`: sorrybob.net 的 Zone ID
   - `FEISHU_WEBHOOK_URL`: 飞书群 Webhook（可选）

### 手动触发

1. 进入 Actions 页面
2. 选择 "Daily Traffic Report" 工作流
3. 点击 "Run workflow"

### 自动触发

工作流配置为每天北京时间 09:00 自动运行。

## 报告示例

```
📊 **SorryBob.net 每日流量报告**

📅 日期: 2026年2月26日星期四

**📈 今日数据** (2026-02-25)
- 页面浏览: **398** (-20.1%)
- 访客数: **109** (-28.3%)
- 请求数: 1,396
- 流量: 6.11 MB

**📊 本周汇总** (7 天)
- 总页面浏览: 2,902
- 总访客数: 901
- 总请求数: 8,708
- 总流量: 39.38 MB

**📅 7 天趋势**
```
2026-02-19 █████████ 460
2026-02-20 █████████ 470
2026-02-21 ███████ 375
2026-02-22 ██████ 306
2026-02-23 ███████ 395
2026-02-24 █████████ 498
2026-02-25 ███████ 398
```

_数据来源: Cloudflare Analytics_
```

## 故障排查

### 错误: 缺少环境变量

确保设置了 `CF_API_TOKEN` 和 `CF_ZONE_ID` 环境变量。

### 错误: API 认证失败

检查 API Token 是否有 Analytics Read 权限。

### 错误: Zone ID 无效

确认 Zone ID 正确，可以在 Cloudflare Dashboard 中找到。

## 注意事项

1. **API Token 保密**: 不要将 Token 提交到 Git
2. **Zone ID**: 可以公开，不影响安全
3. **报告保存**: 报告保存在 `reports/` 目录，会自动上传到 GitHub Artifacts
4. **飞书推送**: 需要配置 `FEISHU_WEBHOOK_URL`，否则只保存不推送

## 相关链接

- [Cloudflare Analytics API 文档](https://developers.cloudflare.com/analytics/graphql-api/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [飞书机器人开发指南](https://open.feishu.cn/document/ukTMukTMukTM/ucTM5YjL3ETO24yNxkjN)
