THREE.Explosion = function( ) { 
	// ##Object Properties

	var scope = this;

	this.modelScale = 1;

	// building rigging

	this.explosionMesh = null;

	this.explosionGeometry = null;


	this.root = new THREE.Object3D();

	this.explosionLight = new THREE.PointLight();

	this.eyeTargetLink = eyeTarget;

	this.loaded = false;
	this.meshes = [];

	// internal helper variables

	this.alive = false;

	this.explosionGrowth = 10;

	this.scaleStart = 0.3;

	// debug flags
	
	this.debugInfo = false;


	// ##API
	this.loadExplotion = function( r ) {

		this.explosionGeometry = new THREE.SphereGeometry( r, 30, 15 );
		createExplotion();
	};

	this.explode = function( controls, vector, delta ) {


		if ( controls.explosion && this.loaded && this.alive === false ) {

			controls.explosion = false;
			this.alive = true;
			this.setVisible( true );
			this.root.position.copy( vector );

			//scope.explosionLight.intensity = 0.5;


		}
		if ( this.alive ) {

			this.scaleStart += 3 * delta;
			//this.root.rotation.y += angleConvert( "d", ( 0.9 * 59.0 * destory ) );
			this.root.rotation.y = ( this.root.rotation.y + ( 20 * delta ) );
			this.root.scale.set( this.scaleStart, this.scaleStart, this.scaleStart );
			
			if (this.scaleStart > 1.0 ) {

				this.destory();
			}

		}

	};

	this.destory = function () {

		if ( this.alive ) {

			this.scaleStart = 0.3;
			this.alive = false;
			this.setVisible( false );
			this.root.position.set( 0, 0, 0 );
			//this.root.rotation.set( 0, 0, 0 );
			this.root.scale.set( this.scaleStart, this.scaleStart, this.scaleStart );

			//scope.explosionLight.intensity = 0.5;
		
		} 

	};
	// ##Internal Helper Methods

	function createExplotion() {

		if ( scope.explosionGeometry ) {

			// explotion
			var explosioMapTexture = THREE.ImageUtils.loadTexture(  "./assets/textures/explosion.jpeg" );

			//var lightMapTexture = loadTexture( "./assets/textures/explosion.jpeg" );
			var explosionMaterial = new THREE.MeshBasicMaterial( { map: explosioMapTexture, overdraw: true } );
			//var explosionMaterial = new THREE.MeshPhongMaterial();
			//var explosionMaterial = new THREE.MeshPhongMaterial( { map: lightMapTexture, lightMap: lightMapTexture } );

			//explosionMaterial.color = new THREE.Color().setRGB( 0.98, 0.55, 0.10 );
			explosionMaterial.ambient = new THREE.Color().setRGB( 0, 0.13, 0.66 );
			explosionMaterial.specular = new THREE.Color().setRGB( 0.94, 0.1, 0.2 );
	

			scope.explosionMesh = createGeometry( scope.explosionGeometry, explosionMaterial, 0, 0, 0, 0, 0, 0, scope.modelScale );
			// set roots and rigs

			scope.root.add( scope.explosionMesh );

			// create light

/*			scope.explosionLight.intensity = 0.0;
			scope.explosionLight.castShadow = false;
			scope.explosionLight.color = new THREE.Color().setRGB( 0.98, 0.21, 0.10 );
			scope.explosionLight.position.set( 15, -5, -10 );
			scope.root.add( scope.explosionLight );
*/

			scope.meshes = [ scope.explosionMesh ];

			scope.loaded = true;


			if ( scope.callback ) {

				scope.callback( scope );

			}


		}

	};

	function setExplotionPosition() {

	};

};
// ##Inhearits form THREE.Entity()
THREE.Explosion.prototype = new THREE.Entity();