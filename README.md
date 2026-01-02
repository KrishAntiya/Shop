# SwastikPharma Website

A modern, responsive veterinary pharmacy e-commerce website built with Next.js, React, and Tailwind CSS.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with green and white color scheme
- **Product Categories**: Organized by animal type and product category
- **Featured Products**: Showcase top-selling veterinary products
- **Service Highlights**: Key services like same-day dispatch, vet support, secure payments
- **Newsletter Subscription**: Stay updated with latest offers and tips
- **Comprehensive Footer**: Links to all important pages and information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Header.tsx       # Header with navigation
│   ├── Hero.tsx        # Hero section
│   ├── ShopByAnimal.tsx # Animal category section
│   ├── ShopByCategory.tsx # Product category section
│   ├── FeaturedProducts.tsx # Featured products
│   ├── Services.tsx    # Service highlights
│   ├── Newsletter.tsx  # Newsletter subscription
│   └── Footer.tsx      # Footer with links
└── public/             # Static assets
```

## Technologies Used

- **Next.js 14**: React framework for production
- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework

## Build for Production

```bash
npm run build
npm start
```

## License

This project is created for SwastikPharma.

