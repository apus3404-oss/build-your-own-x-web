// Data structure
let allTutorials = [];
let allCategories = [];
let activeFilters = {
    category: null,
    search: ''
};

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
                    ${categoryTutorials.map(tutorial => `
                        <a href="${tutorial.url}" target="_blank" rel="noopener noreferrer" class="tutorial-card">
                            <div class="tutorial-language">${tutorial.languages.join(' / ')}</div>
                            <div class="tutorial-content">
                                <div class="tutorial-title">${tutorial.title}</div>
                                <div class="tutorial-link">${tutorial.url}</div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Filter by category
function filterByCategory(categorySlug) {
    activeFilters.category = categorySlug;
    applyFilters();
    renderCategories(allCategories);
}

// Search functionality
function handleSearch(query) {
    activeFilters.search = query.toLowerCase();
    applyFilters();
    updateFilterTags();
}

// Apply all filters
function applyFilters() {
    let filtered = [...allTutorials];

    // Filter by category
    if (activeFilters.category) {
        filtered = filtered.filter(t => t.categorySlug === activeFilters.category);
    }

    // Filter by search query
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

    renderTutorials(filtered);
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
    applyFilters();
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
}

// Initialize
async function init() {
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
