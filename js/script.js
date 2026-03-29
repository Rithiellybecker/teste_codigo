const input = document.getElementById('input');
const button = document.getElementById('button');
const scanbutton = document.getElementById('scanbutton');
const historicoEl = document.getElementById("historico");


let historico = JSON.parse(localStorage.getItem("historicoCodigos")) || [];

function onScanSuccess(decodedText) {
  scanbutton.innerText = decodedText;

  historico.push({
    codigo: decodedText,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("historicoCodigos", JSON.stringify(historico));
  atualizarHistorico();
}

atualizarHistorico();

function onScanSuccess(decodedText) {
  historico.push({
    codigo: decodedText,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("historico", JSON.stringify(historico));
  atualizarHistorico();
}

scanbutton.addEventListener("click", async () => {
  const devices = await Html5Qrcode.getCameras();

  if (devices && devices.length) {
    const cameraId = devices[0].id;

    scanner.start(
      cameraId,
      {
        fps: 10,
        qrbox: 250
      },
      onScanSuccess
    );
  }
});

atualizarHistorico();

function adicionarHistorico(codigo) {
  const data = new Date().toLocaleString();
  historico.push({ codigo, data });
  localStorage.setItem('historico', JSON.stringify(historico));
  atualizarHistorico();
}

function atualizarHistorico() {
  historicoEl.innerHTML = '';
  historico.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.codigo + ' - ' + item.data;
    historicoEl.appendChild(li);
  });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}