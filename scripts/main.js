/**
 * 同等学力申硕 — 信息手册
 * Main JavaScript
 */

(function () {
    'use strict';

    // ========== 配置 ==========
    const SITE_CONFIG = {
        title: '同等学力申硕',
        subtitle: '报考信息手册',
        lastUpdated: '2026-06-28',
        nav: [
            {
                section: '总览',
                items: [
                    { href: 'index.html', icon: '🏠', label: '首页' }
                ]
            },
            {
                section: '报考指南',
                items: [
                    { href: 'guide.html', icon: '📋', label: '报考流程' },
                    { href: 'policy.html', icon: '📜', label: '政策法规' },
                    { href: 'exam.html', icon: '📝', label: '考试备考' },
                    { href: 'cost.html', icon: '💰', label: '费用明细' }
                ]
            },
            {
                section: '院校专业',
                items: [
                    { href: 'universities.html', icon: '🏛️', label: '院校库' }
                ]
            },
            {
                section: '重要提醒',
                items: [
                    { href: 'scam-alert.html', icon: '⚠️', label: '防骗指南' },
                    { href: 'faq.html', icon: '❓', label: '常见问题' }
                ]
            }
        ],
        pageOrder: [
            'index.html', 'guide.html', 'policy.html', 'exam.html',
            'cost.html', 'universities.html', 'scam-alert.html', 'faq.html'
        ],
        pageNames: {
            'index.html': '首页',
            'guide.html': '报考流程',
            'policy.html': '政策法规',
            'exam.html': '考试备考',
            'cost.html': '费用明细',
            'universities.html': '院校库',
            'scam-alert.html': '防骗指南',
            'faq.html': '常见问题'
        }
    };

    // ========== 当前页面 ==========
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // ========== 渲染侧边栏 ==========
    function renderSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;

        let html = '<div class="sidebar-header">';
        html += '<div class="site-title">📘 ' + SITE_CONFIG.title + '</div>';
        html += '<div class="site-subtitle">' + SITE_CONFIG.subtitle + '</div>';
        html += '</div>';
        html += '<nav class="sidebar-nav">';

        SITE_CONFIG.nav.forEach(section => {
            html += '<div class="nav-section">';
            html += '<div class="nav-section-title">' + section.section + '</div>';
            section.items.forEach(item => {
                const active = item.href === currentPath ? ' class="active"' : '';
                html += '<a href="' + item.href + '"' + active + '>';
                html += '<span class="nav-icon">' + item.icon + '</span> ' + item.label;
                html += '</a>';
            });
            html += '</div>';
        });

        html += '</nav>';

        // 打赏区域
        html += '<div class="sidebar-donate">';
        html += '<div class="sidebar-donate-title">☕ 支持本站</div>';
        html += '<button class="sidebar-donate-btn" id="donateBtn" aria-expanded="false" aria-controls="donatePanel">';
        html += '<span>请我喝杯咖啡</span><span class="donate-arrow">▼</span>';
        html += '</button>';
        html += '<div class="sidebar-donate-panel" id="donatePanel" role="region" aria-label="打赏收款码">';
        html += '<p class="donate-desc">如果本站对你有帮助，欢迎打赏支持，我会持续更新维护。</p>';
        html += '<div class="donate-qr">';
        html += '<img src="images/donate.png" alt="微信支付收款码" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">';
        html += '<p class="donate-placeholder" style="display:none">请上传收款码图片到 images/donate.png</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        sidebar.innerHTML = html;

        // 绑定打赏按钮事件
        const donateBtn = document.getElementById('donateBtn');
        const donatePanel = document.getElementById('donatePanel');
        if (donateBtn && donatePanel) {
            donateBtn.addEventListener('click', () => {
                const isOpen = donatePanel.classList.contains('open');
                donatePanel.classList.toggle('open');
                donateBtn.classList.toggle('open');
                donateBtn.setAttribute('aria-expanded', !isOpen);
            });
        }
    }

    // ========== 侧边栏切换（移动端）==========
    function initSidebarToggle() {
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

            sidebar.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('open');
                        if (overlay) overlay.classList.remove('open');
                    }
                });
            });
        }
    }

    // ========== 回到顶部按钮 ==========
    function initBackToTop() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', '回到顶部');
        btn.innerHTML = '↑';
        document.body.appendChild(btn);

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        btn.classList.add('show');
                    } else {
                        btn.classList.remove('show');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ========== 上一页/下一页导航 ==========
    function initPrevNext() {
        const content = document.querySelector('.content');
        const footer = document.querySelector('.page-footer');
        if (!content || !footer) return;

        const idx = SITE_CONFIG.pageOrder.indexOf(currentPath);
        if (idx === -1) return;

        const prevIdx = idx - 1;
        const nextIdx = idx + 1;
        const prevPage = prevIdx >= 0 ? SITE_CONFIG.pageOrder[prevIdx] : null;
        const nextPage = nextIdx < SITE_CONFIG.pageOrder.length ? SITE_CONFIG.pageOrder[nextIdx] : null;

        if (!prevPage && !nextPage) return;

        const nav = document.createElement('nav');
        nav.className = 'prev-next-nav';
        nav.setAttribute('aria-label', '页面导航');

        let html = '';
        if (prevPage) {
            html += '<a href="' + prevPage + '" class="pn-link pn-prev">';
            html += '<span class="pn-label">← 上一页</span>';
            html += '<span class="pn-title">' + SITE_CONFIG.pageNames[prevPage] + '</span>';
            html += '</a>';
        } else {
            html += '<span class="pn-link pn-prev pn-disabled"></span>';
        }

        if (nextPage) {
            html += '<a href="' + nextPage + '" class="pn-link pn-next">';
            html += '<span class="pn-label">下一页 →</span>';
            html += '<span class="pn-title">' + SITE_CONFIG.pageNames[nextPage] + '</span>';
            html += '</a>';
        } else {
            html += '<span class="pn-link pn-next pn-disabled"></span>';
        }

        nav.innerHTML = html;
        content.parentNode.insertBefore(nav, footer);
    }

    // ========== 最后更新时间 ==========
    function initLastUpdated() {
        const footer = document.querySelector('.page-footer');
        if (!footer) return;

        const p = document.createElement('p');
        p.className = 'last-updated';
        p.textContent = '📅 最后更新：' + SITE_CONFIG.lastUpdated;
        footer.insertBefore(p, footer.firstChild);
    }

    // ========== Skip Link ==========
    function initSkipLink() {
        const skip = document.createElement('a');
        skip.href = '#main-content';
        skip.className = 'skip-link';
        skip.textContent = '跳到主要内容';
        document.body.insertBefore(skip, document.body.firstChild);

        const main = document.querySelector('.main-content');
        if (main) main.id = 'main-content';
    }

    // ========== Giscus 评论 ==========
    function initGiscus() {
        const container = document.getElementById('giscus-comments');
        if (!container) return;

        const GISCUS_REPO = 'SmartBigBoy/TDXL';
        const GISCUS_REPO_ID = 'R_kgDOTCHdUQ';
        const GISCUS_CATEGORY = 'General';
        const GISCUS_CATEGORY_ID = 'DIC_kwDOTCHdUc4C_ry5';

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
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', 'preferred_color_scheme');
        script.setAttribute('data-lang', 'zh-CN');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        container.appendChild(script);
    }

    // ========== 平滑滚动 ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const id = this.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', id);
                }
            });
        });
    }

    // ========== FAQ 手风琴 ==========
    function initFaqAccordion() {
        if (currentPath !== 'faq.html') return;

        const content = document.querySelector('.content');
        if (!content) return;

        const headings = content.querySelectorAll('h3[id^="q"]');
        if (headings.length === 0) return;

        headings.forEach(h3 => {
            const id = h3.id;
            const questionText = h3.textContent;

            const wrapper = document.createElement('div');
            wrapper.className = 'faq-item';

            const button = document.createElement('button');
            button.className = 'faq-question';
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-controls', 'faq-content-' + id);
            button.innerHTML = '<span class="faq-q-text">' + questionText + '</span><span class="faq-icon">+</span>';

            const answer = document.createElement('div');
            answer.className = 'faq-answer';
            answer.id = 'faq-content-' + id;
            answer.setAttribute('role', 'region');
            answer.setAttribute('aria-labelledby', id);

            let next = h3.nextElementSibling;
            while (next && next.tagName !== 'H3') {
                const sibling = next.nextElementSibling;
                answer.appendChild(next);
                next = sibling;
            }

            h3.parentNode.insertBefore(wrapper, h3);
            wrapper.appendChild(button);
            wrapper.appendChild(answer);
            h3.remove();

            button.addEventListener('click', () => {
                const isOpen = wrapper.classList.contains('open');
                wrapper.classList.toggle('open');
                button.setAttribute('aria-expanded', !isOpen);
            });
        });
    }

    // ========== 院校库功能 ==========
    function initUniversitiesPage() {
        if (currentPath !== 'universities.html') return;

        fetch('data/universities.json')
            .then(res => res.json())
            .then(universities => {
                const majorSet = new Set();
                universities.forEach(u => u.majors.forEach(m => majorSet.add(m)));
                const allMajors = Array.from(majorSet).sort();

                const majorSel = document.getElementById('filterMajor');
                if (majorSel) {
                    allMajors.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m;
                        opt.textContent = m;
                        majorSel.appendChild(opt);
                    });
                }

                function renderTable(region, tier, major, keyword) {
                    const tbody = document.getElementById('uniBody');
                    const count = document.getElementById('uniCount');
                    if (!tbody || !count) return;

                    const kw = keyword ? keyword.trim().toLowerCase() : '';

                    const filtered = universities.filter(u => {
                        if (region !== 'all' && u.region !== region) return false;
                        if (tier !== 'all' && u.tier !== tier) return false;
                        if (major !== 'all' && !u.majors.includes(major)) return false;
                        if (kw) {
                            const matchName = u.name.toLowerCase().includes(kw);
                            const matchMajor = u.majors.some(m => m.toLowerCase().includes(kw));
                            if (!matchName && !matchMajor) return false;
                        }
                        return true;
                    });

                    count.textContent = '共 ' + filtered.length + ' 所院校';

                    if (filtered.length === 0) {
                        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:40px">没有匹配的院校，试试调整筛选条件</td></tr>';
                        return;
                    }

                    tbody.innerHTML = filtered.map(u => {
                        const tierLabel = u.tier === '985' ? '985' : u.tier === '211' ? '211' : '普通院校';
                        const tagClass = 'tag-' + u.region;
                        return '<tr>' +
                            '<td data-label="院校名称"><a href="' + u.url + '" class="uni-name-link" target="_blank" rel="noopener">' + u.name + ' ↗</a></td>' +
                            '<td data-label="地区"><span class="uni-tag-sm ' + tagClass + '">' + u.region + '</span></td>' +
                            '<td data-label="层次"><span class="uni-tag-sm tag-' + u.tier + '">' + tierLabel + '</span></td>' +
                            '<td data-label="招生专业"><div class="uni-majors">' +
                            u.majors.map(m => '<a href="' + u.url + '" target="_blank" rel="noopener" class="uni-major-link">' + m + '</a>').join('') +
                            '</div></td>' +
                            '</tr>';
                    }).join('');
                }

                function update() {
                    renderTable(
                        document.getElementById('filterRegion').value,
                        document.getElementById('filterTier').value,
                        document.getElementById('filterMajor').value,
                        document.getElementById('uniSearch') ? document.getElementById('uniSearch').value : ''
                    );
                }

                const regionSel = document.getElementById('filterRegion');
                const tierSel = document.getElementById('filterTier');
                const majorSel2 = document.getElementById('filterMajor');
                const searchInput = document.getElementById('uniSearch');

                if (regionSel) regionSel.addEventListener('change', update);
                if (tierSel) tierSel.addEventListener('change', update);
                if (majorSel2) majorSel2.addEventListener('change', update);
                if (searchInput) {
                    searchInput.addEventListener('input', () => {
                        clearTimeout(searchInput._timer);
                        searchInput._timer = setTimeout(update, 150);
                    });
                }

                update();
            })
            .catch(err => {
                console.error('加载院校数据失败:', err);
                const tbody = document.getElementById('uniBody');
                if (tbody) {
                    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--danger);padding:40px">院校数据加载失败，请刷新重试</td></tr>';
                }
            });
    }

    // ========== 初始化 ==========
    document.addEventListener('DOMContentLoaded', function() {
        renderSidebar();
        initSidebarToggle();
        initBackToTop();
        initPrevNext();
        initLastUpdated();
        initSkipLink();
        initSmoothScroll();
        initFaqAccordion();
        initUniversitiesPage();
    });

    if (document.readyState === 'complete') {
        // 已加载完成的话，评论后加载
        window.addEventListener('load', initGiscus);
    } else {
        window.addEventListener('load', initGiscus);
    }

})();
