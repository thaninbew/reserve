<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auric Filament Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #fbfbfd;
            --auric-gold: #c5a059;
            --auric-glow: rgba(197, 160, 89, 0.15);
            --text-main: #1d1d1f;
            --text-secondary: #86868b;
            --filament-width: 1px;
            --transition: cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
        }

        body {
            background-color: var(--bg);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: var(--text-main);
            overflow-x: hidden;
        }

        /* Auric Filament Suspension Effect */
        .filament-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }

        .filament {
            position: absolute;
            background: linear-gradient(to bottom, transparent, var(--auric-gold), transparent);
            width: var(--filament-width);
            height: 100vh;
            opacity: 0.15;
            animation: suspend 8s ease-in-out infinite alternate;
        }

        @keyframes suspend {
            0% { transform: translateY(-5%) translateX(0); }
            100% { transform: translateY(5%) translateX(10px); }
        }

        .dashboard-wrapper {
            position: relative;
            z-index: 1;
            max-width: 1400px;
            margin: 0 auto;
            padding: 40px 80px;
            min-height: 100vh;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 80px;
            animation: fadeIn 1s var(--transition);
        }

        .brand h1 {
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--auric-gold);
            margin-bottom: 8px;
        }

        .brand p {
            font-size: 32px;
            font-weight: 600;
            letter-spacing: -0.02em;
        }

        .mono-data {
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            color: var(--text-secondary);
        }

        /* Main Grid */
        .grid-layout {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 40px;
        }

        /* The Hero Filament Card */
        .hero-card {
            grid-column: span 8;
            padding: 40px;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px);
            border-left: var(--filament-width) solid var(--auric-gold);
            position: relative;
            transition: transform 0.6s var(--transition);
        }

        .hero-card:hover {
            transform: translateX(5px);
        }

        .hero-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            height: 1px;
            background: var(--auric-gold);
            opacity: 0.3;
        }

        .label {
            font-size: 12px;
            color: var(--text-secondary);
            margin-bottom: 20px;
            display: block;
            letter-spacing: 0.05em;
        }

        .value-large {
            font-size: 64px;
            font-weight: 300;
            margin-bottom: 10px;
        }

        .trend-indicator {
            display: flex;
            align-items: center;
            gap: 8px;
            color: var(--auric-gold);
            font-size: 14px;
        }

        /* Filament Connection Line */
        .connection-line {
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, var(--auric-gold), transparent);
            margin: 30px 0;
            opacity: 0.4;
        }

        /* Secondary Grid Items */
        .side-panel {
            grid-column: span 4;
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        .stat-card {
            padding: 30px;
            border: 1px solid rgba(0,0,0,0.03);
            background: #fff;
            transition: all 0.4s var(--transition);
            position: relative;
            overflow: hidden;
        }

        .stat-card:hover {
            border-color: var(--auric-gold);
            box-shadow: 0 20px 40px var(--auric-glow);
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at center, var(--auric-glow) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.6s ease;
        }

        .stat-card:hover::before {
            opacity: 1;
        }

        .stat-card .value {
            font-size: 24px;
            font-weight: 500;
            margin-top: 10px;
            position: relative;
        }

        /* Data Visualization Filament Style */
        .viz-container {
            grid-column: span 12;
            height: 300px;
            margin-top: 40px;
            position: relative;
            display: flex;
            align-items: flex-end;
            gap: 20px;
            padding-bottom: 40px;
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .bar-filament {
            flex: 1;
            background: #f0f0f2;
            position: relative;
            height: 0%;
            transition: height 1.5s var(--transition);
        }

        .bar-filament::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: var(--auric-gold);
            box-shadow: 0 0 15px var(--auric-gold);
        }

        .nav-dots {
            position: fixed;
            right: 40px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #d2d2d7;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .dot.active {
            background: var(--auric-gold);
            transform: scale(1.5);
            box-shadow: 0 0 10px var(--auric-gold);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .reveal {
            animation: fadeIn 1.2s var(--transition) forwards;
            opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

    </style>
</head>
<body>

    <div class="filament-container" id="filament-bg"></div>

    <div class="dashboard-wrapper">
        <header>
            <div class="brand">
                <h1>Aurum Systems</h1>
                <p>Capital Suspension</p>
            </div>
            <div class="mono-data">
                <span id="timestamp">SYNCING...</span><br>
                LOC: 40.7128° N, 74.0060° W
            </div>
        </header>

        <main class="grid-layout">
            <section class="hero-card reveal">
                <span class="label">AGGREGATED FILAMENT VALUE</span>
                <div class="value-large">$4,892,100.00</div>
                <div class="trend-indicator">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    <span>+12.4% vs Last Epoch</span>
                </div>
                <div class="connection-line"></div>
                <div class="mono-data" style="color: var(--text-main)">
                    ACT_BAL: 4.291 BTC / 88.4 ETH
                </div>
            </section>

            <aside class="side-panel">
                <div class="stat-card reveal delay-1">
                    <span class="label">SYSTEM LUME</span>
                    <div class="value">98.2%</div>
                    <div class="mono-data" style="margin-top:10px; font-size: 10px;">STABLE_ORBIT</div>
                </div>
                <div class="stat-card reveal delay-2">
                    <span class="label">ACTIVE THREADS</span>
                    <div class="value">1,024</div>
                    <div class="mono-data" style="margin-top:10px; font-size: 10px;">LATENCY: 14MS</div>
                </div>
            </aside>

            <section class="viz-container reveal delay-3">
                <div class="bar-filament" style="height: 60%;"></div>
                <div class="bar-filament" style="height: 45%;"></div>
                <div class="bar-filament" style="height: 85%;"></div>
                <div class="bar-filament" style="height: 30%;"></div>
                <div class="bar-filament" style="height: 70%;"></div>
                <div class="bar-filament" style="height: 55%;"></div>
                <div class="bar-filament" style="height: 90%;"></div>
                <div class="bar-filament" style="height: 40%;"></div>
                <div class="bar-filament" style="height: 65%;"></div>
                <div class="bar-filament" style="height: 75%;"></div>
            </section>
        </main>

        <div class="nav-dots">
            <div class="dot active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    </div>

    <script>
        // Generate Background Filaments
        const container = document.getElementById('filament-bg');
        const count = 12;
        
        for (let i = 0; i < count; i++) {
            const f = document.createElement('div');
            f.className = 'filament';
            f.style.left = `${(i * 100) / count}%`;
            f.style.animationDelay = `${i * 0.5}s`;
            f.style.opacity = Math.random() * 0.2;
            container.appendChild(f);
        }

        // Live Timestamp
        function updateTime() {
            const now = new Date();
            const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0') + ':' + 
                          now.getSeconds().toString().padStart(2, '0');
            document.getElementById('timestamp').innerText = `SYS_TIME: ${timeStr}`;
        }
        setInterval(updateTime, 1000);
        updateTime();

        // Staggered Bar Animation
        setTimeout(() => {
            const bars = document.querySelectorAll('.bar-filament');
            bars.forEach((bar, i) => {
                setTimeout(() => {
                    bar.style.opacity = '1';
                }, i * 100);
            });
        }, 1000);

        // Interaction Effect
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            document.querySelectorAll('.filament').forEach((f, i) => {S
                const shift = (i % 2 === 0 ? 1 : -1) * 20;
                f.style.transform = `translateX(${x * shift}px) translateY(${y * shift}px)`;
            });
        });
    </script>
</body>
</html>

