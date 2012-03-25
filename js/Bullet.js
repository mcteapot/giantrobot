// Gyant Robot by Arjun Prakash
// Bullet.js

THREE.Bullet = function( eyeTarget ) { 

	// ##Object Properties

	var scope = this;

	this.modelScale = 1;

	// building rigging

	this.bulletMesh = null;
	this.bulletMeshLeft = null;
	this.bulletMeshRight = null;

	this.bulletGeometry = null;


	this.root = new THREE.Object3D();
	this.eyeTargetLink = eyeTarget;

	this.loaded = false;
	this.meshes = [];

	// internal helper variables

	this.alive = false;

	this.shiftY;
	this.shiftZ = 5;

	this.rotationX;
	this.zMove = 0;
	this.yMove = 0;

	this.velocity = 120;

	// debug flags
	
	this.debugInfo = true;

	// ##API
	this.loadBullet = function( i, j, k ) {
		
		this.shiftY = j/2;
		this.bulletGeometry = new THREE.CubeGeometry( i, j, k, 0, 0, 0 )
		creatBullet();
	};

	this.fire = function ( controls, rotation ) {
		
		if ( (this.alive === false) && this.loaded && controls.fire ) {
			this.rotationX = -rotation;
			this.alive = true;
			this.setVisible( true );
			this.root.position.copy( this.eyeTargetLink.matrixWorld.getPosition() );
			this.root.rotation.set( this.rotationX, 0, 0 );
			setBulletTrajectory();
			
		} 
	
	};

	this.move = function ( delta ) {

		if ( this.alive === true ) {
			//this.root.position.x +=  
			//this.root.position.y += this.yMove
			this.root.position.z += this.zMove * ( this.velocity * delta )
			this.root.position.y += this.yMove * ( this.velocity * delta )
			//this.root.position.x += this.xMove + ( this.velocity * delta );
			//this.root.position.y += this.yMove + ( this.velocity * delta );
		
		}

		if ( this.root.position.y > 200 ) {

			this.destory();
		}

		if ( this.debugInfo ) {

			console.group( "Bullet Info" );
				console.log( "bulletX: " + this.root.position.x );
				console.log( "bulletY: " + this.root.position.y );
				console.log( "bulletZ: " + this.root.position.z );
			console.groupEnd(); // end group
			
			console.group( "Bullet Trajectory" );
				console.log( "rotationX: " + this.rotationX );
				console.log( "xMove: " + scope.xMove );
				console.log( "yMove: " + scope.yMove );
			console.groupEnd(); // end group
		}

	};

	this.destory = function () {

		if ( this.alive ) {

			this.alive = false;
			this.setVisible( false );
			this.root.position.set( 0, 0, 0 );
			this.root.rotation.set( 0, 0, 0 );

			this.xMove = 0;
			this.yMove = 0;
		
		} 

	};

	// ##Internal Helper Methods

	function creatBullet() {
		
		if ( scope.bulletGeometry ) {

			//bullet 

			var bulletMaterial = new THREE.MeshPhongMaterial();
			bulletMaterial.color = new THREE.Color().setRGB( 0.98, 0.11, 0.18 );
			bulletMaterial.ambient = new THREE.Color().setRGB( 0, 0.13, 0.66 );
			bulletMaterial.specular = new THREE.Color().setRGB( 0.24, 0.21, 0.82 );

			scope.bulletMeshLeft = createGeometry( scope.bulletGeometry, bulletMaterial, 0, scope.shiftY, scope.shiftZ, 0, 0, 0, scope.modelScale );
			scope.bulletMeshRight = createGeometry( scope.bulletGeometry, bulletMaterial, 0, scope.shiftY, -scope.shiftZ, 0, 0, 0, scope.modelScale );

			// sets roots and rigs

			scope.root.add( scope.bulletMeshLeft );
			scope.root.add( scope.bulletMeshRight );

			// cache meshes

			scope.meshes = [ scope.bulletMeshRight, scope.bulletMeshLeft ];
			
			scope.loaded = true;

			// scope.cappback function must be added via protoype due to closer load

			if ( scope.callback ) {

				scope.callback( scope );

			}
		}

	};

	function setBulletTrajectory() {

		scope.yMove = ( Math.cos( scope.rotationX ) );
		scope.zMove = ( Math.sin( scope.rotationX ) );

	};

};
// ##Inhearits form THREE.Entity()
THREE.Bullet.prototype = new THREE.Entity();