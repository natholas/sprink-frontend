import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { throttle } from '../../libs/throttle'
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-bubbles',
  templateUrl: './bubbles.component.html',
  styleUrls: ['./bubbles.component.scss']
})
export class BubblesComponent implements OnInit, OnDestroy {

  bubble: HTMLImageElement
  poppedBubble: HTMLImageElement
  bubbles: any[] = []
  poppedBubbles = []
  targetBubbleCount: number
  maxCanvasSize = 1920
  bubbleCountWeight = 5000 // less is more
  canvasScale = 1
  minBubbleSize = 10
  maxBubbleSize = 100
  speedOffset = 0.015
  bubbleBaseSpeed = 0.002
  sideSpeed = 100
  mouseDown = false
  frameTimes = [[0, Date.now()]]
  playing = true
  maxBubbleCount = 500
  popped = 0
  @Input() startCount
  @Input() multiplier
  @Output() onUpdate: EventEmitter<any> = new EventEmitter()

  @ViewChild('bubblesCanvas', { static: true }) canvas: ElementRef
  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.popped = this.startCount || 0
    this.bubble = document.createElement('img')
    this.poppedBubble = document.createElement('img')
    let otherLoaded = false
    this.bubble.onload = () => {
      if (otherLoaded) this.start()
      otherLoaded = true
    }
    this.poppedBubble.onload = () => {
      if (otherLoaded) this.start()
      otherLoaded = true
    }
    this.bubble.src = '/assets/bubble.png'
    this.poppedBubble.src = '/assets/popped-bubble.png'
  }

  start() {
    let canvas: HTMLCanvasElement = this.canvas.nativeElement
    let ctx = canvas.getContext('2d')

    let rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    if (canvas.width > this.maxCanvasSize) {
      this.canvasScale = 1 / this.maxCanvasSize * canvas.width
      canvas.height = canvas.height / canvas.width * this.maxCanvasSize
      canvas.width = this.maxCanvasSize;
    }

    this.targetBubbleCount = (rect.width / this.canvasScale) * rect.height / this.bubbleCountWeight
    if (this.targetBubbleCount > this.maxBubbleCount) this.targetBubbleCount = this.maxBubbleCount
    
    while (this.bubbles.length < this.targetBubbleCount) this.addBubble(true)

    for (let i = 0; i < 8; i++) {
      this.bubbleFrameLogic(canvas, ctx, 1000, false)
    }

    window.addEventListener('resize', () => {
      let rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      if (canvas.width > this.maxCanvasSize) {
        this.canvasScale = 1 / this.maxCanvasSize * canvas.width
        canvas.height = canvas.height / canvas.width * this.maxCanvasSize
        canvas.width = this.maxCanvasSize;
      }
      this.targetBubbleCount = (rect.width / this.canvasScale) * rect.height / this.bubbleCountWeight
      if (this.targetBubbleCount > this.maxBubbleCount) this.targetBubbleCount = this.maxBubbleCount
    })

    canvas.parentElement.parentElement.addEventListener('mousedown', () => this.mouseDown = true, { passive: true })
    canvas.parentElement.parentElement.addEventListener('mouseup', () => this.mouseDown = false, { passive: true })
    canvas.parentElement.parentElement.addEventListener('click', (e) => this.popBubblesAt(canvas, e.clientX, e.clientY), { passive: true })
    canvas.parentElement.parentElement.addEventListener('mousemove', (e) => this.mouseDown && this.popBubblesAt(canvas, e.clientX, e.clientY), { passive: true })
    canvas.parentElement.parentElement.addEventListener('touchstart', (e) => Array.from(e.touches).forEach(t => this.popBubblesAt(canvas, t.clientX, t.clientY)), { passive: true })
    canvas.parentElement.parentElement.addEventListener('touchmove', (e) => Array.from(e.touches).forEach(t => this.popBubblesAt(canvas, t.clientX, t.clientY)), { passive: true })

    this.zone.runOutsideAngular(() => this.doFrame(canvas, ctx))
  }

  updateBubbleCount = throttle(() => {
    this.onUpdate.emit(this.popped)
  }, 250)

  popBubblesAt(canvas: HTMLCanvasElement, x: number, y: number) {
    y -= canvas.getBoundingClientRect().top

    x /= this.canvasScale
    y /= this.canvasScale
    
    let bubbles = this.bubbles.filter(bubble => {
      let xDiff = Math.abs(x - (canvas.width * bubble.x / 100))
      let yDiff = Math.abs(y - (canvas.height * bubble.y / 100) - (bubble.size / this.canvasScale) / 2)
      return xDiff < (bubble.size / this.canvasScale) / 2 && yDiff < (bubble.size / this.canvasScale) / 2
    })
    bubbles.forEach(bubble => {
      this.destroyBubble(bubble)
      if (this.onUpdate) this.popped += 1 * this.multiplier
    })

    if (this.onUpdate) this.updateBubbleCount()
  }
  
  doFrame(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    let timeSinceLastFrame = this.frameTimes.reduce((t, v) => t + v[0], 0) / this.frameTimes.length
    if (timeSinceLastFrame > 1000) {
      timeSinceLastFrame = 0
    } else if (this.frameTimes.filter(t => t[0] > 100).length > 2) {
      ctx.clearRect(0,0,canvas.width, canvas.height)
      return console.log('Cancelled bubble animation due to bad performance')
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bubbles.sort((a, b) => a.size > b.size ? 1 : -1)

    this.bubbleFrameLogic(canvas, ctx, timeSinceLastFrame)
    
    if (this.frameTimes.length > 3) this.frameTimes.splice(0, 1)
    let frameTime = Date.now() - this.frameTimes[this.frameTimes.length - 1][1]
    this.frameTimes.push([frameTime, Date.now()])
    if (this.playing) window.requestAnimationFrame(() => this.doFrame(canvas, ctx))
  }

  bubbleFrameLogic(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, timeDiff: number, draw = true) {
    let offset = canvas.getBoundingClientRect()
    if (offset.bottom < 0) return
    
    this.bubbles.forEach(bubble => {
      let x = canvas.width / 100 * bubble.x
      let y = canvas.height / 100 * bubble.y
      x -= (bubble.size / this.canvasScale) / 2
      
      ctx.globalAlpha = 0.1 + (1 / this.maxBubbleSize * (bubble.size / this.canvasScale))
      
      if (draw) ctx.drawImage(this.bubble, x, y, bubble.size / this.canvasScale, bubble.size / this.canvasScale)
      bubble.y += bubble.speedY * timeDiff
      bubble.x += bubble.speedX * timeDiff / canvas.width
    })

    this.poppedBubbles.forEach(pop => {
      let x = canvas.width / 100 * pop.x
      let y = canvas.height / 100 * pop.y
      y += pop.bubbleSize / 2
      x -= (pop.size / this.canvasScale) / 2
      y -= (pop.size / this.canvasScale) / 2
      pop.size *= 1.04
      ctx.globalAlpha = 1 - (pop.frames / 150);
      if (draw) ctx.drawImage(this.poppedBubble, x, y, pop.size / this.canvasScale, pop.size / this.canvasScale)
      pop.frames += timeDiff
      if (pop.frames > 150) {
        this.poppedBubbles.splice(this.poppedBubbles.indexOf(pop), 1)
      }
    })

    ctx.globalAlpha = 1

    this.bubbles.forEach(bubble => (bubble.y < bubble.popAt) && this.destroyBubble(bubble))
    while (this.bubbles.length < this.targetBubbleCount) this.addBubble()
  }

  addBubble(init = false) {
    let bubble: any = {
      x: Math.random() * 100, y: 100 + (init ? Math.random() * 80 : 0),
      popAt: Math.random() * 50,
      size: this.minBubbleSize + (Math.random() * (this.maxBubbleSize - this.minBubbleSize))
    }
    bubble.speedY = -(this.bubbleBaseSpeed + ((bubble.size / this.canvasScale) / 100) * this.speedOffset)
    bubble.speedX = (-this.sideSpeed + (Math.random() * this.sideSpeed * 2)) * bubble.speedY
    this.bubbles.push(bubble)
  }

  destroyBubble(bubble) {
    this.poppedBubbles.push(bubble)
    bubble.bubbleSize = (bubble.size / this.canvasScale)
    bubble.frames = 0
    this.bubbles.splice(this.bubbles.indexOf(bubble), 1)
  }

  ngOnDestroy() {
    this.playing = false
    let canvas: HTMLCanvasElement = this.canvas.nativeElement
    canvas.parentElement.parentElement.removeEventListener('mousedown', () => this.mouseDown = true)
    canvas.parentElement.parentElement.removeEventListener('mouseup', () => this.mouseDown = false)
    canvas.parentElement.parentElement.removeEventListener('click', (e) => this.popBubblesAt(canvas, e.clientX, e.clientY))
    canvas.parentElement.parentElement.removeEventListener('mousemove', (e) => this.mouseDown && this.popBubblesAt(canvas, e.clientX, e.clientY))
    canvas.parentElement.parentElement.removeEventListener('touchstart', (e) => Array.from(e.touches).forEach(t => this.popBubblesAt(canvas, t.clientX, t.clientY)))
    canvas.parentElement.parentElement.removeEventListener('touchmove', (e) => Array.from(e.touches).forEach(t => this.popBubblesAt(canvas, t.clientX, t.clientY)))
  }

}
