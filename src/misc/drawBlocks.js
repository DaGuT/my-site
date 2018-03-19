//Block drawing function that takes each block from parts folder and then draw it

/**
 * drawBlocks - returns array of DOM blocks so that site can be drawn with module-based approach
 *
 * @param  {React.Component} that React Component that has 'req' object that consists of functions that draws DOM block (so that you can make as much functions that returns blocks in folder and they will all be drawn)
 * @return {array of DOM blocks}
 */
function drawBlocks(that) {
  var dom=[];
  that.req.keys().forEach((key) => {
    dom.push(that.req(key).default());
  });
  return dom;
}

export default drawBlocks;
