// Gyant Robot by Arjun Prakash
// Entity.js

THREE.Entity = function() { 

	// ##Object Properties

	var scope = this;

	// manual parameters

	this.modelScale = 1;


	// root objet

	this.root = new THREE.Object3D();

	// internal helper variables

	this.loaded = false;
	this.meshes = [];


	// debug flags
	this.debugChecks = false;

	// ##Internal Helper Methods

	createGeometry = function( geometry, material, x, y, z, i, j, k, s ) {

		console.log( "Body Geometry");
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( x, y, z );
		mesh.rotation.set( i ,j ,k );
		mesh.scale.set( s, s, s);
		mesh.overdraw = true;
		return mesh;

	};

	finishLoading = function(o) {

		console.log( "finishLoading: " + o);

	};

	degreeToRadian = function( degree ) {
	var radian;
	radian = degree  * ( Math.PI / 180 );

	return radian;

	};

	angleConvert = function( type, delta ) {
		var convertsion;

		if (type == "d") {
			// Takes in degree and return radian
			convertsion = delta * ( Math.PI / 180 );
		} else if (type = "r") {
			// Takes in radiun and returns degree
			convertsion = delta *  ( 180 / Math.PI ); 
		} else {
			console.log ( "angleConvert error" );
		}

		return convertsion;

	};

};