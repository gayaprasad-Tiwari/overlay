import { html, customElement, LitElement, property } from 'lit-element';
import { OVERLAYTYPES } from './properties';
import styles from './overlay-css';

@customElement('orxe-overlay')
export default class OrxeOverlay extends LitElement {
  // overlay heading
  @property({ type: String, reflect: true, attribute: 'title' })
  title = 'Heading';

  // overlay-type to define type of overlays
  /* values are
  popup-overlay,
  slider-overlay,
  full-overlay */
  @property({ type: String, reflect: true, attribute: 'overlay-type' })
  overlayType = OVERLAYTYPES.POPUPOVERLAY;

  // area-label for close button
  @property({ type: String, reflect: true, attribute: 'a11y-label-close' })
  a11yLabelClose = 'Close Button';

  // area-label for Tertiary button.  require when overlay-type is full-overlay
  @property({ type: String, reflect: true, attribute: 'a11y-label-tertiary' })
  a11yLabelTertiary = 'Tertiary Button';

  // area-label for Secondary button. require when overlay-type is full-overlay
  @property({ type: String, reflect: true, attribute: 'a11y-label-secondary' })
  a11yLabelSecondary = 'Secondary Button';

  private _popupStatus = 'open';
  static get properties() {
    return { popupStatus: { type: String } };
  }
  set popupStatus(val) {
    const oldVal = this._popupStatus;
    this._popupStatus = String(val);
    this.requestUpdate('popupStatus', oldVal);
  }
  get popupStatus() {
    return this._popupStatus;
  }

  constructor() {
    super();
  }

  /**
    * Implement `render` to define a template for overlay element.
    */
  render() {
    return html`
      <div class='preload overlay_background' overlay-type='${this.overlayType}' ></div>
      <div class='overlay-data-container-outer' aria-modal='true'	 role='dialog' id='container-outer' @click='${this._distroyOverlay}'  >  
        <section class="overlay-data-container ${this.popupStatus}" overlay-type='${this.overlayType}'>
          <h2 class='overlay-title'>${this.title}</h2>
          <button id='close-button'  role='button' aria-label='${this.a11yLabelClose}' role='close button' class='close-button' @click='${this._distroyOverlay}'> + </button>
          <div class='overlay-data'>
            <slot name='content'></slot>
          </div>
          ${this.overlayType === OVERLAYTYPES.fullOVERLAY ?
        html`
                <div class='button-container'>
                  <div>
                    <button id='tertiary-button' type="button" role='button'  aria-label='${this.a11yLabelTertiary}'  @click='${this._onTertiaryButton}' class='button tertiary-button' > 
                      <slot name='tertiary-button'></slot>
                    </button>
                  </div>
                  <div>
                    <button id='secondary-button'  type="button" role='button'  aria-label='${this.a11yLabelSecondary}'  @click='${this._onSecondaryButton}' class='button secondary-button'>
                      <slot name='secondary-button'></slot>
                    </button>
                  </div>
                </div>
                ` : html``}
        </section>
      </div>
    `;
  }

  // to destroy the overlay
  private _distroyOverlay(e: Event) {
    e.stopImmediatePropagation();
    if ((e.target as HTMLElement).id === 'container-outer' || (e.target as HTMLElement).id === 'close-button') {
      this.popupStatus = 'close';
      setTimeout(() => this.remove(), 140);
    }
  }
  private _onTertiaryButton() {
    const customEvent = new CustomEvent('tertiary-Button-click-event', { bubbles: true, composed: true });
    this.dispatchEvent(customEvent);
  }
  private _onSecondaryButton() {
    const customEvent = new CustomEvent('secondary-Button-click-event', { bubbles: true, composed: true });
    this.dispatchEvent(customEvent);
  }
  /**
   *  Getting styles from components custom scss file
   */
  static styles = styles;
}
