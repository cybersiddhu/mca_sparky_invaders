enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
enum ActionKind {
    Walking,
    Idle,
    Jumping
}
// Sparky has been hit by an enemy Chip.
sprites.onOverlap(SpriteKindLegacy.Player, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 200)
    info.changeLifeBy(-1)
    music.playTone(131, music.beat(BeatFraction.Sixteenth))
    music.playTone(139, music.beat(BeatFraction.Sixteenth))
    music.playTone(131, music.beat(BeatFraction.Sixteenth))
    music.playTone(139, music.beat(BeatFraction.Sixteenth))
})
// Place barrier walls.
function tileMapSetup () {
    scene.setTileMap(img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . 7 . . . 7 . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`)
    scene.setTile(7, img`
5 5 5 b a a a a 5 5 5 b a a a a 
b 5 5 5 b a a a b 5 5 5 b a a a 
a b 5 5 5 b a a a b 5 5 5 b a a 
a a b 5 5 5 b a a a b 5 5 5 b a 
a a a b 5 5 5 b a a a b 5 5 5 b 
a a a a b 5 5 5 a a a a b 5 5 5 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, true)
}
// An enemy Chip hits a barrier.
scene.onHitTile(SpriteKindLegacy.Enemy, 7, function (sprite) {
    info.changeScoreBy(-50)
    sprite.startEffect(effects.warmRadial, 100)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // Check the shotFired state to see if a new one can
    // be fired.
    if (!(shotFired)) {
        ESD = sprites.createProjectileFromSprite(img`
. . . 5 . . . . 
. . . 5 . . . . 
. . . . 5 . . . 
. . . 5 . . . . 
. . 5 . . . . . 
. . . 5 . . . . 
. . . . 5 . . . 
. . . 5 . . . . 
`, Sparky, 0, -100)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        music.playTone(932, music.beat(BeatFraction.Sixteenth))
        shotFired = true
    }
})
// Animate the enemy Chips.
function chipAnim () {
    anim = animation.createAnimation(ActionKind.Idle, 250)
    anim.addAnimationFrame(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
d d d d d d d d d d d d d d d . 
d b b b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d b c b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d d d d d d d d d d d d d d d . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`)
    anim.addAnimationFrame(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
1 . 1 . 1 . 1 . 1 . 1 . 1 . . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
d d d d d d d d d d d d d d d . 
d b b b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d b c b b b b b b b b b b b d . 
d b b b b b b b b b b b b b d . 
d d d d d d d d d d d d d d d . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
1 . 1 . 1 . 1 . 1 . 1 . 1 . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`)
    animation.attachAnimation(Chip, anim)
    animation.setAction(Chip, ActionKind.Idle)
}
// Create the Sparky player.
function SparkySetup () {
    Sparky = sprites.create(img`
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c d . . . . . . . 
. . . . . . . c b . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . c 4 . . . . . . . 
. . . . . . . f f . . . . . . . 
. . . . . . . e 4 . . . . . . . 
. . . . . . e e 5 2 . . . . . . 
. . . . . . e 4 5 2 . . . . . . 
. . . . . c c c 2 2 2 . . . . . 
. . . . e e 4 4 4 5 2 2 . . . . 
. . e f f f c c 2 2 f f 2 2 . . 
. e e e e 2 2 4 4 4 4 5 4 2 2 . 
e e e e e e 2 2 4 4 4 5 4 4 2 2 
e e e e e e 2 2 4 4 4 4 5 4 2 2 
`, SpriteKindLegacy.Player)
    Sparky.setPosition(80, 108)
    controller.moveSprite(Sparky, 200, 0)
    Sparky.setFlag(SpriteFlag.StayInScreen, true)
    info.setLife(3)
}
// An enemy Chip has been shot.
sprites.onOverlap(SpriteKindLegacy.Projectile, SpriteKindLegacy.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(100)
    music.playTone(208, music.beat(BeatFraction.Quarter))
    music.playTone(175, music.beat(BeatFraction.Quarter))
})
// When Ruby's projectile hits something, flip the
// variable's state so another can be fired.
sprites.onDestroyed(SpriteKindLegacy.Projectile, function (sprite) {
    shotFired = false
})
let Chip: Sprite = null
let anim: animation.Animation = null
let Sparky: Sprite = null
let ESD: Sprite = null
let shotFired = false
effects.starField.startScreenEffect()
SparkySetup()
tileMapSetup()
shotFired = false
// Periodically create each wave of enemy Chips.
game.onUpdateInterval(1500, function () {
    Chip = sprites.createProjectileFromSide(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
1 b b b b b b b b b b b b b 1 . 
1 b b b b b b b b b b b b b 1 . 
1 b b b b b b b b b b b b b 1 . 
1 b b b b b b b b b b b b b 1 . 
1 b c b b b b b b b b b b b 1 . 
1 b b b b b b b b b b b b b 1 . 
. 1 1 1 1 1 1 1 1 1 1 1 1 1 . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. 1 . 1 . 1 . 1 . 1 . 1 . 1 . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, 2, 10)
    Chip.setKind(SpriteKindLegacy.Enemy)
    Chip.x = Math.randomRange(0, 152)
    chipAnim()
})
