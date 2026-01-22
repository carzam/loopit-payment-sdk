var Co = Object.defineProperty;
var Io = (e, t, n) => t in e ? Co(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var er = (e, t, n) => Io(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Os(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const K = {}, St = [], Le = () => {
}, Zr = () => !1, Pn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), vs = (e) => e.startsWith("onUpdate:"), ne = Object.assign, Ts = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Oo = Object.prototype.hasOwnProperty, k = (e, t) => Oo.call(e, t), j = Array.isArray, xt = (e) => _n(e) === "[object Map]", Jr = (e) => _n(e) === "[object Set]", F = (e) => typeof e == "function", ee = (e) => typeof e == "string", nt = (e) => typeof e == "symbol", Q = (e) => e !== null && typeof e == "object", Xr = (e) => (Q(e) || F(e)) && F(e.then) && F(e.catch), Yr = Object.prototype.toString, _n = (e) => Yr.call(e), vo = (e) => _n(e).slice(8, -1), Qr = (e) => _n(e) === "[object Object]", Ps = (e) => ee(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, kt = /* @__PURE__ */ Os(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Mn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, To = /-\w/g, xe = Mn(
  (e) => e.replace(To, (t) => t.slice(1).toUpperCase())
), Po = /\B([A-Z])/g, ht = Mn(
  (e) => e.replace(Po, "-$1").toLowerCase()
), Dn = Mn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Jn = Mn(
  (e) => e ? `on${Dn(e)}` : ""
), lt = (e, t) => !Object.is(e, t), mn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, $r = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, _s = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let tr;
const Fn = () => tr || (tr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ms(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = ee(s) ? Fo(s) : Ms(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (ee(e) || Q(e))
    return e;
}
const _o = /;(?![^(]*\))/g, Mo = /:([^]+)/, Do = /\/\*[^]*?\*\//g;
function Fo(e) {
  const t = {};
  return e.replace(Do, "").split(_o).forEach((n) => {
    if (n) {
      const s = n.split(Mo);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Bn(e) {
  let t = "";
  if (ee(e))
    t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const s = Bn(e[n]);
      s && (t += s + " ");
    }
  else if (Q(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Bo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jo = /* @__PURE__ */ Os(Bo);
function ei(e) {
  return !!e || e === "";
}
const ti = (e) => !!(e && e.__v_isRef === !0), ct = (e) => ee(e) ? e : e == null ? "" : j(e) || Q(e) && (e.toString === Yr || !F(e.toString)) ? ti(e) ? ct(e.value) : JSON.stringify(e, ni, 2) : String(e), ni = (e, t) => ti(t) ? ni(e, t.value) : xt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Xn(s, i) + " =>"] = r, n),
    {}
  )
} : Jr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Xn(n))
} : nt(t) ? Xn(t) : Q(t) && !j(t) && !Qr(t) ? String(t) : t, Xn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    nt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let he;
class No {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = he, !t && he && (this.index = (he.scopes || (he.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = he;
      try {
        return he = this, t();
      } finally {
        he = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = he, he = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (he = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Lo() {
  return he;
}
let X;
const Yn = /* @__PURE__ */ new WeakSet();
class si {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, he && he.active && he.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Yn.has(this) && (Yn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ii(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, nr(this), oi(this);
    const t = X, n = Ie;
    X = this, Ie = !0;
    try {
      return this.fn();
    } finally {
      li(this), X = t, Ie = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Bs(t);
      this.deps = this.depsTail = void 0, nr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Yn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    us(this) && this.run();
  }
  get dirty() {
    return us(this);
  }
}
let ri = 0, Wt, Vt;
function ii(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Vt, Vt = e;
    return;
  }
  e.next = Wt, Wt = e;
}
function Ds() {
  ri++;
}
function Fs() {
  if (--ri > 0)
    return;
  if (Vt) {
    let t = Vt;
    for (Vt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Wt; ) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function oi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function li(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Bs(s), Uo(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function us(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ci(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ci(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Jt) || (e.globalVersion = Jt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !us(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = X, s = Ie;
  X = e, Ie = !0;
  try {
    oi(e);
    const r = e.fn(e._value);
    (t.version === 0 || lt(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    X = n, Ie = s, li(e), e.flags &= -3;
  }
}
function Bs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Bs(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Uo(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Ie = !0;
const ai = [];
function Ze() {
  ai.push(Ie), Ie = !1;
}
function Je() {
  const e = ai.pop();
  Ie = e === void 0 ? !0 : e;
}
function nr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = X;
    X = void 0;
    try {
      t();
    } finally {
      X = n;
    }
  }
}
let Jt = 0;
class qo {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ui {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!X || !Ie || X === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== X)
      n = this.activeLink = new qo(X, this), X.deps ? (n.prevDep = X.depsTail, X.depsTail.nextDep = n, X.depsTail = n) : X.deps = X.depsTail = n, fi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = X.depsTail, n.nextDep = void 0, X.depsTail.nextDep = n, X.depsTail = n, X.deps === n && (X.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Jt++, this.notify(t);
  }
  notify(t) {
    Ds();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Fs();
    }
  }
}
function fi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        fi(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const fs = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ Symbol(
  ""
), ds = /* @__PURE__ */ Symbol(
  ""
), Xt = /* @__PURE__ */ Symbol(
  ""
);
function oe(e, t, n) {
  if (Ie && X) {
    let s = fs.get(e);
    s || fs.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new ui()), r.map = s, r.key = n), r.track();
  }
}
function Ke(e, t, n, s, r, i) {
  const o = fs.get(e);
  if (!o) {
    Jt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Ds(), t === "clear")
    o.forEach(l);
  else {
    const c = j(e), f = c && Ps(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, E) => {
        (E === "length" || E === Xt || !nt(E) && E >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(Xt)), t) {
        case "add":
          c ? f && l(o.get("length")) : (l(o.get(at)), xt(e) && l(o.get(ds)));
          break;
        case "delete":
          c || (l(o.get(at)), xt(e) && l(o.get(ds)));
          break;
        case "set":
          xt(e) && l(o.get(at));
          break;
      }
  }
  Fs();
}
function bt(e) {
  const t = /* @__PURE__ */ z(e);
  return t === e ? t : (oe(t, "iterate", Xt), /* @__PURE__ */ Ue(e) ? t : t.map(dt));
}
function js(e) {
  return oe(e = /* @__PURE__ */ z(e), "iterate", Xt), e;
}
function Qe(e, t) {
  return /* @__PURE__ */ ft(e) ? Yt(/* @__PURE__ */ Rt(e) ? dt(t) : t) : dt(t);
}
const Ho = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qn(this, Symbol.iterator, (e) => Qe(this, e));
  },
  concat(...e) {
    return bt(this).concat(
      ...e.map((t) => j(t) ? bt(t) : t)
    );
  },
  entries() {
    return Qn(this, "entries", (e) => (e[1] = Qe(this, e[1]), e));
  },
  every(e, t) {
    return Ve(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ve(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => Qe(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Ve(
      this,
      "find",
      e,
      t,
      (n) => Qe(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return Ve(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ve(
      this,
      "findLast",
      e,
      t,
      (n) => Qe(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Ve(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ve(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return $n(this, "includes", e);
  },
  indexOf(...e) {
    return $n(this, "indexOf", e);
  },
  join(e) {
    return bt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return $n(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ve(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return jt(this, "pop");
  },
  push(...e) {
    return jt(this, "push", e);
  },
  reduce(e, ...t) {
    return sr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return sr(this, "reduceRight", e, t);
  },
  shift() {
    return jt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ve(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return jt(this, "splice", e);
  },
  toReversed() {
    return bt(this).toReversed();
  },
  toSorted(e) {
    return bt(this).toSorted(e);
  },
  toSpliced(...e) {
    return bt(this).toSpliced(...e);
  },
  unshift(...e) {
    return jt(this, "unshift", e);
  },
  values() {
    return Qn(this, "values", (e) => Qe(this, e));
  }
};
function Qn(e, t, n) {
  const s = js(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ Ue(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const ko = Array.prototype;
function Ve(e, t, n, s, r, i) {
  const o = js(e), l = o !== e && !/* @__PURE__ */ Ue(e), c = o[t];
  if (c !== ko[t]) {
    const p = c.apply(e, i);
    return l ? dt(p) : p;
  }
  let f = n;
  o !== e && (l ? f = function(p, E) {
    return n.call(this, Qe(e, p), E, e);
  } : n.length > 2 && (f = function(p, E) {
    return n.call(this, p, E, e);
  }));
  const a = c.call(o, f, s);
  return l && r ? r(a) : a;
}
function sr(e, t, n, s) {
  const r = js(e);
  let i = n;
  return r !== e && (/* @__PURE__ */ Ue(e) ? n.length > 3 && (i = function(o, l, c) {
    return n.call(this, o, l, c, e);
  }) : i = function(o, l, c) {
    return n.call(this, o, Qe(e, l), c, e);
  }), r[t](i, ...s);
}
function $n(e, t, n) {
  const s = /* @__PURE__ */ z(e);
  oe(s, "iterate", Xt);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ qs(n[0]) ? (n[0] = /* @__PURE__ */ z(n[0]), s[t](...n)) : r;
}
function jt(e, t, n = []) {
  Ze(), Ds();
  const s = (/* @__PURE__ */ z(e))[t].apply(e, n);
  return Fs(), Je(), s;
}
const Wo = /* @__PURE__ */ Os("__proto__,__v_isRef,__isVue"), di = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(nt)
);
function Vo(e) {
  nt(e) || (e = String(e));
  const t = /* @__PURE__ */ z(this);
  return oe(t, "has", e), t.hasOwnProperty(e);
}
class pi {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? el : yi : i ? gi : mi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = j(t);
    if (!r) {
      let c;
      if (o && (c = Ho[n]))
        return c;
      if (n === "hasOwnProperty")
        return Vo;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ fe(t) ? t : s
    );
    if ((nt(n) ? di.has(n) : Wo(n)) || (r || oe(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ fe(l)) {
      const c = o && Ps(n) ? l : l.value;
      return r && Q(c) ? /* @__PURE__ */ hs(c) : c;
    }
    return Q(l) ? r ? /* @__PURE__ */ hs(l) : /* @__PURE__ */ Ls(l) : l;
  }
}
class hi extends pi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = j(t) && Ps(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ ft(i);
      if (!/* @__PURE__ */ Ue(s) && !/* @__PURE__ */ ft(s) && (i = /* @__PURE__ */ z(i), s = /* @__PURE__ */ z(s)), !o && /* @__PURE__ */ fe(i) && !/* @__PURE__ */ fe(s))
        return f || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : k(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ fe(t) ? t : r
    );
    return t === /* @__PURE__ */ z(r) && (l ? lt(s, i) && Ke(t, "set", n, s) : Ke(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = k(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ke(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!nt(n) || !di.has(n)) && oe(t, "has", n), s;
  }
  ownKeys(t) {
    return oe(
      t,
      "iterate",
      j(t) ? "length" : at
    ), Reflect.ownKeys(t);
  }
}
class zo extends pi {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const Ko = /* @__PURE__ */ new hi(), Go = /* @__PURE__ */ new zo(), Zo = /* @__PURE__ */ new hi(!0);
const ps = (e) => e, un = (e) => Reflect.getPrototypeOf(e);
function Jo(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ z(r), o = xt(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, f = r[e](...s), a = n ? ps : t ? Yt : dt;
    return !t && oe(
      i,
      "iterate",
      c ? ds : at
    ), ne(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: p, done: E } = f.next();
          return E ? { value: p, done: E } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: E
          };
        }
      }
    );
  };
}
function fn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Xo(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ z(i), l = /* @__PURE__ */ z(r);
      e || (lt(r, l) && oe(o, "get", r), oe(o, "get", l));
      const { has: c } = un(o), f = t ? ps : e ? Yt : dt;
      if (c.call(o, r))
        return f(i.get(r));
      if (c.call(o, l))
        return f(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && oe(/* @__PURE__ */ z(r), "iterate", at), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ z(i), l = /* @__PURE__ */ z(r);
      return e || (lt(r, l) && oe(o, "has", r), oe(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ z(l), f = t ? ps : e ? Yt : dt;
      return !e && oe(c, "iterate", at), l.forEach((a, p) => r.call(i, f(a), f(p), o));
    }
  };
  return ne(
    n,
    e ? {
      add: fn("add"),
      set: fn("set"),
      delete: fn("delete"),
      clear: fn("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Ue(r) && !/* @__PURE__ */ ft(r) && (r = /* @__PURE__ */ z(r));
        const i = /* @__PURE__ */ z(this);
        return un(i).has.call(i, r) || (i.add(r), Ke(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ Ue(i) && !/* @__PURE__ */ ft(i) && (i = /* @__PURE__ */ z(i));
        const o = /* @__PURE__ */ z(this), { has: l, get: c } = un(o);
        let f = l.call(o, r);
        f || (r = /* @__PURE__ */ z(r), f = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), f ? lt(i, a) && Ke(o, "set", r, i) : Ke(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ z(this), { has: o, get: l } = un(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ z(r), c = o.call(i, r)), l && l.call(i, r);
        const f = i.delete(r);
        return c && Ke(i, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ z(this), i = r.size !== 0, o = r.clear();
        return i && Ke(
          r,
          "clear",
          void 0,
          void 0
        ), o;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Jo(r, e, t);
  }), n;
}
function Ns(e, t) {
  const n = Xo(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    k(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Yo = {
  get: /* @__PURE__ */ Ns(!1, !1)
}, Qo = {
  get: /* @__PURE__ */ Ns(!1, !0)
}, $o = {
  get: /* @__PURE__ */ Ns(!0, !1)
};
const mi = /* @__PURE__ */ new WeakMap(), gi = /* @__PURE__ */ new WeakMap(), yi = /* @__PURE__ */ new WeakMap(), el = /* @__PURE__ */ new WeakMap();
function tl(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function nl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : tl(vo(e));
}
// @__NO_SIDE_EFFECTS__
function Ls(e) {
  return /* @__PURE__ */ ft(e) ? e : Us(
    e,
    !1,
    Ko,
    Yo,
    mi
  );
}
// @__NO_SIDE_EFFECTS__
function sl(e) {
  return Us(
    e,
    !1,
    Zo,
    Qo,
    gi
  );
}
// @__NO_SIDE_EFFECTS__
function hs(e) {
  return Us(
    e,
    !0,
    Go,
    $o,
    yi
  );
}
function Us(e, t, n, s, r) {
  if (!Q(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = nl(e);
  if (i === 0)
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const l = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Rt(e) {
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ Rt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ue(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function qs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ z(t) : e;
}
function rl(e) {
  return !k(e, "__v_skip") && Object.isExtensible(e) && $r(e, "__v_skip", !0), e;
}
const dt = (e) => Q(e) ? /* @__PURE__ */ Ls(e) : e, Yt = (e) => Q(e) ? /* @__PURE__ */ hs(e) : e;
// @__NO_SIDE_EFFECTS__
function fe(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function il(e) {
  return /* @__PURE__ */ fe(e) ? e.value : e;
}
const ol = {
  get: (e, t, n) => t === "__v_raw" ? e : il(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ fe(r) && !/* @__PURE__ */ fe(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function bi(e) {
  return /* @__PURE__ */ Rt(e) ? e : new Proxy(e, ol);
}
class ll {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ui(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Jt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    X !== this)
      return ii(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ci(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function cl(e, t, n = !1) {
  let s, r;
  return F(e) ? s = e : (s = e.get, r = e.set), new ll(s, r, n);
}
const dn = {}, Sn = /* @__PURE__ */ new WeakMap();
let it;
function al(e, t = !1, n = it) {
  if (n) {
    let s = Sn.get(n);
    s || Sn.set(n, s = []), s.push(e);
  }
}
function ul(e, t, n = K) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, f = (T) => r ? T : /* @__PURE__ */ Ue(T) || r === !1 || r === 0 ? Ge(T, 1) : Ge(T);
  let a, p, E, O, g = !1, S = !1;
  if (/* @__PURE__ */ fe(e) ? (p = () => e.value, g = /* @__PURE__ */ Ue(e)) : /* @__PURE__ */ Rt(e) ? (p = () => f(e), g = !0) : j(e) ? (S = !0, g = e.some((T) => /* @__PURE__ */ Rt(T) || /* @__PURE__ */ Ue(T)), p = () => e.map((T) => {
    if (/* @__PURE__ */ fe(T))
      return T.value;
    if (/* @__PURE__ */ Rt(T))
      return f(T);
    if (F(T))
      return c ? c(T, 2) : T();
  })) : F(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (E) {
      Ze();
      try {
        E();
      } finally {
        Je();
      }
    }
    const T = it;
    it = a;
    try {
      return c ? c(e, 3, [O]) : e(O);
    } finally {
      it = T;
    }
  } : p = Le, t && r) {
    const T = p, H = r === !0 ? 1 / 0 : r;
    p = () => Ge(T(), H);
  }
  const C = Lo(), _ = () => {
    a.stop(), C && C.active && Ts(C.effects, a);
  };
  if (i && t) {
    const T = t;
    t = (...H) => {
      T(...H), _();
    };
  }
  let L = S ? new Array(e.length).fill(dn) : dn;
  const N = (T) => {
    if (!(!(a.flags & 1) || !a.dirty && !T))
      if (t) {
        const H = a.run();
        if (r || g || (S ? H.some((se, Y) => lt(se, L[Y])) : lt(H, L))) {
          E && E();
          const se = it;
          it = a;
          try {
            const Y = [
              H,
              // pass undefined as the old value when it's changed for the first time
              L === dn ? void 0 : S && L[0] === dn ? [] : L,
              O
            ];
            L = H, c ? c(t, 3, Y) : (
              // @ts-expect-error
              t(...Y)
            );
          } finally {
            it = se;
          }
        }
      } else
        a.run();
  };
  return l && l(N), a = new si(p), a.scheduler = o ? () => o(N, !1) : N, O = (T) => al(T, !1, a), E = a.onStop = () => {
    const T = Sn.get(a);
    if (T) {
      if (c)
        c(T, 4);
      else
        for (const H of T) H();
      Sn.delete(a);
    }
  }, t ? s ? N(!0) : L = a.run() : o ? o(N.bind(null, !0), !0) : a.run(), _.pause = a.pause.bind(a), _.resume = a.resume.bind(a), _.stop = _, _;
}
function Ge(e, t = 1 / 0, n) {
  if (t <= 0 || !Q(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ fe(e))
    Ge(e.value, t, n);
  else if (j(e))
    for (let s = 0; s < e.length; s++)
      Ge(e[s], t, n);
  else if (Jr(e) || xt(e))
    e.forEach((s) => {
      Ge(s, t, n);
    });
  else if (Qr(e)) {
    for (const s in e)
      Ge(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Ge(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function tn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    jn(r, t, n);
  }
}
function He(e, t, n, s) {
  if (F(e)) {
    const r = tn(e, t, n, s);
    return r && Xr(r) && r.catch((i) => {
      jn(i, t, n);
    }), r;
  }
  if (j(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(He(e[i], t, n, s));
    return r;
  }
}
function jn(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || K;
  if (t) {
    let l = t.parent;
    const c = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Ze(), tn(i, null, 10, [
        e,
        c,
        f
      ]), Je();
      return;
    }
  }
  fl(e, n, r, s, o);
}
function fl(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const ue = [];
let je = -1;
const Ct = [];
let $e = null, At = 0;
const Ai = /* @__PURE__ */ Promise.resolve();
let xn = null;
function dl(e) {
  const t = xn || Ai;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function pl(e) {
  let t = je + 1, n = ue.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ue[s], i = Qt(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Hs(e) {
  if (!(e.flags & 1)) {
    const t = Qt(e), n = ue[ue.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Qt(n) ? ue.push(e) : ue.splice(pl(t), 0, e), e.flags |= 1, wi();
  }
}
function wi() {
  xn || (xn = Ai.then(Si));
}
function hl(e) {
  j(e) ? Ct.push(...e) : $e && e.id === -1 ? $e.splice(At + 1, 0, e) : e.flags & 1 || (Ct.push(e), e.flags |= 1), wi();
}
function rr(e, t, n = je + 1) {
  for (; n < ue.length; n++) {
    const s = ue[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      ue.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Ei(e) {
  if (Ct.length) {
    const t = [...new Set(Ct)].sort(
      (n, s) => Qt(n) - Qt(s)
    );
    if (Ct.length = 0, $e) {
      $e.push(...t);
      return;
    }
    for ($e = t, At = 0; At < $e.length; At++) {
      const n = $e[At];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    $e = null, At = 0;
  }
}
const Qt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Si(e) {
  try {
    for (je = 0; je < ue.length; je++) {
      const t = ue[je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), tn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; je < ue.length; je++) {
      const t = ue[je];
      t && (t.flags &= -2);
    }
    je = -1, ue.length = 0, Ei(), xn = null, (ue.length || Ct.length) && Si();
  }
}
let we = null, xi = null;
function Rn(e) {
  const t = we;
  return we = e, xi = e && e.type.__scopeId || null, t;
}
function ml(e, t = we, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && mr(-1);
    const i = Rn(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Rn(i), s._d && mr(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Nt(e, t) {
  if (we === null)
    return e;
  const n = Hn(we), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = K] = t[r];
    i && (F(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ge(o), s.push({
      dir: i,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function st(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (Ze(), He(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Je());
  }
}
function gl(e, t) {
  if (le) {
    let n = le.provides;
    const s = le.parent && le.parent.provides;
    s === n && (n = le.provides = Object.create(s)), n[e] = t;
  }
}
function gn(e, t, n = !1) {
  const s = yc();
  if (s || It) {
    let r = It ? It._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && F(t) ? t.call(s && s.proxy) : t;
  }
}
const yl = /* @__PURE__ */ Symbol.for("v-scx"), bl = () => gn(yl);
function es(e, t, n) {
  return Ri(e, t, n);
}
function Ri(e, t, n = K) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = ne({}, n), c = t && s || !t && i !== "post";
  let f;
  if (en) {
    if (i === "sync") {
      const O = bl();
      f = O.__watcherHandles || (O.__watcherHandles = []);
    } else if (!c) {
      const O = () => {
      };
      return O.stop = Le, O.resume = Le, O.pause = Le, O;
    }
  }
  const a = le;
  l.call = (O, g, S) => He(O, a, g, S);
  let p = !1;
  i === "post" ? l.scheduler = (O) => {
    be(O, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (O, g) => {
    g ? O() : Hs(O);
  }), l.augmentJob = (O) => {
    t && (O.flags |= 4), p && (O.flags |= 2, a && (O.id = a.uid, O.i = a));
  };
  const E = ul(e, t, l);
  return en && (f ? f.push(E) : c && E()), E;
}
function Al(e, t, n) {
  const s = this.proxy, r = ee(e) ? e.includes(".") ? Ci(s, e) : () => s[e] : e.bind(s, s);
  let i;
  F(t) ? i = t : (i = t.handler, n = t);
  const o = nn(this), l = Ri(r, i.bind(s), n);
  return o(), l;
}
function Ci(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const wl = /* @__PURE__ */ Symbol("_vte"), El = (e) => e.__isTeleport, Sl = /* @__PURE__ */ Symbol("_leaveCb");
function ks(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, ks(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Nn(e, t) {
  return F(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ne({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ii(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Cn = /* @__PURE__ */ new WeakMap();
function zt(e, t, n, s, r = !1) {
  if (j(e)) {
    e.forEach(
      (g, S) => zt(
        g,
        t && (j(t) ? t[S] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Kt(s) && !r) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && zt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? Hn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, f = t && t.r, a = l.refs === K ? l.refs = {} : l.refs, p = l.setupState, E = /* @__PURE__ */ z(p), O = p === K ? Zr : (g) => k(E, g);
  if (f != null && f !== c) {
    if (ir(t), ee(f))
      a[f] = null, O(f) && (p[f] = null);
    else if (/* @__PURE__ */ fe(f)) {
      f.value = null;
      const g = t;
      g.k && (a[g.k] = null);
    }
  }
  if (F(c))
    tn(c, l, 12, [o, a]);
  else {
    const g = ee(c), S = /* @__PURE__ */ fe(c);
    if (g || S) {
      const C = () => {
        if (e.f) {
          const _ = g ? O(c) ? p[c] : a[c] : c.value;
          if (r)
            j(_) && Ts(_, i);
          else if (j(_))
            _.includes(i) || _.push(i);
          else if (g)
            a[c] = [i], O(c) && (p[c] = a[c]);
          else {
            const L = [i];
            c.value = L, e.k && (a[e.k] = L);
          }
        } else g ? (a[c] = o, O(c) && (p[c] = o)) : S && (c.value = o, e.k && (a[e.k] = o));
      };
      if (o) {
        const _ = () => {
          C(), Cn.delete(e);
        };
        _.id = -1, Cn.set(e, _), be(_, n);
      } else
        ir(e), C();
    }
  }
}
function ir(e) {
  const t = Cn.get(e);
  t && (t.flags |= 8, Cn.delete(e));
}
Fn().requestIdleCallback;
Fn().cancelIdleCallback;
const Kt = (e) => !!e.type.__asyncLoader, Oi = (e) => e.type.__isKeepAlive;
function xl(e, t) {
  vi(e, "a", t);
}
function Rl(e, t) {
  vi(e, "da", t);
}
function vi(e, t, n = le) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Ln(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Oi(r.parent.vnode) && Cl(s, t, n, r), r = r.parent;
  }
}
function Cl(e, t, n, s) {
  const r = Ln(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Ti(() => {
    Ts(s[t], r);
  }, n);
}
function Ln(e, t, n = le, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Ze();
      const l = nn(n), c = He(t, n, e, o);
      return l(), Je(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const Xe = (e) => (t, n = le) => {
  (!en || e === "sp") && Ln(e, (...s) => t(...s), n);
}, Il = Xe("bm"), Ol = Xe("m"), vl = Xe(
  "bu"
), Tl = Xe("u"), Pl = Xe(
  "bum"
), Ti = Xe("um"), _l = Xe(
  "sp"
), Ml = Xe("rtg"), Dl = Xe("rtc");
function Fl(e, t = le) {
  Ln("ec", e, t);
}
const Bl = "components";
function ms(e, t) {
  return Nl(Bl, e, !0, t) || e;
}
const jl = /* @__PURE__ */ Symbol.for("v-ndc");
function Nl(e, t, n = !0, s = !1) {
  const r = we || le;
  if (r) {
    const i = r.type;
    {
      const l = Sc(
        i,
        !1
      );
      if (l && (l === t || l === xe(t) || l === Dn(xe(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      or(r[e] || i[e], t) || // global registration
      or(r.appContext[e], t)
    );
    return !o && s ? i : o;
  }
}
function or(e, t) {
  return e && (e[t] || e[xe(t)] || e[Dn(xe(t))]);
}
const gs = (e) => e ? Ji(e) ? Hn(e) : gs(e.parent) : null, Gt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ne(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => gs(e.parent),
    $root: (e) => gs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => _i(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Hs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = dl.bind(e.proxy)),
    $watch: (e) => Al.bind(e)
  })
), ts = (e, t) => e !== K && !e.__isScriptSetup && k(e, t), Ll = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: i, accessCache: o, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const E = o[t];
      if (E !== void 0)
        switch (E) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (ts(s, t))
          return o[t] = 1, s[t];
        if (r !== K && k(r, t))
          return o[t] = 2, r[t];
        if (k(i, t))
          return o[t] = 3, i[t];
        if (n !== K && k(n, t))
          return o[t] = 4, n[t];
        ys && (o[t] = 0);
      }
    }
    const f = Gt[t];
    let a, p;
    if (f)
      return t === "$attrs" && oe(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== K && k(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, k(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return ts(r, t) ? (r[t] = n, !0) : s !== K && k(s, t) ? (s[t] = n, !0) : k(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== K && l[0] !== "$" && k(e, l) || ts(t, l) || k(i, l) || k(s, l) || k(Gt, l) || k(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : k(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function lr(e) {
  return j(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ys = !0;
function Ul(e) {
  const t = _i(e), n = e.proxy, s = e.ctx;
  ys = !1, t.beforeCreate && cr(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: i,
    methods: o,
    watch: l,
    provide: c,
    inject: f,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: E,
    beforeUpdate: O,
    updated: g,
    activated: S,
    deactivated: C,
    beforeDestroy: _,
    beforeUnmount: L,
    destroyed: N,
    unmounted: T,
    render: H,
    renderTracked: se,
    renderTriggered: Y,
    errorCaptured: Se,
    serverPrefetch: ke,
    // public API
    expose: ve,
    inheritAttrs: Ye,
    // assets
    components: We,
    directives: Te,
    filters: Re
  } = t;
  if (f && ql(f, s, null), o)
    for (const Z in o) {
      const U = o[Z];
      F(U) && (s[Z] = U.bind(n));
    }
  if (r) {
    const Z = r.call(n, n);
    Q(Z) && (e.data = /* @__PURE__ */ Ls(Z));
  }
  if (ys = !0, i)
    for (const Z in i) {
      const U = i[Z], Pe = F(U) ? U.bind(n, n) : F(U.get) ? U.get.bind(n, n) : Le, mt = !F(U) && F(U.set) ? U.set.bind(n) : Le, re = Rc({
        get: Pe,
        set: mt
      });
      Object.defineProperty(s, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => re.value,
        set: (te) => re.value = te
      });
    }
  if (l)
    for (const Z in l)
      Pi(l[Z], s, n, Z);
  if (c) {
    const Z = F(c) ? c.call(n) : c;
    Reflect.ownKeys(Z).forEach((U) => {
      gl(U, Z[U]);
    });
  }
  a && cr(a, e, "c");
  function G(Z, U) {
    j(U) ? U.forEach((Pe) => Z(Pe.bind(n))) : U && Z(U.bind(n));
  }
  if (G(Il, p), G(Ol, E), G(vl, O), G(Tl, g), G(xl, S), G(Rl, C), G(Fl, Se), G(Dl, se), G(Ml, Y), G(Pl, L), G(Ti, T), G(_l, ke), j(ve))
    if (ve.length) {
      const Z = e.exposed || (e.exposed = {});
      ve.forEach((U) => {
        Object.defineProperty(Z, U, {
          get: () => n[U],
          set: (Pe) => n[U] = Pe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  H && e.render === Le && (e.render = H), Ye != null && (e.inheritAttrs = Ye), We && (e.components = We), Te && (e.directives = Te), ke && Ii(e);
}
function ql(e, t, n = Le) {
  j(e) && (e = bs(e));
  for (const s in e) {
    const r = e[s];
    let i;
    Q(r) ? "default" in r ? i = gn(
      r.from || s,
      r.default,
      !0
    ) : i = gn(r.from || s) : i = gn(r), /* @__PURE__ */ fe(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function cr(e, t, n) {
  He(
    j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Pi(e, t, n, s) {
  let r = s.includes(".") ? Ci(n, s) : () => n[s];
  if (ee(e)) {
    const i = t[e];
    F(i) && es(r, i);
  } else if (F(e))
    es(r, e.bind(n));
  else if (Q(e))
    if (j(e))
      e.forEach((i) => Pi(i, t, n, s));
    else {
      const i = F(e.handler) ? e.handler.bind(n) : t[e.handler];
      F(i) && es(r, i, e);
    }
}
function _i(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: i,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (f) => In(c, f, o, !0)
  ), In(c, t, o)), Q(t) && i.set(t, c), c;
}
function In(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && In(e, i, n, !0), r && r.forEach(
    (o) => In(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = Hl[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Hl = {
  data: ar,
  props: ur,
  emits: ur,
  // objects
  methods: Ht,
  computed: Ht,
  // lifecycle
  beforeCreate: ae,
  created: ae,
  beforeMount: ae,
  mounted: ae,
  beforeUpdate: ae,
  updated: ae,
  beforeDestroy: ae,
  beforeUnmount: ae,
  destroyed: ae,
  unmounted: ae,
  activated: ae,
  deactivated: ae,
  errorCaptured: ae,
  serverPrefetch: ae,
  // assets
  components: Ht,
  directives: Ht,
  // watch
  watch: Wl,
  // provide / inject
  provide: ar,
  inject: kl
};
function ar(e, t) {
  return t ? e ? function() {
    return ne(
      F(e) ? e.call(this, this) : e,
      F(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function kl(e, t) {
  return Ht(bs(e), bs(t));
}
function bs(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ae(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ht(e, t) {
  return e ? ne(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ur(e, t) {
  return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ne(
    /* @__PURE__ */ Object.create(null),
    lr(e),
    lr(t ?? {})
  ) : t;
}
function Wl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ne(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ae(e[s], t[s]);
  return n;
}
function Mi() {
  return {
    app: null,
    config: {
      isNativeTag: Zr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Vl = 0;
function zl(e, t) {
  return function(s, r = null) {
    F(s) || (s = ne({}, s)), r != null && !Q(r) && (r = null);
    const i = Mi(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = i.app = {
      _uid: Vl++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Cc,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && F(a.install) ? (o.add(a), a.install(f, ...p)) : F(a) && (o.add(a), a(f, ...p))), f;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), f;
      },
      component(a, p) {
        return p ? (i.components[a] = p, f) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, f) : i.directives[a];
      },
      mount(a, p, E) {
        if (!c) {
          const O = f._ceVNode || qe(s, r);
          return O.appContext = i, E === !0 ? E = "svg" : E === !1 && (E = void 0), e(O, a, E), c = !0, f._container = a, a.__vue_app__ = f, Hn(O.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (He(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, f;
      },
      runWithContext(a) {
        const p = It;
        It = f;
        try {
          return a();
        } finally {
          It = p;
        }
      }
    };
    return f;
  };
}
let It = null;
const Kl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${xe(t)}Modifiers`] || e[`${ht(t)}Modifiers`];
function Gl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || K;
  let r = n;
  const i = t.startsWith("update:"), o = i && Kl(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => ee(a) ? a.trim() : a)), o.number && (r = n.map(_s)));
  let l, c = s[l = Jn(t)] || // also try camelCase event handler (#2249)
  s[l = Jn(xe(t))];
  !c && i && (c = s[l = Jn(ht(t))]), c && He(
    c,
    e,
    6,
    r
  );
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, He(
      f,
      e,
      6,
      r
    );
  }
}
const Zl = /* @__PURE__ */ new WeakMap();
function Di(e, t, n = !1) {
  const s = n ? Zl : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!F(e)) {
    const c = (f) => {
      const a = Di(f, t, !0);
      a && (l = !0, ne(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (Q(e) && s.set(e, null), null) : (j(i) ? i.forEach((c) => o[c] = null) : ne(o, i), Q(e) && s.set(e, o), o);
}
function Un(e, t) {
  return !e || !Pn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), k(e, t[0].toLowerCase() + t.slice(1)) || k(e, ht(t)) || k(e, t));
}
function fr(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    propsOptions: [i],
    slots: o,
    attrs: l,
    emit: c,
    render: f,
    renderCache: a,
    props: p,
    data: E,
    setupState: O,
    ctx: g,
    inheritAttrs: S
  } = e, C = Rn(e);
  let _, L;
  try {
    if (n.shapeFlag & 4) {
      const T = r || s, H = T;
      _ = Ne(
        f.call(
          H,
          T,
          a,
          p,
          O,
          E,
          g
        )
      ), L = l;
    } else {
      const T = t;
      _ = Ne(
        T.length > 1 ? T(
          p,
          { attrs: l, slots: o, emit: c }
        ) : T(
          p,
          null
        )
      ), L = t.props ? l : Jl(l);
    }
  } catch (T) {
    Zt.length = 0, jn(T, e, 1), _ = qe(tt);
  }
  let N = _;
  if (L && S !== !1) {
    const T = Object.keys(L), { shapeFlag: H } = N;
    T.length && H & 7 && (i && T.some(vs) && (L = Xl(
      L,
      i
    )), N = Ot(N, L, !1, !0));
  }
  return n.dirs && (N = Ot(N, null, !1, !0), N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs), n.transition && ks(N, n.transition), _ = N, Rn(C), _;
}
const Jl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Pn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Xl = (e, t) => {
  const n = {};
  for (const s in e)
    (!vs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Yl(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, f = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? dr(s, o, f) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const E = a[p];
        if (o[E] !== s[E] && !Un(f, E))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? dr(s, o, f) : !0 : !!o;
  return !1;
}
function dr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !Un(n, i))
      return !0;
  }
  return !1;
}
function Ql({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Fi = {}, Bi = () => Object.create(Fi), ji = (e) => Object.getPrototypeOf(e) === Fi;
function $l(e, t, n, s = !1) {
  const r = {}, i = Bi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ni(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ sl(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function ec(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ z(r), [c] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let E = a[p];
        if (Un(e.emitsOptions, E))
          continue;
        const O = t[E];
        if (c)
          if (k(i, E))
            O !== i[E] && (i[E] = O, f = !0);
          else {
            const g = xe(E);
            r[g] = As(
              c,
              l,
              g,
              O,
              e,
              !1
            );
          }
        else
          O !== i[E] && (i[E] = O, f = !0);
      }
    }
  } else {
    Ni(e, t, r, i) && (f = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !k(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = ht(p)) === p || !k(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = As(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !k(t, p)) && (delete i[p], f = !0);
  }
  f && Ke(e.attrs, "set", "");
}
function Ni(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (kt(c))
        continue;
      const f = t[c];
      let a;
      r && k(r, a = xe(c)) ? !i || !i.includes(a) ? n[a] = f : (l || (l = {}))[a] = f : Un(e.emitsOptions, c) || (!(c in s) || f !== s[c]) && (s[c] = f, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ z(n), f = l || K;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = As(
        r,
        c,
        p,
        f[p],
        e,
        !k(f, p)
      );
    }
  }
  return o;
}
function As(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = k(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && F(c)) {
        const { propsDefaults: f } = r;
        if (n in f)
          s = f[n];
        else {
          const a = nn(r);
          s = f[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
      r.ce && r.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (i && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === ht(n)) && (s = !0));
  }
  return s;
}
const tc = /* @__PURE__ */ new WeakMap();
function Li(e, t, n = !1) {
  const s = n ? tc : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!F(e)) {
    const a = (p) => {
      c = !0;
      const [E, O] = Li(p, t, !0);
      ne(o, E), O && l.push(...O);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return Q(e) && s.set(e, St), St;
  if (j(i))
    for (let a = 0; a < i.length; a++) {
      const p = xe(i[a]);
      pr(p) && (o[p] = K);
    }
  else if (i)
    for (const a in i) {
      const p = xe(a);
      if (pr(p)) {
        const E = i[a], O = o[p] = j(E) || F(E) ? { type: E } : ne({}, E), g = O.type;
        let S = !1, C = !0;
        if (j(g))
          for (let _ = 0; _ < g.length; ++_) {
            const L = g[_], N = F(L) && L.name;
            if (N === "Boolean") {
              S = !0;
              break;
            } else N === "String" && (C = !1);
          }
        else
          S = F(g) && g.name === "Boolean";
        O[
          0
          /* shouldCast */
        ] = S, O[
          1
          /* shouldCastTrue */
        ] = C, (S || k(O, "default")) && l.push(p);
      }
    }
  const f = [o, l];
  return Q(e) && s.set(e, f), f;
}
function pr(e) {
  return e[0] !== "$" && !kt(e);
}
const Ws = (e) => e === "_" || e === "_ctx" || e === "$stable", Vs = (e) => j(e) ? e.map(Ne) : [Ne(e)], nc = (e, t, n) => {
  if (t._n)
    return t;
  const s = ml((...r) => Vs(t(...r)), n);
  return s._c = !1, s;
}, Ui = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Ws(r)) continue;
    const i = e[r];
    if (F(i))
      t[r] = nc(r, i, s);
    else if (i != null) {
      const o = Vs(i);
      t[r] = () => o;
    }
  }
}, qi = (e, t) => {
  const n = Vs(t);
  e.slots.default = () => n;
}, Hi = (e, t, n) => {
  for (const s in t)
    (n || !Ws(s)) && (e[s] = t[s]);
}, sc = (e, t, n) => {
  const s = e.slots = Bi();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (Hi(s, t, n), n && $r(s, "_", r, !0)) : Ui(t, s);
  } else t && qi(e, t);
}, rc = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = K;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Hi(r, t, n) : (i = !t.$stable, Ui(t, r)), o = t;
  } else t && (qi(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Ws(l) && o[l] == null && delete r[l];
}, be = ac;
function ic(e) {
  return oc(e);
}
function oc(e, t) {
  const n = Fn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: i,
    createElement: o,
    createText: l,
    createComment: c,
    setText: f,
    setElementText: a,
    parentNode: p,
    nextSibling: E,
    setScopeId: O = Le,
    insertStaticContent: g
  } = e, S = (u, d, m, w = null, y = null, b = null, I = void 0, R = null, x = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !Lt(u, d) && (w = an(u), te(u, y, b, !0), u = null), d.patchFlag === -2 && (x = !1, d.dynamicChildren = null);
    const { type: A, ref: M, shapeFlag: v } = d;
    switch (A) {
      case qn:
        C(u, d, m, w);
        break;
      case tt:
        _(u, d, m, w);
        break;
      case ss:
        u == null && L(d, m, w, I);
        break;
      case Ce:
        We(
          u,
          d,
          m,
          w,
          y,
          b,
          I,
          R,
          x
        );
        break;
      default:
        v & 1 ? H(
          u,
          d,
          m,
          w,
          y,
          b,
          I,
          R,
          x
        ) : v & 6 ? Te(
          u,
          d,
          m,
          w,
          y,
          b,
          I,
          R,
          x
        ) : (v & 64 || v & 128) && A.process(
          u,
          d,
          m,
          w,
          y,
          b,
          I,
          R,
          x,
          Ft
        );
    }
    M != null && y ? zt(M, u && u.ref, b, d || u, !d) : M == null && u && u.ref != null && zt(u.ref, null, b, u, !0);
  }, C = (u, d, m, w) => {
    if (u == null)
      s(
        d.el = l(d.children),
        m,
        w
      );
    else {
      const y = d.el = u.el;
      d.children !== u.children && f(y, d.children);
    }
  }, _ = (u, d, m, w) => {
    u == null ? s(
      d.el = c(d.children || ""),
      m,
      w
    ) : d.el = u.el;
  }, L = (u, d, m, w) => {
    [u.el, u.anchor] = g(
      u.children,
      d,
      m,
      w,
      u.el,
      u.anchor
    );
  }, N = ({ el: u, anchor: d }, m, w) => {
    let y;
    for (; u && u !== d; )
      y = E(u), s(u, m, w), u = y;
    s(d, m, w);
  }, T = ({ el: u, anchor: d }) => {
    let m;
    for (; u && u !== d; )
      m = E(u), r(u), u = m;
    r(d);
  }, H = (u, d, m, w, y, b, I, R, x) => {
    if (d.type === "svg" ? I = "svg" : d.type === "math" && (I = "mathml"), u == null)
      se(
        d,
        m,
        w,
        y,
        b,
        I,
        R,
        x
      );
    else {
      const A = u.el && u.el._isVueCE ? u.el : null;
      try {
        A && A._beginPatch(), ke(
          u,
          d,
          y,
          b,
          I,
          R,
          x
        );
      } finally {
        A && A._endPatch();
      }
    }
  }, se = (u, d, m, w, y, b, I, R) => {
    let x, A;
    const { props: M, shapeFlag: v, transition: P, dirs: D } = u;
    if (x = u.el = o(
      u.type,
      b,
      M && M.is,
      M
    ), v & 8 ? a(x, u.children) : v & 16 && Se(
      u.children,
      x,
      null,
      w,
      y,
      ns(u, b),
      I,
      R
    ), D && st(u, null, w, "created"), Y(x, u, u.scopeId, I, w), M) {
      for (const J in M)
        J !== "value" && !kt(J) && i(x, J, null, M[J], b, w);
      "value" in M && i(x, "value", null, M.value, b), (A = M.onVnodeBeforeMount) && Fe(A, w, u);
    }
    D && st(u, null, w, "beforeMount");
    const q = lc(y, P);
    q && P.beforeEnter(x), s(x, d, m), ((A = M && M.onVnodeMounted) || q || D) && be(() => {
      A && Fe(A, w, u), q && P.enter(x), D && st(u, null, w, "mounted");
    }, y);
  }, Y = (u, d, m, w, y) => {
    if (m && O(u, m), w)
      for (let b = 0; b < w.length; b++)
        O(u, w[b]);
    if (y) {
      let b = y.subTree;
      if (d === b || zi(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const I = y.vnode;
        Y(
          u,
          I,
          I.scopeId,
          I.slotScopeIds,
          y.parent
        );
      }
    }
  }, Se = (u, d, m, w, y, b, I, R, x = 0) => {
    for (let A = x; A < u.length; A++) {
      const M = u[A] = R ? et(u[A]) : Ne(u[A]);
      S(
        null,
        M,
        d,
        m,
        w,
        y,
        b,
        I,
        R
      );
    }
  }, ke = (u, d, m, w, y, b, I) => {
    const R = d.el = u.el;
    let { patchFlag: x, dynamicChildren: A, dirs: M } = d;
    x |= u.patchFlag & 16;
    const v = u.props || K, P = d.props || K;
    let D;
    if (m && rt(m, !1), (D = P.onVnodeBeforeUpdate) && Fe(D, m, d, u), M && st(d, u, m, "beforeUpdate"), m && rt(m, !0), (v.innerHTML && P.innerHTML == null || v.textContent && P.textContent == null) && a(R, ""), A ? ve(
      u.dynamicChildren,
      A,
      R,
      m,
      w,
      ns(d, y),
      b
    ) : I || U(
      u,
      d,
      R,
      null,
      m,
      w,
      ns(d, y),
      b,
      !1
    ), x > 0) {
      if (x & 16)
        Ye(R, v, P, m, y);
      else if (x & 2 && v.class !== P.class && i(R, "class", null, P.class, y), x & 4 && i(R, "style", v.style, P.style, y), x & 8) {
        const q = d.dynamicProps;
        for (let J = 0; J < q.length; J++) {
          const V = q[J], de = v[V], pe = P[V];
          (pe !== de || V === "value") && i(R, V, de, pe, y, m);
        }
      }
      x & 1 && u.children !== d.children && a(R, d.children);
    } else !I && A == null && Ye(R, v, P, m, y);
    ((D = P.onVnodeUpdated) || M) && be(() => {
      D && Fe(D, m, d, u), M && st(d, u, m, "updated");
    }, w);
  }, ve = (u, d, m, w, y, b, I) => {
    for (let R = 0; R < d.length; R++) {
      const x = u[R], A = d[R], M = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === Ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Lt(x, A) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 198) ? p(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      S(
        x,
        A,
        M,
        null,
        w,
        y,
        b,
        I,
        !0
      );
    }
  }, Ye = (u, d, m, w, y) => {
    if (d !== m) {
      if (d !== K)
        for (const b in d)
          !kt(b) && !(b in m) && i(
            u,
            b,
            d[b],
            null,
            y,
            w
          );
      for (const b in m) {
        if (kt(b)) continue;
        const I = m[b], R = d[b];
        I !== R && b !== "value" && i(u, b, R, I, y, w);
      }
      "value" in m && i(u, "value", d.value, m.value, y);
    }
  }, We = (u, d, m, w, y, b, I, R, x) => {
    const A = d.el = u ? u.el : l(""), M = d.anchor = u ? u.anchor : l("");
    let { patchFlag: v, dynamicChildren: P, slotScopeIds: D } = d;
    D && (R = R ? R.concat(D) : D), u == null ? (s(A, m, w), s(M, m, w), Se(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      M,
      y,
      b,
      I,
      R,
      x
    )) : v > 0 && v & 64 && P && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === P.length ? (ve(
      u.dynamicChildren,
      P,
      m,
      y,
      b,
      I,
      R
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || y && d === y.subTree) && ki(
      u,
      d,
      !0
      /* shallow */
    )) : U(
      u,
      d,
      m,
      M,
      y,
      b,
      I,
      R,
      x
    );
  }, Te = (u, d, m, w, y, b, I, R, x) => {
    d.slotScopeIds = R, u == null ? d.shapeFlag & 512 ? y.ctx.activate(
      d,
      m,
      w,
      I,
      x
    ) : Re(
      d,
      m,
      w,
      y,
      b,
      I,
      x
    ) : Mt(u, d, x);
  }, Re = (u, d, m, w, y, b, I) => {
    const R = u.component = gc(
      u,
      w,
      y
    );
    if (Oi(u) && (R.ctx.renderer = Ft), bc(R, !1, I), R.asyncDep) {
      if (y && y.registerDep(R, G, I), !u.el) {
        const x = R.subTree = qe(tt);
        _(null, x, d, m), u.placeholder = x.el;
      }
    } else
      G(
        R,
        u,
        d,
        m,
        y,
        b,
        I
      );
  }, Mt = (u, d, m) => {
    const w = d.component = u.component;
    if (Yl(u, d, m))
      if (w.asyncDep && !w.asyncResolved) {
        Z(w, d, m);
        return;
      } else
        w.next = d, w.update();
    else
      d.el = u.el, w.vnode = d;
  }, G = (u, d, m, w, y, b, I) => {
    const R = () => {
      if (u.isMounted) {
        let { next: v, bu: P, u: D, parent: q, vnode: J } = u;
        {
          const Me = Wi(u);
          if (Me) {
            v && (v.el = J.el, Z(u, v, I)), Me.asyncDep.then(() => {
              u.isUnmounted || R();
            });
            return;
          }
        }
        let V = v, de;
        rt(u, !1), v ? (v.el = J.el, Z(u, v, I)) : v = J, P && mn(P), (de = v.props && v.props.onVnodeBeforeUpdate) && Fe(de, q, v, J), rt(u, !0);
        const pe = fr(u), _e = u.subTree;
        u.subTree = pe, S(
          _e,
          pe,
          // parent may have changed if it's in a teleport
          p(_e.el),
          // anchor may have changed if it's in a fragment
          an(_e),
          u,
          y,
          b
        ), v.el = pe.el, V === null && Ql(u, pe.el), D && be(D, y), (de = v.props && v.props.onVnodeUpdated) && be(
          () => Fe(de, q, v, J),
          y
        );
      } else {
        let v;
        const { el: P, props: D } = d, { bm: q, m: J, parent: V, root: de, type: pe } = u, _e = Kt(d);
        rt(u, !1), q && mn(q), !_e && (v = D && D.onVnodeBeforeMount) && Fe(v, V, d), rt(u, !0);
        {
          de.ce && // @ts-expect-error _def is private
          de.ce._def.shadowRoot !== !1 && de.ce._injectChildStyle(pe);
          const Me = u.subTree = fr(u);
          S(
            null,
            Me,
            m,
            w,
            u,
            y,
            b
          ), d.el = Me.el;
        }
        if (J && be(J, y), !_e && (v = D && D.onVnodeMounted)) {
          const Me = d;
          be(
            () => Fe(v, V, Me),
            y
          );
        }
        (d.shapeFlag & 256 || V && Kt(V.vnode) && V.vnode.shapeFlag & 256) && u.a && be(u.a, y), u.isMounted = !0, d = m = w = null;
      }
    };
    u.scope.on();
    const x = u.effect = new si(R);
    u.scope.off();
    const A = u.update = x.run.bind(x), M = u.job = x.runIfDirty.bind(x);
    M.i = u, M.id = u.uid, x.scheduler = () => Hs(M), rt(u, !0), A();
  }, Z = (u, d, m) => {
    d.component = u;
    const w = u.vnode.props;
    u.vnode = d, u.next = null, ec(u, d.props, w, m), rc(u, d.children, m), Ze(), rr(u), Je();
  }, U = (u, d, m, w, y, b, I, R, x = !1) => {
    const A = u && u.children, M = u ? u.shapeFlag : 0, v = d.children, { patchFlag: P, shapeFlag: D } = d;
    if (P > 0) {
      if (P & 128) {
        mt(
          A,
          v,
          m,
          w,
          y,
          b,
          I,
          R,
          x
        );
        return;
      } else if (P & 256) {
        Pe(
          A,
          v,
          m,
          w,
          y,
          b,
          I,
          R,
          x
        );
        return;
      }
    }
    D & 8 ? (M & 16 && Dt(A, y, b), v !== A && a(m, v)) : M & 16 ? D & 16 ? mt(
      A,
      v,
      m,
      w,
      y,
      b,
      I,
      R,
      x
    ) : Dt(A, y, b, !0) : (M & 8 && a(m, ""), D & 16 && Se(
      v,
      m,
      w,
      y,
      b,
      I,
      R,
      x
    ));
  }, Pe = (u, d, m, w, y, b, I, R, x) => {
    u = u || St, d = d || St;
    const A = u.length, M = d.length, v = Math.min(A, M);
    let P;
    for (P = 0; P < v; P++) {
      const D = d[P] = x ? et(d[P]) : Ne(d[P]);
      S(
        u[P],
        D,
        m,
        null,
        y,
        b,
        I,
        R,
        x
      );
    }
    A > M ? Dt(
      u,
      y,
      b,
      !0,
      !1,
      v
    ) : Se(
      d,
      m,
      w,
      y,
      b,
      I,
      R,
      x,
      v
    );
  }, mt = (u, d, m, w, y, b, I, R, x) => {
    let A = 0;
    const M = d.length;
    let v = u.length - 1, P = M - 1;
    for (; A <= v && A <= P; ) {
      const D = u[A], q = d[A] = x ? et(d[A]) : Ne(d[A]);
      if (Lt(D, q))
        S(
          D,
          q,
          m,
          null,
          y,
          b,
          I,
          R,
          x
        );
      else
        break;
      A++;
    }
    for (; A <= v && A <= P; ) {
      const D = u[v], q = d[P] = x ? et(d[P]) : Ne(d[P]);
      if (Lt(D, q))
        S(
          D,
          q,
          m,
          null,
          y,
          b,
          I,
          R,
          x
        );
      else
        break;
      v--, P--;
    }
    if (A > v) {
      if (A <= P) {
        const D = P + 1, q = D < M ? d[D].el : w;
        for (; A <= P; )
          S(
            null,
            d[A] = x ? et(d[A]) : Ne(d[A]),
            m,
            q,
            y,
            b,
            I,
            R,
            x
          ), A++;
      }
    } else if (A > P)
      for (; A <= v; )
        te(u[A], y, b, !0), A++;
    else {
      const D = A, q = A, J = /* @__PURE__ */ new Map();
      for (A = q; A <= P; A++) {
        const ye = d[A] = x ? et(d[A]) : Ne(d[A]);
        ye.key != null && J.set(ye.key, A);
      }
      let V, de = 0;
      const pe = P - q + 1;
      let _e = !1, Me = 0;
      const Bt = new Array(pe);
      for (A = 0; A < pe; A++) Bt[A] = 0;
      for (A = D; A <= v; A++) {
        const ye = u[A];
        if (de >= pe) {
          te(ye, y, b, !0);
          continue;
        }
        let De;
        if (ye.key != null)
          De = J.get(ye.key);
        else
          for (V = q; V <= P; V++)
            if (Bt[V - q] === 0 && Lt(ye, d[V])) {
              De = V;
              break;
            }
        De === void 0 ? te(ye, y, b, !0) : (Bt[De - q] = A + 1, De >= Me ? Me = De : _e = !0, S(
          ye,
          d[De],
          m,
          null,
          y,
          b,
          I,
          R,
          x
        ), de++);
      }
      const Ys = _e ? cc(Bt) : St;
      for (V = Ys.length - 1, A = pe - 1; A >= 0; A--) {
        const ye = q + A, De = d[ye], Qs = d[ye + 1], $s = ye + 1 < M ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Qs.el || Vi(Qs)
        ) : w;
        Bt[A] === 0 ? S(
          null,
          De,
          m,
          $s,
          y,
          b,
          I,
          R,
          x
        ) : _e && (V < 0 || A !== Ys[V] ? re(De, m, $s, 2) : V--);
      }
    }
  }, re = (u, d, m, w, y = null) => {
    const { el: b, type: I, transition: R, children: x, shapeFlag: A } = u;
    if (A & 6) {
      re(u.component.subTree, d, m, w);
      return;
    }
    if (A & 128) {
      u.suspense.move(d, m, w);
      return;
    }
    if (A & 64) {
      I.move(u, d, m, Ft);
      return;
    }
    if (I === Ce) {
      s(b, d, m);
      for (let v = 0; v < x.length; v++)
        re(x[v], d, m, w);
      s(u.anchor, d, m);
      return;
    }
    if (I === ss) {
      N(u, d, m);
      return;
    }
    if (w !== 2 && A & 1 && R)
      if (w === 0)
        R.beforeEnter(b), s(b, d, m), be(() => R.enter(b), y);
      else {
        const { leave: v, delayLeave: P, afterLeave: D } = R, q = () => {
          u.ctx.isUnmounted ? r(b) : s(b, d, m);
        }, J = () => {
          b._isLeaving && b[Sl](
            !0
            /* cancelled */
          ), v(b, () => {
            q(), D && D();
          });
        };
        P ? P(b, q, J) : J();
      }
    else
      s(b, d, m);
  }, te = (u, d, m, w = !1, y = !1) => {
    const {
      type: b,
      props: I,
      ref: R,
      children: x,
      dynamicChildren: A,
      shapeFlag: M,
      patchFlag: v,
      dirs: P,
      cacheIndex: D
    } = u;
    if (v === -2 && (y = !1), R != null && (Ze(), zt(R, null, m, u, !0), Je()), D != null && (d.renderCache[D] = void 0), M & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const q = M & 1 && P, J = !Kt(u);
    let V;
    if (J && (V = I && I.onVnodeBeforeUnmount) && Fe(V, d, u), M & 6)
      cn(u.component, m, w);
    else {
      if (M & 128) {
        u.suspense.unmount(m, w);
        return;
      }
      q && st(u, null, d, "beforeUnmount"), M & 64 ? u.type.remove(
        u,
        d,
        m,
        Ft,
        w
      ) : A && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !A.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== Ce || v > 0 && v & 64) ? Dt(
        A,
        d,
        m,
        !1,
        !0
      ) : (b === Ce && v & 384 || !y && M & 16) && Dt(x, d, m), w && gt(u);
    }
    (J && (V = I && I.onVnodeUnmounted) || q) && be(() => {
      V && Fe(V, d, u), q && st(u, null, d, "unmounted");
    }, m);
  }, gt = (u) => {
    const { type: d, el: m, anchor: w, transition: y } = u;
    if (d === Ce) {
      yt(m, w);
      return;
    }
    if (d === ss) {
      T(u);
      return;
    }
    const b = () => {
      r(m), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (u.shapeFlag & 1 && y && !y.persisted) {
      const { leave: I, delayLeave: R } = y, x = () => I(m, b);
      R ? R(u.el, b, x) : x();
    } else
      b();
  }, yt = (u, d) => {
    let m;
    for (; u !== d; )
      m = E(u), r(u), u = m;
    r(d);
  }, cn = (u, d, m) => {
    const { bum: w, scope: y, job: b, subTree: I, um: R, m: x, a: A } = u;
    hr(x), hr(A), w && mn(w), y.stop(), b && (b.flags |= 8, te(I, u, d, m)), R && be(R, d), be(() => {
      u.isUnmounted = !0;
    }, d);
  }, Dt = (u, d, m, w = !1, y = !1, b = 0) => {
    for (let I = b; I < u.length; I++)
      te(u[I], d, m, w, y);
  }, an = (u) => {
    if (u.shapeFlag & 6)
      return an(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = E(u.anchor || u.el), m = d && d[wl];
    return m ? E(m) : d;
  };
  let Zn = !1;
  const Xs = (u, d, m) => {
    let w;
    u == null ? d._vnode && (te(d._vnode, null, null, !0), w = d._vnode.component) : S(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      m
    ), d._vnode = u, Zn || (Zn = !0, rr(w), Ei(), Zn = !1);
  }, Ft = {
    p: S,
    um: te,
    m: re,
    r: gt,
    mt: Re,
    mc: Se,
    pc: U,
    pbc: ve,
    n: an,
    o: e
  };
  return {
    render: Xs,
    hydrate: void 0,
    createApp: zl(Xs)
  };
}
function ns({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function rt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lc(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ki(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (j(s) && j(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = et(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && ki(o, l)), l.type === qn && (l.patchFlag !== -1 ? l.el = o.el : l.__elIndex = i + // take fragment start anchor into account
      (e.type === Ce ? 1 : 0)), l.type === tt && !l.el && (l.el = o.el);
    }
}
function cc(e) {
  const t = e.slice(), n = [0];
  let s, r, i, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const f = e[s];
    if (f !== 0) {
      if (r = n[n.length - 1], e[r] < f) {
        t[s] = r, n.push(s);
        continue;
      }
      for (i = 0, o = n.length - 1; i < o; )
        l = i + o >> 1, e[n[l]] < f ? i = l + 1 : o = l;
      f < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), n[i] = s);
    }
  }
  for (i = n.length, o = n[i - 1]; i-- > 0; )
    n[i] = o, o = t[o];
  return n;
}
function Wi(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Wi(t);
}
function hr(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Vi(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Vi(t.subTree) : null;
}
const zi = (e) => e.__isSuspense;
function ac(e, t) {
  t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : hl(e);
}
const Ce = /* @__PURE__ */ Symbol.for("v-fgt"), qn = /* @__PURE__ */ Symbol.for("v-txt"), tt = /* @__PURE__ */ Symbol.for("v-cmt"), ss = /* @__PURE__ */ Symbol.for("v-stc"), Zt = [];
let Ee = null;
function ie(e = !1) {
  Zt.push(Ee = e ? null : []);
}
function uc() {
  Zt.pop(), Ee = Zt[Zt.length - 1] || null;
}
let $t = 1;
function mr(e, t = !1) {
  $t += e, e < 0 && Ee && t && (Ee.hasOnce = !0);
}
function Ki(e) {
  return e.dynamicChildren = $t > 0 ? Ee || St : null, uc(), $t > 0 && Ee && Ee.push(e), e;
}
function Ae(e, t, n, s, r, i) {
  return Ki(
    W(
      e,
      t,
      n,
      s,
      r,
      i,
      !0
    )
  );
}
function ws(e, t, n, s, r) {
  return Ki(
    qe(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Gi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Lt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Zi = ({ key: e }) => e ?? null, yn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ee(e) || /* @__PURE__ */ fe(e) || F(e) ? { i: we, r: e, k: t, f: !!n } : e : null);
function W(e, t = null, n = null, s = 0, r = null, i = e === Ce ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Zi(t),
    ref: t && yn(t),
    scopeId: xi,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: we
  };
  return l ? (zs(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= ee(n) ? 8 : 16), $t > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Ee && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ee.push(c), c;
}
const qe = fc;
function fc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === jl) && (e = tt), Gi(e)) {
    const l = Ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && zs(l, n), $t > 0 && !i && Ee && (l.shapeFlag & 6 ? Ee[Ee.indexOf(e)] = l : Ee.push(l)), l.patchFlag = -2, l;
  }
  if (xc(e) && (e = e.__vccOpts), t) {
    t = dc(t);
    let { class: l, style: c } = t;
    l && !ee(l) && (t.class = Bn(l)), Q(c) && (/* @__PURE__ */ qs(c) && !j(c) && (c = ne({}, c)), t.style = Ms(c));
  }
  const o = ee(e) ? 1 : zi(e) ? 128 : El(e) ? 64 : Q(e) ? 4 : F(e) ? 2 : 0;
  return W(
    e,
    t,
    n,
    s,
    r,
    o,
    i,
    !0
  );
}
function dc(e) {
  return e ? /* @__PURE__ */ qs(e) || ji(e) ? ne({}, e) : e : null;
}
function Ot(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, f = t ? pc(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Zi(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? j(i) ? i.concat(yn(t)) : [i, yn(t)] : yn(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ce ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ot(e.ssContent),
    ssFallback: e.ssFallback && Ot(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && ks(
    a,
    c.clone(a)
  ), a;
}
function vt(e = " ", t = 0) {
  return qe(qn, null, e, t);
}
function Et(e = "", t = !1) {
  return t ? (ie(), ws(tt, null, e)) : qe(tt, null, e);
}
function Ne(e) {
  return e == null || typeof e == "boolean" ? qe(tt) : j(e) ? qe(
    Ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Gi(e) ? et(e) : qe(qn, null, String(e));
}
function et(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ot(e);
}
function zs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (j(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), zs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !ji(t) ? t._ctx = we : r === 3 && we && (we.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else F(t) ? (t = { default: t, _ctx: we }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [vt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function pc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = Bn([t.class, s.class]));
      else if (r === "style")
        t.style = Ms([t.style, s.style]);
      else if (Pn(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(j(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Fe(e, t, n, s = null) {
  He(e, t, 7, [
    n,
    s
  ]);
}
const hc = Mi();
let mc = 0;
function gc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || hc, i = {
    uid: mc++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new No(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Li(s, r),
    emitsOptions: Di(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: K,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: K,
    data: K,
    props: K,
    attrs: K,
    slots: K,
    refs: K,
    setupState: K,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Gl.bind(null, i), e.ce && e.ce(i), i;
}
let le = null;
const yc = () => le || we;
let On, Es;
{
  const e = Fn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  On = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => le = n
  ), Es = t(
    "__VUE_SSR_SETTERS__",
    (n) => en = n
  );
}
const nn = (e) => {
  const t = le;
  return On(e), e.scope.on(), () => {
    e.scope.off(), On(t);
  };
}, gr = () => {
  le && le.scope.off(), On(null);
};
function Ji(e) {
  return e.vnode.shapeFlag & 4;
}
let en = !1;
function bc(e, t = !1, n = !1) {
  t && Es(t);
  const { props: s, children: r } = e.vnode, i = Ji(e);
  $l(e, s, i, t), sc(e, r, n || t);
  const o = i ? Ac(e, t) : void 0;
  return t && Es(!1), o;
}
function Ac(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ll);
  const { setup: s } = n;
  if (s) {
    Ze();
    const r = e.setupContext = s.length > 1 ? Ec(e) : null, i = nn(e), o = tn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Xr(o);
    if (Je(), i(), (l || e.sp) && !Kt(e) && Ii(e), l) {
      if (o.then(gr, gr), t)
        return o.then((c) => {
          yr(e, c);
        }).catch((c) => {
          jn(c, e, 0);
        });
      e.asyncDep = o;
    } else
      yr(e, o);
  } else
    Xi(e);
}
function yr(e, t, n) {
  F(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Q(t) && (e.setupState = bi(t)), Xi(e);
}
function Xi(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Le);
  {
    const r = nn(e);
    Ze();
    try {
      Ul(e);
    } finally {
      Je(), r();
    }
  }
}
const wc = {
  get(e, t) {
    return oe(e, "get", ""), e[t];
  }
};
function Ec(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, wc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Hn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(bi(rl(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Gt)
        return Gt[n](e);
    },
    has(t, n) {
      return n in t || n in Gt;
    }
  })) : e.proxy;
}
function Sc(e, t = !0) {
  return F(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function xc(e) {
  return F(e) && "__vccOpts" in e;
}
const Rc = (e, t) => /* @__PURE__ */ cl(e, t, en), Cc = "3.5.27";
/**
* @vue/runtime-dom v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Ss;
const br = typeof window < "u" && window.trustedTypes;
if (br)
  try {
    Ss = /* @__PURE__ */ br.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Yi = Ss ? (e) => Ss.createHTML(e) : (e) => e, Ic = "http://www.w3.org/2000/svg", Oc = "http://www.w3.org/1998/Math/MathML", ze = typeof document < "u" ? document : null, Ar = ze && /* @__PURE__ */ ze.createElement("template"), vc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? ze.createElementNS(Ic, e) : t === "mathml" ? ze.createElementNS(Oc, e) : n ? ze.createElement(e, { is: n }) : ze.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => ze.createTextNode(e),
  createComment: (e) => ze.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ze.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, i) {
    const o = n ? n.previousSibling : t.lastChild;
    if (r && (r === i || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)); )
        ;
    else {
      Ar.innerHTML = Yi(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = Ar.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Tc = /* @__PURE__ */ Symbol("_vtc");
function Pc(e, t, n) {
  const s = e[Tc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const vn = /* @__PURE__ */ Symbol("_vod"), Qi = /* @__PURE__ */ Symbol("_vsh"), pn = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[vn] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Ut(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), Ut(e, !0), s.enter(e)) : s.leave(e, () => {
      Ut(e, !1);
    }) : Ut(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ut(e, t);
  }
};
function Ut(e, t) {
  e.style.display = t ? e[vn] : "none", e[Qi] = !t;
}
const _c = /* @__PURE__ */ Symbol(""), Mc = /(?:^|;)\s*display\s*:/;
function Dc(e, t, n) {
  const s = e.style, r = ee(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (ee(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && bn(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && bn(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), bn(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[_c];
      o && (n += ";" + o), s.cssText = n, i = Mc.test(n);
    }
  } else t && e.removeAttribute("style");
  vn in e && (e[vn] = i ? s.display : "", e[Qi] && (s.display = "none"));
}
const wr = /\s*!important$/;
function bn(e, t, n) {
  if (j(n))
    n.forEach((s) => bn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Fc(e, t);
    wr.test(n) ? e.setProperty(
      ht(s),
      n.replace(wr, ""),
      "important"
    ) : e[s] = n;
  }
}
const Er = ["Webkit", "Moz", "ms"], rs = {};
function Fc(e, t) {
  const n = rs[t];
  if (n)
    return n;
  let s = xe(t);
  if (s !== "filter" && s in e)
    return rs[t] = s;
  s = Dn(s);
  for (let r = 0; r < Er.length; r++) {
    const i = Er[r] + s;
    if (i in e)
      return rs[t] = i;
  }
  return t;
}
const Sr = "http://www.w3.org/1999/xlink";
function xr(e, t, n, s, r, i = jo(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Sr, t.slice(6, t.length)) : e.setAttributeNS(Sr, t, n) : n == null || i && !ei(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : nt(n) ? String(n) : n
  );
}
function Rr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Yi(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = ei(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function wt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Bc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Cr = /* @__PURE__ */ Symbol("_vei");
function jc(e, t, n, s, r = null) {
  const i = e[Cr] || (e[Cr] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = Nc(t);
    if (s) {
      const f = i[t] = qc(
        s,
        r
      );
      wt(e, l, f, c);
    } else o && (Bc(e, l, o, c), i[t] = void 0);
  }
}
const Ir = /(?:Once|Passive|Capture)$/;
function Nc(e) {
  let t;
  if (Ir.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ir); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : ht(e.slice(2)), t];
}
let is = 0;
const Lc = /* @__PURE__ */ Promise.resolve(), Uc = () => is || (Lc.then(() => is = 0), is = Date.now());
function qc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    He(
      Hc(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = Uc(), n;
}
function Hc(e, t) {
  if (j(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (r) => !r._stopped && s && s(r)
    );
  } else
    return t;
}
const Or = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, kc = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? Pc(e, s, o) : t === "style" ? Dc(e, n, s) : Pn(t) ? vs(t) || jc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Wc(e, t, s, o)) ? (Rr(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xr(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ee(s)) ? Rr(e, xe(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), xr(e, t, s, o));
};
function Wc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Or(t) && F(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Or(t) && ee(n) ? !1 : t in e;
}
const vr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return j(t) ? (n) => mn(t, n) : t;
};
function Vc(e) {
  e.target.composing = !0;
}
function Tr(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const os = /* @__PURE__ */ Symbol("_assign");
function Pr(e, t, n) {
  return t && (e = e.trim()), n && (e = _s(e)), e;
}
const zc = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[os] = vr(r);
    const i = s || r.props && r.props.type === "number";
    wt(e, t ? "change" : "input", (o) => {
      o.target.composing || e[os](Pr(e.value, n, i));
    }), (n || i) && wt(e, "change", () => {
      e.value = Pr(e.value, n, i);
    }), t || (wt(e, "compositionstart", Vc), wt(e, "compositionend", Tr), wt(e, "change", Tr));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[os] = vr(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? _s(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c));
  }
}, Kc = ["ctrl", "shift", "alt", "meta"], Gc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Kc.some((n) => e[`${n}Key`] && !t.includes(n))
}, $i = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Gc[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  });
}, Zc = /* @__PURE__ */ ne({ patchProp: kc }, vc);
let _r;
function Jc() {
  return _r || (_r = ic(Zc));
}
const Xc = (...e) => {
  const t = Jc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = Qc(s);
    if (!r) return;
    const i = t._component;
    !F(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, Yc(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function Yc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Qc(e) {
  return ee(e) ? document.querySelector(e) : e;
}
function eo(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: $c } = Object.prototype, { getPrototypeOf: Ks } = Object, { iterator: kn, toStringTag: to } = Symbol, Wn = /* @__PURE__ */ ((e) => (t) => {
  const n = $c.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Oe = (e) => (e = e.toLowerCase(), (t) => Wn(t) === e), Vn = (e) => (t) => typeof t === e, { isArray: Pt } = Array, Tt = Vn("undefined");
function sn(e) {
  return e !== null && !Tt(e) && e.constructor !== null && !Tt(e.constructor) && me(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const no = Oe("ArrayBuffer");
function ea(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && no(e.buffer), t;
}
const ta = Vn("string"), me = Vn("function"), so = Vn("number"), rn = (e) => e !== null && typeof e == "object", na = (e) => e === !0 || e === !1, An = (e) => {
  if (Wn(e) !== "object")
    return !1;
  const t = Ks(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(to in e) && !(kn in e);
}, sa = (e) => {
  if (!rn(e) || sn(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, ra = Oe("Date"), ia = Oe("File"), oa = Oe("Blob"), la = Oe("FileList"), ca = (e) => rn(e) && me(e.pipe), aa = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || me(e.append) && ((t = Wn(e)) === "formdata" || // detect form-data instance
  t === "object" && me(e.toString) && e.toString() === "[object FormData]"));
}, ua = Oe("URLSearchParams"), [fa, da, pa, ha] = ["ReadableStream", "Request", "Response", "Headers"].map(Oe), ma = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function on(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), Pt(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    if (sn(e))
      return;
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = i.length;
    let l;
    for (s = 0; s < o; s++)
      l = i[s], t.call(null, e[l], l, e);
  }
}
function ro(e, t) {
  if (sn(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const ot = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, io = (e) => !Tt(e) && e !== ot;
function xs() {
  const { caseless: e, skipUndefined: t } = io(this) && this || {}, n = {}, s = (r, i) => {
    const o = e && ro(n, i) || i;
    An(n[o]) && An(r) ? n[o] = xs(n[o], r) : An(r) ? n[o] = xs({}, r) : Pt(r) ? n[o] = r.slice() : (!t || !Tt(r)) && (n[o] = r);
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && on(arguments[r], s);
  return n;
}
const ga = (e, t, n, { allOwnKeys: s } = {}) => (on(t, (r, i) => {
  n && me(r) ? e[i] = eo(r, n) : e[i] = r;
}, { allOwnKeys: s }), e), ya = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), ba = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Aa = (e, t, n, s) => {
  let r, i, o;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), i = r.length; i-- > 0; )
      o = r[i], (!s || s(o, e, t)) && !l[o] && (t[o] = e[o], l[o] = !0);
    e = n !== !1 && Ks(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, wa = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, Ea = (e) => {
  if (!e) return null;
  if (Pt(e)) return e;
  let t = e.length;
  if (!so(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Sa = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ks(Uint8Array)), xa = (e, t) => {
  const s = (e && e[kn]).call(e);
  let r;
  for (; (r = s.next()) && !r.done; ) {
    const i = r.value;
    t.call(e, i[0], i[1]);
  }
}, Ra = (e, t) => {
  let n;
  const s = [];
  for (; (n = e.exec(t)) !== null; )
    s.push(n);
  return s;
}, Ca = Oe("HTMLFormElement"), Ia = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), Mr = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Oa = Oe("RegExp"), oo = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  on(n, (r, i) => {
    let o;
    (o = t(r, i, e)) !== !1 && (s[i] = o || r);
  }), Object.defineProperties(e, s);
}, va = (e) => {
  oo(e, (t, n) => {
    if (me(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (me(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, Ta = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((i) => {
      n[i] = !0;
    });
  };
  return Pt(e) ? s(e) : s(String(e).split(t)), n;
}, Pa = () => {
}, _a = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Ma(e) {
  return !!(e && me(e.append) && e[to] === "FormData" && e[kn]);
}
const Da = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (rn(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (sn(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const i = Pt(s) ? [] : {};
        return on(s, (o, l) => {
          const c = n(o, r + 1);
          !Tt(c) && (i[l] = c);
        }), t[r] = void 0, i;
      }
    }
    return s;
  };
  return n(e, 0);
}, Fa = Oe("AsyncFunction"), Ba = (e) => e && (rn(e) || me(e)) && me(e.then) && me(e.catch), lo = ((e, t) => e ? setImmediate : t ? ((n, s) => (ot.addEventListener("message", ({ source: r, data: i }) => {
  r === ot && i === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), ot.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  me(ot.postMessage)
), ja = typeof queueMicrotask < "u" ? queueMicrotask.bind(ot) : typeof process < "u" && process.nextTick || lo, Na = (e) => e != null && me(e[kn]), h = {
  isArray: Pt,
  isArrayBuffer: no,
  isBuffer: sn,
  isFormData: aa,
  isArrayBufferView: ea,
  isString: ta,
  isNumber: so,
  isBoolean: na,
  isObject: rn,
  isPlainObject: An,
  isEmptyObject: sa,
  isReadableStream: fa,
  isRequest: da,
  isResponse: pa,
  isHeaders: ha,
  isUndefined: Tt,
  isDate: ra,
  isFile: ia,
  isBlob: oa,
  isRegExp: Oa,
  isFunction: me,
  isStream: ca,
  isURLSearchParams: ua,
  isTypedArray: Sa,
  isFileList: la,
  forEach: on,
  merge: xs,
  extend: ga,
  trim: ma,
  stripBOM: ya,
  inherits: ba,
  toFlatObject: Aa,
  kindOf: Wn,
  kindOfTest: Oe,
  endsWith: wa,
  toArray: Ea,
  forEachEntry: xa,
  matchAll: Ra,
  isHTMLForm: Ca,
  hasOwnProperty: Mr,
  hasOwnProp: Mr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: oo,
  freezeMethods: va,
  toObjectSet: Ta,
  toCamelCase: Ia,
  noop: Pa,
  toFiniteNumber: _a,
  findKey: ro,
  global: ot,
  isContextDefined: io,
  isSpecCompliantForm: Ma,
  toJSONObject: Da,
  isAsyncFn: Fa,
  isThenable: Ba,
  setImmediate: lo,
  asap: ja,
  isIterable: Na
};
function B(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
h.inherits(B, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: h.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const co = B.prototype, ao = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  ao[e] = { value: e };
});
Object.defineProperties(B, ao);
Object.defineProperty(co, "isAxiosError", { value: !0 });
B.from = (e, t, n, s, r, i) => {
  const o = Object.create(co);
  h.toFlatObject(e, o, function(a) {
    return a !== Error.prototype;
  }, (f) => f !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", c = t == null && e ? e.code : t;
  return B.call(o, l, c, n, s, r), e && o.cause == null && Object.defineProperty(o, "cause", { value: e, configurable: !0 }), o.name = e && e.name || "Error", i && Object.assign(o, i), o;
};
const La = null;
function Rs(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function uo(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Dr(e, t, n) {
  return e ? e.concat(t).map(function(r, i) {
    return r = uo(r), !n && i ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function Ua(e) {
  return h.isArray(e) && !e.some(Rs);
}
const qa = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function zn(e, t, n) {
  if (!h.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = h.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, C) {
    return !h.isUndefined(C[S]);
  });
  const s = n.metaTokens, r = n.visitor || a, i = n.dots, o = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && h.isSpecCompliantForm(t);
  if (!h.isFunction(r))
    throw new TypeError("visitor must be a function");
  function f(g) {
    if (g === null) return "";
    if (h.isDate(g))
      return g.toISOString();
    if (h.isBoolean(g))
      return g.toString();
    if (!c && h.isBlob(g))
      throw new B("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(g) || h.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function a(g, S, C) {
    let _ = g;
    if (g && !C && typeof g == "object") {
      if (h.endsWith(S, "{}"))
        S = s ? S : S.slice(0, -2), g = JSON.stringify(g);
      else if (h.isArray(g) && Ua(g) || (h.isFileList(g) || h.endsWith(S, "[]")) && (_ = h.toArray(g)))
        return S = uo(S), _.forEach(function(N, T) {
          !(h.isUndefined(N) || N === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Dr([S], T, i) : o === null ? S : S + "[]",
            f(N)
          );
        }), !1;
    }
    return Rs(g) ? !0 : (t.append(Dr(C, S, i), f(g)), !1);
  }
  const p = [], E = Object.assign(qa, {
    defaultVisitor: a,
    convertValue: f,
    isVisitable: Rs
  });
  function O(g, S) {
    if (!h.isUndefined(g)) {
      if (p.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      p.push(g), h.forEach(g, function(_, L) {
        (!(h.isUndefined(_) || _ === null) && r.call(
          t,
          _,
          h.isString(L) ? L.trim() : L,
          S,
          E
        )) === !0 && O(_, S ? S.concat(L) : [L]);
      }), p.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return O(e), t;
}
function Fr(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(s) {
    return t[s];
  });
}
function Gs(e, t) {
  this._pairs = [], e && zn(e, this, t);
}
const fo = Gs.prototype;
fo.append = function(t, n) {
  this._pairs.push([t, n]);
};
fo.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, Fr);
  } : Fr;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function Ha(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function po(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || Ha;
  h.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let i;
  if (r ? i = r(t, n) : i = h.isURLSearchParams(t) ? t.toString() : new Gs(t, n).toString(s), i) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Br {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, s) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: s ? s.synchronous : !1,
      runWhen: s ? s.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    h.forEach(this.handlers, function(s) {
      s !== null && t(s);
    });
  }
}
const ho = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, ka = typeof URLSearchParams < "u" ? URLSearchParams : Gs, Wa = typeof FormData < "u" ? FormData : null, Va = typeof Blob < "u" ? Blob : null, za = {
  isBrowser: !0,
  classes: {
    URLSearchParams: ka,
    FormData: Wa,
    Blob: Va
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Zs = typeof window < "u" && typeof document < "u", Cs = typeof navigator == "object" && navigator || void 0, Ka = Zs && (!Cs || ["ReactNative", "NativeScript", "NS"].indexOf(Cs.product) < 0), Ga = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Za = Zs && window.location.href || "http://localhost", Ja = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Zs,
  hasStandardBrowserEnv: Ka,
  hasStandardBrowserWebWorkerEnv: Ga,
  navigator: Cs,
  origin: Za
}, Symbol.toStringTag, { value: "Module" })), ce = {
  ...Ja,
  ...za
};
function Xa(e, t) {
  return zn(e, new ce.classes.URLSearchParams(), {
    visitor: function(n, s, r, i) {
      return ce.isNode && h.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function Ya(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Qa(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let i;
  for (s = 0; s < r; s++)
    i = n[s], t[i] = e[i];
  return t;
}
function mo(e) {
  function t(n, s, r, i) {
    let o = n[i++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), c = i >= n.length;
    return o = !o && h.isArray(r) ? r.length : o, c ? (h.hasOwnProp(r, o) ? r[o] = [r[o], s] : r[o] = s, !l) : ((!r[o] || !h.isObject(r[o])) && (r[o] = []), t(n, s, r[o], i) && h.isArray(r[o]) && (r[o] = Qa(r[o])), !l);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const n = {};
    return h.forEachEntry(e, (s, r) => {
      t(Ya(s), r, n, 0);
    }), n;
  }
  return null;
}
function $a(e, t, n) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const ln = {
  transitional: ho,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, i = h.isObject(t);
    if (i && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return r ? JSON.stringify(mo(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t) || h.isReadableStream(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (i) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return Xa(t, this.formSerializer).toString();
      if ((l = h.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return zn(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return i || r ? (n.setContentType("application/json", !1), $a(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || ln.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (h.isResponse(t) || h.isReadableStream(t))
      return t;
    if (t && h.isString(t) && (s && !this.responseType || r)) {
      const o = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? B.from(l, B.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ce.classes.FormData,
    Blob: ce.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
h.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  ln.headers[e] = {};
});
const eu = h.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), tu = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(o) {
    r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), s = o.substring(r + 1).trim(), !(!n || t[n] && eu[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, jr = Symbol("internals");
function qt(e) {
  return e && String(e).trim().toLowerCase();
}
function wn(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(wn) : String(e);
}
function nu(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const su = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ls(e, t, n, s, r) {
  if (h.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!h.isString(t)) {
    if (h.isString(s))
      return t.indexOf(s) !== -1;
    if (h.isRegExp(s))
      return s.test(t);
  }
}
function ru(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function iu(e, t) {
  const n = h.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((s) => {
    Object.defineProperty(e, s + n, {
      value: function(r, i, o) {
        return this[s].call(this, t, r, i, o);
      },
      configurable: !0
    });
  });
}
let ge = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, s) {
    const r = this;
    function i(l, c, f) {
      const a = qt(c);
      if (!a)
        throw new Error("header name must be a non-empty string");
      const p = h.findKey(r, a);
      (!p || r[p] === void 0 || f === !0 || f === void 0 && r[p] !== !1) && (r[p || c] = wn(l));
    }
    const o = (l, c) => h.forEach(l, (f, a) => i(f, a, c));
    if (h.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (h.isString(t) && (t = t.trim()) && !su(t))
      o(tu(t), n);
    else if (h.isObject(t) && h.isIterable(t)) {
      let l = {}, c, f;
      for (const a of t) {
        if (!h.isArray(a))
          throw TypeError("Object iterator must return a key-value pair");
        l[f = a[0]] = (c = l[f]) ? h.isArray(c) ? [...c, a[1]] : [c, a[1]] : a[1];
      }
      o(l, n);
    } else
      t != null && i(n, t, s);
    return this;
  }
  get(t, n) {
    if (t = qt(t), t) {
      const s = h.findKey(this, t);
      if (s) {
        const r = this[s];
        if (!n)
          return r;
        if (n === !0)
          return nu(r);
        if (h.isFunction(n))
          return n.call(this, r, s);
        if (h.isRegExp(n))
          return n.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = qt(t), t) {
      const s = h.findKey(this, t);
      return !!(s && this[s] !== void 0 && (!n || ls(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function i(o) {
      if (o = qt(o), o) {
        const l = h.findKey(s, o);
        l && (!n || ls(s, s[l], l, n)) && (delete s[l], r = !0);
      }
    }
    return h.isArray(t) ? t.forEach(i) : i(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const i = n[s];
      (!t || ls(this, this[i], i, t, !0)) && (delete this[i], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return h.forEach(this, (r, i) => {
      const o = h.findKey(s, i);
      if (o) {
        n[o] = wn(r), delete n[i];
        return;
      }
      const l = t ? ru(i) : String(i).trim();
      l !== i && delete n[i], n[l] = wn(r), s[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return h.forEach(this, (s, r) => {
      s != null && s !== !1 && (n[r] = t && h.isArray(s) ? s.join(", ") : s);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const s = new this(t);
    return n.forEach((r) => s.set(r)), s;
  }
  static accessor(t) {
    const s = (this[jr] = this[jr] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function i(o) {
      const l = qt(o);
      s[l] || (iu(r, o), s[l] = !0);
    }
    return h.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
ge.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
h.reduceDescriptors(ge.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
h.freezeMethods(ge);
function cs(e, t) {
  const n = this || ln, s = t || n, r = ge.from(s.headers);
  let i = s.data;
  return h.forEach(e, function(l) {
    i = l.call(n, i, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), i;
}
function go(e) {
  return !!(e && e.__CANCEL__);
}
function _t(e, t, n) {
  B.call(this, e ?? "canceled", B.ERR_CANCELED, t, n), this.name = "CanceledError";
}
h.inherits(_t, B, {
  __CANCEL__: !0
});
function yo(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new B(
    "Request failed with status code " + n.status,
    [B.ERR_BAD_REQUEST, B.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function ou(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function lu(e, t) {
  e = e || 10;
  const n = new Array(e), s = new Array(e);
  let r = 0, i = 0, o;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const f = Date.now(), a = s[i];
    o || (o = f), n[r] = c, s[r] = f;
    let p = i, E = 0;
    for (; p !== r; )
      E += n[p++], p = p % e;
    if (r = (r + 1) % e, r === i && (i = (i + 1) % e), f - o < t)
      return;
    const O = a && f - a;
    return O ? Math.round(E * 1e3 / O) : void 0;
  };
}
function cu(e, t) {
  let n = 0, s = 1e3 / t, r, i;
  const o = (f, a = Date.now()) => {
    n = a, r = null, i && (clearTimeout(i), i = null), e(...f);
  };
  return [(...f) => {
    const a = Date.now(), p = a - n;
    p >= s ? o(f, a) : (r = f, i || (i = setTimeout(() => {
      i = null, o(r);
    }, s - p)));
  }, () => r && o(r)];
}
const Tn = (e, t, n = 3) => {
  let s = 0;
  const r = lu(50, 250);
  return cu((i) => {
    const o = i.loaded, l = i.lengthComputable ? i.total : void 0, c = o - s, f = r(c), a = o <= l;
    s = o;
    const p = {
      loaded: o,
      total: l,
      progress: l ? o / l : void 0,
      bytes: c,
      rate: f || void 0,
      estimated: f && l && a ? (l - o) / f : void 0,
      event: i,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, Nr = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, Lr = (e) => (...t) => h.asap(() => e(...t)), au = ce.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ce.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ce.origin),
  ce.navigator && /(msie|trident)/i.test(ce.navigator.userAgent)
) : () => !0, uu = ce.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, s, r, i, o) {
      if (typeof document > "u") return;
      const l = [`${e}=${encodeURIComponent(t)}`];
      h.isNumber(n) && l.push(`expires=${new Date(n).toUTCString()}`), h.isString(s) && l.push(`path=${s}`), h.isString(r) && l.push(`domain=${r}`), i === !0 && l.push("secure"), h.isString(o) && l.push(`SameSite=${o}`), document.cookie = l.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const t = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function fu(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function du(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function bo(e, t, n) {
  let s = !fu(t);
  return e && (s || n == !1) ? du(e, t) : t;
}
const Ur = (e) => e instanceof ge ? { ...e } : e;
function pt(e, t) {
  t = t || {};
  const n = {};
  function s(f, a, p, E) {
    return h.isPlainObject(f) && h.isPlainObject(a) ? h.merge.call({ caseless: E }, f, a) : h.isPlainObject(a) ? h.merge({}, a) : h.isArray(a) ? a.slice() : a;
  }
  function r(f, a, p, E) {
    if (h.isUndefined(a)) {
      if (!h.isUndefined(f))
        return s(void 0, f, p, E);
    } else return s(f, a, p, E);
  }
  function i(f, a) {
    if (!h.isUndefined(a))
      return s(void 0, a);
  }
  function o(f, a) {
    if (h.isUndefined(a)) {
      if (!h.isUndefined(f))
        return s(void 0, f);
    } else return s(void 0, a);
  }
  function l(f, a, p) {
    if (p in t)
      return s(f, a);
    if (p in e)
      return s(void 0, f);
  }
  const c = {
    url: i,
    method: i,
    data: i,
    baseURL: o,
    transformRequest: o,
    transformResponse: o,
    paramsSerializer: o,
    timeout: o,
    timeoutMessage: o,
    withCredentials: o,
    withXSRFToken: o,
    adapter: o,
    responseType: o,
    xsrfCookieName: o,
    xsrfHeaderName: o,
    onUploadProgress: o,
    onDownloadProgress: o,
    decompress: o,
    maxContentLength: o,
    maxBodyLength: o,
    beforeRedirect: o,
    transport: o,
    httpAgent: o,
    httpsAgent: o,
    cancelToken: o,
    socketPath: o,
    responseEncoding: o,
    validateStatus: l,
    headers: (f, a, p) => r(Ur(f), Ur(a), p, !0)
  };
  return h.forEach(Object.keys({ ...e, ...t }), function(a) {
    const p = c[a] || r, E = p(e[a], t[a], a);
    h.isUndefined(E) && p !== l || (n[a] = E);
  }), n;
}
const Ao = (e) => {
  const t = pt({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: i, headers: o, auth: l } = t;
  if (t.headers = o = ge.from(o), t.url = po(bo(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), h.isFormData(n)) {
    if (ce.hasStandardBrowserEnv || ce.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (h.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([a, p]) => {
        f.includes(a.toLowerCase()) && o.set(a, p);
      });
    }
  }
  if (ce.hasStandardBrowserEnv && (s && h.isFunction(s) && (s = s(t)), s || s !== !1 && au(t.url))) {
    const c = r && i && uu.read(i);
    c && o.set(r, c);
  }
  return t;
}, pu = typeof XMLHttpRequest < "u", hu = pu && function(e) {
  return new Promise(function(n, s) {
    const r = Ao(e);
    let i = r.data;
    const o = ge.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: f } = r, a, p, E, O, g;
    function S() {
      O && O(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(a), r.signal && r.signal.removeEventListener("abort", a);
    }
    let C = new XMLHttpRequest();
    C.open(r.method.toUpperCase(), r.url, !0), C.timeout = r.timeout;
    function _() {
      if (!C)
        return;
      const N = ge.from(
        "getAllResponseHeaders" in C && C.getAllResponseHeaders()
      ), H = {
        data: !l || l === "text" || l === "json" ? C.responseText : C.response,
        status: C.status,
        statusText: C.statusText,
        headers: N,
        config: e,
        request: C
      };
      yo(function(Y) {
        n(Y), S();
      }, function(Y) {
        s(Y), S();
      }, H), C = null;
    }
    "onloadend" in C ? C.onloadend = _ : C.onreadystatechange = function() {
      !C || C.readyState !== 4 || C.status === 0 && !(C.responseURL && C.responseURL.indexOf("file:") === 0) || setTimeout(_);
    }, C.onabort = function() {
      C && (s(new B("Request aborted", B.ECONNABORTED, e, C)), C = null);
    }, C.onerror = function(T) {
      const H = T && T.message ? T.message : "Network Error", se = new B(H, B.ERR_NETWORK, e, C);
      se.event = T || null, s(se), C = null;
    }, C.ontimeout = function() {
      let T = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const H = r.transitional || ho;
      r.timeoutErrorMessage && (T = r.timeoutErrorMessage), s(new B(
        T,
        H.clarifyTimeoutError ? B.ETIMEDOUT : B.ECONNABORTED,
        e,
        C
      )), C = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in C && h.forEach(o.toJSON(), function(T, H) {
      C.setRequestHeader(H, T);
    }), h.isUndefined(r.withCredentials) || (C.withCredentials = !!r.withCredentials), l && l !== "json" && (C.responseType = r.responseType), f && ([E, g] = Tn(f, !0), C.addEventListener("progress", E)), c && C.upload && ([p, O] = Tn(c), C.upload.addEventListener("progress", p), C.upload.addEventListener("loadend", O)), (r.cancelToken || r.signal) && (a = (N) => {
      C && (s(!N || N.type ? new _t(null, e, C) : N), C.abort(), C = null);
    }, r.cancelToken && r.cancelToken.subscribe(a), r.signal && (r.signal.aborted ? a() : r.signal.addEventListener("abort", a)));
    const L = ou(r.url);
    if (L && ce.protocols.indexOf(L) === -1) {
      s(new B("Unsupported protocol " + L + ":", B.ERR_BAD_REQUEST, e));
      return;
    }
    C.send(i || null);
  });
}, mu = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const i = function(f) {
      if (!r) {
        r = !0, l();
        const a = f instanceof Error ? f : this.reason;
        s.abort(a instanceof B ? a : new _t(a instanceof Error ? a.message : a));
      }
    };
    let o = t && setTimeout(() => {
      o = null, i(new B(`timeout ${t} of ms exceeded`, B.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((f) => {
        f.unsubscribe ? f.unsubscribe(i) : f.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((f) => f.addEventListener("abort", i));
    const { signal: c } = s;
    return c.unsubscribe = () => h.asap(l), c;
  }
}, gu = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, yu = async function* (e, t) {
  for await (const n of bu(e))
    yield* gu(n, t);
}, bu = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: s } = await t.read();
      if (n)
        break;
      yield s;
    }
  } finally {
    await t.cancel();
  }
}, qr = (e, t, n, s) => {
  const r = yu(e, t);
  let i = 0, o, l = (c) => {
    o || (o = !0, s && s(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: f, value: a } = await r.next();
        if (f) {
          l(), c.close();
          return;
        }
        let p = a.byteLength;
        if (n) {
          let E = i += p;
          n(E);
        }
        c.enqueue(new Uint8Array(a));
      } catch (f) {
        throw l(f), f;
      }
    },
    cancel(c) {
      return l(c), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, Hr = 64 * 1024, { isFunction: hn } = h, Au = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(h.global), {
  ReadableStream: kr,
  TextEncoder: Wr
} = h.global, Vr = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, wu = (e) => {
  e = h.merge.call({
    skipUndefined: !0
  }, Au, e);
  const { fetch: t, Request: n, Response: s } = e, r = t ? hn(t) : typeof fetch == "function", i = hn(n), o = hn(s);
  if (!r)
    return !1;
  const l = r && hn(kr), c = r && (typeof Wr == "function" ? /* @__PURE__ */ ((g) => (S) => g.encode(S))(new Wr()) : async (g) => new Uint8Array(await new n(g).arrayBuffer())), f = i && l && Vr(() => {
    let g = !1;
    const S = new n(ce.origin, {
      body: new kr(),
      method: "POST",
      get duplex() {
        return g = !0, "half";
      }
    }).headers.has("Content-Type");
    return g && !S;
  }), a = o && l && Vr(() => h.isReadableStream(new s("").body)), p = {
    stream: a && ((g) => g.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
    !p[g] && (p[g] = (S, C) => {
      let _ = S && S[g];
      if (_)
        return _.call(S);
      throw new B(`Response type '${g}' is not supported`, B.ERR_NOT_SUPPORT, C);
    });
  });
  const E = async (g) => {
    if (g == null)
      return 0;
    if (h.isBlob(g))
      return g.size;
    if (h.isSpecCompliantForm(g))
      return (await new n(ce.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (h.isArrayBufferView(g) || h.isArrayBuffer(g))
      return g.byteLength;
    if (h.isURLSearchParams(g) && (g = g + ""), h.isString(g))
      return (await c(g)).byteLength;
  }, O = async (g, S) => {
    const C = h.toFiniteNumber(g.getContentLength());
    return C ?? E(S);
  };
  return async (g) => {
    let {
      url: S,
      method: C,
      data: _,
      signal: L,
      cancelToken: N,
      timeout: T,
      onDownloadProgress: H,
      onUploadProgress: se,
      responseType: Y,
      headers: Se,
      withCredentials: ke = "same-origin",
      fetchOptions: ve
    } = Ao(g), Ye = t || fetch;
    Y = Y ? (Y + "").toLowerCase() : "text";
    let We = mu([L, N && N.toAbortSignal()], T), Te = null;
    const Re = We && We.unsubscribe && (() => {
      We.unsubscribe();
    });
    let Mt;
    try {
      if (se && f && C !== "get" && C !== "head" && (Mt = await O(Se, _)) !== 0) {
        let re = new n(S, {
          method: "POST",
          body: _,
          duplex: "half"
        }), te;
        if (h.isFormData(_) && (te = re.headers.get("content-type")) && Se.setContentType(te), re.body) {
          const [gt, yt] = Nr(
            Mt,
            Tn(Lr(se))
          );
          _ = qr(re.body, Hr, gt, yt);
        }
      }
      h.isString(ke) || (ke = ke ? "include" : "omit");
      const G = i && "credentials" in n.prototype, Z = {
        ...ve,
        signal: We,
        method: C.toUpperCase(),
        headers: Se.normalize().toJSON(),
        body: _,
        duplex: "half",
        credentials: G ? ke : void 0
      };
      Te = i && new n(S, Z);
      let U = await (i ? Ye(Te, ve) : Ye(S, Z));
      const Pe = a && (Y === "stream" || Y === "response");
      if (a && (H || Pe && Re)) {
        const re = {};
        ["status", "statusText", "headers"].forEach((cn) => {
          re[cn] = U[cn];
        });
        const te = h.toFiniteNumber(U.headers.get("content-length")), [gt, yt] = H && Nr(
          te,
          Tn(Lr(H), !0)
        ) || [];
        U = new s(
          qr(U.body, Hr, gt, () => {
            yt && yt(), Re && Re();
          }),
          re
        );
      }
      Y = Y || "text";
      let mt = await p[h.findKey(p, Y) || "text"](U, g);
      return !Pe && Re && Re(), await new Promise((re, te) => {
        yo(re, te, {
          data: mt,
          headers: ge.from(U.headers),
          status: U.status,
          statusText: U.statusText,
          config: g,
          request: Te
        });
      });
    } catch (G) {
      throw Re && Re(), G && G.name === "TypeError" && /Load failed|fetch/i.test(G.message) ? Object.assign(
        new B("Network Error", B.ERR_NETWORK, g, Te),
        {
          cause: G.cause || G
        }
      ) : B.from(G, G && G.code, g, Te);
    }
  };
}, Eu = /* @__PURE__ */ new Map(), wo = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, i = [
    s,
    r,
    n
  ];
  let o = i.length, l = o, c, f, a = Eu;
  for (; l--; )
    c = i[l], f = a.get(c), f === void 0 && a.set(c, f = l ? /* @__PURE__ */ new Map() : wu(t)), a = f;
  return f;
};
wo();
const Js = {
  http: La,
  xhr: hu,
  fetch: {
    get: wo
  }
};
h.forEach(Js, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const zr = (e) => `- ${e}`, Su = (e) => h.isFunction(e) || e === null || e === !1;
function xu(e, t) {
  e = h.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const i = {};
  for (let o = 0; o < n; o++) {
    s = e[o];
    let l;
    if (r = s, !Su(s) && (r = Js[(l = String(s)).toLowerCase()], r === void 0))
      throw new B(`Unknown adapter '${l}'`);
    if (r && (h.isFunction(r) || (r = r.get(t))))
      break;
    i[l || "#" + o] = r;
  }
  if (!r) {
    const o = Object.entries(i).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = n ? o.length > 1 ? `since :
` + o.map(zr).join(`
`) : " " + zr(o[0]) : "as no adapter specified";
    throw new B(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const Eo = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: xu,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Js
};
function as(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new _t(null, e);
}
function Kr(e) {
  return as(e), e.headers = ge.from(e.headers), e.data = cs.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Eo.getAdapter(e.adapter || ln.adapter, e)(e).then(function(s) {
    return as(e), s.data = cs.call(
      e,
      e.transformResponse,
      s
    ), s.headers = ge.from(s.headers), s;
  }, function(s) {
    return go(s) || (as(e), s && s.response && (s.response.data = cs.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = ge.from(s.response.headers))), Promise.reject(s);
  });
}
const So = "1.13.2", Kn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Kn[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Gr = {};
Kn.transitional = function(t, n, s) {
  function r(i, o) {
    return "[Axios v" + So + "] Transitional option '" + i + "'" + o + (s ? ". " + s : "");
  }
  return (i, o, l) => {
    if (t === !1)
      throw new B(
        r(o, " has been removed" + (n ? " in " + n : "")),
        B.ERR_DEPRECATED
      );
    return n && !Gr[o] && (Gr[o] = !0, console.warn(
      r(
        o,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, o, l) : !0;
  };
};
Kn.spelling = function(t) {
  return (n, s) => (console.warn(`${s} is likely a misspelling of ${t}`), !0);
};
function Ru(e, t, n) {
  if (typeof e != "object")
    throw new B("options must be an object", B.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const i = s[r], o = t[i];
    if (o) {
      const l = e[i], c = l === void 0 || o(l, i, e);
      if (c !== !0)
        throw new B("option " + i + " must be " + c, B.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new B("Unknown option " + i, B.ERR_BAD_OPTION);
  }
}
const En = {
  assertOptions: Ru,
  validators: Kn
}, Be = En.validators;
let ut = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Br(),
      response: new Br()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (s) {
      if (s instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const i = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          s.stack ? i && !String(s.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (s.stack += `
` + i) : s.stack = i;
        } catch {
        }
      }
      throw s;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = pt(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: i } = n;
    s !== void 0 && En.assertOptions(s, {
      silentJSONParsing: Be.transitional(Be.boolean),
      forcedJSONParsing: Be.transitional(Be.boolean),
      clarifyTimeoutError: Be.transitional(Be.boolean)
    }, !1), r != null && (h.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : En.assertOptions(r, {
      encode: Be.function,
      serialize: Be.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), En.assertOptions(n, {
      baseUrl: Be.spelling("baseURL"),
      withXsrfToken: Be.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let o = i && h.merge(
      i.common,
      i[n.method]
    );
    i && h.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (g) => {
        delete i[g];
      }
    ), n.headers = ge.concat(o, i);
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(n) === !1 || (c = c && S.synchronous, l.unshift(S.fulfilled, S.rejected));
    });
    const f = [];
    this.interceptors.response.forEach(function(S) {
      f.push(S.fulfilled, S.rejected);
    });
    let a, p = 0, E;
    if (!c) {
      const g = [Kr.bind(this), void 0];
      for (g.unshift(...l), g.push(...f), E = g.length, a = Promise.resolve(n); p < E; )
        a = a.then(g[p++], g[p++]);
      return a;
    }
    E = l.length;
    let O = n;
    for (; p < E; ) {
      const g = l[p++], S = l[p++];
      try {
        O = g(O);
      } catch (C) {
        S.call(this, C);
        break;
      }
    }
    try {
      a = Kr.call(this, O);
    } catch (g) {
      return Promise.reject(g);
    }
    for (p = 0, E = f.length; p < E; )
      a = a.then(f[p++], f[p++]);
    return a;
  }
  getUri(t) {
    t = pt(this.defaults, t);
    const n = bo(t.baseURL, t.url, t.allowAbsoluteUrls);
    return po(n, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  ut.prototype[t] = function(n, s) {
    return this.request(pt(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(i, o, l) {
      return this.request(pt(l || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }));
    };
  }
  ut.prototype[t] = n(), ut.prototype[t + "Form"] = n(!0);
});
let Cu = class xo {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const s = this;
    this.promise.then((r) => {
      if (!s._listeners) return;
      let i = s._listeners.length;
      for (; i-- > 0; )
        s._listeners[i](r);
      s._listeners = null;
    }), this.promise.then = (r) => {
      let i;
      const o = new Promise((l) => {
        s.subscribe(l), i = l;
      }).then(r);
      return o.cancel = function() {
        s.unsubscribe(i);
      }, o;
    }, t(function(i, o, l) {
      s.reason || (s.reason = new _t(i, o, l), n(s.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (s) => {
      t.abort(s);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new xo(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Iu(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Ou(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
const Is = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(Is).forEach(([e, t]) => {
  Is[t] = e;
});
function Ro(e) {
  const t = new ut(e), n = eo(ut.prototype.request, t);
  return h.extend(n, ut.prototype, t, { allOwnKeys: !0 }), h.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Ro(pt(e, r));
  }, n;
}
const $ = Ro(ln);
$.Axios = ut;
$.CanceledError = _t;
$.CancelToken = Cu;
$.isCancel = go;
$.VERSION = So;
$.toFormData = zn;
$.AxiosError = B;
$.Cancel = $.CanceledError;
$.all = function(t) {
  return Promise.all(t);
};
$.spread = Iu;
$.isAxiosError = Ou;
$.mergeConfig = pt;
$.AxiosHeaders = ge;
$.formToJSON = (e) => mo(h.isHTMLForm(e) ? new FormData(e) : e);
$.getAdapter = Eo.getAdapter;
$.HttpStatusCode = Is;
$.default = $;
const {
  Axios: gf,
  AxiosError: yf,
  CanceledError: bf,
  isCancel: Af,
  CancelToken: wf,
  VERSION: Ef,
  all: Sf,
  Cancel: xf,
  isAxiosError: Rf,
  spread: Cf,
  toFormData: If,
  AxiosHeaders: Of,
  HttpStatusCode: vf,
  formToJSON: Tf,
  getAdapter: Pf,
  mergeConfig: _f
} = $;
class vu {
  /**
   * Create a new API client instance
   * @param baseUrl - Base URL for the Loopit API
   * @param workspace - Workspace identifier/slug
   * @param microsite - Microsite path
   */
  constructor(t, n, s) {
    er(this, "axiosInstance");
    this.axiosInstance = $.create({
      baseURL: t,
      headers: {
        Accept: "application/json",
        "X-Workspace": n,
        "X-Micrositepath": s
      }
    });
  }
  /**
   * Make an API request
   * @param config - Axios request config
   * @returns Promise resolving to the response data
   * @throws Error if the request fails
   */
  async request(t) {
    try {
      return (await this.axiosInstance.request(t)).data;
    } catch (n) {
      if ($.isAxiosError(n) && n.response) {
        const s = n.response.data;
        throw new Error(s.message || s.error || "Request failed");
      }
      throw n;
    }
  }
  /**
   * GET /payment/config
   * Get payment configuration (Stripe keys)
   * @returns Promise resolving to payment config
   * @throws Error if provider is not Stripe or payment type is not card
   */
  async getPaymentConfig() {
    var n, s, r;
    const t = await this.request({
      method: "GET",
      url: "/payment/config"
    });
    if (((n = t.gateway) == null ? void 0 : n.provider) !== "stripe")
      throw new Error("Only Stripe payment provider is supported");
    if (((r = (s = t.payment_method_type) == null ? void 0 : s.type) == null ? void 0 : r.toLowerCase()) !== "card")
      throw new Error("Only card payments are supported");
    return t;
  }
  /**
   * POST /payment-methods/setup-config
   * Get Stripe SetupIntent client_secret
   * @param ownerId - Owner ID (person or company)
   * @param ownerType - Owner type ('person' or 'company')
   * @param configId - Payment config ID
   * @returns Promise resolving to setup config with SetupIntent
   */
  async getSetupConfig(t, n, s) {
    const r = {
      owner_id: t,
      owner_type: n,
      config_id: s
    };
    return this.request({
      method: "POST",
      url: "/payment-methods/setup-config",
      data: r
    });
  }
  /**
   * POST /payment-methods/add
   * Save payment method to Loopit API after Stripe confirmation
   * @param data - Payment method data
   * @returns Promise resolving to the created payment method
   */
  async addPaymentMethod(t) {
    return this.request({
      method: "POST",
      url: "/payment-methods/add",
      data: t
    });
  }
}
const Tu = {
  mastercard: "data:image/jpeg;base64,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",
  visa: "data:image/png;base64,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",
  amex: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAkFBMVEUBb9D///8AaM4Aa88AbM8Aac6qyuzM4vYAZs7a6vjD2PEAc9Hx+P3D2/OgxevJ3PNwp+Hp8/tVl9zh7fmcwOjU5fb4/P6BseS00e9pouBIjtkAYs03idjc6viz0e+kx+wAd9Idf9WMt+Y1hNd+r+QjfdSRvehspeGItuZbnN5Qk9oAXcskhtdQmt261fB/tuf4dyEHAAALB0lEQVR4nO2bC5OqOBOGISSKg3hDHK+It7l4zrr//999JOkOHcA5u1Vb6lfVT22ddTpgwkun07kYBAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMMzrEQGS2CQaoy6b9P/8ya6Ukt79pBZZFSq/Gul9VcPWsND2PoqoGBiyD+FsSX8A5Ana1HsGtmyl230btCmrB/Htee/zYuVSX/r+XYG1ROqyGvVz+MqZkUKedvD3yUkRfdt6swLVUqm+KvsmL/JByG0ITEvXwGSIxnCl8MLc2SbaVv9ZU1aXDZrG4ajUjyXm5q++FUuKWbogF9knj/f4dy/GtqiJV63+pqnfsscRL12D313tRKwbtFqu6yfTrZadYskOscJwoP3EE0smPf8SI5YsXb0L9+ZqsYYXaxPZk8SSZd3gnbMSsRbYwvk/EavqNR1ihbozU7Fk0rzbiCW+asMRu2stFr449SzPEh+kxa56IlZ4tsYkq02f/9KzKqcVnljq1rzAdkNSxxRbSMQKP42CT/OsgMgSjrvEsv0mmpHrSMzKe0WF+aeidDGrX5l6vd7NOkGYSypW/fyLLO9X5INZ5b/qM2xW0hDLds5nxSzxbuodQmBdR22xFlvTwDq0eZ719SuuMT3MinXegMn60OIgqWeBB2WrAG/VdSj7lSm8hqgtVpjqjvgsz5K23qK0I1OhqFiL1BhNSmEt037Ts46i8Y0Qs3CwiNaoeC0WemmeeI+L5qt9gaHNJnyxwrN4WsxSK2jfZokOYOzgWbaZOu5DD5nXYqFnbXRmqYT5Rz9dQyzVIZYYgc1PlMAJd9HF1v5m34Mv1rBq4ZM8K7IPn0twgHBuGwhibXN8xcI62SlvijVY3pY35EORbig0cWIVmJYkZqmx+ZTGXlvkyXr3uxA9FJiItYMxIY2eFLNQourhY/uMw8QTyw7lPQEJxm7TEsujHzvPGlj5Ugjwb95ouDOfGj1Y2bhZxXBM6XqCiJUdII6ehXqKZ0HU1qk7OrtNFECs9QXKYRw4/vpZLO0r3amDdk4nFmQhE+9hMSHVqbuwDm+TUBRLQAuHp/gZniVPtn2jWFZTU/s5i6lYG9vq1S+rwIl4Vtd0J43vJKV7EfxJLAVh/aSkFBBKje+hWBgKwnTzDM/CpPyvbcUJ5h8zRcSCVr8dbCujf9ANuzxrJILgT91QWnfJD7oxv239JjF1YkkI/OHEivX5SLFkOe1wAv3ATqxImaALadhExS3PyotiWSzhPxLga4bja0xejU4dbIC/0QCP47KP1sOJFbiOaFv3UM9S5672hWtZiyVjMt+dXmTc8qx3O+pZdOtBrPSIc8m/NjZDIKkDhPIDWZGKu2ZP4UBQsYI4pYUPFas7FIfLmIgVXUmBCNpifd1JSs+bDfjB9NAUC70oDdzj0jUNyjWiYsmSruo8Uqzou7t9+oU7sYKonttWc912N2xNd+qkNIY5OqyTkZiVQP/vXyO4LW7NrEHPmIrlJ6iPFAvG53DqgPhZJaa1WMqtSph+YBUic8N83yMkzl+/dLQp7J2DQPpi1Usx2Vt1176UB3hRdWPAh06SiuUtVzxQLFwhXUI/qp4T0r5pImux5AnbppP7tmf5VD5EpjtSwvvoB43FP38oXYrYToDCmcTGRBBQ97EnlhsRHysWrpCSCRpMM6ocuRYrUPDAoZ58tGNWSyziWYFMICymUvpilWTlKtwqSEjzehMCh+pFKahYtCM+TixcIe2TGjHK7kg3dON1ri/8o1guZhmxgugA0amI/GXlqKwHtpvAbnkmjcEk8GPjiUU64uPEgpm/n9lhGFsFtVjo+O/6IWEGabph11haexasOog1dJu9bG5YTHIIS1cFAX9Y0g2wrS2eBr5YEueIj+yGyzfNMqE29T3WxvExuOn/p2Y/KvrQxpuZp4mRKTehxXxsoAP83lyygt4tvm3JeCYm+nvGc7ehFW3Po6qevZJXW+2XP1mc2xvXM1Pac438HNuC6+M2DpVLIwmRTS4jKJXkSkkukORaj+bl5DL8RLu9AoMUzaL6iwSU1oX4jc/YZGUYhvm/R7WDt3KRle4zuELZvBzjb2MgIKdqOkYId5pG+S2Q3be8RIxPRr0W8+C9sJ++65FJHqH0MmtcPdnaJ1cTz77/WF3sM8pt0a5kYu+R2/OcTjqX3yaJUduJZ+6tHn+Qpk1Cl0KAaXCCdHyxRrVwYSE8xu/N6xfp2iyQ9poFw+VB3+/tcSNmj0J85836dboqruOmefsKrkV3pGuxFKzZu8NJMU7U5kK0xKrkmoh6quB91VX9IJb6aJtj/9QI0NhMexLdYgUKlwIzafJ5XLErYrff4DNTuCzqo7dK74nVtYBbTSW61p3Xr9ALu8Wq5jIxLhiOq2YqmL2F4zi4I5ZeOO8SSy8M3RGLLsIgt8rfvHUKS/4SjoVi5Smh0AUxvvaeii54QiaRbkF/CBfjLHsVgVhTKMCwd5EoFq1j/LdCxxoS67p2LGqevYRjoViz5m4EOc91xNW/zG6FWs8axHD1xHpdFcysWDf4qghC2HcEYi1iPxeAjd+sjKk1UPa+4cE3vwIgVtcR1whGtwU4z3RrVESx8AFgI+YNxUphAJXCqnhWKFajDjgI8dHoYqBhsfmPn/Q/oMuz4KFk4O1HLa5w1uXcEMtqOm6KFWyGDbFi6loS953zCM1w1tl+X5bEL+ZXTqzbqGaPCaB/HnQFS/joWZE0KGl3nZd1N7QbQBsISTPshiGpY9T7LTHV2O2t6WPyW590U0fo9D0wn7fiNUJW52g4wh1CSY6Xnt0xWSvW7nIwXMH9vhSIlUHODUIPy+7RsNKwvUPX34qujcXB9aVGQ4+5206N3Oh+dCGke3t7cZLdqcNc3RMrwC0hSjXBap/ZDcNJc4f3KfzoWVWChcV96U6rd4q1F9151iC5k5ReK7FOHUcwLlJedm3zy053nFhuy6bi5lbUu5LSftCdlOb6lMM9z6ocN21NTavKZVm0zLdX6IiYlI4JuE8lS/qK93imuEOsQmerbbGyY2LWEEAsWkdf7ycFUq3fl2CB8LgT2rx1Zshbhi/kWTMyquMylAzG3qPDKaumWIusmJlb6gAP3voh7R1dSamrRFWfjSWwRwAWDbPEM7wvoNZPSSkE2immWzbK4mh4Ai4JjOyQCtw2G5iFY2Z2JyltIOxdw2Yrti8nVtd0B1dcZhGOWjNzmNHPs1zgxxuqpFTADygWW/qbDX+6Y37BQ9nY6dVU+ou3kK4tymeo0wDEWs4JR10gjuhPsUu3FnrCg57VetO1WG5FavibLv7ROkafUZB8UAueI42DIzWDe+evkDvcXaLB1T49dYtwLXB4iNx0p/VVRCwX7DN9vu3eEk3ZsUobrlTSXqKBMwXP5s7in8DnK8yQrTCrzhLZnEg7vLmhBI8YXO4u/pHfHNbUp3Y92n78DLrFEmt46X0IyjH+jKuPv5j6sRuSeWU/kf9CrJ1eBWqLNT29hlhdGxZ4bD4cuNMubl38BmJlP3tWIC/Qm8aB6jqm2SXWoqfra3XDxfLyGjPpJO23uCU989vAfnqqG6nmtjD//DaFReur1N/mgjmoqLZww99inbcrOaqg9OpOi/PBZF9J4ZmX76en/Py+C9XaZVUKT70o2b4QClXHu24UwPapwkM0fiWyUbeqE9VItS9lGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhXof/ARc/vbM9exo3AAAAAElFTkSuQmCC"
};
function Pu(e) {
  if (!e)
    return null;
  const t = e.toLowerCase();
  return Tu[t] ?? null;
}
const _u = /* @__PURE__ */ Nn({
  name: "PaymentMethodDisplay",
  props: {
    /**
     * The payment method to display
     */
    paymentMethod: {
      type: Object,
      required: !0
    }
  },
  emits: {
    /**
     * Emitted when user clicks remove button
     */
    remove: () => !0
  },
  computed: {
    /**
     * Get the brand image URL for the payment method
     */
    brandImage() {
      return Pu(this.paymentMethod.brand);
    },
    /**
     * Get the capitalized brand name
     */
    capitalizedBrand() {
      const e = this.paymentMethod.brand || "Card";
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
  }
}), Gn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Mu = { class: "lp-flex lp-items-center lp-gap-4 lp-w-full" }, Du = { class: "lp-flex lp-items-center lp-gap-3 lp-flex-1 lp-py-4 lp-px-5 lp-bg-gray-100 lp-rounded-md" }, Fu = ["src", "alt"], Bu = { class: "lp-text-base lp-text-gray-800" }, ju = { class: "lp-capitalize" }, Nu = { class: "lp-font-semibold" };
function Lu(e, t, n, s, r, i) {
  return ie(), Ae("div", Mu, [
    W("div", Du, [
      e.brandImage ? (ie(), Ae("img", {
        key: 0,
        src: e.brandImage,
        alt: e.paymentMethod.brand,
        class: "lp-w-12 lp-h-8 lp-object-contain lp-rounded"
      }, null, 8, Fu)) : Et("", !0),
      W("span", Bu, [
        W("span", ju, ct(e.capitalizedBrand), 1),
        t[1] || (t[1] = vt(" ending in ", -1)),
        W("span", Nu, ct(e.paymentMethod.last_4), 1)
      ])
    ]),
    W("button", {
      type: "button",
      class: "lp-py-4 lp-px-6 lp-bg-gray-100 lp-border-none lp-rounded-md lp-text-base lp-text-gray-800 lp-cursor-pointer lp-transition-colors lp-whitespace-nowrap hover:lp-bg-gray-200",
      onClick: t[0] || (t[0] = (o) => e.$emit("remove"))
    }, " Remove ")
  ]);
}
const Uu = /* @__PURE__ */ Gn(_u, [["render", Lu]]), qu = /* @__PURE__ */ Nn({
  name: "StripeCardForm",
  props: {
    /**
     * API client instance for making requests
     */
    apiClient: {
      type: Object,
      required: !0
    },
    /**
     * Owner ID (person or company)
     */
    ownerId: {
      type: String,
      required: !0
    },
    /**
     * Owner type
     */
    ownerType: {
      type: String,
      required: !0
    }
  },
  emits: {
    /**
     * Emitted when payment method is successfully added
     */
    added: (e) => !!e,
    /**
     * Emitted when an error occurs
     */
    error: (e) => !!e
  },
  data() {
    return {
      /** Cardholder name input value */
      cardholderName: "",
      /** Cardholder name validation error */
      nameError: null,
      /** General error message */
      error: null,
      /** Form submission loading state */
      isLoading: !1,
      /** Stripe initialization loading state */
      isInitializing: !0,
      /** Whether Stripe Payment Element is ready */
      stripeReady: !1,
      /** Stripe instance */
      stripe: null,
      /** Stripe Elements instance */
      elements: null,
      /** Stripe Payment Element instance */
      paymentElement: null,
      /** Payment configuration from API */
      config: null
    };
  },
  async mounted() {
    await this.initStripe();
  },
  beforeUnmount() {
    this.paymentElement && this.paymentElement.destroy();
  },
  methods: {
    /**
     * Initialize Stripe and mount Payment Element
     */
    async initStripe() {
      try {
        if (this.config = await this.apiClient.getPaymentConfig(), typeof window.Stripe > "u")
          throw new Error("Stripe.js is not loaded. Please include the Stripe.js script (https://js.stripe.com/v3/) in your page.");
        this.stripe = window.Stripe(this.config.gateway.api_key, {
          stripeAccount: this.config.gateway.external_gateway_id
        }), this.elements = this.stripe.elements({
          mode: "setup",
          currency: this.config.currency.code.toLowerCase(),
          paymentMethodTypes: [this.config.payment_method_type.type.toLowerCase()],
          setupFutureUsage: "off_session",
          appearance: {
            theme: "flat",
            labels: "floating",
            variables: {
              fontSizeBase: "14px",
              fontLineHeight: "1",
              colorBackground: "#F6F8FA"
            },
            rules: {
              ".Block": {
                backgroundColor: "var(--colorBackground)",
                boxShadow: "none",
                padding: "9px"
              },
              ".Input": {
                padding: "9px"
              }
            }
          }
        }), this.paymentElement = this.elements.create("payment", {
          layout: "tabs",
          paymentMethodOrder: ["card"]
        }), await this.$nextTick();
        const e = this.$refs.paymentElement;
        this.paymentElement.mount(e), this.paymentElement.on("ready", () => {
          this.stripeReady = !0;
        }), this.isInitializing = !1;
      } catch (e) {
        this.isInitializing = !1, this.error = e.message, this.$emit("error", e);
      }
    },
    /**
     * Handle form submission
     */
    async handleSubmit() {
      if (this.error = null, this.nameError = null, !this.cardholderName.trim()) {
        this.nameError = "Cardholder name is required";
        return;
      }
      if (!this.elements || !this.stripe || !this.config) {
        this.error = "Payment form not initialized";
        return;
      }
      const { error: e } = await this.elements.submit();
      if (e) {
        this.error = e.message;
        return;
      }
      this.isLoading = !0;
      try {
        const t = await this.apiClient.getSetupConfig(
          this.ownerId,
          this.ownerType,
          this.config.id
        ), { error: n, setupIntent: s } = await this.stripe.confirmSetup({
          elements: this.elements,
          clientSecret: t.config.setup_intent.client_secret,
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: this.cardholderName
              }
            }
          },
          redirect: "if_required"
        });
        if (n)
          throw new Error(n.message);
        if (!s)
          throw new Error("Setup failed - no setup intent returned");
        const r = await this.apiClient.addPaymentMethod({
          owner_id: this.ownerId,
          owner_type: this.ownerType,
          config_id: this.config.id,
          external_payment_method_id: s.payment_method,
          data: {
            cardholder_name: this.cardholderName
          }
        });
        this.$emit("added", r);
      } catch (t) {
        this.error = t.message, this.$emit("error", t);
      } finally {
        this.isLoading = !1;
      }
    }
  }
}), Hu = { class: "lp-flex lp-items-center lp-justify-center lp-gap-2 lp-py-10 lp-text-gray-500" }, ku = { class: "lp-flex lp-flex-col lp-gap-1.5" }, Wu = {
  key: 0,
  class: "lp-text-sm lp-text-red-600 lp-m-0"
}, Vu = { class: "lp-flex lp-flex-col lp-gap-1.5" }, zu = {
  ref: "paymentElement",
  class: "lp-min-h-[100px]"
}, Ku = {
  key: 0,
  class: "lp-text-sm lp-text-red-600 lp-m-0 lp-p-3 lp-bg-red-50 lp-rounded-md"
}, Gu = ["disabled"], Zu = {
  key: 0,
  class: "lp-w-[18px] lp-h-[18px]",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, Ju = {
  key: 1,
  class: "lp-w-[18px] lp-h-[18px] lp-border-2 lp-border-white/30 lp-border-t-white lp-rounded-full lp-animate-spin"
};
function Xu(e, t, n, s, r, i) {
  return ie(), Ae("form", {
    onSubmit: t[1] || (t[1] = $i((...o) => e.handleSubmit && e.handleSubmit(...o), ["prevent"])),
    class: "lp-flex lp-flex-col lp-gap-4"
  }, [
    Nt(W("div", Hu, [...t[2] || (t[2] = [
      W("span", { class: "lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin" }, null, -1),
      vt(" Loading payment form... ", -1)
    ])], 512), [
      [pn, e.isInitializing]
    ]),
    Nt(W("div", ku, [
      t[3] || (t[3] = W("label", {
        class: "lp-text-sm lp-font-medium lp-text-gray-700",
        for: "loopit-cardholder-name"
      }, [
        vt(" Cardholder Name "),
        W("span", { class: "lp-text-red-600" }, "*")
      ], -1)),
      Nt(W("input", {
        id: "loopit-cardholder-name",
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.cardholderName = o),
        type: "text",
        class: Bn(["lp-w-full lp-p-3 lp-border lp-border-gray-300 lp-rounded-md lp-text-sm lp-text-gray-800 lp-bg-gray-50 lp-transition-all focus:lp-outline-none focus:lp-border-blue-500 focus:lp-ring-[3px] focus:lp-ring-blue-500/10", { "lp-border-red-600 focus:lp-border-red-600 focus:lp-ring-red-600/10": e.nameError }]),
        placeholder: "Name on card"
      }, null, 2), [
        [zc, e.cardholderName]
      ]),
      e.nameError ? (ie(), Ae("p", Wu, ct(e.nameError), 1)) : Et("", !0)
    ], 512), [
      [pn, !e.isInitializing]
    ]),
    Nt(W("div", Vu, [
      W("div", zu, null, 512)
    ], 512), [
      [pn, !e.isInitializing]
    ]),
    e.error ? (ie(), Ae("p", Ku, ct(e.error), 1)) : Et("", !0),
    Nt(W("button", {
      type: "submit",
      class: "lp-flex lp-items-center lp-justify-center lp-gap-2 lp-w-full lp-py-3.5 lp-px-6 lp-bg-blue-500 lp-border-none lp-rounded-md lp-text-base lp-font-medium lp-text-white lp-cursor-pointer lp-transition-colors lp-mt-2 hover:lp-bg-blue-600 disabled:lp-bg-gray-400 disabled:lp-cursor-not-allowed",
      disabled: e.isLoading || !e.stripeReady
    }, [
      e.isLoading ? Et("", !0) : (ie(), Ae("svg", Zu, [...t[4] || (t[4] = [
        W("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" }, null, -1)
      ])])),
      e.isLoading ? (ie(), Ae("span", Ju)) : Et("", !0),
      W("span", null, ct(e.isLoading ? "Saving..." : "Save Card"), 1)
    ], 8, Gu), [
      [pn, !e.isInitializing]
    ])
  ], 32);
}
const Yu = /* @__PURE__ */ Gn(qu, [["render", Xu]]), Qu = /* @__PURE__ */ Nn({
  name: "AddPaymentMethodModal",
  components: {
    StripeCardForm: Yu
  },
  props: {
    /**
     * API client instance for making requests
     */
    apiClient: {
      type: Object,
      required: !0
    },
    /**
     * Owner ID (person or company)
     */
    ownerId: {
      type: String,
      required: !0
    },
    /**
     * Owner type
     */
    ownerType: {
      type: String,
      required: !0
    }
  },
  emits: {
    /**
     * Emitted when modal should close
     */
    close: () => !0,
    /**
     * Emitted when payment method is successfully added
     */
    added: (e) => !!e,
    /**
     * Emitted when an error occurs
     */
    error: (e) => !!e
  },
  mounted() {
    document.body.style.overflow = "hidden", document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.body.style.overflow = "", document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    /**
     * Handle keyboard events
     * @param e - Keyboard event
     */
    handleKeydown(e) {
      e.key === "Escape" && this.$emit("close");
    },
    /**
     * Handle payment method added
     * @param method - The newly added payment method
     */
    handleAdded(e) {
      this.$emit("added", e);
    },
    /**
     * Handle error
     * @param err - The error that occurred
     */
    handleError(e) {
      this.$emit("error", e);
    }
  }
}), $u = { class: "lp-bg-white lp-rounded-xl lp-w-full lp-max-w-[500px] lp-max-h-[90vh] lp-overflow-auto lp-shadow-xl" }, ef = { class: "lp-flex lp-items-center lp-justify-between lp-py-5 lp-px-6 lp-border-b lp-border-gray-200" }, tf = { class: "lp-p-6" };
function nf(e, t, n, s, r, i) {
  const o = ms("StripeCardForm");
  return ie(), Ae("div", {
    class: "lp-fixed lp-inset-0 lp-bg-black/50 lp-flex lp-items-center lp-justify-center lp-z-[9999] lp-p-5",
    onClick: t[1] || (t[1] = $i((l) => e.$emit("close"), ["self"]))
  }, [
    W("div", $u, [
      W("div", ef, [
        t[3] || (t[3] = W("h2", { class: "lp-m-0 lp-text-lg lp-font-semibold lp-text-gray-900" }, "Add Payment Method", -1)),
        W("button", {
          type: "button",
          class: "lp-flex lp-items-center lp-justify-center lp-w-8 lp-h-8 lp-p-0 lp-bg-transparent lp-border-none lp-rounded-md lp-cursor-pointer lp-text-gray-500 lp-transition-colors hover:lp-bg-gray-100 hover:lp-text-gray-900",
          onClick: t[0] || (t[0] = (l) => e.$emit("close")),
          "aria-label": "Close"
        }, [...t[2] || (t[2] = [
          W("svg", {
            class: "lp-w-5 lp-h-5",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            W("line", {
              x1: "18",
              y1: "6",
              x2: "6",
              y2: "18"
            }),
            W("line", {
              x1: "6",
              y1: "6",
              x2: "18",
              y2: "18"
            })
          ], -1)
        ])])
      ]),
      W("div", tf, [
        qe(o, {
          "api-client": e.apiClient,
          "owner-id": e.ownerId,
          "owner-type": e.ownerType,
          onAdded: e.handleAdded,
          onError: e.handleError
        }, null, 8, ["api-client", "owner-id", "owner-type", "onAdded", "onError"])
      ])
    ])
  ]);
}
const sf = /* @__PURE__ */ Gn(Qu, [["render", nf]]), rf = /* @__PURE__ */ Nn({
  name: "LoopitPaymentMethod",
  components: {
    PaymentMethodDisplay: Uu,
    AddPaymentMethodModal: sf
  },
  props: {
    /**
     * SDK configuration options
     */
    options: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      /** Currently selected payment method */
      paymentMethod: null,
      /** Whether to show the add payment method modal */
      showModal: !1,
      /** Loading state */
      isLoading: !1,
      /** Error message */
      error: null,
      /** API client instance */
      apiClient: null
    };
  },
  created() {
    this.apiClient = new vu(
      this.options.apiBaseUrl,
      this.options.workspace,
      this.options.microsite
    );
  },
  methods: {
    /**
     * Handle payment method added event
     * @param method - The newly added payment method
     */
    handleAdded(e) {
      this.paymentMethod = e, this.showModal = !1, typeof this.options.onPaymentMethodAdded == "function" && this.options.onPaymentMethodAdded(e);
    },
    /**
     * Handle payment method removal
     */
    handleRemove() {
      this.paymentMethod = null, typeof this.options.onPaymentMethodRemoved == "function" && this.options.onPaymentMethodRemoved();
    },
    /**
     * Handle modal error
     * @param err - The error that occurred
     */
    handleModalError(e) {
      typeof this.options.onError == "function" && this.options.onError(e);
    }
  }
}), of = { class: "lp-font-sans" }, lf = {
  key: 0,
  class: "lp-flex lp-items-center lp-gap-2 lp-text-gray-500 lp-p-4"
}, cf = {
  key: 1,
  class: "lp-text-red-600 lp-p-3 lp-bg-red-50 lp-rounded-md lp-text-sm"
};
function af(e, t, n, s, r, i) {
  const o = ms("PaymentMethodDisplay"), l = ms("AddPaymentMethodModal");
  return ie(), Ae("div", of, [
    e.isLoading ? (ie(), Ae("div", lf, [...t[2] || (t[2] = [
      W("span", { class: "lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin" }, null, -1),
      vt(" Loading... ", -1)
    ])])) : e.error ? (ie(), Ae("div", cf, ct(e.error), 1)) : (ie(), Ae(Ce, { key: 2 }, [
      e.paymentMethod ? (ie(), ws(o, {
        key: 0,
        "payment-method": e.paymentMethod,
        onRemove: e.handleRemove
      }, null, 8, ["payment-method", "onRemove"])) : (ie(), Ae("button", {
        key: 1,
        type: "button",
        class: "lp-flex lp-items-center lp-justify-center lp-gap-2 lp-w-full lp-py-4 lp-px-6 lp-bg-gray-100 lp-border-none lp-rounded-md lp-text-base lp-font-medium lp-text-gray-800 lp-cursor-pointer lp-transition-colors hover:lp-bg-gray-200",
        onClick: t[0] || (t[0] = (c) => e.showModal = !0)
      }, [...t[3] || (t[3] = [
        W("svg", {
          class: "lp-w-5 lp-h-5",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [
          W("line", {
            x1: "12",
            y1: "5",
            x2: "12",
            y2: "19"
          }),
          W("line", {
            x1: "5",
            y1: "12",
            x2: "19",
            y2: "12"
          })
        ], -1),
        vt(" Add Payment Method ", -1)
      ])])),
      e.showModal ? (ie(), ws(l, {
        key: 2,
        "api-client": e.apiClient,
        "owner-id": e.options.ownerId,
        "owner-type": e.options.ownerType,
        onClose: t[1] || (t[1] = (c) => e.showModal = !1),
        onAdded: e.handleAdded,
        onError: e.handleModalError
      }, null, 8, ["api-client", "owner-id", "owner-type", "onAdded", "onError"])) : Et("", !0)
    ], 64))
  ]);
}
const uf = /* @__PURE__ */ Gn(rf, [["render", af]]), ff = {
  /**
   * Mount the SDK to a DOM element
   *
   * @param selector - CSS selector or DOM element
   * @param options - SDK configuration options
   * @returns SDK instance with app and unmount method
   *
   * @example
   * ```javascript
   * const sdk = LoopitPaymentMethod.mount('#payment-container', {
   *   apiBaseUrl: 'https://api.loopit.io/api/portal',
   *   workspace: 'my-workspace',
   *   ownerId: '123',
   *   ownerType: 'person',
   *   onPaymentMethodAdded: (pm) => console.log('Added:', pm),
   *   onPaymentMethodRemoved: () => console.log('Removed'),
   *   onError: (err) => console.error('Error:', err),
   * });
   *
   * // Later, to unmount:
   * sdk.unmount();
   * ```
   */
  mount(e, t) {
    const n = typeof e == "string" ? document.querySelector(e) : e;
    if (!n)
      throw new Error(`Container element not found: ${e}`);
    const s = Xc(uf, { options: t });
    return s.mount(n), {
      app: s,
      unmount: () => s.unmount()
    };
  }
};
typeof window < "u" && (window.LoopitPaymentMethod = ff);
export {
  ff as default
};
