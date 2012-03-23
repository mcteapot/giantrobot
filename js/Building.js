// Gyant Robot by Arjun Prakash
// Building.js

THREE.Building = function() {


	// ##Object Properties

	var scope = this;

	this.modelScale = 1;

	// building rigging

	this.bodyMesh = null;
	this.frillMesh = null;

	this.bodyGeometry = null;
	this.frillGeometry = null;

	this.root = new THREE.Object3D();

	this.loaded = false;
	this.meshes = [];

	// internal helper variables

	this.frillPositionX = 0;

	// debug flags
	
	this.debugInfo = false;

	// ##API

	this.loadPartsJSON = function( buildingURL, buildingFrillURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( buildingURL, function( geometry ) { createBody( geometry ) } );
		loader.load( buildingFrillURL, function( geometry ) { createFrill( geometry ) } );

	};

	this.setFrillPosition = function( x, y, z ) {

		if ( this.loaded ) {

			this.frillMesh.position.set( x, y, z );

		} else {

			console.error ( "building fring is null" );

		}

	}

	this.setRootPosition = function( x, y, z ) {

		if ( this.loaded ) {

			this.root.position.set( x, y, z );

		} else {

			console.error ( "building root is null" );

		}

	}


	// ##Internal Helper Methods

	function createBody( geometry ) {

		if ( scope.debugInfo ) {

			console.info( "createBody" );
		
		}
		
		scope.bodyGeometry = geometry;

		createBuilding();

	};

	function createFrill( geometry ) {

		if ( scope.debugInfo ) {
		
			console.info( "createFrill" );
		
		}
		
		scope.frillGeometry = geometry;

		createBuilding();

	};

	function createBuilding() {

		if ( scope.bodyGeometry && scope.frillGeometry ) {
		
			if ( scope.debugInfo ) {
		
				console.log( "createBuilding" );
		
			}

			// body

			var bodyMaterial = new THREE.MeshPhongMaterial();
			bodyMaterial.color = new THREE.Color().setRGB( 0.83, 0.80, 0.78 );
			bodyMaterial.ambient = new THREE.Color().setRGB( 0, 0.13, 0.26 );
			bodyMaterial.specular = new THREE.Color().setRGB( 0.44, 0.41, 0.42 );

			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );

			// frill

			var frillMaterial = new THREE.MeshPhongMaterial();
			frillMaterial.color = new THREE.Color().setRGB( 0.73, 0.70, 0.68 );
			frillMaterial.ambient = new THREE.Color().setRGB( 0, 0.13, 0.26 );
			frillMaterial.specular = new THREE.Color().setRGB( 0.44, 0.41, 0.42 );

			scope.frillMesh = createGeometry( scope.frillGeometry, frillMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );

			// sets roots and rigs body

			scope.root.add( scope.bodyMesh );
			scope.bodyMesh.add( scope.frillMesh );

			// cache meshes

			scope.meshes = [ scope.bodyMesh, scope.frillMesh ];

			scope.loaded = true;

			// scope.cappback function must be added via protoype due to closer load

			if ( scope.callback ) {

				scope.callback( scope );

			}
		
		}

	};

};
// ##Inhearits form THREE.Entity()
THREE.Building.prototype = new THREE.Entity();	