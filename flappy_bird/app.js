let config = {
    renderer: Phaser.AUTO,  // Usa WebGL si está disponible, de lo contrario, usa Canvas
    width: 800,             // Ancho del juego en píxeles
    height: 600,            // Alto del juego en píxeles
    physics: {
        default: 'arcade',  // Motor de física predeterminado (Phaser soporta varios)
        arcade: {
            gravity: { y: 300 },  // Gravedad en el eje Y (simula caída de objetos)
            debug: false          // Si es true, muestra colisiones y físicas visualmente
        }
    },
    scene: {
        preload: preload,  // Función que carga los recursos (imágenes, sonidos, etc.)
        create: create,    // Función que se ejecuta al iniciar la escena
        update: update     // Función que se ejecuta en cada frame del juego
    }
};

let game = new Phaser.Game(config)

function preload(){ // Aquí se cargan los recursos del juego antes de que inicie (imágenes, sonidos, etc.)
    this.load.image('background', 'assets/background.png');
    this.load.image('road', 'assets/road.png');
    this.load.image('column', 'assets/column.png');
    this.load.spritesheet('bird', 'assets/bird.png', {frameWidth: 64, frameHeight: 96});
    /*Carga un spritesheet (hoja de sprites) en lugar de una imagen normal.
    'bird' es el identificador del sprite.
    frameWidth: 64 y frameHeight: 96 indican que la imagen tiene múltiples frames, cada uno de 64 píxeles de ancho y 96 de alto.
    Esto se usa cuando el personaje tiene animaciones, como volar o correr.*/
}

let bird;
let hasLanded = false; //Inicialmente es false porque el pájaro aún no ha aterrizado.
let cursors;
let hasBumped = false;



function create(){
    // Aquí se configuran los objetos y el mundo del juego (personajes, plataformas, etc.)
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    /*this.add.image(x, y, key) crea una imagen en la escena.
    0, 0: Especifica la posición (x, y) en la que se colocará la imagen. .setOrigin(0, 0) cambia el punto de origen al esquina superior izquierda.
    Phaser, por defecto, coloca las imágenes con su punto de origen en el centro (es decir, el punto (0.5, 0.5) está en el medio de la imagen). */
    
    const roads = this.physics.add.staticGroup();
    
    const topColumns = this.physics.add.staticGroup({
        key: 'column', //Usa la imagen 'column' que cargaste en preload().
        repeat: 1, //Significa que, además de la primera columna, se generará 1 más (es decir, habrá 2 columnas en total).
        setXY: { x: 200, y: 0, stepX: 300 } //La primera columna se ubicará en (200, 0). Cada columna adicional estará 300 píxeles más adelante en el eje X. Así, la segunda columna estará en (500, 0).
    });
    
    const bottomColumns = this.physics.add.staticGroup({
        key: 'column',
        repeat: 1,
        setXY: { x: 350, y: 400, stepX: 300 },
    });
    
    const road = roads.create(400, 568, 'road').setScale(2).refreshBody();
    /*The roads variable allows us to create a single, static road variable.
    We specify that we want "roads" to have a static body.
    With the setScale() method, we specify that we want the road to be twice as big as its original size. 
    Since we changed the size, we need to add a call to the refreshBody() method in order for the physics to work now that the size has changed.
    */
    
    bird = this.physics.add.sprite(0, 50, 'bird').setScale(2);
    
    bird.setBounce(0.2); //With the .setBounce() method, we specify that the bird should bound slightly if it collides with something.
    
    bird.setCollideWorldBounds(true); //The .setCollideWorldBounds() method makes it so that our bird can bump into the edges of the screen, but not go through it.
    
    this.physics.add.overlap(bird, road, () => hasLanded = true, null, this); //Cuando el pájaro toca la carretera, hasLanded se vuelve true. A diferencia de collider, overlap no detiene el movimiento del objeto, solo detecta si bird está tocando road.
    
    this.physics.add.collider(bird, road); //Evita que el pájaro atraviese la carretera. Detecta colisiones entre bird y road. Si road es un objeto estático (como lo definiste en staticGroup), bird podrá aterrizar en la carretera y quedarse ahí en lugar de caer indefinidamente.
    
    cursors = this.input.keyboard.createCursorKeys();//Crea un objeto que detecta las teclas de flecha del teclado.Permite que cursors.left, cursors.right, cursors.up, y cursors.down sean accesibles.

    this.physics.add.overlap(bird, topColumns, ()=>hasBumped=true,null, this);
    this.physics.add.overlap(bird, bottomColumns, ()=>hasBumped=true,null, this);
    this.physics.add.collider(bird, topColumns);
    this.physics.add.collider(bird, bottomColumns);

    messageToPlayer = this.add.text(0, 0, `Instructions: Press space bar to start`, { fontFamily: '"Comic Sans MS", Times, serif', fontSize: "20px", color: "white", backgroundColor: "black" });

    Phaser.Display.Align.In.BottomCenter(messageToPlayer, background, 0, 50);

}

let messageToPlayer;
let isGameStarted = false;


function update(){
    
    // Se ejecuta en un bucle y se usa para actualizar el estado del juego (movimiento, colisiones, lógica, etc.)
    // if (cursors.up.isDown) {
    //     bird.setVelocityY(-160); //if the user presses the "up" button, then give the bird an upward velocity of -160
    // }
    if (cursors.up.isDown && !hasLanded && !hasBumped) {
        bird.setVelocityY(-160); //We are adding an additional condition that the bird cannot move up if it has landed.
    }
    if (!hasLanded || !hasBumped) {
        bird.body.velocity.x = 50;
    }
    if (hasLanded || hasBumped || !isGameStarted) { //This ensures the bird won't move unless the game has been started and it hasn't landed on the road or bumped into a column.
        bird.body.velocity.x = 0;
    }
    if (hasLanded || hasBumped) {
        messageToPlayer.text = `Oh no! You crashed!`;
    }
    if (!isGameStarted) {
        bird.setVelocityY(-160); //if the game hasn't yet started, we will give the bird a velocity of -160 in the y-direction. The bird will move up to the top of the screen instead of falling down.
      }
    if (cursors.space.isDown && !isGameStarted) {
        isGameStarted = true; //Here, we are saying that if the user presses the space key, and the isGameStarted variable is false (its initial value), then we will set it to true and start the game.
        messageToPlayer.text = 'Instructions: Press the "^" button to stay upright\nAnd don\'t hit the columns or ground';
    }
    if (bird.x > 750) {
        bird.setVelocityY(40);
        messageToPlayer.text = `Congrats! You won!`;
    } 
}

