// Gyant Robot by Arjun Prakash
// Entity.js

THREE.Entity = function() { 

	// ##Object Properties

	/*	NOTE:
		- Inharated objects should own its own properties.
		- foo = function() is only for inharatance methods
		- function foo () is only for internial method scope object
	*/

	// ##API
	
	this.enableShadows = function ( enable ) {

		if ( this.meshes ) {
			for ( var i = 0; i < this.meshes.length; i ++ ) {

				this.meshes[ i ].castShadow = enable;
				//this.meshes[ i ].receiveShadow = enable;

			}
		}

	};

	this.setVisible = function ( enable ) {

		if ( this.meshes ) {
			for ( var i = 0; i < this.meshes.length; i ++ ) {

				this.meshes[ i ].visible = enable;

			}
		}

	};

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