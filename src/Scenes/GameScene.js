import 'phaser';
import logoImg from '../assets/logo.png';
import { Player, GunShip} from './Entities';
import form from '../Objects/UserNameForm';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
 
  preload () {
    // load images
    this.load.image('logo',logoImg);
  }
 
  create () {
    form.removeForm(this);
    //console.log(this.sys.game.globals.username);
    let user = this.sys.game.globals.username;
    console.log(user);
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

    
    let scoreText = this.add.text(this.game.config.width-250 , this.game.config.height-30, user+"'s SCORE:0", {
      fontFamily: 'monospace',
      fontSize: 40,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    scoreText.setOrigin(0.5);
    let score=0;
    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      
        score += 5;
        scoreText.setText(user+"'s Score:"+score
        );
        
        enemy.explode(true);
        playerLaser.destroy();
      
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        player.explode(false);
        enemy.explode(true);
        player.onDestroy();
      }
    });
    
       

  }

  update(){
   

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