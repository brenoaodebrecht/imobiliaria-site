const properties = [
    {
        title: 'Apartamento com vista para o parque',
        city: 'sao-paulo',
        location: 'Vila Madalena, São Paulo',
        category: 'Apartamento',
        price: 890000,
        area: 86,
        beds: 2,
        parking: 1,
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
        tag: 'Novo anúncio'
    },
    {
        title: 'Casa solar com jardim privativo',
        city: 'campinas',
        location: 'Taquaral, Campinas',
        category: 'Casa',
        price: 1250000,
        area: 214,
        beds: 4,
        parking: 2,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85',
        tag: 'Exclusivo'
    },
    {
        title: 'Cobertura com terraço e piscina',
        city: 'santos',
        location: 'Gonzaga, Santos',
        category: 'Cobertura',
        price: 1980000,
        area: 172,
        beds: 3,
        parking: 2,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
        tag: 'Vista mar'
    },
    {
        title: 'Apartamento compacto e completo',
        city: 'curitiba',
        location: 'Batel, Curitiba',
        category: 'Apartamento',
        price: 540000,
        area: 58,
        beds: 2,
        parking: 1,
        image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
        tag: 'Pronto para morar'
    },
    {
        title: 'Casa contemporânea em condomínio',
        city: 'sao-paulo',
        location: 'Alto da Boa Vista, São Paulo',
        category: 'Casa',
        price: 2500000,
        area: 318,
        beds: 4,
        parking: 3,
        image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85',
        tag: 'Alto padrão'
    },
    {
        title: 'Apartamento iluminado com varanda',
        city: 'campinas',
        location: 'Cambuí, Campinas',
        category: 'Apartamento',
        price: 760000,
        area: 74,
        beds: 3,
        parking: 1,
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
        tag: 'Boa oportunidade'
    }
];

const elements = {
    search: document.querySelector('#search'),
    purpose: document.querySelector('#purpose'),
    city: document.querySelector('#city'),
    bedrooms: document.querySelector('#bedrooms'),
    maxPrice: document.querySelector('#max-price'),
    sort: document.querySelector('#sort'),
    grid: document.querySelector('#property-grid'),
    resultCount: document.querySelector('#result-count'),
    priceValue: document.querySelector('#price-value'),
    emptyState: document.querySelector('#empty-state')
};

const formatPrice = value => value >= 1000000
    ? `R$ ${(value / 1000000).toFixed(1).replace('.', ',')} mi`
    : `R$ ${(value / 1000).toFixed(0)} mil`;

function getFilteredProperties() {
    const query = elements.search.value.toLowerCase().trim();
    const categories = [...document.querySelectorAll('input[name="category"]:checked')]
        .map(input => input.value);
    const minimumBedrooms = Number(elements.bedrooms.value);
    const maximumPrice = Number(elements.maxPrice.value);

    const filtered = properties.filter(property => {
        const matchesText = !query ||
            `${property.location} ${property.title}`.toLowerCase().includes(query);
        const matchesCity = elements.city.value === 'todas' || property.city === elements.city.value;
        const matchesCategory = !categories.length || categories.includes(property.category);
        const matchesPrice = property.price <= maximumPrice;
        const matchesBedrooms = property.beds >= minimumBedrooms;
        const matchesPurpose = elements.purpose.value !== 'alugar';

        return matchesText && matchesCity && matchesCategory && matchesPrice && matchesBedrooms && matchesPurpose;
    });

    if (elements.sort.value === 'menor-preco') filtered.sort((a, b) => a.price - b.price);
    if (elements.sort.value === 'maior-preco') filtered.sort((a, b) => b.price - a.price);

    return filtered;
}

function propertyTemplate(property) {
    const parkingLabel = property.parking > 1 ? 'vagas' : 'vaga';

    return `
        <article class="property-card">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
                <span>${property.tag}</span>
                <button class="favorite" type="button" aria-label="Favoritar ${property.title}">&#9825;</button>
            </div>
            <div class="property-content">
                <p class="property-location">${property.location}</p>
                <h3>${property.title}</h3>
                <div class="property-details">
                    <span><strong>${property.area}m²</strong> área</span>
                    <span><strong>${property.beds}</strong> quartos</span>
                    <span><strong>${property.parking}</strong> ${parkingLabel}</span>
                </div>
                <div class="property-footer">
                    <strong>${formatPrice(property.price)}</strong>
                    <button type="button">Ver detalhes <span aria-hidden="true">&#8594;</span></button>
                </div>
            </div>
        </article>`;
}

function renderProperties() {
    const filtered = getFilteredProperties();
    const countLabel = filtered.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados';

    elements.resultCount.textContent = `${filtered.length} ${countLabel}`;
    elements.priceValue.textContent = formatPrice(Number(elements.maxPrice.value));
    elements.emptyState.hidden = filtered.length > 0;
    elements.grid.innerHTML = filtered.map(propertyTemplate).join('');
}

function clearFilters() {
    elements.search.value = '';
    elements.city.value = 'todas';
    elements.purpose.value = 'todos';
    elements.bedrooms.value = '0';
    elements.maxPrice.value = '2500000';
    document.querySelectorAll('input[name="category"]').forEach(input => input.checked = false);
    renderProperties();
}

document.querySelectorAll('select, input').forEach(input => {
    input.addEventListener('input', renderProperties);
});
document.querySelector('#search-button').addEventListener('click', renderProperties);
document.querySelector('#clear-filters').addEventListener('click', clearFilters);
document.querySelector('#empty-clear').addEventListener('click', clearFilters);

renderProperties();
