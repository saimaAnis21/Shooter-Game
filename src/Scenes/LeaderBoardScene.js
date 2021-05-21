import Phaser from 'phaser';
import form from '../Objects/UserNameForm';
import leaderboard from '../LeaderBoard';
import Button from '../Objects/Button';


export default class LeaderboardScene extends Phaser.Scene {
    constructor() {
      super('Leaderboard');
    }
  
    create() {
      form.removeForm(this);
      leaderboard.displayScore(this);
      this.add.text(640, 20, 'Scoreboard', {
        fontSize: 40,
        color: '#FFF',
        fontStyle: 'bold',
        padding: 10,
      }).setOrigin(0.5);
  
      this.menuButton = new Button(this, 640, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    }
  }
