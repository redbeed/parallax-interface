# Parallax Interface (PXI)

PXI is a lightweight and flexible library for adding mouse-driven parallax effects to your HTML elements, enhancing UI depth and user engagement in any project.

The whole Project is inspired by the iPad Mouse Hover Effect.

## Installation

```bash
npm install parallax-interface
```

### Usage

```javascript
import ParallaxInterface from 'parallax-interface';

ParallaxInterface.init();

// or with custom options
ParallaxInterface.init({
    throttleTime: 16, // Throttle time in milliseconds (60fps)
    hitzoneFactor: 1, // Factor for the hitzone size
    mouseMoveFactor: 0.5, // Factor for the mousemove movement
    animationTime: 500, // Animation time in milliseconds
});
```

Or you can add the following script to your project directly.

```html
<script src="https://unpkg.com/parallax-interface/dist/parallax-interface.js"></script>
```

### HTML

You need to add `data-pax` to your main element and `data-pe-factor` to the elements you want to add the parallax effect to.

```html

<a href="#" data-pax>
    <span data-pe-factor>I am a link</span>
</a>

<!-- or with custom options -->
<a href="#" data-pax data-pe-hitzone="1.2">
    <span data-pe-factor="0.5">I am a link</span>
</a>
```

### CSS

To make the parallax effect work, you should add our small CSS snippet to your project.

```scss
import 'parallax-interface/dist/parallax-interface.css';
```

Or you can add the following CSS to your project directly.

```html
<link rel="stylesheet" href="https://unpkg.com/parallax-interface/dist/parallax-interface.css" />
```
## Troubleshooting

### Inline Block Elements

You need to add `display: inline-block` to your inline elements like `span` or `a`, if you want to add the parallax effect.



