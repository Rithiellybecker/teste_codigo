const historicoEl = document.getElementById("historico");
const scanbutton = document.getElementById("scanbutton");
const cameraSelect = document.getElementById("cameraSelect");

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

// Carrega câmeras
async function carregarCameras() {
    try {
        const devices = await Html5Qrcode.getCameras();

        cameraSelect.innerHTML = "";

        devices.forEach(device => {
            const option = document.createElement("option");
            option.value = device.id;
            option.text = device.label || "Câmera";
            cameraSelect.appendChild(option);
        });

    } catch (err) {
        alert("Erro ao carregar câmeras: " + err);
    }
}

// Botão
scanbutton.addEventListener("click", async () => {

    const cameraId = cameraSelect.value;

    if (!cameraId) {
        alert("Selecione uma câmera primeiro");
        return;
    }

    try {
        await scanner.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            onScanSuccess
        );
    } catch (err) {
        alert("Erro ao iniciar câmera: " + err);
    }
});

carregarCameras();
atualizarHistorico();