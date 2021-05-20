import 'phaser';

class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }
    explode(){
        if (!this.getData("isDead")) {
            // Set the texture to the explosion image, then play the animation
            this.setTexture("sprExplosion");  // this refers to the same animation key we used when we added this.anims.create previously
            this.play("sprExplosion"); // play the animation
      
            // pick a random explosion sound within the array we defined in this.sfx in SceneMain
            //this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();
      
            if (this.shootTimer !== undefined) {
              if (this.shootTimer) {
                this.shootTimer.remove(false);
              }
            }
      
            this.setAngle(0);
            this.body.setVelocity(0, 0);
      
            this.on('animationcomplete', function() {
              this.destroy();
              // if (canDestroy) {
              //   this.destroy();
              // }
              // else {
              //   this.setVisible(false);
              // }
      
            }, this);
      
            this.setData("isDead", true);
          }
    }
  }

class Player extends Entity {
    constructor(scene, x, y, key){
        super(scene, x, y, key, "Player");
        this.setData("speed", 200);
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
        
    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed");
    }
    
    moveDown() {
        this.body.velocity.y = this.getData("speed");
    }
    
    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }
    
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update(){
        this.body.setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
              this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { // when the "manual timer" is triggered:
              var laser = new PlayerLaser(this.scene, this.x, this.y);
              this.scene.playerLasers.add(laser);
            
              //this.scene.sfx.laser.play(); // play the laser sound effect
              this.setData("timerShootTick", 0);
            }
          }
    }

    onDestroy(){
      
      this.scene.time.addEvent({ // go to game over scene
        delay: 500,
        callback: function() {
          this.scene.scene.start("GameOver");
        },
        callbackScope: this,
        loop: false
      });
    }
}

class PlayerLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprLaserPlayer");
      this.body.velocity.y = -200;
    }
  }

class GunShip extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprEnemy0", "GunShip");
      this.body.velocity.y = Phaser.Math.Between(50, 100);
      this.play("sprEnemy0");
    }
  }


export { Player, GunShip};