import { Channels } from '../../../src/models/v3/channels';

describe('Channels model', function() {
  // Mock Helper: Creates a fake Channel that behaves exactly how we need
  const createMockChannel = (id: string, hasSend = false, hasReceive = false) => ({
    id: () => id,
    operations: () => ({
      filterBySend: () => hasSend ? ['op1'] : [],
      filterByReceive: () => hasReceive ? ['op1'] : []
    })
  } as any);

  it('should handle empty channels', function() {
    const channels = new Channels([]); // Pass an Array!
    expect(channels.isEmpty()).toEqual(true);
    expect(channels.all()).toEqual([]);
  });

  it('should find a channel by id', function() {
    const mock1 = createMockChannel('userSignup');
    const mock2 = createMockChannel('userLogout');
    
    // Pass Array of Mocks
    const channels = new Channels([mock1, mock2]); 
    
    expect(channels.isEmpty()).toEqual(false);
    expect(channels.has('userSignup')).toEqual(true);
    expect(channels.get('userSignup')).toBe(mock1);
    expect(channels.get('missing')).toBeUndefined();
  });

  it('should filter channels by "send" operations', function() {
    const sender = createMockChannel('sender', true, false);
    const receiver = createMockChannel('receiver', false, true);
    
    const channels = new Channels([sender, receiver]);
    
    const senders = channels.filterBySend();
    expect(senders).toHaveLength(1);
    expect(senders[0].id()).toEqual('sender');
  });

  it('should filter channels by "receive" operations', function() {
    const sender = createMockChannel('sender', true, false);
    const receiver = createMockChannel('receiver', false, true);
    
    const channels = new Channels([sender, receiver]);
    
    const receivers = channels.filterByReceive();
    expect(receivers).toHaveLength(1);
    expect(receivers[0].id()).toEqual('receiver');
  });
});
