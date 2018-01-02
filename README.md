A lightweight native javascript library to perform smooth scrolling.

## Features
- ~3 KB before gzip
- no dependencies
- scrolling in any direction - left, right, bottom, top
- specify the amount in pixels that needs to be scrolled
- ability to scroll any kind of scrollable element - window, div etc.
- controlling the pace of the scrolling by specifying predefined easing presets or bezier curve points
- ability to cancel the scrolling at any time via callback

## Installation
```
npm install easy-scroll --save
```
Or you can load it via a script tag as follows:
```
<script src="https://unpkg.com/easy-scroll" />
```

## Importing
### ES6
```
import easyScroll from 'easy-scroll';
```
### CommonJS
```
var easyScroll = require('easy-scroll');
```
### Global variable
the variable `easyScroll` attached to `window` or `this` depending on what environment you are using

## API
A function is exported by default which accepts an object with the following configuration as an argument:

|         Property       |                             Value                             |
| ---------------------- | ------------------------------------------------------------- |
| **scrollableDomEle** (required)     |           `window` or any other scrollable DOM element      |
| **direction** (required)           |  the direction in which you want the element to scroll - top, left, bottom, right 
| **duration** (required) | the duration in milliseconds over which you want the scrolling to happen |
| **easingPreset** | linear(default), easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint |
| **cubicBezierPoints** | object containing the 4 points to define a bezier curve <br/>{<br/>&nbsp;&nbsp;&nbsp;&nbsp;'x1': Number(>= 0 and <= 1),<br/>&nbsp;&nbsp;&nbsp;&nbsp;'y1': Number,<br/>&nbsp;&nbsp;&nbsp;&nbsp;'x2': Number(>= 0 and <= 1),<br/>&nbsp;&nbsp;&nbsp;&nbsp;'y2': Number<br/> }|
| **onRefUpdateCallback**| callback function which is called on each tick of the scroll. The current instance of the scrolling animation is passed as an argument by default. You can use `cancelAnimationFrame` on this instance to cancel the scrolling.|
| **onAnimationCompleteCallback** | callback function which is called after the scrolling is done |
| **scrollAmount** | the amount that needs to be scrolled in pixels. If this is not specified, the element will be scrolled to the end. |

## Example Usage
```
import easyScroll from 'easy-scroll';

easyScroll({
    'scrollableDomEle': window,
    'direction': 'bottom',
    'duration': 2000,
    'easingPreset': 'easeInQuad',
    'scrollAmount': 1000
});
```

## Browser Support
Supported on all modern browsers. For older browsers, you would need the polyfills for `requestAnimationFrame` and `cancelAnimationFrame`.
