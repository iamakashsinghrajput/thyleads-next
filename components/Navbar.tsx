"use client";

import React, { useState, useEffect, useRef } from 'react';
import { portalUrl } from '@/lib/portal';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Briefcase,
  Building2,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  Compass,
  Copy,
  Cpu,
  Landmark,
  Mail,
  Megaphone,
  Menu,
  Network,
  Newspaper,
  Phone,
  Puzzle,
  Radar,
  ShoppingBag,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '@/components/ModalContext';
import Wordmark from '@/components/Wordmark';

type DropdownKey = 'platform' | 'solutions' | 'resources' | null;

const PORTAL = portalUrl();
const EXTENSION_URL =
  'https://chromewebstore.google.com/detail/harvinai-tech-scanner/blmojockpggdpchlonagnhmgecbiapng';

/**
 * PRODUCT and PLATFORM pointed at the same page, so the pair is now one
 * dropdown labelled PLATFORM — see the MenuTrigger below. Pricing has been
 * retired, which leaves this list empty; it is kept so a flat link can be added
 * back without rebuilding the row.
 */
const TOP_LINKS: { name: string; href: string }[] = [];

/** Small secondary row above the main bar. */
const UTILITY_LINKS = [
  { name: 'BLOG', href: '/blog' },
  { name: 'PRIVACY', href: '/privacy' },
  { name: 'TERMS', href: '/terms' },
];

/** Flat list for the full (hamburger) menu. */
const EXPLORE_LINKS = [
  { name: 'Platform', href: '/platform' },
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

/**
 * The Platform menu mirrors /platform one-to-one.
 *
 * /product used to hold a second copy of this material; the two have been
 * collapsed onto /platform, so every entry here deep-links to the anchor of the
 * thing it names. Adding an entry that has no matching section on /platform
 * gives the visitor a link that lands nowhere in particular — if something new
 * belongs in this menu, it needs a card or a section on the page first.
 *
 * Intelligence + Workflow are the six cards in The Platform grid; For teams are
 * the three segments in "How teams use Harvin". Slugs are the card titles
 * lowercased with non-alphanumerics collapsed to hyphens, matching the ids
 * Platform's module rows and the use-case section generate.
 */
/** The page the whole menu describes — rendered as the leading card. */
const PLATFORM_OVERVIEW: MenuItem = {
  name: 'Platform overview',
  href: '/platform',
  desc: 'Every module, how it works, and who it\u2019s for — on one page.',
  image: '/nav/gtm-framework.jpg',
};

const PLATFORM_MENU: { modules: NavLink[]; workflow: NavLink[]; teams: NavLink[] } = {
  modules: [
    { name: 'Account Intelligence', href: '/platform#account-intelligence', Icon: Building2 },
    { name: 'AI Signal Detection', href: '/platform#ai-signal-detection', Icon: Radar },
    { name: 'Watchlists', href: '/platform#watchlists', Icon: Bookmark },
    { name: 'Look-a-like Accounts', href: '/platform#look-a-like-accounts', Icon: Copy },
  ],
  workflow: [
    { name: 'Team & Territories', href: '/platform#team-territories', Icon: Users },
    {
      name: 'Campaigns & Channels',
      href: '/platform#campaigns-channels',
      Icon: Network,
      children: [
        { name: 'Email', href: '/platform#campaigns-channels' },
        { name: 'Tasks', href: '/platform#campaigns-channels' },
        { name: 'Unified Inbox', href: '/platform#campaigns-channels' },
      ],
    },
    { name: 'Dialer', href: '/platform#dialer', Icon: Phone },
    { name: 'Meetings & Handoff', href: '/platform#meetings-handoff', Icon: CalendarDays },
    { name: 'Reporting & AI Coaching', href: '/platform#reporting-ai-coaching', Icon: ChartColumn },
  ],
  teams: [
    { name: 'SaaS & Software Vendors', href: '/platform#saas-software-vendors', Icon: Cpu },
    { name: 'Agencies & Consultants', href: '/platform#agencies-consultants', Icon: Briefcase },
    { name: 'Services & Solution Providers', href: '/platform#services-solution-providers', Icon: ShoppingBag },
  ],
};

/**
 * The three verticals Harvin sells into — the SOLUTIONS menu. Content is
 * carried over from the thyleads-project site and rebuilt to this design
 * system; see app/solutions/[vertical]/page.tsx.
 */
const SOLUTIONS: MenuItem[] = [
  {
    name: 'FinTech',
    href: '/solutions/fintech',
    desc: 'Signal-led outbound for payments, lending and infrastructure.',
    image: '/nav/fintech.jpg',
  },
  {
    name: 'MarTech',
    href: '/solutions/martech',
    desc: 'Reach marketing and growth buyers while budget is moving.',
    image: '/nav/martech.jpg',
  },
  {
    name: 'HRTech',
    href: '/solutions/hrtech',
    desc: 'Find HR and people-ops teams at the moment they are scaling.',
    image: '/nav/hrtech.jpg',
  },
];

/** The same three, as links for the list-style panels. */
const SOLUTION_LINKS: NavLink[] = [
  { name: 'FinTech', href: '/solutions/fintech', Icon: Landmark },
  { name: 'MarTech', href: '/solutions/martech', Icon: Megaphone },
  { name: 'HRTech', href: '/solutions/hrtech', Icon: UserRound },
];

const RESOURCES: NavLink[] = [
  { name: 'Blog', href: '/blog', Icon: Newspaper },
  { name: 'Product Tour', href: '/platform', Icon: Compass },
  { name: 'Get the Extension', href: EXTENSION_URL, Icon: Puzzle },
];

/**
 * Nav link styling. The underline is an ::after that wipes in from the left on
 * hover; on the solid bar the label also picks up the brand colour.
 */
/** Routes whose hero is dark and full-bleed. */
const DARK_HERO_ROUTES = ['/'];

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

  // These pages open with a dark, full-bleed hero, so the bar floats over it
  // until you scroll past; every other page keeps the solid bar in normal flow.
  // Hovering the bar (or opening a menu) resolves it to solid white.
  //
  // Add a route here when you give it a dark hero — otherwise it gets the white
  // bar sitting on black, which is what /platform had.
  const hasDarkHero = DARK_HERO_ROUTES.includes(pathname);
  const overlay = hasDarkHero && !scrolled && !navHovered && !openDropdown;

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
      className={`${hasDarkHero ? 'fixed' : 'sticky'} top-0 z-50 w-full border-b transition-all duration-300 ${
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

        <Link
          href="/"
          className="flex items-center space-x-1 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
        >
          <Wordmark
            size={26}
            className={`transition-colors duration-500 ${overlay ? 'text-white' : 'text-neutral-900'}`}
          />
        </Link>

        <div className="hidden lg:flex flex-1 items-center gap-0.5">
          <MenuTrigger
            label="PLATFORM"
            active={openDropdown === 'platform'}
            overlay={overlay}
            onOpen={() => openIt('platform')}
            onClose={scheduleClose}
          />

          <MenuTrigger
            label="SOLUTIONS"
            active={openDropdown === 'solutions'}
            overlay={overlay}
            onOpen={() => openIt('solutions')}
            onClose={scheduleClose}
          />

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
              /* Only Platform earns the full-bleed bar — it carries nine
                 entries across three cards. Solutions and Resources hold three
                 links each, so a bar the width of the viewport would be mostly
                 empty ground; they render as a floating panel sized to their
                 own content instead. */
              className={
                openDropdown === 'platform'
                  ? 'origin-top border-b-2 border-neutral-900/90 bg-[#f4f5f7] shadow-[0_40px_80px_-24px_rgba(15,23,42,0.45)]'
                  : 'origin-top'
              }
            >
              {openDropdown === 'platform' && (
                <>
                  {/* Top bevel: a lit edge over a hairline shadow reads as thickness. */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white" />
                  <div className="pointer-events-none absolute inset-x-0 top-px h-px bg-neutral-900/10" />
                </>
              )}

              <div
                className={`relative mx-auto max-w-[1600px] px-6 lg:px-10 ${
                  openDropdown === 'platform' ? 'py-8' : 'w-fit pb-8 pt-3'
                }`}
              >
                {openDropdown === 'platform' ? (
                  <motion.div variants={groupVariants} className="grid items-start gap-5 lg:grid-cols-[1.5fr_1fr_1fr]">
                    <GroupCard label="Platform">
                      <div className="grid grid-cols-2 gap-x-8">
                        <div>
                          {PLATFORM_MENU.modules.map((item) => (
                            <NavItem key={item.name} item={item} onClick={close} />
                          ))}
                        </div>
                        <div>
                          {PLATFORM_MENU.workflow.map((item) => (
                            <NavItem key={item.name} item={item} onClick={close} />
                          ))}
                        </div>
                      </div>
                    </GroupCard>

                    <GroupCard label="For teams">
                      {PLATFORM_MENU.teams.map((item) => (
                        <NavItem key={item.name} item={item} onClick={close} />
                      ))}
                    </GroupCard>

                    <FeaturedCard item={PLATFORM_OVERVIEW} onClick={close} />
                  </motion.div>
                ) : openDropdown === 'solutions' ? (
                  <motion.div
                    variants={groupVariants}
                    className="grid items-start gap-4 rounded-2xl border border-neutral-900/10 bg-[#f4f5f7] p-4 shadow-[0_30px_64px_-20px_rgba(15,23,42,0.42)] lg:grid-cols-[260px_320px]"
                  >
                    <GroupCard label="By industry">
                      {SOLUTION_LINKS.map((item) => (
                        <NavItem key={item.name} item={item} onClick={close} />
                      ))}
                    </GroupCard>
                    <FeaturedCard item={PLATFORM_OVERVIEW} onClick={close} />
                  </motion.div>
                ) : (
                  <motion.div
                    variants={groupVariants}
                    className="grid items-start gap-4 rounded-2xl border border-neutral-900/10 bg-[#f4f5f7] p-4 shadow-[0_30px_64px_-20px_rgba(15,23,42,0.42)] lg:grid-cols-[260px_320px]"
                  >
                    <GroupCard label="Resources">
                      {RESOURCES.map((item) => (
                        <NavItem key={item.name} item={item} onClick={close} />
                      ))}
                    </GroupCard>
                    <FeaturedCard item={PLATFORM_OVERVIEW} onClick={close} />
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
            /* lg:hidden — the desktop hamburger is gone, so this drawer must
               not survive a resize past the breakpoint while it is open */
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative origin-top overflow-hidden border-b-2 border-neutral-900/90 bg-[#f4f5f7] shadow-[0_40px_80px_-24px_rgba(15,23,42,0.45)] lg:hidden"
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
                  <MenuLink href="/platform" onClose={closeMobile}>
                    Platform overview
                  </MenuLink>
                  <div className="grid gap-x-8 sm:grid-cols-3">
                    <MenuColumn label="Platform" items={PLATFORM_MENU.modules} onClose={closeMobile} />
                    <MenuColumn label="Workflow" items={PLATFORM_MENU.workflow} onClose={closeMobile} />
                    <MenuColumn label="For teams" items={PLATFORM_MENU.teams} onClose={closeMobile} />
                    <MenuColumn label="Solutions" items={SOLUTION_LINKS} onClose={closeMobile} />
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


/* ══════════════════════════════════════════════════════════════════════════
   Link-list dropdown panels.

   Each panel is a row of white cards: a small-caps group label over a hairline
   rule, then icon-and-label links in one or two columns, with child items
   indented under an L-shaped tree line. A featured card closes the row.

   Nesting is drawn, not implied: a child renders a vertical rule down its left
   edge and a short horizontal tick into the label, and the LAST child stops its
   vertical rule halfway so the tree closes instead of running past the final
   item. That is the whole trick — `last:before:h-1/2` below.
   ══════════════════════════════════════════════════════════════════════════ */

type NavLink = { name: string; href: string; Icon?: typeof Radar; children?: { name: string; href: string }[] };

function GroupCard({ label, children, className = '' }: {
  label: string; children: React.ReactNode; className?: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={`rounded-2xl border border-neutral-900/[0.07] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}
    >
      <p className="border-b border-neutral-900/10 pb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </p>
      <div className="pt-5">{children}</div>
    </motion.div>
  );
}

function NavItem({ item, onClick }: { item: NavLink; onClick: () => void }) {
  return (
    <div>
      <Link
        href={item.href}
        onClick={onClick}
        className="group/nav flex items-center gap-3 py-[7px] text-[15px] text-neutral-800 transition-colors hover:text-primary-600"
      >
        {item.Icon ? (
          <item.Icon size={16} strokeWidth={1.9} className="flex-shrink-0 text-neutral-400 transition-colors group-hover/nav:text-primary-600" />
        ) : (
          <span aria-hidden="true" className="w-4 flex-shrink-0" />
        )}
        {item.name}
      </Link>

      {item.children && (
        <div className="ml-[7px]">
          {item.children.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              onClick={onClick}
              className="relative block py-[7px] pl-6 text-[15px] text-neutral-800 transition-colors before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-neutral-900/15 before:content-[''] after:absolute after:left-0 after:top-1/2 after:h-px after:w-[14px] after:bg-neutral-900/15 after:content-[''] last:before:h-1/2 hover:text-primary-600"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  return (
    <motion.div variants={cardVariants} className="rounded-2xl border border-neutral-900/[0.07] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <Link href={item.href} onClick={onClick} className="group/feat block">
        {item.image && (
          <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover/feat:scale-105"
            />
          </span>
        )}
        <p className="mt-5 text-[16px] font-bold leading-[1.3] tracking-[-0.015em] text-neutral-900">{item.name}</p>
        <p className="mt-2 text-[13.5px] leading-[1.55] text-neutral-500">{item.desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary-600">
          See the platform
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/feat:translate-x-0.5" strokeWidth={2.2} />
        </span>
      </Link>
    </motion.div>
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
