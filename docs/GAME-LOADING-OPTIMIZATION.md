# Game Loading Optimization Report

**Date:** 2026-03-07  
**Author:** Raul (Senior Full-Stack Engineer)

## Problem

Game iframe loads slowly after user clicks "Play Now". The game content is hosted on third-party servers, so we can't control their response time directly.

## Current Game Sources

| # | Source | Hostname |
|---|--------|----------|
| 1 | miniplay.com | www.miniplay.com |
| 2 | geometry-games.io | geometry-games.io |
| 3 | gamenora.com | www.gamenora.com |

## Optimizations Implemented

### 1. DNS Prefetch + Preconnect (layout.tsx)

Added `<link rel="dns-prefetch">` and `<link rel="preconnect">` for all game sources in the HTML head. This eliminates DNS lookup + TCP + TLS handshake time (~200-500ms) before the iframe even starts loading.

**Impact:** Saves 200-500ms on first iframe load.

### 2. Hover Preconnect (GameEmbed.tsx)

When user hovers over the "Play Now" button, we dynamically inject preconnect links for all 3 sources. This gives us an extra ~500ms head start before the click happens.

**Impact:** Saves 300-500ms for desktop users (hover → click gap).

### 3. Smart Source Selection (GameEmbed.tsx)

- Remembers the fastest source in localStorage (`sorrybob-fastest-source`)
- On subsequent visits, tries the known-fast source first
- Falls back to other sources if the preferred one fails

**Impact:** Eliminates trial-and-error on repeat visits.

### 4. Progress Bar Loading UX (GameEmbed.tsx)

Replaced the simple spinner with:
- Animated progress bar (asymptotic curve to 90%, jumps to 100% on load)
- Current source hostname shown
- Dark theme matching the play screen

**Impact:** Perceived performance improvement — users feel the game is loading faster.

### 5. Increased Timeout

Bumped iframe timeout from 10s → 15s. Some game sources legitimately take 10+ seconds on slow connections.

## Future Improvements (Not Yet Implemented)

### Self-Hosting Game Files (High Impact, High Risk)
- Download game HTML/JS/CSS from miniplay or gamedistribution
- Host on Cloudflare Pages or R2
- **Risk:** Licensing/copyright issues, game updates won't sync automatically
- **Recommendation:** Only if we get explicit permission from game distributor

### Cloudflare Worker Proxy (Medium Impact)
- Proxy iframe content through a CF Worker
- Add edge caching for game assets
- **Benefit:** Faster CDN delivery from CF edge
- **Risk:** Some games check referrer/origin and may break

### Prefetch iframe in Hidden Element (Medium Impact)
- Load iframe in a hidden div when page loads
- Show it when user clicks "Play"
- **Risk:** Wastes bandwidth if user doesn't play; may trigger autoplay policies

## Metrics to Track

- Time from "Play Now" click to game playable (via Performance API)
- Source failure rate per provider
- Average load time per source (to validate smart source selection)
