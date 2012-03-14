

THREE.Robot = function() {
	var scope = this;


	// robot geometry manual parameters

	this.modelScale = 1;

	// internal control variables

	this.headRotationSpeed = 0;

	// robot rigging

	this.root = new THREE.Object3D();


	this.bodyMesh = null;
	this.headMesh = null;
	this.eyesMesh = null;

	this.bodyGeometry = null;


	// internal helper variables

	this.loaded = false;

	this.meshes = [];

	// API

	this.loadPartsJSON = function ( bodyURL, scene ) { 
		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );


	};


	// internal helper methods
	function createBody( geometry ) {

		console.log( "createBody");
		scope.bodyGeometry = geometry;

		createRobot();
	};


	function createRobot() {
		if (scope.bodyGeometry ) {
			console.log( "createRobot");

			// body

			var material = new THREE.MeshPhongMaterial();
			material.color = new THREE.Color().setRGB(0.8549019607843137,0.8666666666666667,0.9215686274509803);
			material.ambient = new THREE.Color().setRGB(0,0.3333333333333333,1);
			material.specular = new THREE.Color().setRGB(0,0.3333333333333333,1);

			scope.bodyMesh = new THREE.Mesh( scope.bodyGeometry, material );
			scope.bodyMesh.position.set(0,0,0);
			scope.bodyMesh.rotation.set(0,0,0);
			scope.bodyMesh.scale.set(1,1,1);

			scope.root.add( scope.bodyMesh );

			// cache meshes

			scope.meshes = [ scope.bodyMesh ];

			// callback

			scope.loaded = true;


			if ( scope.callback ) {
				console.log( "callback");

				scope.callback( scope );

			}


		}

	};

	function creategGeometry( geometry, material, x, y, z, b ) {
		console.log( "Body Geometry")
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( x, y, z );
		mesh.scale.set( b, b, b);
		mesh.overdraw = true;
		return mesh;

	};

	function finishLoading() {
		console.log( "finishLoading")
		console.log(scope.bodyMesh);
		console.log(scope.modelScale);

	};

	this.addToScene = function ( scene ) {
		scene.add( this.bodyMesh );
	};


};