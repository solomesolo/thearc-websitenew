# Global Layout System & Base Components - Complete ✅

## Overview
Created a comprehensive global layout system and base components for The Arc website, establishing a consistent, premium foundation for all future UI work.

## Global Theme Configuration

### Colors
- **Background**: Pure black (#000000)
- **Primary Text**: White (#FFFFFF)
- **Secondary Text**: Soft grey (#CCCCCC)
- **Accent**: #4DE4C1 (premium turquoise)
- **Card Background**: #111111
- **Border**: #222222

### Typography
- **Font**: Montserrat (Google Fonts)
- **Section Title**: 42px desktop, 32px mobile
- **Paragraph**: Max-width 700px, line-height 1.7

### Layout
- **Max Content Width**: 1240px
- **Section Spacing**: 140px top/bottom padding
- **Responsive Padding**:
  - Mobile: 24px
  - Tablet: 48px
  - Desktop: 64px

## Base Components Created

### 1. `Container.tsx`
- Centers content with max-width 1240px
- Responsive horizontal padding (24px/48px/64px)
- Optional section spacing (140px top/bottom)

### 2. `SectionTitle.tsx`
- Large, elegant heading (42px desktop, 32px mobile)
- Optional subtitle support
- Responsive font sizing

### 3. `Paragraph.tsx`
- Soft-grey text (#CCCCCC)
- Line-height: 1.7
- Max-width: 700px (configurable)
- Supports custom styles

### 4. `CTAButton.tsx` (Updated)
- Primary: Accent background (#4DE4C1), black text
- Secondary: Transparent, white border
- Subtle hover glow effect
- Rounded corners

### 5. `ImagePlaceholder.tsx`
- Dark grey box (#111111)
- Configurable width/height
- Custom label support

### 6. `TwoColumn.tsx`
- Grid with two equal columns (desktop)
- Single column (mobile)
- 80px gap desktop, 40px gap mobile
- Optional reverse layout

### 7. `Card.tsx`
- Base card component
- Dark grey background (#111111)
- Border: 1px solid #222222
- Padding: 32px
- Border-radius: 14px
- Subtle hover: border-accent + soft glow

## Updated Components

### `Section.tsx`
- Now uses `Container` internally
- Applies section spacing automatically
- Supports background variants

### `Hero.tsx`
- Refactored to use `Container`, `TwoColumn`, `ImagePlaceholder`, `Paragraph`
- Consistent with global system

### `PlanCard.tsx`
- Now extends `Card` base component
- Maintains all existing functionality

## Homepage Refactoring

### Changes Made
1. ✅ Replaced all sections with `Container` and `Section` components
2. ✅ Replaced all headings with `SectionTitle`
3. ✅ Replaced all text with `Paragraph`
4. ✅ Replaced step cards with `Card` components
5. ✅ Used `TwoColumn` for two-column layouts
6. ✅ Used `ImagePlaceholder` for all image placeholders
7. ✅ Removed all emojis from the page
8. ✅ Updated all colors to use new theme variables
9. ✅ Applied consistent spacing throughout

### Sections Updated
- Hero Section: Uses `Container`, `TwoColumn`, `ImagePlaceholder`
- How It Works: Uses `SectionTitle`, `Card` components
- Philosophy: Uses `TwoColumn`, `ImagePlaceholder`, `Paragraph`
- Personas: Uses existing `PersonaCard` (maintains image background)
- Plans: Uses `PlanCard` (now extends `Card`)
- Service Catalog: Uses `Card` wrapper
- Roadmap: Removed emojis, uses bullet points
- Final CTA: Uses `SectionTitle`, `Paragraph`

## CSS Variables Added

```css
--max-content-width: 1240px;
--section-padding-top: 140px;
--section-padding-bottom: 140px;
--padding-mobile: 24px;
--padding-tablet: 48px;
--padding-desktop: 64px;
--text-secondary: #CCCCCC;
--card-bg: #111111;
--border: #222222;
--accent-glow: rgba(77, 228, 193, 0.2);
```

## Global CSS Classes

### `.container-global`
- Applies max-width and responsive padding
- Centers content automatically

### `.section-global`
- Applies 140px top/bottom padding
- Used by `Container` when `applySectionSpacing={true}`

## Files Created

1. `/next-app/src/components/Container.tsx`
2. `/next-app/src/components/SectionTitle.tsx`
3. `/next-app/src/components/Paragraph.tsx`
4. `/next-app/src/components/ImagePlaceholder.tsx`
5. `/next-app/src/components/TwoColumn.tsx`
6. `/next-app/src/components/Card.tsx`

## Files Updated

1. `/next-app/src/app/globals.css` - Added theme variables and global classes
2. `/next-app/src/app/page.tsx` - Complete refactor using new components
3. `/next-app/src/components/Section.tsx` - Now uses Container
4. `/next-app/src/components/Hero.tsx` - Refactored with new components
5. `/next-app/src/components/PlanCard.tsx` - Extends Card base
6. `/next-app/src/components/CTAButton.tsx` - Updated hover effects

## Next Steps

1. All components are ready for content integration
2. Image placeholders can be replaced with real images
3. All future pages should use these base components
4. Consistent spacing and styling is now enforced site-wide

## Notes

- All components are TypeScript with proper type definitions
- Components are fully responsive
- No emojis remain in the codebase
- All styling uses CSS variables for easy theme updates
- Layout is consistent and premium throughout

