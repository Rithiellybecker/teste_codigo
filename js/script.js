const historicoEl = document.getElementById("historico");
const scanbutton = document.getElementById("scanbutton");
const cameraSelect = document.getElementById("cameraSelect");
const vencidosEl = document.getElementById("vencidos");

let historico = JSON.parse(localStorage.getItem("historico")) || [];
let vencidos = JSON.parse(localStorage.getItem("vencidos")) || [];

atualizarHistorico();
atualizarVencidos();

let scanner = new Html5Qrcode("reader");
// adciona uma nova chamada e uma nova função e nao se duplica o scanbutton e o cameraSelect

function atualizarHistorico() {
  historicoEl.innerHTML = "";
  vencidosEl.innerHTML = "";

  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.codigo + " - " + item.data;
    historicoEl.appendChild(li);
  });

  vencidos.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.codigo + " - " + item.data;
    vencidosEl.appendChild(li);
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


  const resposta = confirm("Esse item está vencido?");
  const novo = {
    codigo: decodedText,
    data: new Date().toLocaleString()
  };

  if (resposta) {
    vencidos.push(novo);
  }

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