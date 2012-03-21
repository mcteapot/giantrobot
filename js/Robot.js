// Gyant Robot by Arjun Prakash
// Robot.js

THREE.Robot = function() {
	

	// ##Object Properties

	var scope = this;

	// robot rigging

	this.bodyMesh = null;
	this.headMesh = null;
	this.eyesMesh = null;

	this.bodyGeometry = null;
	this.headGeometry = null;
	this.eyesGeometry = null;

	this.eyeTarget = new THREE.Object3D();

	// internal helper variables

	this.headRotationSpeedY = 2.5;
	this.headRotationSpeedZ = 0.3;
	this.headRotationStartZ = 10.0;
	this.headRotationClampZ = 2;
	this.maxHeadRotation = 30;

	// debug flags

	this.debugHead = false;



	// ##API

	this.loadPartsJSON = function ( bodyURL, headURL, eyesURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );
		loader.load( headURL, function( geometry ) { createHead( geometry ) } );
		loader.load( eyesURL, function( geometry ) { createEyes( geometry ) } );

	};

	this.headRotation = function ( controls ) {

		// keyp press right or "d"

		if ( controls.turnRight ) {
			
			// head rotaion control

			if ( angleConvert( "r", this.headMesh.rotation.y) < this.maxHeadRotation ) {
				this.headMesh.rotation.y = ( this.headMesh.rotation.y + angleConvert( "d", this.headRotationSpeedY) );
				if ( ( angleConvert( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  (angleConvert( "r", this.headMesh.rotation.y ) < this.headRotationClampZ ) ) {
					this.headMesh.rotation.z =  angleConvert( "d", this.headRotationStartZ );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) > 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + angleConvert( "d", this.headRotationSpeedZ ) );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) < 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - angleConvert( "d", this.headRotationSpeedZ ) );
				} 

				// body rotation control

				if ( angleConvert( "r", this.bodyMesh.rotation.y ) > -10 ) {
					this.bodyMesh.rotation.y = ( this.bodyMesh.rotation.y - angleConvert( "d", 0.5) );
				}
			}
		}

		// keyp press Left or "w"

		if ( controls.turnLeft ) {

			// head rotation control

			if ( angleConvert( "r", this.headMesh.rotation.y) > -this.maxHeadRotation ) {
				this.headMesh.rotation.y = ( this.headMesh.rotation.y - angleConvert( "d", this.headRotationSpeedY ) );
				if ( ( angleConvert( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  ( angleConvert( "r", this.headMesh.rotation.y ) < this.headRotationClampZ) ) {
					this.headMesh.rotation.z =  angleConvert( "d", this.headRotationStartZ );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) > 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - angleConvert( "d", this.headRotationSpeedZ ) );
				} else if ( angleConvert( "r", this.headMesh.rotation.y) < 0 ) {
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + angleConvert( "d", this.headRotationSpeedZ ) );
				}

				// body rotation control

				if ( angleConvert( "r", this.bodyMesh.rotation.y ) < 10 ) {
					this.bodyMesh.rotation.y = ( this.bodyMesh.rotation.y + angleConvert( "d", 0.5) );
				} 
			}
		}

		if ( this.debugHead ) {
			console.log("headrotationY " + angleConvert( "r", this.headMesh.rotation.y) );
			console.log("headrotationZ " + angleConvert( "r", this.headMesh.rotation.z) );
		}
	};

	this.getEyeTarget = function( object ) {

		// sets postion of bullet form eye

		this.eyeTarget.position.x = 15;
		this.eyeTarget.position.y = 5;
		this.eyeTarget.add( object );		

	}


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
			bodyMaterial.color = new THREE.Color().setRGB( 0.85, 0.87, 0.92);
			bodyMaterial.ambient = new THREE.Color().setRGB( 0, 0.33, 1 );
			bodyMaterial.specular = new THREE.Color().setRGB( 0, 0.33, 1);

			scope.bodyMesh = createGeometry( scope.bodyGeometry, bodyMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );

			// head

			var headMaterial = new THREE.MeshPhongMaterial();
			headMaterial.color = new THREE.Color().setRGB( 0.94,0.95,0.98 );
			headMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08 );
			headMaterial.specular = new THREE.Color().setRGB( 0, 0.25, 1 );

			scope.headMesh = createGeometry( scope.headGeometry, headMaterial, 0, 76, 0, 0, 0, angleConvert( "d" , scope.headRotationStartZ ), scope.modelScale );


			// eyes

			var eyesMaterial = new THREE.MeshPhongMaterial();
			eyesMaterial.color = new THREE.Color().setRGB( 0.94, 0.95, 0.98 );
			eyesMaterial.ambient = new THREE.Color().setRGB( 1, 0, 0.08 );
			eyesMaterial.specular = new THREE.Color().setRGB( 0, 0.25, 1 );

			scope.eyesMesh = createGeometry( scope.eyesGeometry, eyesMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );
		
			// sets roots and rigs body

			scope.root.add( scope.bodyMesh );
			scope.headMesh.add( scope.eyesMesh );
			scope.headMesh.add( scope.eyeTarget );
			scope.root.add( scope.headMesh );

			scope.root.rotation.z = angleConvert( "d", -10 );

			// cache meshes

			scope.meshes = [ scope.bodyMesh, scope.headMesh, scope.eyesMesh ];

			// callback

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
THREE.Robot.prototype = new THREE.Entity();


