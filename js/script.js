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
const cameraSelect = document.getElementById("cameraSelect");

async function carregarCameras() {
  const devices = await Html5Qrcode.getCameras();

  devices.forEach(device => {
    const option = document.createElement("option");
    option.value = device.id;
    option.text = device.label || "Câmera";
    cameraSelect.appendChild(option);
  });
}

scanbutton.addEventListener("click", async () => {
  const cameraId = cameraSelect.value;

  await scanner.start(
    cameraId,
    { fps: 10, qrbox: 250 },
    onScanSuccess
  );
});

carregarCameras();