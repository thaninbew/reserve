import React from 'react';

export default function InspoPage() {
    return (
        <div className="bg-[#fbfbfd] min-h-screen text-[#1d1d1f]">
            <style dangerouslySetInnerHTML={{ __html: `
        :root {
            --bg: #fbfbfd;
            --auric-gold: #c5a059;
            --auric-glow: rgba(197, 160, 89, 0.15);
            --text-main: #1d1d1f;
            --text-secondary: #86868b;
            --filament-width: 1px;
            --transition: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .inspo-content * {
            box-sizing: border-box;
            -webkit-font-smoothing: antialiased;
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
        }

        header.inspo-header {
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
            gap: 24px;
        }

        .inspo-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 0, 0, 0.04);
            border-radius: 2px;
            padding: 32px;
            transition: var(--transition);
            position: relative;
            overflow: hidden;
        }

        .inspo-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background: linear-gradient(90deg, transparent, var(--auric-gold), transparent);
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .inspo-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
            border-color: rgba(197, 160, 89, 0.2);
        }

        .inspo-card:hover::before {
            opacity: 1;
        }

        .col-span-8 { grid-column: span 8; }
        .col-span-4 { grid-column: span 4; }
        .col-span-3 { grid-column: span 3; }

        .card-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
            width: 100%;
        }

        .card-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .value-display {
            font-size: 48px;
            font-family: 'JetBrains Mono', monospace;
            font-weight: 400;
            letter-spacing: -0.04em;
            margin: 16px 0;
        }

        .trend {
            font-size: 13px;
            color: var(--auric-gold);
            display: flex;
            align-items: center;
            gap: 4px;
        }

        /* Reserve List Styling */
        .reserve-list {
            list-style: none;
            width: 100%;
        }

        .reserve-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.04);
            transition: var(--transition);
            cursor: pointer;
        }

        .reserve-item:hover {
            padding-left: 8px;
            border-bottom-color: var(--auric-gold);
        }

        .reserve-name {
            font-weight: 500;
        }

        .reserve-status {
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            padding: 4px 8px;
            background: var(--auric-glow);
            color: var(--auric-gold);
            border-radius: 99px;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
            `}} />

            <div className="inspo-content font-sans">
                <div className="filament-container">
                    <div className="filament" style={{ left: '10%', animationDelay: '0s' }}></div>
                    <div className="filament" style={{ left: '35%', animationDelay: '-2s' }}></div>
                    <div className="filament" style={{ left: '60%', animationDelay: '-5s' }}></div>
                    <div className="filament" style={{ left: '85%', animationDelay: '-1s' }}></div>
                </div>

                <div className="dashboard-wrapper">
                    <header className="inspo-header">
                        <div className="brand">
                            <h1>Reserve / Auric</h1>
                            <p>Overview</p>
                        </div>
                        <div className="mono-data">
                            EST. VALUATION // $14.2M
                        </div>
                    </header>

                    <div className="grid-layout">
                        {/* Main Stats */}
                        <div className="inspo-card col-span-8">
                            <div className="card-header">
                                <span className="card-title">Total Asset Value</span>
                                <span className="mono-data">LIVE</span>
                            </div>
                            <div className="value-display">
                                $14,204,900.00
                            </div>
                            <div className="trend">
                                ↑ 2.4% THIS MONTH
                            </div>
                        </div>

                        {/* Quick Action */}
                        <div className="inspo-card col-span-4 flex flex-col">
                            <div className="card-header">
                                <span className="card-title">Active Reserves</span>
                            </div>
                            <div className="value-display">
                                04
                            </div>
                            <p className="mono-data mt-auto">ALL SYSTEMS OPTIMAL</p>
                        </div>

                        {/* Recent Activity List */}
                        <div className="inspo-card col-span-8" style={{ minHeight: '400px' }}>
                            <div className="card-header">
                                <span className="card-title">Reserve Status</span>
                            </div>
                            <ul className="reserve-list">
                                <li className="reserve-item">
                                    <span className="reserve-name">Highland Estate</span>
                                    <span className="reserve-status">OCCUPIED</span>
                                </li>
                                <li className="reserve-item">
                                    <span className="reserve-name">Marina Point Flat</span>
                                    <span className="reserve-status">MAINTENANCE</span>
                                </li>
                                <li className="reserve-item">
                                    <span className="reserve-name">Aspen Lodge</span>
                                    <span className="reserve-status">VACANT</span>
                                </li>
                                <li className="reserve-item">
                                    <span className="reserve-name">Downtown Loft</span>
                                    <span className="reserve-status">OCCUPIED</span>
                                </li>
                            </ul>
                        </div>

                        {/* Environmental Data */}
                        <div className="inspo-card col-span-4">
                            <div className="card-header">
                                <span className="card-title">System Health</span>
                            </div>
                            <div style={{ marginTop: '20px', display: 'grid', gap: '16px' }}>
                                <div>
                                    <div className="mono-data" style={{ marginBottom: '8px' }}>SECURITY</div>
                                    <div style={{ height: '2px', width: '100%', background: '#eee' }}>
                                        <div style={{ height: '100%', width: '94%', background: 'var(--text-main)' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mono-data" style={{ marginBottom: '8px' }}>OCCUPANCY</div>
                                    <div style={{ height: '2px', width: '100%', background: '#eee' }}>
                                        <div style={{ height: '100%', width: '75%', background: 'var(--auric-gold)' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}