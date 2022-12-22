import { ShapeType } from 'three-to-cannon';

const shapeTypes = {
    HULL: ShapeType.HULL,
    BOX: ShapeType.BOX,
    SPHERE: ShapeType.SPHERE,
    CYLINDER: ShapeType.CYLINDER,
    MESH: ShapeType.MESH, //(Not recommended — limitations: https://github.com/pmndrs/cannon-es/issues/21)

};

export default shapeTypes;