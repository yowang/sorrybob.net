# Sentry Alerting 运行手册

## 1. DSN 与环境变量

当前项目同时支持客户端与 server/instrumentation 侧初始化：

- 客户端配置：`sentry.client.config.ts`
- 服务端配置：`sentry.server.config.ts`
- Edge 配置：`sentry.edge.config.ts`
- 注册入口：`instrumentation.ts`

建议的环境变量如下：

| 变量名 | 必填 | 作用 |
| --- | --- | --- |
| `NEXT_PUBLIC_SENTRY_DSN` | 是 | 客户端 SDK 上报使用（浏览器可见） |
| `SENTRY_DSN` | 否（推荐） | server/edge 上报使用；未设置时回退到 `NEXT_PUBLIC_SENTRY_DSN` |
| `SENTRY_ENVIRONMENT` | 否 | 环境名（如 `production` / `staging`） |
| `SENTRY_AUTH_TOKEN` | 否 | 构建上传 source map（CI/CD） |

示例（`.env.local`）：

```bash
NEXT_PUBLIC_SENTRY_DSN=https://<public-key>@oXXXX.ingest.us.sentry.io/<project-id>
SENTRY_DSN=https://<secret-key>@oXXXX.ingest.us.sentry.io/<project-id>
SENTRY_ENVIRONMENT=production
# SENTRY_AUTH_TOKEN=<token>
```

## 2. 告警规则建议

在 Sentry 项目中至少配置一条 Issue 告警规则：

1. 触发条件：`event.type:error` 且 `environment:production`
2. 频率建议：`1 issue in 5 minutes`（避免噪音）
3. 通知渠道：Email / Slack / PagerDuty 任一可达渠道

## 3. 如何验证告警

### 3.1 客户端采集验证

1. 启动项目：`npm run dev`
2. 打开首页后在浏览器控制台执行：

```js
throw new Error('Sentry alert smoke test - client')
```

3. 在 Sentry 中确认收到事件并触发告警。

### 3.2 关键埋点验证（GameEmbed）

`src/components/GameEmbed.tsx` 已在以下失败路径显式调用 `captureException`：

- iframe 加载超时（10 秒）
- iframe `onError`
- 全屏切换异常

验证方式：阻断游戏 iframe 请求或使用不可达网络环境触发加载失败，确认 Sentry 事件中包含 `component=GameEmbed` 与 `reason` 标签。

## 4. 回滚方案

优先级从快到慢：

1. 配置级停用（最快）
   - 移除 `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` 后重新部署
   - 当前配置 `enabled: Boolean(dsn)`，无 DSN 时不会上报
2. 降级采样
   - 将 `tracesSampleRate` 调低到 `0` 或极小值，减少压力
3. 代码回滚
   - 回滚本次变更对应 commit：`git revert <commit_sha>`

## 5. 注意事项

- 项目当前启用了 `output: 'export'`，生产环境若以纯静态托管部署，server/edge 运行时代码不会常驻执行；客户端错误采集仍可用。
- 若未来切回 SSR/Edge 运行时，本次 `instrumentation.ts` 与 server/edge 配置可直接复用。
