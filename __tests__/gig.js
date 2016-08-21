import Gig from '../src/components/gig';
jest.unmock('../src/components/gig');

describe('Gig', function() {
  const gig = new Gig();

  describe('#getSupportActs', function() {
    it('returns a comma-separated list of support acts of a gig', function() {
      const artists = [{name: 'Mogwai'}, {name: 'SupportOne'}, {name: 'SupportTwo'}];

      expect(gig.getSupportActs(artists)).toBe('SupportOne, SupportTwo');
    });
  });
});
