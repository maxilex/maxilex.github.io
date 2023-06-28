Telegram.WebApp.ready()
let tg = window.Telegram.WebApp

tg.MainButton.setParams({
  text: 'Закрыть',
  is_visible: true
}).onClick(Telegram.WebApp.close)

//окно сканирования
function showScanQr() {
  tg.showScanQrPopup({
    text: 'Сканируем qr код'
  }, function (text) {
    tg.showAlert(text);
    return true;
  });
}