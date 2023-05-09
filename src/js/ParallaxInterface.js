import "../css/parallax-interface.css";
import throttle from "lodash.throttle";

export default class ParallaxInterface {

    static instances = [];
    static options = {
        throttleTime: 16, // Throttle time in milliseconds (60fps)
        hitzoneFactor: 1, // Factor for the hitzone size
        mouseMoveFactor: 0.5, // Factor for the mousemove movement
        animationTime: 500, // Animation time in milliseconds
        calculateSize: false, // If true, the wrapper and the element will have a fixed size (based on the element's size)
    }

    /**
     * Initialize all ParallaxInterfaces on the page
     * Example: ParallaxInterface.init({hitzoneFactor: 1.2});
     *
     * @param options
     */
    static init(options = {}) {
        ParallaxInterface.options = {
            ...ParallaxInterface.options,
            ...options,
        };

        const parallaxElements = document.querySelectorAll("[data-pxi]");
        parallaxElements.forEach((button) => new ParallaxInterface(button));
    }

    constructor(element) {
        this.element = element;
        this.ParallaxInterfaces = Array.from(this.element.querySelectorAll("[data-pxi-factor]"));
        this.hitzoneFactor = parseFloat(this.element.dataset.pxiHitzone) || ParallaxInterface.options.hitzoneFactor;

        this.wrapper = null;

        this.prepareParallaxInterfaces();
        this.prepareElement();
        this.createWrapper();

        this.element.setAttribute("data-pxi", "init");

        ParallaxInterface.instances.push(this);

        // Initialize the mousemove event for all instances if it hasn't been done yet
        if (!ParallaxInterface.mouseMoveInitialized) {
            ParallaxInterface.initMouseMove();
            ParallaxInterface.mouseMoveInitialized = true;
        }
    }

    /**
     * Create wrapper element that is the same size as the main element
     * and contains the main element
     */
    createWrapper() {
        const rect = this.element.getBoundingClientRect();

        this.wrapper = document.createElement("div");
        this.wrapper.setAttribute('data-pxi-wrapper', '');
        this.element.parentNode.insertBefore(this.wrapper, this.element);
        this.wrapper.appendChild(this.element);

        if (this.calculateSizeEnabled()) {
            this.wrapper.style.width = `${rect.width}px`;
            this.wrapper.style.height = `${rect.height}px`;
        }
    }

    /**
     * Prepare the main element by setting the width and height
     * because it will be positioned absolute
     *
     * @todo: Do we need this? Maybe we can remove it
     *
     */
    prepareElement() {
        if (this.calculateSizeEnabled()) {
            const rect = this.element.getBoundingClientRect();
            this.element.style.width = `${rect.width}px`;
            this.element.style.height = `${rect.height}px`;
        }
    }

    /**
     * Prepare all parallax elements by setting the width and height
     * and caching the factor for performance
     */
    prepareParallaxInterfaces() {
        this.ParallaxInterfaces.forEach((element) => {
            const rect = element.getBoundingClientRect();

            if (this.calculateSizeEnabled()) {
                element.style.width = `${rect.width}px`;
                element.style.height = `${rect.height}px`;
            }

            // Cache the factor for performance
            element.cachedFactor = parseFloat(element.dataset.pxiFactor || ParallaxInterface.options.mouseMoveFactor);
        });
    }

    /**
     * Check if the calculateSize option is enabled for this instance
     * or globally for all instances
     *
     * @returns {boolean}
     */
    calculateSizeEnabled() {
        return this.element.dataset.pxiCalculateSize !== undefined || ParallaxInterface.options.calculateSize;
    }

    /**
     * Initialize the mousemove event
     * This is the main function that does all the magic
     *
     */
    static initMouseMove() {
        document.addEventListener("mousemove", throttle((event) => {
            ParallaxInterface.instances.forEach((instance) => {
                const wrapperRect = instance.wrapper.getBoundingClientRect();

                // Get the max distance from the center of the element based on the hitzone factor
                const maxDistance = Math.hypot(wrapperRect.width, wrapperRect.height) * instance.hitzoneFactor / 2;

                // Get the center of the element
                const centerX = wrapperRect.left + wrapperRect.width / 2;
                const centerY = wrapperRect.top + wrapperRect.height / 2;

                // Get the distance from the center of the element to the mouse position
                const distanceFromCenter = Math.hypot(event.clientX - centerX, event.clientY - centerY);

                // Only do the parallax effect if the mouse is inside the hitzone
                if (distanceFromCenter <= maxDistance) {
                    requestAnimationFrame(() => {
                        // Get the mouse position relative to the center of the element
                        const mousePosition = {
                            x: event.clientX - wrapperRect.left - (wrapperRect.width / 2),
                            y: event.clientY - wrapperRect.top - (wrapperRect.height / 2)
                        };

                        // Get the distance from the center of the element to the mouse position
                        const distance = Math.sqrt(
                            Math.pow(mousePosition.x, 2) +
                            Math.pow(mousePosition.y, 2)
                        );

                        // Calculate the pull factor based on the distance from the center of the element
                        // as closer the mouse is to the center as higher the pull factor will be
                        const pullFactor = 1 - (distance / maxDistance);

                        instance.ParallaxInterfaces.forEach((element) => {
                            const factor = element.cachedFactor;
                            const offsetX = mousePosition.x * factor * pullFactor;
                            const offsetY = mousePosition.y * factor * pullFactor;
                            const duration = (distance / maxDistance) * ParallaxInterface.options.animationTime;

                            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                            element.style.transitionDuration = `${duration}ms`;
                        });
                    });
                } else {
                    // Reset parallax elements if the mouse is outside the hitzone
                    // for a smoother transition
                    instance.ParallaxInterfaces.forEach((element) => {
                        element.style.transitionDuration = `1000ms`;
                        element.style.transform = "translate(0, 0)";
                    });
                }
            });
        }, ParallaxInterface.options.throttleTime));
    }
}