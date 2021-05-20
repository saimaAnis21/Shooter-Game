import 'phaser';
import shipImg from '../assets/ship.png';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    //this.load.image('logo', shipImg);
  }
 
  create () {
    this.scene.start('Preloader');
  }
};