# Section Templates

Consistent section templates to eliminate random text placement and max-width shifts.

## Components

### 1. `<Section>` - Base wrapper
Consistent padding (`py-24 md:py-32`), background (`--page-bg`), and container (`max-w-6xl mx-auto px-6 md:px-10`).

### 2. `<SectionHeader>` - Consistent header
Eyebrow + title + intro, always left-aligned (no centered text blocks).

### 3. `<Panel>` - Visual container
Consistent border (`border-token`), radius (`rounded-2xl`), padding (`p-8 md:p-10`), and background (`--panel-bg`).

## Templates

### Editorial Section (Single Column, Left-Aligned)
Use for narrative content, problem statements, thesis sections.

```tsx
import { EditorialSection } from '@/components/sections';

<EditorialSection
  eyebrow="THE PROBLEM"
  title="Modern health is fragmented."
  intro="Longevity only works when decisions remain coherent over time."
  maxWidth="medium" // "narrow" (42ch) | "medium" (56ch) | "wide" (70ch)
>
  <p>Your content here...</p>
</EditorialSection>
```

### Two-Column Section (Text Left, Visual/Panel Right)
Use for content + visual, content + panel, etc.

```tsx
import { TwoColumnSection } from '@/components/sections';

<TwoColumnSection
  eyebrow="FOUNDATION"
  title="Purpose"
  intro="ARC brings continuity, clarity, and structure to long-term health."
  leftContent={
    <div>
      <h3>Purpose</h3>
      <p>Content here...</p>
    </div>
  }
  rightContent={
    <div>Visual or panel content</div>
  }
  rightIsPanel={true} // Wrap right content in Panel
  leftWidth="40%" // "40%" | "45%" | "50%"
  rightWidth="60%" // "60%" | "55%" | "50%"
/>
```

### Grid Section (Features/Cards)
Use for features, capabilities, cards.

```tsx
import { GridSection } from '@/components/sections';

<GridSection
  eyebrow="FEATURES"
  title="What ARC Fixes"
  intro="ARC turns scattered health information into one coherent blueprint."
  items={[
    {
      title: "One health story",
      content: <p>Your records, results, and trends stay together...</p>
    },
    {
      title: "Earlier signals",
      content: <p>Spot subtle drift before it becomes a problem.</p>
    },
    // ... more items
  ]}
  columns={3} // 2 | 3 | 4
  usePanels={true} // Wrap each item in Panel
/>
```

## Rules

1. **No centered text blocks** - All text is left-aligned by default
2. **Consistent max-widths** - Use `maxWidth` prop, don't add random max-widths
3. **Consistent padding** - All sections use `py-24 md:py-32`
4. **Consistent container** - All sections use `max-w-6xl mx-auto px-6 md:px-10`

## Migration

Replace existing sections with these templates:

**Before:**
```tsx
<section className="py-14 md:py-20 px-6 md:px-10">
  <div className="max-w-6xl mx-auto space-y-8">
    <div className="text-center">
      <h2>Title</h2>
      <p className="max-w-[68ch] mx-auto">Intro</p>
    </div>
    {/* Random content */}
  </div>
</section>
```

**After:**
```tsx
<EditorialSection
  eyebrow="EYEBROW"
  title="Title"
  intro="Intro"
>
  {/* Content */}
</EditorialSection>
```


