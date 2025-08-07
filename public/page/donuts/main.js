import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Fonction pour afficher les logs dans le div de debug
function debug(message) {
    // console.log(message);
    const debugDiv = document.getElementById('debug');
    if (debugDiv) {
        debugDiv.innerHTML += '<br>' + message;
        debugDiv.scrollTop = debugDiv.scrollHeight;
    }
}

class DonutScene {
    constructor() {
        debug('Initialisation de DonutScene');
        
        // Création de la scène
        this.scene = new THREE.Scene();
        
        // Configuration de la caméra
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Récupération du canvas
        const canvas = document.querySelector('#donut-scene');
        if (!canvas) {
            debug('ERREUR: Canvas #donut-scene non trouvé');
            return;
        }
        debug('Canvas trouvé: ' + canvas.id);
        
        // Configuration du renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        
        // Cache l'écran de chargement dès le début
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
        
        // Initialisation des variables
        this.time = 0;
        this.scrollProgress = 0;
        this.targetRotation = 0;
        this.targetPosition = null;
        this.currentSection = 'home';
        this.sprinkleExplosionFactor = 0;
        this.initialSprinklePositions = [];

        this.targetCameraPosition = { x: 0, y: 1, z: 4 };
        this.targetLookAt = { x: 0, y: 0, z: 0 };
        
        this.glazeColors = [
            new THREE.Color(0xff1493), // Rose vif
            new THREE.Color(0x00ffff), // Cyan
            new THREE.Color(0xff4500), // Orange vif
            new THREE.Color(0x9400d3), // Violet
            new THREE.Color(0x32cd32)  // Vert lime
        ];
        this.currentColorIndex = 0;

        this.init();
        this.createDonut();
        this.setupScrollAnimation();
        this.animate();
    }

    init() {
        console.log('Initialisation de la scène');
        
        // Configuration du renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0); // Fond transparent
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Position et orientation de la caméra
        this.camera.position.set(0, 2, 5);
        this.camera.lookAt(0, 0, 0);
        console.log('Position de la caméra:', this.camera.position);

        // Éclairage principal
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 5, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.bias = -0.001;
        this.scene.add(mainLight);

        // Lumière colorée qui tourne
        this.colorLight = new THREE.PointLight(0xff9dcd, 2, 10);
        this.colorLight.position.set(3, 2, 0);
        this.scene.add(this.colorLight);

        // Lumière d'appoint frontale
        const frontLight = new THREE.SpotLight(0xffffff, 0.8);
        frontLight.position.set(0, 2, 5);
        frontLight.target.position.set(0, 0, 0);
        frontLight.angle = Math.PI / 4;
        frontLight.penumbra = 0.5;
        frontLight.decay = 2;
        frontLight.distance = 10;
        this.scene.add(frontLight);
        this.scene.add(frontLight.target);

        // Création du plan de coupe (désactivé pour le moment)
        this.clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        this.renderer.localClippingEnabled = false;

        // Configuration des contrôles
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = false;
        this.controls.autoRotateSpeed = 2;
        this.controls.enabled = true;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 10;

        // Ajout des helpers pour le débogage
        // const axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper);
        // console.log('Helpers ajoutés à la scène');

        window.addEventListener('resize', this.onWindowResize.bind(this));
        console.log('Écouteur de redimensionnement ajouté');
    }

    createDonut() {
        console.log('Création du donut...');
        try {
            // Géométrie du donut
            const geometry = new THREE.TorusGeometry(1, 0.5, 64, 128);
            console.log('Géométrie créée');
            
            // Matériau pour la pâte
            const doughMaterial = new THREE.MeshStandardMaterial({
                color: 0xf4d6a3,  // Beige doré
                metalness: 0.1,
                roughness: 0.7
            });
            console.log('Matériau de la pâte créé');

            // Glaçage rose
            const glazeGeometry = new THREE.TorusGeometry(1.02, 0.52, 64, 128);
            debug('Géométrie du glaçage créée');
            
            this.glazeMaterial = new THREE.MeshStandardMaterial({
                color: 0xff9dcd,  // Rose
                metalness: 0.1,
                roughness: 0.3,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            debug('Matériau du glaçage créé');
            
            // Plan de coupe pour le glaçage (moitié supérieure)
            this.clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
            this.renderer.localClippingEnabled = true;

        // Création des pépites
        const sprinklesGroup = new THREE.Group();
        const sprinkleColors = [
            0xffffff,  // Blanc
            0xfff4b0,  // Jaune pâle
            0xff9dcd,  // Rose pâle
            0xb3e5fc   // Bleu très clair
        ];

        // Création des pépites
        for (let i = 0; i < 100; i++) {
            const sprinkleGeometry = new THREE.CapsuleGeometry(0.015, 0.08, 3, 8);
            const sprinkleMaterial = new THREE.MeshStandardMaterial({
                color: sprinkleColors[Math.floor(Math.random() * sprinkleColors.length)],
                metalness: 0.2,
                roughness: 0.3
            });
            const sprinkle = new THREE.Mesh(sprinkleGeometry, sprinkleMaterial);
            
            // Position aléatoire sur la moitié supérieure du donut
            const angle = Math.random() * Math.PI * 2;
            const tubeAngle = Math.random() * Math.PI; // Seulement sur la moitié supérieure
            const R = 1; // Rayon principal du donut
            const r = 0.5; // Rayon du tube
            
            sprinkle.position.x = (R + r * Math.cos(tubeAngle)) * Math.cos(angle);
            sprinkle.position.y = (R + r * Math.cos(tubeAngle)) * Math.sin(angle);
            sprinkle.position.z = -r * Math.sin(tubeAngle); // Inversion pour avoir les pépites sur le dessus
            
            // Orientation perpendiculaire à la surface
            const normal = new THREE.Vector3(sprinkle.position.x, sprinkle.position.y, sprinkle.position.z).normalize();
            sprinkle.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
            
            // Légère rotation aléatoire
            sprinkle.rotateOnAxis(normal, Math.random() * Math.PI * 2);
            
            sprinklesGroup.add(sprinkle);
        }
        console.log('Pépites créées:', sprinklesGroup.children.length);

        // Assemblage du donut
        this.donut = new THREE.Group();
        const dough = new THREE.Mesh(geometry, doughMaterial);
        const glaze = new THREE.Mesh(glazeGeometry, this.glazeMaterial);
        
        // Activation des ombres
        dough.castShadow = true;
        dough.receiveShadow = true;
        glaze.castShadow = true;
        glaze.receiveShadow = true;
        
        // Ajout des composants au groupe
        this.donut.add(dough);
        this.donut.add(glaze);
        this.donut.add(sprinklesGroup);
        
        // Position et rotation initiales
        this.donut.position.set(0, 0, 0);
        this.donut.rotation.x = Math.PI; // Rotation pour avoir le glaçage sur le dessus
        
        // Configuration du clipping pour le glaçage
        this.glazeMaterial.clippingPlanes = [this.clipPlane];
        
        // Ajout à la scène
        this.scene.add(this.donut);
        debug('Donut ajouté à la scène avec glaçage sur le dessus');
        
        // Création des particules d'arrière-plan
        this.createParticles();
        
        } catch (error) {
            console.error('Erreur lors de la création du donut:', error);
        }
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });

        this.particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particlesMesh);
    }

    setupScrollAnimation() {
        // Code pour la mise en place de l'animation au scroll
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        if (this.donut) {
            // Rotation continue du donut
            this.donut.rotation.y += 0.01; // Rotation plus rapide
            
            // Animation de la caméra en douceur
            const cameraSpeed = 0.05;
            this.camera.position.x += (this.targetCameraPosition.x - this.camera.position.x) * cameraSpeed;
            this.camera.position.y += (this.targetCameraPosition.y - this.camera.position.y) * cameraSpeed;
            this.camera.position.z += (this.targetCameraPosition.z - this.camera.position.z) * cameraSpeed;
            this.camera.lookAt(this.targetLookAt.x, this.targetLookAt.y, this.targetLookAt.z);

            // Animation de la lumière colorée
            const time = Date.now() * 0.001;
            this.colorLight.position.x = Math.sin(time) * 3;
            this.colorLight.position.z = Math.cos(time) * 3;
            this.colorLight.intensity = 1.5 + Math.sin(time) * 0.5; // Variation d'intensité
        } else {
            console.warn('Le donut n\'est pas initialisé');
        }

        if (this.particlesMesh) {
            this.particlesMesh.rotation.y += 0.0005;
        }

        // Mise à jour des contrôles et rendu
        if (this.controls) {
            this.controls.update();
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialisation de la scène
window.addEventListener('DOMContentLoaded', () => {
    const donutScene = new DonutScene();
});
