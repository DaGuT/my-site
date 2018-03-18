import isElementInViewport from './isElementInViewport'


/**
 * onVisibilityChange - this is wrapper for callback function that will be triggered upon visibility change. It's requred to put this wrapper in even listener (scroll, domloaded,resize)
 *
 * @param  {DOM element} el       DOM element that should be watched
 * @param  {function} callback function that  should be called when visibility change happens
 * @return {function}          function that checks if visibility was changed. Usually added to eventlistener
 */
export default function onVisibilityChange(el, callback) {
  var old_visible;
  return function() {
    var visible = isElementInViewport(el);
    if (visible != old_visible) {
      old_visible = visible;
      if (typeof callback == 'function') {
        callback(visible);
      }
    }
  }
}
