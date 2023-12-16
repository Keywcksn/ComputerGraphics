import * as THREE from 'three'
import * as TRI from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js'
import {OrbitControls} from 'OrbitControls'
import {GLTFLoader} from 'GLTFLoader'

let scene, camera, cameraM, cameraPOV, renderer, controls
let geo, mat, mesh
const loader = new GLTFLoader()

let init = () => {
    scene = new THREE.Scene()

    let fov = 45
    let w = window.innerWidth
    let h = window.innerHeight
    let aspect = w/h

    //3rd person cam
    cameraM = new THREE.PerspectiveCamera(fov, aspect)
    cameraM.position.set(0, 15, 55)
    
    camera = cameraM

    //1st person cam
    cameraPOV = new THREE.PerspectiveCamera(fov, aspect)
    cameraPOV.position.set(-50, 15, 0)
    cameraPOV.lookAt(0,15,0)

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(w,h)
    renderer.setClearColor('black')
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 7, 0)

    document.body.appendChild(renderer.domElement)
}

let changeCam = () => {
    scene.remove(cameraM)
    scene.remove(cameraPOV)
    if(camera === cameraM){
        camera = cameraPOV
    }
    else{
        camera = cameraM
    }
}

let grass = () => {
    geo = new THREE.PlaneGeometry(100, 75)
    let texture = new THREE.TextureLoader().load("./Assets/grass.png")
    mat = new THREE.MeshStandardMaterial({map: texture, side: THREE.DoubleSide})

    mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0, 0, -7.5)
    mesh.rotateX(Math.PI/2)
    mesh.receiveShadow = true

    scene.add(mesh)
}


const zombie = () => {
    loader.load("./Assets/zombie/scene.gltf", function(gltf){
        // console.log(gltf)
        const root = gltf.scene
        root.scale.set(60,60,60)
        root.position.set(10,0,0)
        root.rotateY(-45)
        root.castShadow = true
        root.receiveShadow = true
        root.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        });
        scene.add(root)
    });
}

let fence1 = () => {
    loader.load("./Assets/fence/scene.gltf", function(gltf){
        // console.log(gltf)
        const fence = gltf.scene
        fence.scale.set(10, 10, 10)
        fence.position.set(-40, 8.5, -44)
        fence.castShadow = true
        fence.receiveShadow = true
        fence.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        });
        scene.add(fence)
    });
}

let fence2 = () => {
    loader.load("./Assets/fence/scene.gltf", function(gltf){
        // console.log(gltf)
        const fence = gltf.scene
        fence.scale.set(10, 10, 10)
        fence.position.set(-20, 8.5, -44)
        fence.castShadow = true
        fence.receiveShadow = true
        fence.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        });
        scene.add(fence)
    });
}

let fence3 = () => {
    loader.load("./Assets/fence/scene.gltf", function(gltf){
        // console.log(gltf)
        const fence = gltf.scene
        fence.scale.set(10, 10, 10)
        fence.position.set(0, 8.5, -44)
        fence.castShadow = true
        fence.receiveShadow = true
        fence.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        });
        scene.add(fence)
    });
}

let fence4 = () => {
    loader.load("./Assets/fence/scene.gltf", function(gltf){
        // console.log(gltf)
        const fence = gltf.scene
        fence.scale.set(10, 10, 10)
        fence.position.set(20, 8.5, -44)
        fence.castShadow = true
        fence.receiveShadow = true
        fence.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        });
        scene.add(fence)
    });
}

let fence5 = () => {
    loader.load("./Assets/fence/scene.gltf", function(gltf){
        // console.log(gltf)
        const fence = gltf.scene
        fence.scale.set(10, 10, 10)
        fence.position.set(40, 8.5, -44)
        fence.castShadow = true
        fence.receiveShadow = true
        fence.traverse(function(child){
            if(child.isMesh){
                child.castShadow = true
                child.receiveShadow = true
            }
        });
        scene.add(fence)
    });
}

let text = () => {
    let loader = new TRI.FontLoader()
    // loader.load('three.js-r145/examples/fonts/gentilis_bold.typeface.json', function(font){
    loader.load('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/fonts/gentilis_bold.typeface.json', font => {
        let geo = new TRI.TextGeometry('Plants NO Zombies', {
            font: font,
            size: 10,
            height: 1
        })
        let mat = new THREE.MeshPhongMaterial({color: 0xCCB7B6})
        let mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(-55, 20, -50)
        
        mesh.castShadow = true

        scene.add(mesh)
    })
}

//peashooter
let headPeas = () => {
    let sphererad = 2.5
    let spherereg = 64
    geo = new THREE.SphereGeometry(sphererad, spherereg, spherereg)
    mat = new THREE.MeshPhongMaterial({color: 0x52D017})
    mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-30, 10, 0)

    mesh.castShadow = true
    scene.add(mesh)
}

let mouthPeas = () => {
    let top = 0.5
    let bot = 1
    let height = 2.5
    let radSeg = 64
    let heighSeg = 64
    
    geo = new THREE.CylinderGeometry(top, bot, height, radSeg, heighSeg)
    mat = new THREE.MeshPhongMaterial({color: 0x52D017})
    mesh = new THREE.Mesh(geo, mat)
    mesh.openEnded = true
    mesh.position.set(-26.5, 10, 0)
    mesh.castShadow = true
    mesh.rotateZ(Math.PI/2)

    scene.add(mesh)
}

let topPeas = () => {
    geo = new THREE.ConeGeometry(1, 2.5, 64)
    mat = new THREE.MeshPhongMaterial({color: 0x43B000})
    mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-32.5, 12, 0)
    mesh.castShadow = true
    mesh.rotateZ(Math.PI/4)

    scene.add(mesh)
}

let eyes1 = () => {
    geo =  new THREE.SphereGeometry(0.5, 64)
    mat = new THREE.MeshPhongMaterial({color: 0x000000})
    mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-28.5, 11, -1.5)
    mesh.castShadow = true

    scene.add(mesh)
}

let eyes2 = () => {
    geo =  new THREE.SphereGeometry(0.5, 64)
    mat = new THREE.MeshPhongMaterial({color: 0x000000})
    mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(-28.5, 11, 1.5)
    mesh.castShadow = true

    scene.add(mesh)
}

let trunk = () => {
    geo = new THREE.CylinderGeometry(0.75, 0.75, 10, 64, 64)
    mat = new THREE.MeshPhongMaterial({color: 0x4BBF15})
    mesh = new THREE.Mesh(geo, mat)
    mesh.openEnded = true
    mesh.position.set(-30, 5, 0)
    mesh.castShadow = true
    
    scene.add(mesh)
}

let walnut = () => {
    geo = new THREE.CylinderGeometry(4.5, 4.5, 3, 64, 64)
    let texture = new THREE.TextureLoader().load("./Assets/wallnut.jpeg")
    mat = new THREE.MeshPhongMaterial({map: texture})
    mesh = new THREE.Mesh(geo, mat)
    mesh.openEnded = true
    mesh.position.set(-17.5, 4.5, 0)
    mesh.castShadow = true
    mesh.rotateZ(Math.PI/2)
    
    scene.add(mesh)
}

var skyboxMaterials;
var skyboxMesh;

var skybox = () => {
    var skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);

    var TextureLoader = new THREE.TextureLoader();

    skyboxMaterials = [
        new THREE.MeshBasicMaterial({
            map: TextureLoader.load('./Assets/cloudy/bluecloud_ft.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: TextureLoader.load('./Assets/cloudy/bluecloud_bk.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: TextureLoader.load('./Assets/cloudy/bluecloud_up.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: TextureLoader.load('./Assets/cloudy/bluecloud_dn.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: TextureLoader.load('./Assets/cloudy/bluecloud_rt.jpg'),
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            map: TextureLoader.load('./Assets/cloudy/bluecloud_lf.jpg'),
            side: THREE.BackSide
        })
    ];

    skyboxMesh = new THREE.Mesh(skyboxGeo, skyboxMaterials);
    skyboxMesh.position.set(0,0,0);

    scene.add(skyboxMesh);
    spotLightDay()
};

let isDaySkybox = true;

var nightSkyboxMaterials;
var nightSkyboxMesh;

var nightSkybox = () => {
    var nightSkyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);

    var TextureLoader = new THREE.TextureLoader();

    nightSkyboxMaterials = new THREE.MeshBasicMaterial({
        map: TextureLoader.load('./Assets/nightskycolor.png'),
        side: THREE.BackSide});

    nightSkyboxMesh = new THREE.Mesh(nightSkyboxGeo, nightSkyboxMaterials);
    nightSkyboxMesh.position.set(0, 0, 0);

    scene.add(nightSkyboxMesh);
    spotLightNight()
};


document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) { 
        toggleSkybox();
    }
    else if(event.key === 'c' || event.key === 'C'){
        changeCam();
    }
});

let peaProjectile;
let isPeaProjectileActive = false;

const createPeaProjectile = () => {
    const sphereRadius = 1;
    const sphereWidthSegments = 64;

    const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereWidthSegments, sphereWidthSegments);
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x52D017 });

    peaProjectile = new THREE.Mesh(sphereGeometry, sphereMaterial);
    peaProjectile.position.set(-27, 10, 0);
    peaProjectile.castShadow = true;

    scene.add(peaProjectile);
    isPeaProjectileActive = true;
};

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    
    createPeaProjectile();
};

document.addEventListener('click', onMouseClick, false);


const movePeaProjectile = () => {
    if (isPeaProjectileActive) {
        peaProjectile.position.x += 2;

        const zombieBoundingSphere = new THREE.Sphere(zombie.position, 10);
        const peaBoundingSphere = new THREE.Sphere(peaProjectile.position, 1);

        if (zombieBoundingSphere.intersectsSphere(peaBoundingSphere)) {
            scene.remove(peaProjectile);
            isPeaProjectileActive = false;
        }
    }
};

let ambientLight = () => {
    const light = new THREE.AmbientLight(0xFFFFFC, 0.5)
    scene.add(light)
    light.position.set(0,0,0)
    light.castShadow = true
}

var spotLightDay = () => {
    var light = new THREE.SpotLight(0xFFFFFC, 1.2) //day
    scene.add(light)
    light.position.set(-80,40,0)
    light.castShadow = true
}

var spotLightNight = () => {
    var light = new THREE.SpotLight(0xFFFFFC, 0.5) //night
    scene.add(light)
    light.position.set(-80,40,0)
    light.castShadow = true
}

const toggleSkybox = () => {
    isDaySkybox = !isDaySkybox;

    if (isDaySkybox) {
        skyboxMesh.visible = true;
        nightSkyboxMesh.visible = false;
        // spotLightDay()

    } else {
        skyboxMesh.visible = false;
        nightSkyboxMesh.visible = true;
        // spotLightNight()
    }
};

let render = () => {
    requestAnimationFrame(render)
    controls.update()
    movePeaProjectile();
    renderer.render(scene, camera)
}

window.onload = () => {
    init();
    grass();
    
    zombie();

    fence1();
    fence2();
    fence3();
    fence4();
    fence5();

    text();

    headPeas();
    mouthPeas();
    topPeas();
    eyes1();
    eyes2();
    trunk();
    walnut();
    

    nightSkybox();
    skybox();

    ambientLight();
    render();
}

window.onresize = () => {
    let w = window.innerWidth
    let h = window.innerHeight

    renderer.setSize(w, h)
    camera.aspect = w/h
    camera.updateProjectionMatrix()
}