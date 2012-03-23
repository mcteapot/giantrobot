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

function angleConvertHelper( type, delta ) {
	
	var convertsion;

	if (type == "d") {
	
		// Takes in degree and return radian
		convertsion = delta * ( Math.PI / 180 );
	
	} else if (type = "r") {
	
		// Takes in radiun and returns degree
		convertsion = delta *  ( 180 / Math.PI ); 
	
	} else {
	
		console.log ( "angleConvertHelper error" );
	
	}

	return convertsion;

}

function debugCube( x, y, z, i, j, k, s ) {

	var materials = [];
	var cube;

	for ( var i = 0; i < 6; i ++ ) {

		materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );

	}

	cube = new THREE.Mesh( new THREE.CubeGeometry( s, s, s, x, y, z, materials ), new THREE.MeshFaceMaterial() );
	//cube.rotation.set( angleConvertHelper( "d", i ), angleConvertHelper( "d", j ), angleConvertHelper( "d", k ) );
	//cube.rotation.set( 0, 0, 0 );

	return cube;
}