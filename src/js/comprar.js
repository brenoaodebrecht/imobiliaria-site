/* =========================================================
   PÁGINA DE COMPRA DO IMÓVEL

   O imóvel escolhido em servicos_produtos.html é salvo no
   sessionStorage (chave "selectedProperty") antes do
   redirecionamento para esta página. Aqui nós lemos esse
   valor e preenchemos o resumo do imóvel + formulário.
   ========================================================= */

const formatPrice = value => value >= 1000000
    ? `R$ ${(value / 1000000).toFixed(1).replace('.', ',')} mi`
    : `R$ ${(value / 1000).toFixed(0)} mil`;

function getSelectedProperty() {

    const raw = sessionStorage.getItem('selectedProperty');

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}

function renderPropertySummary(property) {

    document.querySelector('#purchase-image').src = property.image;
    document.querySelector('#purchase-image').alt = property.title;

    document.querySelector('#purchase-tag').textContent = property.tag || '';

    document.querySelector('#purchase-location').textContent =
        property.location;

    document.querySelector('#purchase-title').textContent = property.title;

    document.querySelector('#purchase-category').textContent =
        property.category;

    document.querySelector('#purchase-price').textContent =
        formatPrice(property.price);

    document.querySelector('#purchase-area').textContent =
        `${property.area}m²`;

    document.querySelector('#purchase-beds').textContent = property.beds;

    document.querySelector('#purchase-parking').textContent =
        property.parking;
}

const MAX_INSTALLMENTS = 240;

function togglePaymentDetails() {

    const paymentMethod = document.querySelector('#payment-method').value;

    const installmentsGroup =
        document.querySelector('#installments-group');

    const installmentsInput =
        document.querySelector('#installments');

    const isParcelado = paymentMethod === 'parcelado';

    installmentsGroup.hidden = !isParcelado;

    installmentsInput.required = isParcelado;

    if (!isParcelado) {
        installmentsInput.value = '';
    }
}

function handlePurchaseSubmit(event) {

    event.preventDefault();

    const paymentMethod = document.querySelector('#payment-method').value;

    if (paymentMethod === 'parcelado') {

        const installmentsInput = document.querySelector('#installments');
        const installments = Number(installmentsInput.value);

        if (
            !installments ||
            installments < 1 ||
            installments > MAX_INSTALLMENTS
        ) {
            installmentsInput.focus();
            alert(
                `Informe um número de parcelas válido (de 1 até ${MAX_INSTALLMENTS}x).`
            );
            return;
        }
    }

    document.querySelector('#purchase-form').hidden = true;

    document.querySelector('#purchase-success').hidden = false;

    document.querySelector('#purchase-success')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function init() {

    const property = getSelectedProperty();

    if (!property) {
        document.querySelector('#purchase-empty').hidden = false;
        document.querySelector('#purchase-content').hidden = true;
        return;
    }

    document.querySelector('#purchase-empty').hidden = true;
    document.querySelector('#purchase-content').hidden = false;

    renderPropertySummary(property);

    document
        .querySelector('#payment-method')
        .addEventListener('change', togglePaymentDetails);

    document
        .querySelector('#purchase-form')
        .addEventListener('submit', handlePurchaseSubmit);
}

init();
