class Controller
  # We can make private variables!
  instance = null

  @pressed: new Map

  # Static singleton retriever/loader
  @get: ->
    if not @instance?
      instance = new @
    return instance

  constructor: () ->
    document.onkeyup = (event) ->
      Controller.pressed[event.keyCode] = false

    document.onkeydown = (event) ->
      Controller.pressed[event.keyCode] = true

  isPressed: (keyCode) ->
    return Controller.pressed[keyCode]

Keys = {
  ENTER: 13
  LEFT: 37
  RIGHT: 39
  UP: 38
  DOWN: 40
  A: 65
  D: 68
  W: 87
  S: 83
}
