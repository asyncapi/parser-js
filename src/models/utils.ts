import type { BaseModel } from './base';

export interface Constructor<T> extends Function {
  new (...any: any[]): T;
}

export interface MixinType<T = any> extends Function {
  prototype: T;
}

export function Mixin(a: typeof BaseModel): typeof BaseModel;
export function Mixin<A>(a: typeof BaseModel, b: MixinType<A>): typeof BaseModel & Constructor<A>;
export function Mixin<A, B>(a: typeof BaseModel, b: MixinType<A>, c: MixinType<B>): typeof BaseModel & Constructor<A> & Constructor<B>;
export function Mixin<A, B, C>(a: typeof BaseModel, b: MixinType<A>, c: MixinType<B>, d: MixinType<C>): typeof BaseModel & Constructor<A> & Constructor<B> & Constructor<C>;
export function Mixin<A, B, C, D>(a: typeof BaseModel, b: MixinType<A>, c: MixinType<B>, d: MixinType<C>, e: MixinType<D>): typeof BaseModel & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D>;
export function Mixin<A, B, C, D, E>(a: typeof BaseModel, b: MixinType<A>, c: MixinType<B>, d: MixinType<C>, e: MixinType<D>, f: MixinType<E>): typeof BaseModel & Constructor<A> & Constructor<B> & Constructor<C> & Constructor<D> & Constructor<E>;
export function Mixin(baseCtor: typeof BaseModel, ...constructors: any[]) {
  return mixin(class extends baseCtor {}, constructors);
}

function mixin(derivedCtor: any, constructors: any[]): typeof BaseModel {
  constructors.forEach((ctor) => {
    Object.getOwnPropertyNames(ctor.prototype).forEach((name) => {
      if (name === 'constructor') {
        return;
      }
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(ctor.prototype, name) || Object.create(null),
      );
    });
  });
  return derivedCtor;
}
