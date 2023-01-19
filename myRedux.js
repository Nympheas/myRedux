function createStore(reducer, preloadState, enhancer) {
    if (typeof reducer !== 'function') throw new Error('reducer不是函数')
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('enhancer必需为函数')
        }
        return enhancer(createStore)(reducer, preloadState)
    }
    var currentState = preloadState;
    var currentListener = []

    function getState() {
        return currentState
    }

    function dispatch(action) {
        if (!isPlainObj(action)) throw new Error('action不是对象')
        if (typeof action.type === 'undefined') throw new Error('action对象中必需要有type属性')
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

function isPlainObj(obj) {
    if (typeof obj !== 'object' || typeof obj === null) return false
    var proto = obj
    while(Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(obj) === proto
}