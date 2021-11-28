import * as React from 'react';

declare const ThemeTypeSymbol: unique symbol;
export class ThemeTypeKey {
  readonly value: string;
  [ThemeTypeSymbol]: void;
  constructor(value: string) {
    this.value = value;
  }
}

export type ThemeType = ThemeTypeKey['value'];

export interface IComponentBaseProps {
  children: React.ReactNode;
  typeKey: ThemeType;
}
