class GameOverStage extends Stage
  constructor: (width, height, ctx) ->
    super(width, height, ctx)

  _init: () =>
    @gameOverText = "GAME OVER"
    @retryText = "Hit ENTER play again"
    @background = @getNoise()

  _update: (step) =>
    if @controller.isPressed(Keys.ENTER)
      @state = STATE.finished

  _render: () ->
    @ctx.save()

    @background = @getNoise()
    @ctx.putImageData(@background, 0, 0)

    Effects.anaglyph(
      @gameOverText, '72px Georgia',@ctx, @width / 2, @height / 3, 5)
    Effects.anaglyph(
      @retryText, '42px Georgia', @ctx, @width / 2, @height * 2 / 3, 3)

    @ctx.restore()

  getNoise: () ->
    imageData = @ctx.createImageData(@width, @height)

    i = 0
    while i < imageData.data.length
      # shade = 255 / Math.ceil(Math.random() * 4)
      color = (Math.random() * 120)|0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = 0
      imageData.data[i++] = color

    return imageData
