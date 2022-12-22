import Experience from "../Experience";
import * as THREE from "three";
import * as dat from 'lil-gui'

export default class ThirdPersonCamera {
    constructor(params) {
        this.experience = new Experience();
        this.params = params;
        this.camera = params.camera;
        this.target = params.target;
        this.gui = new dat.GUI();
        this.currentPosition = new THREE.Vector3();
        this.currentLookAt = new THREE.Vector3();
        this.cameraUi = this.gui.addFolder('camera')
        this.clock = new THREE.Clock();
    }
    calculateIdealOffset() {
        const params = {
            x: 0,
            y: 10,
            z: -20,
        }
        // convert target rotation from euler to quaternion
        const targetRotation = new THREE.Quaternion();
        const camRot = new THREE.Euler(0, this.target.rotation.z, 0);
        targetRotation.setFromEuler(camRot);

        const idealOffset = new THREE.Vector3(params.x, params.y, params.z);
        idealOffset.applyQuaternion(targetRotation);

        idealOffset.add(this.target.position);

        return idealOffset;
    }
    calculateIdealLookAt() {
        // convert target rotation from euler to quaternion
        const targetRotation = new THREE.Quaternion();
        const camRot = new THREE.Euler(0, this.target.rotation.z, 0);
        targetRotation.setFromEuler(camRot);
        const idealLookAt = new THREE.Vector3(0, 4, 0);
        idealLookAt.applyQuaternion(targetRotation);
        idealLookAt.add(this.target.position);
        return idealLookAt;
    }


    update() {
        const delta = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();
        // const lerpPow = 3.0 * delta;
        const lerpPow = 1.0 - Math.pow(0.05, delta);
        const idealOffset = this.calculateIdealOffset();
        const idealLookAt = this.calculateIdealLookAt();
        // fill these in
        this.currentPosition.lerp(idealOffset, lerpPow);
        this.currentLookAt.lerp(idealLookAt, lerpPow);
        // this.camera.position.copy(this.currentPosition);
        // this.camera.lookAt(this.currentLookAt);
        console.log("test");
    }
}