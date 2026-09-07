import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import logo from './assets/khaledjimale_logos.png'
import profileImg from './assets/my-images/khaledjimale.jpg'
import seminarImg from './assets/my-images/seminar.jpg'
import bileWorkshopImg from './assets/my-images/Bile_Initiative.jpg'
import bileTrainingImg from './assets/my-images/Bile_initiative_01.jpg'
import bileLaunchImg from './assets/my-images/Daahfurka_Mashruuc_bile.jpg'
import './App.css'

const profile = {
  name: 'Khalid Abdulkadir Jimale',
  email: 'khaalidabdi21@gmail.com',
  phone: '+252612334705',
  phoneHref: '+252612334705',
  location: 'Mogadishu, Somalia',
  role: 'Computer Science Student & Software Developer',
  summary:
    'I craft modern, high-performance web applications with Java, React, TypeScript, and Node.js. Dedicated to clean architecture, interactive user experiences, and continuous learning.',
}

const skills = [
  'Java',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Express.js',
  'Data Structures',
  'Algorithms',
  'AI Integration',
  'REST APIs',
  'Git & GitHub',
]

const projects = [
  {
    title: 'Smart Property Registration & Recovery system',
    tag: 'Full-Stack Platform',
    description:
      'A property registration and recovery platform that helps owners register belongings, transfer ownership, and report lost or stolen items, with dedicated workflows for shopkeepers and police.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    href: 'https://github.com/khaledjimale/smart-property-tracking',
    cta: 'View on GitHub',
  },
  {
    title: 'Benadir App for Online Learning',
    tag: 'EdTech Platform',
    description:
      'A comprehensive online learning platform built to help students access courses, track academic progress, and study seamlessly from anywhere.',
    stack: ['React', 'Node.js', 'Express', 'Tailwind'],
    href: null as string | null,
    cta: null as string | null,
  },
  {
    title: 'Wargeyska Media & News Platform',
    tag: 'Live Web App',
    description:
      'A real-world online publication and media platform serving readers daily. Optimized for speed, mobile readability, and content delivery.',
    stack: ['React', 'CMS', 'Responsive Design', 'SEO'],
    href: 'https://wargeyska.net/',
    cta: 'Visit Live Website',
  },
]

const navLinks = [
  { label: 'About', subtitle: 'Who I am & core skills', href: '#about' },
  { label: 'Experience', subtitle: 'Seminars & professional growth', href: '#experience' },
  { label: 'Work', subtitle: 'Featured projects & web apps', href: '#work' },
  { label: 'Contact', subtitle: 'Get in touch & direct line', href: '#contact' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const socials = [
  {
    name: 'GitHub',
    handle: '@khaledjimale',
    href: 'https://github.com/khaledjimale',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: 'Khalid Jimale',
    href: 'https://www.linkedin.com/in/khaled-abdikadir-jimale-5a670622a/',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+252 612 334 705',
    href: 'https://wa.me/252612334705',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.12c-.24.68-1.2 1.24-1.96 1.38-.52.1-1.2.18-3.48-.77-2.92-1.21-4.8-4.18-4.95-4.38-.15-.2-1.18-1.57-1.18-3 0-1.43.75-2.14 1.02-2.43.27-.29.59-.36.79-.36.2 0 .4 0 .57.01.18.01.43-.07.67.5.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.32.4-.46.54-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12.99 2.07 1.3 2.36 1.45.3.15.47.13.64-.07.17-.2.74-.86.94-1.15.2-.29.4-.24.67-.14.27.1.72.81.72.81z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    handle: 'khaalidabdi21@gmail.com',
    href: 'mailto:khaalidabdi21@gmail.com',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
]

type Theme = 'light' | 'dark' | 'system'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    return saved || 'system'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    const root = document.documentElement

    const applyTheme = () => {
      let activeTheme: 'light' | 'dark' = 'dark'
      if (theme === 'system') {
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      } else {
        activeTheme = theme
      }
      root.setAttribute('data-theme', activeTheme)
    }

    applyTheme()

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const listener = () => applyTheme()
      mediaQuery.addEventListener('change', listener)
      return () => mediaQuery.removeEventListener('change', listener)
    }
  }, [theme])

  return [theme, setTheme] as const
}

function ThemeToggle({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme mode">
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'light' ? 'theme-toggle__btn--active' : ''}`}
        onClick={() => setTheme('light')}
        title="Light Mode"
        aria-label="Light mode"
      >
        ☀️ <span className="theme-toggle__label">Light</span>
      </button>
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'dark' ? 'theme-toggle__btn--active' : ''}`}
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        aria-label="Dark mode"
      >
        🌙 <span className="theme-toggle__label">Dark</span>
      </button>
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'system' ? 'theme-toggle__btn--active' : ''}`}
        onClick={() => setTheme('system')}
        title="System Preference"
        aria-label="System preference"
      >
        💻 <span className="theme-toggle__label">System</span>
      </button>
    </div>
  )
}

function App() {
  const [theme, setTheme] = useTheme()
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const motionProps = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.25 },
        variants: fadeUp,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <div className="page">
      {/* Dynamic Background Atmosphere with Noise Texture Dots */}
      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__glow atmosphere__glow--a" />
        <div className="atmosphere__glow atmosphere__glow--b" />
        <div className="atmosphere__glow atmosphere__glow--c" />
      </div>

      {/* Navigation Header */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a className="nav__brand" href="#top" onClick={() => setMenuOpen(false)} aria-label="Khaled Jimale Home">
          <img src={logo} alt="Khaled Jimale Logo" className="nav__logo-img" />
        </a>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle theme={theme} setTheme={setTheme} />

        <a className="nav__cta" href={`mailto:${profile.email}`}>
          Get in Touch
        </a>
        <button
          className={`nav__toggle ${menuOpen ? 'nav__toggle--open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu__header">
              <div className="mobile-menu__brand">
                <img src={logo} alt="Khaled Jimale Logo" className="mobile-menu__logo" />
              </div>
              <button
                className="mobile-menu__close"
                type="button"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className="mobile-menu__nav" aria-label="Mobile links">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  className="mobile-menu__link"
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mobile-menu__link-num">0{idx + 1}</span>
                  <div className="mobile-menu__link-text">
                    <span className="mobile-menu__link-title">{link.label}</span>
                    <span className="mobile-menu__link-sub">{link.subtitle}</span>
                  </div>
                  <span className="mobile-menu__link-arrow">→</span>
                </a>
              ))}
            </nav>

            <div className="mobile-menu__footer">
              <div className="mobile-menu__theme-wrap">
                <span className="mobile-menu__theme-label">Theme Preference:</span>
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
              <a
                className="mobile-menu__cta-btn"
                href={`mailto:${profile.email}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>Get in Touch</span>
                <span>→</span>
              </a>
              <div className="mobile-menu__meta">
                <span>📍 {profile.location}</span>
                <span>📧 {profile.email}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top">
        {/* Hero Section */}
        <section className="hero">
          <motion.div
            className="hero__content"
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero__badge">
              <span className="hero__badge-pulse" />
              <span>{profile.role}</span>
            </div>
            <h1 className="hero__name">
              <span className="hero__name-first">Khalid Abdulkadir</span>
              <span className="hero__name-accent">Jimale</span>
            </h1>
            <p className="hero__lede">{profile.summary}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#work">
                Explore Projects
                <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn--ghost" href="#contact">
                Contact Me
              </a>
              <div className="hero__socials">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="hero__social-icon-btn"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Profile Photo Frame */}
            <div className="hero__profile-card">
              <div className="hero__profile-inner">
                <img
                  src={profileImg}
                  alt="Khalid Abdulkadir Jimale"
                  className="hero__profile-img"
                />
                <div className="hero__profile-overlay">
                  <div className="hero__profile-info">
                    <span className="hero__profile-name">Khalid Jimale</span>
                    <span className="hero__profile-tag">Mogadishu, Somalia</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Logo Banner */}
            <div className="hero__logo-banner">
              <img src={logo} alt="Khaled Jimale Branding" className="hero__logo-banner-img" />
              <div className="hero__logo-banner-meta">
                <span>Status</span>
                <span>Open for Opportunities</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="section about">
          <motion.div className="section__inner" {...motionProps}>
            <p className="section__label">About Me</p>
            <h2 className="section__title">Building software with precision & passion.</h2>
            <p className="section__copy">
              Based in Mogadishu, Somalia, I am a Computer Science student dedicated to creating impactful digital solutions. I combine strong foundational technical knowledge in Java and web technologies with modern React frameworks to deliver intuitive, high-performance applications.
            </p>
            <ul className="skills" aria-label="Skills & Technologies">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Experience & Seminar Spotlight */}
        <section id="experience" className="section experience">
          <div className="section__inner">
            <motion.div {...motionProps}>
              <p className="section__label">Professional Growth</p>
              <h2 className="section__title">Continuous Learning & Community.</h2>
              <p className="section__copy">
                Actively engaging in tech workshops, career development forums, and industry certifications to stay ahead in modern software engineering.
              </p>
            </motion.div>

            <motion.article className="spotlight-card bile-training" {...motionProps}>
              <div className="bile-training__gallery" aria-label="Bile Initiative training photos">
                <img src={bileLaunchImg} alt="Participants at the Bile Initiative 2026 launch" width="2048" height="1365" loading="lazy" />
                <img src={bileWorkshopImg} alt="Attendees listening during a Bile Initiative workshop" width="1080" height="719" loading="lazy" />
                <img src={bileTrainingImg} alt="Participants taking part in a Bile Initiative training session" width="1080" height="719" loading="lazy" />
              </div>
              <div className="spotlight-card__content">
                <span className="spotlight-card__badge">Software Development Training</span>
                <h3 className="spotlight-card__title">Bile Initiative 2026</h3>
                <p className="bile-training__dates"><time dateTime="2026-08-20">20 August 2026</time> – <time dateTime="2026-09-03">3 September 2026</time></p>
                <p className="spotlight-card__desc">Completed the Software Development track, gaining practical experience through real-life projects and receiving a certificate of participation.</p>
                <p className="spotlight-card__desc bile-training__context">The programme trained 150 university students across Software Development, Software Analysis, Artificial Intelligence, and Cloud Computing.</p>
              </div>
            </motion.article>

            <motion.div
              className="spotlight-card"
              {...(reduceMotion
                ? {}
                : {
                    initial: 'hidden',
                    whileInView: 'show',
                    viewport: { once: true, amount: 0.3 },
                    variants: fadeUp,
                    transition: { duration: 0.7, delay: 0.1 },
                  })}
            >
              <div className="spotlight-card__image-wrap">
                <img
                  src={seminarImg}
                  alt="Certification Pathways for Market Readiness Seminar"
                  className="spotlight-card__image"
                />
              </div>
              <div className="spotlight-card__content">
                <span className="spotlight-card__badge">Industry Forum</span>
                <h3 className="spotlight-card__title">
                  Certification Pathways for Market Readiness
                </h3>
                <p className="spotlight-card__desc">
                  Participated in specialized professional seminars focused on transforming academic graduation skills into market-ready software engineering standards and tech employability.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Selected Work Section */}
        <section id="work" className="section work">
          <div className="section__inner">
            <motion.div {...motionProps}>
              <p className="section__label">Featured Work</p>
              <h2 className="section__title">Crafted Digital Products.</h2>
              <p className="section__copy">
                A selection of platforms built with modern web technologies, focusing on clean interface design, real user utility, and performance.
              </p>
            </motion.div>

            <div className="project-grid">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="project-card"
                  {...(reduceMotion
                    ? {}
                    : {
                        initial: 'hidden',
                        whileInView: 'show',
                        viewport: { once: true, amount: 0.3 },
                        variants: fadeUp,
                        transition: {
                          duration: 0.65,
                          delay: index * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      })}
                >
                  <div className="project-card__top">
                    <span className="project-card__tag">{project.tag}</span>
                    <span className="project-card__index">0{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.description}</p>
                  </div>
                  <div className="project-card__footer">
                    <ul className="project-card__stack">
                      {project.stack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {project.href && (
                      <a
                        className="project-card__link"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.cta}
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section contact">
          <motion.div className="section__inner" {...motionProps}>
            <p className="section__label">Get In Touch</p>
            <h2 className="section__title">Let&apos;s Build Something Remarkable.</h2>
            <p className="section__copy">
              Whether you have a project in mind, a potential collaboration, or just want to connect, feel free to reach out directly.
            </p>

            <div className="contact__grid">
              <a className="contact__item" href={`mailto:${profile.email}`}>
                <span className="contact__key">Email</span>
                <span className="contact__value">{profile.email}</span>
              </a>
              <a className="contact__item" href={`tel:${profile.phoneHref}`}>
                <span className="contact__key">Phone</span>
                <span className="contact__value">{profile.phone}</span>
              </a>
              <div className="contact__item contact__item--static">
                <span className="contact__key">Location</span>
                <span className="contact__value">{profile.location}</span>
              </div>
            </div>

            <p className="contact__social-label">Connect across social platforms:</p>
            <div className="social-grid">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-card"
                >
                  <div className="social-card__icon-wrap">{social.icon}</div>
                  <div className="social-card__info">
                    <span className="social-card__name">{social.name}</span>
                    <span className="social-card__handle">{social.handle}</span>
                  </div>
                  <span className="social-card__arrow">↗</span>
                </a>
              ))}
            </div>

            <div className="contact__cta-wrap">
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                Send an Email
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__brand">
          <img src={logo} alt="Khaled Jimale Logo" className="footer__logo" />
        </div>
        <div className="footer__socials">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              title={social.name}
              className="footer__social-link"
            >
              {social.icon}
            </a>
          ))}
        </div>
        <div className="footer__text">
          <span>© {new Date().getFullYear()} All rights reserved.</span>
          <span>Designed & Built in Mogadishu, Somalia.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
