import { DeltaCRMTemplatePage } from './app.po';

describe('DeltaCRM App', function() {
  let page: DeltaCRMTemplatePage;

  beforeEach(() => {
    page = new DeltaCRMTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
