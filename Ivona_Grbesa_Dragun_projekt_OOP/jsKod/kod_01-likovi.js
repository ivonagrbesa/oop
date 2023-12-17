//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

// ovdje pišete svoje klase

class Racoon extends Sprite {
    constructor(x, y, layer) {
        super(x, y, 60, 60);
        this.frame_sets = {
            "up": [1],
            "walk-up": [1],
            "right": [1],
            "walk-right": [2, 3, 4, 5, 6, 7, 8],
            "down": [1],
            "walk-down": [1],
            "left": [11],
            "walk-left": [12, 13, 14, 15, 16, 17, 18]
        };

        this.layer = layer;
        this.visible = true; //tek kad se postavi layer

    }
}

class Animal extends Sprite{
    constructor(x, y, layer){

        super(x+2, y+2, 32-4, 32-4);

        this.frame_sets={};

        this.layer=layer;
        this.visible=true;

        if(this.constructor==Animal){
            throw new Error("Apstraktna klasa ne moze se instancirati.");
        }
    }

    jump(h=35){ //override metode iz klase Sprite gdje je zadano da skace za 35 tockica
        if(!this.jumping){
            this.jumping=true;
            this.velocity_y-=40;
        }
    }

    jumpMore(h=50){
        if (!this.jumping){
            this.jumping=true;
            this.velocity_y-=h;
        }
    }


}

class Rabbit extends Animal{
    constructor(layer){
        super(0,0,layer);

        this.frame_sets = {
            "up": [1],
            "walk-up": [1],
            "right": [1],
            "walk-right": [1],
            "down": [1],
            "walk-down": [1],
            "left": [1],
            "walk-left": [1]
        };

        this._zivot=100; 
        this.okvir=true;
    }

    get zivot(){
        return this._zivot;
    }
    set zivot(v){
        if (v<=0){
            console.log("KRAJ IGRE!");
            btnStop_click(); //zaustavlja se igra
        }
        else{
            this._zivot=v;
        }
    }


    //metoda za sakupljanje novcica i mrkvi
    collect(c){
        c.visible=false;
        this.zivot+=c.value;
    }

     //override metode updatePosition (koja inace baca lika na tlo zbog gravitacije)
    updatePosition(){
        super.updatePosition(2, 0.8); //povecali smo i gravitaciju i trenje
        if (this.y>=Postavke.dno){
            this.zivot=0;
            GameSettings.output("Kraj igre! Izgubili ste. Bodovi: "+this.zivot);
            btnStop_click();
        }
    }

    pucaj(p){
        p.put=0; //domet projektila se postavi na 0
        p.x=this.x; //koordinate projektila se postave na koordinate zeca
        p.y=this.y;
        p.visible=true;
        p.move=true; //postavimo da se krece
    }

   
}

class Turtle extends Animal{
    constructor(layer){
        super(0,0,layer);

        this.frame_sets = {
            "up": [1],
            "walk-up": [1],
            "right": [1],
            "walk-right": [1],
            "down": [1],
            "walk-down": [1],
            "left": [1],
            "walk-left": [1]
        };

        this.okvir=false;
        this.damage=25; //ovoliko bodova skida zecu kad takne kornjacu
    }

    /*start(){
        //this.x=4*32;
        //this.y=0;  
    }*/ //ovo dok je bila samo jedna kornjaca
    
}


class Collectable extends Item {

    constructor(layer) {
      super(layer);
  
      //napraviti apstraktnu klasu od Collectable
      if (this.constructor==Collectable){
        throw new Error("Collectable ne moze se instancirati.");
      }
    }
  
    getType() {
      return this.constructor.name; //vraca ime klase
    }

    updatePosition(){ //override istoimene metode iz klase Sprite, ovdi smo pregazili kod od tamo td ovdi ne radi nista
        //ovdi nema nista jer se collectables ne krecu
    }
  
}

class Coin extends Collectable{
    constructor (layer){
        super(layer);
        this.visible=true;
        this.value=10;
    }
}

class Carrot extends Collectable{
    constructor(layer){
        super (layer);
        this.visible=true;
        this.value=20; 
    }
    /*start(){
        this.x=8*32;
        this.y=5*32;
    }*/ //ovo smo imali kad je bila samo jedna mrkva
}


class Projektil extends Item{
    constructor(layer){
        super(layer);
        this.visible=false;
        this._put=0; //domet
        this.move=true;
    }


    get put(){
        return this._put;
    }
    //domet moze bit najvise 120 ulivo odn 120 udesno
    set put(v){
        if (v>=120){ //ako puca udesno
            this._put=0;
            this.move=false;
            this.visible=false;
        }
        else if(v<=-120){ //ako puca ulijevo
            this._put=0;
            this.move=false;
            this.visible=false;

        }
        else{
            this._put=v;
        }
    }

    updatePosition(){
        if (this.move){ 
            if (Postavke.rabbit.direction==90){ //ako puca udesno
                this.x+=5;
                this.put+=5;
            }
            else {  //ako puca ulijevo
                this.x-=5;
                this.put-=5;
            }
            
        }
    }


    stop(){
        this.visible=false;
        this.move=false;
    }

}

class Cilj extends Item{
    constructor(layer){
        super(layer);
        this.visible=true;
    }
    start(){
        this.x=29*32;
        this.y=6*32;
    }
}
