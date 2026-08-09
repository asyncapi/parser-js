import { ChannelTrait } from '../../../src/models/v3/channel-trait';
import { ChannelTraits } from '../../../src/models/v3/channel-traits';

describe('ChannelTraits model', function() {
  it('should return a channel trait by id', function() {
    const first = new ChannelTrait({}, { id: 'first' });
    const second = new ChannelTrait({}, { id: 'second' });
    const traits = new ChannelTraits([first, second]);

    expect(traits.get('second')).toBe(second);
    expect(traits.get('missing')).toBeUndefined();
  });
});
