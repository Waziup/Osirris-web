# Osirris Web - Cleaned and Fixed

This project has been cleaned up and most issues have been resolved. See `CLEANUP_SUMMARY.md` for detailed information about all changes made.

## Quick Start

### Install Dependencies
```bash
pnpm install
```

### Run Development Server
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
pnpm build
pnpm start
```

## What Was Fixed

1. ✅ Added all missing dependencies (lucide-react, Radix UI components, etc.)
2. ✅ Created missing constants file (`src/const.ts`)
3. ✅ Created missing utility files (`src/lib/utils.ts`)
4. ✅ Created missing hooks (`useComposition`, `useMobile`)
5. ✅ Fixed TypeScript type errors throughout the codebase
6. ✅ Simplified TinaCMS configuration
7. ✅ Updated Next.js configuration
8. ✅ Removed unused components and files
9. ✅ Fixed CSS import issues
10. ✅ Updated metadata and branding

## Project Structure

- `/src/app` - Next.js App Router pages and layouts
- `/src/components` - React components (sections and UI)
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions
- `/src/pages` - Page components (used by app router)
- `/content` - MDX content files
- `/public` - Static assets

## Key Files

- `package.json` - All dependencies properly configured
- `next.config.ts` - Next.js configuration (updated)
- `tsconfig.json` - TypeScript configuration
- `.env.example` - Environment variables template
- `CLEANUP_SUMMARY.md` - Detailed list of all fixes

## Technologies

- **Framework**: Next.js 16.0.4 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **TypeScript**: 5.x
- **Content**: MDX with gray-matter

## Notes

- The project uses React 19 which has some peer dependency warnings with TinaCMS (designed for React 18). These warnings can be ignored as the functionality works correctly.
- TinaCMS is configured but simplified - you can remove it entirely if not needed
- All TypeScript errors have been resolved
- The build process now completes successfully

## Support

For issues or questions, refer to:
- `CLEANUP_SUMMARY.md` for detailed changes
- `ISSUES_FOUND.md` for original issues discovered
- Next.js documentation: https://nextjs.org/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs
