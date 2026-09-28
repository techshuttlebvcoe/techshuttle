import { useState, useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import logoImg from '@/imports/logo.png'
import garv from '@/imports/garv.jpeg'
import saisha from '@/imports/Saisha.jpg'
import chhavi from '@/imports/Chhavi.jpg'
import ipshita from '@/imports/Ipshita.jpeg'
import archit from '@/imports/Archit.jpeg'
import dhruv from '@/imports/Dhruv.jpg'
import akshat from '@/imports/akshat.png'
import vaishnavi from '@/imports/Vaishnavi.jpeg'
import prabhav from '@/imports/prabhav.jpeg'
import deepika from '@/imports/Deepika.jpg'
import pylaunch from '@/imports/pylaunch.jpg'
import degubanddare from '@/imports/degubanddare.jpg'
import techballiye from '@/imports/techballiye.jpg'
import faculty from '@/imports/faculty.jpg'
import aditi from '@/imports/aditi.jpeg'
import raunak from '@/imports/raunak.jpeg'
import deepanshu from '@/imports/deepanshu.jpeg'
import dhruvsingh from '@/imports/dhruvsingh.jpeg'
import nihal from '@/imports/nihal.jpeg'
import abhishek from '@/imports/abhishek.png'
import vidhushi from '@/imports/vidhushi.jpeg'

// ── Circuit board SVG background ─────────────────────────────────────────────

const CIRCUIT_BG = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><g stroke="#ffffff" stroke-width="0.5" fill="none" opacity="0.05"><path d="M20 20 H80 V60 H140 V20"/><path d="M60 60 V120 H20 V160"/><path d="M140 60 V100 H180 V140 H140 V180"/><path d="M80 120 H100 V180"/><circle cx="20" cy="20" r="3"/><circle cx="80" cy="20" r="3"/><circle cx="140" cy="20" r="3"/><circle cx="60" cy="60" r="3"/><circle cx="140" cy="60" r="3"/><circle cx="20" cy="120" r="3"/><circle cx="60" cy="120" r="3"/><circle cx="100" cy="120" r="3"/><circle cx="180" cy="140" r="3"/><circle cx="20" cy="160" r="3"/><circle cx="100" cy="180" r="3"/><circle cx="140" cy="180" r="3"/></g></svg>'
)}")`

// ── Scroll-driven rocket path ─────────────────────────────────────────────────

interface Waypoint { p: number; x: number; y: number; rot: number }

// Each waypoint: scroll progress (0–1), viewport x%, viewport y%, rotation°
const ROCKET_PATH: Waypoint[] = [
  { p: 0.00, x: 72, y: 50, rot: 0 },
  { p: 0.08, x: 74, y: 30, rot: -4 },
  { p: 0.22, x: 60, y: 42, rot: -10 },
  { p: 0.36, x: 18, y: 38, rot: -20 },
  { p: 0.50, x: 14, y: 62, rot: -6 },
  { p: 0.62, x: 52, y: 26, rot: 8 },
  { p: 0.74, x: 74, y: 38, rot: 14 },
  { p: 0.87, x: 76, y: 48, rot: 5 },
  { p: 1.00, x: 74, y: 66, rot: 0 },
]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function easeIO(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

function getRocketState(progress: number) {
  if (progress <= ROCKET_PATH[0].p) return ROCKET_PATH[0]
  const last = ROCKET_PATH[ROCKET_PATH.length - 1]
  if (progress >= last.p) return last
  for (let i = 0; i < ROCKET_PATH.length - 1; i++) {
    const a = ROCKET_PATH[i], b = ROCKET_PATH[i + 1]
    if (progress >= a.p && progress <= b.p) {
      const t = easeIO((progress - a.p) / (b.p - a.p))
      return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), rot: lerp(a.rot, b.rot, t) }
    }
  }
  return last
}

// ── Scroll-reveal hook ────────────────────────────────────────────────────────

function useReveal<T extends Element = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible] as const
}

// ── Types & Data ──────────────────────────────────────────────────────────────

interface EventItem { id: number; name: string; description: string; date: string; image: string }
interface Member { id: number; name: string; role: string; image: string }

const EVENTS: EventItem[] = [
  { id: 1, name: 'Debug and Dare', description: 'A fun-filled coding competition featuring C++ and Python, with MCQs, output-based questions, debugging, and OOPs concepts. Participants who couldn’t qualify for the next round had to complete entertaining dares, making the event a perfect mix of coding, challenge, and fun.', date: 'Feb 2026', image: degubanddare },
  { id: 2, name: 'Codesprit:Py Launch', description: 'An engaging online workshop introducing students to essential Python libraries for data analysis and visualization, including NumPy, Pandas, Matplotlib, and Seaborn. The session provided hands-on learning and practical insights into working with data using Python.', date: 'Nov 2025', image: pylaunch },
  { id: 3, name: 'Tech Baliye', description: 'Tech Baliye was a unique techno-cultural event blending technology, dance, creativity, and teamwork. Organized by TechShuttle × BVPCSI × Aura, it featured tech quizzes, online challenges, buzzer battles, and creative performances, encouraging participants to showcase their technical knowledge, spontaneity, collaboration, and innovative spirit.', date: 'Oct 2025', image: techballiye },
]

const FACULTY_HEAD: Member = {
  id: 0,
  name: 'Mr. Rajat Gupta',
  role: 'Faculty Head',
  image: faculty,
}

const CORE_TEAM: Member[] = [
  { id: 1, name: 'Garv Mittal', role: 'President', image: garv },
  { id: 2, name: 'Saisha Chopra', role: 'Vice President', image: saisha },
  { id: 3, name: 'Chavvi Gabha', role: 'General Secretary', image: chhavi },
  { id: 4, name: 'Ipshita Porav', role: 'Treasurer', image: ipshita },
]

const DEPT_GROUPS: { title: string; members: Member[] }[] = [
  {
    title: 'Technical',
    members: [
      { id: 5, name: 'Archit Singh', role: 'Technical Head', image: archit },
      { id: 6, name: 'Akshat Verma', role: 'Technical Head', image: akshat },
    ],
  },
  {
    title: 'Social Media',
    members: [
      { id: 7, name: 'Dhruv Sharma', role: 'Social Media Head', image: dhruv },
      { id: 8, name: 'Nihal', role: 'Social Media Head', image: nihal },
    ],
  },
  {
    title: 'Content & Documentation',
    members: [
      { id: 9, name: 'Vaishnavi Vashisth', role: 'Content & Documentation Head', image: vaishnavi },
      { id: 10, name: 'Deepika', role: 'Content & Documentation Head', image: deepika },
    ],
  },
  {
    title: 'Design',
    members: [
      { id: 11, name: 'Prabhav Sharma', role: 'Design Head', image: prabhav },
      { id: 12, name: 'Aditi Pandey', role: 'Design Head', image: aditi },
    ],
  },
  {
    title: 'Outreach and Partnership',
    members: [
      { id: 13, name: 'Raunak Singh', role: 'Outreach and Partnership Head', image: raunak },
      { id: 14, name: 'Vidhushi Gupta', role: 'Outreach and Partnership Head', image: vidhushi },
    ],
  },
  {
    title: 'Operations',
    members: [
      { id: 15, name: 'Deepanshu Singh', role: 'Operations Head', image: deepanshu },
      { id: 16, name: 'Dhruv Singh', role: 'Operations Head', image: dhruvsingh },
      { id: 17, name: 'Abhishek Sharma', role: 'Operations Head', image: abhishek },
    ],
  },
]

// ── Shared UI atoms ───────────────────────────────────────────────────────────

function Label({ children }: { children: ReactNode }) {
  return (
    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.28em', color: '#e11d27', marginBottom: 14, textTransform: 'uppercase' as const }}>
      {children}
    </p>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} aria-label={label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 44, height: 44, borderRadius: 10, background: hov ? 'rgba(225,29,39,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hov ? 'rgba(225,29,39,0.35)' : 'rgba(255,255,255,0.09)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: hov ? '#e11d27' : 'rgba(240,240,245,0.45)', textDecoration: 'none', transition: 'all 0.25s' }}>
      {icon}
    </a>
  )
}

function InstagramIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
}

function LinkedInIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
}

function MemberCard({ member }: { member: Member }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="team-card" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: '100%', minWidth: 0, background: '#0d0d1c', borderRadius: 14, border: `1px solid ${hov ? 'rgba(225,29,39,0.28)' : 'rgba(255,255,255,0.07)'}`, padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transition: 'border-color 0.3s, transform 0.35s', transform: hov ? 'translateY(-6px)' : 'translateY(0)' }}>
      <div style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${hov ? '#e11d27' : 'rgba(225,29,39,0.35)'}`, background: '#0a0a14', flexShrink: 0, transition: 'border-color 0.3s' }}>
        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: '#ffffff', marginBottom: 5, letterSpacing: '0.02em' }}>{member.name}</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#e11d27', letterSpacing: '0.04em' }}>{member.role}</div>
      </div>
      {/* <div style={{ display: 'flex', gap: 10 }}>
        {(['LI', 'GH'] as const).map((icon) => (
          <a key={icon} href="#" onClick={(e) => e.preventDefault()}
            style={{ width: 34, height: 34, borderRadius: 7, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: '0.05em', color: 'rgba(240,240,245,0.35)', textDecoration: 'none', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e11d27'; e.currentTarget.style.color = '#e11d27' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = 'rgba(240,240,245,0.35)' }}>
            {icon}
          </a>
        ))}
      </div> */}
    </div>
  )
}

// ── Rocket SVG ────────────────────────────────────────────────────────────────

function RocketSVG({ size = 300, style }: { size?: number; style?: CSSProperties }) {
  const uid = useRef(`r${Math.random().toString(36).slice(2, 7)}`).current

  return (
    <svg width={Math.round(size * 0.667)} height={size} viewBox="0 0 200 300" style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}f1`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}f2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="48%" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1c1c2c" /><stop offset="50%" stopColor="#26263e" /><stop offset="100%" stopColor="#1c1c2c" />
        </linearGradient>
      </defs>

      {/* Flames with flicker */}
      <g style={{ animation: 'flicker 0.28s ease-in-out infinite', transformOrigin: '100px 197px' }}>
        <path d="M72 197 Q68 240 70 295 Q77 252 80 197 Z" fill={`url(#${uid}f1)`} />
        <path d="M120 197 Q124 240 130 295 Q123 252 128 197 Z" fill={`url(#${uid}f1)`} />
        <path d="M90 197 Q84 252 100 300 Q116 252 110 197 Z" fill={`url(#${uid}f2)`} />
      </g>

      {/* Engine */}
      <rect x="65" y="180" width="70" height="19" rx="2" fill="#0c0c1a" />
      <rect x="68" y="183" width="18" height="13" rx="2" fill="#06060e" />
      <rect x="91" y="183" width="18" height="13" rx="2" fill="#06060e" />
      <rect x="114" y="183" width="18" height="13" rx="2" fill="#06060e" />

      {/* Left wing */}
      <path d="M68 93 L5 182 L68 169 Z" fill="#181825" />
      <path d="M68 93 L5 182 L68 169" stroke="#e11d27" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <line x1="36" y1="155" x2="68" y2="131" stroke="#e11d27" strokeWidth="1" opacity="0.45" />

      {/* Right wing */}
      <path d="M132 93 L195 182 L132 169 Z" fill="#181825" />
      <path d="M132 93 L195 182 L132 169" stroke="#e11d27" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <line x1="164" y1="155" x2="132" y2="131" stroke="#e11d27" strokeWidth="1" opacity="0.45" />

      {/* Body */}
      <rect x="68" y="70" width="64" height="112" fill={`url(#${uid}b)`} rx="3" />
      <line x1="68" y1="95" x2="132" y2="95" stroke="#2e2e46" strokeWidth="1" />
      <line x1="68" y1="120" x2="132" y2="120" stroke="#2e2e46" strokeWidth="1" />
      <line x1="68" y1="145" x2="132" y2="145" stroke="#2e2e46" strokeWidth="1" />
      <line x1="100" y1="70" x2="100" y2="182" stroke="#2e2e46" strokeWidth="1" />
      <line x1="84" y1="95" x2="84" y2="182" stroke="#242438" strokeWidth="0.6" />
      <line x1="116" y1="95" x2="116" y2="182" stroke="#242438" strokeWidth="0.6" />

      {/* Red trims */}
      <rect x="68" y="173" width="64" height="5" fill="#e11d27" />
      <rect x="68" y="89" width="64" height="3" fill="#e11d27" opacity="0.55" />

      {/* Blue sensor windows */}
      <rect x="75" y="104" width="12" height="8" rx="2" fill="#38bdf8" opacity="0.82" />
      <rect x="113" y="104" width="12" height="8" rx="2" fill="#38bdf8" opacity="0.82" />

      {/* Nose */}
      <path d="M68 73 Q100 8 132 73 Z" fill="#14142a" />
      <path d="M76 71 Q100 16 124 71" stroke="#32325a" strokeWidth="1" fill="none" />

      {/* Cockpit */}
      <ellipse cx="100" cy="55" rx="18" ry="14" fill="#7dd3fc" opacity="0.9" />
      <ellipse cx="100" cy="55" rx="13" ry="10" fill="#bae6fd" opacity="0.75" />
      <ellipse cx="96" cy="51" rx="5" ry="3.5" fill="white" opacity="0.3" />

      {/* Tip */}
      <ellipse cx="100" cy="16" rx="5.5" ry="8.5" fill="#e11d27" />
      <ellipse cx="100" cy="11" rx="2.5" ry="4" fill="#ff3344" opacity="0.45" />
    </svg>
  )
}

// ── Global Rocket — fixed, scroll-driven across the entire page ────────────────

function GlobalRocket() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Rocket starts at 320px (hero size) and shrinks to 190px equivalent over the first 6% of scroll
    const MIN_SCALE = 190 / 320  // ~0.594
    const TRANSITION_END = 0.06

    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0
      const { x, y, rot } = getRocketState(progress)

      const t = Math.min(1, progress / TRANSITION_END)
      const scale = 1 - (1 - MIN_SCALE) * t
      const opacity = 1 - 0.28 * t  // 1 → 0.72

      if (wrapRef.current) {
        wrapRef.current.style.left = `${x}%`
        wrapRef.current.style.top = `${y}%`
        wrapRef.current.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`
        wrapRef.current.style.opacity = `${opacity}`
      }
      if (scaleRef.current) {
        scaleRef.current.style.transform = `scale(${scale})`
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="global-rocket" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10, overflow: 'hidden' }}>
      <div ref={wrapRef} style={{ position: 'absolute', willChange: 'left, top, transform, opacity', filter: 'drop-shadow(0 0 18px rgba(56,189,248,0.22))' }}>
        <div ref={scaleRef} style={{ transformOrigin: 'center center', willChange: 'transform' }}>
          <RocketSVG size={320} />
        </div>
      </div>
    </div>
  )
}

// ── Scroll progress bar ───────────────────────────────────────────────────────

function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const p = maxScroll > 0 ? window.scrollY / maxScroll : 0
      if (barRef.current) barRef.current.style.width = `${p * 100}%`
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div style={{ position: 'fixed', top: 64, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.04)', zIndex: 49, pointerEvents: 'none' }}>
      <div ref={barRef} style={{ height: '100%', background: 'linear-gradient(90deg, #e11d27 0%, #ff5566 100%)', width: '0%', boxShadow: '0 0 6px rgba(225,29,39,0.6)' }} />
    </div>
  )
}

// ── NavBar ────────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? 'rgba(5,5,10,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid rgba(225,29,39,0.2)' : '1px solid transparent', transition: 'all 0.4s ease' }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src={logoImg} alt="Tech Shuttle" style={{ height: 36, width: 36, objectFit: 'contain' }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, color: '#f0f0f5', letterSpacing: '0.06em' }}>TECH SHUTTLE</span>
        </a>

        <div className="nav-links" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {(['Home', 'About', 'Events', 'Team'] as const).map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`}
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(240,240,245,0.65)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#e11d27')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,245,0.65)')}>
              {label.toUpperCase()}
            </a>
          ))}
        </div>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="nav-hamburger" aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}>
          <span style={{ display: 'block', width: 22, height: 2, background: '#f0f0f5', borderRadius: 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#f0f0f5', borderRadius: 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: '#f0f0f5', borderRadius: 1 }} />
        </button>
      </nav>

      {menuOpen && (
        <div style={{ background: 'rgba(5,5,10,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 24px 20px' }}>
          {(['Home', 'About', 'Events', 'Team'] as const).map((label) => (
            <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(240,240,245,0.7)', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {label.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 80)

    const onScroll = () => {
      const y = window.scrollY
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.12}px)`
        contentRef.current.style.opacity = `${Math.max(0, 1 - y / 550)}`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="home" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glows */}
      <div style={{ position: 'absolute', right: '5%', top: '40%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '5%', top: '20%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(225,29,39,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="hero-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 48 }}>

        {/* Left: text */}
        <div
          ref={contentRef}
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(28px)', transition: 'opacity 0.9s ease, transform 0.9s ease', willChange: 'transform, opacity' }}
        >
          <Label>Technical Society of BVCOE</Label>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(72px, 10vw, 128px)', fontWeight: 900, lineHeight: 0.95, color: '#ffffff', marginBottom: 28, letterSpacing: '-0.01em' }}>
            TECH<br />SHUTTLE
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.78, color: 'rgba(240,240,245,0.58)', maxWidth: 420, marginBottom: 44 }}>
            Propelling students beyond limits through code, creativity,
            and relentless curiosity. We launch ideas and land them.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#about"
              style={{ display: 'inline-block', background: '#e11d27', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', padding: '14px 38px', borderRadius: 5, textDecoration: 'none', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#c0141e'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#e11d27'; e.currentTarget.style.transform = 'translateY(0)' }}>
              EXPLORE
            </a>
            <a href="#events"
              style={{ display: 'inline-block', background: 'transparent', color: 'rgba(240,240,245,0.72)', fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: '0.18em', padding: '14px 38px', borderRadius: 5, textDecoration: 'none', border: '1px solid rgba(240,240,245,0.2)', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e11d27'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(240,240,245,0.2)'; e.currentTarget.style.color = 'rgba(240,240,245,0.72)' }}>
              PAST EVENTS
            </a>
          </div>
        </div>

        {/* Right: ambient glow — global rocket sits here at scroll=0 */}
        <div className="hero-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div style={{ width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(225,29,39,0.04) 55%, transparent 70%)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: mounted ? 0.45 : 0, transition: 'opacity 1s ease 1.2s' }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: '0.25em', color: 'rgba(240,240,245,0.6)' }}>SCROLL</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(225,29,39,0.8), transparent)', animation: 'float 1.8s ease-in-out infinite' }} />
      </div>
    </section>
  )
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  const [textRef, textVisible] = useReveal()
  const [statsRef, statsVisible] = useReveal()

  const stats = [
    { value: '400+', label: 'Members', sub: 'Active students across all years' },
    { value: '30+', label: 'Events', sub: 'Hackathons, talks & workshops' },
    { value: '6', label: 'Departments', sub: 'Technical, Design, Operational & more' },
    { value: '2022', label: 'Founded', sub: 'Four years of innovation' },
  ]

  return (
    <section id="about" style={{ padding: '140px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

        {/* Left: text block */}
        <div ref={textRef}>
          <div className={`reveal${textVisible ? ' in' : ''}`}>
            <Label>About Us</Label>
          </div>
          <h2 className={`reveal d1${textVisible ? ' in' : ''}`}
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.05, marginBottom: 28, letterSpacing: '-0.01em' }}>
            Built by Students,<br />Powered by Passion
          </h2>
          <p className={`reveal d2${textVisible ? ' in' : ''}`}
            style={{ fontSize: 16, lineHeight: 1.82, color: 'rgba(240,240,245,0.58)', marginBottom: 18 }}>
            Tech Shuttle is the official tech society of our college, dedicated to fostering innovation, collaboration, and technical excellence. We organize coding competitions, hackathons, workshops, and tech talks to help students enhance their skills in programming, AI, web development, and more. Our mission is to create a dynamic community where tech enthusiasts can learn, grow, and push the boundaries of technology together. 🚀

          </p>
          <p className={`reveal d3${textVisible ? ' in' : ''}`}
            style={{ fontSize: 16, lineHeight: 1.82, color: 'rgba(240,240,245,0.58)', marginBottom: 48 }}>
            From hackathons and robotics battles to open source sprints and industry talks,
            we create launchpads, not ceilings. Every member who joins becomes part of a
            crew destined to go further.
          </p>

          {/* Key value props */}
          {[
            { icon: '⚡', title: 'Hands-on Learning', desc: 'Interactive Workshops, Best Resources' },
            { icon: '🌐', title: 'Industry Connect', desc: 'Mentors from Seniors' },
            { icon: '🏆', title: 'Competitive Edge', desc: 'Hackathons and competitions' },
          ].map((item, i) => (
            <div key={item.title} className={`reveal d${i + 2}${textVisible ? ' in' : ''}`}
              style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20, padding: '16px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, color: '#ffffff', letterSpacing: '0.02em', marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(240,240,245,0.45)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: stats grid */}
        <div ref={statsRef} style={{ position: 'sticky', top: 100 }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            {stats.map((s, i) => (
              <div key={s.label}
                className={`reveal-scale d${i + 1}${statsVisible ? ' in' : ''}`}
                style={{ padding: '44px 32px', background: '#0d0d1c', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : undefined, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 64, fontWeight: 900, color: '#e11d27', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em', marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(240,240,245,0.38)', lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Circuit decoration below stats */}
          <div style={{ marginTop: 24, padding: '24px', background: '#0d0d1c', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: CIRCUIT_BG, backgroundSize: '150px 150px', opacity: 0.6 }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 700, color: 'rgba(240,240,245,0.55)', letterSpacing: '0.04em', margin: 0 }}>
                "Dare to engineer the impossible."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Events Section ────────────────────────────────────────────────────────────

function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [dotIdx, setDotIdx] = useState(0)
  const lastDotRef = useRef(0)

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current || !carouselRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrolled = -rect.top
      const scrollable = sectionRef.current.offsetHeight - window.innerHeight
      if (scrolled < 0 || scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))

      const cardWidth = Math.min(window.innerWidth * 0.82, 760)
      carouselRef.current.style.transform = `translateX(${-progress * (EVENTS.length - 1) * (cardWidth + 24)}px)`

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`
      }

      const ni = Math.round(progress * (EVENTS.length - 1))
      if (ni !== lastDotRef.current) { lastDotRef.current = ni; setDotIdx(ni) }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <section ref={sectionRef} id="events" className="events-section"
      style={{ height: `${100 + (EVENTS.length - 1) * 100}vh`, position: 'relative' }}>
      <div className="events-sticky" style={{ position: 'sticky', top: 0, height: '100vh', backgroundColor: '#07070f', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Heading */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px 20px', width: '100%', flexShrink: 0 }}>
          <Label>Milestones</Label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0 }}>
              Past Events
            </h2>
            <span className="events-scroll-hint" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 12, color: 'rgba(240,240,245,0.3)', letterSpacing: '0.2em' }}>
              SCROLL TO NAVIGATE ↓↑
            </span>
          </div>
        </div>

        {/* Carousel — overflow:hidden clips the sliding track */}
        <div className="events-carousel-outer" style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div className="events-carousel-inner" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', overflow: 'hidden' }}>
            <div ref={carouselRef} className="events-carousel-track" style={{ display: 'flex', gap: 24, willChange: 'transform' }}>
              {EVENTS.map((ev) => (
                <div key={ev.id} className="event-card-grid"
                  style={{ flex: '0 0 min(82vw, 760px)', display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 3fr', background: '#0d0d1c', borderRadius: 16, border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', minHeight: 280 }}>
                  <div className="event-image-frame" style={{ background: '#05050a', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 12 }}>
                    <img className="event-poster-image" src={ev.image} alt={ev.name}
                      style={{ width: '100%', height: '100%', maxHeight: 'min(56vh, 460px)', objectFit: 'contain', display: 'block' }} />
                  </div>
                  <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                    <span style={{ display: 'inline-block', background: 'rgba(225,29,39,0.1)', color: '#e11d27', border: '1px solid rgba(225,29,39,0.25)', borderRadius: 20, padding: '3px 14px', fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.14em', width: 'fit-content' }}>
                      {ev.date}
                    </span>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800, color: '#ffffff', lineHeight: 1.15, margin: 0, letterSpacing: '-0.01em' }}>
                      {ev.name}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.78, color: 'rgba(240,240,245,0.52)', margin: 0 }}>
                      {ev.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="events-timeline" style={{ maxWidth: 1200, margin: '0 auto', padding: '12px 24px 32px', width: '100%', flexShrink: 0 }}>
          <div style={{ position: 'relative', paddingTop: 24 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.08)', transform: 'translateY(-50%)' }} />
            <div ref={progressBarRef} style={{ position: 'absolute', top: '50%', left: 0, height: 2, background: 'linear-gradient(90deg, #e11d27, #ff4455)', transform: 'translateY(-50%)', width: '0%', boxShadow: '0 0 8px rgba(225,29,39,0.55)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {EVENTS.map((ev, i) => (
                <div key={ev.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: i === dotIdx ? 18 : 10, height: i === dotIdx ? 18 : 10, borderRadius: '50%', background: i <= dotIdx ? '#e11d27' : '#1e1e2e', border: i === dotIdx ? '3px solid rgba(225,29,39,0.3)' : '2px solid rgba(255,255,255,0.14)', boxShadow: i === dotIdx ? '0 0 16px rgba(225,29,39,0.7)' : 'none', transition: 'all 0.3s' }} />
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, color: i === dotIdx ? '#e11d27' : 'rgba(240,240,245,0.28)', letterSpacing: '0.08em', whiteSpace: 'nowrap', transition: 'color 0.3s' }}>
                    {ev.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Team Section ──────────────────────────────────────────────────────────────

function TeamGroup({ title, members, centered = false }: { title: string; members: Member[]; centered?: boolean }) {
  const [groupRef, groupVisible] = useReveal<HTMLDivElement>()

  return (
    <div ref={groupRef} style={{ marginTop: 64 }}>
      <h3 className={`reveal${groupVisible ? ' in' : ''}`}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em', margin: '0 0 28px', textAlign: centered ? 'center' : 'left', textTransform: 'uppercase' }}>
        {title}
      </h3>
      <div
        className={centered ? 'faculty-grid' : 'team-grid'}
        style={{
          display: 'grid',
          gridTemplateColumns: centered ? 'minmax(260px, 300px)' : 'repeat(4, minmax(0, 1fr))',
          gap: 24,
          justifyContent: centered ? 'center' : 'stretch',
        }}>
        {members.map((member, i) => (
          <div key={member.id} className={`reveal-scale d${Math.min(i + 1, 5)}${groupVisible ? ' in' : ''}`}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  )
}

function DeptSubGroup({ title, members }: { title: string; members: Member[] }) {
  const [subRef, subVisible] = useReveal<HTMLDivElement>()

  return (
    <div ref={subRef} style={{ marginTop: 48 }}>
      <div className={`reveal${subVisible ? ' in' : ''}`}
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ width: 28, height: 2, background: '#e11d27', borderRadius: 2, flexShrink: 0 }} />
        <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(19px, 2.2vw, 24px)', fontWeight: 700, color: 'rgba(240,240,245,0.92)', letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
          {title}
        </h4>
      </div>
      <div
        className="dept-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))',
          gap: 24,
          justifyContent: 'center',
        }}>
        {members.map((member, i) => (
          <div key={member.id} className={`reveal-scale d${Math.min(i + 1, 5)}${subVisible ? ' in' : ''}`}>
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  )
}

function DepartmentHeadsGroup() {
  const [headRef, headVisible] = useReveal<HTMLDivElement>()

  return (
    <div ref={headRef} style={{ marginTop: 64 }}>
      <h3 className={`reveal${headVisible ? ' in' : ''}`}
        style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 800, color: '#ffffff', letterSpacing: '0.04em', margin: '0 0 8px', textAlign: 'left', textTransform: 'uppercase' }}>
        Department Heads
      </h3>
      {DEPT_GROUPS.map((group) => (
        <DeptSubGroup key={group.title} title={group.title} members={group.members} />
      ))}
    </div>
  )
}

function TeamSection() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="team" style={{ padding: '140px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div ref={headRef}>
        <Label><span className={`reveal${headVisible ? ' in' : ''}`}>The Crew</span></Label>
        <h2 className={`reveal d1${headVisible ? ' in' : ''}`}
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.02, letterSpacing: '-0.01em', margin: 0 }}>
          Meet the Team
        </h2>
      </div>

      <TeamGroup title="Faculty Head" members={[FACULTY_HEAD]} centered />
      <TeamGroup title="Core Members" members={CORE_TEAM} />
      <DepartmentHeadsGroup />
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#030308', borderTop: '1px solid rgba(225,29,39,0.18)', padding: '80px 24px 44px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: CIRCUIT_BG, backgroundSize: '200px 200px', opacity: 0.5, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 48, alignItems: 'center', marginBottom: 60 }}>

          {/* Logo */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <img src={logoImg} alt="Tech Shuttle" style={{ height: 44, width: 44, objectFit: 'contain' }} />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '0.07em' }}>TECH SHUTTLE</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(240,240,245,0.36)', lineHeight: 1.7, maxWidth: 260 }}>
              Propelling the next generation of engineers beyond the stratosphere.
            </p>
          </div>

          {/* Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
            {(['HOME', 'ABOUT', 'EVENTS', 'TEAM'] as const).map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(240,240,245,0.32)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e11d27')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,240,245,0.32)')}>
                {label}
              </a>
            ))}
          </nav>

          {/* Socials — note: the global rocket naturally arrives here on scroll */}
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 20 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <SocialLink href="https://www.instagram.com/techshuttle.bvcoe/" label="Instagram" icon={<InstagramIcon />} />
              <SocialLink href="https://www.linkedin.com/company/techshuttle-bvcoe/posts/?feedView=all" label="LinkedIn" icon={<LinkedInIcon />} />
            </div>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, color: 'rgba(240,240,245,0.28)', letterSpacing: '0.08em', textAlign: 'right', maxWidth: 220 }}>
              Let's Grow Together<br />With Tech Shuttle<br />🚀

            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 16, fontFamily: "'Barlow Condensed', sans-serif", color: 'rgba(240,240,245,0.2)', letterSpacing: '0.06em' }}>
            &copy; 2026 TECH SHUTTLE. ALL SYSTEMS GO. <br />Built with passion, launched with purpose.
          </span>

        </div>
      </div>
    </footer>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ backgroundColor: '#05050a', backgroundImage: CIRCUIT_BG, backgroundSize: '200px 200px', minHeight: '100vh', color: '#f0f0f5' }}>
      <GlobalRocket />
      <ScrollProgressBar />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <TeamSection />
      <Footer />
    </div>
  )
}
