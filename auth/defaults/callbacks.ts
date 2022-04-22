export const defaultCallback = (provider: string) => () => {
  console.log(`Callback function for ${provider} (no-op)`);
};
