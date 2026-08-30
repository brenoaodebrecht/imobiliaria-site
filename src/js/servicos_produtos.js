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

/*
    Guarda o imóvel que está aberto no modal no momento,
    para sabermos qual imóvel enviar para a página de compra.
*/
let currentProperty = null;

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


/* =========================================================
   FILTROS
   ========================================================= */

function getFilteredProperties() {
    const query = elements.search.value.toLowerCase().trim();

    const categories = [...document.querySelectorAll('input[name="category"]:checked')]
        .map(input => input.value);

    const minimumBedrooms = Number(elements.bedrooms.value);
    const maximumPrice = Number(elements.maxPrice.value);

    const filtered = properties.filter(property => {

        const matchesText =
            !query ||
            `${property.location} ${property.title}`
                .toLowerCase()
                .includes(query);

        const matchesCity =
            elements.city.value === 'todas' ||
            property.city === elements.city.value;

        const matchesCategory =
            !categories.length ||
            categories.includes(property.category);

        const matchesPrice =
            property.price <= maximumPrice;

        const matchesBedrooms =
            property.beds >= minimumBedrooms;

        const matchesPurpose =
            elements.purpose.value !== 'alugar';

        return (
            matchesText &&
            matchesCity &&
            matchesCategory &&
            matchesPrice &&
            matchesBedrooms &&
            matchesPurpose
        );
    });

    if (elements.sort.value === 'menor-preco') {
        filtered.sort((a, b) => a.price - b.price);
    }

    if (elements.sort.value === 'maior-preco') {
        filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
}


/* =========================================================
   CARD DOS IMÓVEIS
   ========================================================= */

function propertyTemplate(property) {

    const parkingLabel =
        property.parking > 1 ? 'vagas' : 'vaga';

    return `
        <article class="property-card">

            <div class="property-image">

                <img
                    src="${property.image}"
                    alt="${property.title}"
                    loading="lazy"
                >

                <span>${property.tag}</span>

                <button
                    class="favorite"
                    type="button"
                    aria-label="Favoritar ${property.title}"
                >
                    &#9825;
                </button>

            </div>

            <div class="property-content">

                <p class="property-location">
                    ${property.location}
                </p>

                <h3>${property.title}</h3>

                <div class="property-details">

                    <span>
                        <strong>${property.area}m²</strong>
                        área
                    </span>

                    <span>
                        <strong>${property.beds}</strong>
                        quartos
                    </span>

                    <span>
                        <strong>${property.parking}</strong>
                        ${parkingLabel}
                    </span>

                </div>

                <div class="property-footer">

                    <strong>
                        ${formatPrice(property.price)}
                    </strong>

                    <button
                        type="button"
                        class="details-button"
                        data-property="${properties.indexOf(property)}"
                    >
                        Ver detalhes
                        <span aria-hidden="true">&#8594;</span>
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   MODAL DE DETALHES
   ========================================================= */

function createPropertyModal() {

    if (document.querySelector('#property-modal')) {
        return;
    }

    const modal = document.createElement('div');

    modal.id = 'property-modal';

    modal.innerHTML = `
        <div class="property-modal-overlay"></div>

        <div
            class="property-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-property-title"
        >

            <button
                type="button"
                class="property-modal-close"
                id="close-property-modal"
                aria-label="Fechar"
            >
                &times;
            </button>

            <div class="property-modal-image">
                <img id="modal-property-image" src="" alt="">
                <span id="modal-property-tag"></span>
            </div>

            <div class="property-modal-content">

                <p
                    class="property-modal-location"
                    id="modal-property-location"
                ></p>

                <h2 id="modal-property-title"></h2>

                <p
                    class="property-modal-category"
                    id="modal-property-category"
                ></p>

                <div class="property-modal-price">
                    <span>Valor do imóvel</span>
                    <strong id="modal-property-price"></strong>
                </div>

                <div class="property-modal-details">

                    <div>
                        <span class="modal-detail-icon">⌂</span>
                        <strong id="modal-property-area"></strong>
                        <small>Área</small>
                    </div>

                    <div>
                        <span class="modal-detail-icon">▣</span>
                        <strong id="modal-property-beds"></strong>
                        <small>Quartos</small>
                    </div>

                    <div>
                        <span class="modal-detail-icon">▤</span>
                        <strong id="modal-property-parking"></strong>
                        <small>Vagas</small>
                    </div>

                </div>

                <div class="property-modal-description">
                    <h3>Sobre este imóvel</h3>

                    <p>
                        Este imóvel foi selecionado pela Essenza
                        por reunir conforto, localização e qualidade.
                        Entre em contato para conhecer todos os detalhes
                        e agendar uma visita.
                    </p>
                </div>

                <div class="property-modal-actions">

                    <button
                        type="button"
                        class="property-buy-button"
                        id="property-buy-button"
                    >
                        Comprar este imóvel
                        <span>→</span>
                    </button>

                    <button
                        type="button"
                        class="property-back-button"
                        id="property-back-button"
                    >
                        Voltar para os imóveis
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    document
        .querySelector('#close-property-modal')
        .addEventListener('click', closePropertyModal);

    document
        .querySelector('.property-modal-overlay')
        .addEventListener('click', closePropertyModal);

    document
        .querySelector('#property-back-button')
        .addEventListener('click', closePropertyModal);

    document
        .querySelector('#property-buy-button')
        .addEventListener('click', handlePropertyPurchase);
}


/* =========================================================
   ABRIR DETALHES
   ========================================================= */

function openPropertyModal(property) {

    currentProperty = property;

    createPropertyModal();

    document.querySelector('#modal-property-image').src =
        property.image;

    document.querySelector('#modal-property-image').alt =
        property.title;

    document.querySelector('#modal-property-tag').textContent =
        property.tag;

    document.querySelector('#modal-property-location').textContent =
        property.location;

    document.querySelector('#modal-property-title').textContent =
        property.title;

    document.querySelector('#modal-property-category').textContent =
        property.category;

    document.querySelector('#modal-property-price').textContent =
        formatPrice(property.price);

    document.querySelector('#modal-property-area').textContent =
        `${property.area}m²`;

    document.querySelector('#modal-property-beds').textContent =
        property.beds;

    document.querySelector('#modal-property-parking').textContent =
        property.parking;

    const modal = document.querySelector('#property-modal');

    modal.classList.add('active');

    document.body.classList.add('modal-open');
}


/* =========================================================
   FECHAR MODAL
   ========================================================= */

function closePropertyModal() {

    const modal = document.querySelector('#property-modal');

    if (!modal) {
        return;
    }

    modal.classList.remove('active');

    document.body.classList.remove('modal-open');
}


/* =========================================================
   BOTÃO COMPRAR
   ========================================================= */

function handlePropertyPurchase() {

    if (!currentProperty) {
        return;
    }

    /*
        Guardamos o imóvel escolhido no sessionStorage para
        que a página comprar.html consiga ler e exibir os
        dados assim que for aberta.
    */

    sessionStorage.setItem(
        'selectedProperty',
        JSON.stringify(currentProperty)
    );

    closePropertyModal();

    // Abre a página de compra em uma nova página/rota.
    window.location.href = 'comprar.html';
}


/* =========================================================
   RENDERIZAÇÃO
   ========================================================= */

function renderProperties() {

    const filtered = getFilteredProperties();

    const countLabel =
        filtered.length === 1
            ? 'imóvel encontrado'
            : 'imóveis encontrados';

    elements.resultCount.textContent =
        `${filtered.length} ${countLabel}`;

    elements.priceValue.textContent =
        formatPrice(Number(elements.maxPrice.value));

    elements.emptyState.hidden =
        filtered.length > 0;

    elements.grid.innerHTML =
        filtered.map(propertyTemplate).join('');
}


/* =========================================================
   LIMPAR FILTROS
   ========================================================= */

function clearFilters() {

    elements.search.value = '';

    elements.city.value = 'todas';

    elements.purpose.value = 'todos';

    elements.bedrooms.value = '0';

    elements.maxPrice.value = '2500000';

    document
        .querySelectorAll('input[name="category"]')
        .forEach(input => {
            input.checked = false;
        });

    renderProperties();
}


/* =========================================================
   EVENTOS
   ========================================================= */

document
    .querySelectorAll('select, input')
    .forEach(input => {

        input.addEventListener(
            'input',
            renderProperties
        );

    });


document
    .querySelector('#search-button')
    .addEventListener(
        'click',
        renderProperties
    );


document
    .querySelector('#clear-filters')
    .addEventListener(
        'click',
        clearFilters
    );


document
    .querySelector('#empty-clear')
    .addEventListener(
        'click',
        clearFilters
    );


/*
    Como os cards são criados dinamicamente,
    usamos um único evento no grid.
*/

elements.grid.addEventListener('click', event => {

    const button =
        event.target.closest('.details-button');

    if (!button) {
        return;
    }

    const propertyIndex =
        Number(button.dataset.property);

    const property =
        properties[propertyIndex];

    if (property) {
        openPropertyModal(property);
    }

});


/*
    Fechar com a tecla ESC
*/

document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
        closePropertyModal();
    }

});


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

renderProperties();