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

	this.debugInfo = false;

	// ##Internal Helper Methods

	createGeometry = function( geometry, material, x, y, z, i, j, k, s ) {
		
		if ( this.debugInfo ) {
		
			console.info( "Body Geometry");
		
		}

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( x, y, z );
		mesh.rotation.set( i ,j ,k );
		mesh.scale.set( s, s, s);
		mesh.overdraw = true;
		return mesh;

	};

	finishLoading = function(o) {

		if ( this.debugInfo ) {
		
			console.info( "finishLoading: " + o);
		
		}

	};


	angleConvert = function( type, delta ) {

		// converts angles bitches

		var convertsion;

		if (type == "d") {
		
			// takes in degree and return radian
			convertsion = delta * ( Math.PI / 180 );
		
		} else if (type = "r") {
		
			// takes in radiun and returns degree
			convertsion = delta *  ( 180 / Math.PI ); 
		
		} else {
		
			console.error ( "angleConvert error" );
		
		}

		return convertsion;

	};

};