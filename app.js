// Scene
var scene = new THREE.Scene();

// Camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Resize Event Listener
window.addEventListener('resize', () => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Sphere
var sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -3;
scene.add(sphere);

// Torus
var torusGeometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
var torusMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
var torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.x = 3;
scene.add(torus);

// Lighting
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 10, 5);
scene.add(pointLight);

// Raycaster for mouse interaction
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(Math.random() * 0xffffff);
    }
}

window.addEventListener('click', onMouseClick, false);

// Animation Function
function animate() {
    requestAnimationFrame(animate);

    // Rotating the cube and torus
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    torus.rotation.y += 0.01;

    // Bouncing sphere
    sphere.position.y = Math.abs(Math.sin(Date.now() * 0.002)) * 2;

    // Render the scene
    renderer.render(scene, camera);
}

animate();
