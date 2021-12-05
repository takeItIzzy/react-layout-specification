const trimClassName = (className: string) => {
  return className.replace(/\s\s+/g, ' ').replace(/^\s+|\s+$/g, '');
};

export default trimClassName;
