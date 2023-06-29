Telegram.WebApp.ready()
let tg = window.Telegram.WebApp

//старт
tg.MainButton.setParams({
    text: 'Закрыть',
    is_visible: true
}).onClick(Telegram.WebApp.close)

//Элементы HTML
const el = {
    btnMain: document.getElementById("btnMain"),
    btnQrAlert: document.getElementById("btnQrAlert"),
    btnQr: document.getElementById("btnQR"),
    btnShowPop: document.getElementById("btnShowPop")
}

//Тестовое сообщение
el.btnMain.onclick = tg.showAlert('проверка')

//окно сканирования вывод сообщения
el.btnQrAlert.onclick = tg.showScanQrPopup({
    text: 'Сканируем qr код'
}, function (text) {
    tg.showAlert(text)
    return true
})

//окно сканирования
el.btnQr.onclick = function () {
    tg.showScanQrPopup({
        text: 'Сканируем qr код'
    }, function (text) {
        tg.showPopup({
            title: 'QR',
            message: text,
            buttons: [
                { id: 'open', type: 'default', text: 'Открыть' },
                { type: 'cancel' },
            ]
        }, function (button_id) {
            if (button_id === 'open') {
                tg.openLink(text)
            } else {
                tg.showAlert(text)
            }
        })
        return true
    })
}

// Окно опрос с обаботкой результата
el.btnShowPop.addEventListener('click', function () {
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
            tg.showAlert("'Delete all' selected")
        } else if (button_id == 'faq') {
            tg.openLink('https://telegram.org/faq')
        }
    })
})