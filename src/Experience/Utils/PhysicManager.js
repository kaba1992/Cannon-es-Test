import { Clock } from 'three/src/Three';
import { ShapeType, threeToCannon } from 'three-to-cannon';
import { Body, Box, Sphere, Cylinder, Vec3, SAPBroadphase, World, Material, ContactMaterial } from 'cannon-es';


class PhysicManager {
    constructor() {
        this.world = new World()
        this.world.gravity.set(0, -9.82, 0) //  -9.82 corresponds to Earth's gravity. y axes, if you want to set a gravity
        this.world.broadphase = new SAPBroadphase(this.world)
        this.world.solver.iterations = 5
        this.clock = new Clock()

        //set World Material
        // Default material
        this.defaultMaterial = new Material('default');
        this.groundMaterial = new Material('groundMaterial');
        this.slippery_ground = new Material('slipperyMaterial');
        this.defaultContactMaterial = new ContactMaterial(this.groundMaterial, this.slippery_ground, {
            friction: 0.0005, // Friction with the ground
            restitution: 0.3, // Restitution (bounciness)
            // contactEquationStiffness: 1e8,
            // contactEquationRelaxation: 3,
            // frictionEquationStiffness: 1e8,
            // frictionEquationRegularizationTime: 3,

        });
        this.world.defaultContactMaterial = this.defaultContactMaterial;

    }

    addBody(object, options, type = ShapeType.HULL) {

        // use threeToCannon to convert the object to a cannon shape with convexpolyhedron
        const { shape, quaternion } = threeToCannon(object, { type: type });

        // create a cannon body with the shape

        const body = new Body({
            shape: shape,
            position: new Vec3(object.position.x, object.position.y, object.position.z),
            quaternion: quaternion,
            ...options
        });

        this.world.addBody(body)
        return body
    }


    removeBody(body) {
        this.world.removeBody(body);
    }
    // If Convex Hull dont work good on object3D model u can set your custom shape with this function

    addCustomBody(bodyType, { width, height, depth, radiusTop, radiusBottom, radius }, options, object) {
        // add box shape to object depending on the size of the object
        if (bodyType === 'Box') {
            const body = new Body({
                shape: new Box(new Vec3(width, height, depth)),
                position: new Vec3(object.position.x, object.position.y, object.position.z),
                ...options
            })
            this.world.addBody(body)
            return body
        }
        if (bodyType === 'Sphere') {
            const body = new Body({
                shape: new Sphere(radius),
                position: new Vec3(object.position.x, object.position.y, object.position.z),
                ...options
            })
            this.world.addBody(body)
            return body
        }
        if (bodyType === 'Cylinder') {
            const body = new Body({
                shape: new Cylinder(radiusTop, radiusBottom, height),
                position: new Vec3(object.position.x, object.position.y, object.position.z),
                ...options
            })
            this.world.addBody(body)
            return body
        }
    }


    update() {
        const delta = this.clock.getDelta()
        this.world.step(1 / 60, delta, 3); // expérience will run at 60 fps

    }
}

export default new PhysicManager()