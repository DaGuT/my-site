/**
 * isElementInViewport - functino that shows if the element is in viewport
 *
 * @param  {DOM element} el element that is being checked if it's visible
 * @return {boolean}    visibility of el
 */
export default function isElementInViewport(el) {

  //special bonus for those using jQuery
  // if (typeof jQuery === "function" && el instanceof jQuery) {
  //   el = el[0];
  // }

  var rect = el.getBoundingClientRect();

  const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  return (vertInView && horInView);

}
