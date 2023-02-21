import { v4 as uuidv4 } from 'uuid';

export default class Player {
  constructor() {
    this.id = uuidv4();
  }
}