const dict = <Returns, Keys extends number | string | symbol>(
  selector: Record<Keys, (...params: any[]) => Returns> & {
    default?: (...params: any[]) => Returns;
  },
  option: Keys,
  ...params: any[]
) => selector[option]?.(...params) ?? selector.default?.(...params);

export default dict;
