# Build Your Own X - Web Interface

> A modern, iOS-inspired web interface for the amazing [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) repository.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://apus3404-oss.github.io/build-your-own-x-web)
[![Original Repo](https://img.shields.io/badge/original-codecrafters--io-blue?style=for-the-badge)](https://github.com/codecrafters-io/build-your-own-x)
[![GitHub Stars](https://img.shields.io/github/stars/apus3404-oss/build-your-own-x-web?style=for-the-badge)](https://github.com/apus3404-oss/build-your-own-x-web/stargazers)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## 🎯 What is this?

This project transforms the popular [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) GitHub repository into a beautiful, searchable web interface. The original repo contains an incredible collection of tutorials for recreating technologies from scratch, but it's a single massive markdown file. This web app makes it easy to explore, search, and discover tutorials.

## ✨ Features

- 🔍 **Smart Search** - Filter tutorials by programming language, category, or keyword
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **iOS-Inspired UI** - Clean, modern design with glass morphism effects
- ⚡ **Fast & Lightweight** - Pure HTML/CSS/JS, no frameworks needed
- 🔄 **Always Up-to-Date** - Fetches latest tutorials directly from the source repo
- 📊 **Statistics** - See total categories, tutorials, and programming languages at a glance

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

Simply visit the live demo: **[https://apus3404-oss.github.io/build-your-own-x-web](https://apus3404-oss.github.io/build-your-own-x-web)**

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

## 📁 Project Structure

```
.
├── index.html      # Main HTML structure
├── styles.css      # iOS-inspired styling with glass morphism
├── script.js       # Data fetching, parsing, and interactivity
└── README.md       # This file
```

## 🎨 Design Philosophy

This interface is inspired by Apple's design language:
- **Glass Morphism** - Translucent surfaces with backdrop blur
- **Smooth Animations** - Spring-based transitions for natural feel
- **Typography** - Plus Jakarta Sans for modern, clean readability
- **Color Palette** - Light theme with iOS blue accent (#007aff)
- **Spacing** - Generous whitespace for breathing room

## 🛠️ How It Works

1. **Data Fetching**: On page load, fetches the README.md from the original repository
2. **Parsing**: Extracts categories, tutorials, programming languages, and URLs using regex
3. **Rendering**: Dynamically generates the interface with category grouping
4. **Filtering**: Real-time search and category filtering with debouncing

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 🎨 Improve the design or UX
- 📝 Improve documentation
- 🌐 Add internationalization support

## 📜 License

This web interface is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Important**: The tutorial content and data belong to the original [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) repository and its contributors. This project is simply a frontend wrapper to make that content more accessible.

## 🙏 Credits

- **Original Content**: [codecrafters-io/build-your-own-x](https://github.com/codecrafters-io/build-your-own-x)
- **Web Interface**: Built by [XUPAV444](https://github.com/apus3404-oss)
- **Inspiration**: Apple's iOS design language
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
