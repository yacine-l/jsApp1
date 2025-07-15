(function() {
    "use strict";
    const ge = {
        PLAYING: "RUN",
        START: "START",
        FINISH: "FINISH",
        CREATE: "CREATE"
    }
      , $ = "public:aviatrix"
      , me = "public:participants"
      , ve = "public:anonymized-participants";
    var Y = (h => (h.CID = "cid",
    h.CONSUMER_ID = "consumerId",
    h.SESSION_TOKEN = "sessionToken",
    h.LANG = "lang",
    h.IS_DEMO = "isDemo",
    h.DEVTOOLS = "devtools",
    h.PIXI_DEVTOOLS = "pixiDevtools",
    h.FLAGS = "flags",
    h.MODE = "mode",
    h.WALLET = "wallet",
    h.DISABLE_EXPLOSION = "disableExplosion",
    h.DEV_PLANE_LEVEL = "devPlaneLevel",
    h.DEV_START_ODDS = "devStartOdds",
    h.DEBUG_PARAMS = "debugParams",
    h.FEAT_FLAGS = "featFlags",
    h.X2_DATES = "x2Dates",
    h.ENABLE_RANDOM_PLANE = "enableRandomPlane",
    h.STATS_TOOLS = "statstools",
    h.CODE = "code",
    h.DEMO_SESSION_TTL = "demoSessionTtl",
    h.DEMO_SESSION_BALANCE = "demoSessionBalance",
    h.DEMO_STAND = "demoStand",
    h.HIDE_EXIT_BUTTON = "hideExitButton",
    h.AGGREGATOR = "aggregator",
    h))(Y || {});
    Object.values(Y),
    ( () => {
        var h = Object.create
          , m = Object.defineProperty
          , b = Object.getOwnPropertyDescriptor
          , _ = Object.getOwnPropertyNames
          , C = Object.getOwnPropertySymbols
          , O = Object.getPrototypeOf
          , W = Object.prototype.hasOwnProperty
          , Ce = Object.prototype.propertyIsEnumerable
          , re = (e, t, n) => t in e ? m(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n
        }) : e[t] = n
          , oe = (e, t) => {
            for (var n in t ||= {})
                W.call(t, n) && re(e, n, t[n]);
            if (C)
                for (var n of C(t))
                    Ce.call(t, n) && re(e, n, t[n]);
            return e
        }
          , Re = (e, t) => () => (t || e((t = {
            exports: {}
        }).exports, t),
        t.exports)
          , xe = (e, t, n, s) => {
            if (t && typeof t == "object" || typeof t == "function")
                for (let i of _(t))
                    !W.call(e, i) && i !== n && m(e, i, {
                        get: () => t[i],
                        enumerable: !(s = b(t, i)) || s.enumerable
                    });
            return e
        }
          , ce = (e, t, n) => (n = e != null ? h(O(e)) : {},
        xe(t || !e || !e.__esModule ? m(n, "default", {
            value: e,
            enumerable: !0
        }) : n, e))
          , F = (e, t, n) => new Promise( (s, i) => {
            var o = v => {
                try {
                    a(n.next(v))
                } catch (x) {
                    i(x)
                }
            }
              , u = v => {
                try {
                    a(n.throw(v))
                } catch (x) {
                    i(x)
                }
            }
              , a = v => v.done ? s(v.value) : Promise.resolve(v.value).then(o, u);
            a((n = n.apply(e, t)).next())
        }
        )
          , ae = Re( (e, t) => {
            var n = typeof Reflect == "object" ? Reflect : null, s = n && typeof n.apply == "function" ? n.apply : function(r, c, l) {
                return Function.prototype.apply.call(r, c, l)
            }
            , i;
            n && typeof n.ownKeys == "function" ? i = n.ownKeys : Object.getOwnPropertySymbols ? i = function(r) {
                return Object.getOwnPropertyNames(r).concat(Object.getOwnPropertySymbols(r))
            }
            : i = function(r) {
                return Object.getOwnPropertyNames(r)
            }
            ;
            function o(r) {
                console && console.warn && console.warn(r)
            }
            var u = Number.isNaN || function(r) {
                return r !== r
            }
            ;
            function a() {
                a.init.call(this)
            }
            t.exports = a,
            t.exports.once = Ge,
            a.EventEmitter = a,
            a.prototype._events = void 0,
            a.prototype._eventsCount = 0,
            a.prototype._maxListeners = void 0;
            var v = 10;
            function x(r) {
                if (typeof r != "function")
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof r)
            }
            Object.defineProperty(a, "defaultMaxListeners", {
                enumerable: !0,
                get: function() {
                    return v
                },
                set: function(r) {
                    if (typeof r != "number" || r < 0 || u(r))
                        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + r + ".");
                    v = r
                }
            }),
            a.init = function() {
                (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
                this._eventsCount = 0),
                this._maxListeners = this._maxListeners || void 0
            }
            ,
            a.prototype.setMaxListeners = function(r) {
                if (typeof r != "number" || r < 0 || u(r))
                    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + r + ".");
                return this._maxListeners = r,
                this
            }
            ;
            function j(r) {
                return r._maxListeners === void 0 ? a.defaultMaxListeners : r._maxListeners
            }
            a.prototype.getMaxListeners = function() {
                return j(this)
            }
            ,
            a.prototype.emit = function(r) {
                for (var c = [], l = 1; l < arguments.length; l++)
                    c.push(arguments[l]);
                var d = r === "error"
                  , p = this._events;
                if (p !== void 0)
                    d = d && p.error === void 0;
                else if (!d)
                    return !1;
                if (d) {
                    var f;
                    if (c.length > 0 && (f = c[0]),
                    f instanceof Error)
                        throw f;
                    var S = new Error("Unhandled error." + (f ? " (" + f.message + ")" : ""));
                    throw S.context = f,
                    S
                }
                var L = p[r];
                if (L === void 0)
                    return !1;
                if (typeof L == "function")
                    s(L, this, c);
                else
                    for (var fe = L.length, He = E(L, fe), l = 0; l < fe; ++l)
                        s(He[l], this, c);
                return !0
            }
            ;
            function I(r, c, l, d) {
                var p, f, S;
                if (x(l),
                f = r._events,
                f === void 0 ? (f = r._events = Object.create(null),
                r._eventsCount = 0) : (f.newListener !== void 0 && (r.emit("newListener", c, l.listener ? l.listener : l),
                f = r._events),
                S = f[c]),
                S === void 0)
                    S = f[c] = l,
                    ++r._eventsCount;
                else if (typeof S == "function" ? S = f[c] = d ? [l, S] : [S, l] : d ? S.unshift(l) : S.push(l),
                p = j(r),
                p > 0 && S.length > p && !S.warned) {
                    S.warned = !0;
                    var L = new Error("Possible EventEmitter memory leak detected. " + S.length + " " + String(c) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                    L.name = "MaxListenersExceededWarning",
                    L.emitter = r,
                    L.type = c,
                    L.count = S.length,
                    o(L)
                }
                return r
            }
            a.prototype.addListener = function(r, c) {
                return I(this, r, c, !1)
            }
            ,
            a.prototype.on = a.prototype.addListener,
            a.prototype.prependListener = function(r, c) {
                return I(this, r, c, !0)
            }
            ;
            function P() {
                if (!this.fired)
                    return this.target.removeListener(this.type, this.wrapFn),
                    this.fired = !0,
                    arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }
            function g(r, c, l) {
                var d = {
                    fired: !1,
                    wrapFn: void 0,
                    target: r,
                    type: c,
                    listener: l
                }
                  , p = P.bind(d);
                return p.listener = l,
                d.wrapFn = p,
                p
            }
            a.prototype.once = function(r, c) {
                return x(c),
                this.on(r, g(this, r, c)),
                this
            }
            ,
            a.prototype.prependOnceListener = function(r, c) {
                return x(c),
                this.prependListener(r, g(this, r, c)),
                this
            }
            ,
            a.prototype.removeListener = function(r, c) {
                var l, d, p, f, S;
                if (x(c),
                d = this._events,
                d === void 0)
                    return this;
                if (l = d[r],
                l === void 0)
                    return this;
                if (l === c || l.listener === c)
                    --this._eventsCount === 0 ? this._events = Object.create(null) : (delete d[r],
                    d.removeListener && this.emit("removeListener", r, l.listener || c));
                else if (typeof l != "function") {
                    for (p = -1,
                    f = l.length - 1; f >= 0; f--)
                        if (l[f] === c || l[f].listener === c) {
                            S = l[f].listener,
                            p = f;
                            break
                        }
                    if (p < 0)
                        return this;
                    p === 0 ? l.shift() : J(l, p),
                    l.length === 1 && (d[r] = l[0]),
                    d.removeListener !== void 0 && this.emit("removeListener", r, S || c)
                }
                return this
            }
            ,
            a.prototype.off = a.prototype.removeListener,
            a.prototype.removeAllListeners = function(r) {
                var c, l, d;
                if (l = this._events,
                l === void 0)
                    return this;
                if (l.removeListener === void 0)
                    return arguments.length === 0 ? (this._events = Object.create(null),
                    this._eventsCount = 0) : l[r] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete l[r]),
                    this;
                if (arguments.length === 0) {
                    var p = Object.keys(l), f;
                    for (d = 0; d < p.length; ++d)
                        f = p[d],
                        f !== "removeListener" && this.removeAllListeners(f);
                    return this.removeAllListeners("removeListener"),
                    this._events = Object.create(null),
                    this._eventsCount = 0,
                    this
                }
                if (c = l[r],
                typeof c == "function")
                    this.removeListener(r, c);
                else if (c !== void 0)
                    for (d = c.length - 1; d >= 0; d--)
                        this.removeListener(r, c[d]);
                return this
            }
            ;
            function T(r, c, l) {
                var d = r._events;
                if (d === void 0)
                    return [];
                var p = d[c];
                return p === void 0 ? [] : typeof p == "function" ? l ? [p.listener || p] : [p] : l ? Fe(p) : E(p, p.length)
            }
            a.prototype.listeners = function(r) {
                return T(this, r, !0)
            }
            ,
            a.prototype.rawListeners = function(r) {
                return T(this, r, !1)
            }
            ,
            a.listenerCount = function(r, c) {
                return typeof r.listenerCount == "function" ? r.listenerCount(c) : k.call(r, c)
            }
            ,
            a.prototype.listenerCount = k;
            function k(r) {
                var c = this._events;
                if (c !== void 0) {
                    var l = c[r];
                    if (typeof l == "function")
                        return 1;
                    if (l !== void 0)
                        return l.length
                }
                return 0
            }
            a.prototype.eventNames = function() {
                return this._eventsCount > 0 ? i(this._events) : []
            }
            ;
            function E(r, c) {
                for (var l = new Array(c), d = 0; d < c; ++d)
                    l[d] = r[d];
                return l
            }
            function J(r, c) {
                for (; c + 1 < r.length; c++)
                    r[c] = r[c + 1];
                r.pop()
            }
            function Fe(r) {
                for (var c = new Array(r.length), l = 0; l < c.length; ++l)
                    c[l] = r[l].listener || r[l];
                return c
            }
            function Ge(r, c) {
                return new Promise(function(l, d) {
                    function p(S) {
                        r.removeListener(c, f),
                        d(S)
                    }
                    function f() {
                        typeof r.removeListener == "function" && r.removeListener("error", p),
                        l([].slice.call(arguments))
                    }
                    be(r, c, f, {
                        once: !0
                    }),
                    c !== "error" && qe(r, p, {
                        once: !0
                    })
                }
                )
            }
            function qe(r, c, l) {
                typeof r.on == "function" && be(r, "error", c, l)
            }
            function be(r, c, l, d) {
                if (typeof r.on == "function")
                    d.once ? r.once(c, l) : r.on(c, l);
                else if (typeof r.addEventListener == "function")
                    r.addEventListener(c, function p(f) {
                        d.once && r.removeEventListener(c, p),
                        l(f)
                    });
                else
                    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r)
            }
        }
        )
          , Oe = ce(ae())
          , w = {
            timeout: 1,
            transportClosed: 2,
            clientDisconnected: 3,
            clientClosed: 4,
            clientConnectToken: 5,
            clientRefreshToken: 6,
            subscriptionUnsubscribed: 7,
            subscriptionSubscribeToken: 8,
            subscriptionRefreshToken: 9,
            transportWriteError: 10,
            connectionClosed: 11,
            badConfiguration: 12
        }
          , N = {
            connectCalled: 0,
            transportClosed: 1,
            noPing: 2,
            subscribeTimeout: 3,
            unsubscribeError: 4
        }
          , K = {
            disconnectCalled: 0,
            unauthorized: 1,
            badProtocol: 2,
            messageSizeLimit: 3
        }
          , le = {
            subscribeCalled: 0,
            transportClosed: 1
        }
          , he = {
            unsubscribeCalled: 0,
            unauthorized: 1,
            clientClosed: 2
        }
          , ue = (e => (e.Disconnected = "disconnected",
        e.Connecting = "connecting",
        e.Connected = "connected",
        e))(ue || {})
          , de = (e => (e.Unsubscribed = "unsubscribed",
        e.Subscribing = "subscribing",
        e.Subscribed = "subscribed",
        e))(de || {});
        function Pe(e, t) {
            return e.lastIndexOf(t, 0) === 0
        }
        function _e(e) {
            return e == null ? !1 : typeof e == "function"
        }
        function Le(e, t) {
            if (globalThis.console) {
                let n = globalThis.console[e];
                _e(n) && n.apply(globalThis.console, t)
            }
        }
        function je(e, t) {
            return Math.floor(Math.random() * (t - e + 1) + e)
        }
        function G(e, t, n) {
            e > 31 && (e = 31);
            let s = je(0, Math.min(n, t * Math.pow(2, e)));
            return Math.min(n, t + s)
        }
        function De(e) {
            return "error"in e && e.error !== null
        }
        function q(e) {
            return Math.min(e * 1e3, 2147483647)
        }
        var Ae = class extends Oe.default {
            constructor(e, t, n) {
                super(),
                this._resubscribeTimeout = null,
                this._refreshTimeout = null,
                this.channel = t,
                this.state = "unsubscribed",
                this._centrifuge = e,
                this._token = "",
                this._getToken = null,
                this._data = null,
                this._getData = null,
                this._recover = !1,
                this._offset = null,
                this._epoch = null,
                this._recoverable = !1,
                this._positioned = !1,
                this._joinLeave = !1,
                this._minResubscribeDelay = 500,
                this._maxResubscribeDelay = 2e4,
                this._resubscribeTimeout = null,
                this._resubscribeAttempts = 0,
                this._promises = {},
                this._promiseId = 0,
                this._inflight = !1,
                this._refreshTimeout = null,
                this._setOptions(n),
                this._centrifuge._debugEnabled ? (this.on("state", s => {
                    this._centrifuge._debug("subscription state", t, s.oldState, "->", s.newState)
                }
                ),
                this.on("error", s => {
                    this._centrifuge._debug("subscription error", t, s)
                }
                )) : this.on("error", function() {
                    Function.prototype()
                })
            }
            ready(e) {
                return this.state === "unsubscribed" ? Promise.reject({
                    code: w.subscriptionUnsubscribed,
                    message: this.state
                }) : this.state === "subscribed" ? Promise.resolve() : new Promise( (t, n) => {
                    let s = {
                        resolve: t,
                        reject: n
                    };
                    e && (s.timeout = setTimeout(function() {
                        n({
                            code: w.timeout,
                            message: "timeout"
                        })
                    }, e)),
                    this._promises[this._nextPromiseId()] = s
                }
                )
            }
            subscribe() {
                this._isSubscribed() || (this._resubscribeAttempts = 0,
                this._setSubscribing(le.subscribeCalled, "subscribe called"))
            }
            unsubscribe() {
                this._setUnsubscribed(he.unsubscribeCalled, "unsubscribe called", !0)
            }
            publish(e) {
                let t = this;
                return this._methodCall().then(function() {
                    return t._centrifuge.publish(t.channel, e)
                })
            }
            presence() {
                let e = this;
                return this._methodCall().then(function() {
                    return e._centrifuge.presence(e.channel)
                })
            }
            presenceStats() {
                let e = this;
                return this._methodCall().then(function() {
                    return e._centrifuge.presenceStats(e.channel)
                })
            }
            history(e) {
                let t = this;
                return this._methodCall().then(function() {
                    return t._centrifuge.history(t.channel, e)
                })
            }
            _methodCall() {
                return this._isSubscribed() ? Promise.resolve() : this._isUnsubscribed() ? Promise.reject({
                    code: w.subscriptionUnsubscribed,
                    message: this.state
                }) : new Promise( (e, t) => {
                    let n = setTimeout(function() {
                        t({
                            code: w.timeout,
                            message: "timeout"
                        })
                    }, this._centrifuge._config.timeout);
                    this._promises[this._nextPromiseId()] = {
                        timeout: n,
                        resolve: e,
                        reject: t
                    }
                }
                )
            }
            _nextPromiseId() {
                return ++this._promiseId
            }
            _needRecover() {
                return this._recover === !0
            }
            _isUnsubscribed() {
                return this.state === "unsubscribed"
            }
            _isSubscribing() {
                return this.state === "subscribing"
            }
            _isSubscribed() {
                return this.state === "subscribed"
            }
            _setState(e) {
                if (this.state !== e) {
                    let t = this.state;
                    return this.state = e,
                    this.emit("state", {
                        newState: e,
                        oldState: t,
                        channel: this.channel
                    }),
                    !0
                }
                return !1
            }
            _usesToken() {
                return this._token !== "" || this._getToken !== null
            }
            _clearSubscribingState() {
                this._resubscribeAttempts = 0,
                this._clearResubscribeTimeout()
            }
            _clearSubscribedState() {
                this._clearRefreshTimeout()
            }
            _setSubscribed(e) {
                if (!this._isSubscribing())
                    return;
                this._clearSubscribingState(),
                e.recoverable && (this._recover = !0,
                this._offset = e.offset || 0,
                this._epoch = e.epoch || ""),
                this._setState("subscribed");
                let t = this._centrifuge._getSubscribeContext(this.channel, e);
                this.emit("subscribed", t),
                this._resolvePromises();
                let n = e.publications;
                if (n && n.length > 0)
                    for (let s in n)
                        !n.hasOwnProperty(s) || this._handlePublication(n[s]);
                e.expires === !0 && (this._refreshTimeout = setTimeout( () => this._refresh(), q(e.ttl)))
            }
            _setSubscribing(e, t) {
                this._isSubscribing() || (this._isSubscribed() && this._clearSubscribedState(),
                this._setState("subscribing") && this.emit("subscribing", {
                    channel: this.channel,
                    code: e,
                    reason: t
                }),
                this._subscribe(!1, !1))
            }
            _subscribe(e, t) {
                if (this._centrifuge._debug("subscribing on", this.channel),
                this._centrifuge.state !== "connected" && !e)
                    return this._centrifuge._debug("delay subscribe on", this.channel, "till connected"),
                    null;
                let n = this
                  , s = {
                    channel: n.channel
                };
                return !this._usesToken() || this._token ? n._getData ? (n._getData(s).then(function(i) {
                    !n._isSubscribing() || (n._data = i,
                    n._sendSubscribe(n._token, !1))
                }),
                null) : n._sendSubscribe(n._token, t) : (e || this._getSubscriptionToken().then(function(i) {
                    if (n._isSubscribing()) {
                        if (!i) {
                            n._failUnauthorized();
                            return
                        }
                        n._token = i,
                        n._getData ? n._getData(s).then(function(o) {
                            !n._isSubscribing() || (n._data = o,
                            n._sendSubscribe(i, !1))
                        }) : n._sendSubscribe(i, !1)
                    }
                }).catch(function(i) {
                    if (n._isSubscribing()) {
                        if (i instanceof A) {
                            n._failUnauthorized();
                            return
                        }
                        n.emit("error", {
                            type: "subscribeToken",
                            channel: n.channel,
                            error: {
                                code: w.subscriptionSubscribeToken,
                                message: i !== void 0 ? i.toString() : ""
                            }
                        }),
                        n._scheduleResubscribe()
                    }
                }),
                null)
            }
            _sendSubscribe(e, t) {
                let n = {
                    channel: this.channel
                };
                if (e && (n.token = e),
                this._data && (n.data = this._data),
                this._positioned && (n.positioned = !0),
                this._recoverable && (n.recoverable = !0),
                this._joinLeave && (n.join_leave = !0),
                this._needRecover()) {
                    n.recover = !0;
                    let i = this._getOffset();
                    i && (n.offset = i);
                    let o = this._getEpoch();
                    o && (n.epoch = o)
                }
                let s = {
                    subscribe: n
                };
                return this._inflight = !0,
                this._centrifuge._call(s, t).then(i => {
                    this._inflight = !1;
                    let o = i.reply.subscribe;
                    this._handleSubscribeResponse(o),
                    i.next && i.next()
                }
                , i => {
                    this._inflight = !1,
                    this._handleSubscribeError(i.error),
                    i.next && i.next()
                }
                ),
                s
            }
            _handleSubscribeError(e) {
                if (this._isSubscribing()) {
                    if (e.code === w.timeout) {
                        this._centrifuge._disconnect(N.subscribeTimeout, "subscribe timeout", !0);
                        return
                    }
                    this._subscribeError(e)
                }
            }
            _handleSubscribeResponse(e) {
                !this._isSubscribing() || this._setSubscribed(e)
            }
            _setUnsubscribed(e, t, n) {
                this._isUnsubscribed() || (this._isSubscribed() && (n && this._centrifuge._unsubscribe(this),
                this._clearSubscribedState()),
                this._isSubscribing() && (this._inflight && n && this._centrifuge._unsubscribe(this),
                this._clearSubscribingState()),
                this._setState("unsubscribed") && this.emit("unsubscribed", {
                    channel: this.channel,
                    code: e,
                    reason: t
                }),
                this._rejectPromises({
                    code: w.subscriptionUnsubscribed,
                    message: this.state
                }))
            }
            _handlePublication(e) {
                let t = this._centrifuge._getPublicationContext(this.channel, e);
                this.emit("publication", t),
                e.offset && (this._offset = e.offset)
            }
            _handleJoin(e) {
                let t = this._centrifuge._getJoinLeaveContext(e.info);
                this.emit("join", {
                    channel: this.channel,
                    info: t
                })
            }
            _handleLeave(e) {
                let t = this._centrifuge._getJoinLeaveContext(e.info);
                this.emit("leave", {
                    channel: this.channel,
                    info: t
                })
            }
            _resolvePromises() {
                for (let e in this._promises)
                    this._promises[e].timeout && clearTimeout(this._promises[e].timeout),
                    this._promises[e].resolve(),
                    delete this._promises[e]
            }
            _rejectPromises(e) {
                for (let t in this._promises)
                    this._promises[t].timeout && clearTimeout(this._promises[t].timeout),
                    this._promises[t].reject(e),
                    delete this._promises[t]
            }
            _scheduleResubscribe() {
                let e = this
                  , t = this._getResubscribeDelay();
                this._resubscribeTimeout = setTimeout(function() {
                    e._isSubscribing() && e._subscribe(!1, !1)
                }, t)
            }
            _subscribeError(e) {
                if (this._isSubscribing())
                    if (e.code < 100 || e.code === 109 || e.temporary === !0) {
                        e.code === 109 && (this._token = "");
                        let t = {
                            channel: this.channel,
                            type: "subscribe",
                            error: e
                        };
                        this._centrifuge.state === "connected" && this.emit("error", t),
                        this._scheduleResubscribe()
                    } else
                        this._setUnsubscribed(e.code, e.message, !1)
            }
            _getResubscribeDelay() {
                let e = G(this._resubscribeAttempts, this._minResubscribeDelay, this._maxResubscribeDelay);
                return this._resubscribeAttempts++,
                e
            }
            _setOptions(e) {
                !e || (e.since && (this._offset = e.since.offset,
                this._epoch = e.since.epoch,
                this._recover = !0),
                e.data && (this._data = e.data),
                e.getData && (this._getData = e.getData),
                e.minResubscribeDelay !== void 0 && (this._minResubscribeDelay = e.minResubscribeDelay),
                e.maxResubscribeDelay !== void 0 && (this._maxResubscribeDelay = e.maxResubscribeDelay),
                e.token && (this._token = e.token),
                e.getToken && (this._getToken = e.getToken),
                e.positioned === !0 && (this._positioned = !0),
                e.recoverable === !0 && (this._recoverable = !0),
                e.joinLeave === !0 && (this._joinLeave = !0))
            }
            _getOffset() {
                let e = this._offset;
                return e !== null ? e : 0
            }
            _getEpoch() {
                let e = this._epoch;
                return e !== null ? e : ""
            }
            _clearRefreshTimeout() {
                this._refreshTimeout !== null && (clearTimeout(this._refreshTimeout),
                this._refreshTimeout = null)
            }
            _clearResubscribeTimeout() {
                this._resubscribeTimeout !== null && (clearTimeout(this._resubscribeTimeout),
                this._resubscribeTimeout = null)
            }
            _getSubscriptionToken() {
                this._centrifuge._debug("get subscription token for channel", this.channel);
                let e = {
                    channel: this.channel
                }
                  , t = this._getToken;
                if (t === null)
                    throw this.emit("error", {
                        type: "configuration",
                        channel: this.channel,
                        error: {
                            code: w.badConfiguration,
                            message: "provide a function to get channel subscription token"
                        }
                    }),
                    new A("");
                return t(e)
            }
            _refresh() {
                this._clearRefreshTimeout();
                let e = this;
                this._getSubscriptionToken().then(function(t) {
                    if (!e._isSubscribed())
                        return;
                    if (!t) {
                        e._failUnauthorized();
                        return
                    }
                    e._token = t;
                    let n = {
                        sub_refresh: {
                            channel: e.channel,
                            token: t
                        }
                    };
                    e._centrifuge._call(n).then(s => {
                        let i = s.reply.sub_refresh;
                        e._refreshResponse(i),
                        s.next && s.next()
                    }
                    , s => {
                        e._refreshError(s.error),
                        s.next && s.next()
                    }
                    )
                }).catch(function(t) {
                    if (t instanceof A) {
                        e._failUnauthorized();
                        return
                    }
                    e.emit("error", {
                        type: "refreshToken",
                        channel: e.channel,
                        error: {
                            code: w.subscriptionRefreshToken,
                            message: t !== void 0 ? t.toString() : ""
                        }
                    }),
                    e._refreshTimeout = setTimeout( () => e._refresh(), e._getRefreshRetryDelay())
                })
            }
            _refreshResponse(e) {
                !this._isSubscribed() || (this._centrifuge._debug("subscription token refreshed, channel", this.channel),
                this._clearRefreshTimeout(),
                e.expires === !0 && (this._refreshTimeout = setTimeout( () => this._refresh(), q(e.ttl))))
            }
            _refreshError(e) {
                !this._isSubscribed() || (e.code < 100 || e.temporary === !0 ? (this.emit("error", {
                    type: "refresh",
                    channel: this.channel,
                    error: e
                }),
                this._refreshTimeout = setTimeout( () => this._refresh(), this._getRefreshRetryDelay())) : this._setUnsubscribed(e.code, e.message, !0))
            }
            _getRefreshRetryDelay() {
                return G(0, 1e4, 2e4)
            }
            _failUnauthorized() {
                this._setUnsubscribed(he.unauthorized, "unauthorized", !0)
            }
        }
          , Ie = class {
            constructor(e, t) {
                this.endpoint = e,
                this.options = t,
                this._transport = null
            }
            name() {
                return "sockjs"
            }
            subName() {
                return "sockjs-" + this._transport.transport
            }
            emulation() {
                return !1
            }
            supported() {
                return this.options.sockjs !== null
            }
            initialize(e, t) {
                this._transport = new this.options.sockjs(this.endpoint,null,this.options.sockjsOptions),
                this._transport.onopen = () => {
                    t.onOpen()
                }
                ,
                this._transport.onerror = n => {
                    t.onError(n)
                }
                ,
                this._transport.onclose = n => {
                    t.onClose(n)
                }
                ,
                this._transport.onmessage = n => {
                    t.onMessage(n.data)
                }
            }
            close() {
                this._transport.close()
            }
            send(e) {
                this._transport.send(e)
            }
        }
          , pe = class {
            constructor(e, t) {
                this.endpoint = e,
                this.options = t,
                this._transport = null
            }
            name() {
                return "websocket"
            }
            subName() {
                return "websocket"
            }
            emulation() {
                return !1
            }
            supported() {
                return this.options.websocket !== void 0 && this.options.websocket !== null
            }
            initialize(e, t) {
                let n = "";
                e === "protobuf" && (n = "centrifuge-protobuf"),
                n !== "" ? this._transport = new this.options.websocket(this.endpoint,n) : this._transport = new this.options.websocket(this.endpoint),
                e === "protobuf" && (this._transport.binaryType = "arraybuffer"),
                this._transport.onopen = () => {
                    t.onOpen()
                }
                ,
                this._transport.onerror = s => {
                    t.onError(s)
                }
                ,
                this._transport.onclose = s => {
                    t.onClose(s)
                }
                ,
                this._transport.onmessage = s => {
                    t.onMessage(s.data)
                }
            }
            close() {
                this._transport.close()
            }
            send(e) {
                this._transport.send(e)
            }
        }
          , Ne = class {
            constructor(e, t) {
                this.endpoint = e,
                this.options = t,
                this._abortController = null,
                this._utf8decoder = new TextDecoder,
                this._protocol = "json"
            }
            name() {
                return "http_stream"
            }
            subName() {
                return "http_stream"
            }
            emulation() {
                return !0
            }
            _handleErrors(e) {
                if (!e.ok)
                    throw new Error(e.status);
                return e
            }
            _fetchEventTarget(e, t, n) {
                let s = new EventTarget
                  , i = e.options.fetch;
                return i(t, n).then(e._handleErrors).then(o => {
                    s.dispatchEvent(new Event("open"));
                    let u = ""
                      , a = 0
                      , v = new Uint8Array
                      , x = o.body.getReader();
                    return new e.options.readableStream({
                        start(j) {
                            function I() {
                                return x.read().then( ({done: P, value: g}) => {
                                    if (P) {
                                        s.dispatchEvent(new Event("close")),
                                        j.close();
                                        return
                                    }
                                    try {
                                        if (e._protocol === "json")
                                            for (u += e._utf8decoder.decode(g); a < u.length; )
                                                if (u[a] === `
`) {
                                                    let T = u.substring(0, a);
                                                    s.dispatchEvent(new MessageEvent("message",{
                                                        data: T
                                                    })),
                                                    u = u.substring(a + 1),
                                                    a = 0
                                                } else
                                                    ++a;
                                        else {
                                            let T = new Uint8Array(v.length + g.length);
                                            for (T.set(v),
                                            T.set(g, v.length),
                                            v = T; ; ) {
                                                let k = e.options.decoder.decodeReply(v);
                                                if (k.ok) {
                                                    let E = v.slice(0, k.pos);
                                                    s.dispatchEvent(new MessageEvent("message",{
                                                        data: E
                                                    })),
                                                    v = v.slice(k.pos);
                                                    continue
                                                }
                                                break
                                            }
                                        }
                                    } catch (T) {
                                        s.dispatchEvent(new Event("error",{
                                            detail: T
                                        })),
                                        s.dispatchEvent(new Event("close")),
                                        j.close();
                                        return
                                    }
                                    I()
                                }
                                ).catch(function(P) {
                                    s.dispatchEvent(new Event("error",{
                                        detail: P
                                    })),
                                    s.dispatchEvent(new Event("close")),
                                    j.close()
                                })
                            }
                            return I()
                        }
                    })
                }
                ).catch(o => {
                    s.dispatchEvent(new Event("error",{
                        detail: o
                    })),
                    s.dispatchEvent(new Event("close"))
                }
                ),
                s
            }
            supported() {
                return this.options.fetch !== null && this.options.readableStream !== null && typeof TextDecoder < "u" && typeof AbortController < "u" && typeof EventTarget < "u" && typeof Event < "u" && typeof MessageEvent < "u" && typeof Error < "u"
            }
            initialize(e, t, n) {
                this._protocol = e,
                this._abortController = new AbortController;
                let s, i;
                e === "json" ? (s = {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                i = n) : (s = {
                    Accept: "application/octet-stream",
                    "Content-Type": "application/octet-stream"
                },
                i = n);
                let o = {
                    method: "POST",
                    headers: s,
                    body: i,
                    mode: "cors",
                    credentials: "same-origin",
                    cache: "no-cache",
                    signal: this._abortController.signal
                }
                  , u = this._fetchEventTarget(this, this.endpoint, o);
                u.addEventListener("open", () => {
                    t.onOpen()
                }
                ),
                u.addEventListener("error", a => {
                    this._abortController.abort(),
                    t.onError(a)
                }
                ),
                u.addEventListener("close", () => {
                    this._abortController.abort(),
                    t.onClose({
                        code: 4,
                        reason: "connection closed"
                    })
                }
                ),
                u.addEventListener("message", a => {
                    t.onMessage(a.data)
                }
                )
            }
            close() {
                this._abortController.abort()
            }
            send(e, t, n) {
                let s, i, o = {
                    session: t,
                    node: n,
                    data: e
                };
                this._protocol === "json" ? (s = {
                    "Content-Type": "application/json"
                },
                i = JSON.stringify(o)) : (s = {
                    "Content-Type": "application/octet-stream"
                },
                i = this.options.encoder.encodeEmulationRequest(o));
                let u = this.options.fetch
                  , a = {
                    method: "POST",
                    headers: s,
                    body: i,
                    mode: "cors",
                    credentials: "same-origin",
                    cache: "no-cache"
                };
                u(this.options.emulationEndpoint, a)
            }
        }
          , Ue = class {
            constructor(e, t) {
                this.endpoint = e,
                this.options = t,
                this._protocol = "json",
                this._transport = null,
                this._onClose = null
            }
            name() {
                return "sse"
            }
            subName() {
                return "sse"
            }
            emulation() {
                return !0
            }
            supported() {
                return this.options.eventsource !== null && this.options.fetch !== null
            }
            initialize(e, t, n) {
                let s;
                globalThis && globalThis.document && globalThis.document.baseURI ? s = new URL(this.endpoint,globalThis.document.baseURI) : s = new URL(this.endpoint),
                s.searchParams.append("cf_connect", n);
                let i = {}
                  , o = new this.options.eventsource(s.toString(),i);
                this._transport = o;
                let u = this;
                o.onopen = function() {
                    t.onOpen()
                }
                ,
                o.onerror = function(a) {
                    o.close(),
                    t.onError(a),
                    t.onClose({
                        code: 4,
                        reason: "connection closed"
                    })
                }
                ,
                o.onmessage = function(a) {
                    t.onMessage(a.data)
                }
                ,
                u._onClose = function() {
                    t.onClose({
                        code: 4,
                        reason: "connection closed"
                    })
                }
            }
            close() {
                this._transport.close(),
                this._onClose !== null && this._onClose()
            }
            send(e, t, n) {
                let s = {
                    session: t,
                    node: n,
                    data: e
                }
                  , i = {
                    "Content-Type": "application/json"
                }
                  , o = JSON.stringify(s)
                  , u = this.options.fetch
                  , a = {
                    method: "POST",
                    headers: i,
                    body: o,
                    mode: "cors",
                    credentials: "same-origin",
                    cache: "no-cache"
                };
                u(this.options.emulationEndpoint, a)
            }
        }
          , Me = class {
            constructor(e, t) {
                this.endpoint = e,
                this.options = t,
                this._transport = null,
                this._stream = null,
                this._writer = null,
                this._utf8decoder = new TextDecoder,
                this._protocol = "json"
            }
            name() {
                return "webtransport"
            }
            subName() {
                return "webtransport"
            }
            emulation() {
                return !1
            }
            supported() {
                return this.options.webtransport !== void 0 && this.options.webtransport !== null
            }
            initialize(e, t) {
                return F(this, null, function*() {
                    let n;
                    globalThis && globalThis.document && globalThis.document.baseURI ? n = new URL(this.endpoint,globalThis.document.baseURI) : n = new URL(this.endpoint),
                    e === "protobuf" && n.searchParams.append("cf_protocol", "protobuf"),
                    this._protocol = e;
                    let s = new EventTarget;
                    this._transport = new this.options.webtransport(n.toString()),
                    this._transport.closed.then( () => {
                        t.onClose({
                            code: 4,
                            reason: "connection closed"
                        })
                    }
                    ).catch( () => {
                        t.onClose({
                            code: 4,
                            reason: "connection closed"
                        })
                    }
                    );
                    try {
                        yield this._transport.ready
                    } catch {
                        this.close();
                        return
                    }
                    let i;
                    try {
                        i = yield this._transport.createBidirectionalStream()
                    } catch {
                        this.close();
                        return
                    }
                    this._stream = i,
                    this._writer = this._stream.writable.getWriter(),
                    s.addEventListener("close", () => {
                        t.onClose({
                            code: 4,
                            reason: "connection closed"
                        })
                    }
                    ),
                    s.addEventListener("message", o => {
                        t.onMessage(o.data)
                    }
                    ),
                    this._startReading(s),
                    t.onOpen()
                })
            }
            _startReading(e) {
                return F(this, null, function*() {
                    let t = this._stream.readable.getReader()
                      , n = ""
                      , s = 0
                      , i = new Uint8Array;
                    try {
                        for (; ; ) {
                            let {done: o, value: u} = yield t.read();
                            if (u.length > 0)
                                if (this._protocol === "json")
                                    for (n += this._utf8decoder.decode(u); s < n.length; )
                                        if (n[s] === `
`) {
                                            let a = n.substring(0, s);
                                            e.dispatchEvent(new MessageEvent("message",{
                                                data: a
                                            })),
                                            n = n.substring(s + 1),
                                            s = 0
                                        } else
                                            ++s;
                                else {
                                    let a = new Uint8Array(i.length + u.length);
                                    for (a.set(i),
                                    a.set(u, i.length),
                                    i = a; ; ) {
                                        let v = this.options.decoder.decodeReply(i);
                                        if (v.ok) {
                                            let x = i.slice(0, v.pos);
                                            e.dispatchEvent(new MessageEvent("message",{
                                                data: x
                                            })),
                                            i = i.slice(v.pos);
                                            continue
                                        }
                                        break
                                    }
                                }
                            if (o)
                                break
                        }
                    } catch {
                        e.dispatchEvent(new Event("close"))
                    }
                })
            }
            close() {
                return F(this, null, function*() {
                    try {
                        this._writer && (yield this._writer.close()),
                        this._transport.close()
                    } catch {}
                })
            }
            send(e) {
                return F(this, null, function*() {
                    let t;
                    this._protocol === "json" ? t = new TextEncoder().encode(e + `
`) : t = e;
                    try {
                        yield this._writer.write(t)
                    } catch {
                        this.close()
                    }
                })
            }
        }
          , ze = class {
            encodeCommands(e) {
                return e.map(t => JSON.stringify(t)).join(`
`)
            }
        }
          , We = class {
            decodeReplies(e) {
                return e.trim().split(`
`).map(t => JSON.parse(t))
            }
        }
          , Je = ce(ae())
          , Be = {
            protocol: "json",
            token: "",
            getToken: null,
            data: null,
            getData: null,
            debug: !1,
            name: "js",
            version: "",
            fetch: null,
            readableStream: null,
            websocket: null,
            eventsource: null,
            sockjs: null,
            sockjsOptions: {},
            emulationEndpoint: "/emulation",
            minReconnectDelay: 500,
            maxReconnectDelay: 2e4,
            timeout: 5e3,
            maxServerPingDelay: 1e4,
            networkEventTarget: null
        }
          , A = class extends Error {
            constructor(e) {
                super(e),
                this.name = this.constructor.name
            }
        }
          , H = class extends Je.default {
            constructor(e, t) {
                super(),
                this._reconnectTimeout = null,
                this._refreshTimeout = null,
                this._serverPingTimeout = null,
                this.state = "disconnected",
                this._endpoint = e,
                this._emulation = !1,
                this._transports = [],
                this._currentTransportIndex = 0,
                this._triedAllTransports = !1,
                this._transportWasOpen = !1,
                this._transport = null,
                this._transportId = 0,
                this._deviceWentOffline = !1,
                this._transportClosed = !0,
                this._encoder = null,
                this._decoder = null,
                this._reconnecting = !1,
                this._reconnectTimeout = null,
                this._reconnectAttempts = 0,
                this._client = null,
                this._session = "",
                this._node = "",
                this._subs = {},
                this._serverSubs = {},
                this._commandId = 0,
                this._commands = [],
                this._batching = !1,
                this._refreshRequired = !1,
                this._refreshTimeout = null,
                this._callbacks = {},
                this._token = "",
                this._data = null,
                this._dispatchPromise = Promise.resolve(),
                this._serverPing = 0,
                this._serverPingTimeout = null,
                this._sendPong = !1,
                this._promises = {},
                this._promiseId = 0,
                this._debugEnabled = !1,
                this._networkEventsSet = !1,
                this._config = oe(oe({}, Be), t),
                this._configure(),
                this._debugEnabled ? (this.on("state", n => {
                    this._debug("client state", n.oldState, "->", n.newState)
                }
                ),
                this.on("error", n => {
                    this._debug("client error", n)
                }
                )) : this.on("error", function() {
                    Function.prototype()
                })
            }
            newSubscription(e, t) {
                if (this.getSubscription(e) !== null)
                    throw new Error("Subscription to the channel " + e + " already exists");
                let n = new Ae(this,e,t);
                return this._subs[e] = n,
                n
            }
            getSubscription(e) {
                return this._getSub(e)
            }
            removeSubscription(e) {
                !e || (e.state !== "unsubscribed" && e.unsubscribe(),
                this._removeSubscription(e))
            }
            subscriptions() {
                return this._subs
            }
            ready(e) {
                return this.state === "disconnected" ? Promise.reject({
                    code: w.clientDisconnected,
                    message: "client disconnected"
                }) : this.state === "connected" ? Promise.resolve() : new Promise( (t, n) => {
                    let s = {
                        resolve: t,
                        reject: n
                    };
                    e && (s.timeout = setTimeout(function() {
                        n({
                            code: w.timeout,
                            message: "timeout"
                        })
                    }, e)),
                    this._promises[this._nextPromiseId()] = s
                }
                )
            }
            connect() {
                if (this._isConnected()) {
                    this._debug("connect called when already connected");
                    return
                }
                if (this._isConnecting()) {
                    this._debug("connect called when already connecting");
                    return
                }
                this._debug("connect called"),
                this._reconnectAttempts = 0,
                this._startConnecting()
            }
            disconnect() {
                this._disconnect(K.disconnectCalled, "disconnect called", !1)
            }
            setToken(e) {
                this._token = e
            }
            send(e) {
                let t = {
                    send: {
                        data: e
                    }
                }
                  , n = this;
                return this._methodCall().then(function() {
                    return n._transportSendCommands([t]) ? Promise.resolve() : Promise.reject(n._createErrorObject(w.transportWriteError, "transport write error"))
                })
            }
            rpc(e, t) {
                let n = {
                    rpc: {
                        method: e,
                        data: t
                    }
                }
                  , s = this;
                return this._methodCall().then(function() {
                    return s._callPromise(n, function(i) {
                        return {
                            data: i.rpc.data
                        }
                    })
                })
            }
            publish(e, t) {
                let n = {
                    publish: {
                        channel: e,
                        data: t
                    }
                }
                  , s = this;
                return this._methodCall().then(function() {
                    return s._callPromise(n, function() {
                        return {}
                    })
                })
            }
            history(e, t) {
                let n = {
                    history: this._getHistoryRequest(e, t)
                }
                  , s = this;
                return this._methodCall().then(function() {
                    return s._callPromise(n, function(i) {
                        let o = i.history
                          , u = [];
                        if (o.publications)
                            for (let a = 0; a < o.publications.length; a++)
                                u.push(s._getPublicationContext(e, o.publications[a]));
                        return {
                            publications: u,
                            epoch: o.epoch || "",
                            offset: o.offset || 0
                        }
                    })
                })
            }
            presence(e) {
                let t = {
                    presence: {
                        channel: e
                    }
                }
                  , n = this;
                return this._methodCall().then(function() {
                    return n._callPromise(t, function(s) {
                        let i = s.presence.presence;
                        for (let o in i)
                            if (i.hasOwnProperty(o)) {
                                let u = i[o].conn_info
                                  , a = i[o].chan_info;
                                u && (i[o].connInfo = u),
                                a && (i[o].chanInfo = a)
                            }
                        return {
                            clients: i
                        }
                    })
                })
            }
            presenceStats(e) {
                let t = {
                    presence_stats: {
                        channel: e
                    }
                }
                  , n = this;
                return this._methodCall().then(function() {
                    return n._callPromise(t, function(s) {
                        let i = s.presence_stats;
                        return {
                            numUsers: i.num_users,
                            numClients: i.num_clients
                        }
                    })
                })
            }
            startBatching() {
                this._batching = !0
            }
            stopBatching() {
                let e = this;
                Promise.resolve().then(function() {
                    Promise.resolve().then(function() {
                        e._batching = !1,
                        e._flush()
                    })
                })
            }
            _debug(...e) {
                !this._debugEnabled || Le("debug", e)
            }
            _setFormat(e) {
                if (!this._formatOverride(e)) {
                    if (e === "protobuf")
                        throw new Error("not implemented by JSON-only Centrifuge client, use client with Protobuf support");
                    this._encoder = new ze,
                    this._decoder = new We
                }
            }
            _formatOverride(e) {
                return !1
            }
            _configure() {
                if (!("Promise"in globalThis))
                    throw new Error("Promise polyfill required");
                if (!this._endpoint)
                    throw new Error("endpoint configuration required");
                if (this._config.protocol !== "json" && this._config.protocol !== "protobuf")
                    throw new Error("unsupported protocol " + this._config.protocol);
                if (this._config.token !== null && (this._token = this._config.token),
                this._config.data !== null && (this._data = this._config.data),
                this._setFormat("json"),
                this._config.protocol === "protobuf" && this._setFormat("protobuf"),
                (this._config.debug === !0 || typeof localStorage < "u" && localStorage.getItem("centrifuge.debug")) && (this._debugEnabled = !0),
                this._debug("config", this._config),
                typeof this._endpoint != "string")
                    if (typeof this._endpoint == "object" && this._endpoint instanceof Array) {
                        this._transports = this._endpoint,
                        this._emulation = !0;
                        for (let e in this._transports) {
                            let t = this._transports[e];
                            if (!t.endpoint || !t.transport)
                                throw new Error("malformed transport configuration");
                            let n = t.transport;
                            if (["websocket", "http_stream", "sse", "sockjs", "webtransport"].indexOf(n) < 0)
                                throw new Error("unsupported transport name: " + n)
                        }
                    } else
                        throw new Error("unsupported url configuration type: only string or array of objects are supported")
            }
            _setState(e) {
                if (this.state !== e) {
                    this._reconnecting = !1;
                    let t = this.state;
                    return this.state = e,
                    this.emit("state", {
                        newState: e,
                        oldState: t
                    }),
                    !0
                }
                return !1
            }
            _isDisconnected() {
                return this.state === "disconnected"
            }
            _isConnecting() {
                return this.state === "connecting"
            }
            _isConnected() {
                return this.state === "connected"
            }
            _nextCommandId() {
                return ++this._commandId
            }
            _setNetworkEvents() {
                if (this._networkEventsSet)
                    return;
                let e = null;
                this._config.networkEventTarget !== null ? e = this._config.networkEventTarget : typeof globalThis.addEventListener < "u" && (e = globalThis),
                e && (e.addEventListener("offline", () => {
                    this._debug("offline event triggered"),
                    (this.state === "connected" || this.state === "connecting") && (this._disconnect(N.transportClosed, "transport closed", !0),
                    this._deviceWentOffline = !0)
                }
                ),
                e.addEventListener("online", () => {
                    this._debug("online event triggered"),
                    this.state === "connecting" && (this._deviceWentOffline && !this._transportClosed && (this._deviceWentOffline = !1,
                    this._transportClosed = !0),
                    this._clearReconnectTimeout(),
                    this._startReconnecting())
                }
                ),
                this._networkEventsSet = !0)
            }
            _getReconnectDelay() {
                let e = G(this._reconnectAttempts, this._config.minReconnectDelay, this._config.maxReconnectDelay);
                return this._reconnectAttempts += 1,
                e
            }
            _clearOutgoingRequests() {
                for (let e in this._callbacks)
                    if (this._callbacks.hasOwnProperty(e)) {
                        let t = this._callbacks[e];
                        clearTimeout(t.timeout);
                        let n = t.errback;
                        if (!n)
                            continue;
                        n({
                            error: this._createErrorObject(w.connectionClosed, "connection closed")
                        })
                    }
                this._callbacks = {}
            }
            _clearConnectedState() {
                this._client = null,
                this._clearServerPingTimeout(),
                this._clearRefreshTimeout();
                for (let e in this._subs) {
                    if (!this._subs.hasOwnProperty(e))
                        continue;
                    let t = this._subs[e];
                    t.state === "subscribed" && t._setSubscribing(le.transportClosed, "transport closed")
                }
                for (let e in this._serverSubs)
                    this._serverSubs.hasOwnProperty(e) && this.emit("subscribing", {
                        channel: e
                    })
            }
            _handleWriteError(e) {
                for (let t of e) {
                    let n = t.id;
                    if (!(n in this._callbacks))
                        continue;
                    let s = this._callbacks[n];
                    clearTimeout(this._callbacks[n].timeout),
                    delete this._callbacks[n];
                    let i = s.errback;
                    i({
                        error: this._createErrorObject(w.transportWriteError, "transport write error")
                    })
                }
            }
            _transportSendCommands(e) {
                if (!e.length)
                    return !0;
                if (!this._transport)
                    return !1;
                try {
                    this._transport.send(this._encoder.encodeCommands(e), this._session, this._node)
                } catch (t) {
                    return this._debug("error writing commands", t),
                    this._handleWriteError(e),
                    !1
                }
                return !0
            }
            _initializeTransport() {
                let e;
                this._config.websocket !== null ? e = this._config.websocket : typeof globalThis.WebSocket != "function" && typeof globalThis.WebSocket != "object" || (e = globalThis.WebSocket);
                let t = null;
                this._config.sockjs !== null ? t = this._config.sockjs : typeof globalThis.SockJS < "u" && (t = globalThis.SockJS);
                let n = null;
                this._config.eventsource !== null ? n = this._config.eventsource : typeof globalThis.EventSource < "u" && (n = globalThis.EventSource);
                let s = null;
                this._config.fetch !== null ? s = this._config.fetch : typeof globalThis.fetch < "u" && (s = globalThis.fetch);
                let i = null;
                if (this._config.readableStream !== null ? i = this._config.readableStream : typeof globalThis.ReadableStream < "u" && (i = globalThis.ReadableStream),
                this._emulation) {
                    this._currentTransportIndex >= this._transports.length && (this._triedAllTransports = !0,
                    this._currentTransportIndex = 0);
                    let g = 0;
                    for (; ; ) {
                        if (g >= this._transports.length)
                            throw new Error("no supported transport found");
                        let T = this._transports[this._currentTransportIndex]
                          , k = T.transport
                          , E = T.endpoint;
                        if (k === "websocket") {
                            if (this._debug("trying websocket transport"),
                            this._transport = new pe(E,{
                                websocket: e
                            }),
                            !this._transport.supported()) {
                                this._debug("websocket transport not available"),
                                this._currentTransportIndex++,
                                g++;
                                continue
                            }
                        } else if (k === "webtransport") {
                            if (this._debug("trying webtransport transport"),
                            this._transport = new Me(E,{
                                webtransport: globalThis.WebTransport,
                                decoder: this._decoder,
                                encoder: this._encoder
                            }),
                            !this._transport.supported()) {
                                this._debug("webtransport transport not available"),
                                this._currentTransportIndex++,
                                g++;
                                continue
                            }
                        } else if (k === "http_stream") {
                            if (this._debug("trying http_stream transport"),
                            this._transport = new Ne(E,{
                                fetch: s,
                                readableStream: i,
                                emulationEndpoint: this._config.emulationEndpoint,
                                decoder: this._decoder,
                                encoder: this._encoder
                            }),
                            !this._transport.supported()) {
                                this._debug("http_stream transport not available"),
                                this._currentTransportIndex++,
                                g++;
                                continue
                            }
                        } else if (k === "sse") {
                            if (this._debug("trying sse transport"),
                            this._transport = new Ue(E,{
                                eventsource: n,
                                fetch: s,
                                emulationEndpoint: this._config.emulationEndpoint
                            }),
                            !this._transport.supported()) {
                                this._debug("sse transport not available"),
                                this._currentTransportIndex++,
                                g++;
                                continue
                            }
                        } else if (k === "sockjs") {
                            if (this._debug("trying sockjs"),
                            this._transport = new Ie(E,{
                                sockjs: t,
                                sockjsOptions: this._config.sockjsOptions
                            }),
                            !this._transport.supported()) {
                                this._debug("sockjs transport not available"),
                                this._currentTransportIndex++,
                                g++;
                                continue
                            }
                        } else
                            throw new Error("unknown transport " + k);
                        break
                    }
                } else {
                    if (Pe(this._endpoint, "http"))
                        throw new Error("Provide explicit transport endpoints configuration in case of using HTTP (i.e. using array of TransportEndpoint instead of a single string), or use ws(s):// scheme in an endpoint if you aimed using WebSocket transport");
                    if (this._debug("client will use websocket"),
                    this._transport = new pe(this._endpoint,{
                        websocket: e
                    }),
                    !this._transport.supported())
                        throw new Error("WebSocket not available")
                }
                let o = this
                  , u = this._transport
                  , a = this._nextTransportId();
                o._debug("id of transport", a);
                let v = !1
                  , x = !0;
                this._transport.name() === "sse" && (x = !1);
                let j = [];
                if (this._transport.emulation()) {
                    let g = o._sendConnect(!0);
                    if (j.push(g),
                    x) {
                        let T = o._sendSubscribeCommands(!0, !0);
                        for (let k in T)
                            j.push(T[k])
                    }
                }
                this._setNetworkEvents();
                let I = this._encoder.encodeCommands(j);
                this._transportClosed = !1;
                let P;
                P = setTimeout(function() {
                    u.close()
                }, this._config.timeout),
                this._transport.initialize(this._config.protocol, {
                    onOpen: function() {
                        if (P && (clearTimeout(P),
                        P = null),
                        o._transportId != a) {
                            o._debug("open callback from non-actual transport"),
                            u.close();
                            return
                        }
                        v = !0,
                        o._debug(u.subName(), "transport open"),
                        o._transportWasOpen = !0,
                        !u.emulation() && (o.startBatching(),
                        o._sendConnect(!1),
                        x && o._sendSubscribeCommands(!0, !1),
                        o.stopBatching())
                    },
                    onError: function(g) {
                        if (o._transportId != a) {
                            o._debug("error callback from non-actual transport");
                            return
                        }
                        o._debug("transport level error", g)
                    },
                    onClose: function(g) {
                        if (P && (clearTimeout(P),
                        P = null),
                        o._transportId != a) {
                            o._debug("close callback from non-actual transport");
                            return
                        }
                        o._debug(u.subName(), "transport closed"),
                        o._transportClosed = !0;
                        let T = "connection closed"
                          , k = !0
                          , E = 0;
                        if (g && "code"in g && g.code && (E = g.code),
                        g && g.reason)
                            try {
                                let J = JSON.parse(g.reason);
                                T = J.reason,
                                k = J.reconnect
                            } catch {
                                T = g.reason,
                                (E >= 3500 && E < 4e3 || E >= 4500 && E < 5e3) && (k = !1)
                            }
                        E < 3e3 ? (E === 1009 ? (E = K.messageSizeLimit,
                        T = "message size limit exceeded",
                        k = !1) : (E = N.transportClosed,
                        T = "transport closed"),
                        o._emulation && !o._transportWasOpen && (o._currentTransportIndex++,
                        o._currentTransportIndex >= o._transports.length && (o._triedAllTransports = !0,
                        o._currentTransportIndex = 0))) : o._transportWasOpen = !0,
                        o._isConnecting() && !v && o.emit("error", {
                            type: "transport",
                            error: {
                                code: w.transportClosed,
                                message: "transport closed"
                            },
                            transport: u.name()
                        }),
                        o._reconnecting = !1,
                        o._disconnect(E, T, k)
                    },
                    onMessage: function(g) {
                        o._dataReceived(g)
                    }
                }, I)
            }
            _sendConnect(e) {
                let t = this._constructConnectCommand()
                  , n = this;
                return this._call(t, e).then(s => {
                    let i = s.reply.connect;
                    n._connectResponse(i),
                    s.next && s.next()
                }
                , s => {
                    n._connectError(s.error),
                    s.next && s.next()
                }
                ),
                t
            }
            _startReconnecting() {
                if (this._debug("start reconnecting"),
                !this._isConnecting()) {
                    this._debug("stop reconnecting: client not in connecting state");
                    return
                }
                if (this._reconnecting) {
                    this._debug("reconnect already in progress, return from reconnect routine");
                    return
                }
                if (this._transportClosed === !1) {
                    this._debug("waiting for transport close");
                    return
                }
                this._reconnecting = !0;
                let e = this
                  , t = this._token === "";
                if (!(this._refreshRequired || t && this._config.getToken !== null)) {
                    this._config.getData ? this._config.getData().then(function(n) {
                        !e._isConnecting() || (e._data = n,
                        e._initializeTransport())
                    }) : this._initializeTransport();
                    return
                }
                this._getToken().then(function(n) {
                    if (e._isConnecting()) {
                        if (n == null || n == null) {
                            e._failUnauthorized();
                            return
                        }
                        e._token = n,
                        e._debug("connection token refreshed"),
                        e._config.getData ? e._config.getData().then(function(s) {
                            !e._isConnecting() || (e._data = s,
                            e._initializeTransport())
                        }) : e._initializeTransport()
                    }
                }).catch(function(n) {
                    if (!e._isConnecting())
                        return;
                    if (n instanceof A) {
                        e._failUnauthorized();
                        return
                    }
                    e.emit("error", {
                        type: "connectToken",
                        error: {
                            code: w.clientConnectToken,
                            message: n !== void 0 ? n.toString() : ""
                        }
                    });
                    let s = e._getReconnectDelay();
                    e._debug("error on connection token refresh, reconnect after " + s + " milliseconds", n),
                    e._reconnecting = !1,
                    e._reconnectTimeout = setTimeout( () => {
                        e._startReconnecting()
                    }
                    , s)
                })
            }
            _connectError(e) {
                this.state === "connecting" && (e.code === 109 && (this._refreshRequired = !0),
                e.code < 100 || e.temporary === !0 || e.code === 109 ? (this.emit("error", {
                    type: "connect",
                    error: e
                }),
                this._debug("closing transport due to connect error"),
                this._reconnecting = !1,
                this._disconnect(e.code, e.message, !0)) : this._disconnect(e.code, e.message, !1))
            }
            _scheduleReconnect() {
                if (!this._isConnecting())
                    return;
                let e = !1;
                this._emulation && !this._transportWasOpen && !this._triedAllTransports && (e = !0);
                let t = this._getReconnectDelay();
                e && (t = 0),
                this._debug("reconnect after " + t + " milliseconds"),
                this._reconnectTimeout = setTimeout( () => {
                    this._startReconnecting()
                }
                , t)
            }
            _constructConnectCommand() {
                let e = {};
                this._token && (e.token = this._token),
                this._data && (e.data = this._data),
                this._config.name && (e.name = this._config.name),
                this._config.version && (e.version = this._config.version);
                let t = {}
                  , n = !1;
                for (let s in this._serverSubs)
                    if (this._serverSubs.hasOwnProperty(s) && this._serverSubs[s].recoverable) {
                        n = !0;
                        let i = {
                            recover: !0
                        };
                        this._serverSubs[s].offset && (i.offset = this._serverSubs[s].offset),
                        this._serverSubs[s].epoch && (i.epoch = this._serverSubs[s].epoch),
                        t[s] = i
                    }
                return n && (e.subs = t),
                {
                    connect: e
                }
            }
            _getHistoryRequest(e, t) {
                let n = {
                    channel: e
                };
                return t !== void 0 && (t.since && (n.since = {
                    offset: t.since.offset
                },
                t.since.epoch && (n.since.epoch = t.since.epoch)),
                t.limit !== void 0 && (n.limit = t.limit),
                t.reverse === !0 && (n.reverse = !0)),
                n
            }
            _methodCall() {
                return this._isConnected() ? Promise.resolve() : new Promise( (e, t) => {
                    let n = setTimeout(function() {
                        t({
                            code: w.timeout,
                            message: "timeout"
                        })
                    }, this._config.timeout);
                    this._promises[this._nextPromiseId()] = {
                        timeout: n,
                        resolve: e,
                        reject: t
                    }
                }
                )
            }
            _callPromise(e, t) {
                return new Promise( (n, s) => {
                    this._call(e, !1).then(i => {
                        n(t(i.reply)),
                        i.next && i.next()
                    }
                    , i => {
                        s(i.error),
                        i.next && i.next()
                    }
                    )
                }
                )
            }
            _dataReceived(e) {
                this._serverPing > 0 && this._waitServerPing();
                let t = this._decoder.decodeReplies(e);
                this._dispatchPromise = this._dispatchPromise.then( () => {
                    let n;
                    this._dispatchPromise = new Promise(s => {
                        n = s
                    }
                    ),
                    this._dispatchSynchronized(t, n)
                }
                )
            }
            _dispatchSynchronized(e, t) {
                let n = Promise.resolve();
                for (let s in e)
                    e.hasOwnProperty(s) && (n = n.then( () => this._dispatchReply(e[s])));
                n = n.then( () => {
                    t()
                }
                )
            }
            _dispatchReply(e) {
                let t, n = new Promise(i => {
                    t = i
                }
                );
                if (e == null)
                    return this._debug("dispatch: got undefined or null reply"),
                    t(),
                    n;
                let s = e.id;
                return s && s > 0 ? this._handleReply(e, t) : e.push ? this._handlePush(e.push, t) : this._handleServerPing(t),
                n
            }
            _call(e, t) {
                return new Promise( (n, s) => {
                    e.id = this._nextCommandId(),
                    this._registerCall(e.id, n, s),
                    t || this._addCommand(e)
                }
                )
            }
            _startConnecting() {
                this._debug("start connecting"),
                this._setState("connecting") && this.emit("connecting", {
                    code: N.connectCalled,
                    reason: "connect called"
                }),
                this._client = null,
                this._startReconnecting()
            }
            _disconnect(e, t, n) {
                if (this._isDisconnected())
                    return;
                let s = this.state
                  , i = {
                    code: e,
                    reason: t
                }
                  , o = !1;
                if (n ? o = this._setState("connecting") : (o = this._setState("disconnected"),
                this._rejectPromises({
                    code: w.clientDisconnected,
                    message: "disconnected"
                })),
                this._clearOutgoingRequests(),
                s === "connecting" && this._clearReconnectTimeout(),
                s === "connected" && this._clearConnectedState(),
                o && (this._isConnecting() ? this.emit("connecting", i) : this.emit("disconnected", i)),
                this._transport) {
                    this._debug("closing existing transport");
                    let u = this._transport;
                    this._transport = null,
                    u.close(),
                    this._transportClosed = !0,
                    this._nextTransportId()
                } else
                    this._debug("no transport to close");
                this._scheduleReconnect()
            }
            _failUnauthorized() {
                this._disconnect(K.unauthorized, "unauthorized", !1)
            }
            _getToken() {
                if (this._debug("get connection token"),
                !this._config.getToken)
                    throw this.emit("error", {
                        type: "configuration",
                        error: {
                            code: w.badConfiguration,
                            message: "token expired but no getToken function set in the configuration"
                        }
                    }),
                    new A("");
                return this._config.getToken({})
            }
            _refresh() {
                let e = this._client
                  , t = this;
                this._getToken().then(function(n) {
                    if (e !== t._client)
                        return;
                    if (!n) {
                        t._failUnauthorized();
                        return
                    }
                    if (t._token = n,
                    t._debug("connection token refreshed"),
                    !t._isConnected())
                        return;
                    let s = {
                        refresh: {
                            token: t._token
                        }
                    };
                    t._call(s, !1).then(i => {
                        let o = i.reply.refresh;
                        t._refreshResponse(o),
                        i.next && i.next()
                    }
                    , i => {
                        t._refreshError(i.error),
                        i.next && i.next()
                    }
                    )
                }).catch(function(n) {
                    if (t._isConnected()) {
                        if (n instanceof A) {
                            t._failUnauthorized();
                            return
                        }
                        t.emit("error", {
                            type: "refreshToken",
                            error: {
                                code: w.clientRefreshToken,
                                message: n !== void 0 ? n.toString() : ""
                            }
                        }),
                        t._refreshTimeout = setTimeout( () => t._refresh(), t._getRefreshRetryDelay())
                    }
                })
            }
            _refreshError(e) {
                e.code < 100 || e.temporary === !0 ? (this.emit("error", {
                    type: "refresh",
                    error: e
                }),
                this._refreshTimeout = setTimeout( () => this._refresh(), this._getRefreshRetryDelay())) : this._disconnect(e.code, e.message, !1)
            }
            _getRefreshRetryDelay() {
                return G(0, 5e3, 1e4)
            }
            _refreshResponse(e) {
                this._refreshTimeout && (clearTimeout(this._refreshTimeout),
                this._refreshTimeout = null),
                e.expires && (this._client = e.client,
                this._refreshTimeout = setTimeout( () => this._refresh(), q(e.ttl)))
            }
            _removeSubscription(e) {
                e !== null && delete this._subs[e.channel]
            }
            _unsubscribe(e) {
                if (!this._isConnected())
                    return;
                let t = {
                    unsubscribe: {
                        channel: e.channel
                    }
                }
                  , n = this;
                this._call(t, !1).then(s => {
                    s.next && s.next()
                }
                , s => {
                    s.next && s.next(),
                    n._disconnect(N.unsubscribeError, "unsubscribe error", !0)
                }
                )
            }
            _getSub(e) {
                return this._subs[e] || null
            }
            _isServerSub(e) {
                return this._serverSubs[e] !== void 0
            }
            _sendSubscribeCommands(e, t) {
                let n = [];
                for (let s in this._subs) {
                    if (!this._subs.hasOwnProperty(s))
                        continue;
                    let i = this._subs[s];
                    if (i._inflight !== !0 && i.state === "subscribing") {
                        let o = i._subscribe(e, t);
                        o && n.push(o)
                    }
                }
                return n
            }
            _connectResponse(e) {
                if (this._transportWasOpen = !0,
                this._reconnectAttempts = 0,
                this._refreshRequired = !1,
                this._isConnected())
                    return;
                this._client = e.client,
                this._setState("connected"),
                this._refreshTimeout && clearTimeout(this._refreshTimeout),
                e.expires && (this._refreshTimeout = setTimeout( () => this._refresh(), q(e.ttl))),
                this._session = e.session,
                this._node = e.node,
                this.startBatching(),
                this._sendSubscribeCommands(!1, !1),
                this.stopBatching();
                let t = {
                    client: e.client,
                    transport: this._transport.subName()
                };
                e.data && (t.data = e.data),
                this.emit("connected", t),
                this._resolvePromises(),
                this._processServerSubs(e.subs || {}),
                e.ping && e.ping > 0 ? (this._serverPing = e.ping * 1e3,
                this._sendPong = e.pong === !0,
                this._waitServerPing()) : this._serverPing = 0
            }
            _processServerSubs(e) {
                for (let t in e) {
                    if (!e.hasOwnProperty(t))
                        continue;
                    let n = e[t];
                    this._serverSubs[t] = {
                        offset: n.offset,
                        epoch: n.epoch,
                        recoverable: n.recoverable || !1
                    };
                    let s = this._getSubscribeContext(t, n);
                    this.emit("subscribed", s)
                }
                for (let t in e) {
                    if (!e.hasOwnProperty(t))
                        continue;
                    let n = e[t];
                    if (n.recovered) {
                        let s = n.publications;
                        if (s && s.length > 0)
                            for (let i in s)
                                s.hasOwnProperty(i) && this._handlePublication(t, s[i])
                    }
                }
                for (let t in this._serverSubs)
                    !this._serverSubs.hasOwnProperty(t) || e[t] || (this.emit("unsubscribed", {
                        channel: t
                    }),
                    delete this._serverSubs[t])
            }
            _clearRefreshTimeout() {
                this._refreshTimeout !== null && (clearTimeout(this._refreshTimeout),
                this._refreshTimeout = null)
            }
            _clearReconnectTimeout() {
                this._reconnectTimeout !== null && (clearTimeout(this._reconnectTimeout),
                this._reconnectTimeout = null)
            }
            _clearServerPingTimeout() {
                this._serverPingTimeout !== null && (clearTimeout(this._serverPingTimeout),
                this._serverPingTimeout = null)
            }
            _waitServerPing() {
                this._config.maxServerPingDelay !== 0 && (!this._isConnected() || (this._clearServerPingTimeout(),
                this._serverPingTimeout = setTimeout( () => {
                    !this._isConnected() || this._disconnect(N.noPing, "no ping", !0)
                }
                , this._serverPing + this._config.maxServerPingDelay)))
            }
            _getSubscribeContext(e, t) {
                let n = {
                    channel: e,
                    positioned: !1,
                    recoverable: !1,
                    wasRecovering: !1,
                    recovered: !1
                };
                t.recovered && (n.recovered = !0),
                t.positioned && (n.positioned = !0),
                t.recoverable && (n.recoverable = !0),
                t.was_recovering && (n.wasRecovering = !0);
                let s = "";
                "epoch"in t && (s = t.epoch);
                let i = 0;
                return "offset"in t && (i = t.offset),
                (n.positioned || n.recoverable) && (n.streamPosition = {
                    offset: i,
                    epoch: s
                }),
                t.data && (n.data = t.data),
                n
            }
            _handleReply(e, t) {
                let n = e.id;
                if (!(n in this._callbacks)) {
                    t();
                    return
                }
                let s = this._callbacks[n];
                if (clearTimeout(this._callbacks[n].timeout),
                delete this._callbacks[n],
                De(e)) {
                    let i = s.errback;
                    if (!i) {
                        t();
                        return
                    }
                    let o = e.error;
                    i({
                        error: o,
                        next: t
                    })
                } else {
                    let i = s.callback;
                    if (!i)
                        return;
                    i({
                        reply: e,
                        next: t
                    })
                }
            }
            _handleJoin(e, t) {
                let n = this._getSub(e);
                if (!n) {
                    if (this._isServerSub(e)) {
                        let s = {
                            channel: e,
                            info: this._getJoinLeaveContext(t.info)
                        };
                        this.emit("join", s)
                    }
                    return
                }
                n._handleJoin(t)
            }
            _handleLeave(e, t) {
                let n = this._getSub(e);
                if (!n) {
                    if (this._isServerSub(e)) {
                        let s = {
                            channel: e,
                            info: this._getJoinLeaveContext(t.info)
                        };
                        this.emit("leave", s)
                    }
                    return
                }
                n._handleLeave(t)
            }
            _handleUnsubscribe(e, t) {
                let n = this._getSub(e);
                if (!n) {
                    this._isServerSub(e) && (delete this._serverSubs[e],
                    this.emit("unsubscribed", {
                        channel: e
                    }));
                    return
                }
                t.code < 2500 ? n._setUnsubscribed(t.code, t.reason, !1) : n._setSubscribing(t.code, t.reason)
            }
            _handleSubscribe(e, t) {
                this._serverSubs[e] = {
                    offset: t.offset,
                    epoch: t.epoch,
                    recoverable: t.recoverable || !1
                },
                this.emit("subscribed", this._getSubscribeContext(e, t))
            }
            _handleDisconnect(e) {
                let t = e.code
                  , n = !0;
                (t >= 3500 && t < 4e3 || t >= 4500 && t < 5e3) && (n = !1),
                this._disconnect(t, e.reason, n)
            }
            _getPublicationContext(e, t) {
                let n = {
                    channel: e,
                    data: t.data
                };
                return t.offset && (n.offset = t.offset),
                t.info && (n.info = this._getJoinLeaveContext(t.info)),
                t.tags && (n.tags = t.tags),
                n
            }
            _getJoinLeaveContext(e) {
                let t = {
                    client: e.client,
                    user: e.user
                };
                return e.conn_info && (t.connInfo = e.conn_info),
                e.chan_info && (t.chanInfo = e.chan_info),
                t
            }
            _handlePublication(e, t) {
                let n = this._getSub(e);
                if (!n) {
                    if (this._isServerSub(e)) {
                        let s = this._getPublicationContext(e, t);
                        this.emit("publication", s),
                        t.offset !== void 0 && (this._serverSubs[e].offset = t.offset)
                    }
                    return
                }
                n._handlePublication(t)
            }
            _handleMessage(e) {
                this.emit("message", {
                    data: e.data
                })
            }
            _handleServerPing(e) {
                if (this._sendPong) {
                    let t = {};
                    this._transportSendCommands([t])
                }
                e()
            }
            _handlePush(e, t) {
                let n = e.channel;
                e.pub ? this._handlePublication(n, e.pub) : e.message ? this._handleMessage(e.message) : e.join ? this._handleJoin(n, e.join) : e.leave ? this._handleLeave(n, e.leave) : e.unsubscribe ? this._handleUnsubscribe(n, e.unsubscribe) : e.subscribe ? this._handleSubscribe(n, e.subscribe) : e.disconnect && this._handleDisconnect(e.disconnect),
                t()
            }
            _flush() {
                let e = this._commands.slice(0);
                this._commands = [],
                this._transportSendCommands(e)
            }
            _createErrorObject(e, t, n) {
                let s = {
                    code: e,
                    message: t
                };
                return n && (s.temporary = !0),
                s
            }
            _registerCall(e, t, n) {
                this._callbacks[e] = {
                    callback: t,
                    errback: n,
                    timeout: null
                },
                this._callbacks[e].timeout = setTimeout( () => {
                    delete this._callbacks[e],
                    _e(n) && n({
                        error: this._createErrorObject(w.timeout, "timeout")
                    })
                }
                , this._config.timeout)
            }
            _addCommand(e) {
                this._batching ? this._commands.push(e) : this._transportSendCommands([e])
            }
            _nextPromiseId() {
                return ++this._promiseId
            }
            _nextTransportId() {
                return ++this._transportId
            }
            _resolvePromises() {
                for (let e in this._promises)
                    this._promises[e].timeout && clearTimeout(this._promises[e].timeout),
                    this._promises[e].resolve(),
                    delete this._promises[e]
            }
            _rejectPromises(e) {
                for (let t in this._promises)
                    this._promises[t].timeout && clearTimeout(this._promises[t].timeout),
                    this._promises[t].reject(e),
                    delete this._promises[t]
            }
        }
        ;
        H.SubscriptionState = de,
        H.State = ue,
        H.UnauthorizedError = A,
        globalThis.Centrifuge = H
    }
    )();
    let R, Z = "", V = "", U = "", X = "", D = "", M = "", Q = !1, ee = !1, z = !1;
    const te = () => Z
      , ne = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Brand-Id": ""
    }
      , ye = async () => (await fetch(`${te()}/aviatrix.gateway.session.v1.ApiService/GetWsTokenDemo`, {
        headers: {
            ...ne,
            Authorization: `Bearer ${X}`
        },
        method: "POST",
        body: "{}"
    })).json()
      , Te = async () => (await fetch(`${te()}/aviatrix.gateway.session.v1.ApiService/GetWsToken`, {
        headers: {
            ...ne,
            Authorization: `Bearer ${X}`
        },
        method: "POST",
        body: "{}"
    })).json()
      , y = (h, m) => {
        console.log(`[REALTIME] [${new Date().toISOString()}] ${h}`, m)
    }
      , se = async h => {
        const m = Q ? ye : Te;
        let b = "";
        try {
            const {token: _, userChannel: C} = await m();
            D = _,
            M = C,
            b = D,
            h && y("refresh token success", D)
        } catch (_) {
            if (h)
                throw y("refresh token error", _),
                new Error("UNAUTH ERROR")
        }
        return b
    }
      , ie = () => {
        ee || (ee = !0,
        ke(),
        Ee())
    }
      , B = () => {
        if (!V)
            throw new Error("wsUrl must be set");
        if (!D)
            throw new Error("wsToken must be set");
        return R || (R = new self.Centrifuge(V,{
            debug: !0,
            token: D,
            getToken: se,
            maxServerPingDelay: 3e4
        }),
        R.on("connecting", h => {
            self.postMessage({
                type: "connection",
                payload: {
                    isConnected: !1
                }
            }),
            y("connecting", h)
        }
        ),
        R.on("connected", h => {
            self.postMessage({
                type: "connection",
                payload: {
                    isConnected: !0
                }
            }),
            y("connected", h)
        }
        ),
        R.on("disconnected", h => {
            self.postMessage({
                type: "connection",
                payload: {
                    isConnected: !1
                }
            }),
            y("disconnected", h)
        }
        ),
        R.on("error", h => {
            y("error", h)
        }
        ),
        R.connect(),
        R)
    }
      , Se = () => {
        const h = B();
        let m = !1;
        if (h.subscriptions()[$]) {
            const _ = h.getSubscription($);
            return _?.subscribe(),
            _
        }
        const b = h.newSubscription($, {
            maxResubscribeDelay: 2e3
        }).on("publication", ({data: _={}}) => {
            const C = _.state
              , O = _;
            C !== ge.PLAYING && y(C, O),
            self.postMessage({
                type: "gameEvent",
                event: C,
                payload: O
            })
        }
        );
        return b.subscribe(),
        b.on("subscribing", _ => {
            self.postMessage({
                type: "reconnecting"
            }),
            y("subscribing", _)
        }
        ),
        b.on("subscribed", _ => {
            self.postMessage({
                type: "reconnect"
            }),
            y("subscription subscribed", _)
        }
        ),
        b.on("unsubscribed", _ => {
            y("subscription unsubscribed", _)
        }
        ),
        b.on("error", _ => {
            y("subscription error", _)
        }
        ),
        R.on("connecting", _ => {
            m = !0,
            self.postMessage({
                type: "reconnecting"
            }),
            y("connecting", _)
        }
        ),
        R.on("connected", () => {
            m && (self.postMessage({
                type: "reconnect"
            }),
            m = !1)
        }
        ),
        R.on("disconnected", () => {
            m = !0,
            self.postMessage({
                type: "disconnect"
            })
        }
        ),
        R.on("error", _ => {
            y("error", _)
        }
        ),
        b
    }
      , we = () => {
        const h = B()
          , m = h.getSubscription(M) || h.newSubscription(M, {
            maxResubscribeDelay: 2e3
        }).on("publication", ({data: b={}}) => {
            const _ = Object.keys(b || {}) || []
              , C = _[0];
            if (_ && C) {
                const O = b[C];
                y(C, O),
                self.postMessage({
                    type: "bettingEvent",
                    event: C,
                    payload: O
                })
            }
        }
        );
        return m.subscribe(),
        m.on("subscribed", b => {
            y("subscription subscribed", b)
        }
        ),
        m.on("unsubscribed", b => {
            y("subscription unsubscribed", b)
        }
        ),
        m
    }
      , Ee = () => {
        const h = B()
          , m = z ? ve : me
          , b = h.getSubscription(m) || h.newSubscription(m, {
            maxResubscribeDelay: 2e3
        }).on("publication", ({data: _={}}) => {
            const O = (Object.keys(_ || {}) || [])[0]
              , W = _[O];
            y(O, W),
            self.postMessage({
                type: "bettingEvent",
                event: O,
                payload: W
            })
        }
        );
        return b.subscribe(),
        b.on("subscribed", _ => {
            self.postMessage({
                type: "reconnect"
            }),
            y("subscription subscribed", _)
        }
        ),
        b.on("unsubscribed", _ => {
            y("subscription unsubscribed", _)
        }
        ),
        b
    }
      , ke = () => {
        const h = B()
          , m = h.getSubscription(U) || h.newSubscription(U, {
            maxResubscribeDelay: 2e3
        }).on("publication", ({data: b={}}) => {
            const C = (Object.keys(b || {}) || [])[0]
              , O = b[C];
            y(C, O),
            self.postMessage({
                type: "bettingEvent",
                event: C,
                payload: O
            })
        }
        );
        return m.subscribe(),
        m.on("subscribed", b => {
            self.postMessage({
                type: "reconnect"
            }),
            y("subscription subscribed", b)
        }
        ),
        m.on("unsubscribed", b => {
            y("subscription unsubscribed", b)
        }
        ),
        m
    }
    ;
    self.onmessage = async h => {
        switch (h.data?.type) {
        case "init":
            Z = h.data?.payload?.apiUrl,
            V = h.data?.payload?.wsUrl,
            X = h.data?.payload?.sessionToken,
            Q = h.data?.payload?.isDemo,
            z = h.data?.payload?.isAnonymizingNames,
            D = h.data?.payload?.wsTokenData?.token,
            M = h.data?.payload?.wsTokenData?.userChannel;
            try {
                (!D || !M) && await se(),
                Se(),
                we(),
                (U || z) && ie()
            } catch (b) {
                console.error("[Realtime]", b),
                R && R.disconnect(),
                self.postMessage({
                    type: "error",
                    payload: {
                        message: "init failed"
                    }
                })
            }
            break;
        case "game-config-loaded":
            U = h.data?.payload?.assetsChannel,
            z = h.data?.payload?.isAnonymizingNames,
            (U || z) && D && ie();
            break;
        case "stop":
            R && R.disconnect();
            break
        }
    }
}
)();
//# sourceMappingURL=realtime.worker-568c4aef.js.map
