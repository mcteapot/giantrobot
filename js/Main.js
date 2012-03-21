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

var mouseX = 0;
var mouseY = 0;

var delta;

var controlsRobotHead = {
	turnLeft: false,
	turnRight: false,
	fire: false
}



// Load 3d objects
var loader = new THREE.JSONLoader();



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
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 5000 );
	camera.position.set( 120.0,83.0,0.0 );

	camera.rotation.set( 0.0, 1.5, 0.0 );
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();

	cameraTarget = new THREE.Vector3( 0.0, 30.0, 0.0  );
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

		addRobot(object, 0, 0, 0, 1);

	};

	robotVernon.loadPartsJSON( "./assets/robotBody.js", "./assets/robotHead.js", "./assets/robotEyes.js" );

	
	
	// Lights
	
	//scene.add( new THREE.AmbientLight( 0xcccccc ) );

	var pointLight01 = new THREE.PointLight();
	pointLight01.intensity = 1;
	pointLight01.castShadow = false;
	pointLight01.color = new THREE.Color().setRGB( 0.8666666666666667, 0.8823529411764706, 0.9019607843137255 );
	pointLight01.position.set( 100, 117.32788798133033, 42.00700116686119 );
	pointLight01.rotation.set(0,0,0);
	pointLight01.scale.set( 1, 1, 1 );
	scene.add( pointLight01 );

	var pointLight02 = new THREE.PointLight();
	pointLight02.intensity = 1;
	pointLight02.castShadow = false;
	pointLight02.color = new THREE.Color().setRGB( 0.8588235294117647, 0.2549019607843137, 0.10588235294117647 );
	pointLight02.position.set( -228.0423280423279, 0.641773628938215, 0 );
	pointLight02.rotation.set( 0, 0, 0 );
	pointLight02.scale.set( 1, 1, 1 );
	scene.add( pointLight02 );

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

	//console.log( "detal: " + delta );
	//console.log( "head.y: " + robotVernon.headMesh.rotation.y );


	//robotVernon.headMesh.rotation.y =+ (robotVernon.headMesh.rotation.y + delta);
	//robotVernon.headMesh.rotation.y = (robotVernon.headMesh.rotation.y - delta);
	//head.rotation.x =+ (targetRotation - head.rotation.x) * 0.08;
	//head.rotation.y =+ (targetRotation - head.rotation.y) * 0.1;
	//head.rotation.z =+ (targetRotation - head.rotation.z) * 0.05;
	//camera.rotation.z =+ (targetRotation - camera.rotation.z) * 0.1;
	//cameraPosition.y =+ (targetRotation - cameraPosition.y) * 0.5;

	robotVernon.headRotation( controlsRobotHead.turnRight, controlsRobotHead.turnLeft );

	//console.log("targetRotation: " + targetRotation);
	//console.log("headrotationY " + rotationConvertion( "r", robotVernon.headMesh.rotation.y) );
	//console.log("headrotationZ " + rotationConvertion( "r", robotVernon.headMesh.rotation.z) );
	//console.log("mouseX: " + mouseX);
	//console.log("targetRotation: " + targetRotation);

	renderer.render( scene, camera );

} 

function rotationConvertion( type, delta ) {
	var convertsion;

	if (type == "d") {
		// Takes in degree and return radian
		convertsion = delta * ( Math.PI / 180 );
	} else if (type = "r") {
		// Takes in radiun and returns degree
		convertsion = delta *  ( 180 / Math.PI ); 
	} else {
		console.log ( "rotationConvertion error" );
	}

	return convertsion;

}




