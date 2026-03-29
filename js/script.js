const historicoEl = document.getElementById("historico");
const scanbutton = document.getElementById("scanbutton");

let historico = JSON.parse(localStorage.getItem("historico")) || [];

let scanner = new Html5Qrcode("reader");

// Atualiza histórico
function atualizarHistorico() {
    historicoEl.innerHTML = "";

    historico.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.codigo + " - " + item.data;
        historicoEl.appendChild(li);
    });
}

// Quando escaneia
function onScanSuccess(decodedText) {

    // evita repetir mil vezes o mesmo código
    if (historico.length && historico[historico.length - 1].codigo === decodedText) {
        return;
    }

    historico.push({
        codigo: decodedText,
        data: new Date().toLocaleString()
    });

    localStorage.setItem("historico", JSON.stringify(historico));
    atualizarHistorico();
}

// BOTÃO
scanbutton.addEventListener("click", async () => {

    try {
        await scanner.start(
            { facingMode: "environment" }, // 🔥 câmera traseira direto
            {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            },
            onScanSuccess
        );

    } catch (err) {
        alert("Erro ao acessar câmera: " + err);
    }
});

atualizarHistorico();