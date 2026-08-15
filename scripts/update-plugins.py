#!/usr/bin/env python3
"""Refresh plugins.json for the dsher.cn plugin marketplace.

Preserves the curated official entries and re-fetches community/index
entries (stars, descriptions) live from the GitHub API (topic:dsh-plugin).

Usage:
    python3 scripts/update-plugins.py            # needs network (set https_proxy if required)
"""
import json
import os
import sys
import urllib.request
from datetime import date

REPO = os.path.join(os.path.dirname(__file__), "..", "plugins.json")
API = "https://api.github.com/search/repositories?q=topic:dsh-plugin&sort=stars&order=desc&per_page=100"

# full_name -> (type, tags, install command or None)
CURATED = {
    # community plugins
    "zhu1090093659/dsh-web-ui": ("community", ["web-ui", "皮肤", "工具面板"], "dsh plugin add github:zhu1090093659/dsh-web-ui"),
    "liustack/modlens": ("community", ["视觉", "vision"], "dsh plugin add github:liustack/modlens"),
    "ccch1mneyyy/dsh-TUI": ("community", ["终端", "tui"], "dsh plugin add github:ccch1mneyyy/dsh-TUI"),
    "omdsh-dev/DSH-better-sidebar": ("community", ["web-ui", "侧边栏"], "dsh plugin add github:omdsh-dev/DSH-better-sidebar"),
    "yejiming/MuseAI": ("community", ["角色扮演", "ai"], "dsh plugin add github:yejiming/MuseAI"),
    "Small-tailqwq/dsh-deep-whale": ("community", ["皮肤", "鲸鱼"], None),
    "Anionex/dsh-vision-toolkit": ("community", ["视觉", "ocr"], "dsh plugin add github:Anionex/dsh-vision-toolkit"),
    "Nagi-ovo/dsh-ads": ("community", ["趣味", "web-ui"], "dsh plugin add github:Nagi-ovo/dsh-ads"),
    "NanmiCoder/dsh-agent-teams": ("community", ["多智能体"], "dsh plugin add github:NanmiCoder/dsh-agent-teams"),
    "huiliyi37/dsh-tianshu-tui": ("community", ["终端", "workflow"], "dsh plugin add github:huiliyi37/dsh-tianshu-tui"),
    "vlln/whale-girl": ("community", ["皮肤", "桌面宠物"], None),
    "omdsh-dev/dsh-at-file": ("community", ["编辑器", "@引用"], "dsh plugin add github:omdsh-dev/dsh-at-file"),
    "liustack/modsearch": ("community", ["搜索", "web"], "dsh plugin add github:liustack/modsearch"),
    "Lum1104/dsh-browser": ("community", ["浏览器", "自动化"], "dsh plugin add github:Lum1104/dsh-browser"),
    "Nagi-ovo/dsh-visualize": ("community", ["生成式ui"], "dsh plugin add github:Nagi-ovo/dsh-visualize"),
    "omdsh-dev/dsh-genui": ("community", ["生成式ui"], "dsh plugin add github:omdsh-dev/dsh-genui"),
    "ZSeven-W/dsh-openpencil": ("community", ["设计", "预览"], "dsh plugin add github:ZSeven-W/dsh-openpencil"),
    "Ruler4396/dsh-launcher": ("community", ["windows", "启动器"], None),
    "icetomoyo/dsh_workflow": ("community", ["workflow"], "dsh plugin add github:icetomoyo/dsh_workflow"),
    "omdsh-dev/dsh-open-in-vscode": ("community", ["vscode", "开发"], "dsh plugin add github:omdsh-dev/dsh-open-in-vscode"),
    "omdsh-dev/dsh-notification": ("community", ["通知"], "dsh plugin add github:omdsh-dev/dsh-notification"),
    "Anionex/dsh-turn-rewind": ("community", ["回退", "状态"], "dsh plugin add github:Anionex/dsh-turn-rewind"),
    "csyangwen/dsh-memory-evolve": ("community", ["记忆", "进化"], "dsh plugin add github:csyangwen/dsh-memory-evolve"),
    "omdsh-dev/dsh-annotation": ("community", ["批注", "web-ui"], "dsh plugin add github:omdsh-dev/dsh-annotation"),
    "multica-ai/dsh-multica-runtime": ("community", ["运行时"], None),
    "lhh010/dsh-ui-whale": ("community", ["皮肤", "鲸鱼"], None),
    "titanwings/dsh-automation": ("community", ["自动化", "定时任务"], "dsh plugin add github:titanwings/dsh-automation"),
    "Chinesezjc/dsh-interconnect": ("community", ["互联", "消息"], "dsh plugin add github:Chinesezjc/dsh-interconnect"),
    "omdsh-dev/dsh-custom-tool": ("community", ["工具", "开发"], "dsh plugin add github:omdsh-dev/dsh-custom-tool"),
    "vibeinging/dsh-work": ("community", ["工作台"], None),
    "whiteguo233/dsh-openbiliclaw": ("community", ["内容发现"], "dsh plugin add github:whiteguo233/dsh-openbiliclaw"),
    "ysr666/dsh-vision-router": ("community", ["视觉"], "dsh plugin add github:ysr666/dsh-vision-router"),
    "HuanLinOTO/dsh-plugin-mineru": ("community", ["文档解析"], "dsh plugin add github:HuanLinOTO/dsh-plugin-mineru"),
    "shaokeyibb/dsh-plugin-product-subagents": ("community", ["多智能体"], "dsh plugin add github:shaokeyibb/dsh-plugin-product-subagents"),
    "cpj-dev/dsh-plugin-cc": ("community", ["claude-code", "桥接"], "dsh plugin add github:cpj-dev/dsh-plugin-cc"),
    "bugmaker2/dsh-plugin-template": ("community", ["开发", "模板"], None),
    "iuikj/dsh-desktop": ("community", ["桌面端"], None),
    "bruc3van/dsh-desktop": ("community", ["桌面端"], None),
    "hust-open-atom-club/oh-dsh": ("community", ["发行版"], None),
    "anywhere-labs/deepseek-harness-desktop": ("community", ["桌面端"], None),
    "ChisaAlter/Deepseek-Harness-Desktop": ("community", ["桌面端"], None),
    "gameswu/dsh-plugin-background": ("community", ["壁纸", "皮肤"], None),
    # index / registry
    "AdamPlatin123/awesome-dsh-plugins": ("index", ["精选", "雷达"], None),
    "awesome-dsh-plugin/awesome-dsh-plugin": ("index", ["精选"], None),
    "0xsline/awesome-deepseek-harness": ("index", ["精选", "生态"], None),
    "bruc3van/awesome-dsh-plugin": ("index", ["精选", "导购"], None),
    "Nagi-ovo/dsh-find-plugins": ("index", ["查找"], None),
    "Alex-Yanggg/awesome-DSH-plugin": ("index", ["精选"], None),
    "bradeGithub/DSH-Plugins-Marketplace": ("index", ["市场", "web-ui"], None),
    "ZASENJC/dsh-plugins-store": ("index", ["市场", "目录站"], None),
    "hikariming/dshfind": ("index", ["市场", "教程"], None),
    "libukai/awesome-deepseek-harness": ("index", ["精选", "指南"], None),
    "Dominic789654/awesome-deepseek-harness": ("index", ["精选"], None),
    "LaplaceYoung/oh-my-dsh": ("index", ["生态", "700+"], None),
    "vlln/plugin-registry": ("index", ["基建", "插件注册"], None),
    "omdsh-dev/dsh-plugin-check": ("index", ["开发", "健康检查"], None),
    "omdsh-dev/dsh-plugin-dev": ("index", ["开发", "文档"], None),
    "omdsh-dev/dsh-plugin-skills": ("index", ["开发", "技能"], None),
    "pingfanfan/hello-dsh": ("index", ["教程", "入门"], None),
    "Electricitysheep/dsh-handbook": ("index", ["手册"], None),
}

# The topic-search top 100 is only a metadata source and its ranking
# boundary shifts between runs, so low-star curated repos can drop out.
# Any curated repo missing from the search is therefore fetched directly
# (see fetch_missing_curated) — curated entries never silently vanish.


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "dsher-marketplace", "Accept": "application/vnd.github+json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def main():
    try:
        existing = json.load(open(REPO, encoding="utf-8"))
    except FileNotFoundError:
        sys.exit(f"plugins.json not found at {REPO}; run from the repo root")

    official = [p for p in existing["plugins"] if p["type"] == "official"]
    print(f"preserving {len(official)} official entries")

    items = get_json(API)["items"]
    by_name = {r["full_name"].lower(): r for r in items}
    # Fetch any curated repo that the search slice missed, directly.
    missing = [repo for repo in CURATED if repo.lower() not in by_name]
    for repo in missing:
        try:
            by_name[repo.lower()] = get_json(f"https://api.github.com/repos/{repo}")
            print(f"direct fetch: {repo}")
        except Exception as e:
            print(f"skip {repo}: {e}")

    fresh = []
    for repo, (typ, tags, install) in CURATED.items():
        r = by_name.get(repo.lower())
        if not r:
            print(f"skip (not found): {repo}")
            continue
        fresh.append({
            "id": repo.split("/")[-1], "name": repo.split("/")[-1],
            "author": repo.split("/")[0], "type": typ, "repo": r["html_url"],
            "stars": r["stargazers_count"],
            "desc": (r.get("description") or "").strip(),
            "tags": tags, "install": install,
        })

    order = {"official": 0, "community": 1, "index": 2}
    all_plugins = official + fresh
    all_plugins.sort(key=lambda p: (order[p["type"]], 0 if p["type"] == "official" else -(p["stars"] or 0),
                                    p["name"] if p["type"] == "official" else ""))

    # unique lowercase slug for detail-page filenames (filesystem-safe,
    # case-insensitively unique: name, or author-name on collision)
    from collections import Counter
    lower_names = [p["name"].lower() for p in all_plugins]
    name_counts = Counter(lower_names)
    for p in all_plugins:
        base = p["name"].lower().replace("/", "-")
        p["slug"] = base if name_counts[p["name"].lower()] == 1 else f"{p['author']}-{p['name']}".lower().replace("/", "-")

    out = {"updated": date.today().isoformat(), "source": "GitHub topic:dsh-plugin + deepseek-harness repo",
           "plugins": all_plugins}
    json.dump(out, open(REPO, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"plugins.json updated: {len(all_plugins)} entries "
          f"({sum(1 for p in all_plugins if p['type'] == 'official')} official, "
          f"{sum(1 for p in all_plugins if p['type'] == 'community')} community, "
          f"{sum(1 for p in all_plugins if p['type'] == 'index')} index)")

    # regenerate static plugin detail pages + sitemap from the fresh data
    try:
        from generate_plugin_pages import main as gen_main
        gen_main()
    except Exception as e:
        print(f"note: plugin pages not regenerated ({e}); run scripts/generate-plugin-pages.py manually")


if __name__ == "__main__":
    main()
