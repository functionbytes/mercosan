/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@cropper/element-canvas/dist/element-canvas.esm.raw.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cropper/element-canvas/dist/element-canvas.esm.raw.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperCanvas)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:block;min-height:100px;min-width:200px;overflow:hidden;position:relative;touch-action:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([background]){background-color:#fff;background-image:repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),repeating-linear-gradient(45deg,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc);background-image:repeating-conic-gradient(#ccc 0 25%,#fff 0 50%);background-position:0 0,.5rem .5rem;background-size:1rem 1rem}:host([disabled]){pointer-events:none}:host([disabled]):after{bottom:0;content:"";cursor:not-allowed;display:block;left:0;pointer-events:none;position:absolute;right:0;top:0}`;

class CropperCanvas extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$onPointerDown = null;
        this.$onPointerMove = null;
        this.$onPointerUp = null;
        this.$onWheel = null;
        this.$wheeling = false;
        this.$pointers = new Map();
        this.$style = style;
        this.$action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE;
        this.background = false;
        this.disabled = false;
        this.scaleStep = 0.1;
        this.themeColor = '#39f';
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'background',
            'disabled',
            'scale-step',
        ]);
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.disabled) {
            this.$bind();
        }
    }
    disconnectedCallback() {
        if (!this.disabled) {
            this.$unbind();
        }
        super.disconnectedCallback();
    }
    $propertyChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        super.$propertyChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'disabled':
                if (newValue) {
                    this.$unbind();
                }
                else {
                    this.$bind();
                }
                break;
        }
    }
    $bind() {
        if (!this.$onPointerDown) {
            this.$onPointerDown = this.$handlePointerDown.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)(this, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_POINTER_DOWN, this.$onPointerDown);
        }
        if (!this.$onPointerMove) {
            this.$onPointerMove = this.$handlePointerMove.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)(this.ownerDocument, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_POINTER_MOVE, this.$onPointerMove);
        }
        if (!this.$onPointerUp) {
            this.$onPointerUp = this.$handlePointerUp.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)(this.ownerDocument, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_POINTER_UP, this.$onPointerUp);
        }
        if (!this.$onWheel) {
            this.$onWheel = this.$handleWheel.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)(this, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_WHEEL, this.$onWheel, {
                passive: false,
                capture: true,
            });
        }
    }
    $unbind() {
        if (this.$onPointerDown) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)(this, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_POINTER_DOWN, this.$onPointerDown);
            this.$onPointerDown = null;
        }
        if (this.$onPointerMove) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)(this.ownerDocument, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_POINTER_MOVE, this.$onPointerMove);
            this.$onPointerMove = null;
        }
        if (this.$onPointerUp) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)(this.ownerDocument, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_POINTER_UP, this.$onPointerUp);
            this.$onPointerUp = null;
        }
        if (this.$onWheel) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)(this, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_WHEEL, this.$onWheel, {
                capture: true,
            });
            this.$onWheel = null;
        }
    }
    $handlePointerDown(event) {
        const { buttons, button, type } = event;
        if (this.disabled || (
        // Handle pointer or mouse event, and ignore touch event
        ((type === 'pointerdown' && event.pointerType === 'mouse') || type === 'mousedown') && (
        // No primary button (Usually the left button)
        ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(buttons) && buttons !== 1) || ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(button) && button !== 0)
            // Open context menu
            || event.ctrlKey))) {
            return;
        }
        const { $pointers } = this;
        let action = '';
        if (event.changedTouches) {
            Array.from(event.changedTouches).forEach(({ identifier, pageX, pageY, }) => {
                $pointers.set(identifier, {
                    startX: pageX,
                    startY: pageY,
                    endX: pageX,
                    endY: pageY,
                });
            });
        }
        else {
            const { pointerId = 0, pageX, pageY } = event;
            $pointers.set(pointerId, {
                startX: pageX,
                startY: pageY,
                endX: pageX,
                endY: pageY,
            });
        }
        if ($pointers.size > 1) {
            action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_TRANSFORM;
        }
        else if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isElement)(event.target)) {
            action = event.target.action || event.target.getAttribute(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ATTRIBUTE_ACTION) || '';
        }
        if (this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, {
            action,
            relatedEvent: event,
        }) === false) {
            return;
        }
        // Prevent page zooming in the browsers for iOS.
        event.preventDefault();
        this.$action = action;
        this.style.willChange = 'transform';
    }
    $handlePointerMove(event) {
        const { $action, $pointers } = this;
        if (this.disabled || $action === _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE || $pointers.size === 0) {
            return;
        }
        if (this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_MOVE, {
            action: $action,
            relatedEvent: event,
        }) === false) {
            return;
        }
        // Prevent page scrolling.
        event.preventDefault();
        if (event.changedTouches) {
            Array.from(event.changedTouches).forEach(({ identifier, pageX, pageY, }) => {
                const pointer = $pointers.get(identifier);
                if (pointer) {
                    Object.assign(pointer, {
                        endX: pageX,
                        endY: pageY,
                    });
                }
            });
        }
        else {
            const { pointerId = 0, pageX, pageY } = event;
            const pointer = $pointers.get(pointerId);
            if (pointer) {
                Object.assign(pointer, {
                    endX: pageX,
                    endY: pageY,
                });
            }
        }
        const detail = {
            action: $action,
            relatedEvent: event,
        };
        if ($action === _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_TRANSFORM) {
            const pointers2 = new Map($pointers);
            let maxRotateRate = 0;
            let maxScaleRate = 0;
            let rotate = 0;
            let scale = 0;
            let centerX = event.pageX;
            let centerY = event.pageY;
            $pointers.forEach((pointer, pointerId) => {
                pointers2.delete(pointerId);
                pointers2.forEach((pointer2) => {
                    let x1 = pointer2.startX - pointer.startX;
                    let y1 = pointer2.startY - pointer.startY;
                    let x2 = pointer2.endX - pointer.endX;
                    let y2 = pointer2.endY - pointer.endY;
                    let z1 = 0;
                    let z2 = 0;
                    let a1 = 0;
                    let a2 = 0;
                    if (x1 === 0) {
                        if (y1 < 0) {
                            a1 = Math.PI * 2;
                        }
                        else if (y1 > 0) {
                            a1 = Math.PI;
                        }
                    }
                    else if (x1 > 0) {
                        a1 = (Math.PI / 2) + Math.atan(y1 / x1);
                    }
                    else if (x1 < 0) {
                        a1 = (Math.PI * 1.5) + Math.atan(y1 / x1);
                    }
                    if (x2 === 0) {
                        if (y2 < 0) {
                            a2 = Math.PI * 2;
                        }
                        else if (y2 > 0) {
                            a2 = Math.PI;
                        }
                    }
                    else if (x2 > 0) {
                        a2 = (Math.PI / 2) + Math.atan(y2 / x2);
                    }
                    else if (x2 < 0) {
                        a2 = (Math.PI * 1.5) + Math.atan(y2 / x2);
                    }
                    if (a2 > 0 || a1 > 0) {
                        const rotateRate = a2 - a1;
                        const absRotateRate = Math.abs(rotateRate);
                        if (absRotateRate > maxRotateRate) {
                            maxRotateRate = absRotateRate;
                            rotate = rotateRate;
                            centerX = (pointer.startX + pointer2.startX) / 2;
                            centerY = (pointer.startY + pointer2.startY) / 2;
                        }
                    }
                    x1 = Math.abs(x1);
                    y1 = Math.abs(y1);
                    x2 = Math.abs(x2);
                    y2 = Math.abs(y2);
                    if (x1 > 0 && y1 > 0) {
                        z1 = Math.sqrt((x1 * x1) + (y1 * y1));
                    }
                    else if (x1 > 0) {
                        z1 = x1;
                    }
                    else if (y1 > 0) {
                        z1 = y1;
                    }
                    if (x2 > 0 && y2 > 0) {
                        z2 = Math.sqrt((x2 * x2) + (y2 * y2));
                    }
                    else if (x2 > 0) {
                        z2 = x2;
                    }
                    else if (y2 > 0) {
                        z2 = y2;
                    }
                    if (z1 > 0 && z2 > 0) {
                        const scaleRate = (z2 - z1) / z1;
                        const absScaleRate = Math.abs(scaleRate);
                        if (absScaleRate > maxScaleRate) {
                            maxScaleRate = absScaleRate;
                            scale = scaleRate;
                            centerX = (pointer.startX + pointer2.startX) / 2;
                            centerY = (pointer.startY + pointer2.startY) / 2;
                        }
                    }
                });
            });
            const rotatable = maxRotateRate > 0;
            const scalable = maxScaleRate > 0;
            if (rotatable && scalable) {
                detail.rotate = rotate;
                detail.scale = scale;
                detail.centerX = centerX;
                detail.centerY = centerY;
            }
            else if (rotatable) {
                detail.action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_ROTATE;
                detail.rotate = rotate;
                detail.centerX = centerX;
                detail.centerY = centerY;
            }
            else if (scalable) {
                detail.action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SCALE;
                detail.scale = scale;
                detail.centerX = centerX;
                detail.centerY = centerY;
            }
            else {
                detail.action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE;
            }
        }
        else {
            const [pointer] = Array.from($pointers.values());
            Object.assign(detail, pointer);
        }
        // Override the starting coordinate
        $pointers.forEach((pointer) => {
            pointer.startX = pointer.endX;
            pointer.startY = pointer.endY;
        });
        if (detail.action !== _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE) {
            this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION, detail, {
                cancelable: false,
            });
        }
    }
    $handlePointerUp(event) {
        const { $action, $pointers } = this;
        if (this.disabled || $action === _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE) {
            return;
        }
        if (this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, {
            action: $action,
            relatedEvent: event,
        }) === false) {
            return;
        }
        event.preventDefault();
        if (event.changedTouches) {
            Array.from(event.changedTouches).forEach(({ identifier, }) => {
                $pointers.delete(identifier);
            });
        }
        else {
            const { pointerId = 0 } = event;
            $pointers.delete(pointerId);
        }
        if ($pointers.size === 0) {
            this.style.willChange = '';
            this.$action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE;
        }
    }
    $handleWheel(event) {
        if (this.disabled) {
            return;
        }
        event.preventDefault();
        // Limit wheel speed to prevent zoom too fast (#21)
        if (this.$wheeling) {
            return;
        }
        this.$wheeling = true;
        // Debounce by 50ms
        setTimeout(() => {
            this.$wheeling = false;
        }, 50);
        const delta = event.deltaY > 0 ? -1 : 1;
        const scale = delta * this.scaleStep;
        this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION, {
            action: _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SCALE,
            scale,
            relatedEvent: event,
        }, {
            cancelable: false,
        });
    }
    /**
     * Changes the current action to a new one.
     * @param {string} action The new action.
     * @returns {CropperCanvas} Returns `this` for chaining.
     */
    $setAction(action) {
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isString)(action)) {
            this.$action = action;
        }
        return this;
    }
    /**
     * Generates a real canvas element, with the image draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject(new Error('The current element is not connected to the DOM.'));
                return;
            }
            const canvas = document.createElement('canvas');
            let width = this.offsetWidth;
            let height = this.offsetHeight;
            let scale = 1;
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(options)
                && ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(options.width) || (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(options.height))) {
                ({ width, height } = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.getAdjustedSizes)({
                    aspectRatio: width / height,
                    width: options.width,
                    height: options.height,
                }));
                scale = width / this.offsetWidth;
            }
            canvas.width = width;
            canvas.height = height;
            const cropperImage = this.querySelector(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_IMAGE));
            if (!cropperImage) {
                resolve(canvas);
                return;
            }
            cropperImage.$ready().then((image) => {
                const context = canvas.getContext('2d');
                if (context) {
                    const [a, b, c, d, e, f] = cropperImage.$getTransform();
                    let newE = e;
                    let newF = f;
                    let destWidth = image.naturalWidth;
                    let destHeight = image.naturalHeight;
                    if (scale !== 1) {
                        newE *= scale;
                        newF *= scale;
                        destWidth *= scale;
                        destHeight *= scale;
                    }
                    const centerX = destWidth / 2;
                    const centerY = destHeight / 2;
                    context.fillStyle = 'transparent';
                    context.fillRect(0, 0, width, height);
                    if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(options) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(options.beforeDraw)) {
                        options.beforeDraw.call(this, context, canvas);
                    }
                    context.save();
                    // Move the transform origin to the center of the image.
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
                    context.translate(centerX, centerY);
                    context.transform(a, b, c, d, newE, newF);
                    // Reset the transform origin to the top-left of the image.
                    context.translate(-centerX, -centerY);
                    context.drawImage(image, 0, 0, destWidth, destHeight);
                    context.restore();
                }
                resolve(canvas);
            }).catch(reject);
        });
    }
}
CropperCanvas.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_CANVAS;
CropperCanvas.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-crosshair/dist/element-crosshair.esm.raw.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@cropper/element-crosshair/dist/element-crosshair.esm.raw.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperCrosshair)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:inline-block;height:1em;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;width:1em}:host:after,:host:before{background-color:var(--theme-color);content:"";display:block;position:absolute}:host:before{height:1px;left:0;top:50%;transform:translateY(-50%);width:100%}:host:after{height:100%;left:50%;top:0;transform:translateX(-50%);width:1px}:host([centered]){left:50%;position:absolute;top:50%;transform:translate(-50%,-50%)}`;

class CropperCrosshair extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$style = style;
        this.centered = false;
        this.slottable = false;
        this.themeColor = 'rgba(238, 238, 238, 0.5)';
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'centered',
        ]);
    }
}
CropperCrosshair.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_CROSSHAIR;
CropperCrosshair.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-grid/dist/element-grid.esm.raw.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@cropper/element-grid/dist/element-grid.esm.raw.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperGrid)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:flex;flex-direction:column;position:relative;touch-action:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host([bordered]){border:1px dashed var(--theme-color)}:host([covered]){bottom:0;left:0;position:absolute;right:0;top:0}:host>span{display:flex;flex:1}:host>span+span{border-top:1px dashed var(--theme-color)}:host>span>span{flex:1}:host>span>span+span{border-left:1px dashed var(--theme-color)}`;

class CropperGrid extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$style = style;
        this.bordered = false;
        this.columns = 3;
        this.covered = false;
        this.rows = 3;
        this.slottable = false;
        this.themeColor = 'rgba(238, 238, 238, 0.5)';
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'bordered',
            'columns',
            'covered',
            'rows',
        ]);
    }
    $propertyChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        super.$propertyChangedCallback(name, oldValue, newValue);
        if (name === 'rows' || name === 'columns') {
            this.$nextTick(() => {
                this.$render();
            });
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.$render();
    }
    $render() {
        const shadow = this.$getShadowRoot();
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.rows; i += 1) {
            const row = document.createElement('span');
            row.setAttribute('role', 'row');
            for (let j = 0; j < this.columns; j += 1) {
                const column = document.createElement('span');
                column.setAttribute('role', 'gridcell');
                row.appendChild(column);
            }
            fragment.appendChild(row);
        }
        if (shadow) {
            shadow.innerHTML = '';
            shadow.appendChild(fragment);
        }
    }
}
CropperGrid.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_GIRD;
CropperGrid.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-handle/dist/element-handle.esm.raw.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cropper/element-handle/dist/element-handle.esm.raw.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperHandle)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{background-color:var(--theme-color);display:block}:host([action=move]),:host([action=select]){height:100%;left:0;position:absolute;top:0;width:100%}:host([action=move]){cursor:move}:host([action=select]){cursor:crosshair}:host([action$=-resize]){background-color:transparent;height:15px;position:absolute;width:15px}:host([action$=-resize]):after{background-color:var(--theme-color);content:"";display:block;height:5px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:5px}:host([action=n-resize]),:host([action=s-resize]){cursor:ns-resize;left:50%;transform:translateX(-50%);width:100%}:host([action=n-resize]){top:-8px}:host([action=s-resize]){bottom:-8px}:host([action=e-resize]),:host([action=w-resize]){cursor:ew-resize;height:100%;top:50%;transform:translateY(-50%)}:host([action=e-resize]){right:-8px}:host([action=w-resize]){left:-8px}:host([action=ne-resize]){cursor:nesw-resize;right:-8px;top:-8px}:host([action=nw-resize]){cursor:nwse-resize;left:-8px;top:-8px}:host([action=se-resize]){bottom:-8px;cursor:nwse-resize;right:-8px}:host([action=se-resize]):after{height:15px;width:15px}@media (pointer:coarse){:host([action=se-resize]):after{height:10px;width:10px}}@media (pointer:fine){:host([action=se-resize]):after{height:5px;width:5px}}:host([action=sw-resize]){bottom:-8px;cursor:nesw-resize;left:-8px}:host([plain]){background-color:transparent}`;

class CropperHandle extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$onCanvasCropEnd = null;
        this.$onCanvasCropStart = null;
        this.$style = style;
        this.action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE;
        this.plain = false;
        this.slottable = false;
        this.themeColor = 'rgba(51, 153, 255, 0.5)';
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'action',
            'plain',
        ]);
    }
}
CropperHandle.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_HANDLE;
CropperHandle.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-image/dist/element-image.esm.raw.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@cropper/element-image/dist/element-image.esm.raw.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperImage)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:inline-block}img{display:block;height:100%;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}`;

const canvasCache = new WeakMap();
const NATIVE_ATTRIBUTES = [
    'alt',
    'crossorigin',
    'decoding',
    'importance',
    'loading',
    'referrerpolicy',
    'sizes',
    'src',
    'srcset',
];
class CropperImage extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$matrix = [1, 0, 0, 1, 0, 0];
        this.$onLoad = null;
        this.$onCanvasAction = null;
        this.$onCanvasActionEnd = null;
        this.$onCanvasActionStart = null;
        this.$actionStartTarget = null;
        this.$style = style;
        this.$image = new Image();
        this.initialCenterSize = 'contain';
        this.rotatable = false;
        this.scalable = false;
        this.skewable = false;
        this.slottable = false;
        this.translatable = false;
    }
    set $canvas(element) {
        canvasCache.set(this, element);
    }
    get $canvas() {
        return canvasCache.get(this);
    }
    static get observedAttributes() {
        return super.observedAttributes.concat(NATIVE_ATTRIBUTES, [
            'initial-center-size',
            'rotatable',
            'scalable',
            'skewable',
            'translatable',
        ]);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
        // Inherits the native attributes
        if (NATIVE_ATTRIBUTES.includes(name)) {
            this.$image.setAttribute(name, newValue);
        }
    }
    $propertyChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        super.$propertyChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'initialCenterSize':
                this.$nextTick(() => {
                    this.$center(newValue);
                });
                break;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        const { $image } = this;
        const $canvas = this.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_CANVAS));
        if ($canvas) {
            this.$canvas = $canvas;
            this.$setStyles({
                // Make it a block element to avoid side effects (#1074).
                display: 'block',
                position: 'absolute',
            });
            this.$onCanvasActionStart = (event) => {
                var _a, _b;
                this.$actionStartTarget = (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.relatedEvent) === null || _b === void 0 ? void 0 : _b.target;
            };
            this.$onCanvasActionEnd = () => {
                this.$actionStartTarget = null;
            };
            this.$onCanvasAction = this.$handleAction.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, this.$onCanvasActionStart);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, this.$onCanvasActionEnd);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION, this.$onCanvasAction);
        }
        this.$onLoad = this.$handleLoad.bind(this);
        (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_LOAD, this.$onLoad);
        this.$getShadowRoot().appendChild($image);
    }
    disconnectedCallback() {
        const { $image, $canvas } = this;
        if ($canvas) {
            if (this.$onCanvasActionStart) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, this.$onCanvasActionStart);
                this.$onCanvasActionStart = null;
            }
            if (this.$onCanvasActionEnd) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, this.$onCanvasActionEnd);
                this.$onCanvasActionEnd = null;
            }
            if (this.$onCanvasAction) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION, this.$onCanvasAction);
                this.$onCanvasAction = null;
            }
        }
        if ($image && this.$onLoad) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_LOAD, this.$onLoad);
            this.$onLoad = null;
        }
        this.$getShadowRoot().removeChild($image);
        super.disconnectedCallback();
    }
    $handleLoad() {
        const { $image } = this;
        this.$setStyles({
            width: $image.naturalWidth,
            height: $image.naturalHeight,
        });
        if (this.$canvas) {
            this.$center(this.initialCenterSize);
        }
    }
    $handleAction(event) {
        if (this.hidden || !(this.rotatable || this.scalable || this.translatable)) {
            return;
        }
        const { $canvas } = this;
        const { detail } = event;
        if (detail) {
            const { relatedEvent } = detail;
            let { action } = detail;
            if (action === _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_TRANSFORM && (!this.rotatable || !this.scalable)) {
                if (this.rotatable) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_ROTATE;
                }
                else if (this.scalable) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SCALE;
                }
                else {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_NONE;
                }
            }
            switch (action) {
                case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_MOVE:
                    if (this.translatable) {
                        let $selection = null;
                        if (relatedEvent) {
                            $selection = relatedEvent.target.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION));
                        }
                        if (!$selection) {
                            $selection = $canvas.querySelector(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION));
                        }
                        if ($selection && $selection.multiple && !$selection.active) {
                            $selection = $canvas.querySelector(`${this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION)}[active]`);
                        }
                        if (!$selection || $selection.hidden || !$selection.movable || $selection.dynamic
                            || !(this.$actionStartTarget && $selection.contains(this.$actionStartTarget))) {
                            this.$move(detail.endX - detail.startX, detail.endY - detail.startY);
                        }
                    }
                    break;
                case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_ROTATE:
                    if (this.rotatable) {
                        if (relatedEvent) {
                            const { x, y } = this.getBoundingClientRect();
                            this.$rotate(detail.rotate, relatedEvent.clientX - x, relatedEvent.clientY - y);
                        }
                        else {
                            this.$rotate(detail.rotate);
                        }
                    }
                    break;
                case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SCALE:
                    if (this.scalable) {
                        if (relatedEvent) {
                            const $selection = relatedEvent.target.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION));
                            if (!$selection
                                || !$selection.zoomable
                                || ($selection.zoomable && $selection.dynamic)) {
                                const { x, y } = this.getBoundingClientRect();
                                this.$zoom(detail.scale, relatedEvent.clientX - x, relatedEvent.clientY - y);
                            }
                        }
                        else {
                            this.$zoom(detail.scale);
                        }
                    }
                    break;
                case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_TRANSFORM:
                    if (this.rotatable && this.scalable) {
                        const { rotate } = detail;
                        let { scale } = detail;
                        if (scale < 0) {
                            scale = 1 / (1 - scale);
                        }
                        else {
                            scale += 1;
                        }
                        const cos = Math.cos(rotate);
                        const sin = Math.sin(rotate);
                        const [scaleX, skewY, skewX, scaleY] = [
                            cos * scale,
                            sin * scale,
                            -sin * scale,
                            cos * scale,
                        ];
                        if (relatedEvent) {
                            const clientRect = this.getBoundingClientRect();
                            const x = relatedEvent.clientX - clientRect.x;
                            const y = relatedEvent.clientY - clientRect.y;
                            const [a, b, c, d] = this.$matrix;
                            const originX = clientRect.width / 2;
                            const originY = clientRect.height / 2;
                            const moveX = x - originX;
                            const moveY = y - originY;
                            const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
                            const translateY = ((moveY * a) - (b * moveX)) / ((a * d) - (c * b));
                            /**
                             * Equals to
                             * this.$rotate(rotate, x, y);
                             * this.$scale(scale, x, y);
                             */
                            this.$transform(scaleX, skewY, skewX, scaleY, translateX * (1 - scaleX) + translateY * skewX, translateY * (1 - scaleY) + translateX * skewY);
                        }
                        else {
                            /**
                             * Equals to
                             * this.$rotate(rotate);
                             * this.$scale(scale);
                             */
                            this.$transform(scaleX, skewY, skewX, scaleY, 0, 0);
                        }
                    }
                    break;
            }
        }
    }
    /**
     * Defers the callback to execute after successfully loading the image.
     * @param {Function} [callback] The callback to execute after successfully loading the image.
     * @returns {Promise} Returns a promise that resolves to the image element.
     */
    $ready(callback) {
        const { $image } = this;
        const promise = new Promise((resolve, reject) => {
            const error = new Error('Failed to load the image source');
            if ($image.complete) {
                if ($image.naturalWidth > 0 && $image.naturalHeight > 0) {
                    resolve($image);
                }
                else {
                    reject(error);
                }
            }
            else {
                const onLoad = () => {
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ERROR, onError);
                    resolve($image);
                };
                const onError = () => {
                    (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_LOAD, onLoad);
                    reject(error);
                };
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.once)($image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_LOAD, onLoad);
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.once)($image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ERROR, onError);
            }
        });
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(callback)) {
            promise.then((image) => {
                callback(image);
                return image;
            });
        }
        return promise;
    }
    /**
     * Aligns the image to the center of its parent element.
     * @param {string} [size] The size of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $center(size) {
        const { parentElement } = this;
        if (!parentElement) {
            return this;
        }
        const container = parentElement.getBoundingClientRect();
        const containerWidth = container.width;
        const containerHeight = container.height;
        const { x, y, width, height, } = this.getBoundingClientRect();
        const startX = x + (width / 2);
        const startY = y + (height / 2);
        const endX = container.x + (containerWidth / 2);
        const endY = container.y + (containerHeight / 2);
        this.$move(endX - startX, endY - startY);
        if (size && (width !== containerWidth || height !== containerHeight)) {
            const scaleX = containerWidth / width;
            const scaleY = containerHeight / height;
            switch (size) {
                case 'cover':
                    this.$scale(Math.max(scaleX, scaleY));
                    break;
                case 'contain':
                    this.$scale(Math.min(scaleX, scaleY));
                    break;
            }
        }
        return this;
    }
    /**
     * Moves the image.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $move(x, y = x) {
        if (this.translatable && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)) {
            const [a, b, c, d] = this.$matrix;
            const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
            const f = ((y * a) - (b * x)) / ((a * d) - (c * b));
            this.$translate(e, f);
        }
        return this;
    }
    /**
     * Moves the image to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $moveTo(x, y = x) {
        if (this.translatable && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)) {
            const [a, b, c, d] = this.$matrix;
            const e = ((x * d) - (c * y)) / ((a * d) - (c * b));
            const f = ((y * a) - (b * x)) / ((a * d) - (c * b));
            this.$setTransform(a, b, c, d, e, f);
        }
        return this;
    }
    /**
     * Rotates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate}
     * @param {number|string} angle The rotation angle (in radians).
     * @param {number} [x] The rotation origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The rotation origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $rotate(angle, x, y) {
        if (this.rotatable) {
            const radian = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.toAngleInRadian)(angle);
            const cos = Math.cos(radian);
            const sin = Math.sin(radian);
            const [scaleX, skewY, skewX, scaleY] = [cos, sin, -sin, cos];
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)) {
                const [a, b, c, d] = this.$matrix;
                const { width, height } = this.getBoundingClientRect();
                const originX = width / 2;
                const originY = height / 2;
                const moveX = x - originX;
                const moveY = y - originY;
                const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
                const translateY = ((moveY * a) - (b * moveX)) / ((a * d) - (c * b));
                /**
                 * Equals to
                 * this.$translate(translateX, translateX);
                 * this.$rotate(angle);
                 * this.$translate(-translateX, -translateX);
                 */
                this.$transform(scaleX, skewY, skewX, scaleY, translateX * (1 - scaleX) - translateY * skewX, translateY * (1 - scaleY) - translateX * skewY);
            }
            else {
                this.$transform(scaleX, skewY, skewX, scaleY, 0, 0);
            }
        }
        return this;
    }
    /**
     * Zooms the image.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the image.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the image.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $zoom(scale, x, y) {
        if (!this.scalable || scale === 0) {
            return this;
        }
        if (scale < 0) {
            scale = 1 / (1 - scale);
        }
        else {
            scale += 1;
        }
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)) {
            const [a, b, c, d] = this.$matrix;
            const { width, height } = this.getBoundingClientRect();
            const originX = width / 2;
            const originY = height / 2;
            const moveX = x - originX;
            const moveY = y - originY;
            const translateX = ((moveX * d) - (c * moveY)) / ((a * d) - (c * b));
            const translateY = ((moveY * a) - (b * moveX)) / ((a * d) - (c * b));
            /**
             * Equals to
             * this.$translate(translateX, translateX);
             * this.$scale(scale);
             * this.$translate(-translateX, -translateX);
             */
            this.$transform(scale, 0, 0, scale, translateX * (1 - scale), translateY * (1 - scale));
        }
        else {
            this.$scale(scale);
        }
        return this;
    }
    /**
     * Scales the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/scale}
     * @param {number} x The scaling factor in the horizontal direction.
     * @param {number} [y] The scaling factor in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $scale(x, y = x) {
        if (this.scalable) {
            this.$transform(x, 0, 0, y, 0, 0);
        }
        return this;
    }
    /**
     * Skews the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number|string} x The skewing angle in the horizontal direction.
     * @param {number|string} [y] The skewing angle in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $skew(x, y = 0) {
        if (this.skewable) {
            const radianX = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.toAngleInRadian)(x);
            const radianY = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.toAngleInRadian)(y);
            this.$transform(1, Math.tan(radianY), Math.tan(radianX), 1, 0, 0);
        }
        return this;
    }
    /**
     * Translates the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate}
     * @param {number} x The translating distance in the horizontal direction.
     * @param {number} [y] The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $translate(x, y = x) {
        if (this.translatable && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)) {
            this.$transform(1, 0, 0, 1, x, y);
        }
        return this;
    }
    /**
     * Transforms the image.
     * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix}
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/transform}
     * @param {number} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $transform(a, b, c, d, e, f) {
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(a)
            && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(b)
            && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(c)
            && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(d)
            && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(e)
            && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(f)) {
            return this.$setTransform((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.multiplyMatrices)(this.$matrix, [a, b, c, d, e, f]));
        }
        return this;
    }
    /**
     * Resets (overrides) the current transform to the specific identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform}
     * @param {number|Array} a The scaling factor in the horizontal direction.
     * @param {number} b The skewing angle in the vertical direction.
     * @param {number} c The skewing angle in the horizontal direction.
     * @param {number} d The scaling factor in the vertical direction.
     * @param {number} e The translating distance in the horizontal direction.
     * @param {number} f The translating distance in the vertical direction.
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $setTransform(a, b, c, d, e, f) {
        if (this.rotatable || this.scalable || this.skewable || this.translatable) {
            if (Array.isArray(a)) {
                [a, b, c, d, e, f] = a;
            }
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(a)
                && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(b)
                && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(c)
                && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(d)
                && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(e)
                && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(f)) {
                const oldMatrix = [...this.$matrix];
                const newMatrix = [a, b, c, d, e, f];
                if (this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_TRANSFORM, {
                    matrix: newMatrix,
                    oldMatrix,
                }) === false) {
                    return this;
                }
                this.$matrix = newMatrix;
                this.style.transform = `matrix(${newMatrix.join(', ')})`;
            }
        }
        return this;
    }
    /**
     * Retrieves the current transformation matrix being applied to the element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getTransform}
     * @returns {Array} Returns the readonly transformation matrix.
     */
    $getTransform() {
        return this.$matrix.slice();
    }
    /**
     * Resets the current transform to the initial identity matrix.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/resetTransform}
     * @returns {CropperImage} Returns `this` for chaining.
     */
    $resetTransform() {
        return this.$setTransform([1, 0, 0, 1, 0, 0]);
    }
}
CropperImage.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_IMAGE;
CropperImage.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-selection/dist/element-selection.esm.raw.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@cropper/element-selection/dist/element-selection.esm.raw.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperSelection)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:block;left:0;position:relative;right:0}:host([outlined]){outline:1px solid var(--theme-color)}:host([multiple]){outline:1px dashed hsla(0,0%,100%,.5)}:host([multiple]):after{bottom:0;content:"";cursor:pointer;display:block;left:0;position:absolute;right:0;top:0}:host([multiple][active]){outline-color:var(--theme-color);z-index:1}:host([multiple])>*{visibility:hidden}:host([multiple][active])>*{visibility:visible}:host([multiple][active]):after{display:none}`;

const canvasCache = new WeakMap();
class CropperSelection extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$onCanvasAction = null;
        this.$onCanvasActionStart = null;
        this.$onCanvasActionEnd = null;
        this.$onDocumentKeyDown = null;
        this.$action = '';
        this.$actionStartTarget = null;
        this.$changing = false;
        this.$style = style;
        this.$initialSelection = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.aspectRatio = NaN;
        this.initialAspectRatio = NaN;
        this.initialCoverage = NaN;
        this.active = false;
        // Deprecated as of v2.0.0-rc.0, use `dynamic` instead.
        this.linked = false;
        this.dynamic = false;
        this.movable = false;
        this.resizable = false;
        this.zoomable = false;
        this.multiple = false;
        this.keyboard = false;
        this.outlined = false;
        this.precise = false;
    }
    set $canvas(element) {
        canvasCache.set(this, element);
    }
    get $canvas() {
        return canvasCache.get(this);
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'active',
            'aspect-ratio',
            'dynamic',
            'height',
            'initial-aspect-ratio',
            'initial-coverage',
            'keyboard',
            'linked',
            'movable',
            'multiple',
            'outlined',
            'precise',
            'resizable',
            'width',
            'x',
            'y',
            'zoomable',
        ]);
    }
    $propertyChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        super.$propertyChangedCallback(name, oldValue, newValue);
        switch (name) {
            case 'x':
            case 'y':
            case 'width':
            case 'height':
                if (!this.$changing) {
                    this.$nextTick(() => {
                        this.$change(this.x, this.y, this.width, this.height, this.aspectRatio, true);
                    });
                }
                break;
            case 'aspectRatio':
            case 'initialAspectRatio':
                this.$nextTick(() => {
                    this.$initSelection();
                });
                break;
            case 'initialCoverage':
                this.$nextTick(() => {
                    if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(newValue) && newValue <= 1) {
                        this.$initSelection(true, true);
                    }
                });
                break;
            case 'keyboard':
                this.$nextTick(() => {
                    if (this.$canvas) {
                        if (newValue) {
                            if (!this.$onDocumentKeyDown) {
                                this.$onDocumentKeyDown = this.$handleKeyDown.bind(this);
                                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)(this.ownerDocument, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_KEYDOWN, this.$onDocumentKeyDown);
                            }
                        }
                        else if (this.$onDocumentKeyDown) {
                            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)(this.ownerDocument, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_KEYDOWN, this.$onDocumentKeyDown);
                            this.$onDocumentKeyDown = null;
                        }
                    }
                });
                break;
            case 'multiple':
                this.$nextTick(() => {
                    if (this.$canvas) {
                        const selections = this.$getSelections();
                        if (newValue) {
                            selections.forEach((selection) => {
                                selection.active = false;
                            });
                            this.active = true;
                            this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, {
                                x: this.x,
                                y: this.y,
                                width: this.width,
                                height: this.height,
                            });
                        }
                        else {
                            this.active = false;
                            selections.slice(1).forEach((selection) => {
                                this.$removeSelection(selection);
                            });
                        }
                    }
                });
                break;
            case 'precise':
                this.$nextTick(() => {
                    this.$change(this.x, this.y);
                });
                break;
            // Backwards compatible with 2.0.0-rc
            case 'linked':
                if (newValue) {
                    this.dynamic = true;
                }
                break;
        }
    }
    connectedCallback() {
        super.connectedCallback();
        const $canvas = this.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_CANVAS));
        if ($canvas) {
            this.$canvas = $canvas;
            this.$setStyles({
                position: 'absolute',
                transform: `translate(${this.x}px, ${this.y}px)`,
            });
            if (!this.hidden) {
                this.$render();
            }
            this.$initSelection(true);
            this.$onCanvasActionStart = this.$handleActionStart.bind(this);
            this.$onCanvasActionEnd = this.$handleActionEnd.bind(this);
            this.$onCanvasAction = this.$handleAction.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, this.$onCanvasActionStart);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, this.$onCanvasActionEnd);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION, this.$onCanvasAction);
        }
        else {
            this.$render();
        }
    }
    disconnectedCallback() {
        const { $canvas } = this;
        if ($canvas) {
            if (this.$onCanvasActionStart) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, this.$onCanvasActionStart);
                this.$onCanvasActionStart = null;
            }
            if (this.$onCanvasActionEnd) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, this.$onCanvasActionEnd);
                this.$onCanvasActionEnd = null;
            }
            if (this.$onCanvasAction) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION, this.$onCanvasAction);
                this.$onCanvasAction = null;
            }
        }
        super.disconnectedCallback();
    }
    $getSelections() {
        let selections = [];
        if (this.parentElement) {
            selections = Array.from(this.parentElement.querySelectorAll(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION)));
        }
        return selections;
    }
    $initSelection(center = false, resize = false) {
        const { initialCoverage, parentElement } = this;
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(initialCoverage) && parentElement) {
            const aspectRatio = this.aspectRatio || this.initialAspectRatio;
            let width = (resize ? 0 : this.width) || parentElement.offsetWidth * initialCoverage;
            let height = (resize ? 0 : this.height) || parentElement.offsetHeight * initialCoverage;
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(aspectRatio)) {
                ({ width, height } = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.getAdjustedSizes)({ aspectRatio, width, height }));
            }
            this.$change(this.x, this.y, width, height);
            if (center) {
                this.$center();
            }
            // Overrides the initial position and size
            this.$initialSelection = {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
            };
        }
    }
    $createSelection() {
        const newSelection = this.cloneNode(true);
        if (this.hasAttribute('id')) {
            newSelection.removeAttribute('id');
        }
        newSelection.initialCoverage = NaN;
        this.active = false;
        if (this.parentElement) {
            this.parentElement.insertBefore(newSelection, this.nextSibling);
        }
        return newSelection;
    }
    $removeSelection(selection = this) {
        if (this.parentElement) {
            const selections = this.$getSelections();
            if (selections.length > 1) {
                const index = selections.indexOf(selection);
                const activeSelection = selections[index + 1] || selections[index - 1];
                if (activeSelection) {
                    selection.active = false;
                    this.parentElement.removeChild(selection);
                    activeSelection.active = true;
                    activeSelection.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, {
                        x: activeSelection.x,
                        y: activeSelection.y,
                        width: activeSelection.width,
                        height: activeSelection.height,
                    });
                }
            }
            else {
                this.$clear();
            }
        }
    }
    $handleActionStart(event) {
        var _a, _b;
        const relatedTarget = (_b = (_a = event.detail) === null || _a === void 0 ? void 0 : _a.relatedEvent) === null || _b === void 0 ? void 0 : _b.target;
        this.$action = '';
        this.$actionStartTarget = relatedTarget;
        if (!this.hidden
            && this.multiple
            && !this.active
            && relatedTarget === this
            && this.parentElement) {
            this.$getSelections().forEach((selection) => {
                selection.active = false;
            });
            this.active = true;
            this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
            });
        }
    }
    $handleAction(event) {
        const { currentTarget, detail } = event;
        if (!currentTarget || !detail) {
            return;
        }
        const { relatedEvent } = detail;
        let { action } = detail;
        // Switching to another selection
        if (!action && this.multiple) {
            // Get the `action` property from the focusing in selection
            action = this.$action || (relatedEvent === null || relatedEvent === void 0 ? void 0 : relatedEvent.target.action);
            this.$action = action;
        }
        if (!action
            || (this.hidden && action !== _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SELECT)
            || (this.multiple && !this.active && action !== _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SCALE)) {
            return;
        }
        const moveX = detail.endX - detail.startX;
        const moveY = detail.endY - detail.startY;
        const { width, height } = this;
        let { aspectRatio } = this;
        // Locking aspect ratio by holding shift key
        if (!(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(aspectRatio) && relatedEvent.shiftKey) {
            aspectRatio = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(width) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(height) ? width / height : 1;
        }
        switch (action) {
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SELECT:
                if (moveX !== 0 && moveY !== 0) {
                    const { $canvas } = this;
                    const offset = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.getOffset)(currentTarget);
                    (this.multiple && !this.hidden ? this.$createSelection() : this).$change(detail.startX - offset.left, detail.startY - offset.top, Math.abs(moveX), Math.abs(moveY), aspectRatio);
                    if (moveX < 0) {
                        if (moveY < 0) {
                            // ↖️
                            action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHWEST;
                        }
                        else if (moveY > 0) {
                            // ↙️
                            action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHWEST;
                        }
                    }
                    else if (moveX > 0) {
                        if (moveY < 0) {
                            // ↗️
                            action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHEAST;
                        }
                        else if (moveY > 0) {
                            // ↘️
                            action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHEAST;
                        }
                    }
                    if ($canvas) {
                        $canvas.$action = action;
                    }
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_MOVE:
                if (this.movable && (this.dynamic
                    || (this.$actionStartTarget && this.contains(this.$actionStartTarget)))) {
                    this.$move(moveX, moveY);
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SCALE:
                if (relatedEvent && this.zoomable && (this.dynamic
                    || this.contains(relatedEvent.target))) {
                    const offset = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.getOffset)(currentTarget);
                    this.$zoom(detail.scale, relatedEvent.pageX - offset.left, relatedEvent.pageY - offset.top);
                }
                break;
            default:
                this.$resize(action, moveX, moveY, aspectRatio);
        }
    }
    $handleActionEnd() {
        this.$action = '';
        this.$actionStartTarget = null;
    }
    $handleKeyDown(event) {
        if (this.hidden
            || !this.keyboard
            || (this.multiple && !this.active)
            || event.defaultPrevented) {
            return;
        }
        const { activeElement } = document;
        // Disable keyboard control when input something
        if (activeElement && (['INPUT', 'TEXTAREA'].includes(activeElement.tagName)
            || ['true', 'plaintext-only'].includes(activeElement.contentEditable))) {
            return;
        }
        switch (event.key) {
            case 'Backspace':
                if (event.metaKey) {
                    event.preventDefault();
                    this.$removeSelection();
                }
                break;
            case 'Delete':
                event.preventDefault();
                this.$removeSelection();
                break;
            // Move to the left
            case 'ArrowLeft':
                event.preventDefault();
                this.$move(-1, 0);
                break;
            // Move to the right
            case 'ArrowRight':
                event.preventDefault();
                this.$move(1, 0);
                break;
            // Move to the top
            case 'ArrowUp':
                event.preventDefault();
                this.$move(0, -1);
                break;
            // Move to the bottom
            case 'ArrowDown':
                event.preventDefault();
                this.$move(0, 1);
                break;
            case '+':
                event.preventDefault();
                this.$zoom(0.1);
                break;
            case '-':
                event.preventDefault();
                this.$zoom(-0.1);
                break;
        }
    }
    /**
     * Aligns the selection to the center of its parent element.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $center() {
        const { parentElement } = this;
        if (!parentElement) {
            return this;
        }
        const x = (parentElement.offsetWidth - this.width) / 2;
        const y = (parentElement.offsetHeight - this.height) / 2;
        return this.$change(x, y);
    }
    /**
     * Moves the selection.
     * @param {number} x The moving distance in the horizontal direction.
     * @param {number} [y] The moving distance in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $move(x, y = x) {
        return this.$moveTo(this.x + x, this.y + y);
    }
    /**
     * Moves the selection to a specific position.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} [y] The new position in the vertical direction.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $moveTo(x, y = x) {
        if (!this.movable) {
            return this;
        }
        return this.$change(x, y);
    }
    /**
     * Adjusts the size the selection on a specific side or corner.
     * @param {string} action Indicates the side or corner to resize.
     * @param {number} [offsetX] The horizontal offset of the specific side or corner.
     * @param {number} [offsetY] The vertical offset of the specific side or corner.
     * @param {number} [aspectRatio] The aspect ratio for computing the new size if it is necessary.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $resize(action, offsetX = 0, offsetY = 0, aspectRatio = this.aspectRatio) {
        if (!this.resizable) {
            return this;
        }
        const hasValidAspectRatio = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(aspectRatio);
        const { $canvas } = this;
        let { x, y, width, height, } = this;
        switch (action) {
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTH:
                y += offsetY;
                height -= offsetY;
                if (height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTH;
                    height = -height;
                    y -= height;
                }
                if (hasValidAspectRatio) {
                    offsetX = offsetY * aspectRatio;
                    x += offsetX / 2;
                    width -= offsetX;
                    if (width < 0) {
                        width = -width;
                        x -= width;
                    }
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_EAST:
                width += offsetX;
                if (width < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_WEST;
                    width = -width;
                    x -= width;
                }
                if (hasValidAspectRatio) {
                    offsetY = offsetX / aspectRatio;
                    y -= offsetY / 2;
                    height += offsetY;
                    if (height < 0) {
                        height = -height;
                        y -= height;
                    }
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTH:
                height += offsetY;
                if (height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTH;
                    height = -height;
                    y -= height;
                }
                if (hasValidAspectRatio) {
                    offsetX = offsetY * aspectRatio;
                    x -= offsetX / 2;
                    width += offsetX;
                    if (width < 0) {
                        width = -width;
                        x -= width;
                    }
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_WEST:
                x += offsetX;
                width -= offsetX;
                if (width < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_EAST;
                    width = -width;
                    x -= width;
                }
                if (hasValidAspectRatio) {
                    offsetY = offsetX / aspectRatio;
                    y += offsetY / 2;
                    height -= offsetY;
                    if (height < 0) {
                        height = -height;
                        y -= height;
                    }
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHEAST:
                if (hasValidAspectRatio) {
                    offsetY = -offsetX / aspectRatio;
                }
                y += offsetY;
                height -= offsetY;
                width += offsetX;
                if (width < 0 && height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHWEST;
                    width = -width;
                    height = -height;
                    x -= width;
                    y -= height;
                }
                else if (width < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHWEST;
                    width = -width;
                    x -= width;
                }
                else if (height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHEAST;
                    height = -height;
                    y -= height;
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHWEST:
                if (hasValidAspectRatio) {
                    offsetY = offsetX / aspectRatio;
                }
                x += offsetX;
                y += offsetY;
                width -= offsetX;
                height -= offsetY;
                if (width < 0 && height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHEAST;
                    width = -width;
                    height = -height;
                    x -= width;
                    y -= height;
                }
                else if (width < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHEAST;
                    width = -width;
                    x -= width;
                }
                else if (height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHWEST;
                    height = -height;
                    y -= height;
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHEAST:
                if (hasValidAspectRatio) {
                    offsetY = offsetX / aspectRatio;
                }
                width += offsetX;
                height += offsetY;
                if (width < 0 && height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHWEST;
                    width = -width;
                    height = -height;
                    x -= width;
                    y -= height;
                }
                else if (width < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHWEST;
                    width = -width;
                    x -= width;
                }
                else if (height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHEAST;
                    height = -height;
                    y -= height;
                }
                break;
            case _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHWEST:
                if (hasValidAspectRatio) {
                    offsetY = -offsetX / aspectRatio;
                }
                x += offsetX;
                width -= offsetX;
                height += offsetY;
                if (width < 0 && height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHEAST;
                    width = -width;
                    height = -height;
                    x -= width;
                    y -= height;
                }
                else if (width < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_SOUTHEAST;
                    width = -width;
                    x -= width;
                }
                else if (height < 0) {
                    action = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_RESIZE_NORTHWEST;
                    height = -height;
                    y -= height;
                }
                break;
        }
        if ($canvas) {
            $canvas.$setAction(action);
        }
        return this.$change(x, y, width, height);
    }
    /**
     * Zooms the selection.
     * @param {number} scale The zoom factor. Positive numbers for zooming in, and negative numbers for zooming out.
     * @param {number} [x] The zoom origin in the horizontal, defaults to the center of the selection.
     * @param {number} [y] The zoom origin in the vertical, defaults to the center of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $zoom(scale, x, y) {
        if (!this.zoomable || scale === 0) {
            return this;
        }
        if (scale < 0) {
            scale = 1 / (1 - scale);
        }
        else {
            scale += 1;
        }
        const { width, height } = this;
        const newWidth = width * scale;
        const newHeight = height * scale;
        let newX = this.x;
        let newY = this.y;
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)) {
            newX -= (newWidth - width) * ((x - this.x) / width);
            newY -= (newHeight - height) * ((y - this.y) / height);
        }
        else {
            // Zoom from the center of the selection
            newX -= (newWidth - width) / 2;
            newY -= (newHeight - height) / 2;
        }
        return this.$change(newX, newY, newWidth, newHeight);
    }
    /**
     * Changes the position and/or size of the selection.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @param {number} [aspectRatio] The new aspect ratio for this change only.
     * @param {number} [_force] Force change.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $change(x, y, width = this.width, height = this.height, aspectRatio = this.aspectRatio, _force = false) {
        if (this.$changing
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x)
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(width)
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(height)
            || width < 0
            || height < 0) {
            return this;
        }
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(aspectRatio)) {
            ({ width, height } = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.getAdjustedSizes)({ aspectRatio, width, height }, 'cover'));
        }
        if (!this.precise) {
            x = Math.round(x);
            y = Math.round(y);
            width = Math.round(width);
            height = Math.round(height);
        }
        if (x === this.x
            && y === this.y
            && width === this.width
            && height === this.height
            && Object.is(aspectRatio, this.aspectRatio)
            && !_force) {
            return this;
        }
        if (this.hidden) {
            this.hidden = false;
        }
        if (this.$emit(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, {
            x,
            y,
            width,
            height,
        }) === false) {
            return this;
        }
        this.$changing = true;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.$changing = false;
        return this.$render();
    }
    /**
     * Resets the selection to its initial position and size.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $reset() {
        const { x, y, width, height, } = this.$initialSelection;
        return this.$change(x, y, width, height);
    }
    /**
     * Clears the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $clear() {
        this.$change(0, 0, 0, 0, NaN, true);
        this.hidden = true;
        return this;
    }
    /**
     * Refreshes the position or size of the selection.
     * @returns {CropperSelection} Returns `this` for chaining.
     */
    $render() {
        return this.$setStyles({
            transform: `translate(${this.x}px, ${this.y}px)`,
            width: this.width,
            height: this.height,
        });
    }
    /**
     * Generates a real canvas element, with the image (selected area only) draw into if there is one.
     * @param {object} [options] The available options.
     * @param {number} [options.width] The width of the canvas.
     * @param {number} [options.height] The height of the canvas.
     * @param {Function} [options.beforeDraw] The function called before drawing the image onto the canvas.
     * @returns {Promise} Returns a promise that resolves to the generated canvas element.
     */
    $toCanvas(options) {
        return new Promise((resolve, reject) => {
            if (!this.isConnected) {
                reject(new Error('The current element is not connected to the DOM.'));
                return;
            }
            const canvas = document.createElement('canvas');
            let { width, height } = this;
            let scale = 1;
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(options)
                && ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(options.width) || (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPositiveNumber)(options.height))) {
                ({ width, height } = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.getAdjustedSizes)({
                    aspectRatio: width / height,
                    width: options.width,
                    height: options.height,
                }));
                scale = width / this.width;
            }
            canvas.width = width;
            canvas.height = height;
            if (!this.$canvas) {
                resolve(canvas);
                return;
            }
            const cropperImage = this.$canvas.querySelector(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_IMAGE));
            if (!cropperImage) {
                resolve(canvas);
                return;
            }
            cropperImage.$ready().then((image) => {
                const context = canvas.getContext('2d');
                if (context) {
                    const [a, b, c, d, e, f] = cropperImage.$getTransform();
                    const offsetX = -this.x;
                    const offsetY = -this.y;
                    const translateX = ((offsetX * d) - (c * offsetY)) / ((a * d) - (c * b));
                    const translateY = ((offsetY * a) - (b * offsetX)) / ((a * d) - (c * b));
                    let newE = a * translateX + c * translateY + e;
                    let newF = b * translateX + d * translateY + f;
                    let destWidth = image.naturalWidth;
                    let destHeight = image.naturalHeight;
                    if (scale !== 1) {
                        newE *= scale;
                        newF *= scale;
                        destWidth *= scale;
                        destHeight *= scale;
                    }
                    const centerX = destWidth / 2;
                    const centerY = destHeight / 2;
                    context.fillStyle = 'transparent';
                    context.fillRect(0, 0, width, height);
                    if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(options) && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isFunction)(options.beforeDraw)) {
                        options.beforeDraw.call(this, context, canvas);
                    }
                    context.save();
                    // Move the transform origin to the center of the image.
                    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
                    context.translate(centerX, centerY);
                    context.transform(a, b, c, d, newE, newF);
                    // Move the transform origin to the top-left of the image.
                    context.translate(-centerX, -centerY);
                    context.drawImage(image, 0, 0, destWidth, destHeight);
                    context.restore();
                }
                resolve(canvas);
            }).catch(reject);
        });
    }
}
CropperSelection.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION;
CropperSelection.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-shade/dist/element-shade.esm.raw.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@cropper/element-shade/dist/element-shade.esm.raw.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperShade)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:block;height:0;left:0;outline:var(--theme-color) solid 1px;position:relative;top:0;width:0}:host([transparent]){outline-color:transparent}`;

const canvasCache = new WeakMap();
class CropperShade extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$onCanvasChange = null;
        this.$onCanvasActionEnd = null;
        this.$onCanvasActionStart = null;
        this.$style = style;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.slottable = false;
        this.themeColor = 'rgba(0, 0, 0, 0.65)';
    }
    set $canvas(element) {
        canvasCache.set(this, element);
    }
    get $canvas() {
        return canvasCache.get(this);
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'height',
            'width',
            'x',
            'y',
        ]);
    }
    connectedCallback() {
        super.connectedCallback();
        const $canvas = this.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_CANVAS));
        if ($canvas) {
            this.$canvas = $canvas;
            this.style.position = 'absolute';
            const $selection = $canvas.querySelector(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION));
            if ($selection) {
                this.$onCanvasActionStart = (event) => {
                    if ($selection.hidden && event.detail.action === _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SELECT) {
                        this.hidden = false;
                    }
                };
                this.$onCanvasActionEnd = (event) => {
                    if ($selection.hidden && event.detail.action === _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.ACTION_SELECT) {
                        this.hidden = true;
                    }
                };
                this.$onCanvasChange = (event) => {
                    const { x, y, width, height, } = event.detail;
                    this.$change(x, y, width, height);
                    if ($selection.hidden || (x === 0 && y === 0 && width === 0 && height === 0)) {
                        this.hidden = true;
                    }
                };
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, this.$onCanvasActionStart);
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, this.$onCanvasActionEnd);
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, this.$onCanvasChange);
            }
        }
        this.$render();
    }
    disconnectedCallback() {
        const { $canvas } = this;
        if ($canvas) {
            if (this.$onCanvasActionStart) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_START, this.$onCanvasActionStart);
                this.$onCanvasActionStart = null;
            }
            if (this.$onCanvasActionEnd) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_ACTION_END, this.$onCanvasActionEnd);
                this.$onCanvasActionEnd = null;
            }
            if (this.$onCanvasChange) {
                (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($canvas, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, this.$onCanvasChange);
                this.$onCanvasChange = null;
            }
        }
        super.disconnectedCallback();
    }
    /**
     * Changes the position and/or size of the shade.
     * @param {number} x The new position in the horizontal direction.
     * @param {number} y The new position in the vertical direction.
     * @param {number} [width] The new width.
     * @param {number} [height] The new height.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $change(x, y, width = this.width, height = this.height) {
        if (!(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(x)
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(y)
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(width)
            || !(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isNumber)(height)
            || (x === this.x && y === this.y && width === this.width && height === this.height)) {
            return this;
        }
        if (this.hidden) {
            this.hidden = false;
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        return this.$render();
    }
    /**
     * Resets the shade to its initial position and size.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $reset() {
        return this.$change(0, 0, 0, 0);
    }
    /**
     * Refreshes the position or size of the shade.
     * @returns {CropperShade} Returns `this` for chaining.
     */
    $render() {
        return this.$setStyles({
            transform: `translate(${this.x}px, ${this.y}px)`,
            width: this.width,
            height: this.height,
            outlineWidth: _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.WINDOW.innerWidth,
        });
    }
}
CropperShade.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SHADE;
CropperShade.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element-viewer/dist/element-viewer.esm.raw.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cropper/element-viewer/dist/element-viewer.esm.raw.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RESIZE_BOTH: () => (/* binding */ RESIZE_BOTH),
/* harmony export */   RESIZE_HORIZONTAL: () => (/* binding */ RESIZE_HORIZONTAL),
/* harmony export */   RESIZE_NONE: () => (/* binding */ RESIZE_NONE),
/* harmony export */   RESIZE_VERTICAL: () => (/* binding */ RESIZE_VERTICAL),
/* harmony export */   "default": () => (/* binding */ CropperViewer)
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");



var style = `:host{display:block;height:100%;overflow:hidden;position:relative;width:100%}`;

const canvasCache = new WeakMap();
const imageCache = new WeakMap();
const selectionCache = new WeakMap();
const sourceImageCache = new WeakMap();
const RESIZE_BOTH = 'both';
const RESIZE_HORIZONTAL = 'horizontal';
const RESIZE_VERTICAL = 'vertical';
const RESIZE_NONE = 'none';
class CropperViewer extends _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        this.$onSelectionChange = null;
        this.$onSourceImageLoad = null;
        this.$onSourceImageTransform = null;
        this.$scale = 1;
        this.$style = style;
        this.resize = RESIZE_VERTICAL;
        this.selection = '';
        this.slottable = false;
    }
    set $image(element) {
        imageCache.set(this, element);
    }
    get $image() {
        return imageCache.get(this);
    }
    set $sourceImage(element) {
        sourceImageCache.set(this, element);
    }
    get $sourceImage() {
        return sourceImageCache.get(this);
    }
    set $canvas(element) {
        canvasCache.set(this, element);
    }
    get $canvas() {
        return canvasCache.get(this);
    }
    set $selection(element) {
        selectionCache.set(this, element);
    }
    get $selection() {
        return selectionCache.get(this);
    }
    static get observedAttributes() {
        return super.observedAttributes.concat([
            'resize',
            'selection',
        ]);
    }
    connectedCallback() {
        super.connectedCallback();
        let $selection = null;
        if (this.selection) {
            $selection = this.ownerDocument.querySelector(this.selection);
        }
        else {
            $selection = this.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_SELECTION));
        }
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.isElement)($selection)) {
            this.$selection = $selection;
            this.$onSelectionChange = this.$handleSelectionChange.bind(this);
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($selection, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, this.$onSelectionChange);
            const $canvas = $selection.closest(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_CANVAS));
            if ($canvas) {
                this.$canvas = $canvas;
                const $sourceImage = $canvas.querySelector(this.$getTagNameOf(_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_IMAGE));
                if ($sourceImage) {
                    this.$sourceImage = $sourceImage;
                    this.$image = $sourceImage.cloneNode(true);
                    this.$getShadowRoot().appendChild(this.$image);
                    this.$onSourceImageLoad = this.$handleSourceImageLoad.bind(this);
                    this.$onSourceImageTransform = this.$handleSourceImageTransform.bind(this);
                    (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($sourceImage.$image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_LOAD, this.$onSourceImageLoad);
                    (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.on)($sourceImage, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_TRANSFORM, this.$onSourceImageTransform);
                }
            }
            this.$render();
        }
    }
    disconnectedCallback() {
        const { $selection, $sourceImage } = this;
        if ($selection && this.$onSelectionChange) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($selection, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_CHANGE, this.$onSelectionChange);
            this.$onSelectionChange = null;
        }
        if ($sourceImage && this.$onSourceImageLoad) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($sourceImage.$image, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_LOAD, this.$onSourceImageLoad);
            this.$onSourceImageLoad = null;
        }
        if ($sourceImage && this.$onSourceImageTransform) {
            (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_1__.off)($sourceImage, _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.EVENT_TRANSFORM, this.$onSourceImageTransform);
            this.$onSourceImageTransform = null;
        }
        super.disconnectedCallback();
    }
    $handleSelectionChange(event) {
        this.$render(event.detail);
    }
    $handleSourceImageLoad() {
        const { $image, $sourceImage } = this;
        const oldSrc = $image.getAttribute('src');
        const newSrc = $sourceImage.getAttribute('src');
        if (newSrc && newSrc !== oldSrc) {
            $image.setAttribute('src', newSrc);
            $image.$ready(() => {
                setTimeout(() => {
                    this.$render();
                }, 50);
            });
        }
    }
    $handleSourceImageTransform(event) {
        this.$render(undefined, event.detail.matrix);
    }
    $render(selection, matrix) {
        const { $canvas, $selection } = this;
        if (!selection && !$selection.hidden) {
            selection = $selection;
        }
        if (!selection || (selection.x === 0
            && selection.y === 0
            && selection.width === 0
            && selection.height === 0)) {
            selection = {
                x: 0,
                y: 0,
                width: $canvas.offsetWidth,
                height: $canvas.offsetHeight,
            };
        }
        const { x, y, width, height, } = selection;
        const styles = {};
        const { clientWidth, clientHeight } = this;
        let newWidth = clientWidth;
        let newHeight = clientHeight;
        let scale = NaN;
        switch (this.resize) {
            case RESIZE_BOTH:
                scale = 1;
                newWidth = width;
                newHeight = height;
                styles.width = width;
                styles.height = height;
                break;
            case RESIZE_HORIZONTAL:
                scale = height > 0 ? clientHeight / height : 0;
                newWidth = width * scale;
                styles.width = newWidth;
                break;
            case RESIZE_VERTICAL:
                scale = width > 0 ? clientWidth / width : 0;
                newHeight = height * scale;
                styles.height = newHeight;
                break;
            case RESIZE_NONE:
            default:
                if (clientWidth > 0) {
                    scale = width > 0 ? clientWidth / width : 0;
                }
                else if (clientHeight > 0) {
                    scale = height > 0 ? clientHeight / height : 0;
                }
        }
        this.$scale = scale;
        this.$setStyles(styles);
        if (this.$sourceImage) {
            this.$transformImageByOffset(matrix !== null && matrix !== void 0 ? matrix : this.$sourceImage.$getTransform(), -x, -y);
        }
    }
    $transformImageByOffset(matrix, x, y) {
        const { $image, $scale, $sourceImage, } = this;
        if ($sourceImage && $image && $scale >= 0) {
            const [a, b, c, d, e, f] = matrix;
            const translateX = ((x * d) - (c * y)) / ((a * d) - (c * b));
            const translateY = ((y * a) - (b * x)) / ((a * d) - (c * b));
            const newE = a * translateX + c * translateY + e;
            const newF = b * translateX + d * translateY + f;
            $image.$ready((image) => {
                this.$setStyles.call($image, {
                    width: image.naturalWidth * $scale,
                    height: image.naturalHeight * $scale,
                });
            });
            $image.$setTransform(a, b, c, d, newE * $scale, newF * $scale);
        }
    }
}
CropperViewer.$name = _cropper_utils__WEBPACK_IMPORTED_MODULE_1__.CROPPER_VIEWER;
CropperViewer.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/element/dist/element.esm.raw.js":
/*!***************************************************************!*\
  !*** ./node_modules/@cropper/element/dist/element.esm.raw.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CropperElement)
/* harmony export */ });
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");


var style = `:host([hidden]){display:none!important}`;

const REGEXP_SUFFIX = /left|top|width|height/i;
const DEFAULT_SHADOW_ROOT_MODE = 'open';
const shadowRoots = new WeakMap();
const styleSheets = new WeakMap();
const tagNames = new Map();
const supportsAdoptedStyleSheets = _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document && Array.isArray(_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.WINDOW.document.adoptedStyleSheets) && "replaceSync" in _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.WINDOW.CSSStyleSheet.prototype;
class CropperElement extends HTMLElement {
    get $sharedStyle() {
        return `${this.themeColor ? `:host{--theme-color: ${this.themeColor};}` : ''}${style}`;
    }
    constructor() {
        var _a, _b;
        super();
        this.shadowRootMode = DEFAULT_SHADOW_ROOT_MODE;
        this.slottable = true;
        const name = (_b = (_a = Object.getPrototypeOf(this)) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.$name;
        if (name) {
            tagNames.set(name, this.tagName.toLowerCase());
        }
    }
    static get observedAttributes() {
        return [
            'shadow-root-mode',
            'slottable',
            'theme-color',
        ];
    }
    // Convert attribute to property
    attributeChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        const propertyName = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(name);
        const oldPropertyValue = this[propertyName];
        let newPropertyValue = newValue;
        switch (typeof oldPropertyValue) {
            case 'boolean':
                newPropertyValue = newValue !== null && newValue !== 'false';
                break;
            case 'number':
                newPropertyValue = Number(newValue);
                break;
        }
        this[propertyName] = newPropertyValue;
        switch (name) {
            case 'theme-color': {
                const styleSheet = styleSheets.get(this);
                const styles = this.$sharedStyle;
                if (styleSheet && styles) {
                    if (supportsAdoptedStyleSheets) {
                        styleSheet.replaceSync(styles);
                    }
                    else {
                        styleSheet.textContent = styles;
                    }
                }
                break;
            }
        }
    }
    // Convert property to attribute
    $propertyChangedCallback(name, oldValue, newValue) {
        if (Object.is(newValue, oldValue)) {
            return;
        }
        name = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toKebabCase)(name);
        switch (typeof newValue) {
            case 'boolean':
                if (newValue === true) {
                    if (!this.hasAttribute(name)) {
                        this.setAttribute(name, '');
                    }
                }
                else {
                    this.removeAttribute(name);
                }
                break;
            case 'number':
                if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isNaN)(newValue)) {
                    newValue = '';
                }
                else {
                    newValue = String(newValue);
                }
            // Fall through
            // case 'string':
            // eslint-disable-next-line no-fallthrough
            default:
                if (newValue) {
                    if (this.getAttribute(name) !== newValue) {
                        this.setAttribute(name, newValue);
                    }
                }
                else {
                    this.removeAttribute(name);
                }
        }
    }
    connectedCallback() {
        // Observe properties after observed attributes
        Object.getPrototypeOf(this).constructor.observedAttributes.forEach((attribute) => {
            const property = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(attribute);
            let value = this[property];
            if (!(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(value)) {
                this.$propertyChangedCallback(property, undefined, value);
            }
            Object.defineProperty(this, property, {
                enumerable: true,
                configurable: true,
                get() {
                    return value;
                },
                set(newValue) {
                    const oldValue = value;
                    value = newValue;
                    this.$propertyChangedCallback(property, oldValue, newValue);
                },
            });
        });
        const shadow = this.attachShadow({
            mode: this.shadowRootMode || DEFAULT_SHADOW_ROOT_MODE,
        });
        if (!this.shadowRoot) {
            shadowRoots.set(this, shadow);
        }
        styleSheets.set(this, this.$addStyles(this.$sharedStyle));
        if (this.$style) {
            this.$addStyles(this.$style);
        }
        if (this.$template) {
            const template = document.createElement('template');
            template.innerHTML = this.$template;
            shadow.appendChild(template.content);
        }
        if (this.slottable) {
            const slot = document.createElement('slot');
            shadow.appendChild(slot);
        }
    }
    disconnectedCallback() {
        if (styleSheets.has(this)) {
            styleSheets.delete(this);
        }
        if (shadowRoots.has(this)) {
            shadowRoots.delete(this);
        }
    }
    // eslint-disable-next-line class-methods-use-this
    $getTagNameOf(name) {
        var _a;
        return (_a = tagNames.get(name)) !== null && _a !== void 0 ? _a : name;
    }
    $setStyles(properties) {
        Object.keys(properties).forEach((property) => {
            let value = properties[property];
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(value)) {
                if (value !== 0 && REGEXP_SUFFIX.test(property)) {
                    value = `${value}px`;
                }
                else {
                    value = String(value);
                }
            }
            this.style[property] = value;
        });
        return this;
    }
    /**
     * Outputs the shadow root of the element.
     * @returns {ShadowRoot} Returns the shadow root.
     */
    $getShadowRoot() {
        return this.shadowRoot || shadowRoots.get(this);
    }
    /**
     * Adds styles to the shadow root.
     * @param {string} styles The styles to add.
     * @returns {CSSStyleSheet|HTMLStyleElement} Returns the generated style sheet.
     */
    $addStyles(styles) {
        let styleSheet;
        const shadow = this.$getShadowRoot();
        if (supportsAdoptedStyleSheets) {
            styleSheet = new CSSStyleSheet();
            styleSheet.replaceSync(styles);
            shadow.adoptedStyleSheets = shadow.adoptedStyleSheets.concat(styleSheet);
        }
        else {
            styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            shadow.appendChild(styleSheet);
        }
        return styleSheet;
    }
    /**
     * Dispatches an event at the element.
     * @param {string} type The name of the event.
     * @param {*} [detail] The data passed when initializing the event.
     * @param {CustomEventInit} [options] The other event options.
     * @returns {boolean} Returns the result value.
     */
    $emit(type, detail, options) {
        return (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.emit)(this, type, detail, options);
    }
    /**
     * Defers the callback to be executed after the next DOM update cycle.
     * @param {Function} [callback] The callback to execute after the next DOM update cycle.
     * @returns {Promise} A promise that resolves to nothing.
     */
    $nextTick(callback) {
        return (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.nextTick)(this, callback);
    }
    /**
     * Defines the constructor as a new custom element.
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define}
     * @param {string|object} [name] The element name.
     * @param {object} [options] The element definition options.
     */
    static $define(name, options) {
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(name)) {
            options = name;
            name = '';
        }
        if (!name) {
            name = this.$name || this.name;
        }
        name = (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toKebabCase)(name);
        if (_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.IS_BROWSER && _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.WINDOW.customElements && !_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.WINDOW.customElements.get(name)) {
            customElements.define(name, this, options);
        }
    }
}
CropperElement.$version = '2.0.0';




/***/ }),

/***/ "./node_modules/@cropper/elements/dist/elements.esm.raw.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@cropper/elements/dist/elements.esm.raw.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CropperCanvas: () => (/* reexport safe */ _cropper_element_canvas__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   CropperCrosshair: () => (/* reexport safe */ _cropper_element_crosshair__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   CropperElement: () => (/* reexport safe */ _cropper_element__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   CropperGrid: () => (/* reexport safe */ _cropper_element_grid__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   CropperHandle: () => (/* reexport safe */ _cropper_element_handle__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   CropperImage: () => (/* reexport safe */ _cropper_element_image__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   CropperSelection: () => (/* reexport safe */ _cropper_element_selection__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   CropperShade: () => (/* reexport safe */ _cropper_element_shade__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   CropperViewer: () => (/* reexport safe */ _cropper_element_viewer__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _cropper_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/element */ "./node_modules/@cropper/element/dist/element.esm.raw.js");
/* harmony import */ var _cropper_element_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/element-canvas */ "./node_modules/@cropper/element-canvas/dist/element-canvas.esm.raw.js");
/* harmony import */ var _cropper_element_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cropper/element-image */ "./node_modules/@cropper/element-image/dist/element-image.esm.raw.js");
/* harmony import */ var _cropper_element_shade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cropper/element-shade */ "./node_modules/@cropper/element-shade/dist/element-shade.esm.raw.js");
/* harmony import */ var _cropper_element_handle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cropper/element-handle */ "./node_modules/@cropper/element-handle/dist/element-handle.esm.raw.js");
/* harmony import */ var _cropper_element_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cropper/element-selection */ "./node_modules/@cropper/element-selection/dist/element-selection.esm.raw.js");
/* harmony import */ var _cropper_element_grid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cropper/element-grid */ "./node_modules/@cropper/element-grid/dist/element-grid.esm.raw.js");
/* harmony import */ var _cropper_element_crosshair__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @cropper/element-crosshair */ "./node_modules/@cropper/element-crosshair/dist/element-crosshair.esm.raw.js");
/* harmony import */ var _cropper_element_viewer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @cropper/element-viewer */ "./node_modules/@cropper/element-viewer/dist/element-viewer.esm.raw.js");











/***/ }),

/***/ "./node_modules/@cropper/utils/dist/utils.esm.raw.js":
/*!***********************************************************!*\
  !*** ./node_modules/@cropper/utils/dist/utils.esm.raw.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTION_MOVE: () => (/* binding */ ACTION_MOVE),
/* harmony export */   ACTION_NONE: () => (/* binding */ ACTION_NONE),
/* harmony export */   ACTION_RESIZE_EAST: () => (/* binding */ ACTION_RESIZE_EAST),
/* harmony export */   ACTION_RESIZE_NORTH: () => (/* binding */ ACTION_RESIZE_NORTH),
/* harmony export */   ACTION_RESIZE_NORTHEAST: () => (/* binding */ ACTION_RESIZE_NORTHEAST),
/* harmony export */   ACTION_RESIZE_NORTHWEST: () => (/* binding */ ACTION_RESIZE_NORTHWEST),
/* harmony export */   ACTION_RESIZE_SOUTH: () => (/* binding */ ACTION_RESIZE_SOUTH),
/* harmony export */   ACTION_RESIZE_SOUTHEAST: () => (/* binding */ ACTION_RESIZE_SOUTHEAST),
/* harmony export */   ACTION_RESIZE_SOUTHWEST: () => (/* binding */ ACTION_RESIZE_SOUTHWEST),
/* harmony export */   ACTION_RESIZE_WEST: () => (/* binding */ ACTION_RESIZE_WEST),
/* harmony export */   ACTION_ROTATE: () => (/* binding */ ACTION_ROTATE),
/* harmony export */   ACTION_SCALE: () => (/* binding */ ACTION_SCALE),
/* harmony export */   ACTION_SELECT: () => (/* binding */ ACTION_SELECT),
/* harmony export */   ACTION_TRANSFORM: () => (/* binding */ ACTION_TRANSFORM),
/* harmony export */   ATTRIBUTE_ACTION: () => (/* binding */ ATTRIBUTE_ACTION),
/* harmony export */   CROPPER_CANVAS: () => (/* binding */ CROPPER_CANVAS),
/* harmony export */   CROPPER_CROSSHAIR: () => (/* binding */ CROPPER_CROSSHAIR),
/* harmony export */   CROPPER_GIRD: () => (/* binding */ CROPPER_GIRD),
/* harmony export */   CROPPER_HANDLE: () => (/* binding */ CROPPER_HANDLE),
/* harmony export */   CROPPER_IMAGE: () => (/* binding */ CROPPER_IMAGE),
/* harmony export */   CROPPER_SELECTION: () => (/* binding */ CROPPER_SELECTION),
/* harmony export */   CROPPER_SHADE: () => (/* binding */ CROPPER_SHADE),
/* harmony export */   CROPPER_VIEWER: () => (/* binding */ CROPPER_VIEWER),
/* harmony export */   EVENT_ACTION: () => (/* binding */ EVENT_ACTION),
/* harmony export */   EVENT_ACTION_END: () => (/* binding */ EVENT_ACTION_END),
/* harmony export */   EVENT_ACTION_MOVE: () => (/* binding */ EVENT_ACTION_MOVE),
/* harmony export */   EVENT_ACTION_START: () => (/* binding */ EVENT_ACTION_START),
/* harmony export */   EVENT_CHANGE: () => (/* binding */ EVENT_CHANGE),
/* harmony export */   EVENT_ERROR: () => (/* binding */ EVENT_ERROR),
/* harmony export */   EVENT_KEYDOWN: () => (/* binding */ EVENT_KEYDOWN),
/* harmony export */   EVENT_LOAD: () => (/* binding */ EVENT_LOAD),
/* harmony export */   EVENT_POINTER_DOWN: () => (/* binding */ EVENT_POINTER_DOWN),
/* harmony export */   EVENT_POINTER_MOVE: () => (/* binding */ EVENT_POINTER_MOVE),
/* harmony export */   EVENT_POINTER_UP: () => (/* binding */ EVENT_POINTER_UP),
/* harmony export */   EVENT_RESIZE: () => (/* binding */ EVENT_RESIZE),
/* harmony export */   EVENT_TOUCH_END: () => (/* binding */ EVENT_TOUCH_END),
/* harmony export */   EVENT_TOUCH_MOVE: () => (/* binding */ EVENT_TOUCH_MOVE),
/* harmony export */   EVENT_TOUCH_START: () => (/* binding */ EVENT_TOUCH_START),
/* harmony export */   EVENT_TRANSFORM: () => (/* binding */ EVENT_TRANSFORM),
/* harmony export */   EVENT_WHEEL: () => (/* binding */ EVENT_WHEEL),
/* harmony export */   HAS_POINTER_EVENT: () => (/* binding */ HAS_POINTER_EVENT),
/* harmony export */   IS_BROWSER: () => (/* binding */ IS_BROWSER),
/* harmony export */   IS_TOUCH_DEVICE: () => (/* binding */ IS_TOUCH_DEVICE),
/* harmony export */   NAMESPACE: () => (/* binding */ NAMESPACE),
/* harmony export */   WINDOW: () => (/* binding */ WINDOW),
/* harmony export */   emit: () => (/* binding */ emit),
/* harmony export */   getAdjustedSizes: () => (/* binding */ getAdjustedSizes),
/* harmony export */   getOffset: () => (/* binding */ getOffset),
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNaN: () => (/* binding */ isNaN),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isPositiveNumber: () => (/* binding */ isPositiveNumber),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined),
/* harmony export */   multiplyMatrices: () => (/* binding */ multiplyMatrices),
/* harmony export */   nextTick: () => (/* binding */ nextTick),
/* harmony export */   off: () => (/* binding */ off),
/* harmony export */   on: () => (/* binding */ on),
/* harmony export */   once: () => (/* binding */ once),
/* harmony export */   toAngleInRadian: () => (/* binding */ toAngleInRadian),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),
/* harmony export */   toKebabCase: () => (/* binding */ toKebabCase)
/* harmony export */ });
const IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const WINDOW = IS_BROWSER ? window : {};
const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
const HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
const NAMESPACE = 'cropper';
const CROPPER_CANVAS = `${NAMESPACE}-canvas`;
const CROPPER_CROSSHAIR = `${NAMESPACE}-crosshair`;
const CROPPER_GIRD = `${NAMESPACE}-grid`;
const CROPPER_HANDLE = `${NAMESPACE}-handle`;
const CROPPER_IMAGE = `${NAMESPACE}-image`;
const CROPPER_SELECTION = `${NAMESPACE}-selection`;
const CROPPER_SHADE = `${NAMESPACE}-shade`;
const CROPPER_VIEWER = `${NAMESPACE}-viewer`;
// Actions
const ACTION_SELECT = 'select';
const ACTION_MOVE = 'move';
const ACTION_SCALE = 'scale';
const ACTION_ROTATE = 'rotate';
const ACTION_TRANSFORM = 'transform';
const ACTION_NONE = 'none';
const ACTION_RESIZE_NORTH = 'n-resize';
const ACTION_RESIZE_EAST = 'e-resize';
const ACTION_RESIZE_SOUTH = 's-resize';
const ACTION_RESIZE_WEST = 'w-resize';
const ACTION_RESIZE_NORTHEAST = 'ne-resize';
const ACTION_RESIZE_NORTHWEST = 'nw-resize';
const ACTION_RESIZE_SOUTHEAST = 'se-resize';
const ACTION_RESIZE_SOUTHWEST = 'sw-resize';
// Attributes
const ATTRIBUTE_ACTION = 'action';
// Native events
const EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
const EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
const EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
const EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
const EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
const EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
const EVENT_ERROR = 'error';
const EVENT_KEYDOWN = 'keydown';
const EVENT_LOAD = 'load';
const EVENT_RESIZE = 'resize';
const EVENT_WHEEL = 'wheel';
// Custom events
const EVENT_ACTION = 'action';
const EVENT_ACTION_END = 'actionend';
const EVENT_ACTION_MOVE = 'actionmove';
const EVENT_ACTION_START = 'actionstart';
const EVENT_CHANGE = 'change';
const EVENT_TRANSFORM = 'transform';

/**
 * Check if the given value is a string.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a string, else `false`.
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Check if the given value is not a number.
 */
const isNaN = Number.isNaN || WINDOW.isNaN;
/**
 * Check if the given value is a number.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a number, else `false`.
 */
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
/**
 * Check if the given value is a positive number.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
 */
function isPositiveNumber(value) {
    return isNumber(value) && value > 0 && value < Infinity;
}
/**
 * Check if the given value is undefined.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}
/**
 * Check if the given value is an object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is an object, else `false`.
 */
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
const { hasOwnProperty } = Object.prototype;
/**
 * Check if the given value is a plain object.
 * @param {*} value - The value to check.
 * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
 */
function isPlainObject(value) {
    if (!isObject(value)) {
        return false;
    }
    try {
        const { constructor } = value;
        const { prototype } = constructor;
        return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    }
    catch (error) {
        return false;
    }
}
/**
 * Check if the given value is a function.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the given value is a function, else `false`.
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Check if the given node is an element.
 * @param {*} node The node to check.
 * @returns {boolean} Returns `true` if the given node is an element; otherwise, `false`.
 */
function isElement(node) {
    return typeof node === 'object' && node !== null && node.nodeType === 1;
}
const REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
/**
 * Transform the given string from camelCase to kebab-case.
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
function toKebabCase(value) {
    return String(value).replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
}
const REGEXP_KEBAB_CASE = /-[A-z\d]/g;
/**
 * Transform the given string from kebab-case to camelCase.
 * @param {string} value The value to transform.
 * @returns {string} Returns the transformed value.
 */
function toCamelCase(value) {
    return value.replace(REGEXP_KEBAB_CASE, (substring) => substring.slice(1).toUpperCase());
}
const REGEXP_SPACES = /\s\s*/;
/**
 * Remove event listener from the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener}
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {EventListenerOptions} [options] The options specify characteristics about the event listener.
 */
function off(target, types, listener, options) {
    types.trim().split(REGEXP_SPACES).forEach((type) => {
        target.removeEventListener(type, listener, options);
    });
}
/**
 * Add event listener to the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener}
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
 */
function on(target, types, listener, options) {
    types.trim().split(REGEXP_SPACES).forEach((type) => {
        target.addEventListener(type, listener, options);
    });
}
/**
 * Add once event listener to the event target.
 * @param {EventTarget} target The target of the event.
 * @param {string} types The types of the event.
 * @param {EventListenerOrEventListenerObject} listener The listener of the event.
 * @param {AddEventListenerOptions} [options] The options specify characteristics about the event listener.
 */
function once(target, types, listener, options) {
    on(target, types, listener, Object.assign(Object.assign({}, options), { once: true }));
}
const defaultEventOptions = {
    bubbles: true,
    cancelable: true,
    composed: true,
};
/**
 * Dispatch event on the event target.
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent}
 * @param {EventTarget} target The target of the event.
 * @param {string} type The name of the event.
 * @param {*} [detail] The data passed when initializing the event.
 * @param {CustomEventInit} [options] The other event options.
 * @returns {boolean} Returns the result value.
 */
function emit(target, type, detail, options) {
    return target.dispatchEvent(new CustomEvent(type, Object.assign(Object.assign(Object.assign({}, defaultEventOptions), { detail }), options)));
}
const resolvedPromise = Promise.resolve();
/**
 * Defers the callback to be executed after the next DOM update cycle.
 * @param {*} [context] The `this` context.
 * @param {Function} [callback] The callback to execute after the next DOM update cycle.
 * @returns {Promise} A promise that resolves to nothing.
 */
function nextTick(context, callback) {
    return callback
        ? resolvedPromise.then(context ? callback.bind(context) : callback)
        : resolvedPromise;
}
/**
 * Get the offset base on the document.
 * @param {Element} element The target element.
 * @returns {object} The offset data.
 */
function getOffset(element) {
    const { documentElement } = element.ownerDocument;
    const box = element.getBoundingClientRect();
    return {
        left: box.left + (WINDOW.pageXOffset - documentElement.clientLeft),
        top: box.top + (WINDOW.pageYOffset - documentElement.clientTop),
    };
}
const REGEXP_ANGLE_UNIT = /deg|g?rad|turn$/i;
/**
 * Convert an angle to a radian number.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/angle}
 * @param {number|string} angle The angle to convert.
 * @returns {number} Returns the radian number.
 */
function toAngleInRadian(angle) {
    const value = parseFloat(angle) || 0;
    if (value !== 0) {
        const [unit = 'rad'] = String(angle).match(REGEXP_ANGLE_UNIT) || [];
        switch (unit.toLowerCase()) {
            case 'deg':
                return (value / 360) * (Math.PI * 2);
            case 'grad':
                return (value / 400) * (Math.PI * 2);
            case 'turn':
                return value * (Math.PI * 2);
        }
    }
    return value;
}
const SIZE_ADJUSTMENT_TYPE_CONTAIN = 'contain';
const SIZE_ADJUSTMENT_TYPE_COVER = 'cover';
/**
 * Get the max sizes in a rectangle under the given aspect ratio.
 * @param {object} data The original sizes.
 * @param {string} [type] The adjust type.
 * @returns {object} Returns the result sizes.
 */
function getAdjustedSizes(data, type = SIZE_ADJUSTMENT_TYPE_CONTAIN) {
    const { aspectRatio } = data;
    let { width, height } = data;
    const isValidWidth = isPositiveNumber(width);
    const isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
        const adjustedWidth = height * aspectRatio;
        if ((type === SIZE_ADJUSTMENT_TYPE_CONTAIN && adjustedWidth > width)
            || (type === SIZE_ADJUSTMENT_TYPE_COVER && adjustedWidth < width)) {
            height = width / aspectRatio;
        }
        else {
            width = height * aspectRatio;
        }
    }
    else if (isValidWidth) {
        height = width / aspectRatio;
    }
    else if (isValidHeight) {
        width = height * aspectRatio;
    }
    return {
        width,
        height,
    };
}
/**
 * Multiply multiple matrices.
 * @param {Array} matrix The first matrix.
 * @param {Array} args The rest matrices.
 * @returns {Array} Returns the result matrix.
 */
function multiplyMatrices(matrix, ...args) {
    if (args.length === 0) {
        return matrix;
    }
    const [a1, b1, c1, d1, e1, f1] = matrix;
    const [a2, b2, c2, d2, e2, f2] = args[0];
    // ┌ a1 c1 e1 ┐   ┌ a2 c2 e2 ┐
    // │ b1 d1 f1 │ × │ b2 d2 f2 │
    // └ 0  0  1  ┘   └ 0  0  1  ┘
    matrix = [
        a1 * a2 + c1 * b2 /* + e1 * 0 */,
        b1 * a2 + d1 * b2 /* + f1 * 0 */,
        a1 * c2 + c1 * d2 /* + e1 * 0 */,
        b1 * c2 + d1 * d2 /* + f1 * 0 */,
        a1 * e2 + c1 * f2 + e1 /* * 1 */,
        b1 * e2 + d1 * f2 + f1 /* * 1 */,
    ];
    return multiplyMatrices(matrix, ...args.slice(1));
}




/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.esm.raw.js":
/*!********************************************************!*\
  !*** ./node_modules/cropperjs/dist/cropper.esm.raw.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTION_MOVE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_MOVE),
/* harmony export */   ACTION_NONE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_NONE),
/* harmony export */   ACTION_RESIZE_EAST: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_EAST),
/* harmony export */   ACTION_RESIZE_NORTH: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_NORTH),
/* harmony export */   ACTION_RESIZE_NORTHEAST: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_NORTHEAST),
/* harmony export */   ACTION_RESIZE_NORTHWEST: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_NORTHWEST),
/* harmony export */   ACTION_RESIZE_SOUTH: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_SOUTH),
/* harmony export */   ACTION_RESIZE_SOUTHEAST: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_SOUTHEAST),
/* harmony export */   ACTION_RESIZE_SOUTHWEST: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_SOUTHWEST),
/* harmony export */   ACTION_RESIZE_WEST: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_RESIZE_WEST),
/* harmony export */   ACTION_ROTATE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_ROTATE),
/* harmony export */   ACTION_SCALE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_SCALE),
/* harmony export */   ACTION_SELECT: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_SELECT),
/* harmony export */   ACTION_TRANSFORM: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ACTION_TRANSFORM),
/* harmony export */   ATTRIBUTE_ACTION: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.ATTRIBUTE_ACTION),
/* harmony export */   CROPPER_CANVAS: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_CANVAS),
/* harmony export */   CROPPER_CROSSHAIR: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_CROSSHAIR),
/* harmony export */   CROPPER_GIRD: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_GIRD),
/* harmony export */   CROPPER_HANDLE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_HANDLE),
/* harmony export */   CROPPER_IMAGE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_IMAGE),
/* harmony export */   CROPPER_SELECTION: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_SELECTION),
/* harmony export */   CROPPER_SHADE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_SHADE),
/* harmony export */   CROPPER_VIEWER: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_VIEWER),
/* harmony export */   CropperCanvas: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperCanvas),
/* harmony export */   CropperCrosshair: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperCrosshair),
/* harmony export */   CropperElement: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperElement),
/* harmony export */   CropperGrid: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperGrid),
/* harmony export */   CropperHandle: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperHandle),
/* harmony export */   CropperImage: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperImage),
/* harmony export */   CropperSelection: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperSelection),
/* harmony export */   CropperShade: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperShade),
/* harmony export */   CropperViewer: () => (/* reexport safe */ _cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperViewer),
/* harmony export */   DEFAULT_TEMPLATE: () => (/* binding */ DEFAULT_TEMPLATE),
/* harmony export */   EVENT_ACTION: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_ACTION),
/* harmony export */   EVENT_ACTION_END: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_ACTION_END),
/* harmony export */   EVENT_ACTION_MOVE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_ACTION_MOVE),
/* harmony export */   EVENT_ACTION_START: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_ACTION_START),
/* harmony export */   EVENT_CHANGE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_CHANGE),
/* harmony export */   EVENT_ERROR: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_ERROR),
/* harmony export */   EVENT_KEYDOWN: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_KEYDOWN),
/* harmony export */   EVENT_LOAD: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_LOAD),
/* harmony export */   EVENT_POINTER_DOWN: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_POINTER_DOWN),
/* harmony export */   EVENT_POINTER_MOVE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_POINTER_MOVE),
/* harmony export */   EVENT_POINTER_UP: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_POINTER_UP),
/* harmony export */   EVENT_RESIZE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_RESIZE),
/* harmony export */   EVENT_TOUCH_END: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_TOUCH_END),
/* harmony export */   EVENT_TOUCH_MOVE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_TOUCH_MOVE),
/* harmony export */   EVENT_TOUCH_START: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_TOUCH_START),
/* harmony export */   EVENT_TRANSFORM: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_TRANSFORM),
/* harmony export */   EVENT_WHEEL: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.EVENT_WHEEL),
/* harmony export */   HAS_POINTER_EVENT: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.HAS_POINTER_EVENT),
/* harmony export */   IS_BROWSER: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.IS_BROWSER),
/* harmony export */   IS_TOUCH_DEVICE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.IS_TOUCH_DEVICE),
/* harmony export */   NAMESPACE: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.NAMESPACE),
/* harmony export */   WINDOW: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.WINDOW),
/* harmony export */   "default": () => (/* binding */ Cropper),
/* harmony export */   emit: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.emit),
/* harmony export */   getAdjustedSizes: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.getAdjustedSizes),
/* harmony export */   getOffset: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.getOffset),
/* harmony export */   isElement: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isElement),
/* harmony export */   isFunction: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isFunction),
/* harmony export */   isNaN: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isNaN),
/* harmony export */   isNumber: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber),
/* harmony export */   isObject: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isObject),
/* harmony export */   isPlainObject: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isPlainObject),
/* harmony export */   isPositiveNumber: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isPositiveNumber),
/* harmony export */   isString: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isString),
/* harmony export */   isUndefined: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isUndefined),
/* harmony export */   multiplyMatrices: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.multiplyMatrices),
/* harmony export */   nextTick: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.nextTick),
/* harmony export */   off: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.off),
/* harmony export */   on: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.on),
/* harmony export */   once: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.once),
/* harmony export */   toAngleInRadian: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toAngleInRadian),
/* harmony export */   toCamelCase: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toCamelCase),
/* harmony export */   toKebabCase: () => (/* reexport safe */ _cropper_utils__WEBPACK_IMPORTED_MODULE_0__.toKebabCase)
/* harmony export */ });
/* harmony import */ var _cropper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cropper/utils */ "./node_modules/@cropper/utils/dist/utils.esm.raw.js");
/* harmony import */ var _cropper_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cropper/elements */ "./node_modules/@cropper/elements/dist/elements.esm.raw.js");
/*! Cropper.js v2.0.0 | (c) 2015-present Chen Fengyuan | MIT */





var DEFAULT_TEMPLATE = ('<cropper-canvas background>'
    + '<cropper-image rotatable scalable skewable translatable></cropper-image>'
    + '<cropper-shade hidden></cropper-shade>'
    + '<cropper-handle action="select" plain></cropper-handle>'
    + '<cropper-selection initial-coverage="0.5" movable resizable>'
    + '<cropper-grid role="grid" bordered covered></cropper-grid>'
    + '<cropper-crosshair centered></cropper-crosshair>'
    + '<cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>'
    + '<cropper-handle action="n-resize"></cropper-handle>'
    + '<cropper-handle action="e-resize"></cropper-handle>'
    + '<cropper-handle action="s-resize"></cropper-handle>'
    + '<cropper-handle action="w-resize"></cropper-handle>'
    + '<cropper-handle action="ne-resize"></cropper-handle>'
    + '<cropper-handle action="nw-resize"></cropper-handle>'
    + '<cropper-handle action="se-resize"></cropper-handle>'
    + '<cropper-handle action="sw-resize"></cropper-handle>'
    + '</cropper-selection>'
    + '</cropper-canvas>');

const REGEXP_ALLOWED_ELEMENTS = /^img|canvas$/;
const REGEXP_BLOCKED_TAGS = /<(\/?(?:script|style)[^>]*)>/gi;
const DEFAULT_OPTIONS = {
    template: DEFAULT_TEMPLATE,
};
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperCanvas.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperCrosshair.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperGrid.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperHandle.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperImage.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperSelection.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperShade.$define();
_cropper_elements__WEBPACK_IMPORTED_MODULE_1__.CropperViewer.$define();
class Cropper {
    constructor(element, options) {
        this.options = DEFAULT_OPTIONS;
        if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(element)) {
            element = document.querySelector(element);
        }
        if (!(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) || !REGEXP_ALLOWED_ELEMENTS.test(element.localName)) {
            throw new Error('The first argument is required and must be an <img> or <canvas> element.');
        }
        this.element = element;
        options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.options = options;
        const { ownerDocument } = element;
        let { container } = options;
        if (container) {
            if ((0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(container)) {
                container = ownerDocument.querySelector(container);
            }
            if (!(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isElement)(container)) {
                throw new Error('The `container` option must be an element or a valid selector.');
            }
        }
        if (!(0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isElement)(container)) {
            if (element.parentElement) {
                container = element.parentElement;
            }
            else {
                container = ownerDocument.body;
            }
        }
        this.container = container;
        const tagName = element.localName;
        let src = '';
        if (tagName === 'img') {
            ({ src } = element);
        }
        else if (tagName === 'canvas' && window.HTMLCanvasElement) {
            src = element.toDataURL();
        }
        const { template } = options;
        if (template && (0,_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(template)) {
            const templateElement = document.createElement('template');
            const documentFragment = document.createDocumentFragment();
            templateElement.innerHTML = template.replace(REGEXP_BLOCKED_TAGS, '&lt;$1&gt;');
            documentFragment.appendChild(templateElement.content);
            Array.from(documentFragment.querySelectorAll(_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_IMAGE)).forEach((image) => {
                image.setAttribute('src', src);
                image.setAttribute('alt', element.alt || 'The image to crop');
            });
            if (element.parentElement) {
                element.style.display = 'none';
                container.insertBefore(documentFragment, element.nextSibling);
            }
            else {
                container.appendChild(documentFragment);
            }
        }
    }
    getCropperCanvas() {
        return this.container.querySelector(_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_CANVAS);
    }
    getCropperImage() {
        return this.container.querySelector(_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_IMAGE);
    }
    getCropperSelection() {
        return this.container.querySelector(_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_SELECTION);
    }
    getCropperSelections() {
        return this.container.querySelectorAll(_cropper_utils__WEBPACK_IMPORTED_MODULE_0__.CROPPER_SELECTION);
    }
}
Cropper.version = '2.0.0';




/***/ }),

/***/ "./platform/core/media/resources/js/App/Config/MediaConfig.js":
/*!********************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Config/MediaConfig.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaConfig: () => (/* binding */ MediaConfig),
/* harmony export */   RecentItems: () => (/* binding */ RecentItems)
/* harmony export */ });
var MediaConfig = $.parseJSON(localStorage.getItem('MediaConfig')) || {};
var defaultConfig = {
  app_key: RV_MEDIA_CONFIG.random_hash ? RV_MEDIA_CONFIG.random_hash : '21d06709fe1d3abdf0e35ddda89c4b282',
  request_params: {
    view_type: 'tiles',
    filter: 'everything',
    view_in: 'all_media',
    sort_by: 'created_at-desc',
    folder_id: 0
  },
  hide_details_pane: false,
  icons: {
    folder: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n            <path d=\"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2\"></path>\n        </svg>"
  },
  actions_list: {
    basic: [{
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\"></path>\n                    <path d=\"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6\"></path>\n                </svg>",
      name: 'Preview',
      action: 'preview',
      order: 0,
      "class": 'rv-action-preview'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M8 5v10a1 1 0 0 0 1 1h10\"></path>\n                    <path d=\"M5 8h10a1 1 0 0 1 1 1v10\"></path>\n                </svg>",
      name: 'Crop',
      action: 'crop',
      order: 1,
      "class": 'rv-action-crop'
    }],
    file: [{
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1\"></path>\n                    <path d=\"M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z\"></path>\n                    <path d=\"M16 5l3 3\"></path>\n                </svg>",
      name: 'Rename',
      action: 'rename',
      order: 0,
      "class": 'rv-action-rename'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z\"></path>\n                    <path d=\"M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2\"></path>\n                </svg>",
      name: 'Make a copy',
      action: 'make_copy',
      order: 1,
      "class": 'rv-action-make-copy'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M15 8h.01\"></path>\n                    <path d=\"M11 20h-4a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v4\"></path>\n                    <path d=\"M4 15l4 -4c.928 -.893 2.072 -.893 3 0l3 3\"></path>\n                    <path d=\"M14 14l1 -1c.31 -.298 .644 -.497 .987 -.596\"></path>\n                    <path d=\"M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z\"></path>\n                </svg>",
      name: 'Alt text',
      action: 'alt_text',
      order: 2,
      "class": 'rv-action-alt-text'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M9 15l6 -6\"></path>\n                    <path d=\"M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464\"></path>\n                    <path d=\"M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463\"></path>\n                </svg>",
      name: 'Copy link',
      action: 'copy_link',
      order: 3,
      "class": 'rv-action-copy-link'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M9 15l6 -6\"></path>\n                    <path d=\"M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464\"></path>\n                    <path d=\"M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463\"></path>\n                </svg>",
      name: 'Copy indirect link',
      action: 'copy_indirect_link',
      order: 4,
      "class": 'rv-action-copy-indirect-link'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                  <path d=\"M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\"></path>\n                  <path d=\"M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\"></path>\n                  <path d=\"M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0\"></path>\n                  <path d=\"M8.7 10.7l6.6 -3.4\"></path>\n                  <path d=\"M8.7 13.3l6.6 3.4\"></path>\n                </svg>",
      name: 'Share',
      action: 'share',
      order: 5,
      "class": 'rv-action-share'
    }],
    user: [{
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z\"></path>\n                </svg>",
      name: 'Favorite',
      action: 'favorite',
      order: 2,
      "class": 'rv-action-favorite'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z\"></path>\n                </svg>",
      name: 'Remove favorite',
      action: 'remove_favorite',
      order: 3,
      "class": 'rv-action-favorite'
    }],
    other: [{
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path>\n                    <path d=\"M7 11l5 5l5 -5\"></path>\n                    <path d=\"M12 4l0 12\"></path>\n                </svg>",
      name: 'Download',
      action: 'download',
      order: 0,
      "class": 'rv-action-download'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M4 7l16 0\"></path>\n                    <path d=\"M10 11l0 6\"></path>\n                    <path d=\"M14 11l0 6\"></path>\n                    <path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\"></path>\n                    <path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\"></path>\n                </svg>",
      name: 'Move to trash',
      action: 'trash',
      order: 1,
      "class": 'rv-action-trash'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3\"></path>\n                    <path d=\"M18 13.3l-6.3 -6.3\"></path>\n                </svg>",
      name: 'Delete permanently',
      action: 'delete',
      order: 2,
      "class": 'rv-action-delete'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1\"></path>\n                </svg>",
      name: 'Restore',
      action: 'restore',
      order: 3,
      "class": 'rv-action-restore'
    }, {
      icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-palette\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/><path d=\"M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25\" /><path d=\"M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /><path d=\"M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /><path d=\"M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" /></svg>",
      name: 'Properties',
      action: 'properties',
      order: 4,
      "class": 'rv-action-properties'
    }]
  }
};
if (!MediaConfig.app_key || MediaConfig.app_key !== defaultConfig.app_key) {
  MediaConfig = defaultConfig;
}
MediaConfig.request_params.search = '';
var RecentItems = $.parseJSON(localStorage.getItem('RecentItems')) || [];


/***/ }),

/***/ "./platform/core/media/resources/js/App/Helpers/Helpers.js":
/*!*****************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Helpers/Helpers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Helpers: () => (/* binding */ Helpers)
/* harmony export */ });
/* harmony import */ var _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config/MediaConfig */ "./platform/core/media/resources/js/App/Config/MediaConfig.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Helpers = /*#__PURE__*/function () {
  function Helpers() {
    _classCallCheck(this, Helpers);
  }
  return _createClass(Helpers, null, [{
    key: "getUrlParam",
    value: function getUrlParam(paramName) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!url) {
        url = window.location.search;
      }
      var reParam = new RegExp('(?:[?&]|&)' + paramName + '=([^&]+)', 'i');
      var match = url.match(reParam);
      return match && match.length > 1 ? match[1] : null;
    }
  }, {
    key: "asset",
    value: function asset(url) {
      if (url.substring(0, 2) === '//' || url.substring(0, 7) === 'http://' || url.substring(0, 8) === 'https://') {
        return url;
      }
      var baseUrl = RV_MEDIA_URL.base_url.substr(-1, 1) !== '/' ? RV_MEDIA_URL.base_url + '/' : RV_MEDIA_URL.base_url;
      if (url.substring(0, 1) === '/') {
        return baseUrl + url.substring(1);
      }
      return baseUrl + url;
    }
  }, {
    key: "showAjaxLoading",
    value: function showAjaxLoading() {
      var $element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('.rv-media-main');
      $element.addClass('on-loading').append($('#rv_media_loading').html());
    }
  }, {
    key: "hideAjaxLoading",
    value: function hideAjaxLoading() {
      var $element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('.rv-media-main');
      $element.removeClass('on-loading').find('.loading-spinner').remove();
    }
  }, {
    key: "isOnAjaxLoading",
    value: function isOnAjaxLoading() {
      var $element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('.rv-media-items');
      return $element.hasClass('on-loading');
    }
  }, {
    key: "jsonEncode",
    value: function jsonEncode(object) {
      if (typeof object === 'undefined') {
        object = null;
      }
      return JSON.stringify(object);
    }
  }, {
    key: "jsonDecode",
    value: function jsonDecode(jsonString, defaultValue) {
      if (!jsonString) {
        return defaultValue;
      }
      if (typeof jsonString === 'string') {
        var result;
        try {
          result = $.parseJSON(jsonString);
        } catch (err) {
          result = defaultValue;
        }
        return result;
      }
      return jsonString;
    }
  }, {
    key: "getRequestParams",
    value: function getRequestParams() {
      if (window.rvMedia.options && window.rvMedia.options.open_in === 'modal') {
        return _objectSpread(_objectSpread({}, _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.MediaConfig.request_params), window.rvMedia.options);
      }
      return _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.MediaConfig.request_params;
    }
  }, {
    key: "setSelectedFile",
    value: function setSelectedFile(fileId) {
      if (typeof window.rvMedia.options !== 'undefined') {
        window.rvMedia.options.selected_file_id = fileId;
      } else {
        _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.MediaConfig.request_params.selected_file_id = fileId;
      }
    }
  }, {
    key: "getConfigs",
    value: function getConfigs() {
      return _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.MediaConfig;
    }
  }, {
    key: "storeConfig",
    value: function storeConfig() {
      localStorage.setItem('MediaConfig', Helpers.jsonEncode(_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.MediaConfig));
    }
  }, {
    key: "storeRecentItems",
    value: function storeRecentItems() {
      localStorage.setItem('RecentItems', Helpers.jsonEncode(_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.RecentItems));
    }
  }, {
    key: "addToRecent",
    value: function addToRecent(id) {
      if (id instanceof Array) {
        Helpers.each(id, function (value) {
          _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.RecentItems.push(value);
        });
      } else {
        _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.RecentItems.push(id);
        this.storeRecentItems();
      }
    }
  }, {
    key: "getItems",
    value: function getItems() {
      var items = [];
      $('.js-media-list-title').each(function (index, el) {
        var $box = $(el);
        var data = $box.data() || {};
        data.index_key = $box.index();
        items.push(data);
      });
      return items;
    }
  }, {
    key: "getSelectedItems",
    value: function getSelectedItems() {
      var selected = [];
      $('.js-media-list-title input[type=checkbox]:checked').each(function (index, el) {
        var $box = $(el).closest('.js-media-list-title');
        var data = $box.data() || {};
        data.index_key = $box.index();
        selected.push(data);
      });
      return selected;
    }
  }, {
    key: "getSelectedFiles",
    value: function getSelectedFiles() {
      var selected = [];
      $('.js-media-list-title[data-context=file] input[type=checkbox]:checked').each(function (index, el) {
        var $box = $(el).closest('.js-media-list-title');
        var data = $box.data() || {};
        data.index_key = $box.index();
        selected.push(data);
      });
      return selected;
    }
  }, {
    key: "getSelectedFolder",
    value: function getSelectedFolder() {
      var selected = [];
      $('.js-media-list-title[data-context=folder] input[type=checkbox]:checked').each(function (index, el) {
        var $box = $(el).closest('.js-media-list-title');
        var data = $box.data() || {};
        data.index_key = $box.index();
        selected.push(data);
      });
      return selected;
    }
  }, {
    key: "isUseInModal",
    value: function isUseInModal() {
      return window.rvMedia && window.rvMedia.options && window.rvMedia.options.open_in === 'modal';
    }
  }, {
    key: "resetPagination",
    value: function resetPagination() {
      RV_MEDIA_CONFIG.pagination = {
        paged: 1,
        posts_per_page: 40,
        in_process_get_media: false,
        has_more: true
      };
    }
  }, {
    key: "trans",
    value: function trans(key) {
      return _.get(RV_MEDIA_CONFIG.translations, key, key);
    }
  }, {
    key: "config",
    value: function config(key) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _.get(RV_MEDIA_CONFIG, key, defaultValue);
    }
  }, {
    key: "hasPermission",
    value: function hasPermission(key) {
      return Helpers.inArray(Helpers.config('permissions', []), key);
    }
  }, {
    key: "inArray",
    value: function inArray(array, value) {
      return _.includes(array, value);
    }
  }, {
    key: "each",
    value: function each(array, callback) {
      return _.each(array, callback);
    }
  }, {
    key: "forEach",
    value: function forEach(array, callback) {
      return _.forEach(array, callback);
    }
  }, {
    key: "arrayReject",
    value: function arrayReject(array, callback) {
      return _.reject(array, callback);
    }
  }, {
    key: "arrayFilter",
    value: function arrayFilter(array, callback) {
      return _.filter(array, callback);
    }
  }, {
    key: "arrayFirst",
    value: function arrayFirst(array) {
      return _.first(array);
    }
  }, {
    key: "isArray",
    value: function isArray(value) {
      return _.isArray(value);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      return _.isEmpty(value);
    }
  }, {
    key: "size",
    value: function size(item) {
      return _.size(item);
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/ActionsService.js":
/*!*************************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/ActionsService.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionsService: () => (/* binding */ ActionsService)
/* harmony export */ });
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cropperjs */ "./node_modules/cropperjs/dist/cropper.esm.raw.js");
/* harmony import */ var _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config/MediaConfig */ "./platform/core/media/resources/js/App/Config/MediaConfig.js");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
/* harmony import */ var _MessageService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageService */ "./platform/core/media/resources/js/App/Services/MessageService.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var ActionsService = /*#__PURE__*/function () {
  function ActionsService() {
    _classCallCheck(this, ActionsService);
  }
  return _createClass(ActionsService, null, [{
    key: "handleDropdown",
    value: function handleDropdown() {
      var selected = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.size(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems());
      ActionsService.renderActions();
      if (selected > 0) {
        $('.rv-dropdown-actions > .dropdown-toggle').removeClass('disabled').prop('disabled', false);
      } else {
        $('.rv-dropdown-actions > .dropdown-toggle').addClass('disabled').prop('disabled', true);
      }
    }
  }, {
    key: "handlePreview",
    value: function handlePreview() {
      var selected = [];
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles(), function (value) {
        if (value.preview_url) {
          if (value.type === 'document') {
            var iframe = document.createElement('iframe');
            iframe.src = value.preview_url;
            iframe.allowFullscreen = true;
            iframe.style.width = '100vh';
            iframe.style.height = '100vh';
            selected.push(iframe);
          } else {
            selected.push(value.preview_url);
          }
          _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.RecentItems.push(value.id);
        }
      });
      if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.size(selected) > 0) {
        Botble.lightbox(selected);
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.storeRecentItems();
      } else {
        this.handleGlobalAction('download');
      }
    }
  }, {
    key: "renderCropImage",
    value: function renderCropImage() {
      var html = $('#rv_media_crop_image').html();
      var modal = $('#modal_crop_image .crop-image').empty();
      var item = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems()[0];
      var form = $('#modal_crop_image .form-crop');
      var cropData;
      var el = html.replace(/__src__/gi, item.full_url);
      modal.append(el);
      var image = modal.find('img')[0];
      var options = {
        minContainerWidth: 500,
        minContainerHeight: 550,
        dragMode: 'move',
        crop: function crop(event) {
          cropData = event.detail;
          form.find('input[name="image_id"]').val(item.id);
          form.find('input[name="crop_data"]').val(JSON.stringify(cropData));
          setHeight(cropData.height);
          setWidth(cropData.width);
        }
      };
      var cropper = new cropperjs__WEBPACK_IMPORTED_MODULE_0__["default"](image, options);
      form.find('#aspectRatio').on('click', function () {
        cropper.destroy();
        if ($(this).is(':checked')) {
          options.aspectRatio = cropData.width / cropData.height;
        } else {
          options.aspectRatio = null;
        }
        cropper = new cropperjs__WEBPACK_IMPORTED_MODULE_0__["default"](image, options);
      });
      form.find('#dataHeight').on('change', function () {
        cropData.height = parseFloat($(this).val());
        cropper.setData(cropData);
        setHeight(cropData.height);
      });
      form.find('#dataWidth').on('change', function () {
        cropData.width = parseFloat($(this).val());
        cropper.setData(cropData);
        setWidth(cropData.width);
      });
      var setHeight = function setHeight(height) {
        form.find('#dataHeight').val(parseInt(height));
      };
      var setWidth = function setWidth(width) {
        form.find('#dataWidth').val(parseInt(width));
      };
    }
  }, {
    key: "handleCopyLink",
    value: function () {
      var _handleCopyLink = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var links;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              links = '';
              _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles(), function (value) {
                if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.isEmpty(links)) {
                  links += '\n';
                }
                links += value.full_url;
              });
              _context.next = 4;
              return Botble.copyToClipboard(links);
            case 4:
              _MessageService__WEBPACK_IMPORTED_MODULE_3__.MessageService.showMessage('success', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('clipboard.success'), _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('message.success_header'));
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function handleCopyLink() {
        return _handleCopyLink.apply(this, arguments);
      }
      return handleCopyLink;
    }()
  }, {
    key: "handleCopyIndirectLink",
    value: function () {
      var _handleCopyIndirectLink = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var links;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              links = '';
              _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles(), function (value) {
                if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.isEmpty(links)) {
                  links += '\n';
                }
                links += value.indirect_url;
              });
              _context2.next = 4;
              return Botble.copyToClipboard(links);
            case 4:
              _MessageService__WEBPACK_IMPORTED_MODULE_3__.MessageService.showMessage('success', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('clipboard.success'), _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('message.success_header'));
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function handleCopyIndirectLink() {
        return _handleCopyIndirectLink.apply(this, arguments);
      }
      return handleCopyIndirectLink;
    }()
  }, {
    key: "handleShare",
    value: function handleShare() {
      $('#modal_share_items').modal('show').find('form.form-alt-text').data('action', type);
    }
  }, {
    key: "handleGlobalAction",
    value: function handleGlobalAction(type, callback) {
      var selected = [];
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems(), function (value) {
        selected.push({
          is_folder: value.is_folder,
          id: value.id,
          full_url: value.full_url
        });
      });
      switch (type) {
        case 'rename':
          $('#modal_rename_items').modal('show').find('form.form-rename').data('action', type);
          break;
        case 'copy_link':
          ActionsService.handleCopyLink().then(function () {});
          break;
        case 'copy_indirect_link':
          ActionsService.handleCopyIndirectLink().then(function () {});
          break;
        case 'share':
          $('#modal_share_items').modal('show');
          break;
        case 'preview':
          ActionsService.handlePreview();
          break;
        case 'alt_text':
          $('#modal_alt_text_items').modal('show').find('form.form-alt-text').data('action', type);
          break;
        case 'crop':
          $('#modal_crop_image').modal('show').find('form.rv-form').data('action', type);
          break;
        case 'trash':
          $('#modal_trash_items').modal('show').find('form.form-delete-items').data('action', type);
          break;
        case 'delete':
          $('#modal_delete_items').modal('show').find('form.form-delete-items').data('action', type);
          break;
        case 'empty_trash':
          $('#modal_empty_trash').modal('show').find('form.form-empty-trash').data('action', type);
          break;
        case 'download':
          var files = [];
          _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems(), function (value) {
            if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getConfigs().denied_download, value.mime_type)) {
              files.push({
                id: value.id,
                is_folder: value.is_folder
              });
            }
          });
          if (files.length) {
            ActionsService.handleDownload(files);
          } else {
            _MessageService__WEBPACK_IMPORTED_MODULE_3__.MessageService.showMessage('error', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('download.error'), _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('message.error_header'));
          }
          break;
        case 'properties':
          $('#modal-properties').modal('show');
          break;
        default:
          ActionsService.processAction({
            selected: selected,
            action: type
          }, callback);
          break;
      }
    }
  }, {
    key: "processAction",
    value: function processAction(data) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.showAjaxLoading();
      $httpClient.make().post(RV_MEDIA_URL.global_actions, data).then(function (_ref) {
        var data = _ref.data;
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
        _MessageService__WEBPACK_IMPORTED_MODULE_3__.MessageService.showMessage('success', data.message, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('message.success_header'));
        callback && callback(data);
      })["catch"](function (_ref2) {
        var response = _ref2.response;
        return callback && callback(response.data);
      })["finally"](function () {
        return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hideAjaxLoading();
      });
    }
  }, {
    key: "renderRenameItems",
    value: function renderRenameItems() {
      var VIEW = $('#rv_media_rename_item').html();
      var $itemsWrapper = $('#modal_rename_items .rename-items').empty();
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems(), function (value) {
        var item = VIEW.replace(/__icon__/gi, value.icon || "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2\"></path>\n                </svg>").replace(/__placeholder__/gi, 'Input file name').replace(/__value__/gi, value.name);
        var $item = $(item);
        $item.data('id', value.id.toString());
        $item.data('is_folder', value.is_folder);
        $item.data('name', value.name);
        var $renamePhysicalFile = $item.find('input[name="rename_physical_file"]');
        $renamePhysicalFile.closest('.form-check').find('span').text(value.is_folder ? $renamePhysicalFile.data('folder-label') : $renamePhysicalFile.data('file-label'));
        $item.find('input[name="rename_physical_file"]').on('change', function () {
          $item.data('rename_physical_file', $(this).is(':checked'));
        });
        $itemsWrapper.append($item);
        Botble.initFieldCollapse();
      });
    }
  }, {
    key: "renderAltTextItems",
    value: function renderAltTextItems() {
      var VIEW = $('#rv_media_alt_text_item').html();
      var $itemsWrapper = $('#modal_alt_text_items .alt-text-items').empty();
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems(), function (value) {
        var item = VIEW.replace(/__icon__/gi, value.icon || "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2\"></path>\n                </svg>").replace(/__placeholder__/gi, 'Input file alt').replace(/__value__/gi, value.alt === null ? '' : value.alt);
        var $item = $(item);
        $item.data('id', value.id);
        $item.data('alt', value.alt);
        $itemsWrapper.append($item);
      });
    }
  }, {
    key: "renderShareItems",
    value: function renderShareItems() {
      var target = $('#modal_share_items [data-bb-value="share-result"]');
      var shareType = $('#modal_share_items select[data-bb-value="share-type"]').val();
      target.val('');
      var results = [];
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems(), function (value) {
        switch (shareType) {
          case 'html':
            results.push(value.type === 'image' ? "<img src=\"".concat(value.full_url, "\" alt=\"").concat(value.alt, "\" />") : "<a href=\"".concat(value.full_url, "\" target=\"_blank\">").concat(value.alt, "</a>"));
            break;
          case 'markdown':
            results.push((value.type === 'image' ? '!' : '') + "[".concat(value.alt, "](").concat(value.full_url, ")"));
            break;
          case 'indirect_url':
            results.push(value.indirect_url);
            break;
          default:
            results.push(value.full_url);
        }
      });
      target.val(results.join('\n'));
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var hasFolderSelected = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFolder().length > 0;
      var ACTION_TEMPLATE = $('#rv_action_item').html();
      var initializedItem = 0;
      var $dropdownActions = $('.rv-dropdown-actions .dropdown-menu');
      $dropdownActions.empty();
      var actionsList = $.extend({}, true, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getConfigs().actions_list);
      if (hasFolderSelected) {
        var ignoreActions = ['preview', 'crop', 'alt_text', 'copy_link', 'copy_direct_link', 'share'];
        actionsList.basic = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.basic, function (item) {
          return ignoreActions.includes(item.action);
        });
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('folders.create')) {
          actionsList.file = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.file, function (item) {
            return item.action === 'make_copy';
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('folders.edit')) {
          actionsList.file = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.file, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['rename'], item.action);
          });
          actionsList.user = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.user, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['rename'], item.action);
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('folders.trash')) {
          actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['trash', 'restore'], item.action);
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('folders.destroy')) {
          actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['delete'], item.action);
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('folders.favorite')) {
          actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['favorite', 'remove_favorite'], item.action);
          });
        }
      }
      var selectedFiles = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles();
      var canPreview = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayFilter(selectedFiles, function (value) {
        return value.preview_url;
      }).length;
      if (!canPreview) {
        actionsList.basic = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.basic, function (item) {
          return item.action === 'preview';
        });
      }
      var fileIsImage = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayFilter(selectedFiles, function (value) {
        return value.type === 'image';
      }).length;
      if (!fileIsImage) {
        actionsList.basic = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.basic, function (item) {
          return item.action === 'crop';
        });
        actionsList.file = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.file, function (item) {
          return item.action === 'alt_text';
        });
      }
      if (selectedFiles.length > 0) {
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('files.create')) {
          actionsList.file = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.file, function (item) {
            return item.action === 'make_copy';
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('files.edit')) {
          actionsList.file = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.file, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['rename'], item.action);
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('files.trash')) {
          actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['trash', 'restore'], item.action);
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('files.destroy')) {
          actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['delete'], item.action);
          });
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('files.favorite')) {
          actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
            return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['favorite', 'remove_favorite'], item.action);
          });
        }
        if (selectedFiles.length > 1) {
          actionsList.basic = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.basic, function (item) {
            return item.action === 'crop';
          });
        }
      }
      if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.hasPermission('folders.edit') || selectedFiles.length > 0) {
        actionsList.other = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayReject(actionsList.other, function (item) {
          return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['properties'], item.action);
        });
      }
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(actionsList, function (action, key) {
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(action, function (item, index) {
          var is_break = false;
          switch (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().view_in) {
            case 'all_media':
              if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['remove_favorite', 'delete', 'restore'], item.action)) {
                is_break = true;
              }
              break;
            case 'recent':
              if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['remove_favorite', 'delete', 'restore', 'make_copy'], item.action)) {
                is_break = true;
              }
              break;
            case 'favorites':
              if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['favorite', 'delete', 'restore', 'make_copy'], item.action)) {
                is_break = true;
              }
              break;
            case 'trash':
              if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(['preview', 'delete', 'restore', 'rename', 'download'], item.action)) {
                is_break = true;
              }
              break;
          }
          if (!is_break) {
            var template = ACTION_TEMPLATE.replace(/__action__/gi, item.action || '').replace('<i class="__icon__ dropdown-item-icon dropdown-item-icon"></i>', '<span class="icon-tabler-wrapper dropdown-item-icon">__icon__</span>').replace('__icon__', '<span class="icon-tabler-wrapper dropdown-item-icon">__icon__</span>').replace('__icon__', item.icon || '').replace(/__name__/gi, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans("actions_list.".concat(key, ".").concat(item.action)) || item.name);
            if (item.icon) {
              template = template.replace('media-icon', 'media-icon dropdown-item-icon');
            }
            if (!index && initializedItem) {
              template = "<li role=\"separator\" class=\"divider\"></li>".concat(template);
            }
            $dropdownActions.append(template);
          }
        });
        if (action.length > 0) {
          initializedItem++;
        }
      });
    }
  }, {
    key: "handleDownload",
    value: function handleDownload(files) {
      var html = $('.media-download-popup');
      var downloadTimeout = null;
      html.show();
      $httpClient.make().withResponseType('blob').post(RV_MEDIA_URL.download, {
        selected: files
      }).then(function (response) {
        var fileName = (response.headers['content-disposition'] || '').split('filename=')[1].split(';')[0];
        var objectUrl = URL.createObjectURL(response.data);
        var a = document.createElement('a');
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
      })["finally"](function () {
        html.hide();
        clearTimeout(downloadTimeout);
      });
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/ContextMenuService.js":
/*!*****************************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/ContextMenuService.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContextMenuService: () => (/* binding */ ContextMenuService)
/* harmony export */ });
/* harmony import */ var _ActionsService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionsService */ "./platform/core/media/resources/js/App/Services/ActionsService.js");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var ContextMenuService = /*#__PURE__*/function () {
  function ContextMenuService() {
    _classCallCheck(this, ContextMenuService);
  }
  return _createClass(ContextMenuService, null, [{
    key: "initContext",
    value: function initContext() {
      if (jQuery().contextMenu) {
        $.contextMenu({
          selector: '.js-context-menu[data-context="file"]',
          build: function build() {
            return {
              items: ContextMenuService._fileContextMenu()
            };
          }
        });
        $.contextMenu({
          selector: '.js-context-menu[data-context="folder"]',
          build: function build() {
            return {
              items: ContextMenuService._folderContextMenu()
            };
          }
        });
      }
    }
  }, {
    key: "_fileContextMenu",
    value: function _fileContextMenu() {
      var items = {
        preview: {
          name: 'Preview',
          icon: function icon(opt, $itemElement, itemKey, item) {
            $itemElement.html("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                        <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                        <path d=\"M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\"></path>\n                        <path d=\"M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6\"></path>\n                    </svg> ".concat(item.name));
            return 'context-menu-icon-updated';
          },
          callback: function callback() {
            _ActionsService__WEBPACK_IMPORTED_MODULE_0__.ActionsService.handlePreview();
          }
        }
      };
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.each(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getConfigs().actions_list, function (actionGroup, key) {
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.each(actionGroup, function (value) {
          items[value.action] = {
            name: value.name,
            icon: function icon(opt, $itemElement, itemKey, item) {
              $itemElement.html("".concat(value.icon, " ").concat(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.trans("actions_list.".concat(key, ".").concat(value.action)) || item.name));
              return "context-menu-icon-updated media-action-".concat(value.action);
            },
            callback: function callback() {
              $(".js-files-action[data-action=\"".concat(value.action, "\"]")).trigger('click');
            }
          };
        });
      });
      var except = [];
      switch (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getRequestParams().view_in) {
        case 'all_media':
          except = ['remove_favorite', 'delete', 'restore'];
          break;
        case 'recent':
          except = ['remove_favorite', 'delete', 'restore', 'make_copy'];
          break;
        case 'favorites':
          except = ['favorite', 'delete', 'restore', 'make_copy'];
          break;
        case 'trash':
          items = {
            preview: items.preview,
            rename: items.rename,
            download: items.download,
            "delete": items["delete"],
            restore: items.restore
          };
          break;
      }
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.each(except, function (value) {
        items[value] = undefined;
      });
      var hasFolderSelected = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getSelectedFolder().length > 0;
      if (hasFolderSelected) {
        items.preview = undefined;
        items.crop = undefined;
        items.copy_link = undefined;
        items.copy_indirect_link = undefined;
        items.share = undefined;
        items.alt_text = undefined;
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('folders.create')) {
          items.make_copy = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('folders.edit')) {
          items.rename = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('folders.trash')) {
          items.trash = undefined;
          items.restore = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('folders.destroy')) {
          items["delete"] = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('folders.favorite')) {
          items.favorite = undefined;
          items.remove_favorite = undefined;
        }
      }
      var selectedFiles = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getSelectedFiles();
      if (selectedFiles.length > 0) {
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('files.create')) {
          items.make_copy = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('files.edit')) {
          items.rename = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('files.trash')) {
          items.trash = undefined;
          items.restore = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('files.destroy')) {
          items["delete"] = undefined;
        }
        if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('files.favorite')) {
          items.favorite = undefined;
          items.remove_favorite = undefined;
        }
        if (selectedFiles.length > 1) {
          items.crop = undefined;
        }
        items.properties = undefined;
      }
      var canPreview = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.arrayFilter(selectedFiles, function (value) {
        return value.preview_url;
      }).length;
      if (!canPreview) {
        items.preview = undefined;
      }
      var fileIsImage = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.arrayFilter(selectedFiles, function (value) {
        return value.type === 'image';
      }).length;
      if (!fileIsImage) {
        items.crop = undefined;
        items.alt_text = undefined;
      }
      if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.arrayFilter(selectedFiles, function (value) {
        return value.full_url;
      }).length) {
        items.copy_link = undefined;
      }
      return items;
    }
  }, {
    key: "_folderContextMenu",
    value: function _folderContextMenu() {
      var items = ContextMenuService._fileContextMenu();
      items.preview = undefined;
      items.copy_link = undefined;
      return items;
    }
  }, {
    key: "destroyContext",
    value: function destroyContext() {
      if (jQuery().contextMenu) {
        $.contextMenu('destroy');
      }
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/DownloadService.js":
/*!**************************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/DownloadService.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DownloadService: () => (/* binding */ DownloadService)
/* harmony export */ });
/* harmony import */ var _MediaService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaService */ "./platform/core/media/resources/js/App/Services/MediaService.js");
/* harmony import */ var _MessageService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageService */ "./platform/core/media/resources/js/App/Services/MessageService.js");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var DownloadService = /*#__PURE__*/function () {
  function DownloadService() {
    _classCallCheck(this, DownloadService);
    this.MediaService = new _MediaService__WEBPACK_IMPORTED_MODULE_0__.MediaService();
    $(document).on('shown.bs.modal', '#modal_download_url', function (event) {
      $(event.currentTarget).find('.form-download-url input[type=text]').focus();
    });
  }
  return _createClass(DownloadService, [{
    key: "download",
    value: function () {
      var _download = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(urls, onProgress, onCompleted) {
        var _self, index, hasError, _iterator, _step, _loop;
        return _regeneratorRuntime().wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _self = this;
              urls = $.trim(urls).split(/\r?\n/);
              index = 0;
              hasError = false;
              _iterator = _createForOfIteratorHelper(urls);
              _context2.prev = 5;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                var url, filename, ok;
                return _regeneratorRuntime().wrap(function _loop$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      url = _step.value;
                      filename = '';
                      try {
                        filename = new URL(url).pathname.split('/').pop();
                      } catch (e) {
                        filename = url;
                      }
                      ok = onProgress("".concat(index, " / ").concat(urls.length), filename, url);
                      _context.next = 6;
                      return new Promise(function (resolve, reject) {
                        $httpClient.make().post(RV_MEDIA_URL.download_url, {
                          folderId: _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().folder_id,
                          url: url
                        }).then(function (_ref) {
                          var _data$data;
                          var data = _ref.data;
                          ok(true, data.message || ((_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.message));
                          resolve();
                        })["finally"](function () {
                          return onCompleted();
                        })["catch"](function (error) {
                          return reject(error);
                        });
                      });
                    case 6:
                      index += 1;
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }, _loop);
              });
              _iterator.s();
            case 8:
              if ((_step = _iterator.n()).done) {
                _context2.next = 12;
                break;
              }
              return _context2.delegateYield(_loop(), "t0", 10);
            case 10:
              _context2.next = 8;
              break;
            case 12:
              _context2.next = 17;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t1 = _context2["catch"](5);
              _iterator.e(_context2.t1);
            case 17:
              _context2.prev = 17;
              _iterator.f();
              return _context2.finish(17);
            case 20:
              _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
              _self.MediaService.getMedia(true);
              if (!hasError) {
                DownloadService.closeModal();
                _MessageService__WEBPACK_IMPORTED_MODULE_1__.MessageService.showMessage('success', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.trans('message.success_header'));
              }
            case 23:
            case "end":
              return _context2.stop();
          }
        }, _callee, this, [[5, 14, 17, 20]]);
      }));
      function download(_x, _x2, _x3) {
        return _download.apply(this, arguments);
      }
      return download;
    }()
  }], [{
    key: "closeModal",
    value: function closeModal() {
      $(document).find('#modal_download_url').modal('hide');
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/FolderService.js":
/*!************************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/FolderService.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FolderService: () => (/* binding */ FolderService)
/* harmony export */ });
/* harmony import */ var _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config/MediaConfig */ "./platform/core/media/resources/js/App/Config/MediaConfig.js");
/* harmony import */ var _MediaService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaService */ "./platform/core/media/resources/js/App/Services/MediaService.js");
/* harmony import */ var _MessageService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageService */ "./platform/core/media/resources/js/App/Services/MessageService.js");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var FolderService = /*#__PURE__*/function () {
  function FolderService() {
    _classCallCheck(this, FolderService);
    this.MediaService = new _MediaService__WEBPACK_IMPORTED_MODULE_1__.MediaService();
    $(document).on('shown.bs.modal', '#modal_add_folder', function (event) {
      $(event.currentTarget).find('form input[type=text]').focus();
    });
  }
  return _createClass(FolderService, [{
    key: "create",
    value: function create(folderName) {
      var _self = this;
      $httpClient.make().withButtonLoading($(document).find('#modal_add_folder button[type=submit]')).post(RV_MEDIA_URL.create_folder, {
        parent_id: _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_3__.Helpers.getRequestParams().folder_id,
        name: folderName
      }).then(function (_ref) {
        var data = _ref.data;
        _MessageService__WEBPACK_IMPORTED_MODULE_2__.MessageService.showMessage('success', data.message, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_3__.Helpers.trans('message.success_header'));
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_3__.Helpers.resetPagination();
        _self.MediaService.getMedia(true);
        FolderService.closeModal();
      });
    }
  }, {
    key: "changeFolder",
    value: function changeFolder(folderId) {
      _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.MediaConfig.request_params.folder_id = folderId;
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_3__.Helpers.storeConfig();
      this.MediaService.getMedia(true);
    }
  }], [{
    key: "closeModal",
    value: function closeModal() {
      $(document).find('#modal_add_folder').modal('hide');
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/MediaService.js":
/*!***********************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/MediaService.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaService: () => (/* binding */ MediaService)
/* harmony export */ });
/* harmony import */ var _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Config/MediaConfig */ "./platform/core/media/resources/js/App/Config/MediaConfig.js");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
/* harmony import */ var _ActionsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActionsService */ "./platform/core/media/resources/js/App/Services/ActionsService.js");
/* harmony import */ var _ContextMenuService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ContextMenuService */ "./platform/core/media/resources/js/App/Services/ContextMenuService.js");
/* harmony import */ var _Views_MediaList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Views/MediaList */ "./platform/core/media/resources/js/App/Views/MediaList.js");
/* harmony import */ var _Views_MediaDetails__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Views/MediaDetails */ "./platform/core/media/resources/js/App/Views/MediaDetails.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }






var MediaService = /*#__PURE__*/function () {
  function MediaService() {
    _classCallCheck(this, MediaService);
    this.MediaList = new _Views_MediaList__WEBPACK_IMPORTED_MODULE_4__.MediaList();
    this.MediaDetails = new _Views_MediaDetails__WEBPACK_IMPORTED_MODULE_5__.MediaDetails();
    this.breadcrumbTemplate = $('#rv_media_breadcrumb_item').html();
  }
  return _createClass(MediaService, [{
    key: "getMedia",
    value: function getMedia() {
      var reload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var is_popup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var load_more_file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (typeof RV_MEDIA_CONFIG.pagination != 'undefined') {
        if (RV_MEDIA_CONFIG.pagination.in_process_get_media) {
          return;
        }
        RV_MEDIA_CONFIG.pagination.in_process_get_media = true;
      }
      var _self = this;
      _self.getFileDetails({
        icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                <path d=\"M15 8h.01\"></path>\n                <path d=\"M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z\"></path>\n                <path d=\"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5\"></path>\n                <path d=\"M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3\"></path>\n            </svg>",
        nothing_selected: ''
      });
      var params = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getRequestParams();
      if (params.view_in === 'recent') {
        params = _objectSpread(_objectSpread({}, params), {}, {
          recent_items: _Config_MediaConfig__WEBPACK_IMPORTED_MODULE_0__.RecentItems
        });
      }
      if (is_popup === true) {
        params = _objectSpread(_objectSpread({}, params), {}, {
          is_popup: true
        });
      } else {
        params = _objectSpread(_objectSpread({}, params), {}, {
          is_popup: undefined
        });
      }
      params = _objectSpread(_objectSpread({}, params), {}, {
        onSelectFiles: undefined
      });
      if (typeof params.search != 'undefined' && params.search !== '' && typeof params.selected_file_id != 'undefined') {
        params = _objectSpread(_objectSpread({}, params), {}, {
          selected_file_id: undefined
        });
      }
      params = _objectSpread(_objectSpread({}, params), {}, {
        load_more_file: load_more_file
      });
      if (typeof RV_MEDIA_CONFIG.pagination != 'undefined') {
        params = _objectSpread(_objectSpread({}, params), {}, {
          paged: RV_MEDIA_CONFIG.pagination.paged,
          posts_per_page: RV_MEDIA_CONFIG.pagination.posts_per_page
        });
      }
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.showAjaxLoading();
      $httpClient.make().get(RV_MEDIA_URL.get_media, params).then(function (_ref) {
        var data = _ref.data;
        _self.MediaList.renderData(data.data, reload, load_more_file);
        _self.renderBreadcrumbs(data.data.breadcrumbs);
        MediaService.refreshFilter();
        _ActionsService__WEBPACK_IMPORTED_MODULE_2__.ActionsService.renderActions();
        if (typeof RV_MEDIA_CONFIG.pagination != 'undefined') {
          if (typeof RV_MEDIA_CONFIG.pagination.paged != 'undefined') {
            RV_MEDIA_CONFIG.pagination.paged += 1;
          }
          if (typeof RV_MEDIA_CONFIG.pagination.in_process_get_media != 'undefined') {
            RV_MEDIA_CONFIG.pagination.in_process_get_media = false;
          }
          if (typeof RV_MEDIA_CONFIG.pagination.posts_per_page != 'undefined' && data.data.files.length + data.data.folders.length < RV_MEDIA_CONFIG.pagination.posts_per_page && typeof RV_MEDIA_CONFIG.pagination.has_more != 'undefined') {
            RV_MEDIA_CONFIG.pagination.has_more = false;
          }
        }
      })["finally"](function () {
        return _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hideAjaxLoading();
      });
    }
  }, {
    key: "getFileDetails",
    value: function getFileDetails(data) {
      this.MediaDetails.renderData(data);
    }
  }, {
    key: "renderBreadcrumbs",
    value: function renderBreadcrumbs(breadcrumbItems) {
      var _self = this;
      var $breadcrumbContainer = $('.rv-media-breadcrumb .breadcrumb');
      $breadcrumbContainer.find('li').remove();
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.each(breadcrumbItems, function (value) {
        var template = _self.breadcrumbTemplate;
        template = template.replace(/__name__/gi, value.name || '').replace(/__icon__/gi, (value === null || value === void 0 ? void 0 : value.icon) || "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2\"></path>\n                </svg>").replace(/__folderId__/gi, value.id || 0);
        $breadcrumbContainer.append($(template));
      });
      $('.rv-media-container').attr('data-breadcrumb-count', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.size(breadcrumbItems));
    }
  }], [{
    key: "refreshFilter",
    value: function refreshFilter() {
      var $rvMediaContainer = $('.rv-media-container');
      var viewIn = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getRequestParams().view_in;
      var $actionsTarget = $('.rv-media-actions .btn:not([data-type="refresh"]):not([data-bs-toggle="offcanvas"])');
      if (viewIn !== 'all_media' && !_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getRequestParams().folder_id) {
        $actionsTarget.addClass('disabled');
        $rvMediaContainer.attr('data-allow-upload', 'false');
      } else {
        $actionsTarget.removeClass('disabled');
        $rvMediaContainer.attr('data-allow-upload', 'true');
      }
      $('.rv-media-actions .btn.js-rv-media-change-filter-group').removeClass('disabled');
      var $emptyTrashBtn = $('.rv-media-actions .btn[data-action="empty_trash"]');
      $emptyTrashBtn.hide();
      if (viewIn === 'trash' && _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.size(_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getItems()) > 0) {
        $emptyTrashBtn.removeClass('d-none disabled').show();
      }
      _ContextMenuService__WEBPACK_IMPORTED_MODULE_3__.ContextMenuService.destroyContext();
      _ContextMenuService__WEBPACK_IMPORTED_MODULE_3__.ContextMenuService.initContext();
      $rvMediaContainer.attr('data-view-in', viewIn);
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/MessageService.js":
/*!*************************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/MessageService.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MessageService: () => (/* binding */ MessageService)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MessageService = /*#__PURE__*/function () {
  function MessageService() {
    _classCallCheck(this, MessageService);
  }
  return _createClass(MessageService, null, [{
    key: "showMessage",
    value: function showMessage(type, message) {
      Botble.showNotice(type, message);
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Services/UploadService.js":
/*!************************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Services/UploadService.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UploadService: () => (/* binding */ UploadService)
/* harmony export */ });
/* harmony import */ var _MediaService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaService */ "./platform/core/media/resources/js/App/Services/MediaService.js");
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var UploadService = /*#__PURE__*/function () {
  function UploadService() {
    _classCallCheck(this, UploadService);
    this.$body = $('body');
    this.dropZone = null;
    this.uploadUrl = RV_MEDIA_URL.upload_file;
    this.uploadProgressBox = $('.rv-upload-progress');
    this.uploadProgressContainer = $('.rv-upload-progress .rv-upload-progress-table');
    this.uploadProgressTemplate = $('#rv_media_upload_progress_item').html();
    this.totalQueued = 1;
    this.MediaService = new _MediaService__WEBPACK_IMPORTED_MODULE_0__.MediaService();
    this.totalError = 0;
  }
  return _createClass(UploadService, [{
    key: "init",
    value: function init() {
      if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.hasPermission('files.create') && $('.rv-media-items').length > 0) {
        this.setupDropZone();
      }
      this.handleEvents();
    }
  }, {
    key: "setupDropZone",
    value: function setupDropZone() {
      var _self = this;
      var _dropZoneConfig = this.getDropZoneConfig();
      _self.filesUpload = 0;
      if (_self.dropZone) {
        _self.dropZone.destroy();
      }
      _self.dropZone = new Dropzone(document.querySelector('.rv-media-items'), _objectSpread(_objectSpread({}, _dropZoneConfig), {}, {
        thumbnailWidth: false,
        thumbnailHeight: false,
        parallelUploads: 1,
        autoQueue: true,
        clickable: '.js-dropzone-upload',
        previewsContainer: false,
        sending: function sending(file, xhr, formData) {
          formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
          formData.append('folder_id', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getRequestParams().folder_id);
          formData.append('view_in', _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.getRequestParams().view_in);
          formData.append('path', file.fullPath);
        },
        chunksUploaded: function chunksUploaded(file, done) {
          _self.uploadProgressContainer.find('.progress-percent').html("- <span class=\"text-info\">100%</span>");
          done();
        },
        accept: function accept(file, done) {
          _self.filesUpload++;
          _self.totalError = 0;
          done();
        },
        uploadprogress: function uploadprogress(file, progress, bytesSent) {
          var percent = bytesSent / file.size * 100;
          if (file.upload.chunked && percent > 99) {
            percent = percent - 1;
          }
          var percentShow = (percent > 100 ? '100' : parseInt(percent)) + '%';
          var el = _self.uploadProgressContainer.find('tr').eq(file.index - 1);
          el.find('.progress-percent').html("- <span class=\"text-info\">" + percentShow + "</span>");
        }
      }));
      _self.dropZone.on('addedfile', function (file) {
        file.index = _self.totalQueued;
        _self.totalQueued++;
      });
      _self.dropZone.on('sending', function (file) {
        _self.initProgress(file.name, file.size);
      });
      _self.dropZone.on('complete', function (file) {
        if (file.accepted) {
          _self.changeProgressStatus(file);
        }
        _self.filesUpload = 0;
      });
      _self.dropZone.on('queuecomplete', function () {
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.resetPagination();
        _self.MediaService.getMedia(true);
        if (_self.totalError === 0) {
          setTimeout(function () {
            $('.rv-upload-progress .close-pane').trigger('click');
          }, 5000);
        }
      });
    }
  }, {
    key: "handleEvents",
    value: function handleEvents() {
      var _self = this;
      /**
       * Close upload progress pane
       */
      _self.$body.off('click', '.rv-upload-progress .close-pane').on('click', '.rv-upload-progress .close-pane', function (event) {
        event.preventDefault();
        $('.rv-upload-progress').addClass('hide-the-pane');
        _self.totalError = 0;
        setTimeout(function () {
          $('.rv-upload-progress tr').remove();
          _self.totalQueued = 1;
        }, 300);
      });
    }
  }, {
    key: "initProgress",
    value: function initProgress($fileName, $fileSize) {
      var template = this.uploadProgressTemplate.replace(/__fileName__/gi, $fileName).replace(/__fileSize__/gi, UploadService.formatFileSize($fileSize)).replace(/__status__/gi, 'warning').replace(/__message__/gi, 'Uploading...');
      if (this.checkUploadTotalProgress() && this.uploadProgressContainer.find('tr').length >= 1) {
        return;
      }
      this.uploadProgressContainer.append(template);
      this.uploadProgressBox.removeClass('hide-the-pane');
      this.uploadProgressBox.find('.table').animate({
        scrollTop: this.uploadProgressContainer.height()
      }, 150);
    }
  }, {
    key: "changeProgressStatus",
    value: function changeProgressStatus(file) {
      var _self = this;
      var $progressLine = _self.uploadProgressContainer.find("tr:nth-child(".concat(file.index, ")"));
      var $label = $progressLine.find('.file-status');
      var response = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.jsonDecode(file.xhr.responseText || '', {});
      var isError = response.error === true || file.status === 'error';
      _self.totalError = _self.totalError + (isError ? 1 : 0);
      $label.removeClass('text-success text-danger text-warning');
      $label.addClass(isError ? 'text-danger' : 'text-success');
      $label.html(isError ? 'Error' : 'Uploaded');
      if (isError) {
        $progressLine.find('.progress-percent').html('');
      }
      if (file.status === 'error') {
        if (file.xhr.status === 422) {
          var errorHtml = '';
          $.each(response.errors, function (key, item) {
            errorHtml += "<span class=\"text-danger\">".concat(item, "</span><br>");
          });
          $progressLine.find('.file-error').html(errorHtml);
        } else if (file.xhr.status === 500) {
          $progressLine.find('.file-error').html("<span class=\"text-danger\">".concat(file.xhr.statusText, "</span>"));
        }
        $progressLine.find('.progress-percent').html('');
      } else if (response.error) {
        $progressLine.find('.file-error').html("<span class=\"text-danger\">".concat(response.message, "</span>"));
        $progressLine.find('.progress-percent').html('');
      } else {
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.addToRecent(response.data.id);
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_1__.Helpers.setSelectedFile(response.data.id);
      }
    }
  }, {
    key: "getDropZoneConfig",
    value: function getDropZoneConfig() {
      return {
        url: this.uploadUrl,
        uploadMultiple: !RV_MEDIA_CONFIG.chunk.enabled,
        chunking: RV_MEDIA_CONFIG.chunk.enabled,
        forceChunking: true,
        // forces chunking when file.size < chunkSize
        parallelChunkUploads: false,
        // allows chunks to be uploaded in parallel (this is independent of the parallelUploads option)
        chunkSize: RV_MEDIA_CONFIG.chunk.chunk_size,
        // chunk size 1,000,000 bytes (~1MB)
        retryChunks: true,
        // retry chunks on failure
        retryChunksLimit: 3,
        // retry maximum of 3 times (default is 3)
        timeout: 0,
        // MB,
        maxFilesize: RV_MEDIA_CONFIG.chunk.max_file_size,
        // MB
        maxFiles: null // max files upload,
      };
    }
  }, {
    key: "checkUploadTotalProgress",
    value: function checkUploadTotalProgress() {
      return this.filesUpload === 1;
    }
  }], [{
    key: "formatFileSize",
    value: function formatFileSize(bytes) {
      var si = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var thresh = si ? 1000 : 1024;
      if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
      }
      var units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var u = -1;
      do {
        bytes /= thresh;
        ++u;
      } while (Math.abs(bytes) >= thresh && u < units.length - 1);
      return bytes.toFixed(1) + ' ' + units[u];
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Views/MediaDetails.js":
/*!********************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Views/MediaDetails.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaDetails: () => (/* binding */ MediaDetails)
/* harmony export */ });
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var MediaDetails = /*#__PURE__*/function () {
  function MediaDetails() {
    _classCallCheck(this, MediaDetails);
    this.$detailsWrapper = $('.rv-media-main .rv-media-details');
    this.descriptionItemTemplate = "<div class=\"mb-3 rv-media-name\">\n            <label class=\"form-label\">__title__</label>\n            __url__\n        </div>";
    this.onlyFields = ['name', 'alt', 'full_url', 'size', 'mime_type', 'created_at', 'updated_at', 'nothing_selected'];
  }
  return _createClass(MediaDetails, [{
    key: "renderData",
    value: function renderData(data) {
      var _this = this;
      var _self = this;
      var thumb = data.type === 'image' && data.full_url ? "<img src=\"".concat(data.full_url, "\" alt=\"").concat(data.name, "\">") : data.icon;
      var description = '';
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.forEach(data, function (val, index) {
        if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.inArray(_self.onlyFields, index) && val) {
          if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.inArray(['mime_type'], index)) {
            description += _self.descriptionItemTemplate.replace(/__title__/gi, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.trans(index)).replace(/__url__/gi, val ? index === 'full_url' ? "<div class=\"input-group pe-1\">\n                                        <input type=\"text\" id=\"file_details_url\" class=\"form-control\" value=\"".concat(val, "\" />\n                                        <button class=\"input-group-text btn btn-default js-btn-copy-to-clipboard\" type=\"button\"\n                                                data-bb-toggle=\"clipboard\"\n                                                data-clipboard-action=\"copy\"\n                                                data-clipboard-message=\"Copied\"\n                                                data-clipboard-target=\"#file_details_url\"\n                                        >\n                                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-clipboard me-0\" data-clipboard-icon=\"true\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                                               <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                                               <path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\"></path>\n                                               <path d=\"M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z\"></path>\n                                            </svg>\n                                            <svg class=\"icon text-success me-0 d-none\" data-clipboard-success-icon=\"true\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                                              <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                                              <path d=\"M5 12l5 5l10 -10\"></path>\n                                            </svg>\n                                        </button>\n                                    </div>") : "<span title=\"".concat(val, "\">").concat(val, "</span>") : '');
          }
        }
      });
      _self.$detailsWrapper.find('.rv-media-thumbnail').html(thumb);
      _self.$detailsWrapper.find('.rv-media-thumbnail').css('color', data.color);
      _self.$detailsWrapper.find('.rv-media-description').html(description);
      var dimensions = '';
      if (data.mime_type && data.mime_type.indexOf('image') !== -1) {
        var image = new Image();
        image.src = data.full_url;
        image.onload = function () {
          dimensions += _this.descriptionItemTemplate.replace(/__title__/gi, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.trans('width')).replace(/__url__/gi, "<span title=\"".concat(image.width, "\">").concat(image.width, "px</span>"));
          dimensions += _this.descriptionItemTemplate.replace(/__title__/gi, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.trans('height')).replace(/__url__/gi, "<span title=\"".concat(image.height, "\">").concat(image.height, "px</span>"));
          _self.$detailsWrapper.find('.rv-media-description').append(dimensions);
        };
      }
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/App/Views/MediaList.js":
/*!*****************************************************************!*\
  !*** ./platform/core/media/resources/js/App/Views/MediaList.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaList: () => (/* binding */ MediaList)
/* harmony export */ });
/* harmony import */ var _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
/* harmony import */ var _Services_ActionsService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Services/ActionsService */ "./platform/core/media/resources/js/App/Services/ActionsService.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var MediaList = /*#__PURE__*/function () {
  function MediaList() {
    _classCallCheck(this, MediaList);
    this.group = {};
    this.group.list = $('#rv_media_items_list').html();
    this.group.tiles = $('#rv_media_items_tiles').html();
    this.item = {};
    this.item.list = $('#rv_media_items_list_element').html();
    this.item.tiles = $('#rv_media_items_tiles_element').html();
    this.$groupContainer = $('.rv-media-items');
  }
  return _createClass(MediaList, [{
    key: "renderData",
    value: function renderData(data) {
      var reload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var load_more_file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _self = this;
      var MediaConfig = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getConfigs();
      var template = _self.group[_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getRequestParams().view_type];
      var view_in = _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getRequestParams().view_in;
      if (!_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.inArray(['all_media', 'public', 'trash', 'favorites', 'recent'], view_in)) {
        view_in = 'all_media';
      }
      var icon;
      switch (view_in) {
        case 'all_media':
          icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path>\n                    <path d=\"M7 9l5 -5l5 5\"></path>\n                    <path d=\"M12 4l0 12\"></path>\n                </svg>";
          break;
        case 'public':
          icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4\"></path>\n                    <path d=\"M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4\"></path>\n                </svg>";
          break;
        case 'trash':
          icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M4 7l16 0\"></path>\n                    <path d=\"M10 11l0 6\"></path>\n                    <path d=\"M14 11l0 6\"></path>\n                    <path d=\"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12\"></path>\n                    <path d=\"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3\"></path>\n                </svg>";
          break;
        case 'favorites':
          icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z\" stroke-width=\"0\" fill=\"currentColor\"></path>\n                </svg>";
          break;
        case 'recent':
          icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\"></path>\n                    <path d=\"M12 7v5l3 3\"></path>\n                </svg>";
      }
      template = template.replace(/__noItemIcon__/gi, icon).replace(/__noItemTitle__/gi, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.trans("no_item.".concat(view_in, ".title")) || '').replace(/__noItemMessage__/gi, _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.trans("no_item.".concat(view_in, ".message")) || '');
      var $result = $(template);
      var $itemsWrapper = $result.find('ul');
      if (load_more_file && this.$groupContainer.find('.rv-media-grid ul').length > 0) {
        $itemsWrapper = this.$groupContainer.find('.rv-media-grid ul');
      }
      if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.size(data.folders) > 0 || _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.size(data.files) > 0 || load_more_file) {
        $('.rv-media-items').addClass('has-items');
      } else {
        $('.rv-media-items').removeClass('has-items');
      }
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.forEach(data.folders, function (value) {
        var item = _self.item[_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getRequestParams().view_type];
        item = item.replace(/__type__/gi, 'folder').replace(/__id__/gi, value.id).replace(/__name__/gi, value.name || '').replace(/__size__/gi, '').replace(/__date__/gi, value.created_at || '').replace(/__thumb__/gi, "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                    <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                    <path d=\"M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2\"></path>\n                </svg>");
        var $item = $(item);
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.forEach(value, function (val, index) {
          $item.data(index, val);
        });
        $item.data('is_folder', true);
        $item.data('icon', MediaConfig.icons.folder);
        $item.find('.rv-media-thumbnail').css('color', value.color);
        $itemsWrapper.append($item);
      });
      _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.forEach(data.files, function (value) {
        var item = _self.item[_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getRequestParams().view_type];
        item = item.replace(/__type__/gi, 'file').replace(/__id__/gi, value.id).replace(/__name__/gi, value.name || '').replace(/__size__/gi, value.size || '').replace(/__date__/gi, value.created_at || '');
        if (_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getRequestParams().view_type === 'list') {
          item = item.replace(/__thumb__/gi, value.icon);
        } else {
          item = item.replace(/__thumb__/gi, value.thumb ? "<img src=\"".concat(value.thumb ? value.thumb : value.full_url, "\" alt=\"").concat(value.name, "\">") : value.icon);
        }
        var $item = $(item);
        $item.data('is_folder', false);
        _Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.forEach(value, function (val, index) {
          $item.data(index, val);
        });
        $itemsWrapper.append($item);
      });
      if (reload !== false) {
        _self.$groupContainer.empty();
      }
      if (!(load_more_file && this.$groupContainer.find('.rv-media-grid ul').length > 0)) {
        _self.$groupContainer.append($result);
      }
      _self.$groupContainer.find('.loading-spinner').remove();
      _Services_ActionsService__WEBPACK_IMPORTED_MODULE_1__.ActionsService.handleDropdown();

      // Trigger event click for file selected
      $(".js-media-list-title[data-id=".concat(data.selected_file_id, "]")).trigger('click');
    }
  }]);
}();

/***/ }),

/***/ "./platform/core/media/resources/js/integrate.js":
/*!*******************************************************!*\
  !*** ./platform/core/media/resources/js/integrate.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorService: () => (/* binding */ EditorService)
/* harmony export */ });
/* harmony import */ var _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App/Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
/* harmony import */ var _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App/Config/MediaConfig */ "./platform/core/media/resources/js/App/Config/MediaConfig.js");
/* harmony import */ var _App_Services_ContextMenuService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App/Services/ContextMenuService */ "./platform/core/media/resources/js/App/Services/ContextMenuService.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var EditorService = /*#__PURE__*/function () {
  function EditorService() {
    _classCallCheck(this, EditorService);
  }
  return _createClass(EditorService, null, [{
    key: "editorSelectFile",
    value: function editorSelectFile(selectedFiles) {
      var is_ckeditor = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getUrlParam('CKEditor') || _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getUrlParam('CKEditorFuncNum');
      if (window.opener && is_ckeditor) {
        var firstItem = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.arrayFirst(selectedFiles);
        window.opener.CKEDITOR.tools.callFunction(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getUrlParam('CKEditorFuncNum'), firstItem.full_url);
        if (window.opener) {
          window.close();
        }
      } else {
        // No WYSIWYG editor found, use custom method.
      }
    }
  }]);
}();
var rvMedia = /*#__PURE__*/_createClass(function rvMedia(selector, options) {
  _classCallCheck(this, rvMedia);
  var customHandler = window.RvMediaCustomCallback || null;
  if (typeof customHandler === 'function') {
    customHandler(selector, options);
    return;
  }
  window.rvMedia = window.rvMedia || {};
  var $body = $('body');
  var defaultOptions = {
    multiple: true,
    type: '*',
    onSelectFiles: function onSelectFiles(files, $el) {}
  };
  options = $.extend(true, defaultOptions, options);
  var clickCallback = function clickCallback(event) {
    event.preventDefault();
    var $current = $(event.currentTarget);
    $('#rv_media_modal').modal('show');
    window.rvMedia.options = options;
    window.rvMedia.options.open_in = 'modal';
    window.rvMedia.$el = $current;
    _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params.filter = 'everything';
    _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.storeConfig();
    var elementOptions = window.rvMedia.$el.data('rv-media');
    if (typeof elementOptions !== 'undefined' && elementOptions.length > 0) {
      elementOptions = elementOptions[0];
      window.rvMedia.options = $.extend(true, window.rvMedia.options, elementOptions || {});
      if (typeof elementOptions.selected_file_id !== 'undefined') {
        window.rvMedia.options.is_popup = true;
      } else if (typeof window.rvMedia.options.is_popup !== 'undefined') {
        window.rvMedia.options.is_popup = undefined;
      }
    }
    if ($('#rv_media_body .rv-media-container').length === 0) {
      $('#rv_media_body').load(RV_MEDIA_URL.popup, function (data) {
        if (data.error) {
          alert(data.message);
        }
        $('#rv_media_body').removeClass('media-modal-loading').closest('.modal-content').removeClass('bb-loading');
        $(document).find('.rv-media-container .js-change-action[data-type=refresh]').trigger('click');
        if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getRequestParams().filter !== 'everything') {
          $('.rv-media-actions .btn.js-rv-media-change-filter-group.js-filter-by-type').hide();
        }
        _App_Services_ContextMenuService__WEBPACK_IMPORTED_MODULE_2__.ContextMenuService.destroyContext();
        _App_Services_ContextMenuService__WEBPACK_IMPORTED_MODULE_2__.ContextMenuService.initContext();
      });
    } else {
      $(document).find('.rv-media-container .js-change-action[data-type=refresh]').trigger('click');
    }
  };
  if (typeof selector === 'string') {
    $body.off('click', selector).on('click', selector, clickCallback);
  } else {
    selector.off('click').on('click', clickCallback);
  }
});
window.RvMediaStandAlone = rvMedia;
$('.js-insert-to-editor').off('click').on('click', function (event) {
  event.preventDefault();
  var selectedFiles = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.getSelectedFiles();
  if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.size(selectedFiles) > 0) {
    EditorService.editorSelectFile(selectedFiles);
  }
});
$.fn.rvMedia = function (options) {
  var $selector = $(this);
  _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params.filter = 'everything';
  $(document).find('.js-insert-to-editor').prop('disabled', _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params.view_in === 'trash');
  _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_0__.Helpers.storeConfig();
  var customHandler = window.RvMediaCustomCallback || null;
  if (typeof customHandler === 'function') {
    customHandler($selector, options);
    return;
  }
  new rvMedia($selector, options);
};
document.dispatchEvent(new CustomEvent('core-media-loaded'));

/***/ }),

/***/ "./platform/core/media/resources/js/jquery.doubletap.js":
/*!**************************************************************!*\
  !*** ./platform/core/media/resources/js/jquery.doubletap.js ***!
  \**************************************************************/
/***/ (() => {

;
(function ($) {
  $.event.special.doubletap = {
    bindType: 'touchend',
    delegateType: 'touchend',
    handle: function handle(event) {
      var handleObj = event.handleObj,
        targetData = jQuery.data(event.target),
        now = new Date().getTime(),
        delta = targetData.lastTouch ? now - targetData.lastTouch : 0,
        delay = delay == null ? 300 : delay;
      if (delta < delay && delta > 30) {
        targetData.lastTouch = null;
        event.type = handleObj.origType;
        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function (property) {
          event[property] = event.originalEvent.changedTouches[0][property];
        });
        handleObj.handler.apply(this, arguments);
      } else {
        targetData.lastTouch = now;
      }
    }
  };
})(jQuery);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***************************************************!*\
  !*** ./platform/core/media/resources/js/media.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jquery_doubletap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jquery.doubletap */ "./platform/core/media/resources/js/jquery.doubletap.js");
/* harmony import */ var _jquery_doubletap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jquery_doubletap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App/Config/MediaConfig */ "./platform/core/media/resources/js/App/Config/MediaConfig.js");
/* harmony import */ var _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App/Helpers/Helpers */ "./platform/core/media/resources/js/App/Helpers/Helpers.js");
/* harmony import */ var _App_Services_MediaService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App/Services/MediaService */ "./platform/core/media/resources/js/App/Services/MediaService.js");
/* harmony import */ var _App_Services_FolderService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App/Services/FolderService */ "./platform/core/media/resources/js/App/Services/FolderService.js");
/* harmony import */ var _App_Services_UploadService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App/Services/UploadService */ "./platform/core/media/resources/js/App/Services/UploadService.js");
/* harmony import */ var _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App/Services/ActionsService */ "./platform/core/media/resources/js/App/Services/ActionsService.js");
/* harmony import */ var _App_Services_DownloadService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App/Services/DownloadService */ "./platform/core/media/resources/js/App/Services/DownloadService.js");
/* harmony import */ var _integrate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./integrate */ "./platform/core/media/resources/js/integrate.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var MediaManagement = /*#__PURE__*/function () {
  function MediaManagement() {
    _classCallCheck(this, MediaManagement);
    this.MediaService = new _App_Services_MediaService__WEBPACK_IMPORTED_MODULE_3__.MediaService();
    this.UploadService = new _App_Services_UploadService__WEBPACK_IMPORTED_MODULE_5__.UploadService();
    this.FolderService = new _App_Services_FolderService__WEBPACK_IMPORTED_MODULE_4__.FolderService();
    this.DownloadService = new _App_Services_DownloadService__WEBPACK_IMPORTED_MODULE_7__.DownloadService();
    this.$body = $('body');
  }
  return _createClass(MediaManagement, [{
    key: "init",
    value: function init() {
      _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
      this.setupLayout();
      this.handleMediaList();
      this.changeViewType();
      this.changeFilter();
      this.search();
      this.handleActions();
      this.UploadService.init();
      this.handleModals();
      this.scrollGetMore();
    }
  }, {
    key: "setupLayout",
    value: function setupLayout() {
      /**
       * Sidebar
       */
      var $currentFilter = $(".js-rv-media-change-filter[data-type=\"filter\"][data-value=\"".concat(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().filter, "\"]"));
      $currentFilter.closest('button.dropdown-item').addClass('active').closest('.dropdown').find('.js-rv-media-filter-current').html("(".concat($currentFilter.html(), ")"));
      var $currentViewIn = $(".js-rv-media-change-filter[data-type=\"view_in\"][data-value=\"".concat(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().view_in, "\"]"));
      $currentViewIn.closest('button.dropdown-item').addClass('active').closest('.dropdown').find('.js-rv-media-filter-current').html("(".concat($currentViewIn.html(), ")"));
      if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.isUseInModal()) {
        $('.rv-media-footer').removeClass('d-none');
      }

      /**
       * Sort
       */
      $(".js-rv-media-change-filter[data-type=\"sort_by\"][data-value=\"".concat(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().sort_by, "\"]")).closest('button.dropdown-item').addClass('active');

      /**
       * Details pane
       */
      var $mediaDetailsCheckbox = $('#media_details_collapse');
      $mediaDetailsCheckbox.prop('checked', _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.hide_details_pane || false);
      setTimeout(function () {
        $('.rv-media-details').show();
      }, 300);
      $mediaDetailsCheckbox.on('change', function (event) {
        event.preventDefault();
        _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.hide_details_pane = $(event.currentTarget).is(':checked');
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.storeConfig();
      });
      $(document).on('click', '.js-download-action', function (event) {
        event.preventDefault();
        $('#modal_download_url').modal('show');
      });
      $(document).on('click', '.js-create-folder-action', function (event) {
        event.preventDefault();
        $('#modal_add_folder').modal('show');
      });
    }
  }, {
    key: "handleMediaList",
    value: function handleMediaList() {
      var _self = this;

      /*Ctrl key in Windows*/
      var ctrl_key = false;

      /*Command key in MAC*/
      var meta_key = false;

      /*Shift key*/
      var shift_key = false;
      $(document).on('keyup keydown', function (e) {
        /*User hold ctrl key*/
        ctrl_key = e.ctrlKey;
        /*User hold command key*/
        meta_key = e.metaKey;
        /*User hold shift key*/
        shift_key = e.shiftKey;
      });
      _self.$body.off('click', '.js-media-list-title').on('click', '.js-media-list-title', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        if (shift_key) {
          var firstItem = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayFirst(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems());
          if (firstItem) {
            var firstIndex = firstItem.index_key;
            var currentIndex = $current.index();
            $('.rv-media-items li').each(function (index, el) {
              if (index > firstIndex && index <= currentIndex) {
                $(el).find('input[type=checkbox]').prop('checked', true);
              }
            });
          }
        } else if (!ctrl_key && !meta_key) {
          $current.closest('.rv-media-items').find('input[type=checkbox]').prop('checked', false);
        }
        var $lineCheckBox = $current.find('input[type=checkbox]');
        $lineCheckBox.prop('checked', true);
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.handleDropdown();
        _self.MediaService.getFileDetails($current.data());
      }).on('dblclick doubletap', '.js-media-list-title', function (event) {
        event.preventDefault();
        var data = $(event.currentTarget).data();
        if (data.is_folder === true) {
          _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
          _self.FolderService.changeFolder(data.id);
        } else {
          if (!_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.isUseInModal()) {
            _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.handlePreview();
          } else if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getConfigs().request_params.view_in !== 'trash') {
            var selectedFiles = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles();
            if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.size(selectedFiles) > 0) {
              _integrate__WEBPACK_IMPORTED_MODULE_8__.EditorService.editorSelectFile(selectedFiles);
            }
          }
        }
        return false;
      }).on('dblclick doubletap', '.js-up-one-level', function (event) {
        event.preventDefault();
        var count = $('.rv-media-breadcrumb .breadcrumb li').length;
        $(".rv-media-breadcrumb .breadcrumb li:nth-child(".concat(count - 1, ") a")).trigger('click');
      }).on('contextmenu', '.js-context-menu', function (event) {
        if (!$(event.currentTarget).find('input[type=checkbox]').is(':checked')) {
          $(event.currentTarget).trigger('click');
        }
      }).on('click contextmenu', '.rv-media-items', function (e) {
        if (!_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.size(e.target.closest('.js-context-menu'))) {
          $('.rv-media-items input[type="checkbox"]').prop('checked', false);
          _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.handleDropdown();
          _self.MediaService.getFileDetails({
            icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                            <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                            <path d=\"M15 8h.01\"></path>\n                            <path d=\"M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z\"></path>\n                            <path d=\"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5\"></path>\n                            <path d=\"M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3\"></path>\n                        </svg>",
            nothing_selected: ''
          });
        }
      });
    }
  }, {
    key: "changeViewType",
    value: function changeViewType() {
      var _self = this;
      _self.$body.off('click', '.js-rv-media-change-view-type button').on('click', '.js-rv-media-change-view-type button', function (event) {
        event.preventDefault();
        var $current = $(event.currentTarget);
        if ($current.hasClass('active')) {
          return;
        }
        $current.closest('.js-rv-media-change-view-type').find('button').removeClass('active');
        $current.addClass('active');
        _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params.view_type = $current.data('type');
        if ($current.data('type') === 'trash') {
          $(document).find('.js-insert-to-editor').prop('disabled', true);
        } else {
          $(document).find('.js-insert-to-editor').prop('disabled', false);
        }
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.storeConfig();
        if (typeof RV_MEDIA_CONFIG.pagination != 'undefined') {
          if (typeof RV_MEDIA_CONFIG.pagination.paged != 'undefined') {
            RV_MEDIA_CONFIG.pagination.paged = 1;
          }
        }
        _self.MediaService.getMedia(true, false);
      });
      $(".js-rv-media-change-view-type .btn[data-type=\"".concat(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().view_type, "\"]")).trigger('click');
      this.bindIntegrateModalEvents();
    }
  }, {
    key: "changeFilter",
    value: function changeFilter() {
      var _self = this;
      _self.$body.off('click', '.js-rv-media-change-filter').on('click', '.js-rv-media-change-filter', function (event) {
        event.preventDefault();
        if (!_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.isOnAjaxLoading()) {
          var $current = $(event.currentTarget);
          var data = $current.data();
          _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params[data.type] = data.value;
          if (window.rvMedia.options && data.type === 'view_in') {
            window.rvMedia.options.view_in = data.value;
          }
          if (data.type === 'view_in') {
            _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params.folder_id = 0;
            if (data.value === 'trash') {
              $(document).find('.js-insert-to-editor').prop('disabled', true);
            } else {
              $(document).find('.js-insert-to-editor').prop('disabled', false);
            }
          }
          $current.closest('.dropdown').find('.js-rv-media-filter-current').html("(".concat($current.html(), ")"));
          _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.storeConfig();
          _App_Services_MediaService__WEBPACK_IMPORTED_MODULE_3__.MediaService.refreshFilter();
          _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
          _self.MediaService.getMedia(true);
          $current.addClass('active');
          $current.siblings().removeClass('active');
        }
      });
    }
  }, {
    key: "search",
    value: function search() {
      var _self = this;
      $('.input-search-wrapper input[type="text"]').val(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().search || '');
      _self.$body.off('submit', '.input-search-wrapper').on('submit', '.input-search-wrapper', function (event) {
        event.preventDefault();
        _App_Config_MediaConfig__WEBPACK_IMPORTED_MODULE_1__.MediaConfig.request_params.search = $(event.currentTarget).find('input[name="search"]').val();
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.storeConfig();
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
        _self.MediaService.getMedia(true);
      });
    }
  }, {
    key: "handleActions",
    value: function handleActions() {
      var _self = this;
      _self.$body.off('click', '.rv-media-actions .js-change-action[data-type="refresh"]').on('click', '.rv-media-actions .js-change-action[data-type="refresh"]', function (event) {
        event.preventDefault();
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
        var ele_options = typeof window.rvMedia.$el !== 'undefined' ? window.rvMedia.$el.data('rv-media') : undefined;
        if (typeof ele_options !== 'undefined' && ele_options.length > 0 && typeof ele_options[0].selected_file_id !== 'undefined') {
          _self.MediaService.getMedia(true, true);
        } else {
          _self.MediaService.getMedia(true, false);
        }
      }).off('click', '.rv-media-items li.no-items').on('click', '.rv-media-items li.no-items', function (event) {
        event.preventDefault();
        $('.rv-media-header .rv-media-top-header .rv-media-actions .js-dropzone-upload').trigger('click');
      }).off('submit', '.form-add-folder').on('submit', '.form-add-folder', function (event) {
        event.preventDefault();
        var $input = $(event.currentTarget).find('input[name="name"]');
        var folderName = $input.val();
        _self.FolderService.create(folderName);
        $input.val('');
        return false;
      }).off('click', '.js-change-folder').on('click', '.js-change-folder', function (event) {
        event.preventDefault();
        var folderId = $(event.currentTarget).data('folder');
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
        _self.FolderService.changeFolder(folderId);
      }).off('click', '.js-files-action').on('click', '.js-files-action', function (event) {
        event.preventDefault();
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.handleGlobalAction($(event.currentTarget).data('action'), function () {
          _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.resetPagination();
          _self.MediaService.getMedia(true);
        });
      }).off('submit', '.form-download-url').on('submit', '.form-download-url', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
          var $el, $wrapper, $notice, $header, $input, $button, url, remainUrls;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();
                $el = $('#modal_download_url');
                $wrapper = $el.find('#download-form-wrapper');
                $notice = $el.find('#modal-notice').empty();
                $header = $el.find('.modal-title');
                $input = $el.find('textarea[name="urls"]').prop('disabled', true);
                $button = $el.find('[type="submit"]');
                url = $input.val();
                remainUrls = [];
                Botble.showButtonLoading($button);
                $wrapper.slideUp();

                // start to download
                _context.next = 13;
                return _self.DownloadService.download(url, function (progress, item, url) {
                  var $noticeItem = $("\n                        <div class=\"p-2 text-primary\">\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                                <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                                <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0\"></path>\n                                <path d=\"M12 9h.01\"></path>\n                                <path d=\"M11 12h1v4h1\"></path>\n                            </svg>\n                            <span>".concat(item, "</span>\n                        </div>\n                    "));
                  $notice.append($noticeItem).scrollTop($notice[0].scrollHeight);
                  $header.html("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                            <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                            <path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path>\n                            <path d=\"M7 11l5 5l5 -5\"></path>\n                            <path d=\"M12 4l0 12\"></path>\n                        </svg>\n                        ".concat($header.data('downloading'), " (").concat(progress, ")"));
                  return function (success) {
                    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
                    if (!success) {
                      remainUrls.push(url);
                    }
                    $noticeItem.find('span').text("".concat(item, ": ").concat(message));
                    $noticeItem.attr('class', "py-2 text-".concat(success ? 'success' : 'danger')).find('i').attr('class', success ? 'icon ti ti-check-circle' : 'icon ti ti-x-circle');
                  };
                }, function () {
                  $wrapper.slideDown();
                  $input.val(remainUrls.join('\n')).prop('disabled', false);
                  $header.html("<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n                            <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n                            <path d=\"M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2\"></path>\n                            <path d=\"M7 11l5 5l5 -5\"></path>\n                            <path d=\"M12 4l0 12\"></path>\n                        </svg>\n                        ".concat($header.data('text'), "\n                    "));
                  Botble.hideButtonLoading($button);
                });
              case 13:
                return _context.abrupt("return", false);
              case 14:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "handleModals",
    value: function handleModals() {
      var _self = this;
      _self.$body.on('show.bs.modal', '#modal_rename_items', function () {
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.renderRenameItems();
      });
      _self.$body.on('show.bs.modal', '#modal_alt_text_items', function () {
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.renderAltTextItems();
      });
      _self.$body.on('show.bs.modal', '#modal_share_items', function () {
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.renderShareItems();
      });
      _self.$body.on('change', '#modal_share_items select[data-bb-value="share-type"]', function () {
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.renderShareItems();
      });
      _self.$body.on('show.bs.modal', '#modal_crop_image', function () {
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.renderCropImage();
      });
      _self.$body.on('show.bs.modal', '#modal-properties', function (event) {
        if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems().length === 1) {
          var $modal = $(event.currentTarget);
          var selected = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems()[0];
          $modal.find("input[name=\"color\"][value=\"".concat(selected.color, "\"]")).prop('checked', true);
        }
      });
      _self.$body.on('hidden.bs.modal', '#modal_download_url', function () {
        var $el = $('#modal_download_url');
        $el.find('textarea').val('');
        $el.find('#modal-notice').empty();
      });
      _self.$body.off('click', '#modal-properties button[type="submit"]').on('click', '#modal-properties button[type="submit"]', function (event) {
        event.preventDefault();
        var $modal = $(event.currentTarget).closest('.modal');
        Botble.showButtonLoading($modal.find('button[type="submit"]'));
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.processAction({
          action: 'properties',
          color: $modal.find('input[name="color"]:checked').val(),
          selected: _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems().map(function (item) {
            return item.id.toString();
          })
        }, function () {
          $modal.modal('hide');
          Botble.hideButtonLoading($modal.find('button[type="submit"]'));
          _self.MediaService.getMedia(true);
        });
      });
      _self.$body.off('submit', '#modal_crop_image .form-crop').on('submit', '#modal_crop_image .form-crop', function (event) {
        event.preventDefault();
        var $form = $(event.currentTarget);
        Botble.showButtonLoading($form.find('button[type="submit"]'));
        var imageId = $form.find('input[name="image_id"]').val();
        var cropData = $form.find('input[name="crop_data"]').val();
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.processAction({
          action: $form.data('action'),
          imageId: imageId,
          cropData: cropData
        }, function (response) {
          if (!response.error) {
            $form.closest('.modal').modal('hide');
            _self.MediaService.getMedia(true);
          }
          Botble.hideButtonLoading($form.find('button[type="submit"]'));
        });
      });
      _self.$body.off('submit', '#modal_rename_items .form-rename').on('submit', '#modal_rename_items .form-rename', function (event) {
        event.preventDefault();
        var items = [];
        var $form = $(event.currentTarget);
        $('#modal_rename_items .form-control').each(function (index, el) {
          var $current = $(el);
          var data = $current.closest('.mb-3').data();
          data.name = $current.val();
          items.push(data);
        });
        Botble.showButtonLoading($form.find('button[type="submit"]'));
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.processAction({
          action: $form.data('action'),
          selected: items
        }, function (res) {
          if (!res.error) {
            $form.closest('.modal').modal('hide');
            _self.MediaService.getMedia(true);
          } else {
            $('#modal_rename_items .mb-3').each(function (index, el) {
              var $current = $(el);
              if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(res.data, $current.data('id'))) {
                $current.addClass('has-error');
              } else {
                $current.removeClass('has-error');
              }
            });
          }
          Botble.hideButtonLoading($form.find('button[type="submit"]'));
        });
      });
      _self.$body.off('submit', '#modal_alt_text_items .form-alt-text').on('submit', '#modal_alt_text_items .form-alt-text', function (event) {
        event.preventDefault();
        var items = [];
        var $form = $(event.currentTarget);
        $('#modal_alt_text_items .form-control').each(function (index, el) {
          var $current = $(el);
          var data = $current.closest('.mb-3').data();
          data.alt = $current.val();
          items.push(data);
        });
        Botble.showButtonLoading($form.find('button[type="submit"]'));
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.processAction({
          action: $form.data('action'),
          selected: items
        }, function (res) {
          if (!res.error) {
            $form.closest('.modal').modal('hide');
            _self.MediaService.getMedia(true);
          } else {
            $('#modal_alt_text_items .mb-3').each(function (index, el) {
              var $current = $(el);
              if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.inArray(res.data, $current.data('id'))) {
                $current.addClass('has-error');
              } else {
                $current.removeClass('has-error');
              }
            });
          }
          Botble.hideButtonLoading($form.find('button[type="submit"]'));
        });
      });

      /*Delete files*/
      _self.$body.off('submit', 'form.form-delete-items').on('submit', 'form.form-delete-items', function (event) {
        event.preventDefault();
        var items = [];
        var $form = $(event.currentTarget);
        Botble.showButtonLoading($form.find('button[type="submit"]'));
        _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.each(_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedItems(), function (value) {
          items.push({
            id: value.id,
            is_folder: value.is_folder
          });
        });
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.processAction({
          action: $form.data('action'),
          selected: items,
          skip_trash: $form.find('input[name="skip_trash"]').is(':checked')
        }, function (res) {
          $form.closest('.modal').modal('hide');
          if (!res.error) {
            _self.MediaService.getMedia(true);
          }
          $form.find('input[name="skip_trash"]').prop('checked', false);
          Botble.hideButtonLoading($form.find('button[type="submit"]'));
        });
      });

      /*Empty trash*/
      _self.$body.off('submit', '#modal_empty_trash .form-empty-trash').on('submit', '#modal_empty_trash .form-empty-trash', function (event) {
        event.preventDefault();
        var $form = $(event.currentTarget);
        Botble.showButtonLoading($form.find('button[type="submit"]'));
        _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.processAction({
          action: $form.data('action')
        }, function () {
          $form.closest('.modal').modal('hide');
          _self.MediaService.getMedia(true);
          Botble.hideButtonLoading($form.find('button[type="submit"]'));
        });
      });
      if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getRequestParams().view_in === 'trash') {
        $(document).find('.js-insert-to-editor').prop('disabled', true);
      } else {
        $(document).find('.js-insert-to-editor').prop('disabled', false);
      }
      this.bindIntegrateModalEvents();
    }
  }, {
    key: "checkFileTypeSelect",
    value: function checkFileTypeSelect(selectedFiles) {
      if (typeof window.rvMedia.$el !== 'undefined') {
        var firstItem = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.arrayFirst(selectedFiles);
        var ele_options = window.rvMedia.$el.data('rv-media');
        if (typeof ele_options !== 'undefined' && typeof ele_options[0] !== 'undefined' && typeof ele_options[0].file_type !== 'undefined' && firstItem !== 'undefined' && firstItem.type !== 'undefined') {
          if (!ele_options[0].file_type.match(firstItem.type)) {
            return false;
          } else {
            if (typeof ele_options[0].ext_allowed !== 'undefined' && $.isArray(ele_options[0].ext_allowed)) {
              if ($.inArray(firstItem.mime_type, ele_options[0].ext_allowed) === -1) {
                return false;
              }
            }
          }
        }
      }
      return true;
    }
  }, {
    key: "bindIntegrateModalEvents",
    value: function bindIntegrateModalEvents() {
      var $mainModal = $('#rv_media_modal');
      var _self = this;
      $mainModal.off('click', '.js-insert-to-editor').on('click', '.js-insert-to-editor', function (event) {
        event.preventDefault();
        var selectedFiles = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles();
        if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.size(selectedFiles) > 0) {
          window.rvMedia.options.onSelectFiles(selectedFiles, window.rvMedia.$el);
          if (_self.checkFileTypeSelect(selectedFiles)) {
            $mainModal.find('.btn-close').trigger('click');
          }
        }
      });
      $mainModal.off('dblclick doubletap', '.js-media-list-title[data-context="file"]').on('dblclick doubletap', '.js-media-list-title[data-context="file"]', function (event) {
        event.preventDefault();
        if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getConfigs().request_params.view_in !== 'trash') {
          var selectedFiles = _App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.getSelectedFiles();
          if (_App_Helpers_Helpers__WEBPACK_IMPORTED_MODULE_2__.Helpers.size(selectedFiles) > 0) {
            window.rvMedia.options.onSelectFiles(selectedFiles, window.rvMedia.$el);
            if (_self.checkFileTypeSelect(selectedFiles)) {
              $mainModal.find('.btn-close').trigger('click');
            }
          }
        } else {
          _App_Services_ActionsService__WEBPACK_IMPORTED_MODULE_6__.ActionsService.handlePreview();
        }
      });
    }

    // Scroll get more media
  }, {
    key: "scrollGetMore",
    value: function scrollGetMore() {
      var _self = this;
      var $mediaList = $('.rv-media-main .rv-media-items');

      // Handle both mouse wheel and touch scroll events
      $mediaList.on('wheel scroll', function (e) {
        var _RV_MEDIA_CONFIG$pagi;
        var $target = $(e.currentTarget);
        var scrollHeight = $target[0].scrollHeight;
        var scrollTop = $target.scrollTop();
        var innerHeight = $target.innerHeight();
        var threshold = $target.closest('.media-modal').length > 0 ? 450 : 150;
        var loadMore = scrollTop + innerHeight >= scrollHeight - threshold;
        if (loadMore && (_RV_MEDIA_CONFIG$pagi = RV_MEDIA_CONFIG.pagination) !== null && _RV_MEDIA_CONFIG$pagi !== void 0 && _RV_MEDIA_CONFIG$pagi.has_more) {
          _self.MediaService.getMedia(false, false, true);
        }
      });
    }
  }]);
}();
$(function () {
  window.rvMedia = window.rvMedia || {};
  new MediaManagement().init();
});
})();

/******/ })()
;