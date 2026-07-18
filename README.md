# 🐾 NENÉM – The Legendary Gatoelho

> The most beloved cat on the internet is now a memecoin on the blockchain.  
> A legend. A vibe. A movement.

This is the official website for **$NENEM**, a community-driven memecoin inspired by Neném, a viral cat from Brazil with a unique short spine syndrome and an even bigger personality. The project celebrates Neném's story and aims to build a wholesome, fun, and engaged crypto community.

![Neném Hero](public/banner5.png)

---

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript (converted from static HTML/JS)
- **Styling**: Pure CSS with CSS variables, responsive design
- **Fonts**: Google Fonts – Baloo 2 (display) and Nunito (body), served via `next/font`
- **Deployment**: Vercel (recommended) or any Node.js hosting

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Homepage (client component with interactivity)
│   └── globals.css         # All styles (converted from original style.css)
├── public/
│   ├── images/             # All cat images (cat.jpg, cat1.jpg … cat14.jpg)
│   ├── banner5.png         # Hero background
│   └── cat-master.svg      # Fallback image (optional)
├── next.config.js          # (optional, if needed)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🖼️ Image Assets

The site uses 15 images. To match the code, they must be renamed as follows:

| Original filename | New filename |
|-------------------|--------------|
| `cat`             | `cat.jpg`    |
| `cat(1)` … `cat(14)` | `cat1.jpg` … `cat14.jpg` |

Place all these inside `public/images/`.  
The banner background should be placed at `public/banner5.png`.

---

## ⚙️ Setup & Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd nenem-website
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### 4. Build for production

```bash
npm run build
npm start
```

---

## ✨ Features

- **Fully responsive** – adapts to all screen sizes (desktop, tablet, mobile).
- **Interactive navigation** – active link highlights as you scroll.
- **Copy contract address** – one‑click copy to clipboard.
- **Smooth scroll** – internal anchor links with smooth animation.
- **Viral moments grid** – showcases Neném's most popular videos with play buttons.
- **Tokenomics** – displayed with a pie chart and distribution details.
- **Roadmap timeline** – clean step‑by‑step journey, responsive on all devices.
- **Community section** – social cards and a call‑to‑action.
- **Footer** – brand, quick links, resources, and legal info.

---

## 🛠️ Conversion Notes

This project was originally a single‑page static HTML/CSS/JS file. It has been converted to a Next.js App Router structure with:

- **CSS** moved to `globals.css` with updated asset paths (e.g., `/banner5.png`).
- **JavaScript** logic (copy, scroll observer, active nav, play button animation) moved to `useEffect` hooks inside `page.tsx`.
- **Fonts** loaded via `next/font` for better performance and reliability.
- **Images** use the `<img>` tag with fallback handling for `cataas.com` (now using local assets).

---

## 📝 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## ❤️ Support the Project

- **Buy $NENEM** – contract address: `BCDgN5Jgnkbjs8oRHivko5dcf18sPsSmPVKAsDnMpump`
- **Join the community** – [Telegram](https://t.me/nenemcoin) (placeholder), [Instagram](https://instagram.com/gato.elho), [YouTube](https://youtube.com/@nenemgatoelho), [X (Twitter)](https://twitter.com/NenemGatoelho)

---

Made with ❤️ for Neném and his family.
