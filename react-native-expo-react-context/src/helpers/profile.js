export const getNameInitialForAvatar = (name) => {
  if(!name) return ''; // throw new Error("Name is required");
  const names = name.split(' ');
  const initial =
    names.length > 1 ? `${names[0].charAt(0)}${names[1].charAt(0)}` : names[0].charAt(0);
  return initial;
};
