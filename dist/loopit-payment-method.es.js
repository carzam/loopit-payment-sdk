var Ro = Object.defineProperty;
var To = (e, t, n) => t in e ? Ro(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var tr = (e, t, n) => To(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function Ps(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const G = {}, xt = [], Ue = () => {
}, Yr = () => !1, _n = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Os = (e) => e.startsWith("onUpdate:"), re = Object.assign, vs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Mo = Object.prototype.hasOwnProperty, q = (e, t) => Mo.call(e, t), j = Array.isArray, Ct = (e) => Dn(e) === "[object Map]", Jr = (e) => Dn(e) === "[object Set]", B = (e) => typeof e == "function", ne = (e) => typeof e == "string", ot = (e) => typeof e == "symbol", X = (e) => e !== null && typeof e == "object", Xr = (e) => (X(e) || B(e)) && B(e.then) && B(e.catch), Qr = Object.prototype.toString, Dn = (e) => Qr.call(e), Po = (e) => Dn(e).slice(8, -1), $r = (e) => Dn(e) === "[object Object]", _s = (e) => ne(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Wt = /* @__PURE__ */ Ps(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Bn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Oo = /-\w/g, xe = Bn(
  (e) => e.replace(Oo, (t) => t.slice(1).toUpperCase())
), vo = /\B([A-Z])/g, yt = Bn(
  (e) => e.replace(vo, "-$1").toLowerCase()
), jn = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xn = Bn(
  (e) => e ? `on${jn(e)}` : ""
), ft = (e, t) => !Object.is(e, t), yn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, ei = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, Ds = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let nr;
const Nn = () => nr || (nr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Bs(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = ne(s) ? jo(s) : Bs(s);
      if (r)
        for (const i in r)
          t[i] = r[i];
    }
    return t;
  } else if (ne(e) || X(e))
    return e;
}
const _o = /;(?![^(]*\))/g, Do = /:([^]+)/, Bo = /\/\*[^]*?\*\//g;
function jo(e) {
  const t = {};
  return e.replace(Bo, "").split(_o).forEach((n) => {
    if (n) {
      const s = n.split(Do);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function nn(e) {
  let t = "";
  if (ne(e))
    t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const s = nn(e[n]);
      s && (t += s + " ");
    }
  else if (X(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const No = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Fo = /* @__PURE__ */ Ps(No);
function ti(e) {
  return !!e || e === "";
}
const ni = (e) => !!(e && e.__v_isRef === !0), He = (e) => ne(e) ? e : e == null ? "" : j(e) || X(e) && (e.toString === Qr || !B(e.toString)) ? ni(e) ? He(e.value) : JSON.stringify(e, si, 2) : String(e), si = (e, t) => ni(t) ? si(e, t.value) : Ct(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], i) => (n[Qn(s, i) + " =>"] = r, n),
    {}
  )
} : Jr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Qn(n))
} : ot(t) ? Qn(t) : X(t) && !j(t) && !$r(t) ? String(t) : t, Qn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    ot(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let me;
class Lo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = me, !t && me && (this.index = (me.scopes || (me.scopes = [])).push(
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
      const n = me;
      try {
        return me = this, t();
      } finally {
        me = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = me, me = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (me = this.prevScope, this.prevScope = void 0);
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
function Uo() {
  return me;
}
let J;
const $n = /* @__PURE__ */ new WeakSet();
class ri {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, me && me.active && me.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, $n.has(this) && ($n.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || oi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, sr(this), li(this);
    const t = J, n = Re;
    J = this, Re = !0;
    try {
      return this.fn();
    } finally {
      ci(this), J = t, Re = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Fs(t);
      this.deps = this.depsTail = void 0, sr(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? $n.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ds(this) && this.run();
  }
  get dirty() {
    return ds(this);
  }
}
let ii = 0, Vt, Gt;
function oi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Gt, Gt = e;
    return;
  }
  e.next = Vt, Vt = e;
}
function js() {
  ii++;
}
function Ns() {
  if (--ii > 0)
    return;
  if (Gt) {
    let t = Gt;
    for (Gt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Vt; ) {
    let t = Vt;
    for (Vt = void 0; t; ) {
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
function li(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ci(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), Fs(s), Ho(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function ds(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ai(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ai(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Xt) || (e.globalVersion = Xt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ds(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = J, s = Re;
  J = e, Re = !0;
  try {
    li(e);
    const r = e.fn(e._value);
    (t.version === 0 || ft(r, e._value)) && (e.flags |= 128, e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    J = n, Re = s, ci(e), e.flags &= -3;
  }
}
function Fs(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Fs(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ho(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Re = !0;
const ui = [];
function Je() {
  ui.push(Re), Re = !1;
}
function Xe() {
  const e = ui.pop();
  Re = e === void 0 ? !0 : e;
}
function sr(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = J;
    J = void 0;
    try {
      t();
    } finally {
      J = n;
    }
  }
}
let Xt = 0;
class ko {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class fi {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!J || !Re || J === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== J)
      n = this.activeLink = new ko(J, this), J.deps ? (n.prevDep = J.depsTail, J.depsTail.nextDep = n, J.depsTail = n) : J.deps = J.depsTail = n, di(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = J.depsTail, n.nextDep = void 0, J.depsTail.nextDep = n, J.depsTail = n, J.deps === n && (J.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, Xt++, this.notify(t);
  }
  notify(t) {
    js();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ns();
    }
  }
}
function di(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        di(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const ps = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ Symbol(
  ""
), hs = /* @__PURE__ */ Symbol(
  ""
), Qt = /* @__PURE__ */ Symbol(
  ""
);
function le(e, t, n) {
  if (Re && J) {
    let s = ps.get(e);
    s || ps.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new fi()), r.map = s, r.key = n), r.track();
  }
}
function Ze(e, t, n, s, r, i) {
  const o = ps.get(e);
  if (!o) {
    Xt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (js(), t === "clear")
    o.forEach(l);
  else {
    const c = j(e), f = c && _s(n);
    if (c && n === "length") {
      const a = Number(s);
      o.forEach((p, E) => {
        (E === "length" || E === Qt || !ot(E) && E >= a) && l(p);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(Qt)), t) {
        case "add":
          c ? f && l(o.get("length")) : (l(o.get(dt)), Ct(e) && l(o.get(hs)));
          break;
        case "delete":
          c || (l(o.get(dt)), Ct(e) && l(o.get(hs)));
          break;
        case "set":
          Ct(e) && l(o.get(dt));
          break;
      }
  }
  Ns();
}
function Et(e) {
  const t = /* @__PURE__ */ V(e);
  return t === e ? t : (le(t, "iterate", Qt), /* @__PURE__ */ Te(e) ? t : t.map(Qe));
}
function Fn(e) {
  return le(e = /* @__PURE__ */ V(e), "iterate", Qt), e;
}
function tt(e, t) {
  return /* @__PURE__ */ rt(e) ? Pt(/* @__PURE__ */ pt(e) ? Qe(t) : t) : Qe(t);
}
const qo = {
  __proto__: null,
  [Symbol.iterator]() {
    return es(this, Symbol.iterator, (e) => tt(this, e));
  },
  concat(...e) {
    return Et(this).concat(
      ...e.map((t) => j(t) ? Et(t) : t)
    );
  },
  entries() {
    return es(this, "entries", (e) => (e[1] = tt(this, e[1]), e));
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
      (n) => n.map((s) => tt(this, s)),
      arguments
    );
  },
  find(e, t) {
    return Ve(
      this,
      "find",
      e,
      t,
      (n) => tt(this, n),
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
      (n) => tt(this, n),
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
    return ts(this, "includes", e);
  },
  indexOf(...e) {
    return ts(this, "indexOf", e);
  },
  join(e) {
    return Et(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ts(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ve(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Lt(this, "pop");
  },
  push(...e) {
    return Lt(this, "push", e);
  },
  reduce(e, ...t) {
    return rr(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return rr(this, "reduceRight", e, t);
  },
  shift() {
    return Lt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ve(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Lt(this, "splice", e);
  },
  toReversed() {
    return Et(this).toReversed();
  },
  toSorted(e) {
    return Et(this).toSorted(e);
  },
  toSpliced(...e) {
    return Et(this).toSpliced(...e);
  },
  unshift(...e) {
    return Lt(this, "unshift", e);
  },
  values() {
    return es(this, "values", (e) => tt(this, e));
  }
};
function es(e, t, n) {
  const s = Fn(e), r = s[t]();
  return s !== e && !/* @__PURE__ */ Te(e) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.done || (i.value = n(i.value)), i;
  }), r;
}
const zo = Array.prototype;
function Ve(e, t, n, s, r, i) {
  const o = Fn(e), l = o !== e && !/* @__PURE__ */ Te(e), c = o[t];
  if (c !== zo[t]) {
    const p = c.apply(e, i);
    return l ? Qe(p) : p;
  }
  let f = n;
  o !== e && (l ? f = function(p, E) {
    return n.call(this, tt(e, p), E, e);
  } : n.length > 2 && (f = function(p, E) {
    return n.call(this, p, E, e);
  }));
  const a = c.call(o, f, s);
  return l && r ? r(a) : a;
}
function rr(e, t, n, s) {
  const r = Fn(e);
  let i = n;
  return r !== e && (/* @__PURE__ */ Te(e) ? n.length > 3 && (i = function(o, l, c) {
    return n.call(this, o, l, c, e);
  }) : i = function(o, l, c) {
    return n.call(this, o, tt(e, l), c, e);
  }), r[t](i, ...s);
}
function ts(e, t, n) {
  const s = /* @__PURE__ */ V(e);
  le(s, "iterate", Qt);
  const r = s[t](...n);
  return (r === -1 || r === !1) && /* @__PURE__ */ ks(n[0]) ? (n[0] = /* @__PURE__ */ V(n[0]), s[t](...n)) : r;
}
function Lt(e, t, n = []) {
  Je(), js();
  const s = (/* @__PURE__ */ V(e))[t].apply(e, n);
  return Ns(), Xe(), s;
}
const Wo = /* @__PURE__ */ Ps("__proto__,__v_isRef,__isVue"), pi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ot)
);
function Vo(e) {
  ot(e) || (e = String(e));
  const t = /* @__PURE__ */ V(this);
  return le(t, "has", e), t.hasOwnProperty(e);
}
class hi {
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
      return s === (r ? i ? tl : bi : i ? yi : gi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = j(t);
    if (!r) {
      let c;
      if (o && (c = qo[n]))
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
      /* @__PURE__ */ de(t) ? t : s
    );
    if ((ot(n) ? pi.has(n) : Wo(n)) || (r || le(t, "get", n), i))
      return l;
    if (/* @__PURE__ */ de(l)) {
      const c = o && _s(n) ? l : l.value;
      return r && X(c) ? /* @__PURE__ */ gs(c) : c;
    }
    return X(l) ? r ? /* @__PURE__ */ gs(l) : /* @__PURE__ */ Us(l) : l;
  }
}
class mi extends hi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let i = t[n];
    const o = j(t) && _s(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ rt(i);
      if (!/* @__PURE__ */ Te(s) && !/* @__PURE__ */ rt(s) && (i = /* @__PURE__ */ V(i), s = /* @__PURE__ */ V(s)), !o && /* @__PURE__ */ de(i) && !/* @__PURE__ */ de(s))
        return f || (i.value = s), !0;
    }
    const l = o ? Number(n) < t.length : q(t, n), c = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ de(t) ? t : r
    );
    return t === /* @__PURE__ */ V(r) && (l ? ft(s, i) && Ze(t, "set", n, s) : Ze(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = q(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && Ze(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!ot(n) || !pi.has(n)) && le(t, "has", n), s;
  }
  ownKeys(t) {
    return le(
      t,
      "iterate",
      j(t) ? "length" : dt
    ), Reflect.ownKeys(t);
  }
}
class Go extends hi {
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
const Zo = /* @__PURE__ */ new mi(), Ko = /* @__PURE__ */ new Go(), Yo = /* @__PURE__ */ new mi(!0);
const ms = (e) => e, dn = (e) => Reflect.getPrototypeOf(e);
function Jo(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, i = /* @__PURE__ */ V(r), o = Ct(i), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, f = r[e](...s), a = n ? ms : t ? Pt : Qe;
    return !t && le(
      i,
      "iterate",
      c ? hs : dt
    ), re(
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
function pn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Xo(e, t) {
  const n = {
    get(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ V(i), l = /* @__PURE__ */ V(r);
      e || (ft(r, l) && le(o, "get", r), le(o, "get", l));
      const { has: c } = dn(o), f = t ? ms : e ? Pt : Qe;
      if (c.call(o, r))
        return f(i.get(r));
      if (c.call(o, l))
        return f(i.get(l));
      i !== o && i.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && le(/* @__PURE__ */ V(r), "iterate", dt), r.size;
    },
    has(r) {
      const i = this.__v_raw, o = /* @__PURE__ */ V(i), l = /* @__PURE__ */ V(r);
      return e || (ft(r, l) && le(o, "has", r), le(o, "has", l)), r === l ? i.has(r) : i.has(r) || i.has(l);
    },
    forEach(r, i) {
      const o = this, l = o.__v_raw, c = /* @__PURE__ */ V(l), f = t ? ms : e ? Pt : Qe;
      return !e && le(c, "iterate", dt), l.forEach((a, p) => r.call(i, f(a), f(p), o));
    }
  };
  return re(
    n,
    e ? {
      add: pn("add"),
      set: pn("set"),
      delete: pn("delete"),
      clear: pn("clear")
    } : {
      add(r) {
        !t && !/* @__PURE__ */ Te(r) && !/* @__PURE__ */ rt(r) && (r = /* @__PURE__ */ V(r));
        const i = /* @__PURE__ */ V(this);
        return dn(i).has.call(i, r) || (i.add(r), Ze(i, "add", r, r)), this;
      },
      set(r, i) {
        !t && !/* @__PURE__ */ Te(i) && !/* @__PURE__ */ rt(i) && (i = /* @__PURE__ */ V(i));
        const o = /* @__PURE__ */ V(this), { has: l, get: c } = dn(o);
        let f = l.call(o, r);
        f || (r = /* @__PURE__ */ V(r), f = l.call(o, r));
        const a = c.call(o, r);
        return o.set(r, i), f ? ft(i, a) && Ze(o, "set", r, i) : Ze(o, "add", r, i), this;
      },
      delete(r) {
        const i = /* @__PURE__ */ V(this), { has: o, get: l } = dn(i);
        let c = o.call(i, r);
        c || (r = /* @__PURE__ */ V(r), c = o.call(i, r)), l && l.call(i, r);
        const f = i.delete(r);
        return c && Ze(i, "delete", r, void 0), f;
      },
      clear() {
        const r = /* @__PURE__ */ V(this), i = r.size !== 0, o = r.clear();
        return i && Ze(
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
function Ls(e, t) {
  const n = Xo(e, t);
  return (s, r, i) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    q(n, r) && r in s ? n : s,
    r,
    i
  );
}
const Qo = {
  get: /* @__PURE__ */ Ls(!1, !1)
}, $o = {
  get: /* @__PURE__ */ Ls(!1, !0)
}, el = {
  get: /* @__PURE__ */ Ls(!0, !1)
};
const gi = /* @__PURE__ */ new WeakMap(), yi = /* @__PURE__ */ new WeakMap(), bi = /* @__PURE__ */ new WeakMap(), tl = /* @__PURE__ */ new WeakMap();
function nl(e) {
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
function sl(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : nl(Po(e));
}
// @__NO_SIDE_EFFECTS__
function Us(e) {
  return /* @__PURE__ */ rt(e) ? e : Hs(
    e,
    !1,
    Zo,
    Qo,
    gi
  );
}
// @__NO_SIDE_EFFECTS__
function rl(e) {
  return Hs(
    e,
    !1,
    Yo,
    $o,
    yi
  );
}
// @__NO_SIDE_EFFECTS__
function gs(e) {
  return Hs(
    e,
    !0,
    Ko,
    el,
    bi
  );
}
function Hs(e, t, n, s, r) {
  if (!X(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = sl(e);
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
function pt(e) {
  return /* @__PURE__ */ rt(e) ? /* @__PURE__ */ pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function rt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Te(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function ks(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function V(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ V(t) : e;
}
function il(e) {
  return !q(e, "__v_skip") && Object.isExtensible(e) && ei(e, "__v_skip", !0), e;
}
const Qe = (e) => X(e) ? /* @__PURE__ */ Us(e) : e, Pt = (e) => X(e) ? /* @__PURE__ */ gs(e) : e;
// @__NO_SIDE_EFFECTS__
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ol(e) {
  return /* @__PURE__ */ de(e) ? e.value : e;
}
const ll = {
  get: (e, t, n) => t === "__v_raw" ? e : ol(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return /* @__PURE__ */ de(r) && !/* @__PURE__ */ de(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ai(e) {
  return /* @__PURE__ */ pt(e) ? e : new Proxy(e, ll);
}
class cl {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new fi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Xt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    J !== this)
      return oi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ai(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function al(e, t, n = !1) {
  let s, r;
  return B(e) ? s = e : (s = e.get, r = e.set), new cl(s, r, n);
}
const hn = {}, xn = /* @__PURE__ */ new WeakMap();
let at;
function ul(e, t = !1, n = at) {
  if (n) {
    let s = xn.get(n);
    s || xn.set(n, s = []), s.push(e);
  }
}
function fl(e, t, n = G) {
  const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n, f = (P) => r ? P : /* @__PURE__ */ Te(P) || r === !1 || r === 0 ? Ke(P, 1) : Ke(P);
  let a, p, E, T, g = !1, S = !1;
  if (/* @__PURE__ */ de(e) ? (p = () => e.value, g = /* @__PURE__ */ Te(e)) : /* @__PURE__ */ pt(e) ? (p = () => f(e), g = !0) : j(e) ? (S = !0, g = e.some((P) => /* @__PURE__ */ pt(P) || /* @__PURE__ */ Te(P)), p = () => e.map((P) => {
    if (/* @__PURE__ */ de(P))
      return P.value;
    if (/* @__PURE__ */ pt(P))
      return f(P);
    if (B(P))
      return c ? c(P, 2) : P();
  })) : B(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (E) {
      Je();
      try {
        E();
      } finally {
        Xe();
      }
    }
    const P = at;
    at = a;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      at = P;
    }
  } : p = Ue, t && r) {
    const P = p, k = r === !0 ? 1 / 0 : r;
    p = () => Ke(P(), k);
  }
  const C = Uo(), v = () => {
    a.stop(), C && C.active && vs(C.effects, a);
  };
  if (i && t) {
    const P = t;
    t = (...k) => {
      P(...k), v();
    };
  }
  let L = S ? new Array(e.length).fill(hn) : hn;
  const F = (P) => {
    if (!(!(a.flags & 1) || !a.dirty && !P))
      if (t) {
        const k = a.run();
        if (r || g || (S ? k.some((ie, Q) => ft(ie, L[Q])) : ft(k, L))) {
          E && E();
          const ie = at;
          at = a;
          try {
            const Q = [
              k,
              // pass undefined as the old value when it's changed for the first time
              L === hn ? void 0 : S && L[0] === hn ? [] : L,
              T
            ];
            L = k, c ? c(t, 3, Q) : (
              // @ts-expect-error
              t(...Q)
            );
          } finally {
            at = ie;
          }
        }
      } else
        a.run();
  };
  return l && l(F), a = new ri(p), a.scheduler = o ? () => o(F, !1) : F, T = (P) => ul(P, !1, a), E = a.onStop = () => {
    const P = xn.get(a);
    if (P) {
      if (c)
        c(P, 4);
      else
        for (const k of P) k();
      xn.delete(a);
    }
  }, t ? s ? F(!0) : L = a.run() : o ? o(F.bind(null, !0), !0) : a.run(), v.pause = a.pause.bind(a), v.resume = a.resume.bind(a), v.stop = v, v;
}
function Ke(e, t = 1 / 0, n) {
  if (t <= 0 || !X(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ de(e))
    Ke(e.value, t, n);
  else if (j(e))
    for (let s = 0; s < e.length; s++)
      Ke(e[s], t, n);
  else if (Jr(e) || Ct(e))
    e.forEach((s) => {
      Ke(s, t, n);
    });
  else if ($r(e)) {
    for (const s in e)
      Ke(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Ke(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function sn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    Ln(r, t, n);
  }
}
function qe(e, t, n, s) {
  if (B(e)) {
    const r = sn(e, t, n, s);
    return r && Xr(r) && r.catch((i) => {
      Ln(i, t, n);
    }), r;
  }
  if (j(e)) {
    const r = [];
    for (let i = 0; i < e.length; i++)
      r.push(qe(e[i], t, n, s));
    return r;
  }
}
function Ln(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: o } = t && t.appContext.config || G;
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
      Je(), sn(i, null, 10, [
        e,
        c,
        f
      ]), Xe();
      return;
    }
  }
  dl(e, n, r, s, o);
}
function dl(e, t, n, s = !0, r = !1) {
  if (r)
    throw e;
  console.error(e);
}
const fe = [];
let Fe = -1;
const Rt = [];
let nt = null, St = 0;
const wi = /* @__PURE__ */ Promise.resolve();
let Cn = null;
function pl(e) {
  const t = Cn || wi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function hl(e) {
  let t = Fe + 1, n = fe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = fe[s], i = $t(r);
    i < e || i === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function qs(e) {
  if (!(e.flags & 1)) {
    const t = $t(e), n = fe[fe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= $t(n) ? fe.push(e) : fe.splice(hl(t), 0, e), e.flags |= 1, Ei();
  }
}
function Ei() {
  Cn || (Cn = wi.then(Ii));
}
function ml(e) {
  j(e) ? Rt.push(...e) : nt && e.id === -1 ? nt.splice(St + 1, 0, e) : e.flags & 1 || (Rt.push(e), e.flags |= 1), Ei();
}
function ir(e, t, n = Fe + 1) {
  for (; n < fe.length; n++) {
    const s = fe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      fe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Si(e) {
  if (Rt.length) {
    const t = [...new Set(Rt)].sort(
      (n, s) => $t(n) - $t(s)
    );
    if (Rt.length = 0, nt) {
      nt.push(...t);
      return;
    }
    for (nt = t, St = 0; St < nt.length; St++) {
      const n = nt[St];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    nt = null, St = 0;
  }
}
const $t = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ii(e) {
  try {
    for (Fe = 0; Fe < fe.length; Fe++) {
      const t = fe[Fe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), sn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Fe < fe.length; Fe++) {
      const t = fe[Fe];
      t && (t.flags &= -2);
    }
    Fe = -1, fe.length = 0, Si(), Cn = null, (fe.length || Rt.length) && Ii();
  }
}
let Ee = null, xi = null;
function Rn(e) {
  const t = Ee;
  return Ee = e, xi = e && e.type.__scopeId || null, t;
}
function gl(e, t = Ee, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && gr(-1);
    const i = Rn(t);
    let o;
    try {
      o = e(...r);
    } finally {
      Rn(i), s._d && gr(1);
    }
    return o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Ut(e, t) {
  if (Ee === null)
    return e;
  const n = zn(Ee), s = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, o, l, c = G] = t[r];
    i && (B(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Ke(o), s.push({
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
function lt(e, t, n, s) {
  const r = e.dirs, i = t && t.dirs;
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    i && (l.oldValue = i[o].value);
    let c = l.dir[s];
    c && (Je(), qe(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Xe());
  }
}
function yl(e, t) {
  if (ce) {
    let n = ce.provides;
    const s = ce.parent && ce.parent.provides;
    s === n && (n = ce.provides = Object.create(s)), n[e] = t;
  }
}
function bn(e, t, n = !1) {
  const s = Ac();
  if (s || Tt) {
    let r = Tt ? Tt._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && B(t) ? t.call(s && s.proxy) : t;
  }
}
const bl = /* @__PURE__ */ Symbol.for("v-scx"), Al = () => bn(bl);
function ns(e, t, n) {
  return Ci(e, t, n);
}
function Ci(e, t, n = G) {
  const { immediate: s, deep: r, flush: i, once: o } = n, l = re({}, n), c = t && s || !t && i !== "post";
  let f;
  if (tn) {
    if (i === "sync") {
      const T = Al();
      f = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = Ue, T.resume = Ue, T.pause = Ue, T;
    }
  }
  const a = ce;
  l.call = (T, g, S) => qe(T, a, g, S);
  let p = !1;
  i === "post" ? l.scheduler = (T) => {
    Ae(T, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (T, g) => {
    g ? T() : qs(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const E = fl(e, t, l);
  return tn && (f ? f.push(E) : c && E()), E;
}
function wl(e, t, n) {
  const s = this.proxy, r = ne(e) ? e.includes(".") ? Ri(s, e) : () => s[e] : e.bind(s, s);
  let i;
  B(t) ? i = t : (i = t.handler, n = t);
  const o = rn(this), l = Ci(r, i.bind(s), n);
  return o(), l;
}
function Ri(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const El = /* @__PURE__ */ Symbol("_vte"), Sl = (e) => e.__isTeleport, Il = /* @__PURE__ */ Symbol("_leaveCb");
function zs(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, zs(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Un(e, t) {
  return B(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    re({ name: e.name }, t, { setup: e })
  ) : e;
}
function Ti(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Tn = /* @__PURE__ */ new WeakMap();
function Zt(e, t, n, s, r = !1) {
  if (j(e)) {
    e.forEach(
      (g, S) => Zt(
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
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Zt(e, t, n, s.component.subTree);
    return;
  }
  const i = s.shapeFlag & 4 ? zn(s.component) : s.el, o = r ? null : i, { i: l, r: c } = e, f = t && t.r, a = l.refs === G ? l.refs = {} : l.refs, p = l.setupState, E = /* @__PURE__ */ V(p), T = p === G ? Yr : (g) => q(E, g);
  if (f != null && f !== c) {
    if (or(t), ne(f))
      a[f] = null, T(f) && (p[f] = null);
    else if (/* @__PURE__ */ de(f)) {
      f.value = null;
      const g = t;
      g.k && (a[g.k] = null);
    }
  }
  if (B(c))
    sn(c, l, 12, [o, a]);
  else {
    const g = ne(c), S = /* @__PURE__ */ de(c);
    if (g || S) {
      const C = () => {
        if (e.f) {
          const v = g ? T(c) ? p[c] : a[c] : c.value;
          if (r)
            j(v) && vs(v, i);
          else if (j(v))
            v.includes(i) || v.push(i);
          else if (g)
            a[c] = [i], T(c) && (p[c] = a[c]);
          else {
            const L = [i];
            c.value = L, e.k && (a[e.k] = L);
          }
        } else g ? (a[c] = o, T(c) && (p[c] = o)) : S && (c.value = o, e.k && (a[e.k] = o));
      };
      if (o) {
        const v = () => {
          C(), Tn.delete(e);
        };
        v.id = -1, Tn.set(e, v), Ae(v, n);
      } else
        or(e), C();
    }
  }
}
function or(e) {
  const t = Tn.get(e);
  t && (t.flags |= 8, Tn.delete(e));
}
Nn().requestIdleCallback;
Nn().cancelIdleCallback;
const Kt = (e) => !!e.type.__asyncLoader, Mi = (e) => e.type.__isKeepAlive;
function xl(e, t) {
  Pi(e, "a", t);
}
function Cl(e, t) {
  Pi(e, "da", t);
}
function Pi(e, t, n = ce) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (Hn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Mi(r.parent.vnode) && Rl(s, t, n, r), r = r.parent;
  }
}
function Rl(e, t, n, s) {
  const r = Hn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Oi(() => {
    vs(s[t], r);
  }, n);
}
function Hn(e, t, n = ce, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...o) => {
      Je();
      const l = rn(n), c = qe(t, n, e, o);
      return l(), Xe(), c;
    });
    return s ? r.unshift(i) : r.push(i), i;
  }
}
const $e = (e) => (t, n = ce) => {
  (!tn || e === "sp") && Hn(e, (...s) => t(...s), n);
}, Tl = $e("bm"), Ml = $e("m"), Pl = $e(
  "bu"
), Ol = $e("u"), vl = $e(
  "bum"
), Oi = $e("um"), _l = $e(
  "sp"
), Dl = $e("rtg"), Bl = $e("rtc");
function jl(e, t = ce) {
  Hn("ec", e, t);
}
const Nl = "components";
function ys(e, t) {
  return Ll(Nl, e, !0, t) || e;
}
const Fl = /* @__PURE__ */ Symbol.for("v-ndc");
function Ll(e, t, n = !0, s = !1) {
  const r = Ee || ce;
  if (r) {
    const i = r.type;
    {
      const l = xc(
        i,
        !1
      );
      if (l && (l === t || l === xe(t) || l === jn(xe(t))))
        return i;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      lr(r[e] || i[e], t) || // global registration
      lr(r.appContext[e], t)
    );
    return !o && s ? i : o;
  }
}
function lr(e, t) {
  return e && (e[t] || e[xe(t)] || e[jn(xe(t))]);
}
function Ul(e, t, n, s) {
  let r;
  const i = n, o = j(e);
  if (o || ne(e)) {
    const l = o && /* @__PURE__ */ pt(e);
    let c = !1, f = !1;
    l && (c = !/* @__PURE__ */ Te(e), f = /* @__PURE__ */ rt(e), e = Fn(e)), r = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      r[a] = t(
        c ? f ? Pt(Qe(e[a])) : Qe(e[a]) : e[a],
        a,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let l = 0; l < e; l++)
      r[l] = t(l + 1, l, void 0, i);
  } else if (X(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      r = new Array(l.length);
      for (let c = 0, f = l.length; c < f; c++) {
        const a = l[c];
        r[c] = t(e[a], a, c, i);
      }
    }
  else
    r = [];
  return r;
}
const bs = (e) => e ? Ji(e) ? zn(e) : bs(e.parent) : null, Yt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ re(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => bs(e.parent),
    $root: (e) => bs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => _i(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      qs(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = pl.bind(e.proxy)),
    $watch: (e) => wl.bind(e)
  })
), ss = (e, t) => e !== G && !e.__isScriptSetup && q(e, t), Hl = {
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
        if (ss(s, t))
          return o[t] = 1, s[t];
        if (r !== G && q(r, t))
          return o[t] = 2, r[t];
        if (q(i, t))
          return o[t] = 3, i[t];
        if (n !== G && q(n, t))
          return o[t] = 4, n[t];
        As && (o[t] = 0);
      }
    }
    const f = Yt[t];
    let a, p;
    if (f)
      return t === "$attrs" && le(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== G && q(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, q(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: i } = e;
    return ss(r, t) ? (r[t] = n, !0) : s !== G && q(s, t) ? (s[t] = n, !0) : q(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, props: i, type: o }
  }, l) {
    let c;
    return !!(n[l] || e !== G && l[0] !== "$" && q(e, l) || ss(t, l) || q(i, l) || q(s, l) || q(Yt, l) || q(r.config.globalProperties, l) || (c = o.__cssModules) && c[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function cr(e) {
  return j(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let As = !0;
function kl(e) {
  const t = _i(e), n = e.proxy, s = e.ctx;
  As = !1, t.beforeCreate && ar(t.beforeCreate, e, "bc");
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
    beforeUpdate: T,
    updated: g,
    activated: S,
    deactivated: C,
    beforeDestroy: v,
    beforeUnmount: L,
    destroyed: F,
    unmounted: P,
    render: k,
    renderTracked: ie,
    renderTriggered: Q,
    errorCaptured: Ie,
    serverPrefetch: ze,
    // public API
    expose: Pe,
    inheritAttrs: et,
    // assets
    components: We,
    directives: Oe,
    filters: Ce
  } = t;
  if (f && ql(f, s, null), o)
    for (const K in o) {
      const U = o[K];
      B(U) && (s[K] = U.bind(n));
    }
  if (r) {
    const K = r.call(n, n);
    X(K) && (e.data = /* @__PURE__ */ Us(K));
  }
  if (As = !0, i)
    for (const K in i) {
      const U = i[K], ve = B(U) ? U.bind(n, n) : B(U.get) ? U.get.bind(n, n) : Ue, bt = !B(U) && B(U.set) ? U.set.bind(n) : Ue, oe = Rc({
        get: ve,
        set: bt
      });
      Object.defineProperty(s, K, {
        enumerable: !0,
        configurable: !0,
        get: () => oe.value,
        set: (se) => oe.value = se
      });
    }
  if (l)
    for (const K in l)
      vi(l[K], s, n, K);
  if (c) {
    const K = B(c) ? c.call(n) : c;
    Reflect.ownKeys(K).forEach((U) => {
      yl(U, K[U]);
    });
  }
  a && ar(a, e, "c");
  function Z(K, U) {
    j(U) ? U.forEach((ve) => K(ve.bind(n))) : U && K(U.bind(n));
  }
  if (Z(Tl, p), Z(Ml, E), Z(Pl, T), Z(Ol, g), Z(xl, S), Z(Cl, C), Z(jl, Ie), Z(Bl, ie), Z(Dl, Q), Z(vl, L), Z(Oi, P), Z(_l, ze), j(Pe))
    if (Pe.length) {
      const K = e.exposed || (e.exposed = {});
      Pe.forEach((U) => {
        Object.defineProperty(K, U, {
          get: () => n[U],
          set: (ve) => n[U] = ve,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  k && e.render === Ue && (e.render = k), et != null && (e.inheritAttrs = et), We && (e.components = We), Oe && (e.directives = Oe), ze && Ti(e);
}
function ql(e, t, n = Ue) {
  j(e) && (e = ws(e));
  for (const s in e) {
    const r = e[s];
    let i;
    X(r) ? "default" in r ? i = bn(
      r.from || s,
      r.default,
      !0
    ) : i = bn(r.from || s) : i = bn(r), /* @__PURE__ */ de(i) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (o) => i.value = o
    }) : t[s] = i;
  }
}
function ar(e, t, n) {
  qe(
    j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function vi(e, t, n, s) {
  let r = s.includes(".") ? Ri(n, s) : () => n[s];
  if (ne(e)) {
    const i = t[e];
    B(i) && ns(r, i);
  } else if (B(e))
    ns(r, e.bind(n));
  else if (X(e))
    if (j(e))
      e.forEach((i) => vi(i, t, n, s));
    else {
      const i = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(i) && ns(r, i, e);
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
    (f) => Mn(c, f, o, !0)
  ), Mn(c, t, o)), X(t) && i.set(t, c), c;
}
function Mn(e, t, n, s = !1) {
  const { mixins: r, extends: i } = t;
  i && Mn(e, i, n, !0), r && r.forEach(
    (o) => Mn(e, o, n, !0)
  );
  for (const o in t)
    if (!(s && o === "expose")) {
      const l = zl[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const zl = {
  data: ur,
  props: fr,
  emits: fr,
  // objects
  methods: zt,
  computed: zt,
  // lifecycle
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  // assets
  components: zt,
  directives: zt,
  // watch
  watch: Vl,
  // provide / inject
  provide: ur,
  inject: Wl
};
function ur(e, t) {
  return t ? e ? function() {
    return re(
      B(e) ? e.call(this, this) : e,
      B(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Wl(e, t) {
  return zt(ws(e), ws(t));
}
function ws(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function zt(e, t) {
  return e ? re(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function fr(e, t) {
  return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : re(
    /* @__PURE__ */ Object.create(null),
    cr(e),
    cr(t ?? {})
  ) : t;
}
function Vl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = re(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ue(e[s], t[s]);
  return n;
}
function Di() {
  return {
    app: null,
    config: {
      isNativeTag: Yr,
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
let Gl = 0;
function Zl(e, t) {
  return function(s, r = null) {
    B(s) || (s = re({}, s)), r != null && !X(r) && (r = null);
    const i = Di(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const f = i.app = {
      _uid: Gl++,
      _component: s,
      _props: r,
      _container: null,
      _context: i,
      _instance: null,
      version: Tc,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return o.has(a) || (a && B(a.install) ? (o.add(a), a.install(f, ...p)) : B(a) && (o.add(a), a(f, ...p))), f;
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
          const T = f._ceVNode || ke(s, r);
          return T.appContext = i, E === !0 ? E = "svg" : E === !1 && (E = void 0), e(T, a, E), c = !0, f._container = a, a.__vue_app__ = f, zn(T.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (qe(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, f;
      },
      runWithContext(a) {
        const p = Tt;
        Tt = f;
        try {
          return a();
        } finally {
          Tt = p;
        }
      }
    };
    return f;
  };
}
let Tt = null;
const Kl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${xe(t)}Modifiers`] || e[`${yt(t)}Modifiers`];
function Yl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || G;
  let r = n;
  const i = t.startsWith("update:"), o = i && Kl(s, t.slice(7));
  o && (o.trim && (r = n.map((a) => ne(a) ? a.trim() : a)), o.number && (r = n.map(Ds)));
  let l, c = s[l = Xn(t)] || // also try camelCase event handler (#2249)
  s[l = Xn(xe(t))];
  !c && i && (c = s[l = Xn(yt(t))]), c && qe(
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
    e.emitted[l] = !0, qe(
      f,
      e,
      6,
      r
    );
  }
}
const Jl = /* @__PURE__ */ new WeakMap();
function Bi(e, t, n = !1) {
  const s = n ? Jl : t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const i = e.emits;
  let o = {}, l = !1;
  if (!B(e)) {
    const c = (f) => {
      const a = Bi(f, t, !0);
      a && (l = !0, re(o, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (X(e) && s.set(e, null), null) : (j(i) ? i.forEach((c) => o[c] = null) : re(o, i), X(e) && s.set(e, o), o);
}
function kn(e, t) {
  return !e || !_n(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, yt(t)) || q(e, t));
}
function dr(e) {
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
    setupState: T,
    ctx: g,
    inheritAttrs: S
  } = e, C = Rn(e);
  let v, L;
  try {
    if (n.shapeFlag & 4) {
      const P = r || s, k = P;
      v = Le(
        f.call(
          k,
          P,
          a,
          p,
          T,
          E,
          g
        )
      ), L = l;
    } else {
      const P = t;
      v = Le(
        P.length > 1 ? P(
          p,
          { attrs: l, slots: o, emit: c }
        ) : P(
          p,
          null
        )
      ), L = t.props ? l : Xl(l);
    }
  } catch (P) {
    Jt.length = 0, Ln(P, e, 1), v = ke(it);
  }
  let F = v;
  if (L && S !== !1) {
    const P = Object.keys(L), { shapeFlag: k } = F;
    P.length && k & 7 && (i && P.some(Os) && (L = Ql(
      L,
      i
    )), F = Ot(F, L, !1, !0));
  }
  return n.dirs && (F = Ot(F, null, !1, !0), F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs), n.transition && zs(F, n.transition), v = F, Rn(C), v;
}
const Xl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || _n(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ql = (e, t) => {
  const n = {};
  for (const s in e)
    (!Os(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function $l(e, t, n) {
  const { props: s, children: r, component: i } = e, { props: o, children: l, patchFlag: c } = t, f = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? pr(s, o, f) : !!o;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const E = a[p];
        if (o[E] !== s[E] && !kn(f, E))
          return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? pr(s, o, f) : !0 : !!o;
  return !1;
}
function pr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const i = s[r];
    if (t[i] !== e[i] && !kn(n, i))
      return !0;
  }
  return !1;
}
function ec({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const ji = {}, Ni = () => Object.create(ji), Fi = (e) => Object.getPrototypeOf(e) === ji;
function tc(e, t, n, s = !1) {
  const r = {}, i = Ni();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Li(e, t, r, i);
  for (const o in e.propsOptions[0])
    o in r || (r[o] = void 0);
  n ? e.props = s ? r : /* @__PURE__ */ rl(r) : e.type.props ? e.props = r : e.props = i, e.attrs = i;
}
function nc(e, t, n, s) {
  const {
    props: r,
    attrs: i,
    vnode: { patchFlag: o }
  } = e, l = /* @__PURE__ */ V(r), [c] = e.propsOptions;
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
        if (kn(e.emitsOptions, E))
          continue;
        const T = t[E];
        if (c)
          if (q(i, E))
            T !== i[E] && (i[E] = T, f = !0);
          else {
            const g = xe(E);
            r[g] = Es(
              c,
              l,
              g,
              T,
              e,
              !1
            );
          }
        else
          T !== i[E] && (i[E] = T, f = !0);
      }
    }
  } else {
    Li(e, t, r, i) && (f = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !q(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = yt(p)) === p || !q(t, a))) && (c ? n && // for camelCase
      (n[p] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[p] = Es(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete r[p]);
    if (i !== l)
      for (const p in i)
        (!t || !q(t, p)) && (delete i[p], f = !0);
  }
  f && Ze(e.attrs, "set", "");
}
function Li(e, t, n, s) {
  const [r, i] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (Wt(c))
        continue;
      const f = t[c];
      let a;
      r && q(r, a = xe(c)) ? !i || !i.includes(a) ? n[a] = f : (l || (l = {}))[a] = f : kn(e.emitsOptions, c) || (!(c in s) || f !== s[c]) && (s[c] = f, o = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ V(n), f = l || G;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      n[p] = Es(
        r,
        c,
        p,
        f[p],
        e,
        !q(f, p)
      );
    }
  }
  return o;
}
function Es(e, t, n, s, r, i) {
  const o = e[n];
  if (o != null) {
    const l = q(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && B(c)) {
        const { propsDefaults: f } = r;
        if (n in f)
          s = f[n];
        else {
          const a = rn(r);
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
    ] && (s === "" || s === yt(n)) && (s = !0));
  }
  return s;
}
const sc = /* @__PURE__ */ new WeakMap();
function Ui(e, t, n = !1) {
  const s = n ? sc : t.propsCache, r = s.get(e);
  if (r)
    return r;
  const i = e.props, o = {}, l = [];
  let c = !1;
  if (!B(e)) {
    const a = (p) => {
      c = !0;
      const [E, T] = Ui(p, t, !0);
      re(o, E), T && l.push(...T);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return X(e) && s.set(e, xt), xt;
  if (j(i))
    for (let a = 0; a < i.length; a++) {
      const p = xe(i[a]);
      hr(p) && (o[p] = G);
    }
  else if (i)
    for (const a in i) {
      const p = xe(a);
      if (hr(p)) {
        const E = i[a], T = o[p] = j(E) || B(E) ? { type: E } : re({}, E), g = T.type;
        let S = !1, C = !0;
        if (j(g))
          for (let v = 0; v < g.length; ++v) {
            const L = g[v], F = B(L) && L.name;
            if (F === "Boolean") {
              S = !0;
              break;
            } else F === "String" && (C = !1);
          }
        else
          S = B(g) && g.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = S, T[
          1
          /* shouldCastTrue */
        ] = C, (S || q(T, "default")) && l.push(p);
      }
    }
  const f = [o, l];
  return X(e) && s.set(e, f), f;
}
function hr(e) {
  return e[0] !== "$" && !Wt(e);
}
const Ws = (e) => e === "_" || e === "_ctx" || e === "$stable", Vs = (e) => j(e) ? e.map(Le) : [Le(e)], rc = (e, t, n) => {
  if (t._n)
    return t;
  const s = gl((...r) => Vs(t(...r)), n);
  return s._c = !1, s;
}, Hi = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (Ws(r)) continue;
    const i = e[r];
    if (B(i))
      t[r] = rc(r, i, s);
    else if (i != null) {
      const o = Vs(i);
      t[r] = () => o;
    }
  }
}, ki = (e, t) => {
  const n = Vs(t);
  e.slots.default = () => n;
}, qi = (e, t, n) => {
  for (const s in t)
    (n || !Ws(s)) && (e[s] = t[s]);
}, ic = (e, t, n) => {
  const s = e.slots = Ni();
  if (e.vnode.shapeFlag & 32) {
    const r = t._;
    r ? (qi(s, t, n), n && ei(s, "_", r, !0)) : Hi(t, s);
  } else t && ki(e, t);
}, oc = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let i = !0, o = G;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : qi(r, t, n) : (i = !t.$stable, Hi(t, r)), o = t;
  } else t && (ki(e, t), o = { default: 1 });
  if (i)
    for (const l in r)
      !Ws(l) && o[l] == null && delete r[l];
}, Ae = fc;
function lc(e) {
  return cc(e);
}
function cc(e, t) {
  const n = Nn();
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
    setScopeId: T = Ue,
    insertStaticContent: g
  } = e, S = (u, d, m, w = null, y = null, b = null, R = void 0, x = null, I = !!d.dynamicChildren) => {
    if (u === d)
      return;
    u && !Ht(u, d) && (w = fn(u), se(u, y, b, !0), u = null), d.patchFlag === -2 && (I = !1, d.dynamicChildren = null);
    const { type: A, ref: _, shapeFlag: M } = d;
    switch (A) {
      case qn:
        C(u, d, m, w);
        break;
      case it:
        v(u, d, m, w);
        break;
      case is:
        u == null && L(d, m, w, R);
        break;
      case we:
        We(
          u,
          d,
          m,
          w,
          y,
          b,
          R,
          x,
          I
        );
        break;
      default:
        M & 1 ? k(
          u,
          d,
          m,
          w,
          y,
          b,
          R,
          x,
          I
        ) : M & 6 ? Oe(
          u,
          d,
          m,
          w,
          y,
          b,
          R,
          x,
          I
        ) : (M & 64 || M & 128) && A.process(
          u,
          d,
          m,
          w,
          y,
          b,
          R,
          x,
          I,
          Nt
        );
    }
    _ != null && y ? Zt(_, u && u.ref, b, d || u, !d) : _ == null && u && u.ref != null && Zt(u.ref, null, b, u, !0);
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
  }, v = (u, d, m, w) => {
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
  }, F = ({ el: u, anchor: d }, m, w) => {
    let y;
    for (; u && u !== d; )
      y = E(u), s(u, m, w), u = y;
    s(d, m, w);
  }, P = ({ el: u, anchor: d }) => {
    let m;
    for (; u && u !== d; )
      m = E(u), r(u), u = m;
    r(d);
  }, k = (u, d, m, w, y, b, R, x, I) => {
    if (d.type === "svg" ? R = "svg" : d.type === "math" && (R = "mathml"), u == null)
      ie(
        d,
        m,
        w,
        y,
        b,
        R,
        x,
        I
      );
    else {
      const A = u.el && u.el._isVueCE ? u.el : null;
      try {
        A && A._beginPatch(), ze(
          u,
          d,
          y,
          b,
          R,
          x,
          I
        );
      } finally {
        A && A._endPatch();
      }
    }
  }, ie = (u, d, m, w, y, b, R, x) => {
    let I, A;
    const { props: _, shapeFlag: M, transition: O, dirs: D } = u;
    if (I = u.el = o(
      u.type,
      b,
      _ && _.is,
      _
    ), M & 8 ? a(I, u.children) : M & 16 && Ie(
      u.children,
      I,
      null,
      w,
      y,
      rs(u, b),
      R,
      x
    ), D && lt(u, null, w, "created"), Q(I, u, u.scopeId, R, w), _) {
      for (const Y in _)
        Y !== "value" && !Wt(Y) && i(I, Y, null, _[Y], b, w);
      "value" in _ && i(I, "value", null, _.value, b), (A = _.onVnodeBeforeMount) && je(A, w, u);
    }
    D && lt(u, null, w, "beforeMount");
    const H = ac(y, O);
    H && O.beforeEnter(I), s(I, d, m), ((A = _ && _.onVnodeMounted) || H || D) && Ae(() => {
      A && je(A, w, u), H && O.enter(I), D && lt(u, null, w, "mounted");
    }, y);
  }, Q = (u, d, m, w, y) => {
    if (m && T(u, m), w)
      for (let b = 0; b < w.length; b++)
        T(u, w[b]);
    if (y) {
      let b = y.subTree;
      if (d === b || Gi(b.type) && (b.ssContent === d || b.ssFallback === d)) {
        const R = y.vnode;
        Q(
          u,
          R,
          R.scopeId,
          R.slotScopeIds,
          y.parent
        );
      }
    }
  }, Ie = (u, d, m, w, y, b, R, x, I = 0) => {
    for (let A = I; A < u.length; A++) {
      const _ = u[A] = x ? st(u[A]) : Le(u[A]);
      S(
        null,
        _,
        d,
        m,
        w,
        y,
        b,
        R,
        x
      );
    }
  }, ze = (u, d, m, w, y, b, R) => {
    const x = d.el = u.el;
    let { patchFlag: I, dynamicChildren: A, dirs: _ } = d;
    I |= u.patchFlag & 16;
    const M = u.props || G, O = d.props || G;
    let D;
    if (m && ct(m, !1), (D = O.onVnodeBeforeUpdate) && je(D, m, d, u), _ && lt(d, u, m, "beforeUpdate"), m && ct(m, !0), (M.innerHTML && O.innerHTML == null || M.textContent && O.textContent == null) && a(x, ""), A ? Pe(
      u.dynamicChildren,
      A,
      x,
      m,
      w,
      rs(d, y),
      b
    ) : R || U(
      u,
      d,
      x,
      null,
      m,
      w,
      rs(d, y),
      b,
      !1
    ), I > 0) {
      if (I & 16)
        et(x, M, O, m, y);
      else if (I & 2 && M.class !== O.class && i(x, "class", null, O.class, y), I & 4 && i(x, "style", M.style, O.style, y), I & 8) {
        const H = d.dynamicProps;
        for (let Y = 0; Y < H.length; Y++) {
          const z = H[Y], pe = M[z], he = O[z];
          (he !== pe || z === "value") && i(x, z, pe, he, y, m);
        }
      }
      I & 1 && u.children !== d.children && a(x, d.children);
    } else !R && A == null && et(x, M, O, m, y);
    ((D = O.onVnodeUpdated) || _) && Ae(() => {
      D && je(D, m, d, u), _ && lt(d, u, m, "updated");
    }, w);
  }, Pe = (u, d, m, w, y, b, R) => {
    for (let x = 0; x < d.length; x++) {
      const I = u[x], A = d[x], _ = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        I.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (I.type === we || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ht(I, A) || // - In the case of a component, it could contain anything.
        I.shapeFlag & 198) ? p(I.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      S(
        I,
        A,
        _,
        null,
        w,
        y,
        b,
        R,
        !0
      );
    }
  }, et = (u, d, m, w, y) => {
    if (d !== m) {
      if (d !== G)
        for (const b in d)
          !Wt(b) && !(b in m) && i(
            u,
            b,
            d[b],
            null,
            y,
            w
          );
      for (const b in m) {
        if (Wt(b)) continue;
        const R = m[b], x = d[b];
        R !== x && b !== "value" && i(u, b, x, R, y, w);
      }
      "value" in m && i(u, "value", d.value, m.value, y);
    }
  }, We = (u, d, m, w, y, b, R, x, I) => {
    const A = d.el = u ? u.el : l(""), _ = d.anchor = u ? u.anchor : l("");
    let { patchFlag: M, dynamicChildren: O, slotScopeIds: D } = d;
    D && (x = x ? x.concat(D) : D), u == null ? (s(A, m, w), s(_, m, w), Ie(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      _,
      y,
      b,
      R,
      x,
      I
    )) : M > 0 && M & 64 && O && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    u.dynamicChildren && u.dynamicChildren.length === O.length ? (Pe(
      u.dynamicChildren,
      O,
      m,
      y,
      b,
      R,
      x
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || y && d === y.subTree) && zi(
      u,
      d,
      !0
      /* shallow */
    )) : U(
      u,
      d,
      m,
      _,
      y,
      b,
      R,
      x,
      I
    );
  }, Oe = (u, d, m, w, y, b, R, x, I) => {
    d.slotScopeIds = x, u == null ? d.shapeFlag & 512 ? y.ctx.activate(
      d,
      m,
      w,
      R,
      I
    ) : Ce(
      d,
      m,
      w,
      y,
      b,
      R,
      I
    ) : Bt(u, d, I);
  }, Ce = (u, d, m, w, y, b, R) => {
    const x = u.component = bc(
      u,
      w,
      y
    );
    if (Mi(u) && (x.ctx.renderer = Nt), wc(x, !1, R), x.asyncDep) {
      if (y && y.registerDep(x, Z, R), !u.el) {
        const I = x.subTree = ke(it);
        v(null, I, d, m), u.placeholder = I.el;
      }
    } else
      Z(
        x,
        u,
        d,
        m,
        y,
        b,
        R
      );
  }, Bt = (u, d, m) => {
    const w = d.component = u.component;
    if ($l(u, d, m))
      if (w.asyncDep && !w.asyncResolved) {
        K(w, d, m);
        return;
      } else
        w.next = d, w.update();
    else
      d.el = u.el, w.vnode = d;
  }, Z = (u, d, m, w, y, b, R) => {
    const x = () => {
      if (u.isMounted) {
        let { next: M, bu: O, u: D, parent: H, vnode: Y } = u;
        {
          const De = Wi(u);
          if (De) {
            M && (M.el = Y.el, K(u, M, R)), De.asyncDep.then(() => {
              u.isUnmounted || x();
            });
            return;
          }
        }
        let z = M, pe;
        ct(u, !1), M ? (M.el = Y.el, K(u, M, R)) : M = Y, O && yn(O), (pe = M.props && M.props.onVnodeBeforeUpdate) && je(pe, H, M, Y), ct(u, !0);
        const he = dr(u), _e = u.subTree;
        u.subTree = he, S(
          _e,
          he,
          // parent may have changed if it's in a teleport
          p(_e.el),
          // anchor may have changed if it's in a fragment
          fn(_e),
          u,
          y,
          b
        ), M.el = he.el, z === null && ec(u, he.el), D && Ae(D, y), (pe = M.props && M.props.onVnodeUpdated) && Ae(
          () => je(pe, H, M, Y),
          y
        );
      } else {
        let M;
        const { el: O, props: D } = d, { bm: H, m: Y, parent: z, root: pe, type: he } = u, _e = Kt(d);
        ct(u, !1), H && yn(H), !_e && (M = D && D.onVnodeBeforeMount) && je(M, z, d), ct(u, !0);
        {
          pe.ce && // @ts-expect-error _def is private
          pe.ce._def.shadowRoot !== !1 && pe.ce._injectChildStyle(he);
          const De = u.subTree = dr(u);
          S(
            null,
            De,
            m,
            w,
            u,
            y,
            b
          ), d.el = De.el;
        }
        if (Y && Ae(Y, y), !_e && (M = D && D.onVnodeMounted)) {
          const De = d;
          Ae(
            () => je(M, z, De),
            y
          );
        }
        (d.shapeFlag & 256 || z && Kt(z.vnode) && z.vnode.shapeFlag & 256) && u.a && Ae(u.a, y), u.isMounted = !0, d = m = w = null;
      }
    };
    u.scope.on();
    const I = u.effect = new ri(x);
    u.scope.off();
    const A = u.update = I.run.bind(I), _ = u.job = I.runIfDirty.bind(I);
    _.i = u, _.id = u.uid, I.scheduler = () => qs(_), ct(u, !0), A();
  }, K = (u, d, m) => {
    d.component = u;
    const w = u.vnode.props;
    u.vnode = d, u.next = null, nc(u, d.props, w, m), oc(u, d.children, m), Je(), ir(u), Xe();
  }, U = (u, d, m, w, y, b, R, x, I = !1) => {
    const A = u && u.children, _ = u ? u.shapeFlag : 0, M = d.children, { patchFlag: O, shapeFlag: D } = d;
    if (O > 0) {
      if (O & 128) {
        bt(
          A,
          M,
          m,
          w,
          y,
          b,
          R,
          x,
          I
        );
        return;
      } else if (O & 256) {
        ve(
          A,
          M,
          m,
          w,
          y,
          b,
          R,
          x,
          I
        );
        return;
      }
    }
    D & 8 ? (_ & 16 && jt(A, y, b), M !== A && a(m, M)) : _ & 16 ? D & 16 ? bt(
      A,
      M,
      m,
      w,
      y,
      b,
      R,
      x,
      I
    ) : jt(A, y, b, !0) : (_ & 8 && a(m, ""), D & 16 && Ie(
      M,
      m,
      w,
      y,
      b,
      R,
      x,
      I
    ));
  }, ve = (u, d, m, w, y, b, R, x, I) => {
    u = u || xt, d = d || xt;
    const A = u.length, _ = d.length, M = Math.min(A, _);
    let O;
    for (O = 0; O < M; O++) {
      const D = d[O] = I ? st(d[O]) : Le(d[O]);
      S(
        u[O],
        D,
        m,
        null,
        y,
        b,
        R,
        x,
        I
      );
    }
    A > _ ? jt(
      u,
      y,
      b,
      !0,
      !1,
      M
    ) : Ie(
      d,
      m,
      w,
      y,
      b,
      R,
      x,
      I,
      M
    );
  }, bt = (u, d, m, w, y, b, R, x, I) => {
    let A = 0;
    const _ = d.length;
    let M = u.length - 1, O = _ - 1;
    for (; A <= M && A <= O; ) {
      const D = u[A], H = d[A] = I ? st(d[A]) : Le(d[A]);
      if (Ht(D, H))
        S(
          D,
          H,
          m,
          null,
          y,
          b,
          R,
          x,
          I
        );
      else
        break;
      A++;
    }
    for (; A <= M && A <= O; ) {
      const D = u[M], H = d[O] = I ? st(d[O]) : Le(d[O]);
      if (Ht(D, H))
        S(
          D,
          H,
          m,
          null,
          y,
          b,
          R,
          x,
          I
        );
      else
        break;
      M--, O--;
    }
    if (A > M) {
      if (A <= O) {
        const D = O + 1, H = D < _ ? d[D].el : w;
        for (; A <= O; )
          S(
            null,
            d[A] = I ? st(d[A]) : Le(d[A]),
            m,
            H,
            y,
            b,
            R,
            x,
            I
          ), A++;
      }
    } else if (A > O)
      for (; A <= M; )
        se(u[A], y, b, !0), A++;
    else {
      const D = A, H = A, Y = /* @__PURE__ */ new Map();
      for (A = H; A <= O; A++) {
        const be = d[A] = I ? st(d[A]) : Le(d[A]);
        be.key != null && Y.set(be.key, A);
      }
      let z, pe = 0;
      const he = O - H + 1;
      let _e = !1, De = 0;
      const Ft = new Array(he);
      for (A = 0; A < he; A++) Ft[A] = 0;
      for (A = D; A <= M; A++) {
        const be = u[A];
        if (pe >= he) {
          se(be, y, b, !0);
          continue;
        }
        let Be;
        if (be.key != null)
          Be = Y.get(be.key);
        else
          for (z = H; z <= O; z++)
            if (Ft[z - H] === 0 && Ht(be, d[z])) {
              Be = z;
              break;
            }
        Be === void 0 ? se(be, y, b, !0) : (Ft[Be - H] = A + 1, Be >= De ? De = Be : _e = !0, S(
          be,
          d[Be],
          m,
          null,
          y,
          b,
          R,
          x,
          I
        ), pe++);
      }
      const Qs = _e ? uc(Ft) : xt;
      for (z = Qs.length - 1, A = he - 1; A >= 0; A--) {
        const be = H + A, Be = d[be], $s = d[be + 1], er = be + 1 < _ ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          $s.el || Vi($s)
        ) : w;
        Ft[A] === 0 ? S(
          null,
          Be,
          m,
          er,
          y,
          b,
          R,
          x,
          I
        ) : _e && (z < 0 || A !== Qs[z] ? oe(Be, m, er, 2) : z--);
      }
    }
  }, oe = (u, d, m, w, y = null) => {
    const { el: b, type: R, transition: x, children: I, shapeFlag: A } = u;
    if (A & 6) {
      oe(u.component.subTree, d, m, w);
      return;
    }
    if (A & 128) {
      u.suspense.move(d, m, w);
      return;
    }
    if (A & 64) {
      R.move(u, d, m, Nt);
      return;
    }
    if (R === we) {
      s(b, d, m);
      for (let M = 0; M < I.length; M++)
        oe(I[M], d, m, w);
      s(u.anchor, d, m);
      return;
    }
    if (R === is) {
      F(u, d, m);
      return;
    }
    if (w !== 2 && A & 1 && x)
      if (w === 0)
        x.beforeEnter(b), s(b, d, m), Ae(() => x.enter(b), y);
      else {
        const { leave: M, delayLeave: O, afterLeave: D } = x, H = () => {
          u.ctx.isUnmounted ? r(b) : s(b, d, m);
        }, Y = () => {
          b._isLeaving && b[Il](
            !0
            /* cancelled */
          ), M(b, () => {
            H(), D && D();
          });
        };
        O ? O(b, H, Y) : Y();
      }
    else
      s(b, d, m);
  }, se = (u, d, m, w = !1, y = !1) => {
    const {
      type: b,
      props: R,
      ref: x,
      children: I,
      dynamicChildren: A,
      shapeFlag: _,
      patchFlag: M,
      dirs: O,
      cacheIndex: D
    } = u;
    if (M === -2 && (y = !1), x != null && (Je(), Zt(x, null, m, u, !0), Xe()), D != null && (d.renderCache[D] = void 0), _ & 256) {
      d.ctx.deactivate(u);
      return;
    }
    const H = _ & 1 && O, Y = !Kt(u);
    let z;
    if (Y && (z = R && R.onVnodeBeforeUnmount) && je(z, d, u), _ & 6)
      un(u.component, m, w);
    else {
      if (_ & 128) {
        u.suspense.unmount(m, w);
        return;
      }
      H && lt(u, null, d, "beforeUnmount"), _ & 64 ? u.type.remove(
        u,
        d,
        m,
        Nt,
        w
      ) : A && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !A.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (b !== we || M > 0 && M & 64) ? jt(
        A,
        d,
        m,
        !1,
        !0
      ) : (b === we && M & 384 || !y && _ & 16) && jt(I, d, m), w && At(u);
    }
    (Y && (z = R && R.onVnodeUnmounted) || H) && Ae(() => {
      z && je(z, d, u), H && lt(u, null, d, "unmounted");
    }, m);
  }, At = (u) => {
    const { type: d, el: m, anchor: w, transition: y } = u;
    if (d === we) {
      wt(m, w);
      return;
    }
    if (d === is) {
      P(u);
      return;
    }
    const b = () => {
      r(m), y && !y.persisted && y.afterLeave && y.afterLeave();
    };
    if (u.shapeFlag & 1 && y && !y.persisted) {
      const { leave: R, delayLeave: x } = y, I = () => R(m, b);
      x ? x(u.el, b, I) : I();
    } else
      b();
  }, wt = (u, d) => {
    let m;
    for (; u !== d; )
      m = E(u), r(u), u = m;
    r(d);
  }, un = (u, d, m) => {
    const { bum: w, scope: y, job: b, subTree: R, um: x, m: I, a: A } = u;
    mr(I), mr(A), w && yn(w), y.stop(), b && (b.flags |= 8, se(R, u, d, m)), x && Ae(x, d), Ae(() => {
      u.isUnmounted = !0;
    }, d);
  }, jt = (u, d, m, w = !1, y = !1, b = 0) => {
    for (let R = b; R < u.length; R++)
      se(u[R], d, m, w, y);
  }, fn = (u) => {
    if (u.shapeFlag & 6)
      return fn(u.component.subTree);
    if (u.shapeFlag & 128)
      return u.suspense.next();
    const d = E(u.anchor || u.el), m = d && d[El];
    return m ? E(m) : d;
  };
  let Jn = !1;
  const Xs = (u, d, m) => {
    let w;
    u == null ? d._vnode && (se(d._vnode, null, null, !0), w = d._vnode.component) : S(
      d._vnode || null,
      u,
      d,
      null,
      null,
      null,
      m
    ), d._vnode = u, Jn || (Jn = !0, ir(w), Si(), Jn = !1);
  }, Nt = {
    p: S,
    um: se,
    m: oe,
    r: At,
    mt: Ce,
    mc: Ie,
    pc: U,
    pbc: Pe,
    n: fn,
    o: e
  };
  return {
    render: Xs,
    hydrate: void 0,
    createApp: Zl(Xs)
  };
}
function rs({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function ct({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function ac(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function zi(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (j(s) && j(r))
    for (let i = 0; i < s.length; i++) {
      const o = s[i];
      let l = r[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = r[i] = st(r[i]), l.el = o.el), !n && l.patchFlag !== -2 && zi(o, l)), l.type === qn && (l.patchFlag !== -1 ? l.el = o.el : l.__elIndex = i + // take fragment start anchor into account
      (e.type === we ? 1 : 0)), l.type === it && !l.el && (l.el = o.el);
    }
}
function uc(e) {
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
function mr(e) {
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
const Gi = (e) => e.__isSuspense;
function fc(e, t) {
  t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : ml(e);
}
const we = /* @__PURE__ */ Symbol.for("v-fgt"), qn = /* @__PURE__ */ Symbol.for("v-txt"), it = /* @__PURE__ */ Symbol.for("v-cmt"), is = /* @__PURE__ */ Symbol.for("v-stc"), Jt = [];
let Se = null;
function $(e = !1) {
  Jt.push(Se = e ? null : []);
}
function dc() {
  Jt.pop(), Se = Jt[Jt.length - 1] || null;
}
let en = 1;
function gr(e, t = !1) {
  en += e, e < 0 && Se && t && (Se.hasOnce = !0);
}
function Zi(e) {
  return e.dynamicChildren = en > 0 ? Se || xt : null, dc(), en > 0 && Se && Se.push(e), e;
}
function te(e, t, n, s, r, i) {
  return Zi(
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
function Ss(e, t, n, s, r) {
  return Zi(
    ke(
      e,
      t,
      n,
      s,
      r,
      !0
    )
  );
}
function Ki(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Yi = ({ key: e }) => e ?? null, An = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ne(e) || /* @__PURE__ */ de(e) || B(e) ? { i: Ee, r: e, k: t, f: !!n } : e : null);
function W(e, t = null, n = null, s = 0, r = null, i = e === we ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yi(t),
    ref: t && An(t),
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
    ctx: Ee
  };
  return l ? (Gs(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= ne(n) ? 8 : 16), en > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  Se && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Se.push(c), c;
}
const ke = pc;
function pc(e, t = null, n = null, s = 0, r = null, i = !1) {
  if ((!e || e === Fl) && (e = it), Ki(e)) {
    const l = Ot(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Gs(l, n), en > 0 && !i && Se && (l.shapeFlag & 6 ? Se[Se.indexOf(e)] = l : Se.push(l)), l.patchFlag = -2, l;
  }
  if (Cc(e) && (e = e.__vccOpts), t) {
    t = hc(t);
    let { class: l, style: c } = t;
    l && !ne(l) && (t.class = nn(l)), X(c) && (/* @__PURE__ */ ks(c) && !j(c) && (c = re({}, c)), t.style = Bs(c));
  }
  const o = ne(e) ? 1 : Gi(e) ? 128 : Sl(e) ? 64 : X(e) ? 4 : B(e) ? 2 : 0;
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
function hc(e) {
  return e ? /* @__PURE__ */ ks(e) || Fi(e) ? re({}, e) : e : null;
}
function Ot(e, t, n = !1, s = !1) {
  const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e, f = t ? mc(r || {}, t) : r, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Yi(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? j(i) ? i.concat(An(t)) : [i, An(t)] : An(t)
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
    patchFlag: t && e.type !== we ? o === -1 ? 16 : o | 16 : o,
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
  return c && s && zs(
    a,
    c.clone(a)
  ), a;
}
function mt(e = " ", t = 0) {
  return ke(qn, null, e, t);
}
function Ye(e = "", t = !1) {
  return t ? ($(), Ss(it, null, e)) : ke(it, null, e);
}
function Le(e) {
  return e == null || typeof e == "boolean" ? ke(it) : j(e) ? ke(
    we,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Ki(e) ? st(e) : ke(qn, null, String(e));
}
function st(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ot(e);
}
function Gs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (j(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Gs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Fi(t) ? t._ctx = Ee : r === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else B(t) ? (t = { default: t, _ctx: Ee }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [mt(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function mc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = nn([t.class, s.class]));
      else if (r === "style")
        t.style = Bs([t.style, s.style]);
      else if (_n(r)) {
        const i = t[r], o = s[r];
        o && i !== o && !(j(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function je(e, t, n, s = null) {
  qe(e, t, 7, [
    n,
    s
  ]);
}
const gc = Di();
let yc = 0;
function bc(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || gc, i = {
    uid: yc++,
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
    scope: new Lo(
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
    propsOptions: Ui(s, r),
    emitsOptions: Bi(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: G,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: G,
    data: G,
    props: G,
    attrs: G,
    slots: G,
    refs: G,
    setupState: G,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Yl.bind(null, i), e.ce && e.ce(i), i;
}
let ce = null;
const Ac = () => ce || Ee;
let Pn, Is;
{
  const e = Nn(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (i) => {
      r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
    };
  };
  Pn = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ce = n
  ), Is = t(
    "__VUE_SSR_SETTERS__",
    (n) => tn = n
  );
}
const rn = (e) => {
  const t = ce;
  return Pn(e), e.scope.on(), () => {
    e.scope.off(), Pn(t);
  };
}, yr = () => {
  ce && ce.scope.off(), Pn(null);
};
function Ji(e) {
  return e.vnode.shapeFlag & 4;
}
let tn = !1;
function wc(e, t = !1, n = !1) {
  t && Is(t);
  const { props: s, children: r } = e.vnode, i = Ji(e);
  tc(e, s, i, t), ic(e, r, n || t);
  const o = i ? Ec(e, t) : void 0;
  return t && Is(!1), o;
}
function Ec(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Hl);
  const { setup: s } = n;
  if (s) {
    Je();
    const r = e.setupContext = s.length > 1 ? Ic(e) : null, i = rn(e), o = sn(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    ), l = Xr(o);
    if (Xe(), i(), (l || e.sp) && !Kt(e) && Ti(e), l) {
      if (o.then(yr, yr), t)
        return o.then((c) => {
          br(e, c);
        }).catch((c) => {
          Ln(c, e, 0);
        });
      e.asyncDep = o;
    } else
      br(e, o);
  } else
    Xi(e);
}
function br(e, t, n) {
  B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : X(t) && (e.setupState = Ai(t)), Xi(e);
}
function Xi(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Ue);
  {
    const r = rn(e);
    Je();
    try {
      kl(e);
    } finally {
      Xe(), r();
    }
  }
}
const Sc = {
  get(e, t) {
    return le(e, "get", ""), e[t];
  }
};
function Ic(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Sc),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ai(il(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Yt)
        return Yt[n](e);
    },
    has(t, n) {
      return n in t || n in Yt;
    }
  })) : e.proxy;
}
function xc(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Cc(e) {
  return B(e) && "__vccOpts" in e;
}
const Rc = (e, t) => /* @__PURE__ */ al(e, t, tn), Tc = "3.5.27";
/**
* @vue/runtime-dom v3.5.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xs;
const Ar = typeof window < "u" && window.trustedTypes;
if (Ar)
  try {
    xs = /* @__PURE__ */ Ar.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Qi = xs ? (e) => xs.createHTML(e) : (e) => e, Mc = "http://www.w3.org/2000/svg", Pc = "http://www.w3.org/1998/Math/MathML", Ge = typeof document < "u" ? document : null, wr = Ge && /* @__PURE__ */ Ge.createElement("template"), Oc = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? Ge.createElementNS(Mc, e) : t === "mathml" ? Ge.createElementNS(Pc, e) : n ? Ge.createElement(e, { is: n }) : Ge.createElement(e);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => Ge.createTextNode(e),
  createComment: (e) => Ge.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ge.querySelector(e),
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
      wr.innerHTML = Qi(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = wr.content;
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
}, vc = /* @__PURE__ */ Symbol("_vtc");
function _c(e, t, n) {
  const s = e[vc];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const On = /* @__PURE__ */ Symbol("_vod"), $i = /* @__PURE__ */ Symbol("_vsh"), mn = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[On] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : kt(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), kt(e, !0), s.enter(e)) : s.leave(e, () => {
      kt(e, !1);
    }) : kt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    kt(e, t);
  }
};
function kt(e, t) {
  e.style.display = t ? e[On] : "none", e[$i] = !t;
}
const Dc = /* @__PURE__ */ Symbol(""), Bc = /(?:^|;)\s*display\s*:/;
function jc(e, t, n) {
  const s = e.style, r = ne(n);
  let i = !1;
  if (n && !r) {
    if (t)
      if (ne(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && wn(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && wn(s, o, "");
    for (const o in n)
      o === "display" && (i = !0), wn(s, o, n[o]);
  } else if (r) {
    if (t !== n) {
      const o = s[Dc];
      o && (n += ";" + o), s.cssText = n, i = Bc.test(n);
    }
  } else t && e.removeAttribute("style");
  On in e && (e[On] = i ? s.display : "", e[$i] && (s.display = "none"));
}
const Er = /\s*!important$/;
function wn(e, t, n) {
  if (j(n))
    n.forEach((s) => wn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Nc(e, t);
    Er.test(n) ? e.setProperty(
      yt(s),
      n.replace(Er, ""),
      "important"
    ) : e[s] = n;
  }
}
const Sr = ["Webkit", "Moz", "ms"], os = {};
function Nc(e, t) {
  const n = os[t];
  if (n)
    return n;
  let s = xe(t);
  if (s !== "filter" && s in e)
    return os[t] = s;
  s = jn(s);
  for (let r = 0; r < Sr.length; r++) {
    const i = Sr[r] + s;
    if (i in e)
      return os[t] = i;
  }
  return t;
}
const Ir = "http://www.w3.org/1999/xlink";
function xr(e, t, n, s, r, i = Fo(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Ir, t.slice(6, t.length)) : e.setAttributeNS(Ir, t, n) : n == null || i && !ti(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : ot(n) ? String(n) : n
  );
}
function Cr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Qi(n) : n);
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
    l === "boolean" ? n = ti(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  o && e.removeAttribute(r || t);
}
function It(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Fc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Rr = /* @__PURE__ */ Symbol("_vei");
function Lc(e, t, n, s, r = null) {
  const i = e[Rr] || (e[Rr] = {}), o = i[t];
  if (s && o)
    o.value = s;
  else {
    const [l, c] = Uc(t);
    if (s) {
      const f = i[t] = qc(
        s,
        r
      );
      It(e, l, f, c);
    } else o && (Fc(e, l, o, c), i[t] = void 0);
  }
}
const Tr = /(?:Once|Passive|Capture)$/;
function Uc(e) {
  let t;
  if (Tr.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Tr); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : yt(e.slice(2)), t];
}
let ls = 0;
const Hc = /* @__PURE__ */ Promise.resolve(), kc = () => ls || (Hc.then(() => ls = 0), ls = Date.now());
function qc(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    qe(
      zc(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = kc(), n;
}
function zc(e, t) {
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
const Mr = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Wc = (e, t, n, s, r, i) => {
  const o = r === "svg";
  t === "class" ? _c(e, s, o) : t === "style" ? jc(e, n, s) : _n(t) ? Os(t) || Lc(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Vc(e, t, s, o)) ? (Cr(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && xr(e, t, s, o, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ne(s)) ? Cr(e, xe(t), s, i, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), xr(e, t, s, o));
};
function Vc(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Mr(t) && B(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Mr(t) && ne(n) ? !1 : t in e;
}
const Pr = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return j(t) ? (n) => yn(t, n) : t;
};
function Gc(e) {
  e.target.composing = !0;
}
function Or(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const cs = /* @__PURE__ */ Symbol("_assign");
function vr(e, t, n) {
  return t && (e = e.trim()), n && (e = Ds(e)), e;
}
const Zc = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
    e[cs] = Pr(r);
    const i = s || r.props && r.props.type === "number";
    It(e, t ? "change" : "input", (o) => {
      o.target.composing || e[cs](vr(e.value, n, i));
    }), (n || i) && It(e, "change", () => {
      e.value = vr(e.value, n, i);
    }), t || (It(e, "compositionstart", Gc), It(e, "compositionend", Or), It(e, "change", Or));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
    if (e[cs] = Pr(o), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Ds(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || r && e.value.trim() === c) || (e.value = c));
  }
}, Kc = ["ctrl", "shift", "alt", "meta"], Yc = {
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
}, eo = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = (r, ...i) => {
    for (let o = 0; o < t.length; o++) {
      const l = Yc[t[o]];
      if (l && l(r, t)) return;
    }
    return e(r, ...i);
  });
}, Jc = /* @__PURE__ */ re({ patchProp: Wc }, Oc);
let _r;
function Xc() {
  return _r || (_r = lc(Jc));
}
const Qc = (...e) => {
  const t = Xc().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = ea(s);
    if (!r) return;
    const i = t._component;
    !B(i) && !i.render && !i.template && (i.template = r.innerHTML), r.nodeType === 1 && (r.textContent = "");
    const o = n(r, !1, $c(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), o;
  }, t;
};
function $c(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ea(e) {
  return ne(e) ? document.querySelector(e) : e;
}
function to(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: ta } = Object.prototype, { getPrototypeOf: Zs } = Object, { iterator: Wn, toStringTag: no } = Symbol, Vn = /* @__PURE__ */ ((e) => (t) => {
  const n = ta.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Me = (e) => (e = e.toLowerCase(), (t) => Vn(t) === e), Gn = (e) => (t) => typeof t === e, { isArray: _t } = Array, vt = Gn("undefined");
function on(e) {
  return e !== null && !vt(e) && e.constructor !== null && !vt(e.constructor) && ge(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const so = Me("ArrayBuffer");
function na(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && so(e.buffer), t;
}
const sa = Gn("string"), ge = Gn("function"), ro = Gn("number"), ln = (e) => e !== null && typeof e == "object", ra = (e) => e === !0 || e === !1, En = (e) => {
  if (Vn(e) !== "object")
    return !1;
  const t = Zs(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(no in e) && !(Wn in e);
}, ia = (e) => {
  if (!ln(e) || on(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, oa = Me("Date"), la = Me("File"), ca = Me("Blob"), aa = Me("FileList"), ua = (e) => ln(e) && ge(e.pipe), fa = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ge(e.append) && ((t = Vn(e)) === "formdata" || // detect form-data instance
  t === "object" && ge(e.toString) && e.toString() === "[object FormData]"));
}, da = Me("URLSearchParams"), [pa, ha, ma, ga] = ["ReadableStream", "Request", "Response", "Headers"].map(Me), ya = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function cn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let s, r;
  if (typeof e != "object" && (e = [e]), _t(e))
    for (s = 0, r = e.length; s < r; s++)
      t.call(null, e[s], s, e);
  else {
    if (on(e))
      return;
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), o = i.length;
    let l;
    for (s = 0; s < o; s++)
      l = i[s], t.call(null, e[l], l, e);
  }
}
function io(e, t) {
  if (on(e))
    return null;
  t = t.toLowerCase();
  const n = Object.keys(e);
  let s = n.length, r;
  for (; s-- > 0; )
    if (r = n[s], t === r.toLowerCase())
      return r;
  return null;
}
const ut = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, oo = (e) => !vt(e) && e !== ut;
function Cs() {
  const { caseless: e, skipUndefined: t } = oo(this) && this || {}, n = {}, s = (r, i) => {
    const o = e && io(n, i) || i;
    En(n[o]) && En(r) ? n[o] = Cs(n[o], r) : En(r) ? n[o] = Cs({}, r) : _t(r) ? n[o] = r.slice() : (!t || !vt(r)) && (n[o] = r);
  };
  for (let r = 0, i = arguments.length; r < i; r++)
    arguments[r] && cn(arguments[r], s);
  return n;
}
const ba = (e, t, n, { allOwnKeys: s } = {}) => (cn(t, (r, i) => {
  n && ge(r) ? e[i] = to(r, n) : e[i] = r;
}, { allOwnKeys: s }), e), Aa = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), wa = (e, t, n, s) => {
  e.prototype = Object.create(t.prototype, s), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Ea = (e, t, n, s) => {
  let r, i, o;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(e), i = r.length; i-- > 0; )
      o = r[i], (!s || s(o, e, t)) && !l[o] && (t[o] = e[o], l[o] = !0);
    e = n !== !1 && Zs(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Sa = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const s = e.indexOf(t, n);
  return s !== -1 && s === n;
}, Ia = (e) => {
  if (!e) return null;
  if (_t(e)) return e;
  let t = e.length;
  if (!ro(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, xa = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Zs(Uint8Array)), Ca = (e, t) => {
  const s = (e && e[Wn]).call(e);
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
}, Ta = Me("HTMLFormElement"), Ma = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, s, r) {
    return s.toUpperCase() + r;
  }
), Dr = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Pa = Me("RegExp"), lo = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), s = {};
  cn(n, (r, i) => {
    let o;
    (o = t(r, i, e)) !== !1 && (s[i] = o || r);
  }), Object.defineProperties(e, s);
}, Oa = (e) => {
  lo(e, (t, n) => {
    if (ge(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const s = e[n];
    if (ge(s)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, va = (e, t) => {
  const n = {}, s = (r) => {
    r.forEach((i) => {
      n[i] = !0;
    });
  };
  return _t(e) ? s(e) : s(String(e).split(t)), n;
}, _a = () => {
}, Da = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function Ba(e) {
  return !!(e && ge(e.append) && e[no] === "FormData" && e[Wn]);
}
const ja = (e) => {
  const t = new Array(10), n = (s, r) => {
    if (ln(s)) {
      if (t.indexOf(s) >= 0)
        return;
      if (on(s))
        return s;
      if (!("toJSON" in s)) {
        t[r] = s;
        const i = _t(s) ? [] : {};
        return cn(s, (o, l) => {
          const c = n(o, r + 1);
          !vt(c) && (i[l] = c);
        }), t[r] = void 0, i;
      }
    }
    return s;
  };
  return n(e, 0);
}, Na = Me("AsyncFunction"), Fa = (e) => e && (ln(e) || ge(e)) && ge(e.then) && ge(e.catch), co = ((e, t) => e ? setImmediate : t ? ((n, s) => (ut.addEventListener("message", ({ source: r, data: i }) => {
  r === ut && i === n && s.length && s.shift()();
}, !1), (r) => {
  s.push(r), ut.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  ge(ut.postMessage)
), La = typeof queueMicrotask < "u" ? queueMicrotask.bind(ut) : typeof process < "u" && process.nextTick || co, Ua = (e) => e != null && ge(e[Wn]), h = {
  isArray: _t,
  isArrayBuffer: so,
  isBuffer: on,
  isFormData: fa,
  isArrayBufferView: na,
  isString: sa,
  isNumber: ro,
  isBoolean: ra,
  isObject: ln,
  isPlainObject: En,
  isEmptyObject: ia,
  isReadableStream: pa,
  isRequest: ha,
  isResponse: ma,
  isHeaders: ga,
  isUndefined: vt,
  isDate: oa,
  isFile: la,
  isBlob: ca,
  isRegExp: Pa,
  isFunction: ge,
  isStream: ua,
  isURLSearchParams: da,
  isTypedArray: xa,
  isFileList: aa,
  forEach: cn,
  merge: Cs,
  extend: ba,
  trim: ya,
  stripBOM: Aa,
  inherits: wa,
  toFlatObject: Ea,
  kindOf: Vn,
  kindOfTest: Me,
  endsWith: Sa,
  toArray: Ia,
  forEachEntry: Ca,
  matchAll: Ra,
  isHTMLForm: Ta,
  hasOwnProperty: Dr,
  hasOwnProp: Dr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: lo,
  freezeMethods: Oa,
  toObjectSet: va,
  toCamelCase: Ma,
  noop: _a,
  toFiniteNumber: Da,
  findKey: io,
  global: ut,
  isContextDefined: oo,
  isSpecCompliantForm: Ba,
  toJSONObject: ja,
  isAsyncFn: Na,
  isThenable: Fa,
  setImmediate: co,
  asap: La,
  isIterable: Ua
};
function N(e, t, n, s, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), s && (this.request = s), r && (this.response = r, this.status = r.status ? r.status : null);
}
h.inherits(N, Error, {
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
const ao = N.prototype, uo = {};
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
  uo[e] = { value: e };
});
Object.defineProperties(N, uo);
Object.defineProperty(ao, "isAxiosError", { value: !0 });
N.from = (e, t, n, s, r, i) => {
  const o = Object.create(ao);
  h.toFlatObject(e, o, function(a) {
    return a !== Error.prototype;
  }, (f) => f !== "isAxiosError");
  const l = e && e.message ? e.message : "Error", c = t == null && e ? e.code : t;
  return N.call(o, l, c, n, s, r), e && o.cause == null && Object.defineProperty(o, "cause", { value: e, configurable: !0 }), o.name = e && e.name || "Error", i && Object.assign(o, i), o;
};
const Ha = null;
function Rs(e) {
  return h.isPlainObject(e) || h.isArray(e);
}
function fo(e) {
  return h.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Br(e, t, n) {
  return e ? e.concat(t).map(function(r, i) {
    return r = fo(r), !n && i ? "[" + r + "]" : r;
  }).join(n ? "." : "") : t;
}
function ka(e) {
  return h.isArray(e) && !e.some(Rs);
}
const qa = h.toFlatObject(h, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Zn(e, t, n) {
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
      throw new N("Blob is not supported. Use a Buffer instead.");
    return h.isArrayBuffer(g) || h.isTypedArray(g) ? c && typeof Blob == "function" ? new Blob([g]) : Buffer.from(g) : g;
  }
  function a(g, S, C) {
    let v = g;
    if (g && !C && typeof g == "object") {
      if (h.endsWith(S, "{}"))
        S = s ? S : S.slice(0, -2), g = JSON.stringify(g);
      else if (h.isArray(g) && ka(g) || (h.isFileList(g) || h.endsWith(S, "[]")) && (v = h.toArray(g)))
        return S = fo(S), v.forEach(function(F, P) {
          !(h.isUndefined(F) || F === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            o === !0 ? Br([S], P, i) : o === null ? S : S + "[]",
            f(F)
          );
        }), !1;
    }
    return Rs(g) ? !0 : (t.append(Br(C, S, i), f(g)), !1);
  }
  const p = [], E = Object.assign(qa, {
    defaultVisitor: a,
    convertValue: f,
    isVisitable: Rs
  });
  function T(g, S) {
    if (!h.isUndefined(g)) {
      if (p.indexOf(g) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      p.push(g), h.forEach(g, function(v, L) {
        (!(h.isUndefined(v) || v === null) && r.call(
          t,
          v,
          h.isString(L) ? L.trim() : L,
          S,
          E
        )) === !0 && T(v, S ? S.concat(L) : [L]);
      }), p.pop();
    }
  }
  if (!h.isObject(e))
    throw new TypeError("data must be an object");
  return T(e), t;
}
function jr(e) {
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
function Ks(e, t) {
  this._pairs = [], e && Zn(e, this, t);
}
const po = Ks.prototype;
po.append = function(t, n) {
  this._pairs.push([t, n]);
};
po.toString = function(t) {
  const n = t ? function(s) {
    return t.call(this, s, jr);
  } : jr;
  return this._pairs.map(function(r) {
    return n(r[0]) + "=" + n(r[1]);
  }, "").join("&");
};
function za(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ho(e, t, n) {
  if (!t)
    return e;
  const s = n && n.encode || za;
  h.isFunction(n) && (n = {
    serialize: n
  });
  const r = n && n.serialize;
  let i;
  if (r ? i = r(t, n) : i = h.isURLSearchParams(t) ? t.toString() : new Ks(t, n).toString(s), i) {
    const o = e.indexOf("#");
    o !== -1 && (e = e.slice(0, o)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Nr {
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
const mo = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Wa = typeof URLSearchParams < "u" ? URLSearchParams : Ks, Va = typeof FormData < "u" ? FormData : null, Ga = typeof Blob < "u" ? Blob : null, Za = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Wa,
    FormData: Va,
    Blob: Ga
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Ys = typeof window < "u" && typeof document < "u", Ts = typeof navigator == "object" && navigator || void 0, Ka = Ys && (!Ts || ["ReactNative", "NativeScript", "NS"].indexOf(Ts.product) < 0), Ya = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Ja = Ys && window.location.href || "http://localhost", Xa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Ys,
  hasStandardBrowserEnv: Ka,
  hasStandardBrowserWebWorkerEnv: Ya,
  navigator: Ts,
  origin: Ja
}, Symbol.toStringTag, { value: "Module" })), ae = {
  ...Xa,
  ...Za
};
function Qa(e, t) {
  return Zn(e, new ae.classes.URLSearchParams(), {
    visitor: function(n, s, r, i) {
      return ae.isNode && h.isBuffer(n) ? (this.append(s, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function $a(e) {
  return h.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function eu(e) {
  const t = {}, n = Object.keys(e);
  let s;
  const r = n.length;
  let i;
  for (s = 0; s < r; s++)
    i = n[s], t[i] = e[i];
  return t;
}
function go(e) {
  function t(n, s, r, i) {
    let o = n[i++];
    if (o === "__proto__") return !0;
    const l = Number.isFinite(+o), c = i >= n.length;
    return o = !o && h.isArray(r) ? r.length : o, c ? (h.hasOwnProp(r, o) ? r[o] = [r[o], s] : r[o] = s, !l) : ((!r[o] || !h.isObject(r[o])) && (r[o] = []), t(n, s, r[o], i) && h.isArray(r[o]) && (r[o] = eu(r[o])), !l);
  }
  if (h.isFormData(e) && h.isFunction(e.entries)) {
    const n = {};
    return h.forEachEntry(e, (s, r) => {
      t($a(s), r, n, 0);
    }), n;
  }
  return null;
}
function tu(e, t, n) {
  if (h.isString(e))
    try {
      return (t || JSON.parse)(e), h.trim(e);
    } catch (s) {
      if (s.name !== "SyntaxError")
        throw s;
    }
  return (n || JSON.stringify)(e);
}
const an = {
  transitional: mo,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const s = n.getContentType() || "", r = s.indexOf("application/json") > -1, i = h.isObject(t);
    if (i && h.isHTMLForm(t) && (t = new FormData(t)), h.isFormData(t))
      return r ? JSON.stringify(go(t)) : t;
    if (h.isArrayBuffer(t) || h.isBuffer(t) || h.isStream(t) || h.isFile(t) || h.isBlob(t) || h.isReadableStream(t))
      return t;
    if (h.isArrayBufferView(t))
      return t.buffer;
    if (h.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (i) {
      if (s.indexOf("application/x-www-form-urlencoded") > -1)
        return Qa(t, this.formSerializer).toString();
      if ((l = h.isFileList(t)) || s.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Zn(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return i || r ? (n.setContentType("application/json", !1), tu(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || an.transitional, s = n && n.forcedJSONParsing, r = this.responseType === "json";
    if (h.isResponse(t) || h.isReadableStream(t))
      return t;
    if (t && h.isString(t) && (s && !this.responseType || r)) {
      const o = !(n && n.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (l) {
        if (o)
          throw l.name === "SyntaxError" ? N.from(l, N.ERR_BAD_RESPONSE, this, null, this.response) : l;
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
    FormData: ae.classes.FormData,
    Blob: ae.classes.Blob
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
  an.headers[e] = {};
});
const nu = h.toObjectSet([
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
]), su = (e) => {
  const t = {};
  let n, s, r;
  return e && e.split(`
`).forEach(function(o) {
    r = o.indexOf(":"), n = o.substring(0, r).trim().toLowerCase(), s = o.substring(r + 1).trim(), !(!n || t[n] && nu[n]) && (n === "set-cookie" ? t[n] ? t[n].push(s) : t[n] = [s] : t[n] = t[n] ? t[n] + ", " + s : s);
  }), t;
}, Fr = Symbol("internals");
function qt(e) {
  return e && String(e).trim().toLowerCase();
}
function Sn(e) {
  return e === !1 || e == null ? e : h.isArray(e) ? e.map(Sn) : String(e);
}
function ru(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let s;
  for (; s = n.exec(e); )
    t[s[1]] = s[2];
  return t;
}
const iu = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function as(e, t, n, s, r) {
  if (h.isFunction(s))
    return s.call(this, t, n);
  if (r && (t = n), !!h.isString(t)) {
    if (h.isString(s))
      return t.indexOf(s) !== -1;
    if (h.isRegExp(s))
      return s.test(t);
  }
}
function ou(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, s) => n.toUpperCase() + s);
}
function lu(e, t) {
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
let ye = class {
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
      (!p || r[p] === void 0 || f === !0 || f === void 0 && r[p] !== !1) && (r[p || c] = Sn(l));
    }
    const o = (l, c) => h.forEach(l, (f, a) => i(f, a, c));
    if (h.isPlainObject(t) || t instanceof this.constructor)
      o(t, n);
    else if (h.isString(t) && (t = t.trim()) && !iu(t))
      o(su(t), n);
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
          return ru(r);
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
      return !!(s && this[s] !== void 0 && (!n || as(this, this[s], s, n)));
    }
    return !1;
  }
  delete(t, n) {
    const s = this;
    let r = !1;
    function i(o) {
      if (o = qt(o), o) {
        const l = h.findKey(s, o);
        l && (!n || as(s, s[l], l, n)) && (delete s[l], r = !0);
      }
    }
    return h.isArray(t) ? t.forEach(i) : i(t), r;
  }
  clear(t) {
    const n = Object.keys(this);
    let s = n.length, r = !1;
    for (; s--; ) {
      const i = n[s];
      (!t || as(this, this[i], i, t, !0)) && (delete this[i], r = !0);
    }
    return r;
  }
  normalize(t) {
    const n = this, s = {};
    return h.forEach(this, (r, i) => {
      const o = h.findKey(s, i);
      if (o) {
        n[o] = Sn(r), delete n[i];
        return;
      }
      const l = t ? ou(i) : String(i).trim();
      l !== i && delete n[i], n[l] = Sn(r), s[l] = !0;
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
    const s = (this[Fr] = this[Fr] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function i(o) {
      const l = qt(o);
      s[l] || (lu(r, o), s[l] = !0);
    }
    return h.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
ye.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
h.reduceDescriptors(ye.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(s) {
      this[n] = s;
    }
  };
});
h.freezeMethods(ye);
function us(e, t) {
  const n = this || an, s = t || n, r = ye.from(s.headers);
  let i = s.data;
  return h.forEach(e, function(l) {
    i = l.call(n, i, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), i;
}
function yo(e) {
  return !!(e && e.__CANCEL__);
}
function Dt(e, t, n) {
  N.call(this, e ?? "canceled", N.ERR_CANCELED, t, n), this.name = "CanceledError";
}
h.inherits(Dt, N, {
  __CANCEL__: !0
});
function bo(e, t, n) {
  const s = n.config.validateStatus;
  !n.status || !s || s(n.status) ? e(n) : t(new N(
    "Request failed with status code " + n.status,
    [N.ERR_BAD_REQUEST, N.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function cu(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function au(e, t) {
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
    const T = a && f - a;
    return T ? Math.round(E * 1e3 / T) : void 0;
  };
}
function uu(e, t) {
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
const vn = (e, t, n = 3) => {
  let s = 0;
  const r = au(50, 250);
  return uu((i) => {
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
}, Lr = (e, t) => {
  const n = e != null;
  return [(s) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: s
  }), t[1]];
}, Ur = (e) => (...t) => h.asap(() => e(...t)), fu = ae.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ae.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ae.origin),
  ae.navigator && /(msie|trident)/i.test(ae.navigator.userAgent)
) : () => !0, du = ae.hasStandardBrowserEnv ? (
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
function pu(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function hu(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ao(e, t, n) {
  let s = !pu(t);
  return e && (s || n == !1) ? hu(e, t) : t;
}
const Hr = (e) => e instanceof ye ? { ...e } : e;
function gt(e, t) {
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
    headers: (f, a, p) => r(Hr(f), Hr(a), p, !0)
  };
  return h.forEach(Object.keys({ ...e, ...t }), function(a) {
    const p = c[a] || r, E = p(e[a], t[a], a);
    h.isUndefined(E) && p !== l || (n[a] = E);
  }), n;
}
const wo = (e) => {
  const t = gt({}, e);
  let { data: n, withXSRFToken: s, xsrfHeaderName: r, xsrfCookieName: i, headers: o, auth: l } = t;
  if (t.headers = o = ye.from(o), t.url = ho(Ao(t.baseURL, t.url, t.allowAbsoluteUrls), e.params, e.paramsSerializer), l && o.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  ), h.isFormData(n)) {
    if (ae.hasStandardBrowserEnv || ae.hasStandardBrowserWebWorkerEnv)
      o.setContentType(void 0);
    else if (h.isFunction(n.getHeaders)) {
      const c = n.getHeaders(), f = ["content-type", "content-length"];
      Object.entries(c).forEach(([a, p]) => {
        f.includes(a.toLowerCase()) && o.set(a, p);
      });
    }
  }
  if (ae.hasStandardBrowserEnv && (s && h.isFunction(s) && (s = s(t)), s || s !== !1 && fu(t.url))) {
    const c = r && i && du.read(i);
    c && o.set(r, c);
  }
  return t;
}, mu = typeof XMLHttpRequest < "u", gu = mu && function(e) {
  return new Promise(function(n, s) {
    const r = wo(e);
    let i = r.data;
    const o = ye.from(r.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: f } = r, a, p, E, T, g;
    function S() {
      T && T(), g && g(), r.cancelToken && r.cancelToken.unsubscribe(a), r.signal && r.signal.removeEventListener("abort", a);
    }
    let C = new XMLHttpRequest();
    C.open(r.method.toUpperCase(), r.url, !0), C.timeout = r.timeout;
    function v() {
      if (!C)
        return;
      const F = ye.from(
        "getAllResponseHeaders" in C && C.getAllResponseHeaders()
      ), k = {
        data: !l || l === "text" || l === "json" ? C.responseText : C.response,
        status: C.status,
        statusText: C.statusText,
        headers: F,
        config: e,
        request: C
      };
      bo(function(Q) {
        n(Q), S();
      }, function(Q) {
        s(Q), S();
      }, k), C = null;
    }
    "onloadend" in C ? C.onloadend = v : C.onreadystatechange = function() {
      !C || C.readyState !== 4 || C.status === 0 && !(C.responseURL && C.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, C.onabort = function() {
      C && (s(new N("Request aborted", N.ECONNABORTED, e, C)), C = null);
    }, C.onerror = function(P) {
      const k = P && P.message ? P.message : "Network Error", ie = new N(k, N.ERR_NETWORK, e, C);
      ie.event = P || null, s(ie), C = null;
    }, C.ontimeout = function() {
      let P = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const k = r.transitional || mo;
      r.timeoutErrorMessage && (P = r.timeoutErrorMessage), s(new N(
        P,
        k.clarifyTimeoutError ? N.ETIMEDOUT : N.ECONNABORTED,
        e,
        C
      )), C = null;
    }, i === void 0 && o.setContentType(null), "setRequestHeader" in C && h.forEach(o.toJSON(), function(P, k) {
      C.setRequestHeader(k, P);
    }), h.isUndefined(r.withCredentials) || (C.withCredentials = !!r.withCredentials), l && l !== "json" && (C.responseType = r.responseType), f && ([E, g] = vn(f, !0), C.addEventListener("progress", E)), c && C.upload && ([p, T] = vn(c), C.upload.addEventListener("progress", p), C.upload.addEventListener("loadend", T)), (r.cancelToken || r.signal) && (a = (F) => {
      C && (s(!F || F.type ? new Dt(null, e, C) : F), C.abort(), C = null);
    }, r.cancelToken && r.cancelToken.subscribe(a), r.signal && (r.signal.aborted ? a() : r.signal.addEventListener("abort", a)));
    const L = cu(r.url);
    if (L && ae.protocols.indexOf(L) === -1) {
      s(new N("Unsupported protocol " + L + ":", N.ERR_BAD_REQUEST, e));
      return;
    }
    C.send(i || null);
  });
}, yu = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let s = new AbortController(), r;
    const i = function(f) {
      if (!r) {
        r = !0, l();
        const a = f instanceof Error ? f : this.reason;
        s.abort(a instanceof N ? a : new Dt(a instanceof Error ? a.message : a));
      }
    };
    let o = t && setTimeout(() => {
      o = null, i(new N(`timeout ${t} of ms exceeded`, N.ETIMEDOUT));
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
}, bu = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let s = 0, r;
  for (; s < n; )
    r = s + t, yield e.slice(s, r), s = r;
}, Au = async function* (e, t) {
  for await (const n of wu(e))
    yield* bu(n, t);
}, wu = async function* (e) {
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
}, kr = (e, t, n, s) => {
  const r = Au(e, t);
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
}, qr = 64 * 1024, { isFunction: gn } = h, Eu = (({ Request: e, Response: t }) => ({
  Request: e,
  Response: t
}))(h.global), {
  ReadableStream: zr,
  TextEncoder: Wr
} = h.global, Vr = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Su = (e) => {
  e = h.merge.call({
    skipUndefined: !0
  }, Eu, e);
  const { fetch: t, Request: n, Response: s } = e, r = t ? gn(t) : typeof fetch == "function", i = gn(n), o = gn(s);
  if (!r)
    return !1;
  const l = r && gn(zr), c = r && (typeof Wr == "function" ? /* @__PURE__ */ ((g) => (S) => g.encode(S))(new Wr()) : async (g) => new Uint8Array(await new n(g).arrayBuffer())), f = i && l && Vr(() => {
    let g = !1;
    const S = new n(ae.origin, {
      body: new zr(),
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
      let v = S && S[g];
      if (v)
        return v.call(S);
      throw new N(`Response type '${g}' is not supported`, N.ERR_NOT_SUPPORT, C);
    });
  });
  const E = async (g) => {
    if (g == null)
      return 0;
    if (h.isBlob(g))
      return g.size;
    if (h.isSpecCompliantForm(g))
      return (await new n(ae.origin, {
        method: "POST",
        body: g
      }).arrayBuffer()).byteLength;
    if (h.isArrayBufferView(g) || h.isArrayBuffer(g))
      return g.byteLength;
    if (h.isURLSearchParams(g) && (g = g + ""), h.isString(g))
      return (await c(g)).byteLength;
  }, T = async (g, S) => {
    const C = h.toFiniteNumber(g.getContentLength());
    return C ?? E(S);
  };
  return async (g) => {
    let {
      url: S,
      method: C,
      data: v,
      signal: L,
      cancelToken: F,
      timeout: P,
      onDownloadProgress: k,
      onUploadProgress: ie,
      responseType: Q,
      headers: Ie,
      withCredentials: ze = "same-origin",
      fetchOptions: Pe
    } = wo(g), et = t || fetch;
    Q = Q ? (Q + "").toLowerCase() : "text";
    let We = yu([L, F && F.toAbortSignal()], P), Oe = null;
    const Ce = We && We.unsubscribe && (() => {
      We.unsubscribe();
    });
    let Bt;
    try {
      if (ie && f && C !== "get" && C !== "head" && (Bt = await T(Ie, v)) !== 0) {
        let oe = new n(S, {
          method: "POST",
          body: v,
          duplex: "half"
        }), se;
        if (h.isFormData(v) && (se = oe.headers.get("content-type")) && Ie.setContentType(se), oe.body) {
          const [At, wt] = Lr(
            Bt,
            vn(Ur(ie))
          );
          v = kr(oe.body, qr, At, wt);
        }
      }
      h.isString(ze) || (ze = ze ? "include" : "omit");
      const Z = i && "credentials" in n.prototype, K = {
        ...Pe,
        signal: We,
        method: C.toUpperCase(),
        headers: Ie.normalize().toJSON(),
        body: v,
        duplex: "half",
        credentials: Z ? ze : void 0
      };
      Oe = i && new n(S, K);
      let U = await (i ? et(Oe, Pe) : et(S, K));
      const ve = a && (Q === "stream" || Q === "response");
      if (a && (k || ve && Ce)) {
        const oe = {};
        ["status", "statusText", "headers"].forEach((un) => {
          oe[un] = U[un];
        });
        const se = h.toFiniteNumber(U.headers.get("content-length")), [At, wt] = k && Lr(
          se,
          vn(Ur(k), !0)
        ) || [];
        U = new s(
          kr(U.body, qr, At, () => {
            wt && wt(), Ce && Ce();
          }),
          oe
        );
      }
      Q = Q || "text";
      let bt = await p[h.findKey(p, Q) || "text"](U, g);
      return !ve && Ce && Ce(), await new Promise((oe, se) => {
        bo(oe, se, {
          data: bt,
          headers: ye.from(U.headers),
          status: U.status,
          statusText: U.statusText,
          config: g,
          request: Oe
        });
      });
    } catch (Z) {
      throw Ce && Ce(), Z && Z.name === "TypeError" && /Load failed|fetch/i.test(Z.message) ? Object.assign(
        new N("Network Error", N.ERR_NETWORK, g, Oe),
        {
          cause: Z.cause || Z
        }
      ) : N.from(Z, Z && Z.code, g, Oe);
    }
  };
}, Iu = /* @__PURE__ */ new Map(), Eo = (e) => {
  let t = e && e.env || {};
  const { fetch: n, Request: s, Response: r } = t, i = [
    s,
    r,
    n
  ];
  let o = i.length, l = o, c, f, a = Iu;
  for (; l--; )
    c = i[l], f = a.get(c), f === void 0 && a.set(c, f = l ? /* @__PURE__ */ new Map() : Su(t)), a = f;
  return f;
};
Eo();
const Js = {
  http: Ha,
  xhr: gu,
  fetch: {
    get: Eo
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
const Gr = (e) => `- ${e}`, xu = (e) => h.isFunction(e) || e === null || e === !1;
function Cu(e, t) {
  e = h.isArray(e) ? e : [e];
  const { length: n } = e;
  let s, r;
  const i = {};
  for (let o = 0; o < n; o++) {
    s = e[o];
    let l;
    if (r = s, !xu(s) && (r = Js[(l = String(s)).toLowerCase()], r === void 0))
      throw new N(`Unknown adapter '${l}'`);
    if (r && (h.isFunction(r) || (r = r.get(t))))
      break;
    i[l || "#" + o] = r;
  }
  if (!r) {
    const o = Object.entries(i).map(
      ([c, f]) => `adapter ${c} ` + (f === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let l = n ? o.length > 1 ? `since :
` + o.map(Gr).join(`
`) : " " + Gr(o[0]) : "as no adapter specified";
    throw new N(
      "There is no suitable adapter to dispatch the request " + l,
      "ERR_NOT_SUPPORT"
    );
  }
  return r;
}
const So = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: Cu,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: Js
};
function fs(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Dt(null, e);
}
function Zr(e) {
  return fs(e), e.headers = ye.from(e.headers), e.data = us.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), So.getAdapter(e.adapter || an.adapter, e)(e).then(function(s) {
    return fs(e), s.data = us.call(
      e,
      e.transformResponse,
      s
    ), s.headers = ye.from(s.headers), s;
  }, function(s) {
    return yo(s) || (fs(e), s && s.response && (s.response.data = us.call(
      e,
      e.transformResponse,
      s.response
    ), s.response.headers = ye.from(s.response.headers))), Promise.reject(s);
  });
}
const Io = "1.13.2", Kn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Kn[e] = function(s) {
    return typeof s === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Kr = {};
Kn.transitional = function(t, n, s) {
  function r(i, o) {
    return "[Axios v" + Io + "] Transitional option '" + i + "'" + o + (s ? ". " + s : "");
  }
  return (i, o, l) => {
    if (t === !1)
      throw new N(
        r(o, " has been removed" + (n ? " in " + n : "")),
        N.ERR_DEPRECATED
      );
    return n && !Kr[o] && (Kr[o] = !0, console.warn(
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
    throw new N("options must be an object", N.ERR_BAD_OPTION_VALUE);
  const s = Object.keys(e);
  let r = s.length;
  for (; r-- > 0; ) {
    const i = s[r], o = t[i];
    if (o) {
      const l = e[i], c = l === void 0 || o(l, i, e);
      if (c !== !0)
        throw new N("option " + i + " must be " + c, N.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new N("Unknown option " + i, N.ERR_BAD_OPTION);
  }
}
const In = {
  assertOptions: Ru,
  validators: Kn
}, Ne = In.validators;
let ht = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Nr(),
      response: new Nr()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = gt(this.defaults, n);
    const { transitional: s, paramsSerializer: r, headers: i } = n;
    s !== void 0 && In.assertOptions(s, {
      silentJSONParsing: Ne.transitional(Ne.boolean),
      forcedJSONParsing: Ne.transitional(Ne.boolean),
      clarifyTimeoutError: Ne.transitional(Ne.boolean)
    }, !1), r != null && (h.isFunction(r) ? n.paramsSerializer = {
      serialize: r
    } : In.assertOptions(r, {
      encode: Ne.function,
      serialize: Ne.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), In.assertOptions(n, {
      baseUrl: Ne.spelling("baseURL"),
      withXsrfToken: Ne.spelling("withXSRFToken")
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
    ), n.headers = ye.concat(o, i);
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
      const g = [Zr.bind(this), void 0];
      for (g.unshift(...l), g.push(...f), E = g.length, a = Promise.resolve(n); p < E; )
        a = a.then(g[p++], g[p++]);
      return a;
    }
    E = l.length;
    let T = n;
    for (; p < E; ) {
      const g = l[p++], S = l[p++];
      try {
        T = g(T);
      } catch (C) {
        S.call(this, C);
        break;
      }
    }
    try {
      a = Zr.call(this, T);
    } catch (g) {
      return Promise.reject(g);
    }
    for (p = 0, E = f.length; p < E; )
      a = a.then(f[p++], f[p++]);
    return a;
  }
  getUri(t) {
    t = gt(this.defaults, t);
    const n = Ao(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ho(n, t.params, t.paramsSerializer);
  }
};
h.forEach(["delete", "get", "head", "options"], function(t) {
  ht.prototype[t] = function(n, s) {
    return this.request(gt(s || {}, {
      method: t,
      url: n,
      data: (s || {}).data
    }));
  };
});
h.forEach(["post", "put", "patch"], function(t) {
  function n(s) {
    return function(i, o, l) {
      return this.request(gt(l || {}, {
        method: t,
        headers: s ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: o
      }));
    };
  }
  ht.prototype[t] = n(), ht.prototype[t + "Form"] = n(!0);
});
let Tu = class xo {
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
      s.reason || (s.reason = new Dt(i, o, l), n(s.reason));
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
function Mu(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Pu(e) {
  return h.isObject(e) && e.isAxiosError === !0;
}
const Ms = {
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
Object.entries(Ms).forEach(([e, t]) => {
  Ms[t] = e;
});
function Co(e) {
  const t = new ht(e), n = to(ht.prototype.request, t);
  return h.extend(n, ht.prototype, t, { allOwnKeys: !0 }), h.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(r) {
    return Co(gt(e, r));
  }, n;
}
const ee = Co(an);
ee.Axios = ht;
ee.CanceledError = Dt;
ee.CancelToken = Tu;
ee.isCancel = yo;
ee.VERSION = Io;
ee.toFormData = Zn;
ee.AxiosError = N;
ee.Cancel = ee.CanceledError;
ee.all = function(t) {
  return Promise.all(t);
};
ee.spread = Mu;
ee.isAxiosError = Pu;
ee.mergeConfig = gt;
ee.AxiosHeaders = ye;
ee.formToJSON = (e) => go(h.isHTMLForm(e) ? new FormData(e) : e);
ee.getAdapter = So.getAdapter;
ee.HttpStatusCode = Ms;
ee.default = ee;
const {
  Axios: xf,
  AxiosError: Cf,
  CanceledError: Rf,
  isCancel: Tf,
  CancelToken: Mf,
  VERSION: Pf,
  all: Of,
  Cancel: vf,
  isAxiosError: _f,
  spread: Df,
  toFormData: Bf,
  AxiosHeaders: jf,
  HttpStatusCode: Nf,
  formToJSON: Ff,
  getAdapter: Lf,
  mergeConfig: Uf
} = ee;
function Mt(e) {
  return e.payment_method_type;
}
class Ou {
  /**
   * Create a new API client instance
   * @param baseUrl - Base URL for the Loopit API
   * @param workspace - Workspace identifier/slug
   * @param microsite - Microsite path
   */
  constructor(t, n, s) {
    tr(this, "axiosInstance");
    this.axiosInstance = ee.create({
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
      if (ee.isAxiosError(n) && n.response) {
        const s = n.response.data;
        throw new Error(s.message || s.error || "Request failed");
      }
      throw n;
    }
  }
  /**
   * GET /payment/configs
   * Get all payment configurations for the workspace (card, au_becs_debit, etc.)
   * Returns an array — one entry per supported payment method type.
   * Excludes us_bank_account and other unsupported types.
   * @throws Error if no supported Stripe configs are found
   */
  async getPaymentConfigs() {
    const t = await this.request({
      method: "GET",
      url: "/payment/configs"
    }), n = ["card", "au_becs_debit"], s = t.filter((r) => {
      var o, l;
      const i = Mt(r);
      return ((o = r.gateway) == null ? void 0 : o.provider) === "stripe" && n.includes(((l = i == null ? void 0 : i.type) == null ? void 0 : l.toLowerCase()) ?? "");
    });
    if (s.length === 0)
      throw new Error("No supported payment methods are configured for this workspace");
    return s;
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
const vu = {
  mastercard: "data:image/jpeg;base64,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",
  visa: "data:image/png;base64,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",
  // BECS direct debit — inline bank SVG icon
  becs: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iI0UzRjBGRiIvPjxwYXRoIGQ9Ik0yNCA2TDggMTRoMzJMMjQgNnoiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIxNyIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIyNCIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIzMSIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSI4IiB5PSIyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIGZpbGw9IiMyNTYzRUIiLz48L3N2Zz4=",
  au_becs_debit: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjMyIiByeD0iNCIgZmlsbD0iI0UzRjBGRiIvPjxwYXRoIGQ9Ik0yNCA2TDggMTRoMzJMMjQgNnoiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIxNyIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIyNCIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSIzMSIgeT0iMTUiIHdpZHRoPSI0IiBoZWlnaHQ9IjgiIGZpbGw9IiMyNTYzRUIiLz48cmVjdCB4PSI4IiB5PSIyNCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjIiIGZpbGw9IiMyNTYzRUIiLz48L3N2Zz4=",
  amex: "data:image/png;base64,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"
};
function _u(e) {
  if (!e)
    return null;
  const t = e.toLowerCase();
  return vu[t] ?? null;
}
const Du = /* @__PURE__ */ Un({
  name: "PaymentMethodDisplay",
  props: {
    /** The payment method to display */
    paymentMethod: {
      type: Object,
      required: !0
    }
  },
  emits: {
    /** Emitted when user clicks remove button */
    remove: () => !0
  },
  computed: {
    /** True when the payment method is BECS direct debit */
    isBecsDebit() {
      return this.paymentMethod.type === "au_becs_debit";
    },
    /** Brand key to look up image — use type for BECS, brand for cards */
    brandKey() {
      return this.isBecsDebit ? "au_becs_debit" : this.paymentMethod.brand || "";
    },
    /** Get the brand image URL for the payment method */
    brandImage() {
      return _u(this.brandKey);
    },
    /** Accessible label for the brand image */
    displayLabel() {
      return this.isBecsDebit ? "Direct Debit" : this.paymentMethod.brand || "Card";
    },
    /** Capitalized brand name for card display */
    capitalizedBrand() {
      const e = this.paymentMethod.brand || "Card";
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
  }
}), Yn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Bu = { class: "lp-flex lp-items-center lp-gap-4 lp-w-full" }, ju = { class: "lp-flex lp-items-center lp-gap-3 lp-flex-1 lp-py-4 lp-px-5 lp-bg-gray-100 lp-rounded-md" }, Nu = ["src", "alt"], Fu = {
  key: 1,
  class: "lp-text-base lp-text-gray-800"
}, Lu = { class: "lp-font-semibold" }, Uu = {
  key: 2,
  class: "lp-text-base lp-text-gray-800"
}, Hu = { class: "lp-capitalize" }, ku = { class: "lp-font-semibold" };
function qu(e, t, n, s, r, i) {
  return $(), te("div", Bu, [
    W("div", ju, [
      e.brandImage ? ($(), te("img", {
        key: 0,
        src: e.brandImage,
        alt: e.displayLabel,
        class: "lp-w-12 lp-h-8 lp-object-contain lp-rounded"
      }, null, 8, Nu)) : Ye("", !0),
      e.isBecsDebit ? ($(), te("span", Fu, [
        t[1] || (t[1] = mt(" Direct Debit •••• ", -1)),
        W("span", Lu, He(e.paymentMethod.last_4), 1)
      ])) : ($(), te("span", Uu, [
        W("span", Hu, He(e.capitalizedBrand), 1),
        t[2] || (t[2] = mt(" ending in ", -1)),
        W("span", ku, He(e.paymentMethod.last_4), 1)
      ]))
    ]),
    W("button", {
      type: "button",
      class: "lp-py-4 lp-px-6 lp-bg-gray-100 lp-border-none lp-rounded-md lp-text-base lp-text-gray-800 lp-cursor-pointer lp-transition-colors lp-whitespace-nowrap hover:lp-bg-gray-200",
      onClick: t[0] || (t[0] = (o) => e.$emit("remove"))
    }, " Remove ")
  ]);
}
const zu = /* @__PURE__ */ Yn(Du, [["render", qu]]), Wu = /* @__PURE__ */ Un({
  name: "StripePaymentForm",
  props: {
    /** API client instance for making requests */
    apiClient: {
      type: Object,
      required: !0
    },
    /** Owner ID (person or company) */
    ownerId: {
      type: String,
      required: !0
    },
    /** Owner type */
    ownerType: {
      type: String,
      required: !0
    },
    /** The payment config to use — provided by the parent */
    config: {
      type: Object,
      required: !0
    }
  },
  emits: {
    added: (e) => !!e,
    error: (e) => !!e
  },
  data() {
    return {
      cardholderName: "",
      nameError: null,
      error: null,
      isLoading: !1,
      isInitializing: !0,
      stripeReady: !1,
      stripe: null,
      elements: null,
      paymentElement: null
    };
  },
  computed: {
    paymentMethodType() {
      var e, t;
      return ((t = (e = Mt(this.config)) == null ? void 0 : e.type) == null ? void 0 : t.toLowerCase()) ?? "card";
    },
    isCardPayment() {
      return this.paymentMethodType === "card";
    },
    submitLabel() {
      return this.isLoading ? this.isCardPayment ? "Saving..." : "Setting up..." : this.isCardPayment ? "Save Card" : "Set up Direct Debit";
    }
  },
  async mounted() {
    await this.initStripe();
  },
  beforeUnmount() {
    this.paymentElement && this.paymentElement.destroy();
  },
  methods: {
    async initStripe() {
      try {
        if (typeof window.Stripe > "u")
          throw new Error("Stripe.js is not loaded. Please include https://js.stripe.com/v3/ in your page.");
        this.stripe = window.Stripe(this.config.gateway.api_key, {
          stripeAccount: this.config.gateway.external_gateway_id
        }), this.elements = this.stripe.elements({
          mode: "setup",
          currency: this.config.currency.code.toLowerCase(),
          paymentMethodTypes: [this.paymentMethodType],
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
          paymentMethodOrder: [this.paymentMethodType]
        }), await this.$nextTick();
        const e = this.$refs.paymentElement;
        this.paymentElement.mount(e), this.paymentElement.on("ready", () => {
          this.stripeReady = !0;
        }), this.isInitializing = !1;
      } catch (e) {
        this.isInitializing = !1, this.error = e.message, this.$emit("error", e);
      }
    },
    async handleSubmit() {
      if (this.error = null, this.nameError = null, this.isCardPayment && !this.cardholderName.trim()) {
        this.nameError = "Cardholder name is required";
        return;
      }
      if (!this.elements || !this.stripe) {
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
        ), n = this.isCardPayment ? { payment_method_data: { billing_details: { name: this.cardholderName } } } : {}, { error: s, setupIntent: r } = await this.stripe.confirmSetup({
          elements: this.elements,
          clientSecret: t.config.setup_intent.client_secret,
          confirmParams: n,
          redirect: "if_required"
        });
        if (s) throw new Error(s.message);
        if (!r) throw new Error("Setup failed - no setup intent returned");
        const i = await this.apiClient.addPaymentMethod({
          owner_id: this.ownerId,
          owner_type: this.ownerType,
          config_id: this.config.id,
          external_payment_method_id: r.payment_method,
          data: this.isCardPayment ? { cardholder_name: this.cardholderName } : null
        });
        this.$emit("added", i);
      } catch (t) {
        this.error = t.message, this.$emit("error", t);
      } finally {
        this.isLoading = !1;
      }
    }
  }
}), Vu = { class: "lp-flex lp-items-center lp-justify-center lp-gap-2 lp-py-10 lp-text-gray-500" }, Gu = {
  key: 0,
  class: "lp-flex lp-flex-col lp-gap-1.5"
}, Zu = {
  key: 0,
  class: "lp-text-sm lp-text-red-600 lp-m-0"
}, Ku = { class: "lp-flex lp-flex-col lp-gap-1.5" }, Yu = {
  ref: "paymentElement",
  class: "lp-min-h-[100px]"
}, Ju = {
  key: 1,
  class: "lp-text-sm lp-text-red-600 lp-m-0 lp-p-3 lp-bg-red-50 lp-rounded-md"
}, Xu = ["disabled"], Qu = {
  key: 0,
  class: "lp-w-[18px] lp-h-[18px]",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, $u = {
  key: 1,
  class: "lp-w-[18px] lp-h-[18px] lp-border-2 lp-border-white/30 lp-border-t-white lp-rounded-full lp-animate-spin"
};
function ef(e, t, n, s, r, i) {
  return $(), te("form", {
    onSubmit: t[1] || (t[1] = eo((...o) => e.handleSubmit && e.handleSubmit(...o), ["prevent"])),
    class: "lp-flex lp-flex-col lp-gap-4"
  }, [
    Ut(W("div", Vu, [...t[2] || (t[2] = [
      W("span", { class: "lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin" }, null, -1),
      mt(" Loading payment form... ", -1)
    ])], 512), [
      [mn, e.isInitializing]
    ]),
    e.isCardPayment ? Ut(($(), te("div", Gu, [
      t[3] || (t[3] = W("label", {
        class: "lp-text-sm lp-font-medium lp-text-gray-700",
        for: "loopit-cardholder-name"
      }, [
        mt(" Cardholder Name "),
        W("span", { class: "lp-text-red-600" }, "*")
      ], -1)),
      Ut(W("input", {
        id: "loopit-cardholder-name",
        "onUpdate:modelValue": t[0] || (t[0] = (o) => e.cardholderName = o),
        type: "text",
        class: nn(["lp-w-full lp-p-3 lp-border lp-border-gray-300 lp-rounded-md lp-text-sm lp-text-gray-800 lp-bg-gray-50 lp-transition-all focus:lp-outline-none focus:lp-border-blue-500 focus:lp-ring-[3px] focus:lp-ring-blue-500/10", { "lp-border-red-600 focus:lp-border-red-600 focus:lp-ring-red-600/10": e.nameError }]),
        placeholder: "Name on card"
      }, null, 2), [
        [Zc, e.cardholderName]
      ]),
      e.nameError ? ($(), te("p", Zu, He(e.nameError), 1)) : Ye("", !0)
    ], 512)), [
      [mn, !e.isInitializing]
    ]) : Ye("", !0),
    Ut(W("div", Ku, [
      W("div", Yu, null, 512)
    ], 512), [
      [mn, !e.isInitializing]
    ]),
    e.error ? ($(), te("p", Ju, He(e.error), 1)) : Ye("", !0),
    Ut(W("button", {
      type: "submit",
      class: "lp-flex lp-items-center lp-justify-center lp-gap-2 lp-w-full lp-py-3.5 lp-px-6 lp-bg-blue-500 lp-border-none lp-rounded-md lp-text-base lp-font-medium lp-text-white lp-cursor-pointer lp-transition-colors lp-mt-2 hover:lp-bg-blue-600 disabled:lp-bg-gray-400 disabled:lp-cursor-not-allowed",
      disabled: e.isLoading || !e.stripeReady
    }, [
      e.isLoading ? Ye("", !0) : ($(), te("svg", Qu, [...t[4] || (t[4] = [
        W("path", { d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" }, null, -1)
      ])])),
      e.isLoading ? ($(), te("span", $u)) : Ye("", !0),
      W("span", null, He(e.submitLabel), 1)
    ], 8, Xu), [
      [mn, !e.isInitializing]
    ])
  ], 32);
}
const tf = /* @__PURE__ */ Yn(Wu, [["render", ef]]), nf = /* @__PURE__ */ Un({
  name: "AddPaymentMethodModal",
  components: { StripePaymentForm: tf },
  props: {
    apiClient: {
      type: Object,
      required: !0
    },
    ownerId: {
      type: String,
      required: !0
    },
    ownerType: {
      type: String,
      required: !0
    },
    /** The selected payment config — determines form type and Stripe keys */
    config: {
      type: Object,
      required: !0
    }
  },
  emits: {
    close: () => !0,
    added: (e) => !!e,
    error: (e) => !!e
  },
  computed: {
    modalTitle() {
      var t, n;
      const e = (n = (t = Mt(this.config)) == null ? void 0 : t.type) == null ? void 0 : n.toLowerCase();
      return e === "au_becs_debit" ? "Set up Direct Debit" : e === "card" ? "Add Card" : "Add Payment Method";
    }
  },
  mounted() {
    document.body.style.overflow = "hidden", document.addEventListener("keydown", this.handleKeydown);
  },
  beforeUnmount() {
    document.body.style.overflow = "", document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      e.key === "Escape" && this.$emit("close");
    }
  }
}), sf = { class: "lp-bg-white lp-rounded-xl lp-w-full lp-max-w-[500px] lp-max-h-[90vh] lp-overflow-auto lp-shadow-xl" }, rf = { class: "lp-flex lp-items-center lp-justify-between lp-py-5 lp-px-6 lp-border-b lp-border-gray-200" }, of = { class: "lp-m-0 lp-text-lg lp-font-semibold lp-text-gray-900" }, lf = { class: "lp-p-6" };
function cf(e, t, n, s, r, i) {
  const o = ys("StripePaymentForm");
  return $(), te("div", {
    class: "lp-fixed lp-inset-0 lp-bg-black/50 lp-flex lp-items-center lp-justify-center lp-z-[9999] lp-p-5",
    onClick: t[3] || (t[3] = eo((l) => e.$emit("close"), ["self"]))
  }, [
    W("div", sf, [
      W("div", rf, [
        W("h2", of, He(e.modalTitle), 1),
        W("button", {
          type: "button",
          class: "lp-flex lp-items-center lp-justify-center lp-w-8 lp-h-8 lp-p-0 lp-bg-transparent lp-border-none lp-rounded-md lp-cursor-pointer lp-text-gray-500 lp-transition-colors hover:lp-bg-gray-100 hover:lp-text-gray-900",
          onClick: t[0] || (t[0] = (l) => e.$emit("close")),
          "aria-label": "Close"
        }, [...t[4] || (t[4] = [
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
      W("div", lf, [
        ke(o, {
          "api-client": e.apiClient,
          "owner-id": e.ownerId,
          "owner-type": e.ownerType,
          config: e.config,
          onAdded: t[1] || (t[1] = (l) => e.$emit("added", l)),
          onError: t[2] || (t[2] = (l) => e.$emit("error", l))
        }, null, 8, ["api-client", "owner-id", "owner-type", "config"])
      ])
    ])
  ]);
}
const af = /* @__PURE__ */ Yn(nf, [["render", cf]]), uf = {
  card: "💳 Card",
  au_becs_debit: "🏦 Direct Debit"
}, ff = /* @__PURE__ */ Un({
  name: "LoopitPaymentMethod",
  components: {
    PaymentMethodDisplay: zu,
    AddPaymentMethodModal: af
  },
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  data() {
    return {
      paymentMethod: null,
      showModal: !1,
      isLoading: !0,
      error: null,
      apiClient: null,
      /** All available payment configs for this workspace */
      configs: [],
      /** Currently selected config (drives which form opens) */
      selectedConfig: null
    };
  },
  async created() {
    this.apiClient = new Ou(
      this.options.apiBaseUrl,
      this.options.workspace,
      this.options.microsite
    );
    try {
      const e = await this.apiClient.getPaymentConfigs(), t = this.options.paymentMethodTypes;
      if (this.configs = t && t.length > 0 ? e.filter((n) => {
        var r, i;
        const s = ((i = (r = Mt(n)) == null ? void 0 : r.type) == null ? void 0 : i.toLowerCase()) ?? "";
        return t.includes(s);
      }) : e, this.configs.length === 0)
        throw new Error("No matching payment methods found for the configured types");
      this.selectedConfig = this.configs[0] ?? null, typeof this.options.onConfigLoaded == "function" && this.selectedConfig && this.options.onConfigLoaded(this.selectedConfig);
    } catch (e) {
      this.error = e.message;
    } finally {
      this.isLoading = !1;
    }
  },
  methods: {
    /** Human-readable label for a config tab */
    configLabel(e) {
      var n, s, r;
      const t = ((s = (n = Mt(e)) == null ? void 0 : n.type) == null ? void 0 : s.toLowerCase()) ?? "";
      return uf[t] ?? ((r = Mt(e)) == null ? void 0 : r.name) ?? "Payment Method";
    },
    handleAdded(e) {
      this.paymentMethod = e, this.showModal = !1, typeof this.options.onPaymentMethodAdded == "function" && this.options.onPaymentMethodAdded(e);
    },
    handleRemove() {
      this.paymentMethod = null, typeof this.options.onPaymentMethodRemoved == "function" && this.options.onPaymentMethodRemoved();
    },
    handleModalError(e) {
      typeof this.options.onError == "function" && this.options.onError(e);
    }
  }
}), df = { class: "lp-font-sans" }, pf = {
  key: 0,
  class: "lp-flex lp-items-center lp-gap-2 lp-text-gray-500 lp-p-4"
}, hf = {
  key: 1,
  class: "lp-text-red-600 lp-p-3 lp-bg-red-50 lp-rounded-md lp-text-sm"
}, mf = {
  key: 0,
  class: "lp-flex lp-gap-2 lp-mb-3"
}, gf = ["onClick"];
function yf(e, t, n, s, r, i) {
  const o = ys("PaymentMethodDisplay"), l = ys("AddPaymentMethodModal");
  return $(), te("div", df, [
    e.isLoading ? ($(), te("div", pf, [...t[2] || (t[2] = [
      W("span", { class: "lp-w-5 lp-h-5 lp-border-2 lp-border-gray-200 lp-border-t-blue-500 lp-rounded-full lp-animate-spin" }, null, -1),
      mt(" Loading... ", -1)
    ])])) : e.error ? ($(), te("div", hf, He(e.error), 1)) : ($(), te(we, { key: 2 }, [
      e.paymentMethod ? ($(), Ss(o, {
        key: 0,
        "payment-method": e.paymentMethod,
        onRemove: e.handleRemove
      }, null, 8, ["payment-method", "onRemove"])) : ($(), te(we, { key: 1 }, [
        e.configs.length > 1 ? ($(), te("div", mf, [
          ($(!0), te(we, null, Ul(e.configs, (c) => ($(), te("button", {
            key: c.id,
            type: "button",
            class: nn(["lp-flex-1 lp-py-2.5 lp-px-4 lp-rounded-lg lp-text-sm lp-font-semibold lp-border-2 lp-cursor-pointer lp-transition-all", e.selectedConfig && e.selectedConfig.id === c.id ? "lp-border-blue-500 lp-bg-blue-50 lp-text-blue-700" : "lp-border-gray-200 lp-bg-gray-50 lp-text-gray-600 hover:lp-border-gray-300 hover:lp-bg-gray-100"]),
            onClick: (f) => e.selectedConfig = c
          }, He(e.configLabel(c)), 11, gf))), 128))
        ])) : Ye("", !0),
        e.selectedConfig ? ($(), te("button", {
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
          mt(" Add Payment Method ", -1)
        ])])) : Ye("", !0)
      ], 64)),
      e.showModal && e.selectedConfig ? ($(), Ss(l, {
        key: 2,
        "api-client": e.apiClient,
        "owner-id": e.options.ownerId,
        "owner-type": e.options.ownerType,
        config: e.selectedConfig,
        onClose: t[1] || (t[1] = (c) => e.showModal = !1),
        onAdded: e.handleAdded,
        onError: e.handleModalError
      }, null, 8, ["api-client", "owner-id", "owner-type", "config", "onAdded", "onError"])) : Ye("", !0)
    ], 64))
  ]);
}
const bf = /* @__PURE__ */ Yn(ff, [["render", yf]]), Af = {
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
   *   apiBaseUrl: 'https://platform.api.loopit.co/api/portal',
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
    const s = Qc(bf, { options: t });
    return s.mount(n), {
      app: s,
      unmount: () => s.unmount()
    };
  }
};
typeof window < "u" && (window.LoopitPaymentMethod = Af);
export {
  Af as default
};
