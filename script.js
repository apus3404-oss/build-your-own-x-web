// Data structure
let allTutorials = [];
let allCategories = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let activeFilters = {
    category: null,
    search: ''
};

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Fetch and parse README
async function fetchReadme() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/codecrafters-io/build-your-own-x/master/README.md');
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching README:', error);
        return null;
    }
}

// Parse markdown to extract tutorials
function parseMarkdown(markdown) {
    const lines = markdown.split('\n');
    const categories = [];
    let currentCategory = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Match category headers: #### Build your own `Category Name`
        const categoryMatch = line.match(/^####\s+Build your own\s+`([^`]+)`/);
        if (categoryMatch) {
            currentCategory = {
                name: categoryMatch[1],
                slug: categoryMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                tutorials: []
            };
            categories.push(currentCategory);
            continue;
        }

        // Match tutorial entries: * [**Language**: _Title_](URL)
        const tutorialMatch = line.match(/^\*\s+\[?\*\*([^*]+)\*\*:?\s*_([^_]+)_\]?\(([^)]+)\)/);
        if (tutorialMatch && currentCategory) {
            const [, languages, title, url] = tutorialMatch;

            // Split multiple languages (e.g., "C# / TypeScript / JavaScript")
            const languageList = languages.split('/').map(lang => lang.trim());

            currentCategory.tutorials.push({
                languages: languageList,
                title: title.trim(),
                url: url.trim(),
                category: currentCategory.name,
                categorySlug: currentCategory.slug
            });
        }
    }

    return categories.filter(cat => cat.tutorials.length > 0);
}

// Render categories in sidebar
function renderCategories(categories) {
    const nav = document.getElementById('categoryNav');
    nav.innerHTML = '';

    // Add "All" option
    const allItem = document.createElement('a');
    allItem.className = 'category-item' + (!activeFilters.category ? ' active' : '');
    allItem.textContent = 'All Categories';
    allItem.innerHTML += `<span class="category-count">${allTutorials.length}</span>`;
    allItem.onclick = () => filterByCategory(null);
    nav.appendChild(allItem);

    // Add "Favorites" option
    const favItem = document.createElement('a');
    favItem.className = 'category-item' + (activeFilters.category === 'favorites' ? ' active' : '');
    favItem.innerHTML = `
        <span style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z"/>
            </svg>
            Favorites
        </span>
        <span class="category-count">${favorites.length}</span>
    `;
    favItem.onclick = () => filterByCategory('favorites');
    nav.appendChild(favItem);

    // Add category items
    categories.forEach(category => {
        const item = document.createElement('a');
        item.className = 'category-item' + (activeFilters.category === category.slug ? ' active' : '');
        item.textContent = category.name;
        item.innerHTML += `<span class="category-count">${category.tutorials.length}</span>`;
        item.onclick = () => filterByCategory(category.slug);
        nav.appendChild(item);
    });
}

// Render tutorials
function renderTutorials(tutorials) {
    const container = document.getElementById('tutorialsContainer');

    if (tutorials.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3 class="empty-state-title">No tutorials found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    // Group by category
    const grouped = {};
    tutorials.forEach(tutorial => {
        if (!grouped[tutorial.category]) {
            grouped[tutorial.category] = [];
        }
        grouped[tutorial.category].push(tutorial);
    });

    let html = '';
    Object.keys(grouped).forEach(categoryName => {
        const categoryTutorials = grouped[categoryName];
        html += `
            <div class="category-section">
                <div class="category-header">
                    <h2 class="category-title">${categoryName}</h2>
                    <span class="category-badge">${categoryTutorials.length} tutorial${categoryTutorials.length !== 1 ? 's' : ''}</span>
                </div>
                <div class="tutorials-grid">
                    ${categoryTutorials.map(tutorial => {
                        const isFav = isFavorite(tutorial);
                        const tutorialJson = JSON.stringify(tutorial).replace(/"/g, '&quot;');
                        return `
                        <div class="tutorial-card-wrapper">
                            <a href="${tutorial.url}" target="_blank" rel="noopener noreferrer" class="tutorial-card">
                                <div class="tutorial-language">${tutorial.languages.join(' / ')}</div>
                                <div class="tutorial-content">
                                    <div class="tutorial-title">${tutorial.title}</div>
                                    <div class="tutorial-link">${tutorial.url}</div>
                                </div>
                            </a>
                            <div class="tutorial-actions">
                                <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="event.preventDefault(); toggleFavorite(${tutorialJson}); return false;" aria-label="Toggle favorite" title="Add to favorites">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                        <path d="M10 3.435l-.896-.92C7.2.351 3.143 1.097 1.75 3.816c-.654 1.279-.801 3.125.393 5.481 1.15 2.269 3.542 4.986 7.857 7.946 4.315-2.96 6.707-5.677 7.857-7.946 1.194-2.357 1.047-4.202.393-5.481C16.857 1.097 12.8.35 10.896 2.513L10 3.435z"/>
                                    </svg>
                                </button>
                                <div class="share-dropdown">
                                    <button class="share-btn" onclick="event.preventDefault(); this.parentElement.classList.toggle('active'); return false;" aria-label="Share tutorial" title="Share">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="15" cy="5" r="2.5"/>
                                            <circle cx="5" cy="10" r="2.5"/>
                                            <circle cx="15" cy="15" r="2.5"/>
                                            <path d="M7.5 11L12.5 14M7.5 9L12.5 6" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                    <div class="share-menu">
                                        <button onclick="event.preventDefault(); shareTutorial(${tutorialJson}, 'twitter'); return false;">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                            </svg>
                                            Twitter
                                        </button>
                                        <button onclick="event.preventDefault(); shareTutorial(${tutorialJson}, 'linkedin'); return false;">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                            LinkedIn
                                        </button>
                                        <button onclick="event.preventDefault(); shareTutorial(${tutorialJson}, 'whatsapp'); return false;">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                            WhatsApp
                                        </button>
                                        <button onclick="event.preventDefault(); shareTutorial(${tutorialJson}, 'copy'); return false;">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                            </svg>
                                            Copy Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Filter by category
function filterByCategory(categorySlug) {
    activeFilters.category = categorySlug;
    renderTutorials(getFilteredTutorials());
    renderCategories(allCategories);
}

// Search functionality
function handleSearch(query) {
    activeFilters.search = query.toLowerCase();
    renderTutorials(getFilteredTutorials());
    updateFilterTags();
}

// Share functionality
function shareTutorial(tutorial, platform) {
    const text = `Check out this tutorial: ${tutorial.title}`;
    const url = tutorial.url;

    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };

    if (platform === 'copy') {
        navigator.clipboard.writeText(url).then(() => {
            showToast('Link copied to clipboard!');
        });
    } else {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}
function toggleFavorite(tutorial) {
    const tutorialId = `${tutorial.categorySlug}-${tutorial.title}`;
    const index = favorites.findIndex(fav => fav.id === tutorialId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push({
            id: tutorialId,
            ...tutorial
        });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderTutorials(getFilteredTutorials());
}

function isFavorite(tutorial) {
    const tutorialId = `${tutorial.categorySlug}-${tutorial.title}`;
    return favorites.some(fav => fav.id === tutorialId);
}

function getFilteredTutorials() {
    let filtered = [...allTutorials];

    if (activeFilters.category === 'favorites') {
        filtered = favorites;
    } else if (activeFilters.category) {
        filtered = filtered.filter(t => t.categorySlug === activeFilters.category);
    }

    if (activeFilters.search) {
        filtered = filtered.filter(t => {
            const searchIn = [
                t.title,
                t.category,
                ...t.languages
            ].join(' ').toLowerCase();

            return searchIn.includes(activeFilters.search);
        });
    }

    return filtered;
}

// Update filter tags
function updateFilterTags() {
    const container = document.getElementById('filterTags');
    const tags = [];

    if (activeFilters.search) {
        tags.push({
            label: `Search: "${activeFilters.search}"`,
            type: 'search'
        });
    }

    if (tags.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = tags.map(tag => `
        <div class="filter-tag" onclick="removeFilter('${tag.type}')">
            ${tag.label}
            <span class="remove">×</span>
        </div>
    `).join('');
}

// Remove filter
function removeFilter(type) {
    if (type === 'search') {
        activeFilters.search = '';
        document.getElementById('searchInput').value = '';
    }
    renderTutorials(getFilteredTutorials());
    updateFilterTags();
}

// Update stats
function updateStats() {
    const uniqueLanguages = new Set();
    allTutorials.forEach(t => {
        t.languages.forEach(lang => uniqueLanguages.add(lang));
    });

    document.getElementById('statsContainer').innerHTML = `
        <div class="stat-item">
            <span class="stat-number">${allCategories.length}</span>
            <span class="stat-label">Categories</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">${allTutorials.length}</span>
            <span class="stat-label">Tutorials</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">${uniqueLanguages.size}</span>
            <span class="stat-label">Languages</span>
        </div>
    `;

    // Calculate top languages and categories
    renderDetailedStats();
}

function renderDetailedStats() {
    // Count tutorials by language
    const languageCounts = {};
    allTutorials.forEach(tutorial => {
        tutorial.languages.forEach(lang => {
            languageCounts[lang] = (languageCounts[lang] || 0) + 1;
        });
    });

    // Count tutorials by category
    const categoryCounts = {};
    allTutorials.forEach(tutorial => {
        categoryCounts[tutorial.category] = (categoryCounts[tutorial.category] || 0) + 1;
    });

    // Sort and get top 10
    const topLanguages = Object.entries(languageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const topCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    // Render top languages
    const maxLangCount = topLanguages[0][1];
    document.getElementById('topLanguages').innerHTML = topLanguages.map(([lang, count]) => {
        const percentage = (count / maxLangCount) * 100;
        return `
            <div class="stat-bar-item">
                <div class="stat-bar-label">
                    <span class="stat-bar-name">${lang}</span>
                    <span class="stat-bar-count">${count}</span>
                </div>
                <div class="stat-bar-track">
                    <div class="stat-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // Render top categories
    const maxCatCount = topCategories[0][1];
    document.getElementById('topCategories').innerHTML = topCategories.map(([cat, count]) => {
        const percentage = (count / maxCatCount) * 100;
        return `
            <div class="stat-bar-item">
                <div class="stat-bar-label">
                    <span class="stat-bar-name">${cat}</span>
                    <span class="stat-bar-count">${count}</span>
                </div>
                <div class="stat-bar-track">
                    <div class="stat-bar-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // Setup toggle
    const statsToggle = document.getElementById('statsToggle');
    const statsContent = document.getElementById('statsContent');
    const statsSection = document.getElementById('statsSection');

    if (statsToggle && statsContent) {
        statsToggle.onclick = () => {
            statsSection.classList.toggle('expanded');
        };
    }
}

// Initialize
async function init() {
    // Initialize theme first
    initTheme();

    const markdown = await fetchReadme();

    if (!markdown) {
        document.getElementById('tutorialsContainer').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <h3 class="empty-state-title">Failed to load tutorials</h3>
                <p>Please check your internet connection and try again</p>
            </div>
        `;
        return;
    }

    allCategories = parseMarkdown(markdown);
    allTutorials = allCategories.flatMap(cat => cat.tutorials);

    renderCategories(allCategories);
    renderTutorials(allTutorials);
    updateStats();

    // Setup search
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e.target.value);
        }, 300);
    });

    // Add stagger animation to tutorial cards
    setTimeout(() => {
        const cards = document.querySelectorAll('.tutorial-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.03}s backwards`;
        });
    }, 100);
}

// Start the app
init();
