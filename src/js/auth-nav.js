
document.addEventListener("DOMContentLoaded", function () {
    const authNavItem = document.getElementById("authNavItem");

    if (!authNavItem) return;

    const sessaoSalva = localStorage.getItem("essenzaUsuarioLogado");

    if (!sessaoSalva) return;

    let usuario;

    try {
        usuario = JSON.parse(sessaoSalva);
    } catch (erro) {
        localStorage.removeItem("essenzaUsuarioLogado");
        return;
    }

    if (!usuario || !usuario.nome) return;

    authNavItem.innerHTML = `
        <div class="dropdown">
            <button
                class="btn dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                id="perfilDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style="color: #b99120; font-weight: 600;"
            >
                <i class="bi bi-person-circle fs-4"></i>
                <span>${escapeHTML(usuario.nome.split(" ")[0])}</span>
            </button>

            <ul class="dropdown-menu dropdown-menu-end"
                aria-labelledby="perfilDropdown">
                <li>
                    <span class="dropdown-item-text">
                        Olá, ${escapeHTML(usuario.nome)}!
                    </span>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                    <button class="dropdown-item text-danger" id="sairConta">
                        <i class="bi bi-box-arrow-right me-2"></i>
                        Sair da conta
                    </button>
                </li>
            </ul>
        </div>
    `;

    document.getElementById("sairConta").addEventListener("click", function () {
        localStorage.removeItem("essenzaUsuarioLogado");
        window.location.reload();
    });

    function escapeHTML(texto) {
        const elemento = document.createElement("span");
        elemento.textContent = texto;
        return elemento.innerHTML;
    }
});
