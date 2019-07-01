// Get fragment from url
const getFragment = url => {
  const i = url.lastIndexOf('#');
  if (i !== -1) {
    return url.substr(i).replace('#', '');
  }
};

export default getFragment;
