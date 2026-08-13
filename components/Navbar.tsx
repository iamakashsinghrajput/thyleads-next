"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/components/ModalContext';

type DropdownKey = 'solutions' | 'resources' | null;

const PORTAL = 'https://www.portal-thyleads.com';
const EXTENSION_URL =
  'https://chromewebstore.google.com/detail/harvinai-tech-scanner/blmojockpggdpchlonagnhmgecbiapng';

const TOP_LINKS = [
  { name: 'PRODUCT', href: '/product' },
  { name: 'PRICING', href: '/pricing' },
];

/** Small secondary row above the main bar. */
const UTILITY_LINKS = [
  { name: 'BLOG', href: '/blog' },
  { name: 'PRIVACY', href: '/privacy' },
  { name: 'TERMS', href: '/terms' },
];

/** Flat list for the full (hamburger) menu. */
const EXPLORE_LINKS = [
  { name: 'Product', href: '/product' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
];

const CONTACT_EMAIL = 'admin@harvin.ai';

type MenuItem = {
  name: string;
  href: string;
  desc?: string;
  image?: string;
};

const SOLUTIONS: {
  byStage: MenuItem[];
  byService: MenuItem[];
  byVertical: MenuItem[];
} = {
  byStage: [
    {
      name: 'Account Intelligence',
      href: '/product',
      desc: 'Every account is a living intelligence entity.',
      image: '/nav/series-a.jpg',
    },
    {
      name: 'AI Signal Detection',
      href: '/product',
      desc: 'Funding, hiring, scaling, M&A and layoffs — scored.',
      image: '/nav/series-b.jpg',
    },
  ],
  byService: [
    {
      name: 'Campaign Orchestration',
      href: '/product',
      desc: 'Intelligence-led outbound, built from account signals.',
      image: '/nav/outbound-strategy.jpg',
    },
    {
      name: 'Verified Database',
      href: '/product',
      desc: 'Verified accounts and decision-makers',
      image: '/nav/lead-generation.jpg',
    },
    {
      name: 'Meeting Intelligence',
      href: '/product',
      desc: 'Track the full post-outbound journey',
      image: '/nav/meeting-booking.jpg',
    },
    {
      name: 'Look-a-like Accounts',
      href: '/product',
      desc: 'Find accounts like your best customers',
      image: '/nav/pipeline-management.jpg',
    },
    {
      name: 'Reports & Analytics',
      href: '/product',
      desc: 'Strategic visibility into outbound',
      image: '/nav/gtm-execution.jpg',
    },
  ],
  byVertical: [
    {
      name: 'SaaS & B2B',
      href: '/product',
      desc: 'Pipeline for modern GTM teams',
      image: '/nav/martech.jpg',
    },
    {
      name: 'FinTech',
      href: '/product',
      desc: 'Signal-led outbound for FinTech',
      image:
        '/nav/fintech.jpg',
    },
    {
      name: 'HealthTech',
      href: '/product',
      desc: 'Reach the right healthcare buyers',
      image: '/nav/hrtech.jpg',
    },
  ],
};

const RESOURCES: MenuItem[] = [
  {
    name: 'Blog',
    href: '/blog',
    desc: 'Playbooks and field notes.',
    image: '/nav/blogs.jpg',
  },
  {
    name: 'Pricing',
    href: '/pricing',
    desc: 'Simple, per-seat pricing',
    image: '/nav/case-studies.jpg',
  },
  {
    name: 'Product Tour',
    href: '/product',
    desc: 'See the platform end to end',
    image: '/nav/ai-tools.jpg',
  },
  {
    name: 'Get the Extension',
    href: EXTENSION_URL,
    desc: 'Scan any company from your browser.',
    image: '/nav/gtm-framework.jpg',
  },
];

/**
 * Nav link styling. The underline is an ::after that wipes in from the left on
 * hover; on the solid bar the label also picks up the brand colour.
 */
function navLinkClass(overlay: boolean, active: boolean) {
  const base =
    'relative inline-flex items-center px-3 py-2 text-[11px] font-bold tracking-[0.18em] transition-colors duration-200 ' +
    'after:absolute after:left-3 after:right-3 after:bottom-[3px] after:h-[2px] after:origin-left ' +
    'after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100';

  if (overlay) {
    return `${base} after:bg-white text-white/85 hover:text-white`;
  }
  return `${base} after:bg-primary-500 ${
    active
      ? 'text-primary-700 after:scale-x-100'
      : 'text-neutral-600 hover:text-primary-600'
  }`;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Panel shell. Hinges down from the top edge on the X axis — with the
 * perspective set on the wrapper this reads as a real surface swinging into
 * place rather than a flat fade.
 */
const panelVariants: Variants = {
  hidden: { opacity: 0, y: -18, rotateX: -14 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.42,
      ease: EASE_OUT,
      staggerChildren: 0.038,
      delayChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    rotateX: -10,
    transition: {
      duration: 0.22,
      ease: EASE_OUT,
      staggerChildren: 0.018,
      staggerDirection: -1,
    },
  },
};

/** Pass-through container — carries the stagger down to the cards. */
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.038 } },
  exit: { transition: { staggerChildren: 0.018, staggerDirection: -1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 26, mass: 0.7 },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: { duration: 0.14, ease: 'easeIn' },
  },
};

const labelVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
  exit: { opacity: 0, y: 4, transition: { duration: 0.12 } },
};

const Navbar: React.FC = () => {
  const { openModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  // Utility strip collapses on scroll-down, reappears on scroll-up.
  const [hideUtil, setHideUtil] = useState(false);
  const lastY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]);

  const [navHovered, setNavHovered] = useState(false);

  // The homepage hero is dark and full-bleed, so the bar floats over it until
  // you scroll past. Every other page keeps the solid bar in normal flow.
  // Hovering the bar (or opening a menu) resolves it to solid white.
  const isHome = pathname === '/';
  const overlay = isHome && !scrolled && !navHovered && !openDropdown;

  useEffect(() => {
    let raf = 0;
    // Cooldown after each toggle: collapsing/expanding the strip changes layout
    // height, which nudges scrollY and would otherwise re-trigger the handler in
    // a loop (the "bouncing"). The lock + threshold keep it from ping-ponging.
    let lockUntil = 0;
    const handleScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 20);
        // Always show the strip near the top.
        if (y < 80) {
          setHideUtil(false);
          lastY.current = y;
          return;
        }
        const now = performance.now();
        if (now < lockUntil) {
          lastY.current = y;
          return;
        }
        const delta = y - lastY.current;
        if (delta > 10) {
          setHideUtil(true);
          lockUntil = now + 400;
        } else if (delta < -10) {
          setHideUtil(false);
          lockUntil = now + 400;
        }
        lastY.current = y;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openIt = (k: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(k);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(null);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <nav
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
      className={`${isHome ? 'fixed' : 'sticky'} top-0 z-50 w-full border-b transition-all duration-300 ${
        overlay
          ? 'bg-transparent border-white/10'
          : scrolled || navHovered || openDropdown
          ? 'bg-white/95 backdrop-blur-xl border-neutral-200/80 shadow-[0_6px_24px_-12px_rgba(15,23,42,0.18)]'
          : 'bg-white border-neutral-100'
      }`}
    >
      {/* Utility strip — collapses when scrolling down and reappears when
          scrolling up (and is always shown near the top of the page). The
          outer wrapper animates its height/opacity; the inner div keeps the
          border and links unchanged. */}
      <div
        className={`hidden overflow-hidden transition-all duration-300 ease-out lg:block ${
          hideUtil ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
      <div
        className={`border-b transition-colors duration-300 ${
          overlay ? 'border-white/10' : 'border-neutral-200/70'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-2 lg:px-10">
          <div className="flex items-center gap-7">
            {UTILITY_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className={`text-[10.5px] font-bold uppercase tracking-[0.14em] transition-colors ${
                  overlay
                    ? 'text-white/70 hover:text-white'
                    : 'text-neutral-500 hover:text-primary-600'
                }`}
              >
                {l.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href={EXTENSION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] transition-colors ${
                overlay
                  ? 'text-white/70 hover:text-white'
                  : 'text-neutral-500 hover:text-primary-600'
              }`}
            >
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              Get Extension
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] transition-colors ${
                overlay
                  ? 'text-white/70 hover:text-white'
                  : 'text-neutral-500 hover:text-primary-600'
              }`}
            >
              <Mail className="h-3 w-3" strokeWidth={2.5} />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
      </div>

      {/* Main bar — logo and links both hug the left, Bain-style. */}
      <div className="relative mx-auto flex max-w-[1600px] items-center gap-8 px-6 py-3.5 lg:px-10">

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open menu"
          className={`hidden lg:flex shrink-0 flex-col justify-center gap-[5px] p-1 transition-colors ${
            overlay ? 'text-white' : 'text-neutral-900'
          }`}
        >
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
        </button>

        <Link
          href="/"
          className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-7 h-7 rounded-lg overflow-hidden">
              <Image
                src="/logo.svg"
                alt="HarvinAI"
                width={28}
                height={28}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span
            className={`text-[20px] font-bricolage font-bold tracking-wide transition-colors duration-500 ${
              overlay ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Harvin<span className="font-semibold opacity-40">AI</span>
          </span>
        </Link>

        <div className="hidden lg:flex flex-1 items-center gap-0.5">
          {TOP_LINKS.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className={navLinkClass(overlay, isActive(l.href))}
            >
              {l.name}
            </Link>
          ))}

          <MenuTrigger
            label="PLATFORM"
            active={openDropdown === 'solutions'}
            overlay={overlay}
            onOpen={() => openIt('solutions')}
            onClose={scheduleClose}
          />

          <MenuTrigger
            label="RESOURCES"
            active={openDropdown === 'resources'}
            overlay={overlay}
            onOpen={() => openIt('resources')}
            onClose={scheduleClose}
          />
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={PORTAL}
            className={`text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
              overlay ? 'text-white/85 hover:text-white' : 'text-neutral-700 hover:text-primary-600'
            }`}
          >
            Sign in
          </a>
          {overlay ? (
            <button
              type="button"
              onClick={() => openModal('early-access')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-neutral-900 transition-all duration-300 hover:bg-primary-500 hover:text-white"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                Get early access
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openModal('early-access')}
              className="relative inline-flex items-center justify-center rounded-full p-[1.5px] overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,transparent_30%,#845cf5_50%,#ffffff_60%,transparent_70%,transparent_100%)]" />
              <span className="relative flex items-center space-x-2 px-5 py-2.5 bg-neutral-900 text-white rounded-full group-hover:bg-primary-500 transition-all duration-300">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                  Get early access
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          )}
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={`p-2 transition-colors duration-500 ${
              overlay ? 'text-white' : 'text-neutral-900'
            }`}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Perspective host: gives the panel below a real vanishing point. */}
      <div className="hidden lg:block absolute inset-x-0 top-full [perspective:1800px]">
        <AnimatePresence mode="wait">
          {openDropdown && (
            <motion.div
              key={openDropdown}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseEnter={() => openIt(openDropdown)}
              onMouseLeave={scheduleClose}
              className="origin-top border-b-2 border-neutral-900/90 bg-[#f4f5f7] shadow-[0_40px_80px_-24px_rgba(15,23,42,0.45)]"
            >
              {/* Top bevel: a lit edge over a hairline shadow reads as thickness. */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />
              <div className="pointer-events-none absolute inset-x-0 top-px h-px bg-neutral-900/10" />

              <div className="relative mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
                {openDropdown === 'solutions' ? (
                  <motion.div
                    variants={groupVariants}
                    className="grid grid-cols-12 gap-5"
                  >
                    <motion.div
                      variants={groupVariants}
                      className="col-span-4 flex flex-col"
                    >
                      <PanelLabel>Intelligence</PanelLabel>
                      <div className="flex flex-1 flex-col gap-5">
                        <MenuCard
                          item={SOLUTIONS.byStage[0]}
                          onClick={close}
                          className="flex-1"
                        />
                        <MenuCard item={SOLUTIONS.byStage[1]} onClick={close} />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={groupVariants}
                      className="col-span-5 flex flex-col"
                    >
                      <PanelLabel>Workflow</PanelLabel>
                      <motion.div
                        variants={groupVariants}
                        className="grid flex-1 grid-cols-2 gap-5"
                      >
                        <MenuCard
                          item={SOLUTIONS.byService[0]}
                          onClick={close}
                          className="col-span-2"
                        />
                        {SOLUTIONS.byService.slice(1).map((item) => (
                          <MenuCard key={item.name} item={item} onClick={close} />
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={groupVariants}
                      className="col-span-3 flex flex-col"
                    >
                      <PanelLabel>For teams</PanelLabel>
                      <motion.div
                        variants={groupVariants}
                        className="flex flex-1 flex-col gap-5"
                      >
                        {SOLUTIONS.byVertical.map((item) => (
                          <MenuCard
                            key={item.name}
                            item={item}
                            onClick={close}
                            variant="ghost"
                            className="flex-1"
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={groupVariants}
                    className="grid grid-cols-4 gap-5"
                  >
                    {RESOURCES.map((item) => (
                      <MenuCard key={item.name} item={item} onClick={close} />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative origin-top overflow-hidden border-b-2 border-neutral-900/90 bg-[#f4f5f7] shadow-[0_40px_80px_-24px_rgba(15,23,42,0.45)]"
          >
            {/* Same bevelled top edge as the mega menu. */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />
            <div className="pointer-events-none absolute inset-x-0 top-px h-px bg-neutral-900/10" />

            <div className="mx-auto max-h-[calc(100vh-8rem)] max-w-[1600px] overflow-y-auto px-6 py-8 lg:px-10">
              <motion.div
                variants={groupVariants}
                className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-12"
              >
                <motion.div variants={groupVariants} className="lg:col-span-3">
                  <PanelLabel>Explore</PanelLabel>
                  <div className="flex flex-col">
                    {EXPLORE_LINKS.map((l) => (
                      <MenuLink key={l.name} href={l.href} onClose={closeMobile}>
                        {l.name}
                      </MenuLink>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={groupVariants} className="lg:col-span-6">
                  <PanelLabel>Platform</PanelLabel>
                  <div className="grid gap-x-8 sm:grid-cols-3">
                    <MenuColumn label="Intelligence" items={SOLUTIONS.byStage} onClose={closeMobile} />
                    <MenuColumn label="Workflow" items={SOLUTIONS.byService} onClose={closeMobile} />
                    <MenuColumn label="For teams" items={SOLUTIONS.byVertical} onClose={closeMobile} />
                  </div>
                </motion.div>

                <motion.div variants={groupVariants} className="lg:col-span-3">
                  <PanelLabel>Resources</PanelLabel>
                  <div className="flex flex-col">
                    {RESOURCES.map((r) => (
                      <MenuLink key={r.name} href={r.href} onClose={closeMobile}>
                        {r.name}
                      </MenuLink>
                    ))}
                  </div>

                  <div className="mt-7 border-t border-neutral-300/70 pt-5">
                    <button
                      type="button"
                      onClick={() => { closeMobile(); openModal('early-access'); }}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-white transition-colors hover:bg-primary-500"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
                        Get early access
                      </span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <div className="mt-4 flex flex-col gap-2">
                      <a href={PORTAL} className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 transition-colors hover:text-primary-600">
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                        Sign in
                      </a>
                      <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-[12px] font-medium text-neutral-500 transition-colors hover:text-primary-600">
                        <Mail className="h-3.5 w-3.5" strokeWidth={2.2} />
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

function MenuTrigger({
  label,
  active,
  overlay,
  onOpen,
  onClose,
}: {
  label: string;
  active: boolean;
  overlay: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-expanded={active}
        className={`${navLinkClass(overlay, active)} gap-1 ${
          active ? 'after:scale-x-100 text-primary-700' : ''
        }`}
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-300 ${
            active ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
    </div>
  );
}

function PanelLabel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={labelVariants}
      className={`mb-3 flex items-center gap-3 text-[9.5px] font-bold uppercase tracking-[0.28em] text-neutral-400 ${className}`}
    >
      {children}
      <span className="h-px flex-1 bg-neutral-300/70" />
    </motion.div>
  );
}

function CardArrow() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 group-hover/card:border-primary-400 group-hover/card:bg-primary-500 group-hover/card:shadow-[0_6px_14px_-4px_rgba(132,92,245,0.8)]">
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
        strokeWidth={2}
      />
    </span>
  );
}

/**
 * Stacked shadows give each card a physical thickness; on hover it lifts
 * toward the viewer instead of just changing colour.
 */
const CARD_SURFACE =
  'rounded-2xl bg-neutral-950 ring-1 ring-neutral-900/10 ' +
  'shadow-[0_1px_1px_rgba(15,23,42,0.06),0_4px_8px_-2px_rgba(15,23,42,0.10),0_12px_24px_-8px_rgba(15,23,42,0.14)] ' +
  'transition-all duration-300 ' +
  'hover:-translate-y-1 hover:ring-primary-400/60 ' +
  'hover:shadow-[0_2px_4px_rgba(15,23,42,0.08),0_12px_20px_-6px_rgba(132,92,245,0.28),0_28px_48px_-12px_rgba(132,92,245,0.40)]';

function MenuCard({
  item,
  onClick,
  className = '',
  variant = 'solid',
}: {
  item: MenuItem;
  onClick: () => void;
  className?: string;
  variant?: 'solid' | 'ghost';
}) {
  const ghost = variant === 'ghost';

  return (
    <motion.div
      variants={cardVariants}
      className={`${className}`}
    >
      <Link
        href={item.href}
        onClick={onClick}
        className={`group/card relative flex h-full flex-col justify-end overflow-hidden p-4 ${
          ghost ? 'min-h-[130px]' : 'min-h-[152px]'
        } ${CARD_SURFACE}`}
      >
        {item.image && (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover/card:scale-105"
          />
        )}

        {/* Scrim — guarantees contrast for the label whatever the artwork is. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/45 opacity-100 transition-opacity duration-500 group-hover/card:opacity-45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-700/45 via-primary-900/20 to-transparent opacity-70 transition-opacity duration-500 group-hover/card:opacity-25" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-neutral-950/95 via-neutral-950/55 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />

        <div className="relative flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
              {item.name}
            </div>
            {item.desc && (
              <p className="mt-1 text-[12px] leading-snug text-white/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {item.desc}
              </p>
            )}
          </div>
          <CardArrow />
        </div>
      </Link>
    </motion.div>
  );
}





/** Text link inside the full menu — same hover language as the nav bar. */
function MenuLink({
  href,
  children,
  onClose,
}: {
  href: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="group/ml relative inline-flex items-center gap-2 py-2 text-[15px] font-medium text-neutral-700 transition-colors hover:text-primary-600"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 bg-primary-500 transition-transform duration-300 group-hover/ml:scale-x-100" />
      </span>
      <ArrowUpRight
        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/ml:translate-x-0 group-hover/ml:opacity-100"
        strokeWidth={2.2}
      />
    </Link>
  );
}

function MenuColumn({
  label,
  items,
  onClose,
}: {
  label: string;
  items: MenuItem[];
  onClose: () => void;
}) {
  return (
    <div className="mb-5 sm:mb-0">
      <div className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.24em] text-primary-600">
        {label}
      </div>
      <div className="flex flex-col">
        {items.map((item) => (
          <MenuLink key={item.name} href={item.href} onClose={onClose}>
            {item.name}
          </MenuLink>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
