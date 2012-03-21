
<<<<<<< HEAD
// Gyant Robot by Arjun Prakash
// Robot.js

=======
>>>>>>> 91cfa83553e1cf374ead9c05c984503c8fdf0615
THREE.Robot = function() {
	

	// ##Object Properties

	var scope = this;

	// internal control variables

	this.headRotationSpeedY = 2.5;
	this.headRotationSpeedZ = 0.3;
	this.headRotationStartZ = 10.0;
	this.headRotationClampZ = 2;
	this.maxHeadRotation = 30;

	// robot rigging

	this.bodyMesh = null;
	this.headMesh = null;
	this.eyesMesh = null;

	this.bodyGeometry = null;
	this.headGeometry = null;
	this.eyesGeometry = null;



	// debug flags
	this.debugHead = false;
	this.debugControlFlow = false;
	// internal helper variables

	// ##API

	this.loadPartsJSON = function ( bodyURL, headURL, eyesURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );
		loader.load( headURL, function( geometry ) { createHead( geometry ) } );
		loader.load( eyesURL, function( geometry ) { createEyes( geometry ) } );

	};

	this.headRotation = function ( turnRight, turnLeft ) {
		if ( turnRight ) {
			if ( rotationConvertion( "r", this.headMesh.rotation.y) < this.maxHeadRotation ) {
				this.headMesh.rotation.y = ( this.headMesh.rotation.y + rotationConvertion( "d", this.headRotationSpeedY) );
				if ( ( rotationConvertion( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  (rotationConvertion( "r", this.headMesh.rotation.y ) < this.headRotationClampZ ) ) {
					this.headMesh.rotation.z =  rotationConvertion( "d", this.headRotationStartZ );
				} else if ( rotationConvertion( "r", this.headMesh.rotation.y) > 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + rotationConvertion( "d", this.headRotationSpeedZ ) );
				} else if ( rotationConvertion( "r", this.headMesh.rotation.y) < 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - rotationConvertion( "d", this.headRotationSpeedZ ) );
				} 
			}
		}

		if ( turnLeft ) {
			if ( rotationConvertion( "r", this.headMesh.rotation.y) > -this.maxHeadRotation ) {
				this.headMesh.rotation.y = ( this.headMesh.rotation.y - rotationConvertion( "d", this.headRotationSpeedY ) );
				if ( ( rotationConvertion( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  ( rotationConvertion( "r", this.headMesh.rotation.y ) < this.headRotationClampZ) ) {
					this.headMesh.rotation.z =  rotationConvertion( "d", this.headRotationStartZ );
				} else if ( rotationConvertion( "r", this.headMesh.rotation.y) > 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - rotationConvertion( "d", this.headRotationSpeedZ ) );
				} else if ( rotationConvertion( "r", this.headMesh.rotation.y) < 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + rotationConvertion( "d", this.headRotationSpeedZ ) );
				} 
			}
		}

		if ( this.debugHead ) {
			console.log("headrotationY " + rotationConvertion( "r", this.headMesh.rotation.y) );
			console.log("headrotationZ " + rotationConvertion( "r", this.headMesh.rotation.z) );
		}
	};


	// ##Internal Helper Methods
	createBody = function( geometry ) {

		if ( scope.debugControlFlow ) {
			console.log( "createBody" );
		}
		scope.bodyGeometry = geometry;

		createRobot();

	};

	createHead = function( geometry ) {

		if ( scope.debugControlFlow ) {
			console.log( "createHead" );
		}
		scope.headGeometry = geometry;

		createRobot();

	};

	createEyes = function( geometry ) {

		if ( scope.debugControlFlow ) {
			console.log( "createEyes" );
		}
		scope.eyesGeometry = geometry;

		createRobot();

	};


	createRobot = function() {

		if ( scope.bodyGeometry && scope.headGeometry && scope.eyesGeometry ) {

			if ( scope.debugControlFlow ) {
				console.log( "createRobot" );
			}

			// body

			var bodyMaterial = new THREE.MeshPhongMaterial();
			bodyMaterial.color = new THREE.Color().setRGB( 0.8549019607843137, 0.8666666666666667, 0.9215686274509803 );
			bodyMaterial.ambient = new THREE.Color().setRGB( 0, 0.3333333333333333, 1 );
			bodyMaterial.specular = new THREE.Color().setRGB( 0, 0.3333333333333333, 1);

<<<<<<< HEAD
			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );
=======
			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, scope.modelScale );
>>>>>>> 91cfa83553e1cf374ead9c05c984503c8fdf0615

			// head

			var headMaterial = new THREE.MeshPhongMaterial();
			headMaterial.color = new THREE.Color().setRGB( 0.9411764705882353,0.9490196078431372,0.9803921568627451 );
			headMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08235294117647059 );
			headMaterial.specular = new THREE.Color().setRGB( 0, 0.25098039215686274, 1 );

<<<<<<< HEAD
			scope.headMesh = createGeometry( scope.headGeometry, headMaterial, 0, 77.01283547257887, 0, 0, 0, rotationConvertion( "d" , scope.headRotationStartZ ), scope.modelScale );
=======
			scope.headMesh = createGeometry( scope.headGeometry, headMaterial, 0, 77.01283547257887, 0, scope.modelScale );
>>>>>>> 91cfa83553e1cf374ead9c05c984503c8fdf0615

			// eyes

			var eyesMaterial = new THREE.MeshPhongMaterial();
			eyesMaterial.color = new THREE.Color().setRGB( 0.9411764705882353, 0.9490196078431372, 0.9803921568627451 );
			eyesMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08235294117647059 );
			eyesMaterial.specular = new THREE.Color().setRGB( 0, 0.25098039215686274, 1 );

<<<<<<< HEAD
			scope.eyesMesh = createGeometry( scope.eyesGeometry, eyesMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );
=======
			scope.eyesMesh = createGeometry( scope.eyesGeometry, eyesMaterial, 0, 0, 0, scope.modelScale );
>>>>>>> 91cfa83553e1cf374ead9c05c984503c8fdf0615

			scope.root.add( scope.bodyMesh );
			scope.headMesh.add( scope.eyesMesh );
			scope.root.add( scope.headMesh );

			// cache meshes

			scope.meshes = [ scope.bodyMesh, scope.headMesh, scope.eyesMesh ];

			// callback

			scope.loaded = true;


			if ( scope.callback ) {

				scope.callback( scope );

				finishLoading( scope );

			}


		}

	};

<<<<<<< HEAD
};
THREE.Robot.prototype = new THREE.Entity();
=======
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
>>>>>>> 91cfa83553e1cf374ead9c05c984503c8fdf0615
