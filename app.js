/* ============================================================
   dsher.cn — i18n, copy, tabs, small effects
   ============================================================ */
(() => {
  "use strict";

  /* Hoisted marketplace state — referenced by applyLang before module init. */
  let PLUGINS = [];
  let DATA_UPDATED = "";

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
    "hero.ctaPlugins": { zh: "插件市场",        en: "Plugin Marketplace" },
    "hero.ctaAbout":   { zh: "先看看是什么 →",  en: "What is dsh? →" },
    "hero.community":  { zh: "加入 dsh 社区论坛", en: "Join the dsh community forum" },
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
    "community.c5.name":{ zh: "插件市场",        en: "Plugin Marketplace" },
    "community.c5.desc":{ zh: "检索、安装 dsh 生态插件", en: "Browse & install dsh ecosystem plugins" },
    "community.forum.badge":{ zh: "💬 dsh 社区论坛",   en: "💬 dsh community forum" },
    "community.forum.title":{ zh: "bbs.dsher.cn",       en: "bbs.dsher.cn" },
    "community.forum.desc":{ zh: "提问、交流、晒作品、找同好——dshers 的根据地，随时来聊。", en: "Ask, share, show off, and find your people — the home base for dshers. Drop by anytime." },
    "community.forum.cta":{ zh: "进入论坛 →",           en: "Visit the forum →" },
    "footer.disclaimer":{ zh: "本站是 dsher 社区的非官方页面，与 DeepSeek AI 无隶属关系。DeepSeek Harness (dsh) 是 DeepSeek AI 的 MIT 开源项目；文中商标归各自所有者所有。", en: "This is an unofficial community page for dshers, not affiliated with DeepSeek AI. DeepSeek Harness (dsh) is DeepSeek AI's MIT-licensed open-source project; trademarks belong to their owners." },
    "footer.built":    { zh: "用 ❤ 和 dsh 搭的", en: "Built with ❤ and dsh" },

    /* ---- plugin marketplace ---- */
    "nav.plugins":     { zh: "插件市场",        en: "Plugins" },
    "pl.badge":        { zh: "DSH 插件市场",    en: "DSH Plugin Marketplace" },
    "pl.title":        { zh: "插件市场",        en: "Plugin Marketplace" },
    "pl.sub":          { zh: "检索、发现并安装 dsh 生态插件——官方、社区与索引一网打尽。", en: "Search, discover, and install plugins across the dsh ecosystem — official, community, and index." },
    "pl.searchPlaceholder": { zh: "搜索插件名称 / 作者 / 标签…", en: "Search by name, author, or tag…" },
    "pl.filterAll":    { zh: "全部",            en: "All" },
    "pl.filterOfficial": { zh: "官方",          en: "Official" },
    "pl.filterCommunity": { zh: "社区",         en: "Community" },
    "pl.filterIndex":  { zh: "索引",            en: "Index" },
    "pl.empty":        { zh: "没有找到匹配的插件", en: "No matching plugins" },
    "pl.stats":        { zh: "{n} 个插件 · {o} 官方 · {c} 社区 · {i} 索引 · 更新于 {d}", en: "{n} plugins · {o} official · {c} community · {i} index · updated {d}" },
    "pl.builtin":      { zh: "随 dsh 内置",     en: "Built into dsh" },
    "pl.example":      { zh: "官方示例",        en: "Official example" },
    "pl.repo":         { zh: "仓库",            en: "Repo" },
    "pl.howtoEyebrow": { zh: "How to install", en: "How to install" },
    "pl.howtoTitle":   { zh: "如何安装",        en: "How to install" },
    "pl.howto1Title":  { zh: "安装到默认 profile", en: "Install to the default profile" },
    "pl.howto1Desc":   { zh: "从 npm 安装插件包（bundle）。示例：<code>dsh plugin add @deepseek-ai/dsh-web-app</code>", en: "Install a plugin bundle from npm. E.g. <code>dsh plugin add @deepseek-ai/dsh-web-app</code>" },
    "pl.howto2Title":  { zh: "从 GitHub 安装", en: "Install from GitHub" },
    "pl.howto2Desc":   { zh: "无需发布到 npm，直接从仓库安装。建议固定提交：<code>github:owner/repo#&lt;sha&gt;</code>", en: "No npm publish needed — install straight from a repo. Pin a commit: <code>github:owner/repo#&lt;sha&gt;</code>" },
    "pl.howto3Title":  { zh: "命名 profile",   en: "Named profile" },
    "pl.howto3Desc":   { zh: "安装到指定 profile；首次使用会自动初始化（以 <code>@deepseek-ai/dsh-base</code> 为第一层）。", en: "Install into a named profile; first use initializes it with <code>@deepseek-ai/dsh-base</code> as the first layer." },
    "pl.howtoNote1Title": { zh: "Git 安装须知：", en: "Git installs:" },
    "pl.howtoNote1":   { zh: "从 Git 安装的是源码而非构建产物，仓库需提供 <code>prepare</code> 脚本；pnpm ≥10 会要求先在 profile 的 <code>pnpm-workspace.yaml</code> 中允许该包的构建（<code>allowBuilds</code>）。", en: "Git installs fetch sources, not built artifacts; the repo must ship a <code>prepare</code> script, and pnpm ≥10 requires allowlisting the package build (<code>allowBuilds</code>) in the profile's <code>pnpm-workspace.yaml</code>." },
    "pl.howtoNote2Title": { zh: "安全提示：",  en: "Security:" },
    "pl.howtoNote2":   { zh: "安装会执行包代码，请只允许你信任的来源，并固定 commit。", en: "Installing executes package code on your machine — only allow sources you trust, and pin a commit." },
    "pl.howtoDoc":     { zh: "完整机制见官方文档：", en: "Full mechanics in the official docs:" },

    /* ---- plugin detail pages ---- */
    "pl.detail.more":   { zh: "更多插件",        en: "More plugins" },
    "pl.detail.viewAll":{ zh: "查看全部 →",      en: "View all →" },
    "pl.detail.repo":   { zh: "GitHub 仓库",     en: "GitHub repo" },
    "pl.detail.back":   { zh: "返回插件市场",    en: "Back to marketplace" },
    "pl.detail.installHint": { zh: "在 dsh 项目里执行此命令即可安装。", en: "Run this command in your dsh project to install." },
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
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const entry = I18N[key];
      if (entry && entry[lang] !== undefined) el.placeholder = entry[lang];
    });
    docEl.lang = lang === "zh" ? "zh-CN" : "en";
    const toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.querySelector(".lang-current").textContent = lang === "zh" ? "中文" : "EN";
      toggle.querySelector(".lang-next").textContent = lang === "zh" ? "EN" : "中文";
    }
    const isPluginsPage = !!document.getElementById("pl-grid");
    const isPluginDetail = !!document.querySelector(".plp-name");
    if (!isPluginDetail) {
      document.title = isPluginsPage
        ? (lang === "zh" ? "插件市场 — dsher" : "Plugin Marketplace — dsher")
        : (lang === "zh"
          ? "dsher — 玩转 DeepSeek Harness 的人"
          : "dsher — people who play with DeepSeek Harness");
    }
    try { localStorage.setItem(LS_KEY, lang); } catch (e) { /* ignore */ }
    if (isPluginsPage && PLUGINS.length) {
      updateTabs();
      renderPlugins();
    }
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

  /* ---------- plugin marketplace ---------- */
  const plApp = document.getElementById("pl-grid");
  const plEmpty = document.getElementById("pl-empty");
  const plStats = document.getElementById("pl-stats");
  let plFilter = "all";
  let plQuery = "";

  function fmt(tpl, vals) {
    return tpl.replace(/\{(\w+)\}/g, (_, k) => (vals[k] !== undefined ? vals[k] : ""));
  }

  function plText(p) {
    const d = p.desc;
    if (typeof d === "string") return d;
    return (d && d[lang]) || "";
  }

  async function initPlugins() {
    if (!plApp) return;
    try {
      const res = await fetch("/plugins.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("plugins.json " + res.status);
      const data = await res.json();
      PLUGINS = data.plugins || [];
      DATA_UPDATED = data.updated || "";
    } catch (e) {
      plApp.innerHTML = "<p class='pl-empty'>Failed to load plugins.json</p>";
      return;
    }
    updateTabs();
    renderPlugins();
  }

  function plMatches(p, q) {
    return !q || [p.name, p.author, (p.tags || []).join(" "), plText(p)].join(" ").toLowerCase().includes(q);
  }

  function updateTabs() {
    const q = plQuery.trim().toLowerCase();
    const count = (t) => PLUGINS.filter((p) => (t === "all" ? true : p.type === t) && plMatches(p, q)).length;
    document.querySelectorAll(".pl-tab").forEach((tab) => {
      const f = tab.dataset.filter;
      const n = count(f);
      let span = tab.querySelector(".pl-count");
      if (!span) {
        span = document.createElement("span");
        span.className = "pl-count";
        tab.appendChild(span);
      }
      span.textContent = " " + n;
    });
    if (plStats && PLUGINS.length) {
      plStats.textContent = fmt(I18N["pl.stats"][lang], {
        n: PLUGINS.length,
        o: count("official"),
        c: count("community"),
        i: count("index"),
        d: DATA_UPDATED,
      });
    }
  }

  function renderPlugins() {
    if (!plApp || !PLUGINS.length) return;
    updateTabs();
    const q = plQuery.trim().toLowerCase();
    let list = PLUGINS.filter((p) => plFilter === "all" || p.type === plFilter);
    if (q) {
      list = list.filter((p) => plMatches(p, q));
    }
    list.sort((a, b) => {
      const ao = a.type === "official";
      const bo = b.type === "official";
      if (ao !== bo) return ao ? -1 : 1;
      if (ao && bo) return a.name.localeCompare(b.name);
      return (b.stars || 0) - (a.stars || 0);
    });
    plApp.innerHTML = "";
    list.forEach((p) => plApp.appendChild(plCard(p)));
    if (plEmpty) plEmpty.hidden = list.length > 0;
  }

  function plCard(p) {
    const card = document.createElement("article");
    card.className = "pl-card";

    const head = document.createElement("div");
    head.className = "pl-card-head";

    const badge = document.createElement("span");
    badge.className = "pl-badge pl-badge--" + p.type;
    badge.textContent = I18N["pl.filter" + p.type.charAt(0).toUpperCase() + p.type.slice(1)][lang];

    const name = document.createElement("a");
    name.className = "pl-name";
    name.href = "/plugins/" + (p.slug || p.id);
    name.textContent = p.name;
    name.title = p.name;

    head.appendChild(badge);
    head.appendChild(name);

    if (p.stars > 0) {
      const stars = document.createElement("span");
      stars.className = "pl-stars";
      stars.textContent = "★ " + p.stars.toLocaleString();
      stars.title = "GitHub stars";
      head.appendChild(stars);
    }
    card.appendChild(head);

    const author = document.createElement("div");
    author.className = "pl-author";
    author.textContent = "@" + p.author;
    card.appendChild(author);

    const desc = document.createElement("p");
    desc.className = "pl-desc";
    desc.textContent = plText(p);
    card.appendChild(desc);

    const tags = document.createElement("div");
    tags.className = "pl-tags";
    (p.tags || []).forEach((t) => {
      const chip = document.createElement("span");
      chip.className = "pl-tag";
      chip.textContent = t;
      tags.appendChild(chip);
    });
    card.appendChild(tags);

    const foot = document.createElement("div");
    foot.className = "pl-card-foot";

    if (p.install) {
      const row = document.createElement("div");
      row.className = "pl-install";
      const code = document.createElement("span");
      code.className = "pl-install-code";
      code.textContent = p.install;
      code.title = p.install;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pl-copy-btn";
      const label = document.createElement("span");
      label.className = "pl-copy-label";
      label.textContent = I18N["quickstart.copy"][lang];
      btn.appendChild(label);
      btn.addEventListener("click", () => {
        const done = () => {
          label.textContent = I18N["quickstart.copied"][lang];
          btn.classList.add("copied");
          setTimeout(() => {
            label.textContent = I18N["quickstart.copy"][lang];
            btn.classList.remove("copied");
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(p.install).then(done).catch(() => fallbackCopy(p.install, done));
        } else {
          fallbackCopy(p.install, done);
        }
      });
      row.appendChild(code);
      row.appendChild(btn);
      foot.appendChild(row);
    } else if (p.type === "official") {
      const note = document.createElement("span");
      note.className = "pl-builtin-note";
      note.textContent = p.name.startsWith("examples/") ? I18N["pl.example"][lang] : I18N["pl.builtin"][lang];
      foot.appendChild(note);
    }

    const repo = document.createElement("a");
    repo.className = "pl-repo-btn";
    repo.href = p.repo;
    repo.target = "_blank";
    repo.rel = "noopener";
    repo.innerHTML = '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>'
      + I18N["pl.repo"][lang];
    foot.appendChild(repo);

    card.appendChild(foot);
    return card;
  }

  const plSearch = document.getElementById("pl-search");
  if (plSearch) {
    plSearch.addEventListener("input", () => {
      plQuery = plSearch.value;
      renderPlugins();
    });
  }
  document.querySelectorAll(".pl-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".pl-tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      plFilter = tab.dataset.filter;
      renderPlugins();
    });
  });

  initPlugins();

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
