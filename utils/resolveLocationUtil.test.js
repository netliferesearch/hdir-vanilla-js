import resolveLocation from './resolveLocationUtil';

describe('resolveLocation', () => {
  describe('test valid cases', () => {
    const loc = 'https://www.helsedirektoratet.no/rapporter';
    it('base url (without "?") should return base url', () => {
      const url = 'https://www.helsedirektoratet.no/rapporter';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).toBe(loc);
    });
    it('base url (with "?") should return base url without "?"', () => {
      const url = 'https://www.helsedirektoratet.no/rapporter?';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).toBe(loc);
    });
    it('url (with 1 "?" and 1 parameter) should return base url', () => {
      const url = 'https://www.helsedirektoratet.no/rapporter?typetema=mesh.444444';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).toBe(loc);
    });
    it('url (with 1 "?" and 2 parameters) should return base url', () => {
      const url = 'https://www.helsedirektoratet.no/rapporter?typetema=mesh.444444&typetema=mesh.D000074441';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).toBe(loc);
    });
    it('url (with 1 "?" and 3 parameter) should return base url', () => {
      const url = 'https://www.helsedirektoratet.no/rapporter?typetema=mesh.444444&typetema=mesh.D000074441&typetema=mesh.D010166';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).toBe(loc);
    });
  });
  describe('test invalid cases (that were failing before)', () => {
    const loc = 'https://www.helsedirektoratet.no/rapporter';
    it('base url (without "?") should not return base url minus one character', () => {
      const url = 'https://www.helsedirektoratet.no/rapporte';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).not.toBe(loc);
    });
    it('base url (with "?") should not return base url with "?"', () => {
      const url = 'https://www.helsedirektoratet.no/rapporter?';
      const resolvedLocation = resolveLocation(url);
      expect(resolvedLocation).not.toBe('https://www.helsedirektoratet.no/rapporter?');
    });
  });
});
