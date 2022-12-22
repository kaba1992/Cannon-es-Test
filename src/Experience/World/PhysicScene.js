import * as THREE from 'three'
import Experience from '../Experience.js'
import PhysicManager from '../Utils/PhysicManager.js'
import bodyTypes from '../Utils/BodyTypes.js'
import shapeTypes from '../Utils/ShapeTypes.js'
import CannonDebugger from 'cannon-es-debugger'
import KeyboardManager from '../Utils/keyBoardManager.js'
import { Vec3 } from "cannon-es"
import ThirdPersonCamera from '../Utils/ThirdPersonCamera.js'
import { Body } from 'cannon-es'


export default class PhysicScene {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.clock = new THREE.Clock()
        this.debug = this.experience.debug
        this.camera = this.experience.camera.instance
        this.cannonDebugger = new CannonDebugger(this.scene, PhysicManager.world, {
            // options...
        })


        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Cube')
        }


        this.cube = null
        this.velocity = 100000
        this.keyboard = new KeyboardManager.KeyboardState()
        this.setCube()
        this.setFloor()
        this.setbricks()

    }

    setCube() {
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        this.scene.add(this.cube)
        this.cube.position.y = -4.2
        this.cubeBody = PhysicManager.addBody(
            this.cube,
            {
                mass: 40,
                fixedRotation: true,
                linearDamping: 0.85,


            },
            shapeTypes.BOX
        )

        this.ThirdPersonCamera = new ThirdPersonCamera(
            {
                camera: this.camera,
                target: this.cube,
            }
        )


    }


    setFloor() {
        const floorGeometry = new THREE.BoxGeometry(50, 0.05, 50)
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        this.floor = new THREE.Mesh(floorGeometry, floorMaterial)
        this.scene.add(this.floor)
        this.floor.position.y = -5
        this.floorBody = PhysicManager.addBody(
            this.floor,
            {
                type: Body.STATIC, //does not move during simulation and behaves as if it has infinite mass.
                // collisionFilterGroup: bodyTypes.STATIC,
                mass: 0,
                material: "default",// It defines the body interaction with other bodies.  Others(concate, plastic etc)
            },
            shapeTypes.BOX
        )

    }

    setCubeControls() {
        let delta = this.clock.getDelta()
        let distance = this.velocity * delta



        if (this.keyboard.pressed("left") || this.keyboard.pressed("q")) {
            this.cubeBody.applyImpulse(new Vec3(-distance, 0, 0), new Vec3(0, 0, 0))

        }

        if (this.keyboard.pressed("right") || this.keyboard.pressed("d")) {
            this.cubeBody.applyImpulse(new Vec3(distance, 0, 0), new Vec3(0, 0, 0))
            // this.cubeBody.position.x += 0.1
        }

        if (this.keyboard.pressed("up") || this.keyboard.pressed("z")) {
            this.cubeBody.applyImpulse(new Vec3(0, 0, -distance), new Vec3(0, 0, 0))
        }

        if (this.keyboard.pressed("down") || this.keyboard.pressed("s")) {
            this.cubeBody.applyImpulse(new Vec3(0, 0, distance), new Vec3(0, 0, 0))
        }

    }

    setbricks() {
        let bricksCount = 30
        this.bricks = []
        const bricksGeometry = new THREE.BoxGeometry(1.5, 0.4, 1.5)
        const bricksMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        for (let i = 0; i < bricksCount; i++) {
            this.bricks[i] = new THREE.Mesh(bricksGeometry, bricksMaterial)
            this.scene.add(this.bricks[i])
            this.bricks.push(this.bricks[i])

            this.bricks[i].position.x = (i % 5) * 1.5 - 4
            this.bricks[i].position.y = Math.floor(i / 5) * 1.2 - 4.5
            this.bricks[i].position.z = -15

            this.bricks[i].body = PhysicManager.addBody(
                this.bricks[i],
                {
                    mass: 10,
                    fixedRotation: false,
                    linearDamping: 0.85,
                    
                    material: "default",// It defines the body interaction with other bodies.  Others(concate, plastic etc)
                    type: Body.DYNAMIC,

                },
                shapeTypes.BOX

            )
        }

    }


    update() {

        this.cannonDebugger.update()
        this.ThirdPersonCamera.update(this.clock.getDelta())
        this.setCubeControls()
        this.cube.position.copy(this.cubeBody.position)
        this.cube.quaternion.copy(this.cubeBody.quaternion)
        PhysicManager.update()
        this.bricks.forEach(brick => {
            brick.position.copy(brick.body.position)
            brick.quaternion.copy(brick.body.quaternion)
        })

    }
}