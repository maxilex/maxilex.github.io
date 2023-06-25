var tgweb = {
    initData: Telegram.WebApp.initData || '',
    initDataUnsafe: Telegram.WebApp.initDataUnsafe || {},
    MainButton: Telegram.WebApp.MainButton,
    BackButton: Telegram.WebApp.BackButton,

    init: function (options) {
        $('body').css('visibility', '');
        Telegram.WebApp.ready();
        Telegram.WebApp.MainButton.setParams({
            text: 'Закрыть',
            is_visible: true
        }).onClick(tgweb.close);
    },
    checkInitData: function () {
        if (tgweb.initDataUnsafe.query_id &&
            tgweb.initData &&
            $('#webview_data_status').hasClass('status_need')) {
            $('#webview_data_status').removeClass('status_need');
            tgweb.apiRequest('checkInitData', {}, function (result) {
                if (result.ok) {
                    $('#webview_data_status').html('Hash is correct (async)').addClass('ok');
                } else {
                    $('#webview_data_status').html(result.error + ' (async)').addClass('err');
                }
            });
        }
    },
    expand: function () {
        Telegram.WebApp.expand();
    },
    close: function () {
        Telegram.WebApp.close();
    },
    sendMessage: function (msg_id, with_webview) {
        if (!tgweb.initDataUnsafe.query_id) {
            alert('WebViewQueryId not defined');
            return;
        }
        $('button').prop('disabled', true);
        $('#btn_status').text('Sending...').removeClass('ok err').show();
        tgweb.apiRequest('sendMessage', {
            msg_id: msg_id || '',
            with_webview: !tgweb.initDataUnsafe.receiver && with_webview ? 1 : 0
        }, function (result) {
            $('button').prop('disabled', false);
            if (result.response) {
                if (result.response.ok) {
                    $('#btn_status').html('Message sent successfully!').addClass('ok').show();
                } else {
                    $('#btn_status').text(result.response.description).addClass('err').show();
                    alert(result.response.description);
                }
            } else if (result.error) {
                $('#btn_status').text(result.error).addClass('err').show();
                alert(result.error);
            } else {
                $('#btn_status').text('Unknown error').addClass('err').show();
                alert('Unknown error');
            }
        });
    },

    sendText: function (spam) {
        var text = $('#text_field').val();
        if (!text.length) {
            return $('#text_field').focus();
        }
        if (byteLength(text) > 4096) {
            return alert('Text is too long');
        }
        var repeat = spam ? 10 : 1;
        for (var i = 0; i < repeat; i++) {
            Telegram.WebApp.sendData(text);
        }
    },
    sendTime: function (spam) {
        var repeat = spam ? 10 : 1;
        for (var i = 0; i < repeat; i++) {
            Telegram.WebApp.sendData(new Date().toString());
        }
    },
    showAlert: function (message) {
        Telegram.WebApp.showAlert(message);
    },
    showConfirm: function (message) {
        Telegram.WebApp.showConfirm(message);
    },
    showPopup: function () {
        Telegram.WebApp.showPopup({
            title: 'Popup title',
            message: 'Popup message',
            buttons: [
                { id: 'delete', type: 'destructive', text: 'Delete all' },
                { id: 'faq', type: 'default', text: 'Open FAQ' },
                { type: 'cancel' },
            ]
        }, function (button_id) {
            if (button_id == 'delete') {
                tgweb.showAlert("'Delete all' selected");
            } else if (button_id == 'faq') {
                Telegram.WebApp.openLink('https://telegram.org/faq');
            }
        });
    },
    showScanQrPopup: function (links_only) {
        Telegram.WebApp.showScanQrPopup({
            text: links_only ? 'with any link' : 'for test purposes'
        }, function (text) {
            if (links_only) {
                var lower_text = text.toString().toLowerCase();
                if (lower_text.substr(0, 7) == 'http://' ||
                    lower_text.substr(0, 8) == 'https://') {
                    setTimeout(function () {
                        Telegram.WebApp.openLink(text);
                    }, 50);
                    return true;
                }
            } else {
                tgweb.showAlert(text);
                return true;
            }
        });
    },
    showScanQr: function () {
        Telegram.WebApp.showScanQrPopup({
            text: 'Сканируем qr код'
        }, function (text) {
            tgweb.showAlert(text);
            return true;
        });
    }


};