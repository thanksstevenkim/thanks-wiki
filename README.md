# thanks-wiki 🧠🌐

> A lightweight multilingual wiki powered by [Astro](https://astro.build).  
> This is a personal knowledge base built and maintained by [thanksstevenkim.dev](https://thanksstevenkim.dev).

---

## 📖 About

**thanks-wiki** is a static documentation site structured in a wiki-like format.  
It organizes what I've learned so far about:

- Decentralized web and protocols (e.g. ActivityPub)
- Open-source systems and philosophy
- Web technologies and server administration

Available in multiple languages:

- 🇰🇷 Korean `/docs/kr/`
- 🇺🇸 English `/docs/en/`
- 🇯🇵 Japanese `/docs/jp/`

---

## 📂 Project Structure

```

/
├── src/
│   ├── pages/
│   │   └── index.astro             # Root landing page
│   │   └── docs/\[...slug].astro    # Dynamic route for wiki content
│   └── content/
│       └── docs/
│           ├── kr/                 # Korean markdown docs
│           ├── en/                 # English markdown docs
│           └── jp/                 # Japanese markdown docs
├── public/
├── astro.config.mjs
└── package.json

```

---

## 🚀 Getting Started

```
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Site will be served at: [http://localhost:4321](http://localhost:4321)

---

## 🛠️ Tech Stack

- [Astro](https://astro.build)
- Markdown (with frontmatter)
- TypeScript
- Static file routing
- Optional: TailwindCSS (planned)

---

## 📌 Todo

- [ ] Sidebar navigation
- [ ] Language switcher
- [ ] Search (optional)
- [ ] Deploy to Vercel
- [ ] Add more documents (KR/EN/JP)

---

## 📄 License

MIT License
Feel free to fork, remix, and expand this project!
