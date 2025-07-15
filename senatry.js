import {i as ds, l as _, g as Y, a as lt, b as Gt, t as Yt, d as pt, D as Zn, c as qn, e as us, f as fs, p as hs, h as _s, j as ps, k as ms, m as gs, F as Vn, I as Xn, B as Kn, q as Jn, G as Qn, H as ti, L as ei, T as ni, r as qe, s as ys, v as ii, w as Ft, x as si, y as ri, z as Ve, S as Xe, A as dt, C as ai, E as Es, J as bs, K as Ss, M as oi, N as hn, O as ws, P as vs, Q as Ts, W as q, R as Rs, U as ks, V as xs, X as Ns, Y as Ds, Z as Is, _ as As, $ as Cs, a0 as Os, a1 as Bs, a2 as Us, a3 as Ls, a4 as Ms, a5 as zs, a6 as Ps, a7 as Gs, a8 as Ys, a9 as Fs, aa as Hs, ab as $s, ac as Ws, ad as js, ae as Zs, af as ci, ag as qs, ah as Vs, ai as Xs, aj as Ks, ak as Js, al as Qs, am as tr, an as er, ao as nr, ap as ir, aq as sr, ar as rr, as as ar, at as or, au as cr, av as lr, aw as dr, ax as Re, ay as ur, az as fr} from "./index-94e4078a.js";
import {Y as hr, X as _r, k as pr} from "./game-725de4f9.js";
const mr = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
function li(t) {
    const e = t.match(mr);
    if (!t || !e)
        return;
    let n;
    return e[3] === "1" ? n = !0 : e[3] === "0" && (n = !1),
    {
        traceId: e[1],
        parentSampled: n,
        parentSpanId: e[2]
    }
}
const Ie = "baggage"
  , di = "sentry-"
  , gr = /^sentry-/
  , yr = 8192;
function Er(t) {
    if (!ds(t) && !Array.isArray(t))
        return;
    let e = {};
    if (Array.isArray(t))
        e = t.reduce( (i, s) => {
            const r = _n(s);
            return {
                ...i,
                ...r
            }
        }
        , {});
    else {
        if (!t)
            return;
        e = _n(t)
    }
    const n = Object.entries(e).reduce( (i, [s,r]) => {
        if (s.match(gr)) {
            const o = s.slice(di.length);
            i[o] = r
        }
        return i
    }
    , {});
    if (Object.keys(n).length > 0)
        return n
}
function ui(t) {
    const e = Object.entries(t).reduce( (n, [i,s]) => (s && (n[`${di}${i}`] = s),
    n), {});
    return br(e)
}
function _n(t) {
    return t.split(",").map(e => e.split("=").map(n => decodeURIComponent(n.trim()))).reduce( (e, [n,i]) => (e[n] = i,
    e), {})
}
function br(t) {
    if (Object.keys(t).length !== 0)
        return Object.entries(t).reduce( (e, [n,i], s) => {
            const r = `${encodeURIComponent(n)}=${encodeURIComponent(i)}`
              , o = s === 0 ? r : `${e},${r}`;
            return o.length > yr ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`Not adding key: ${n} with val: ${i} to baggage header due to exceeding baggage size limits.`),
            e) : o
        }
        , "")
}
function Ke(t) {
    if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
        return !1;
    const e = Y().getClient()
      , n = t || e && e.getOptions();
    return !!n && (n.enableTracing || "tracesSampleRate"in n || "tracesSampler"in n)
}
function At(t) {
    return (t || Y()).getScope().getTransaction()
}
let pn = !1;
function Sr() {
    pn || (pn = !0,
    lt("error", Ae),
    lt("unhandledrejection", Ae))
}
function Ae() {
    const t = At();
    if (t) {
        const e = "internal_error";
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Transaction: ${e} -> Global error occured`),
        t.setStatus(e)
    }
}
Ae.tag = "sentry_tracingErrorCallback";
class pe {
    __init() {
        this.spans = []
    }
    constructor(e=1e3) {
        pe.prototype.__init.call(this),
        this._maxlen = e
    }
    add(e) {
        this.spans.length > this._maxlen ? e.spanRecorder = void 0 : this.spans.push(e)
    }
}
class at {
    __init2() {
        this.traceId = Gt()
    }
    __init3() {
        this.spanId = Gt().substring(16)
    }
    __init4() {
        this.startTimestamp = Yt()
    }
    __init5() {
        this.tags = {}
    }
    __init6() {
        this.data = {}
    }
    __init7() {
        this.instrumenter = "sentry"
    }
    constructor(e) {
        if (at.prototype.__init2.call(this),
        at.prototype.__init3.call(this),
        at.prototype.__init4.call(this),
        at.prototype.__init5.call(this),
        at.prototype.__init6.call(this),
        at.prototype.__init7.call(this),
        !e)
            return this;
        e.traceId && (this.traceId = e.traceId),
        e.spanId && (this.spanId = e.spanId),
        e.parentSpanId && (this.parentSpanId = e.parentSpanId),
        "sampled"in e && (this.sampled = e.sampled),
        e.op && (this.op = e.op),
        e.description && (this.description = e.description),
        e.data && (this.data = e.data),
        e.tags && (this.tags = e.tags),
        e.status && (this.status = e.status),
        e.startTimestamp && (this.startTimestamp = e.startTimestamp),
        e.endTimestamp && (this.endTimestamp = e.endTimestamp),
        e.instrumenter && (this.instrumenter = e.instrumenter)
    }
    startChild(e) {
        const n = new at({
            ...e,
            parentSpanId: this.spanId,
            sampled: this.sampled,
            traceId: this.traceId
        });
        if (n.spanRecorder = this.spanRecorder,
        n.spanRecorder && n.spanRecorder.add(n),
        n.transaction = this.transaction,
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && n.transaction) {
            const i = e && e.op || "< unknown op >"
              , s = n.transaction.name || "< unknown name >"
              , r = n.transaction.spanId
              , o = `[Tracing] Starting '${i}' span on transaction '${s}' (${r}).`;
            n.transaction.metadata.spanMetadata[n.spanId] = {
                logMessage: o
            },
            _.log(o)
        }
        return n
    }
    setTag(e, n) {
        return this.tags = {
            ...this.tags,
            [e]: n
        },
        this
    }
    setData(e, n) {
        return this.data = {
            ...this.data,
            [e]: n
        },
        this
    }
    setStatus(e) {
        return this.status = e,
        this
    }
    setHttpStatus(e) {
        this.setTag("http.status_code", String(e));
        const n = fi(e);
        return n !== "unknown_error" && this.setStatus(n),
        this
    }
    isSuccess() {
        return this.status === "ok"
    }
    finish(e) {
        if ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && this.transaction && this.transaction.spanId !== this.spanId) {
            const {logMessage: n} = this.transaction.metadata.spanMetadata[this.spanId];
            n && _.log(n.replace("Starting", "Finishing"))
        }
        this.endTimestamp = typeof e == "number" ? e : Yt()
    }
    toTraceparent() {
        let e = "";
        return this.sampled !== void 0 && (e = this.sampled ? "-1" : "-0"),
        `${this.traceId}-${this.spanId}${e}`
    }
    toContext() {
        return pt({
            data: this.data,
            description: this.description,
            endTimestamp: this.endTimestamp,
            op: this.op,
            parentSpanId: this.parentSpanId,
            sampled: this.sampled,
            spanId: this.spanId,
            startTimestamp: this.startTimestamp,
            status: this.status,
            tags: this.tags,
            traceId: this.traceId
        })
    }
    updateWithContext(e) {
        return this.data = e.data || {},
        this.description = e.description,
        this.endTimestamp = e.endTimestamp,
        this.op = e.op,
        this.parentSpanId = e.parentSpanId,
        this.sampled = e.sampled,
        this.spanId = e.spanId || this.spanId,
        this.startTimestamp = e.startTimestamp || this.startTimestamp,
        this.status = e.status,
        this.tags = e.tags || {},
        this.traceId = e.traceId || this.traceId,
        this
    }
    getTraceContext() {
        return pt({
            data: Object.keys(this.data).length > 0 ? this.data : void 0,
            description: this.description,
            op: this.op,
            parent_span_id: this.parentSpanId,
            span_id: this.spanId,
            status: this.status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
            trace_id: this.traceId
        })
    }
    toJSON() {
        return pt({
            data: Object.keys(this.data).length > 0 ? this.data : void 0,
            description: this.description,
            op: this.op,
            parent_span_id: this.parentSpanId,
            span_id: this.spanId,
            start_timestamp: this.startTimestamp,
            status: this.status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
            timestamp: this.endTimestamp,
            trace_id: this.traceId
        })
    }
}
function fi(t) {
    if (t < 400 && t >= 100)
        return "ok";
    if (t >= 400 && t < 500)
        switch (t) {
        case 401:
            return "unauthenticated";
        case 403:
            return "permission_denied";
        case 404:
            return "not_found";
        case 409:
            return "already_exists";
        case 413:
            return "failed_precondition";
        case 429:
            return "resource_exhausted";
        default:
            return "invalid_argument"
        }
    if (t >= 500 && t < 600)
        switch (t) {
        case 501:
            return "unimplemented";
        case 503:
            return "unavailable";
        case 504:
            return "deadline_exceeded";
        default:
            return "internal_error"
        }
    return "unknown_error"
}
class vt extends at {
    __init() {
        this._measurements = {}
    }
    __init2() {
        this._contexts = {}
    }
    __init3() {
        this._frozenDynamicSamplingContext = void 0
    }
    constructor(e, n) {
        super(e),
        vt.prototype.__init.call(this),
        vt.prototype.__init2.call(this),
        vt.prototype.__init3.call(this),
        this._hub = n || Y(),
        this._name = e.name || "",
        this.metadata = {
            source: "custom",
            ...e.metadata,
            spanMetadata: {}
        },
        this._trimEnd = e.trimEnd,
        this.transaction = this;
        const i = this.metadata.dynamicSamplingContext;
        i && (this._frozenDynamicSamplingContext = {
            ...i
        })
    }
    get name() {
        return this._name
    }
    set name(e) {
        this.setName(e)
    }
    setName(e, n="custom") {
        this._name = e,
        this.metadata.source = n
    }
    initSpanRecorder(e=1e3) {
        this.spanRecorder || (this.spanRecorder = new pe(e)),
        this.spanRecorder.add(this)
    }
    setContext(e, n) {
        n === null ? delete this._contexts[e] : this._contexts[e] = n
    }
    setMeasurement(e, n, i="") {
        this._measurements[e] = {
            value: n,
            unit: i
        }
    }
    setMetadata(e) {
        this.metadata = {
            ...this.metadata,
            ...e
        }
    }
    finish(e) {
        if (this.endTimestamp !== void 0)
            return;
        this.name || ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
        this.name = "<unlabeled transaction>"),
        super.finish(e);
        const n = this._hub.getClient();
        if (n && n.emit && n.emit("finishTransaction", this),
        this.sampled !== !0) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),
            n && n.recordDroppedEvent("sample_rate", "transaction");
            return
        }
        const i = this.spanRecorder ? this.spanRecorder.spans.filter(a => a !== this && a.endTimestamp) : [];
        this._trimEnd && i.length > 0 && (this.endTimestamp = i.reduce( (a, c) => a.endTimestamp && c.endTimestamp ? a.endTimestamp > c.endTimestamp ? a : c : a).endTimestamp);
        const s = this.metadata
          , r = {
            contexts: {
                ...this._contexts,
                trace: this.getTraceContext()
            },
            spans: i,
            start_timestamp: this.startTimestamp,
            tags: this.tags,
            timestamp: this.endTimestamp,
            transaction: this.name,
            type: "transaction",
            sdkProcessingMetadata: {
                ...s,
                dynamicSamplingContext: this.getDynamicSamplingContext()
            },
            ...s.source && {
                transaction_info: {
                    source: s.source
                }
            }
        };
        return Object.keys(this._measurements).length > 0 && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)),
        r.measurements = this._measurements),
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`),
        this._hub.captureEvent(r)
    }
    toContext() {
        const e = super.toContext();
        return pt({
            ...e,
            name: this.name,
            trimEnd: this._trimEnd
        })
    }
    updateWithContext(e) {
        return super.updateWithContext(e),
        this.name = e.name || "",
        this._trimEnd = e.trimEnd,
        this
    }
    getDynamicSamplingContext() {
        if (this._frozenDynamicSamplingContext)
            return this._frozenDynamicSamplingContext;
        const e = this._hub || Y()
          , n = e && e.getClient();
        if (!n)
            return {};
        const {environment: i, release: s} = n.getOptions() || {}
          , {publicKey: r} = n.getDsn() || {}
          , o = this.metadata.sampleRate
          , a = o !== void 0 ? o.toString() : void 0
          , {segment: c} = e.getScope().getUser() || {}
          , l = this.metadata.source
          , d = l && l !== "url" ? this.name : void 0
          , u = pt({
            environment: i || Zn,
            release: s,
            transaction: d,
            user_segment: c,
            public_key: r,
            trace_id: this.traceId,
            sample_rate: a
        });
        return n.emit && n.emit("createDsc", u),
        u
    }
    setHub(e) {
        this._hub = e
    }
}
const ie = {
    idleTimeout: 1e3,
    finalTimeout: 3e4,
    heartbeatInterval: 5e3
}
  , wr = "finishReason"
  , yt = ["heartbeatFailed", "idleTimeout", "documentHidden", "finalTimeout", "externalFinish", "cancelled"];
class vr extends pe {
    constructor(e, n, i, s) {
        super(s),
        this._pushActivity = e,
        this._popActivity = n,
        this.transactionSpanId = i
    }
    add(e) {
        e.spanId !== this.transactionSpanId && (e.finish = n => {
            e.endTimestamp = typeof n == "number" ? n : Yt(),
            this._popActivity(e.spanId)
        }
        ,
        e.endTimestamp === void 0 && this._pushActivity(e.spanId)),
        super.add(e)
    }
}
class ft extends vt {
    __init() {
        this.activities = {}
    }
    __init2() {
        this._heartbeatCounter = 0
    }
    __init3() {
        this._finished = !1
    }
    __init4() {
        this._idleTimeoutCanceledPermanently = !1
    }
    __init5() {
        this._beforeFinishCallbacks = []
    }
    __init6() {
        this._finishReason = yt[4]
    }
    constructor(e, n, i=ie.idleTimeout, s=ie.finalTimeout, r=ie.heartbeatInterval, o=!1) {
        super(e, n),
        this._idleHub = n,
        this._idleTimeout = i,
        this._finalTimeout = s,
        this._heartbeatInterval = r,
        this._onScope = o,
        ft.prototype.__init.call(this),
        ft.prototype.__init2.call(this),
        ft.prototype.__init3.call(this),
        ft.prototype.__init4.call(this),
        ft.prototype.__init5.call(this),
        ft.prototype.__init6.call(this),
        o && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`),
        n.configureScope(a => a.setSpan(this))),
        this._restartIdleTimeout(),
        setTimeout( () => {
            this._finished || (this.setStatus("deadline_exceeded"),
            this._finishReason = yt[3],
            this.finish())
        }
        , this._finalTimeout)
    }
    finish(e=Yt()) {
        if (this._finished = !0,
        this.activities = {},
        this.op === "ui.action.click" && this.setTag(wr, this._finishReason),
        this.spanRecorder) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] finishing IdleTransaction", new Date(e * 1e3).toISOString(), this.op);
            for (const n of this._beforeFinishCallbacks)
                n(this, e);
            this.spanRecorder.spans = this.spanRecorder.spans.filter(n => {
                if (n.spanId === this.spanId)
                    return !0;
                n.endTimestamp || (n.endTimestamp = e,
                n.setStatus("cancelled"),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] cancelling span since transaction ended early", JSON.stringify(n, void 0, 2)));
                const i = n.startTimestamp < e;
                return i || (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] discarding Span since it happened after Transaction was finished", JSON.stringify(n, void 0, 2)),
                i
            }
            ),
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] flushing IdleTransaction")
        } else
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] No active IdleTransaction");
        if (this._onScope) {
            const n = this._idleHub.getScope();
            n.getTransaction() === this && n.setSpan(void 0)
        }
        return super.finish(e)
    }
    registerBeforeFinishCallback(e) {
        this._beforeFinishCallbacks.push(e)
    }
    initSpanRecorder(e) {
        if (!this.spanRecorder) {
            const n = s => {
                this._finished || this._pushActivity(s)
            }
              , i = s => {
                this._finished || this._popActivity(s)
            }
            ;
            this.spanRecorder = new vr(n,i,this.spanId,e),
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("Starting heartbeat"),
            this._pingHeartbeat()
        }
        this.spanRecorder.add(this)
    }
    cancelIdleTimeout(e, {restartOnChildSpanChange: n}={
        restartOnChildSpanChange: !0
    }) {
        this._idleTimeoutCanceledPermanently = n === !1,
        this._idleTimeoutID && (clearTimeout(this._idleTimeoutID),
        this._idleTimeoutID = void 0,
        Object.keys(this.activities).length === 0 && this._idleTimeoutCanceledPermanently && (this._finishReason = yt[5],
        this.finish(e)))
    }
    setFinishReason(e) {
        this._finishReason = e
    }
    _restartIdleTimeout(e) {
        this.cancelIdleTimeout(),
        this._idleTimeoutID = setTimeout( () => {
            !this._finished && Object.keys(this.activities).length === 0 && (this._finishReason = yt[1],
            this.finish(e))
        }
        , this._idleTimeout)
    }
    _pushActivity(e) {
        this.cancelIdleTimeout(void 0, {
            restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently
        }),
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] pushActivity: ${e}`),
        this.activities[e] = !0,
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] new activities count", Object.keys(this.activities).length)
    }
    _popActivity(e) {
        if (this.activities[e] && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] popActivity ${e}`),
        delete this.activities[e],
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] new activities count", Object.keys(this.activities).length)),
        Object.keys(this.activities).length === 0) {
            const n = Yt();
            this._idleTimeoutCanceledPermanently ? (this._finishReason = yt[5],
            this.finish(n)) : this._restartIdleTimeout(n + this._idleTimeout / 1e3)
        }
    }
    _beat() {
        if (this._finished)
            return;
        const e = Object.keys(this.activities).join("");
        e === this._prevHeartbeatString ? this._heartbeatCounter++ : this._heartbeatCounter = 1,
        this._prevHeartbeatString = e,
        this._heartbeatCounter >= 3 ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] Transaction finished because of no change for 3 heart beats"),
        this.setStatus("deadline_exceeded"),
        this._finishReason = yt[0],
        this.finish()) : this._pingHeartbeat()
    }
    _pingHeartbeat() {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`),
        setTimeout( () => {
            this._beat()
        }
        , this._heartbeatInterval)
    }
}
function Tr() {
    const e = this.getScope().getSpan();
    return e ? {
        "sentry-trace": e.toTraceparent()
    } : {}
}
function hi(t, e, n) {
    if (!Ke(e))
        return t.sampled = !1,
        t;
    if (t.sampled !== void 0)
        return t.setMetadata({
            sampleRate: Number(t.sampled)
        }),
        t;
    let i;
    return typeof e.tracesSampler == "function" ? (i = e.tracesSampler(n),
    t.setMetadata({
        sampleRate: Number(i)
    })) : n.parentSampled !== void 0 ? i = n.parentSampled : typeof e.tracesSampleRate < "u" ? (i = e.tracesSampleRate,
    t.setMetadata({
        sampleRate: Number(i)
    })) : (i = 1,
    t.setMetadata({
        sampleRate: i
    })),
    Rr(i) ? i ? (t.sampled = Math.random() < i,
    t.sampled ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] starting ${t.op} transaction - ${t.name}`),
    t) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(i)})`),
    t)) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Discarding transaction because ${typeof e.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`),
    t.sampled = !1,
    t) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("[Tracing] Discarding transaction because of invalid sample rate."),
    t.sampled = !1,
    t)
}
function Rr(t) {
    return us(t) || !(typeof t == "number" || typeof t == "boolean") ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(t)} of type ${JSON.stringify(typeof t)}.`),
    !1) : t < 0 || t > 1 ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${t}.`),
    !1) : !0
}
function kr(t, e) {
    const n = this.getClient()
      , i = n && n.getOptions() || {}
      , s = i.instrumenter || "sentry"
      , r = t.instrumenter || "sentry";
    s !== r && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error(`A transaction was started with instrumenter=\`${r}\`, but the SDK is configured with the \`${s}\` instrumenter.
The transaction will not be sampled. Please use the ${s} instrumentation to start transactions.`),
    t.sampled = !1);
    let o = new vt(t,this);
    return o = hi(o, i, {
        parentSampled: t.parentSampled,
        transactionContext: t,
        ...e
    }),
    o.sampled && o.initSpanRecorder(i._experiments && i._experiments.maxSpans),
    n && n.emit && n.emit("startTransaction", o),
    o
}
function mn(t, e, n, i, s, r, o) {
    const a = t.getClient()
      , c = a && a.getOptions() || {};
    let l = new ft(e,t,n,i,o,s);
    return l = hi(l, c, {
        parentSampled: e.parentSampled,
        transactionContext: e,
        ...r
    }),
    l.sampled && l.initSpanRecorder(c._experiments && c._experiments.maxSpans),
    a && a.emit && a.emit("startTransaction", l),
    l
}
function _i() {
    const t = qn();
    t.__SENTRY__ && (t.__SENTRY__.extensions = t.__SENTRY__.extensions || {},
    t.__SENTRY__.extensions.startTransaction || (t.__SENTRY__.extensions.startTransaction = kr),
    t.__SENTRY__.extensions.traceHeaders || (t.__SENTRY__.extensions.traceHeaders = Tr),
    Sr())
}
function xr(t, e, n= () => {}
) {
    const i = {
        ...t
    };
    i.name !== void 0 && i.description === void 0 && (i.description = i.name);
    const s = Y()
      , r = s.getScope()
      , o = r.getSpan()
      , a = o ? o.startChild(i) : s.startTransaction(i);
    r.setSpan(a);
    function c() {
        a && a.finish(),
        s.getScope().setSpan(o)
    }
    let l;
    try {
        l = e(a)
    } catch (d) {
        throw a && a.setStatus("internal_error"),
        n(d),
        c(),
        d
    }
    return fs(l) ? Promise.resolve(l).then( () => {
        c()
    }
    , d => {
        a && a.setStatus("internal_error"),
        n(d),
        c()
    }
    ) : c(),
    l
}
const Nr = 100
  , gn = 5e3
  , Dr = 36e5;
function ke(t, e) {
    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.info(`[Offline]: ${t}`, e)
}
function Ir(t) {
    return e => {
        const n = t(e)
          , i = e.createStore ? e.createStore(e) : void 0;
        let s = gn, r;
        function o(d, u, h) {
            return _s(d, ["replay_event", "replay_recording", "client_report"]) ? !1 : e.shouldStore ? e.shouldStore(d, u, h) : !0
        }
        function a(d) {
            i && (r && clearTimeout(r),
            r = setTimeout(async () => {
                r = void 0;
                const u = await i.pop();
                u && (ke("Attempting to send previously queued event"),
                l(u).catch(h => {
                    ke("Failed to retry sending", h)
                }
                ))
            }
            , d),
            typeof r != "number" && r.unref && r.unref())
        }
        function c() {
            r || (a(s),
            s = Math.min(s * 2, Dr))
        }
        async function l(d) {
            try {
                const u = await n.send(d);
                let h = Nr;
                if (u) {
                    if (u.headers && u.headers["retry-after"])
                        h = hs(u.headers["retry-after"]);
                    else if ((u.statusCode || 0) >= 400)
                        return u
                }
                return a(h),
                s = gn,
                u
            } catch (u) {
                if (i && await o(d, u, s))
                    return await i.insert(d),
                    c(),
                    ke("Error sending. Event queued", u),
                    {};
                throw u
            }
        }
        return e.flushAtStartup && c(),
        {
            send: l,
            flush: d => n.flush(d)
        }
    }
}
function Ar(t, e) {
    let n;
    return gs(t, (i, s) => (e.includes(s) && (n = Array.isArray(i) ? i[1] : void 0),
    !!n)),
    n
}
function Cr(t, e) {
    return n => {
        const i = t(n)
          , s = {};
        function r(c) {
            if (!s[c]) {
                const l = ps(c);
                if (!l)
                    return;
                const d = ms(l);
                s[c] = t({
                    ...n,
                    url: d
                })
            }
            return s[c]
        }
        async function o(c) {
            function l(h) {
                const f = h && h.length ? h : ["event"];
                return Ar(c, f)
            }
            const d = e({
                envelope: c,
                getEvent: l
            }).map(h => r(h)).filter(h => !!h);
            return d.length === 0 && d.push(i),
            (await Promise.all(d.map(h => h.send(c))))[0]
        }
        async function a(c) {
            const l = [...Object.keys(s).map(u => s[u]), i];
            return (await Promise.all(l.map(u => u.flush(c)))).every(u => u)
        }
        return {
            send: o,
            flush: a
        }
    }
}
const Or = Object.freeze(Object.defineProperty({
    __proto__: null,
    FunctionToString: Vn,
    InboundFilters: Xn
}, Symbol.toStringTag, {
    value: "Module"
}))
  , Br = Object.freeze(Object.defineProperty({
    __proto__: null,
    Breadcrumbs: Kn,
    Dedupe: Jn,
    GlobalHandlers: Qn,
    HttpContext: ti,
    LinkedErrors: ei,
    TryCatch: ni
}, Symbol.toStringTag, {
    value: "Module"
}))
  , k = ii
  , Je = "sentryReplaySession"
  , Ur = "replay_event"
  , Qe = "Unable to send Replay"
  , Lr = 3e5
  , Mr = 9e5
  , zr = 36e5
  , Pr = 5e3
  , Gr = 5500
  , Yr = 6e4
  , Fr = 5e3
  , Hr = 3
  , Kt = 15e4
  , Jt = 5e3
  , $r = 3e3
  , Wr = 300;
var W;
(function(t) {
    t[t.Document = 0] = "Document",
    t[t.DocumentType = 1] = "DocumentType",
    t[t.Element = 2] = "Element",
    t[t.Text = 3] = "Text",
    t[t.CDATA = 4] = "CDATA",
    t[t.Comment = 5] = "Comment"
}
)(W || (W = {}));
function jr(t) {
    return t.nodeType === t.ELEMENT_NODE
}
function Lt(t) {
    const e = t?.host;
    return !!(e && e.shadowRoot && e.shadowRoot === t)
}
function pi({maskInputOptions: t, tagName: e, type: n}) {
    e.toLowerCase() === "option" && (e = "select");
    const i = typeof n == "string" ? n.toLowerCase() : void 0;
    return t[e.toLowerCase()] || i && t[i] || i === "password" || e === "input" && !n && t.text
}
function Zr({tagName: t, type: e, maskInputOptions: n, maskInputSelector: i}) {
    return i || pi({
        maskInputOptions: n,
        tagName: t,
        type: e
    })
}
function Ht({input: t, maskInputSelector: e, unmaskInputSelector: n, maskInputOptions: i, tagName: s, type: r, value: o, maskInputFn: a}) {
    let c = o || "";
    return n && t.matches(n) || (t.hasAttribute("data-rr-is-password") && (r = "password"),
    (pi({
        maskInputOptions: i,
        tagName: s,
        type: r
    }) || e && t.matches(e)) && (a ? c = a(c) : c = "*".repeat(c.length))),
    c
}
const yn = "__rrweb_original__";
function qr(t) {
    const e = t.getContext("2d");
    if (!e)
        return !0;
    const n = 50;
    for (let i = 0; i < t.width; i += n)
        for (let s = 0; s < t.height; s += n) {
            const r = e.getImageData
              , o = yn in r ? r[yn] : r;
            if (new Uint32Array(o.call(e, i, s, Math.min(n, t.width - i), Math.min(n, t.height - s)).data.buffer).some(c => c !== 0))
                return !1
        }
    return !0
}
function mi(t) {
    const e = t.type;
    return t.hasAttribute("data-rr-is-password") ? "password" : e ? e.toLowerCase() : null
}
function Ce(t, e, n) {
    return typeof n == "string" && n.toLowerCase(),
    e === "INPUT" && (n === "radio" || n === "checkbox") ? t.getAttribute("value") || "" : t.value
}
let Vr = 1;
const Xr = new RegExp("[^a-z0-9-_:]")
  , $t = -2;
function gi(t) {
    return t ? t.replace(/[\S]/g, "*") : ""
}
function Kr() {
    return Vr++
}
function Jr(t) {
    if (t instanceof HTMLFormElement)
        return "form";
    const e = t.tagName.toLowerCase().trim();
    return Xr.test(e) ? "div" : e
}
function Oe(t) {
    try {
        const e = t.rules || t.cssRules;
        return e ? Array.from(e).map(Qr).join("") : null
    } catch {
        return null
    }
}
function Qr(t) {
    let e = t.cssText;
    if (ta(t))
        try {
            e = Oe(t.styleSheet) || e
        } catch {}
    return yi(e)
}
function yi(t) {
    if (t.indexOf(":") > -1) {
        const e = /(\[(?:[\w-]+)[^\\])(:(?:[\w-]+)\])/gm;
        return t.replace(e, "$1\\$2")
    }
    return t
}
function ta(t) {
    return "styleSheet"in t
}
function ea(t) {
    return t.cssRules ? Array.from(t.cssRules).map(e => e.cssText ? yi(e.cssText) : "").join("") : ""
}
function na(t) {
    let e = "";
    return t.indexOf("//") > -1 ? e = t.split("/").slice(0, 3).join("/") : e = t.split("/")[0],
    e = e.split("?")[0],
    e
}
let Et, En;
const ia = /url\((?:(')([^']*)'|(")(.*?)"|([^)]*))\)/gm
  , sa = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/|#).*/
  , ra = /^(data:)([^,]*),(.*)/i;
function se(t, e) {
    return (t || "").replace(ia, (n, i, s, r, o, a) => {
        const c = s || o || a
          , l = i || r || "";
        if (!c)
            return n;
        if (!sa.test(c))
            return `url(${l}${c}${l})`;
        if (ra.test(c))
            return `url(${l}${c}${l})`;
        if (c[0] === "/")
            return `url(${l}${na(e) + c}${l})`;
        const d = e.split("/")
          , u = c.split("/");
        d.pop();
        for (const h of u)
            h !== "." && (h === ".." ? d.pop() : d.push(h));
        return `url(${l}${d.join("/")}${l})`
    }
    )
}
const aa = /^[^ \t\n\r\u000c]+/
  , oa = /^[, \t\n\r\u000c]+/;
function ca(t, e) {
    if (e.trim() === "")
        return e;
    let n = 0;
    function i(r) {
        let o, a = r.exec(e.substring(n));
        return a ? (o = a[0],
        n += o.length,
        o) : ""
    }
    let s = [];
    for (; i(oa),
    !(n >= e.length); ) {
        let r = i(aa);
        if (r.slice(-1) === ",")
            r = St(t, r.substring(0, r.length - 1)),
            s.push(r);
        else {
            let o = "";
            r = St(t, r);
            let a = !1;
            for (; ; ) {
                let c = e.charAt(n);
                if (c === "") {
                    s.push((r + o).trim());
                    break
                } else if (a)
                    c === ")" && (a = !1);
                else if (c === ",") {
                    n += 1,
                    s.push((r + o).trim());
                    break
                } else
                    c === "(" && (a = !0);
                o += c,
                n += 1
            }
        }
    }
    return s.join(", ")
}
function St(t, e) {
    if (!e || e.trim() === "")
        return e;
    const n = t.createElement("a");
    return n.href = e,
    n.href
}
function la(t) {
    return !!(t.tagName === "svg" || t.ownerSVGElement)
}
function Be() {
    const t = document.createElement("a");
    return t.href = "",
    t.href
}
function Ei(t, e, n, i, s, r, o, a) {
    if (!s)
        return s;
    const c = i.toLowerCase()
      , l = n.toLowerCase();
    return c === "src" || c === "href" || c === "xlink:href" && s[0] !== "#" || c === "background" && (l === "table" || l === "td" || l === "th") ? St(t, s) : c === "srcset" ? ca(t, s) : c === "style" ? se(s, Be()) : l === "object" && c === "data" ? St(t, s) : r && da(e, c, l, o) ? a ? a(s) : gi(s) : s
}
function da(t, e, n, i) {
    return i && t.matches(i) ? !1 : ["placeholder", "title", "aria-label"].indexOf(e) > -1 || n === "input" && e === "value" && t.hasAttribute("type") && ["submit", "button"].indexOf(t.getAttribute("type").toLowerCase()) > -1
}
function ua(t, e, n, i) {
    if (i && t.matches(i))
        return !1;
    if (typeof e == "string") {
        if (t.classList.contains(e))
            return !0
    } else
        for (let s = 0; s < t.classList.length; s++) {
            const r = t.classList[s];
            if (e.test(r))
                return !0
        }
    return n ? t.matches(n) : !1
}
function ce(t, e, n, i, s) {
    if (!t)
        return !1;
    if (t.nodeType !== t.ELEMENT_NODE)
        return ce(t.parentNode, e, n, i, s);
    if (i && (t.matches(i) || t.closest(i)))
        return !1;
    if (s)
        return !0;
    if (typeof e == "string") {
        if (t.classList.contains(e))
            return !0
    } else
        for (let r = 0; r < t.classList.length; r++) {
            const o = t.classList[r];
            if (e.test(o))
                return !0
        }
    return n && t.matches(n) ? !0 : ce(t.parentNode, e, n, i, s)
}
function fa(t, e, n) {
    const i = t.contentWindow;
    if (!i)
        return;
    let s = !1, r;
    try {
        r = i.document.readyState
    } catch {
        return
    }
    if (r !== "complete") {
        const a = setTimeout( () => {
            s || (e(),
            s = !0)
        }
        , n);
        t.addEventListener("load", () => {
            clearTimeout(a),
            s = !0,
            e()
        }
        );
        return
    }
    const o = "about:blank";
    if (i.location.href !== o || t.src === o || t.src === "") {
        setTimeout(e, 0);
        return
    }
    t.addEventListener("load", e)
}
function ha(t, e) {
    var n;
    const {doc: i, blockClass: s, blockSelector: r, unblockSelector: o, maskTextClass: a, maskTextSelector: c, unmaskTextSelector: l, inlineStylesheet: d, maskInputSelector: u, unmaskInputSelector: h, maskAllText: f, maskInputOptions: p={}, maskTextFn: b, maskInputFn: x, dataURLOptions: y={}, inlineImages: C, recordCanvas: N, keepIframeSrcFn: T} = e;
    let E;
    if (i.__sn) {
        const R = i.__sn.id;
        E = R === 1 ? void 0 : R
    }
    switch (t.nodeType) {
    case t.DOCUMENT_NODE:
        return t.compatMode !== "CSS1Compat" ? {
            type: W.Document,
            childNodes: [],
            compatMode: t.compatMode,
            rootId: E
        } : {
            type: W.Document,
            childNodes: [],
            rootId: E
        };
    case t.DOCUMENT_TYPE_NODE:
        return {
            type: W.DocumentType,
            name: t.name,
            publicId: t.publicId,
            systemId: t.systemId,
            rootId: E
        };
    case t.ELEMENT_NODE:
        const R = ua(t, s, r, o)
          , S = Jr(t);
        let g = {};
        for (const {name: m, value: I} of Array.from(t.attributes))
            ma(S, m) || (g[m] = Ei(i, t, S, m, I, f, l, b));
        if (S === "link" && d) {
            const m = Array.from(i.styleSheets).find(P => P.href === t.href);
            let I = null;
            m && (I = Oe(m)),
            I && (delete g.rel,
            delete g.href,
            g._cssText = se(I, m.href))
        }
        if (S === "style" && t.sheet && !(t.innerText || t.textContent || "").trim().length) {
            const m = Oe(t.sheet);
            m && (g._cssText = se(m, Be()))
        }
        if (S === "input" || S === "textarea" || S === "select" || S === "option") {
            const m = t
              , I = mi(m)
              , P = Ce(m, S.toUpperCase(), I)
              , V = t.checked;
            I !== "submit" && I !== "button" && P && (g.value = Ht({
                input: m,
                type: I,
                tagName: S,
                value: P,
                maskInputSelector: u,
                unmaskInputSelector: h,
                maskInputOptions: p,
                maskInputFn: x
            })),
            V && (g.checked = V)
        }
        if (S === "option" && (t.selected && !p.select ? g.selected = !0 : delete g.selected),
        S === "canvas" && N) {
            if (t.__context === "2d")
                qr(t) || (g.rr_dataURL = t.toDataURL(y.type, y.quality));
            else if (!("__context"in t)) {
                const m = t.toDataURL(y.type, y.quality)
                  , I = document.createElement("canvas");
                I.width = t.width,
                I.height = t.height;
                const P = I.toDataURL(y.type, y.quality);
                m !== P && (g.rr_dataURL = m)
            }
        }
        if (S === "img" && C) {
            Et || (Et = i.createElement("canvas"),
            En = Et.getContext("2d"));
            const m = t
              , I = m.crossOrigin;
            m.crossOrigin = "anonymous";
            const P = () => {
                try {
                    Et.width = m.naturalWidth,
                    Et.height = m.naturalHeight,
                    En.drawImage(m, 0, 0),
                    g.rr_dataURL = Et.toDataURL(y.type, y.quality)
                } catch (V) {
                    console.warn(`Cannot inline img src=${m.currentSrc}! Error: ${V}`)
                }
                I ? g.crossOrigin = I : delete g.crossOrigin
            }
            ;
            m.complete && m.naturalWidth !== 0 ? P() : m.onload = P
        }
        if ((S === "audio" || S === "video") && (g.rr_mediaState = t.paused ? "paused" : "played",
        g.rr_mediaCurrentTime = t.currentTime),
        t.scrollLeft && (g.rr_scrollLeft = t.scrollLeft),
        t.scrollTop && (g.rr_scrollTop = t.scrollTop),
        R) {
            const {width: m, height: I} = t.getBoundingClientRect();
            g = {
                class: g.class,
                rr_width: `${m}px`,
                rr_height: `${I}px`
            }
        }
        return S === "iframe" && !T(g.src) && (t.contentDocument || (g.rr_src = g.src),
        delete g.src),
        {
            type: W.Element,
            tagName: S,
            attributes: g,
            childNodes: [],
            isSVG: la(t) || void 0,
            needBlock: R,
            rootId: E
        };
    case t.TEXT_NODE:
        const B = t.parentNode && t.parentNode.tagName;
        let D = t.textContent;
        const z = B === "STYLE" ? !0 : void 0
          , $ = B === "SCRIPT" ? !0 : void 0;
        if (z && D) {
            try {
                t.nextSibling || t.previousSibling || !((n = t.parentNode.sheet) === null || n === void 0) && n.cssRules && (D = ea(t.parentNode.sheet))
            } catch (m) {
                console.warn(`Cannot get CSS styles from text's parentNode. Error: ${m}`, t)
            }
            D = se(D, Be())
        }
        if ($ && (D = "SCRIPT_PLACEHOLDER"),
        B === "TEXTAREA" && D)
            D = "";
        else if (B === "OPTION" && D) {
            const m = t.parentNode;
            D = Ht({
                input: m,
                type: null,
                tagName: B,
                value: D,
                maskInputSelector: u,
                unmaskInputSelector: h,
                maskInputOptions: p,
                maskInputFn: x
            })
        } else
            !z && !$ && ce(t, a, c, l, f) && D && (D = b ? b(D) : gi(D));
        return {
            type: W.Text,
            textContent: D || "",
            isStyle: z,
            rootId: E
        };
    case t.CDATA_SECTION_NODE:
        return {
            type: W.CDATA,
            textContent: "",
            rootId: E
        };
    case t.COMMENT_NODE:
        return {
            type: W.Comment,
            textContent: t.textContent || "",
            rootId: E
        };
    default:
        return !1
    }
}
function U(t) {
    return t == null ? "" : t.toLowerCase()
}
function _a(t, e) {
    if (e.comment && t.type === W.Comment)
        return !0;
    if (t.type === W.Element) {
        if (e.script && (t.tagName === "script" || t.tagName === "link" && (t.attributes.rel === "preload" || t.attributes.rel === "modulepreload") && t.attributes.as === "script" || t.tagName === "link" && t.attributes.rel === "prefetch" && typeof t.attributes.href == "string" && t.attributes.href.endsWith(".js")))
            return !0;
        if (e.headFavicon && (t.tagName === "link" && t.attributes.rel === "shortcut icon" || t.tagName === "meta" && (U(t.attributes.name).match(/^msapplication-tile(image|color)$/) || U(t.attributes.name) === "application-name" || U(t.attributes.rel) === "icon" || U(t.attributes.rel) === "apple-touch-icon" || U(t.attributes.rel) === "shortcut icon")))
            return !0;
        if (t.tagName === "meta") {
            if (e.headMetaDescKeywords && U(t.attributes.name).match(/^description|keywords$/))
                return !0;
            if (e.headMetaSocial && (U(t.attributes.property).match(/^(og|twitter|fb):/) || U(t.attributes.name).match(/^(og|twitter):/) || U(t.attributes.name) === "pinterest"))
                return !0;
            if (e.headMetaRobots && (U(t.attributes.name) === "robots" || U(t.attributes.name) === "googlebot" || U(t.attributes.name) === "bingbot"))
                return !0;
            if (e.headMetaHttpEquiv && t.attributes["http-equiv"] !== void 0)
                return !0;
            if (e.headMetaAuthorship && (U(t.attributes.name) === "author" || U(t.attributes.name) === "generator" || U(t.attributes.name) === "framework" || U(t.attributes.name) === "publisher" || U(t.attributes.name) === "progid" || U(t.attributes.property).match(/^article:/) || U(t.attributes.property).match(/^product:/)))
                return !0;
            if (e.headMetaVerification && (U(t.attributes.name) === "google-site-verification" || U(t.attributes.name) === "yandex-verification" || U(t.attributes.name) === "csrf-token" || U(t.attributes.name) === "p:domain_verify" || U(t.attributes.name) === "verify-v1" || U(t.attributes.name) === "verification" || U(t.attributes.name) === "shopify-checkout-api-token"))
                return !0
        }
    }
    return !1
}
function Mt(t, e) {
    const {doc: n, map: i, blockClass: s, blockSelector: r, unblockSelector: o, maskTextClass: a, maskTextSelector: c, unmaskTextSelector: l, skipChild: d=!1, inlineStylesheet: u=!0, maskInputSelector: h, unmaskInputSelector: f, maskAllText: p, maskInputOptions: b={}, maskTextFn: x, maskInputFn: y, slimDOMOptions: C, dataURLOptions: N={}, inlineImages: T=!1, recordCanvas: E=!1, onSerialize: R, onIframeLoad: S, iframeLoadTimeout: g=5e3, keepIframeSrcFn: B= () => !1} = e;
    let {preserveWhiteSpace: D=!0} = e;
    const z = ha(t, {
        doc: n,
        blockClass: s,
        blockSelector: r,
        unblockSelector: o,
        maskTextClass: a,
        maskTextSelector: c,
        unmaskTextSelector: l,
        inlineStylesheet: u,
        maskInputSelector: h,
        unmaskInputSelector: f,
        maskAllText: p,
        maskInputOptions: b,
        maskTextFn: x,
        maskInputFn: y,
        dataURLOptions: N,
        inlineImages: T,
        recordCanvas: E,
        keepIframeSrcFn: B
    });
    if (!z)
        return console.warn(t, "not serialized"),
        null;
    let $;
    "__sn"in t ? $ = t.__sn.id : _a(z, C) || !D && z.type === W.Text && !z.isStyle && !z.textContent.replace(/^\s+|\s+$/gm, "").length ? $ = $t : $ = Kr();
    const m = Object.assign(z, {
        id: $
    });
    if (t.__sn = m,
    $ === $t)
        return null;
    i[$] = t,
    R && R(t);
    let I = !d;
    if (m.type === W.Element && (I = I && !m.needBlock,
    delete m.needBlock,
    t.shadowRoot && (m.isShadowHost = !0)),
    (m.type === W.Document || m.type === W.Element) && I) {
        C.headWhitespace && z.type === W.Element && z.tagName === "head" && (D = !1);
        const P = {
            doc: n,
            map: i,
            blockClass: s,
            blockSelector: r,
            unblockSelector: o,
            maskTextClass: a,
            maskTextSelector: c,
            unmaskTextSelector: l,
            skipChild: d,
            inlineStylesheet: u,
            maskInputSelector: h,
            unmaskInputSelector: f,
            maskAllText: p,
            maskInputOptions: b,
            maskTextFn: x,
            maskInputFn: y,
            slimDOMOptions: C,
            dataURLOptions: N,
            inlineImages: T,
            recordCanvas: E,
            preserveWhiteSpace: D,
            onSerialize: R,
            onIframeLoad: S,
            iframeLoadTimeout: g,
            keepIframeSrcFn: B
        };
        for (const V of Array.from(t.childNodes)) {
            const it = Mt(V, P);
            it && m.childNodes.push(it)
        }
        if (jr(t) && t.shadowRoot)
            for (const V of Array.from(t.shadowRoot.childNodes)) {
                const it = Mt(V, P);
                it && (it.isShadow = !0,
                m.childNodes.push(it))
            }
    }
    return t.parentNode && Lt(t.parentNode) && (m.isShadow = !0),
    m.type === W.Element && m.tagName === "iframe" && fa(t, () => {
        const P = t.contentDocument;
        if (P && S) {
            const V = Mt(P, {
                doc: P,
                map: i,
                blockClass: s,
                blockSelector: r,
                unblockSelector: o,
                maskTextClass: a,
                maskTextSelector: c,
                unmaskTextSelector: l,
                skipChild: !1,
                inlineStylesheet: u,
                maskInputSelector: h,
                unmaskInputSelector: f,
                maskAllText: p,
                maskInputOptions: b,
                maskTextFn: x,
                maskInputFn: y,
                slimDOMOptions: C,
                dataURLOptions: N,
                inlineImages: T,
                recordCanvas: E,
                preserveWhiteSpace: D,
                onSerialize: R,
                onIframeLoad: S,
                iframeLoadTimeout: g,
                keepIframeSrcFn: B
            });
            V && S(t, V)
        }
    }
    , g),
    m
}
function pa(t, e) {
    const {blockClass: n="rr-block", blockSelector: i=null, unblockSelector: s=null, maskTextClass: r="rr-mask", maskTextSelector: o=null, unmaskTextSelector: a=null, inlineStylesheet: c=!0, inlineImages: l=!1, recordCanvas: d=!1, maskInputSelector: u=null, unmaskInputSelector: h=null, maskAllText: f=!1, maskAllInputs: p=!1, maskTextFn: b, maskInputFn: x, slimDOM: y=!1, dataURLOptions: C, preserveWhiteSpace: N, onSerialize: T, onIframeLoad: E, iframeLoadTimeout: R, keepIframeSrcFn: S= () => !1} = e || {}
      , g = {};
    return [Mt(t, {
        doc: t,
        map: g,
        blockClass: n,
        blockSelector: i,
        unblockSelector: s,
        maskTextClass: r,
        maskTextSelector: o,
        unmaskTextSelector: a,
        skipChild: !1,
        inlineStylesheet: c,
        maskInputSelector: u,
        unmaskInputSelector: h,
        maskAllText: f,
        maskInputOptions: p === !0 ? {
            color: !0,
            date: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0,
            textarea: !0,
            select: !0
        } : p === !1 ? {} : p,
        maskTextFn: b,
        maskInputFn: x,
        slimDOMOptions: y === !0 || y === "all" ? {
            script: !0,
            comment: !0,
            headFavicon: !0,
            headWhitespace: !0,
            headMetaDescKeywords: y === "all",
            headMetaSocial: !0,
            headMetaRobots: !0,
            headMetaHttpEquiv: !0,
            headMetaAuthorship: !0,
            headMetaVerification: !0
        } : y === !1 ? {} : y,
        dataURLOptions: C,
        inlineImages: l,
        recordCanvas: d,
        preserveWhiteSpace: N,
        onSerialize: T,
        onIframeLoad: E,
        iframeLoadTimeout: R,
        keepIframeSrcFn: S
    }), g]
}
function ma(t, e, n) {
    return (t === "video" || t === "audio") && e === "autoplay"
}
var A;
(function(t) {
    t[t.DomContentLoaded = 0] = "DomContentLoaded",
    t[t.Load = 1] = "Load",
    t[t.FullSnapshot = 2] = "FullSnapshot",
    t[t.IncrementalSnapshot = 3] = "IncrementalSnapshot",
    t[t.Meta = 4] = "Meta",
    t[t.Custom = 5] = "Custom",
    t[t.Plugin = 6] = "Plugin"
}
)(A || (A = {}));
var Z;
(function(t) {
    t[t.Mutation = 0] = "Mutation",
    t[t.MouseMove = 1] = "MouseMove",
    t[t.MouseInteraction = 2] = "MouseInteraction",
    t[t.Scroll = 3] = "Scroll",
    t[t.ViewportResize = 4] = "ViewportResize",
    t[t.Input = 5] = "Input",
    t[t.TouchMove = 6] = "TouchMove",
    t[t.MediaInteraction = 7] = "MediaInteraction",
    t[t.StyleSheetRule = 8] = "StyleSheetRule",
    t[t.CanvasMutation = 9] = "CanvasMutation",
    t[t.Font = 10] = "Font",
    t[t.Log = 11] = "Log",
    t[t.Drag = 12] = "Drag",
    t[t.StyleDeclaration = 13] = "StyleDeclaration"
}
)(Z || (Z = {}));
var le;
(function(t) {
    t[t.MouseUp = 0] = "MouseUp",
    t[t.MouseDown = 1] = "MouseDown",
    t[t.Click = 2] = "Click",
    t[t.ContextMenu = 3] = "ContextMenu",
    t[t.DblClick = 4] = "DblClick",
    t[t.Focus = 5] = "Focus",
    t[t.Blur = 6] = "Blur",
    t[t.TouchStart = 7] = "TouchStart",
    t[t.TouchMove_Departed = 8] = "TouchMove_Departed",
    t[t.TouchEnd = 9] = "TouchEnd",
    t[t.TouchCancel = 10] = "TouchCancel"
}
)(le || (le = {}));
var Rt;
(function(t) {
    t[t["2D"] = 0] = "2D",
    t[t.WebGL = 1] = "WebGL",
    t[t.WebGL2 = 2] = "WebGL2"
}
)(Rt || (Rt = {}));
var bn;
(function(t) {
    t[t.Play = 0] = "Play",
    t[t.Pause = 1] = "Pause",
    t[t.Seeked = 2] = "Seeked",
    t[t.VolumeChange = 3] = "VolumeChange"
}
)(bn || (bn = {}));
var Sn;
(function(t) {
    t.Start = "start",
    t.Pause = "pause",
    t.Resume = "resume",
    t.Resize = "resize",
    t.Finish = "finish",
    t.FullsnapshotRebuilded = "fullsnapshot-rebuilded",
    t.LoadStylesheetStart = "load-stylesheet-start",
    t.LoadStylesheetEnd = "load-stylesheet-end",
    t.SkipStart = "skip-start",
    t.SkipEnd = "skip-end",
    t.MouseInteraction = "mouse-interaction",
    t.EventCast = "event-cast",
    t.CustomEvent = "custom-event",
    t.Flush = "flush",
    t.StateChange = "state-change",
    t.PlayBack = "play-back"
}
)(Sn || (Sn = {}));
function J(t, e, n=document) {
    const i = {
        capture: !0,
        passive: !0
    };
    return n.addEventListener(t, e, i),
    () => n.removeEventListener(t, e, i)
}
function ga() {
    return {
        map: {},
        getId(t) {
            return !t || !t.__sn ? -1 : t.__sn.id
        },
        getNode(t) {
            return this.map[t] || null
        },
        removeNodeFromMap(t) {
            const e = t.__sn && t.__sn.id;
            delete this.map[e],
            t.childNodes && t.childNodes.forEach(n => this.removeNodeFromMap(n))
        },
        has(t) {
            return this.map.hasOwnProperty(t)
        },
        reset() {
            this.map = {}
        }
    }
}
const bt = `Please stop import mirror directly. Instead of that,\r
now you can use replayer.getMirror() to access the mirror instance of a replayer,\r
or you can use record.mirror to access the mirror instance during recording.`;
let wn = {
    map: {},
    getId() {
        return console.error(bt),
        -1
    },
    getNode() {
        return console.error(bt),
        null
    },
    removeNodeFromMap() {
        console.error(bt)
    },
    has() {
        return console.error(bt),
        !1
    },
    reset() {
        console.error(bt)
    }
};
typeof window < "u" && window.Proxy && window.Reflect && (wn = new Proxy(wn,{
    get(t, e, n) {
        return e === "map" && console.error(bt),
        Reflect.get(t, e, n)
    }
}));
function Wt(t, e, n={}) {
    let i = null
      , s = 0;
    return function(r) {
        let o = Date.now();
        !s && n.leading === !1 && (s = o);
        let a = e - (o - s)
          , c = this
          , l = arguments;
        a <= 0 || a > e ? (i && (clearTimeout(i),
        i = null),
        s = o,
        t.apply(c, l)) : !i && n.trailing !== !1 && (i = setTimeout( () => {
            s = n.leading === !1 ? 0 : Date.now(),
            i = null,
            t.apply(c, l)
        }
        , a))
    }
}
function me(t, e, n, i, s=window) {
    const r = s.Object.getOwnPropertyDescriptor(t, e);
    return s.Object.defineProperty(t, e, i ? n : {
        set(o) {
            setTimeout( () => {
                n.set.call(this, o)
            }
            , 0),
            r && r.set && r.set.call(this, o)
        }
    }),
    () => me(t, e, r || {}, !0)
}
function kt(t, e, n) {
    try {
        if (!(e in t))
            return () => {}
            ;
        const i = t[e]
          , s = n(i);
        return typeof s == "function" && (s.prototype = s.prototype || {},
        Object.defineProperties(s, {
            __rrweb_original__: {
                enumerable: !1,
                value: i
            }
        })),
        t[e] = s,
        () => {
            t[e] = i
        }
    } catch {
        return () => {}
    }
}
function bi() {
    return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body && document.body.clientHeight
}
function Si() {
    return window.innerWidth || document.documentElement && document.documentElement.clientWidth || document.body && document.body.clientWidth
}
function X(t, e, n, i) {
    if (!t)
        return !1;
    if (t.nodeType === t.ELEMENT_NODE) {
        let s = !1;
        const r = i && t.matches(i);
        return typeof e == "string" ? t.closest !== void 0 ? s = !r && t.closest("." + e) !== null : s = !r && t.classList.contains(e) : !r && t.classList.forEach(o => {
            e.test(o) && (s = !0)
        }
        ),
        !s && n && (s = t.matches(n)),
        !r && s || X(t.parentNode, e, n, i)
    }
    return t.nodeType === t.TEXT_NODE,
    X(t.parentNode, e, n, i)
}
function xe(t) {
    return "__sn"in t ? t.__sn.id === $t : !1
}
function wi(t, e) {
    if (Lt(t))
        return !1;
    const n = e.getId(t);
    return e.has(n) ? t.parentNode && t.parentNode.nodeType === t.DOCUMENT_NODE ? !1 : t.parentNode ? wi(t.parentNode, e) : !0 : !0
}
function vi(t) {
    return !!t.changedTouches
}
function ya(t=window) {
    "NodeList"in t && !t.NodeList.prototype.forEach && (t.NodeList.prototype.forEach = Array.prototype.forEach),
    "DOMTokenList"in t && !t.DOMTokenList.prototype.forEach && (t.DOMTokenList.prototype.forEach = Array.prototype.forEach),
    Node.prototype.contains || (Node.prototype.contains = function(n) {
        if (!(0 in arguments))
            throw new TypeError("1 argument is required");
        do
            if (this === n)
                return !0;
        while (n = n && n.parentNode);
        return !1
    }
    )
}
function Ti(t) {
    return "__sn"in t ? t.__sn.type === W.Element && t.__sn.tagName === "iframe" : !1
}
function Ri(t) {
    return !!t?.shadowRoot
}
function vn(t) {
    return "__ln"in t
}
class Ea {
    constructor() {
        this.length = 0,
        this.head = null
    }
    get(e) {
        if (e >= this.length)
            throw new Error("Position outside of list range");
        let n = this.head;
        for (let i = 0; i < e; i++)
            n = n?.next || null;
        return n
    }
    addNode(e) {
        const n = {
            value: e,
            previous: null,
            next: null
        };
        if (e.__ln = n,
        e.previousSibling && vn(e.previousSibling)) {
            const i = e.previousSibling.__ln.next;
            n.next = i,
            n.previous = e.previousSibling.__ln,
            e.previousSibling.__ln.next = n,
            i && (i.previous = n)
        } else if (e.nextSibling && vn(e.nextSibling) && e.nextSibling.__ln.previous) {
            const i = e.nextSibling.__ln.previous;
            n.previous = i,
            n.next = e.nextSibling.__ln,
            e.nextSibling.__ln.previous = n,
            i && (i.next = n)
        } else
            this.head && (this.head.previous = n),
            n.next = this.head,
            this.head = n;
        this.length++
    }
    removeNode(e) {
        const n = e.__ln;
        this.head && (n.previous ? (n.previous.next = n.next,
        n.next && (n.next.previous = n.previous)) : (this.head = n.next,
        this.head && (this.head.previous = null)),
        e.__ln && delete e.__ln,
        this.length--)
    }
}
const Tn = (t, e) => `${t}@${e}`;
function Rn(t) {
    return "__sn"in t
}
class ba {
    constructor() {
        this.frozen = !1,
        this.locked = !1,
        this.texts = [],
        this.attributes = [],
        this.removes = [],
        this.mapRemoves = [],
        this.movedMap = {},
        this.addedSet = new Set,
        this.movedSet = new Set,
        this.droppedSet = new Set,
        this.processMutations = e => {
            e.forEach(this.processMutation),
            this.emit()
        }
        ,
        this.emit = () => {
            if (this.frozen || this.locked)
                return;
            const e = []
              , n = new Ea
              , i = a => {
                let c = a
                  , l = $t;
                for (; l === $t; )
                    c = c && c.nextSibling,
                    l = c && this.mirror.getId(c);
                return l
            }
              , s = a => {
                var c, l, d, u, h;
                const f = a.getRootNode ? (c = a.getRootNode()) === null || c === void 0 ? void 0 : c.host : null;
                let p = f;
                for (; !((d = (l = p?.getRootNode) === null || l === void 0 ? void 0 : l.call(p)) === null || d === void 0) && d.host; )
                    p = ((h = (u = p?.getRootNode) === null || u === void 0 ? void 0 : u.call(p)) === null || h === void 0 ? void 0 : h.host) || null;
                const b = !this.doc.contains(a) && (!p || !this.doc.contains(p));
                if (!a.parentNode || b)
                    return;
                const x = Lt(a.parentNode) ? this.mirror.getId(f) : this.mirror.getId(a.parentNode)
                  , y = i(a);
                if (x === -1 || y === -1)
                    return n.addNode(a);
                let C = Mt(a, {
                    doc: this.doc,
                    map: this.mirror.map,
                    blockClass: this.blockClass,
                    blockSelector: this.blockSelector,
                    unblockSelector: this.unblockSelector,
                    maskTextClass: this.maskTextClass,
                    maskTextSelector: this.maskTextSelector,
                    unmaskTextSelector: this.unmaskTextSelector,
                    maskInputSelector: this.maskInputSelector,
                    unmaskInputSelector: this.unmaskInputSelector,
                    skipChild: !0,
                    inlineStylesheet: this.inlineStylesheet,
                    maskAllText: this.maskAllText,
                    maskInputOptions: this.maskInputOptions,
                    maskTextFn: this.maskTextFn,
                    maskInputFn: this.maskInputFn,
                    slimDOMOptions: this.slimDOMOptions,
                    recordCanvas: this.recordCanvas,
                    inlineImages: this.inlineImages,
                    onSerialize: N => {
                        Ti(N) && this.iframeManager.addIframe(N),
                        Ri(a) && this.shadowDomManager.addShadowRoot(a.shadowRoot, document)
                    }
                    ,
                    onIframeLoad: (N, T) => {
                        this.iframeManager.attachIframe(N, T),
                        this.shadowDomManager.observeAttachShadow(N)
                    }
                });
                C && e.push({
                    parentId: x,
                    nextId: y,
                    node: C
                })
            }
            ;
            for (; this.mapRemoves.length; )
                this.mirror.removeNodeFromMap(this.mapRemoves.shift());
            for (const a of this.movedSet)
                Le(this.removes, a, this.mirror) && !this.movedSet.has(a.parentNode) || s(a);
            for (const a of this.addedSet)
                !Me(this.droppedSet, a) && !Le(this.removes, a, this.mirror) || Me(this.movedSet, a) ? s(a) : this.droppedSet.add(a);
            let r = null;
            for (; n.length; ) {
                let a = null;
                if (r) {
                    const c = this.mirror.getId(r.value.parentNode)
                      , l = i(r.value);
                    c !== -1 && l !== -1 && (a = r)
                }
                if (!a)
                    for (let c = n.length - 1; c >= 0; c--) {
                        const l = n.get(c);
                        if (l) {
                            const d = this.mirror.getId(l.value.parentNode)
                              , u = i(l.value);
                            if (d !== -1 && u !== -1) {
                                a = l;
                                break
                            }
                        }
                    }
                if (!a) {
                    for (; n.head; )
                        n.removeNode(n.head.value);
                    break
                }
                r = a.previous,
                n.removeNode(a.value),
                s(a.value)
            }
            const o = {
                texts: this.texts.map(a => ({
                    id: this.mirror.getId(a.node),
                    value: a.value
                })).filter(a => this.mirror.has(a.id)),
                attributes: this.attributes.map(a => ({
                    id: this.mirror.getId(a.node),
                    attributes: a.attributes
                })).filter(a => this.mirror.has(a.id)),
                removes: this.removes,
                adds: e
            };
            !o.texts.length && !o.attributes.length && !o.removes.length && !o.adds.length || (this.texts = [],
            this.attributes = [],
            this.removes = [],
            this.addedSet = new Set,
            this.movedSet = new Set,
            this.droppedSet = new Set,
            this.movedMap = {},
            this.mutationCb(o))
        }
        ,
        this.processMutation = e => {
            if (!xe(e.target))
                switch (e.type) {
                case "characterData":
                    {
                        const n = e.target.textContent;
                        !X(e.target, this.blockClass, this.blockSelector, this.unblockSelector) && n !== e.oldValue && this.texts.push({
                            value: ce(e.target, this.maskTextClass, this.maskTextSelector, this.unmaskTextSelector, this.maskAllText) && n ? this.maskTextFn ? this.maskTextFn(n) : n.replace(/[\S]/g, "*") : n,
                            node: e.target
                        });
                        break
                    }
                case "attributes":
                    {
                        const n = e.target;
                        let i = n.getAttribute(e.attributeName);
                        if (e.attributeName === "value" && (i = Ht({
                            input: n,
                            maskInputSelector: this.maskInputSelector,
                            unmaskInputSelector: this.unmaskInputSelector,
                            maskInputOptions: this.maskInputOptions,
                            tagName: n.tagName,
                            type: n.getAttribute("type"),
                            value: i,
                            maskInputFn: this.maskInputFn
                        })),
                        X(e.target, this.blockClass, this.blockSelector, this.unblockSelector) || i === e.oldValue)
                            return;
                        let s = this.attributes.find(r => r.node === e.target);
                        if (s || (s = {
                            node: e.target,
                            attributes: {}
                        },
                        this.attributes.push(s)),
                        e.attributeName === "type" && n.tagName === "INPUT" && (e.oldValue || "").toLowerCase() === "password" && n.setAttribute("data-rr-is-password", "true"),
                        e.attributeName === "style") {
                            const r = this.doc.createElement("span");
                            e.oldValue && r.setAttribute("style", e.oldValue),
                            (s.attributes.style === void 0 || s.attributes.style === null) && (s.attributes.style = {});
                            try {
                                const o = s.attributes.style;
                                for (const a of Array.from(n.style)) {
                                    const c = n.style.getPropertyValue(a)
                                      , l = n.style.getPropertyPriority(a);
                                    (c !== r.style.getPropertyValue(a) || l !== r.style.getPropertyPriority(a)) && (l === "" ? o[a] = c : o[a] = [c, l])
                                }
                                for (const a of Array.from(r.style))
                                    n.style.getPropertyValue(a) === "" && (o[a] = !1)
                            } catch (o) {
                                console.warn("[rrweb] Error when parsing update to style attribute:", o)
                            }
                        } else {
                            const r = e.target;
                            s.attributes[e.attributeName] = Ei(this.doc, r, r.tagName, e.attributeName, i, this.maskAllText, this.unmaskTextSelector, this.maskTextFn)
                        }
                        break
                    }
                case "childList":
                    {
                        e.addedNodes.forEach(n => this.genAdds(n, e.target)),
                        e.removedNodes.forEach(n => {
                            const i = this.mirror.getId(n)
                              , s = Lt(e.target) ? this.mirror.getId(e.target.host) : this.mirror.getId(e.target);
                            X(e.target, this.blockClass, this.blockSelector, this.unblockSelector) || xe(n) || (this.addedSet.has(n) ? (Ue(this.addedSet, n),
                            this.droppedSet.add(n)) : this.addedSet.has(e.target) && i === -1 || wi(e.target, this.mirror) || (this.movedSet.has(n) && this.movedMap[Tn(i, s)] ? Ue(this.movedSet, n) : this.removes.push({
                                parentId: s,
                                id: i,
                                isShadow: Lt(e.target) ? !0 : void 0
                            })),
                            this.mapRemoves.push(n))
                        }
                        );
                        break
                    }
                }
        }
        ,
        this.genAdds = (e, n) => {
            if (!(n && X(n, this.blockClass, this.blockSelector, this.unblockSelector))) {
                if (Rn(e)) {
                    if (xe(e))
                        return;
                    this.movedSet.add(e);
                    let i = null;
                    n && Rn(n) && (i = n.__sn.id),
                    i && (this.movedMap[Tn(e.__sn.id, i)] = !0)
                } else
                    this.addedSet.add(e),
                    this.droppedSet.delete(e);
                X(e, this.blockClass, this.blockSelector, this.unblockSelector) || e.childNodes.forEach(i => this.genAdds(i))
            }
        }
    }
    init(e) {
        ["mutationCb", "blockClass", "blockSelector", "unblockSelector", "maskTextClass", "maskTextSelector", "unmaskTextSelector", "maskInputSelector", "unmaskInputSelector", "inlineStylesheet", "maskAllText", "maskInputOptions", "maskTextFn", "maskInputFn", "recordCanvas", "inlineImages", "slimDOMOptions", "doc", "mirror", "iframeManager", "shadowDomManager", "canvasManager"].forEach(n => {
            this[n] = e[n]
        }
        )
    }
    freeze() {
        this.frozen = !0,
        this.canvasManager.freeze()
    }
    unfreeze() {
        this.frozen = !1,
        this.canvasManager.unfreeze(),
        this.emit()
    }
    isFrozen() {
        return this.frozen
    }
    lock() {
        this.locked = !0,
        this.canvasManager.lock()
    }
    unlock() {
        this.locked = !1,
        this.canvasManager.unlock(),
        this.emit()
    }
    reset() {
        this.shadowDomManager.reset(),
        this.canvasManager.reset()
    }
}
function Ue(t, e) {
    t.delete(e),
    e.childNodes.forEach(n => Ue(t, n))
}
function Le(t, e, n) {
    const {parentNode: i} = e;
    if (!i)
        return !1;
    const s = n.getId(i);
    return t.some(r => r.id === s) ? !0 : Le(t, i, n)
}
function Me(t, e) {
    const {parentNode: n} = e;
    return n ? t.has(n) ? !0 : Me(t, n) : !1
}
const v = t => (...n) => {
    try {
        return t(...n)
    } catch (i) {
        try {
            i.__rrweb__ = !0
        } catch {}
        throw i
    }
}
  , mt = [];
function Vt(t) {
    try {
        if ("composedPath"in t) {
            const e = t.composedPath();
            if (e.length)
                return e[0]
        } else if ("path"in t && t.path.length)
            return t.path[0]
    } catch {}
    return t && t.target
}
function ki(t, e) {
    var n, i;
    const s = new ba;
    mt.push(s),
    s.init(t);
    let r = window.MutationObserver || window.__rrMutationObserver;
    const o = (i = (n = window?.Zone) === null || n === void 0 ? void 0 : n.__symbol__) === null || i === void 0 ? void 0 : i.call(n, "MutationObserver");
    o && window[o] && (r = window[o]);
    const a = new r(v(c => {
        t.onMutation && t.onMutation(c) === !1 || s.processMutations(c)
    }
    ));
    return a.observe(e, {
        attributes: !0,
        attributeOldValue: !0,
        characterData: !0,
        characterDataOldValue: !0,
        childList: !0,
        subtree: !0
    }),
    a
}
function Sa({mousemoveCb: t, sampling: e, doc: n, mirror: i}) {
    if (e.mousemove === !1)
        return () => {}
        ;
    const s = typeof e.mousemove == "number" ? e.mousemove : 50
      , r = typeof e.mousemoveCallback == "number" ? e.mousemoveCallback : 500;
    let o = [], a;
    const c = Wt(u => {
        const h = Date.now() - a;
        v(t)(o.map(f => (f.timeOffset -= h,
        f)), u),
        o = [],
        a = null
    }
    , r)
      , l = Wt(u => {
        const h = Vt(u)
          , {clientX: f, clientY: p} = vi(u) ? u.changedTouches[0] : u;
        a || (a = Date.now()),
        o.push({
            x: f,
            y: p,
            id: i.getId(h),
            timeOffset: Date.now() - a
        }),
        c(typeof DragEvent < "u" && u instanceof DragEvent ? Z.Drag : u instanceof MouseEvent ? Z.MouseMove : Z.TouchMove)
    }
    , s, {
        trailing: !1
    })
      , d = [J("mousemove", v(l), n), J("touchmove", v(l), n), J("drag", v(l), n)];
    return v( () => {
        d.forEach(u => u())
    }
    )
}
function wa({mouseInteractionCb: t, doc: e, mirror: n, blockClass: i, blockSelector: s, unblockSelector: r, sampling: o}) {
    if (o.mouseInteraction === !1)
        return () => {}
        ;
    const a = o.mouseInteraction === !0 || o.mouseInteraction === void 0 ? {} : o.mouseInteraction
      , c = []
      , l = d => u => {
        const h = Vt(u);
        if (X(h, i, s, r))
            return;
        const f = vi(u) ? u.changedTouches[0] : u;
        if (!f)
            return;
        const p = n.getId(h)
          , {clientX: b, clientY: x} = f;
        v(t)({
            type: le[d],
            id: p,
            x: b,
            y: x
        })
    }
    ;
    return Object.keys(le).filter(d => Number.isNaN(Number(d)) && !d.endsWith("_Departed") && a[d] !== !1).forEach(d => {
        const u = d.toLowerCase()
          , h = v(l(d));
        c.push(J(u, h, e))
    }
    ),
    v( () => {
        c.forEach(d => d())
    }
    )
}
function xi({scrollCb: t, doc: e, mirror: n, blockClass: i, blockSelector: s, unblockSelector: r, sampling: o}) {
    const a = Wt(c => {
        const l = Vt(c);
        if (!l || X(l, i, s, r))
            return;
        const d = n.getId(l);
        if (l === e) {
            const u = e.scrollingElement || e.documentElement;
            v(t)({
                id: d,
                x: u.scrollLeft,
                y: u.scrollTop
            })
        } else
            v(t)({
                id: d,
                x: l.scrollLeft,
                y: l.scrollTop
            })
    }
    , o.scroll || 100);
    return J("scroll", v(a), e)
}
function va({viewportResizeCb: t}) {
    let e = -1
      , n = -1;
    const i = Wt( () => {
        const s = bi()
          , r = Si();
        (e !== s || n !== r) && (v(t)({
            width: Number(r),
            height: Number(s)
        }),
        e = s,
        n = r)
    }
    , 200);
    return J("resize", v(i), window)
}
function kn(t, e) {
    const n = Object.assign({}, t);
    return e || delete n.userTriggered,
    n
}
const Ta = ["INPUT", "TEXTAREA", "SELECT"]
  , xn = new WeakMap;
function Ra({inputCb: t, doc: e, mirror: n, blockClass: i, blockSelector: s, unblockSelector: r, ignoreClass: o, ignoreSelector: a, maskInputSelector: c, unmaskInputSelector: l, maskInputOptions: d, maskInputFn: u, sampling: h, userTriggeredOnInput: f}) {
    function p(T) {
        let E = Vt(T);
        const R = E && E.tagName
          , S = T.isTrusted;
        if (R === "OPTION" && (E = E.parentElement),
        !E || !R || Ta.indexOf(R) < 0 || X(E, i, s, r))
            return;
        const g = E
          , B = mi(g);
        if (g.classList.contains(o) || a && g.matches(a))
            return;
        let D = Ce(g, R, B)
          , z = !1;
        (B === "radio" || B === "checkbox") && (z = E.checked),
        Zr({
            maskInputOptions: d,
            maskInputSelector: c,
            tagName: R,
            type: B
        }) && (D = Ht({
            input: g,
            maskInputOptions: d,
            maskInputSelector: c,
            unmaskInputSelector: l,
            tagName: R,
            type: B,
            value: D,
            maskInputFn: u
        })),
        b(E, v(kn)({
            text: D,
            isChecked: z,
            userTriggered: S
        }, f));
        const $ = E.name;
        B === "radio" && $ && z && e.querySelectorAll(`input[type="radio"][name="${$}"]`).forEach(m => {
            if (m !== E) {
                const I = Ht({
                    input: m,
                    maskInputOptions: d,
                    maskInputSelector: c,
                    unmaskInputSelector: l,
                    tagName: R,
                    type: B,
                    value: Ce(m, R, B),
                    maskInputFn: u
                });
                b(m, v(kn)({
                    text: I,
                    isChecked: !z,
                    userTriggered: !1
                }, f))
            }
        }
        )
    }
    function b(T, E) {
        const R = xn.get(T);
        if (!R || R.text !== E.text || R.isChecked !== E.isChecked) {
            xn.set(T, E);
            const S = n.getId(T);
            t(Object.assign(Object.assign({}, E), {
                id: S
            }))
        }
    }
    const y = (h.input === "last" ? ["change"] : ["input", "change"]).map(T => J(T, v(p), e))
      , C = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")
      , N = [[HTMLInputElement.prototype, "value"], [HTMLInputElement.prototype, "checked"], [HTMLSelectElement.prototype, "value"], [HTMLTextAreaElement.prototype, "value"], [HTMLSelectElement.prototype, "selectedIndex"], [HTMLOptionElement.prototype, "selected"]];
    return C && C.set && y.push(...N.map(T => me(T[0], T[1], {
        set() {
            v(p)({
                target: this
            })
        }
    }))),
    v( () => {
        y.forEach(T => T())
    }
    )
}
function de(t) {
    const e = [];
    function n(i, s) {
        if (Qt("CSSGroupingRule") && i.parentRule instanceof CSSGroupingRule || Qt("CSSMediaRule") && i.parentRule instanceof CSSMediaRule || Qt("CSSSupportsRule") && i.parentRule instanceof CSSSupportsRule || Qt("CSSConditionRule") && i.parentRule instanceof CSSConditionRule) {
            const o = Array.from(i.parentRule.cssRules).indexOf(i);
            s.unshift(o)
        } else {
            const o = Array.from(i.parentStyleSheet.cssRules).indexOf(i);
            s.unshift(o)
        }
        return s
    }
    return n(t, e)
}
function ka({styleSheetRuleCb: t, mirror: e}, {win: n}) {
    if (!n.CSSStyleSheet || !n.CSSStyleSheet.prototype)
        return () => {}
        ;
    const i = n.CSSStyleSheet.prototype.insertRule;
    n.CSSStyleSheet.prototype.insertRule = new Proxy(i,{
        apply: v( (a, c, l) => {
            const [d,u] = l
              , h = e.getId(c.ownerNode);
            return h !== -1 && t({
                id: h,
                adds: [{
                    rule: d,
                    index: u
                }]
            }),
            a.apply(c, l)
        }
        )
    });
    const s = n.CSSStyleSheet.prototype.deleteRule;
    n.CSSStyleSheet.prototype.deleteRule = new Proxy(s,{
        apply: v( (a, c, l) => {
            const [d] = l
              , u = e.getId(c.ownerNode);
            return u !== -1 && t({
                id: u,
                removes: [{
                    index: d
                }]
            }),
            a.apply(c, l)
        }
        )
    });
    const r = {};
    te("CSSGroupingRule") ? r.CSSGroupingRule = n.CSSGroupingRule : (te("CSSMediaRule") && (r.CSSMediaRule = n.CSSMediaRule),
    te("CSSConditionRule") && (r.CSSConditionRule = n.CSSConditionRule),
    te("CSSSupportsRule") && (r.CSSSupportsRule = n.CSSSupportsRule));
    const o = {};
    return Object.entries(r).forEach( ([a,c]) => {
        o[a] = {
            insertRule: c.prototype.insertRule,
            deleteRule: c.prototype.deleteRule
        },
        c.prototype.insertRule = new Proxy(o[a].insertRule,{
            apply: v( (l, d, u) => {
                const [h,f] = u
                  , p = e.getId(d.parentStyleSheet.ownerNode);
                return p !== -1 && t({
                    id: p,
                    adds: [{
                        rule: h,
                        index: [...de(d), f || 0]
                    }]
                }),
                l.apply(d, u)
            }
            )
        }),
        c.prototype.deleteRule = new Proxy(o[a].deleteRule,{
            apply: v( (l, d, u) => {
                const [h] = u
                  , f = e.getId(d.parentStyleSheet.ownerNode);
                return f !== -1 && t({
                    id: f,
                    removes: [{
                        index: [...de(d), h]
                    }]
                }),
                l.apply(d, u)
            }
            )
        })
    }
    ),
    v( () => {
        n.CSSStyleSheet.prototype.insertRule = i,
        n.CSSStyleSheet.prototype.deleteRule = s,
        Object.entries(r).forEach( ([a,c]) => {
            c.prototype.insertRule = o[a].insertRule,
            c.prototype.deleteRule = o[a].deleteRule
        }
        )
    }
    )
}
function xa({styleDeclarationCb: t, mirror: e}, {win: n}) {
    const i = n.CSSStyleDeclaration.prototype.setProperty;
    n.CSSStyleDeclaration.prototype.setProperty = new Proxy(i,{
        apply: v( (r, o, a) => {
            var c, l;
            const [d,u,h] = a
              , f = e.getId((l = (c = o.parentRule) === null || c === void 0 ? void 0 : c.parentStyleSheet) === null || l === void 0 ? void 0 : l.ownerNode);
            return f !== -1 && t({
                id: f,
                set: {
                    property: d,
                    value: u,
                    priority: h
                },
                index: de(o.parentRule)
            }),
            r.apply(o, a)
        }
        )
    });
    const s = n.CSSStyleDeclaration.prototype.removeProperty;
    return n.CSSStyleDeclaration.prototype.removeProperty = new Proxy(s,{
        apply: v( (r, o, a) => {
            var c, l;
            const [d] = a
              , u = e.getId((l = (c = o.parentRule) === null || c === void 0 ? void 0 : c.parentStyleSheet) === null || l === void 0 ? void 0 : l.ownerNode);
            return u !== -1 && t({
                id: u,
                remove: {
                    property: d
                },
                index: de(o.parentRule)
            }),
            r.apply(o, a)
        }
        )
    }),
    v( () => {
        n.CSSStyleDeclaration.prototype.setProperty = i,
        n.CSSStyleDeclaration.prototype.removeProperty = s
    }
    )
}
function Na({mediaInteractionCb: t, blockClass: e, blockSelector: n, unblockSelector: i, mirror: s, sampling: r}) {
    const o = c => Wt(v(l => {
        const d = Vt(l);
        if (!d || X(d, e, n, i))
            return;
        const {currentTime: u, volume: h, muted: f} = d;
        t({
            type: c,
            id: s.getId(d),
            currentTime: u,
            volume: h,
            muted: f
        })
    }
    ), r.media || 500)
      , a = [J("play", o(0)), J("pause", o(1)), J("seeked", o(2)), J("volumechange", o(3))];
    return v( () => {
        a.forEach(c => c())
    }
    )
}
function Da({fontCb: t, doc: e}) {
    const n = e.defaultView;
    if (!n)
        return () => {}
        ;
    const i = []
      , s = new WeakMap
      , r = n.FontFace;
    n.FontFace = function(c, l, d) {
        const u = new r(c,l,d);
        return s.set(u, {
            family: c,
            buffer: typeof l != "string",
            descriptors: d,
            fontSource: typeof l == "string" ? l : JSON.stringify(Array.from(new Uint8Array(l)))
        }),
        u
    }
    ;
    const o = kt(e.fonts, "add", function(a) {
        return function(c) {
            return setTimeout( () => {
                const l = s.get(c);
                l && (t(l),
                s.delete(c))
            }
            , 0),
            a.apply(this, [c])
        }
    });
    return i.push( () => {
        n.FontFace = r
    }
    ),
    i.push(o),
    v( () => {
        i.forEach(a => a())
    }
    )
}
function Ia(t, e) {
    const {mutationCb: n, mousemoveCb: i, mouseInteractionCb: s, scrollCb: r, viewportResizeCb: o, inputCb: a, mediaInteractionCb: c, styleSheetRuleCb: l, styleDeclarationCb: d, canvasMutationCb: u, fontCb: h} = t;
    t.mutationCb = (...f) => {
        e.mutation && e.mutation(...f),
        n(...f)
    }
    ,
    t.mousemoveCb = (...f) => {
        e.mousemove && e.mousemove(...f),
        i(...f)
    }
    ,
    t.mouseInteractionCb = (...f) => {
        e.mouseInteraction && e.mouseInteraction(...f),
        s(...f)
    }
    ,
    t.scrollCb = (...f) => {
        e.scroll && e.scroll(...f),
        r(...f)
    }
    ,
    t.viewportResizeCb = (...f) => {
        e.viewportResize && e.viewportResize(...f),
        o(...f)
    }
    ,
    t.inputCb = (...f) => {
        e.input && e.input(...f),
        a(...f)
    }
    ,
    t.mediaInteractionCb = (...f) => {
        e.mediaInteaction && e.mediaInteaction(...f),
        c(...f)
    }
    ,
    t.styleSheetRuleCb = (...f) => {
        e.styleSheetRule && e.styleSheetRule(...f),
        l(...f)
    }
    ,
    t.styleDeclarationCb = (...f) => {
        e.styleDeclaration && e.styleDeclaration(...f),
        d(...f)
    }
    ,
    t.canvasMutationCb = (...f) => {
        e.canvasMutation && e.canvasMutation(...f),
        u(...f)
    }
    ,
    t.fontCb = (...f) => {
        e.font && e.font(...f),
        h(...f)
    }
}
function Aa(t, e={}) {
    const n = t.doc.defaultView;
    if (!n)
        return () => {}
        ;
    Ia(t, e);
    const i = ki(t, t.doc)
      , s = Sa(t)
      , r = wa(t)
      , o = xi(t)
      , a = va(t)
      , c = Ra(t)
      , l = Na(t)
      , d = ka(t, {
        win: n
    })
      , u = xa(t, {
        win: n
    })
      , h = t.collectFonts ? Da(t) : () => {}
      , f = [];
    for (const p of t.plugins)
        f.push(p.observer(p.callback, n, p.options));
    return v( () => {
        mt.forEach(p => p.reset()),
        i.disconnect(),
        s(),
        r(),
        o(),
        a(),
        c(),
        l();
        try {
            d(),
            u()
        } catch {}
        h(),
        f.forEach(p => p())
    }
    )
}
function Qt(t) {
    return typeof window[t] < "u"
}
function te(t) {
    return !!(typeof window[t] < "u" && window[t].prototype && "insertRule"in window[t].prototype && "deleteRule"in window[t].prototype)
}
class Ca {
    constructor(e) {
        this.iframes = new WeakMap,
        this.mutationCb = e.mutationCb
    }
    addIframe(e) {
        this.iframes.set(e, !0)
    }
    addLoadListener(e) {
        this.loadListener = e
    }
    attachIframe(e, n) {
        var i;
        this.mutationCb({
            adds: [{
                parentId: e.__sn.id,
                nextId: null,
                node: n
            }],
            removes: [],
            texts: [],
            attributes: [],
            isAttachIframe: !0
        }),
        (i = this.loadListener) === null || i === void 0 || i.call(this, e)
    }
}
class Oa {
    constructor(e) {
        this.restorePatches = [],
        this.mutationCb = e.mutationCb,
        this.scrollCb = e.scrollCb,
        this.bypassOptions = e.bypassOptions,
        this.mirror = e.mirror;
        const n = this;
        this.restorePatches.push(kt(HTMLElement.prototype, "attachShadow", function(i) {
            return function() {
                const s = i.apply(this, arguments);
                return this.shadowRoot && n.addShadowRoot(this.shadowRoot, this.ownerDocument),
                s
            }
        }))
    }
    addShadowRoot(e, n) {
        ki(Object.assign(Object.assign({}, this.bypassOptions), {
            doc: n,
            mutationCb: this.mutationCb,
            mirror: this.mirror,
            shadowDomManager: this
        }), e),
        xi(Object.assign(Object.assign({}, this.bypassOptions), {
            scrollCb: this.scrollCb,
            doc: e,
            mirror: this.mirror
        }))
    }
    observeAttachShadow(e) {
        if (e.contentWindow) {
            const n = this;
            this.restorePatches.push(kt(e.contentWindow.HTMLElement.prototype, "attachShadow", function(i) {
                return function() {
                    const s = i.apply(this, arguments);
                    return this.shadowRoot && n.addShadowRoot(this.shadowRoot, e.contentDocument),
                    s
                }
            }))
        }
    }
    reset() {
        this.restorePatches.forEach(e => e())
    }
}
function Ba(t, e) {
    var n = {};
    for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
    if (t != null && typeof Object.getOwnPropertySymbols == "function")
        for (var s = 0, i = Object.getOwnPropertySymbols(t); s < i.length; s++)
            e.indexOf(i[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, i[s]) && (n[i[s]] = t[i[s]]);
    return n
}
function Ua(t, e, n, i, s, r) {
    const o = []
      , a = Object.getOwnPropertyNames(e.CanvasRenderingContext2D.prototype);
    for (const c of a)
        try {
            if (typeof e.CanvasRenderingContext2D.prototype[c] != "function")
                continue;
            const l = kt(e.CanvasRenderingContext2D.prototype, c, function(d) {
                return function(...u) {
                    return X(this.canvas, n, s, i) || setTimeout( () => {
                        const h = [...u];
                        if (c === "drawImage" && h[0] && h[0]instanceof HTMLCanvasElement) {
                            const f = h[0]
                              , p = f.getContext("2d");
                            let b = p?.getImageData(0, 0, f.width, f.height)
                              , x = b?.data;
                            h[0] = JSON.stringify(x)
                        }
                        t(this.canvas, {
                            type: Rt["2D"],
                            property: c,
                            args: h
                        })
                    }
                    , 0),
                    d.apply(this, u)
                }
            });
            o.push(l)
        } catch {
            const d = me(e.CanvasRenderingContext2D.prototype, c, {
                set(u) {
                    t(this.canvas, {
                        type: Rt["2D"],
                        property: c,
                        args: [u],
                        setter: !0
                    })
                }
            });
            o.push(d)
        }
    return () => {
        o.forEach(c => c())
    }
}
function La(t, e, n, i) {
    const s = [];
    try {
        const r = kt(t.HTMLCanvasElement.prototype, "getContext", function(o) {
            return function(a, ...c) {
                return X(this, e, n, i) || "__context"in this || (this.__context = a),
                o.apply(this, [a, ...c])
            }
        });
        s.push(r)
    } catch {
        console.error("failed to patch HTMLCanvasElement.prototype.getContext")
    }
    return () => {
        s.forEach(r => r())
    }
}
var wt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  , Ma = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var ee = 0; ee < wt.length; ee++)
    Ma[wt.charCodeAt(ee)] = ee;
var za = function(t) {
    var e = new Uint8Array(t), n, i = e.length, s = "";
    for (n = 0; n < i; n += 3)
        s += wt[e[n] >> 2],
        s += wt[(e[n] & 3) << 4 | e[n + 1] >> 4],
        s += wt[(e[n + 1] & 15) << 2 | e[n + 2] >> 6],
        s += wt[e[n + 2] & 63];
    return i % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : i % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="),
    s
};
const Nn = new Map;
function Pa(t, e) {
    let n = Nn.get(t);
    return n || (n = new Map,
    Nn.set(t, n)),
    n.has(e) || n.set(e, []),
    n.get(e)
}
const Ni = (t, e, n) => {
    if (!t || !(Di(t, e) || typeof t == "object"))
        return;
    const i = t.constructor.name
      , s = Pa(n, i);
    let r = s.indexOf(t);
    return r === -1 && (r = s.length,
    s.push(t)),
    r
}
;
function re(t, e, n) {
    if (t instanceof Array)
        return t.map(i => re(i, e, n));
    if (t === null)
        return t;
    if (t instanceof Float32Array || t instanceof Float64Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Uint8Array || t instanceof Uint16Array || t instanceof Int16Array || t instanceof Int8Array || t instanceof Uint8ClampedArray)
        return {
            rr_type: t.constructor.name,
            args: [Object.values(t)]
        };
    if (t instanceof ArrayBuffer) {
        const i = t.constructor.name
          , s = za(t);
        return {
            rr_type: i,
            base64: s
        }
    } else {
        if (t instanceof DataView)
            return {
                rr_type: t.constructor.name,
                args: [re(t.buffer, e, n), t.byteOffset, t.byteLength]
            };
        if (t instanceof HTMLImageElement) {
            const i = t.constructor.name
              , {src: s} = t;
            return {
                rr_type: i,
                src: s
            }
        } else {
            if (t instanceof ImageData)
                return {
                    rr_type: t.constructor.name,
                    args: [re(t.data, e, n), t.width, t.height]
                };
            if (Di(t, e) || typeof t == "object") {
                const i = t.constructor.name
                  , s = Ni(t, e, n);
                return {
                    rr_type: i,
                    index: s
                }
            }
        }
    }
    return t
}
const Ga = (t, e, n) => [...t].map(i => re(i, e, n))
  , Di = (t, e) => !!["WebGLActiveInfo", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLShaderPrecisionFormat", "WebGLTexture", "WebGLUniformLocation", "WebGLVertexArrayObject", "WebGLVertexArrayObjectOES"].filter(s => typeof e[s] == "function").find(s => t instanceof e[s]);
function Dn(t, e, n, i, s, r, o, a) {
    const c = []
      , l = Object.getOwnPropertyNames(t);
    for (const d of l)
        try {
            if (typeof t[d] != "function")
                continue;
            const u = kt(t, d, function(h) {
                return function(...f) {
                    const p = h.apply(this, f);
                    if (Ni(p, a, t),
                    !X(this.canvas, i, r, s)) {
                        const b = o.getId(this.canvas)
                          , x = Ga([...f], a, t)
                          , y = {
                            type: e,
                            property: d,
                            args: x
                        };
                        n(this.canvas, y)
                    }
                    return p
                }
            });
            c.push(u)
        } catch {
            const h = me(t, d, {
                set(f) {
                    n(this.canvas, {
                        type: e,
                        property: d,
                        args: [f],
                        setter: !0
                    })
                }
            });
            c.push(h)
        }
    return c
}
function Ya(t, e, n, i, s, r) {
    const o = [];
    return o.push(...Dn(e.WebGLRenderingContext.prototype, Rt.WebGL, t, n, i, s, r, e)),
    typeof e.WebGL2RenderingContext < "u" && o.push(...Dn(e.WebGL2RenderingContext.prototype, Rt.WebGL2, t, n, i, s, r, e)),
    () => {
        o.forEach(a => a())
    }
}
class Fa {
    reset() {
        this.pendingCanvasMutations.clear(),
        this.resetObservers && this.resetObservers()
    }
    freeze() {
        this.frozen = !0
    }
    unfreeze() {
        this.frozen = !1
    }
    lock() {
        this.locked = !0
    }
    unlock() {
        this.locked = !1
    }
    constructor(e) {
        this.pendingCanvasMutations = new Map,
        this.rafStamps = {
            latestId: 0,
            invokeId: null
        },
        this.frozen = !1,
        this.locked = !1,
        this.processMutation = function(n, i) {
            (this.rafStamps.invokeId && this.rafStamps.latestId !== this.rafStamps.invokeId || !this.rafStamps.invokeId) && (this.rafStamps.invokeId = this.rafStamps.latestId),
            this.pendingCanvasMutations.has(n) || this.pendingCanvasMutations.set(n, []),
            this.pendingCanvasMutations.get(n).push(i)
        }
        ,
        this.mutationCb = e.mutationCb,
        this.mirror = e.mirror,
        e.recordCanvas === !0 && this.initCanvasMutationObserver(e.win, e.blockClass, e.blockSelector, e.unblockSelector)
    }
    initCanvasMutationObserver(e, n, i, s) {
        this.startRAFTimestamping(),
        this.startPendingCanvasMutationFlusher();
        const r = La(e, n, s, i)
          , o = Ua(this.processMutation.bind(this), e, n, s, i, this.mirror)
          , a = Ya(this.processMutation.bind(this), e, n, s, i, this.mirror);
        this.resetObservers = () => {
            r(),
            o(),
            a()
        }
    }
    startPendingCanvasMutationFlusher() {
        requestAnimationFrame( () => this.flushPendingCanvasMutations())
    }
    startRAFTimestamping() {
        const e = n => {
            this.rafStamps.latestId = n,
            requestAnimationFrame(e)
        }
        ;
        requestAnimationFrame(e)
    }
    flushPendingCanvasMutations() {
        this.pendingCanvasMutations.forEach( (e, n) => {
            const i = this.mirror.getId(n);
            this.flushPendingCanvasMutationFor(n, i)
        }
        ),
        requestAnimationFrame( () => this.flushPendingCanvasMutations())
    }
    flushPendingCanvasMutationFor(e, n) {
        if (this.frozen || this.locked)
            return;
        const i = this.pendingCanvasMutations.get(e);
        if (!i || n === -1)
            return;
        const s = i.map(o => Ba(o, ["type"]))
          , {type: r} = i[0];
        this.mutationCb({
            id: n,
            type: r,
            commands: s
        }),
        this.pendingCanvasMutations.delete(e)
    }
}
function j(t) {
    return Object.assign(Object.assign({}, t), {
        timestamp: Date.now()
    })
}
let F, zt;
const Ut = ga();
function gt(t={}) {
    const {emit: e, checkoutEveryNms: n, checkoutEveryNth: i, blockClass: s="rr-block", blockSelector: r=null, unblockSelector: o=null, ignoreClass: a="rr-ignore", ignoreSelector: c=null, maskTextClass: l="rr-mask", maskTextSelector: d=null, maskInputSelector: u=null, unmaskTextSelector: h=null, unmaskInputSelector: f=null, inlineStylesheet: p=!0, maskAllText: b=!1, maskAllInputs: x, maskInputOptions: y, slimDOMOptions: C, maskInputFn: N, maskTextFn: T, hooks: E, packFn: R, sampling: S={}, mousemoveWait: g, recordCanvas: B=!1, userTriggeredOnInput: D=!1, collectFonts: z=!1, inlineImages: $=!1, plugins: m, keepIframeSrcFn: I= () => !1, onMutation: P} = t;
    if (!e)
        throw new Error("emit function is required");
    g !== void 0 && S.mousemove === void 0 && (S.mousemove = g);
    const V = x === !0 ? {
        color: !0,
        date: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
        textarea: !0,
        select: !0,
        radio: !0,
        checkbox: !0
    } : y !== void 0 ? y : {}
      , it = C === !0 || C === "all" ? {
        script: !0,
        comment: !0,
        headFavicon: !0,
        headWhitespace: !0,
        headMetaSocial: !0,
        headMetaRobots: !0,
        headMetaHttpEquiv: !0,
        headMetaVerification: !0,
        headMetaAuthorship: C === "all",
        headMetaDescKeywords: C === "all"
    } : C || {};
    ya();
    let ln, we = 0;
    const cs = w => {
        for (const tt of m || [])
            tt.eventProcessor && (w = tt.eventProcessor(w));
        return R && (w = R(w)),
        w
    }
    ;
    F = (w, tt) => {
        var st;
        if (!((st = mt[0]) === null || st === void 0) && st.isFrozen() && w.type !== A.FullSnapshot && !(w.type === A.IncrementalSnapshot && w.data.source === Z.Mutation) && mt.forEach(K => K.unfreeze()),
        e(cs(w), tt),
        w.type === A.FullSnapshot)
            ln = w,
            we = 0;
        else if (w.type === A.IncrementalSnapshot) {
            if (w.data.source === Z.Mutation && w.data.isAttachIframe)
                return;
            we++;
            const K = i && we >= i
              , et = n && w.timestamp - ln.timestamp > n;
            (K || et) && zt(!0)
        }
    }
    ;
    const ve = w => {
        F(j({
            type: A.IncrementalSnapshot,
            data: Object.assign({
                source: Z.Mutation
            }, w)
        }))
    }
      , dn = w => F(j({
        type: A.IncrementalSnapshot,
        data: Object.assign({
            source: Z.Scroll
        }, w)
    }))
      , un = w => F(j({
        type: A.IncrementalSnapshot,
        data: Object.assign({
            source: Z.CanvasMutation
        }, w)
    }))
      , Ct = new Ca({
        mutationCb: ve
    })
      , fn = new Fa({
        recordCanvas: B,
        mutationCb: un,
        win: window,
        blockClass: s,
        blockSelector: r,
        unblockSelector: o,
        mirror: Ut
    })
      , Te = new Oa({
        mutationCb: ve,
        scrollCb: dn,
        bypassOptions: {
            onMutation: P,
            blockClass: s,
            blockSelector: r,
            unblockSelector: o,
            maskTextClass: l,
            maskTextSelector: d,
            unmaskTextSelector: h,
            maskInputSelector: u,
            unmaskInputSelector: f,
            inlineStylesheet: p,
            maskAllText: b,
            maskInputOptions: V,
            maskTextFn: T,
            maskInputFn: N,
            recordCanvas: B,
            inlineImages: $,
            sampling: S,
            slimDOMOptions: it,
            iframeManager: Ct,
            canvasManager: fn
        },
        mirror: Ut
    });
    zt = (w=!1) => {
        var tt, st, K, et;
        F(j({
            type: A.Meta,
            data: {
                href: window.location.href,
                width: Si(),
                height: bi()
            }
        }), w),
        mt.forEach(nt => nt.lock());
        const [L,Ot] = pa(document, {
            blockClass: s,
            blockSelector: r,
            unblockSelector: o,
            maskTextClass: l,
            maskTextSelector: d,
            unmaskTextSelector: h,
            maskInputSelector: u,
            unmaskInputSelector: f,
            inlineStylesheet: p,
            maskAllText: b,
            maskAllInputs: V,
            maskTextFn: T,
            slimDOM: it,
            recordCanvas: B,
            inlineImages: $,
            onSerialize: nt => {
                Ti(nt) && Ct.addIframe(nt),
                Ri(nt) && Te.addShadowRoot(nt.shadowRoot, document)
            }
            ,
            onIframeLoad: (nt, ls) => {
                Ct.attachIframe(nt, ls),
                Te.observeAttachShadow(nt)
            }
            ,
            keepIframeSrcFn: I
        });
        if (!L)
            return console.warn("Failed to snapshot the document");
        Ut.map = Ot,
        F(j({
            type: A.FullSnapshot,
            data: {
                node: L,
                initialOffset: {
                    left: window.pageXOffset !== void 0 ? window.pageXOffset : document?.documentElement.scrollLeft || ((st = (tt = document?.body) === null || tt === void 0 ? void 0 : tt.parentElement) === null || st === void 0 ? void 0 : st.scrollLeft) || document?.body.scrollLeft || 0,
                    top: window.pageYOffset !== void 0 ? window.pageYOffset : document?.documentElement.scrollTop || ((et = (K = document?.body) === null || K === void 0 ? void 0 : K.parentElement) === null || et === void 0 ? void 0 : et.scrollTop) || document?.body.scrollTop || 0
                }
            }
        })),
        mt.forEach(nt => nt.unlock())
    }
    ;
    try {
        const w = [];
        w.push(J("DOMContentLoaded", () => {
            F(j({
                type: A.DomContentLoaded,
                data: {}
            }))
        }
        ));
        const tt = K => {
            var et;
            return v(Aa)({
                onMutation: P,
                mutationCb: ve,
                mousemoveCb: (L, Ot) => F(j({
                    type: A.IncrementalSnapshot,
                    data: {
                        source: Ot,
                        positions: L
                    }
                })),
                mouseInteractionCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.MouseInteraction
                    }, L)
                })),
                scrollCb: dn,
                viewportResizeCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.ViewportResize
                    }, L)
                })),
                inputCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.Input
                    }, L)
                })),
                mediaInteractionCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.MediaInteraction
                    }, L)
                })),
                styleSheetRuleCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.StyleSheetRule
                    }, L)
                })),
                styleDeclarationCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.StyleDeclaration
                    }, L)
                })),
                canvasMutationCb: un,
                fontCb: L => F(j({
                    type: A.IncrementalSnapshot,
                    data: Object.assign({
                        source: Z.Font
                    }, L)
                })),
                blockClass: s,
                ignoreClass: a,
                ignoreSelector: c,
                maskTextClass: l,
                maskTextSelector: d,
                unmaskTextSelector: h,
                maskInputSelector: u,
                unmaskInputSelector: f,
                maskInputOptions: V,
                inlineStylesheet: p,
                sampling: S,
                recordCanvas: B,
                inlineImages: $,
                userTriggeredOnInput: D,
                collectFonts: z,
                doc: K,
                maskAllText: b,
                maskInputFn: N,
                maskTextFn: T,
                blockSelector: r,
                unblockSelector: o,
                slimDOMOptions: it,
                mirror: Ut,
                iframeManager: Ct,
                shadowDomManager: Te,
                canvasManager: fn,
                plugins: ((et = m?.filter(L => L.observer)) === null || et === void 0 ? void 0 : et.map(L => ({
                    observer: L.observer,
                    options: L.options,
                    callback: Ot => F(j({
                        type: A.Plugin,
                        data: {
                            plugin: L.name,
                            payload: Ot
                        }
                    }))
                }))) || []
            }, E)
        }
        ;
        Ct.addLoadListener(K => {
            try {
                w.push(tt(K.contentDocument))
            } catch (et) {
                console.warn(et)
            }
        }
        );
        const st = () => {
            zt(),
            w.push(tt(document))
        }
        ;
        return document.readyState === "interactive" || document.readyState === "complete" ? st() : w.push(J("load", () => {
            F(j({
                type: A.Load,
                data: {}
            })),
            st()
        }
        , window)),
        () => {
            w.forEach(K => K())
        }
    } catch (w) {
        console.warn(w)
    }
}
gt.addCustomEvent = (t, e) => {
    if (!F)
        throw new Error("please add custom event after start recording");
    F(j({
        type: A.Custom,
        data: {
            tag: t,
            payload: e
        }
    }))
}
;
gt.freezePage = () => {
    mt.forEach(t => t.freeze())
}
;
gt.takeFullSnapshot = t => {
    if (!zt)
        throw new Error("please take full snapshot after start recording");
    zt(t)
}
;
gt.mirror = Ut;
function ct(t) {
    return {
        timestamp: Date.now() / 1e3,
        type: "default",
        ...t
    }
}
var ue;
(function(t) {
    t[t.Document = 0] = "Document",
    t[t.DocumentType = 1] = "DocumentType",
    t[t.Element = 2] = "Element",
    t[t.Text = 3] = "Text",
    t[t.CDATA = 4] = "CDATA",
    t[t.Comment = 5] = "Comment"
}
)(ue || (ue = {}));
function ge(t, e) {
    e.category !== "sentry.transaction" && (["ui.click", "ui.input"].includes(e.category) ? t.triggerUserActivity() : t.checkAndHandleExpiredSession(),
    t.addUpdate( () => (t.throttledAddEvent({
        type: A.Custom,
        timestamp: (e.timestamp || 0) * 1e3,
        data: {
            tag: "breadcrumb",
            payload: Ve(e, 10, 1e3)
        }
    }),
    e.category === "console")))
}
function Ha(t, e, n, i) {
    if (Wa(i, e))
        return;
    let s = () => {}
    ;
    const r = setTimeout( () => {
        Ii(t, n, e.timeout, "timeout"),
        s()
    }
    , e.timeout)
      , o = () => {
        In(t, n, e.threshold, e.timeout, "mutation"),
        s()
    }
      , a = () => {
        In(t, n, e.scrollTimeout, e.timeout, "scroll"),
        s()
    }
      , c = new MutationObserver(o);
    c.observe(k.document.documentElement, {
        attributes: !0,
        characterData: !0,
        childList: !0,
        subtree: !0
    }),
    k.addEventListener("scroll", a);
    const l = setTimeout( () => {
        k.removeEventListener("scroll", a)
    }
    , e.scrollTimeout);
    s = () => {
        clearTimeout(r),
        clearTimeout(l),
        c.disconnect(),
        k.removeEventListener("scroll", a)
    }
}
function In(t, e, n, i, s) {
    const o = Date.now() - e.timestamp * 1e3;
    return o > n ? (Ii(t, e, Math.min(o, i), s),
    !0) : !1
}
function Ii(t, e, n, i) {
    const s = {
        message: e.message,
        timestamp: e.timestamp,
        category: "ui.slowClickDetected",
        data: {
            ...e.data,
            url: k.location.href,
            timeAfterClickMs: n,
            endReason: i
        }
    };
    ge(t, s)
}
const $a = ["A", "BUTTON", "INPUT"];
function Wa(t, e) {
    return !!(!$a.includes(t.tagName) || t.tagName === "INPUT" && !["submit", "button"].includes(t.getAttribute("type") || "") || t.tagName === "A" && (t.hasAttribute("download") || t.hasAttribute("target") && t.getAttribute("target") !== "_self") || e.ignoreSelector && t.matches(e.ignoreSelector))
}
const ja = new Set(["id", "class", "aria-label", "role", "name", "alt", "title", "data-test-id", "data-testid", "disabled", "aria-disabled"]);
function Za(t) {
    const e = {};
    for (const n in t)
        if (ja.has(n)) {
            let i = n;
            (n === "data-testid" || n === "data-test-id") && (i = "testId"),
            e[i] = t[n]
        }
    return e
}
const qa = t => {
    const {slowClickTimeout: e, slowClickIgnoreSelectors: n} = t.getOptions()
      , i = e ? {
        threshold: Math.min($r, e),
        timeout: e,
        scrollTimeout: Wr,
        ignoreSelector: n ? n.join(",") : ""
    } : void 0;
    return s => {
        if (!t.isEnabled())
            return;
        const r = Va(s);
        if (!r)
            return;
        const o = s.name === "click"
          , a = o && s.event;
        o && i && a && !a.altKey && !a.metaKey && !a.ctrlKey && Ha(t, i, r, Oi(s.event)),
        ge(t, r)
    }
}
;
function Ai(t, e) {
    const n = t && Ka(t) && t.__sn.type === ue.Element ? t.__sn : null;
    return {
        message: e,
        data: n ? {
            nodeId: n.id,
            node: {
                id: n.id,
                tagName: n.tagName,
                textContent: t ? Array.from(t.childNodes).map(i => "__sn"in i && i.__sn.type === ue.Text && i.__sn.textContent).filter(Boolean).map(i => i.trim()).join("") : "",
                attributes: Za(n.attributes)
            }
        } : {}
    }
}
function Va(t) {
    const {target: e, message: n} = Xa(t);
    return ct({
        category: `ui.${t.name}`,
        ...Ai(e, n)
    })
}
function Xa(t) {
    const e = t.name === "click";
    let n, i = null;
    try {
        i = e ? Oi(t.event) : Ci(t.event),
        n = Ft(i, {
            maxStringLength: 200
        }) || "<unknown>"
    } catch {
        n = "<unknown>"
    }
    return {
        target: i,
        message: n
    }
}
function Ka(t) {
    return "__sn"in t
}
function Ci(t) {
    return Qa(t) ? t.target : t
}
const Ja = "button,a";
function Oi(t) {
    const e = Ci(t);
    return !e || !(e instanceof Element) ? e : e.closest(Ja) || e
}
function Qa(t) {
    return typeof t == "object" && !!t && "target"in t
}
function to(t, e) {
    if (!t.isEnabled())
        return;
    t.updateUserActivity();
    const n = eo(e);
    n && ge(t, n)
}
function eo(t) {
    const {metaKey: e, shiftKey: n, ctrlKey: i, altKey: s, key: r, target: o} = t;
    if (!o || no(o) || !r)
        return null;
    const a = e || i || s
      , c = r.length === 1;
    if (!a && c)
        return null;
    const l = Ft(o, {
        maxStringLength: 200
    }) || "<unknown>"
      , d = Ai(o, l);
    return ct({
        category: "ui.keyDown",
        message: l,
        data: {
            ...d.data,
            metaKey: e,
            shiftKey: n,
            ctrlKey: i,
            altKey: s,
            key: r
        }
    })
}
function no(t) {
    return t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable
}
const io = ["name", "type", "startTime", "transferSize", "duration"];
function An(t) {
    return function(e) {
        return io.every(n => t[n] === e[n])
    }
}
function so(t, e) {
    const [n,i,s] = t.reduce( (c, l) => (l.entryType === "navigation" ? c[0].push(l) : l.entryType === "largest-contentful-paint" ? c[1].push(l) : c[2].push(l),
    c), [[], [], []])
      , r = []
      , o = [];
    let a = i.length ? i[i.length - 1] : void 0;
    return e.forEach(c => {
        if (c.entryType === "largest-contentful-paint") {
            (!a || a.startTime < c.startTime) && (a = c);
            return
        }
        if (c.entryType === "navigation") {
            const l = c;
            c.duration > 0 && !n.find(An(l)) && !o.find(An(l)) && o.push(l);
            return
        }
        r.push(c)
    }
    ),
    [...a ? [a] : [], ...n, ...s, ...r, ...o].sort( (c, l) => c.startTime - l.startTime)
}
function ro(t) {
    const e = i => {
        const s = so(t.performanceEvents, i.getEntries());
        t.performanceEvents = s
    }
      , n = new PerformanceObserver(e);
    return ["element", "event", "first-input", "largest-contentful-paint", "layout-shift", "longtask", "navigation", "paint", "resource"].forEach(i => {
        try {
            n.observe({
                type: i,
                buffered: !0
            })
        } catch {}
    }
    ),
    n
}
const ao = `/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
function t(t){let e=t.length;for(;--e>=0;)t[e]=0}const e=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),a=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),i=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),n=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),s=new Array(576);t(s);const r=new Array(60);t(r);const o=new Array(512);t(o);const l=new Array(256);t(l);const h=new Array(29);t(h);const d=new Array(30);function _(t,e,a,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=a,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}let f,c,u;function w(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}t(d);const m=t=>t<256?o[t]:o[256+(t>>>7)],b=(t,e)=>{t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255},g=(t,e,a)=>{t.bi_valid>16-a?(t.bi_buf|=e<<t.bi_valid&65535,b(t,t.bi_buf),t.bi_buf=e>>16-t.bi_valid,t.bi_valid+=a-16):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=a)},p=(t,e,a)=>{g(t,a[2*e],a[2*e+1])},k=(t,e)=>{let a=0;do{a|=1&t,t>>>=1,a<<=1}while(--e>0);return a>>>1},v=(t,e,a)=>{const i=new Array(16);let n,s,r=0;for(n=1;n<=15;n++)r=r+a[n-1]<<1,i[n]=r;for(s=0;s<=e;s++){let e=t[2*s+1];0!==e&&(t[2*s]=k(i[e]++,e))}},y=t=>{let e;for(e=0;e<286;e++)t.dyn_ltree[2*e]=0;for(e=0;e<30;e++)t.dyn_dtree[2*e]=0;for(e=0;e<19;e++)t.bl_tree[2*e]=0;t.dyn_ltree[512]=1,t.opt_len=t.static_len=0,t.sym_next=t.matches=0},x=t=>{t.bi_valid>8?b(t,t.bi_buf):t.bi_valid>0&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0},z=(t,e,a,i)=>{const n=2*e,s=2*a;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[a]},A=(t,e,a)=>{const i=t.heap[a];let n=a<<1;for(;n<=t.heap_len&&(n<t.heap_len&&z(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!z(e,i,t.heap[n],t.depth));)t.heap[a]=t.heap[n],a=n,n<<=1;t.heap[a]=i},E=(t,i,n)=>{let s,r,o,_,f=0;if(0!==t.sym_next)do{s=255&t.pending_buf[t.sym_buf+f++],s+=(255&t.pending_buf[t.sym_buf+f++])<<8,r=t.pending_buf[t.sym_buf+f++],0===s?p(t,r,i):(o=l[r],p(t,o+256+1,i),_=e[o],0!==_&&(r-=h[o],g(t,r,_)),s--,o=m(s),p(t,o,n),_=a[o],0!==_&&(s-=d[o],g(t,s,_)))}while(f<t.sym_next);p(t,256,i)},R=(t,e)=>{const a=e.dyn_tree,i=e.stat_desc.static_tree,n=e.stat_desc.has_stree,s=e.stat_desc.elems;let r,o,l,h=-1;for(t.heap_len=0,t.heap_max=573,r=0;r<s;r++)0!==a[2*r]?(t.heap[++t.heap_len]=h=r,t.depth[r]=0):a[2*r+1]=0;for(;t.heap_len<2;)l=t.heap[++t.heap_len]=h<2?++h:0,a[2*l]=1,t.depth[l]=0,t.opt_len--,n&&(t.static_len-=i[2*l+1]);for(e.max_code=h,r=t.heap_len>>1;r>=1;r--)A(t,a,r);l=s;do{r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],A(t,a,1),o=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=o,a[2*l]=a[2*r]+a[2*o],t.depth[l]=(t.depth[r]>=t.depth[o]?t.depth[r]:t.depth[o])+1,a[2*r+1]=a[2*o+1]=l,t.heap[1]=l++,A(t,a,1)}while(t.heap_len>=2);t.heap[--t.heap_max]=t.heap[1],((t,e)=>{const a=e.dyn_tree,i=e.max_code,n=e.stat_desc.static_tree,s=e.stat_desc.has_stree,r=e.stat_desc.extra_bits,o=e.stat_desc.extra_base,l=e.stat_desc.max_length;let h,d,_,f,c,u,w=0;for(f=0;f<=15;f++)t.bl_count[f]=0;for(a[2*t.heap[t.heap_max]+1]=0,h=t.heap_max+1;h<573;h++)d=t.heap[h],f=a[2*a[2*d+1]+1]+1,f>l&&(f=l,w++),a[2*d+1]=f,d>i||(t.bl_count[f]++,c=0,d>=o&&(c=r[d-o]),u=a[2*d],t.opt_len+=u*(f+c),s&&(t.static_len+=u*(n[2*d+1]+c)));if(0!==w){do{for(f=l-1;0===t.bl_count[f];)f--;t.bl_count[f]--,t.bl_count[f+1]+=2,t.bl_count[l]--,w-=2}while(w>0);for(f=l;0!==f;f--)for(d=t.bl_count[f];0!==d;)_=t.heap[--h],_>i||(a[2*_+1]!==f&&(t.opt_len+=(f-a[2*_+1])*a[2*_],a[2*_+1]=f),d--)}})(t,e),v(a,h,t.bl_count)},Z=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),e[2*(a+1)+1]=65535,i=0;i<=a;i++)n=r,r=e[2*(i+1)+1],++o<l&&n===r||(o<h?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[32]++):o<=10?t.bl_tree[34]++:t.bl_tree[36]++,o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4))},U=(t,e,a)=>{let i,n,s=-1,r=e[1],o=0,l=7,h=4;for(0===r&&(l=138,h=3),i=0;i<=a;i++)if(n=r,r=e[2*(i+1)+1],!(++o<l&&n===r)){if(o<h)do{p(t,n,t.bl_tree)}while(0!=--o);else 0!==n?(n!==s&&(p(t,n,t.bl_tree),o--),p(t,16,t.bl_tree),g(t,o-3,2)):o<=10?(p(t,17,t.bl_tree),g(t,o-3,3)):(p(t,18,t.bl_tree),g(t,o-11,7));o=0,s=n,0===r?(l=138,h=3):n===r?(l=6,h=3):(l=7,h=4)}};let S=!1;const D=(t,e,a,i)=>{g(t,0+(i?1:0),3),x(t),b(t,a),b(t,~a),a&&t.pending_buf.set(t.window.subarray(e,e+a),t.pending),t.pending+=a};var T=(t,e,a,i)=>{let o,l,h=0;t.level>0?(2===t.strm.data_type&&(t.strm.data_type=(t=>{let e,a=4093624447;for(e=0;e<=31;e++,a>>>=1)if(1&a&&0!==t.dyn_ltree[2*e])return 0;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return 1;for(e=32;e<256;e++)if(0!==t.dyn_ltree[2*e])return 1;return 0})(t)),R(t,t.l_desc),R(t,t.d_desc),h=(t=>{let e;for(Z(t,t.dyn_ltree,t.l_desc.max_code),Z(t,t.dyn_dtree,t.d_desc.max_code),R(t,t.bl_desc),e=18;e>=3&&0===t.bl_tree[2*n[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e})(t),o=t.opt_len+3+7>>>3,l=t.static_len+3+7>>>3,l<=o&&(o=l)):o=l=a+5,a+4<=o&&-1!==e?D(t,e,a,i):4===t.strategy||l===o?(g(t,2+(i?1:0),3),E(t,s,r)):(g(t,4+(i?1:0),3),((t,e,a,i)=>{let s;for(g(t,e-257,5),g(t,a-1,5),g(t,i-4,4),s=0;s<i;s++)g(t,t.bl_tree[2*n[s]+1],3);U(t,t.dyn_ltree,e-1),U(t,t.dyn_dtree,a-1)})(t,t.l_desc.max_code+1,t.d_desc.max_code+1,h+1),E(t,t.dyn_ltree,t.dyn_dtree)),y(t),i&&x(t)},O={_tr_init:t=>{S||((()=>{let t,n,w,m,b;const g=new Array(16);for(w=0,m=0;m<28;m++)for(h[m]=w,t=0;t<1<<e[m];t++)l[w++]=m;for(l[w-1]=m,b=0,m=0;m<16;m++)for(d[m]=b,t=0;t<1<<a[m];t++)o[b++]=m;for(b>>=7;m<30;m++)for(d[m]=b<<7,t=0;t<1<<a[m]-7;t++)o[256+b++]=m;for(n=0;n<=15;n++)g[n]=0;for(t=0;t<=143;)s[2*t+1]=8,t++,g[8]++;for(;t<=255;)s[2*t+1]=9,t++,g[9]++;for(;t<=279;)s[2*t+1]=7,t++,g[7]++;for(;t<=287;)s[2*t+1]=8,t++,g[8]++;for(v(s,287,g),t=0;t<30;t++)r[2*t+1]=5,r[2*t]=k(t,5);f=new _(s,e,257,286,15),c=new _(r,a,0,30,15),u=new _(new Array(0),i,0,19,7)})(),S=!0),t.l_desc=new w(t.dyn_ltree,f),t.d_desc=new w(t.dyn_dtree,c),t.bl_desc=new w(t.bl_tree,u),t.bi_buf=0,t.bi_valid=0,y(t)},_tr_stored_block:D,_tr_flush_block:T,_tr_tally:(t,e,a)=>(t.pending_buf[t.sym_buf+t.sym_next++]=e,t.pending_buf[t.sym_buf+t.sym_next++]=e>>8,t.pending_buf[t.sym_buf+t.sym_next++]=a,0===e?t.dyn_ltree[2*a]++:(t.matches++,e--,t.dyn_ltree[2*(l[a]+256+1)]++,t.dyn_dtree[2*m(e)]++),t.sym_next===t.sym_end),_tr_align:t=>{g(t,2,3),p(t,256,s),(t=>{16===t.bi_valid?(b(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):t.bi_valid>=8&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)})(t)}};var F=(t,e,a,i)=>{let n=65535&t|0,s=t>>>16&65535|0,r=0;for(;0!==a;){r=a>2e3?2e3:a,a-=r;do{n=n+e[i++]|0,s=s+n|0}while(--r);n%=65521,s%=65521}return n|s<<16|0};const L=new Uint32Array((()=>{let t,e=[];for(var a=0;a<256;a++){t=a;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[a]=t}return e})());var N=(t,e,a,i)=>{const n=L,s=i+a;t^=-1;for(let a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t},I={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},B={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:C,_tr_stored_block:H,_tr_flush_block:M,_tr_tally:j,_tr_align:K}=O,{Z_NO_FLUSH:P,Z_PARTIAL_FLUSH:Y,Z_FULL_FLUSH:G,Z_FINISH:X,Z_BLOCK:W,Z_OK:q,Z_STREAM_END:J,Z_STREAM_ERROR:Q,Z_DATA_ERROR:V,Z_BUF_ERROR:$,Z_DEFAULT_COMPRESSION:tt,Z_FILTERED:et,Z_HUFFMAN_ONLY:at,Z_RLE:it,Z_FIXED:nt,Z_DEFAULT_STRATEGY:st,Z_UNKNOWN:rt,Z_DEFLATED:ot}=B,lt=(t,e)=>(t.msg=I[e],e),ht=t=>2*t-(t>4?9:0),dt=t=>{let e=t.length;for(;--e>=0;)t[e]=0},_t=t=>{let e,a,i,n=t.w_size;e=t.hash_size,i=e;do{a=t.head[--i],t.head[i]=a>=n?a-n:0}while(--e);e=n,i=e;do{a=t.prev[--i],t.prev[i]=a>=n?a-n:0}while(--e)};let ft=(t,e,a)=>(e<<t.hash_shift^a)&t.hash_mask;const ct=t=>{const e=t.state;let a=e.pending;a>t.avail_out&&(a=t.avail_out),0!==a&&(t.output.set(e.pending_buf.subarray(e.pending_out,e.pending_out+a),t.next_out),t.next_out+=a,e.pending_out+=a,t.total_out+=a,t.avail_out-=a,e.pending-=a,0===e.pending&&(e.pending_out=0))},ut=(t,e)=>{M(t,t.block_start>=0?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,ct(t.strm)},wt=(t,e)=>{t.pending_buf[t.pending++]=e},mt=(t,e)=>{t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e},bt=(t,e,a,i)=>{let n=t.avail_in;return n>i&&(n=i),0===n?0:(t.avail_in-=n,e.set(t.input.subarray(t.next_in,t.next_in+n),a),1===t.state.wrap?t.adler=F(t.adler,e,n,a):2===t.state.wrap&&(t.adler=N(t.adler,e,n,a)),t.next_in+=n,t.total_in+=n,n)},gt=(t,e)=>{let a,i,n=t.max_chain_length,s=t.strstart,r=t.prev_length,o=t.nice_match;const l=t.strstart>t.w_size-262?t.strstart-(t.w_size-262):0,h=t.window,d=t.w_mask,_=t.prev,f=t.strstart+258;let c=h[s+r-1],u=h[s+r];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(a=e,h[a+r]===u&&h[a+r-1]===c&&h[a]===h[s]&&h[++a]===h[s+1]){s+=2,a++;do{}while(h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&h[++s]===h[++a]&&s<f);if(i=258-(f-s),s=f-258,i>r){if(t.match_start=e,r=i,i>=o)break;c=h[s+r-1],u=h[s+r]}}}while((e=_[e&d])>l&&0!=--n);return r<=t.lookahead?r:t.lookahead},pt=t=>{const e=t.w_size;let a,i,n;do{if(i=t.window_size-t.lookahead-t.strstart,t.strstart>=e+(e-262)&&(t.window.set(t.window.subarray(e,e+e-i),0),t.match_start-=e,t.strstart-=e,t.block_start-=e,t.insert>t.strstart&&(t.insert=t.strstart),_t(t),i+=e),0===t.strm.avail_in)break;if(a=bt(t.strm,t.window,t.strstart+t.lookahead,i),t.lookahead+=a,t.lookahead+t.insert>=3)for(n=t.strstart-t.insert,t.ins_h=t.window[n],t.ins_h=ft(t,t.ins_h,t.window[n+1]);t.insert&&(t.ins_h=ft(t,t.ins_h,t.window[n+3-1]),t.prev[n&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=n,n++,t.insert--,!(t.lookahead+t.insert<3)););}while(t.lookahead<262&&0!==t.strm.avail_in)},kt=(t,e)=>{let a,i,n,s=t.pending_buf_size-5>t.w_size?t.w_size:t.pending_buf_size-5,r=0,o=t.strm.avail_in;do{if(a=65535,n=t.bi_valid+42>>3,t.strm.avail_out<n)break;if(n=t.strm.avail_out-n,i=t.strstart-t.block_start,a>i+t.strm.avail_in&&(a=i+t.strm.avail_in),a>n&&(a=n),a<s&&(0===a&&e!==X||e===P||a!==i+t.strm.avail_in))break;r=e===X&&a===i+t.strm.avail_in?1:0,H(t,0,0,r),t.pending_buf[t.pending-4]=a,t.pending_buf[t.pending-3]=a>>8,t.pending_buf[t.pending-2]=~a,t.pending_buf[t.pending-1]=~a>>8,ct(t.strm),i&&(i>a&&(i=a),t.strm.output.set(t.window.subarray(t.block_start,t.block_start+i),t.strm.next_out),t.strm.next_out+=i,t.strm.avail_out-=i,t.strm.total_out+=i,t.block_start+=i,a-=i),a&&(bt(t.strm,t.strm.output,t.strm.next_out,a),t.strm.next_out+=a,t.strm.avail_out-=a,t.strm.total_out+=a)}while(0===r);return o-=t.strm.avail_in,o&&(o>=t.w_size?(t.matches=2,t.window.set(t.strm.input.subarray(t.strm.next_in-t.w_size,t.strm.next_in),0),t.strstart=t.w_size,t.insert=t.strstart):(t.window_size-t.strstart<=o&&(t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,t.insert>t.strstart&&(t.insert=t.strstart)),t.window.set(t.strm.input.subarray(t.strm.next_in-o,t.strm.next_in),t.strstart),t.strstart+=o,t.insert+=o>t.w_size-t.insert?t.w_size-t.insert:o),t.block_start=t.strstart),t.high_water<t.strstart&&(t.high_water=t.strstart),r?4:e!==P&&e!==X&&0===t.strm.avail_in&&t.strstart===t.block_start?2:(n=t.window_size-t.strstart,t.strm.avail_in>n&&t.block_start>=t.w_size&&(t.block_start-=t.w_size,t.strstart-=t.w_size,t.window.set(t.window.subarray(t.w_size,t.w_size+t.strstart),0),t.matches<2&&t.matches++,n+=t.w_size,t.insert>t.strstart&&(t.insert=t.strstart)),n>t.strm.avail_in&&(n=t.strm.avail_in),n&&(bt(t.strm,t.window,t.strstart,n),t.strstart+=n,t.insert+=n>t.w_size-t.insert?t.w_size-t.insert:n),t.high_water<t.strstart&&(t.high_water=t.strstart),n=t.bi_valid+42>>3,n=t.pending_buf_size-n>65535?65535:t.pending_buf_size-n,s=n>t.w_size?t.w_size:n,i=t.strstart-t.block_start,(i>=s||(i||e===X)&&e!==P&&0===t.strm.avail_in&&i<=n)&&(a=i>n?n:i,r=e===X&&0===t.strm.avail_in&&a===i?1:0,H(t,t.block_start,a,r),t.block_start+=a,ct(t.strm)),r?3:1)},vt=(t,e)=>{let a,i;for(;;){if(t.lookahead<262){if(pt(t),t.lookahead<262&&e===P)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==a&&t.strstart-a<=t.w_size-262&&(t.match_length=gt(t,a)),t.match_length>=3)if(i=j(t,t.strstart-t.match_start,t.match_length-3),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=3){t.match_length--;do{t.strstart++,t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart}while(0!=--t.match_length);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=ft(t,t.ins_h,t.window[t.strstart+1]);else i=j(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(ut(t,!1),0===t.strm.avail_out))return 1}return t.insert=t.strstart<2?t.strstart:2,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2},yt=(t,e)=>{let a,i,n;for(;;){if(t.lookahead<262){if(pt(t),t.lookahead<262&&e===P)return 1;if(0===t.lookahead)break}if(a=0,t.lookahead>=3&&(t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=2,0!==a&&t.prev_length<t.max_lazy_match&&t.strstart-a<=t.w_size-262&&(t.match_length=gt(t,a),t.match_length<=5&&(t.strategy===et||3===t.match_length&&t.strstart-t.match_start>4096)&&(t.match_length=2)),t.prev_length>=3&&t.match_length<=t.prev_length){n=t.strstart+t.lookahead-3,i=j(t,t.strstart-1-t.prev_match,t.prev_length-3),t.lookahead-=t.prev_length-1,t.prev_length-=2;do{++t.strstart<=n&&(t.ins_h=ft(t,t.ins_h,t.window[t.strstart+3-1]),a=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart)}while(0!=--t.prev_length);if(t.match_available=0,t.match_length=2,t.strstart++,i&&(ut(t,!1),0===t.strm.avail_out))return 1}else if(t.match_available){if(i=j(t,0,t.window[t.strstart-1]),i&&ut(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return 1}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=j(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<2?t.strstart:2,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2};function xt(t,e,a,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=a,this.max_chain=i,this.func=n}const zt=[new xt(0,0,0,0,kt),new xt(4,4,8,4,vt),new xt(4,5,16,8,vt),new xt(4,6,32,32,vt),new xt(4,4,16,16,yt),new xt(8,16,32,32,yt),new xt(8,16,128,128,yt),new xt(8,32,128,256,yt),new xt(32,128,258,1024,yt),new xt(32,258,258,4096,yt)];function At(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=ot,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),dt(this.dyn_ltree),dt(this.dyn_dtree),dt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),dt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),dt(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Et=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||42!==e.status&&57!==e.status&&69!==e.status&&73!==e.status&&91!==e.status&&103!==e.status&&113!==e.status&&666!==e.status?1:0},Rt=t=>{if(Et(t))return lt(t,Q);t.total_in=t.total_out=0,t.data_type=rt;const e=t.state;return e.pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=2===e.wrap?57:e.wrap?42:113,t.adler=2===e.wrap?0:1,e.last_flush=-2,C(e),q},Zt=t=>{const e=Rt(t);var a;return e===q&&((a=t.state).window_size=2*a.w_size,dt(a.head),a.max_lazy_match=zt[a.level].max_lazy,a.good_match=zt[a.level].good_length,a.nice_match=zt[a.level].nice_length,a.max_chain_length=zt[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=2,a.match_available=0,a.ins_h=0),e},Ut=(t,e,a,i,n,s)=>{if(!t)return Q;let r=1;if(e===tt&&(e=6),i<0?(r=0,i=-i):i>15&&(r=2,i-=16),n<1||n>9||a!==ot||i<8||i>15||e<0||e>9||s<0||s>nt||8===i&&1!==r)return lt(t,Q);8===i&&(i=9);const o=new At;return t.state=o,o.strm=t,o.status=42,o.wrap=r,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=e,o.strategy=s,o.method=a,Zt(t)};var St={deflateInit:(t,e)=>Ut(t,e,ot,15,8,st),deflateInit2:Ut,deflateReset:Zt,deflateResetKeep:Rt,deflateSetHeader:(t,e)=>Et(t)||2!==t.state.wrap?Q:(t.state.gzhead=e,q),deflate:(t,e)=>{if(Et(t)||e>W||e<0)return t?lt(t,Q):Q;const a=t.state;if(!t.output||0!==t.avail_in&&!t.input||666===a.status&&e!==X)return lt(t,0===t.avail_out?$:Q);const i=a.last_flush;if(a.last_flush=e,0!==a.pending){if(ct(t),0===t.avail_out)return a.last_flush=-1,q}else if(0===t.avail_in&&ht(e)<=ht(i)&&e!==X)return lt(t,$);if(666===a.status&&0!==t.avail_in)return lt(t,$);if(42===a.status&&0===a.wrap&&(a.status=113),42===a.status){let e=ot+(a.w_bits-8<<4)<<8,i=-1;if(i=a.strategy>=at||a.level<2?0:a.level<6?1:6===a.level?2:3,e|=i<<6,0!==a.strstart&&(e|=32),e+=31-e%31,mt(a,e),0!==a.strstart&&(mt(a,t.adler>>>16),mt(a,65535&t.adler)),t.adler=1,a.status=113,ct(t),0!==a.pending)return a.last_flush=-1,q}if(57===a.status)if(t.adler=0,wt(a,31),wt(a,139),wt(a,8),a.gzhead)wt(a,(a.gzhead.text?1:0)+(a.gzhead.hcrc?2:0)+(a.gzhead.extra?4:0)+(a.gzhead.name?8:0)+(a.gzhead.comment?16:0)),wt(a,255&a.gzhead.time),wt(a,a.gzhead.time>>8&255),wt(a,a.gzhead.time>>16&255),wt(a,a.gzhead.time>>24&255),wt(a,9===a.level?2:a.strategy>=at||a.level<2?4:0),wt(a,255&a.gzhead.os),a.gzhead.extra&&a.gzhead.extra.length&&(wt(a,255&a.gzhead.extra.length),wt(a,a.gzhead.extra.length>>8&255)),a.gzhead.hcrc&&(t.adler=N(t.adler,a.pending_buf,a.pending,0)),a.gzindex=0,a.status=69;else if(wt(a,0),wt(a,0),wt(a,0),wt(a,0),wt(a,0),wt(a,9===a.level?2:a.strategy>=at||a.level<2?4:0),wt(a,3),a.status=113,ct(t),0!==a.pending)return a.last_flush=-1,q;if(69===a.status){if(a.gzhead.extra){let e=a.pending,i=(65535&a.gzhead.extra.length)-a.gzindex;for(;a.pending+i>a.pending_buf_size;){let n=a.pending_buf_size-a.pending;if(a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex,a.gzindex+n),a.pending),a.pending=a.pending_buf_size,a.gzhead.hcrc&&a.pending>e&&(t.adler=N(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex+=n,ct(t),0!==a.pending)return a.last_flush=-1,q;e=0,i-=n}let n=new Uint8Array(a.gzhead.extra);a.pending_buf.set(n.subarray(a.gzindex,a.gzindex+i),a.pending),a.pending+=i,a.gzhead.hcrc&&a.pending>e&&(t.adler=N(t.adler,a.pending_buf,a.pending-e,e)),a.gzindex=0}a.status=73}if(73===a.status){if(a.gzhead.name){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i)),ct(t),0!==a.pending)return a.last_flush=-1,q;i=0}e=a.gzindex<a.gzhead.name.length?255&a.gzhead.name.charCodeAt(a.gzindex++):0,wt(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i)),a.gzindex=0}a.status=91}if(91===a.status){if(a.gzhead.comment){let e,i=a.pending;do{if(a.pending===a.pending_buf_size){if(a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i)),ct(t),0!==a.pending)return a.last_flush=-1,q;i=0}e=a.gzindex<a.gzhead.comment.length?255&a.gzhead.comment.charCodeAt(a.gzindex++):0,wt(a,e)}while(0!==e);a.gzhead.hcrc&&a.pending>i&&(t.adler=N(t.adler,a.pending_buf,a.pending-i,i))}a.status=103}if(103===a.status){if(a.gzhead.hcrc){if(a.pending+2>a.pending_buf_size&&(ct(t),0!==a.pending))return a.last_flush=-1,q;wt(a,255&t.adler),wt(a,t.adler>>8&255),t.adler=0}if(a.status=113,ct(t),0!==a.pending)return a.last_flush=-1,q}if(0!==t.avail_in||0!==a.lookahead||e!==P&&666!==a.status){let i=0===a.level?kt(a,e):a.strategy===at?((t,e)=>{let a;for(;;){if(0===t.lookahead&&(pt(t),0===t.lookahead)){if(e===P)return 1;break}if(t.match_length=0,a=j(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,a&&(ut(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2})(a,e):a.strategy===it?((t,e)=>{let a,i,n,s;const r=t.window;for(;;){if(t.lookahead<=258){if(pt(t),t.lookahead<=258&&e===P)return 1;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=3&&t.strstart>0&&(n=t.strstart-1,i=r[n],i===r[++n]&&i===r[++n]&&i===r[++n])){s=t.strstart+258;do{}while(i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&i===r[++n]&&n<s);t.match_length=258-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=3?(a=j(t,1,t.match_length-3),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(a=j(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),a&&(ut(t,!1),0===t.strm.avail_out))return 1}return t.insert=0,e===X?(ut(t,!0),0===t.strm.avail_out?3:4):t.sym_next&&(ut(t,!1),0===t.strm.avail_out)?1:2})(a,e):zt[a.level].func(a,e);if(3!==i&&4!==i||(a.status=666),1===i||3===i)return 0===t.avail_out&&(a.last_flush=-1),q;if(2===i&&(e===Y?K(a):e!==W&&(H(a,0,0,!1),e===G&&(dt(a.head),0===a.lookahead&&(a.strstart=0,a.block_start=0,a.insert=0))),ct(t),0===t.avail_out))return a.last_flush=-1,q}return e!==X?q:a.wrap<=0?J:(2===a.wrap?(wt(a,255&t.adler),wt(a,t.adler>>8&255),wt(a,t.adler>>16&255),wt(a,t.adler>>24&255),wt(a,255&t.total_in),wt(a,t.total_in>>8&255),wt(a,t.total_in>>16&255),wt(a,t.total_in>>24&255)):(mt(a,t.adler>>>16),mt(a,65535&t.adler)),ct(t),a.wrap>0&&(a.wrap=-a.wrap),0!==a.pending?q:J)},deflateEnd:t=>{if(Et(t))return Q;const e=t.state.status;return t.state=null,113===e?lt(t,V):q},deflateSetDictionary:(t,e)=>{let a=e.length;if(Et(t))return Q;const i=t.state,n=i.wrap;if(2===n||1===n&&42!==i.status||i.lookahead)return Q;if(1===n&&(t.adler=F(t.adler,e,a,0)),i.wrap=0,a>=i.w_size){0===n&&(dt(i.head),i.strstart=0,i.block_start=0,i.insert=0);let t=new Uint8Array(i.w_size);t.set(e.subarray(a-i.w_size,a),0),e=t,a=i.w_size}const s=t.avail_in,r=t.next_in,o=t.input;for(t.avail_in=a,t.next_in=0,t.input=e,pt(i);i.lookahead>=3;){let t=i.strstart,e=i.lookahead-2;do{i.ins_h=ft(i,i.ins_h,i.window[t+3-1]),i.prev[t&i.w_mask]=i.head[i.ins_h],i.head[i.ins_h]=t,t++}while(--e);i.strstart=t,i.lookahead=2,pt(i)}return i.strstart+=i.lookahead,i.block_start=i.strstart,i.insert=i.lookahead,i.lookahead=0,i.match_length=i.prev_length=2,i.match_available=0,t.next_in=r,t.input=o,t.avail_in=s,i.wrap=n,q},deflateInfo:"pako deflate (from Nodeca project)"};const Dt=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var Tt=function(t){const e=Array.prototype.slice.call(arguments,1);for(;e.length;){const a=e.shift();if(a){if("object"!=typeof a)throw new TypeError(a+"must be non-object");for(const e in a)Dt(a,e)&&(t[e]=a[e])}}return t},Ot=t=>{let e=0;for(let a=0,i=t.length;a<i;a++)e+=t[a].length;const a=new Uint8Array(e);for(let e=0,i=0,n=t.length;e<n;e++){let n=t[e];a.set(n,i),i+=n.length}return a};let Ft=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){Ft=!1}const Lt=new Uint8Array(256);for(let t=0;t<256;t++)Lt[t]=t>=252?6:t>=248?5:t>=240?4:t>=224?3:t>=192?2:1;Lt[254]=Lt[254]=1;var Nt=t=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(t);let e,a,i,n,s,r=t.length,o=0;for(n=0;n<r;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),o+=a<128?1:a<2048?2:a<65536?3:4;for(e=new Uint8Array(o),s=0,n=0;s<o;n++)a=t.charCodeAt(n),55296==(64512&a)&&n+1<r&&(i=t.charCodeAt(n+1),56320==(64512&i)&&(a=65536+(a-55296<<10)+(i-56320),n++)),a<128?e[s++]=a:a<2048?(e[s++]=192|a>>>6,e[s++]=128|63&a):a<65536?(e[s++]=224|a>>>12,e[s++]=128|a>>>6&63,e[s++]=128|63&a):(e[s++]=240|a>>>18,e[s++]=128|a>>>12&63,e[s++]=128|a>>>6&63,e[s++]=128|63&a);return e},It=(t,e)=>{const a=e||t.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(t.subarray(0,e));let i,n;const s=new Array(2*a);for(n=0,i=0;i<a;){let e=t[i++];if(e<128){s[n++]=e;continue}let r=Lt[e];if(r>4)s[n++]=65533,i+=r-1;else{for(e&=2===r?31:3===r?15:7;r>1&&i<a;)e=e<<6|63&t[i++],r--;r>1?s[n++]=65533:e<65536?s[n++]=e:(e-=65536,s[n++]=55296|e>>10&1023,s[n++]=56320|1023&e)}}return((t,e)=>{if(e<65534&&t.subarray&&Ft)return String.fromCharCode.apply(null,t.length===e?t:t.subarray(0,e));let a="";for(let i=0;i<e;i++)a+=String.fromCharCode(t[i]);return a})(s,n)},Bt=(t,e)=>{(e=e||t.length)>t.length&&(e=t.length);let a=e-1;for(;a>=0&&128==(192&t[a]);)a--;return a<0||0===a?e:a+Lt[t[a]]>e?a:e};var Ct=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const Ht=Object.prototype.toString,{Z_NO_FLUSH:Mt,Z_SYNC_FLUSH:jt,Z_FULL_FLUSH:Kt,Z_FINISH:Pt,Z_OK:Yt,Z_STREAM_END:Gt,Z_DEFAULT_COMPRESSION:Xt,Z_DEFAULT_STRATEGY:Wt,Z_DEFLATED:qt}=B;function Jt(t){this.options=Tt({level:Xt,method:qt,chunkSize:16384,windowBits:15,memLevel:8,strategy:Wt},t||{});let e=this.options;e.raw&&e.windowBits>0?e.windowBits=-e.windowBits:e.gzip&&e.windowBits>0&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Ct,this.strm.avail_out=0;let a=St.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(a!==Yt)throw new Error(I[a]);if(e.header&&St.deflateSetHeader(this.strm,e.header),e.dictionary){let t;if(t="string"==typeof e.dictionary?Nt(e.dictionary):"[object ArrayBuffer]"===Ht.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,a=St.deflateSetDictionary(this.strm,t),a!==Yt)throw new Error(I[a]);this._dict_set=!0}}function Qt(t,e){const a=new Jt(e);if(a.push(t,!0),a.err)throw a.msg||I[a.err];return a.result}Jt.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize;let n,s;if(this.ended)return!1;for(s=e===~~e?e:!0===e?Pt:Mt,"string"==typeof t?a.input=Nt(t):"[object ArrayBuffer]"===Ht.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;)if(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),(s===jt||s===Kt)&&a.avail_out<=6)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else{if(n=St.deflate(a,s),n===Gt)return a.next_out>0&&this.onData(a.output.subarray(0,a.next_out)),n=St.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===Yt;if(0!==a.avail_out){if(s>0&&a.next_out>0)this.onData(a.output.subarray(0,a.next_out)),a.avail_out=0;else if(0===a.avail_in)break}else this.onData(a.output)}return!0},Jt.prototype.onData=function(t){this.chunks.push(t)},Jt.prototype.onEnd=function(t){t===Yt&&(this.result=Ot(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};var Vt={Deflate:Jt,deflate:Qt,deflateRaw:function(t,e){return(e=e||{}).raw=!0,Qt(t,e)},gzip:function(t,e){return(e=e||{}).gzip=!0,Qt(t,e)},constants:B};var $t=function(t,e){let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z,A;const E=t.state;a=t.next_in,z=t.input,i=a+(t.avail_in-5),n=t.next_out,A=t.output,s=n-(e-t.avail_out),r=n+(t.avail_out-257),o=E.dmax,l=E.wsize,h=E.whave,d=E.wnext,_=E.window,f=E.hold,c=E.bits,u=E.lencode,w=E.distcode,m=(1<<E.lenbits)-1,b=(1<<E.distbits)-1;t:do{c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=u[f&m];e:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,0===p)A[n++]=65535&g;else{if(!(16&p)){if(0==(64&p)){g=u[(65535&g)+(f&(1<<p)-1)];continue e}if(32&p){E.mode=16191;break t}t.msg="invalid literal/length code",E.mode=16209;break t}k=65535&g,p&=15,p&&(c<p&&(f+=z[a++]<<c,c+=8),k+=f&(1<<p)-1,f>>>=p,c-=p),c<15&&(f+=z[a++]<<c,c+=8,f+=z[a++]<<c,c+=8),g=w[f&b];a:for(;;){if(p=g>>>24,f>>>=p,c-=p,p=g>>>16&255,!(16&p)){if(0==(64&p)){g=w[(65535&g)+(f&(1<<p)-1)];continue a}t.msg="invalid distance code",E.mode=16209;break t}if(v=65535&g,p&=15,c<p&&(f+=z[a++]<<c,c+=8,c<p&&(f+=z[a++]<<c,c+=8)),v+=f&(1<<p)-1,v>o){t.msg="invalid distance too far back",E.mode=16209;break t}if(f>>>=p,c-=p,p=n-s,v>p){if(p=v-p,p>h&&E.sane){t.msg="invalid distance too far back",E.mode=16209;break t}if(y=0,x=_,0===d){if(y+=l-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}else if(d<p){if(y+=l+d-p,p-=d,p<k){k-=p;do{A[n++]=_[y++]}while(--p);if(y=0,d<k){p=d,k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}}}else if(y+=d-p,p<k){k-=p;do{A[n++]=_[y++]}while(--p);y=n-v,x=A}for(;k>2;)A[n++]=x[y++],A[n++]=x[y++],A[n++]=x[y++],k-=3;k&&(A[n++]=x[y++],k>1&&(A[n++]=x[y++]))}else{y=n-v;do{A[n++]=A[y++],A[n++]=A[y++],A[n++]=A[y++],k-=3}while(k>2);k&&(A[n++]=A[y++],k>1&&(A[n++]=A[y++]))}break}}break}}while(a<i&&n<r);k=c>>3,a-=k,c-=k<<3,f&=(1<<c)-1,t.next_in=a,t.next_out=n,t.avail_in=a<i?i-a+5:5-(a-i),t.avail_out=n<r?r-n+257:257-(n-r),E.hold=f,E.bits=c};const te=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ee=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),ae=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),ie=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var ne=(t,e,a,i,n,s,r,o)=>{const l=o.bits;let h,d,_,f,c,u,w=0,m=0,b=0,g=0,p=0,k=0,v=0,y=0,x=0,z=0,A=null;const E=new Uint16Array(16),R=new Uint16Array(16);let Z,U,S,D=null;for(w=0;w<=15;w++)E[w]=0;for(m=0;m<i;m++)E[e[a+m]]++;for(p=l,g=15;g>=1&&0===E[g];g--);if(p>g&&(p=g),0===g)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(b=1;b<g&&0===E[b];b++);for(p<b&&(p=b),y=1,w=1;w<=15;w++)if(y<<=1,y-=E[w],y<0)return-1;if(y>0&&(0===t||1!==g))return-1;for(R[1]=0,w=1;w<15;w++)R[w+1]=R[w]+E[w];for(m=0;m<i;m++)0!==e[a+m]&&(r[R[e[a+m]]++]=m);if(0===t?(A=D=r,u=20):1===t?(A=te,D=ee,u=257):(A=ae,D=ie,u=0),z=0,m=0,w=b,c=s,k=p,v=0,_=-1,x=1<<p,f=x-1,1===t&&x>852||2===t&&x>592)return 1;for(;;){Z=w-v,r[m]+1<u?(U=0,S=r[m]):r[m]>=u?(U=D[r[m]-u],S=A[r[m]-u]):(U=96,S=0),h=1<<w-v,d=1<<k,b=d;do{d-=h,n[c+(z>>v)+d]=Z<<24|U<<16|S|0}while(0!==d);for(h=1<<w-1;z&h;)h>>=1;if(0!==h?(z&=h-1,z+=h):z=0,m++,0==--E[w]){if(w===g)break;w=e[a+r[m]]}if(w>p&&(z&f)!==_){for(0===v&&(v=p),c+=b,k=w-v,y=1<<k;k+v<g&&(y-=E[k+v],!(y<=0));)k++,y<<=1;if(x+=1<<k,1===t&&x>852||2===t&&x>592)return 1;_=z&f,n[_]=p<<24|k<<16|c-s|0}}return 0!==z&&(n[c+z]=w-v<<24|64<<16|0),o.bits=p,0};const{Z_FINISH:se,Z_BLOCK:re,Z_TREES:oe,Z_OK:le,Z_STREAM_END:he,Z_NEED_DICT:de,Z_STREAM_ERROR:_e,Z_DATA_ERROR:fe,Z_MEM_ERROR:ce,Z_BUF_ERROR:ue,Z_DEFLATED:we}=B,me=16209,be=t=>(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24);function ge(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const pe=t=>{if(!t)return 1;const e=t.state;return!e||e.strm!==t||e.mode<16180||e.mode>16211?1:0},ke=t=>{if(pe(t))return _e;const e=t.state;return t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=16180,e.last=0,e.havedict=0,e.flags=-1,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new Int32Array(852),e.distcode=e.distdyn=new Int32Array(592),e.sane=1,e.back=-1,le},ve=t=>{if(pe(t))return _e;const e=t.state;return e.wsize=0,e.whave=0,e.wnext=0,ke(t)},ye=(t,e)=>{let a;if(pe(t))return _e;const i=t.state;return e<0?(a=0,e=-e):(a=5+(e>>4),e<48&&(e&=15)),e&&(e<8||e>15)?_e:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=a,i.wbits=e,ve(t))},xe=(t,e)=>{if(!t)return _e;const a=new ge;t.state=a,a.strm=t,a.window=null,a.mode=16180;const i=ye(t,e);return i!==le&&(t.state=null),i};let ze,Ae,Ee=!0;const Re=t=>{if(Ee){ze=new Int32Array(512),Ae=new Int32Array(32);let e=0;for(;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(ne(1,t.lens,0,288,ze,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;ne(2,t.lens,0,32,Ae,0,t.work,{bits:5}),Ee=!1}t.lencode=ze,t.lenbits=9,t.distcode=Ae,t.distbits=5},Ze=(t,e,a,i)=>{let n;const s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new Uint8Array(s.wsize)),i>=s.wsize?(s.window.set(e.subarray(a-s.wsize,a),0),s.wnext=0,s.whave=s.wsize):(n=s.wsize-s.wnext,n>i&&(n=i),s.window.set(e.subarray(a-i,a-i+n),s.wnext),(i-=n)?(s.window.set(e.subarray(a-i,a),0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0};var Ue={inflateReset:ve,inflateReset2:ye,inflateResetKeep:ke,inflateInit:t=>xe(t,15),inflateInit2:xe,inflate:(t,e)=>{let a,i,n,s,r,o,l,h,d,_,f,c,u,w,m,b,g,p,k,v,y,x,z=0;const A=new Uint8Array(4);let E,R;const Z=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(pe(t)||!t.output||!t.input&&0!==t.avail_in)return _e;a=t.state,16191===a.mode&&(a.mode=16192),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,_=o,f=l,x=le;t:for(;;)switch(a.mode){case 16180:if(0===a.wrap){a.mode=16192;break}for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(2&a.wrap&&35615===h){0===a.wbits&&(a.wbits=15),a.check=0,A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0),h=0,d=0,a.mode=16181;break}if(a.head&&(a.head.done=!1),!(1&a.wrap)||(((255&h)<<8)+(h>>8))%31){t.msg="incorrect header check",a.mode=me;break}if((15&h)!==we){t.msg="unknown compression method",a.mode=me;break}if(h>>>=4,d-=4,y=8+(15&h),0===a.wbits&&(a.wbits=y),y>15||y>a.wbits){t.msg="invalid window size",a.mode=me;break}a.dmax=1<<a.wbits,a.flags=0,t.adler=a.check=1,a.mode=512&h?16189:16191,h=0,d=0;break;case 16181:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.flags=h,(255&a.flags)!==we){t.msg="unknown compression method",a.mode=me;break}if(57344&a.flags){t.msg="unknown header flags set",a.mode=me;break}a.head&&(a.head.text=h>>8&1),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0)),h=0,d=0,a.mode=16182;case 16182:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.time=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,A[2]=h>>>16&255,A[3]=h>>>24&255,a.check=N(a.check,A,4,0)),h=0,d=0,a.mode=16183;case 16183:for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.head&&(a.head.xflags=255&h,a.head.os=h>>8),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0)),h=0,d=0,a.mode=16184;case 16184:if(1024&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length=h,a.head&&(a.head.extra_len=h),512&a.flags&&4&a.wrap&&(A[0]=255&h,A[1]=h>>>8&255,a.check=N(a.check,A,2,0)),h=0,d=0}else a.head&&(a.head.extra=null);a.mode=16185;case 16185:if(1024&a.flags&&(c=a.length,c>o&&(c=o),c&&(a.head&&(y=a.head.extra_len-a.length,a.head.extra||(a.head.extra=new Uint8Array(a.head.extra_len)),a.head.extra.set(i.subarray(s,s+c),y)),512&a.flags&&4&a.wrap&&(a.check=N(a.check,i,c,s)),o-=c,s+=c,a.length-=c),a.length))break t;a.length=0,a.mode=16186;case 16186:if(2048&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.name+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=N(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.name=null);a.length=0,a.mode=16187;case 16187:if(4096&a.flags){if(0===o)break t;c=0;do{y=i[s+c++],a.head&&y&&a.length<65536&&(a.head.comment+=String.fromCharCode(y))}while(y&&c<o);if(512&a.flags&&4&a.wrap&&(a.check=N(a.check,i,c,s)),o-=c,s+=c,y)break t}else a.head&&(a.head.comment=null);a.mode=16188;case 16188:if(512&a.flags){for(;d<16;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(65535&a.check)){t.msg="header crc mismatch",a.mode=me;break}h=0,d=0}a.head&&(a.head.hcrc=a.flags>>9&1,a.head.done=!0),t.adler=a.check=0,a.mode=16191;break;case 16189:for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}t.adler=a.check=be(h),h=0,d=0,a.mode=16190;case 16190:if(0===a.havedict)return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,de;t.adler=a.check=1,a.mode=16191;case 16191:if(e===re||e===oe)break t;case 16192:if(a.last){h>>>=7&d,d-=7&d,a.mode=16206;break}for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}switch(a.last=1&h,h>>>=1,d-=1,3&h){case 0:a.mode=16193;break;case 1:if(Re(a),a.mode=16199,e===oe){h>>>=2,d-=2;break t}break;case 2:a.mode=16196;break;case 3:t.msg="invalid block type",a.mode=me}h>>>=2,d-=2;break;case 16193:for(h>>>=7&d,d-=7&d;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if((65535&h)!=(h>>>16^65535)){t.msg="invalid stored block lengths",a.mode=me;break}if(a.length=65535&h,h=0,d=0,a.mode=16194,e===oe)break t;case 16194:a.mode=16195;case 16195:if(c=a.length,c){if(c>o&&(c=o),c>l&&(c=l),0===c)break t;n.set(i.subarray(s,s+c),r),o-=c,s+=c,l-=c,r+=c,a.length-=c;break}a.mode=16191;break;case 16196:for(;d<14;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(a.nlen=257+(31&h),h>>>=5,d-=5,a.ndist=1+(31&h),h>>>=5,d-=5,a.ncode=4+(15&h),h>>>=4,d-=4,a.nlen>286||a.ndist>30){t.msg="too many length or distance symbols",a.mode=me;break}a.have=0,a.mode=16197;case 16197:for(;a.have<a.ncode;){for(;d<3;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.lens[Z[a.have++]]=7&h,h>>>=3,d-=3}for(;a.have<19;)a.lens[Z[a.have++]]=0;if(a.lencode=a.lendyn,a.lenbits=7,E={bits:a.lenbits},x=ne(0,a.lens,0,19,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid code lengths set",a.mode=me;break}a.have=0,a.mode=16198;case 16198:for(;a.have<a.nlen+a.ndist;){for(;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(g<16)h>>>=m,d-=m,a.lens[a.have++]=g;else{if(16===g){for(R=m+2;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(h>>>=m,d-=m,0===a.have){t.msg="invalid bit length repeat",a.mode=me;break}y=a.lens[a.have-1],c=3+(3&h),h>>>=2,d-=2}else if(17===g){for(R=m+3;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=3+(7&h),h>>>=3,d-=3}else{for(R=m+7;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=m,d-=m,y=0,c=11+(127&h),h>>>=7,d-=7}if(a.have+c>a.nlen+a.ndist){t.msg="invalid bit length repeat",a.mode=me;break}for(;c--;)a.lens[a.have++]=y}}if(a.mode===me)break;if(0===a.lens[256]){t.msg="invalid code -- missing end-of-block",a.mode=me;break}if(a.lenbits=9,E={bits:a.lenbits},x=ne(1,a.lens,0,a.nlen,a.lencode,0,a.work,E),a.lenbits=E.bits,x){t.msg="invalid literal/lengths set",a.mode=me;break}if(a.distbits=6,a.distcode=a.distdyn,E={bits:a.distbits},x=ne(2,a.lens,a.nlen,a.ndist,a.distcode,0,a.work,E),a.distbits=E.bits,x){t.msg="invalid distances set",a.mode=me;break}if(a.mode=16199,e===oe)break t;case 16199:a.mode=16200;case 16200:if(o>=6&&l>=258){t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,$t(t,f),r=t.next_out,n=t.output,l=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,h=a.hold,d=a.bits,16191===a.mode&&(a.back=-1);break}for(a.back=0;z=a.lencode[h&(1<<a.lenbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(b&&0==(240&b)){for(p=m,k=b,v=g;z=a.lencode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,a.length=g,0===b){a.mode=16205;break}if(32&b){a.back=-1,a.mode=16191;break}if(64&b){t.msg="invalid literal/length code",a.mode=me;break}a.extra=15&b,a.mode=16201;case 16201:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.length+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}a.was=a.length,a.mode=16202;case 16202:for(;z=a.distcode[h&(1<<a.distbits)-1],m=z>>>24,b=z>>>16&255,g=65535&z,!(m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(0==(240&b)){for(p=m,k=b,v=g;z=a.distcode[v+((h&(1<<p+k)-1)>>p)],m=z>>>24,b=z>>>16&255,g=65535&z,!(p+m<=d);){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}h>>>=p,d-=p,a.back+=p}if(h>>>=m,d-=m,a.back+=m,64&b){t.msg="invalid distance code",a.mode=me;break}a.offset=g,a.extra=15&b,a.mode=16203;case 16203:if(a.extra){for(R=a.extra;d<R;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}a.offset+=h&(1<<a.extra)-1,h>>>=a.extra,d-=a.extra,a.back+=a.extra}if(a.offset>a.dmax){t.msg="invalid distance too far back",a.mode=me;break}a.mode=16204;case 16204:if(0===l)break t;if(c=f-l,a.offset>c){if(c=a.offset-c,c>a.whave&&a.sane){t.msg="invalid distance too far back",a.mode=me;break}c>a.wnext?(c-=a.wnext,u=a.wsize-c):u=a.wnext-c,c>a.length&&(c=a.length),w=a.window}else w=n,u=r-a.offset,c=a.length;c>l&&(c=l),l-=c,a.length-=c;do{n[r++]=w[u++]}while(--c);0===a.length&&(a.mode=16200);break;case 16205:if(0===l)break t;n[r++]=a.length,l--,a.mode=16200;break;case 16206:if(a.wrap){for(;d<32;){if(0===o)break t;o--,h|=i[s++]<<d,d+=8}if(f-=l,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?N(a.check,n,f,r-f):F(a.check,n,f,r-f)),f=l,4&a.wrap&&(a.flags?h:be(h))!==a.check){t.msg="incorrect data check",a.mode=me;break}h=0,d=0}a.mode=16207;case 16207:if(a.wrap&&a.flags){for(;d<32;){if(0===o)break t;o--,h+=i[s++]<<d,d+=8}if(4&a.wrap&&h!==(4294967295&a.total)){t.msg="incorrect length check",a.mode=me;break}h=0,d=0}a.mode=16208;case 16208:x=he;break t;case me:x=fe;break t;case 16210:return ce;default:return _e}return t.next_out=r,t.avail_out=l,t.next_in=s,t.avail_in=o,a.hold=h,a.bits=d,(a.wsize||f!==t.avail_out&&a.mode<me&&(a.mode<16206||e!==se))&&Ze(t,t.output,t.next_out,f-t.avail_out),_-=t.avail_in,f-=t.avail_out,t.total_in+=_,t.total_out+=f,a.total+=f,4&a.wrap&&f&&(t.adler=a.check=a.flags?N(a.check,n,f,t.next_out-f):F(a.check,n,f,t.next_out-f)),t.data_type=a.bits+(a.last?64:0)+(16191===a.mode?128:0)+(16199===a.mode||16194===a.mode?256:0),(0===_&&0===f||e===se)&&x===le&&(x=ue),x},inflateEnd:t=>{if(pe(t))return _e;let e=t.state;return e.window&&(e.window=null),t.state=null,le},inflateGetHeader:(t,e)=>{if(pe(t))return _e;const a=t.state;return 0==(2&a.wrap)?_e:(a.head=e,e.done=!1,le)},inflateSetDictionary:(t,e)=>{const a=e.length;let i,n,s;return pe(t)?_e:(i=t.state,0!==i.wrap&&16190!==i.mode?_e:16190===i.mode&&(n=1,n=F(n,e,a,0),n!==i.check)?fe:(s=Ze(t,e,a,a),s?(i.mode=16210,ce):(i.havedict=1,le)))},inflateInfo:"pako inflate (from Nodeca project)"};var Se=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const De=Object.prototype.toString,{Z_NO_FLUSH:Te,Z_FINISH:Oe,Z_OK:Fe,Z_STREAM_END:Le,Z_NEED_DICT:Ne,Z_STREAM_ERROR:Ie,Z_DATA_ERROR:Be,Z_MEM_ERROR:Ce}=B;function He(t){this.options=Tt({chunkSize:65536,windowBits:15,to:""},t||{});const e=this.options;e.raw&&e.windowBits>=0&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(e.windowBits>=0&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),e.windowBits>15&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Ct,this.strm.avail_out=0;let a=Ue.inflateInit2(this.strm,e.windowBits);if(a!==Fe)throw new Error(I[a]);if(this.header=new Se,Ue.inflateGetHeader(this.strm,this.header),e.dictionary&&("string"==typeof e.dictionary?e.dictionary=Nt(e.dictionary):"[object ArrayBuffer]"===De.call(e.dictionary)&&(e.dictionary=new Uint8Array(e.dictionary)),e.raw&&(a=Ue.inflateSetDictionary(this.strm,e.dictionary),a!==Fe)))throw new Error(I[a])}He.prototype.push=function(t,e){const a=this.strm,i=this.options.chunkSize,n=this.options.dictionary;let s,r,o;if(this.ended)return!1;for(r=e===~~e?e:!0===e?Oe:Te,"[object ArrayBuffer]"===De.call(t)?a.input=new Uint8Array(t):a.input=t,a.next_in=0,a.avail_in=a.input.length;;){for(0===a.avail_out&&(a.output=new Uint8Array(i),a.next_out=0,a.avail_out=i),s=Ue.inflate(a,r),s===Ne&&n&&(s=Ue.inflateSetDictionary(a,n),s===Fe?s=Ue.inflate(a,r):s===Be&&(s=Ne));a.avail_in>0&&s===Le&&a.state.wrap>0&&0!==t[a.next_in];)Ue.inflateReset(a),s=Ue.inflate(a,r);switch(s){case Ie:case Be:case Ne:case Ce:return this.onEnd(s),this.ended=!0,!1}if(o=a.avail_out,a.next_out&&(0===a.avail_out||s===Le))if("string"===this.options.to){let t=Bt(a.output,a.next_out),e=a.next_out-t,n=It(a.output,t);a.next_out=e,a.avail_out=i-e,e&&a.output.set(a.output.subarray(t,t+e),0),this.onData(n)}else this.onData(a.output.length===a.next_out?a.output:a.output.subarray(0,a.next_out));if(s!==Fe||0!==o){if(s===Le)return s=Ue.inflateEnd(this.strm),this.onEnd(s),this.ended=!0,!0;if(0===a.avail_in)break}}return!0},He.prototype.onData=function(t){this.chunks.push(t)},He.prototype.onEnd=function(t){t===Fe&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Ot(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg};const{Deflate:Me,deflate:je,deflateRaw:Ke,gzip:Pe}=Vt;var Ye=Me,Ge=je,Xe=B;const We=new class{constructor(){this._init()}clear(){this._init()}addEvent(t){if(!t)throw new Error("Adding invalid event");const e=this._hasEvents?",":"";this.deflate.push(e+t,Xe.Z_SYNC_FLUSH),this._hasEvents=!0}finish(){if(this.deflate.push("]",Xe.Z_FINISH),this.deflate.err)throw this.deflate.err;const t=this.deflate.result;return this._init(),t}_init(){this._hasEvents=!1,this.deflate=new Ye,this.deflate.push("[",Xe.Z_NO_FLUSH)}},qe={clear:()=>{We.clear()},addEvent:t=>We.addEvent(t),finish:()=>We.finish(),compress:t=>function(t){return Ge(t)}(t)};addEventListener("message",(function(t){const e=t.data.method,a=t.data.id,i=t.data.arg;if(e in qe&&"function"==typeof qe[e])try{const t=qe[e](i);postMessage({id:a,method:e,success:!0,response:t})}catch(t){postMessage({id:a,method:e,success:!1,response:t.message}),console.error(t)}})),postMessage({id:void 0,method:"init",success:!0,response:void 0});`;
function oo() {
    const t = new Blob([ao]);
    return URL.createObjectURL(t)
}
function tn(t) {
    return t > 9999999999 ? t : t * 1e3
}
class Bi {
    constructor() {
        this.events = []
    }
    get hasEvents() {
        return this.events.length > 0
    }
    get type() {
        return "sync"
    }
    destroy() {
        this.events = []
    }
    async addEvent(e) {
        this.events.push(e)
    }
    finish() {
        return new Promise(e => {
            const n = this.events;
            this.events = [],
            e(JSON.stringify(n))
        }
        )
    }
    clear() {
        this.events = []
    }
    getEarliestTimestamp() {
        const e = this.events.map(n => n.timestamp).sort()[0];
        return e ? tn(e) : null
    }
}
class co {
    constructor(e) {
        this._worker = e,
        this._id = 0
    }
    ensureReady() {
        return this._ensureReadyPromise ? this._ensureReadyPromise : (this._ensureReadyPromise = new Promise( (e, n) => {
            this._worker.addEventListener("message", ({data: i}) => {
                i.success ? e() : n()
            }
            , {
                once: !0
            }),
            this._worker.addEventListener("error", i => {
                n(i)
            }
            , {
                once: !0
            })
        }
        ),
        this._ensureReadyPromise)
    }
    destroy() {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Destroying compression worker"),
        this._worker.terminate()
    }
    postMessage(e, n) {
        const i = this._getAndIncrementId();
        return new Promise( (s, r) => {
            const o = ({data: a}) => {
                const c = a;
                if (c.method === e && c.id === i) {
                    if (this._worker.removeEventListener("message", o),
                    !c.success) {
                        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay]", c.response),
                        r(new Error("Error in compression worker"));
                        return
                    }
                    s(c.response)
                }
            }
            ;
            this._worker.addEventListener("message", o),
            this._worker.postMessage({
                id: i,
                method: e,
                arg: n
            })
        }
        )
    }
    _getAndIncrementId() {
        return this._id++
    }
}
class lo {
    constructor(e) {
        this._worker = new co(e),
        this._earliestTimestamp = null
    }
    get hasEvents() {
        return !!this._earliestTimestamp
    }
    get type() {
        return "worker"
    }
    ensureReady() {
        return this._worker.ensureReady()
    }
    destroy() {
        this._worker.destroy()
    }
    addEvent(e) {
        const n = tn(e.timestamp);
        return (!this._earliestTimestamp || n < this._earliestTimestamp) && (this._earliestTimestamp = n),
        this._sendEventToWorker(e)
    }
    finish() {
        return this._finishRequest()
    }
    clear() {
        this._earliestTimestamp = null,
        this._worker.postMessage("clear")
    }
    getEarliestTimestamp() {
        return this._earliestTimestamp
    }
    _sendEventToWorker(e) {
        return this._worker.postMessage("addEvent", JSON.stringify(e))
    }
    async _finishRequest() {
        const e = await this._worker.postMessage("finish");
        return this._earliestTimestamp = null,
        e
    }
}
class uo {
    constructor(e) {
        this._fallback = new Bi,
        this._compression = new lo(e),
        this._used = this._fallback,
        this._ensureWorkerIsLoadedPromise = this._ensureWorkerIsLoaded()
    }
    get type() {
        return this._used.type
    }
    get hasEvents() {
        return this._used.hasEvents
    }
    destroy() {
        this._fallback.destroy(),
        this._compression.destroy()
    }
    clear() {
        return this._used.clear()
    }
    getEarliestTimestamp() {
        return this._used.getEarliestTimestamp()
    }
    addEvent(e) {
        return this._used.addEvent(e)
    }
    async finish() {
        return await this.ensureWorkerIsLoaded(),
        this._used.finish()
    }
    ensureWorkerIsLoaded() {
        return this._ensureWorkerIsLoadedPromise
    }
    async _ensureWorkerIsLoaded() {
        try {
            await this._compression.ensureReady()
        } catch {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Failed to load the compression worker, falling back to simple buffer");
            return
        }
        await this._switchToCompressionWorker()
    }
    async _switchToCompressionWorker() {
        const {events: e} = this._fallback
          , n = [];
        for (const i of e)
            n.push(this._compression.addEvent(i));
        this._used = this._compression;
        try {
            await Promise.all(n)
        } catch (i) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("[Replay] Failed to add events when switching buffers.", i)
        }
    }
}
function fo({useCompression: t}) {
    if (t && window.Worker)
        try {
            const e = oo();
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Using compression worker");
            const n = new Worker(e);
            return new uo(n)
        } catch {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Failed to create compression worker")
        }
    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Using simple buffer"),
    new Bi
}
function ho(t) {
    _o(),
    t.session = void 0
}
function _o() {
    if ("sessionStorage"in k)
        try {
            k.sessionStorage.removeItem(Je)
        } catch {}
}
function ze(t, e, n=+new Date) {
    return t === null || e === void 0 || e < 0 ? !0 : e === 0 ? !1 : t + e <= n
}
function Ui(t, e, n=+new Date) {
    return ze(t.started, e.maxSessionLife, n) || ze(t.lastActivity, e.sessionIdleExpire, n)
}
function Li(t) {
    return t === void 0 ? !1 : Math.random() < t
}
function en(t) {
    if ("sessionStorage"in k)
        try {
            k.sessionStorage.setItem(Je, JSON.stringify(t))
        } catch {}
}
function nn(t) {
    const e = Date.now()
      , n = t.id || Gt()
      , i = t.started || e
      , s = t.lastActivity || e
      , r = t.segmentId || 0
      , o = t.sampled;
    return {
        id: n,
        started: i,
        lastActivity: s,
        segmentId: r,
        sampled: o,
        shouldRefresh: !0
    }
}
function po(t, e) {
    return Li(t) ? "session" : e ? "buffer" : !1
}
function mo({sessionSampleRate: t, allowBuffering: e, stickySession: n=!1}) {
    const i = po(t, e)
      , s = nn({
        sampled: i
    });
    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Replay] Creating new session: ${s.id}`),
    n && en(s),
    s
}
function go() {
    if (!("sessionStorage"in k))
        return null;
    try {
        const e = k.sessionStorage.getItem(Je);
        if (!e)
            return null;
        const n = JSON.parse(e);
        return nn(n)
    } catch {
        return null
    }
}
function Ne({timeouts: t, currentSession: e, stickySession: n, sessionSampleRate: i, allowBuffering: s}) {
    const r = e || n && go();
    if (r) {
        if (!Ui(r, t) || s && r.shouldRefresh)
            return {
                type: "saved",
                session: r
            };
        if (r.shouldRefresh)
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Session has expired");
        else
            return {
                type: "new",
                session: nn({
                    sampled: !1
                })
            }
    }
    return {
        type: "new",
        session: mo({
            stickySession: n,
            sessionSampleRate: i,
            allowBuffering: s
        })
    }
}
function yo(t) {
    return t.type === A.Custom
}
async function fe(t, e, n) {
    if (!t.eventBuffer || t.isPaused() || tn(e.timestamp) + t.timeouts.sessionIdlePause < Date.now())
        return null;
    try {
        n && t.eventBuffer.clear();
        const s = t.getOptions()
          , r = typeof s.beforeAddRecordingEvent == "function" && yo(e) ? s.beforeAddRecordingEvent(e) : e;
        return r ? await t.eventBuffer.addEvent(r) : void 0
    } catch (s) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error(s),
        await t.stop("addEvent");
        const r = Y().getClient();
        r && r.recordDroppedEvent("internal_sdk_error", "replay")
    }
}
function Pe(t) {
    return !t.type
}
function Ge(t) {
    return t.type === "transaction"
}
function Eo(t) {
    return t.type === "replay_event"
}
function Mi(t) {
    const e = bo();
    return (n, i) => {
        if (!Pe(n) && !Ge(n))
            return;
        const s = i && i.statusCode;
        if (!(e && (!s || s < 200 || s >= 300))) {
            if (Ge(n) && n.contexts && n.contexts.trace && n.contexts.trace.trace_id) {
                t.getContext().traceIds.add(n.contexts.trace.trace_id);
                return
            }
            Pe(n) && (n.event_id && t.getContext().errorIds.add(n.event_id),
            t.recordingMode === "buffer" && n.tags && n.tags.replayId && setTimeout( () => {
                t.sendBufferedReplayOrFlush()
            }
            ))
        }
    }
}
function bo() {
    const t = Y().getClient();
    if (!t)
        return !1;
    const e = t.getTransport();
    return e && e.send.__sentry__baseTransport__ || !1
}
function So(t, e) {
    return t.type || !t.exception || !t.exception.values || !t.exception.values.length ? !1 : e.originalException && e.originalException.__rrweb__ ? !0 : t.exception.values.some(n => !n.stacktrace || !n.stacktrace.frames || !n.stacktrace.frames.length ? !1 : n.stacktrace.frames.some(i => i.filename && i.filename.includes("/rrweb/src/")))
}
function wo(t, e) {
    return t.recordingMode !== "buffer" || e.message === Qe || !e.exception || e.type ? !1 : Li(t.getOptions().errorSampleRate)
}
function vo(t, e=!1) {
    const n = e ? Mi(t) : void 0;
    return (i, s) => Eo(i) ? (delete i.breadcrumbs,
    i) : !Pe(i) && !Ge(i) ? i : So(i, s) && !t.getOptions()._experiments.captureExceptions ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Ignoring error from rrweb internals", i),
    null) : ((wo(t, i) || t.recordingMode === "session") && (i.tags = {
        ...i.tags,
        replayId: t.getSessionId()
    }),
    n && n(i, {
        statusCode: 200
    }),
    i)
}
function ye(t, e) {
    return e.map( ({type: n, start: i, end: s, name: r, data: o}) => {
        const a = t.throttledAddEvent({
            type: A.Custom,
            timestamp: i,
            data: {
                tag: "performanceSpan",
                payload: {
                    op: n,
                    description: r,
                    startTimestamp: i,
                    endTimestamp: s,
                    data: o
                }
            }
        });
        return typeof a == "string" ? Promise.resolve(null) : a
    }
    )
}
function To(t) {
    const {from: e, to: n} = t
      , i = Date.now() / 1e3;
    return {
        type: "navigation.push",
        start: i,
        end: i,
        name: n,
        data: {
            previous: e
        }
    }
}
function Ro(t) {
    return e => {
        if (!t.isEnabled())
            return;
        const n = To(e);
        n !== null && (t.getContext().urls.push(n.name),
        t.triggerUserActivity(),
        t.addUpdate( () => (ye(t, [n]),
        !1)))
    }
}
function ko(t, e) {
    return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && t.getOptions()._experiments.traceInternals ? !1 : xo(e)
}
function xo(t) {
    const e = Y().getClient()
      , n = e && e.getDsn();
    return n ? t.includes(n.host) : !1
}
function Ee(t, e) {
    t.isEnabled() && e !== null && (ko(t, e.name) || t.addUpdate( () => (ye(t, [e]),
    !0)))
}
function No(t) {
    const {startTimestamp: e, endTimestamp: n, fetchData: i, response: s} = t;
    if (!n)
        return null;
    const {method: r, url: o} = i;
    return {
        type: "resource.fetch",
        start: e / 1e3,
        end: n / 1e3,
        name: o,
        data: {
            method: r,
            statusCode: s && s.status
        }
    }
}
function Do(t) {
    return e => {
        if (!t.isEnabled())
            return;
        const n = No(e);
        Ee(t, n)
    }
}
function Io(t) {
    const {startTimestamp: e, endTimestamp: n, xhr: i} = t
      , s = i[Xe];
    if (!e || !n || !s)
        return null;
    const {method: r, url: o, status_code: a} = s;
    return o === void 0 ? null : {
        type: "resource.xhr",
        name: o,
        start: e / 1e3,
        end: n / 1e3,
        data: {
            method: r,
            statusCode: a
        }
    }
}
function Ao(t) {
    return e => {
        if (!t.isEnabled())
            return;
        const n = Io(e);
        Ee(t, n)
    }
}
const ht = 10
  , sn = 11
  , Ye = 12
  , ut = 13
  , Fe = 14
  , xt = 15
  , ot = 20
  , Q = 21
  , He = 22
  , Nt = 23
  , zi = ["true", "false", "null"];
function Co(t, e) {
    if (!e.length)
        return t;
    let n = t;
    const i = e.length - 1
      , s = e[i];
    n = Oo(n, s);
    for (let r = i; r >= 0; r--)
        switch (e[r]) {
        case ht:
            n = `${n}}`;
            break;
        case ot:
            n = `${n}]`;
            break
        }
    return n
}
function Oo(t, e) {
    switch (e) {
    case ht:
        return `${t}"~~":"~~"`;
    case sn:
        return `${t}:"~~"`;
    case Ye:
        return `${t}~~":"~~"`;
    case ut:
        return Lo(t);
    case Fe:
        return `${t}~~"`;
    case xt:
        return `${t},"~~":"~~"`;
    case ot:
        return `${t}"~~"`;
    case Q:
        return Bo(t);
    case He:
        return `${t}~~"`;
    case Nt:
        return `${t},"~~"`
    }
    return t
}
function Bo(t) {
    const e = Uo(t);
    if (e > -1) {
        const n = t.slice(e + 1);
        return zi.includes(n.trim()) ? `${t},"~~"` : `${t.slice(0, e + 1)}"~~"`
    }
    return t
}
function Uo(t) {
    for (let e = t.length - 1; e >= 0; e--) {
        const n = t[e];
        if (n === "," || n === "[")
            return e
    }
    return -1
}
function Lo(t) {
    const e = t.lastIndexOf(":")
      , n = t.slice(e + 1);
    return zi.includes(n.trim()) ? `${t},"~~":"~~"` : `${t.slice(0, e + 1)}"~~"`
}
function Mo(t) {
    const e = [];
    for (let n = 0; n < t.length; n++)
        zo(e, t, n);
    return e
}
function zo(t, e, n) {
    const i = t[t.length - 1]
      , s = e[n];
    if (!/\s/.test(s)) {
        if (s === '"' && !Pi(e, n)) {
            Po(t, i);
            return
        }
        switch (s) {
        case "{":
            Go(t, i);
            break;
        case "[":
            Yo(t, i);
            break;
        case ":":
            Fo(t, i);
            break;
        case ",":
            Ho(t, i);
            break;
        case "}":
            $o(t, i);
            break;
        case "]":
            Wo(t, i);
            break
        }
    }
}
function Po(t, e) {
    if (e === Fe) {
        t.pop(),
        t.push(xt);
        return
    }
    if (e === He) {
        t.pop(),
        t.push(Nt);
        return
    }
    if (e === ut) {
        t.push(Fe);
        return
    }
    if (e === Q) {
        t.push(He);
        return
    }
    if (e === ht) {
        t.push(Ye);
        return
    }
    if (e === Ye) {
        t.pop(),
        t.push(sn);
        return
    }
}
function Go(t, e) {
    if (!e) {
        t.push(ht);
        return
    }
    if (e === ut) {
        t.push(ht);
        return
    }
    if (e === Q && t.push(ht),
    e === ot) {
        t.push(ht);
        return
    }
}
function Yo(t, e) {
    if (!e) {
        t.push(ot),
        t.push(Q);
        return
    }
    if (e === ut) {
        t.push(ot),
        t.push(Q);
        return
    }
    if (e === Q && (t.push(ot),
    t.push(Q)),
    e === ot) {
        t.push(ot),
        t.push(Q);
        return
    }
}
function Fo(t, e) {
    e === sn && (t.pop(),
    t.push(ut))
}
function Ho(t, e) {
    if (e === ut) {
        t.pop();
        return
    }
    if (e === xt) {
        t.pop(),
        t.pop();
        return
    }
    if (e !== Q && e === Nt) {
        t.pop();
        return
    }
}
function $o(t, e) {
    e === ht && t.pop(),
    e === ut && (t.pop(),
    t.pop()),
    e === xt && (t.pop(),
    t.pop(),
    t.pop()),
    t[t.length - 1] === ut && t.push(xt),
    t[t.length - 1] === Q && t.push(Nt)
}
function Wo(t, e) {
    e === ot && t.pop(),
    e === Q && (t.pop(),
    t.pop()),
    e === Nt && (t.pop(),
    t.pop(),
    t.pop()),
    t[t.length - 1] === ut && t.push(xt),
    t[t.length - 1] === Q && t.push(Nt)
}
function Pi(t, e) {
    return t[e - 1] === "\\" && !Pi(t, e - 1)
}
function Gi(t) {
    const e = Mo(t);
    return Co(t, e)
}
function he(t, e) {
    if (t)
        try {
            if (typeof t == "string")
                return e.encode(t).length;
            if (t instanceof URLSearchParams)
                return e.encode(t.toString()).length;
            if (t instanceof FormData) {
                const n = $i(t);
                return e.encode(n).length
            }
            if (t instanceof Blob)
                return t.size;
            if (t instanceof ArrayBuffer)
                return t.byteLength
        } catch {}
}
function Yi(t) {
    if (!t)
        return;
    const e = parseInt(t, 10);
    return isNaN(e) ? void 0 : e
}
function Fi(t) {
    if (typeof t == "string")
        return t;
    if (t instanceof URLSearchParams)
        return t.toString();
    if (t instanceof FormData)
        return $i(t)
}
function Hi(t, e) {
    if (!e)
        return null;
    const {startTimestamp: n, endTimestamp: i, url: s, method: r, statusCode: o, request: a, response: c} = e;
    return {
        type: t,
        start: n / 1e3,
        end: i / 1e3,
        name: s,
        data: pt({
            method: r,
            statusCode: o,
            request: a,
            response: c
        })
    }
}
function jt(t) {
    return {
        headers: {},
        size: t,
        _meta: {
            warnings: ["URL_SKIPPED"]
        }
    }
}
function _t(t, e, n) {
    if (!e && Object.keys(t).length === 0)
        return;
    if (!e)
        return {
            headers: t
        };
    if (!n)
        return {
            headers: t,
            size: e
        };
    const i = {
        headers: t,
        size: e
    }
      , {body: s, warnings: r} = jo(n);
    return i.body = s,
    r.length > 0 && (i._meta = {
        warnings: r
    }),
    i
}
function $e(t, e) {
    return Object.keys(t).reduce( (n, i) => {
        const s = i.toLowerCase();
        return e.includes(s) && t[i] && (n[s] = t[i]),
        n
    }
    , {})
}
function $i(t) {
    return new URLSearchParams(t).toString()
}
function jo(t) {
    if (!t || typeof t != "string")
        return {
            body: t,
            warnings: []
        };
    const e = t.length > Kt;
    if (Zo(t))
        try {
            const n = e ? Gi(t.slice(0, Kt)) : t;
            return {
                body: JSON.parse(n),
                warnings: e ? ["JSON_TRUNCATED"] : []
            }
        } catch {
            return {
                body: e ? `${t.slice(0, Kt)}…` : t,
                warnings: e ? ["INVALID_JSON", "TEXT_TRUNCATED"] : ["INVALID_JSON"]
            }
        }
    return {
        body: e ? `${t.slice(0, Kt)}…` : t,
        warnings: e ? ["TEXT_TRUNCATED"] : []
    }
}
function Zo(t) {
    const e = t[0]
      , n = t[t.length - 1];
    return e === "[" && n === "]" || e === "{" && n === "}"
}
function Wi(t, e) {
    const n = qo(t);
    return oi(n, e)
}
function qo(t, e=k.document.baseURI) {
    if (t.startsWith("http://") || t.startsWith("https://") || t.startsWith(k.location.origin))
        return t;
    const n = new URL(t,e);
    if (n.origin !== new URL(e).origin)
        return t;
    const i = n.href;
    return !t.endsWith("/") && i.endsWith("/") ? i.slice(0, -1) : i
}
async function Vo(t, e, n) {
    try {
        const i = await Ko(t, e, n)
          , s = Hi("resource.fetch", i);
        Ee(n.replay, s)
    } catch (i) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay] Failed to capture fetch breadcrumb", i)
    }
}
function Xo(t, e, n) {
    const {input: i, response: s} = e
      , r = ji(i)
      , o = he(r, n.textEncoder)
      , a = s ? Yi(s.headers.get("content-length")) : void 0;
    o !== void 0 && (t.data.request_body_size = o),
    a !== void 0 && (t.data.response_body_size = a)
}
async function Ko(t, e, n) {
    const {startTimestamp: i, endTimestamp: s} = e
      , {url: r, method: o, status_code: a=0, request_body_size: c, response_body_size: l} = t.data
      , d = Wi(r, n.networkDetailAllowUrls)
      , u = d ? Jo(n, e.input, c) : jt(c)
      , h = await Qo(d, n, e.response, l);
    return {
        startTimestamp: i,
        endTimestamp: s,
        url: r,
        method: o,
        statusCode: a,
        request: u,
        response: h
    }
}
function Jo({networkCaptureBodies: t, networkRequestHeaders: e}, n, i) {
    const s = ec(n, e);
    if (!t)
        return _t(s, i, void 0);
    const r = ji(n)
      , o = Fi(r);
    return _t(s, i, o)
}
async function Qo(t, {networkCaptureBodies: e, textEncoder: n, networkResponseHeaders: i}, s, r) {
    if (!t && r !== void 0)
        return jt(r);
    const o = Zi(s.headers, i);
    if (!e && r !== void 0)
        return _t(o, r, void 0);
    try {
        const a = s.clone()
          , c = await tc(a)
          , l = c && c.length && r === void 0 ? he(c, n) : r;
        return t ? e ? _t(o, l, c) : _t(o, l, void 0) : jt(l)
    } catch {
        return _t(o, r, void 0)
    }
}
async function tc(t) {
    try {
        return await t.text()
    } catch {
        return
    }
}
function ji(t=[]) {
    if (!(t.length !== 2 || typeof t[1] != "object"))
        return t[1].body
}
function Zi(t, e) {
    const n = {};
    return e.forEach(i => {
        t.get(i) && (n[i] = t.get(i))
    }
    ),
    n
}
function ec(t, e) {
    return t.length === 1 && typeof t[0] != "string" ? Cn(t[0], e) : t.length === 2 ? Cn(t[1], e) : {}
}
function Cn(t, e) {
    if (!t)
        return {};
    const n = t.headers;
    return n ? n instanceof Headers ? Zi(n, e) : Array.isArray(n) ? {} : $e(n, e) : {}
}
async function nc(t, e, n) {
    try {
        const i = sc(t, e, n)
          , s = Hi("resource.xhr", i);
        Ee(n.replay, s)
    } catch (i) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay] Failed to capture fetch breadcrumb", i)
    }
}
function ic(t, e, n) {
    const {xhr: i, input: s} = e
      , r = he(s, n.textEncoder)
      , o = i.getResponseHeader("content-length") ? Yi(i.getResponseHeader("content-length")) : he(i.response, n.textEncoder);
    r !== void 0 && (t.data.request_body_size = r),
    o !== void 0 && (t.data.response_body_size = o)
}
function sc(t, e, n) {
    const {startTimestamp: i, endTimestamp: s, input: r, xhr: o} = e
      , {url: a, method: c, status_code: l=0, request_body_size: d, response_body_size: u} = t.data;
    if (!a)
        return null;
    if (!Wi(a, n.networkDetailAllowUrls)) {
        const y = jt(d)
          , C = jt(u);
        return {
            startTimestamp: i,
            endTimestamp: s,
            url: a,
            method: c,
            statusCode: l,
            request: y,
            response: C
        }
    }
    const h = o[Xe]
      , f = h ? $e(h.request_headers, n.networkRequestHeaders) : {}
      , p = $e(rc(o), n.networkResponseHeaders)
      , b = _t(f, d, n.networkCaptureBodies ? Fi(r) : void 0)
      , x = _t(p, u, n.networkCaptureBodies ? e.xhr.responseText : void 0);
    return {
        startTimestamp: i,
        endTimestamp: s,
        url: a,
        method: c,
        statusCode: l,
        request: b,
        response: x
    }
}
function rc(t) {
    const e = t.getAllResponseHeaders();
    return e ? e.split(`\r
`).reduce( (n, i) => {
        const [s,r] = i.split(": ");
        return n[s.toLowerCase()] = r,
        n
    }
    , {}) : {}
}
function ac(t) {
    const e = Y().getClient();
    try {
        const n = new TextEncoder
          , {networkDetailAllowUrls: i, networkCaptureBodies: s, networkRequestHeaders: r, networkResponseHeaders: o} = t.getOptions()
          , a = {
            replay: t,
            textEncoder: n,
            networkDetailAllowUrls: i,
            networkCaptureBodies: s,
            networkRequestHeaders: r,
            networkResponseHeaders: o
        };
        e && e.on ? e.on("beforeAddBreadcrumb", (c, l) => oc(a, c, l)) : (lt("fetch", Do(t)),
        lt("xhr", Ao(t)))
    } catch {}
}
function oc(t, e, n) {
    if (e.data)
        try {
            cc(e) && dc(n) && (ic(e, n, t),
            nc(e, n, t)),
            lc(e) && uc(n) && (Xo(e, n, t),
            Vo(e, n, t))
        } catch {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("Error when enriching network breadcrumb")
        }
}
function cc(t) {
    return t.category === "xhr"
}
function lc(t) {
    return t.category === "fetch"
}
function dc(t) {
    return t && t.xhr
}
function uc(t) {
    return t && t.response
}
let On = null;
function fc(t) {
    return !!t.category
}
const hc = t => e => {
    if (!t.isEnabled())
        return;
    const n = _c(e);
    n && ge(t, n)
}
;
function _c(t) {
    const e = t.getLastBreadcrumb && t.getLastBreadcrumb();
    return On === e || !e || (On = e,
    !fc(e) || ["fetch", "xhr", "sentry.event", "sentry.transaction"].includes(e.category) || e.category.startsWith("ui.")) ? null : e.category === "console" ? pc(e) : ct(e)
}
function pc(t) {
    const e = t.data && t.data.arguments;
    if (!Array.isArray(e) || e.length === 0)
        return ct(t);
    let n = !1;
    const i = e.map(s => {
        if (!s)
            return s;
        if (typeof s == "string")
            return s.length > Jt ? (n = !0,
            `${s.slice(0, Jt)}…`) : s;
        if (typeof s == "object")
            try {
                const r = Ve(s, 7)
                  , o = JSON.stringify(r);
                if (o.length > Jt) {
                    const a = Gi(o.slice(0, Jt))
                      , c = JSON.parse(a);
                    return n = !0,
                    c
                }
                return r
            } catch {}
        return s
    }
    );
    return ct({
        ...t,
        data: {
            ...t.data,
            arguments: i,
            ...n ? {
                _meta: {
                    warnings: ["CONSOLE_ARG_TRUNCATED"]
                }
            } : {}
        }
    })
}
function mc(t) {
    const e = Y().getScope()
      , n = Y().getClient();
    e && e.addScopeListener(hc(t)),
    lt("dom", qa(t)),
    lt("history", Ro(t)),
    ac(t),
    si(vo(t, !Bn(n))),
    Bn(n) && (n.on("afterSendEvent", Mi(t)),
    n.on("createDsc", i => {
        const s = t.getSessionId();
        s && t.isEnabled() && t.recordingMode === "session" && (i.replay_id = s)
    }
    ),
    n.on("startTransaction", i => {
        t.lastTransaction = i
    }
    ),
    n.on("finishTransaction", i => {
        t.lastTransaction = i
    }
    ))
}
function Bn(t) {
    return !!(t && t.on)
}
async function gc(t) {
    try {
        return Promise.all(ye(t, [yc(k.performance.memory)]))
    } catch {
        return []
    }
}
function yc(t) {
    const {jsHeapSizeLimit: e, totalJSHeapSize: n, usedJSHeapSize: i} = t
      , s = Date.now() / 1e3;
    return {
        type: "memory",
        name: "memory",
        start: s,
        end: s,
        data: {
            memory: {
                jsHeapSizeLimit: e,
                totalJSHeapSize: n,
                usedJSHeapSize: i
            }
        }
    }
}
const Un = {
    resource: vc,
    paint: Sc,
    navigation: wc,
    ["largest-contentful-paint"]: Tc
};
function Ec(t) {
    return t.map(bc).filter(Boolean)
}
function bc(t) {
    return Un[t.entryType] === void 0 ? null : Un[t.entryType](t)
}
function Dt(t) {
    return ((dt || k.performance.timeOrigin) + t) / 1e3
}
function Sc(t) {
    const {duration: e, entryType: n, name: i, startTime: s} = t
      , r = Dt(s);
    return {
        type: n,
        name: i,
        start: r,
        end: r + e,
        data: void 0
    }
}
function wc(t) {
    const {entryType: e, name: n, decodedBodySize: i, duration: s, domComplete: r, encodedBodySize: o, domContentLoadedEventStart: a, domContentLoadedEventEnd: c, domInteractive: l, loadEventStart: d, loadEventEnd: u, redirectCount: h, startTime: f, transferSize: p, type: b} = t;
    return s === 0 ? null : {
        type: `${e}.${b}`,
        start: Dt(f),
        end: Dt(r),
        name: n,
        data: {
            size: p,
            decodedBodySize: i,
            encodedBodySize: o,
            duration: s,
            domInteractive: l,
            domContentLoadedEventStart: a,
            domContentLoadedEventEnd: c,
            loadEventStart: d,
            loadEventEnd: u,
            domComplete: r,
            redirectCount: h
        }
    }
}
function vc(t) {
    const {entryType: e, initiatorType: n, name: i, responseEnd: s, startTime: r, decodedBodySize: o, encodedBodySize: a, responseStatus: c, transferSize: l} = t;
    return ["fetch", "xmlhttprequest"].includes(n) ? null : {
        type: `${e}.${n}`,
        start: Dt(r),
        end: Dt(s),
        name: i,
        data: {
            size: l,
            statusCode: c,
            decodedBodySize: o,
            encodedBodySize: a
        }
    }
}
function Tc(t) {
    const {entryType: e, startTime: n, size: i} = t;
    let s = 0;
    if (k.performance) {
        const a = k.performance.getEntriesByType("navigation")[0];
        s = a && a.activationStart || 0
    }
    const r = Math.max(n - s, 0)
      , o = Dt(s) + r / 1e3;
    return {
        type: e,
        name: e,
        start: o,
        end: o,
        data: {
            value: r,
            size: i,
            nodeId: gt.mirror.getId(t.element)
        }
    }
}
function Rc(t, e, n) {
    let i, s, r;
    const o = n && n.maxWait ? Math.max(n.maxWait, e) : 0;
    function a() {
        return c(),
        i = t(),
        i
    }
    function c() {
        s !== void 0 && clearTimeout(s),
        r !== void 0 && clearTimeout(r),
        s = r = void 0
    }
    function l() {
        return s !== void 0 || r !== void 0 ? a() : i
    }
    function d() {
        return s && clearTimeout(s),
        s = setTimeout(a, e),
        o && r === void 0 && (r = setTimeout(a, o)),
        i
    }
    return d.cancel = c,
    d.flush = l,
    d
}
function kc(t) {
    let e = !1;
    return (n, i) => {
        if (!t.checkAndHandleExpiredSession()) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("[Replay] Received replay event after session expired.");
            return
        }
        const s = i || !e;
        e = !0,
        t.addUpdate( () => {
            if (t.recordingMode === "buffer" && s && t.setInitialState(),
            fe(t, n, s),
            !s)
                return !1;
            if (Nc(t, s),
            t.session && t.session.previousSessionId)
                return !0;
            if (t.recordingMode === "buffer" && t.session && t.eventBuffer) {
                const o = t.eventBuffer.getEarliestTimestamp();
                o && (t.session.started = o,
                t.getOptions().stickySession && en(t.session))
            }
            const r = t.getOptions();
            return r._experiments.delayFlushOnCheckout ? (setTimeout( () => t.conditionalFlush(), r._experiments.delayFlushOnCheckout),
            t.cancelFlush(),
            !0) : (t.recordingMode === "session" && t.flushImmediate(),
            !0)
        }
        )
    }
}
function xc(t) {
    const e = t.getOptions();
    return {
        type: A.Custom,
        timestamp: Date.now(),
        data: {
            tag: "options",
            payload: {
                sessionSampleRate: e.sessionSampleRate,
                errorSampleRate: e.errorSampleRate,
                useCompressionOption: e.useCompression,
                blockAllMedia: e.blockAllMedia,
                maskAllText: e.maskAllText,
                maskAllInputs: e.maskAllInputs,
                useCompression: t.eventBuffer ? t.eventBuffer.type === "worker" : !1,
                networkDetailHasUrls: e.networkDetailAllowUrls.length > 0,
                networkCaptureBodies: e.networkCaptureBodies,
                networkRequestHasHeaders: e.networkRequestHeaders.length > 0,
                networkResponseHasHeaders: e.networkResponseHeaders.length > 0
            }
        }
    }
}
function Nc(t, e) {
    return !e || !t.session || t.session.segmentId !== 0 ? Promise.resolve(null) : fe(t, xc(t), !1)
}
function Dc(t, e, n, i) {
    return ai(Es(t, bs(t), i, n), [[{
        type: "replay_event"
    }, t], [{
        type: "replay_recording",
        length: typeof e == "string" ? new TextEncoder().encode(e).length : e.length
    }, e]])
}
function Ic({recordingData: t, headers: e}) {
    let n;
    const i = `${JSON.stringify(e)}
`;
    if (typeof t == "string")
        n = `${i}${t}`;
    else {
        const r = new TextEncoder().encode(i);
        n = new Uint8Array(r.length + t.length),
        n.set(r),
        n.set(t, r.length)
    }
    return n
}
async function Ac({client: t, scope: e, replayId: n, event: i}) {
    const s = typeof t._integrations == "object" && t._integrations !== null && !Array.isArray(t._integrations) ? Object.keys(t._integrations) : void 0
      , r = await Ss(t.getOptions(), i, {
        event_id: n,
        integrations: s
    }, e);
    if (!r)
        return null;
    r.platform = r.platform || "javascript";
    const o = t.getSdkMetadata && t.getSdkMetadata()
      , {name: a, version: c} = o && o.sdk || {};
    return r.sdk = {
        ...r.sdk,
        name: a || "sentry.javascript.unknown",
        version: c || "0.0.0"
    },
    r
}
async function Cc({recordingData: t, replayId: e, segmentId: n, eventContext: i, timestamp: s, session: r}) {
    const o = Ic({
        recordingData: t,
        headers: {
            segment_id: n
        }
    })
      , {urls: a, errorIds: c, traceIds: l, initialTimestamp: d} = i
      , u = Y()
      , h = u.getClient()
      , f = u.getScope()
      , p = h && h.getTransport()
      , b = h && h.getDsn();
    if (!h || !f || !p || !b || !r.sampled)
        return;
    const x = {
        type: Ur,
        replay_start_timestamp: d / 1e3,
        timestamp: s / 1e3,
        error_ids: c,
        trace_ids: l,
        urls: a,
        replay_id: e,
        segment_id: n,
        replay_type: r.sampled
    }
      , y = await Ac({
        scope: f,
        client: h,
        replayId: e,
        event: x
    });
    if (!y) {
        h.recordDroppedEvent("event_processor", "replay", x),
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("An event processor returned `null`, will not send event.");
        return
    }
    const C = Dc(y, o, b, h.getOptions().tunnel);
    let N;
    try {
        N = await p.send(C)
    } catch (T) {
        const E = new Error(Qe);
        try {
            E.cause = T
        } catch {}
        throw E
    }
    if (!N)
        return N;
    if (typeof N.statusCode == "number" && (N.statusCode < 200 || N.statusCode >= 300))
        throw new qi(N.statusCode);
    return N
}
class qi extends Error {
    constructor(e) {
        super(`Transport returned status code ${e}`)
    }
}
async function Vi(t, e={
    count: 0,
    interval: Fr
}) {
    const {recordingData: n, options: i} = t;
    if (n.length)
        try {
            return await Cc(t),
            !0
        } catch (s) {
            if (s instanceof qi)
                throw s;
            if (ri("Replays", {
                _retryCount: e.count
            }),
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && i._experiments && i._experiments.captureExceptions && qe(s),
            e.count >= Hr) {
                const r = new Error(`${Qe} - max retries exceeded`);
                try {
                    r.cause = s
                } catch {}
                throw r
            }
            return e.interval *= ++e.count,
            await new Promise( (r, o) => {
                setTimeout(async () => {
                    try {
                        await Vi(t, e),
                        r(!0)
                    } catch (a) {
                        o(a)
                    }
                }
                , e.interval)
            }
            )
        }
}
const Xi = "__THROTTLED"
  , Oc = "__SKIPPED";
function Bc(t, e, n) {
    const i = new Map
      , s = a => {
        const c = a - n;
        i.forEach( (l, d) => {
            d < c && i.delete(d)
        }
        )
    }
      , r = () => [...i.values()].reduce( (a, c) => a + c, 0);
    let o = !1;
    return (...a) => {
        const c = Math.floor(Date.now() / 1e3);
        if (s(c),
        r() >= e) {
            const d = o;
            return o = !0,
            d ? Oc : Xi
        }
        o = !1;
        const l = i.get(c) || 0;
        return i.set(c, l + 1),
        t(...a)
    }
}
class G {
    __init() {
        this.eventBuffer = null
    }
    __init2() {
        this.performanceEvents = []
    }
    __init3() {
        this.recordingMode = "session"
    }
    __init4() {
        this.timeouts = {
            sessionIdlePause: Lr,
            sessionIdleExpire: Mr,
            maxSessionLife: zr
        }
    }
    __init5() {
        this._performanceObserver = null
    }
    __init6() {
        this._flushLock = null
    }
    __init7() {
        this._lastActivity = Date.now()
    }
    __init8() {
        this._isEnabled = !1
    }
    __init9() {
        this._isPaused = !1
    }
    __init10() {
        this._hasInitializedCoreListeners = !1
    }
    __init11() {
        this._stopRecording = null
    }
    __init12() {
        this._context = {
            errorIds: new Set,
            traceIds: new Set,
            urls: [],
            initialTimestamp: Date.now(),
            initialUrl: ""
        }
    }
    constructor({options: e, recordingOptions: n}) {
        G.prototype.__init.call(this),
        G.prototype.__init2.call(this),
        G.prototype.__init3.call(this),
        G.prototype.__init4.call(this),
        G.prototype.__init5.call(this),
        G.prototype.__init6.call(this),
        G.prototype.__init7.call(this),
        G.prototype.__init8.call(this),
        G.prototype.__init9.call(this),
        G.prototype.__init10.call(this),
        G.prototype.__init11.call(this),
        G.prototype.__init12.call(this),
        G.prototype.__init13.call(this),
        G.prototype.__init14.call(this),
        G.prototype.__init15.call(this),
        G.prototype.__init16.call(this),
        G.prototype.__init17.call(this),
        G.prototype.__init18.call(this),
        this._recordingOptions = n,
        this._options = e,
        this._debouncedFlush = Rc( () => this._flush(), this._options.flushMinDelay, {
            maxWait: this._options.flushMaxDelay
        }),
        this._throttledAddEvent = Bc( (i, s) => fe(this, i, s), 300, 5)
    }
    getContext() {
        return this._context
    }
    isEnabled() {
        return this._isEnabled
    }
    isPaused() {
        return this._isPaused
    }
    getOptions() {
        return this._options
    }
    initializeSampling() {
        const {errorSampleRate: e, sessionSampleRate: n} = this._options;
        if (!(e <= 0 && n <= 0 || !this._loadAndCheckSession())) {
            if (!this.session) {
                this._handleException(new Error("Unable to initialize and create session"));
                return
            }
            this.session.sampled && this.session.sampled !== "session" && (this.recordingMode = "buffer"),
            this._initializeRecording()
        }
    }
    start() {
        if (this._isEnabled && this.recordingMode === "session")
            throw new Error("Replay recording is already in progress");
        if (this._isEnabled && this.recordingMode === "buffer")
            throw new Error("Replay buffering is in progress, call `flush()` to save the replay");
        const e = this.session && this.session.id
          , {session: n} = Ne({
            timeouts: this.timeouts,
            stickySession: !!this._options.stickySession,
            currentSession: this.session,
            sessionSampleRate: 1,
            allowBuffering: !1
        });
        n.previousSessionId = e,
        this.session = n,
        this._initializeRecording()
    }
    startBuffering() {
        if (this._isEnabled)
            throw new Error("Replay recording is already in progress");
        const e = this.session && this.session.id
          , {session: n} = Ne({
            timeouts: this.timeouts,
            stickySession: !!this._options.stickySession,
            currentSession: this.session,
            sessionSampleRate: 0,
            allowBuffering: !0
        });
        n.previousSessionId = e,
        this.session = n,
        this.recordingMode = "buffer",
        this._initializeRecording()
    }
    startRecording() {
        try {
            this._stopRecording = gt({
                ...this._recordingOptions,
                ...this.recordingMode === "buffer" && {
                    checkoutEveryNms: Yr
                },
                emit: kc(this),
                onMutation: this._onMutationHandler
            })
        } catch (e) {
            this._handleException(e)
        }
    }
    stopRecording() {
        try {
            return this._stopRecording && (this._stopRecording(),
            this._stopRecording = void 0),
            !0
        } catch (e) {
            return this._handleException(e),
            !1
        }
    }
    async stop(e) {
        if (this._isEnabled)
            try {
                if (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) {
                    const n = `[Replay] Stopping Replay${e ? ` triggered by ${e}` : ""}`;
                    (this.getOptions()._experiments.traceInternals ? console.warn : _.log)(n)
                }
                this._isEnabled = !1,
                this._removeListeners(),
                this.stopRecording(),
                this._debouncedFlush.cancel(),
                this.recordingMode === "session" && await this._flush({
                    force: !0
                }),
                this.eventBuffer && this.eventBuffer.destroy(),
                this.eventBuffer = null,
                ho(this)
            } catch (n) {
                this._handleException(n)
            }
    }
    pause() {
        this._isPaused = !0,
        this.stopRecording()
    }
    resume() {
        this._loadAndCheckSession() && (this._isPaused = !1,
        this.startRecording())
    }
    async sendBufferedReplayOrFlush({continueRecording: e=!0}={}) {
        if (this.recordingMode === "session")
            return this.flushImmediate();
        const n = Date.now();
        await this.flushImmediate();
        const i = this.stopRecording();
        !e || !i || (this.recordingMode = "session",
        this.session && (this.session.shouldRefresh = !1,
        this._updateUserActivity(n),
        this._updateSessionActivity(n),
        this.session.started = n,
        this._maybeSaveSession()),
        this.startRecording())
    }
    addUpdate(e) {
        const n = e();
        this.recordingMode !== "buffer" && n !== !0 && this._debouncedFlush()
    }
    triggerUserActivity() {
        if (this._updateUserActivity(),
        !this._stopRecording) {
            if (!this._loadAndCheckSession())
                return;
            this.resume();
            return
        }
        this.checkAndHandleExpiredSession(),
        this._updateSessionActivity()
    }
    updateUserActivity() {
        this._updateUserActivity(),
        this._updateSessionActivity()
    }
    conditionalFlush() {
        return this.recordingMode === "buffer" ? Promise.resolve() : this.flushImmediate()
    }
    flushImmediate() {
        return this._debouncedFlush(),
        this._debouncedFlush.flush()
    }
    cancelFlush() {
        this._debouncedFlush.cancel()
    }
    getSessionId() {
        return this.session && this.session.id
    }
    checkAndHandleExpiredSession() {
        const e = this.getSessionId();
        if (this._lastActivity && ze(this._lastActivity, this.timeouts.sessionIdlePause) && this.session && this.session.sampled === "session") {
            this.pause();
            return
        }
        return this._loadAndCheckSession() ? e !== this.getSessionId() ? (this._triggerFullSnapshot(),
        !1) : !0 : void 0
    }
    setInitialState() {
        const e = `${k.location.pathname}${k.location.hash}${k.location.search}`
          , n = `${k.location.origin}${e}`;
        this.performanceEvents = [],
        this._clearContext(),
        this._context.initialUrl = n,
        this._context.initialTimestamp = Date.now(),
        this._context.urls.push(n)
    }
    throttledAddEvent(e, n) {
        const i = this._throttledAddEvent(e, n);
        if (i === Xi) {
            const s = ct({
                category: "replay.throttled"
            });
            this.addUpdate( () => {
                fe(this, {
                    type: A.Custom,
                    timestamp: s.timestamp || 0,
                    data: {
                        tag: "breadcrumb",
                        payload: s,
                        metric: !0
                    }
                })
            }
            )
        }
        return i
    }
    getCurrentRoute() {
        const e = this.lastTransaction || Y().getScope().getTransaction();
        if (!(!e || !["route", "custom"].includes(e.metadata.source)))
            return e.name
    }
    _initializeRecording() {
        this.setInitialState(),
        this._updateSessionActivity(),
        this.eventBuffer = fo({
            useCompression: this._options.useCompression
        }),
        this._removeListeners(),
        this._addListeners(),
        this._isEnabled = !0,
        this.startRecording()
    }
    _handleException(e) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay]", e),
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && this._options._experiments && this._options._experiments.captureExceptions && qe(e)
    }
    _loadAndCheckSession() {
        const {type: e, session: n} = Ne({
            timeouts: this.timeouts,
            stickySession: !!this._options.stickySession,
            currentSession: this.session,
            sessionSampleRate: this._options.sessionSampleRate,
            allowBuffering: this._options.errorSampleRate > 0 || this.recordingMode === "buffer"
        });
        e === "new" && this.setInitialState();
        const i = this.getSessionId();
        return n.id !== i && (n.previousSessionId = i),
        this.session = n,
        this.session.sampled ? !0 : (this.stop("session unsampled"),
        !1)
    }
    _addListeners() {
        try {
            k.document.addEventListener("visibilitychange", this._handleVisibilityChange),
            k.addEventListener("blur", this._handleWindowBlur),
            k.addEventListener("focus", this._handleWindowFocus),
            k.addEventListener("keydown", this._handleKeyboardEvent),
            this._hasInitializedCoreListeners || (mc(this),
            this._hasInitializedCoreListeners = !0)
        } catch (e) {
            this._handleException(e)
        }
        "PerformanceObserver"in k && (this._performanceObserver = ro(this))
    }
    _removeListeners() {
        try {
            k.document.removeEventListener("visibilitychange", this._handleVisibilityChange),
            k.removeEventListener("blur", this._handleWindowBlur),
            k.removeEventListener("focus", this._handleWindowFocus),
            k.removeEventListener("keydown", this._handleKeyboardEvent),
            this._performanceObserver && (this._performanceObserver.disconnect(),
            this._performanceObserver = null)
        } catch (e) {
            this._handleException(e)
        }
    }
    __init13() {
        this._handleVisibilityChange = () => {
            k.document.visibilityState === "visible" ? this._doChangeToForegroundTasks() : this._doChangeToBackgroundTasks()
        }
    }
    __init14() {
        this._handleWindowBlur = () => {
            const e = ct({
                category: "ui.blur"
            });
            this._doChangeToBackgroundTasks(e)
        }
    }
    __init15() {
        this._handleWindowFocus = () => {
            const e = ct({
                category: "ui.focus"
            });
            this._doChangeToForegroundTasks(e)
        }
    }
    __init16() {
        this._handleKeyboardEvent = e => {
            to(this, e)
        }
    }
    _doChangeToBackgroundTasks(e) {
        if (!this.session)
            return;
        const n = Ui(this.session, this.timeouts);
        e && !n && this._createCustomBreadcrumb(e),
        this.conditionalFlush()
    }
    _doChangeToForegroundTasks(e) {
        if (!this.session)
            return;
        if (!this.checkAndHandleExpiredSession()) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Document has become active, but session has expired");
            return
        }
        e && this._createCustomBreadcrumb(e)
    }
    _triggerFullSnapshot(e=!0) {
        try {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Replay] Taking full rrweb snapshot"),
            gt.takeFullSnapshot(e)
        } catch (n) {
            this._handleException(n)
        }
    }
    _updateUserActivity(e=Date.now()) {
        this._lastActivity = e
    }
    _updateSessionActivity(e=Date.now()) {
        this.session && (this.session.lastActivity = e,
        this._maybeSaveSession())
    }
    _createCustomBreadcrumb(e) {
        this.addUpdate( () => {
            this.throttledAddEvent({
                type: A.Custom,
                timestamp: e.timestamp || 0,
                data: {
                    tag: "breadcrumb",
                    payload: e
                }
            })
        }
        )
    }
    _addPerformanceEntries() {
        const e = [...this.performanceEvents];
        return this.performanceEvents = [],
        Promise.all(ye(this, Ec(e)))
    }
    _clearContext() {
        this._context.errorIds.clear(),
        this._context.traceIds.clear(),
        this._context.urls = []
    }
    _updateInitialTimestampFromEventBuffer() {
        const {session: e, eventBuffer: n} = this;
        if (!e || !n || e.segmentId)
            return;
        const i = n.getEarliestTimestamp();
        i && i < this._context.initialTimestamp && (this._context.initialTimestamp = i)
    }
    _popEventContext() {
        const e = {
            initialTimestamp: this._context.initialTimestamp,
            initialUrl: this._context.initialUrl,
            errorIds: Array.from(this._context.errorIds),
            traceIds: Array.from(this._context.traceIds),
            urls: this._context.urls
        };
        return this._clearContext(),
        e
    }
    async _runFlush() {
        if (!this.session || !this.eventBuffer) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay] No session or eventBuffer found to flush.");
            return
        }
        if (await this._addPerformanceEntries(),
        !(!this.eventBuffer || !this.eventBuffer.hasEvents) && (await gc(this),
        !!this.eventBuffer))
            try {
                this._updateInitialTimestampFromEventBuffer();
                const e = await this.eventBuffer.finish()
                  , n = this.session.id
                  , i = this._popEventContext()
                  , s = this.session.segmentId++;
                this._maybeSaveSession(),
                await Vi({
                    replayId: n,
                    recordingData: e,
                    segmentId: s,
                    eventContext: i,
                    session: this.session,
                    options: this.getOptions(),
                    timestamp: Date.now()
                })
            } catch (e) {
                this._handleException(e),
                this.stop("sendReplay");
                const n = Y().getClient();
                n && n.recordDroppedEvent("send_error", "replay")
            }
    }
    __init17() {
        this._flush = async ({force: e=!1}={}) => {
            if (!(!this._isEnabled && !e)) {
                if (!this.checkAndHandleExpiredSession()) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay] Attempting to finish replay event after session expired.");
                    return
                }
                if (!this.session) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("[Replay] No session found to flush.");
                    return
                }
                if (this._debouncedFlush.cancel(),
                !this._flushLock) {
                    this._flushLock = this._runFlush(),
                    await this._flushLock,
                    this._flushLock = null;
                    return
                }
                try {
                    await this._flushLock
                } catch (n) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error(n)
                } finally {
                    this._debouncedFlush()
                }
            }
        }
    }
    _maybeSaveSession() {
        this.session && this._options.stickySession && en(this.session)
    }
    __init18() {
        this._onMutationHandler = e => {
            const n = e.length
              , i = this._options.mutationLimit
              , s = this._options.mutationBreadcrumbLimit
              , r = i && n > i;
            if (n > s || r) {
                const o = ct({
                    category: "replay.mutations",
                    data: {
                        count: n,
                        limit: r
                    }
                });
                this._createCustomBreadcrumb(o)
            }
            return r ? (this.stop("mutationLimit"),
            !1) : !0
        }
    }
}
function Bt(t, e, n, i) {
    const s = typeof i == "string" ? i.split(",") : []
      , r = [...t, ...s, ...e];
    return typeof n < "u" && (typeof n == "string" && r.push(`.${n}`),
    console.warn("[Replay] You are using a deprecated configuration item for privacy. Read the documentation on how to use the new privacy configuration.")),
    r.join(",")
}
function Uc({mask: t, unmask: e, block: n, unblock: i, ignore: s, blockClass: r, blockSelector: o, maskTextClass: a, maskTextSelector: c, ignoreClass: l}) {
    const d = ['base[href="/"]']
      , u = Bt(t, [".sentry-mask", "[data-sentry-mask]"], a, c)
      , h = Bt(e, [".sentry-unmask", "[data-sentry-unmask]"])
      , f = {
        maskTextSelector: u,
        unmaskTextSelector: h,
        maskInputSelector: u,
        unmaskInputSelector: h,
        blockSelector: Bt(n, [".sentry-block", "[data-sentry-block]", ...d], r, o),
        unblockSelector: Bt(i, [".sentry-unblock", "[data-sentry-unblock]"]),
        ignoreSelector: Bt(s, [".sentry-ignore", "[data-sentry-ignore]", 'input[type="file"]'], l)
    };
    return r instanceof RegExp && (f.blockClass = r),
    a instanceof RegExp && (f.maskTextClass = a),
    f
}
function Ln() {
    return typeof window < "u" && (!ys() || Lc())
}
function Lc() {
    return typeof process < "u" && process.type === "renderer"
}
const Mn = 'img,image,svg,video,object,picture,embed,map,audio,link[rel="icon"],link[rel="apple-touch-icon"]'
  , Mc = ["content-length", "content-type", "accept"];
let zn = !1;
class Zt {
    static __initStatic() {
        this.id = "Replay"
    }
    __init() {
        this.name = Zt.id
    }
    constructor({flushMinDelay: e=Pr, flushMaxDelay: n=Gr, stickySession: i=!0, useCompression: s=!0, _experiments: r={}, sessionSampleRate: o, errorSampleRate: a, maskAllText: c=!0, maskAllInputs: l=!0, blockAllMedia: d=!0, mutationBreadcrumbLimit: u=750, mutationLimit: h=1e4, slowClickTimeout: f=7e3, slowClickIgnoreSelectors: p=[], networkDetailAllowUrls: b=[], networkCaptureBodies: x=!0, networkRequestHeaders: y=[], networkResponseHeaders: C=[], mask: N=[], unmask: T=[], block: E=[], unblock: R=[], ignore: S=[], maskFn: g, beforeAddRecordingEvent: B, blockClass: D, blockSelector: z, maskInputOptions: $, maskTextClass: m, maskTextSelector: I, ignoreClass: P}={}) {
        if (Zt.prototype.__init.call(this),
        this._recordingOptions = {
            maskAllInputs: l,
            maskAllText: c,
            maskInputOptions: {
                ...$ || {},
                password: !0
            },
            maskTextFn: g,
            maskInputFn: g,
            ...Uc({
                mask: N,
                unmask: T,
                block: E,
                unblock: R,
                ignore: S,
                blockClass: D,
                blockSelector: z,
                maskTextClass: m,
                maskTextSelector: I,
                ignoreClass: P
            }),
            slimDOMOptions: "all",
            inlineStylesheet: !0,
            inlineImages: !1,
            collectFonts: !0
        },
        this._initialOptions = {
            flushMinDelay: e,
            flushMaxDelay: n,
            stickySession: i,
            sessionSampleRate: o,
            errorSampleRate: a,
            useCompression: s,
            blockAllMedia: d,
            maskAllInputs: l,
            maskAllText: c,
            mutationBreadcrumbLimit: u,
            mutationLimit: h,
            slowClickTimeout: f,
            slowClickIgnoreSelectors: p,
            networkDetailAllowUrls: b,
            networkCaptureBodies: x,
            networkRequestHeaders: Pn(y),
            networkResponseHeaders: Pn(C),
            beforeAddRecordingEvent: B,
            _experiments: r
        },
        typeof o == "number" && (console.warn(`[Replay] You are passing \`sessionSampleRate\` to the Replay integration.
This option is deprecated and will be removed soon.
Instead, configure \`replaysSessionSampleRate\` directly in the SDK init options, e.g.:
Sentry.init({ replaysSessionSampleRate: ${o} })`),
        this._initialOptions.sessionSampleRate = o),
        typeof a == "number" && (console.warn(`[Replay] You are passing \`errorSampleRate\` to the Replay integration.
This option is deprecated and will be removed soon.
Instead, configure \`replaysOnErrorSampleRate\` directly in the SDK init options, e.g.:
Sentry.init({ replaysOnErrorSampleRate: ${a} })`),
        this._initialOptions.errorSampleRate = a),
        this._initialOptions.blockAllMedia && (this._recordingOptions.blockSelector = this._recordingOptions.blockSelector ? `${this._recordingOptions.blockSelector},${Mn}` : Mn),
        this._isInitialized && Ln())
            throw new Error("Multiple Sentry Session Replay instances are not supported");
        this._isInitialized = !0
    }
    get _isInitialized() {
        return zn
    }
    set _isInitialized(e) {
        zn = e
    }
    setupOnce() {
        Ln() && (this._setup(),
        setTimeout( () => this._initialize()))
    }
    start() {
        this._replay && this._replay.start()
    }
    startBuffering() {
        this._replay && this._replay.startBuffering()
    }
    stop() {
        return this._replay ? this._replay.stop() : Promise.resolve()
    }
    flush(e) {
        return !this._replay || !this._replay.isEnabled() ? Promise.resolve() : this._replay.sendBufferedReplayOrFlush(e)
    }
    getReplayId() {
        if (!(!this._replay || !this._replay.isEnabled()))
            return this._replay.getSessionId()
    }
    _initialize() {
        this._replay && this._replay.initializeSampling()
    }
    _setup() {
        const e = zc(this._initialOptions);
        this._replay = new G({
            options: e,
            recordingOptions: this._recordingOptions
        })
    }
}
Zt.__initStatic();
function zc(t) {
    const e = Y().getClient()
      , n = e && e.getOptions()
      , i = {
        sessionSampleRate: 0,
        errorSampleRate: 0,
        ...pt(t)
    };
    return n ? (t.sessionSampleRate == null && t.errorSampleRate == null && n.replaysSessionSampleRate == null && n.replaysOnErrorSampleRate == null && console.warn("Replay is disabled because neither `replaysSessionSampleRate` nor `replaysOnErrorSampleRate` are set."),
    typeof n.replaysSessionSampleRate == "number" && (i.sessionSampleRate = n.replaysSessionSampleRate),
    typeof n.replaysOnErrorSampleRate == "number" && (i.errorSampleRate = n.replaysOnErrorSampleRate),
    i) : (console.warn("SDK client is not available."),
    i)
}
function Pn(t) {
    return [...Mc, ...t.map(e => e.toLowerCase())]
}
const O = ii;
function Pc() {
    O && O.document ? O.document.addEventListener("visibilitychange", () => {
        const t = At();
        if (O.document.hidden && t) {
            const e = "cancelled";
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${t.op}`),
            t.status || t.setStatus(e),
            t.setTag("visibilitychange", "document.hidden"),
            t.finish()
        }
    }
    ) : (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("[Tracing] Could not set up background tab detection due to lack of global document")
}
const rn = (t, e, n) => {
    let i, s;
    return r => {
        e.value >= 0 && (r || n) && (s = e.value - (i || 0),
        (s || i === void 0) && (i = e.value,
        e.delta = s,
        t(e)))
    }
}
  , Gc = () => `v3-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`
  , Yc = () => {
    const t = O.performance.timing
      , e = O.performance.navigation.type
      , n = {
        entryType: "navigation",
        startTime: 0,
        type: e == 2 ? "back_forward" : e === 1 ? "reload" : "navigate"
    };
    for (const i in t)
        i !== "navigationStart" && i !== "toJSON" && (n[i] = Math.max(t[i] - t.navigationStart, 0));
    return n
}
  , Ki = () => O.__WEB_VITALS_POLYFILL__ ? O.performance && (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || Yc()) : O.performance && performance.getEntriesByType && performance.getEntriesByType("navigation")[0]
  , Ji = () => {
    const t = Ki();
    return t && t.activationStart || 0
}
  , an = (t, e) => {
    const n = Ki();
    let i = "navigate";
    return n && (O.document.prerendering || Ji() > 0 ? i = "prerender" : i = n.type.replace(/_/g, "-")),
    {
        name: t,
        value: typeof e > "u" ? -1 : e,
        rating: "good",
        delta: 0,
        entries: [],
        id: Gc(),
        navigationType: i
    }
}
  , Xt = (t, e, n) => {
    try {
        if (PerformanceObserver.supportedEntryTypes.includes(t)) {
            const i = new PerformanceObserver(s => {
                e(s.getEntries())
            }
            );
            return i.observe(Object.assign({
                type: t,
                buffered: !0
            }, n || {})),
            i
        }
    } catch {}
}
  , be = (t, e) => {
    const n = i => {
        (i.type === "pagehide" || O.document.visibilityState === "hidden") && (t(i),
        e && (removeEventListener("visibilitychange", n, !0),
        removeEventListener("pagehide", n, !0)))
    }
    ;
    addEventListener("visibilitychange", n, !0),
    addEventListener("pagehide", n, !0)
}
  , Fc = t => {
    const e = an("CLS", 0);
    let n, i = 0, s = [];
    const r = a => {
        a.forEach(c => {
            if (!c.hadRecentInput) {
                const l = s[0]
                  , d = s[s.length - 1];
                i && s.length !== 0 && c.startTime - d.startTime < 1e3 && c.startTime - l.startTime < 5e3 ? (i += c.value,
                s.push(c)) : (i = c.value,
                s = [c]),
                i > e.value && (e.value = i,
                e.entries = s,
                n && n())
            }
        }
        )
    }
      , o = Xt("layout-shift", r);
    if (o) {
        n = rn(t, e);
        const a = () => {
            r(o.takeRecords()),
            n(!0)
        }
        ;
        return be(a),
        a
    }
}
;
let ae = -1;
const Hc = () => O.document.visibilityState === "hidden" && !O.document.prerendering ? 0 : 1 / 0
  , $c = () => {
    be( ({timeStamp: t}) => {
        ae = t
    }
    , !0)
}
  , on = () => (ae < 0 && (ae = Hc(),
$c()),
{
    get firstHiddenTime() {
        return ae
    }
})
  , Wc = t => {
    const e = on()
      , n = an("FID");
    let i;
    const s = a => {
        a.startTime < e.firstHiddenTime && (n.value = a.processingStart - a.startTime,
        n.entries.push(a),
        i(!0))
    }
      , r = a => {
        a.forEach(s)
    }
      , o = Xt("first-input", r);
    i = rn(t, n),
    o && be( () => {
        r(o.takeRecords()),
        o.disconnect()
    }
    , !0)
}
  , Gn = {}
  , jc = t => {
    const e = on()
      , n = an("LCP");
    let i;
    const s = o => {
        const a = o[o.length - 1];
        if (a) {
            const c = Math.max(a.startTime - Ji(), 0);
            c < e.firstHiddenTime && (n.value = c,
            n.entries = [a],
            i())
        }
    }
      , r = Xt("largest-contentful-paint", s);
    if (r) {
        i = rn(t, n);
        const o = () => {
            Gn[n.id] || (s(r.takeRecords()),
            r.disconnect(),
            Gn[n.id] = !0,
            i(!0))
        }
        ;
        return ["keydown", "click"].forEach(a => {
            addEventListener(a, o, {
                once: !0,
                capture: !0
            })
        }
        ),
        be(o, !0),
        o
    }
}
;
function De(t) {
    return typeof t == "number" && isFinite(t)
}
function It(t, {startTimestamp: e, ...n}) {
    return e && t.startTimestamp > e && (t.startTimestamp = e),
    t.startChild({
        startTimestamp: e,
        ...n
    })
}
function H(t) {
    return t / 1e3
}
function Qi() {
    return O && O.addEventListener && O.performance
}
let Yn = 0, M = {}, rt, Pt;
function Zc() {
    const t = Qi();
    if (t && dt) {
        t.mark && O.performance.mark("sentry-tracing-init"),
        Jc();
        const e = Xc()
          , n = Kc();
        return () => {
            e && e(),
            n && n()
        }
    }
    return () => {}
}
function qc() {
    Xt("longtask", e => {
        for (const n of e) {
            const i = At();
            if (!i)
                return;
            const s = H(dt + n.startTime)
              , r = H(n.duration);
            i.startChild({
                description: "Main UI thread blocked",
                op: "ui.long-task",
                startTimestamp: s,
                endTimestamp: s + r
            })
        }
    }
    )
}
function Vc() {
    Xt("event", e => {
        for (const n of e) {
            const i = At();
            if (!i)
                return;
            if (n.name === "click") {
                const s = H(dt + n.startTime)
                  , r = H(n.duration);
                i.startChild({
                    description: Ft(n.target),
                    op: `ui.interaction.${n.name}`,
                    startTimestamp: s,
                    endTimestamp: s + r
                })
            }
        }
    }
    , {
        durationThreshold: 0
    })
}
function Xc() {
    return Fc(t => {
        const e = t.entries.pop();
        e && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding CLS"),
        M.cls = {
            value: t.value,
            unit: ""
        },
        Pt = e)
    }
    )
}
function Kc() {
    return jc(t => {
        const e = t.entries.pop();
        e && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding LCP"),
        M.lcp = {
            value: t.value,
            unit: "millisecond"
        },
        rt = e)
    }
    )
}
function Jc() {
    Wc(t => {
        const e = t.entries.pop();
        if (!e)
            return;
        const n = H(dt)
          , i = H(e.startTime);
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding FID"),
        M.fid = {
            value: t.value,
            unit: "millisecond"
        },
        M["mark.fid"] = {
            value: n + i,
            unit: "second"
        }
    }
    )
}
function Qc(t) {
    const e = Qi();
    if (!e || !O.performance.getEntries || !dt)
        return;
    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Tracing] Adding & adjusting spans using Performance API");
    const n = H(dt)
      , i = e.getEntries();
    let s, r;
    if (i.slice(Yn).forEach(o => {
        const a = H(o.startTime)
          , c = H(o.duration);
        if (!(t.op === "navigation" && n + a < t.startTimestamp))
            switch (o.entryType) {
            case "navigation":
                {
                    el(t, o, n),
                    s = n + H(o.responseStart),
                    r = n + H(o.requestStart);
                    break
                }
            case "mark":
            case "paint":
            case "measure":
                {
                    tl(t, o, a, c, n);
                    const l = on()
                      , d = o.startTime < l.firstHiddenTime;
                    o.name === "first-paint" && d && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding FP"),
                    M.fp = {
                        value: o.startTime,
                        unit: "millisecond"
                    }),
                    o.name === "first-contentful-paint" && d && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding FCP"),
                    M.fcp = {
                        value: o.startTime,
                        unit: "millisecond"
                    });
                    break
                }
            case "resource":
                {
                    const l = o.name.replace(O.location.origin, "");
                    il(t, o, l, a, c, n);
                    break
                }
            }
    }
    ),
    Yn = Math.max(i.length - 1, 0),
    sl(t),
    t.op === "pageload") {
        typeof s == "number" && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding TTFB"),
        M.ttfb = {
            value: (s - t.startTimestamp) * 1e3,
            unit: "millisecond"
        },
        typeof r == "number" && r <= s && (M["ttfb.requestTime"] = {
            value: (s - r) * 1e3,
            unit: "millisecond"
        })),
        ["fcp", "fp", "lcp"].forEach(a => {
            if (!M[a] || n >= t.startTimestamp)
                return;
            const c = M[a].value
              , l = n + H(c)
              , d = Math.abs((l - t.startTimestamp) * 1e3)
              , u = d - c;
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Measurements] Normalized ${a} from ${c} to ${d} (${u})`),
            M[a].value = d
        }
        );
        const o = M["mark.fid"];
        o && M.fid && (It(t, {
            description: "first input delay",
            endTimestamp: o.value + H(M.fid.value),
            op: "ui.action",
            startTimestamp: o.value
        }),
        delete M["mark.fid"]),
        "fcp"in M || delete M.cls,
        Object.keys(M).forEach(a => {
            t.setMeasurement(a, M[a].value, M[a].unit)
        }
        ),
        rl(t)
    }
    rt = void 0,
    Pt = void 0,
    M = {}
}
function tl(t, e, n, i, s) {
    const r = s + n
      , o = r + i;
    return It(t, {
        description: e.name,
        endTimestamp: o,
        op: e.entryType,
        startTimestamp: r
    }),
    r
}
function el(t, e, n) {
    ["unloadEvent", "redirect", "domContentLoadedEvent", "loadEvent", "connect"].forEach(i => {
        ne(t, e, i, n)
    }
    ),
    ne(t, e, "secureConnection", n, "TLS/SSL", "connectEnd"),
    ne(t, e, "fetch", n, "cache", "domainLookupStart"),
    ne(t, e, "domainLookup", n, "DNS"),
    nl(t, e, n)
}
function ne(t, e, n, i, s, r) {
    const o = r ? e[r] : e[`${n}End`]
      , a = e[`${n}Start`];
    !a || !o || It(t, {
        op: "browser",
        description: s || n,
        startTimestamp: i + H(a),
        endTimestamp: i + H(o)
    })
}
function nl(t, e, n) {
    It(t, {
        op: "browser",
        description: "request",
        startTimestamp: n + H(e.requestStart),
        endTimestamp: n + H(e.responseEnd)
    }),
    It(t, {
        op: "browser",
        description: "response",
        startTimestamp: n + H(e.responseStart),
        endTimestamp: n + H(e.responseEnd)
    })
}
function il(t, e, n, i, s, r) {
    if (e.initiatorType === "xmlhttprequest" || e.initiatorType === "fetch")
        return;
    const o = {};
    "transferSize"in e && (o["http.response_transfer_size"] = e.transferSize),
    "encodedBodySize"in e && (o["http.response_content_length"] = e.encodedBodySize),
    "decodedBodySize"in e && (o["http.decoded_response_content_length"] = e.decodedBodySize),
    "renderBlockingStatus"in e && (o["resource.render_blocking_status"] = e.renderBlockingStatus);
    const a = r + i
      , c = a + s;
    It(t, {
        description: n,
        endTimestamp: c,
        op: e.initiatorType ? `resource.${e.initiatorType}` : "resource.other",
        startTimestamp: a,
        data: o
    })
}
function sl(t) {
    const e = O.navigator;
    if (!e)
        return;
    const n = e.connection;
    n && (n.effectiveType && t.setTag("effectiveConnectionType", n.effectiveType),
    n.type && t.setTag("connectionType", n.type),
    De(n.rtt) && (M["connection.rtt"] = {
        value: n.rtt,
        unit: "millisecond"
    })),
    De(e.deviceMemory) && t.setTag("deviceMemory", `${e.deviceMemory} GB`),
    De(e.hardwareConcurrency) && t.setTag("hardwareConcurrency", String(e.hardwareConcurrency))
}
function rl(t) {
    rt && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding LCP Data"),
    rt.element && t.setTag("lcp.element", Ft(rt.element)),
    rt.id && t.setTag("lcp.id", rt.id),
    rt.url && t.setTag("lcp.url", rt.url.trim().slice(0, 200)),
    t.setTag("lcp.size", rt.size)),
    Pt && Pt.sources && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Measurements] Adding CLS Data"),
    Pt.sources.forEach( (e, n) => t.setTag(`cls.source.${n + 1}`, Ft(e.node))))
}
const We = ["localhost", /^\/(?!\/)/]
  , _e = {
    traceFetch: !0,
    traceXHR: !0,
    tracingOrigins: We,
    tracePropagationTargets: We
};
function ts(t) {
    const {traceFetch: e, traceXHR: n, tracePropagationTargets: i, tracingOrigins: s, shouldCreateSpanForRequest: r} = {
        traceFetch: _e.traceFetch,
        traceXHR: _e.traceXHR,
        ...t
    }
      , o = typeof r == "function" ? r : l => !0
      , a = l => al(l, i || s)
      , c = {};
    e && lt("fetch", l => {
        ol(l, o, a, c)
    }
    ),
    n && lt("xhr", l => {
        ll(l, o, a, c)
    }
    )
}
function al(t, e) {
    return oi(t, e || We)
}
function ol(t, e, n, i) {
    if (!Ke() || !(t.fetchData && e(t.fetchData.url)))
        return;
    if (t.endTimestamp) {
        const a = t.fetchData.__span;
        if (!a)
            return;
        const c = i[a];
        if (c) {
            if (t.response) {
                c.setHttpStatus(t.response.status);
                const l = t.response && t.response.headers && t.response.headers.get("content-length")
                  , d = parseInt(l);
                d > 0 && c.setData("http.response_content_length", d)
            } else
                t.error && c.setStatus("internal_error");
            c.finish(),
            delete i[a]
        }
        return
    }
    const s = Y().getScope()
      , r = s && s.getSpan()
      , o = r && r.transaction;
    if (r && o) {
        const {method: a, url: c} = t.fetchData
          , l = r.startChild({
            data: {
                url: c,
                type: "fetch",
                "http.method": a
            },
            description: `${a} ${c}`,
            op: "http.client"
        });
        t.fetchData.__span = l.spanId,
        i[l.spanId] = l;
        const d = t.args[0];
        t.args[1] = t.args[1] || {};
        const u = t.args[1];
        n(t.fetchData.url) && (u.headers = cl(d, o.getDynamicSamplingContext(), l, u))
    }
}
function cl(t, e, n, i) {
    const s = ui(e)
      , r = n.toTraceparent()
      , o = typeof Request < "u" && hn(t, Request) ? t.headers : i.headers;
    if (o)
        if (typeof Headers < "u" && hn(o, Headers)) {
            const a = new Headers(o);
            return a.append("sentry-trace", r),
            s && a.append(Ie, s),
            a
        } else if (Array.isArray(o)) {
            const a = [...o, ["sentry-trace", r]];
            return s && a.push([Ie, s]),
            a
        } else {
            const a = "baggage"in o ? o.baggage : void 0
              , c = [];
            return Array.isArray(a) ? c.push(...a) : a && c.push(a),
            s && c.push(s),
            {
                ...o,
                "sentry-trace": r,
                baggage: c.length > 0 ? c.join(",") : void 0
            }
        }
    else
        return {
            "sentry-trace": r,
            baggage: s
        }
}
function ll(t, e, n, i) {
    const s = t.xhr
      , r = s && s[Xe];
    if (!Ke() || s && s.__sentry_own_request__ || !(s && r && e(r.url)))
        return;
    if (t.endTimestamp) {
        const l = s.__sentry_xhr_span_id__;
        if (!l)
            return;
        const d = i[l];
        d && (d.setHttpStatus(r.status_code),
        d.finish(),
        delete i[l]);
        return
    }
    const o = Y().getScope()
      , a = o && o.getSpan()
      , c = a && a.transaction;
    if (a && c) {
        const l = a.startChild({
            data: {
                ...r.data,
                type: "xhr",
                "http.method": r.method,
                url: r.url
            },
            description: `${r.method} ${r.url}`,
            op: "http.client"
        });
        if (s.__sentry_xhr_span_id__ = l.spanId,
        i[s.__sentry_xhr_span_id__] = l,
        s.setRequestHeader && n(r.url))
            try {
                s.setRequestHeader("sentry-trace", l.toTraceparent());
                const d = c.getDynamicSamplingContext()
                  , u = ui(d);
                u && s.setRequestHeader(Ie, u)
            } catch {}
    }
}
function dl(t, e=!0, n=!0) {
    if (!O || !O.location) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn("Could not initialize routing instrumentation due to invalid location");
        return
    }
    let i = O.location.href, s;
    e && (s = t({
        name: O.location.pathname,
        startTimestamp: dt ? dt / 1e3 : void 0,
        op: "pageload",
        metadata: {
            source: "url"
        }
    })),
    n && lt("history", ({to: r, from: o}) => {
        if (o === void 0 && i && i.indexOf(r) !== -1) {
            i = void 0;
            return
        }
        o !== r && (i = void 0,
        s && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Finishing current transaction with op: ${s.op}`),
        s.finish()),
        s = t({
            name: O.location.pathname,
            op: "navigation",
            metadata: {
                source: "url"
            }
        }))
    }
    )
}
const ul = "BrowserTracing"
  , fl = {
    ...ie,
    markBackgroundTransactions: !0,
    routingInstrumentation: dl,
    startTransactionOnLocationChange: !0,
    startTransactionOnPageLoad: !0,
    enableLongTask: !0,
    _experiments: {},
    ..._e
};
class Se {
    __init() {
        this.name = ul
    }
    constructor(e) {
        Se.prototype.__init.call(this),
        _i(),
        this.options = {
            ...fl,
            ...e
        },
        this.options._experiments.enableLongTask !== void 0 && (this.options.enableLongTask = this.options._experiments.enableLongTask),
        e && !e.tracePropagationTargets && e.tracingOrigins && (this.options.tracePropagationTargets = e.tracingOrigins),
        this._collectWebVitals = Zc(),
        this.options.enableLongTask && qc(),
        this.options._experiments.enableInteractions && Vc()
    }
    setupOnce(e, n) {
        this._getCurrentHub = n;
        const {routingInstrumentation: i, startTransactionOnLocationChange: s, startTransactionOnPageLoad: r, markBackgroundTransactions: o, traceFetch: a, traceXHR: c, tracePropagationTargets: l, shouldCreateSpanForRequest: d, _experiments: u} = this.options;
        i(h => {
            const f = this._createRouteTransaction(h);
            return this.options._experiments.onStartRouteTransaction && this.options._experiments.onStartRouteTransaction(f, h, n),
            f
        }
        , r, s),
        o && Pc(),
        u.enableInteractions && this._registerInteractionListener(),
        ts({
            traceFetch: a,
            traceXHR: c,
            tracePropagationTargets: l,
            shouldCreateSpanForRequest: d
        })
    }
    _createRouteTransaction(e) {
        if (!this._getCurrentHub) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`[Tracing] Did not create ${e.op} transaction because _getCurrentHub is invalid.`);
            return
        }
        const {beforeNavigate: n, idleTimeout: i, finalTimeout: s, heartbeatInterval: r} = this.options
          , o = e.op === "pageload"
          , a = o ? Fn("sentry-trace") : null
          , c = o ? Fn("baggage") : null
          , l = a ? li(a) : void 0
          , d = c ? Er(c) : void 0
          , u = {
            ...e,
            ...l,
            metadata: {
                ...e.metadata,
                dynamicSamplingContext: l && !d ? {} : d
            },
            trimEnd: !0
        }
          , h = typeof n == "function" ? n(u) : u
          , f = h === void 0 ? {
            ...u,
            sampled: !1
        } : h;
        f.metadata = f.name !== u.name ? {
            ...f.metadata,
            source: "custom"
        } : f.metadata,
        this._latestRouteName = f.name,
        this._latestRouteSource = f.metadata && f.metadata.source,
        f.sampled === !1 && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Will not send ${f.op} transaction because of beforeNavigate.`),
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Tracing] Starting ${f.op} transaction on scope`);
        const p = this._getCurrentHub()
          , {location: b} = O
          , x = mn(p, f, i, s, !0, {
            location: b
        }, r);
        return x.registerBeforeFinishCallback(y => {
            this._collectWebVitals(),
            Qc(y)
        }
        ),
        x
    }
    _registerInteractionListener() {
        let e;
        const n = () => {
            const {idleTimeout: i, finalTimeout: s, heartbeatInterval: r} = this.options
              , o = "ui.action.click"
              , a = At();
            if (a && a.op && ["navigation", "pageload"].includes(a.op)) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`[Tracing] Did not create ${o} transaction because a pageload or navigation transaction is in progress.`);
                return
            }
            if (e && (e.setFinishReason("interactionInterrupted"),
            e.finish(),
            e = void 0),
            !this._getCurrentHub) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`[Tracing] Did not create ${o} transaction because _getCurrentHub is invalid.`);
                return
            }
            if (!this._latestRouteName) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.warn(`[Tracing] Did not create ${o} transaction because _latestRouteName is missing.`);
                return
            }
            const c = this._getCurrentHub()
              , {location: l} = O
              , d = {
                name: this._latestRouteName,
                op: o,
                trimEnd: !0,
                metadata: {
                    source: this._latestRouteSource || "url"
                }
            };
            e = mn(c, d, i, s, !0, {
                location: l
            }, r)
        }
        ;
        ["click"].forEach(i => {
            addEventListener(i, n, {
                once: !1,
                capture: !0
            })
        }
        )
    }
}
function Fn(t) {
    const e = ws(`meta[name=${t}]`);
    return e ? e.getAttribute("content") : null
}
function qt(t) {
    return new Promise( (e, n) => {
        t.oncomplete = t.onsuccess = () => e(t.result),
        t.onabort = t.onerror = () => n(t.error)
    }
    )
}
function hl(t, e) {
    const n = indexedDB.open(t);
    n.onupgradeneeded = () => n.result.createObjectStore(e);
    const i = qt(n);
    return s => i.then(r => s(r.transaction(e, "readwrite").objectStore(e)))
}
function es(t) {
    return qt(t.getAllKeys())
}
function _l(t, e, n) {
    return t(i => es(i).then(s => {
        if (!(s.length >= n))
            return i.put(e, Math.max(...s, 0) + 1),
            qt(i.transaction)
    }
    ))
}
function pl(t) {
    return t(e => es(e).then(n => {
        if (n.length !== 0)
            return qt(e.get(n[0])).then(i => (e.delete(n[0]),
            qt(e.transaction).then( () => i)))
    }
    ))
}
function ml(t) {
    let e;
    function n() {
        return e == null && (e = hl(t.dbName || "sentry-offline", t.storeName || "queue")),
        e
    }
    return {
        insert: async i => {
            try {
                const s = await vs(i, t.textEncoder);
                await _l(n(), s, t.maxQueueSize || 30)
            } catch {}
        }
        ,
        pop: async () => {
            try {
                const i = await pl(n());
                if (i)
                    return Ts(i, t.textEncoder || new TextEncoder, t.textDecoder || new TextDecoder)
            } catch {}
        }
    }
}
function gl(t) {
    return e => t({
        ...e,
        createStore: ml
    })
}
function yl(t) {
    return gl(Ir(t))
}
function El(t) {
    let e = []
      , n = {};
    return {
        add(i, s) {
            for (; e.length >= t; ) {
                const r = e.shift();
                r !== void 0 && delete n[r]
            }
            n[i] && this.delete(i),
            e.push(i),
            n[i] = s
        },
        clear() {
            n = {},
            e = []
        },
        get(i) {
            return n[i]
        },
        size() {
            return e.length
        },
        delete(i) {
            if (!n[i])
                return !1;
            delete n[i];
            for (let s = 0; s < e.length; s++)
                if (e[s] === i) {
                    e.splice(s, 1);
                    break
                }
            return !0
        }
    }
}
const je = El(20)
  , Hn = 1e6
  , oe = String(0)
  , bl = "main";
let ns = ""
  , is = ""
  , ss = ""
  , Ze = q.navigator && q.navigator.userAgent || ""
  , rs = "";
const Sl = q.navigator && q.navigator.language || q.navigator && q.navigator.languages && q.navigator.languages[0] || "";
function wl(t) {
    return typeof t == "object" && t !== null && "getHighEntropyValues"in t
}
const $n = q.navigator && q.navigator.userAgentData;
wl($n) && $n.getHighEntropyValues(["architecture", "model", "platform", "platformVersion", "fullVersionList"]).then(t => {
    if (ns = t.platform || "",
    ss = t.architecture || "",
    rs = t.model || "",
    is = t.platformVersion || "",
    t.fullVersionList && t.fullVersionList.length > 0) {
        const e = t.fullVersionList[t.fullVersionList.length - 1];
        Ze = `${e.brand} ${e.version}`
    }
}
).catch(t => {}
);
function vl(t) {
    return !("thread_metadata"in t)
}
function Tl(t) {
    return vl(t) ? Il(t) : t
}
function Rl(t) {
    if (!(!t || !t.sdk))
        return {
            name: t.sdk.name,
            version: t.sdk.version
        }
}
function kl(t, e) {
    return e && (t.sdk = t.sdk || {},
    t.sdk.name = t.sdk.name || e.name || "unknown sdk",
    t.sdk.version = t.sdk.version || e.version || "unknown sdk version",
    t.sdk.integrations = [...t.sdk.integrations || [], ...e.integrations || []],
    t.sdk.packages = [...t.sdk.packages || [], ...e.packages || []]),
    t
}
function xl(t, e, n, i) {
    const s = t.sdkProcessingMetadata && t.sdkProcessingMetadata.dynamicSamplingContext;
    return {
        event_id: t.event_id,
        sent_at: new Date().toISOString(),
        ...e && {
            sdk: e
        },
        ...!!n && {
            dsn: Rs(i)
        },
        ...t.type === "transaction" && s && {
            trace: pt({
                ...s
            })
        }
    }
}
function Nl(t) {
    const e = t && t.contexts && t.contexts.trace && t.contexts.trace.trace_id;
    return typeof e == "string" && e.length !== 32 && (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Profiling] Invalid traceId: ${e} on profiled event`),
    typeof e != "string" ? "" : e
}
function Dl(t, e, n, i) {
    if (t.type !== "transaction")
        throw new TypeError("Profiling events may only be attached to transactions, this should never occur.");
    const s = t.sdkProcessingMetadata.profile;
    if (s == null)
        throw new TypeError(`Cannot construct profiling event envelope without a valid profile. Got ${s} instead.`);
    if (!s.profile_id)
        throw new TypeError("Profile is missing profile_id");
    if (s.samples.length <= 1)
        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Discarding profile because it contains less than 2 samples"),
        null;
    const r = Nl(t)
      , o = Rl(n);
    kl(t, n && n.sdk);
    const a = xl(t, o, i, e)
      , c = Tl(s)
      , l = typeof t.start_timestamp == "number" ? t.start_timestamp * 1e3 : Date.now()
      , d = typeof t.timestamp == "number" ? t.timestamp * 1e3 : Date.now()
      , u = {
        event_id: s.profile_id,
        timestamp: new Date(l).toISOString(),
        platform: "javascript",
        version: "1",
        release: t.release || "",
        environment: t.environment || Zn,
        runtime: {
            name: "javascript",
            version: q.navigator.userAgent
        },
        os: {
            name: ns,
            version: is,
            build_number: Ze
        },
        device: {
            locale: Sl,
            model: rs,
            manufacturer: Ze,
            architecture: ss,
            is_emulator: !1
        },
        profile: c,
        transactions: [{
            name: t.transaction || "",
            id: t.event_id || Gt(),
            trace_id: r,
            active_thread_id: oe,
            relative_start_ns: "0",
            relative_end_ns: ((d - l) * 1e6).toFixed(0)
        }]
    };
    return ai(a, [[{
        type: "profile"
    }, u]])
}
function Il(t) {
    let e, n = 0;
    const i = {
        samples: [],
        stacks: [],
        frames: [],
        thread_metadata: {
            [oe]: {
                name: bl
            }
        }
    };
    if (!t.samples.length)
        return i;
    const s = t.samples[0].timestamp;
    for (let r = 0; r < t.samples.length; r++) {
        const o = t.samples[r];
        if (o.stackId === void 0) {
            e === void 0 && (e = n,
            i.stacks[e] = [],
            n++),
            i.samples[r] = {
                elapsed_since_start_ns: ((o.timestamp - s) * Hn).toFixed(0),
                stack_id: e,
                thread_id: oe
            };
            continue
        }
        let a = t.stacks[o.stackId];
        const c = [];
        for (; a; ) {
            c.push(a.frameId);
            const d = t.frames[a.frameId];
            i.frames[a.frameId] === void 0 && (i.frames[a.frameId] = {
                function: d.name,
                file: d.resourceId ? t.resources[d.resourceId] : void 0,
                line: d.line,
                column: d.column
            }),
            a = a.parentId === void 0 ? void 0 : t.stacks[a.parentId]
        }
        const l = {
            elapsed_since_start_ns: ((o.timestamp - s) * Hn).toFixed(0),
            stack_id: n,
            thread_id: oe
        };
        i.stacks[n] = c,
        i.samples[r] = l,
        n++
    }
    return i
}
function Al(t, e) {
    const n = je.get(t);
    if (!n) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Couldn't find a transaction event for this profile, dropping it.");
        return
    }
    n.sdkProcessingMetadata = n.sdkProcessingMetadata || {},
    n.sdkProcessingMetadata && !n.sdkProcessingMetadata.profile && (n.sdkProcessingMetadata.profile = e);
    const s = Y().getClient();
    if (!s) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] getClient did not return a Client, removing profile from event and forwarding to next event processors.");
        return
    }
    const r = s.getDsn();
    if (!r) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] getDsn did not return a Dsn, removing profile from event and forwarding to next event processors.");
        return
    }
    const o = s.getTransport();
    if (!o) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] getTransport did not return a Transport, removing profile from event and forwarding to next event processors.");
        return
    }
    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Preparing envelope and sending a profiling event");
    const a = Dl(n, r);
    if (je.delete(t),
    !a) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Failed to construct envelope");
        return
    }
    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Envelope constructed, sending it"),
    o.send(a).then(null, c => {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Error while sending event:", c)
    }
    )
}
const Wn = 3e4;
let jn = !1;
function Cl(t) {
    return typeof t == "function"
}
function Ol(t) {
    return t ? as(t) : ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Transaction is undefined, skipping profiling"),
    t)
}
function as(t) {
    const e = q.Profiler;
    if (!Cl(e))
        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Profiling is not supported by this browser, Profiler interface missing on window object."),
        t;
    if (!t.sampled)
        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Transaction is not sampled, skipping profiling"),
        t;
    if (jn)
        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Profiling has been disabled for the duration of the current user session."),
        t;
    const n = Y().getClient()
      , i = n && n.getOptions()
      , s = i && i.profilesSampleRate || 0;
    if (s === void 0)
        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Profiling disabled, enable it by setting `profilesSampleRate` option to SDK init call."),
        t;
    if (Math.random() > s)
        return (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Skip profiling transaction due to sampling."),
        t;
    const r = 10
      , o = Math.floor(Wn / r);
    let a;
    try {
        a = new e({
            sampleInterval: r,
            maxBufferSize: o
        })
    } catch {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && (_.log("[Profiling] Failed to initialize the Profiling constructor, this is likely due to a missing 'Document-Policy': 'js-profiling' header."),
        _.log("[Profiling] Disabling profiling for current user session.")),
        jn = !0
    }
    if (!a)
        return t;
    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Profiling] started profiling transaction: ${t.name || t.description}`);
    const c = Gt();
    let l = null;
    function d() {
        if (t && a) {
            if (l) {
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] profile for:", t.name || t.description, "already exists, returning early");
                return
            }
            a.stop().then(p => {
                if (u && (q.clearTimeout(u),
                u = void 0),
                (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Profiling] stopped profiling of transaction: ${t.name || t.description}`),
                !p) {
                    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log(`[Profiling] profiler returned null profile for: ${t.name || t.description}`, "this may indicate an overlapping transaction or a call to stopProfiling with a profile title that was never started");
                    return
                }
                p.samples.length < 2 || (l = {
                    ...p,
                    profile_id: c
                },
                Al(c, l))
            }
            ).catch(p => ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] error while stopping profiler:", p),
            null))
        }
    }
    let u = q.setTimeout( () => {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] max profile duration elapsed, stopping profiling for:", t.name || t.description),
        d()
    }
    , Wn);
    const h = t.finish.bind(t);
    function f() {
        return t && (d(),
        t.setContext("profile", {
            profile_id: c
        })),
        h()
    }
    return t.finish = f,
    t
}
function Bl(t) {
    return function(n, i) {
        const s = t.call(this, n, i);
        return s === void 0 ? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Transaction is undefined, skipping profiling"),
        s) : as(s)
    }
}
function Ul() {
    const t = qn();
    if (!t.__SENTRY__) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Can't find main carrier, profiling won't work.");
        return
    }
    if (t.__SENTRY__.extensions = t.__SENTRY__.extensions || {},
    !t.__SENTRY__.extensions.startTransaction) {
        (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] startTransaction does not exists, profiling will not work. Make sure you import @sentry/tracing package before @sentry/profiling-node as import order matters.");
        return
    }
    (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] startTransaction exists, patching it with profiling functionality..."),
    t.__SENTRY__.extensions.startTransaction = Bl(t.__SENTRY__.extensions.startTransaction)
}
class cn {
    constructor() {
        cn.prototype.__init.call(this)
    }
    __init() {
        this.name = "BrowserProfilingIntegration"
    }
    setupOnce(e) {
        Ul(),
        e(this.handleGlobalEvent.bind(this))
    }
    handleGlobalEvent(e) {
        const n = e.contexts && e.contexts.profile && e.contexts.profile.profile_id;
        return n && typeof n == "string" && ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.log("[Profiling] Profiling event found, caching it."),
        je.add(n, e)),
        e
    }
}
let os = {};
q.Sentry && q.Sentry.Integrations && (os = q.Sentry.Integrations);
const Ll = {
    ...os,
    ...Or,
    ...Br
}
  , Ml = Object.freeze(Object.defineProperty({
    __proto__: null,
    Breadcrumbs: Kn,
    BrowserClient: ks,
    BrowserProfilingIntegration: cn,
    BrowserTracing: Se,
    Dedupe: Jn,
    FunctionToString: Vn,
    GlobalHandlers: Qn,
    HttpContext: ti,
    Hub: xs,
    InboundFilters: Xn,
    Integrations: Ll,
    LinkedErrors: ei,
    Replay: Zt,
    SDK_VERSION: Ns,
    Scope: Ds,
    TryCatch: ni,
    WINDOW: q,
    addBreadcrumb: Is,
    addGlobalEventProcessor: si,
    addTracingExtensions: _i,
    captureEvent: As,
    captureException: qe,
    captureMessage: Cs,
    captureUserFeedback: Os,
    chromeStackLineParser: Bs,
    close: Us,
    configureScope: Ls,
    createTransport: Ms,
    createUserFeedbackEnvelope: zs,
    defaultIntegrations: Ps,
    defaultRequestInstrumentationOptions: _e,
    defaultStackLineParsers: Gs,
    defaultStackParser: Ys,
    eventFromException: Fs,
    eventFromMessage: Hs,
    extractTraceparentData: li,
    flush: $s,
    forceLoad: Ws,
    geckoStackLineParser: js,
    getActiveTransaction: At,
    getCurrentHub: Y,
    getHubFromCarrier: Zs,
    init: ci,
    instrumentOutgoingRequests: ts,
    lastEventId: qs,
    makeBrowserOfflineTransport: yl,
    makeFetchTransport: Vs,
    makeMain: Xs,
    makeMultiplexedTransport: Cr,
    makeXHRTransport: Ks,
    onLoad: Js,
    onProfilingStartRouteTransaction: Ol,
    opera10StackLineParser: Qs,
    opera11StackLineParser: tr,
    setContext: ri,
    setExtra: er,
    setExtras: nr,
    setTag: ir,
    setTags: sr,
    setUser: rr,
    showReportDialog: ar,
    spanStatusfromHttpCode: fi,
    startTransaction: or,
    trace: xr,
    winjsStackLineParser: cr,
    withScope: lr,
    wrap: dr
}, Symbol.toStringTag, {
    value: "Module"
}));
class Tt {
    static __initStatic() {
        this.id = "ExtraErrorData"
    }
    __init() {
        this.name = Tt.id
    }
    constructor(e) {
        Tt.prototype.__init.call(this),
        this._options = {
            depth: 3,
            ...e
        }
    }
    setupOnce(e, n) {
        e( (i, s) => {
            const r = n().getIntegration(Tt);
            return r ? r.enhanceEventWithErrorData(i, s) : i
        }
        )
    }
    enhanceEventWithErrorData(e, n={}) {
        if (!n.originalException || !Re(n.originalException))
            return e;
        const i = n.originalException.name || n.originalException.constructor.name
          , s = this._extractErrorData(n.originalException);
        if (s) {
            const r = {
                ...e.contexts
            }
              , o = Ve(s, this._options.depth);
            return ur(o) && (fr(o, "__sentry_skip_normalization__", !0),
            r[i] = o),
            {
                ...e,
                contexts: r
            }
        }
        return e
    }
    _extractErrorData(e) {
        try {
            const n = ["name", "message", "stack", "line", "column", "fileName", "lineNumber", "columnNumber", "toJSON"]
              , i = {};
            for (const s of Object.keys(e)) {
                if (n.indexOf(s) !== -1)
                    continue;
                const r = e[s];
                i[s] = Re(r) ? r.toString() : r
            }
            if (typeof e.toJSON == "function") {
                const s = e.toJSON();
                for (const r of Object.keys(s)) {
                    const o = s[r];
                    i[r] = Re(o) ? o.toString() : o
                }
            }
            return i
        } catch (n) {
            (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && _.error("Unable to extract extra data from the Error object:", n)
        }
        return null
    }
}
Tt.__initStatic();
const Gl = t => {
    const {sentryDsn: e} = pr();
    t.VITE_PROJECT_ENV !== hr.LOCAL && e && ci({
        dsn: e,
        environment: t.VITE_PROJECT_ENV,
        integrations: [new Tt, new Se],
        tracesSampleRate: _r ? .2 : 1,
        maxValueLength: 1e3
    }),
    window.Sentry = Ml
}
;
export {Gl as default};
//# sourceMappingURL=sentry-c70f8443.js.map
