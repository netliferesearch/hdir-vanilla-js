// Utility that returns a location, which is in turned used to reset the URL

const resolveLocation = url => {
  const location = url.slice(
    0,
    url.indexOf("?") === -1
      ? url.length
      : url.indexOf("?")
  );
  return location;
};

export default resolveLocation;
