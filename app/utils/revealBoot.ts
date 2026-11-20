// Inline scripts for the scroll reveal (see plugins/reveal.client.ts). Kept tiny and dependency-free:
// they run before the app loads.

/** In <head>: arm the reveal unless motion is reduced; reveal everything after 4s whatever happens. */
export const revealArm = `(function(){var d=document.documentElement;if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('rv-ready');setTimeout(function(){document.querySelectorAll('[data-rv]').forEach(function(e){e.setAttribute('data-in','')})},4000)})()`

/** Before </body>: reveal whatever is already on screen at once, so the hero never waits for the app. */
export const revealVisible = `(function(){if(!document.documentElement.classList.contains('rv-ready'))return;document.querySelectorAll('[data-rv]').forEach(function(e){var r=e.getBoundingClientRect();if(r.top<innerHeight*0.85&&r.bottom>0)e.setAttribute('data-in','')})})()`
