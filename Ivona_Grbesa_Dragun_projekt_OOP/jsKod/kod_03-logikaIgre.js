//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/// <reference path="kod_01-likovi.js"/>
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "v10")
    vjezbe10();
  else if (GAME.activeWorldMap.name=="jazzjackrabbit"){
    jazz();
  }
  GAME.update();

};

function vjezbe10() {
  if (SENSING.right.active) {
    Postavke.racoon.moveRight();
  }

}

function jazz(){


  if (SENSING.left.active){
    Postavke.rabbit.moveLeft();
  }

  if (SENSING.right.active){
    Postavke.rabbit.moveRight();
  }

  if (SENSING.up.active){
    Postavke.rabbit.jump();
  }

  if (Postavke.rabbit.touching(Postavke.item)){ //ako zec dodiruje odskocnu dasku
    Postavke.rabbit.jumpMore(50);
  }



  if (SENSING.space.active){

    Postavke.rabbit.pucaj(Postavke.projektil);
  }

  if (Postavke.projektil.touching(Postavke.turtle1)){
    Postavke.projektil.stop();
    Postavke.turtle1.x=2000; //da se makne iz mape
  }

  if (Postavke.projektil.touching(Postavke.turtle2)){
    Postavke.projektil.stop();
    Postavke.turtle2.x=2000; 
  }

  if (Postavke.projektil.touching(Postavke.cilj)){
    Postavke.projektil.stop();
    GameSettings.output("Kraj igre! Pobijedili ste! Bodovi: "+ Postavke.rabbit.zivot);
    btnStop_click();
  }


  //ako dotakne kornjacu,gubi 25 bodova
  // za turtle1
  if (Postavke.rabbit.touching(Postavke.turtle1)){
    if (Postavke.rabbit.direction===90){ //ako prilazi kornjaci slijeva
      Postavke.rabbit.x=Postavke.turtle1.x+33; //pribaci zeca desno od kornjace
      //Postavke.turtle.visible=false;
      Postavke.rabbit.zivot-=Postavke.turtle1.damage; //smanji bodove za kornjacin damage (25)
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
    else if(Postavke.rabbit.direction===270){ //ako prilazi kornjaci zdesna
      Postavke.rabbit.x=Postavke.turtle1.x-33; //pribaci zeca livo od kornjace
      //Postavke.turtle.visible=false;
      Postavke.rabbit.zivot-=Postavke.turtle1.damage;
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
    else if (Postavke.rabbit.direction===180){ //ako s gornje strane padne na kornjacu
      Postavke.rabbit.x=Postavke.turtle1.x+33; //pribaci zeca desno od kornjace
      Postavke.rabbit.zivot-=Postavke.turtle1.damage;
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
  }


  // za turtle2
  if (Postavke.rabbit.touching(Postavke.turtle2)){
    if (Postavke.rabbit.direction===90){ //ako prilazi kornjaci slijeva
      Postavke.rabbit.x=Postavke.turtle2.x+33;
      //Postavke.turtle.visible=false;
      Postavke.rabbit.zivot-=Postavke.turtle2.damage;
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
    else if(Postavke.rabbit.direction===270){ //ako prilazi kornjaci zdesna
      Postavke.rabbit.x=Postavke.turtle2.x+33;
      //Postavke.turtle.visible=false;
      Postavke.rabbit.zivot-=Postavke.turtle2.damage;
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
    else if (Postavke.rabbit.direction===180){ //ako s gornje strane padne na kornjacu
      Postavke.rabbit.x=Postavke.turtle2.x+33;
      Postavke.rabbit.zivot-=Postavke.turtle2.damage;
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
  }

  //ako dotakne novcic, povecaj mu bodove za 10 i stavi da novcic vise nije visible
  for (let i=0; i<Postavke.coins.length; i++){
    const c=Postavke.coins[i];
    if (Postavke.rabbit.touching(c)){
      Postavke.rabbit.collect(c);
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
  }

  //ako dotakne mrkvu, povecaj bodove za 20 i postavi da mrkva nije visible
  for (let i=0; i<Postavke.mrkve.length; i++){
    const m=Postavke.mrkve[i];
    if(Postavke.rabbit.touching(m)){
      Postavke.rabbit.collect(m);
      GameSettings.output("Bodovi: "+Postavke.rabbit.zivot);
    }
  }

  //ako padne na dno, gubi zivot i bodovi su 0 
  // => to smo rijesili u klasi Rabbit overrideom metode updatePosition
}


