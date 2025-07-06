document.addEventListener('DOMContentLoaded', () => {
    const propertyData = [
        {
            id: 1,
            title: 'Luxury Villa in Canggu',
            location: 'Bali (Canggu)',
            type: 'Villa',
            priceUSD: 1200000,
            specs: { beds: 5, baths: 5, area: 650, land: 800 },
            description: 'A masterpiece of modern architecture nestled in the vibrant heart of Canggu. This villa boasts breathtaking ocean views, an infinity pool, and state-of-the-art amenities, offering an unparalleled luxury lifestyle.',
            images: [
                'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1612320448364-a39b6283d066?q=80&w=1932&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1598928811029-d5a2a29337c4?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?q=80&w=2070&auto=format&fit=crop',
            ],
            tags: ['luxury', 'beachfront', 'modern']
        },
        {
            id: 2,
            title: 'Modern Apartment in SCBD',
            location: 'Jakarta Selatan',
            type: 'Apartment',
            priceUSD: 600000,
            specs: { beds: 3, baths: 2, area: 180, land: 180 },
            description: 'Located in the prestigious Sudirman Central Business District, this apartment offers ultimate convenience and a sophisticated urban living experience with stunning city skyline views.',
            images: [
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560185012-1a27276b5536?q=80&w=1974&auto=format&fit=crop',
            ],
            tags: ['modern', 'city', 'investment']
        },
        {
            id: 3,
            title: 'Sprawling Land in Ubud',
            location: 'Bali (Ubud)',
            type: 'Land',
            priceUSD: 850000,
            specs: { beds: 0, baths: 0, area: 0, land: 5000 },
            description: 'A rare opportunity to acquire a vast plot of land with lush rice paddy views in the cultural heart of Ubud. Perfect for developing a private estate or a boutique resort.',
            images: [
                'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1590818299283-e137a911a141?q=80&w=1943&auto=format&fit=crop',
            ],
            tags: ['land', 'investment', 'development']
        },
        {
            id: 4,
            title: 'Classic House in Menteng',
            location: 'Jakarta Pusat',
            type: 'House',
            priceUSD: 2500000,
            specs: { beds: 6, baths: 5, area: 800, land: 1200 },
            description: 'An elegant and timeless residence in the highly sought-after, leafy suburb of Menteng. This property features classic colonial architecture, a large private garden, and spacious interiors.',
            images: [
                'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1588012885473-b270415356c3?q=80&w=2070&auto=format&fit=crop',
            ],
            tags: ['classic', 'luxury', 'family']
        },
        {
            id: 5,
            title: 'Commercial Space in Surabaya',
            location: 'Surabaya Pusat',
            type: 'Commercial',
            priceUSD: 950000,
            specs: { beds: 0, baths: 4, area: 1000, land: 1500 },
            description: 'Prime commercial real estate in the bustling center of Surabaya. High foot traffic area, suitable for retail, office, or restaurant ventures. A solid commercial investment.',
            images: [
                'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070&auto=format&fit=crop',
            ],
            tags: ['commercial', 'investment']
        },
         {
            id: 6,
            title: 'Beachfront Villa in Seminyak',
            location: 'Bali (Seminyak)',
            type: 'Villa',
            priceUSD: 1800000,
            specs: { beds: 4, baths: 4, area: 550, land: 700 },
            description: 'Experience the best of Bali with this stunning beachfront villa in Seminyak. Direct beach access, spectacular sunset views, and designed for luxurious comfort and entertainment.',
            images: [
                'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
            ],
            tags: ['luxury', 'beachfront']
        },
    ];

    const USD_TO_IDR = 16400;

    const listingGrid = document.getElementById('listing-grid');
    const locationFiltersContainer = document.getElementById('location-filters');
    const typeFiltersContainer = document.getElementById('type-filters');
    const searchInput = document.getElementById('search-keyword');
    const sortSelect = document.getElementById('sort-properties');
    const resetBtn = document.getElementById('reset-filters');
    
    const modal = document.getElementById('property-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalBtn = document.getElementById('close-modal-button');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalPriceIdr = document.getElementById('modal-price-idr');
    const modalSpecs = document.getElementById('modal-specs');
    const modalDescription = document.getElementById('modal-description');
    const modalMainImage = document.getElementById('modal-main-image');
    const modalThumbnails = document.getElementById('modal-thumbnails');
    const prevImageBtn = document.getElementById('prev-image');
    const nextImageBtn = document.getElementById('next-image');
    
    let currentPropertyImages = [];
    let currentImageIndex = 0;

    function formatPrice(price) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
    }

    function formatPriceIDR(price) {
         const priceInBillion = price / 1_000_000_000;
         if (priceInBillion < 1) {
             return `${(price / 1_000_000).toFixed(0)}m IDR`
         }
        return `${priceInBillion.toFixed(1)}b IDR`;
    }

    function createPropertyCard(property, index) {
        const card = document.createElement('div');
        card.className = 'card rounded-lg overflow-hidden shadow-lg cursor-pointer';
        card.dataset.propertyId = property.id;
        // IMPROVEMENT: Staggered animation delay
        card.style.animationDelay = `${index * 50}ms`;
        
        let specsSummary = '';
        if(property.type !== 'Land' && property.type !== 'Commercial') {
            specsSummary = `${property.specs.beds} Bed | ${property.specs.baths} Bath | ${property.specs.area} m²`;
        } else if(property.type === 'Land') {
            specsSummary = `${property.specs.land} m² Land`;
        } else {
            specsSummary = `${property.specs.area} m² Building`;
        }

        card.innerHTML = `
            <div class="relative">
                <img src="${property.images[0]}" alt="${property.title}" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2 bg-[#13232F]/80 text-white text-xs font-bold px-2 py-1 rounded-full">${property.location}</div>
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold text-white truncate">${property.title}</h3>
                <p class="text-sm text-slate-400 mt-1">${specsSummary}</p>
                <p class="text-xl font-bold text-[#00A79D] mt-4">${formatPrice(property.priceUSD)}</p>
                <p class="text-xs text-slate-500">≈ ${formatPriceIDR(property.priceUSD * USD_TO_IDR)}</p>
            </div>
        `;
        card.addEventListener('click', () => openModal(property.id));
        return card;
    }
    
    function renderListings(properties) {
        listingGrid.innerHTML = '';
        if (properties.length === 0) {
            // IMPROVEMENT: Better empty state message
            listingGrid.innerHTML = `
                <div class="md:col-span-2 xl:col-span-3 text-center py-12 card" style="animation-delay: 0ms">
                     <svg class="mx-auto h-12 w-12 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                     <h3 class="mt-2 text-lg font-medium text-white">No Properties Found</h3>
                     <p class="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
                </div>`;
            return;
        }
        properties.forEach((prop, index) => {
            listingGrid.appendChild(createPropertyCard(prop, index));
        });
    }

    function createFilterCheckboxes(container, items, type) {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex items-center';
            div.innerHTML = `
                <input id="${type}-${item.replace(/ /g, '-')}" name="${type}" type="checkbox" value="${item}" class="h-4 w-4 rounded border-gray-300 text-[#00A79D] focus:ring-[#00A79D] bg-[#0D1A26] border-[#223749]">
                <label for="${type}-${item.replace(/ /g, '-')}" class="ml-3 text-sm text-slate-300">${item}</label>
            `;
            container.appendChild(div);
        });
    }

    function setupFilters() {
        const locations = [...new Set(propertyData.map(p => p.location))].sort();
        const types = [...new Set(propertyData.map(p => p.type))].sort();
        
        createFilterCheckboxes(locationFiltersContainer, locations, 'location');
        createFilterCheckboxes(typeFiltersContainer, types, 'type');
        
        document.querySelectorAll('input[name="location"], input[name="type"], #search-keyword, #sort-properties').forEach(input => {
            input.addEventListener('input', applyFilters);
            input.addEventListener('change', applyFilters); // for select dropdown
        });
    }

    function applyFilters() {
        const selectedLocations = [...document.querySelectorAll('input[name="location"]:checked')].map(cb => cb.value);
        const selectedTypes = [...document.querySelectorAll('input[name="type"]:checked')].map(cb => cb.value);
        const keyword = searchInput.value.toLowerCase();
        const sortValue = sortSelect.value;

        let filteredProperties = propertyData.filter(p => {
            const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(p.location);
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(p.type);
            const keywordMatch = keyword === '' || p.title.toLowerCase().includes(keyword) || p.description.toLowerCase().includes(keyword) || p.tags.some(tag => tag.includes(keyword));
            return locationMatch && typeMatch && keywordMatch;
        });
        
        if (sortValue === 'price-desc') {
            filteredProperties.sort((a, b) => b.priceUSD - a.priceUSD);
        } else if (sortValue === 'price-asc') {
            filteredProperties.sort((a, b) => a.priceUSD - b.priceUSD);
        }

        renderListings(filteredProperties);
    }

    function resetFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        searchInput.value = '';
        sortSelect.value = 'default';
        applyFilters();
    }

    function openModal(propertyId) {
        const property = propertyData.find(p => p.id === propertyId);
        if (!property) return;

        modalTitle.textContent = property.title;
        modalPrice.textContent = formatPrice(property.priceUSD);
        modalPriceIdr.textContent = `≈ ${formatPriceIDR(property.priceUSD * USD_TO_IDR)}`;
        modalDescription.textContent = property.description;
        
        modalSpecs.innerHTML = `
            ${property.specs.beds > 0 ? `<div class="flex items-center gap-2"><svg class="w-5 h-5 text-[#00A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg> <span class="text-slate-300">${property.specs.beds} Bedrooms</span></div>` : ''}
            ${property.specs.baths > 0 ? `<div class="flex items-center gap-2"><svg class="w-5 h-5 text-[#00A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 11v10h14V11"></path></svg> <span class="text-slate-300">${property.specs.baths} Bathrooms</span></div>` : ''}
            ${property.specs.area > 0 ? `<div class="flex items-center gap-2"><svg class="w-5 h-5 text-[#00A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5"></path></svg> <span class="text-slate-300">${property.specs.area} m² Build</span></div>` : ''}
            ${property.specs.land > 0 ? `<div class="flex items-center gap-2"><svg class="w-5 h-5 text-[#00A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 11.25l1.25-6.25L12 3.75l2.95 1.25 1.25 6.25m-10.9 0h10.9"></path></svg> <span class="text-slate-300">${property.specs.land} m² Land</span></div>` : ''}
            <div class="flex items-center gap-2"><svg class="w-5 h-5 text-[#00A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <span class="text-slate-300">${property.location}</span></div>
            <div class="flex items-center gap-2"><svg class="w-5 h-5 text-[#00A79D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> <span class="text-slate-300">${property.type}</span></div>
        `;
        
        currentPropertyImages = property.images;
        currentImageIndex = 0;
        updateModalImage();
        renderThumbnails();

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    function updateModalImage() {
        if (!modalMainImage) return;
        modalMainImage.src = currentPropertyImages[currentImageIndex];
        updateThumbnailSelection();
    }
    
    function renderThumbnails() {
        modalThumbnails.innerHTML = '';
        currentPropertyImages.forEach((imgSrc, index) => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.className = 'w-full h-16 object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-[#00897b] transition-all';
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                updateModalImage();
            });
            modalThumbnails.appendChild(thumb);
        });
        updateThumbnailSelection();
    }
    
    function updateThumbnailSelection() {
        const thumbs = modalThumbnails.children;
        for(let i = 0; i < thumbs.length; i++) {
            thumbs[i].classList.toggle('border-[#00A79D]', i === currentImageIndex);
        }
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentPropertyImages.length;
        updateModalImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentPropertyImages.length) % currentPropertyImages.length;
        updateModalImage();
    }
    
    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if(!mobileMenu.classList.contains('hidden')) {
               mobileMenu.classList.add('hidden');
            }
        });
    });

    // Initial setup
    setupFilters();
    applyFilters(); // Initial render with default sort
    resetBtn.addEventListener('click', resetFilters);
    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    nextImageBtn.addEventListener('click', showNextImage);
    prevImageBtn.addEventListener('click', showPrevImage);
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
});