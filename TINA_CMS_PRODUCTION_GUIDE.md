# Tina CMS Production Guide - Local-Only Editing

This guide explains how Tina CMS is configured for your project: **editing locally only, disabled on production**.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Development Machine                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Tina CMS Admin Interface                           │   │
│  │  http://localhost:3000/admin                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Edit Content Locally                               │   │
│  │  - Pages                                            │   │
│  │  - Blog Posts                                       │   │
│  │  - Global Settings                                 │   │
│  │  - Media Uploads                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Changes Saved to Local Files                       │   │
│  │  - content/pages/index.mdx                          │   │
│  │  - content/blog/*.mdx                               │   │
│  │  - content/global/index.json                        │   │
│  │  - public/uploads/*                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Commit & Push to GitHub                            │   │
│  │  git add .                                          │   │
│  │  git commit -m "Update content"                     │   │
│  │  git push origin main                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↓                                    │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Your Production Server                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Docker Container                                   │   │
│  │  - Pulls latest code from GitHub                    │   │
│  │  - Builds application                               │   │
│  │  - Serves website                                   │   │
│  │  - Tina CMS: DISABLED (403 Forbidden)              │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Website Available at                               │   │
│  │  https://yourdomain.com                             │   │
│  │  (No admin interface)                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Features

✅ **Tina CMS Disabled on Production**
- No admin interface exposed
- No authentication needed
- Impossible to edit content on server
- Reduced attack surface

✅ **Content Managed via Git**
- All changes tracked in version control
- Easy to revert changes
- Audit trail of all modifications
- Backup in GitHub

✅ **Environment-Based Control**
- Automatically detects production vs development
- No manual configuration needed
- Works in Docker automatically

---

## 📝 Workflow: How to Update Content

### 1. **Edit Locally**

```bash
# Start Tina CMS development server
npm run tina:dev

# Open browser
# http://localhost:3000/admin

# Edit content in Tina CMS interface
# - Pages
# - Blog posts
# - Global settings
# - Upload images
```

### 2. **Commit Changes**

```bash
# All changes are saved to local files
git status

# You'll see changes like:
# - content/pages/index.mdx
# - content/blog/new-post.mdx
# - content/global/index.json
# - public/uploads/image.webp

# Commit changes
git add .
git commit -m "Update: Add new blog post and images"
```

### 3. **Push to GitHub**

```bash
git push origin main
```

### 4. **Deploy to Server**

```bash
# On your server, pull latest code
git pull origin main

# Rebuild Docker image
docker-compose up -d --build

# Website updates automatically!
```

---

## 🚀 Complete Update Process

### Quick Reference

```bash
# 1. Edit locally
npm run tina:dev
# Make changes in http://localhost:3000/admin

# 2. Commit
git add .
git commit -m "Update content"

# 3. Push
git push origin main

# 4. Deploy (on server)
cd /path/to/osirris-web
git pull origin main
docker-compose up -d --build
```

---

## 📊 Comparison: Local vs Production

| Aspect | Local Development | Production Server |
|--------|-------------------|-------------------|
| Tina CMS Admin | ✅ Enabled | ❌ Disabled (403) |
| Edit Content | ✅ Yes | ❌ No |
| Upload Images | ✅ Yes | ❌ No |
| View Website | ✅ Yes | ✅ Yes |
| API Endpoint | ✅ http://localhost:3000/api/tina | ❌ Returns 403 |

---

## 🔄 Automatic Deployments (Optional)

For automatic deployments when you push to GitHub, consider:

### Option 1: GitHub Actions (Recommended)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          ssh user@yourserver.com 'cd /path/to/osirris-web && git pull && docker-compose up -d --build'
```

### Option 2: Webhook Deployment

Set up a webhook that automatically pulls and rebuilds when you push to GitHub.

### Option 3: Manual Deployment

Simply SSH to your server and run:
```bash
git pull origin main
docker-compose up -d --build
```

---

## 🛡️ Security Checklist

✅ Tina CMS disabled on production
✅ No authentication needed
✅ Content managed via git
✅ Changes tracked in version control
✅ Easy to audit modifications
✅ Simple to revert changes

---

## 📚 File Locations

### Content Files (Edited in Tina CMS)

```
content/
├── pages/
│   └── index.mdx          # Home page content
├── blog/
│   ├── post-1.mdx         # Blog posts
│   ├── post-2.mdx
│   └── ...
├── media/
│   └── *.mdx              # Media/Publications
├── publications/
│   └── *.mdx              # Research papers
└── global/
    └── index.json         # Global settings (logo, nav, footer)

public/uploads/            # Media files uploaded via Tina CMS
├── image-1.webp
├── image-2.png
├── video.mp4
└── ...
```

### Configuration Files (Don't edit in Tina CMS)

```
tina/
├── config.ts              # Tina CMS schema definition
└── schema.ts              # Content types

src/
├── app/
│   └── api/tina/[...routes]/route.ts  # Tina API (disabled on production)
└── ...
```

---

## 🔍 Troubleshooting

### Tina CMS Not Starting Locally

```bash
# Make sure you're running the dev command
npm run tina:dev

# Not this:
npm run dev

# The tina:dev command starts both Next.js and Tina CMS
```

### Changes Not Appearing After Deploy

```bash
# 1. Make sure you committed changes
git status

# 2. Make sure you pushed to GitHub
git log --oneline -5

# 3. On server, pull latest code
git pull origin main

# 4. Rebuild Docker
docker-compose up -d --build
```

### Can't Access Admin on Production

This is expected! ✅

```bash
# On production server, accessing /admin returns 403
curl https://yourdomain.com/admin

# Response: "Tina CMS is disabled on production"
```

---

## 📖 Best Practices

1. **Always edit locally** - Never try to edit on production
2. **Commit frequently** - Small, meaningful commits
3. **Test locally first** - Verify changes work before pushing
4. **Use descriptive messages** - Clear commit messages
5. **Backup regularly** - GitHub is your backup
6. **Review changes** - Check git diff before committing

---

## 🆘 Support

### Common Issues

**Q: I edited content but it's not showing on the server**
A: Did you commit and push to GitHub? The server pulls from GitHub, not your local files.

**Q: Can I edit content on the server?**
A: No, Tina CMS is intentionally disabled for security. Edit locally and push to GitHub.

**Q: How do I revert a change?**
A: Use `git revert` or `git reset` to go back to a previous commit.

**Q: Can I schedule content updates?**
A: Not directly in Tina CMS. You can schedule git commits using GitHub Actions.

---

## 🎯 Summary

✅ **Edit locally** with Tina CMS
✅ **Commit & push** to GitHub
✅ **Deploy** to your server
✅ **Tina CMS disabled** on production (secure)
✅ **Content managed** via git (trackable)

This is the **most secure and maintainable** approach! 🚀
