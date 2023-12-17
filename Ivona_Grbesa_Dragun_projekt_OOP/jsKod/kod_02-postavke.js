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

// što će se pokrenuti kad se klikne button Setup:
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);

function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "v10":
      setupVjezbe10();
      break;

    case "jazzjackrabbit":
      setupJazz();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */
function setupVjezbe10() {
  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platforme");

  let r = new Racoon(0, 0, GAME.getSpriteLayer("racoon"));
  GAME.addSprite(r);

  Postavke.racoon = r;

}

function setupJazz(){

  //ova fja postavlja sve spriteove u igru i sprema ih u polja staticke klase
  
  GAME.clearSprites(); //pociste se svi spriteovi
  Postavke.reset(); //sva staticka polja se postave na null odn na prazne nizove

  GAME.activeWorldMap.setCollisions("platforme"); //postavi da lik ne propada kroz nista sta je u sloju "platforme"

  // rabbit
  let r = new Rabbit(GAME.getSpriteLayer("rabbit"));
  GAME.addSprite(r); //dodajemo r u popis svih spriteova koji se crtaju
  Postavke.rabbit=r; //spremamo r u staticko polje rabbit

  // turtle
  let t = new Turtle(GAME.getSpriteLayer("turtle"));
  GAME.addSprite(t);
  Postavke.turtle1=t;
  Postavke.turtle1.x=4*32;
  Postavke.turtle1.y=0;

  let t2=new Turtle(GAME.getSpriteLayer("turtle"));
  GAME.addSprite(t2);
  Postavke.turtle2=t2;
  Postavke.turtle2.x=17*32; //ovo
  Postavke.turtle2.y=0; //i ovo umisto start


  let i=new Item(GAME.getSpriteLayer("odskocna")); 
  i.visible=true;
  GAME.addSprite(i);
  Postavke.item=i;

  //novcici su s ovim imenima u objectlayeru
  let c = ["c1", "c2", "c3", "c4", "c5"];

  for (let i=0; i<c.length; i++){
    let layer=GAME.getSpriteLayer(c[i]);
    let coin=new Coin(layer);
    coin.visible=true;
    GAME.addSprite(coin);
    Postavke.coins.push(coin); //dodamo i-ti novcic u niz koji je staticko polje
  }

  //carrot
  let m=["m1", "m2", "m3", "m4"];
  for (let i=0; i<m.length; i++){
    let layer=GAME.getSpriteLayer(m[i]);
    let carrot=new Carrot(layer);
    carrot.visible=true;
    GAME.addSprite(carrot);
    Postavke.mrkve.push(carrot);
  }


  Postavke.projektil=new Projektil(GAME.getSpriteLayer("p1")); //dohvacamo projektil imenom jer je u object layeru
  GAME.addSprite(Postavke.projektil);



  //checkpoint(cilj) 
  //nalazi se u object layeru, dohvacamo ga imenom
  Postavke.cilj=new Cilj(GAME.getSpriteLayer("cilj"));
  GAME.addSprite(Postavke.cilj);
  Postavke.cilj.start();

  
}

