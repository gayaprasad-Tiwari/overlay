import { OrxeOverlay } from '../';

import { axe, toHaveNoViolations } from '@orxe-devkit/axe';
expect.extend(toHaveNoViolations);

describe('orxe-overlay-axe', () => {
  let overlay;

  beforeEach(async () => {
    OrxeOverlay;
    document.body.appendChild(document.createElement('orxe-overlay'));
    overlay = document.querySelector('orxe-overlay') as OrxeOverlay;
  });

  afterEach(() => {
    overlay.remove();
  });

  it('should support all WCAG Accessibility Rules. when default toolbar is rendered', async () => {
    const result = await axe(overlay);
    expect(result).toHaveNoViolations();
  });

  it('should support all WCAG Accessibility Rules. when closeIconAriaLabel is given ', async () => {
    overlay.a11yLabelClose = 'close icon';
    overlay.overlayType = 'slider-overlay';
    await overlay.requestUpdate();
    const results = await axe(overlay);
    expect(results).toHaveNoViolations();
  });

  it('should support all WCAG Accessibility Rules. when a11yLabelTertiary and a11yLabelSecondary with overlay type full-overlay is given', async () => {
    overlay.a11yLabelTertiary = 'Tertiary button';
    overlay.a11yLabelSecondary = 'Secondary button';
    overlay.overlayType = 'full-overlay';
    await overlay.requestUpdate();
    const results = await axe(overlay);
    expect(results).toHaveNoViolations();
  });
});
