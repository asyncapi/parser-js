import { OperationTrait } from './operation-trait';
import type { ChannelsInterface } from '../channels';
import type { MessagesInterface } from '../messages';
import type { OperationInterface } from '../operation';
import type { OperationTraitsInterface } from '../operation-traits';
import type { ServersInterface } from '../servers';
import type { v2 } from '../../spec-types';
export declare class Operation extends OperationTrait<v2.OperationObject> implements OperationInterface {
    servers(): ServersInterface;
    channels(): ChannelsInterface;
    messages(): MessagesInterface;
    traits(): OperationTraitsInterface;
}
