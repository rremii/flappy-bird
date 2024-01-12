export class Store {
    static user = {
        name: ''
    }

    static socket = null
    static sessionId = window.location.pathname.slice(2)
}

