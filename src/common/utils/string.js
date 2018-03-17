const ltrim = (str, charMask) => {
  if (str.substr(0, 1) === charMask) {
    return str.substr(1);
  }

  return str;
};

const rtrim = (str, charMask) => {
  const lastCharIndex = str.length - 1;
  if (str.substr(-1) === charMask) {
    return str.substr(0, lastCharIndex);
  }

  return str;
};

export {
  ltrim,
  rtrim,
};
