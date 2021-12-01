import { ThemeType } from '@/components/index.types';

interface ISpace {
  value: number;
  unit: 'px';
}

export interface ISettings {
  space: ISpace;
}

export type IElementDirection = 'row' | 'column';

export interface IElement {
  /**
   * key of element type
   */
  typeKey: ThemeType;
  /**
   * direction of element's children
   */
  direction?: IElementDirection;
  /**
   * Children are arranged from the start of the element or end
   */
  align?: 'start' | 'end';
  /**
   * Start with which children are split so that children are distributed on both sides of the element.
   * This field's type should be one of the typeKey.
   * if this field is not set, the children will position at start or end of the element, which is based on the 'align' field.
   */
  splitAt?: ThemeType;
  /**
   * space of each child (except the space between the two children that are split)
   */
  spacing?: number;
  /**
   * Portrait spacing can be set separately, consistent with 'spacing' by default
   */
  portraitSpacing?: number;
  /**
   * Children will sort by this field.
   */
  order?: ThemeType[];
}

export interface Themes {
  settings: ISettings;
  /**
   * A collection of element types that may exist in the system
   */
  elements: IElement[];
}
