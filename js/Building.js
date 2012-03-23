// Gyant Robot by Arjun Prakash
// Building.js

THREE.Building = function() {


	// ##Object Properties

	var scope = this;

	// building rigging

	this.bodyMesh = null;
	this.frilllMesh = null;

	this.bodyGeometry = null;
	this.frilllGeometry = null;

	// internal helper variables

	this.frilllPositionX = 0;

	// debug flags


	// ##API
	this.loadPartsJSON = function ( buildingURL, buildingFrilllURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );
		loader.load( headURL, function( geometry ) { createFrill( geometry ) } );

	};

	this.setFrillPosition = function ( x, y, z ) {

		if ( this.frilllMesh ) {

			this.frilllMesh.position.set( x, y, z );

		} else {

			console.error ( "building fring is null" );

		}

	}

	this.setRootPosition = function ( x, y, z ) {

		if ( this.root ) {

			this.root.position.set( x, y, z );

		} else {

			console.error ( "building root is null" );

		}

	}


	// ##Internal Helper Methods
	
	createBody = function( geometry ) {

		if ( scope.debugInfo ) {

			console.info( "createBody" );
		
		}
		
		scope.bodyGeometry = geometry;

		createBuilding();

	};

	createFrill = function( geometry ) {

		if ( scope.debugInfo ) {
		
			console.info( "createFrill" );
		
		}
		
		scope.frilllGeometry = geometry;

		createBuilding();

	};

	createBuilding = function() {

		if ( scope.bodyGeometry && scope.frilllGeometry ) {
		
			if ( scope.debugInfo ) {
		
				console.log( "createBuilding" );
		
			}

			// body

			var bodyMaterial = new THREE.MeshPhongMaterial();
			bodyMaterial.color = new THREE.Color().setRGB( 0.83, 0.80, 0.78 );
			bodyMaterial.ambient = new THREE.Color().setRGB( 0, 0.13, 0.66 );
			bodyMaterial.specular = new THREE.Color().setRGB( 0.44, 0.41, 0.42 );

			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );

			// frill

			var frillMaterial = new THREE.MeshPhongMaterial();
			frillMaterial.color = new THREE.Color().setRGB( 0.83, 0.80, 0.78 );
			frillMaterial.ambient = new THREE.Color().setRGB( 0, 0.13, 0.66 );
			frillMaterial.specular = new THREE.Color().setRGB( 0.44, 0.41, 0.42 );

			scope.frilllMesh = createGeometry( scope.frilllGeometry, frillMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );

			// sets roots and rigs body

			scope.root.add( scope.bodyMesh );
			scope.bodyMesh.add( scope.frilllMesh );

			// cache meshes

			scope.meshes = [ scope.bodyMesh, scope.frilllMesh ];

			scope.loaded = true;

			// scope.cappback function must be added via protoype due to closer load

			if ( scope.callback ) {

				scope.callback( scope );

				finishLoading( scope );

			}
		
		}

	};

};
// ##Inhearits form THREE.Entity()
THREE.Building.prototype = new THREE.Entity();	