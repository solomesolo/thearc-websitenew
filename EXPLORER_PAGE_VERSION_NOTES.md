# Explorer Page - Current Version Notes

**Date Saved:** $(date +%Y-%m-%d)
**Status:** ✅ Working version with unified background and timeline

## Key Features Implemented

### 1. Full-Page Vertical Timeline
- **Position**: Fixed at 5% from left edge, starting 100px from top
- **Background Line**: Gray (`bg-gray-600/70`) - static line
- **Progress Line**: Blue (`bg-sky-500`) - fills from 0% to 100% based on scroll
- **Timeline Dots**: 6 dots positioned at fixed percentages (0%, 18%, 36%, 54%, 72%, 90%)
- **Active State**: Dots highlight (blue with glow) when `i <= activeIndex`

### 2. Unified Background
- **Single Background**: All sections share the same gradient background
- **Background Value**: `linear-gradient(135deg, rgba(0,118,182,0.2) 0%, rgba(0,118,182,0.15) 50%, rgba(0,118,182,0.1) 100%), #18181a`
- **Applied To**: Main container only
- **Sections**: No individual backgrounds - transparent sections blend seamlessly

### 3. Scroll-Based Animations
- **Progress Tracking**: Timeline fills based on scroll position
- **Section Detection**: Intersection Observer detects active sections (40% threshold)
- **Fade-In Animation**: Sections fade in when they enter viewport
- **Active Index**: Updates to highlight timeline dots

### 4. Section Structure
- **6 Sections**: Hero, Awareness, Solution, Insight, Progress, Transformation
- **Layout**: Content offset 12% from left to make room for timeline
- **Spacing**: 60vh between sections
- **Height**: Each section is `min-h-screen`

### 5. Technical Implementation

#### Scroll Handler
```javascript
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = Math.min((scrollTop / docHeight) * 100, 100);
  if (timelineProgressRef.current) {
    timelineProgressRef.current.style.height = `${progress}%`;
  }
};
```

#### Intersection Observer
```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const index = Number(entry.target.getAttribute("data-index"));
      if (entry.isIntersecting) {
        setActiveIndex(index);
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.4 }
);
```

## File Locations

- **Explorer Page**: `/next-app/src/app/explorer/page.tsx`
- **CSS Styles**: `/next-app/src/app/globals.css` (lines 504-514 for `.visible-section`)
- **Backup**: `/backups/explorer-page-backup-[timestamp].tsx`

## Current State

✅ All sections use unified background (no separate boxes)
✅ Timeline visible and working
✅ Dots highlight correctly based on scroll
✅ Progress line fills smoothly
✅ Sections fade in on scroll
✅ No black parts or gradient differences

## Notes for Future Development

- Timeline dots are positioned at fixed percentages (not dynamically based on section positions)
- Background is applied only to main container
- Sections are transparent and part of continuous page
- CSS animation class: `.visible-section` with `.visible` modifier

