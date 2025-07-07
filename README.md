# Calculator Web Application - Engineering Design Document

## Overview

**Project**: Calculator Web Application  
**Author**: Isaac Suazo (isaac.suazo@cit.hn)  
**Date**: January 2025  
**Status**: Implemented  
**Live Demo**: [https://isaacsuazo-cit.github.io/calculadora-nextjs/](https://isaacsuazo-cit.github.io/calculadora-nextjs/)

### Executive Summary

A responsive web-based calculator application built with Next.js 14, designed for basic arithmetic operations. The application is optimized for static hosting on GitHub Pages and provides a modern, intuitive user interface.

### Goals

- **P0**: Implement core arithmetic operations (addition, subtraction, multiplication, division)
- **P0**: Ensure responsive design for mobile and desktop devices
- **P1**: Deploy as a static site on GitHub Pages
- **P1**: Maintain clean, maintainable code architecture
- **P2**: Provide smooth user interactions with visual feedback

### Non-Goals

- Scientific calculator functions
- History/memory features
- Backend integration or user accounts
- Complex mathematical operations beyond basic arithmetic

## Background and Context

### Problem Statement

Users need a simple, accessible calculator that works seamlessly across devices without requiring installation or complex setup. Existing solutions often include unnecessary features or require app installation.

### Prior Art

- Native OS calculators (limited to specific platforms)
- Google Calculator (requires internet search)
- Physical calculators (not always available)

### Constraints

1. Must work as a static site (no server-side processing)
2. GitHub Pages hosting limitations
3. Browser compatibility requirements
4. Performance on low-end devices

## Design

### Architecture Overview

```
┌─────────────────────────────────────────┐
│          GitHub Pages (CDN)             │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │       Next.js Static Export       │ │
│  │                                   │ │
│  │  ┌─────────────┐  ┌────────────┐ │ │
│  │  │   App Dir   │  │   Public   │ │ │
│  │  │             │  │   Assets   │ │ │
│  │  │ ┌─────────┐ │  └────────────┘ │ │
│  │  │ │ Layout  │ │                 │ │
│  │  │ └─────────┘ │                 │ │
│  │  │ ┌─────────┐ │                 │ │
│  │  │ │  Page   │ │                 │ │
│  │  │ └─────────┘ │                 │ │
│  │  │ ┌─────────┐ │                 │ │
│  │  │ │Component│ │                 │ │
│  │  │ └─────────┘ │                 │ │
│  │  └─────────────┘                 │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Component Structure

```typescript
interface CalculatorState {
  display: string;           // Current display value
  previousValue: number;     // Stored value for operations
  operation: string;         // Current operation
  waitingForNewValue: boolean; // Input state flag
}
```

### User Interface Design

#### Layout Specifications
- **Container**: 320px width (responsive)
- **Display**: Full width, 60px minimum height
- **Buttons**: 4x5 grid layout
- **Spacing**: 10px gap between elements

#### Color Scheme
```css
--primary-bg: #2c3e50;
--secondary-bg: #34495e;
--button-bg: #95a5a6;
--button-hover: #7f8c8d;
--text-primary: #ecf0f1;
--accent: linear-gradient(#1e3c72, #2a5298);
```

### State Management

The calculator uses React's `useState` for local state management:

1. **Display State**: Manages the current displayed value
2. **Operation State**: Tracks the selected operation
3. **Memory State**: Stores the previous value for calculations
4. **Input State**: Determines if waiting for new number input

### Algorithm

```javascript
function calculate(firstValue, secondValue, operation) {
  switch(operation) {
    case '+': return firstValue + secondValue;
    case '-': return firstValue - secondValue;
    case '×': return firstValue * secondValue;
    case '÷': return secondValue !== 0 ? firstValue / secondValue : 0;
    default: return secondValue;
  }
}
```

## Implementation

### Technology Stack

- **Framework**: Next.js 14.0.4
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules
- **Build Tool**: Next.js built-in bundler
- **Deployment**: GitHub Actions + GitHub Pages

### File Structure

```
calculadora-nextjs/
├── app/
│   ├── components/
│   │   ├── Calculator.js        # Main calculator component
│   │   └── Calculator.module.css # Component styles
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout
│   ├── page.js                  # Home page
│   └── page.module.css          # Page styles
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD configuration
├── public/                      # Static assets
├── .gitignore
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
└── README.md                    # This document
```

### Key Implementation Details

#### Static Export Configuration
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/calculadora-nextjs' : '',
  images: { unoptimized: true }
}
```

#### Responsive Design
```css
@media (max-width: 380px) {
  .calculator { width: 100%; }
  .button { padding: 15px; font-size: 1.25rem; }
}
```

## Testing Strategy

### Unit Tests (Planned)
- Calculator operations accuracy
- State management logic
- Edge cases (division by zero, decimal handling)

### Integration Tests
- Button click interactions
- Display updates
- Operation chaining

### Manual Testing Checklist
- [ ] All arithmetic operations
- [ ] Decimal number input
- [ ] Clear functionality
- [ ] Mobile responsiveness
- [ ] Keyboard support (future)

## Performance Considerations

### Metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.0s
- **Bundle Size**: < 100KB
- **Lighthouse Score**: > 90

### Optimizations
1. CSS Modules for scoped styles
2. Static generation for instant loading
3. Minimal JavaScript bundle
4. No external dependencies for calculations

## Security Considerations

- No user data collection
- No external API calls
- No cookies or local storage
- Content Security Policy headers via GitHub Pages

## Deployment

### GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
    
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
```

### Deployment Steps
1. Push to main branch
2. GitHub Actions builds the static site
3. Artifacts uploaded to GitHub Pages
4. Site available at: `https://[username].github.io/[repo-name]/`

## Monitoring and Maintenance

### Metrics to Track
- Page load times
- Error rates (via browser console)
- User engagement (future analytics)

### Maintenance Tasks
- Dependency updates (monthly)
- Security patches (as needed)
- Performance optimization reviews

## Future Enhancements

### P1 - Near Term
- [ ] Keyboard input support
- [ ] History feature
- [ ] Copy/paste functionality
- [ ] PWA support

### P2 - Long Term
- [ ] Scientific calculator mode
- [ ] Theme customization
- [ ] Calculation history export
- [ ] Multi-language support

## API Documentation

### Calculator Component Props
```typescript
interface CalculatorProps {
  // No props - self-contained component
}
```

### Public Methods
```typescript
inputNumber(num: number): void
inputDecimal(): void
clear(): void
performOperation(operation: string): void
```

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development
```bash
# Clone repository
git clone https://github.com/isaacsuazo-cit/calculadora-nextjs.git
cd calculadora-nextjs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm run start
```

### Code Style
- ESLint configuration included
- Prettier formatting (optional)
- CSS Modules for styling
- Functional React components

## Contributing

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Review Criteria
- [ ] Follows existing code style
- [ ] Includes appropriate comments
- [ ] Updates documentation if needed
- [ ] Passes all tests
- [ ] Maintains responsive design

## References

1. [Next.js Documentation](https://nextjs.org/docs)
2. [GitHub Pages Documentation](https://docs.github.com/en/pages)
3. [MDN Web Docs - CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
4. [React Hooks Documentation](https://react.dev/reference/react)

## Appendix

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

### Accessibility Considerations
- High contrast colors
- Large touch targets (44x44px minimum)
- Clear visual feedback
- Future: Screen reader support

### License
This project is open source and available under the MIT License.

---

**Document Version**: 1.0.0  
**Last Updated**: January 2025  
**Review Status**: Approved for Implementation
