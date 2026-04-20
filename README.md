# Build Your Own X - Web Interface

<img width="1919" height="996" alt="image" src="https://github.com/user-attachments/assets/c312a47a-ca6e-4037-bc17-9feb95f28ae2" />

> A modern, iOS-inspired web interface for the amazing [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) repository.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://apus3404-oss.github.io/build-your-own-x-web)
[![Original Repo](https://img.shields.io/badge/original-codecrafters--io-blue?style=for-the-badge)](https://github.com/codecrafters-io/build-your-own-x)
[![GitHub Stars](https://img.shields.io/github/stars/apus3404-oss/build-your-own-x-web?style=for-the-badge)](https://github.com/apus3404-oss/build-your-own-x-web/stargazers)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## 🎯 What is this?

This project transforms the popular [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) GitHub repository into a beautiful, searchable web interface. The original repo contains an incredible collection of 500+ tutorials for recreating technologies from scratch, but it's a single massive markdown file. This web app makes it easy to explore, search, and discover tutorials.

## ✨ Features

### 🔍 Core Features
- **Smart Search** - Filter tutorials by programming language, category, or keyword in real-time
- **Category Navigation** - Browse 30+ technology categories with tutorial counts
- **Responsive Design** - Seamless experience on desktop, tablet, and mobile devices
- **Real-time Data** - Automatically fetches the latest tutorials from the source repository

### 🎨 Design & UX
- **iOS-Inspired Interface** - Clean, modern design with glass morphism effects
- **Dark Mode** - Beautiful dark theme with system preference detection
- **Smooth Animations** - Spring-based transitions for natural feel
- **Accessibility** - Reduced motion support for better accessibility

### ⭐ User Features
- **Favorites System** - Save your favorite tutorials with persistent storage
- **Social Sharing** - Share tutorials on Twitter, LinkedIn, WhatsApp, or copy link
- **Statistics Dashboard** - View top 10 languages and categories with animated charts
- **Toast Notifications** - Elegant feedback for user actions

### ⚡ Performance
- **24-Hour Cache** - Lightning-fast subsequent loads with localStorage caching
- **Event Delegation** - Optimized event handling for thousands of tutorials
- **Lazy Loading Ready** - Infrastructure for progressive content loading
- **Reduced Motion** - Respects user's motion preferences for better performance

## 🚀 Quick Start

### Option 1: Live Demo

**Visit:** [https://apus3404-oss.github.io/build-your-own-x-web](https://apus3404-oss.github.io/build-your-own-x-web)

No installation needed - just click and start exploring!

### Option 2: Run Locally

1. Clone this repository:
```bash
git clone https://github.com/apus3404-oss/build-your-own-x-web.git
cd build-your-own-x-web
```

2. Start a local server:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve

# Using PHP
php -S localhost:8080
```

3. Open `http://localhost:8080` in your browser

### Option 3: Direct File Access

Simply open `index.html` in your web browser. That's it!

## 📖 How to Use

### Search & Filter
1. Use the search bar to find tutorials by language, category, or keyword
2. Click on categories in the sidebar to filter by technology
3. Click "Favorites" to view your saved tutorials

### Dark Mode
- Click the sun/moon icon in the top-right corner
- Automatically detects your system preference on first visit
- Your preference is saved for future visits

### Favorites
- Click the heart icon on any tutorial to save it
- Access all favorites from the "Favorites" category
- Favorites are stored locally and persist across sessions

### Share Tutorials
- Click the share icon on any tutorial
- Choose from Twitter, LinkedIn, WhatsApp, or copy link
- Share individual tutorials with friends and colleagues

### View Statistics
- Click "View Statistics" below the search bar
- See top 10 programming languages by tutorial count
- See top 10 categories by tutorial count
- Animated progress bars show relative popularity

## 📁 Project Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # iOS-inspired styling with dark mode
├── script.js           # Core functionality and optimizations
├── README.md           # This file
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules
```

## 🎨 Design Philosophy

This interface is inspired by Apple's design language:

- **Glass Morphism** - Translucent surfaces with backdrop blur for depth
- **Spring Animations** - Natural, physics-based transitions
- **Typography** - Plus Jakarta Sans for modern, clean readability
- **Color System** - Light theme with iOS blue accent, dark theme with elevated contrast
- **Spacing** - Generous whitespace and consistent rhythm
- **Micro-interactions** - Delightful hover states and button feedback

## 🛠️ Technical Details

### Architecture
- **Pure Vanilla JS** - No frameworks, just clean JavaScript
- **CSS Variables** - Theme system with easy customization
- **Event Delegation** - Efficient event handling for scalability
- **localStorage API** - Client-side caching and preferences

### Performance Optimizations
- **Data Caching** - 24-hour cache for README data
- **Shared Components** - Single share menu for all tutorials
- **Optimized Rendering** - Minimal DOM manipulation
- **Lazy Loading Ready** - Infrastructure for progressive loading

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 🎨 Improve the design or UX
- 📝 Improve documentation
- 🌐 Add internationalization support
- ⚡ Performance improvements

## 📊 Statistics

- **30+** Technology Categories
- **500+** Curated Tutorials
- **50+** Programming Languages
- **100%** Free and Open Source

## 📜 License

This web interface is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Important**: The tutorial content and data belong to the original [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) repository and its contributors. This project is simply a frontend wrapper to make that content more accessible.

## 🙏 Credits

- **Original Content**: [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x)
- **Web Interface**: Built by [XUPAV444](https://github.com/apus3404-oss)
- **Design Inspiration**: Apple's iOS design language
- **Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) by Google Fonts

## 🌟 Show Your Support

If you find this project useful, please consider:
- ⭐ Starring this repository
- ⭐ Starring the [original repository](https://github.com/codecrafters-io/build-your-own-x)
- 🐦 Sharing it with others
- 🤝 Contributing improvements

## 📞 Contact

- GitHub: [@apus3404-oss](https://github.com/apus3404-oss)
- Display Name: XUPAV444

---

**Note**: This is an unofficial web interface. For the original content and to contribute tutorials, please visit the [official repository](https://github.com/codecrafters-io/build-your-own-x).

**Version**: 2.0.0 - Now with Dark Mode, Favorites, Social Sharing, and Statistics!
