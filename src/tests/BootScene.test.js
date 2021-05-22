import Phaser from 'phaser';
import BootScene from '../Scenes/BootScene';

describe('Boot', () => {
  test('Boot scene has a constructor', () => {
    expect(BootScene.prototype.constructor).not.toBe(false);
  });

  test('Scene is created correctly', () => {
    const scene = new BootScene({
      active: true,
    });
    expect(scene.sys.config).toBe('Boot');
  });

  test('BootScene to be a function', () => {
    expect(typeof BootScene).toBe('function');
  });

  test('BootScene scene is a subclass of scene', () => {
    expect(BootScene.prototype instanceof Phaser.Scene).toBe(true);
  });

  test('BootScene to not be undefined', () => {
    expect(typeof BootScene).not.toBe('undefined');
  });
});