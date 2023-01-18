function createStore(reducer, preloadState) {
    var currentState = preloadState;
    var currentListener = []

    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        for (var i = 0; i < currentListener.length; i++) {
            var listener = currentListener[i];
            listener()
        }
    }

    function subscribe(listener) {
        currentListener.push(listener)
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}