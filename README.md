## Features
- ~3 KB before gzip
- no dependencies like jQuery
- scrolling in any direction - left, right, bottom, top
- ability to scroll any kind of scrollable element - window, div etc.
- controlling the pace of the scrolling by specifying predefined easing presets or bezier curve points
- ability to cancel the scrolling at any time via callback

## Installation
```
npm install easy-scroll --save-dev
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
```
window.easyScroll
```

## API
A function is exported by default which accepts an object with the following configuration as an argument:

|         Property       |                             Value                             |
| ---------------------- | ------------------------------------------------------------- |
| **scrollableDomEle** (required)     |           `window` or any other scrollable DOM element      |
| **direction** (required)           |  the direction in which you want the element to scroll - top, left, bottom, right 
| **duration** (required) | the duration in milliseconds over which you want the scrolling to happen |
| **easingPreset** | linear(default), easeInQuad, easeOutQuad, easeInOutQuad, easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart, easeInQuint, easeOutQuint, easeInOutQuint |
| **cubicBezierPoints** | object containing the 4 points to define a bezier curve <br/>```{ 'x1': Number(>= 0), 'y1': Number, 'x2': Number(>= 0), 'y2': Number }```|
| **onRefUpdateCallback**| callback function which is called on each tick of the scroll. The current instance of the scrolling animation is passed as an argument by default. You can use `cancelAnimationFrame` on this instance to cancel the scrolling.|
| **onAnimationCompleteCallback** | callback function which is called after the scrolling is done |

## Browser Support
Supported on all modern browsers. For older browsers, you would need the polyfills for `requestAnimationFrame` and `cancelAnimationFrame`.
