
// Collision types for the bodies must be powers of 2!
function pow2(x){
    return Math.pow(2, x);
}

const bodyTypes = {
    NONE : pow2(0), // Static body
    SPHERE : pow2(1),
    CUBE :pow2(2),
    CYLINDER: pow2(3),
    OTHERS : pow2(20),
}

export default bodyTypes;