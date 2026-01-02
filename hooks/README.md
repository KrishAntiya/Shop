# useHeaderScroll Hook

A reusable custom hook for implementing smart sticky header scroll behavior without flickering.

## Features

- ✅ Uses `requestAnimationFrame` for smooth scroll handling
- ✅ Only updates state when scroll direction changes (prevents flickering)
- ✅ Scroll threshold to ignore micro-movements (≥10px default)
- ✅ No layout shifts (uses `transform: translateY()`)
- ✅ Works on desktop and mobile
- ✅ Proper cleanup of event listeners

## Usage Example

```tsx
'use client'

import React from 'react'
import { useHeaderScroll } from '../hooks/useHeaderScroll'

const Header = () => {
  // Hook returns true when LogoHeader should be visible, false when hidden
  const isLogoHeaderVisible = useHeaderScroll(10) // 10px threshold

  return (
    <header className="sticky top-0 z-50">
      {/* LogoHeader: Hides on scroll DOWN, shows on scroll UP */}
      <div 
        className="bg-white border-b shadow-sm will-change-transform transition-transform duration-300 ease-in-out"
        style={{
          transform: isLogoHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
        }}
      >
        {/* Your LogoHeader content */}
        <div>Logo, Search, Account, Cart</div>
      </div>

      {/* NavHeader: Always visible, never moves */}
      <div className="bg-gray-50 border-b shadow-sm">
        <nav>
          {/* Your navigation links */}
          <a href="/">HOME</a>
          <a href="/pharmacy">PHARMACY</a>
        </nav>
      </div>
    </header>
  )
}
```

## CSS Classes Required

```css
/* LogoHeader */
.logo-header {
  will-change: transform; /* Optimizes for transform animations */
  transition: transform 300ms ease-in-out; /* Smooth slide animation */
}

/* NavHeader */
.nav-header {
  /* No special CSS needed - always visible */
}
```

## Parameters

- `threshold` (optional, default: `10`): Minimum scroll distance in pixels before triggering hide/show. Prevents micro-movements from causing flickering.

## Return Value

- `boolean`: `true` when LogoHeader should be visible, `false` when it should be hidden.

## How It Works

1. **requestAnimationFrame**: Scroll events are processed once per frame for smooth performance
2. **Direction Tracking**: State only updates when scroll direction changes (prevents flickering)
3. **Threshold**: Small scroll movements (< 10px) are ignored
4. **Transform**: Uses CSS `transform: translateY()` instead of `top`/`height` to avoid layout shifts
5. **Top Detection**: Always shows LogoHeader when within 50px of page top

