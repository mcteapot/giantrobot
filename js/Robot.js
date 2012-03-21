// Gyant Robot by Arjun Prakash
// Robot.js


THREE.Robot = function() {
	

	// ##Object Properties

	var scope = this;

	// init variables

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

	// internal helper variables

	// ##API

	this.loadPartsJSON = function ( bodyURL, headURL, eyesURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );
		loader.load( headURL, function( geometry ) { createHead( geometry ) } );
		loader.load( eyesURL, function( geometry ) { createEyes( geometry ) } );

	};

	this.headRotation = function ( controls ) {
		if ( controls.turnRight ) {
			if ( angleConvert( "r", this.headMesh.rotation.y) < this.maxHeadRotation ) {
				this.headMesh.rotation.y = ( this.headMesh.rotation.y + angleConvert( "d", this.headRotationSpeedY) );
				if ( ( angleConvert( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  (angleConvert( "r", this.headMesh.rotation.y ) < this.headRotationClampZ ) ) {
					this.headMesh.rotation.z =  angleConvert( "d", this.headRotationStartZ );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) > 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + angleConvert( "d", this.headRotationSpeedZ ) );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) < 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - angleConvert( "d", this.headRotationSpeedZ ) );
				} 
			}
		}

		if ( controls.turnLeft ) {
			if ( angleConvert( "r", this.headMesh.rotation.y) > -this.maxHeadRotation ) {
				this.headMesh.rotation.y = ( this.headMesh.rotation.y - angleConvert( "d", this.headRotationSpeedY ) );
				if ( ( angleConvert( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  ( angleConvert( "r", this.headMesh.rotation.y ) < this.headRotationClampZ) ) {
					this.headMesh.rotation.z =  angleConvert( "d", this.headRotationStartZ );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) > 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - angleConvert( "d", this.headRotationSpeedZ ) );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) < 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + angleConvert( "d", this.headRotationSpeedZ ) );
				} 
			}
		}

		if ( this.debugHead ) {
			console.log("headrotationY " + angleConvert( "r", this.headMesh.rotation.y) );
			console.log("headrotationZ " + angleConvert( "r", this.headMesh.rotation.z) );
		}
	};


	// ##Internal Helper Methods
	createBody = function( geometry ) {

		if ( scope.debugChecks ) {
			console.log( "createBody" );
		}
		scope.bodyGeometry = geometry;

		createRobot();

	};

	createHead = function( geometry ) {

		if ( scope.debugChecks ) {
			console.log( "createHead" );
		}
		scope.headGeometry = geometry;

		createRobot();

	};

	createEyes = function( geometry ) {

		if ( scope.debugChecks ) {
			console.log( "createEyes" );
		}
		scope.eyesGeometry = geometry;

		createRobot();

	};


	createRobot = function() {

		if ( scope.bodyGeometry && scope.headGeometry && scope.eyesGeometry ) {

			if ( scope.debugChecks ) {
				console.log( "createRobot" );
			}

			// body

			var bodyMaterial = new THREE.MeshPhongMaterial();
			bodyMaterial.color = new THREE.Color().setRGB( 0.8549019607843137, 0.8666666666666667, 0.9215686274509803 );
			bodyMaterial.ambient = new THREE.Color().setRGB( 0, 0.3333333333333333, 1 );
			bodyMaterial.specular = new THREE.Color().setRGB( 0, 0.3333333333333333, 1);

			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );
			//scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, scope.modelScale );

			// head

			var headMaterial = new THREE.MeshPhongMaterial();
			headMaterial.color = new THREE.Color().setRGB( 0.9411764705882353,0.9490196078431372,0.9803921568627451 );
			headMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08235294117647059 );
			headMaterial.specular = new THREE.Color().setRGB( 0, 0.25098039215686274, 1 );

			scope.headMesh = createGeometry( scope.headGeometry, headMaterial, 0, 77.01283547257887, 0, 0, 0, angleConvert( "d" , scope.headRotationStartZ ), scope.modelScale );
			//scope.headMesh = createGeometry( scope.headGeometry, headMaterial, 0, 77.01283547257887, 0, scope.modelScale );


			// eyes

			var eyesMaterial = new THREE.MeshPhongMaterial();
			eyesMaterial.color = new THREE.Color().setRGB( 0.9411764705882353, 0.9490196078431372, 0.9803921568627451 );
			eyesMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08235294117647059 );
			eyesMaterial.specular = new THREE.Color().setRGB( 0, 0.25098039215686274, 1 );


			scope.eyesMesh = createGeometry( scope.eyesGeometry, eyesMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );
			//scope.eyesMesh = createGeometry( scope.eyesGeometry, eyesMaterial, 0, 0, 0, scope.modelScale );


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


};
THREE.Robot.prototype = new THREE.Entity();


