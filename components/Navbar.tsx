"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Building2,
  ChevronDown,
  Compass,
  Layers,
  Mail,
  Menu,
  Network,
  Newspaper,
  Phone,
  Send,
  Target,
  Users,
  X,
  Sparkles,
} from 'lucide-react';

import { portalUrl } from '@/lib/portal';
import { useModal } from '@/components/ModalContext';

type DropdownKey = 'product' | 'roles' | 'resources' | null;

const PORTAL = portalUrl();

/* ── Motion Variants ──────────────────────────────────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: {
      duration: 0.18,
      ease: EASE_OUT,
    },
  },
};

/* ── Component ────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { openModal } = useModal();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // True while the homepage hero (#hero) is still behind the nav — the nav goes black to match it.
  const [overHero, setOverHero] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);
  // Read inside the scroll listener without re-binding it on every menu toggle.
  const menuOpen = useRef(false);
  useEffect(() => {
    menuOpen.current = openDropdown !== null || mobileMenuOpen;
  }, [openDropdown, mobileMenuOpen]);

  // Hide on scroll down, reveal on scroll up. Small deltas are ignored so
  // trackpad jitter doesn't flicker it, and it always shows near the top.
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      setScrolled(y > 12);
      const hero = document.getElementById('hero');
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 64);

      if (y < 80 || menuOpen.current) {
        setHidden(false);
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
      } else {
        return; // keep lastScrollY so slow scrolls still accumulate past the threshold
      }
      lastScrollY.current = y;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const openIt = (k: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(k);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(null);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  // Top-bar colours flip between the light bar and the black over-hero bar.
  const itemCls = (open: boolean) =>
    open
      ? overHero ? 'text-ember-400 bg-white/[0.07]' : 'text-ember-500 bg-slate-50'
      : overHero
        ? 'text-white/80 hover:text-white hover:bg-white/[0.07]'
        : 'text-slate-800 hover:text-ember-500 hover:bg-slate-50/70';
  const chevronCls = (open: boolean) =>
    open ? `rotate-180 ${overHero ? 'text-ember-400' : 'text-ember-500'}` : overHero ? 'text-white/50' : 'text-slate-400';

  return (
    <nav
      className={[
        // On the homepage the nav floats over the hero (which pads itself for it),
        // so the hero starts at the very top of the screen. Other pages keep the
        // nav in the flow so their content isn't hidden underneath it.
        'fixed inset-x-0 top-0',
        'z-50 w-full backdrop-blur-md border-b',
        'transition-[transform,opacity,filter,box-shadow,border-color,background-color] duration-[800ms] ease-in-out motion-reduce:transition-none',
        overHero
          ? 'bg-[#0D0D0C]/90 border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          : scrolled
            ? 'bg-white/95 border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]'
            : 'bg-white/95 border-slate-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]',
        // No transform/filter classes while visible — either would make the nav a
        // containing block for its children and can affect the dropdown layout.
        hidden ? '-translate-y-full opacity-0 blur-md pointer-events-none' : '',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1340px] items-center justify-between px-6 py-1 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity shrink-0 py-2.5"
            onClick={close}
          >
            {/* Full lockup (mark + "Harvin.AI"). Both inks are stacked and cross-faded
                so the swap tracks the navbar's dark-over-hero transition. */}
            <span className="relative block h-[30px]">
              <img
                src="/harvin-logo.png"
                alt="Harvin"
                loading="eager"
                className={`h-full w-auto transition-opacity duration-300 ${overHero ? 'opacity-0' : 'opacity-100'}`}
              />
              <img
                src="/harvin-logo-light.png"
                alt=""
                aria-hidden="true"
                loading="eager"
                className={`absolute inset-0 h-full w-auto transition-opacity duration-300 ${overHero ? 'opacity-100' : 'opacity-0'}`}
              />
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1.5 ml-2">
            {/* 1. Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openIt('product')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-expanded={openDropdown === 'product'}
                onClick={() => setOpenDropdown(openDropdown === 'product' ? null : 'product')}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-medium transition-colors rounded-md ${itemCls(openDropdown === 'product')}`}
              >
                <span>Product</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${chevronCls(openDropdown === 'product')}`}
                  strokeWidth={2.2}
                />
              </button>
            </div>

            {/* 2. Roles Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openIt('roles')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-expanded={openDropdown === 'roles'}
                onClick={() => setOpenDropdown(openDropdown === 'roles' ? null : 'roles')}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-medium transition-colors rounded-md ${itemCls(openDropdown === 'roles')}`}
              >
                <span>Roles</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${chevronCls(openDropdown === 'roles')}`}
                  strokeWidth={2.2}
                />
              </button>
            </div>

            {/* 3. Pricing Link */}
            <Link
              href="/pricing"
              className={`px-3.5 py-2 text-[15px] font-medium rounded-md transition-colors ${itemCls(false)}`}
            >
              Pricing
            </Link>

            {/* 4. Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openIt('resources')}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-expanded={openDropdown === 'resources'}
                onClick={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-medium transition-colors rounded-md ${itemCls(openDropdown === 'resources')}`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${chevronCls(openDropdown === 'resources')}`}
                  strokeWidth={2.2}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Actions (Log in + Get Early Access) */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href={PORTAL}
            className={`text-[15px] font-medium transition-colors ${overHero ? 'text-white/80 hover:text-white' : 'text-slate-800 hover:text-ember-500'}`}
          >
            Log in
          </a>

          <button
            type="button"
            onClick={() => openModal('early-access')}
            className="inline-flex items-center justify-center rounded-lg bg-ember-500 px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-ember-600 hover:shadow active:scale-95"
          >
            Get Early Access
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className={`p-2 focus:outline-none ${overHero ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Desktop Mega Menu Dropdowns ────────────────────────────────────── */}
      <div className="hidden lg:block absolute inset-x-0 top-full">
        <AnimatePresence>
          {openDropdown && (
            <motion.div
              key={openDropdown}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onMouseEnter={() => openIt(openDropdown)}
              onMouseLeave={scheduleClose}
              className="mx-auto max-w-[1340px] px-6 lg:px-8 pt-2"
            >
              <div className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)]">
                {/* ── Product Dropdown ─────────────────────────────── */}
                {openDropdown === 'product' && (
                  <div className="grid grid-cols-[1.1fr_1fr_1.1fr] gap-8">
                    {/* Column 1: Core Platform */}
                    <div className="flex flex-col gap-5 border-r border-slate-100 pr-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Platform Foundation
                      </p>

                      <Link
                        href="/account-intelligence"
                        onClick={close}
                        className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-500 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                          <Building2 size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-[14.5px] font-semibold text-slate-900 group-hover:text-ember-500 transition-colors">
                            Account Intelligence
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            Continuous data enrichment, buyer signals, and live ICP scoring.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/#signals"
                        onClick={close}
                        className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-500 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                          <Network size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-[14.5px] font-semibold text-slate-900 group-hover:text-ember-500 transition-colors">
                            Integrations
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            Two-way sync with Salesforce, HubSpot, and your system of record.
                          </p>
                        </div>
                      </Link>

                      <div className="mt-auto pt-3 border-t border-slate-100">
                        <Link
                          href="/platform"
                          onClick={close}
                          className="flex items-center justify-between rounded-lg bg-sand-50 p-3 hover:bg-sand-100 transition-colors"
                        >
                          <span className="text-[13px] font-semibold text-slate-800">
                            Explore Platform Overview
                          </span>
                          <ArrowRight size={14} className="text-ember-500" />
                        </Link>
                      </div>
                    </div>

                    {/* Column 2: Outreach & Engagement */}
                    <div className="flex flex-col gap-3 border-r border-slate-100 pr-6">
                      <Link
                        href="/outreach-and-engagement"
                        onClick={close}
                        className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 hover:text-ember-500 mb-2 transition-colors block"
                      >
                        Outreach &amp; Engagement
                      </Link>

                      <div className="flex flex-col gap-1 pl-2">
                        <Link
                          href="/outreach-and-engagement#campaigns"
                          onClick={close}
                          className="group relative flex flex-col py-2.5 pl-6 transition-colors hover:text-ember-500
                                     before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-slate-200
                                     after:absolute after:left-0 after:top-1/2 after:h-px after:w-3.5 after:bg-slate-200"
                        >
                          <span className="text-[14px] font-semibold text-slate-800 group-hover:text-ember-500 transition-colors">
                            Campaign
                          </span>
                          <span className="text-[12px] text-slate-500">
                            Multi-step sequences across channels
                          </span>
                        </Link>

                        <Link
                          href="/outreach-and-engagement#dialer"
                          onClick={close}
                          className="group relative flex flex-col py-2.5 pl-6 transition-colors hover:text-ember-500
                                     before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-slate-200
                                     after:absolute after:left-0 after:top-1/2 after:h-px after:w-3.5 after:bg-slate-200"
                        >
                          <span className="text-[14px] font-semibold text-slate-800 group-hover:text-ember-500 transition-colors">
                            Dialer
                          </span>
                          <span className="text-[12px] text-slate-500">
                            In-browser calling &amp; suggested scripts
                          </span>
                        </Link>

                        <Link
                          href="/outreach-and-engagement#email"
                          onClick={close}
                          className="group relative flex flex-col py-2.5 pl-6 transition-colors hover:text-ember-500
                                     before:absolute before:left-0 before:top-0 before:h-1/2 before:w-px before:bg-slate-200
                                     after:absolute after:left-0 after:top-1/2 after:h-px after:w-3.5 after:bg-slate-200"
                        >
                          <span className="text-[14px] font-semibold text-slate-800 group-hover:text-ember-500 transition-colors">
                            Email Inbox
                          </span>
                          <span className="text-[12px] text-slate-500">
                            Unified replies &amp; warm conversation history
                          </span>
                        </Link>
                      </div>
                    </div>

                    {/* Column 3: Performance & Insights */}
                    <div className="flex flex-col gap-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-2">
                        Performance &amp; Insights
                      </p>

                      <div className="flex flex-col gap-1 pl-2">
                        <Link
                          href="/sdr"
                          onClick={close}
                          className="group relative flex flex-col py-2.5 pl-6 transition-colors hover:text-ember-500
                                     before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-slate-200
                                     after:absolute after:left-0 after:top-1/2 after:h-px after:w-3.5 after:bg-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-slate-800 group-hover:text-ember-500 transition-colors">
                              SDR
                            </span>
                            <span className="text-[11px] font-medium text-ember-600 bg-ember-50 px-2 py-0.5 rounded-full">
                              Stay on Track
                            </span>
                          </div>
                          <span className="text-[12px] text-slate-500 mt-0.5">
                            Daily priorities &amp; one-click execution
                          </span>
                        </Link>

                        <Link
                          href="/sdr-head"
                          onClick={close}
                          className="group relative flex flex-col py-2.5 pl-6 transition-colors hover:text-ember-500
                                     before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-slate-200
                                     after:absolute after:left-0 after:top-1/2 after:h-px after:w-3.5 after:bg-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-slate-800 group-hover:text-ember-500 transition-colors">
                              SDR Head
                            </span>
                            <span className="text-[11px] font-medium text-ember-600 bg-ember-50 px-2 py-0.5 rounded-full">
                              See Team Health
                            </span>
                          </div>
                          <span className="text-[12px] text-slate-500 mt-0.5">
                            Conversion funnel &amp; AI coaching patterns
                          </span>
                        </Link>

                        <Link
                          href="/ae"
                          onClick={close}
                          className="group relative flex flex-col py-2.5 pl-6 transition-colors hover:text-ember-500
                                     before:absolute before:left-0 before:top-0 before:h-1/2 before:w-px before:bg-slate-200
                                     after:absolute after:left-0 after:top-1/2 after:h-px after:w-3.5 after:bg-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-slate-800 group-hover:text-ember-500 transition-colors">
                              AE
                            </span>
                            <span className="text-[11px] font-medium text-ember-600 bg-ember-50 px-2 py-0.5 rounded-full">
                              Track your pipeline
                            </span>
                          </div>
                          <span className="text-[12px] text-slate-500 mt-0.5">
                            Digital sales rooms &amp; meeting handoff
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Roles Dropdown ──────────────────────────────── */}
                {openDropdown === 'roles' && (
                  <div className="max-w-[760px] mx-auto">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-4">
                      Tailored by Role
                    </p>
                    <div className="grid grid-cols-3 gap-5">
                      {/* Role 1: SDR */}
                      <Link
                        href="/sdr"
                        onClick={close}
                        className="group flex flex-col rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-ember-200 hover:bg-ember-50/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[16px] font-bold text-slate-900 group-hover:text-ember-500 transition-colors">
                            SDR
                          </span>
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ember-600 bg-ember-100/70 px-2 py-0.5 rounded">
                            Stay on Track
                          </span>
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
                          A focused workspace with high-intent accounts, ready signals, and streamlined day-to-day outreach.
                        </p>
                        <span className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-ember-500">
                          View SDR workflow <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>

                      {/* Role 2: SDR Head */}
                      <Link
                        href="/sdr-head"
                        onClick={close}
                        className="group flex flex-col rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-ember-200 hover:bg-ember-50/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[16px] font-bold text-slate-900 group-hover:text-ember-500 transition-colors">
                            SDR Head
                          </span>
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ember-600 bg-ember-100/70 px-2 py-0.5 rounded">
                            Team Health
                          </span>
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
                          Total visibility from outbound effort to qualified pipeline, leak detection, and coaching triggers.
                        </p>
                        <span className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-ember-500">
                          View Leader dashboard <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>

                      {/* Role 3: AE */}
                      <Link
                        href="/ae"
                        onClick={close}
                        className="group flex flex-col rounded-xl border border-slate-100 bg-slate-50/50 p-4 hover:border-ember-200 hover:bg-ember-50/30 transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[16px] font-bold text-slate-900 group-hover:text-ember-500 transition-colors">
                            AE
                          </span>
                          <span className="text-[10.5px] font-semibold uppercase tracking-wider text-ember-600 bg-ember-100/70 px-2 py-0.5 rounded">
                            Pipeline
                          </span>
                        </div>
                        <p className="text-[12.5px] leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors">
                          Digital sales rooms that maintain full buyer and signal context from booked meeting to closed deal.
                        </p>
                        <span className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-ember-500">
                          View AE handoff <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* ── Resources Dropdown ──────────────────────────── */}
                {openDropdown === 'resources' && (
                  <div className="max-w-[720px] mx-auto">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-4">
                      Resources &amp; Company
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/product-tour"
                        onClick={close}
                        className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-500 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                          <Compass size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-[14.5px] font-semibold text-slate-900 group-hover:text-ember-500 transition-colors">
                            Product Tour
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            See how the platform connects your team &amp; workflows in one place.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/about"
                        onClick={close}
                        className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-500 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                          <Users size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-[14.5px] font-semibold text-slate-900 group-hover:text-ember-500 transition-colors">
                            About
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            Our mission to empower high-performing outbound revenue teams.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/contact"
                        onClick={close}
                        className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-500 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                          <Mail size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-[14.5px] font-semibold text-slate-900 group-hover:text-ember-500 transition-colors">
                            Contact Us
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            Connect with our team or schedule a dedicated walkthrough.
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/blog"
                        onClick={close}
                        className="group flex items-start gap-3.5 rounded-xl p-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ember-50 text-ember-500 group-hover:bg-ember-500 group-hover:text-white transition-colors">
                          <Newspaper size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-[14.5px] font-semibold text-slate-900 group-hover:text-ember-500 transition-colors">
                            Blogs
                          </p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                            Actionable outbound playbooks, signal strategies, and sales guides.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mobile Navigation Drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 bg-white px-6 py-6 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {/* Mobile Accordion: Product */}
              <div className="border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('product')}
                  className="flex w-full items-center justify-between py-2 text-[16px] font-semibold text-slate-900"
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileAccordion === 'product' ? 'rotate-180 text-ember-500' : 'text-slate-400'
                      }`}
                  />
                </button>
                {mobileAccordion === 'product' && (
                  <div className="flex flex-col gap-2.5 pt-2 pl-3">
                    <Link
                      href="/account-intelligence"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      Account Intelligence
                    </Link>
                    <div className="pt-2">
                      <Link
                        href="/outreach-and-engagement"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-ember-500 block"
                      >
                        Outreach &amp; Engagement
                      </Link>
                      <div className="flex flex-col gap-1.5 pl-2 pt-1">
                        <Link
                          href="/outreach-and-engagement#campaigns"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[14px] text-slate-600 hover:text-ember-500 py-0.5"
                        >
                          Campaign
                        </Link>
                        <Link
                          href="/outreach-and-engagement#dialer"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[14px] text-slate-600 hover:text-ember-500 py-0.5"
                        >
                          Dialer
                        </Link>
                        <Link
                          href="/outreach-and-engagement#email"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[14px] text-slate-600 hover:text-ember-500 py-0.5"
                        >
                          Email Inbox
                        </Link>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Performance &amp; Insights
                      </p>
                      <div className="flex flex-col gap-1.5 pl-2 pt-1">
                        <Link
                          href="/sdr"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[14px] text-slate-600 hover:text-ember-500 py-0.5"
                        >
                          SDR (Stay on Track)
                        </Link>
                        <Link
                          href="/sdr-head"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[14px] text-slate-600 hover:text-ember-500 py-0.5"
                        >
                          SDR Head (See Team Health)
                        </Link>
                        <Link
                          href="/ae"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[14px] text-slate-600 hover:text-ember-500 py-0.5"
                        >
                          AE (Track your pipeline)
                        </Link>
                      </div>
                    </div>
                    <Link
                      href="/#signals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1 pt-2 border-t border-slate-100"
                    >
                      Integrations
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Roles */}
              <div className="border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('roles')}
                  className="flex w-full items-center justify-between py-2 text-[16px] font-semibold text-slate-900"
                >
                  <span>Roles</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileAccordion === 'roles' ? 'rotate-180 text-ember-500' : 'text-slate-400'
                      }`}
                  />
                </button>
                {mobileAccordion === 'roles' && (
                  <div className="flex flex-col gap-2 pt-2 pl-3">
                    <Link
                      href="/sdr"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      SDR — Stay on Track
                    </Link>
                    <Link
                      href="/sdr-head"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      SDR Head — See Team Health
                    </Link>
                    <Link
                      href="/ae"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      AE — Track your pipeline
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Link: Pricing */}
              <div className="border-b border-slate-100 pb-3">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[16px] font-semibold text-slate-900 hover:text-ember-500"
                >
                  Pricing
                </Link>
              </div>

              {/* Mobile Accordion: Resources */}
              <div className="border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion('resources')}
                  className="flex w-full items-center justify-between py-2 text-[16px] font-semibold text-slate-900"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileAccordion === 'resources' ? 'rotate-180 text-ember-500' : 'text-slate-400'
                      }`}
                  />
                </button>
                {mobileAccordion === 'resources' && (
                  <div className="flex flex-col gap-2 pt-2 pl-3">
                    <Link
                      href="/product-tour"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      Product Tour
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14.5px] text-slate-700 hover:text-ember-500 py-1"
                    >
                      Blogs
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <a
                  href={PORTAL}
                  className="flex w-full items-center justify-center rounded-lg border border-slate-200 py-2.5 text-[15px] font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  Log in
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openModal('early-access');
                  }}
                  className="flex w-full items-center justify-center rounded-lg bg-ember-500 py-3 text-[15px] font-semibold text-white shadow-sm hover:bg-ember-600 transition-colors"
                >
                  Get Early Access
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
