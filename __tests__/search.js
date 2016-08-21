import Search from '../src/components/search';
jest.unmock('../src/components/search');

describe('Search', function() {
  const search = new Search();

  describe('#getQueryUrl', function() {
    it('returns a url containing the provided search term', function() {
      var expectedUrl = 'http://api.bandsintown.com/artists/Mogwai/events.json?api_version=2.0&app_id=gigs';

      expect(search.getQueryUrl('Mogwai')).toBe(expectedUrl);
    });
  });
});
