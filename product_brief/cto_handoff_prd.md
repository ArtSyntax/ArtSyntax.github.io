# 📘 Product Requirements Document (PRD) & UX/UI Handoff Specification for CTO

**Project Name:** ARTSYNTAX Corporate Website Redesign & Production Architecture  
**Company:** ARTSYNTAX | Innovation & Technology Partner  
**Tagline:** From Strategy to Growth. Innovation Beyond Software.  
**Document Owner:** Chief Product Officer (CPO)  
**Target Recipient:** Chief Technology Officer (CTO) & Lead Engineering Team  
**Date:** 27 August 2026 (Synchronized with Production `index.html`)  
**Status:** Live Baseline Specification  

---

## 1. Executive Summary & Product Intent

### 1.1 Product Vision
เว็บไซต์ **ARTSYNTAX** สื่อสารตำแหน่งทางการตลาดในฐานะ **"Innovation & Technology Partner"** ที่ช่วยเปลี่ยนไอเดียยุทธศาสตร์เป็น **Innovation, AI, Software** และ **ทีมที่พร้อมเติบโต** ดูแลแบบ End-to-End สำหรับ SME, Startup และองค์กรยุคใหม่ ในงบประมาณเริ่มต้นเพียง **20,000 บาท** พร้อมรองรับ AEO / GEO สำหรับ AI Search Engines

### 1.2 Core Positioning & 4 Core Service Pillars
* **Positioning Concept:** Innovation & Technology Partner | AI, Software & Business Transformation
* **Theme & Style:** Dark Navy Obsidian (`#0b0f19`), Ambient Light Gradients, Glassmorphism Cards (`rgba(21, 28, 44, 0.75)` + `backdrop-filter: blur(20px)`), SVG Vector Icons
* **4 Core Service Pillars:**
  1. **Innovation Design** (UX/UI & Prototyping)
  2. **AI Consulting & Transformation** (AI Readiness, RAG & Agents)
  3. **Software Development & Web** (High-Performance Web & Scalable, Secure Software)
  4. **Agile, Scrum & OKRs Enablement** (Team Execution, Agile Workshops & OKRs Alignment)

---

## 2. Information Architecture & Sitemap Structure

```
Sitemap Anchors (index.html):
├── #home (Hero Section: Value Proposition & CTAs)
├── #transformation (Solutions: Idea to Business Growth Pentagon Flow)
├── #services (Services: 4 Core Service Bento Cards & Key Outcomes)
├── #why-us (Why ARTSYNTAX: 4 Differentiators Cards)
├── #faq (Executive FAQ: 7 Key Questions & Answers)
└── #contact (Contact Form: Lead Generation to thanyavuth@outlook.com)
```

---

## 3. Technical Requirements & Feature Specifications

### 3.1 Structured Data (JSON-LD) Specification & AEO
* **Organization Schema (`@type: ProfessionalService`):**
  * `name: "ARTSYNTAX"`, `url: "https://artsyntax.app/"`
  * `priceRange: "฿20,000+"`
  * `knowsAbout`: `[Innovation Design (UX/UI), AI Consulting & Transformation, Software Development & Web, Agile, Scrum & OKRs Enablement]`
* **hasOfferCatalog (OfferCatalog):** ครอบคลุมทั้ง 4 บริการหลักเพื่อสนับสนุน AI Search Crawlers
* **FAQPage Schema (`@type: FAQPage`):** Map 7 คำถามบนหน้าเว็บ (`#faq`) เข้าสู่ JSON-LD เพื่อให้ Google/AI ดึงไปตอบเป็น Rich Snippets ได้โดยตรง

### 3.2 Lead Capture Form (`#contact`)
* **Endpoint:** `https://formsubmit.co/thanyavuth@outlook.com` (id: `contactForm`)
* **Form Fields:**
  * `name` (ชื่อ - นามสกุล)
  * `email` (อีเมลองค์กร)
  * **`phone` (เบอร์โทรศัพท์ติดต่อ - `type="tel" maxlength="10"`)** *เพิ่มใหม่
  * `company` (ชื่อองค์กร - Optional)
  * `title` (ตำแหน่งงาน - Optional)
  * `message` (รายละเอียดเบื้องต้น - required, minlength 100)
* **Success UI:** Glassmorphic Success Message Card (`id="formSuccessCard"`) แสดงขึ้นหลังกดส่ง

### 3.3 Meta & Social Graph Specification
* **Title:** `ARTSYNTAX — Innovation & Technology Partner | AI, Software & Business Transformation`
* **Canonical & OG URL:** `https://artsyntax.app/`
* **Twitter Card & OG Image:** `https://artsyntax.app/og-image.png`

---

## 4. CTO Technical Checklist

| Domain | Specification | Status / Verification |
| :--- | :--- | :--- |
| **Typography** | Plus Jakarta Sans, Prompt, JetBrains Mono | Integrated via Google Fonts |
| **Theme Base** | Deep Navy Obsidian (`#0b0f19`) + Ambient Light Glow | Verified in `css/styles.css` |
| **JSON-LD AEO** | `@type: ProfessionalService` & `FAQPage` | Verified in `index.html` |
| **Contact Form** | เพิ่มฟิลด์ `phone` + `formSuccessCard` UI | Verified in `index.html` |
| **Icons** | 100% SVG Vector Icons (No Emojis) | Verified in `index.html` |
