// Gyant Robot by Arjun Prakash
// Main.js

// checks for webGL support
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// Variables
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var SHADOW_MAP_WIDTH = 2048;
var SHADOW_MAP_HEIGHT = 1024;

var container, stats;

var camera, scene, renderer, time;
var particleLight, pointLight;
		
var cameraTarget;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var robotVernon;
var buildingLeft, buildingRight;

var mouseX = 0;
var mouseY = 0;

var delta;

var controlsRobotHead = {
	turnLeft: false,
	turnRight: false,
	fire: false
}

// Debut objects

var debugControl;

var cube01;



// ## Run this shit!
init();
animate()

// ## Initialize everything
function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// Timer
	time = new Timer();

	// Scene
	scene = new THREE.Scene();

	// Camera
	camera = new THREE.PerspectiveCamera( 53, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 155.0,65.0,0.0 );

	camera.rotation.set( 0.0, 1.5, 0.0 );
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

	cameraTarget = new THREE.Vector3( 0.0, 120.0, 0.0  );
	camera.lookAt( cameraTarget );

	scene.add( camera );

	// Renderer
	renderer = new THREE.WebGLRenderer( { antialias: true, clearAlpha: 1, clearColor: 0x808080 } );
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.shadowCameraNear = 3;
	renderer.shadowCameraFar = this.camera.far;
	renderer.shadowCameraFov = 50;
	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = SHADOW_MAP_WIDTH;
	renderer.shadowMapHeight = SHADOW_MAP_HEIGHT;
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	container.appendChild( renderer.domElement );

	// Grid

	scene.add( createGrid() );

	// Creat Robot

	robotVernon = new THREE.Robot();
	
	robotVernon.callback =  function( object ) {

		addRobot( object, 0, 0, 0, 1 );

	};

	robotVernon.loadPartsJSON( "./assets/robotBody.js", "./assets/robotHead.js", "./assets/robotEyes.js" );


	// Create Buildings


	buildingLeft = new THREE.Building();

	buildingLeft.callback = function( object ) {

		addBuilding( object, -60, 0, 85, 10, 214, 0, 1 );

	};

	buildingLeft.loadPartsJSON( "./assets/building.js", "./assets/buildingtop.js" );


	buildingRight = new THREE.Building();

	buildingRight.callback = function( object ) {

		addBuilding( object, -60, -13, -85, 0, 214, 10, 1 );

	};

	buildingRight.loadPartsJSON( "./assets/building.js", "./assets/buildingspire.js" );

	//buildingLeft.setFrillPosition( 0, 234, 0 );

	// Lights
	
	//scene.add( new THREE.AmbientLight( 0xcccccc ) );

	// front left
	var pointLight01 = new THREE.PointLight();
	pointLight01.intensity = 1.0;
	pointLight01.castShadow = false;
	pointLight01.color = new THREE.Color().setRGB( 0.77, 0.78, 0.90 );
	pointLight01.position.set( 100, 117.33, 42.00);
	scene.add( pointLight01 );

	// back center
	var pointLight02 = new THREE.PointLight();
	pointLight02.intensity = 1.2;
	pointLight02.castShadow = false;
	pointLight02.color = new THREE.Color().setRGB( 0.86, 0.15, 0.11 );
	pointLight02.position.set( -100.04, 95.0, 0 );
	scene.add( pointLight02 );

	// front right
	var pointLight03 = new THREE.PointLight();
	pointLight03.intensity = 0.6;
	pointLight03.castShadow = false;
	pointLight03.color = new THREE.Color().setRGB( 0.61, 0.71, 0.99 );
	pointLight03.position.set( 100, 32.50, -187.50 );
	scene.add( pointLight03 );


	// WindowResize resizes screan according to screen
	THREEx.WindowResize( renderer, camera );

	container.appendChild( renderer.domElement );


		
	// FPS stats 
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	// Events
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	document.addEventListener( 'mousemove', onDocumentMouseDown, false );

	//document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	//document.addEventListener( 'touchmove', onDocumentTouchMove, false );


	// Debug

	scene.add( cube01 = debugCube( 0, 0, 0, 0, 0, 0, 5 ) );
	cube01.rotation.y = angleConvertHelper( "d", 45.0 );
	cube01.rotation.z = angleConvertHelper( "d", 45.0 );
	robotVernon.getEyeTarget( cube01 );

} 


// ## Animate and Display the Scene
function animate() {

	requestAnimationFrame( animate );
	render();
	stats.update();

} 

// ## Render the 3D Scene
function render() {

	//var delta = Date.now() * 0.0005;

	// Set delta
	delta = time.tick();

	// Game Code

	robotVernon.headRotation( controlsRobotHead );

	// Tests
	//cameraPosition.y =+ (targetRotation - cameraPosition.y) * 0.5;


	// Debug

	cube01.rotation.y = cube01.rotation.y + delta;

	// Console Logs

	//console.log( "detal: " + delta );

	// Render

	renderer.render( scene, camera );


} 






