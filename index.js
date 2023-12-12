import * as THREE from 'three'
import {OrbitControls} from 'OrbitControls'
import {GLTFLoader} from 'GLTFLoader'
import {AnimationMixer} from 'three'
// import {FontLoader}  from 'FontLoader'

let scene, camera, cameraPOV, renderer, controls
let geo, mat, mesh
let mixer, clips = [], clock
let currentAnimationIndex = 0
const loader = new GLTFLoader()

let init = () => {
    scene = new THREE.Scene()

    let fov = 45
    let w = window.innerWidth
    let h = window.innerHeight
    let aspect = w/h

    //3rd person cam
    camera = new THREE.PerspectiveCamera(fov, aspect)
    camera.position.set(0, 15, 55)
    camera.lookAt(0,7,0)

    //1st person cam
    // cameraPOV = new THREE.PerspectiveCamera(fov, aspect)
    // cameraPOV.position.set(-50, 15, 0)
    // cameraPOV.lookAt(0,15,0)

    renderer = new THREE.WebGLRenderer()
    renderer.setSize(w,h)
    renderer.setClearColor('black')
    renderer.shadowMap.enabled = true

    controls = new OrbitControls(camera, renderer.domElement)
    // controls.target(0, 7, 0)

    document.body.appendChild(renderer.domElement)
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

let sky = () => {
    geo = new THREE.BoxGeometry(1000, 1000, 1000)

    const ft = new THREE.TextureLoader().load("./Assets/cloudy/bluecloud_ft.jpg")
    const bk = new THREE.TextureLoader().load("./Assets/cloudy/bluecloud_bk.jpg")
    const up = new THREE.TextureLoader().load("./Assets/cloudy/bluecloud_up.jpg")
    const dn = new THREE.TextureLoader().load("./Assets/cloudy/bluecloud_dn.jpg")
    const rt = new THREE.TextureLoader().load("./Assets/cloudy/bluecloud_rt.jpg")
    const lf = new THREE.TextureLoader().load("./Assets/cloudy/bluecloud_lf.jpg")

    const materials = [
        new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide }), // right
        new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide }), // left
        new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide }), // top
        new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide }), // bottom
        new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide }), // front
        new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide })  // back
    ]
    mesh = new THREE.Mesh(geo, materials)
    scene.add(mesh)
}

let nightSky = () => {
    geo = new THREE.BoxGeometry(1000, 1000, 1000)

    const ft = new THREE.TextureLoader().load("./Assets/nightskycolor.png")
    const bk = new THREE.TextureLoader().load("./Assets/nightskycolor.png")
    const up = new THREE.TextureLoader().load("./Assets/nightskycolor.png")
    const dn = new THREE.TextureLoader().load("./Assets/nightskycolor.png")
    const rt = new THREE.TextureLoader().load("./Assets/nightskycolor.png")
    const lf = new THREE.TextureLoader().load("./Assets/nightskycolor.png")

    const materials = [
        new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide }), // right
        new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide }), // left
        new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide }), // top
        new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide }), // bottom
        new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide }), // front
        new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide })  // back
    ]
    mesh = new THREE.Mesh(geo, materials)
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
    loader.load("./three.js-r145/examples/fonts/gentilis_bold.typeface.json", function(font){
        geo = new TextGeometry("Plants NO Zombies", {
            font: font,
            size: 40,
            height: 5
        })
        mat = new THREE.MeshPhongMaterial({color: 0xCCB7B6})
        mesh = new THREE.Mesh(geo, mat)

        mesh.position.set(-55, 20, -50)
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

let render = () => {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera)
}

let ambientLight = () => {
    const light = new THREE.AmbientLight(0xFFFFFC, 0.5)
    scene.add(light)
    light.position.set(0,0,0)
    light.castShadow = true
}

let spotLight = () => {
    const light = new THREE.SpotLight(0xFFFFFF, 1.2) //day
    scene.add(light)
    light.position.set(-80,40,0)
    light.castShadow = true
}

window.onload = () => {
    init();
    grass();
    sky();
    // nightSky();
    zombie();

    fence1();
    fence2();
    fence3();
    fence4();
    fence5();

    // text(); -> masih error

    headPeas();
    mouthPeas();
    topPeas();
    eyes1();
    eyes2();
    trunk();
    walnut();

    ambientLight();
    spotLight();
    render();
}

window.onrensize = () => {
    let w = window.innerWidth
    let h = window.innerHeight

    renderer.setSize(w, h)
    camera.aspect = w/h
    camera.updateProjectionMatrix()
}