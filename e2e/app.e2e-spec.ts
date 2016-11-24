import { AngularVerPage } from './app.po';

describe('weatherapp_angular2 App', function() {
  let page: AngularVerPage;

  beforeEach(() => {
    page = new AngularVerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
