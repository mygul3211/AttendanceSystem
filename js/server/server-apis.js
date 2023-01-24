// prepare request before send [POST Action]
function sendActionPostToServer(data, apiKey, clientCallback, baseUrl = null) {
    let baseUrlCheck = baseUrl == null ?
        localStorage.getItem('latest_basic_url') ?
            localStorage.getItem('latest_basic_url') :
            serverAPI.BASE_URL :
        baseUrl;

    let body = {
        key: apiKey,
        ...data
    }

    serverRequestMethod(baseUrlCheck, EncodeHTMLForm(body), 'POST', function () {
        APICallTraceMsg(this, clientCallback);
    });
}

function APICallTraceMsg(package, clientCallback) {
    switch (package.state) {
        case 0:
        case 1:
        case 2:
            clientCallback.apply({
                serverRequestState: package.state,
                serverRequestStateMsg: 'Connecting...'
            });
            break;
        case 3:
            clientCallback.apply({
                serverRequestState: package.state,
                serverRequestStateMsg: 'Processing...'
            });
            break;
        case 4:
            clientCallback.apply({
                serverRequestState: package.state,
                serverRequestStateMsg: 'Finish...',
                data: package.data
            });
            break;
        default:
            clientCallback.apply({
                serverRequestState: package.state,
                serverRequestStateMsg: package.errorMsg
            });
            break;

    }
}

// HTTP POST用のデータボディ作成メソッド
function EncodeHTMLForm(data) {
    var params = [];

    for (var name in data) {
        var value = data[name];
        var param = encodeURIComponent(name) + '=' + encodeURIComponent(value);

        params.push(param);
    }

    return params.join('&').replace(/%20/g, '+');
}