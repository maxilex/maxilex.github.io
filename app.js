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
        tg.showAlert(text)
        return true
    })
}

// Окно опрос с обаботкой результата
function showPopup() {
    tg.showPopup({
        title: 'Заголовок',
        message: 'Текст сообщения',
        buttons: [
            { id: 'delete', type: 'destructive', text: 'Delete all' },
            { id: 'faq', type: 'default', text: 'Open FAQ' },
            { type: 'cancel' },
        ]
    }, function (button_id) {
        if (button_id == 'delete') {
            tgweb.showAlert("'Delete all' selected")
        } else if (button_id == 'faq') {
            tg.openLink('https://telegram.org/faq')
        }
    })
}