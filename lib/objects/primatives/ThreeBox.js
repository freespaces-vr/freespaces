import { v4 as uuidv4 } from 'uuid';

export default class ThreeBox {
  constructor(size, position, rotation, color) {
    this.id = uuidv4();
    this.type = 'ThreeBox';
    this.size = size;
    this.position = position;
    this.rotation = rotation;
    this.color = color;
  }
}