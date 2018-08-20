import { CollegeProjectPage } from './app.po';

describe('college-project App', function() {
  let page: CollegeProjectPage;

  beforeEach(() => {
    page = new CollegeProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
