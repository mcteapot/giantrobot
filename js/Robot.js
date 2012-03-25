// Gyant Robot by Arjun Prakash
// Robot.js

THREE.Robot = function() {
	

	// ##Object Properties

	var scope = this;

	this.modelScale = 1;

	// robot rigging

	this.bodyMesh = null;
	this.headMesh = null;
	this.eyesMesh = null;

	this.bodyGeometry = null;
	this.headGeometry = null;
	this.eyesGeometry = null;

	this.root = new THREE.Object3D();
	this.eyeTarget = new THREE.Object3D();

	this.loaded = false;
	this.meshes = [];

	// internal helper variables
	
	this.headRotationSpeedY = 2.0;
	this.headRotationSpeedZ = 0.3;
	this.headRotationStartZ = 10.0;
	this.headRotationClampZ = 2;
	this.maxHeadRotationY = 30;

	this.bodyRotationSpeedY = 0.5;
	this.bodyRotationSpeedZ = 0.15;
	this.maxBodyRotationY = 10;
	this.bodyRotationStartZ = -10;

	// debug flags

	this.debugInfo = false;
	this.debugHead = false;



	// ##API

	this.loadPartsJSON = function( bodyURL, headURL, eyesURL ) { 

		var loader = new THREE.JSONLoader();

		loader.load( bodyURL, function( geometry ) { createBody( geometry ) } );
		loader.load( headURL, function( geometry ) { createHead( geometry ) } );
		loader.load( eyesURL, function( geometry ) { createEyes( geometry ) } );

	};

	this.headRotation = function( controls ) {

		// keyp press right or "d"

		if ( controls.turnRight && this.loaded ) {
			
			// head rotaion control

			if ( angleConvert( "r", this.headMesh.rotation.y ) < this.maxHeadRotationY ) {
			
				this.headMesh.rotation.y = ( this.headMesh.rotation.y + angleConvert( "d", this.headRotationSpeedY) );
				
				if ( ( angleConvert( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  (angleConvert( "r", this.headMesh.rotation.y ) < this.headRotationClampZ ) ) {
			
					this.headMesh.rotation.z =  angleConvert( "d", this.headRotationStartZ );
					this.bodyMesh.rotation.z = angleConvert( "d", this.bodyRotationStartZ );

				} else if ( angleConvert( "r", this.headMesh.rotation.y) > 0 ) {
			
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + angleConvert( "d", this.headRotationSpeedZ ) );
					this.bodyMesh.rotation.z = ( this.bodyMesh.rotation.z + angleConvert( "d", this.bodyRotationSpeedZ ) );
				
				} else if ( angleConvert( "r", this.headMesh.rotation.y) < 0 ) {
			
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - angleConvert( "d", this.headRotationSpeedZ ) );
					this.bodyMesh.rotation.z = ( this.bodyMesh.rotation.z - angleConvert( "d", this.bodyRotationSpeedZ ) );
				
				} 

				// body rotation control

				if ( angleConvert( "r", this.bodyMesh.rotation.y ) > -this.maxBodyRotationY ) {
			
					this.bodyMesh.rotation.y = ( this.bodyMesh.rotation.y - angleConvert( "d", this.bodyRotationSpeedY ) );
			
				}
			
			}
		
		}

		// keyp press Left or "w"

		if ( controls.turnLeft && this.loaded ) {

			// head rotation control

			if ( angleConvert( "r", this.headMesh.rotation.y ) > -this.maxHeadRotationY ) {
			
				this.headMesh.rotation.y = ( this.headMesh.rotation.y - angleConvert( "d", this.headRotationSpeedY ) );
				
				if ( ( angleConvert( "r", this.headMesh.rotation.y ) > -this.headRotationClampZ ) &&  ( angleConvert( "r", this.headMesh.rotation.y ) < this.headRotationClampZ) ) {
			
					this.headMesh.rotation.z =  angleConvert( "d", this.headRotationStartZ );
					this.bodyMesh.rotation.z = angleConvert( "d", this.bodyRotationStartZ );

				} else if ( angleConvert( "r", this.headMesh.rotation.y) > 0 ) {
			
					this.headMesh.rotation.z = ( this.headMesh.rotation.z - angleConvert( "d", this.headRotationSpeedZ ) );
					this.bodyMesh.rotation.z = ( this.bodyMesh.rotation.z - angleConvert( "d", this.bodyRotationSpeedZ ) );
				
				} else if ( angleConvert( "r", this.headMesh.rotation.y) < 0 ) {
			
					this.headMesh.rotation.z = ( this.headMesh.rotation.z + angleConvert( "d", this.headRotationSpeedZ ) );
					this.bodyMesh.rotation.z = ( this.bodyMesh.rotation.z + angleConvert( "d", this.bodyRotationSpeedZ ) );
				
				}

				// body rotation control

				if ( angleConvert( "r", this.bodyMesh.rotation.y ) < this.maxBodyRotationY ) {
			
					this.bodyMesh.rotation.y = ( this.bodyMesh.rotation.y + angleConvert( "d", this.bodyRotationSpeedY ) );
			
				} 
			
			}
		
		}

		if ( this.debugHead ) {
		
			console.group( "Robot Info" );
				console.log( "headrotationY: " + angleConvert( "r", this.headMesh.rotation.y ) );
				console.log( "headrotationZ: " + angleConvert( "r", this.headMesh.rotation.z ) );
				console.log( "bodyrotationZ: " + angleConvert( "r", this.bodyMesh.rotation.z ) );
			console.groupEnd(); // end group
		
		}
	
	};

	this.addChildToEyeTarget = function( object ) {

		// sets postion of bullet form eye

		this.eyeTarget.position.x = 10;
		this.eyeTarget.position.y = 2.5;
		this.eyeTarget.add( object );		

	};

	this.getHeadRotationY = function() {
		var rotationY = this.headMesh.rotation.y;
		return rotationY;
	};


	// ##Internal Helper Methods

	function createBody( geometry ) {

		if ( scope.debugInfo ) {
	
			console.info( "createBody" );
	
		}
	
		scope.bodyGeometry = geometry;

		createRobot();

	};

	function createHead( geometry ) {

		if ( scope.debugInfo ) {
	
			console.info( "createHead" );
	
		}
	
		scope.headGeometry = geometry;

		createRobot();

	};

	function createEyes( geometry ) {

		if ( scope.debugInfo ) {
	
			console.info( "createEyes" );
	
		}
	
		scope.eyesGeometry = geometry;

		createRobot();

	};


	function createRobot() {

		if ( scope.bodyGeometry && scope.headGeometry && scope.eyesGeometry ) {

			if ( scope.debugInfo ) {
		
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
			scope.bodyMesh.add( scope.headMesh );
			scope.headMesh.add( scope.eyesMesh );
			scope.headMesh.add( scope.eyeTarget );
			

			scope.bodyMesh.rotation.z = angleConvert( "d", scope.bodyRotationStartZ );

			// cache meshes

			scope.meshes = [ scope.bodyMesh, scope.headMesh, scope.eyesMesh ];

			// callback

			scope.loaded = true;

			// scope.cappback function must be added via protoype due to closer load

			if ( scope.callback ) {

				scope.callback( scope );

			}


		}

	};


};
// ##Inhearits form THREE.Entity()
THREE.Robot.prototype = new THREE.Entity();


