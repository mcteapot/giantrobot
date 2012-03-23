// Gyant Robot by Arjun Prakash
// Input.js

// ## Movement Functions

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

	}

}


function onKeyDown( event ) {
	switch ( event.keyCode ) {

		case 65: /*a*/ controlsRobotHead.turnLeft = true; break;
		case 68: /*d*/ controlsRobotHead.turnRight = true; break;
		case 87: /*w*/ break;
		case 83: /*s*/ break;
		case 13: /*Enter*/ controlsRobotHead.fire = true; break;

	}

}

function onKeyUp( event ) {
	switch ( event.keyCode ) {

		case 65: /*a*/ controlsRobotHead.turnLeft = false; break;
		case 68: /*d*/ controlsRobotHead.turnRight = false; break;
		case 87: /*w*/ break;
		case 83: /*s*/ break;
		case 13: /*Enter*/ controlsRobotHead.fire = false; break;

	}

}