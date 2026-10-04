# Bug Report — majalis.pk

## Severity Key
- **🔴 Critical**: Blocks functionality or causes build errors
- **🟡 Major**: Breaks a feature or degrades UX significantly
- **🟢 Minor**: Cosmetic or non-critical issue
- **🔵 Suggestion**: Improvement, not a bug

---

## 🔴 Critical

### C-1: CSS `@import` Violates Spec — Font/Icon Loading May Fail

**File:** `src/index.css:11,15`

```css
@import "tailwindcss";
@theme { ... }
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
```

**Issue:** CSS `@import` statements must precede all other rules (including `@import "tailwindcss"` and `@theme`). Browsers silently ignore `@import` placed after other at-rules — the Inter font and Material Symbols will not load, causing text fallback to a generic serif and all icons to render as empty squares.

**Fix:** Move the two Google Fonts `@import` lines to the very top of `index.css`, before `@import "tailwindcss"`.

---

## 🟡 Major

### M-1: Invalid Tailwind v4 Arbitrary Value — `text-32px`

**File:** `src/pages/MajlisDetail.jsx:208`

```jsx
<h2 className="text-32px font-semibold text-emerald-900 dark:text-emerald-100">
```

**Issue:** Tailwind v4 requires square brackets for arbitrary values: `text-[32px]`. The class `text-32px` is silently ignored — the heading renders at the browser default font size.

**Same bug in these files:**
- `src/pages/Home.jsx` — `text-48px`, `text-24px`
- `src/pages/MajlisDetail.jsx` — `text-48px`
- `src/pages/VerifiedImambargah.jsx` — `text-24px`

**Note:** `src/pages/ImambargahPortal.jsx` and `src/pages/ContactUs.jsx` use the correct square-bracket syntax (`text-[24px]`, `text-[28px]`).

**Fix:** Replace with theme variables where applicable (`text-h1`, `text-h2`, `text-h3`) or use bracket syntax `text-[32px]`.

---

### M-2: Several Pages Still Fully Hardcoded — No API Integration

**Status update:** `Home.jsx`, `BrowseMajalis.jsx`, and `BrowseJaloos.jsx` now have **partial** Supabase integration (imports, fetches, state mapping) but the other pages remain fully static:

**Still fully hardcoded (no Supabase calls):**
- `src/pages/MajlisDetail.jsx`
- `src/pages/SpeakerProfile.jsx`
- `src/pages/VerifiedImambargah.jsx`
- `src/pages/AdminPanel.jsx`

**Has partial Supabase but with bugs:**
- `src/pages/Home.jsx` — see M-5, M-6, M-7, m-8, m-9
- `src/pages/BrowseMajalis.jsx` — fetches real data ✅ but hardcoded `isLiveSoon: false` on all records, no day-7 default filter
- `src/pages/BrowseJaloos.jsx` — fetches real data ✅ but days filter hardcoded to 7-10 only (m-4)

---

### M-3: Form Submissions Are No-Ops

**Files:**
- `src/pages/ContactUs.jsx` — `onSubmit` sets `submitted = true` locally; no API call, no email
- `src/pages/ComingSoon.jsx` — Email `<input>` has no `onChange` handler; button has no `onClick`; nothing happens on interaction
- `src/pages/Settings.jsx` — All toggle switches update local `useState` only; no `localStorage`, no API, no persistence

**Impact:** Users filling out the contact form, signing up for launch notifications, or changing settings will believe their actions succeeded — but nothing is saved or transmitted.

---

### M-4: Comment Input Has No Validation

**File:** `src/pages/MajlisDetail.jsx:230`

```jsx
<input ... />
<button>Post Comment</button>
```

**Issue:** The comment input accepts empty strings, whitespace-only strings, and extremely long text with no character limit. The button has no `disabled` state and no loading state during submission.

---

### M-5: Home.jsx — `todayMajalis` Filter Uses Wrong Date Logic

**File:** `src/pages/Home.jsx:42-43`

```jsx
const dayNum = parseInt(majalisData?.[0]?.date?.split('-')?.[2] || '0', 10);
const today = (majalisData || []).filter((m) => new Date(m.date).getDate() === dayNum);
```

**Issue:** The filter extracts the day-of-month from the **first record's date** (e.g., if the first majalis is on 2026-01-15, `dayNum = 15`), then filters all records to only those whose `getDate()` equals 15. This means:
1. It filters by an arbitrary day, not today's actual date
2. Records from different months with the same day-of-month (e.g., 15th of Muharram and 15th of Safar) could be mixed in
3. If the first record happens to be from day 7, it shows "today" as day 7 even if today is actually day 10

**Fix:** Compare against the actual current date (`new Date()`) or against the `activeDay` state, and filter by full date (year+month+day), not just day-of-month.

---

### M-6: Home.jsx — `upcomingJaloos` Fetched From Supabase But Hardcoded Cards Rendered

**File:** `src/pages/Home.jsx`

**Issue:** Lines 45-51 fetch `upcomingJaloos` from Supabase with proper data mapping, but lines 224-295 render **hardcoded** jaloos cards with static data. The fetched data is never passed to the JSX. Additionally:
- "Live Route" / "Scheduled" badges are hardcoded rather than based on actual jaloos data
- No loading/error states for the jaloos section
- The `upcomingJaloos` state variable is set but unused

**Fix:** Replace the hardcoded jaloos cards with a dynamic render loop over `upcomingJaloos`.

---

### M-7: Home.jsx — "Majalis Today" Stat Shows Total Count, Not Today's Count

**File:** `src/pages/Home.jsx:107-122`

**Issue:** The "Majalis Today" stat card displays `majalisCount` which comes from `supabase.from('majalis').select('*', { count: 'exact', head: true })` — this is the **total** count of all majalis records. The label says "Today" but the number is the total across all days, which is misleading.

**Fix:** Either show the computed `todayMajalis.length` instead, or relabel the stat to "Total Majalis".

---

## 🟢 Minor

### m-1: Navbar Lacks Mobile Hamburger Menu

**File:** `src/components/Navbar.jsx`

**Issue:** The top navbar renders all navigation links inline with no responsive breakpoint. On mobile viewports, links overflow or wrap awkwardly. Compare with `src/components/MobileNav.jsx` which provides a separate bottom nav for mobile but the two navigation systems are not coordinated.

---

### m-2: Navbar Text Links Lack Active Route Highlighting

**File:** `src/components/Navbar.jsx`

**Issue:** The desktop Navbar uses `<Link>` components but does not apply any active/current route styling (contrast with `MobileNav.jsx` which correctly uses `getLinkClass`). Users cannot tell which page they are on.

---

### m-3: BrowseMajalis Filters Hardcoded to Days 1-10

**File:** `src/pages/BrowseMajalis.jsx`

```jsx
const days = ['All', ...Array.from({ length: 30 }, (_, i) => String(i + 1))];
```

**Issue:** Updated to 30 days ✅ — but the default filter is `'All'` which shows majalis from all 30 days, burying today's relevant results. Should default to today's Muharram day.

---

### m-4: BrowseJaloos Still Hardcoded to Days 7-10

**File:** `src/pages/BrowseJaloos.jsx`

```jsx
const days = ['All', '7', '8', '9', '10'];
```

**Issue:** Only 4 days of jaloos data filter options (7-10). Should offer 1-30 like BrowseMajalis.

---

### m-5: AdminPanel Displays Static Data Only

**File:** `src/pages/AdminPanel.jsx`

**Issue:** All stat cards (`totalMajalis`, `totalSpeakers`, `activeUsers`, `totalImambargahs`), recent activity items, and management tab content is hardcoded. There is no authentication check, no admin role verification, and no data fetching.

---

### m-6: ComingSoon Email Input Has No State Binding

**File:** `src/pages/ComingSoon.jsx`

```jsx
<input
  type="email"
  placeholder="Enter your email"
  className="..."
/>
```

**Issue:** The input is uncontrolled with no `value`/`onChange` binding and no ref. The `handleNotifyMe` function reads nothing.

---

### m-7: Home.jsx — "Majalis Today" Stat Card Inconsistency

**File:** `src/pages/Home.jsx:107-122`

**Issue:** The "Majalis Today" stat card shows `majalisCount` (total across all days) but the label says "Today". Also, the second stat card is labeled "Upcoming" but shows `jaloosCount` (total jaloos) — "Today" and "Upcoming" semantics are mixed up. The fourth card (active users) shows a hardcoded `"12,458"`.

**Fix:** 
- Card 1: Show `todayMajalis.length` if available, else relabel to "Total Majalis"
- Card 2: Show real upcoming jaloos count, or relabel
- Card 4: Fetch real Imambargah count instead of hardcoded string

---

### m-8: Home.jsx — `activeDay` and "7th Muharram" Subtitle Hardcoded

**File:** `src/pages/Home.jsx:10,158`

```jsx
const [activeDay, setActiveDay] = useState(7);
...
<h1 className="...">7th Muharram 1448</h1>
```

**Issue:** `activeDay` is hardcoded to 7 with no logic to compute the actual current Muharram date. The heading "7th Muharram 1448" is also hardcoded in the JSX rather than dynamically derived from `activeDay`. The calendar day highlighting does use `activeDay` (line 172), so changing `activeDay` to a real computed value would fix the heading and calendar together.

**Fix:** Compute the actual Muharram day from today's date or from the `majalisData` date range. Derive the heading from `activeDay`.

---

### m-9: Home.jsx — Featured Speaker Cards Are Hardcoded

**File:** `src/pages/Home.jsx:305-338`

**Issue:** `speakersCount` (total speaker count) is fetched from Supabase but the featured speaker cards are hardcoded with static names ("Molana Ali Raza", "Dr. Zahra Hussain", "Molana Hassan Raza"). None of the speaker data (name, image, title, type) comes from the database. The "View All" link at bottom-right also has a hardcoded href `/speaker-profile/1`.

**Fix:** Query Supabase for featured speakers and render dynamically. Remove hardcoded speaker data.

---

## 🔵 Suggestions

### S-1: Add Loading Skeletons

**Files:** `src/pages/BrowseMajalis.jsx`, `src/pages/BrowseJaloos.jsx`

When API integration is added, these list pages should show skeleton cards while data loads instead of a blank page or spinner.

### S-2: Add Empty States

**Files:** `src/pages/BrowseMajalis.jsx`, `src/pages/BrowseJaloos.jsx`, `src/pages/MajlisDetail.jsx`

When filters return zero results or a detail page has no comments, display helpful empty state messages rather than blank areas.

### S-3: Centralize Theme Colors Into Tailwind Config

**Files:** Multiple — `text-emerald-900`, `bg-emerald-600`, `text-amber-500`, etc.

Consider defining brand colors in `index.css` `@theme` and using semantic tokens (e.g., `text-primary`, `bg-accent`) for easier theming and dark mode consistency.

### S-4: Extract Reusable Card Components

**Files:** `src/pages/Home.jsx`, `src/pages/BrowseMajalis.jsx`, `src/pages/MajlisDetail.jsx`

Majlis cards are duplicated with similar markup, classes, and props across multiple pages. Extract a `MajlisCard` component for consistency and maintainability.

### S-5: Home.jsx — Use `activeDay` for `todayMajalis` Filter

**File:** `src/pages/Home.jsx`

Instead of deriving today's day from the first record's date (see M-5), tie the `todayMajalis` filter to the `activeDay` state. This way clicking a different day on the calendar will automatically update the "today" section, making the calendar interactive.

### S-6: Home.jsx — Detect User City for Default Location

**File:** `src/pages/Home.jsx`

Consider using browser Geolocation API or a city dropdown to auto-filter majalis/jaloos by the user's city when the backend supports location-based queries.
