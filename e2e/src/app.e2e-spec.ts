import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('Sprink tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display customer title', () => {
    page.navigateTo()
    expect(page.getTitleText()).toContain('Make dry cleaning easier')
  });

  it('should search for a post code', () => {
    page.navigateTo();
    element(by.css('#postCode')).sendKeys('KT123RX')
    element(by.css('#postcode-search')).click()
    expect(browser.getCurrentUrl()).toContain('new-order-guest')
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
