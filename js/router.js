// Check User Information in browser storage 
if (true) {
    switch (window.location.pathname) {
        case '/index.html':
        case '/':
            window.location.href = window.location.origin + '/pages/login.html';
            break;
        case 404:
            window.location.href = window.location.origin + '404.html';
            break;
    }
}