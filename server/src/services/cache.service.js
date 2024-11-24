import redis from "../config/redis.js";

const CACHE_EXPIRATION = 3600; // 1 hour

export const getCachedData = async key => {
  const cachedData = await redis.get(key);
  return cachedData ? JSON.parse(cachedData) : null;
};

export const setCachedData = async (key, data) => {
  await redis.setex(key, CACHE_EXPIRATION, JSON.stringify(data));
};
