# Osirris Web - Complete Setup

A modern Next.js website for the Osirris project with TinaCMS content management, featuring Home, Blog, and Media pages.

## Features

- ✅ **Next.js 16** with App Router
- ✅ **React 19** with TypeScript
- ✅ **Tailwind CSS 4** for styling
- ✅ **TinaCMS** for content management
- ✅ **MDX** for rich content
- ✅ **Responsive Design** with mobile-first approach
- ✅ **Blog System** with categories and featured posts
- ✅ **Media Gallery** for photos and videos
- ✅ **Publications Management** for research papers

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

Visit:
- **Home**: http://localhost:3000
- **Blog**: http://localhost:3000/blog
- **Media**: http://localhost:3000/media

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Pages

### Home Page (`/`)
The landing page featuring:
- Hero slider with images
- Technology overview
- Application showcase
- Pilot projects
- Partners section

### Blog Page (`/blog`)
A full-featured blog with:
- Featured posts
- Category filtering
- Search functionality
- Author information
- Read time estimates

### Media Page (`/media`)
Gallery and publications featuring:
- Photo and video gallery
- Category filtering
- Research publications
- Download tracking

## Content Management with TinaCMS

All content is managed through MDX files in the `content/` directory:

```
content/
├── pages/          # Home page content
├── blog/           # Blog posts
├── media/          # Media items (photos/videos)
└── publications/   # Research papers
```

### Quick Content Editing

**Edit existing content**: Simply modify MDX files in the respective `content/` directories

**Add a blog post**: Create a new `.mdx` file in `content/blog/`

**Add media**: Create a new `.mdx` file in `content/media/`

**Add publication**: Create a new `.mdx` file in `content/publications/`

### Sample Blog Post

Create `content/blog/my-post.mdx`:

```yaml
---
title: "My Blog Post"
excerpt: "A brief description"
image: "https://example.com/image.jpg"
category: "Technology"
date: "2024-12-15T00:00:00.000Z"
readTime: "5 min read"
author: "Your Name"
authorRole: "Developer"
featured: false
---

Your content here in Markdown format...
```

For complete TinaCMS documentation, see **[TINACMS_SETUP.md](./TINACMS_SETUP.md)**

## Project Structure

```
Osirris-web/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Home page route
│   │   ├── blog/           # Blog routes
│   │   │   └── page.tsx
│   │   └── media/          # Media routes
│   │       └── page.tsx
│   ├── components/
│   │   ├── sections/       # Page sections
│   │   └── ui/             # UI components (Radix)
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page component
│   │   ├── Blog.tsx        # Blog page component
│   │   └── Media.tsx       # Media page component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── const.ts            # App constants
├── content/                # Content files (MDX)
│   ├── pages/             # Home page content
│   ├── blog/              # Blog posts
│   ├── media/             # Media items
│   └── publications/      # Research papers
├── tina/                   # TinaCMS configuration
│   └── config.ts
├── public/                 # Static assets
│   └── uploads/           # User-uploaded images
└── package.json
```

## Technologies

### Core
- **Next.js 16.0.4** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5.x** - Type safety

### Styling
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Content Management
- **TinaCMS 2.x** - Git-backed CMS
- **MDX** - Markdown with JSX support
- **gray-matter** - Frontmatter parsing

### UI Components
- **react-hook-form** - Form validation
- **embla-carousel** - Carousel component
- **sonner** - Toast notifications
- **cmdk** - Command menu

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm tina:dev         # Start with TinaCMS admin interface

# Production
pnpm build            # Build for production
pnpm tina:build       # Build with TinaCMS
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
```

## Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Optional: For TinaCMS Cloud visual editor
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token

# Leave empty for local file-based editing (works without TinaCloud)
```

## Documentation

- **[README.md](./README.md)** - This file (overview and quick start)
- **[TINACMS_SETUP.md](./TINACMS_SETUP.md)** - Complete TinaCMS guide and content management
- **[CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md)** - Details of all fixes applied to the project
- **[WORK_COMPLETED.md](./WORK_COMPLETED.md)** - Summary of work completed

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables (if using TinaCloud)
4. Deploy automatically

### Other Platforms

Compatible with any Next.js hosting:
- **Netlify** - Add build command: `pnpm build`
- **AWS Amplify** - Full support for Next.js
- **Digital Ocean** - App Platform
- **Self-hosted** - Use `pnpm build && pnpm start`

## Troubleshooting

### Development Server Issues
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm dev
```

### Content Not Appearing
- Verify MDX file frontmatter syntax is correct
- Ensure all required fields are present
- Check browser console for errors
- Restart development server

### Build Errors
- Validate all MDX frontmatter
- Run TypeScript check: `pnpm build`
- Review error messages carefully
- Check that dates are in ISO format

### TypeScript Errors
- Ensure all components have proper type annotations
- Check imports are correct
- Run `pnpm build` to see all errors

## Adding New Features

### Adding a New Page

1. Create page component in `src/pages/NewPage.tsx`
2. Create route in `src/app/newpage/page.tsx`
3. Import and render your component
4. Add navigation link in Navigation component

### Adding New Content Types

1. Update `tina/config.ts` with new collection
2. Create content directory: `content/newtype/`
3. Create sample content file
4. Update relevant page component to display content

## Best Practices

### Content Files
- Use descriptive filenames (kebab-case)
- Include all required frontmatter fields
- Use ISO date format: `2024-12-15T00:00:00.000Z`
- Optimize images before uploading

### Code
- Follow TypeScript best practices
- Use "use client" directive for client components
- Keep components small and focused
- Use proper semantic HTML

### Performance
- Optimize images (use Next.js Image component)
- Lazy load heavy components
- Minimize client-side JavaScript
- Use static generation where possible

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TinaCMS Documentation](https://tina.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

### Getting Help
1. Check project documentation files
2. Review error messages carefully
3. Check browser console for client-side errors
4. Review Next.js and TinaCMS documentation

## Project Status

✅ **Fully Functional**
- Home page with hero slider
- Blog system with filtering
- Media gallery with publications
- TinaCMS content management configured
- All dependencies installed
- TypeScript properly configured
- Responsive design implemented

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Test thoroughly: `pnpm dev` and `pnpm build`
5. Commit changes: `git commit -m "Add my feature"`
6. Push to branch: `git push origin feature/my-feature`
7. Submit a pull request

## License

This project is part of the OSIRRIS initiative for sustainable Mediterranean agriculture.

---

**Last Updated**: December 2024  
**Status**: Production Ready ✅  
**Pages**: Home, Blog, Media  
**CMS**: TinaCMS Configured
