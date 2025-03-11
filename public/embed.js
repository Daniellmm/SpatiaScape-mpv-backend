import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class ThreeViewer {
    constructor(containerId, modelUrl) {
        this.container = document.getElementById(containerId);
        this.modelUrl = modelUrl;
        this.init();
    }

    init() {
        // Set up scene, camera, and renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.container.appendChild(this.renderer.domElement);

        // Add lighting
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        this.scene.add(light);

        // Load the 3D model
        const loader = new GLTFLoader();
        loader.load(this.modelUrl, (gltf) => {
            this.scene.add(gltf.scene);
        });

        // Set up camera position
        this.camera.position.z = 5;

        // Add OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Render loop
        const animate = () => {
            requestAnimationFrame(animate);
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}

// Initialize the viewer when the script is loaded
const containerId = "three-viewer-container";
const modelUrl = ""; // dynamic URL
new ThreeViewer(containerId, modelUrl);