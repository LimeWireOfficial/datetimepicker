/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2020
 * @version 1.3.6
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 * This library is a standalone javascript library and does not depend on other libraries or plugins like jQuery. The
 * library also adds support for Universal Module Definition (UMD).
 * 
 * @see http://php.net/manual/en/function.date.php
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */!function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.DateFormatter=e()}("undefined"!=typeof self?self:this,function(){var t,e;return e={DAY:864e5,HOUR:3600,defaults:{dateSettings:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],meridiem:["AM","PM"],ordinal:function(t){var e=t%10,n={1:"st",2:"nd",3:"rd"};return 1!==Math.floor(t%100/10)&&n[e]?n[e]:"th"}},separators:/[ \-+\/.:@]/g,validParts:/[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,intParts:/[djwNzmnyYhHgGis]/g,tzParts:/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,tzClip:/[^-+\dA-Z]/g},getInt:function(t,e){return parseInt(t,e?e:10)},compare:function(t,e){return"string"==typeof t&&"string"==typeof e&&t.toLowerCase()===e.toLowerCase()},lpad:function(t,n,r){var a=t.toString();return r=r||"0",a.length<n?e.lpad(r+a,n):a},merge:function(t){var n,r;for(t=t||{},n=1;n<arguments.length;n++)if(r=arguments[n])for(var a in r)r.hasOwnProperty(a)&&("object"==typeof r[a]?e.merge(t[a],r[a]):t[a]=r[a]);return t},getIndex:function(t,e){for(var n=0;n<e.length;n++)if(e[n].toLowerCase()===t.toLowerCase())return n;return-1}},t=function(t){var n=this,r=e.merge(e.defaults,t);n.dateSettings=r.dateSettings,n.separators=r.separators,n.validParts=r.validParts,n.intParts=r.intParts,n.tzParts=r.tzParts,n.tzClip=r.tzClip},t.prototype={constructor:t,getMonth:function(t){var n,r=this;return n=e.getIndex(t,r.dateSettings.monthsShort)+1,0===n&&(n=e.getIndex(t,r.dateSettings.months)+1),n},parseDate:function(t,n){var r,a,u,i,o,s,c,f,l,d,g=this,h=!1,m=!1,p=g.dateSettings,y={date:null,year:null,month:null,day:null,hour:0,min:0,sec:0};if(!t)return null;if(t instanceof Date)return t;if("U"===n)return u=e.getInt(t),u?new Date(1e3*u):t;switch(typeof t){case"number":return new Date(t);case"string":break;default:return null}if(r=n.match(g.validParts),!r||0===r.length)throw new Error("Invalid date format definition.");for(u=r.length-1;u>=0;u--)"S"===r[u]&&r.splice(u,1);for(a=t.replace(g.separators,"\x00").split("\x00"),u=0;u<a.length;u++)switch(i=a[u],o=e.getInt(i),r[u]){case"y":case"Y":if(!o)return null;l=i.length,y.year=2===l?e.getInt((70>o?"20":"19")+i):o,h=!0;break;case"m":case"n":case"M":case"F":if(isNaN(o)){if(s=g.getMonth(i),!(s>0))return null;y.month=s}else{if(!(o>=1&&12>=o))return null;y.month=o}h=!0;break;case"d":case"j":if(!(o>=1&&31>=o))return null;y.day=o,h=!0;break;case"g":case"h":if(c=r.indexOf("a")>-1?r.indexOf("a"):r.indexOf("A")>-1?r.indexOf("A"):-1,d=a[c],-1!==c)f=e.compare(d,p.meridiem[0])?0:e.compare(d,p.meridiem[1])?12:-1,o>=1&&12>=o&&-1!==f?y.hour=o%12===0?f:o+f:o>=0&&23>=o&&(y.hour=o);else{if(!(o>=0&&23>=o))return null;y.hour=o}m=!0;break;case"G":case"H":if(!(o>=0&&23>=o))return null;y.hour=o,m=!0;break;case"i":if(!(o>=0&&59>=o))return null;y.min=o,m=!0;break;case"s":if(!(o>=0&&59>=o))return null;y.sec=o,m=!0}if(h===!0){var D=y.year||0,v=y.month?y.month-1:0,S=y.day||1;y.date=new Date(D,v,S,y.hour,y.min,y.sec,0)}else{if(m!==!0)return null;y.date=new Date(0,0,0,y.hour,y.min,y.sec,0)}return y.date},guessDate:function(t,n){if("string"!=typeof t)return t;var r,a,u,i,o,s,c=this,f=t.replace(c.separators,"\x00").split("\x00"),l=/^[djmn]/g,d=n.match(c.validParts),g=new Date,h=0;if(!l.test(d[0]))return t;for(u=0;u<f.length;u++){if(h=2,o=f[u],s=e.getInt(o.substr(0,2)),isNaN(s))return null;switch(u){case 0:"m"===d[0]||"n"===d[0]?g.setMonth(s-1):g.setDate(s);break;case 1:"m"===d[0]||"n"===d[0]?g.setDate(s):g.setMonth(s-1);break;case 2:if(a=g.getFullYear(),r=o.length,h=4>r?r:4,a=e.getInt(4>r?a.toString().substr(0,4-r)+o:o.substr(0,4)),!a)return null;g.setFullYear(a);break;case 3:g.setHours(s);break;case 4:g.setMinutes(s);break;case 5:g.setSeconds(s)}i=o.substr(h),i.length>0&&f.splice(u+1,0,i)}return g},parseFormat:function(t,n){var r,a=this,u=a.dateSettings,i=/\\?(.?)/gi,o=function(t,e){return r[t]?r[t]():e};return r={d:function(){return e.lpad(r.j(),2)},D:function(){return u.daysShort[r.w()]},j:function(){return n.getDate()},l:function(){return u.days[r.w()]},N:function(){return r.w()||7},w:function(){return n.getDay()},z:function(){var t=new Date(r.Y(),r.n()-1,r.j()),n=new Date(r.Y(),0,1);return Math.round((t-n)/e.DAY)},W:function(){var t=new Date(r.Y(),r.n()-1,r.j()-r.N()+3),n=new Date(t.getFullYear(),0,4);return e.lpad(1+Math.round((t-n)/e.DAY/7),2)},F:function(){return u.months[n.getMonth()]},m:function(){return e.lpad(r.n(),2)},M:function(){return u.monthsShort[n.getMonth()]},n:function(){return n.getMonth()+1},t:function(){return new Date(r.Y(),r.n(),0).getDate()},L:function(){var t=r.Y();return t%4===0&&t%100!==0||t%400===0?1:0},o:function(){var t=r.n(),e=r.W(),n=r.Y();return n+(12===t&&9>e?1:1===t&&e>9?-1:0)},Y:function(){return n.getFullYear()},y:function(){return r.Y().toString().slice(-2)},a:function(){return r.A().toLowerCase()},A:function(){var t=r.G()<12?0:1;return u.meridiem[t]},B:function(){var t=n.getUTCHours()*e.HOUR,r=60*n.getUTCMinutes(),a=n.getUTCSeconds();return e.lpad(Math.floor((t+r+a+e.HOUR)/86.4)%1e3,3)},g:function(){return r.G()%12||12},G:function(){return n.getHours()},h:function(){return e.lpad(r.g(),2)},H:function(){return e.lpad(r.G(),2)},i:function(){return e.lpad(n.getMinutes(),2)},s:function(){return e.lpad(n.getSeconds(),2)},u:function(){return e.lpad(1e3*n.getMilliseconds(),6)},e:function(){var t=/\((.*)\)/.exec(String(n))[1];return t||"Coordinated Universal Time"},I:function(){var t=new Date(r.Y(),0),e=Date.UTC(r.Y(),0),n=new Date(r.Y(),6),a=Date.UTC(r.Y(),6);return t-e!==n-a?1:0},O:function(){var t=n.getTimezoneOffset(),r=Math.abs(t);return(t>0?"-":"+")+e.lpad(100*Math.floor(r/60)+r%60,4)},P:function(){var t=r.O();return t.substr(0,3)+":"+t.substr(3,2)},T:function(){var t=(String(n).match(a.tzParts)||[""]).pop().replace(a.tzClip,"");return t||"UTC"},Z:function(){return 60*-n.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(i,o)},r:function(){return"D, d M Y H:i:s O".replace(i,o)},U:function(){return n.getTime()/1e3||0}},o(t,t)},formatDate:function(t,n){var r,a,u,i,o,s=this,c="",f="\\";if("string"==typeof t&&(t=s.parseDate(t,n),!t))return null;if(t instanceof Date){for(u=n.length,r=0;u>r;r++)o=n.charAt(r),"S"!==o&&o!==f&&(r>0&&n.charAt(r-1)===f?c+=o:(i=s.parseFormat(o,t),r!==u-1&&s.intParts.test(o)&&"S"===n.charAt(r+1)&&(a=e.getInt(i)||0,i+=s.dateSettings.ordinal(a)),c+=i));return c}return""}},t});

/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));
