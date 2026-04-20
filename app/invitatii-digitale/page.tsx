'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════
   NOTE: metadata lives in layout.tsx (this is 'use client')
   See invitatii-digitale-layout.tsx
═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vid * { box-sizing: border-box; margin: 0; padding: 0; }

.vid {
  font-family: 'DM Sans', sans-serif;
  background: #FDFAF6;
  color: #1A1208;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ── orbs ── */
@keyframes vid-orb { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
.vid-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; filter: blur(80px); }
.vid-o1  { width: 500px; height: 500px; background: radial-gradient(circle,rgba(255,107,0,.16) 0%,transparent 70%); top: -100px; right: -80px; animation: vid-orb 14s ease-in-out infinite; }
.vid-o2  { width: 300px; height: 300px; background: radial-gradient(circle,rgba(255,107,0,.09) 0%,transparent 70%); bottom: 80px; left: -50px; animation: vid-orb 18s ease-in-out infinite reverse; }

/* ── keyframes ── */
@keyframes vid-up       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
@keyframes vid-dot      { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes vid-shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes vid-tick     { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes vid-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
@keyframes vid-float2   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes vid-float3   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
@keyframes vid-rowIn    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
@keyframes vid-pulse    { 0%{transform:scale(.9);opacity:.8} 70%{transform:scale(1.3);opacity:0} 100%{transform:scale(.9);opacity:0} }
@keyframes vid-toastIn  { from{opacity:0;transform:translateY(16px) scale(.95)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes vid-toastOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(8px) scale(.97)} }
@keyframes vid-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

/* ── layout ── */
.vid-inner {
  position: relative; z-index: 10;
  max-width: 1320px; margin: 0 auto;
  padding: 52px 28px 80px;
}

/* ── page header ── */
.vid-header { text-align: center; margin-bottom: 68px; opacity: 0; animation: vid-up .7s ease .1s forwards; }
.vid-super {
  display: inline-flex; align-items: center; gap: 7px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.28); border-radius: 100px;
  padding: 5px 16px 5px 10px; font-size: 11px; font-weight: 500;
  color: #FF6B00; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 18px;
}
.vid-sdot { width: 7px; height: 7px; background: #FF6B00; border-radius: 50%; animation: vid-dot 1.8s ease-in-out infinite; }
.vid-tagline {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg,#FF6B00,#FF8C35); color: #fff;
  border-radius: 12px; padding: 9px 20px; font-size: 13px; font-weight: 600;
  letter-spacing: .02em; margin-bottom: 20px;
}
.vid-h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(32px, 5vw, 60px); font-weight: 300; line-height: 1.07;
  color: #1A1208; margin-bottom: 16px;
}
.vid-h1 em     { font-style: italic; color: #FF6B00; }
.vid-h1 strong { font-weight: 600; }
.vid-lead {
  font-size: 15px; line-height: 1.8; color: rgba(26,18,8,.62);
  max-width: 580px; margin: 0 auto;
}

/* ════════════════════════════════════════
   THEME ROWS
════════════════════════════════════════ */
.vid-rows { display: flex; flex-direction: column; gap: 24px; }

.vid-row {
  border-radius: 28px; overflow: hidden;
  border: 1px solid rgba(0,0,0,.07);
  box-shadow: 0 2px 8px rgba(0,0,0,.04), 0 10px 40px rgba(0,0,0,.06);
  background: #fff; opacity: 0;
  transition: box-shadow .3s, transform .3s;
}
.vid-row:hover {
  box-shadow: 0 4px 14px rgba(0,0,0,.07), 0 20px 64px rgba(0,0,0,.1);
  transform: translateY(-2px);
}
.vid-row:nth-child(1) { animation: vid-rowIn .65s ease .15s forwards; }
.vid-row:nth-child(2) { animation: vid-rowIn .65s ease .25s forwards; }
.vid-row:nth-child(3) { animation: vid-rowIn .65s ease .35s forwards; }
.vid-row:nth-child(4) { animation: vid-rowIn .65s ease .45s forwards; }
.vid-row:nth-child(5) { animation: vid-rowIn .65s ease .55s forwards; }
.vid-row:nth-child(6) { animation: vid-rowIn .65s ease .65s forwards; }

.vid-row-bar { height: 4px; width: 100%; flex-shrink: 0; }

/* row grid: info | devices */
.vid-row-body {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 340px;
}

/* ── info panel ── */
.vid-info {
  padding: 36px 30px;
  display: flex; flex-direction: column; justify-content: center;
  border-right: 1px solid rgba(0,0,0,.06);
}
.vid-theme-pill {
  display: inline-flex; align-items: center; gap: 6px;
  border-radius: 100px; padding: 4px 13px;
  font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
  margin-bottom: 14px; width: fit-content;
}
.vid-theme-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px; font-weight: 300; line-height: 1.05; margin-bottom: 10px;
}
.vid-theme-sub { font-size: 13px; color: rgba(26,18,8,.58); line-height: 1.7; margin-bottom: 22px; flex: 1; }
.vid-btns { display: flex; gap: 8px; flex-wrap: wrap; }

.vid-btn-demo {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 10px 18px; border-radius: 100px;
  border: 1.5px solid rgba(26,18,8,.16);
  font-size: 12.5px; font-weight: 500; color: rgba(26,18,8,.75);
  background: transparent; cursor: pointer;
  transition: border-color .2s, color .2s, background .2s;
  font-family: inherit;
}
.vid-btn-demo:hover { border-color: #FF6B00; color: #FF6B00; background: #FFF4ED; }

.vid-btn-choose {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 10px 20px; border-radius: 100px;
  color: #fff; font-size: 12.5px; font-weight: 600; text-decoration: none;
  border: none; cursor: pointer; position: relative; overflow: hidden;
  transition: opacity .2s, transform .15s; font-family: inherit;
}
.vid-btn-choose::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  background-size: 300px 100%; animation: vid-shimmer 2.5s linear infinite;
}
.vid-btn-choose:hover { opacity: .9; transform: translateY(-1px); }

/* ── devices panel ── */
.vid-devices {
  padding: 36px 48px;
  display: flex; align-items: flex-end; justify-content: center;
  gap: 32px; overflow: hidden; position: relative;
}

/* ═══════════════════════════════════════
   DEVICE FRAMES
═══════════════════════════════════════ */

/* shared screen label */
.vid-dev-label {
  text-align: center; margin-top: 8px;
  font-size: 9.5px; font-weight: 500; color: rgba(26,18,8,.38);
  letter-spacing: .03em;
}

/* ── PHONE ── */
.vid-phone-wrap { animation: vid-float 4.2s ease-in-out infinite; flex-shrink: 0; }
.vid-phone-frame {
  width: 92px; height: 188px;
  border-radius: 20px; border: 3px solid #222;
  background: #111; overflow: hidden; position: relative;
  box-shadow:
    0 0 0 1px rgba(255,255,255,.06) inset,
    0 12px 36px rgba(0,0,0,.32),
    0 2px 6px rgba(0,0,0,.2);
}
.vid-phone-notch {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: 36px; height: 6px; background: #222;
  border-radius: 0 0 5px 5px; z-index: 10;
}
.vid-phone-side-btn {
  position: absolute; right: -4px; top: 52px;
  width: 3px; height: 22px; background: #333; border-radius: 2px;
}
.vid-phone-side-vol {
  position: absolute; left: -4px; top: 48px;
  width: 3px; height: 14px; background: #333; border-radius: 2px;
}
.vid-phone-side-vol2 {
  position: absolute; left: -4px; top: 66px;
  width: 3px; height: 14px; background: #333; border-radius: 2px;
}
.vid-phone-home-bar {
  position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
  width: 28px; height: 3px; background: rgba(255,255,255,.25); border-radius: 2px; z-index: 10;
}

/* ── TABLET ── */
.vid-tablet-wrap { animation: vid-float2 5s ease-in-out infinite .9s; flex-shrink: 0; }
.vid-tablet-frame {
  width: 144px; height: 200px;
  border-radius: 16px; border: 3.5px solid #222;
  background: #111; overflow: hidden; position: relative;
  box-shadow:
    0 0 0 1px rgba(255,255,255,.06) inset,
    0 12px 36px rgba(0,0,0,.32),
    0 2px 6px rgba(0,0,0,.2);
}
.vid-tablet-cam {
  position: absolute; top: 5px; left: 50%; transform: translateX(-50%);
  width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10;
}
.vid-tablet-side {
  position: absolute; right: -4px; top: 60px;
  width: 3px; height: 30px; background: #333; border-radius: 2px;
}
.vid-tablet-home {
  position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%);
  width: 32px; height: 3px; background: rgba(255,255,255,.2); border-radius: 2px; z-index: 10;
}

/* ── LAPTOP ── */
.vid-laptop-wrap { animation: vid-float3 5.8s ease-in-out infinite 1.8s; flex-shrink: 0; }
.vid-laptop-lid {
  width: 252px; height: 158px;
  border-radius: 11px 11px 0 0;
  border: 3px solid #222; border-bottom: 2px solid #1a1a1a;
  background: #111; overflow: hidden; position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,.05) inset, 0 -4px 16px rgba(0,0,0,.15);
}
.vid-laptop-cam {
  position: absolute; top: 4px; left: 50%; transform: translateX(-50%);
  width: 5px; height: 5px; border-radius: 50%; background: #444; z-index: 10;
}
.vid-laptop-screen-pad { padding-top: 2px; width: 100%; height: 100%; }
.vid-laptop-hinge {
  width: 276px; height: 6px;
  background: linear-gradient(to bottom,#2a2a2a,#1a1a1a);
  border-radius: 0; margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0,0,0,.28);
}
.vid-laptop-base {
  width: 280px; height: 10px;
  background: linear-gradient(to bottom,#252525,#1c1c1c);
  border-radius: 0 0 6px 6px;
  margin: 0 auto;
  box-shadow: 0 4px 18px rgba(0,0,0,.22);
  position: relative;
}
.vid-laptop-base::after {
  content: ''; position: absolute; top: 3px; left: 50%; transform: translateX(-50%);
  width: 48px; height: 3px; border-radius: 2px; background: rgba(255,255,255,.07);
}

/* ═══════════════════════════════════════
   SVG SCREENS — invite + dashboard
   rendered inside device frames
═══════════════════════════════════════ */
.vsc { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }

/* invite screen */
.vsc-invite-top {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 10px 8px 6px; text-align: center; position: relative; overflow: hidden;
}
.vsc-deco { position: absolute; opacity: .1; font-size: 32px; transform: rotate(15deg); top: 4px; right: 6px; pointer-events: none; }
.vsc-mono {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 7px; font-size: 9px; font-style: italic;
  font-weight: 700; position: relative; font-family: 'Cormorant Garamond', serif;
}
.vsc-mono-ring {
  position: absolute; inset: -5px; border-radius: 50%;
  border: 1px dashed; opacity: .5;
  animation: vid-spin 18s linear infinite;
}
.vsc-pulse { position: absolute; inset: -8px; border-radius: 50%; border: 1.5px solid; animation: vid-pulse 2.6s ease-out infinite; }
.vsc-title { font-family: 'Cormorant Garamond', serif; font-size: 10px; line-height: 1.35; }
.vsc-title em { font-style: italic; }
.vsc-divline { height: 1px; width: 32px; margin: 5px auto; opacity: .5; }
.vsc-date { font-size: 6.5px; letter-spacing: .07em; text-transform: uppercase; opacity: .65; margin-bottom: 2px; }

.vsc-invite-rows { padding: 6px 7px 4px; }
.vsc-row {
  display: flex; align-items: center; gap: 4px;
  padding: 3.5px 5px; border-radius: 5px; margin-bottom: 3px;
}
.vsc-ico { width: 12px; height: 12px; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 7px; flex-shrink: 0; }
.vsc-txt-wrap { display: flex; flex-direction: column; }
.vsc-lbl { font-size: 5.5px; opacity: .55; line-height: 1.2; }
.vsc-val { font-size: 6.5px; font-weight: 600; line-height: 1.2; }
.vsc-bar { height: 3px; width: 100%; flex-shrink: 0; }
.vsc-rsvp-btn {
  margin: 5px 7px 5px;
  border-radius: 20px; padding: 5px 0;
  text-align: center; font-size: 6px; font-weight: 700;
  letter-spacing: .07em; cursor: default;
}

/* dashboard screen */
.vsc-dash { width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; }
.vsc-dash-nav {
  height: 18px; display: flex; align-items: center;
  padding: 0 7px; gap: 4px; flex-shrink: 0;
}
.vsc-dash-dot { width: 5px; height: 5px; border-radius: 50%; }
.vsc-dash-logo { font-size: 6px; font-weight: 700; opacity: .55; margin-left: 3px; letter-spacing: .03em; }
.vsc-dash-body { flex: 1; padding: 6px 7px; display: flex; flex-direction: column; gap: 5px; overflow: hidden; }
.vsc-dash-section { font-size: 6px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; opacity: .4; margin-bottom: 3px; }
.vsc-stats-row { display: flex; gap: 3px; }
.vsc-stat {
  flex: 1; border-radius: 5px; padding: 5px 4px; text-align: center;
}
.vsc-stat-num { font-size: 11px; font-weight: 700; line-height: 1; }
.vsc-stat-lbl { font-size: 5px; opacity: .6; margin-top: 1px; }
.vsc-progress-bar-wrap { border-radius: 3px; overflow: hidden; height: 5px; margin-top: 2px; }
.vsc-progress-bar { height: 100%; border-radius: 3px; }
.vsc-guest-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 5px; border-radius: 4px; margin-bottom: 2px;
}
.vsc-guest-name { font-size: 6px; font-weight: 500; }
.vsc-guest-badge { font-size: 5.5px; padding: 1.5px 5px; border-radius: 8px; font-weight: 700; }

/* ── toast ── */
.vid-toast {
  position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
  z-index: 9999; display: flex; align-items: center; gap: 12px;
  background: #1A1208; color: #fff;
  padding: 14px 24px; border-radius: 100px;
  font-size: 14px; font-weight: 500;
  box-shadow: 0 8px 32px rgba(0,0,0,.3);
  white-space: nowrap;
}
.vid-toast.in  { animation: vid-toastIn .3s ease forwards; }
.vid-toast.out { animation: vid-toastOut .3s ease forwards; }
.vid-toast-ico { font-size: 18px; }
.vid-toast-dot { width: 6px; height: 6px; border-radius: 50%; background: #FF6B00; animation: vid-dot 1.2s ease-in-out infinite; }

/* ── ticker ── */
.vid-ticker   { overflow: hidden; background: #FF6B00; padding: 10px 0; }
.vid-ti-inner { display: flex; width: max-content; animation: vid-tick 24s linear infinite; }
.vid-ti       { display: flex; align-items: center; gap: 10px; padding: 0 32px; color: #fff; font-size: 12px; font-weight: 500; white-space: nowrap; letter-spacing: .04em; }
.vid-tdot     { width: 4px; height: 4px; background: rgba(255,255,255,.5); border-radius: 50%; }

/* ── bottom cta ── */
.vid-cta {
  text-align: center; margin-top: 72px;
  opacity: 0; animation: vid-up .8s ease .8s forwards;
}
.vid-cta-h {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(26px,4vw,42px); font-weight: 300; color: #1A1208; margin-bottom: 12px;
}
.vid-cta-h em { font-style: italic; color: #FF6B00; }
.vid-cta-sub { font-size: 14px; color: rgba(26,18,8,.6); margin-bottom: 24px; }
.vid-cta-pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: #FFF4ED; border: 1px solid rgba(255,107,0,.25); border-radius: 100px;
  padding: 7px 20px; font-size: 13px; font-weight: 600; color: #FF6B00;
  margin-bottom: 22px;
}
.vid-cta-btn {
  display: inline-flex; align-items: center; gap: 9px;
  padding: 15px 32px; border-radius: 100px;
  background: #FF6B00; color: #fff; font-size: 15px; font-weight: 600; text-decoration: none;
  position: relative; overflow: hidden;
  box-shadow: 0 8px 28px rgba(255,107,0,.38);
  transition: background .25s, transform .2s, box-shadow .25s;
}
.vid-cta-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  background-size: 400px 100%; animation: vid-shimmer 2.5s linear infinite;
}
.vid-cta-btn:hover { background: #FF8C35; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(255,107,0,.45); }

/* ═══════════ RESPONSIVE ═══════════════ */
@media (max-width: 1100px) {
  .vid-devices { gap: 22px; padding: 28px 32px; }
  .vid-laptop-lid { width: 210px; height: 132px; }
  .vid-laptop-hinge { width: 230px; }
  .vid-laptop-base  { width: 234px; }
}
@media (max-width: 900px) {
  .vid-row-body { grid-template-columns: 220px 1fr; }
  .vid-laptop-lid { width: 186px; height: 116px; }
  .vid-laptop-hinge { width: 204px; }
  .vid-laptop-base  { width: 208px; }
  .vid-devices { gap: 16px; padding: 24px 24px; }
}
@media (max-width: 768px) {
  .vid-row-body { grid-template-columns: 1fr; }
  .vid-info { border-right: none; border-bottom: 1px solid rgba(0,0,0,.06); padding: 28px 24px; }
  .vid-devices { padding: 28px 24px; gap: 16px; }
  .vid-laptop-lid { width: 180px; height: 112px; }
  .vid-laptop-hinge { width: 196px; }
  .vid-laptop-base  { width: 200px; }
  .vid-phone-frame { width: 80px; height: 164px; }
  .vid-tablet-frame { width: 124px; height: 172px; }
}
@media (max-width: 520px) {
  .vid-inner { padding: 32px 16px 52px; }
  .vid-laptop-wrap { display: none; }
  .vid-devices { gap: 20px; justify-content: center; }
  .vid-phone-frame { width: 92px; height: 188px; }
  .vid-tablet-frame { width: 136px; height: 190px; }
  .vid-toast { font-size: 13px; padding: 12px 20px; }
}
`

/* ═══════════════════════════════════════════════════════════════
   THEME DATA
═══════════════════════════════════════════════════════════════ */
type T = {
  id: string; name: string; emoji: string; tagline: string; desc: string
  accent: string; accentSoft: string; pillBg: string; pillText: string
  barGrad: string; devBg: string
  // invite screen
  invTopBg: string; invBotBg: string; monoColor: string; monoBg: string
  titleColor: string; divColor: string; rowBg: string; icoBg: string
  rsvpBg: string; rsvpColor: string; deco: string
  // dashboard
  navBg: string; statBg: string; statColor: string; guestBg: string
  badgeOk: string; badgeOkText: string; badgePend: string; badgePendText: string
  progressBg: string; progressFill: string
}

const THEMES: T[] = [
  {
    id: 'nature', name: 'Nature', emoji: '🌿',
    tagline: 'Prospețime & Nou Început',
    desc: 'Tonuri botanice de verde și mint, inspirate din grădinile înflorite. Perfectă pentru cuplurile care iubesc natura, aerul curat și un nou capitol plin de viață.',
    accent: '#2D6A4F', accentSoft: '#52B788', pillBg: '#D8F3DC', pillText: '#1B4332',
    barGrad: 'linear-gradient(90deg,#1B4332,#2D6A4F,#52B788,#2D6A4F,#1B4332)',
    devBg: 'linear-gradient(135deg,rgba(45,106,79,.08),rgba(82,183,136,.12))',
    invTopBg: 'linear-gradient(170deg,#D8F3DC,#B7E4C7)', invBotBg: '#fff',
    monoColor: '#2D6A4F', monoBg: '#D8F3DC', titleColor: '#1B4332', divColor: '#52B788',
    rowBg: '#F0FDF4', icoBg: '#D8F3DC', rsvpBg: '#2D6A4F', rsvpColor: '#fff', deco: '🍃',
    navBg: '#F0FDF4', statBg: '#D8F3DC', statColor: '#1B4332', guestBg: '#F0FDF4',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#D8F3DC', progressFill: '#2D6A4F',
  },
  {
    id: 'lux', name: 'Lux', emoji: '✨',
    tagline: 'Opulență & Grandoare',
    desc: 'Aur veritabil pe negru profund, cu accente de champagne satinat. Pentru cei care nu fac compromisuri — fiecare invitat va simți grandoarea înainte de a păși pe ușă.',
    accent: '#C9A84C', accentSoft: '#E8C96A', pillBg: '#FFF8E6', pillText: '#7D5A1E',
    barGrad: 'linear-gradient(90deg,#7D5A1E,#B8860B,#E8C96A,#C9A84C,#E8C96A,#B8860B,#7D5A1E)',
    devBg: 'linear-gradient(135deg,rgba(26,18,8,.06),rgba(201,168,76,.1))',
    invTopBg: 'linear-gradient(170deg,#1A1208,#2d1f0e)', invBotBg: '#1A1208',
    monoColor: '#C9A84C', monoBg: 'rgba(201,168,76,.2)', titleColor: '#F5E6C0', divColor: '#C9A84C',
    rowBg: 'rgba(255,255,255,.06)', icoBg: 'rgba(201,168,76,.18)', rsvpBg: '#C9A84C', rsvpColor: '#1A1208', deco: '💎',
    navBg: '#1A1208', statBg: 'rgba(201,168,76,.15)', statColor: '#C9A84C', guestBg: 'rgba(255,255,255,.06)',
    badgeOk: 'rgba(134,239,172,.18)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.18)', badgePendText: '#fde68a',
    progressBg: 'rgba(255,255,255,.1)', progressFill: '#C9A84C',
  },
  {
    id: 'boho', name: 'Boho', emoji: '🌸',
    tagline: 'Libertate & Autenticitate',
    desc: 'Terracotta cald, roz prăfuit și textura naturală a bumbacului. O invitație ca o îmbrățișare caldă — cu suflet, naturalețe și imperfecțiunile cele mai frumoase.',
    accent: '#C47A5A', accentSoft: '#E8A87C', pillBg: '#FDE8DC', pillText: '#7D3C1E',
    barGrad: 'linear-gradient(90deg,#7D3C1E,#C47A5A,#E8A87C,#D4A5A5,#E8A87C,#C47A5A,#7D3C1E)',
    devBg: 'linear-gradient(135deg,rgba(196,122,90,.08),rgba(232,168,124,.12))',
    invTopBg: 'linear-gradient(170deg,#FDE8DC,#F5D0C0)', invBotBg: '#fff',
    monoColor: '#C47A5A', monoBg: '#FDE8DC', titleColor: '#5C2E1A', divColor: '#E8A87C',
    rowBg: '#FFF5F0', icoBg: '#FDE8DC', rsvpBg: '#C47A5A', rsvpColor: '#fff', deco: '🌺',
    navBg: '#FFF5F0', statBg: '#FDE8DC', statColor: '#7D3C1E', guestBg: '#FFF5F0',
    badgeOk: '#D1FAE5', badgeOkText: '#065f46', badgePend: '#FEF3C7', badgePendText: '#92400e',
    progressBg: '#FDE8DC', progressFill: '#C47A5A',
  },
  {
    id: 'royal', name: 'Royal', emoji: '👑',
    tagline: 'Majestate & Eleganță Regală',
    desc: 'Albastru regal profund cu filoane argintii și detalii de catifea. Inspirat din palatele europene — pentru nunți care vor fi povești spuse din generație în generație.',
    accent: '#2C3E8C', accentSoft: '#5B77D4', pillBg: '#EEF2FF', pillText: '#1A2654',
    barGrad: 'linear-gradient(90deg,#0f1a3d,#1A2654,#2C3E8C,#8B9FE8,#2C3E8C,#1A2654,#0f1a3d)',
    devBg: 'linear-gradient(135deg,rgba(26,38,84,.08),rgba(91,119,212,.12))',
    invTopBg: 'linear-gradient(170deg,#1A2654,#2C3E8C)', invBotBg: '#1A2654',
    monoColor: '#C0C8E8', monoBg: 'rgba(192,200,232,.15)', titleColor: '#E8EDF8', divColor: '#5B77D4',
    rowBg: 'rgba(255,255,255,.07)', icoBg: 'rgba(91,119,212,.2)', rsvpBg: '#5B77D4', rsvpColor: '#fff', deco: '⚜️',
    navBg: '#1A2654', statBg: 'rgba(91,119,212,.15)', statColor: '#8B9FE8', guestBg: 'rgba(255,255,255,.06)',
    badgeOk: 'rgba(134,239,172,.18)', badgeOkText: '#86efac', badgePend: 'rgba(254,243,199,.15)', badgePendText: '#fde68a',
    progressBg: 'rgba(255,255,255,.1)', progressFill: '#5B77D4',
  },
  {
    id: 'minimal', name: 'Minimal', emoji: '◻️',
    tagline: 'Mai Puțin Înseamnă Mai Mult',
    desc: 'Alb imaculat, negru pur și spațiu alb ca formă de design. Pentru cuplurile moderne care cred că eleganța stă în simplitate și că fiecare cuvânt trebuie să conteze.',
    accent: '#1A1208', accentSoft: '#5A4F44', pillBg: '#F2F0ED', pillText: '#1A1208',
    barGrad: 'linear-gradient(90deg,#000,#1A1208,#5A4F44,#1A1208,#000)',
    devBg: 'linear-gradient(135deg,rgba(26,18,8,.04),rgba(90,79,68,.07))',
    invTopBg: 'linear-gradient(170deg,#F8F7F5,#EEECEA)', invBotBg: '#fff',
    monoColor: '#1A1208', monoBg: '#EEECEA', titleColor: '#1A1208', divColor: '#CCCAC5',
    rowBg: '#F8F7F5', icoBg: '#EEECEA', rsvpBg: '#1A1208', rsvpColor: '#fff', deco: '◻',
    navBg: '#F5F4F2', statBg: '#EEECEA', statColor: '#1A1208', guestBg: '#F8F7F5',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#EEECEA', progressFill: '#1A1208',
  },
  {
    id: 'romantic', name: 'Romantic', emoji: '🌹',
    tagline: 'Iubire & Pasiune Eternă',
    desc: 'Roșu trandafiriu adânc, roz pudrat și petale de bujori. O declarație de dragoste în sine — caldă, senzorială și imposibil de uitat, ca prima seară împreună.',
    accent: '#9B2335', accentSoft: '#D4687A', pillBg: '#FDEAED', pillText: '#6B1520',
    barGrad: 'linear-gradient(90deg,#4a0a11,#6B1520,#9B2335,#D4687A,#9B2335,#6B1520,#4a0a11)',
    devBg: 'linear-gradient(135deg,rgba(155,35,53,.07),rgba(212,104,122,.11))',
    invTopBg: 'linear-gradient(170deg,#FDEAED,#F8D0D5)', invBotBg: '#fff',
    monoColor: '#9B2335', monoBg: '#FDEAED', titleColor: '#5A0F1A', divColor: '#D4687A',
    rowBg: '#FFF5F6', icoBg: '#FDEAED', rsvpBg: '#9B2335', rsvpColor: '#fff', deco: '🌹',
    navBg: '#FFF5F6', statBg: '#FDEAED', statColor: '#6B1520', guestBg: '#FFF5F6',
    badgeOk: '#DCFCE7', badgeOkText: '#15803d', badgePend: '#FEF3C7', badgePendText: '#b45309',
    progressBg: '#FDEAED', progressFill: '#9B2335',
  },
]

/* ─────────────────────────────────────────────────────────────
   SCREEN COMPONENTS
───────────────────────────────────────────────────────────── */
function InviteScreen({ t, scale = 1 }: { t: T; scale?: number }) {
  return (
    <div className="vsc" style={{ background: t.invBotBg }}>
      <div className="vsc-bar" style={{ background: t.barGrad }} />
      <div className="vsc-invite-top" style={{ background: t.invTopBg }}>
        <div aria-hidden="true" className="vsc-deco">{t.deco}</div>
        <div className="vsc-mono" style={{ background: t.monoBg, color: t.monoColor, border: `1.5px solid ${t.monoColor}40` }}>
          <div className="vsc-mono-ring" style={{ borderColor: t.monoColor }} />
          <div className="vsc-pulse" style={{ borderColor: t.monoColor + '60' }} />
          A&M
        </div>
        <p className="vsc-title" style={{ color: t.titleColor }}>
          Vă invităm la<br /><em>Nunta Noastră</em>
        </p>
        <div className="vsc-divline" style={{ background: t.divColor }} />
        <p className="vsc-date" style={{ color: t.titleColor }}>15 Sep · 2025</p>
      </div>
      <div className="vsc-invite-rows" style={{ background: t.invBotBg }}>
        {[
          { ico: '🕕', lbl: 'Ora', val: '18:00' },
          { ico: '📍', lbl: 'Locația', val: 'Grand Hotel' },
          { ico: '🍽️', lbl: 'Meniu QR', val: 'Scanează ↗' },
        ].map(r => (
          <div key={r.lbl} className="vsc-row" style={{ background: t.rowBg }}>
            <div className="vsc-ico" style={{ background: t.icoBg }}>{r.ico}</div>
            <div className="vsc-txt-wrap">
              <span className="vsc-lbl" style={{ color: t.titleColor }}>{r.lbl}</span>
              <span className="vsc-val" style={{ color: t.titleColor }}>{r.val}</span>
            </div>
          </div>
        ))}
        <div className="vsc-rsvp-btn" style={{ background: t.rsvpBg, color: t.rsvpColor }}>
          CONFIRMĂ PREZENȚA ♥
        </div>
      </div>
    </div>
  )
}

function DashboardScreen({ t }: { t: T }) {
  return (
    <div className="vsc-dash" style={{ background: t.navBg }}>
      <div className="vsc-dash-nav" style={{ background: t.navBg, borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="vsc-dash-dot" style={{ background: '#ff5f57' }} />
        <div className="vsc-dash-dot" style={{ background: '#ffbd2e' }} />
        <div className="vsc-dash-dot" style={{ background: '#28c840' }} />
        <span className="vsc-dash-logo" style={{ color: t.accentSoft }}>VibeInvite</span>
      </div>
      <div className="vsc-dash-body">
        <div className="vsc-dash-section" style={{ color: t.statColor }}>Dashboard</div>
        <div className="vsc-stats-row">
          {[{ n: '48', l: 'Total' }, { n: '32', l: 'Accept' }, { n: '16', l: 'Pend.' }].map(s => (
            <div key={s.l} className="vsc-stat" style={{ background: t.statBg }}>
              <div className="vsc-stat-num" style={{ color: t.statColor }}>{s.n}</div>
              <div className="vsc-stat-lbl" style={{ color: t.statColor }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="vsc-dash-section" style={{ color: t.statColor }}>Participare</div>
          <div className="vsc-progress-bar-wrap" style={{ background: t.progressBg }}>
            <div className="vsc-progress-bar" style={{ width: '67%', background: t.progressFill }} />
          </div>
        </div>
        <div>
          <div className="vsc-dash-section" style={{ color: t.statColor }}>Invitați</div>
          {[
            { name: 'Ana & Mihai', ok: true },
            { name: 'Elena I.', ok: true },
            { name: 'Radu P.', ok: false },
            { name: 'Laura D.', ok: true },
          ].map(g => (
            <div key={g.name} className="vsc-guest-item" style={{ background: t.guestBg }}>
              <span className="vsc-guest-name" style={{ color: t.titleColor }}>{g.name}</span>
              <span className="vsc-guest-badge" style={{ background: g.ok ? t.badgeOk : t.badgePend, color: g.ok ? t.badgeOkText : t.badgePendText }}>
                {g.ok ? '✓' : '⏳'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
const TICKER = [
  '🌿 Nature', '✨ Lux', '🌸 Boho', '👑 Royal', '◻️ Minimal', '🌹 Romantic',
  '💌 Invitații Nelimitate', '🍽️ Meniu QR', '📷 Upload Poze', '📊 Export Excel', '💸 300 Lei',
]

export default function InvitatiiDigitalePage() {
  const [toast, setToast] = useState<{ visible: boolean; leaving: boolean; name: string }>({
    visible: false, leaving: false, name: '',
  })

  function showToast(name: string) {
    setToast({ visible: true, leaving: false, name })
    setTimeout(() => {
      setToast(s => ({ ...s, leaving: true }))
      setTimeout(() => setToast({ visible: false, leaving: false, name: '' }), 320)
    }, 2600)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <div className="vid">
        <div className="vid-orb vid-o1" aria-hidden="true" />
        <div className="vid-orb vid-o2" aria-hidden="true" />

        {/* ticker top */}
        <div className="vid-ticker" aria-hidden="true">
          <div className="vid-ti-inner">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vid-ti">{t}<span className="vid-tdot" /></div>
            ))}
          </div>
        </div>

        <div className="vid-inner">

          {/* header */}
          <header className="vid-header">
            <p className="vid-tagline">🎊 Un singur pachet — tot ce ai nevoie pentru nuntă</p>
            <p className="vid-super"><span className="vid-sdot" />Alege designul invitației tale</p>
            <h1 className="vid-h1">6 teme <em>premium</em>, fiecare <strong>unică</strong></h1>
            <p className="vid-lead">
              Explorează cele 6 designuri exclusive VibeInvite. Fiecare include invitație digitală,
              dashboard invitați, meniu QR și album foto — adaptate perfect stilului tău.
            </p>
          </header>

          {/* rows */}
          <div className="vid-rows" role="list">
            {THEMES.map((theme) => (
              <article key={theme.id} className="vid-row" role="listitem" aria-label={`Tema ${theme.name}`}>
                <div className="vid-row-bar" style={{ background: theme.barGrad }} aria-hidden="true" />

                <div className="vid-row-body">

                  {/* info */}
                  <div className="vid-info">
                    <div className="vid-theme-pill" style={{ background: theme.pillBg, color: theme.pillText }}>
                      <span aria-hidden="true">{theme.emoji}</span>
                      {theme.tagline}
                    </div>
                    <h2 className="vid-theme-name" style={{ color: theme.accent }}>
                      <em>{theme.name}</em>
                    </h2>
                    <p className="vid-theme-sub">{theme.desc}</p>
                    <div className="vid-btns">
                      <button
                        className="vid-btn-demo"
                        onClick={() => showToast(theme.name)}
                        aria-label={`Demo tema ${theme.name}`}
                      >
                        <span aria-hidden="true">👁</span> Demo
                      </button>
                      <Link
                        href={`/preturi?tema=${theme.id}`}
                        className="vid-btn-choose"
                        style={{
                          background: theme.accent,
                          boxShadow: `0 4px 18px ${theme.accent}55`,
                        }}
                        aria-label={`Alege tema ${theme.name}`}
                      >
                        <span aria-hidden="true">{theme.emoji}</span> Alege acum
                      </Link>
                    </div>
                  </div>

                  {/* devices */}
                  <div className="vid-devices" style={{ background: theme.devBg }} aria-hidden="true">

                    {/* PHONE */}
                    <div className="vid-phone-wrap">
                      <div className="vid-phone-frame">
                        <div className="vid-phone-notch" />
                        <div className="vid-phone-side-btn" />
                        <div className="vid-phone-side-vol" />
                        <div className="vid-phone-side-vol2" />
                        <div className="vid-phone-home-bar" />
                        <InviteScreen t={theme} />
                      </div>
                      <p className="vid-dev-label">Telefon · Invitație</p>
                    </div>

                    {/* TABLET */}
                    <div className="vid-tablet-wrap">
                      <div className="vid-tablet-frame">
                        <div className="vid-tablet-cam" />
                        <div className="vid-tablet-side" />
                        <div className="vid-tablet-home" />
                        <DashboardScreen t={theme} />
                      </div>
                      <p className="vid-dev-label">Tabletă · Dashboard</p>
                    </div>

                    {/* LAPTOP */}
                    <div className="vid-laptop-wrap">
                      <div className="vid-laptop-lid">
                        <div className="vid-laptop-cam" />
                        <div className="vid-laptop-screen-pad">
                          <InviteScreen t={theme} />
                        </div>
                      </div>
                      <div className="vid-laptop-hinge" />
                      <div className="vid-laptop-base" />
                      <p className="vid-dev-label">Laptop · Previzualizare</p>
                    </div>

                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* bottom cta */}
          <div className="vid-cta">
            <h2 className="vid-cta-h">Ai ales tema? <em>Pasul următor e simplu.</em></h2>
            <p className="vid-cta-sub">Toate cele 6 teme sunt incluse în pachetul de 300 lei. Poți schimba tema oricând.</p>
            <div><p className="vid-cta-pill"><span aria-hidden="true">💸</span>300 Lei · Plată Unică · Toate Temele Incluse</p></div>
            <div style={{ marginTop: 8 }}>
              <Link href="/preturi" className="vid-cta-btn">
                <span aria-hidden="true">✨</span>Creează Invitația — E Free să Testezi
              </Link>
            </div>
          </div>

        </div>

        {/* ticker bottom */}
        <div className="vid-ticker" aria-hidden="true">
          <div className="vid-ti-inner" style={{ animationDirection: 'reverse' }}>
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="vid-ti">{t}<span className="vid-tdot" /></div>
            ))}
          </div>
        </div>

        {/* TOAST */}
        {toast.visible && (
          <div
            className={`vid-toast ${toast.leaving ? 'out' : 'in'}`}
            role="status"
            aria-live="polite"
          >
            <span className="vid-toast-ico" aria-hidden="true">🚀</span>
            <span>Demo <strong>{toast.name}</strong> — coming soon</span>
            <span className="vid-toast-dot" aria-hidden="true" />
          </div>
        )}
      </div>
    </>
  )
}
