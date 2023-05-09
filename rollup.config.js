import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default [
    {
        input: 'src/js/ParallaxInterface.js',
        output: [
            {
                file: 'dist/parallax-interface.js',
                format: 'es', // Export as ES6 module
                sourcemap: true,
                name: 'ParallaxInterface'
            },
            {
                file: 'dist/parallax-interface.min.js',
                format: 'iife', // immediately-invoked function expression — suitable for <script> tags
                sourcemap: true,
                name: 'ParallaxInterface',
                plugins: [terser()]
            }
        ],
        plugins: [
            nodeResolve(),
            postcss({
                extract: 'parallax-interface.css',
            }),
            commonjs(),
            production && terser() // minify, but only in production
        ]
    }
];
