const encodeEmailParam = (param = "yogaagung.utama@gmail.com") => {
  const encoded = encodeURIComponent(param);
  return encoded;
};

export default encodeEmailParam;
