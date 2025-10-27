(function (global) {
    const tokens = {
        colors: {
            background: '#f5f2ec',
            backgroundMuted: '#ebe4d8',
            surface: '#ffffff',
            surfaceSubtle: '#f8f4ec',
            primary: '#0f2f4d',
            primarySoft: '#1a466d',
            primaryStrong: '#0a2138',
            secondary: '#1c7a7f',
            secondarySoft: '#2f8d92',
            accent: '#c59a3b',
            accentStrong: '#b48528',
            neutral: '#6b7884',
            border: '#d8cab8',
            borderStrong: '#c3b39e',
            success: '#3fae8b',
            warning: '#f2a227',
            danger: '#db5c4a',
            textPrimary: '#142033',
            textSecondary: '#4c5a67',
            textMuted: '#7c8894',
            onPrimary: '#fdf9f1',
            onSecondary: '#f4fbfb',
            onAccent: '#0f1720'
        },
        typography: {
            fontFamily: "'Inter', 'Manrope', 'Segoe UI', sans-serif",
            headingWeight: 600,
            bodyWeight: 400,
            lineHeight: 1.6
        },
        radii: {
            xs: '6px',
            sm: '10px',
            md: '14px',
            lg: '20px',
            pill: '999px'
        },
        shadows: {
            xs: '0 1px 2px rgba(12, 30, 52, 0.08)',
            sm: '0 4px 14px rgba(12, 30, 52, 0.08)',
            md: '0 10px 30px rgba(12, 30, 52, 0.12)',
            lg: '0 22px 45px rgba(12, 30, 52, 0.16)'
        },
        transitions: {
            base: 'all 0.25s ease',
            emphasized: 'all 0.35s cubic-bezier(0.33, 1, 0.68, 1)'
        }
    };

    function applyTokens(root = document.documentElement) {
        const colorEntries = Object.entries(tokens.colors).map(([key, value]) => [`--color-${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`, value]);

        const variableMap = [
            ...colorEntries,
            ['--background', tokens.colors.background],
            ['--foreground', tokens.colors.textPrimary],
            ['--muted', tokens.colors.backgroundMuted],
            ['--muted-foreground', tokens.colors.textMuted],
            ['--border', tokens.colors.border],
            ['--border-strong', tokens.colors.borderStrong],
            ['--accent', tokens.colors.accent],
            ['--accent-foreground', tokens.colors.onAccent],
            ['--focus-ring', 'rgba(197, 154, 59, 0.35)'],
            ['--shadow-xs', tokens.shadows.xs],
            ['--shadow-sm', tokens.shadows.sm],
            ['--shadow-md', tokens.shadows.md],
            ['--shadow-lg', tokens.shadows.lg],
            ['--radius-xs', tokens.radii.xs],
            ['--radius-sm', tokens.radii.sm],
            ['--radius-md', tokens.radii.md],
            ['--radius-lg', tokens.radii.lg],
            ['--radius-pill', tokens.radii.pill],
            ['--font-family-base', tokens.typography.fontFamily],
            ['--font-weight-heading', tokens.typography.headingWeight],
            ['--font-weight-body', tokens.typography.bodyWeight],
            ['--line-height-base', tokens.typography.lineHeight],
            ['--transition-base', tokens.transitions.base],
            ['--transition-emphasized', tokens.transitions.emphasized],
            ['--gradient-brand', `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.primarySoft} 45%, ${tokens.colors.accent} 100%)`]
        ];

        variableMap.forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    const designSystem = {
        tokens,
        applyTokens,
        getToken(path) {
            const [group, token] = path.split('.');
            if (!group || !token || !tokens[group]) return undefined;
            return tokens[group][token];
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = designSystem;
    } else {
        global.DesignSystem = designSystem;
    }

    if (typeof document !== 'undefined') {
        const run = () => applyTokens();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', run, { once: true });
        } else {
            run();
        }
    }
})(typeof window !== 'undefined' ? window : globalThis);
