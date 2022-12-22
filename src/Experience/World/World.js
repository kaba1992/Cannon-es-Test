import Experience from '../Experience.js'
import Environment from './Environment.js'
import PhysicScene from './PhysicScene.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.physicScene = new PhysicScene()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.physicScene)
            this.physicScene.update()
    }
}