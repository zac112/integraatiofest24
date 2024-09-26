var curZ = 0
var currTouch = null;

function onClose(target){ target.remove(); }
	function on(target){ target.remove(); }

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;	
  }
		
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;	
	elmnt.style.zIndex = curZ;
	curZ += 1
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	elmnt.style.zIndex = curZ;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;	
  }
}
function registerTouch(elmnt){
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	elmnt.addEventListener("touchstart", handleTouchStart);
	elmnt.addEventListener("touchend", handleTouchEnd);	
	elmnt.addEventListener("touchcancel", handleTouchEnd);
	elmnt.addEventListener("touchmove", handleTouchMove);
		
	function handleTouchEnd(e){ currTouch = null; }	
	function handleTouchStart(e){ 
		currTouch = e; 
	    pos3 = e.touches[0].screenX;
		pos4 = e.touches[0].screenY;
		curZ += 1
	}	
	function handleTouchMove(e) {
		if (currTouch == null) return;
		e.preventDefault();
		var touchX = e.touches[0].screenX;
		var touchY = e.touches[0].screenY;
		pos1 = pos3 - touchX;
		pos2 = pos4 - touchY;
		pos3 = touchX;
		pos4 = touchY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		elmnt.style.zIndex = curZ;
	}
}

function registerWindowCreator(elmnt, new_window, width){
	elmnt.addEventListener("click", function(event) {
	  
	  // Get cursor position
	  const cursorX = event.clientX;
	  const cursorY = event.clientY;

	  // Set the initial position of the div based on the cursor position
	  new_window.style.left = `${cursorX-width/2}px`;
	  new_window.style.top = `${cursorY}px`;

	  // Set the size and opacity to create the scaling effect
	  setTimeout(() => {
		new_window.style.width = width+"px";
		new_window.style.scaleY = "1";
	  }, 10);
	  
	  console.log(elmnt)
	})
};