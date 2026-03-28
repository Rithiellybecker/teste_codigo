const input = document.getElementById('input');
const button = document.getElementById('button');
const scanbutton = document.getElementById('scanbutton');
const historicoEl = document.getElementById("historico");


let historico = JSON.parse(localStorage.getItem('historico')) || [];

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

const scanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250
});

scanner.render(onScanSuccess);

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
        historico.appendChild(li);
    });
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}