// ##Helper Methods

/*
function creategGeometry( geometry, material, x, y, z, b ) {

	zmesh = new THREE.Mesh( geometry, material );
	zmesh.position.set( x, y, z );
	zmesh.scale.set( b, b, b);
	zmesh.overdraw = true;
	return zmesh;

}
*/


function addRobot(object, x, y, z, s ) {

	object.root.position.set( x, y, z );
	scene.add( object.root );

}
