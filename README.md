# K S Venkatram - Portfolio Website

A modern, flashy portfolio website with Terminal Industries-inspired UI design, featuring animated circuit-like backgrounds, smooth Framer Motion animations, and a fully responsive layout.

## ✨ Features

- 🎨 **Flashy Terminal Industries-inspired UI** - Circuit-like animated backgrounds with glowing effects
- ⚡ **Smooth Animations** - Powered by Framer Motion for buttery smooth interactions
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎯 **Modern Tech Stack** - Built with Next.js 14+, TypeScript, and Tailwind CSS
- 🚀 **Fast Performance** - Server-side rendering and optimized bundle size
- 🎭 **Interactive Elements** - Mouse-following glow effects and hover animations

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Vercel (recommended)

## 📂 Project Structure

```
myself/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page combining all sections
├── components/
│   ├── CircuitBackground.tsx # Animated circuit background
│   ├── Navbar.tsx           # Sticky navigation bar
│   ├── Hero.tsx             # Landing section with intro
│   ├── About.tsx            # About me section
│   ├── Skills.tsx           # Skills and technologies
│   ├── Projects.tsx         # Featured projects
│   └── Contact.tsx          # Contact form and social links
├── public/                  # Static assets
├── .github/
│   └── copilot-instructions.md
└── ...config files

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone or navigate to the repository:
```bash
cd c:\Users\venka\OneDrive\Documents\AVV\myself
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Customization

### Personal Information

Update the following files with your information:

- `components/Hero.tsx` - Your name, title, and description
- `components/About.tsx` - Your background and stats
- `components/Skills.tsx` - Your skills and proficiency levels
- `components/Projects.tsx` - Your project portfolio
- `components/Contact.tsx` - Your contact information and social links

### Colors and Theme

Edit `tailwind.config.ts` to customize:
- Primary color (default: #00ff41 - terminal green)
- Accent colors
- Animation timings
- Custom utilities

### Animations

Modify animation settings in:
- `app/globals.css` - Global animation keyframes
- Individual components - Framer Motion variants

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

## 🎨 Design Features

- **Circuit Background:** Animated SVG lines creating a circuit-board effect
- **Mouse Glow:** Interactive glow effect that follows cursor movement
- **Floating Particles:** Ambient particle animations throughout
- **Smooth Scrolling:** Scroll-triggered animations using Framer Motion
- **Gradient Accents:** Dynamic color gradients on hover states
- **Glass Morphism:** Backdrop blur effects on cards and sections

## 📧 Contact

**K S Venkatram**
- Email: venkatram@example.com
- Location: Coimbatore, Tamil Nadu, India
- University: Amrita Vishwa Vidyapeetham

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by Terminal Industries UI design
- Built with modern web technologies
- Powered by the Next.js and React communities

---

Built with ❤️ using Next.js, TypeScript, and Framer Motion
