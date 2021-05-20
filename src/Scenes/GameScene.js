import 'phaser';
import logoImg from '../assets/logo.png';
import { Player, GunShip, ScrollingBackground } from './Entities';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.score=0;
    
  }
 
  preload () {
    // load images
    this.load.image('logo',logoImg);
  }
 
  create () {
    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    // this.anims.create({
    //   key: "sprPlayer",
    //   frames: this.anims.generateFrameNumbers("sprPlayer"),
    //   frameRate: 20,
    //   repeat: -1
    // });

    // this.backgrounds = [];
    //   for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
    //     var bg = new ScrollingBackground(this, "sprBg0", i * 10);
    //     this.backgrounds.push(bg);
    //   }

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    ); 

    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.playerLasers = this.add.group();
    this.time.addEvent({
      delay: 1000,
      callback: function() {
        var enemy = new GunShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0
        );
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true
    });

    

    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
          this.score += 5;
          this.scoreText.scoreText = "Score:" + this.score;
        }
      
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        player.explode(false);
        enemy.explode(true);
        player.onDestroy();
      }
    });
    this.scoreText = this.add.text(this.game.config.width-150 , this.game.config.height-20, "SCORE:0", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.scoreText.setOrigin(0.5);
        //this.scoreText =   this.add.text(this.game.config.width-150 , this.game.config.height-20,'score:0', {fontSize: '32px', fill:'#000'});

  }

  update(){
    // for (var i = 0; i < this.backgrounds.length; i++) {
    //   this.backgrounds[i].update();
    // }

    if (!this.player.getData("isDead")) {
    this.player.update();

    if (this.keyUp.isDown) {
      this.player.moveUp();
    }
    else if (this.keyDown.isDown) {
      this.player.moveDown();
    }
    
    if (this.keyLeft.isDown) {
      this.player.moveLeft();
    }
    else if (this.keyRight.isDown) {
      this.player.moveRight();
    }

    if (this.keySpace.isDown) {
      this.player.setData("isShooting", true);
    }
    else {
      this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
      this.player.setData("isShooting", false);
    }
  }

        
  }

 
};