import { Spectral } from '@stoplight/spectral-core';
import { Parser } from '../src/parser';
import { createSpectral } from '../src/spectral';

describe('Custom Spectral instance', function() {
  const parser = new Parser();

  describe('createSpectral()', function() {
    it('should create Spectral instance', async function() {
      const spectral = createSpectral(parser);
      expect(spectral).toBeInstanceOf(Spectral);
    });
  });
});
