# dsher.cn — 静态落地页

围绕 DeepSeek Harness (dsh) 的社区落地页。纯静态（HTML + CSS + JS），无构建步骤，可直接部署到 Cloudflare Pages。

## 文件

```
dsher-site/
├── index.html    # 页面结构（中英双语 data-i18n 属性）
├── styles.css    # 深色科技风样式
├── app.js        # 中英切换 / 复制按钮 / tab / 年份
└── favicon.svg   # 站点图标
```

- 默认语言跟随浏览器（中文优先），右上角按钮可切换中/英，选择会存入 `localStorage`。
- 所有文案以 `data-i18n` 键值对维护在 `app.js` 顶部的 `I18N` 表里，改文案只需改那一处。

## 部署到 Cloudflare Pages

### 方式 A：拖拽上传（最快）

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages**。
2. 选 **Upload assets**（直接上传静态资源）。
3. 把 `dsher-site/` 目录里的 4 个文件一起拖进上传区，命名项目（如 `dsher`），点 Deploy。
4. 部署完成后，在 Pages 项目 → **Custom domains** 里添加 `dsher.cn`（按提示在 DNS 处添加 CNAME 记录指向 `pages.dev` 域名并开启代理）。

### 方式 B：Git 集成（推荐，改完自动部署）

1. 把 `dsher-site/` 里的文件推到任意 Git 仓库（GitHub/GitLab/Bitbucket）。
2. Cloudflare Pages → **Create** → **Pages** → **Connect to Git**，选该仓库。
3. 构建配置：
   - **Build command**：留空（无构建步骤）
   - **Build output directory**：`/`（或文件所在目录，比如 `dsher-site`）
4. 部署后同样在 **Custom domains** 绑定 `dsher.cn`。

## 本地预览

```sh
cd dsher-site
python3 -m http.server 8080
# 打开 http://127.0.0.1:8080
```

## 注意

- 本站为**非官方社区页**，页脚已包含与 DeepSeek AI 无隶属关系的声明，请保留。
- 若日后要加页面（如 /blog），保持纯静态即可，Cloudflare Pages 会自动处理路由。
