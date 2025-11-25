# TinaCMS Setup and Configuration

## Overview

TinaCMS has been configured to manage content for all pages in the Osirris-web project. The system is set up to work in local mode, allowing you to edit content without requiring TinaCloud credentials.

## Content Collections

The following collections have been configured:

### 1. Home Page
- **Path**: `content/pages/index.mdx`
- **Fields**:
  - Page Title
  - Hero Section (heading, subheading, slider images)
  - Body content (rich text)

### 2. Blog Posts
- **Path**: `content/blog/*.mdx`
- **Fields**:
  - Title, excerpt, featured image
  - Category (AI & Machine Learning, Case Study, Technology, Research, Partnership, Sustainability)
  - Publication date, read time
  - Author name and role
  - Featured flag
  - Body content (rich text)

### 3. Media Items
- **Path**: `content/media/*.mdx`
- **Fields**:
  - Title, type (photo/video)
  - Image/thumbnail
  - Video URL (for videos)
  - Category (Field Testing, Installation, Equipment, Application, Team, Events)
  - Description, date

### 4. Publications
- **Path**: `content/publications/*.mdx`
- **Fields**:
  - Title, journal/conference
  - Year, file size, download count
  - Category (Research Paper, Technical Report, White Paper, Conference Proceedings)
  - Badge color, PDF URL
  - Abstract/description (rich text)

## How to Use TinaCMS

### Option 1: Local Development (Recommended)

1. **Start the development server with TinaCMS**:
   ```bash
   pnpm install
   pnpm dev
   ```

2. **Access your site**:
   - Frontend: http://localhost:3000
   - Blog: http://localhost:3000/blog
   - Media: http://localhost:3000/media

3. **Edit content directly**:
   - Edit MDX files in the `content/` directory
   - Changes will hot-reload in the browser

### Option 2: Using TinaCMS Admin Interface

To use the visual CMS interface, you'll need to set up TinaCloud:

1. **Sign up for TinaCloud**:
   - Visit https://app.tina.io
   - Create a free account
   - Create a new project

2. **Get your credentials**:
   - Copy your Client ID
   - Generate a Read-Only Token

3. **Configure environment variables**:
   ```bash
   # In .env.local
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
   TINA_TOKEN=your_token_here
   ```

4. **Start with TinaCMS**:
   ```bash
   pnpm tina:dev
   ```

5. **Access the admin**:
   - Visit http://localhost:3000/admin
   - You can now edit content visually

## Content Structure

### Sample Blog Post
```yaml
---
title: "Your Blog Post Title"
excerpt: "A brief summary of your post"
image: "https://example.com/image.jpg"
category: "AI & Machine Learning"
date: "2024-12-15T00:00:00.000Z"
readTime: "5 min read"
author: "Your Name"
authorRole: "Your Role"
featured: true
---

Your blog post content here in Markdown...
```

### Sample Media Item
```yaml
---
title: "Photo Title"
type: "photo"
image: "https://example.com/photo.jpg"
category: "Field Testing"
description: "Description of the photo"
date: "2024-12-15T00:00:00.000Z"
---

Additional content...
```

### Sample Publication
```yaml
---
title: "Research Paper Title"
journal: "Journal Name"
year: "2024"
fileSize: "2.4 MB"
downloads: 100
category: "Research Paper"
color: "blue"
pdfUrl: "/publications/paper.pdf"
---

Abstract content...
```

## Adding New Content

### Adding a Blog Post

1. Create a new file in `content/blog/`:
   ```bash
   touch content/blog/my-new-post.mdx
   ```

2. Add frontmatter and content:
   ```yaml
   ---
   title: "My New Post"
   excerpt: "Post description"
   image: "https://example.com/image.jpg"
   category: "Technology"
   date: "2024-12-15T00:00:00.000Z"
   readTime: "5 min read"
   author: "Your Name"
   authorRole: "Developer"
   featured: false
   ---
   
   Your content here...
   ```

3. The post will automatically appear on the blog page

### Adding Media Items

1. Create a new file in `content/media/`:
   ```bash
   touch content/media/my-photo.mdx
   ```

2. Add frontmatter:
   ```yaml
   ---
   title: "My Photo"
   type: "photo"
   image: "https://example.com/photo.jpg"
   category: "Field Testing"
   description: "Photo description"
   date: "2024-12-15T00:00:00.000Z"
   ---
   ```

### Adding Publications

1. Create a new file in `content/publications/`:
   ```bash
   touch content/publications/my-paper.mdx
   ```

2. Add frontmatter:
   ```yaml
   ---
   title: "My Research Paper"
   journal: "Journal Name"
   year: "2024"
   fileSize: "2.4 MB"
   downloads: 0
   category: "Research Paper"
   color: "blue"
   pdfUrl: "/publications/my-paper.pdf"
   ---
   
   Abstract...
   ```

## Managing Images

### Using External Images
You can use any publicly accessible image URL in your content:
```yaml
image: "https://images.unsplash.com/photo-xxx"
```

### Using Local Images
1. Place images in `public/uploads/`
2. Reference them in content:
   ```yaml
   image: "/uploads/my-image.jpg"
   ```

## Troubleshooting

### Content Not Showing
- Check that the MDX file has proper frontmatter
- Ensure all required fields are filled
- Check the browser console for errors

### TinaCMS Admin Not Working
- Verify environment variables are set correctly
- Check that you're using valid TinaCloud credentials
- Try clearing your browser cache

### Build Errors
- Validate your MDX frontmatter syntax
- Ensure dates are in ISO format: `2024-12-15T00:00:00.000Z`
- Check that all required fields are present

## Scripts

```bash
# Regular development (no TinaCMS admin)
pnpm dev

# Development with TinaCMS admin interface
pnpm tina:dev

# Build for production
pnpm build

# Build with TinaCMS
pnpm tina:build
```

## File Structure

```
Osirris-web/
├── content/
│   ├── pages/
│   │   └── index.mdx          # Home page content
│   ├── blog/
│   │   ├── post-1.mdx         # Blog posts
│   │   └── post-2.mdx
│   ├── media/
│   │   ├── photo-1.mdx        # Media items
│   │   └── video-1.mdx
│   └── publications/
│       └── paper-1.mdx        # Publications
├── tina/
│   └── config.ts              # TinaCMS configuration
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── blog/
│   │   │   └── page.tsx       # Blog page
│   │   └── media/
│   │       └── page.tsx       # Media page
│   └── pages/
│       ├── Home.tsx           # Home component
│       ├── Blog.tsx           # Blog component
│       └── Media.tsx          # Media component
└── public/
    └── uploads/               # Local images
```

## Next Steps

1. **Customize Content**: Edit the sample content files to match your needs
2. **Add More Posts**: Create additional blog posts, media items, and publications
3. **Configure TinaCloud**: Set up TinaCloud for visual editing (optional)
4. **Deploy**: Deploy your site to Vercel or another hosting platform

## Resources

- [TinaCMS Documentation](https://tina.io/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
