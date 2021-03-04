/* global google */
import { Deck } from '@deck.gl/core';

const eventListeners = {
  click: null,
  dblclick: null,
  mousemove: null,
  mouseout: null,
};

export default class DeckGLOverlay extends google.maps.WebglOverlayView {
  constructor(canvas, layers, props = {}) {
    super();

    this.deck = null;
    this.layers_ = layers;
    this.props = props;
    this.canvas = canvas;
  }

  set layers(layers) {
    if (this.deck && layers) {
      this.layers_ = layers;
      this.deck.setProps({ layers: this.layers_ });
    }
  }

  setProps(props) {
    if (this.deck) {
      this.deck.setProps(props);
    }
  }

  onAdd() {
    this.requestRedraw();
  }

  onRemove() {}

  onContextRestored(gl, layerState) {
    const map = this.getMap();
    this.deck = new Deck({
      canvas: this.canvas,
      initialViewState: {
        longitude: 0,
        latitude: 0,
        pitch: 0,
        zoom: 1,
      },
      gl,
      layers: this.layers_,
      props: this.props,
      controller: false,
      userData: { map: map },
    });

    // Register event listeners
    for (const eventType in eventListeners) {
      eventListeners[eventType] = map.addListener(eventType, (event) =>
        this.handleMouseEvent(this.deck, eventType, event),
      );
    }
  }

  predraw(gl, layerState) {}

  postDraw(gl, layerState) {}

  draw(gl, matrix, transformer, layerState) {
    const deck = this.deck;

    if (!deck || !deck.layerManager) {
      return;
    }

    const { zoom, tilt, heading, lat, lng } = transformer.getCameraParams();
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const left = 0;
    const top = 0;

    this.canvas.style.left = `${left}px`;
    this.canvas.style.top = `${top}px`;

    deck.setProps({
      width,
      height,
      viewState: {
        latitude: lat,
        longitude: lng,
        zoom: Math.max(0, zoom - 1),
        pitch: tilt,
        bearing: heading,
        nearZMultiplier: 0.01,
        farZMultiplier: 1.01,
        altitude: 2.5,
        repeat: true,
      },
    });

    gl.disable(gl.SCISSOR_TEST);
    gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.depthFunc(gl.LEQUAL);
    gl.depthMask(true);

    deck._drawLayers('google-map-repaint', {
      clearCanvas: false,
    });

    layerState.isRequestingFrame = true;
  }

  onContextLost() {}

  getEventPixel(event, deck) {
    if (deck.viewports) {
      const point = deck.getViewports()[0].project([event.latLng.lng(), event.latLng.lat()]);
      return { x: point[0], y: point[1] };
    }

    return {};
  }

  /**
   * Translate and pass events from map to Deck instance.
   *
   * @param deck Deck instance to pass modified event to.
   * @param type Event name such as `click` that triggered the event.
   * @param event Source event that is being handled.
   */
  handleMouseEvent(deck, type, event) {
    const deckEvent = {
      type,
      offsetCenter: this.getEventPixel(event, deck),
      srcEvent: event,
    };

    switch (type) {
      case 'click':
        // Hack: because we do not listen to pointer down, perform picking now
        deck._lastPointerDownInfo = deck.pickObject(deckEvent.offsetCenter);
        deckEvent.tapCount = 1;
        deck._onEvent(deckEvent);
        break;
      case 'dblclick':
        deckEvent.type = 'click';
        deckEvent.tapCount = 2;
        deck._onEvent(deckEvent);
        break;
      case 'mousemove':
        deckEvent.type = 'pointermove';
        deck._onPointerMove(deckEvent);
        // google.maps.event.trigger(this.getMap()!,'resize');
        break;
      case 'mouseout':
        deckEvent.type = 'pointerleave';
        deck._onPointerMove(deckEvent);
        // google.maps.event.trigger(this.getMap()!,'resize');
        break;
      default:
        return;
    }

    this.requestRedraw();
  }
}
