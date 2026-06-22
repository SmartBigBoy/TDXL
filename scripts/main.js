/**
 * 同等学力申硕 — 信息手册
 * Main JavaScript
 */

(function () {
    'use strict';

    // ========== Sidebar Toggle (Mobile) ==========
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const toggleBtn = document.querySelector('.sidebar-toggle');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('open');
        });

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('open');
            });
        }

        // Close sidebar when clicking a nav link (mobile)
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('open');
                }
            });
        });
    }

    // ========== Highlight Current Page in Sidebar ==========
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPath) a.classList.add('active');
    });

    // ========== Giscus Comments ==========
    // To enable comments:
    // 1. Go to your repo → Settings → General → enable "Discussions"
    // 2. Install https://github.com/apps/giscus
    // 3. Go to https://giscus.app to configure, then paste your data-repo/data-repo-id below
    function initGiscus() {
        const container = document.getElementById('giscus-comments');
        if (!container) return;

        // ── 配置区域 ──
        const GISCUS_REPO = 'SmartBigBoy/TDXL';
        const GISCUS_REPO_ID = '';         // ⬅ 去 giscus.app 获取
        const GISCUS_CATEGORY = 'General';
        const GISCUS_CATEGORY_ID = '';     // ⬅ 去 giscus.app 获取
        // ──────────────

        if (!GISCUS_REPO_ID || !GISCUS_CATEGORY_ID) {
            container.innerHTML =
                '<div style="padding:20px;background:#FBF0EE;border-radius:8px;font-size:0.9rem">' +
                '<strong style="color:#B85450">💬 评论功能待配置</strong>' +
                '<p style="margin-top:8px;color:var(--text-secondary)">站长请按以下步骤操作：</p>' +
                '<ol style="margin-top:6px;padding-left:18px;color:var(--text-secondary);line-height:1.8">' +
                '<li>去仓库 <strong>Settings → General</strong>，勾选 <strong>Discussions</strong></li>' +
                '<li>安装 <a href="https://github.com/apps/giscus" target="_blank">Giscus App</a> 到本仓库</li>' +
                '<li>访问 <a href="https://giscus.app" target="_blank">giscus.app</a>，输入仓库名 <code>SmartBigBoy/TDXL</code></li>' +
                '<li>把生成的 <code>data-repo-id</code> 和 <code>data-category-id</code> 填入 <code>scripts/main.js</code></li>' +
                '</ol></div>';
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', GISCUS_REPO);
        script.setAttribute('data-repo-id', GISCUS_REPO_ID);
        script.setAttribute('data-category', GISCUS_CATEGORY);
        script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', 'light');
        script.setAttribute('data-lang', 'zh-CN');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        container.appendChild(script);
    }

    // Load Giscus after page load
    if (document.readyState === 'complete') {
        initGiscus();
    } else {
        window.addEventListener('load', initGiscus);
    }

    // ========== Smooth Scroll for Anchor Links ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL without jumping
                history.pushState(null, '', id);
            }
        });
    });

})();
