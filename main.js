import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const loader = new THREE.TextureLoader();

//loading texture
const texture = loader.load ('/ground.jpg')
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );


class Box extends THREE.Mesh {
    constructor({
      width,
      height,
      depth,
      color = '#00ff00',
      velocity = {
        x: 0,
        y: 0,
        z: 0
      },

    }) {
      super(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshStandardMaterial({ color })
      )

      this.width = width
      this.height = height
      this.depth = depth
      this.velocity = velocity



    
    }

    update(){

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  


 
    
    }

}

  const cube = new Box({
    width: 1,
    height: 1,
    depth: 0.1,
    color: "#be03fc",
    velocity: {
      x: 0,
      y: 0,
      z: 0
    }
  })
  cube.position.z = 0

  scene.add(cube)

    const material_one = new THREE.MeshPhongMaterial()
    material_one.color = new THREE.Color(0x00ff00)
    material_one.map = texture;
    material_one.transparent = true;
const ground = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 1 ) , material_one );
scene.add( ground );
ground.position.z = -1
camera.position.z = 15;

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.y = 3
light.position.z = 1
scene.add(light)



const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    s: {
      pressed: false
    },
    w: {    
      pressed: false
    }
  }
  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyA':
        keys.a.pressed = true
        break
      case 'KeyD':
        keys.d.pressed = true
        break
      case 'KeyS':
        keys.s.pressed = true
        break
      case 'KeyW':
        keys.w.pressed = true
        break
    }
  })

  window.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyA':
        keys.a.pressed = false
        break
      case 'KeyD':
        keys.d.pressed = false
        break
      case 'KeyS':
        keys.s.pressed = false
        break
      case 'KeyW':
        keys.w.pressed = false
        break
    }
  })





  const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );
    
	}

	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );
  
window.requestAnimationFrame(render);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    

    cube.velocity.x = 0
    cube.velocity.y = 0
    if (keys.a.pressed) cube.velocity.x = -0.05
    else if (keys.d.pressed) cube.velocity.x = 0.05

    if (keys.s.pressed) cube.velocity.y = -0.05
    else if (keys.w.pressed) cube.velocity.y = 0.05
    cube.update()
    console.log()
    
    
}
animate();