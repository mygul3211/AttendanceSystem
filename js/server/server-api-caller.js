const serverRequestMethod = function (url, body, method, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    callback.apply({ state: xhr.readyState });

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    callback.apply({ state: xhr.readyState });

    xhr.send(body);
    callback.apply({ state: xhr.readyState });

    xhr.onprogress = function () {
        callback.apply({ state: xhr.readyState });
    }

    xhr.onload = function () {
        if (xhr.status === 200) {
            callback.apply({ state: xhr.readyState, data: JSON.parse(xhr.responseText) });
        } else {
            console.error(xhr.error);
        }
    }

    xhr.onerror = function (event) {
        callback.apply({ state: -99, errorMsg: event });
    }
}