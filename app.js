/* ============================================================
   dsher.cn — i18n, copy, tabs, small effects
   ============================================================ */
(() => {
  "use strict";

  /* ---------- i18n dictionary ---------- */
  const I18N = {
    "nav.about":       { zh: "关于",            en: "About" },
    "nav.features":    { zh: "特性",            en: "Features" },
    "nav.quickstart":  { zh: "快速上手",        en: "Quickstart" },
    "nav.community":   { zh: "社区",            en: "Community" },
    "hero.badge":      { zh: "DeepSeek Harness 社区站 · 非官方", en: "Community site · Unofficial" },
    "hero.tagline":    { zh: "玩转 dsh 的人，都叫 <em>dsher</em>。", en: "People who play with dsh are called <em>dshers</em>." },
    "hero.sub":        { zh: "dsh（DeepSeek Harness）是 DeepSeek AI 开源的 agent 运行框架——<strong>一切皆插件</strong>。今天它正式亮相，而这里，是 dshers 的聚集地。", en: "dsh (DeepSeek Harness) is DeepSeek AI's open-source agent harness — <strong>everything is a plugin</strong>. It just launched today, and this is where the dshers gather." },
    "hero.ctaStart":   { zh: "快速上手",        en: "Get started" },
    "hero.ctaAbout":   { zh: "先看看是什么 →",  en: "What is dsh? →" },
    "term.cmd1":       { zh: "npx @deepseek-ai/dsh web", en: "npx @deepseek-ai/dsh web" },
    "term.line1":      { zh: "▶ DeepSeek Harness 已就绪", en: "▶ DeepSeek Harness is ready" },
    "term.line2":      { zh: "  Web UI → http://127.0.0.1:3080", en: "  Web UI → http://127.0.0.1:3080" },
    "term.line3":      { zh: "  一切皆插件 · powered by Cordis", en: "  Everything is a plugin · powered by Cordis" },
    "term.cmd2":       { zh: "echo \"hello, dsher\"", en: "echo \"hello, dsher\"" },
    "term.out":        { zh: "hello, dsher 🚀", en: "hello, dsher 🚀" },
    "about.eyebrow":   { zh: "What is dsh",    en: "What is dsh" },
    "about.title":     { zh: "什么是 dsh？",    en: "What is dsh?" },
    "about.p1":        { zh: "dsh 是 <strong>DeepSeek Harness</strong> 的缩写——DeepSeek AI 开源的 agent harness（智能体运行框架）。它采用「<strong>一切皆插件</strong>」的架构，构建在 Cordis 之上：会话、工具、模型接入、Web UI……整个运行时都由可插拔的组件组装而成。", en: "dsh stands for <strong>DeepSeek Harness</strong> — DeepSeek AI's open-source agent harness. It is built on a <strong>everything-is-a-plugin</strong> architecture over Cordis: sessions, tools, model access, Web UI… the entire runtime is assembled from pluggable components." },
    "about.p2":        { zh: "目前 dsh 处于<em>开发者预览</em>阶段，迭代非常快，官方明确提示会有破坏性变更——但这正是玩它的乐趣所在。", en: "dsh is currently in <em>developer preview</em> and iterating fast — the project explicitly warns of breaking changes. Which is exactly the fun of it." },
    "about.whyTitle":  { zh: "为什么叫 dsher？", en: "Why \"dsher\"?" },
    "about.whyP1":     { zh: "<code>dsh</code> + <code>er</code> —— 就像 hacker 之于 hack，<strong>dsher</strong> 就是「玩 dsh 的人」：写插件的人、调 agent 的人、把想法装进 harness 的人。", en: "<code>dsh</code> + <code>er</code> — just as a hacker is someone who hacks, a <strong>dsher</strong> is someone who plays with dsh: writing plugins, tuning agents, wiring ideas into the harness." },
    "about.whyP2":     { zh: "注册这个域名，是想给这群人一个落脚点。不用申请，不用审核——<em>跑起来的那一刻，你就是 dsher。</em>", en: "This domain is a home base for those people. No application, no approval — <em>the moment it runs, you are a dsher.</em>" },
    "features.eyebrow":{ zh: "Why dsh",         en: "Why dsh" },
    "features.title":  { zh: "为什么值得玩",     en: "Why it's worth it" },
    "features.f1.title":{ zh: "一切皆插件",      en: "Everything is a plugin" },
    "features.f1.desc":{ zh: "基于 Cordis 的插件化架构，从 agent 循环到 UI 全部可组装、可替换、可自修改。", en: "A Cordis-based plugin architecture: from the agent loop to the UI, everything is composable, replaceable, self-modifiable." },
    "features.f2.title":{ zh: "多形态入口",      en: "Multiple entry points" },
    "features.f2.desc":{ zh: "Web UI、CLI、ACP 自动化服务器、JSON-RPC 服务端——同一个 harness，多种玩法。", en: "Web UI, CLI, ACP automation server, JSON-RPC server — one harness, many ways to play." },
    "features.f3.title":{ zh: "LLM 能力层",      en: "LLM capability layer" },
    "features.f3.desc":{ zh: "Service Definition / Consumer 的能力抽象 + DeepSeek 官方 providers，模型接入干净利落。", en: "Service Definition / Consumer abstractions plus official DeepSeek providers — clean model integration." },
    "features.f4.title":{ zh: "工具全家桶",      en: "Toolbox included" },
    "features.f4.desc":{ zh: "bash/shell、子进程、文件系统与策略、LSP、Web 搜索抓取、技能（skills）开箱即用。", en: "bash/shell, subprocess, filesystem with policy, LSP, web search & fetch, skills — ready out of the box." },
    "features.f5.title":{ zh: "多智能体协作",    en: "Multi-agent" },
    "features.f5.desc":{ zh: "subagents 委托、workflow 编排、todo 与计划模式，把复杂任务拆给一群 agent。", en: "Subagent delegation, workflow orchestration, todo & plan mode — split hard tasks across a team of agents." },
    "features.f6.title":{ zh: "会话持久化",      en: "Durable sessions" },
    "features.f6.desc":{ zh: "模型可见的一切都可从会话日志重建——断点续跑、回溯、复现，全程可审计。", en: "Everything the model sees is reconstructable from the session log — resume, rewind, reproduce, fully auditable." },
    "features.f7.title":{ zh: "安全与审批",      en: "Safety & approvals" },
    "features.f7.desc":{ zh: "交互式审批、权限控制、文件系统策略与沙箱，让 agent 放开手脚又不失控。", en: "Interactive approvals, permissions, filesystem policy and sandboxing — powerful agents that stay in control." },
    "features.f8.title":{ zh: "自我进化",        en: "Self-modification" },
    "features.f8.desc":{ zh: "agent 能检查并挂载自己的插件——它不只是跑在 harness 里，它就是你写的 harness。", en: "Agents can inspect and mount their own plugins — it doesn't just run in the harness, it becomes your harness." },
    "quickstart.eyebrow":{ zh: "Get started",   en: "Get started" },
    "quickstart.title":{ zh: "一分钟成为 dsher", en: "Become a dsher in a minute" },
    "quickstart.tabNpm":{ zh: "npm 安装",        en: "Via npm" },
    "quickstart.tabSrc":{ zh: "源码运行",        en: "From source" },
    "quickstart.need": { zh: "需要：Node.js",    en: "Requires: Node.js" },
    "quickstart.needSrc":{ zh: "需要：Node.js + pnpm", en: "Requires: Node.js + pnpm" },
    "quickstart.copy": { zh: "复制",            en: "Copy" },
    "quickstart.copied":{ zh: "已复制 ✓",       en: "Copied ✓" },
    "quickstart.hint": { zh: "更多玩法见官方文档：<a href=\"https://github.com/deepseek-ai/deepseek-harness#readme\" target=\"_blank\" rel=\"noopener\">github.com/deepseek-ai/deepseek-harness</a>", en: "More ways to play in the official docs: <a href=\"https://github.com/deepseek-ai/deepseek-harness#readme\" target=\"_blank\" rel=\"noopener\">github.com/deepseek-ai/deepseek-harness</a>" },
    "community.eyebrow":{ zh: "Join us",        en: "Join us" },
    "community.title":{ zh: "找到组织",          en: "Find your people" },
    "community.c1.name":{ zh: "GitHub 仓库",     en: "GitHub repo" },
    "community.c1.desc":{ zh: "源码、Issue、里程碑，star 一下不亏", en: "Source, issues, milestones — a star costs nothing" },
    "community.c2.name":{ zh: "GitHub Discussions", en: "GitHub Discussions" },
    "community.c2.desc":{ zh: "反馈、提问、晒作品", en: "Feedback, questions, show-offs" },
    "community.c3.name":{ zh: "Discord",        en: "Discord" },
    "community.c3.desc":{ zh: "和全球 dshers 实时聊", en: "Chat live with dshers worldwide" },
    "community.c4.name":{ zh: "dsh-plugin 生态", en: "dsh-plugin ecosystem" },
    "community.c4.desc":{ zh: "给插件仓库打上这个 topic", en: "Tag your plugin repos with this topic" },
    "footer.disclaimer":{ zh: "本站是 dsher 社区的非官方页面，与 DeepSeek AI 无隶属关系。DeepSeek Harness (dsh) 是 DeepSeek AI 的 MIT 开源项目；文中商标归各自所有者所有。", en: "This is an unofficial community page for dshers, not affiliated with DeepSeek AI. DeepSeek Harness (dsh) is DeepSeek AI's MIT-licensed open-source project; trademarks belong to their owners." },
    "footer.built":    { zh: "用 ❤ 和 dsh 搭的", en: "Built with ❤ and dsh" },
  };

  const LS_KEY = "dsher-lang";
  const docEl = document.documentElement;

  function detectLang() {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "zh" || saved === "en") return saved;
    } catch (e) { /* storage unavailable — fall through */ }
    return (navigator.language || "zh").toLowerCase().startsWith("zh") ? "zh" : "en";
  }

  function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const entry = I18N[key];
      if (!entry) return;
      const text = entry[lang];
      if (text !== undefined) el.innerHTML = text;
    });
    docEl.lang = lang === "zh" ? "zh-CN" : "en";
    const toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.querySelector(".lang-current").textContent = lang === "zh" ? "中文" : "EN";
      toggle.querySelector(".lang-next").textContent = lang === "zh" ? "EN" : "中文";
    }
    document.title = lang === "zh"
      ? "dsher — 玩转 DeepSeek Harness 的人"
      : "dsher — people who play with DeepSeek Harness";
    try { localStorage.setItem(LS_KEY, lang); } catch (e) { /* ignore */ }
  }

  let lang = detectLang();
  applyLang(lang);

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      lang = lang === "zh" ? "en" : "zh";
      applyLang(lang);
    });
  }

  /* ---------- quickstart tabs ---------- */
  const tabs = document.querySelectorAll(".qs-tab");
  const panels = {
    npm: document.getElementById("panel-npm"),
    src: document.getElementById("panel-src"),
  };
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      const id = tab.id.replace("tab-", "");
      Object.entries(panels).forEach(([key, panel]) => {
        if (!panel) return;
        panel.hidden = key !== id;
        panel.classList.toggle("is-active", key === id);
      });
    });
  });

  /* ---------- copy buttons ---------- */
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selector = btn.getAttribute("data-copy");
      if (!selector) return;
      const pre = document.querySelector(selector);
      const text = pre ? pre.textContent.trim() : "";
      const label = btn.querySelector(".copy-label");
      const done = () => {
        if (label) {
          label.textContent = I18N["quickstart.copied"][lang];
          btn.classList.add("copied");
          setTimeout(() => {
            label.textContent = I18N["quickstart.copy"][lang];
            btn.classList.remove("copied");
          }, 1600);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    });
  });

  function fallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
