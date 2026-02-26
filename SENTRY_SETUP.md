# Sentry 集成说明

## 快速开始

### 1. 安装依赖

```bash
npm install @sentry/nextjs
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入你的 Sentry DSN：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入真实的 DSN：

```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

### 3. 本地测试

```bash
npm run dev
```

访问 http://localhost:3000，Sentry 应该会自动捕获客户端错误。

### 4. 部署到生产环境

```bash
npm run build
# 构建完成后，out/ 目录包含静态文件
# 将这些文件部署到你的静态托管服务（如 Cloudflare Pages）
```

## 功能说明

### 自动捕获的错误类型

1. **未捕获的 JavaScript 错误**
   - ReferenceError
   - TypeError
   - SyntaxError
   - 等

2. **Promise 拒绝**
   - 未处理的 Promise rejection

3. **控制台错误**
   - console.error() 调用

### 性能监控

- **tracesSampleRate: 0.1** - 10% 的页面加载会被追踪
- **replaysSessionSampleRate: 0.1** - 10% 的会话会被录制

### 会话重放（Session Replay）

当错误发生时，Sentry 会自动录制用户操作：
- 用户的鼠标移动
- 点击事件
- 错误发生时的页面状态

这有助于理解错误发生的上下文。

## 测试错误捕获

在浏览器控制台运行：

```javascript
// 测试未捕获错误
throw new Error('Sentry test error');

// 测试 Promise rejection
Promise.reject('Sentry test rejection');

// 测试 console.error
console.error('Sentry test console error');
```

然后到 Sentry Dashboard 查看是否捕获成功。

## 生产环境配置

### 1. 上传 Source Maps（可选但推荐）

如果你想在 Sentry 看到原始代码（而不是编译后的代码），需要上传 source maps：

1. 在 Sentry 项目设置中生成 Auth Token
2. 添加到 `.env.local`：

```
SENTRY_AUTH_TOKEN=your-auth-token
```

3. 构建时自动上传：

```bash
npm run build
```

### 2. 环境区分

在 `sentry.client.config.ts` 中可以根据环境调整配置：

```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV, // 'development' or 'production'
  // ...
});
```

## 注意事项

### 静态导出的限制

由于本项目使用 `output: 'export'`（静态导出），以下功能**不可用**：

- ❌ 服务器端错误捕获（没有服务器）
- ❌ API Routes 错误追踪（没有 API routes）
- ❌ Edge Runtime 错误追踪

以下功能**可用**：

- ✅ 客户端 JavaScript 错误捕获
- ✅ 性能监控（页面加载时间）
- ✅ 会话重放（Session Replay）
- ✅ 用户反馈收集

### 隐私保护

默认配置已启用：
- `maskAllText: true` - 会话重放中遮盖所有文本
- `blockAllMedia: true` - 会话重放中屏蔽所有媒体

这确保用户隐私数据不会被上传到 Sentry。

## 常见问题

### Q: 为什么本地开发时看不到错误？

A: 检查以下几点：
1. `.env.local` 是否正确配置
2. 是否重启了 dev server
3. 检查浏览器控制台是否有 Sentry 相关错误
4. 确认 `debug: true` 已启用

### Q: 如何禁用 Sentry（例如在特定环境）？

A: 在 `sentry.client.config.ts` 中：

```typescript
Sentry.init({
  dsn: process.env.NODE_ENV === 'test' ? undefined : process.env.NEXT_PUBLIC_SENTRY_DSN,
  // ...
});
```

### Q: 如何过滤特定错误？

A: 使用 `beforeSend` 钩子：

```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  beforeSend(event) {
    // 过滤掉特定错误
    if (event.exception?.values?.[0]?.type === 'NetworkError') {
      return null; // 不发送到 Sentry
    }
    return event;
  },
});
```

## 相关链接

- [Sentry Next.js 文档](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry 静态导出说明](https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#static-exports)
- [Sentry Dashboard](https://sentry.io)
