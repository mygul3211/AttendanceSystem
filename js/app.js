function loadLatestBasicAPI() {
    sendActionPostToServer(
        {},
        serverAPIKey.SERVER_BASIC_API_KEY,
        function () {
            if (this.serverRequestState == 4) {
                localStorage.setItem('latest_basic_url', this.data[0]['Basic API'])
            }
        },
        serverAPI.ACCESS_UPDATED_BASIC_API)
}