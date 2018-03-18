const createDefaultStorage = () => {
  const storage = {};

  return {
    setItem: (key, value) => { storage[key] = value; },
    getItem: key => storage[key],
    hasItem: key => !!storage[key],
    toArray: () => Object.values(storage),
  };
};


export const CacheStorage = createDefaultStorage();

export default CacheStorage;
