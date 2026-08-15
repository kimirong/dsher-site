#!/usr/bin/env python3
"""Generate static plugin detail pages (/plugins/<id>.html) and sitemap.xml
from plugins.json. Run after refreshing data:

    python3 scripts/update-plugins.py   # refresh data, then this runs automatically
    # or standalone:
    python3 scripts/generate-plugin-pages.py
"""
import json
import os
import re
from html import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "plugins.json")
OUT_DIR = os.path.join(ROOT, "plugins")
SITEMAP = os.path.join(ROOT, "sitemap.xml")
SITE = "https://dsher.cn"


def pl_text(p, lang="zh"):
    d = p["desc"]
    if isinstance(d, str):
        return d
    return d.get(lang) or d.get("zh") or d.get("en") or ""


def clean(s):
    return re.sub(r"\s+", " ", s).strip()


def short_desc(p, limit=110):
    return clean(pl_text(p))[:limit]


def badge(type_):
    labels = {"official": "官方", "community": "社区", "index": "索引"}
    return labels.get(type_, type_)


def more_plugins(plugins, current, n=3):
    same = [p for p in plugins if p["type"] == current["type"] and p["id"] != current["id"]]
    same.sort(key=lambda p: -(p.get("stars") or 0))
    return same[:n]


def json_ld(p, desc):
    item = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": p["name"],
                "url": p["repo"],
                "description": clean(desc),
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "DeepSeek Harness (dsh)",
                "author": {"@type": "Organization", "name": p["author"]},
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "dsher.cn", "item": SITE + "/"},
                    {"@type": "ListItem", "position": 2, "name": "插件市场", "item": SITE + "/plugins.html"},
                    {"@type": "ListItem", "position": 3, "name": p["name"]},
                ],
            },
        ],
    }
    return json.dumps(item, ensure_ascii=False, separators=(",", ":"))


NAV = """  <header class="nav">
    <div class="nav-inner">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true">&gt;_</span>
        <span class="brand-name">dsher</span>
      </a>
      <nav class="nav-links" aria-label="main">
        <a href="/#about" data-i18n="nav.about">关于</a>
        <a href="/#features" data-i18n="nav.features">特性</a>
        <a href="/#quickstart" data-i18n="nav.quickstart">快速上手</a>
        <a href="/plugins" data-i18n="nav.plugins">插件市场</a>
        <a href="/#community" data-i18n="nav.community">社区</a>
      </nav>
      <div class="nav-actions">
        <button class="lang-toggle" id="lang-toggle" type="button" aria-label="切换语言">
          <span class="lang-current">中文</span>
          <span class="lang-arrow" aria-hidden="true">⇄</span>
          <span class="lang-next">EN</span>
        </button>
        <a class="btn btn--ghost btn--sm" href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener">
          <svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
          <span class="gh-label">GitHub</span>
        </a>
      </div>
    </div>
  </header>"""

FOOTER = """  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-brand">dsher<span class="footer-dot" aria-hidden="true">.</span>cn</p>
      <p class="footer-disclaimer" data-i18n="footer.disclaimer">本站是 dsher 社区的非官方页面，与 DeepSeek AI 无隶属关系。DeepSeek Harness (dsh) 是 DeepSeek AI 的 MIT 开源项目；文中商标归各自所有者所有。</p>
      <p class="footer-meta">© <span id="year">2026</span> dsher.cn · <span data-i18n="footer.built">用 ❤ 和 dsh 搭的</span></p>
    </div>
  </footer>"""


def page_html(p, plugins):
    desc = pl_text(p)
    name = escape(p["name"])
    author = escape(p["author"])
    title = f"{name} — DeepSeek Harness 插件 | dsher.cn"
    meta_desc = short_desc(p)
    if p.get("install"):
        meta_desc = f"{meta_desc} 安装：{p['install']}。"
    install = escape(p["install"]) if p.get("install") else None
    builtin_note = ""
    if not install and p["type"] == "official":
        builtin_note = ("官方示例 · 见仓库 examples/" if p["name"].startswith("examples/")
                        else "随 dsh 内置 · 无需单独安装")
    stars = f'<span class="plp-stars" title="GitHub stars">★ {p["stars"]:,}</span>' if p.get("stars") else ""

    more = more_plugins(plugins, p)
    more_html = ""
    if more:
        items = "".join(
            f'<a class="plp-more-item" href="/plugins/{escape(m["slug"])}">'
            f'<span class="plp-more-name">{escape(m["name"])}</span>'
            f'<span class="plp-more-stars">★ {m["stars"]:,}</span></a>'
            for m in more
        )
        more_html = f"""
    <section class="plp-more">
      <h2 data-i18n="pl.detail.more">更多插件</h2>
      <div class="plp-more-grid">{items}
        <a class="plp-more-all" href="/plugins" data-i18n="pl.detail.viewAll">查看全部 →</a>
      </div>
    </section>"""

    tags = "".join(f'<span class="pl-tag">{escape(t)}</span>' for t in (p.get("tags") or []))
    install_html = ""
    if install:
        install_html = f"""      <div class="plp-install">
        <div class="pl-install">
          <span class="pl-install-code">{install}</span>
          <button class="copy-btn" type="button" data-copy="#plp-code"><span class="copy-label" data-i18n="quickstart.copy">复制</span></button>
        </div>
        <pre id="plp-code" hidden>{install}</pre>
        <p class="plp-install-hint" data-i18n="pl.detail.installHint">在 dsh 项目里执行此命令即可安装。</p>
      </div>"""
    elif builtin_note:
        install_html = f'      <div class="plp-install"><p class="plp-builtin">{escape(builtin_note)}</p></div>'

    jsonld = json_ld(p, desc)

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{escape(meta_desc)}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#05070d" />
  <link rel="canonical" href="{SITE}/plugins/{escape(p['slug'])}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="dsher.cn" />
  <meta property="og:url" content="{SITE}/plugins/{escape(p['slug'])}" />
  <meta property="og:title" content="{escape(title)}" />
  <meta property="og:description" content="{escape(meta_desc)}" />
  <meta property="og:image" content="{SITE}/assets/og-image.png" />
  <meta property="og:locale" content="zh_CN" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{escape(title)}" />
  <meta name="twitter:image" content="{SITE}/assets/og-image.png" />
  <script type="application/ld+json">{jsonld}</script>
  <link rel="stylesheet" href="/styles.css" />
  <link rel="stylesheet" href="/plugins.css" />
</head>
<body>
  <div class="bg" aria-hidden="true">
    <div class="bg-grid"></div>
    <div class="bg-glow bg-glow--a"></div>
    <div class="bg-glow bg-glow--b"></div>
  </div>

{NAV}

  <main id="top">
    <nav class="plp-crumb" aria-label="breadcrumb">
      <a href="/">dsher.cn</a> <span aria-hidden="true">/</span>
      <a href="/plugins" data-i18n="nav.plugins">插件市场</a> <span aria-hidden="true">/</span>
      <span class="plp-crumb-current">{name}</span>
    </nav>

    <section class="plp-hero">
      <span class="pl-badge pl-badge--{p['type']}">{badge(p['type'])}</span>
      <h1 class="plp-name">{name}</h1>
      <p class="plp-author">@<span>{author}</span>{stars}</p>
      <p class="plp-desc">{escape(desc)}</p>
      <div class="pl-tags">{tags}</div>
    </section>

    <section class="plp-section">
{install_html}
    </section>

    <section class="plp-actions">
      <a class="btn btn--primary" href="{escape(p['repo'])}" target="_blank" rel="noopener" data-i18n="pl.detail.repo">GitHub 仓库</a>
      <a class="btn btn--ghost" href="/plugins" data-i18n="pl.detail.back">返回插件市场</a>
    </section>
{more_html}
  </main>

{FOOTER}

  <script src="/app.js"></script>
</body>
</html>
"""


def sitemap_xml(plugins):
    urls = [f"""  <url>
    <loc>{SITE}/</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>""", f"""  <url>
    <loc>{SITE}/plugins</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>"""]
    for p in plugins:
        urls.append(f"""  <url>
    <loc>{SITE}/plugins/{p['slug']}</loc>
    <lastmod>2026-08-14</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>""")
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n"


def main():
    data = json.load(open(DATA, encoding="utf-8"))
    plugins = data["plugins"]
    os.makedirs(OUT_DIR, exist_ok=True)
    wanted = {f"{p['slug']}.html" for p in plugins}
    for old in os.listdir(OUT_DIR):
        if old not in wanted:
            os.remove(os.path.join(OUT_DIR, old))
    for p in plugins:
        path = os.path.join(OUT_DIR, f"{p['slug']}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(page_html(p, plugins))
    with open(SITEMAP, "w", encoding="utf-8") as f:
        f.write(sitemap_xml(plugins))
    print(f"generated {len(plugins)} plugin pages under plugins/ + sitemap.xml")


if __name__ == "__main__":
    main()
