﻿/**************************************************************************
 * jquery.themepunch.revolution.js - jQuery Plugin for Revolution Slider
 * @version: 5.2.5.3 (30.05.2016)
 * @requires jQuery v1.7 or later (tested on 1.9)
 * @author ThemePunch
 **************************************************************************/
! function (jQuery, undefined) {
    "use strict";
    jQuery.fn.extend({
        revolution: function (e) {
            var t = {
                delay: 9e3,
                responsiveLevels: 4064,
                visibilityLevels: [2048, 1024, 778, 480],
                gridwidth: 960,
                gridheight: 500,
                minHeight: 0,
                autoHeight: "off",
                sliderType: "standard",
                sliderLayout: "auto",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "0",
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLimit: 0,
                hideSliderAtLimit: 0,
                disableProgressBar: "off",
                stopAtSlide: -1,
                stopAfterLoops: -1,
                shadow: 0,
                dottedOverlay: "none",
                startDelay: 0,
                lazyType: "smart",
                spinner: "spinner0",
                shuffle: "off",
                viewPort: {
                    enable: !1,
                    outof: "wait",
                    visible_area: "60%"
                },
                fallbacks: {
                    isJoomla: !1,
                    panZoomDisableOnMobile: "off",
                    simplifyAll: "on",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: !0,
                    ignoreHeightChanges: "off",
                    ignoreHeightChangesSize: 0
                },
                parallax: {
                    type: "off",
                    levels: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
                    origo: "enterpoint",
                    speed: 400,
                    bgparallax: "off",
                    opacity: "on",
                    disable_onmobile: "off",
                    ddd_shadow: "on",
                    ddd_bgfreeze: "off",
                    ddd_overflow: "visible",
                    ddd_layer_overflow: "visible",
                    ddd_z_correction: 65,
                    ddd_path: "mouse"
                },
                carousel: {
                    horizontal_align: "center",
                    vertical_align: "center",
                    infinity: "on",
                    space: 0,
                    maxVisibleItems: 3,
                    stretch: "off",
                    fadeout: "on",
                    maxRotation: 0,
                    minScale: 0,
                    vary_fade: "off",
                    vary_rotation: "on",
                    vary_scale: "off",
                    border_radius: "0px",
                    padding_top: 0,
                    padding_bottom: 0
                },
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    onHoverStop: "on",
                    touch: {
                        touchenabled: "off",
                        swipe_treshold: 75,
                        swipe_min_touches: 1,
                        drag_block_vertical: !1,
                        swipe_direction: "horizontal"
                    },
                    arrows: {
                        style: "",
                        enable: !1,
                        hide_onmobile: !1,
                        hide_onleave: !0,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        hide_under: 0,
                        hide_over: 9999,
                        tmp: "",
                        rtl: !1,
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0,
                            container: "slider"
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0,
                            container: "slider"
                        }
                    },
                    bullets: {
                        container: "slider",
                        rtl: !1,
                        style: "",
                        enable: !1,
                        hide_onmobile: !1,
                        hide_onleave: !0,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        hide_under: 0,
                        hide_over: 9999,
                        direction: "horizontal",
                        h_align: "left",
                        v_align: "center",
                        space: 0,
                        h_offset: 20,
                        v_offset: 0,
                        tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>'
                    },
                    thumbnails: {
                        container: "slider",
                        rtl: !1,
                        style: "",
                        enable: !1,
                        width: 100,
                        height: 50,
                        min_width: 100,
                        wrapper_padding: 2,
                        wrapper_color: "#f5f5f5",
                        wrapper_opacity: 1,
                        tmp: '<span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
                        visibleAmount: 5,
                        hide_onmobile: !1,
                        hide_onleave: !0,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        hide_under: 0,
                        hide_over: 9999,
                        direction: "horizontal",
                        span: !1,
                        position: "inner",
                        space: 2,
                        h_align: "left",
                        v_align: "center",
                        h_offset: 20,
                        v_offset: 0
                    },
                    tabs: {
                        container: "slider",
                        rtl: !1,
                        style: "",
                        enable: !1,
                        width: 100,
                        min_width: 100,
                        height: 50,
                        wrapper_padding: 10,
                        wrapper_color: "#f5f5f5",
                        wrapper_opacity: 1,
                        tmp: '<span class="tp-tab-image"></span>',
                        visibleAmount: 5,
                        hide_onmobile: !1,
                        hide_onleave: !0,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        hide_under: 0,
                        hide_over: 9999,
                        direction: "horizontal",
                        span: !1,
                        space: 0,
                        position: "inner",
                        h_align: "left",
                        v_align: "center",
                        h_offset: 20,
                        v_offset: 0
                    }
                },
                extensions: "extensions/",
                extensions_suffix: ".min.js",
                debugMode: !1
            };
            return e = jQuery.extend(!0, {}, t, e), this.each(function () {
                var t = jQuery(this);
                e.minHeight = e.minHeight != undefined ? parseInt(e.minHeight, 0) : e.minHeight, "hero" == e.sliderType && t.find(">ul>li").each(function (e) {
                    e > 0 && jQuery(this).remove()
                }), e.jsFileLocation = e.jsFileLocation || getScriptLocation("themepunch.revolution.min.js"), e.jsFileLocation = e.jsFileLocation + e.extensions, e.scriptsneeded = getNeededScripts(e, t), e.curWinRange = 0, e.rtl = !0, e.navigation != undefined && e.navigation.touch != undefined && (e.navigation.touch.swipe_min_touches = e.navigation.touch.swipe_min_touches > 5 ? 1 : e.navigation.touch.swipe_min_touches), jQuery(this).on("scriptsloaded", function () {
                    return e.modulesfailing ? (t.html('<div style="margin:auto;line-height:40px;font-size:14px;color:#fff;padding:15px;background:#e74c3c;margin:20px 0px;">!! Error at loading Slider Revolution 5.0 Extrensions.' + e.errorm + "</div>").show(), !1) : (_R.migration != undefined && (e = _R.migration(t, e)), punchgs.force3D = !0, "on" !== e.simplifyAll && punchgs.TweenLite.lagSmoothing(1e3, 16), prepareOptions(t, e), void initSlider(t, e))
                }), t.data("opt", e), waitForScripts(t, e)
            })
        },
        revremoveslide: function (e) {
            return this.each(function () {
                var t = jQuery(this);
                if (t != undefined && t.length > 0 && jQuery("body").find("#" + t.attr("id")).length > 0) {
                    var i = t.parent().find(".tp-bannertimer"),
                        n = i.data("opt");
                    if (n && n.li.length > 0 && (e > 0 || e <= n.li.length)) {
                        var a = jQuery(n.li[e]),
                            r = a.data("index"),
                            o = !1;
                        n.slideamount = n.slideamount - 1, removeNavWithLiref(".tp-bullet", r, n), removeNavWithLiref(".tp-tab", r, n), removeNavWithLiref(".tp-thumb", r, n), a.hasClass("active-revslide") && (o = !0), a.remove(), n.li = removeArray(n.li, e), n.carousel && n.carousel.slides && (n.carousel.slides = removeArray(n.carousel.slides, e)), n.thumbs = removeArray(n.thumbs, e), _R.updateNavIndexes && _R.updateNavIndexes(n), o && t.revnext(), punchgs.TweenLite.set(n.li, {
                            minWidth: "99%"
                        }), punchgs.TweenLite.set(n.li, {
                            minWidth: "100%"
                        })
                    }
                }
            })
        },
        revaddcallback: function (e) {
            return this.each(function () {
                var t = jQuery(this);
                if (t != undefined && t.length > 0 && jQuery("body").find("#" + t.attr("id")).length > 0) {
                    var i = t.parent().find(".tp-bannertimer"),
                        n = i.data("opt");
                    n.callBackArray === undefined && (n.callBackArray = new Array), n.callBackArray.push(e)
                }
            })
        },
        revgetparallaxproc: function () {
            var e = jQuery(this);
            if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                var t = e.parent().find(".tp-bannertimer"),
                    i = t.data("opt");
                return i.scrollproc
            }
        },
        revdebugmode: function () {
            return this.each(function () {
                var e = jQuery(this);
                if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                    var t = e.parent().find(".tp-bannertimer"),
                        i = t.data("opt");
                    i.debugMode = !0, containerResized(e, i)
                }
            })
        },
        revscroll: function (e) {
            return this.each(function () {
                var t = jQuery(this);
                t != undefined && t.length > 0 && jQuery("body").find("#" + t.attr("id")).length > 0 && jQuery("body,html").animate({
                    scrollTop: t.offset().top + t.height() - e + "px"
                }, {
                    duration: 400
                })
            })
        },
        revredraw: function (e) {
            return this.each(function () {
                var e = jQuery(this);
                if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                    var t = e.parent().find(".tp-bannertimer"),
                        i = t.data("opt");
                    containerResized(e, i)
                }
            })
        },
        revkill: function (e) {
            var t = this,
                i = jQuery(this);
            if (punchgs.TweenLite.killDelayedCallsTo(_R.showHideNavElements), _R.endMoveCaption && a.endtimeouts && a.endtimeouts.length > 0 && jQuery.each(a.endtimeouts, function (e, t) {
                    clearTimeout(t)
            }), i != undefined && i.length > 0 && jQuery("body").find("#" + i.attr("id")).length > 0) {
                i.data("conthover", 1), i.data("conthover-changed", 1), i.trigger("revolution.slide.onpause");
                var n = i.parent().find(".tp-bannertimer"),
                    a = n.data("opt");
                a.tonpause = !0, i.trigger("stoptimer"), punchgs.TweenLite.killTweensOf(i.find("*"), !1), punchgs.TweenLite.killTweensOf(i, !1), i.unbind("hover, mouseover, mouseenter,mouseleave, resize");
                var r = "resize.revslider-" + i.attr("id");
                jQuery(window).off(r), i.find("*").each(function () {
                    var e = jQuery(this);
                    e.unbind("on, hover, mouseenter,mouseleave,mouseover, resize,restarttimer, stoptimer"), e.off("on, hover, mouseenter,mouseleave,mouseover, resize"), e.data("mySplitText", null), e.data("ctl", null), e.data("tween") != undefined && e.data("tween").kill(), e.data("kenburn") != undefined && e.data("kenburn").kill(), e.data("timeline_out") != undefined && e.data("timeline_out").kill(), e.data("timeline") != undefined && e.data("timeline").kill(), e.remove(), e.empty(), e = null
                }), punchgs.TweenLite.killTweensOf(i.find("*"), !1), punchgs.TweenLite.killTweensOf(i, !1), n.remove();
                try {
                    i.closest(".forcefullwidth_wrapper_tp_banner").remove()
                } catch (o) { }
                try {
                    i.closest(".rev_slider_wrapper").remove()
                } catch (o) { }
                try {
                    i.remove()
                } catch (o) { }
                return i.empty(), i.html(), i = null, a = null, delete t.c, delete t.opt, !0
            }
            return !1
        },
        revpause: function () {
            return this.each(function () {
                var e = jQuery(this);
                if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                    e.data("conthover", 1), e.data("conthover-changed", 1), e.trigger("revolution.slide.onpause");
                    var t = e.parent().find(".tp-bannertimer"),
                        i = t.data("opt");
                    i.tonpause = !0, e.trigger("stoptimer")
                }
            })
        },
        revresume: function () {
            return this.each(function () {
                var e = jQuery(this);
                if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                    e.data("conthover", 0), e.data("conthover-changed", 1), e.trigger("revolution.slide.onresume");
                    var t = e.parent().find(".tp-bannertimer"),
                        i = t.data("opt");
                    i.tonpause = !1, e.trigger("starttimer")
                }
            })
        },
        revstart: function () {
            var e = jQuery(this);
            return e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0 && e.data("opt") ? e.data("opt").sliderisrunning ? (console.log("Slider Is Running Already"), !1) : (runSlider(e, e.data("opt")), !0) : void 0
        },
        revnext: function () {
            return this.each(function () {
                var e = jQuery(this);
                if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                    var t = e.parent().find(".tp-bannertimer"),
                        i = t.data("opt");
                    _R.callingNewSlide(i, e, 1)
                }
            })
        },
        revprev: function () {
            return this.each(function () {
                var e = jQuery(this);
                if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                    var t = e.parent().find(".tp-bannertimer"),
                        i = t.data("opt");
                    _R.callingNewSlide(i, e, -1)
                }
            })
        },
        revmaxslide: function () {
            return jQuery(this).find(".tp-revslider-mainul >li").length
        },
        revcurrentslide: function () {
            var e = jQuery(this);
            if (e != undefined && e.length > 0 && jQuery("body").find("#" + e.attr("id")).length > 0) {
                var t = e.parent().find(".tp-bannertimer"),
                    i = t.data("opt");
                return parseInt(i.act, 0) + 1
            }
        },
        revlastslide: function () {
            return jQuery(this).find(".tp-revslider-mainul >li").length
        },
        revshowslide: function (e) {
            return this.each(function () {
                var t = jQuery(this);
                if (t != undefined && t.length > 0 && jQuery("body").find("#" + t.attr("id")).length > 0) {
                    var i = t.parent().find(".tp-bannertimer"),
                        n = i.data("opt");
                    _R.callingNewSlide(n, t, "to" + (e - 1))
                }
            })
        },
        revcallslidewithid: function (e) {
            return this.each(function () {
                var t = jQuery(this);
                if (t != undefined && t.length > 0 && jQuery("body").find("#" + t.attr("id")).length > 0) {
                    var i = t.parent().find(".tp-bannertimer"),
                        n = i.data("opt");
                    _R.callingNewSlide(n, t, e)
                }
            })
        }
    });
    var _R = jQuery.fn.revolution;
    jQuery.extend(!0, _R, {
        simp: function (e, t, i) {
            var n = Math.abs(e) - Math.floor(Math.abs(e / t)) * t;
            return i ? n : 0 > e ? -1 * n : n
        },
        iOSVersion: function () {
            var e = !1;
            return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ? navigator.userAgent.match(/OS 4_\d like Mac OS X/i) && (e = !0) : e = !1, e
        },
        isIE: function (e, t) {
            var i = jQuery('<div style="display:none;"/>').appendTo(jQuery("body"));
            i.html("<!--[if " + (t || "") + " IE " + (e || "") + "]><a>&nbsp;</a><![endif]-->");
            var n = i.find("a").length;
            return i.remove(), n
        },
        is_mobile: function () {
            var e = ["android", "webos", "iphone", "ipad", "blackberry", "Android", "webos", , "iPod", "iPhone", "iPad", "Blackberry", "BlackBerry"],
                t = !1;
            for (var i in e) navigator.userAgent.split(e[i]).length > 1 && (t = !0);
            return t
        },
        callBackHandling: function (e, t, i) {
            try {
                e.callBackArray && jQuery.each(e.callBackArray, function (e, n) {
                    n && n.inmodule && n.inmodule === t && n.atposition && n.atposition === i && n.callback && n.callback.call()
                })
            } catch (n) {
                console.log("Call Back Failed")
            }
        },
        get_browser: function () {
            var e, t = navigator.appName,
                i = navigator.userAgent,
                n = i.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            return n && null != (e = i.match(/version\/([\.\d]+)/i)) && (n[2] = e[1]), n = n ? [n[1], n[2]] : [t, navigator.appVersion, "-?"], n[0]
        },
        get_browser_version: function () {
            var e, t = navigator.appName,
                i = navigator.userAgent,
                n = i.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
            return n && null != (e = i.match(/version\/([\.\d]+)/i)) && (n[2] = e[1]), n = n ? [n[1], n[2]] : [t, navigator.appVersion, "-?"], n[1]
        },
        getHorizontalOffset: function (e, t) {
            var i = gWiderOut(e, ".outer-left"),
                n = gWiderOut(e, ".outer-right");
            switch (t) {
                case "left":
                    return i;
                case "right":
                    return n;
                case "both":
                    return i + n
            }
        },
        callingNewSlide: function (e, t, i) {
            var n = t.find(".next-revslide").length > 0 ? t.find(".next-revslide").index() : t.find(".processing-revslide").length > 0 ? t.find(".processing-revslide").index() : t.find(".active-revslide").index(),
                a = 0;
            t.find(".next-revslide").removeClass("next-revslide"), t.find(".active-revslide").hasClass("tp-invisible-slide") && (n = e.last_shown_slide), i && jQuery.isNumeric(i) || i.match(/to/g) ? (1 === i || -1 === i ? (a = n + i, a = 0 > a ? e.slideamount - 1 : a >= e.slideamount ? 0 : a) : (i = jQuery.isNumeric(i) ? i : parseInt(i.split("to")[1], 0), a = 0 > i ? 0 : i > e.slideamount - 1 ? e.slideamount - 1 : i), t.find(".tp-revslider-slidesli:eq(" + a + ")").addClass("next-revslide")) : i && t.find(".tp-revslider-slidesli").each(function () {
                var e = jQuery(this);
                e.data("index") === i && e.addClass("next-revslide")
            }), a = t.find(".next-revslide").index(), t.trigger("revolution.nextslide.waiting"), n === a && n === e.last_shown_slide || a !== n && -1 != a ? swapSlide(t, e) : t.find(".next-revslide").removeClass("next-revslide")
        },
        slotSize: function (e, t) {
            t.slotw = Math.ceil(t.width / t.slots), "fullscreen" == t.sliderLayout ? t.sloth = Math.ceil(jQuery(window).height() / t.slots) : t.sloth = Math.ceil(t.height / t.slots), "on" == t.autoHeight && e !== undefined && "" !== e && (t.sloth = Math.ceil(e.height() / t.slots))
        },
        setSize: function (e) {
            var t = (e.top_outer || 0) + (e.bottom_outer || 0),
                i = parseInt(e.carousel.padding_top || 0, 0),
                n = parseInt(e.carousel.padding_bottom || 0, 0),
                a = e.gridheight[e.curWinRange];
            if (e.paddings = e.paddings === undefined ? {
                top: parseInt(e.c.parent().css("paddingTop"), 0) || 0,
                bottom: parseInt(e.c.parent().css("paddingBottom"), 0) || 0
            } : e.paddings, a = a < e.minHeight ? e.minHeight : a, "fullwidth" == e.sliderLayout && "off" == e.autoHeight && punchgs.TweenLite.set(e.c, {
                maxHeight: a + "px"
            }), e.c.css({
                marginTop: i,
                marginBottom: n
            }), e.width = e.ul.width(), e.height = e.ul.height(), setScale(e), e.height = Math.round(e.gridheight[e.curWinRange] * (e.width / e.gridwidth[e.curWinRange])), e.height > e.gridheight[e.curWinRange] && "on" != e.autoHeight && (e.height = e.gridheight[e.curWinRange]), "fullscreen" == e.sliderLayout || e.infullscreenmode) {
                e.height = e.bw * e.gridheight[e.curWinRange];
                var r = (e.c.parent().width(), jQuery(window).height());
                if (e.fullScreenOffsetContainer != undefined) {
                    try {
                        var o = e.fullScreenOffsetContainer.split(",");
                        o && jQuery.each(o, function (e, t) {
                            r = jQuery(t).length > 0 ? r - jQuery(t).outerHeight(!0) : r
                        })
                    } catch (s) { }
                    try {
                        e.fullScreenOffset.split("%").length > 1 && e.fullScreenOffset != undefined && e.fullScreenOffset.length > 0 ? r -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : e.fullScreenOffset != undefined && e.fullScreenOffset.length > 0 && (r -= parseInt(e.fullScreenOffset, 0))
                    } catch (s) { }
                }
                r = r < e.minHeight ? e.minHeight : r, r -= t, e.c.parent().height(r), e.c.closest(".rev_slider_wrapper").height(r), e.c.css({
                    height: "100%"
                }), e.height = r, e.minHeight != undefined && e.height < e.minHeight && (e.height = e.minHeight)
            } else e.minHeight != undefined && e.height < e.minHeight && (e.height = e.minHeight), e.c.height(e.height);
            var d = {
                height: i + n + t + e.height + e.paddings.top + e.paddings.bottom
            };
            e.c.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").css(d), e.c.closest(".rev_slider_wrapper").css(d), setScale(e)
        },
        enterInViewPort: function (e) {
            e.waitForCountDown && (countDown(e.c, e), e.waitForCountDown = !1), e.waitForFirstSlide && (swapSlide(e.c, e), e.waitForFirstSlide = !1), ("playing" == e.sliderlaststatus || e.sliderlaststatus == undefined) && e.c.trigger("starttimer"), e.lastplayedvideos != undefined && e.lastplayedvideos.length > 0 && jQuery.each(e.lastplayedvideos, function (t, i) {
                _R.playVideo(i, e)
            })
        },
        leaveViewPort: function (e) {
            e.sliderlaststatus = e.sliderstatus, e.c.trigger("stoptimer"), e.playingvideos != undefined && e.playingvideos.length > 0 && (e.lastplayedvideos = jQuery.extend(!0, [], e.playingvideos), e.playingvideos && jQuery.each(e.playingvideos, function (t, i) {
                e.leaveViewPortBasedStop = !0, _R.stopVideo && _R.stopVideo(i, e)
            }))
        },
        unToggleState: function (e) {
            e != undefined && e.length > 0 && jQuery.each(e, function (e, t) {
                t.removeClass("rs-toggle-content-active")
            })
        },
        toggleState: function (e) {
            e != undefined && e.length > 0 && jQuery.each(e, function (e, t) {
                t.addClass("rs-toggle-content-active")
            })
        },
        lastToggleState: function (e) {
            var t = 0;
            return e != undefined && e.length > 0 && jQuery.each(e, function (e, i) {
                t = i.hasClass("rs-toggle-content-active")
            }), t
        }
    });
    var _ISM = _R.is_mobile(),
        removeArray = function (e, t) {
            var i = [];
            return jQuery.each(e, function (e, n) {
                e != t && i.push(n)
            }), i
        },
        removeNavWithLiref = function (e, t, i) {
            i.c.find(e).each(function () {
                var e = jQuery(this);
                e.data("liref") === t && e.remove()
            })
        },
        lAjax = function (e, t) {
            return jQuery("body").data(e) ? !1 : t.filesystem ? (t.errorm === undefined && (t.errorm = "<br>Local Filesystem Detected !<br>Put this to your header:"), console.warn("Local Filesystem detected !"), t.errorm = t.errorm + '<br>&lt;script type="text/javascript" src="' + t.jsFileLocation + e + t.extensions_suffix + '"&gt;&lt;/script&gt;', console.warn(t.jsFileLocation + e + t.extensions_suffix + " could not be loaded !"), console.warn("Please use a local Server or work online or make sure that you load all needed Libraries manually in your Document."), console.log(" "), t.modulesfailing = !0, !1) : (jQuery.ajax({
                url: t.jsFileLocation + e + t.extensions_suffix,
                dataType: "script",
                cache: !0,
                error: function (i) {
                    console.warn("Slider Revolution 5.0 Error !"), console.error("Failure at Loading:" + e + t.extensions_suffix + " on Path:" + t.jsFileLocation), console.info(i)
                }
            }), void jQuery("body").data(e, !0))
        },
        getNeededScripts = function (e, t) {
            var i = new Object,
                n = e.navigation;
            return i.kenburns = !1, i.parallax = !1, i.carousel = !1, i.navigation = !1, i.videos = !1, i.actions = !1, i.layeranim = !1, i.migration = !1, t.data("version") && t.data("version").toString().match(/5./gi) ? (t.find("img").each(function () {
                "on" == jQuery(this).data("kenburns") && (i.kenburns = !0)
            }), ("carousel" == e.sliderType || "on" == n.keyboardNavigation || "on" == n.mouseScrollNavigation || "on" == n.touch.touchenabled || n.arrows.enable || n.bullets.enable || n.thumbnails.enable || n.tabs.enable) && (i.navigation = !0), t.find(".tp-caption, .tp-static-layer, .rs-background-video-layer").each(function () {
                var e = jQuery(this);
                (e.data("ytid") != undefined || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("youtube") > 0) && (i.videos = !0), (e.data("vimeoid") != undefined || e.find("iframe").length > 0 && e.find("iframe").attr("src").toLowerCase().indexOf("vimeo") > 0) && (i.videos = !0), e.data("actions") !== undefined && (i.actions = !0), i.layeranim = !0
            }), t.find("li").each(function () {
                jQuery(this).data("link") && jQuery(this).data("link") != undefined && (i.layeranim = !0, i.actions = !0)
            }), !i.videos && (t.find(".rs-background-video-layer").length > 0 || t.find(".tp-videolayer").length > 0 || t.find(".tp-audiolayer").length > 0 || t.find("iframe").length > 0 || t.find("video").length > 0) && (i.videos = !0), "carousel" == e.sliderType && (i.carousel = !0), ("off" !== e.parallax.type || e.viewPort.enable || "true" == e.viewPort.enable) && (i.parallax = !0)) : (i.kenburns = !0, i.parallax = !0, i.carousel = !1, i.navigation = !0, i.videos = !0, i.actions = !0, i.layeranim = !0, i.migration = !0), "hero" == e.sliderType && (i.carousel = !1, i.navigation = !1), window.location.href.match(/file:/gi) && (i.filesystem = !0, e.filesystem = !0), i.videos && "undefined" == typeof _R.isVideoPlaying && lAjax("revolution.extension.video", e), i.carousel && "undefined" == typeof _R.prepareCarousel && lAjax("revolution.extension.carousel", e), i.carousel || "undefined" != typeof _R.animateSlide || lAjax("revolution.extension.slideanims", e), i.actions && "undefined" == typeof _R.checkActions && lAjax("revolution.extension.actions", e), i.layeranim && "undefined" == typeof _R.handleStaticLayers && lAjax("revolution.extension.layeranimation", e), i.kenburns && "undefined" == typeof _R.stopKenBurn && lAjax("revolution.extension.kenburn", e), i.navigation && "undefined" == typeof _R.createNavigation && lAjax("revolution.extension.navigation", e), i.migration && "undefined" == typeof _R.migration && lAjax("revolution.extension.migration", e), i.parallax && "undefined" == typeof _R.checkForParallax && lAjax("revolution.extension.parallax", e), e.addons != undefined && e.addons.length > 0 && jQuery.each(e.addons, function (t, i) {
                "object" == typeof i && i.fileprefix != undefined && lAjax(i.fileprefix, e)
            }), i
        },
        waitForScripts = function (e, t) {
            var i = !0,
                n = t.scriptsneeded;
            t.addons != undefined && t.addons.length > 0 && jQuery.each(t.addons, function (e, t) {
                "object" == typeof t && t.init != undefined && _R[t.init] === undefined && (i = !1)
            }), n.filesystem || "undefined" != typeof punchgs && i && (!n.kenburns || n.kenburns && "undefined" != typeof _R.stopKenBurn) && (!n.navigation || n.navigation && "undefined" != typeof _R.createNavigation) && (!n.carousel || n.carousel && "undefined" != typeof _R.prepareCarousel) && (!n.videos || n.videos && "undefined" != typeof _R.resetVideo) && (!n.actions || n.actions && "undefined" != typeof _R.checkActions) && (!n.layeranim || n.layeranim && "undefined" != typeof _R.handleStaticLayers) && (!n.migration || n.migration && "undefined" != typeof _R.migration) && (!n.parallax || n.parallax && "undefined" != typeof _R.checkForParallax) && (n.carousel || !n.carousel && "undefined" != typeof _R.animateSlide) ? e.trigger("scriptsloaded") : setTimeout(function () {
                waitForScripts(e, t)
            }, 50)
        },
        getScriptLocation = function (e) {
            var t = new RegExp("themepunch.revolution.min.js", "gi"),
                i = "";
            return jQuery("script").each(function () {
                var e = jQuery(this).attr("src");
                e && e.match(t) && (i = e)
            }), i = i.replace("jquery.themepunch.revolution.min.js", ""), i = i.replace("jquery.themepunch.revolution.js", ""), i = i.split("?")[0]
        },
        setCurWinRange = function (e, t) {
            var i = 9999,
                n = 0,
                a = 0,
                r = 0,
                o = jQuery(window).width(),
                s = t && 9999 == e.responsiveLevels ? e.visibilityLevels : e.responsiveLevels;
            s && s.length && jQuery.each(s, function (e, t) {
                t > o && (0 == n || n > t) && (i = t, r = e, n = t), o > t && t > n && (n = t, a = e)
            }), i > n && (r = a), t ? e.forcedWinRange = r : e.curWinRange = r
        },
        prepareOptions = function (e, t) {
            t.carousel.maxVisibleItems = t.carousel.maxVisibleItems < 1 ? 999 : t.carousel.maxVisibleItems, t.carousel.vertical_align = "top" === t.carousel.vertical_align ? "0%" : "bottom" === t.carousel.vertical_align ? "100%" : "50%"
        },
        gWiderOut = function (e, t) {
            var i = 0;
            return e.find(t).each(function () {
                var e = jQuery(this);
                !e.hasClass("tp-forcenotvisible") && i < e.outerWidth() && (i = e.outerWidth())
            }), i
        },
        initSlider = function (container, opt) {
            return container == undefined ? !1 : (container.data("aimg") != undefined && ("enabled" == container.data("aie8") && _R.isIE(8) || "enabled" == container.data("amobile") && _ISM) && container.html('<img class="tp-slider-alternative-image" src="' + container.data("aimg") + '">'), container.find(">ul").addClass("tp-revslider-mainul"), opt.c = container, opt.ul = container.find(".tp-revslider-mainul"), opt.ul.find(">li").each(function (e) {
                var t = jQuery(this);
                "on" == t.data("hideslideonmobile") && _ISM && t.remove(), (t.data("invisible") || t.data("invisible") === !0) && (t.addClass("tp-invisible-slide"), t.appendTo(opt.ul))
            }), opt.addons != undefined && opt.addons.length > 0 && jQuery.each(opt.addons, function (i, obj) {
                "object" == typeof obj && obj.init != undefined && _R[obj.init](eval(obj.params))
            }), opt.cid = container.attr("id"), opt.ul.css({
                visibility: "visible"
            }), opt.slideamount = opt.ul.find(">li").not(".tp-invisible-slide").length, opt.slayers = container.find(".tp-static-layers"), void (1 != opt.waitForInit && (container.data("opt", opt), runSlider(container, opt))))
        },
        onFullScreenChange = function () {
            jQuery("body").data("rs-fullScreenMode", !jQuery("body").data("rs-fullScreenMode")), jQuery("body").data("rs-fullScreenMode") && setTimeout(function () {
                jQuery(window).trigger("resize")
            }, 200)
        },
        runSlider = function (e, t) {
            if (t.sliderisrunning = !0, t.ul.find(">li").each(function (e) {
                    jQuery(this).data("originalindex", e)
            }), "on" == t.shuffle) {
                var i = new Object,
                    n = t.ul.find(">li:first-child");
                i.fstransition = n.data("fstransition"), i.fsmasterspeed = n.data("fsmasterspeed"), i.fsslotamount = n.data("fsslotamount");
                for (var a = 0; a < t.slideamount; a++) {
                    var r = Math.round(Math.random() * t.slideamount);
                    t.ul.find(">li:eq(" + r + ")").prependTo(t.ul)
                }
                var o = t.ul.find(">li:first-child");
                o.data("fstransition", i.fstransition), o.data("fsmasterspeed", i.fsmasterspeed), o.data("fsslotamount", i.fsslotamount), t.li = t.ul.find(">li").not(".tp-invisible-slide")
            }
            if (t.allli = t.ul.find(">li"), t.li = t.ul.find(">li").not(".tp-invisible-slide"), t.inli = t.ul.find(">li.tp-invisible-slide"), t.thumbs = new Array, t.slots = 4, t.act = -1, t.firststart = 1, t.loadqueue = new Array, t.syncload = 0, t.conw = e.width(), t.conh = e.height(), t.responsiveLevels.length > 1 ? t.responsiveLevels[0] = 9999 : t.responsiveLevels = 9999, jQuery.each(t.allli, function (e, i) {
                    var i = jQuery(i),
                        n = i.find(".rev-slidebg") || i.find("img").first(),
                        a = 0;
                    i.addClass("tp-revslider-slidesli"), i.data("index") === undefined && i.data("index", "rs-" + Math.round(999999 * Math.random()));
                    var r = new Object;
                    r.params = new Array, r.id = i.data("index"), r.src = i.data("thumb") !== undefined ? i.data("thumb") : n.data("lazyload") !== undefined ? n.data("lazyload") : n.attr("src"), i.data("title") !== undefined && r.params.push({
                from: RegExp("\\{\\{title\\}\\}", "g"),
                to: i.data("title")
            }), i.data("description") !== undefined && r.params.push({
                from: RegExp("\\{\\{description\\}\\}", "g"),
                to: i.data("description")
            });
                    for (var a = 1; 10 >= a; a++) i.data("param" + a) !== undefined && r.params.push({
                from: RegExp("\\{\\{param" + a + "\\}\\}", "g"),
                to: i.data("param" + a)
            });
                    if (t.thumbs.push(r), i.data("origindex", i.index()), i.data("link") != undefined) {
                        var o = i.data("link"),
                            s = i.data("target") || "_self",
                            d = "back" === i.data("slideindex") ? 0 : 60,
                            l = i.data("linktoslide"),
                            u = l;
                        l != undefined && "next" != l && "prev" != l && t.allli.each(function () {
                            var e = jQuery(this);
                            e.data("origindex") + 1 == u && (l = e.data("index"))
            }), "slide" != o && (l = "no");
                        var c = '<div class="tp-caption slidelink" style="cursor:pointer;width:100%;height:100%;z-index:' + d + ';" data-x="center" data-y="center" data-basealign="slide" ',
                            p = "scroll_under" === l ? '[{"event":"click","action":"scrollbelow","offset":"100px","delay":"0"}]' : "prev" === l ? '[{"event":"click","action":"jumptoslide","slide":"prev","delay":"0.2"}]' : "next" === l ? '[{"event":"click","action":"jumptoslide","slide":"next","delay":"0.2"}]' : '[{"event":"click","action":"jumptoslide","slide":"' + l + '","delay":"0.2"}]';
                        c = "no" == l ? c + ' data-start="0">' : c + "data-actions='" + p + '\' data-start="0">', c += '<a style="width:100%;height:100%;display:block"', c = "slide" != o ? c + ' target="' + s + '" href="' + o + '"' : c, c += '><span style="width:100%;height:100%;display:block"></span></a></div>', i.append(c)
            }
            }), t.rle = t.responsiveLevels.length || 1, t.gridwidth = cArray(t.gridwidth, t.rle), t.gridheight = cArray(t.gridheight, t.rle), "on" == t.simplifyAll && (_R.isIE(8) || _R.iOSVersion()) && (e.find(".tp-caption").each(function () {
                    var e = jQuery(this);
                    e.removeClass("customin customout").addClass("fadein fadeout"), e.data("splitin", ""), e.data("speed", 400)
            }), t.allli.each(function () {
                    var e = jQuery(this);
                    e.data("transition", "fade"), e.data("masterspeed", 500), e.data("slotamount", 1);
                    var t = e.find(".rev-slidebg") || e.find(">img").first();
                    t.data("kenburns", "off")
            })), t.desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i), t.autoHeight = "fullscreen" == t.sliderLayout ? "on" : t.autoHeight, "fullwidth" == t.sliderLayout && "off" == t.autoHeight && e.css({
                maxHeight: t.gridheight[t.curWinRange] + "px"
            }), "auto" != t.sliderLayout && 0 == e.closest(".forcefullwidth_wrapper_tp_banner").length && ("fullscreen" !== t.sliderLayout || "on" != t.fullScreenAutoWidth)) {
                var s = e.parent(),
                    d = s.css("marginBottom"),
                    l = s.css("marginTop"),
                    u = e.attr("id") + "_forcefullwidth";
                d = d === undefined ? 0 : d, l = l === undefined ? 0 : l, s.wrap('<div class="forcefullwidth_wrapper_tp_banner" id="' + u + '" style="position:relative;width:100%;height:auto;margin-top:' + l + ";margin-bottom:" + d + '"></div>'), e.closest(".forcefullwidth_wrapper_tp_banner").append('<div class="tp-fullwidth-forcer" style="width:100%;height:' + e.height() + 'px"></div>'), e.parent().css({
                    marginTop: "0px",
                    marginBottom: "0px"
                }), e.parent().css({
                    position: "absolute"
                })
            }
            if (t.shadow !== undefined && t.shadow > 0 && (e.parent().addClass("tp-shadow" + t.shadow), e.parent().append('<div class="tp-shadowcover"></div>'), e.parent().find(".tp-shadowcover").css({
                backgroundColor: e.parent().css("backgroundColor"),
                backgroundImage: e.parent().css("backgroundImage")
            })), setCurWinRange(t), setCurWinRange(t, !0), !e.hasClass("revslider-initialised")) {
                e.addClass("revslider-initialised"), e.addClass("tp-simpleresponsive"), e.attr("id") == undefined && e.attr("id", "revslider-" + Math.round(1e3 * Math.random() + 5)), t.firefox13 = !1, t.ie = !jQuery.support.opacity, t.ie9 = 9 == document.documentMode, t.origcd = t.delay;
                var c = jQuery.fn.jquery.split("."),
                    p = parseFloat(c[0]),
                    f = parseFloat(c[1]);
                parseFloat(c[2] || "0");
                1 == p && 7 > f && e.html('<div style="text-align:center; padding:40px 0px; font-size:20px; color:#992222;"> The Current Version of jQuery:' + c + " <br>Please update your jQuery Version to min. 1.7 in Case you wish to use the Revolution Slider Plugin</div>"), p > 1 && (t.ie = !1);
                var h = new Object;
                h.addedyt = 0, h.addedvim = 0, h.addedvid = 0, e.find(".tp-caption, .rs-background-video-layer").each(function (e) {
                    var i = jQuery(this),
                        n = i.data("autoplayonlyfirsttime"),
                        a = i.data("autoplay"),
                        r = i.hasClass("tp-audiolayer"),
                        o = i.data("videoloop");
                    i.hasClass("tp-static-layer") && _R.handleStaticLayers && _R.handleStaticLayers(i, t);
                    var s = i.data("noposteronmobile") || i.data("noPosterOnMobile") || i.data("posteronmobile") || i.data("posterOnMobile") || i.data("posterOnMObile");
                    i.data("noposteronmobile", s);
                    var d = 0;
                    if (i.find("iframe").each(function () {
                            punchgs.TweenLite.set(jQuery(this), {
                        autoAlpha: 0
                    }), d++
                    }), d > 0 && i.data("iframes", !0), i.hasClass("tp-caption")) {
                        var l = i.hasClass("slidelink") ? "width:100% !important;height:100% !important;" : "";
                        i.wrap('<div class="tp-parallax-wrap" style="' + l + 'position:absolute;visibility:hidden"><div class="tp-loop-wrap" style="' + l + 'position:absolute;"><div class="tp-mask-wrap" style="' + l + 'position:absolute" ></div></div></div>');
                        var u = ["pendulum", "rotate", "slideloop", "pulse", "wave"],
                            c = i.closest(".tp-loop-wrap");
                        jQuery.each(u, function (e, t) {
                            var n = i.find(".rs-" + t),
                                a = n.data() || "";
                            "" != a && (c.data(a), c.addClass("rs-" + t), n.children(0).unwrap(), i.data("loopanimation", "on"))
                        }), punchgs.TweenLite.set(i, {
                            visibility: "hidden"
                        })
                    }
                    var p = i.data("actions");
                    p !== undefined && _R.checkActions(i, t, p), checkHoverDependencies(i, t), _R.checkVideoApis && (h = _R.checkVideoApis(i, t, h)), _ISM && ((1 == n || "true" == n) && (i.data("autoplayonlyfirsttime", "false"), n = !1), (1 == a || "true" == a || "on" == a || "1sttime" == a) && (i.data("autoplay", "off"), a = "off")), i.data("videoloop", o), r || 1 != n && "true" != n && "1sttime" != a || "loopandnoslidestop" == o || i.closest("li.tp-revslider-slidesli").addClass("rs-pause-timer-once"), r || 1 != a && "true" != a && "on" != a && "no1sttime" != a || "loopandnoslidestop" == o || i.closest("li.tp-revslider-slidesli").addClass("rs-pause-timer-always")
                }), e[0].addEventListener("mouseenter", function () {
                    e.trigger("tp-mouseenter"), t.overcontainer = !0
                }, {
                    passive: !0
                }), e[0].addEventListener("mouseover", function () {
                    e.trigger("tp-mouseover"), t.overcontainer = !0
                }, {
                    passive: !0
                }), e[0].addEventListener("mouseleave", function () {
                    e.trigger("tp-mouseleft"), t.overcontainer = !1
                }, {
                    passive: !0
                }), e.find(".tp-caption video").each(function (e) {
                    var t = jQuery(this);
                    t.removeClass("video-js vjs-default-skin"), t.attr("preload", ""), t.css({
                        display: "none"
                    })
                }), "standard" !== t.sliderType && (t.lazyType = "all"), loadImages(e.find(".tp-static-layers"), t, 0, !0), waitForCurrentImages(e.find(".tp-static-layers"), t, function () {
                    e.find(".tp-static-layers img").each(function () {
                        var e = jQuery(this),
                            i = e.data("lazyload") != undefined ? e.data("lazyload") : e.attr("src"),
                            n = getLoadObj(t, i);
                        e.attr("src", n.src)
                    })
                }), t.allli.each(function (e) {
                    var i = jQuery(this);
                    ("all" == t.lazyType || "smart" == t.lazyType && (0 == e || 1 == e || e == t.slideamount || e == t.slideamount - 1)) && (loadImages(i, t, e), waitForCurrentImages(i, t, function () {
                        "carousel" == t.sliderType && punchgs.TweenLite.to(i, 1, {
                            autoAlpha: 1,
                            ease: punchgs.Power3.easeInOut
                        })
                    }))
                });
                var g = getUrlVars("#")[0];
                if (g.length < 9 && g.split("slide").length > 1) {
                    var v = parseInt(g.split("slide")[1], 0);
                    1 > v && (v = 1), v > t.slideamount && (v = t.slideamount), t.startWithSlide = v - 1
                }
                e.append('<div class="tp-loader ' + t.spinner + '"><div class="dot1"></div><div class="dot2"></div><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>'), 0 === e.find(".tp-bannertimer").length && e.append('<div class="tp-bannertimer" style="visibility:hidden"></div>'), e.find(".tp-bannertimer").css({
                    width: "0%"
                }), e.find(".tp-bannertimer").data("opt", t), t.ul.css({
                    display: "block"
                }), prepareSlides(e, t), "off" !== t.parallax.type && _R.checkForParallax && _R.checkForParallax(e, t), _R.setSize(t), "hero" !== t.sliderType && _R.createNavigation && _R.createNavigation(e, t), _R.resizeThumbsTabs && _R.resizeThumbsTabs && _R.resizeThumbsTabs(t), contWidthManager(t);
                var m = t.viewPort;
                t.inviewport = !1, m != undefined && m.enable && (jQuery.isNumeric(m.visible_area) || -1 !== m.visible_area.indexOf("%") && (m.visible_area = parseInt(m.visible_area) / 100), _R.scrollTicker && _R.scrollTicker(t, e)), setTimeout(function () {
                    "carousel" == t.sliderType && _R.prepareCarousel && _R.prepareCarousel(t), !m.enable || m.enable && t.inviewport || m.enable && !t.inviewport && "wait" == !m.outof ? swapSlide(e, t) : t.waitForFirstSlide = !0, _R.manageNavigation && _R.manageNavigation(t), t.slideamount > 1 && (!m.enable || m.enable && t.inviewport ? countDown(e, t) : t.waitForCountDown = !0), setTimeout(function () {
                        e.trigger("revolution.slide.onloaded")
                    }, 100)
                }, t.startDelay), t.startDelay = 0, jQuery("body").data("rs-fullScreenMode", !1), window.addEventListener("fullscreenchange", onFullScreenChange, {
                    passive: !0
                }), window.addEventListener("mozfullscreenchange", onFullScreenChange, {
                    passive: !0
                }), window.addEventListener("webkitfullscreenchange", onFullScreenChange, {
                    passive: !0
                });
                var y = "resize.revslider-" + e.attr("id");
                jQuery(window).on(y, function () {
                    if (console.log("happening"), e == undefined) return !1;
                    0 != jQuery("body").find(e) && contWidthManager(t);
                    var i = !1;
                    if ("fullscreen" == t.sliderLayout) {
                        var n = jQuery(window).height();
                        "mobile" == t.fallbacks.ignoreHeightChanges && _ISM || "always" == t.fallbacks.ignoreHeightChanges ? (t.fallbacks.ignoreHeightChangesSize = t.fallbacks.ignoreHeightChangesSize == undefined ? 0 : t.fallbacks.ignoreHeightChangesSize, i = n != t.lastwindowheight && Math.abs(n - t.lastwindowheight) > t.fallbacks.ignoreHeightChangesSize) : i = n != t.lastwindowheight
                    } (e.outerWidth(!0) != t.width || e.is(":hidden") || i) && (t.lastwindowheight = jQuery(window).height(), containerResized(e, t))
                }), hideSliderUnder(e, t), contWidthManager(t), t.fallbacks.disableFocusListener || "true" == t.fallbacks.disableFocusListener || t.fallbacks.disableFocusListener === !0 || tabBlurringCheck(e, t)
            }
        },
        cArray = function (e, t) {
            if (!jQuery.isArray(e)) {
                var i = e;
                e = new Array, e.push(i)
            }
            if (e.length < t)
                for (var i = e[e.length - 1], n = 0; n < t - e.length + 2; n++) e.push(i);
            return e
        },
        checkHoverDependencies = function (e, t) {
            "sliderenter" === e.data("start") && (t.layersonhover === undefined && (t.c.on("tp-mouseenter", function () {
                t.layersonhover && jQuery.each(t.layersonhover, function (e, i) {
                    i.data("animdirection", "in");
                    var n = i.data("timeline_out"),
                        a = "carousel" === t.sliderType ? 0 : t.width / 2 - t.gridwidth[t.curWinRange] * t.bw / 2,
                        r = 0,
                        o = i.closest(".tp-revslider-slidesli"),
                        s = i.closest(".tp-static-layers");
                    if (o.length > 0 && o.hasClass("active-revslide") || o.hasClass("processing-revslide") || s.length > 0) {
                        n != undefined && (n.pause(0), n.kill()), _R.animateSingleCaption(i, t, a, r, 0, !1, !0);
                        var d = i.data("timeline");
                        i.data("triggerstate", "on"), d.play(0)
                    }
                })
            }), t.c.on("tp-mouseleft", function () {
                t.layersonhover && jQuery.each(t.layersonhover, function (e, i) {
                    i.data("animdirection", "out"), i.data("triggered", !0), i.data("triggerstate", "off"), _R.stopVideo && _R.stopVideo(i, t), _R.endMoveCaption && _R.endMoveCaption(i, null, null, t)
                })
            }), t.layersonhover = new Array), t.layersonhover.push(e))
        },
        contWidthManager = function (e) {
            var t = _R.getHorizontalOffset(e.c, "left");
            if ("auto" == e.sliderLayout || "fullscreen" === e.sliderLayout && "on" == e.fullScreenAutoWidth) "fullscreen" == e.sliderLayout && "on" == e.fullScreenAutoWidth ? punchgs.TweenLite.set(e.ul, {
                left: 0,
                width: e.c.width()
            }) : punchgs.TweenLite.set(e.ul, {
                left: t,
                width: e.c.width() - _R.getHorizontalOffset(e.c, "both")
            });
            else {
                var i = Math.ceil(e.c.closest(".forcefullwidth_wrapper_tp_banner").offset().left - t);
                punchgs.TweenLite.set(e.c.parent(), {
                    left: 0 - i + "px",
                    width: jQuery(window).width() - _R.getHorizontalOffset(e.c, "both")
                })
            }
            e.slayers && "fullwidth" != e.sliderLayout && "fullscreen" != e.sliderLayout && punchgs.TweenLite.set(e.slayers, {
                left: t
            })
        },
        cv = function (e, t) {
            return e === undefined ? t : e
        },
        hideSliderUnder = function (e, t, i) {
            var n = e.parent();
            jQuery(window).width() < t.hideSliderAtLimit ? (e.trigger("stoptimer"), "none" != n.css("display") && n.data("olddisplay", n.css("display")), n.css({
                display: "none"
            })) : e.is(":hidden") && i && (n.data("olddisplay") != undefined && "undefined" != n.data("olddisplay") && "none" != n.data("olddisplay") ? n.css({
                display: n.data("olddisplay")
            }) : n.css({
                display: "block"
            }), e.trigger("restarttimer"), setTimeout(function () {
                containerResized(e, t)
            }, 150)), _R.hideUnHideNav && _R.hideUnHideNav(t)
        },
        containerResized = function (e, t) {
            if (1 == t.infullscreenmode && (t.minHeight = jQuery(window).height()), setCurWinRange(t), setCurWinRange(t, !0), !_R.resizeThumbsTabs || _R.resizeThumbsTabs(t) === !0) {
                if (hideSliderUnder(e, t, !0), contWidthManager(t), "carousel" == t.sliderType && _R.prepareCarousel(t, !0), e === undefined) return !1;
                _R.setSize(t), t.conw = t.c.width(), t.conh = t.infullscreenmode ? t.minHeight : t.c.height();
                var i = e.find(".active-revslide .slotholder"),
                    n = e.find(".processing-revslide .slotholder");
                removeSlots(e, t, e, 2), "standard" === t.sliderType && (punchgs.TweenLite.set(n.find(".defaultimg"), {
                    opacity: 0
                }), i.find(".defaultimg").css({
                    opacity: 1
                })), "carousel" == t.sliderType && t.lastconw != t.conw && (clearTimeout(t.pcartimer), t.pcartimer = setTimeout(function () {
                    _R.prepareCarousel(t, !0)
                }, 100), t.lastconw = t.conw), _R.manageNavigation && _R.manageNavigation(t), _R.animateTheCaptions && _R.animateTheCaptions(e.find(".active-revslide"), t, !0), "on" == n.data("kenburns") && _R.startKenBurn(n, t, n.data("kbtl").progress()), "on" == i.data("kenburns") && _R.startKenBurn(i, t, i.data("kbtl").progress()), _R.animateTheCaptions && _R.animateTheCaptions(n.closest("li"), t, !0), _R.manageNavigation && _R.manageNavigation(t)
            }
        },
        setScale = function (e) {
            e.bw = e.width / e.gridwidth[e.curWinRange], e.bh = e.height / e.gridheight[e.curWinRange], e.bh > e.bw ? e.bh = e.bw : e.bw = e.bh, (e.bh > 1 || e.bw > 1) && (e.bw = 1, e.bh = 1)
        },
        prepareSlides = function (e, t) {
            if (e.find(".tp-caption").each(function () {
                    var e = jQuery(this);
                    e.data("transition") !== undefined && e.addClass(e.data("transition"))
            }), t.ul.css({
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxHeight: e.parent().css("maxHeight")
            }), "on" == t.autoHeight && (t.ul.css({
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxHeight: "none"
            }), e.css({
                maxHeight: "none"
            }), e.parent().css({
                maxHeight: "none"
            })), t.allli.each(function (e) {
                    var i = jQuery(this),
                        n = i.data("originalindex");
                    (t.startWithSlide != undefined && n == t.startWithSlide || t.startWithSlide === undefined && 0 == e) && i.addClass("next-revslide"), i.css({
                width: "100%",
                height: "100%",
                overflow: "hidden"
            })
            }), "carousel" === t.sliderType) {
                t.ul.css({
                    overflow: "visible"
                }).wrap('<div class="tp-carousel-wrapper" style="width:100%;height:100%;position:absolute;top:0px;left:0px;overflow:hidden;"></div>');
                var i = '<div style="clear:both;display:block;width:100%;height:1px;position:relative;margin-bottom:-1px"></div>';
                t.c.parent().prepend(i), t.c.parent().append(i), _R.prepareCarousel(t)
            }
            e.parent().css({
                overflow: "visible"
            }), t.allli.find(">img").each(function (e) {
                var i = jQuery(this),
                    n = i.closest("li").find(".rs-background-video-layer");
                n.addClass("defaultvid").css({
                    zIndex: 30
                }), i.addClass("defaultimg"), "on" == t.fallbacks.panZoomDisableOnMobile && _ISM && (i.data("kenburns", "off"), i.data("bgfit", "cover")), i.wrap('<div class="slotholder" style="position:absolute; top:0px; left:0px; z-index:0;width:100%;height:100%;"></div>'), n.appendTo(i.closest("li").find(".slotholder"));
                var a = i.data();
                i.closest(".slotholder").data(a), n.length > 0 && a.bgparallax != undefined && n.data("bgparallax", a.bgparallax), "none" != t.dottedOverlay && t.dottedOverlay != undefined && i.closest(".slotholder").append('<div class="tp-dottedoverlay ' + t.dottedOverlay + '"></div>');
                var r = i.attr("src");
                a.src = r, a.bgfit = a.bgfit || "cover", a.bgrepeat = a.bgrepeat || "no-repeat", a.bgposition = a.bgposition || "center center";
                var o = i.closest(".slotholder");
                i.parent().append('<div class="tp-bgimg defaultimg" style="background-color:' + i.css("backgroundColor") + ";background-repeat:" + a.bgrepeat + ";background-image:url(" + r + ");background-size:" + a.bgfit + ";background-position:" + a.bgposition + ';width:100%;height:100%;"></div>');
                var s = document.createComment("Runtime Modification - Img tag is Still Available for SEO Goals in Source - " + i.get(0).outerHTML);
                i.replaceWith(s), i = o.find(".tp-bgimg"), i.data(a), i.attr("src", r), ("standard" === t.sliderType || "undefined" === t.sliderType) && i.css({
                    opacity: 0
                })
            })
        },
        removeSlots = function (e, t, i, n) {
            t.removePrepare = t.removePrepare + n, i.find(".slot, .slot-circle-wrapper").each(function () {
                jQuery(this).remove()
            }), t.transition = 0, t.removePrepare = 0
        },
        cutParams = function (e) {
            var t = e;
            return e != undefined && e.length > 0 && (t = e.split("?")[0]), t
        },
        relativeRedir = function (e) {
            return location.pathname.replace(/(.*)\/[^\/]*/, "$1/" + e)
        },
        abstorel = function (e, t) {
            var i = e.split("/"),
                n = t.split("/");
            i.pop();
            for (var a = 0; a < n.length; a++) "." != n[a] && (".." == n[a] ? i.pop() : i.push(n[a]));
            return i.join("/")
        },
        imgLoaded = function (e, t, i) {
            t.syncload--, t.loadqueue && jQuery.each(t.loadqueue, function (t, n) {
                var a = n.src.replace(/\.\.\/\.\.\//gi, ""),
                    r = self.location.href,
                    o = document.location.origin,
                    s = r.substring(0, r.length - 1) + "/" + a,
                    d = o + "/" + a,
                    l = abstorel(self.location.href, n.src);
                r = r.substring(0, r.length - 1) + a, o += a, (cutParams(o) === cutParams(decodeURIComponent(e.src)) || cutParams(r) === cutParams(decodeURIComponent(e.src)) || cutParams(l) === cutParams(decodeURIComponent(e.src)) || cutParams(d) === cutParams(decodeURIComponent(e.src)) || cutParams(s) === cutParams(decodeURIComponent(e.src)) || cutParams(n.src) === cutParams(decodeURIComponent(e.src)) || cutParams(n.src).replace(/^.*\/\/[^\/]+/, "") === cutParams(decodeURIComponent(e.src)).replace(/^.*\/\/[^\/]+/, "") || "file://" === window.location.origin && cutParams(e.src).match(new RegExp(a))) && (n.progress = i, n.width = e.width, n.height = e.height)
            }), progressImageLoad(t)
        },
        progressImageLoad = function (e) {
            3 != e.syncload && e.loadqueue && jQuery.each(e.loadqueue, function (t, i) {
                if (i.progress.match(/prepared/g) && e.syncload <= 3) {
                    if (e.syncload++, "img" == i.type) {
                        var n = new Image;
                        n.onload = function () {
                            imgLoaded(this, e, "loaded"), i.error = !1
                        }, n.onerror = function () {
                            imgLoaded(this, e, "failed"), i.error = !0
                        }, n.src = i.src
                    } else jQuery.get(i.src, function (t) {
                        i.innerHTML = (new XMLSerializer).serializeToString(t.documentElement), i.progress = "loaded", e.syncload--, progressImageLoad(e)
                    }).fail(function () {
                        i.progress = "failed", e.syncload--, progressImageLoad(e)
                    });
                    i.progress = "inload"
                }
            })
        },
        addToLoadQueue = function (e, t, i, n, a) {
            var r = !1;
            if (t.loadqueue && jQuery.each(t.loadqueue, function (t, i) {
                    i.src === e && (r = !0)
            }), !r) {
                var o = new Object;
                o.src = e, o.starttoload = jQuery.now(), o.type = n || "img", o.prio = i, o.progress = "prepared", o["static"] = a, t.loadqueue.push(o)
            }
        },
        loadImages = function (e, t, i, n) {
            e.find("img,.defaultimg, .tp-svg-layer").each(function () {
                var e = jQuery(this),
                    a = e.data("lazyload") !== undefined && "undefined" !== e.data("lazyload") ? e.data("lazyload") : e.data("svg_src") != undefined ? e.data("svg_src") : e.attr("src"),
                    r = e.data("svg_src") != undefined ? "svg" : "img";
                e.data("start-to-load", jQuery.now()), addToLoadQueue(a, t, i, r, n)
            }), progressImageLoad(t)
        },
        getLoadObj = function (e, t) {
            var i = new Object;
            return e.loadqueue && jQuery.each(e.loadqueue, function (e, n) {
                n.src == t && (i = n)
            }), i
        },
        waitForCurrentImages = function (e, t, i) {
            var n = !1;
            e.find("img,.defaultimg, .tp-svg-layer").each(function () {
                var i = jQuery(this),
                    a = i.data("lazyload") != undefined ? i.data("lazyload") : i.data("svg_src") != undefined ? i.data("svg_src") : i.attr("src"),
                    r = getLoadObj(t, a);
                if (i.data("loaded") === undefined && r !== undefined && r.progress && r.progress.match(/loaded/g)) {
                    if (i.attr("src", r.src), "img" == r.type)
                        if (i.hasClass("defaultimg")) _R.isIE(8) ? defimg.attr("src", r.src) : i.css({
                            backgroundImage: 'url("' + r.src + '")'
                        }), e.data("owidth", r.width), e.data("oheight", r.height), e.find(".slotholder").data("owidth", r.width), e.find(".slotholder").data("oheight", r.height);
                        else {
                            var o = i.data("ww"),
                                s = i.data("hh");
                            i.data("owidth", r.width), i.data("oheight", r.height), o = o == undefined || "auto" == o || "" == o ? r.width : o, s = s == undefined || "auto" == s || "" == s ? r.height : s, i.data("ww", o), i.data("hh", s)
                        }
                    else "svg" == r.type && "loaded" == r.progress && (i.append('<div class="tp-svg-innercontainer"></div>'), i.find(".tp-svg-innercontainer").append(r.innerHTML));
                    i.data("loaded", !0)
                }
                if (r && r.progress && r.progress.match(/inprogress|inload|prepared/g) && (!r.error && jQuery.now() - i.data("start-to-load") < 5e3 ? n = !0 : (r.progress = "failed", r.reported_img || (r.reported_img = !0, console.warn(a + "  Could not be loaded !")))), 1 == t.youtubeapineeded && (!window.YT || YT.Player == undefined) && (n = !0, jQuery.now() - t.youtubestarttime > 5e3 && 1 != t.youtubewarning)) {
                    t.youtubewarning = !0;
                    var d = "YouTube Api Could not be loaded !";
                    "https:" === location.protocol && (d += " Please Check and Renew SSL Certificate !"), console.error(d), t.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' + d + "</strong></div>")
                }
                if (1 == t.vimeoapineeded && !window.Froogaloop && (n = !0, jQuery.now() - t.vimeostarttime > 5e3 && 1 != t.vimeowarning)) {
                    t.vimeowarning = !0;
                    var d = "Vimeo Froogaloop Api Could not be loaded !";
                    "https:" === location.protocol && (d += " Please Check and Renew SSL Certificate !"), console.error(d), t.c.append('<div style="position:absolute;top:50%;width:100%;color:#e74c3c;  font-size:16px; text-align:center; padding:15px;background:#000; display:block;"><strong>' + d + "</strong></div>")
                }
            }), !_ISM && t.audioqueue && t.audioqueue.length > 0 && jQuery.each(t.audioqueue, function (e, t) {
                t.status && "prepared" === t.status && jQuery.now() - t.start < t.waittime && (n = !0)
            }), jQuery.each(t.loadqueue, function (e, t) {
                t["static"] !== !0 || "loaded" == t.progress && "failed" !== t.progress || ("failed" == t.progress ? t.reported || (t.reported = !0, console.warn("Static Image " + t.src + "  Could not be loaded in time. Error Exists:" + t.error)) : !t.error && jQuery.now() - t.starttoload < 5e3 ? n = !0 : t.reported || (t.reported = !0, console.warn("Static Image " + t.src + "  Could not be loaded within 5s! Error Exists:" + t.error)))
            }), n ? setTimeout(function () {
                waitForCurrentImages(e, t, i)
            }, 19) : setTimeout(i, 19)
        },
        swapSlide = function (e, t) {
            if (clearTimeout(t.waitWithSwapSlide), e.find(".processing-revslide").length > 0) return t.waitWithSwapSlide = setTimeout(function () {
                swapSlide(e, t)
            }, 150), !1;
            var i = e.find(".active-revslide"),
                n = e.find(".next-revslide"),
                a = n.find(".defaultimg");
            return n.index() === i.index() ? (n.removeClass("next-revslide"), !1) : (n.removeClass("next-revslide").addClass("processing-revslide"), n.data("slide_on_focus_amount", n.data("slide_on_focus_amount") + 1 || 1), "on" == t.stopLoop && n.index() == t.lastslidetoshow - 1 && (e.find(".tp-bannertimer").css({
                visibility: "hidden"
            }), e.trigger("revolution.slide.onstop"), t.noloopanymore = 1), n.index() === t.slideamount - 1 && (t.looptogo = t.looptogo - 1, t.looptogo <= 0 && (t.stopLoop = "on")), t.tonpause = !0, e.trigger("stoptimer"), t.cd = 0, "off" === t.spinner ? e.find(".tp-loader").css({
                display: "none"
            }) : e.find(".tp-loader").css({
                display: "block"
            }), loadImages(n, t, 1), _R.preLoadAudio && _R.preLoadAudio(n, t, 1), void waitForCurrentImages(n, t, function () {
                n.find(".rs-background-video-layer").each(function () {
                    var e = jQuery(this);
                    e.hasClass("HasListener") || (e.data("bgvideo", 1), _R.manageVideoLayer && _R.manageVideoLayer(e, t)), 0 == e.find(".rs-fullvideo-cover").length && e.append('<div class="rs-fullvideo-cover"></div>')
                }), swapSlideProgress(t, a, e)
            }))
        },
        swapSlideProgress = function (e, t, i) {
            var n = i.find(".active-revslide"),
                a = i.find(".processing-revslide"),
                r = n.find(".slotholder"),
                o = a.find(".slotholder");
            e.tonpause = !1, e.cd = 0, i.find(".tp-loader").css({
                display: "none"
            }), _R.setSize(e), _R.slotSize(t, e), _R.manageNavigation && _R.manageNavigation(e);
            var s = {};
            s.nextslide = a, s.currentslide = n, i.trigger("revolution.slide.onbeforeswap", s), e.transition = 1, e.videoplaying = !1, a.data("delay") != undefined ? (e.cd = 0, e.delay = a.data("delay")) : e.delay = e.origcd, "true" == a.data("ssop") || a.data("ssop") === !0 ? e.ssop = !0 : e.ssop = !1, i.trigger("nulltimer");
            var d = n.index(),
                l = a.index();
            e.sdir = d > l ? 1 : 0, "arrow" == e.sc_indicator && (0 == d && l == e.slideamount - 1 && (e.sdir = 1), d == e.slideamount - 1 && 0 == l && (e.sdir = 0)), e.lsdir = e.lsdir === undefined ? e.sdir : e.lsdir, e.dirc = e.lsdir != e.sdir, e.lsdir = e.sdir, n.index() != a.index() && 1 != e.firststart && _R.removeTheCaptions && _R.removeTheCaptions(n, e), a.hasClass("rs-pause-timer-once") || a.hasClass("rs-pause-timer-always") ? e.videoplaying = !0 : i.trigger("restarttimer"), a.removeClass("rs-pause-timer-once");
            var u, c;
            if ("carousel" == e.sliderType) c = new punchgs.TimelineLite, _R.prepareCarousel(e, c), letItFree(i, e, o, r, a, n, c), e.transition = 0, e.firststart = 0;
            else {
                c = new punchgs.TimelineLite({
                    onComplete: function () {
                        letItFree(i, e, o, r, a, n, c)
                    }
                }), c.add(punchgs.TweenLite.set(o.find(".defaultimg"), {
                    opacity: 0
                })), c.pause(), 1 == e.firststart && (punchgs.TweenLite.set(n, {
                    autoAlpha: 0
                }), e.firststart = 0), punchgs.TweenLite.set(n, {
                    zIndex: 18
                }), punchgs.TweenLite.set(a, {
                    autoAlpha: 0,
                    zIndex: 20
                }), "prepared" == a.data("differentissplayed") && (a.data("differentissplayed", "done"), a.data("transition", a.data("savedtransition")), a.data("slotamount", a.data("savedslotamount")), a.data("masterspeed", a.data("savedmasterspeed"))), a.data("fstransition") != undefined && "done" != a.data("differentissplayed") && (a.data("savedtransition", a.data("transition")), a.data("savedslotamount", a.data("slotamount")), a.data("savedmasterspeed", a.data("masterspeed")), a.data("transition", a.data("fstransition")), a.data("slotamount", a.data("fsslotamount")), a.data("masterspeed", a.data("fsmasterspeed")), a.data("differentissplayed", "prepared")), a.data("transition") == undefined && a.data("transition", "random"), u = 0;
                var p = a.data("transition") !== undefined ? a.data("transition").split(",") : "fade",
                    f = a.data("nexttransid") == undefined ? -1 : a.data("nexttransid");
                "on" == a.data("randomtransition") ? f = Math.round(Math.random() * p.length) : f += 1, f == p.length && (f = 0), a.data("nexttransid", f);
                var h = p[f];
                e.ie && ("boxfade" == h && (h = "boxslide"), "slotfade-vertical" == h && (h = "slotzoom-vertical"), "slotfade-horizontal" == h && (h = "slotzoom-horizontal")), _R.isIE(8) && (h = 11), c = _R.animateSlide(u, h, i, e, a, n, o, r, c), "on" == o.data("kenburns") && (_R.startKenBurn(o, e), c.add(punchgs.TweenLite.set(o, {
                    autoAlpha: 0
                }))), c.pause()
            }
            _R.scrollHandling && (_R.scrollHandling(e, !0), c.eventCallback("onUpdate", function () {
                _R.scrollHandling(e, !0)
            })), "off" != e.parallax.type && e.parallax.firstgo == undefined && _R.scrollHandling && (e.parallax.firstgo = !0, e.lastscrolltop = -999, _R.scrollHandling(e, !0), setTimeout(function () {
                e.lastscrolltop = -999, _R.scrollHandling(e, !0)
            }, 210), setTimeout(function () {
                e.lastscrolltop = -999, _R.scrollHandling(e, !0)
            }, 420)), _R.animateTheCaptions ? _R.animateTheCaptions(a, e, null, c) : c != undefined && setTimeout(function () {
                c.resume()
            }, 30), punchgs.TweenLite.to(a, .001, {
                autoAlpha: 1
            })
        },
        letItFree = function (e, t, i, n, a, r, o) {
            "carousel" === t.sliderType || (t.removePrepare = 0, punchgs.TweenLite.to(i.find(".defaultimg"), .001, {
                zIndex: 20,
                autoAlpha: 1,
                onComplete: function () {
                    removeSlots(e, t, a, 1)
                }
            }), a.index() != r.index() && punchgs.TweenLite.to(r, .2, {
                zIndex: 18,
                autoAlpha: 0,
                onComplete: function () {
                    removeSlots(e, t, r, 1)
                }
            })), e.find(".active-revslide").removeClass("active-revslide"), e.find(".processing-revslide").removeClass("processing-revslide").addClass("active-revslide"), t.act = a.index(), t.c.attr("data-slideactive", e.find(".active-revslide").data("index")), ("scroll" == t.parallax.type || "scroll+mouse" == t.parallax.type || "mouse+scroll" == t.parallax.type) && (t.lastscrolltop = -999, _R.scrollHandling(t)), o.clear(), n.data("kbtl") != undefined && (n.data("kbtl").reverse(), n.data("kbtl").timeScale(25)), "on" == i.data("kenburns") && (i.data("kbtl") != undefined ? (i.data("kbtl").timeScale(1), i.data("kbtl").play()) : _R.startKenBurn(i, t)), a.find(".rs-background-video-layer").each(function (e) {
                if (_ISM) return !1;
                var i = jQuery(this);
                _R.resetVideo(i, t), punchgs.TweenLite.fromTo(i, 1, {
                    autoAlpha: 0
                }, {
                    autoAlpha: 1,
                    ease: punchgs.Power3.easeInOut,
                    delay: .2,
                    onComplete: function () {
                        _R.animcompleted && _R.animcompleted(i, t)
                    }
                })
            }), r.find(".rs-background-video-layer").each(function (e) {
                if (_ISM) return !1;
                var i = jQuery(this);
                _R.stopVideo && (_R.resetVideo(i, t), _R.stopVideo(i, t)), punchgs.TweenLite.to(i, 1, {
                    autoAlpha: 0,
                    ease: punchgs.Power3.easeInOut,
                    delay: .2
                })
            });
            var s = {};
            s.slideIndex = a.index() + 1, s.slideLIIndex = a.index(), s.slide = a, s.currentslide = a, s.prevslide = r, t.last_shown_slide = r.index(), e.trigger("revolution.slide.onchange", s), e.trigger("revolution.slide.onafterswap", s), t.duringslidechange = !1;
            var d = r.data("slide_on_focus_amount"),
                l = r.data("hideafterloop");
            0 != l && d >= l && t.c.revremoveslide(r.index())
        },
        removeAllListeners = function (e, t) {
            e.children().each(function () {
                try {
                    jQuery(this).die("click")
                } catch (e) { }
                try {
                    jQuery(this).die("mouseenter")
                } catch (e) { }
                try {
                    jQuery(this).die("mouseleave")
                } catch (e) { }
                try {
                    jQuery(this).unbind("hover")
                } catch (e) { }
            });
            try {
                e.die("click", "mouseenter", "mouseleave")
            } catch (i) { }
            clearInterval(t.cdint), e = null
        },
        countDown = function (e, t) {
            t.cd = 0, t.loop = 0, t.stopAfterLoops != undefined && t.stopAfterLoops > -1 ? t.looptogo = t.stopAfterLoops : t.looptogo = 9999999, t.stopAtSlide != undefined && t.stopAtSlide > -1 ? t.lastslidetoshow = t.stopAtSlide : t.lastslidetoshow = 999, t.stopLoop = "off", 0 == t.looptogo && (t.stopLoop = "on");
            var i = e.find(".tp-bannertimer");
            e.on("stoptimer", function () {
                var e = jQuery(this).find(".tp-bannertimer");
                e.data("tween").pause(), "on" == t.disableProgressBar && e.css({
                    visibility: "hidden"
                }), t.sliderstatus = "paused", _R.unToggleState(t.slidertoggledby)
            }), e.on("starttimer", function () {
                t.forcepause_viatoggle || (1 != t.conthover && 1 != t.videoplaying && t.width > t.hideSliderAtLimit && 1 != t.tonpause && 1 != t.overnav && 1 != t.ssop && (1 === t.noloopanymore || t.viewPort.enable && !t.inviewport || (i.css({
                    visibility: "visible"
                }), i.data("tween").resume(), t.sliderstatus = "playing")), "on" == t.disableProgressBar && i.css({
                    visibility: "hidden"
                }), _R.toggleState(t.slidertoggledby))
            }), e.on("restarttimer", function () {
                if (!t.forcepause_viatoggle) {
                    var e = jQuery(this).find(".tp-bannertimer");
                    if (t.mouseoncontainer && "on" == t.navigation.onHoverStop && !_ISM) return !1;
                    1 === t.noloopanymore || t.viewPort.enable && !t.inviewport || 1 == t.ssop || (e.css({
                        visibility: "visible"
                    }), e.data("tween").kill(), e.data("tween", punchgs.TweenLite.fromTo(e, t.delay / 1e3, {
                        width: "0%"
                    }, {
                        force3D: "auto",
                        width: "100%",
                        ease: punchgs.Linear.easeNone,
                        onComplete: n,
                        delay: 1
                    })), t.sliderstatus = "playing"), "on" == t.disableProgressBar && e.css({
                        visibility: "hidden"
                    }), _R.toggleState(t.slidertoggledby)
                }
            }), e.on("nulltimer", function () {
                i.data("tween").kill(), i.data("tween", punchgs.TweenLite.fromTo(i, t.delay / 1e3, {
                    width: "0%"
                }, {
                    force3D: "auto",
                    width: "100%",
                    ease: punchgs.Linear.easeNone,
                    onComplete: n,
                    delay: 1
                })), i.data("tween").pause(0), "on" == t.disableProgressBar && i.css({
                    visibility: "hidden"
                }), t.sliderstatus = "paused"
            });
            var n = function () {
                0 == jQuery("body").find(e).length && (removeAllListeners(e, t), clearInterval(t.cdint)), e.trigger("revolution.slide.slideatend"), 1 == e.data("conthover-changed") && (t.conthover = e.data("conthover"), e.data("conthover-changed", 0)), _R.callingNewSlide(t, e, 1)
            };
            i.data("tween", punchgs.TweenLite.fromTo(i, t.delay / 1e3, {
                width: "0%"
            }, {
                force3D: "auto",
                width: "100%",
                ease: punchgs.Linear.easeNone,
                onComplete: n,
                delay: 1
            })), i.data("opt", t), t.slideamount > 1 && (0 != t.stopAfterLoops || 1 != t.stopAtSlide) ? e.trigger("starttimer") : (t.noloopanymore = 1, e.trigger("nulltimer")), e.on("tp-mouseenter", function () {
                t.mouseoncontainer = !0, "on" != t.navigation.onHoverStop || _ISM || (e.trigger("stoptimer"), e.trigger("revolution.slide.onpause"))
            }), e.on("tp-mouseleft", function () {
                t.mouseoncontainer = !1, 1 != e.data("conthover") && "on" == t.navigation.onHoverStop && (1 == t.viewPort.enable && t.inviewport || 0 == t.viewPort.enable) && (e.trigger("revolution.slide.onresume"), e.trigger("starttimer"))
            })
        },
        vis = function () {
            var e, t, i = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
            };
            for (e in i)
                if (e in document) {
                    t = i[e];
                    break
                }
            return function (i) {
                return i && document.addEventListener(t, i, {
                    pasive: !0
                }), !document[e]
            }
        }(),
        restartOnFocus = function (e) {
            return e == undefined || e.c == undefined ? !1 : void (1 != e.windowfocused && (e.windowfocused = !0, punchgs.TweenLite.delayedCall(.3, function () {
                "on" == e.fallbacks.nextSlideOnWindowFocus && e.c.revnext(), e.c.revredraw(), "playing" == e.lastsliderstatus && e.c.revresume()
            })))
        },
        lastStatBlur = function (e) {
            e.windowfocused = !1, e.lastsliderstatus = e.sliderstatus, e.c.revpause();
            var t = e.c.find(".active-revslide .slotholder"),
                i = e.c.find(".processing-revslide .slotholder");
            "on" == i.data("kenburns") && _R.stopKenBurn(i, e), "on" == t.data("kenburns") && _R.stopKenBurn(t, e)
        },
        tabBlurringCheck = function (e, t) {
            var i = document.documentMode === undefined,
                n = window.chrome;
            i && !n ? jQuery(window).on("focusin", function () {
                restartOnFocus(t)
            }).on("focusout", function () {
                lastStatBlur(t)
            }) : window.addEventListener ? (window.addEventListener("focus", function (e) {
                restartOnFocus(t)
            }, {
                capture: !1,
                passive: !0
            }), window.addEventListener("blur", function (e) {
                lastStatBlur(t)
            }, {
                capture: !1,
                passive: !0
            })) : (window.attachEvent("focus", function (e) {
                restartOnFocus(t)
            }), window.attachEvent("blur", function (e) {
                lastStatBlur(t)
            }))
        },
        getUrlVars = function (e) {
            for (var t, i = [], n = window.location.href.slice(window.location.href.indexOf(e) + 1).split("_"), a = 0; a < n.length; a++) n[a] = n[a].replace("%3D", "="), t = n[a].split("="), i.push(t[0]), i[t[0]] = t[1];
            return i
        }
}(jQuery);