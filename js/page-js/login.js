// Accessing latest basic api
if (!localStorage.getItem('latest_basic_url')) loadLatestBasicAPI();

// ログイン処理
function loginAction(event) {
    // disable form default action
    event.preventDefault();

    // get input values
    let idOrEmail = event.target.elements.id_email.value;
    let password = event.target.elements.password.value;

    // requires data for server-side
    let data = {
        'id_email': idOrEmail,
        'password': password
    }

    // do login action
    sendActionPostToServer(data, serverAPIKey.LOGIN_ACTION_KEY, function () {
        let response = this;

        // show server request state message at [login button value]
        event.target.elements.login.value = response.serverRequestStateMsg;

        // finish request & response
        if (response.serverRequestState == 4) {
            if (response.data.accountStatus) {
                setTimeout(() => {
                    window.location.href = 'attendance.html';
                }, 300);
            } else {
                setTimeout(() => {
                    event.target.elements.login.value = 'Login';
                    alert(response.data.message);
                }, 300);
            }
        }
    })
}