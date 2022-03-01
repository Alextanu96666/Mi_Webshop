import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';


export class Util {

    static getDistance(x1, y1, x2, y2) {
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) )
    }

    static getAngle(x1, y1, x2, y2) {
        let angle = Math.atan2(y2 - y1, x2 - x1) * 180.0 / Math.PI;
        angle += 90;
        if (angle < 0) angle += 360;
        return angle; 
    }

}




/**
 * Checks all blocks that the page wants to load and loads additional data if needed.
 */




/**
 * Define global settings such as breakpoints etc.
 */
let settings = {
    breakpoints: {
        mobile: {
            width: 500,
            aspectRatio: 0.7
        },
        tablet: {
            width: 1000,
            aspectRatio: 1.0
        },
    },
    scale: {
        mobile: 4,
        tablet: 1.5
    }
}


let runtime = {
    mobile: false,
    tablet: false,
    desktop: false
}

function getBreakpoint(width, height) {
    let asp = width / height;
    runtime.mobile = false;
    runtime.tablet = false;
    runtime.desktop = false;
    if (width < settings.breakpoints.mobile.width || asp < settings.breakpoints.mobile.aspectRatio) {
        runtime.mobile = true;
    } else if (width < settings.breakpoints.tablet.width || asp < settings.breakpoints.tablet.aspectRatio) {
        runtime.tablet = true;
    } else {
        runtime.desktop = true;
    }
    return [ runtime.mobile, runtime.tablet, runtime.desktop ]
}

/**
 * Get the window size as a react hook.
 */
export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize, {passive: true});
        updateSize();
        setTimeout(updateSize, 0)
        return () => window.removeEventListener('resize', updateSize, {passive: true});
    }, []);
    return size;
}


/**
 * Get the window scroll position.
 */
export function useScrollPos() {
    const [scroll, setScroll] = useState(0);
    useEffect(() => {
        function updateScroll() {
            setScroll(window.scrollY);
        }
        window.addEventListener('scroll', updateScroll, {passive: true});
        updateScroll();
        setTimeout(updateScroll, 0)
        return () => window.removeEventListener('scroll', updateScroll, {passive: true});
    }, []);
    return scroll;
}


/**
 * React hook that will define mobile, tablet and desktop booleans to be used
 * in components as a method to change the structure depending on the current
 * device screen size. Uses the breakpoints defined in the settings object.
 * 
 * Return format: [mobile, tablet, desktop]
 */
export function useDevices() {
    const [width, height] = useWindowSize();
    return getBreakpoint(width, height);
}

export function useResponsive(block) {
    const [mobile, tablet, desktop] = useDevices();

    if (block?.responsive?.includes('mobile') && mobile) return true;
    if (block?.responsive?.includes('tablet') && tablet) return true;
    if (block?.responsive?.includes('desktop') && desktop) return true;
    return false;
}




/**
 * Custom loader for 'next/image' components.
 */


export function placeholderImage() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88R8AArUB2TtNwp8AAAAASUVORK5CYII=';
}

export default class CompJS {

    /**
     * Inits the CompJS library.
     */
    static init() {



        /**
         * Update the font-size by using a custom resize function.
         */
        let resize = function(e) {
            if (!window) return;
            let x = window.innerWidth;

            getBreakpoint(window.innerWidth, window.innerHeight);
        
            let w = 1800;		// "Width" / duration for the change to happen.
            let bp = 1250;		// Change m -> 0
            let s = 1;
            let scale = 0.9;


            s = (Math.sin(x * (Math.PI / w) - (Math.PI / 2) * ((bp / w * 2) - 1)) / 4)+0.75;
            
            if (runtime.mobile) s = settings.scale.mobile;
            else if (runtime.tablet) s *= settings.scale.tablet;
            if (x > bp + w) s = 0.5;

            let size = '18px';
            // let size = (s * scale) + 'vw';
            // if (runtime.mobile) size = '4vw';
            // if (runtime.tablet) size = '1.3vw';
            document.getElementsByTagName('html')[0].style.fontSize = size;


            document.body.classList.remove('desktop')
            document.body.classList.remove('tablet')
            document.body.classList.remove('mobile')

            if (runtime.mobile) document.body.classList.add('mobile')
            if (runtime.tablet) document.body.classList.add('tablet')
            if (runtime.desktop) document.body.classList.add('desktop')

        }

        if (typeof window == "undefined") return;
        window.removeEventListener('resize', resize, {passive: true})
        window.addEventListener('resize', resize, {passive: true})
        resize();

    }

}

// export function useHandleClick() {
    
//     const router = useRouter()
    
//     return (e) => {
//         if (e.target.tagName == 'A') {
//             let href = e.target.getAttribute('href');
//             if (!href.includes('http')) {
//                 e.preventDefault();
//                 router.push(href)
//             }
//         }
//     }
// }

/**
 * Takes a string and "slugifies" it :)
 */
// export function slugify(str) {
//     return str
//         .toLowerCase()
//         .replace(/å/g, 'a')
//         .replace(/ä/g, 'a')
//         .replace(/ö/g, 'o')
//         .replace(/ /g, '-')
// }

// export function useQueryParams() {

//     const router = useRouter();

//     const fetchQueryVariables = () => {
//         const browserQuery = {}
//         router.asPath
//             .split('?')[1]?.split('&')
//             .map(param => param.split('='))
//             .forEach(param => browserQuery[param[0]] = param[1]);
//         return browserQuery
//     }

//     const [query, setQuery] = useState(fetchQueryVariables());

//     // Update local query params on browser change.
//     useEffect(() => setQuery(fetchQueryVariables()), [router])

//     useEffect(() => {
//         // Check if something has changed.
//         if (JSON.stringify(query) == JSON.stringify(fetchQueryVariables())) return;
//         let params = Object.entries(query)
//             .filter(([k, v]) => v != undefined);


//         router.push(`${router.asPath.split('?')[0]}${params.length != 0 ? '?' : ''}${
//             params
//                 .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
//                 .join('&')
//             }`, undefined, {shallow: true})

//     }, [query])

//     return [query, setQuery]
// }

// export async function getWordpressOptions() {
//     let res = (await Wordpress.get(`/acf/v3/options/options`))
//     return res && res.acf;
// }