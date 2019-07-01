import getFragment from './getUrlFragmentUtil';

describe('getFragment', () => {
  describe('test valid cases', () => {
    it('got the fragment "this-is-the-fragment"', () => {
      const url = 'http://www.example.com/pages/page-just-because#this-is-the-fragment';
      const theFragment = getFragment(url);
      expect(theFragment).toBe('this-is-the-fragment');
    });
    it('got the fragment "123-hug-a-tree"', () => {
      const url = 'http://www.example.com/pages/page-just-because#123-hug-a-tree';
      const theFragment = getFragment(url);
      expect(theFragment).toBe('123-hug-a-tree');
    });
    it('got the fragment "such-wow"', () => {
      const url = 'http://www.example.com/pages/page-just-because#such-wow';
      const theFragment = getFragment(url);
      expect(theFragment).toBe('such-wow');
    });
    it('got the fragment "you-dont-need-jquery"', () => {
      const url = 'http://www.example.com/pages/page-just-because#you-dont-need-jquery';
      const theFragment = getFragment(url);
      expect(theFragment).toBe('you-dont-need-jquery');
    });
  });
});
