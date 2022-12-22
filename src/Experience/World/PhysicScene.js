import * as THREE from 'three'
import Experience from '../Experience.js'
import PhysicManager from '../Utils/PhysicManager.js'
import bodyTypes from '../Utils/BodyTypes.js'
import shapeTypes from '../Utils/ShapeTypes.js'
import CannonDebugger from 'cannon-es-debugger'


export default class PhysicScene
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Cube')
        }

        
        this.cube = null
        this.setCube()
        this.setFloor()
      
    }

    setCube()
    {
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
        const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
        this.scene.add(this.cube)
        this.cube.position.y = -4.5
 
    }

setFloor(){
    const floorGeometry = new THREE.BoxGeometry(50, 0.05, 50)
    const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.floor = new THREE.Mesh(floorGeometry, floorMaterial)
    this.scene.add(this.floor)
    this.floor.position.y = -5
    this.floorBody = PhysicManager.addBody(this.floor, bodyTypes.STATIC, shapeTypes.BOX)
    
}

    

    update()
    {
        
    }
}