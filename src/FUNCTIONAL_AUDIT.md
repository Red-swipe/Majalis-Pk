# Functional Audit — Majalis.pk

> **Mandate:** Audit only. No fixes applied.
> **Scope:** All 11 page + 3 component files, entry points, config.
> **Build:** 0 errors (76 modules transformed).

---

## 1. Settings & Persistence

| Issue | File | Severity |
|-------|------|----------|
| **localStorage-only persistence** — all setting values saved exclusively to `localStorage`. No Supabase `profiles` or `user_settings` table is ever queried or written. Clearing browser data = total loss of all preferences. | `src/pages/Settings.jsx` | HIGH |
| **No "Save" or "Sync" affordance** — user edits settings in real time (state updates on every toggle/input) but nothing tells them whether data is saved locally vs synced remotely. | `src/pages/Settings.jsx` | MEDIUM |
| **2FA toggle is visual-only** — `enable2FA` state toggles UI but no actual 2FA enrollment, QR generation, or verification flow exists. | `src/pages/Settings.jsx` | HIGH |
| **Notification preferences stub** — `notificationSettings` state mirrors `enableEmailNotifs`/`enablePushNotifs` toggles but no service-worker registration or email-integration layer exists. | `src/pages/Settings.jsx` | MEDIUM |
| **Quran settings & Ramadan settings stored but never consumed** — `quranSettings` (font size, translation) and `ramadanSettings` (sehri/iftari reminders) are saved to localStorage but no other page reads them back (no centralized settings context). | `src/pages/Settings.jsx` | LOW |

---

## 2. Location & Permissions

| Issue | File | Severity |
|-------|------|----------|
| **Location overlay always shown on Home** — `LocationOverlay` component mounts unconditionally in `Home.jsx`. Every page visit re-triggers the geolocation prompt, even if user already granted or denied permission. | `src/pages/Home.jsx` | HIGH |
| **Location never persisted** — `navigator.geolocation.getCurrentPosition` fires, coordinates are obtained, but the result is not saved to state, localStorage, localStorage, Supabase, or passed as a URL param. Dismissing the overlay discards the data permanently. | `src/pages/Home.jsx` | HIGH |
| **`find_nearest_imambargah` RPC called but unused** — after geolocation succeeds, `supabase.rpc('find_nearest_imambargah', { ... })` fires, but the returned data is not displayed, stored, or used for any redirect or suggestion. | `src/pages/Home.jsx` | MEDIUM |
| **No permission-denied handling** — if user blocks location, there is no graceful degradation or manual city/ZIP fallback input. The overlay simply logs an error and closes, leaving the user with no path to set location. | `src/pages/Home.jsx` | MEDIUM |
| **No "Set location later" option** — the overlay requires an immediate decision. No skip button, no "ask me later" affordance. | `src/pages/Home.jsx` | LOW |

---

## 3. Date & Calendar Logic

| Issue | File | Severity |
|-------|------|----------|
| **`en-u-ca-islamic-civil` may fail in some browsers** — the Hijri date computation relies on the `islamic-civil` calendar extension of `Intl.DateTimeFormat`. Safari versions before 17 and some mobile WebView builds do not support this calendar type. | `src/pages/BrowseMajalis.jsx`, `src/pages/BrowseJaloos.jsx` | HIGH |
| **Fallback returns string `'1'`** — when the `Intl` formatter throws, the catch block returns `'1'` as the Muharram day, which is non-sensical. A reasonable fallback (e.g. compute relative to a known Gregorian anchor date) is missing. | `src/pages/BrowseMajalis.jsx`, `src/pages/BrowseJaloos.jsx` | MEDIUM |
| **No Hijri date picker** — users cannot filter or browse by a specific Islamic month or day. The calendar grid only shows the current Gregorian month with Hijri overlays. | `src/pages/BrowseMajalis.jsx`, `src/pages/BrowseJaloos.jsx` | MEDIUM |
| **Calendar month is static** — the calendar in BrowseMajalis shows only the current month with no prev/next navigation. Users cannot browse past or future months. | `src/pages/BrowseMajalis.jsx` | LOW |
| **Active-day dot is hardcoded** — `calendarActiveDot` renders on today's date via `date.getDate()` regardless of whether any majlis/jaloos actually exists on that day. | `src/pages/BrowseMajalis.jsx` | LOW |

---

## 4. Broken / Missing Interactions

| Issue | File | Severity |
|-------|------|----------|
| **Review submission is client-side stub** — `ReviewSection` in `MajlisDetail.jsx` stores review text in local state and calls `setSubmitted(true)`. No Supabase insert, no API call, no toast/notification that review was saved. Data is lost on page navigation. | `src/pages/MajlisDetail.jsx` | HIGH |
| **Contact form submits to nowhere** — `handleSubmit` calls `e.preventDefault()` and `setIsSubmitted(true)`. No email service (EmailJS, Resend, Formspree), no Supabase insert, no webhook. | `src/pages/ContactUs.jsx` | HIGH |
| **Email subscribe is client-side stub** — `ComingSoon.jsx` subscribe form calls `setIsSubmitted(true)` only. No backend integration (Mailchimp, SendGrid, Supabase insert). | `src/pages/ComingSoon.jsx` | HIGH |
| **Hardcoded mock data in SpeakerProfile** — speaker details, stats (lectures, countries, followers), and the "Featured Lectures" list are all hardcoded JavaScript arrays. No Supabase query for `speakers` table exists. | `src/pages/SpeakerProfile.jsx` | HIGH |
| **Hardcoded mock data in VerifiedImambargah** — imambargah list, images, ratings, and contact info are all static. No `imambargah` table query. | `src/pages/VerifiedImambargah.jsx` | HIGH |
| **Hardcoded mock data in ImambargahPortal** — dashboard stats (total majalis, attendees, volunteers), announcements, and recent activity are hardcoded. No Supabase queries for portal dashboard. | `src/pages/ImambargahPortal.jsx` | HIGH |
| **Hardcoded mock data in AdminPanel** — user management table, stats cards, recent activity list are all static arrays. No Supabase admin queries exist. | `src/pages/AdminPanel.jsx` | HIGH |
| **Jaloos data is hardcoded** — the processions/jaloos list in `BrowseJaloos.jsx` uses a hardcoded `jaloosData` array. No `jaloos` table query exists. | `src/pages/BrowseJaloos.jsx` | HIGH |
| **No loading skeletons or spinners** — all pages that fetch Supabase data show a blank/empty render while loading. Only a brief "Loading..." text exists in some pages. No skeleton placeholders. | Global | MEDIUM |
| **Search is client-side title-only** — the search bar in BrowseMajalis filters the `majlisData` array by `title` only. Speaker name, location, and date are not included in the filter. Search is case-sensitive. | `src/pages/BrowseMajalis.jsx` | LOW |
| **Category filter in BrowseMajalis has no "All" default** — on initial load, no category is selected and the page shows "No majalis found" until user clicks a category chip. | `src/pages/BrowseMajalis.jsx` | LOW |
| **SubmitMajlisModal lacks confirmation feedback** — after form submission the modal closes but no success toast, snackbar, or confirmation message tells the user their submission was received. | `src/pages/BrowseMajalis.jsx` | LOW |

---

## 5. Routes & Navigation

| Issue | File | Severity |
|-------|------|----------|
| **MobileNav missing critical routes** — `src/components/MobileNav.jsx` only links to Home, Majalis, Jaloos, Speakers, and Contact. Settings (`/settings`), Admin Panel (`/admin`), and Imambargah Portal (`/imambargah-portal`) are unreachable on mobile. | `src/components/MobileNav.jsx` | HIGH |
| **DesktopNav missing Settings link** — `src/components/Navbar.jsx` includes Majalis, Jaloos, Speakers, Contact, Admin, and Imambargah Portal, but Settings is absent from the desktop nav. | `src/components/Navbar.jsx` | MEDIUM |
| **Footer quick links incomplete** — `src/components/Footer.jsx` links: Home, Majalis, Jaloos, Speakers, Contact Us. Settings, Admin Panel, and Imambargah Portal are missing. | `src/components/Footer.jsx` | MEDIUM |
| **No link from BrowseMajalis to SpeakerProfile** — route `/speaker/:id` exists but speaker names in the majlis cards are not rendered as `<Link>` components. Users cannot navigate to a speaker's profile. | `src/pages/BrowseMajalis.jsx` | MEDIUM |
| **Routes defined but no lazy loading** — all 11 route components are eagerly imported in `App.jsx`. With React 19 + Vite, `React.lazy()` could split the bundle. | `src/App.jsx` | LOW |
| **No 404/not-found page** — the catch-all route redirects to `/` (Home). A dedicated 404 page with navigation hints would improve UX. | `src/App.jsx` | LOW |

---

## 6. Environment & Config

| Issue | File | Severity |
|-------|------|----------|
| **`VITE_SUPABASE_URL` is set to the Supabase dashboard URL** — value is `https://supabase.com/dashboard/project/pjpvbdnlckwezrgujjqm` instead of the correct API endpoint `https://pjpvbdnlckwezrgujjqm.supabase.co`. The Supabase client will fail to connect. | `.env` | CRITICAL |
| **`VITE_SUPABASE_ANON_KEY` uses non-JWT format** — value `sb_publishable_ZOvDGLgrzmeoH17loslPIQ_uulxvBTZ` is not a standard Supabase anon key (which is a base64-encoded JWT beginning with `eyJ...`). This key will not authenticate with the Supabase API. | `.env` | CRITICAL |
| **Supabase client will silently fail** — `src/lib/supabase.js` calls `createClient()` with the above invalid URL/key. Any `.from()` or `.rpc()` call will throw a network/ auth error. Pages that depend on these queries (Home, BrowseMajalis) will show empty states. | `src/lib/supabase.js` | CRITICAL |
| **`database.env` file present but unused** — file `database.env` exists in the project root but is not loaded by Vite or referenced anywhere. Its purpose is unclear. | `database.env` | LOW |
| **Hardcoded theme tokens in components** — several components use raw hex values (`#0A0A0A`, `#8b0000`, `#2A2A2A`) instead of Tailwind CSS theme variables (`bg-background`, `text-primary`, `border-outline-variant`). | Multiple components | MEDIUM |
| **`index.html` has placeholder title** — `<title>majalis-pk</title>` should be `<title>Majalis.pk - Find Majalis Near You</title>` or similar for SEO. | `index.html` | LOW |
| **No meta tags in `index.html`** — missing `description`, `og:title`, `og:description`, `og:image`, and `twitter:card` meta tags. Zero SEO meta. | `index.html` | MEDIUM |
| **`.gitignore` should exclude `.env`** — the `.env` file contains Supabase credentials (even if invalid). It must be confirmed that `.env` is gitignored to prevent accidental commits. | `.gitignore` | HIGH |
| **No `react-helmet-async` or equivalent** — page-level `<title>` and meta tags cannot be set per-route, hurting SEO for individual pages. | `package.json` | LOW |

---

## Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Settings & Persistence | 0 | 2 | 2 | 1 |
| Location & Permissions | 0 | 2 | 2 | 1 |
| Date & Calendar Logic | 0 | 1 | 2 | 2 |
| Broken/Missing Interactions | 0 | 7 | 1 | 3 |
| Routes & Navigation | 0 | 1 | 3 | 2 |
| Environment & Config | 3 | 1 | 2 | 3 |
| **Total** | **3** | **14** | **12** | **12** |

**Critical findings all stem from the `.env` file:** the Supabase URL is a dashboard link and the anon key is non-standard. Until these are corrected, every Supabase-backed feature silently fails.

**14 High-severity findings** — dominated by hardcoded mock data (5 pages), client-side-only form submissions (3 forms), location not persisted, localStorage-only settings, browser compatibility risk for Hijri dates, and incomplete navigation on mobile.
