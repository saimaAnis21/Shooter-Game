import 'phaser';
import button2 from '../assets/ui/blue_button02.png';
import button3 from '../assets/ui/blue_button03.png';
import box from '../assets/ui/grey_box.png';
import checkedbox from '../assets/ui/blue_boxCheckmark.png';
import bgmusic from '../assets/TownTheme.mp3';
import sprplayer from '../assets/sprPlayer.png';
import sprenemy from '../assets/sprEnemy0.png';
import sprlaser from '../assets/sprLaserPlayer.png';
import sprexplosion from '../assets/sprExplosion.png';
import sprbg0 from '../assets/sprBg0.png';
import sprrestart from '../assets/sprBtnRestart.png'; 
import sprrestartdown from '../assets/sprBtnRestartDown.png'; 
import sprrestarthover from '../assets/sprBtnRestartHover.png'; 

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  init () {
    this.readyCount = 0;
  }

  preload () {
        // add logo image
      this.add.image(400, 200, 'logo');

      // display progress bar
      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(240, 270, 320, 50);
    
      var width = this.cameras.main.width;
      var height = this.cameras.main.height;
      var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
          font: '20px monospace',
          fill: '#ffffff'
        }
      });
      loadingText.setOrigin(0.5, 0.5);
      
      var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        }
      });
      percentText.setOrigin(0.5, 0.5);

      var assetText = this.make.text({
        x: width / 2,
        y: height / 2 + 50,
        text: '',
        style: {
          font: '18px monospace',
          fill: '#ffffff'
        }
      });
      assetText.setOrigin(0.5, 0.5);
     
      // update progress bar
      this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(250, 280, 300 * value, 30);
      });
     
      // update file progress text
      this.load.on('fileprogress', function (file) {
        assetText.setText('Loading asset: ' + file.key);
      });
     
      // remove progress bar when complete
      this.load.on('complete', function () {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        assetText.destroy();
        this.ready();
      }.bind(this));
      
      this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

       // load assets needed in our game
      this.load.image('blueButton1', button2);
      this.load.image('blueButton2', button3);
      this.load.image('sprBtnRestart', sprrestart);
      this.load.image('sprBtnRestartDown', sprrestartdown);
      this.load.image('sprBtnRestartHover', sprrestarthover);
      this.load.image('phaserLogo', '../assets/logo.png');
      this.load.image('box', box);
      this.load.image('checkedBox', checkedbox);
      this.load.audio('bgMusic', [bgmusic]);
      this.load.image("sprBg0", sprbg0);
      this.load.image("sprBg1", "content/sprBg1.png");
      this.load.spritesheet("sprExplosion", sprexplosion, {
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("sprEnemy0", sprenemy, {
        frameWidth: 16,
        frameHeight: 16
      });
      this.load.image("sprLaserPlayer", sprlaser);
      this.load.spritesheet("sprPlayer", sprplayer, {
        frameWidth: 16,
        frameHeight: 16
      });
      
  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
 
  create () {
  }
};