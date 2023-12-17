class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }

  /** @type {Racoon} */
  static racoon = null;

  // rabbit (jer ce bit samo jedan)
  static rabbit=null;

  // turtle
  static turtle1=null;
  static turtle2=null;


  static coins=[]; 

  static mrkve=[];

  //odskocna daska
  static item;

  //projektil 
  /** @type {Projektil} */
  static projektil;


  //cilj
  static cilj;

  
  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static dno=9*32; //y koord.za sve tocke dna

  static reset(){
    this.coins=[];
    this.rabbit=null;
    this.turtle1=null;
    this.turtle2=null;
    this.item=null; //odskocna daska
    this.mrkve=[];
    this.projektil=null;
    this.cilj=null;

  }
}
