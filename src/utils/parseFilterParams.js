const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = (value) =>
    ['work', 'home', 'personal'].includes(value.toLowerCase());

  if (isType(type)) return type.toLowerCase();
};

const parseIsFavorite = (isFavorite) => {
  const isString = typeof isFavorite === 'string';
  if (!isString) return;
  const isBooleanString = (value) =>
    ['true', 'false'].includes(value.toLowerCase());

  if (isBooleanString(isFavorite)) return isFavorite.toLowerCase();
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;
  const parsedType = parseType(type);
  const parsedIsFavorite = parseIsFavorite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavorite,
  };
};
