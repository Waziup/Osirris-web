# Osirris Web

A modern, high-performance website for the Osirris project, built with Next.js and TinaCMS.

## Project Overview

This project is a Next.js application designed to showcase the Osirris smart irrigation technology. It features a fully editable content management system (TinaCMS) that allows for easy updates to all sections of the site, including the homepage, navigation, footer, and blog.

### Key Features
- **Next.js 15+**: High-performance React framework.
- **TinaCMS**: Git-backed headless CMS for real-time content editing.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Shadcn UI**: Reusable and accessible UI components.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd Osirris-web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Project

To start the development server with TinaCMS integration:

```bash
npm run tina:dev
# or
yarn tina:dev
```

This command concurrently runs:
1.  The Next.js development server at `http://localhost:3000`
2.  The TinaCMS GraphQL server and watcher.

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

## Editing Content with TinaCMS

The website is integrated with TinaCMS, allowing you to edit content directly from the frontend.

### Accessing the CMS

1.  Start the project using `npm run tina:dev`.
2.  Navigate to **[http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html)** in your browser.
3.  You will enter the TinaCMS dashboard.

### What You Can Edit

-   **Home Page:**
    -   **Hero Slider:** Add/remove images, change headings and subheadings.
    -   **Technology Section:** Update product specs, main image, and gallery images.
    -   **Application Section:** Manage feature cards, descriptions, and images.
    -   **Pilot Sites:** Add new pilot sites with photos, descriptions, and status.
    -   **Partners:** Manage partner logos and names via a slider.

-   **Global Settings:**
    -   **Navigation:** Add or remove menu links.
    -   **Footer:** Update copyright text, social media links, and the EU funding acknowledgment (text and logo).

-   **Blog & Media:**
    -   Create and edit blog posts and media items.

## Building for Production

To build the application for production deployment:

```bash
npm run build
# or
yarn build
```

This command generates the static pages and optimized assets.

## Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com).
1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Vercel will detect Next.js and automatically configure the build settings.
4.  Add your environment variables (if any) in the Vercel project settings.

## License

[Your License Here]