import { AngularReactivePage } from './app.po';

describe('angular-reactive App', function() {
  let page: AngularReactivePage;

  beforeEach(() => {
    page = new AngularReactivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
