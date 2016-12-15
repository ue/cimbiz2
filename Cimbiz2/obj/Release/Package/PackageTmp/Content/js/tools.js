﻿/********************************************
	-	THEMEPUNCH TOOLS Ver. 1.0     -
	 Last Update of Tools 27.02.2015
*********************************************/
/*
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.9
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.skinkers.com/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
(function (a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function (f) {
    var y = "1.6.9",
        p = "left",
        o = "right",
        e = "up",
        x = "down",
        c = "in",
        A = "out",
        m = "none",
        s = "auto",
        l = "swipe",
        t = "pinch",
        B = "tap",
        j = "doubletap",
        b = "longtap",
        z = "hold",
        E = "horizontal",
        u = "vertical",
        i = "all",
        r = 10,
        g = "start",
        k = "move",
        h = "end",
        q = "cancel",
        a = "ontouchstart" in window,
        v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        C = "TouchSwipe";
    var n = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
        preventDefaultEvents: true
    };
    f.fn.swipetp = function (H) {
        var G = f(this),
            F = G.data(C);
        if (F && typeof H === "string") {
            if (F[H]) {
                return F[H].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                f.error("Method " + H + " does not exist on jQuery.swipetp")
            }
        } else {
            if (!F && (typeof H === "object" || !H)) {
                return w.apply(this, arguments)
            }
        }
        return G
    };
    f.fn.swipetp.version = y;
    f.fn.swipetp.defaults = n;
    f.fn.swipetp.phases = {
        PHASE_START: g,
        PHASE_MOVE: k,
        PHASE_END: h,
        PHASE_CANCEL: q
    };
    f.fn.swipetp.directions = {
        LEFT: p,
        RIGHT: o,
        UP: e,
        DOWN: x,
        IN: c,
        OUT: A
    };
    f.fn.swipetp.pageScroll = {
        NONE: m,
        HORIZONTAL: E,
        VERTICAL: u,
        AUTO: s
    };
    f.fn.swipetp.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: i
    };

    function w(F) {
        if (F && (F.allowPageScroll === undefined && (F.swipe !== undefined || F.swipeStatus !== undefined))) {
            F.allowPageScroll = m
        }
        if (F.click !== undefined && F.tap === undefined) {
            F.tap = F.click
        }
        if (!F) {
            F = {}
        }
        F = f.extend({}, f.fn.swipetp.defaults, F);
        return this.each(function () {
            var H = f(this);
            var G = H.data(C);
            if (!G) {
                G = new D(this, F);
                H.data(C, G)
            }
        })
    }

    function D(a5, aw) {
        var aA = (a || d || !aw.fallbackToMouseEvents),
            K = aA ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
            az = aA ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
            V = aA ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
            T = aA ? null : "mouseleave",
            aE = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel");
        var ah = 0,
            aQ = null,
            ac = 0,
            a2 = 0,
            a0 = 0,
            H = 1,
            ar = 0,
            aK = 0,
            N = null;
        var aS = f(a5);
        var aa = "start";
        var X = 0;
        var aR = null;
        var U = 0,
            a3 = 0,
            a6 = 0,
            ae = 0,
            O = 0;
        var aX = null,
            ag = null;
        try {
            aS.bind(K, aO);
            aS.bind(aE, ba)
        } catch (al) {
            f.error("events not supported " + K + "," + aE + " on jQuery.swipetp")
        }
        this.enable = function () {
            aS.bind(K, aO);
            aS.bind(aE, ba);
            return aS
        };
        this.disable = function () {
            aL();
            return aS
        };
        this.destroy = function () {
            aL();
            aS.data(C, null);
            aS = null
        };
        this.option = function (bd, bc) {
            if (aw[bd] !== undefined) {
                if (bc === undefined) {
                    return aw[bd]
                } else {
                    aw[bd] = bc
                }
            } else {
                f.error("Option " + bd + " does not exist on jQuery.swipetp.options")
            }
            return null
        };

        function aO(be) {
            if (aC()) {
                return
            }
            if (f(be.target).closest(aw.excludedElements, aS).length > 0) {
                return
            }
            var bf = be.originalEvent ? be.originalEvent : be;
            var bd, bg = bf.touches,
                bc = bg ? bg[0] : bf;
            aa = g;
            if (bg) {
                X = bg.length
            } else {
                be.preventDefault()
            }
            ah = 0;
            aQ = null;
            aK = null;
            ac = 0;
            a2 = 0;
            a0 = 0;
            H = 1;
            ar = 0;
            aR = ak();
            N = ab();
            S();
            if (!bg || (X === aw.fingers || aw.fingers === i) || aY()) {
                aj(0, bc);
                U = au();
                if (X == 2) {
                    aj(1, bg[1]);
                    a2 = a0 = av(aR[0].start, aR[1].start)
                }
                if (aw.swipeStatus || aw.pinchStatus) {
                    bd = P(bf, aa)
                }
            } else {
                bd = false
            }
            if (bd === false) {
                aa = q;
                P(bf, aa);
                return bd
            } else {
                if (aw.hold) {
                    ag = setTimeout(f.proxy(function () {
                        aS.trigger("hold", [bf.target]);
                        if (aw.hold) {
                            bd = aw.hold.call(aS, bf, bf.target)
                        }
                    }, this), aw.longTapThreshold)
                }
                ap(true)
            }
            return null
        }

        function a4(bf) {
            var bi = bf.originalEvent ? bf.originalEvent : bf;
            if (aa === h || aa === q || an()) {
                return
            }
            var be, bj = bi.touches,
                bd = bj ? bj[0] : bi;
            var bg = aI(bd);
            a3 = au();
            if (bj) {
                X = bj.length
            }
            if (aw.hold) {
                clearTimeout(ag)
            }
            aa = k;
            if (X == 2) {
                if (a2 == 0) {
                    aj(1, bj[1]);
                    a2 = a0 = av(aR[0].start, aR[1].start)
                } else {
                    aI(bj[1]);
                    a0 = av(aR[0].end, aR[1].end);
                    aK = at(aR[0].end, aR[1].end)
                }
                H = a8(a2, a0);
                ar = Math.abs(a2 - a0)
            }
            if ((X === aw.fingers || aw.fingers === i) || !bj || aY()) {
                aQ = aM(bg.start, bg.end);
                am(bf, aQ);
                ah = aT(bg.start, bg.end);
                ac = aN();
                aJ(aQ, ah);
                if (aw.swipeStatus || aw.pinchStatus) {
                    be = P(bi, aa)
                }
                if (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave) {
                    var bc = true;
                    if (aw.triggerOnTouchLeave) {
                        var bh = aZ(this);
                        bc = F(bg.end, bh)
                    }
                    if (!aw.triggerOnTouchEnd && bc) {
                        aa = aD(k)
                    } else {
                        if (aw.triggerOnTouchLeave && !bc) {
                            aa = aD(h)
                        }
                    }
                    if (aa == q || aa == h) {
                        P(bi, aa)
                    }
                }
            } else {
                aa = q;
                P(bi, aa)
            }
            if (be === false) {
                aa = q;
                P(bi, aa)
            }
        }

        function M(bc) {
            var bd = bc.originalEvent ? bc.originalEvent : bc,
                be = bd.touches;
            if (be) {
                if (be.length) {
                    G();
                    return true
                }
            }
            if (an()) {
                X = ae
            }
            a3 = au();
            ac = aN();
            if (bb() || !ao()) {
                aa = q;
                P(bd, aa)
            } else {
                if (aw.triggerOnTouchEnd || (aw.triggerOnTouchEnd == false && aa === k)) {
                    bc.preventDefault();
                    aa = h;
                    P(bd, aa)
                } else {
                    if (!aw.triggerOnTouchEnd && a7()) {
                        aa = h;
                        aG(bd, aa, B)
                    } else {
                        if (aa === k) {
                            aa = q;
                            P(bd, aa)
                        }
                    }
                }
            }
            ap(false);
            return null
        }

        function ba() {
            X = 0;
            a3 = 0;
            U = 0;
            a2 = 0;
            a0 = 0;
            H = 1;
            S();
            ap(false)
        }

        function L(bc) {
            var bd = bc.originalEvent ? bc.originalEvent : bc;
            if (aw.triggerOnTouchLeave) {
                aa = aD(h);
                P(bd, aa)
            }
        }

        function aL() {
            aS.unbind(K, aO);
            aS.unbind(aE, ba);
            aS.unbind(az, a4);
            aS.unbind(V, M);
            if (T) {
                aS.unbind(T, L)
            }
            ap(false)
        }

        function aD(bg) {
            var bf = bg;
            var be = aB();
            var bd = ao();
            var bc = bb();
            if (!be || bc) {
                bf = q
            } else {
                if (bd && bg == k && (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave)) {
                    bf = h
                } else {
                    if (!bd && bg == h && aw.triggerOnTouchLeave) {
                        bf = q
                    }
                }
            }
            return bf
        }

        function P(be, bc) {
            var bd, bf = be.touches;
            if ((J() || W()) || (Q() || aY())) {
                if (J() || W()) {
                    bd = aG(be, bc, l)
                }
                if ((Q() || aY()) && bd !== false) {
                    bd = aG(be, bc, t)
                }
            } else {
                if (aH() && bd !== false) {
                    bd = aG(be, bc, j)
                } else {
                    if (aq() && bd !== false) {
                        bd = aG(be, bc, b)
                    } else {
                        if (ai() && bd !== false) {
                            bd = aG(be, bc, B)
                        }
                    }
                }
            }
            if (bc === q) {
                ba(be)
            }
            if (bc === h) {
                if (bf) {
                    if (!bf.length) {
                        ba(be)
                    }
                } else {
                    ba(be)
                }
            }
            return bd
        }

        function aG(bf, bc, be) {
            var bd;
            if (be == l) {
                aS.trigger("swipeStatus", [bc, aQ || null, ah || 0, ac || 0, X, aR]);
                if (aw.swipeStatus) {
                    bd = aw.swipeStatus.call(aS, bf, bc, aQ || null, ah || 0, ac || 0, X, aR);
                    if (bd === false) {
                        return false
                    }
                }
                if (bc == h && aW()) {
                    aS.trigger("swipe", [aQ, ah, ac, X, aR]);
                    if (aw.swipe) {
                        bd = aw.swipe.call(aS, bf, aQ, ah, ac, X, aR);
                        if (bd === false) {
                            return false
                        }
                    }
                    switch (aQ) {
                        case p:
                            aS.trigger("swipeLeft", [aQ, ah, ac, X, aR]);
                            if (aw.swipeLeft) {
                                bd = aw.swipeLeft.call(aS, bf, aQ, ah, ac, X, aR)
                            }
                            break;
                        case o:
                            aS.trigger("swipeRight", [aQ, ah, ac, X, aR]);
                            if (aw.swipeRight) {
                                bd = aw.swipeRight.call(aS, bf, aQ, ah, ac, X, aR)
                            }
                            break;
                        case e:
                            aS.trigger("swipeUp", [aQ, ah, ac, X, aR]);
                            if (aw.swipeUp) {
                                bd = aw.swipeUp.call(aS, bf, aQ, ah, ac, X, aR)
                            }
                            break;
                        case x:
                            aS.trigger("swipeDown", [aQ, ah, ac, X, aR]);
                            if (aw.swipeDown) {
                                bd = aw.swipeDown.call(aS, bf, aQ, ah, ac, X, aR)
                            }
                            break
                    }
                }
            }
            if (be == t) {
                aS.trigger("pinchStatus", [bc, aK || null, ar || 0, ac || 0, X, H, aR]);
                if (aw.pinchStatus) {
                    bd = aw.pinchStatus.call(aS, bf, bc, aK || null, ar || 0, ac || 0, X, H, aR);
                    if (bd === false) {
                        return false
                    }
                }
                if (bc == h && a9()) {
                    switch (aK) {
                        case c:
                            aS.trigger("pinchIn", [aK || null, ar || 0, ac || 0, X, H, aR]);
                            if (aw.pinchIn) {
                                bd = aw.pinchIn.call(aS, bf, aK || null, ar || 0, ac || 0, X, H, aR)
                            }
                            break;
                        case A:
                            aS.trigger("pinchOut", [aK || null, ar || 0, ac || 0, X, H, aR]);
                            if (aw.pinchOut) {
                                bd = aw.pinchOut.call(aS, bf, aK || null, ar || 0, ac || 0, X, H, aR)
                            }
                            break
                    }
                }
            }
            if (be == B) {
                if (bc === q || bc === h) {
                    clearTimeout(aX);
                    clearTimeout(ag);
                    if (Z() && !I()) {
                        O = au();
                        aX = setTimeout(f.proxy(function () {
                            O = null;
                            aS.trigger("tap", [bf.target]);
                            if (aw.tap) {
                                bd = aw.tap.call(aS, bf, bf.target)
                            }
                        }, this), aw.doubleTapThreshold)
                    } else {
                        O = null;
                        aS.trigger("tap", [bf.target]);
                        if (aw.tap) {
                            bd = aw.tap.call(aS, bf, bf.target)
                        }
                    }
                }
            } else {
                if (be == j) {
                    if (bc === q || bc === h) {
                        clearTimeout(aX);
                        O = null;
                        aS.trigger("doubletap", [bf.target]);
                        if (aw.doubleTap) {
                            bd = aw.doubleTap.call(aS, bf, bf.target)
                        }
                    }
                } else {
                    if (be == b) {
                        if (bc === q || bc === h) {
                            clearTimeout(aX);
                            O = null;
                            aS.trigger("longtap", [bf.target]);
                            if (aw.longTap) {
                                bd = aw.longTap.call(aS, bf, bf.target)
                            }
                        }
                    }
                }
            }
            return bd
        }

        function ao() {
            var bc = true;
            if (aw.threshold !== null) {
                bc = ah >= aw.threshold
            }
            return bc
        }

        function bb() {
            var bc = false;
            if (aw.cancelThreshold !== null && aQ !== null) {
                bc = (aU(aQ) - ah) >= aw.cancelThreshold
            }
            return bc
        }

        function af() {
            if (aw.pinchThreshold !== null) {
                return ar >= aw.pinchThreshold
            }
            return true
        }

        function aB() {
            var bc;
            if (aw.maxTimeThreshold) {
                if (ac >= aw.maxTimeThreshold) {
                    bc = false
                } else {
                    bc = true
                }
            } else {
                bc = true
            }
            return bc
        }

        function am(bc, bd) {
            if (aw.preventDefaultEvents === false) {
                return
            }
            if (aw.allowPageScroll === m) {
                bc.preventDefault()
            } else {
                var be = aw.allowPageScroll === s;
                switch (bd) {
                    case p:
                        if ((aw.swipeLeft && be) || (!be && aw.allowPageScroll != E)) {
                            bc.preventDefault()
                        }
                        break;
                    case o:
                        if ((aw.swipeRight && be) || (!be && aw.allowPageScroll != E)) {
                            bc.preventDefault()
                        }
                        break;
                    case e:
                        if ((aw.swipeUp && be) || (!be && aw.allowPageScroll != u)) {
                            bc.preventDefault()
                        }
                        break;
                    case x:
                        if ((aw.swipeDown && be) || (!be && aw.allowPageScroll != u)) {
                            bc.preventDefault()
                        }
                        break
                }
            }
        }

        function a9() {
            var bd = aP();
            var bc = Y();
            var be = af();
            return bd && bc && be
        }

        function aY() {
            return !!(aw.pinchStatus || aw.pinchIn || aw.pinchOut)
        }

        function Q() {
            return !!(a9() && aY())
        }

        function aW() {
            var bf = aB();
            var bh = ao();
            var be = aP();
            var bc = Y();
            var bd = bb();
            var bg = !bd && bc && be && bh && bf;
            return bg
        }

        function W() {
            return !!(aw.swipe || aw.swipeStatus || aw.swipeLeft || aw.swipeRight || aw.swipeUp || aw.swipeDown)
        }

        function J() {
            return !!(aW() && W())
        }

        function aP() {
            return ((X === aw.fingers || aw.fingers === i) || !a)
        }

        function Y() {
            return aR[0].end.x !== 0
        }

        function a7() {
            return !!(aw.tap)
        }

        function Z() {
            return !!(aw.doubleTap)
        }

        function aV() {
            return !!(aw.longTap)
        }

        function R() {
            if (O == null) {
                return false
            }
            var bc = au();
            return (Z() && ((bc - O) <= aw.doubleTapThreshold))
        }

        function I() {
            return R()
        }

        function ay() {
            return ((X === 1 || !a) && (isNaN(ah) || ah < aw.threshold))
        }

        function a1() {
            return ((ac > aw.longTapThreshold) && (ah < r))
        }

        function ai() {
            return !!(ay() && a7())
        }

        function aH() {
            return !!(R() && Z())
        }

        function aq() {
            return !!(a1() && aV())
        }

        function G() {
            a6 = au();
            ae = event.touches.length + 1
        }

        function S() {
            a6 = 0;
            ae = 0
        }

        function an() {
            var bc = false;
            if (a6) {
                var bd = au() - a6;
                if (bd <= aw.fingerReleaseThreshold) {
                    bc = true
                }
            }
            return bc
        }

        function aC() {
            return !!(aS.data(C + "_intouch") === true)
        }

        function ap(bc) {
            if (bc === true) {
                aS.bind(az, a4);
                aS.bind(V, M);
                if (T) {
                    aS.bind(T, L)
                }
            } else {
                aS.unbind(az, a4, false);
                aS.unbind(V, M, false);
                if (T) {
                    aS.unbind(T, L, false)
                }
            }
            aS.data(C + "_intouch", bc === true)
        }

        function aj(bd, bc) {
            var be = bc.identifier !== undefined ? bc.identifier : 0;
            aR[bd].identifier = be;
            aR[bd].start.x = aR[bd].end.x = bc.pageX || bc.clientX;
            aR[bd].start.y = aR[bd].end.y = bc.pageY || bc.clientY;
            return aR[bd]
        }

        function aI(bc) {
            var be = bc.identifier !== undefined ? bc.identifier : 0;
            var bd = ad(be);
            bd.end.x = bc.pageX || bc.clientX;
            bd.end.y = bc.pageY || bc.clientY;
            return bd
        }

        function ad(bd) {
            for (var bc = 0; bc < aR.length; bc++) {
                if (aR[bc].identifier == bd) {
                    return aR[bc]
                }
            }
        }

        function ak() {
            var bc = [];
            for (var bd = 0; bd <= 5; bd++) {
                bc.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                })
            }
            return bc
        }

        function aJ(bc, bd) {
            bd = Math.max(bd, aU(bc));
            N[bc].distance = bd
        }

        function aU(bc) {
            if (N[bc]) {
                return N[bc].distance
            }
            return undefined
        }

        function ab() {
            var bc = {};
            bc[p] = ax(p);
            bc[o] = ax(o);
            bc[e] = ax(e);
            bc[x] = ax(x);
            return bc
        }

        function ax(bc) {
            return {
                direction: bc,
                distance: 0
            }
        }

        function aN() {
            return a3 - U
        }

        function av(bf, be) {
            var bd = Math.abs(bf.x - be.x);
            var bc = Math.abs(bf.y - be.y);
            return Math.round(Math.sqrt(bd * bd + bc * bc))
        }

        function a8(bc, bd) {
            var be = (bd / bc) * 1;
            return be.toFixed(2)
        }

        function at() {
            if (H < 1) {
                return A
            } else {
                return c
            }
        }

        function aT(bd, bc) {
            return Math.round(Math.sqrt(Math.pow(bc.x - bd.x, 2) + Math.pow(bc.y - bd.y, 2)))
        }

        function aF(bf, bd) {
            var bc = bf.x - bd.x;
            var bh = bd.y - bf.y;
            var be = Math.atan2(bh, bc);
            var bg = Math.round(be * 180 / Math.PI);
            if (bg < 0) {
                bg = 360 - Math.abs(bg)
            }
            return bg
        }

        function aM(bd, bc) {
            var be = aF(bd, bc);
            if ((be <= 45) && (be >= 0)) {
                return p
            } else {
                if ((be <= 360) && (be >= 315)) {
                    return p
                } else {
                    if ((be >= 135) && (be <= 225)) {
                        return o
                    } else {
                        if ((be > 45) && (be < 135)) {
                            return x
                        } else {
                            return e
                        }
                    }
                }
            }
        }

        function au() {
            var bc = new Date();
            return bc.getTime()
        }

        function aZ(bc) {
            bc = f(bc);
            var be = bc.offset();
            var bd = {
                left: be.left,
                right: be.left + bc.outerWidth(),
                top: be.top,
                bottom: be.top + bc.outerHeight()
            };
            return bd
        }

        function F(bc, bd) {
            return (bc.x > bd.left && bc.x < bd.right && bc.y > bd.top && bc.y < bd.bottom)
        }
    }
}));

if (typeof (console) === 'undefined') {
    var console = {};
    console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () { };
}

if (window.tplogs == true)
try {
    console.groupCollapsed("ThemePunch GreenSocks Logs");
} catch (e) { }


var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;

var punchgs = window.GreenSockGlobals = {};

if (window.tplogs == true)
try {
    console.info("Build GreenSock SandBox for ThemePunch Plugins");
    console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
} catch (e) { }


/* TWEEN LITE */
/*!
 * VERSION: 1.18.5
 * DATE: 2016-05-24
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
! function (a, b) {
    "use strict";
    var c = {},
        d = a.GreenSockGlobals = a.GreenSockGlobals || a;
    if (!d.TweenLite) {
        var e, f, g, h, i, j = function (a) {
            var b, c = a.split("."),
                e = d;
            for (b = 0; b < c.length; b++) e[c[b]] = e = e[c[b]] || {};
            return e
        },
            k = j("com.greensock"),
            l = 1e-10,
            m = function (a) {
                var b, c = [],
                    d = a.length;
                for (b = 0; b !== d; c.push(a[b++]));
                return c
            },
            n = function () { },
            o = function () {
                var a = Object.prototype.toString,
                    b = a.call([]);
                return function (c) {
                    return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                }
            }(),
            p = {},
            q = function (e, f, g, h) {
                this.sc = p[e] ? p[e].sc : [], p[e] = this, this.gsClass = null, this.func = g;
                var i = [];
                this.check = function (k) {
                    for (var l, m, n, o, r, s = f.length, t = s; --s > -1;) (l = p[f[s]] || new q(f[s], [])).gsClass ? (i[s] = l.gsClass, t--) : k && l.sc.push(this);
                    if (0 === t && g) {
                        if (m = ("com.greensock." + e).split("."), n = m.pop(), o = j(m.join("."))[n] = this.gsClass = g.apply(g, i), h)
                            if (d[n] = o, r = "undefined" != typeof module && module.exports, !r && "function" == typeof define && define.amd) define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + e.split(".").pop(), [], function () {
                                return o
                            });
                            else if (r)
                                if (e === b) {
                                    module.exports = c[b] = o;
                                    for (s in c) o[s] = c[s]
                                } else c[b] && (c[b][n] = o);
                        for (s = 0; s < this.sc.length; s++) this.sc[s].check()
                    }
                }, this.check(!0)
            },
            r = a._gsDefine = function (a, b, c, d) {
                return new q(a, b, c, d)
            },
            s = k._class = function (a, b, c) {
                return b = b || function () { }, r(a, [], function () {
                    return b
                }, c), b
            };
        r.globals = d;
        var t = [0, 0, 1, 1],
            u = [],
            v = s("easing.Ease", function (a, b, c, d) {
                this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? t.concat(b) : t
            }, !0),
            w = v.map = {},
            x = v.register = function (a, b, c, d) {
                for (var e, f, g, h, i = b.split(","), j = i.length, l = (c || "easeIn,easeOut,easeInOut").split(",") ; --j > -1;)
                    for (f = i[j], e = d ? s("easing." + f, null, !0) : k.easing[f] || {}, g = l.length; --g > -1;) h = l[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a
            };
        for (g = v.prototype, g._calcEnd = !1, g.getRatio = function (a) {
                if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                var b = this._type,
                    c = this._power,
                    d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
                return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
        }, e = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], f = e.length; --f > -1;) g = e[f] + ",Power" + f, x(new v(null, null, 1, f), g, "easeOut", !0), x(new v(null, null, 2, f), g, "easeIn" + (0 === f ? ",easeNone" : "")), x(new v(null, null, 3, f), g, "easeInOut");
        w.linear = k.easing.Linear.easeIn, w.swing = k.easing.Quad.easeInOut;
        var y = s("events.EventDispatcher", function (a) {
            this._listeners = {}, this._eventTarget = a || this
        });
        g = y.prototype, g.addEventListener = function (a, b, c, d, e) {
            e = e || 0;
            var f, g, j = this._listeners[a],
                k = 0;
            for (this !== h || i || h.wake(), null == j && (this._listeners[a] = j = []), g = j.length; --g > -1;) f = j[g], f.c === b && f.s === c ? j.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
            j.splice(k, 0, {
                c: b,
                s: c,
                up: d,
                pr: e
            })
        }, g.removeEventListener = function (a, b) {
            var c, d = this._listeners[a];
            if (d)
                for (c = d.length; --c > -1;)
                    if (d[c].c === b) return void d.splice(c, 1)
        }, g.dispatchEvent = function (a) {
            var b, c, d, e = this._listeners[a];
            if (e)
                for (b = e.length, c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, {
                    type: a,
                    target: c
                }) : d.c.call(d.s || c))
        };
        var z = a.requestAnimationFrame,
            A = a.cancelAnimationFrame,
            B = Date.now || function () {
                return (new Date).getTime()
            },
            C = B();
        for (e = ["ms", "moz", "webkit", "o"], f = e.length; --f > -1 && !z;) z = a[e[f] + "RequestAnimationFrame"], A = a[e[f] + "CancelAnimationFrame"] || a[e[f] + "CancelRequestAnimationFrame"];
        s("Ticker", function (a, b) {
            var c, d, e, f, g, j = this,
                k = B(),
                m = b !== !1 && z ? "auto" : !1,
                o = 500,
                p = 33,
                q = "tick",
                r = function (a) {
                    var b, h, i = B() - C;
                    i > o && (k += i - p), C += i, j.time = (C - k) / 1e3, b = j.time - g, (!c || b > 0 || a === !0) && (j.frame++, g += b + (b >= f ? .004 : f - b), h = !0), a !== !0 && (e = d(r)), h && j.dispatchEvent(q)
                };
            y.call(j), j.time = j.frame = 0, j.tick = function () {
                r(!0)
            }, j.lagSmoothing = function (a, b) {
                o = a || 1 / l, p = Math.min(b, o, 0)
            }, j.sleep = function () {
                null != e && (m && A ? A(e) : clearTimeout(e), d = n, e = null, j === h && (i = !1))
            }, j.wake = function (a) {
                null !== e ? j.sleep() : a ? k += -C + (C = B()) : j.frame > 10 && (C = B() - o + 5), d = 0 === c ? n : m && z ? z : function (a) {
                    return setTimeout(a, 1e3 * (g - j.time) + 1 | 0)
                }, j === h && (i = !0), r(2)
            }, j.fps = function (a) {
                return arguments.length ? (c = a, f = 1 / (c || 60), g = this.time + f, void j.wake()) : c
            }, j.useRAF = function (a) {
                return arguments.length ? (j.sleep(), m = a, void j.fps(c)) : m
            }, j.fps(a), setTimeout(function () {
                "auto" === m && j.frame < 5 && "hidden" !== document.visibilityState && j.useRAF(!1)
            }, 1500)
        }), g = k.Ticker.prototype = new k.events.EventDispatcher, g.constructor = k.Ticker;
        var D = s("core.Animation", function (a, b) {
            if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, W) {
                i || h.wake();
                var c = this.vars.useFrames ? V : W;
                c.add(this, c._time), this.vars.paused && this.paused(!0)
            }
        });
        h = D.ticker = new k.Ticker, g = D.prototype, g._dirty = g._gc = g._initted = g._paused = !1, g._totalTime = g._time = 0, g._rawPrevTime = -1, g._next = g._last = g._onUpdate = g._timeline = g.timeline = null, g._paused = !1;
        var E = function () {
            i && B() - C > 2e3 && h.wake(), setTimeout(E, 2e3)
        };
        E(), g.play = function (a, b) {
            return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
        }, g.pause = function (a, b) {
            return null != a && this.seek(a, b), this.paused(!0)
        }, g.resume = function (a, b) {
            return null != a && this.seek(a, b), this.paused(!1)
        }, g.seek = function (a, b) {
            return this.totalTime(Number(a), b !== !1)
        }, g.restart = function (a, b) {
            return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
        }, g.reverse = function (a, b) {
            return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
        }, g.render = function (a, b, c) { }, g.invalidate = function () {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, g.isActive = function () {
            var a, b = this._timeline,
                c = this._startTime;
            return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && a < c + this.totalDuration() / this._timeScale
        }, g._enabled = function (a, b) {
            return i || h.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
        }, g._kill = function (a, b) {
            return this._enabled(!1, !1)
        }, g.kill = function (a, b) {
            return this._kill(a, b), this
        }, g._uncache = function (a) {
            for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
            return this
        }, g._swapSelfInParams = function (a) {
            for (var b = a.length, c = a.concat() ; --b > -1;) "{self}" === a[b] && (c[b] = this);
            return c
        }, g._callback = function (a) {
            var b = this.vars;
            b[a].apply(b[a + "Scope"] || b.callbackScope || this, b[a + "Params"] || u)
        }, g.eventCallback = function (a, b, c, d) {
            if ("on" === (a || "").substr(0, 2)) {
                var e = this.vars;
                if (1 === arguments.length) return e[a];
                null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = o(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
            }
            return this
        }, g.delay = function (a) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
        }, g.duration = function (a) {
            return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, g.totalDuration = function (a) {
            return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
        }, g.time = function (a, b) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
        }, g.totalTime = function (a, b, c) {
            if (i || h.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var d = this._totalDuration,
                        e = this._timeline;
                    if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                        for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J.length && Y(), this.render(a, b, !1), J.length && Y())
            }
            return this
        }, g.progress = g.totalProgress = function (a, b) {
            var c = this.duration();
            return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
        }, g.startTime = function (a) {
            return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
        }, g.endTime = function (a) {
            return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        }, g.timeScale = function (a) {
            if (!arguments.length) return this._timeScale;
            if (a = a || l, this._timeline && this._timeline.smoothChildTiming) {
                var b = this._pauseTime,
                    c = b || 0 === b ? b : this._timeline.totalTime();
                this._startTime = c - (c - this._startTime) * this._timeScale / a
            }
            return this._timeScale = a, this._uncache(!1)
        }, g.reversed = function (a) {
            return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, g.paused = function (a) {
            if (!arguments.length) return this._paused;
            var b, c, d = this._timeline;
            return a != this._paused && d && (i || a || h.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this
        };
        var F = s("core.SimpleTimeline", function (a) {
            D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        g = F.prototype = new D, g.constructor = F, g.kill()._gc = !1, g._first = g._last = g._recent = null, g._sortChildren = !1, g.add = g.insert = function (a, b, c, d) {
            var e, f;
            if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren)
                for (f = a._startTime; e && e._startTime > f;) e = e._prev;
            return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this
        }, g._remove = function (a, b) {
            return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, g.render = function (a, b, c) {
            var d, e = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
        }, g.rawTime = function () {
            return i || h.wake(), this._totalTime
        };
        var G = s("TweenLite", function (b, c, d) {
            if (D.call(this, c, d), this.render = G.prototype.render, null == b) throw "Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : G.selector(b) || b;
            var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                i = this.vars.overwrite;
            if (this._overwrite = i = null == i ? U[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : U[i], (h || b instanceof Array || b.push && o(b)) && "number" != typeof b[0])
                for (this._targets = g = m(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(m(f))) : (this._siblings[e] = Z(f, this, !1), 1 === i && this._siblings[e].length > 1 && _(f, this, null, 1, this._siblings[e])) : (f = g[e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
            else this._propLookup = {}, this._siblings = Z(b, this, !1), 1 === i && this._siblings.length > 1 && _(b, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -l, this.render(Math.min(0, -this._delay)))
        }, !0),
            H = function (b) {
                return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
            },
            I = function (a, b) {
                var c, d = {};
                for (c in a) T[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!Q[c] || Q[c] && Q[c]._autoCSS) || (d[c] = a[c], delete a[c]);
                a.css = d
            };
        g = G.prototype = new D, g.constructor = G, g.kill()._gc = !1, g.ratio = 0, g._firstPT = g._targets = g._overwrittenProps = g._startAt = null, g._notifyPluginsOfEnabled = g._lazy = !1, G.version = "1.18.5", G.defaultEase = g._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = h, G.autoSleep = 120, G.lagSmoothing = function (a, b) {
            h.lagSmoothing(a, b)
        }, G.selector = a.$ || a.jQuery || function (b) {
            var c = a.$ || a.jQuery;
            return c ? (G.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
        };
        var J = [],
            K = {},
            L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
            M = function (a) {
                for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? a ? this.join("") : this.start : c.c * a + c.s, c.r ? b = Math.round(b) : d > b && b > -d && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next
            },
            N = function (a, b, c, d) {
                var e, f, g, h, i, j, k, l = [a, b],
                    m = 0,
                    n = "",
                    o = 0;
                for (l.start = a, c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l._firstPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
                    _next: l._firstPT,
                    t: l,
                    p: l.length - 1,
                    s: g,
                    c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
                    f: 0,
                    r: o && 4 > o
                }), m += k.length;
                return n += b.substr(m), n && l.push(n), l.setRatio = M, l
            },
            O = function (a, b, c, d, e, f, g, h) {
                var i, j, k = "get" === c ? a[b] : c,
                    l = typeof a[b],
                    m = "string" == typeof d && "=" === d.charAt(1),
                    n = {
                        t: a,
                        p: b,
                        s: k,
                        f: "function" === l,
                        pg: 0,
                        n: e || b,
                        r: f,
                        pr: 0,
                        c: m ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - k || 0
                    };
                return "number" !== l && ("function" === l && "get" === c && (j = b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3), n.s = k = g ? a[j](g) : a[j]()), "string" == typeof k && (g || isNaN(k)) ? (n.fp = g, i = N(k, d, h || G.defaultStringFilter, n), n = {
                    t: i,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: 2,
                    pg: 0,
                    n: e || b,
                    pr: 0
                }) : m || (n.s = parseFloat(k), n.c = parseFloat(d) - n.s || 0)), n.c ? ((n._next = this._firstPT) && (n._next._prev = n), this._firstPT = n, n) : void 0
            },
            P = G._internals = {
                isArray: o,
                isSelector: H,
                lazyTweens: J,
                blobDif: N
            },
            Q = G._plugins = {},
            R = P.tweenLookup = {},
            S = 0,
            T = P.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1,
                lazy: 1,
                onOverwrite: 1,
                callbackScope: 1,
                stringFilter: 1,
                id: 1
            },
            U = {
                none: 0,
                all: 1,
                auto: 2,
                concurrent: 3,
                allOnStart: 4,
                preexisting: 5,
                "true": 1,
                "false": 0
            },
            V = D._rootFramesTimeline = new F,
            W = D._rootTimeline = new F,
            X = 30,
            Y = P.lazyRender = function () {
                var a, b = J.length;
                for (K = {}; --b > -1;) a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                J.length = 0
            };
        W._startTime = h.time, V._startTime = h.frame, W._active = V._active = !0, setTimeout(Y, 1), D._updateRoot = G.render = function () {
            var a, b, c;
            if (J.length && Y(), W.render((h.time - W._startTime) * W._timeScale, !1, !1), V.render((h.frame - V._startTime) * V._timeScale, !1, !1), J.length && Y(), h.frame >= X) {
                X = h.frame + (parseInt(G.autoSleep, 10) || 120);
                for (c in R) {
                    for (b = R[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                    0 === b.length && delete R[c]
                }
                if (c = W._first, (!c || c._paused) && G.autoSleep && !V._first && 1 === h._listeners.tick.length) {
                    for (; c && c._paused;) c = c._next;
                    c || h.sleep()
                }
            }
        }, h.addEventListener("tick", D._updateRoot);
        var Z = function (a, b, c) {
            var d, e, f = a._gsTweenID;
            if (R[f || (a._gsTweenID = f = "t" + S++)] || (R[f] = {
                target: a,
                tweens: []
            }), b && (d = R[f].tweens, d[e = d.length] = b, c))
                for (; --e > -1;) d[e] === b && d.splice(e, 1);
            return R[f].tweens
        },
            $ = function (a, b, c, d) {
                var e, f, g = a.vars.onOverwrite;
                return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
            },
            _ = function (a, b, c, d, e) {
                var f, g, h, i;
                if (1 === d || d >= 4) {
                    for (i = e.length, f = 0; i > f; f++)
                        if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
                        else if (5 === d) break;
                    return g
                }
                var j, k = b._startTime + l,
                    m = [],
                    n = 0,
                    o = 0 === b._duration;
                for (f = e.length; --f > -1;) (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || aa(b, 0, o), 0 === aa(h, j, o) && (m[n++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (m[n++] = h)));
                for (f = n; --f > -1;)
                    if (h = m[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
                        if (2 !== d && !$(h, b)) continue;
                        h._enabled(!1, !1) && (g = !0)
                    }
                return g
            },
            aa = function (a, b, c) {
                for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                    if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                    d = d._timeline
                }
                return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * l > f - b ? l : (f += a.totalDuration() / a._timeScale / e) > b + l ? 0 : f - b - l
            };
        g._init = function () {
            var a, b, c, d, e, f = this.vars,
                g = this._overwrittenProps,
                h = this._duration,
                i = !!f.immediateRender,
                j = f.ease;
            if (f.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                for (d in f.startAt) e[d] = f.startAt[d];
                if (e.overwrite = !1, e.immediateRender = !0, e.lazy = i && f.lazy !== !1, e.startAt = e.delay = null, this._startAt = G.to(this.target, 0, e), i)
                    if (this._time > 0) this._startAt = null;
                    else if (0 !== h) return
            } else if (f.runBackwards && 0 !== h)
                if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                else {
                    0 !== this._time && (i = !1), c = {};
                    for (d in f) T[d] && "autoCSS" !== d || (c[d] = f[d]);
                    if (c.overwrite = 0, c.data = "isFromStart", c.lazy = i && f.lazy !== !1, c.immediateRender = i, this._startAt = G.to(this.target, 0, c), i) {
                        if (0 === this._time) return
                    } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = j = j ? j instanceof v ? j : "function" == typeof j ? new v(j, f.easeParams) : w[j] || G.defaultEase : G.defaultEase, f.easeParams instanceof Array && j.config && (this._ease = j.config.apply(j, f.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                for (a = this._targets.length; --a > -1;) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], g ? g[a] : null) && (b = !0);
            else b = this._initProps(this.target, this._propLookup, this._siblings, g);
            if (b && G._onPluginEvent("_onInitAllProps", this), g && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), f.runBackwards)
                for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
            this._onUpdate = f.onUpdate, this._initted = !0
        }, g._initProps = function (b, c, d, e) {
            var f, g, h, i, j, k;
            if (null == b) return !1;
            K[b._gsTweenID] && Y(), this.vars.css || b.style && b !== a && b.nodeType && Q.css && this.vars.autoCSS !== !1 && I(this.vars, b);
            for (f in this.vars)
                if (k = this.vars[f], T[f]) k && (k instanceof Array || k.push && o(k)) && -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(k, this));
                else if (Q[f] && (i = new Q[f])._onInitTween(b, this.vars[f], this)) {
                    for (this._firstPT = j = {
                        _next: this._firstPT,
                        t: i,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: f,
                        pg: 1,
                        pr: i._priority
                    }, g = i._overwriteProps.length; --g > -1;) c[i._overwriteProps[g]] = this._firstPT;
                    (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0), j._next && (j._next._prev = j)
                } else c[f] = O.call(this, b, f, "get", k, f, 0, null, this.vars.stringFilter);
            return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && _(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), h)
        }, g.render = function (a, b, c) {
            var d, e, f, g, h = this._time,
                i = this._duration,
                j = this._rawPrevTime;
            if (a >= i - 1e-7) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === l && "isPause" !== this.data) && j !== a && (c = !0, j > l && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : l);
            else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== l || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : l)), this._initted || (c = !0);
            else if (this._totalTime = this._time = a, this._easeType) {
                var k = a / i,
                    m = this._easeType,
                    n = this._easePower;
                (1 === m || 3 === m && k >= .5) && (k = 1 - k), 3 === m && (k *= 2), 1 === n ? k *= k : 2 === n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === m ? this.ratio = 1 - k : 2 === m ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2
            } else this.ratio = this._ease.getRatio(a / i);
            if (this._time !== h || c) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J.push(this), void (this._lazy = [a, b]);
                    this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === l && g !== l && (this._rawPrevTime = 0))
            }
        }, g._kill = function (a, b, c) {
            if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
            b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;
            var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
            if ((o(b) || H(b)) && "number" != typeof b[0])
                for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0);
            else {
                if (this._targets) {
                    for (d = this._targets.length; --d > -1;)
                        if (b === this._targets[d]) {
                            h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                            break
                        }
                } else {
                    if (b !== this.target) return !1;
                    h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                }
                if (h) {
                    if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
                        for (f in j) h[f] && (l || (l = []), l.push(f));
                        if ((l || !a) && !$(this, c, b, l)) return !1
                    }
                    for (f in j) (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return i
        }, g.invalidate = function () {
            return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -l, this.render(Math.min(0, -this._delay))), this
        }, g._enabled = function (a, b) {
            if (i || h.wake(), a && this._gc) {
                var c, d = this._targets;
                if (d)
                    for (c = d.length; --c > -1;) this._siblings[c] = Z(d[c], this, !0);
                else this._siblings = Z(this.target, this, !0)
            }
            return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
        }, G.to = function (a, b, c) {
            return new G(a, b, c)
        }, G.from = function (a, b, c) {
            return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c)
        }, G.fromTo = function (a, b, c, d) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a, b, d)
        }, G.delayedCall = function (a, b, c, d, e) {
            return new G(b, 0, {
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: d,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                lazy: !1,
                useFrames: e,
                overwrite: 0
            })
        }, G.set = function (a, b) {
            return new G(a, 0, b)
        }, G.getTweensOf = function (a, b) {
            if (null == a) return [];
            a = "string" != typeof a ? a : G.selector(a) || a;
            var c, d, e, f;
            if ((o(a) || H(a)) && "number" != typeof a[0]) {
                for (c = a.length, d = []; --c > -1;) d = d.concat(G.getTweensOf(a[c], b));
                for (c = d.length; --c > -1;)
                    for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
            } else
                for (d = Z(a).concat(), c = d.length; --c > -1;) (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
            return d
        }, G.killTweensOf = G.killDelayedCallsTo = function (a, b, c) {
            "object" == typeof b && (c = b, b = !1);
            for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
        };
        var ba = s("plugins.TweenPlugin", function (a, b) {
            this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = ba.prototype
        }, !0);
        if (g = ba.prototype, ba.version = "1.18.0", ba.API = 2, g._firstPT = null, g._addTween = O, g.setRatio = M, g._kill = function (a) {
                var b, c = this._overwriteProps,
                    d = this._firstPT;
                if (null != a[this._propName]) this._overwriteProps = [];
        else
                    for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
                for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                return !1
        }, g._roundProps = function (a, b) {
                for (var c = this._firstPT; c;) (a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
        }, G._onPluginEvent = function (a, b) {
                var c, d, e, f, g, h = b._firstPT;
                if ("_onInitAllProps" === a) {
                    for (; h;) {
                        for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                        (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g
        }
                    h = b._firstPT = e
        }
                for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                return c
        }, ba.activate = function (a) {
                for (var b = a.length; --b > -1;) a[b].API === ba.API && (Q[(new a[b])._propName] = a[b]);
                return !0
        }, r.plugin = function (a) {
                if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                var b, c = a.propName,
                    d = a.priority || 0,
                    e = a.overwriteProps,
                    f = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_roundProps",
            initAll: "_onInitAllProps"
        },
                    g = s("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
                        ba.call(this, c, d), this._overwriteProps = e || []
        }, a.global === !0),
                    h = g.prototype = new ba(c);
                h.constructor = g, g.API = a.API;
                for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
                return g.version = a.version, ba.activate([g]), g
        }, e = a._gsQueue) {
            for (f = 0; f < e.length; f++) e[f]();
            for (g in p) p[g].func || a.console.log("GSAP encountered missing dependency: com.greensock." + g)
        }
        i = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");


/* TIME LINE LITE */
/*!
 * VERSION: 1.18.5
 * DATE: 2016-05-24
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (a, b, c) {
        var d = function (a) {
            b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var c, d, e = this.vars;
            for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
            i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
        },
            e = 1e-10,
            f = c._internals,
            g = d._internals = {},
            h = f.isSelector,
            i = f.isArray,
            j = f.lazyTweens,
            k = f.lazyRender,
            l = _gsScope._gsDefine.globals,
            m = function (a) {
                var b, c = {};
                for (b in a) c[b] = a[b];
                return c
            },
            n = function (a, b, c) {
                var d, e, f = a.cycle;
                for (d in f) e = f[d], a[d] = "function" == typeof e ? e.call(b[c], c) : e[c % e.length];
                delete a.cycle
            },
            o = g.pauseCallback = function () { },
            p = function (a) {
                var b, c = [],
                    d = a.length;
                for (b = 0; b !== d; c.push(a[b++]));
                return c
            },
            q = d.prototype = new b;
        return d.version = "1.18.5", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q._hasPause = !1, q.to = function (a, b, d, e) {
            var f = d.repeat && l.TweenMax || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
        }, q.from = function (a, b, d, e) {
            return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
        }, q.fromTo = function (a, b, d, e, f) {
            var g = e.repeat && l.TweenMax || c;
            return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
        }, q.staggerTo = function (a, b, e, f, g, i, j, k) {
            var l, o, q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming
            }),
                r = e.cycle;
            for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l = m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a, o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q.to(a[o], b, l, o * f);
            return this.add(q, g)
        }, q.staggerFrom = function (a, b, c, d, e, f, g, h) {
            return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
        }, q.staggerFromTo = function (a, b, c, d, e, f, g, h, i) {
            return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
        }, q.call = function (a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e)
        }, q.set = function (a, b, d) {
            return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
        }, d.exportRoot = function (a, b) {
            a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            var e, f, g = new d(a),
                h = g._timeline;
            for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
            return h.add(g, 0), g
        }, q.add = function (e, f, g, h) {
            var j, k, l, m, n, o;
            if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                if (e instanceof Array || e && e.push && i(e)) {
                    for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({
                        tweens: m
                    })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                    return this._uncache(!0)
                }
                if ("string" == typeof e) return this.addLabel(e, f);
                if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                e = c.delayedCall(0, e)
            }
            if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
            return this
        }, q.remove = function (b) {
            if (b instanceof a) {
                this._remove(b, !1);
                var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
                return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
            }
            if (b instanceof Array || b && b.push && i(b)) {
                for (var d = b.length; --d > -1;) this.remove(b[d]);
                return this
            }
            return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
        }, q._remove = function (a, c) {
            b.prototype._remove.call(this, a, c);
            var d = this._last;
            return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, q.append = function (a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
        }, q.insert = q.insertMultiple = function (a, b, c, d) {
            return this.add(a, b || 0, c, d)
        }, q.appendMultiple = function (a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
        }, q.addLabel = function (a, b) {
            return this._labels[a] = this._parseTimeOrLabel(b), this
        }, q.addPause = function (a, b, d, e) {
            var f = c.delayedCall(0, o, d, e || this);
            return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this._hasPause = !0, this.add(f, a)
        }, q.removeLabel = function (a) {
            return delete this._labels[a], this
        }, q.getLabelTime = function (a) {
            return null != this._labels[a] ? this._labels[a] : -1
        }, q._parseTimeOrLabel = function (b, c, d, e) {
            var f;
            if (e instanceof a && e.timeline === this) this.remove(e);
            else if (e && (e instanceof Array || e.push && i(e)))
                for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
            if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
            if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
            else {
                if (f = b.indexOf("="), -1 === f) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
            }
            return Number(b) + c
        }, q.seek = function (a, b) {
            return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
        }, q.stop = function () {
            return this.paused(!0)
        }, q.gotoAndPlay = function (a, b) {
            return this.play(a, b)
        }, q.gotoAndStop = function (a, b) {
            return this.pause(a, b)
        }, q.render = function (a, b, c) {
            this._gc && this._enabled(!0, !1);
            var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
                o = this._time,
                p = this._startTime,
                q = this._timeScale,
                r = this._paused;
            if (a >= n - 1e-7) this._totalTime = this._time = n, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = n + 1e-4;
            else if (1e-7 > a)
                if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a;
                else {
                    if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, 0 === a && f)
                        for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d = d._next;
                    a = 0, this._initted || (i = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !b) {
                    if (a >= o)
                        for (d = this._first; d && d._startTime <= a && !l;) d._duration || "isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this._rawPrevTime || (l = d), d = d._next;
                    else
                        for (d = this._last; d && d._startTime >= a && !l;) d._duration || "isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
                    l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = a
            }
            if (this._time !== o && this._first || c || i || l) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && (0 === this._time && this._duration || b || this._callback("onStart")), m = this._time, m >= o)
                    for (d = this._first; d && (g = d._next, m === this._time && (!this._paused || r)) ;) (d._active || d._startTime <= m && !d._paused && !d._gc) && (l === d && this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                else
                    for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused || r)) ;) {
                        if (d._active || d._startTime <= o && !d._paused && !d._gc) {
                            if (l === d) {
                                for (l = d._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (a - l._startTime) * l._timeScale : (a - l._startTime) * l._timeScale, b, c), l = l._prev;
                                l = null, this.pause()
                            }
                            d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)
                        }
                        d = g
                    }
                this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this._gc || (p === this._startTime || q !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this._callback(h)))
            }
        }, q._hasPausedChild = function () {
            for (var a = this._first; a;) {
                if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                a = a._next
            }
            return !1
        }, q.getChildren = function (a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
            return f
        }, q.getTweensOf = function (a, b) {
            var d, e, f = this._gc,
                g = [],
                h = 0;
            for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;) (d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
            return f && this._enabled(!1, !0), g
        }, q.recent = function () {
            return this._recent
        }, q._contains = function (a) {
            for (var b = a.timeline; b;) {
                if (b === this) return !0;
                b = b.timeline
            }
            return !1
        }, q.shiftChildren = function (a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
            if (b)
                for (d in f) f[d] >= c && (f[d] += a);
            return this._uncache(!0)
        }, q._kill = function (a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
            return e
        }, q.clear = function (a) {
            var b = this.getChildren(!1, !0, !0),
                c = b.length;
            for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
            return a !== !1 && (this._labels = {}), this._uncache(!0)
        }, q.invalidate = function () {
            for (var b = this._first; b;) b.invalidate(), b = b._next;
            return a.prototype.invalidate.call(this)
        }, q._enabled = function (a, c) {
            if (a === this._gc)
                for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
            return b.prototype._enabled.call(this, a, c)
        }, q.totalTime = function (b, c, d) {
            this._forcingPlayhead = !0;
            var e = a.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, q.duration = function (a) {
            return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
        }, q.totalDuration = function (a) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                    this._duration = this._totalDuration = d, this._dirty = !1
                }
                return this._totalDuration
            }
            return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
        }, q.paused = function (b) {
            if (!b)
                for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c.data && (c._rawPrevTime = 0), c = c._next;
            return a.prototype.paused.apply(this, arguments)
        }, q.usesFrames = function () {
            for (var b = this._timeline; b._timeline;) b = b._timeline;
            return b === a._rootFramesTimeline
        }, q.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, d
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function (a) {
        "use strict";
        var b = function () {
            return (_gsScope.GreenSockGlobals || _gsScope)[a]
        };
        "function" == typeof define && define.amd ? define(["./TweenLite"], b) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = b())
    }("TimelineLite");


/* EASING PLUGIN */
/*!
 * VERSION: 1.15.4
 * DATE: 2016-05-24
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
        var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
            f = e.com.greensock,
            g = 2 * Math.PI,
            h = Math.PI / 2,
            i = f._class,
            j = function (b, c) {
                var d = i("easing." + b, function () { }, !0),
                    e = d.prototype = new a;
                return e.constructor = d, e.getRatio = c, d
            },
            k = a.register || function () { },
            l = function (a, b, c, d, e) {
                var f = i("easing." + a, {
                    easeOut: new b,
                    easeIn: new c,
                    easeInOut: new d
                }, !0);
                return k(f, a), f
            },
            m = function (a, b, c) {
                this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a)
            },
            n = function (b, c) {
                var d = i("easing." + b, function (a) {
                    this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
                }, !0),
                    e = d.prototype = new a;
                return e.constructor = d, e.getRatio = c, e.config = function (a) {
                    return new d(a)
                }, d
            },
            o = l("Back", n("BackOut", function (a) {
                return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
            }), n("BackIn", function (a) {
                return a * a * ((this._p1 + 1) * a - this._p1)
            }), n("BackInOut", function (a) {
                return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
            })),
            p = i("easing.SlowMo", function (a, b, c) {
                b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0
            }, !0),
            q = p.prototype = new a;
        return q.constructor = p, q.getRatio = function (a) {
            var b = a + (.5 - a) * this._p;
            return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }, p.ease = new p(.7, .7), q.config = p.config = function (a, b, c) {
            return new p(a, b, c)
        }, b = i("easing.SteppedEase", function (a) {
            a = a || 1, this._p1 = 1 / a, this._p2 = a + 1
        }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function (a) {
            return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
        }, q.config = b.config = function (a) {
            return new b(a)
        }, c = i("easing.RoughEase", function (b) {
            b = b || {};
            for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
                x: c,
                y: d
            };
            for (j.sort(function (a, b) {
                    return a.x - b.x
            }), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
            this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
        }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function (a) {
            var b = this._prev;
            if (a > b.t) {
                for (; b.next && a >= b.t;) b = b.next;
                b = b.prev
            } else
                for (; b.prev && a <= b.t;) b = b.prev;
            return this._prev = b, b.v + (a - b.t) / b.gap * b.c
        }, q.config = function (a) {
            return new c(a)
        }, c.ease = new c, l("Bounce", j("BounceOut", function (a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), j("BounceIn", function (a) {
            return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), j("BounceInOut", function (a) {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
        })), l("Circ", j("CircOut", function (a) {
            return Math.sqrt(1 - (a -= 1) * a)
        }), j("CircIn", function (a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), j("CircInOut", function (a) {
            return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })), d = function (b, c, d) {
            var e = i("easing." + b, function (a, b) {
                this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
            }, !0),
                f = e.prototype = new a;
            return f.constructor = e, f.getRatio = c, f.config = function (a, b) {
                return new e(a, b)
            }, e
        }, l("Elastic", d("ElasticOut", function (a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
        }, .3), d("ElasticIn", function (a) {
            return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2))
        }, .3), d("ElasticInOut", function (a) {
            return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1
        }, .45)), l("Expo", j("ExpoOut", function (a) {
            return 1 - Math.pow(2, -10 * a)
        }), j("ExpoIn", function (a) {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), j("ExpoInOut", function (a) {
            return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })), l("Sine", j("SineOut", function (a) {
            return Math.sin(a * h)
        }), j("SineIn", function (a) {
            return -Math.cos(a * h) + 1
        }), j("SineInOut", function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })), i("easing.EaseLookup", {
            find: function (b) {
                return a.map[b]
            }
        }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function () {
        "use strict";
        var a = function () {
            return _gsScope.GreenSockGlobals || _gsScope
        };
        "function" == typeof define && define.amd ? define(["../TweenLite"], a) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = a())
    }();

/* CSS PLUGIN */
/*!
 * VERSION: 1.18.5
 * DATE: 2016-05-24
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
        var c, d, e, f, g = function () {
            a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio
        },
            h = _gsScope._gsDefine.globals,
            i = {},
            j = g.prototype = new a("css");
        j.constructor = g, g.version = "1.18.5", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: ""
        };
        var k, l, m, n, o, p, q = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            r = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            s = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            t = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            u = /(?:\d|\-|\+|=|#|\.)*/g,
            v = /opacity *= *([^)]*)/i,
            w = /opacity:([^;]*)/i,
            x = /alpha\(opacity *=.+?\)/i,
            y = /^(rgb|hsl)/,
            z = /([A-Z])/g,
            A = /-([a-z])/gi,
            B = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            C = function (a, b) {
                return b.toUpperCase()
            },
            D = /(?:Left|Right|Width)/i,
            E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            G = /,(?=[^\)]*(?:\(|$))/gi,
            H = /[\s,\(]/i,
            I = Math.PI / 180,
            J = 180 / Math.PI,
            K = {},
            L = document,
            M = function (a) {
                return L.createElementNS ? L.createElementNS("http://www.w3.org/1999/xhtml", a) : L.createElement(a)
            },
            N = M("div"),
            O = M("img"),
            P = g._internals = {
                _specialProps: i
            },
            Q = navigator.userAgent,
            R = function () {
                var a = Q.indexOf("Android"),
                    b = M("a");
                return m = -1 !== Q.indexOf("Safari") && -1 === Q.indexOf("Chrome") && (-1 === a || Number(Q.substr(a + 8, 1)) > 3), o = m && Number(Q.substr(Q.indexOf("Version/") + 8, 1)) < 6, n = -1 !== Q.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Q) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Q)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
            }(),
            S = function (a) {
                return v.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            T = function (a) {
                window.console && console.log(a)
            },
            U = "",
            V = "",
            W = function (a, b) {
                b = b || N;
                var c, d, e = b.style;
                if (void 0 !== e[a]) return a;
                for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
                return d >= 0 ? (V = 3 === d ? "ms" : c[d], U = "-" + V.toLowerCase() + "-", V + a) : null
            },
            X = L.defaultView ? L.defaultView.getComputedStyle : function () { },
            Y = g.getStyle = function (a, b, c, d, e) {
                var f;
                return R || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || X(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(z, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : S(a)
            },
            Z = P.convertToPixels = function (a, c, d, e, f) {
                if ("px" === e || !e) return d;
                if ("auto" === e || !d) return 0;
                var h, i, j, k = D.test(c),
                    l = a,
                    m = N.style,
                    n = 0 > d,
                    o = 1 === d;
                if (n && (d = -d), o && (d *= 100), "%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);
                else {
                    if (m.cssText = "border:0 solid red;position:" + Y(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                    else {
                        if (l = a.parentNode || L.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
                        m[k ? "width" : "height"] = d + e
                    }
                    l.appendChild(N), h = parseFloat(N[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(N), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = Z(a, c, d, e, !0))
                }
                return o && (h /= 100), n ? -h : h
            },
            $ = P.calculateOffset = function (a, b, c) {
                if ("absolute" !== Y(a, "position", c)) return 0;
                var d = "left" === b ? "Left" : "Top",
                    e = Y(a, "margin" + d, c);
                return a["offset" + d] - (Z(a, b, parseFloat(e), e.replace(u, "")) || 0)
            },
            _ = function (a, b) {
                var c, d, e, f = {};
                if (b = b || X(a, null))
                    if (c = b.length)
                        for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Aa === e) && (f[e.replace(A, C)] = b.getPropertyValue(e));
                    else
                        for (c in b) (-1 === c.indexOf("Transform") || za === c) && (f[c] = b[c]);
                else if (b = a.currentStyle || a.style)
                    for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(A, C)] = b[c]);
                return R || (f.opacity = S(a)), d = Na(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Ca && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f
            },
            aa = function (a, b, c, d, e) {
                var f, g, h, i = {},
                    j = a.style;
                for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(t, "") ? f : 0 : $(a, g), void 0 !== j[g] && (h = new pa(j, g, j[g], h)));
                if (d)
                    for (g in d) "className" !== g && (i[g] = d[g]);
                return {
                    difs: i,
                    firstMPT: h
                }
            },
            ba = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            ca = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            da = function (a, b, c) {
                if ("svg" === (a.nodeName + "").toLowerCase()) return (c || X(a))[b] || 0;
                if (a.getBBox && Ka(a)) return a.getBBox()[b] || 0;
                var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                    e = ba[b],
                    f = e.length;
                for (c = c || X(a, null) ; --f > -1;) d -= parseFloat(Y(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(Y(a, "border" + e[f] + "Width", c, !0)) || 0;
                return d
            },
            ea = function (a, b) {
                if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
                (null == a || "" === a) && (a = "0 0");
                var c, d = a.split(" "),
                    e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
                    f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
                if (d.length > 3 && !b) {
                    for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a.push(ea(d[c]));
                    return a.join(",")
                }
                return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(t, "")), b.oy = parseFloat(f.replace(t, "")), b.v = a), b || a
            },
            fa = function (a, b) {
                return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0
            },
            ga = function (a, b) {
                return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0
            },
            ha = function (a, b, c, d) {
                var e, f, g, h, i, j = 1e-6;
                return null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : J) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h
            },
            ia = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ja = function (a, b, c) {
                return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
            },
            ka = g.parseColor = function (a, b) {
                var c, d, e, f, g, h, i, j, k, l, m;
                if (a)
                    if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
                    else {
                        if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ia[a]) c = ia[a];
                        else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
                        else if ("hsl" === a.substr(0, 3))
                            if (c = m = a.match(q), b) {
                                if (-1 !== a.indexOf("=")) return a.match(r)
                            } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(a[3])), c[0] = ja(g + 1 / 3, d, e), c[1] = ja(g, d, e), c[2] = ja(g - 1 / 3, d, e);
                        else c = a.match(q) || ia.transparent;
                        c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]))
                    }
                else c = ia.black;
                return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
            },
            la = function (a, b) {
                var c, d, e, f = a.match(ma) || [],
                    g = 0,
                    h = f.length ? "" : a;
                for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = ka(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
                return h + a.substr(g)
            },
            ma = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (j in ia) ma += "|" + j + "\\b";
        ma = new RegExp(ma + ")", "gi"), g.colorStringFilter = function (a) {
            var b, c = a[0] + a[1];
            ma.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = la(a[0], b), a[1] = la(a[1], b)), ma.lastIndex = 0
        }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
        var na = function (a, b, c, d) {
            if (null == a) return function (a) {
                return a
            };
            var e, f = b ? (a.match(ma) || [""])[0] : "",
                g = a.split(f).join("").match(s) || [],
                h = a.substr(0, a.indexOf(g[0])),
                i = ")" === a.charAt(a.length - 1) ? ")" : "",
                j = -1 !== a.indexOf(" ") ? " " : ",",
                k = g.length,
                l = k > 0 ? g[0].replace(q, "") : "";
            return k ? e = b ? function (a) {
                var b, m, n, o;
                if ("number" == typeof a) a += l;
                else if (d && G.test(a)) {
                    for (o = a.replace(G, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[n]);
                    return o.join(",")
                }
                if (b = (a.match(ma) || [f])[0], m = a.split(b).join("").match(s) || [], n = m.length, k > n--)
                    for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
                return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
            } : function (a) {
                var b, f, m;
                if ("number" == typeof a) a += l;
                else if (d && G.test(a)) {
                    for (f = a.replace(G, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[m]);
                    return f.join(",")
                }
                if (b = a.match(s) || [], m = b.length, k > m--)
                    for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
                return h + b.join(j) + i
            } : function (a) {
                return a
            }
        },
            oa = function (a) {
                return a = a.split(","),
                    function (b, c, d, e, f, g, h) {
                        var i, j = (c + "").split(" ");
                        for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                        return e.parse(b, h, f, g)
                    }
            },
            pa = (P._setPluginRatio = function (a) {
                this.plugin.setRatio(a);
                for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
                if (g.autoRotate && (g.autoRotate.rotation = h.rotation), 1 === a || 0 === a)
                    for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
                        if (c = i.t, c.type) {
                            if (1 === c.type) {
                                for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                                c[f] = e
                            }
                        } else c[f] = c.s + c.xs0;
                        i = i._next
                    }
            }, function (a, b, c, d, e) {
                this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d)
            }),
            qa = (P._parseToProxy = function (a, b, c, d, e, f) {
                var g, h, i, j, k, l = d,
                    m = {},
                    n = {},
                    o = c._transform,
                    p = K;
                for (c._transform = null, K = b, d = k = c.parse(a, b, d, e), K = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))) ; d && d !== l;) {
                    if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new pa(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                        for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new pa(d, i, h, j, d.rxp[i]));
                    d = d._next
                }
                return {
                    proxy: m,
                    end: n,
                    firstMPT: j,
                    pt: k
                }
            }, P.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
                this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof qa || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this)
            }),
            ra = function (a, b, c, d, e, f) {
                var g = new qa(a, b, c, d - c, e, -1, f);
                return g.b = c, g.e = g.xs0 = d, g
            },
            sa = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
                c = c || f || "", h = new qa(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && ma.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
                var m, n, o, p, s, t, u, v, w, x, y, z, A, B = c.split(", ").join(",").split(" "),
                    C = d.split(", ").join(",").split(" "),
                    D = B.length,
                    E = k !== !1;
                for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (B = B.join(" ").replace(G, ", ").split(" "), C = C.join(" ").replace(G, ", ").split(" "), D = B.length), D !== C.length && (B = (f || "").split(" "), D = B.length), h.plugin = j, h.setRatio = l, ma.lastIndex = 0, m = 0; D > m; m++)
                    if (p = B[m], s = C[m], v = parseFloat(p), v || 0 === v) h.appendXtra("", v, fa(s, v), s.replace(r, ""), E && -1 !== s.indexOf("px"), !0);
                    else if (e && ma.test(p)) z = s.indexOf(")") + 1, z = ")" + (z ? s.substr(z) : ""), A = -1 !== s.indexOf("hsl") && R, p = ka(p, A), s = ka(s, A), w = p.length + s.length > 6, w && !R && 0 === s[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(C[m]).join("transparent")) : (R || (w = !1), A ? h.appendXtra(w ? "hsla(" : "hsl(", p[0], fa(s[0], p[0]), ",", !1, !0).appendXtra("", p[1], fa(s[1], p[1]), "%,", !1).appendXtra("", p[2], fa(s[2], p[2]), w ? "%," : "%" + z, !1) : h.appendXtra(w ? "rgba(" : "rgb(", p[0], s[0] - p[0], ",", !0, !0).appendXtra("", p[1], s[1] - p[1], ",", !0).appendXtra("", p[2], s[2] - p[2], w ? "," : z, !0), w && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (s.length < 4 ? 1 : s[3]) - p, z, !1))), ma.lastIndex = 0;
                    else if (t = p.match(q)) {
                        if (u = s.match(r), !u || u.length !== t.length) return h;
                        for (o = 0, n = 0; n < t.length; n++) y = t[n], x = p.indexOf(y, o), h.appendXtra(p.substr(o, x - o), Number(y), fa(u[n], y), "", E && "px" === p.substr(x + y.length, 2), 0 === n), o = x + y.length;
                        h["xs" + h.l] += p.substr(o)
                    } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + s : s;
                if (-1 !== d.indexOf("=") && h.data) {
                    for (z = h.xs0 + h.data.s, m = 1; m < h.l; m++) z += h["xs" + m] + h.data["xn" + m];
                    h.e = z + h["xs" + m]
                }
                return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
            },
            ta = 9;
        for (j = qa.prototype, j.l = j.pr = 0; --ta > 0;) j["xn" + ta] = 0, j["xs" + ta] = "";
        j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) {
            var g = this,
                h = g.l;
            return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new qa(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
                s: b + c
            }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
        };
        var ua = function (a, b) {
            b = b || {}, this.p = b.prefix ? W(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || na(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
        },
            va = P._registerComplexSpecialProp = function (a, b, c) {
                "object" != typeof b && (b = {
                    parser: c
                });
                var d, e, f = a.split(","),
                    g = b.defaultValue;
                for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new ua(f[d], b)
            },
            wa = function (a) {
                if (!i[a]) {
                    var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                    va(a, {
                        parser: function (a, c, d, e, f, g, j) {
                            var k = h.com.greensock.plugins[b];
                            return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (T("Error: " + b + " js file not loaded."), f)
                        }
                    })
                }
            };
        j = ua.prototype, j.parseComplex = function (a, b, c, d, e, f) {
            var g, h, i, j, k, l, m = this.keyword;
            if (this.multi && (G.test(c) || G.test(b) ? (h = b.replace(G, "|").split("|"), i = c.replace(G, "|").split("|")) : m && (h = [b], i = [c])), i) {
                for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
                b = h.join(", "), c = i.join(", ")
            }
            return sa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
        }, j.parse = function (a, b, c, d, f, g, h) {
            return this.parseComplex(a.style, this.format(Y(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
        }, g.registerSpecialProp = function (a, b, c) {
            va(a, {
                parser: function (a, d, e, f, g, h, i) {
                    var j = new qa(a, e, 0, 0, g, 2, e, !1, c);
                    return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
                },
                priority: c
            })
        }, g.useSVGTransformAttr = m || n;
        var xa, ya = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            za = W("transform"),
            Aa = U + "transform",
            Ba = W("transformOrigin"),
            Ca = null !== W("perspective"),
            Da = P.Transform = function () {
                this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Ca ? g.defaultForce3D || "auto" : !1
            },
            Ea = window.SVGElement,
            Fa = function (a, b, c) {
                var d, e = L.createElementNS("http://www.w3.org/2000/svg", a),
                    f = /([a-z])([A-Z])/g;
                for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                return b.appendChild(e), e
            },
            Ga = L.documentElement,
            Ha = function () {
                var a, b, c, d = p || /Android/i.test(Q) && !window.chrome;
                return L.createElementNS && !d && (a = Fa("svg", Ga), b = Fa("rect", a, {
                    width: 100,
                    height: 50,
                    x: 100
                }), c = b.getBoundingClientRect().width, b.style[Ba] = "50% 50%", b.style[za] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Ca), Ga.removeChild(a)), d
            }(),
            Ia = function (a, b, c, d, e, f) {
                var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform,
                    w = Ma(a, !0);
                v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), b = ea(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== La && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
            },
            Ja = function (a) {
                try {
                    return a.getBBox()
                } catch (a) { }
            },
            Ka = function (a) {
                return !!(Ea && a.getBBox && a.getCTM && Ja(a) && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM))
            },
            La = [1, 0, 0, 1, 0, 0],
            Ma = function (a, b) {
                var c, d, e, f, g, h, i = a._gsTransform || new Da,
                    j = 1e5,
                    k = a.style;
                if (za ? d = Y(a, Aa, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(E), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, c && za && ((h = "none" === X(a).display) || !a.parentNode) && (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ga.appendChild(a)), d = Y(a, Aa, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Ra(k, "display"), g && Ga.removeChild(a)), (i.svg || a.getBBox && Ka(a)) && (c && -1 !== (k[za] + "").indexOf("matrix") && (d = k[za], c = 0), e = a.getAttribute("transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return La;
                for (e = (d || "").match(q) || [], ta = e.length; --ta > -1;) f = Number(e[ta]), e[ta] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
                return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
            },
            Na = P.getTransform = function (a, c, d, e) {
                if (a._gsTransform && d && !e) return a._gsTransform;
                var f, h, i, j, k, l, m = d ? a._gsTransform || new Da : new Da,
                    n = m.scaleX < 0,
                    o = 2e-5,
                    p = 1e5,
                    q = Ca ? parseFloat(Y(a, Ba, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
                    r = parseFloat(g.defaultTransformPerspective) || 0;
                if (m.svg = !(!a.getBBox || !Ka(a)), m.svg && (Ia(a, Y(a, Ba, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), xa = g.useSVGTransformAttr || Ha), f = Ma(a), f !== La) {
                    if (16 === f.length) {
                        var s, t, u, v, w, x = f[0],
                            y = f[1],
                            z = f[2],
                            A = f[3],
                            B = f[4],
                            C = f[5],
                            D = f[6],
                            E = f[7],
                            F = f[8],
                            G = f[9],
                            H = f[10],
                            I = f[12],
                            K = f[13],
                            L = f[14],
                            M = f[11],
                            N = Math.atan2(D, H);
                        m.zOrigin && (L = -m.zOrigin, I = F * L - f[12], K = G * L - f[13], L = H * L + m.zOrigin - f[14]), m.rotationX = N * J, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * J, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * J, N && (v = Math.cos(-N), w = Math.sin(-N), x = x * v + B * w, t = y * v + C * w, C = y * -w + C * v, D = z * -w + D * v, y = t), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), m.scaleX = (Math.sqrt(x * x + y * y) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + G * G) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(D * D + H * H) * p + .5 | 0) / p, m.rotationX || m.rotationY ? m.skewX = 0 : (m.skewX = B || C ? Math.atan2(B, C) * J + m.rotation : m.skewX || 0, Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180))), m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = K, m.z = L, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C))
                    } else if (!Ca || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
                        var O = f.length >= 6,
                            P = O ? f[0] : 1,
                            Q = f[1] || 0,
                            R = f[2] || 0,
                            S = O ? f[3] : 1;
                        m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * J : m.rotation || 0, l = R || S ? Math.atan2(R, S) * J + k : m.skewX || 0, Math.abs(l) > 90 && Math.abs(l) < 270 && (n ? (i *= -1, l += 0 >= k ? 180 : -180, k += 0 >= k ? 180 : -180) : (j *= -1, l += 0 >= l ? 180 : -180)), m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Ca && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S))
                    }
                    m.zOrigin = q;
                    for (h in m) m[h] < o && m[h] > -o && (m[h] = 0)
                }
                return d && (a._gsTransform = m, m.svg && (xa && a.style[za] ? b.delayedCall(.001, function () {
                    Ra(a.style, za)
                }) : !xa && a.getAttribute("transform") && b.delayedCall(.001, function () {
                    a.removeAttribute("transform")
                }))), m
            },
            Oa = function (a) {
                var b, c, d = this.data,
                    e = -d.rotation * I,
                    f = e + d.skewX * I,
                    g = 1e5,
                    h = (Math.cos(e) * d.scaleX * g | 0) / g,
                    i = (Math.sin(e) * d.scaleX * g | 0) / g,
                    j = (Math.sin(f) * -d.scaleY * g | 0) / g,
                    k = (Math.cos(f) * d.scaleY * g | 0) / g,
                    l = this.t.style,
                    m = this.t.currentStyle;
                if (m) {
                    c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                    var n, o, q = this.t.offsetWidth,
                        r = this.t.offsetHeight,
                        s = "absolute" !== m.position,
                        t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                        w = d.x + q * d.xPercent / 100,
                        x = d.y + r * d.yPercent / 100;
                    if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, w += n - (n * h + o * i), x += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + w) + ", Dy=" + (o - (n * j + o * k) + x) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(F, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || v.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                        var y, z, A, B = 8 > p ? 1 : -1;
                        for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + w), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + x), ta = 0; 4 > ta; ta++) z = ca[ta], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : Z(this.t, z, parseFloat(y), y.replace(u, "")) || 0, A = c !== d[z] ? 2 > ta ? -d.ieOffsetX : -d.ieOffsetY : 2 > ta ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === ta || 2 === ta ? 1 : B))) + "px"
                    }
                }
            },
            Pa = P.set3DTransformRatio = P.setTransformRatio = function (a) {
                var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data,
                    A = this.t.style,
                    B = z.rotation,
                    C = z.rotationX,
                    D = z.rotationY,
                    E = z.scaleX,
                    F = z.scaleY,
                    G = z.scaleZ,
                    H = z.x,
                    J = z.y,
                    K = z.z,
                    L = z.svg,
                    M = z.perspective,
                    N = z.force3D;
                if (((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !K && !M && !D && !C && 1 === G || xa && L || !Ca) return void (B || z.skewX || L ? (B *= I, x = z.skewX * I, y = 1e5, b = Math.cos(B) * E, e = Math.sin(B) * E, c = Math.sin(B - x) * -F, f = Math.cos(B - x) * F, x && "simple" === z.skewType && (s = Math.tan(x), s = Math.sqrt(1 + s * s), c *= s, f *= s, z.skewY && (b *= s, e *= s)), L && (H += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, J += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset, xa && (z.xPercent || z.yPercent) && (p = this.t.getBBox(), H += .01 * z.xPercent * p.width, J += .01 * z.yPercent * p.height), p = 1e-6, p > H && H > -p && (H = 0), p > J && J > -p && (J = 0)), u = (b * y | 0) / y + "," + (e * y | 0) / y + "," + (c * y | 0) / y + "," + (f * y | 0) / y + "," + H + "," + J + ")", L && xa ? this.t.setAttribute("transform", "matrix(" + u) : A[za] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[za] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + J + ")");
                if (n && (p = 1e-4, p > E && E > -p && (E = G = 2e-5), p > F && F > -p && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || z.skewX) B *= I, q = b = Math.cos(B), r = e = Math.sin(B), z.skewX && (B -= z.skewX * I, q = Math.cos(B), r = Math.sin(B), "simple" === z.skewType && (s = Math.tan(z.skewX * I), s = Math.sqrt(1 + s * s), q *= s, r *= s, z.skewY && (b *= s, e *= s))), c = -r, f = q;
                else {
                    if (!(D || C || 1 !== G || M || L)) return void (A[za] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + J + "px," + K + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
                    b = f = 1, c = e = 0
                }
                j = 1, d = g = h = i = k = l = 0, m = M ? -1 / M : 0, o = z.zOrigin, p = 1e-6, v = ",", w = "0", B = D * I, B && (q = Math.cos(B), r = Math.sin(B), h = -r, k = m * -r, d = b * r, g = e * r, j = q, m *= q, b *= q, e *= q), B = C * I, B && (q = Math.cos(B), r = Math.sin(B), s = c * q + d * r, t = f * q + g * r, i = j * r, l = m * r, d = c * -r + d * q, g = f * -r + g * q, j *= q, m *= q, c = s, f = t), 1 !== G && (d *= G, g *= G, j *= G, m *= G), 1 !== F && (c *= F, f *= F, i *= F, l *= F), 1 !== E && (b *= E, e *= E, h *= E, k *= E), (o || L) && (o && (H += d * -o, J += g * -o, K += j * -o + o), L && (H += z.xOrigin - (z.xOrigin * b + z.yOrigin * c) + z.xOffset, J += z.yOrigin - (z.xOrigin * e + z.yOrigin * f) + z.yOffset), p > H && H > -p && (H = w), p > J && J > -p && (J = w), p > K && K > -p && (K = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (p > b && b > -p ? w : b) + v + (p > e && e > -p ? w : e) + v + (p > h && h > -p ? w : h), u += v + (p > k && k > -p ? w : k) + v + (p > c && c > -p ? w : c) + v + (p > f && f > -p ? w : f), C || D || 1 !== G ? (u += v + (p > i && i > -p ? w : i) + v + (p > l && l > -p ? w : l) + v + (p > d && d > -p ? w : d), u += v + (p > g && g > -p ? w : g) + v + (p > j && j > -p ? w : j) + v + (p > m && m > -p ? w : m) + v) : u += ",0,0,0,0,1,0,", u += H + v + J + v + K + v + (M ? 1 + -K / M : 1) + ")", A[za] = u
            };
        j = Da.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, va("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i) return f;
                d._lastParsedTransform = i;
                var j, k, l, m, n, o, p, q, r, s = a._gsTransform,
                    t = a.style,
                    u = 1e-6,
                    v = ya.length,
                    w = i,
                    x = {},
                    y = "transformOrigin",
                    z = Na(a, e, !0, i.parseTransform);
                if (d._transform = z, "string" == typeof w.transform && za) k = N.style, k[za] = w.transform, k.display = "block", k.position = "absolute", L.body.appendChild(N), j = Na(N, null, !1), z.svg && (p = z.xOrigin, q = z.yOrigin, j.x -= z.xOffset, j.y -= z.yOffset, (w.transformOrigin || w.svgOrigin) && (l = {}, Ia(a, ea(w.transformOrigin), l, w.svgOrigin, w.smoothOrigin, !0), p = l.xOrigin, q = l.yOrigin, j.x -= l.xOffset - z.xOffset, j.y -= l.yOffset - z.yOffset), (p || q) && (r = Ma(N, !0), j.x -= p - (p * r[0] + q * r[2]), j.y -= q - (p * r[1] + q * r[3]))), L.body.removeChild(N), j.perspective || (j.perspective = z.perspective), null != w.xPercent && (j.xPercent = ga(w.xPercent, z.xPercent)), null != w.yPercent && (j.yPercent = ga(w.yPercent, z.yPercent));
                else if ("object" == typeof w) {
                    if (j = {
                        scaleX: ga(null != w.scaleX ? w.scaleX : w.scale, z.scaleX),
                        scaleY: ga(null != w.scaleY ? w.scaleY : w.scale, z.scaleY),
                        scaleZ: ga(w.scaleZ, z.scaleZ),
                        x: ga(w.x, z.x),
                        y: ga(w.y, z.y),
                        z: ga(w.z, z.z),
                        xPercent: ga(w.xPercent, z.xPercent),
                        yPercent: ga(w.yPercent, z.yPercent),
                        perspective: ga(w.transformPerspective, z.perspective)
                    }, o = w.directionalRotation, null != o)
                        if ("object" == typeof o)
                            for (k in o) w[k] = o[k];
                        else w.rotation = o;
                    "string" == typeof w.x && -1 !== w.x.indexOf("%") && (j.x = 0, j.xPercent = ga(w.x, z.xPercent)), "string" == typeof w.y && -1 !== w.y.indexOf("%") && (j.y = 0, j.yPercent = ga(w.y, z.yPercent)), j.rotation = ha("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : z.rotation - z.skewY, z.rotation - z.skewY, "rotation", x), Ca && (j.rotationX = ha("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : z.rotationX || 0, z.rotationX, "rotationX", x), j.rotationY = ha("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : z.rotationY || 0, z.rotationY, "rotationY", x)), j.skewX = ha(w.skewX, z.skewX - z.skewY), (j.skewY = ha(w.skewY, z.skewY)) && (j.skewX += j.skewY, j.rotation += j.skewY)
                }
                for (Ca && null != w.force3D && (z.force3D = w.force3D, n = !0), z.skewType = w.skewType || z.skewType || g.defaultSkewType, m = z.force3D || z.z || z.rotationX || z.rotationY || j.z || j.rotationX || j.rotationY || j.perspective, m || null == w.scale || (j.scaleZ = 1) ; --v > -1;) c = ya[v], l = j[c] - z[c], (l > u || -u > l || null != w[c] || null != K[c]) && (n = !0, f = new qa(z, c, z[c], l, f), c in x && (f.e = x[c]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                return l = w.transformOrigin, z.svg && (l || w.svgOrigin) && (p = z.xOffset, q = z.yOffset, Ia(a, ea(l), j, w.svgOrigin, w.smoothOrigin), f = ra(z, "xOrigin", (s ? z : j).xOrigin, j.xOrigin, f, y), f = ra(z, "yOrigin", (s ? z : j).yOrigin, j.yOrigin, f, y), (p !== z.xOffset || q !== z.yOffset) && (f = ra(z, "xOffset", s ? p : z.xOffset, z.xOffset, f, y), f = ra(z, "yOffset", s ? q : z.yOffset, z.yOffset, f, y)), l = xa ? null : "0px 0px"), (l || Ca && m && z.zOrigin) && (za ? (n = !0, c = Ba, l = (l || Y(a, c, e, !1, "50% 50%")) + "", f = new qa(t, c, 0, 0, f, -1, y), f.b = t[c], f.plugin = h, Ca ? (k = z.zOrigin, l = l.split(" "), z.zOrigin = (l.length > 2 && (0 === k || "0px" !== l[2]) ? parseFloat(l[2]) : k) || 0, f.xs0 = f.e = l[0] + " " + (l[1] || "50%") + " 0px", f = new qa(z, "zOrigin", 0, 0, f, -1, f.n), f.b = k, f.xs0 = f.e = z.zOrigin) : f.xs0 = f.e = l) : ea(l + "", z)), n && (d._transformType = z.svg && xa || !m && 3 !== this._transformType ? 2 : 3), f
            },
            prefix: !0
        }), va("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), va("borderRadius", {
            defaultValue: "0px",
            parser: function (a, b, c, f, g, h) {
                b = this.format(b);
                var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    z = a.style;
                for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[j] = W(y[j])), m = l = Y(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = Z(a, "borderLeft", o, t), w = Z(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = Z(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = sa(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
                return g
            },
            prefix: !0,
            formatter: na("0px 0px 0px 0px", !1, !0)
        }), va("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function (a, b, c, d, f, g) {
                return sa(a.style, c, this.format(Y(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f)
            },
            prefix: !0,
            formatter: na("0px 0px", !1, !0)
        }), va("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (a, b, c, d, f, g) {
                var h, i, j, k, l, m, n = "background-position",
                    o = e || X(a, null),
                    q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                    r = this.format(b);
                if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = Y(a, "backgroundImage").replace(B, ""), m && "none" !== m)) {
                    for (h = q.split(" "), i = r.split(" "), O.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - O.width : a.offsetHeight - O.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
                    q = h.join(" ")
                }
                return this.parseComplex(a.style, q, r, f, g)
            },
            formatter: ea
        }), va("backgroundSize", {
            defaultValue: "0 0",
            formatter: ea
        }), va("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), va("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), va("transformStyle", {
            prefix: !0
        }), va("backfaceVisibility", {
            prefix: !0
        }), va("userSelect", {
            prefix: !0
        }), va("margin", {
            parser: oa("marginTop,marginRight,marginBottom,marginLeft")
        }), va("padding", {
            parser: oa("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }), va("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (a, b, c, d, f, g) {
                var h, i, j;
                return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(Y(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
            }
        }), va("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), va("autoRound,strictUnits", {
            parser: function (a, b, c, d, e) {
                return e
            }
        }), va("border", {
            defaultValue: "0px solid #000",
            parser: function (a, b, c, d, f, g) {
                var h = Y(a, "borderTopWidth", e, !1, "0px"),
                    i = this.format(b).split(" "),
                    j = i[0].replace(u, "");
                return "px" !== j && (h = parseFloat(h) / Z(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + Y(a, "borderTopStyle", e, !1, "solid") + " " + Y(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g)
            },
            color: !0,
            formatter: function (a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(ma) || ["#000"])[0]
            }
        }), va("borderWidth", {
            parser: oa("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }), va("float,cssFloat,styleFloat", {
            parser: function (a, b, c, d, e, f) {
                var g = a.style,
                    h = "cssFloat" in g ? "cssFloat" : "styleFloat";
                return new qa(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
            }
        });
        var Qa = function (a) {
            var b, c = this.t,
                d = c.filter || Y(this.data, "filter") || "",
                e = this.s + this.c * a | 0;
            100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !Y(this.data, "filter")) : (c.filter = d.replace(x, ""),
                b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(v, "opacity=" + e))
        };
        va("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function (a, b, c, d, f, g) {
                var h = parseFloat(Y(a, "opacity", e, !1, "1")),
                    i = a.style,
                    j = "autoAlpha" === c;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === Y(a, "visibility", e) && 0 !== b && (h = 0), R ? f = new qa(i, "opacity", h, b - h, f) : (f = new qa(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Qa), j && (f = new qa(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
            }
        });
        var Ra = function (a, b) {
            b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(z, "-$1").toLowerCase())) : a.removeAttribute(b))
        },
            Sa = function (a) {
                if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                    this.t.setAttribute("class", 0 === a ? this.b : this.e);
                    for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Ra(c, b.p), b = b._next;
                    1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            };
        va("className", {
            parser: function (a, b, d, f, g, h, i) {
                var j, k, l, m, n, o = a.getAttribute("class") || "",
                    p = a.style.cssText;
                if (g = f._classNamePT = new qa(a, d, 0, 0, g, 2), g.setRatio = Sa, g.pr = -11, c = !0, g.b = o, k = _(a, e), l = a._gsClassPT) {
                    for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
                    l.setRatio(1)
                }
                return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = aa(a, k, _(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
            }
        });
        var Ta = function (a) {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var b, c, d, e, f, g = this.t.style,
                    h = i.transform.parse;
                if ("all" === this.e) g.cssText = "", e = !0;
                else
                    for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ba : i[c].p), Ra(g, c);
                e && (Ra(g, za), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (va("clearProps", {
            parser: function (a, b, d, e, f) {
                    return f = new qa(a, d, 0, 0, f, 2), f.setRatio = Ta, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
        }
        }), j = "bezier,throwProps,physicsProps,physics2D".split(","), ta = j.length; ta--;) wa(j[ta]);
        j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h) {
            if (!a.nodeType) return !1;
            this._target = a, this._tween = h, this._vars = b, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = X(a, ""), f = this._overwriteProps;
            var j, n, p, q, r, s, t, u, v, x = a.style;
            if (l && "" === x.zIndex && (j = Y(a, "zIndex", e), ("auto" === j || "" === j) && this._addLazySet(x, "zIndex", 0)), "string" == typeof b && (q = x.cssText, j = _(a, e), x.cssText = q + ";" + b, j = aa(a, j, _(a)).difs, !R && w.test(b) && (j.opacity = parseFloat(RegExp.$1)), b = j, x.cssText = q), b.className ? this._firstPT = n = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = n = this.parse(a, b, null), this._transformType) {
                for (v = 3 === this._transformType, za ? m && (l = !0, "" === x.zIndex && (t = Y(a, "zIndex", e), ("auto" === t || "" === t) && this._addLazySet(x, "zIndex", 0)), o && this._addLazySet(x, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (v ? "visible" : "hidden"))) : x.zoom = 1, p = n; p && p._next;) p = p._next;
                u = new qa(a, "transform", 0, 0, null, 2), this._linkCSSP(u, null, p), u.setRatio = za ? Pa : Oa, u.data = this._transform || Na(a, e, !0), u.tween = h, u.pr = -1, f.pop()
            }
            if (c) {
                for (; n;) {
                    for (s = n._next, p = q; p && p.pr > n.pr;) p = p._next;
                    (n._prev = p ? p._prev : r) ? n._prev._next = n : q = n, (n._next = p) ? p._prev = n : r = n, n = s
                }
                this._firstPT = q
            }
            return !0
        }, j.parse = function (a, b, c, f) {
            var g, h, j, l, m, n, o, p, q, r, s = a.style;
            for (g in b) n = b[g], h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = Y(a, g, e) + "", q = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || q && y.test(n) ? (q || (n = ka(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = sa(s, g, m, n, !0, "transparent", c, 0, f)) : q && H.test(n) ? c = sa(s, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = da(a, g, e), o = "px") : "left" === g || "top" === g ? (j = $(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(u, "")) : (l = parseFloat(n), p = q ? n.replace(u, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (r ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = Z(a, g, j, o), "%" === p ? (j /= Z(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= Z(a, g, 1, p) : "px" !== p && (l = Z(a, g, l, p), p = "px"), r && (l || 0 === l) && (n = l + j + p)), r && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== s[g] && (n || n + "" != "NaN" && null != n) ? (c = new qa(s, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : T("invalid " + g + " tween value: " + b[g]) : (c = new qa(s, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))), f && c && !c.plugin && (c.plugin = f);
            return c
        }, j.setRatio = function (a) {
            var b, c, d, e = this._firstPT,
                f = 1e-6;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                    for (; e;) {
                        if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)
                            if (1 === e.type)
                                if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                        else e.t[e.p] = b + e.xs0;
                        e = e._next
                    } else
                    for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
            else
                for (; e;) {
                    if (2 !== e.type)
                        if (e.r && -1 !== e.type)
                            if (b = Math.round(e.s + e.c), e.type) {
                                if (1 === e.type) {
                                    for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                }
                            } else e.t[e.p] = b + e.xs0;
                        else e.t[e.p] = e.e;
                    else e.setRatio(a);
                    e = e._next
                }
        }, j._enableTransforms = function (a) {
            this._transform = this._transform || Na(this._target, e, !0), this._transformType = this._transform.svg && xa || !a && 3 !== this._transformType ? 2 : 3
        };
        var Ua = function (a) {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        j._addLazySet = function (a, b, c) {
            var d = this._firstPT = new qa(a, b, 0, 0, this._firstPT, 2);
            d.e = c, d.setRatio = Ua, d.data = this
        }, j._linkCSSP = function (a, b, c, d) {
            return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
        }, j._kill = function (b) {
            var c, d, e, f = b;
            if (b.autoAlpha || b.alpha) {
                f = {};
                for (d in b) f[d] = b[d];
                f.opacity = 1, f.autoAlpha && (f.visibility = 1)
            }
            return b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), a.prototype._kill.call(this, f)
        };
        var Va = function (a, b, c) {
            var d, e, f, g;
            if (a.slice)
                for (e = a.length; --e > -1;) Va(a[e], b, c);
            else
                for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push(_(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Va(f, b, c)
        };
        return g.cascadeTo = function (a, c, d) {
            var e, f, g, h, i = b.to(a, c, d),
                j = [i],
                k = [],
                l = [],
                m = [],
                n = b._internals.reservedProps;
            for (a = i._targets || i.target, Va(a, k, m), i.render(c, !0, !0), Va(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;)
                if (f = aa(m[e], k[e], l[e]), f.firstMPT) {
                    f = f.difs;
                    for (g in d) n[g] && (f[g] = d[g]);
                    h = {};
                    for (g in f) h[g] = k[e][g];
                    j.push(b.fromTo(m[e], c, h, f))
                }
            return j
        }, a.activate([g]), g
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function (a) {
        "use strict";
        var b = function () {
            return (_gsScope.GreenSockGlobals || _gsScope)[a]
        };
        "function" == typeof define && define.amd ? define(["../TweenLite"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = b())
    }("CSSPlugin");

/* SPLIT TEXT UTIL */

/*!
 * VERSION: 0.3.5
 * DATE: 2016-05-24
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
! function (a) {
    "use strict";
    var b = a.GreenSockGlobals || a,
        c = function (a) {
            var c, d = a.split("."),
                e = b;
            for (c = 0; c < d.length; c++) e[d[c]] = e = e[d[c]] || {};
            return e
        },
        d = c("com.greensock.utils"),
        e = function (a) {
            var b = a.nodeType,
                c = "";
            if (1 === b || 9 === b || 11 === b) {
                if ("string" == typeof a.textContent) return a.textContent;
                for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
            } else if (3 === b || 4 === b) return a.nodeValue;
            return c
        },
        f = document,
        g = f.defaultView ? f.defaultView.getComputedStyle : function () { },
        h = /([A-Z])/g,
        i = function (a, b, c, d) {
            var e;
            return (c = c || g(a, null)) ? (a = c.getPropertyValue(b.replace(h, "-$1").toLowerCase()), e = a || c.length ? a : c[b]) : a.currentStyle && (c = a.currentStyle, e = c[b]), d ? e : parseInt(e, 10) || 0
        },
        j = function (a) {
            return a.length && a[0] && (a[0].nodeType && a[0].style && !a.nodeType || a[0].length && a[0][0]) ? !0 : !1
        },
        k = function (a) {
            var b, c, d, e = [],
                f = a.length;
            for (b = 0; f > b; b++)
                if (c = a[b], j(c))
                    for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
                else e.push(c);
            return e
        },
        l = /(?:\r|\n|\s\s|\t\t)/g,
        m = ")eefec303079ad17405c",
        n = /(?:<br>|<br\/>|<br \/>)/gi,
        o = f.all && !f.addEventListener,
        p = "<div style='position:relative;display:inline-block;" + (o ? "*display:inline;*zoom:1;'" : "'"),
        q = function (a) {
            a = a || "";
            var b = -1 !== a.indexOf("++"),
                c = 1;
            return b && (a = a.split("++").join("")),
                function () {
                    return p + (a ? " class='" + a + (b ? c++ : "") + "'>" : ">")
                }
        },
        r = d.SplitText = b.SplitText = function (a, b) {
            if ("string" == typeof a && (a = r.selector(a)), !a) throw "cannot split a null element.";
            this.elements = j(a) ? k(a) : [a], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = b || {}, this.split(b)
        },
        s = function (a, b, c) {
            var d = a.nodeType;
            if (1 === d || 9 === d || 11 === d)
                for (a = a.firstChild; a; a = a.nextSibling) s(a, b, c);
            else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c))
        },
        t = function (a, b) {
            for (var c = b.length; --c > -1;) a.push(b[c])
        },
        u = function (a, b, c, d, h) {
            n.test(a.innerHTML) && (a.innerHTML = a.innerHTML.replace(n, m));
            var j, k, o, p, r, u, v, w, x, y, z, A, B, C, D = e(a),
                E = b.type || b.split || "chars,words,lines",
                F = -1 !== E.indexOf("lines") ? [] : null,
                G = -1 !== E.indexOf("words"),
                H = -1 !== E.indexOf("chars"),
                I = "absolute" === b.position || b.absolute === !0,
                J = I ? "&#173; " : " ",
                K = -999,
                L = g(a),
                M = i(a, "paddingLeft", L),
                N = i(a, "borderBottomWidth", L) + i(a, "borderTopWidth", L),
                O = i(a, "borderLeftWidth", L) + i(a, "borderRightWidth", L),
                P = i(a, "paddingTop", L) + i(a, "paddingBottom", L),
                Q = i(a, "paddingLeft", L) + i(a, "paddingRight", L),
                R = i(a, "textAlign", L, !0),
                S = a.clientHeight,
                T = a.clientWidth,
                U = "</div>",
                V = q(b.wordsClass),
                W = q(b.charsClass),
                X = -1 !== (b.linesClass || "").indexOf("++"),
                Y = b.linesClass,
                Z = -1 !== D.indexOf("<"),
                $ = !0,
                _ = [],
                aa = [],
                ba = [];
            for (!b.reduceWhiteSpace != !1 && (D = D.replace(l, "")), X && (Y = Y.split("++").join("")), Z && (D = D.split("<").join("{{LT}}")), j = D.length, p = V(), r = 0; j > r; r++)
                if (v = D.charAt(r), ")" === v && D.substr(r, 20) === m) p += ($ ? U : "") + "<BR/>", $ = !1, r !== j - 20 && D.substr(r + 20, 20) !== m && (p += " " + V(), $ = !0), r += 19;
                else if (" " === v && " " !== D.charAt(r - 1) && r !== j - 1 && D.substr(r - 20, 20) !== m) {
                    for (p += $ ? U : "", $ = !1;
                        " " === D.charAt(r + 1) ;) p += J, r++;
                    (")" !== D.charAt(r + 1) || D.substr(r + 1, 20) !== m) && (p += J + V(), $ = !0)
                } else "{" === v && "{{LT}}" === D.substr(r, 6) ? (p += H ? W() + "{{LT}}</div>" : "{{LT}}", r += 5) : p += H && " " !== v ? W() + v + "</div>" : v;
            for (a.innerHTML = p + ($ ? U : ""), Z && s(a, "{{LT}}", "<"), u = a.getElementsByTagName("*"), j = u.length, w = [], r = 0; j > r; r++) w[r] = u[r];
            if (F || I)
                for (r = 0; j > r; r++) x = w[r], o = x.parentNode === a, (o || I || H && !G) && (y = x.offsetTop, F && o && y !== K && "BR" !== x.nodeName && (k = [], F.push(k), K = y), I && (x._x = x.offsetLeft, x._y = y, x._w = x.offsetWidth, x._h = x.offsetHeight), F && (G !== o && H || (k.push(x), x._x -= M), o && r && (w[r - 1]._wordEnd = !0), "BR" === x.nodeName && x.nextSibling && "BR" === x.nextSibling.nodeName && F.push([])));
            for (r = 0; j > r; r++) x = w[r], o = x.parentNode === a, "BR" !== x.nodeName ? (I && (A = x.style, G || o || (x._x += x.parentNode._x, x._y += x.parentNode._y), A.left = x._x + "px", A.top = x._y + "px", A.position = "absolute", A.display = "block", A.width = x._w + 1 + "px", A.height = x._h + "px"), G ? o && "" !== x.innerHTML ? aa.push(x) : H && _.push(x) : o ? (a.removeChild(x), w.splice(r--, 1), j--) : !o && H && (y = !F && !I && x.nextSibling, a.appendChild(x), y || a.appendChild(f.createTextNode(" ")), _.push(x))) : F || I ? (a.removeChild(x), w.splice(r--, 1), j--) : G || a.appendChild(x);
            if (F) {
                for (I && (z = f.createElement("div"), a.appendChild(z), B = z.offsetWidth + "px", y = z.offsetParent === a ? 0 : a.offsetLeft, a.removeChild(z)), A = a.style.cssText, a.style.cssText = "display:none;"; a.firstChild;) a.removeChild(a.firstChild);
                for (C = !I || !G && !H, r = 0; r < F.length; r++) {
                    for (k = F[r], z = f.createElement("div"), z.style.cssText = "display:block;text-align:" + R + ";position:" + (I ? "absolute;" : "relative;"), Y && (z.className = Y + (X ? r + 1 : "")), ba.push(z), j = k.length, u = 0; j > u; u++) "BR" !== k[u].nodeName && (x = k[u], z.appendChild(x), C && (x._wordEnd || G) && z.appendChild(f.createTextNode(" ")), I && (0 === u && (z.style.top = x._y + "px", z.style.left = M + y + "px"), x.style.top = "0px", y && (x.style.left = x._x - y + "px")));
                    0 === j && (z.innerHTML = "&nbsp;"), G || H || (z.innerHTML = e(z).split(String.fromCharCode(160)).join(" ")), I && (z.style.width = B, z.style.height = x._h + "px"), a.appendChild(z)
                }
                a.style.cssText = A
            }
            I && (S > a.clientHeight && (a.style.height = S - P + "px", a.clientHeight < S && (a.style.height = S + N + "px")), T > a.clientWidth && (a.style.width = T - Q + "px", a.clientWidth < T && (a.style.width = T + O + "px"))), t(c, _), t(d, aa), t(h, ba)
        },
        v = r.prototype;
    v.split = function (a) {
        this.isSplit && this.revert(), this.vars = a || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
        for (var b = this.elements.length; --b > -1;) this._originals[b] = this.elements[b].innerHTML, u(this.elements[b], this.vars, this.chars, this.words, this.lines);
        return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
    }, v.revert = function () {
        if (!this._originals) throw "revert() call wasn't scoped properly.";
        for (var a = this._originals.length; --a > -1;) this.elements[a].innerHTML = this._originals[a];
        return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
    }, r.selector = a.$ || a.jQuery || function (b) {
        var c = a.$ || a.jQuery;
        return c ? (r.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
    }, r.version = "0.3.5"
}(_gsScope),
function (a) {
    "use strict";
    var b = function () {
        return (_gsScope.GreenSockGlobals || _gsScope)[a]
    };
    "function" == typeof define && define.amd ? define([], b) : "undefined" != typeof module && module.exports && (module.exports = b())
}("SplitText");

try {
    window.GreenSockGlobals = null;
    window._gsQueue = null;
    window._gsDefine = null;

    delete (window.GreenSockGlobals);
    delete (window._gsQueue);
    delete (window._gsDefine);
} catch (e) { }

try {
    window.GreenSockGlobals = oldgs;
    window._gsQueue = oldgs_queue;
} catch (e) { }

if (window.tplogs == true)
try {
    console.groupEnd();
} catch (e) { }

(function (e, t) {
    e.waitForImages = {
        hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
    };
    e.expr[":"].uncached = function (t) {
        var n = document.createElement("img");
        n.src = t.src;
        return e(t).is('img[src!=""]') && !n.complete
    };
    e.fn.waitForImages = function (t, n, r) {
        if (e.isPlainObject(arguments[0])) {
            n = t.each;
            r = t.waitForAll;
            t = t.finished
        }
        t = t || e.noop;
        n = n || e.noop;
        r = !!r;
        if (!e.isFunction(t) || !e.isFunction(n)) {
            throw new TypeError("An invalid callback was supplied.")
        }
        return this.each(function () {
            var i = e(this),
                s = [];
            if (r) {
                var o = e.waitForImages.hasImageProperties || [],
                    u = /url\((['"]?)(.*?)\1\)/g;
                i.find("*").each(function () {
                    var t = e(this);
                    if (t.is("img:uncached")) {
                        s.push({
                            src: t.attr("src"),
                            element: t[0]
                        })
                    }
                    e.each(o, function (e, n) {
                        var r = t.css(n);
                        if (!r) {
                            return true
                        }
                        var i;
                        while (i = u.exec(r)) {
                            s.push({
                                src: i[2],
                                element: t[0]
                            })
                        }
                    })
                })
            } else {
                i.find("img:uncached").each(function () {
                    s.push({
                        src: this.src,
                        element: this
                    })
                })
            }
            var f = s.length,
                l = 0;
            if (f == 0) {
                t.call(i[0])
            }
            e.each(s, function (r, s) {
                var o = new Image;
                e(o).bind("load error", function (e) {
                    l++;
                    n.call(s.element, l, f, e.type == "load");
                    if (l == f) {
                        t.call(i[0]);
                        return false
                    }
                });
                o.src = s.src
            })
        })
    };
})(jQuery)