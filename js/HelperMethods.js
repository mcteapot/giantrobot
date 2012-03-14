// Gyant Robot by Arjun Prakash
// HelperMethods.js


// ##Helper Methods

function addRobot( object, x, y, z, s ) {

	object.root.position.set( x, y, z );
	scene.add( object.root );

}

function createGrid() {

	var line_material = new THREE.LineBasicMaterial( { color: 0xcccccc, opacity: 0.2 } ),
	geometry = new THREE.Geometry(),
	floor = -0.04, step = 5, size = 100;

	for ( var i = 0; i <= size / step * 2; i ++ ) {

		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( - size, floor, i * step - size ) ) );
		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3(   size, floor, i * step - size ) ) );

		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( i * step - size, floor, -size ) ) );
		geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( i * step - size, floor,  size ) ) );

	}

	var line = new THREE.Line( geometry, line_material, THREE.LinePieces );

	return line;
	
}
