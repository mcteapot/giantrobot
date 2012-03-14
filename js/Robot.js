
THREE.Robot = function() {
	
	// ##Object Properties

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
	this.headGeometry = null;
	this.eyesGeometry = null;

	// internal helper variables

	this.loaded = false;

	this.meshes = [];

	// ##API

	this.loadPartsJSON = function ( bodyURL, headURL, eyesURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );
		loader.load( headURL, function( geometry ) { createHead( geometry ) } );
		loader.load( eyesURL, function( geometry ) { createEyes( geometry ) } );

	};


	// ##Internal Helper Methods
	function createBody( geometry ) {

		console.log( "createBody");
		scope.bodyGeometry = geometry;

		createRobot();

	};

	function createHead( geometry ) {

		console.log( "createHead");
		scope.headGeometry = geometry;

		createRobot();

	};

	function createEyes( geometry ) {

		console.log( "createEyes");
		scope.eyesGeometry = geometry;

		createRobot();

	};


	function createRobot() {

		if ( scope.bodyGeometry && scope.headGeometry && scope.eyesGeometry ) {

			console.log( "createRobot");

			// body

			var bodyMaterial = new THREE.MeshPhongMaterial();
			bodyMaterial.color = new THREE.Color().setRGB( 0.8549019607843137, 0.8666666666666667, 0.9215686274509803 );
			bodyMaterial.ambient = new THREE.Color().setRGB( 0, 0.3333333333333333, 1 );
			bodyMaterial.specular = new THREE.Color().setRGB( 0, 0.3333333333333333, 1);

			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, scope.modelScale );

			// head

			var headMaterial = new THREE.MeshPhongMaterial();
			headMaterial.color = new THREE.Color().setRGB( 0.9411764705882353,0.9490196078431372,0.9803921568627451 );
			headMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08235294117647059 );
			headMaterial.specular = new THREE.Color().setRGB( 0, 0.25098039215686274, 1 );

			scope.headMesh = createGeometry( scope.headGeometry, headMaterial, 0, 77.01283547257887, 0, scope.modelScale );

			// eyes

			var eyesMaterial = new THREE.MeshPhongMaterial();
			eyesMaterial.color = new THREE.Color().setRGB( 0.9411764705882353, 0.9490196078431372, 0.9803921568627451 );
			eyesMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08235294117647059 );
			eyesMaterial.specular = new THREE.Color().setRGB( 0, 0.25098039215686274, 1 );

			scope.eyesMesh = createGeometry( scope.eyesGeometry, eyesMaterial, 0, 0, 0, scope.modelScale );

			scope.root.add( scope.bodyMesh );
			scope.headMesh.add( scope.eyesMesh );
			scope.root.add( scope.headMesh );

			// cache meshes

			scope.meshes = [ scope.bodyMesh, scope.headMesh, scope.eyesMesh ];

			// callback

			scope.loaded = true;


			if ( scope.callback ) {

				console.log( "callback" );

				scope.callback( scope );

			}


		}

	};

	function createGeometry( geometry, material, x, y, z, s ) {

		console.log( "Body Geometry");
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( x, y, z );
		mesh.rotation.set( 0 ,0 ,0 );
		mesh.scale.set( s, s, s);
		mesh.overdraw = true;
		return mesh;

	};

	function finishLoading() {
		
		console.log( "finishLoading" );

	};


};