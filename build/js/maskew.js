(function() {
  var PI, abs, cos, css, getMetric, hasSupport, key, max, prefixList, rad, round, sin, testEl, testProp, transform, value, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  cos = Math.cos, sin = Math.sin, PI = Math.PI, abs = Math.abs, round = Math.round, max = Math.max;

  rad = function(deg) {
    return deg * PI / 180;
  };

  getMetric = function(style, key) {
    return parseInt(style[key], 10);
  };

  transform = function(y, angle) {
    return "translate3d(0, " + y + "px, 0) rotate3d(0, 0, 1, " + angle + "deg)";
  };

  testProp = function(prop) {
    var key, prefix, _i, _len;
    if (prop in testEl.style) {
      return prop;
    }
    for (_i = 0, _len = prefixList.length; _i < _len; _i++) {
      prefix = prefixList[_i];
      if ((key = prefix + prop.charAt(0).toUpperCase() + prop.slice(1)) in testEl.style) {
        return key;
      }
    }
    return false;
  };

  hasSupport = true;

  testEl = document.createElement('div');

  prefixList = ['Webkit', 'Moz', 'ms'];

  css = new function() {
    var key, _i, _len, _ref;
    _ref = 'transform transformOrigin transformStyle'.split(' ');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      this[key] = key;
    }
    return this;
  };

  for (key in css) {
    value = css[key];
    css[key] = testProp(value);
    if (!css[key]) {
      hasSupport = false;
      break;
    }
  }

  window.Maskew = (function() {
    function Maskew(_el, angle, _options) {
      var contents, elStyle, side, xMetrics, yMetrics, _base, _base1, _base2, _base3, _fn, _i, _j, _k, _len, _len1, _len2, _ref;
      this._el = _el;
      this.angle = angle;
      this._options = _options != null ? _options : {};
      this._onTouchLeave = __bind(this._onTouchLeave, this);
      this._onTouchEnd = __bind(this._onTouchEnd, this);
      this._onTouchMove = __bind(this._onTouchMove, this);
      this._onTouchStart = __bind(this._onTouchStart, this);
      this.destroy = __bind(this.destroy, this);
      this.skew = __bind(this.skew, this);
      if (!hasSupport) {
        return;
      }
      if (!(this instanceof Maskew)) {
        return new Maskew(this._el, this.angle, this._options);
      }
      if (typeof this._el === 'string') {
        this._el = document.querySelector(this._el);
      }
      (_base = this._options).touch || (_base.touch = false);
      (_base1 = this._options).anchor || (_base1.anchor = 'top');
      (_base2 = this._options).showElement || (_base2.showElement = false);
      (_base3 = this._options).className || (_base3.className = 'maskew');
      contents = this._el.cloneNode(true);
      elStyle = window.getComputedStyle(this._el);
      xMetrics = ['width', 'paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'];
      yMetrics = ['height', 'paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth'];
      this._width = this._height = 0;
      for (_i = 0, _len = xMetrics.length; _i < _len; _i++) {
        key = xMetrics[_i];
        this._width += getMetric(elStyle, key);
      }
      for (_j = 0, _len1 = yMetrics.length; _j < _len1; _j++) {
        key = yMetrics[_j];
        this._height += getMetric(elStyle, key);
      }
      this._outerMask = document.createElement('div');
      this._outerMask.style.padding = '0';
      this._outerMask.style.width = this._width + 'px';
      this._outerMask.style.height = this._height + 'px';
      this._outerMask.style.overflow = 'hidden';
      if (this._options.showElement) {
        this._el.style.display = 'block';
        this._outerMask.style.display = this._options.showElement;
      } else {
        this._outerMask.style.display = elStyle.display;
      }
      this._innerMask = this._outerMask.cloneNode(false);
      this._innerMask.style[css.transformOrigin] = 'bottom left';
      this._holder = this._outerMask.cloneNode(false);
      this._holder.style[css.transformOrigin] = 'inherit';
      _ref = ['Top', 'Right', 'Bottom', 'Left'];
      _fn = (function(_this) {
        return function(key) {
          return _this._outerMask.style[key] = elStyle[key];
        };
      })(this);
      for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
        side = _ref[_k];
        _fn('margin' + side);
      }
      this._el.style.margin = '0';
      this._el.parentNode.insertBefore(this._outerMask, this._el);
      this._holder.appendChild(this._el);
      this._innerMask.appendChild(this._holder);
      this._outerMask.appendChild(this._innerMask);
      this._outerMask.className = this._options.className;
      if (this._options.touch) {
        this.setTouch(true);
      }
      this.skew(this.angle);
    }

    Maskew.prototype.skew = function(angle) {
      var adj, cosine, hyp, opp, rads, sine, tlX, tlY, yOffset;
      if (angle == null) {
        angle = this._dragAngle || 0;
      }
      if (angle < 0) {
        angle = 0;
      }
      sine = sin(rads = rad(angle));
      cosine = cos(rads);
      tlX = this._height * sine;
      tlY = this._height * cosine;
      adj = max(0, this._width - tlX);
      hyp = adj / cosine;
      opp = sine * hyp;
      yOffset = round(this._height - tlY + opp);
      this._outerMask.style.height = round(tlY - opp) + 'px';
      this._innerMask.style.width = round(hyp) + 'px';
      this._innerMask.style[css.transform] = transform(-yOffset, angle);
      this._holder.style[css.transform] = transform(0, -angle);
      if (this._options.anchor === 'bottom') {
        this._el.style[css.transform] = transform(yOffset, 0);
      }
      return this;
    };

    Maskew.prototype.setTouch = function(toggle) {
      var eString, eventPair, eventPairs, listenFn, _fn, _i, _j, _len, _len1;
      if (toggle) {
        if (this._touchEnabled) {
          return;
        }
        listenFn = 'addEventListener';
        this._outerMask.style.cursor = 'ew-resize';
        this._touchEnabled = true;
      } else {
        if (!this._touchEnabled) {
          return;
        }
        listenFn = 'removeEventListener';
        this._outerMask.style.cursor = 'default';
        this._touchEnabled = false;
      }
      eventPairs = [['TouchStart', 'MouseDown'], ['TouchMove', 'MouseMove'], ['TouchEnd', 'MouseUp'], ['TouchLeave', 'MouseOut']];
      for (_i = 0, _len = eventPairs.length; _i < _len; _i++) {
        eventPair = eventPairs[_i];
        _fn = (function(_this) {
          return function(fn) {
            return _this._outerMask[listenFn](eString.toLowerCase(), _this[fn], false);
          };
        })(this);
        for (_j = 0, _len1 = eventPair.length; _j < _len1; _j++) {
          eString = eventPair[_j];
          _fn('_on' + eventPair[0]);
        }
      }
      return this;
    };

    Maskew.prototype.destroy = function() {
      var k, parent;
      parent = this._outerMask.parentNode;
      parent.insertBefore(this._el, this._outerMask);
      parent.removeChild(this._outerMask);
      if ($) {
        $.data(this._el, 'maskew', null);
      }
      for (k in this) {
        this[k] = null;
      }
      return null;
    };

    Maskew.prototype._onTouchStart = function(e) {
      e.preventDefault();
      this._touchStarted = true;
      if (e.type === 'mousedown') {
        this._x1 = e.pageX;
      } else if (e.type === 'touchstart') {
        this._x1 = e.touches[0].pageX;
      }
      return this._xDelta = 0;
    };

    Maskew.prototype._onTouchMove = function(e) {
      if (!this._touchStarted) {
        return;
      }
      e.preventDefault();
      if (e.type === 'mousemove') {
        this._xDelta = e.pageX - this._x1;
      } else if (e.type === 'touchmove') {
        this._xDelta = e.touches[0].pageX - this._x1;
      }
      this._dragAngle = this.angle + this._xDelta / abs(3 + this._xDelta / this._width);
      return this.skew();
    };

    Maskew.prototype._onTouchEnd = function() {
      this._touchStarted = false;
      return this.angle = this._dragAngle || this.angle;
    };

    Maskew.prototype._onTouchLeave = function() {
      return this._onTouchEnd();
    };

    Maskew.VERSION = '0.1.6';

    Maskew.isSupported = hasSupport;

    return Maskew;

  })();

  if ((window.jQuery != null) || (((_ref = window.$) != null ? _ref.data : void 0) != null)) {
    $.prototype.maskew = function(angle, options) {
      var el, instance, _i, _j, _len, _len1;
      if (!hasSupport) {
        return this;
      }
      if (typeof angle === 'object') {
        options = angle;
        angle = 0;
      } else if (typeof angle === 'string') {
        for (_i = 0, _len = this.length; _i < _len; _i++) {
          el = this[_i];
          if (!(instance = $.data(el, 'maskew'))) {
            return this;
          }
          if (typeof instance[angle] !== 'function') {
            return this;
          }
          instance[angle].call(instance, options);
        }
        return this;
      }
      for (_j = 0, _len1 = this.length; _j < _len1; _j++) {
        el = this[_j];
        if (instance = $.data(el, 'maskew')) {
          return instance;
        }
        $.data(el, 'maskew', new Maskew(el, angle, options));
      }
      return this;
    };
  }

}).call(this);