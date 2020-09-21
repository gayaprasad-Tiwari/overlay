import { OrxeOverlay } from '../';

describe('orxe-overlay', () => {
  let overlay;
  jest.useFakeTimers();
  beforeEach(async () => {
    OrxeOverlay;
    overlay = (await document.body.appendChild(document.createElement('orxe-overlay'))) as OrxeOverlay;
  });

  afterEach(async () => {
   await overlay.remove();
  });

  it('should overlay to be created', () => {
    expect(overlay).toBeTruthy();
  });

  it('Should overlay closed when clicked on cross icon', async () => {
    const closeButton = overlay.shadowRoot.querySelector('#close-button');
    await closeButton.click();
    jest.runAllTimers();
    expect(document.querySelector(`orxe-overlay`)).toBeFalsy();
  });

  it('should tertiary-Button-click-event be called', async ()=>{
    const handler = jest.fn();
    overlay.addEventListener('tertiary-Button-click-event', handler);
    overlay.overlayType = 'full-overlay';
    await overlay.requestUpdate();
    const closeButton = overlay.shadowRoot.querySelector('#tertiary-button');
    await closeButton.click();
    return Promise.resolve().then(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  it('should tertiary-Button-click-event be called', async ()=>{
    const handler = jest.fn();
    overlay.addEventListener('secondary-Button-click-event', handler);
    overlay.overlayType = 'full-overlay';
    await overlay.requestUpdate();
    const closeButton = overlay.shadowRoot.querySelector('#secondary-button');
    await closeButton.click();
    return Promise.resolve().then(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});