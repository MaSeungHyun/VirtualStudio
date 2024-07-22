import {
  require_prop_types
} from "./chunk-DQROLGKX.js";
import {
  require_react
} from "./chunk-65KY755N.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/react-split/dist/react-split.es.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());

// node_modules/split.js/dist/split.es.js
var global = typeof window !== "undefined" ? window : null;
var ssr = global === null;
var document2 = !ssr ? global.document : void 0;
var addEventListener = "addEventListener";
var removeEventListener = "removeEventListener";
var getBoundingClientRect = "getBoundingClientRect";
var gutterStartDragging = "_a";
var aGutterSize = "_b";
var bGutterSize = "_c";
var HORIZONTAL = "horizontal";
var NOOP = function() {
  return false;
};
var calc = ssr ? "calc" : ["", "-webkit-", "-moz-", "-o-"].filter(function(prefix) {
  var el = document2.createElement("div");
  el.style.cssText = "width:" + prefix + "calc(9px)";
  return !!el.style.length;
}).shift() + "calc";
var isString = function(v) {
  return typeof v === "string" || v instanceof String;
};
var elementOrSelector = function(el) {
  if (isString(el)) {
    var ele = document2.querySelector(el);
    if (!ele) {
      throw new Error("Selector " + el + " did not match a DOM element");
    }
    return ele;
  }
  return el;
};
var getOption = function(options, propName, def) {
  var value = options[propName];
  if (value !== void 0) {
    return value;
  }
  return def;
};
var getGutterSize = function(gutterSize, isFirst, isLast, gutterAlign) {
  if (isFirst) {
    if (gutterAlign === "end") {
      return 0;
    }
    if (gutterAlign === "center") {
      return gutterSize / 2;
    }
  } else if (isLast) {
    if (gutterAlign === "start") {
      return 0;
    }
    if (gutterAlign === "center") {
      return gutterSize / 2;
    }
  }
  return gutterSize;
};
var defaultGutterFn = function(i, gutterDirection) {
  var gut = document2.createElement("div");
  gut.className = "gutter gutter-" + gutterDirection;
  return gut;
};
var defaultElementStyleFn = function(dim, size, gutSize) {
  var style = {};
  if (!isString(size)) {
    style[dim] = calc + "(" + size + "% - " + gutSize + "px)";
  } else {
    style[dim] = size;
  }
  return style;
};
var defaultGutterStyleFn = function(dim, gutSize) {
  var obj;
  return obj = {}, obj[dim] = gutSize + "px", obj;
};
var Split = function(idsOption, options) {
  if (options === void 0) options = {};
  if (ssr) {
    return {};
  }
  var ids = idsOption;
  var dimension;
  var clientAxis;
  var position;
  var positionEnd;
  var clientSize;
  var elements;
  if (Array.from) {
    ids = Array.from(ids);
  }
  var firstElement = elementOrSelector(ids[0]);
  var parent = firstElement.parentNode;
  var parentStyle = getComputedStyle ? getComputedStyle(parent) : null;
  var parentFlexDirection = parentStyle ? parentStyle.flexDirection : null;
  var sizes = getOption(options, "sizes") || ids.map(function() {
    return 100 / ids.length;
  });
  var minSize = getOption(options, "minSize", 100);
  var minSizes = Array.isArray(minSize) ? minSize : ids.map(function() {
    return minSize;
  });
  var maxSize = getOption(options, "maxSize", Infinity);
  var maxSizes = Array.isArray(maxSize) ? maxSize : ids.map(function() {
    return maxSize;
  });
  var expandToMin = getOption(options, "expandToMin", false);
  var gutterSize = getOption(options, "gutterSize", 10);
  var gutterAlign = getOption(options, "gutterAlign", "center");
  var snapOffset = getOption(options, "snapOffset", 30);
  var snapOffsets = Array.isArray(snapOffset) ? snapOffset : ids.map(function() {
    return snapOffset;
  });
  var dragInterval = getOption(options, "dragInterval", 1);
  var direction = getOption(options, "direction", HORIZONTAL);
  var cursor = getOption(
    options,
    "cursor",
    direction === HORIZONTAL ? "col-resize" : "row-resize"
  );
  var gutter = getOption(options, "gutter", defaultGutterFn);
  var elementStyle = getOption(
    options,
    "elementStyle",
    defaultElementStyleFn
  );
  var gutterStyle = getOption(options, "gutterStyle", defaultGutterStyleFn);
  if (direction === HORIZONTAL) {
    dimension = "width";
    clientAxis = "clientX";
    position = "left";
    positionEnd = "right";
    clientSize = "clientWidth";
  } else if (direction === "vertical") {
    dimension = "height";
    clientAxis = "clientY";
    position = "top";
    positionEnd = "bottom";
    clientSize = "clientHeight";
  }
  function setElementSize(el, size, gutSize, i) {
    var style = elementStyle(dimension, size, gutSize, i);
    Object.keys(style).forEach(function(prop) {
      el.style[prop] = style[prop];
    });
  }
  function setGutterSize(gutterElement, gutSize, i) {
    var style = gutterStyle(dimension, gutSize, i);
    Object.keys(style).forEach(function(prop) {
      gutterElement.style[prop] = style[prop];
    });
  }
  function getSizes() {
    return elements.map(function(element) {
      return element.size;
    });
  }
  function getMousePosition(e) {
    if ("touches" in e) {
      return e.touches[0][clientAxis];
    }
    return e[clientAxis];
  }
  function adjust(offset) {
    var a = elements[this.a];
    var b = elements[this.b];
    var percentage = a.size + b.size;
    a.size = offset / this.size * percentage;
    b.size = percentage - offset / this.size * percentage;
    setElementSize(a.element, a.size, this[aGutterSize], a.i);
    setElementSize(b.element, b.size, this[bGutterSize], b.i);
  }
  function drag(e) {
    var offset;
    var a = elements[this.a];
    var b = elements[this.b];
    if (!this.dragging) {
      return;
    }
    offset = getMousePosition(e) - this.start + (this[aGutterSize] - this.dragOffset);
    if (dragInterval > 1) {
      offset = Math.round(offset / dragInterval) * dragInterval;
    }
    if (offset <= a.minSize + a.snapOffset + this[aGutterSize]) {
      offset = a.minSize + this[aGutterSize];
    } else if (offset >= this.size - (b.minSize + b.snapOffset + this[bGutterSize])) {
      offset = this.size - (b.minSize + this[bGutterSize]);
    }
    if (offset >= a.maxSize - a.snapOffset + this[aGutterSize]) {
      offset = a.maxSize + this[aGutterSize];
    } else if (offset <= this.size - (b.maxSize - b.snapOffset + this[bGutterSize])) {
      offset = this.size - (b.maxSize + this[bGutterSize]);
    }
    adjust.call(this, offset);
    getOption(options, "onDrag", NOOP)(getSizes());
  }
  function calculateSizes() {
    var a = elements[this.a].element;
    var b = elements[this.b].element;
    var aBounds = a[getBoundingClientRect]();
    var bBounds = b[getBoundingClientRect]();
    this.size = aBounds[dimension] + bBounds[dimension] + this[aGutterSize] + this[bGutterSize];
    this.start = aBounds[position];
    this.end = aBounds[positionEnd];
  }
  function innerSize(element) {
    if (!getComputedStyle) {
      return null;
    }
    var computedStyle = getComputedStyle(element);
    if (!computedStyle) {
      return null;
    }
    var size = element[clientSize];
    if (size === 0) {
      return null;
    }
    if (direction === HORIZONTAL) {
      size -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    } else {
      size -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    }
    return size;
  }
  function trimToMin(sizesToTrim) {
    var parentSize = innerSize(parent);
    if (parentSize === null) {
      return sizesToTrim;
    }
    if (minSizes.reduce(function(a, b) {
      return a + b;
    }, 0) > parentSize) {
      return sizesToTrim;
    }
    var excessPixels = 0;
    var toSpare = [];
    var pixelSizes = sizesToTrim.map(function(size, i) {
      var pixelSize = parentSize * size / 100;
      var elementGutterSize = getGutterSize(
        gutterSize,
        i === 0,
        i === sizesToTrim.length - 1,
        gutterAlign
      );
      var elementMinSize = minSizes[i] + elementGutterSize;
      if (pixelSize < elementMinSize) {
        excessPixels += elementMinSize - pixelSize;
        toSpare.push(0);
        return elementMinSize;
      }
      toSpare.push(pixelSize - elementMinSize);
      return pixelSize;
    });
    if (excessPixels === 0) {
      return sizesToTrim;
    }
    return pixelSizes.map(function(pixelSize, i) {
      var newPixelSize = pixelSize;
      if (excessPixels > 0 && toSpare[i] - excessPixels > 0) {
        var takenPixels = Math.min(
          excessPixels,
          toSpare[i] - excessPixels
        );
        excessPixels -= takenPixels;
        newPixelSize = pixelSize - takenPixels;
      }
      return newPixelSize / parentSize * 100;
    });
  }
  function stopDragging() {
    var self = this;
    var a = elements[self.a].element;
    var b = elements[self.b].element;
    if (self.dragging) {
      getOption(options, "onDragEnd", NOOP)(getSizes());
    }
    self.dragging = false;
    global[removeEventListener]("mouseup", self.stop);
    global[removeEventListener]("touchend", self.stop);
    global[removeEventListener]("touchcancel", self.stop);
    global[removeEventListener]("mousemove", self.move);
    global[removeEventListener]("touchmove", self.move);
    self.stop = null;
    self.move = null;
    a[removeEventListener]("selectstart", NOOP);
    a[removeEventListener]("dragstart", NOOP);
    b[removeEventListener]("selectstart", NOOP);
    b[removeEventListener]("dragstart", NOOP);
    a.style.userSelect = "";
    a.style.webkitUserSelect = "";
    a.style.MozUserSelect = "";
    a.style.pointerEvents = "";
    b.style.userSelect = "";
    b.style.webkitUserSelect = "";
    b.style.MozUserSelect = "";
    b.style.pointerEvents = "";
    self.gutter.style.cursor = "";
    self.parent.style.cursor = "";
    document2.body.style.cursor = "";
  }
  function startDragging(e) {
    if ("button" in e && e.button !== 0) {
      return;
    }
    var self = this;
    var a = elements[self.a].element;
    var b = elements[self.b].element;
    if (!self.dragging) {
      getOption(options, "onDragStart", NOOP)(getSizes());
    }
    e.preventDefault();
    self.dragging = true;
    self.move = drag.bind(self);
    self.stop = stopDragging.bind(self);
    global[addEventListener]("mouseup", self.stop);
    global[addEventListener]("touchend", self.stop);
    global[addEventListener]("touchcancel", self.stop);
    global[addEventListener]("mousemove", self.move);
    global[addEventListener]("touchmove", self.move);
    a[addEventListener]("selectstart", NOOP);
    a[addEventListener]("dragstart", NOOP);
    b[addEventListener]("selectstart", NOOP);
    b[addEventListener]("dragstart", NOOP);
    a.style.userSelect = "none";
    a.style.webkitUserSelect = "none";
    a.style.MozUserSelect = "none";
    a.style.pointerEvents = "none";
    b.style.userSelect = "none";
    b.style.webkitUserSelect = "none";
    b.style.MozUserSelect = "none";
    b.style.pointerEvents = "none";
    self.gutter.style.cursor = cursor;
    self.parent.style.cursor = cursor;
    document2.body.style.cursor = cursor;
    calculateSizes.call(self);
    self.dragOffset = getMousePosition(e) - self.end;
  }
  sizes = trimToMin(sizes);
  var pairs = [];
  elements = ids.map(function(id, i) {
    var element = {
      element: elementOrSelector(id),
      size: sizes[i],
      minSize: minSizes[i],
      maxSize: maxSizes[i],
      snapOffset: snapOffsets[i],
      i
    };
    var pair;
    if (i > 0) {
      pair = {
        a: i - 1,
        b: i,
        dragging: false,
        direction,
        parent
      };
      pair[aGutterSize] = getGutterSize(
        gutterSize,
        i - 1 === 0,
        false,
        gutterAlign
      );
      pair[bGutterSize] = getGutterSize(
        gutterSize,
        false,
        i === ids.length - 1,
        gutterAlign
      );
      if (parentFlexDirection === "row-reverse" || parentFlexDirection === "column-reverse") {
        var temp = pair.a;
        pair.a = pair.b;
        pair.b = temp;
      }
    }
    if (i > 0) {
      var gutterElement = gutter(i, direction, element.element);
      setGutterSize(gutterElement, gutterSize, i);
      pair[gutterStartDragging] = startDragging.bind(pair);
      gutterElement[addEventListener](
        "mousedown",
        pair[gutterStartDragging]
      );
      gutterElement[addEventListener](
        "touchstart",
        pair[gutterStartDragging]
      );
      parent.insertBefore(gutterElement, element.element);
      pair.gutter = gutterElement;
    }
    setElementSize(
      element.element,
      element.size,
      getGutterSize(
        gutterSize,
        i === 0,
        i === ids.length - 1,
        gutterAlign
      ),
      i
    );
    if (i > 0) {
      pairs.push(pair);
    }
    return element;
  });
  function adjustToMin(element) {
    var isLast = element.i === pairs.length;
    var pair = isLast ? pairs[element.i - 1] : pairs[element.i];
    calculateSizes.call(pair);
    var size = isLast ? pair.size - element.minSize - pair[bGutterSize] : element.minSize + pair[aGutterSize];
    adjust.call(pair, size);
  }
  elements.forEach(function(element) {
    var computedSize = element.element[getBoundingClientRect]()[dimension];
    if (computedSize < element.minSize) {
      if (expandToMin) {
        adjustToMin(element);
      } else {
        element.minSize = computedSize;
      }
    }
  });
  function setSizes(newSizes) {
    var trimmed = trimToMin(newSizes);
    trimmed.forEach(function(newSize, i) {
      if (i > 0) {
        var pair = pairs[i - 1];
        var a = elements[pair.a];
        var b = elements[pair.b];
        a.size = trimmed[i - 1];
        b.size = newSize;
        setElementSize(a.element, a.size, pair[aGutterSize], a.i);
        setElementSize(b.element, b.size, pair[bGutterSize], b.i);
      }
    });
  }
  function destroy(preserveStyles, preserveGutter) {
    pairs.forEach(function(pair) {
      if (preserveGutter !== true) {
        pair.parent.removeChild(pair.gutter);
      } else {
        pair.gutter[removeEventListener](
          "mousedown",
          pair[gutterStartDragging]
        );
        pair.gutter[removeEventListener](
          "touchstart",
          pair[gutterStartDragging]
        );
      }
      if (preserveStyles !== true) {
        var style = elementStyle(
          dimension,
          pair.a.size,
          pair[aGutterSize]
        );
        Object.keys(style).forEach(function(prop) {
          elements[pair.a].element.style[prop] = "";
          elements[pair.b].element.style[prop] = "";
        });
      }
    });
  }
  return {
    setSizes,
    getSizes,
    collapse: function collapse(i) {
      adjustToMin(elements[i]);
    },
    destroy,
    parent,
    pairs
  };
};
var split_es_default = Split;

// node_modules/react-split/dist/react-split.es.js
function objectWithoutProperties(obj, exclude) {
  var target = {};
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k];
  return target;
}
var SplitWrapper = function(superclass) {
  function SplitWrapper2() {
    superclass.apply(this, arguments);
  }
  if (superclass) SplitWrapper2.__proto__ = superclass;
  SplitWrapper2.prototype = Object.create(superclass && superclass.prototype);
  SplitWrapper2.prototype.constructor = SplitWrapper2;
  SplitWrapper2.prototype.componentDidMount = function componentDidMount() {
    var ref = this.props;
    ref.children;
    var gutter = ref.gutter;
    var rest = objectWithoutProperties(ref, ["children", "gutter"]);
    var options = rest;
    options.gutter = function(index, direction) {
      var gutterElement;
      if (gutter) {
        gutterElement = gutter(index, direction);
      } else {
        gutterElement = document.createElement("div");
        gutterElement.className = "gutter gutter-" + direction;
      }
      gutterElement.__isSplitGutter = true;
      return gutterElement;
    };
    this.split = split_es_default(this.parent.children, options);
  };
  SplitWrapper2.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var this$1 = this;
    var ref = this.props;
    ref.children;
    var minSize = ref.minSize;
    var sizes = ref.sizes;
    var collapsed = ref.collapsed;
    var rest = objectWithoutProperties(ref, ["children", "minSize", "sizes", "collapsed"]);
    var options = rest;
    var prevMinSize = prevProps.minSize;
    var prevSizes = prevProps.sizes;
    var prevCollapsed = prevProps.collapsed;
    var otherProps = [
      "maxSize",
      "expandToMin",
      "gutterSize",
      "gutterAlign",
      "snapOffset",
      "dragInterval",
      "direction",
      "cursor"
    ];
    var needsRecreate = otherProps.map(function(prop) {
      return this$1.props[prop] !== prevProps[prop];
    }).reduce(function(accum, same) {
      return accum || same;
    }, false);
    if (Array.isArray(minSize) && Array.isArray(prevMinSize)) {
      var minSizeChanged = false;
      minSize.forEach(function(minSizeI, i) {
        minSizeChanged = minSizeChanged || minSizeI !== prevMinSize[i];
      });
      needsRecreate = needsRecreate || minSizeChanged;
    } else if (Array.isArray(minSize) || Array.isArray(prevMinSize)) {
      needsRecreate = true;
    } else {
      needsRecreate = needsRecreate || minSize !== prevMinSize;
    }
    if (needsRecreate) {
      options.minSize = minSize;
      options.sizes = sizes || this.split.getSizes();
      this.split.destroy(true, true);
      options.gutter = function(index, direction, pairB) {
        return pairB.previousSibling;
      };
      this.split = split_es_default(
        Array.from(this.parent.children).filter(
          // eslint-disable-next-line no-underscore-dangle
          function(element) {
            return !element.__isSplitGutter;
          }
        ),
        options
      );
    } else if (sizes) {
      var sizeChanged = false;
      sizes.forEach(function(sizeI, i) {
        sizeChanged = sizeChanged || sizeI !== prevSizes[i];
      });
      if (sizeChanged) {
        this.split.setSizes(this.props.sizes);
      }
    }
    if (Number.isInteger(collapsed) && (collapsed !== prevCollapsed || needsRecreate)) {
      this.split.collapse(collapsed);
    }
  };
  SplitWrapper2.prototype.componentWillUnmount = function componentWillUnmount() {
    this.split.destroy();
    delete this.split;
  };
  SplitWrapper2.prototype.render = function render() {
    var this$1 = this;
    var ref = this.props;
    ref.sizes;
    ref.minSize;
    ref.maxSize;
    ref.expandToMin;
    ref.gutterSize;
    ref.gutterAlign;
    ref.snapOffset;
    ref.dragInterval;
    ref.direction;
    ref.cursor;
    ref.gutter;
    ref.elementStyle;
    ref.gutterStyle;
    ref.onDrag;
    ref.onDragStart;
    ref.onDragEnd;
    ref.collapsed;
    var children = ref.children;
    var rest$1 = objectWithoutProperties(ref, ["sizes", "minSize", "maxSize", "expandToMin", "gutterSize", "gutterAlign", "snapOffset", "dragInterval", "direction", "cursor", "gutter", "elementStyle", "gutterStyle", "onDrag", "onDragStart", "onDragEnd", "collapsed", "children"]);
    var rest = rest$1;
    return import_react.default.createElement(
      "div",
      Object.assign(
        {},
        { ref: function(parent) {
          this$1.parent = parent;
        } },
        rest
      ),
      children
    );
  };
  return SplitWrapper2;
}(import_react.default.Component);
SplitWrapper.propTypes = {
  sizes: import_prop_types.default.arrayOf(import_prop_types.default.number),
  minSize: import_prop_types.default.oneOfType([
    import_prop_types.default.number,
    import_prop_types.default.arrayOf(import_prop_types.default.number)
  ]),
  maxSize: import_prop_types.default.oneOfType([
    import_prop_types.default.number,
    import_prop_types.default.arrayOf(import_prop_types.default.number)
  ]),
  expandToMin: import_prop_types.default.bool,
  gutterSize: import_prop_types.default.number,
  gutterAlign: import_prop_types.default.string,
  snapOffset: import_prop_types.default.oneOfType([
    import_prop_types.default.number,
    import_prop_types.default.arrayOf(import_prop_types.default.number)
  ]),
  dragInterval: import_prop_types.default.number,
  direction: import_prop_types.default.string,
  cursor: import_prop_types.default.string,
  gutter: import_prop_types.default.func,
  elementStyle: import_prop_types.default.func,
  gutterStyle: import_prop_types.default.func,
  onDrag: import_prop_types.default.func,
  onDragStart: import_prop_types.default.func,
  onDragEnd: import_prop_types.default.func,
  collapsed: import_prop_types.default.number,
  children: import_prop_types.default.arrayOf(import_prop_types.default.element)
};
SplitWrapper.defaultProps = {
  sizes: void 0,
  minSize: void 0,
  maxSize: void 0,
  expandToMin: void 0,
  gutterSize: void 0,
  gutterAlign: void 0,
  snapOffset: void 0,
  dragInterval: void 0,
  direction: void 0,
  cursor: void 0,
  gutter: void 0,
  elementStyle: void 0,
  gutterStyle: void 0,
  onDrag: void 0,
  onDragStart: void 0,
  onDragEnd: void 0,
  collapsed: void 0,
  children: void 0
};
var react_split_es_default = SplitWrapper;
export {
  react_split_es_default as default
};
//# sourceMappingURL=react-split.js.map
