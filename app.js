// In-Memory Data Storage (No localStorage due to sandbox limitations)
const AppState = {
    currentUser: null,
    isAdmin: false,
    cart: [],
    products: [],
    currentView: 'homepage',
    currentProduct: null,
    editingProductId: null,
    whatsappNumber: '+919106170271'
};

// Cloudinary Configuration
const CLOUDINARY_CONFIG = {
    cloudName: 'dh0lwgppa',
    apiKey: '493997553956792',
    uploadPreset: 'ml_default',
    uploadUrl: 'https://api.cloudinary.com/v1_1/dh0lwgppa/image/upload'
};

// Store uploaded images temporarily
let tempUploadedImages = [];

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        name: "Traditional Rajasthani Bandhani Saree",
        price: 2500,
        category: "Sarees",
        description: "Authentic Rajasthani saree with traditional bandhani work. Made from pure cotton with vibrant colors and intricate patterns. Perfect for festivals and special occasions.",
        images: [
            "https://via.placeholder.com/600x700/FF6B6B/FFFFFF?text=Bandhani+Front",
            "https://via.placeholder.com/600x700/FF8B8B/FFFFFF?text=Bandhani+Detail",
            "https://via.placeholder.com/600x700/FFABAB/FFFFFF?text=Bandhani+Back",
            "https://via.placeholder.com/600x700/FF6B8B/FFFFFF?text=Bandhani+Pattern",
            "https://via.placeholder.com/600x700/FF7B7B/FFFFFF?text=Bandhani+Fabric"
        ],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.5,
        active: true
    },
    {
        id: 2,
        name: "Embroidered Cotton Kurti",
        price: 1200,
        category: "Kurtis",
        description: "Beautiful embroidered kurti in traditional Jaipur style. Features hand-embroidered details on soft cotton fabric. Comfortable for daily wear.",
        images: [
            "https://via.placeholder.com/600x700/4ECDC4/FFFFFF?text=Kurti+Front",
            "https://via.placeholder.com/600x700/5EDDD4/FFFFFF?text=Kurti+Back",
            "https://via.placeholder.com/600x700/6EEDE4/FFFFFF?text=Kurti+Detail",
            "https://via.placeholder.com/600x700/4EBDC4/FFFFFF?text=Kurti+Embroidery",
            "https://via.placeholder.com/600x700/4ECDD4/FFFFFF?text=Kurti+Fabric"
        ],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.8,
        active: true
    },
    {
        id: 3,
        name: "Designer Wedding Lehenga",
        price: 4500,
        category: "Lehengas",
        description: "Stunning designer lehenga with intricate mirror work and embroidery. Made from premium silk fabric. Perfect for weddings and special celebrations.",
        images: [
            "https://via.placeholder.com/600x700/95E1D3/FFFFFF?text=Lehenga+Full",
            "https://via.placeholder.com/600x700/A5F1E3/FFFFFF?text=Lehenga+Choli",
            "https://via.placeholder.com/600x700/85D1C3/FFFFFF?text=Lehenga+Detail",
            "https://via.placeholder.com/600x700/95E1E3/FFFFFF?text=Lehenga+Work",
            "https://via.placeholder.com/600x700/95D1D3/FFFFFF?text=Lehenga+Back",
            "https://via.placeholder.com/600x700/A5E1D3/FFFFFF?text=Lehenga+Dupatta"
        ],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.9,
        active: true
    },
    {
        id: 4,
        name: "Block Print Anarkali Dress",
        price: 1800,
        category: "Dresses",
        description: "Elegant Anarkali dress with traditional block print designs. Flowing silhouette in soft cotton blend. Ideal for parties and gatherings.",
        images: [
            "https://via.placeholder.com/600x700/F38181/FFFFFF?text=Anarkali+Front",
            "https://via.placeholder.com/600x700/F39191/FFFFFF?text=Anarkali+Back",
            "https://via.placeholder.com/600x700/F3A1A1/FFFFFF?text=Anarkali+Side",
            "https://via.placeholder.com/600x700/F37171/FFFFFF?text=Anarkali+Print",
            "https://via.placeholder.com/600x700/F38191/FFFFFF?text=Anarkali+Detail"
        ],
        sizes: ["S", "M", "L"],
        rating: 4.6,
        active: true
    },
    {
        id: 5,
        name: "Silk Saree with Golden Border",
        price: 3200,
        category: "Sarees",
        description: "Luxurious silk saree with beautiful golden border. Rich colors and smooth texture. Perfect for traditional ceremonies.",
        images: [
            "https://via.placeholder.com/600x700/AA96DA/FFFFFF?text=Silk+Drape",
            "https://via.placeholder.com/600x700/BA96DA/FFFFFF?text=Silk+Border",
            "https://via.placeholder.com/600x700/9A96DA/FFFFFF?text=Silk+Pallu",
            "https://via.placeholder.com/600x700/AA86DA/FFFFFF?text=Silk+Pattern",
            "https://via.placeholder.com/600x700/AAA6DA/FFFFFF?text=Silk+Fabric",
            "https://via.placeholder.com/600x700/AA96CA/FFFFFF?text=Silk+Detail"
        ],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.7,
        active: true
    },
    {
        id: 6,
        name: "Printed Palazzo Kurti Set",
        price: 1500,
        category: "Kurtis",
        description: "Trendy kurti with matching palazzo pants. Beautiful printed patterns in vibrant colors. Comfortable and stylish for everyday wear.",
        images: [
            "https://via.placeholder.com/600x700/FCBAD3/FFFFFF?text=Set+Full",
            "https://via.placeholder.com/600x700/FCCAE3/FFFFFF?text=Set+Kurti",
            "https://via.placeholder.com/600x700/FCAAC3/FFFFFF?text=Set+Palazzo",
            "https://via.placeholder.com/600x700/FCBAe3/FFFFFF?text=Set+Print",
            "https://via.placeholder.com/600x700/FCBAD4/FFFFFF?text=Set+Detail"
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.5,
        active: true
    },
    {
        id: 7,
        name: "Bridal Lehenga Choli",
        price: 5500,
        category: "Lehengas",
        description: "Exquisite bridal lehenga with heavy embroidery and stone work. Premium quality fabric with intricate detailing. A showstopper for your special day.",
        images: [
            "https://via.placeholder.com/600x700/FFD93D/FFFFFF?text=Bridal+Full",
            "https://via.placeholder.com/600x700/FFE94D/FFFFFF?text=Bridal+Choli",
            "https://via.placeholder.com/600x700/FFC93D/FFFFFF?text=Bridal+Skirt",
            "https://via.placeholder.com/600x700/FFD94D/FFFFFF?text=Bridal+Work",
            "https://via.placeholder.com/600x700/FFD92D/FFFFFF?text=Bridal+Stone",
            "https://via.placeholder.com/600x700/FFD95D/FFFFFF?text=Bridal+Back",
            "https://via.placeholder.com/600x700/FFD93E/FFFFFF?text=Bridal+Detail"
        ],
        sizes: ["S", "M", "L"],
        rating: 5.0,
        active: true
    },
    {
        id: 8,
        name: "Cotton Salwar Suit",
        price: 950,
        category: "Salwar Suits",
        description: "Simple yet elegant cotton salwar suit. Perfect for daily wear with comfortable fit. Available in multiple colors.",
        images: ["https://via.placeholder.com/400x500/6BCB77/FFFFFF?text=Salwar+Suit"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.3,
        active: true
    },
    {
        id: 9,
        name: "Georgette Party Wear Saree",
        price: 2800,
        category: "Sarees",
        description: "Lightweight georgette saree with sequin work. Perfect drape and comfortable to wear. Ideal for evening parties.",
        images: ["https://via.placeholder.com/400x500/4D96FF/FFFFFF?text=Georgette+Saree"],
        sizes: ["S", "M", "L"],
        rating: 4.6,
        active: true
    },
    {
        id: 10,
        name: "Chanderi Silk Kurti",
        price: 1350,
        category: "Kurtis",
        description: "Traditional Chanderi silk kurti with delicate zari work. Lightweight and breathable fabric. Perfect for festive occasions.",
        images: ["https://via.placeholder.com/400x500/FF6AC2/FFFFFF?text=Chanderi+Kurti"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.7,
        active: true
    },
    {
        id: 11,
        name: "Mirror Work Lehenga",
        price: 4200,
        category: "Lehengas",
        description: "Stunning lehenga with traditional Rajasthani mirror work. Colorful and vibrant design. Perfect for festivals and celebrations.",
        images: ["https://via.placeholder.com/400x500/C780FA/FFFFFF?text=Mirror+Lehenga"],
        sizes: ["S", "M", "L"],
        rating: 4.8,
        active: true
    },
    {
        id: 12,
        name: "Long Gown Dress",
        price: 2100,
        category: "Dresses",
        description: "Elegant long gown with flowing design. Made from soft fabric with beautiful embroidery. Suitable for formal events.",
        images: ["https://via.placeholder.com/400x500/89B5AF/FFFFFF?text=Long+Gown"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.4,
        active: true
    },
    {
        id: 13,
        name: "Banarasi Silk Saree",
        price: 3800,
        category: "Sarees",
        description: "Premium Banarasi silk saree with intricate brocade work. Rich texture and traditional patterns. A timeless classic.",
        images: ["https://via.placeholder.com/400x500/F9A826/FFFFFF?text=Banarasi+Saree"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.9,
        active: true
    },
    {
        id: 14,
        name: "A-Line Printed Kurti",
        price: 890,
        category: "Kurtis",
        description: "Comfortable A-line kurti with modern prints. Perfect for casual outings. Available in trendy colors.",
        images: ["https://via.placeholder.com/400x500/5EAAA8/FFFFFF?text=A-Line+Kurti"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.2,
        active: true
    },
    {
        id: 15,
        name: "Festive Lehenga Set",
        price: 3900,
        category: "Lehengas",
        description: "Beautiful festive lehenga with choli and dupatta. Vibrant colors with traditional embroidery. Perfect for celebrations.",
        images: ["https://via.placeholder.com/400x500/FF6392/FFFFFF?text=Festive+Lehenga"],
        sizes: ["S", "M", "L"],
        rating: 4.6,
        active: true
    },
    {
        id: 16,
        name: "Embroidered Anarkali Suit",
        price: 2400,
        category: "Salwar Suits",
        description: "Graceful Anarkali suit with beautiful embroidery. Flowing design with comfortable fit. Ideal for special occasions.",
        images: ["https://via.placeholder.com/400x500/A8E6CF/FFFFFF?text=Anarkali+Suit"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.7,
        active: true
    },
    {
        id: 17,
        name: "Tie-Dye Maxi Dress",
        price: 1650,
        category: "Dresses",
        description: "Trendy tie-dye maxi dress with vibrant patterns. Comfortable and stylish. Perfect for summer outings.",
        images: ["https://via.placeholder.com/400x500/FFD6A5/FFFFFF?text=Tie-Dye+Maxi"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.4,
        active: true
    },
    {
        id: 18,
        name: "Chiffon Printed Saree",
        price: 2200,
        category: "Sarees",
        description: "Lightweight chiffon saree with beautiful prints. Easy to drape and comfortable. Great for office wear or parties.",
        images: ["https://via.placeholder.com/400x500/CAFFBF/FFFFFF?text=Chiffon+Saree"],
        sizes: ["S", "M", "L"],
        rating: 4.5,
        active: true
    },
    {
        id: 19,
        name: "Straight Cut Kurti",
        price: 780,
        category: "Kurtis",
        description: "Simple straight cut kurti in solid colors. Perfect for everyday comfort. Made from breathable cotton.",
        images: ["https://via.placeholder.com/400x500/9BF6FF/FFFFFF?text=Straight+Kurti"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.1,
        active: true
    },
    {
        id: 20,
        name: "Velvet Wedding Lehenga",
        price: 5200,
        category: "Lehengas",
        description: "Luxurious velvet lehenga with heavy embellishments. Premium quality with rich colors. Perfect for winter weddings.",
        images: ["https://via.placeholder.com/400x500/BDB2FF/FFFFFF?text=Velvet+Lehenga"],
        sizes: ["S", "M", "L"],
        rating: 4.9,
        active: true
    },
    {
        id: 21,
        name: "Designer Palazzo Suit",
        price: 1950,
        category: "Salwar Suits",
        description: "Trendy palazzo suit with designer kurti. Modern style with traditional touch. Comfortable for all-day wear.",
        images: ["https://via.placeholder.com/400x500/FEC8D8/FFFFFF?text=Palazzo+Suit"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.5,
        active: true
    },
    {
        id: 22,
        name: "Floral Print Dress",
        price: 1450,
        category: "Dresses",
        description: "Fresh floral print dress with feminine design. Light and breezy fabric. Perfect for daytime events.",
        images: ["https://via.placeholder.com/400x500/FDFD96/FFFFFF?text=Floral+Dress"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.3,
        active: true
    },
    {
        id: 23,
        name: "Net Saree with Work",
        price: 2900,
        category: "Sarees",
        description: "Elegant net saree with embroidery work. Modern design with traditional elements. Perfect for parties.",
        images: ["https://via.placeholder.com/400x500/FFB4B4/FFFFFF?text=Net+Saree"],
        sizes: ["S", "M", "L"],
        rating: 4.6,
        active: true
    },
    {
        id: 24,
        name: "Rayon Long Kurti",
        price: 850,
        category: "Kurtis",
        description: "Comfortable rayon long kurti with side slits. Perfect for casual wear. Available in multiple prints.",
        images: ["https://via.placeholder.com/400x500/B4E7CE/FFFFFF?text=Rayon+Kurti"],
        sizes: ["XS", "S", "M", "L", "XL"],
        rating: 4.2,
        active: true
    },
    {
        id: 25,
        name: "Embellished Crop Top Lehenga",
        price: 4800,
        category: "Lehengas",
        description: "Contemporary crop top lehenga with modern embellishments. Trendy design with traditional fabric. Perfect for sangeet ceremonies.",
        images: ["https://via.placeholder.com/400x500/FFCAD4/FFFFFF?text=Crop+Lehenga"],
        sizes: ["S", "M", "L"],
        rating: 4.8,
        active: true
    },
    {
        id: 26,
        name: "Sharara Suit Set",
        price: 2600,
        category: "Salwar Suits",
        description: "Elegant sharara suit with embroidered kurti and dupatta. Traditional design with royal look. Perfect for weddings.",
        images: ["https://via.placeholder.com/400x500/F4ACB7/FFFFFF?text=Sharara+Suit"],
        sizes: ["S", "M", "L", "XL"],
        rating: 4.7,
        active: true
    },
    {
        id: 27,
        name: "Indo-Western Gown",
        price: 2350,
        category: "Dresses",
        description: "Fusion indo-western gown with modern silhouette. Unique design combining traditional and contemporary elements.",
        images: ["https://via.placeholder.com/400x500/9D84B7/FFFFFF?text=Indo+Gown"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.5,
        active: true
    },
    {
        id: 28,
        name: "Kota Doria Saree",
        price: 1900,
        category: "Sarees",
        description: "Traditional Kota Doria saree with checks. Lightweight and perfect for summer. Comfortable for daily wear.",
        images: ["https://via.placeholder.com/400x500/D4A5A5/FFFFFF?text=Kota+Saree"],
        sizes: ["S", "M", "L"],
        rating: 4.4,
        active: true
    },
    {
        id: 29,
        name: "Asymmetric Kurti",
        price: 1100,
        category: "Kurtis",
        description: "Trendy asymmetric cut kurti with modern design. Unique style statement. Perfect for fashion-forward occasions.",
        images: ["https://via.placeholder.com/400x500/B5EAD7/FFFFFF?text=Asymmetric+Kurti"],
        sizes: ["XS", "S", "M", "L"],
        rating: 4.3,
        active: true
    },
    {
        id: 30,
        name: "Sangeet Special Lehenga",
        price: 4600,
        category: "Lehengas",
        description: "Vibrant lehenga perfect for sangeet night. Colorful with mirror work and embroidery. Comfortable for dancing.",
        images: ["https://via.placeholder.com/400x500/FF9AA2/FFFFFF?text=Sangeet+Lehenga"],
        sizes: ["S", "M", "L"],
        rating: 4.8,
        active: true
    }
];

// Initialize products
AppState.products = [...sampleProducts];

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    renderHomepage();
    updateUIState();
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('login-btn')?.addEventListener('click', () => showModal('login-modal'));
    document.getElementById('cart-btn')?.addEventListener('click', () => navigateTo('cart-page'));
    document.getElementById('shop-now-btn')?.addEventListener('click', () => navigateTo('products-page'));
    document.getElementById('back-to-products')?.addEventListener('click', () => navigateTo('products-page'));
    
    // Category navigation
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            navigateTo('products-page', { category });
        });
    });
    
    // Categories dropdown
    document.getElementById('categories-btn')?.addEventListener('click', (e) => {
        toggleDropdown('categories-dropdown', e.currentTarget);
    });
    
    document.querySelectorAll('#categories-dropdown .dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.currentTarget.dataset.category;
            navigateTo('products-page', { category });
            hideDropdown('categories-dropdown');
        });
    });
    
    // User profile dropdown
    document.getElementById('user-profile-btn')?.addEventListener('click', (e) => {
        toggleDropdown('user-dropdown', e.currentTarget);
    });
    
    document.getElementById('customer-logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        hideDropdown('user-dropdown');
    });
    
    // Modals
    document.getElementById('close-login-modal')?.addEventListener('click', () => hideModal('login-modal'));
    document.getElementById('close-signup-modal')?.addEventListener('click', () => hideModal('signup-modal'));
    document.getElementById('show-signup')?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal('login-modal');
        showModal('signup-modal');
    });
    document.getElementById('show-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        hideModal('signup-modal');
        showModal('login-modal');
    });
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            const tabType = e.currentTarget.dataset.tab;
            if (tabType === 'admin') {
                document.querySelector('.admin-hint').style.display = 'block';
            } else {
                document.querySelector('.admin-hint').style.display = 'none';
            }
        });
    });
    
    // Forms
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('signup-form')?.addEventListener('submit', handleSignup);
    document.getElementById('product-form')?.addEventListener('submit', handleProductSave);
    document.getElementById('cancel-product-form')?.addEventListener('click', () => {
        if (AppState.isAdmin) {
            navigateTo('admin-products');
        }
    });
    
    // Filters
    document.getElementById('category-filter')?.addEventListener('change', filterProducts);
    document.getElementById('sort-filter')?.addEventListener('change', filterProducts);
    document.getElementById('search-input')?.addEventListener('input', debounce(handleSearch, 300));
    
    // Admin Navigation
    document.getElementById('admin-dashboard-btn')?.addEventListener('click', () => navigateTo('admin-dashboard'));
    document.getElementById('admin-products-btn')?.addEventListener('click', () => navigateTo('admin-products'));
    document.getElementById('admin-analytics-btn')?.addEventListener('click', () => navigateTo('admin-analytics'));
    document.getElementById('admin-settings-btn')?.addEventListener('click', () => navigateTo('admin-settings'));
    document.getElementById('admin-logout-btn')?.addEventListener('click', logout);
    document.getElementById('add-product-btn')?.addEventListener('click', () => {
        AppState.editingProductId = null;
        tempUploadedImages = [];
        navigateTo('admin-product-form');
    });
    
    // Cloudinary Upload
    document.getElementById('cloudinary-upload-btn')?.addEventListener('click', openCloudinaryWidget);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-btn') && !e.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
    });
}

// Navigation
function navigateTo(pageId, params = {}) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        AppState.currentView = pageId;
        
        // Render content based on page
        switch(pageId) {
            case 'homepage':
                renderHomepage();
                break;
            case 'products-page':
                renderProductsPage(params.category || 'all');
                break;
            case 'product-detail-page':
                renderProductDetail(params.productId);
                break;
            case 'cart-page':
                renderCart();
                break;
            case 'checkout-page':
                renderCheckout();
                break;
            case 'admin-dashboard':
                renderAdminDashboard();
                break;
            case 'admin-products':
                renderAdminProducts();
                break;
            case 'admin-product-form':
                renderProductForm();
                break;
            case 'admin-analytics':
                // Analytics already static
                break;
            case 'admin-settings':
                // Settings already static
                break;
        }
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Authentication
function handleLogin(e) {
    e.preventDefault();
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;
    const isAdminTab = document.querySelector('.auth-tab.active').dataset.tab === 'admin';
    
    if (isAdminTab && identifier === 'admin@example.com' && password === 'password123') {
        AppState.currentUser = { email: identifier, name: 'Admin', role: 'admin' };
        AppState.isAdmin = true;
        hideModal('login-modal');
        navigateTo('admin-dashboard');
        updateUIState();
    } else if (!isAdminTab) {
        // Customer login (simplified - accept any credentials for demo)
        AppState.currentUser = { identifier: identifier, name: identifier, role: 'customer' };
        AppState.isAdmin = false;
        hideModal('login-modal');
        updateUIState();
    } else {
        alert('Invalid credentials. Admin demo: admin@example.com / password123');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const phone = document.getElementById('signup-phone').value;
    
    AppState.currentUser = { email, name, phone, role: 'customer' };
    AppState.isAdmin = false;
    hideModal('signup-modal');
    updateUIState();
}

function logout() {
    AppState.currentUser = null;
    AppState.isAdmin = false;
    navigateTo('homepage');
    updateUIState();
}

function updateUIState() {
    const customerNav = document.getElementById('customer-nav');
    const adminNav = document.getElementById('admin-nav');
    const loginBtn = document.getElementById('login-btn');
    const profileBtn = document.getElementById('user-profile-btn');
    
    if (AppState.isAdmin) {
        customerNav.style.display = 'none';
        adminNav.style.display = 'block';
    } else {
        customerNav.style.display = 'block';
        adminNav.style.display = 'none';
        
        if (AppState.currentUser && !AppState.isAdmin) {
            loginBtn.style.display = 'none';
            profileBtn.style.display = 'block';
            profileBtn.textContent = AppState.currentUser.name.split(' ')[0] + ' ▾';
            document.getElementById('user-name-display').textContent = AppState.currentUser.name;
        } else {
            loginBtn.style.display = 'block';
            profileBtn.style.display = 'none';
        }
    }
    
    updateCartCount();
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Dropdown Functions
function toggleDropdown(dropdownId, triggerElement) {
    const dropdown = document.getElementById(dropdownId);
    const rect = triggerElement.getBoundingClientRect();
    
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        // Hide all dropdowns first
        document.querySelectorAll('.dropdown-menu').forEach(d => d.style.display = 'none');
        
        dropdown.style.display = 'block';
        dropdown.style.position = 'absolute';
        dropdown.style.top = (rect.bottom + 5) + 'px';
        dropdown.style.left = rect.left + 'px';
    }
}

function hideDropdown(dropdownId) {
    document.getElementById(dropdownId).style.display = 'none';
}

// Render Functions
function renderHomepage() {
    const featuredGrid = document.getElementById('featured-products-grid');
    const featuredProducts = AppState.products.filter(p => p.active).slice(0, 8);
    featuredGrid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

function renderProductsPage(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    let filteredProducts = AppState.products.filter(p => p.active);
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
        document.getElementById('category-filter').value = category;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

function createProductCard(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
                <p class="product-rating">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</p>
            </div>
        </div>
    `;
}

function attachProductCardListeners() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.productId);
            navigateTo('product-detail-page', { productId });
        });
    });
}

function renderProductDetail(productId) {
    const product = AppState.products.find(p => p.id === productId);
    if (!product) return;
    
    AppState.currentProduct = product;
    const detailContent = document.getElementById('product-detail-content');
    
    // Get related products from same category
    const relatedProducts = AppState.products
        .filter(p => p.active && p.category === product.category && p.id !== product.id)
        .slice(0, 6);
    
    detailContent.innerHTML = `
        <div class="product-detail-gallery">
            <div class="main-image-container">
                <img src="${product.images[0]}" alt="${product.name}" class="main-product-image" id="main-product-image">
                <div class="image-counter" id="image-counter">1 / ${product.images.length}</div>
            </div>
            <div class="thumbnail-strip">
                ${product.images.map((img, index) => `
                    <img src="${img}" alt="${product.name} ${index + 1}" 
                         class="thumbnail-image ${index === 0 ? 'active' : ''}" 
                         data-index="${index}">
                `).join('')}
            </div>
        </div>
        <div class="product-detail-info">
            <p style="color: var(--color-text-light); text-transform: uppercase; font-size: 14px;">${product.category}</p>
            <h2>${product.name}</h2>
            <p class="product-detail-price">₹${product.price.toLocaleString()}</p>
            <p class="product-rating" style="margin-bottom: 24px;">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))} (${product.rating})</p>
            <p class="product-detail-description">${product.description}</p>
            
            <div class="size-selector">
                <label>Select Size:</label>
                <div class="size-options">
                    ${product.sizes.map((size, index) => `
                        <button class="size-option ${index === 0 ? 'selected' : ''}" data-size="${size}">${size}</button>
                    `).join('')}
                </div>
            </div>
            
            <div class="quantity-selector">
                <label>Quantity:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" id="decrease-qty">-</button>
                    <span class="quantity-value" id="quantity-value">1</span>
                    <button class="quantity-btn" id="increase-qty">+</button>
                </div>
            </div>
            
            <button class="add-to-cart-btn" id="add-to-cart-detail">Add to Cart</button>
        </div>
    `;
    
    // Add related products section
    if (relatedProducts.length > 0) {
        detailContent.innerHTML += `
            <div class="related-products-section">
                <h3>More from ${product.category}</h3>
                <div class="related-products-grid">
                    ${relatedProducts.map(p => createProductCard(p)).join('')}
                </div>
            </div>
        `;
    }
    
    // Attach event listeners
    let selectedSize = product.sizes[0];
    let quantity = 1;
    
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
            selectedSize = e.currentTarget.dataset.size;
        });
    });
    
    document.getElementById('decrease-qty')?.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById('quantity-value').textContent = quantity;
        }
    });
    
    document.getElementById('increase-qty')?.addEventListener('click', () => {
        quantity++;
        document.getElementById('quantity-value').textContent = quantity;
    });
    
    document.getElementById('add-to-cart-detail')?.addEventListener('click', () => {
        addToCart(product, selectedSize, quantity);
    });
    
    // Image gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail-image');
    const mainImage = document.getElementById('main-product-image');
    const imageCounter = document.getElementById('image-counter');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            mainImage.src = product.images[index];
            imageCounter.textContent = `${index + 1} / ${product.images.length}`;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
    
    // Attach listeners to related product cards
    attachProductCardListeners();
}

// Cart Functions
function addToCart(product, size, quantity) {
    const existingItem = AppState.cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        AppState.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: size,
            quantity: quantity
        });
    }
    
    updateCartCount();
    alert('Added to cart!');
}

function updateCartCount() {
    const count = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderCart() {
    const cartContent = document.getElementById('cart-content');
    
    if (AppState.cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
                <button class="btn-primary" onclick="navigateTo('products-page')">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartContent.innerHTML = `
        <div class="cart-items">
            ${AppState.cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-details">Size: ${item.size} | Quantity: ${item.quantity}</p>
                        <p class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <div class="cart-total">
                <span>Total:</span>
                <span>₹${total.toLocaleString()}</span>
            </div>
            <div class="cart-actions">
                <button class="btn-secondary" onclick="navigateTo('products-page')">Continue Shopping</button>
                <button class="btn-primary" onclick="navigateTo('checkout-page')">Proceed to Checkout</button>
            </div>
        </div>
    `;
    
    // Attach remove listeners
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            AppState.cart.splice(index, 1);
            updateCartCount();
            renderCart();
        });
    });
}

function renderCheckout() {
    if (AppState.cart.length === 0) {
        navigateTo('cart-page');
        return;
    }
    
    const checkoutContent = document.getElementById('checkout-content');
    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    checkoutContent.innerHTML = `
        <div class="checkout-form">
            <h3>Shipping Information</h3>
            <form id="shipping-form">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" value="${AppState.currentUser?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" value="${AppState.currentUser?.phone || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" value="${AppState.currentUser?.email || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Address</label>
                    <textarea class="form-input" rows="3" required></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">City</label>
                        <input type="text" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Pin Code</label>
                        <input type="text" class="form-input" required>
                    </div>
                </div>
            </form>
        </div>
        <div class="checkout-summary">
            <h3>Order Summary</h3>
            <div style="margin: 24px 0;">
                ${AppState.cart.map(item => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span>${item.name} (${item.size}) x${item.quantity}</span>
                        <span>₹${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            <div style="border-top: 2px solid var(--color-primary); padding-top: 16px; margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: 700;">
                    <span>Total:</span>
                    <span>₹${total.toLocaleString()}</span>
                </div>
            </div>
            <button class="btn-primary btn-full" id="order-whatsapp-btn">Complete Order via WhatsApp</button>
        </div>
    `;
    
    document.getElementById('order-whatsapp-btn')?.addEventListener('click', () => {
        sendWhatsAppOrder();
    });
}

function sendWhatsAppOrder() {
    const name = AppState.currentUser?.name || 'Customer';
    let message = `Hello! I would like to place an order:%0A%0A`;
    message += `*Customer:* ${name}%0A%0A`;
    message += `*Order Details:*%0A`;
    
    AppState.cart.forEach(item => {
        message += `- ${item.name} (Size: ${item.size}, Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}%0A`;
    });
    
    const total = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0A*Total Amount:* ₹${total.toLocaleString()}%0A%0A`;
    message += `Please confirm availability and delivery details. Thank you!`;
    
    const whatsappUrl = `https://wa.me/${AppState.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation
    alert('Your order details have been sent via WhatsApp. We will contact you shortly!');
    AppState.cart = [];
    updateCartCount();
    navigateTo('homepage');
}

// Filter and Search
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const sort = document.getElementById('sort-filter').value;
    
    let filtered = AppState.products.filter(p => p.active);
    
    if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
    }
    
    // Sort
    switch(sort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
        default:
            filtered.sort((a, b) => b.id - a.id);
    }
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const filtered = AppState.products.filter(p => 
        p.active && (p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    );
    
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = filtered.map(product => createProductCard(product)).join('');
    attachProductCardListeners();
}

// Admin Functions
function renderAdminDashboard() {
    document.getElementById('total-products').textContent = AppState.products.filter(p => p.active).length;
}

function renderAdminProducts() {
    const productsList = document.getElementById('admin-products-list');
    const products = AppState.products;
    
    productsList.innerHTML = products.map(product => `
        <div class="admin-product-item">
            <img src="${product.images[0]}" alt="${product.name}" class="admin-product-thumb">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p class="admin-product-meta">${product.category} | ₹${product.price.toLocaleString()} | ${product.active ? 'Active' : 'Inactive'}</p>
            </div>
            <div class="admin-product-actions">
                <button class="edit-btn" data-product-id="${product.id}">Edit</button>
                <button class="delete-btn" data-product-id="${product.id}">Delete</button>
            </div>
        </div>
    `).join('');
    
    // Attach listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.productId);
            AppState.editingProductId = productId;
            navigateTo('admin-product-form');
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Are you sure you want to delete this product?')) {
                const productId = parseInt(e.currentTarget.dataset.productId);
                AppState.products = AppState.products.filter(p => p.id !== productId);
                renderAdminProducts();
            }
        });
    });
}

function renderProductForm() {
    const isEdit = AppState.editingProductId !== null;
    const product = isEdit ? AppState.products.find(p => p.id === AppState.editingProductId) : null;
    
    document.getElementById('form-title').textContent = isEdit ? 'Edit Product' : 'Add New Product';
    
    if (isEdit && product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-rating').value = product.rating;
        document.getElementById('product-description').value = product.description;
        document.getElementById('product-active').checked = product.active;
        
        // Load existing images
        tempUploadedImages = [...product.images];
        renderUploadedImages();
        
        // Set sizes
        document.querySelectorAll('.size-checkbox').forEach(checkbox => {
            checkbox.checked = product.sizes.includes(checkbox.value);
        });
    } else {
        document.getElementById('product-form').reset();
        tempUploadedImages = [];
        renderUploadedImages();
    }
    
    // Re-attach Cloudinary button listener after form render
    setTimeout(() => {
        document.getElementById('cloudinary-upload-btn')?.addEventListener('click', openCloudinaryWidget);
    }, 100);
}

function handleProductSave(e) {
    e.preventDefault();
    
    // Validate images
    if (tempUploadedImages.length < 3) {
        alert('Please upload at least 3 images for the product.');
        return;
    }
    
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const category = document.getElementById('product-category').value;
    const rating = parseFloat(document.getElementById('product-rating').value);
    const description = document.getElementById('product-description').value;
    const active = document.getElementById('product-active').checked;
    
    const sizes = Array.from(document.querySelectorAll('.size-checkbox:checked')).map(cb => cb.value);
    
    const productData = {
        name,
        price,
        category,
        rating,
        description,
        images: [...tempUploadedImages],
        sizes,
        active
    };
    
    if (AppState.editingProductId !== null) {
        // Edit existing
        const index = AppState.products.findIndex(p => p.id === AppState.editingProductId);
        if (index !== -1) {
            AppState.products[index] = { ...AppState.products[index], ...productData };
        }
    } else {
        // Add new
        const newId = Math.max(...AppState.products.map(p => p.id)) + 1;
        AppState.products.push({ id: newId, ...productData });
    }
    
    alert('Product saved successfully!');
    AppState.editingProductId = null;
    tempUploadedImages = [];
    navigateTo('admin-products');
}

// Cloudinary Upload Functions
function openCloudinaryWidget() {
    if (typeof cloudinary === 'undefined') {
        alert('Cloudinary widget is not loaded. Please check your internet connection.');
        return;
    }
    
    const widget = cloudinary.createUploadWidget({
        cloudName: CLOUDINARY_CONFIG.cloudName,
        uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
        sources: ['local', 'url', 'camera'],
        multiple: true,
        maxFiles: 8,
        maxFileSize: 5000000, // 5MB
        clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
        resourceType: 'image',
        folder: 'jaipur_elegance_products',
        showPoweredBy: false,
        styles: {
            palette: {
                window: '#FFFFFF',
                windowBorder: '#1a3a52',
                tabIcon: '#1a3a52',
                menuIcons: '#1a3a52',
                textDark: '#000000',
                textLight: '#FFFFFF',
                link: '#1a3a52',
                action: '#d4af37',
                inactiveTabIcon: '#999999',
                error: '#dc3545',
                inProgress: '#1a3a52',
                complete: '#28a745',
                sourceBg: '#f8f9fa'
            }
        }
    }, (error, result) => {
        if (error) {
            console.error('Upload error:', error);
            alert('Upload failed: ' + error.message);
            return;
        }
        
        if (result && result.event === 'success') {
            const imageUrl = result.info.secure_url;
            tempUploadedImages.push(imageUrl);
            renderUploadedImages();
        }
        
        if (result && result.event === 'close') {
            widget.close();
        }
    });
    
    widget.open();
}

function renderUploadedImages() {
    const container = document.getElementById('uploaded-images');
    if (!container) return;
    
    if (tempUploadedImages.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = tempUploadedImages.map((url, index) => `
        <div class="uploaded-image-item ${index === 0 ? 'primary' : ''}">
            ${index === 0 ? '<span class="primary-badge">Primary</span>' : ''}
            <img src="${url}" alt="Product image ${index + 1}">
            <button type="button" class="remove-image" data-index="${index}">&times;</button>
        </div>
    `).join('');
    
    // Attach remove listeners
    document.querySelectorAll('.remove-image').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            tempUploadedImages.splice(index, 1);
            renderUploadedImages();
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
