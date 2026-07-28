import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import logo from './assets/khaledjimale_logo.png'
import profileImg from './assets/my-images/khaledjimale.jpg'
import seminarImg from './assets/my-images/seminar.jpg'
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
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

function App() {
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
      {/* Dynamic Background Atmosphere */}
      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__glow atmosphere__glow--a" />
        <div className="atmosphere__glow atmosphere__glow--b" />
        <div className="atmosphere__glow atmosphere__glow--c" />
        <div className="atmosphere__grid" />
      </div>

      {/* Navigation Header */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a className="nav__brand" href="#top" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Khaled Jimale Logo" className="nav__logo-img" />
          <span className="nav__brand-text">
            Khaled<span>Jimale</span>
          </span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
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

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} onClick={() => setMenuOpen(false)}>
            Get in Touch
          </a>
        </div>
      )}

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
          <span>Khalid Abdulkadir Jimale</span>
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
