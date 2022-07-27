export const cacheWrapper = {
  client: {
    // @ts-ignore
    set: jest.fn().mockImplementation((key: string, value: any): boolean => {
      return true;
    }),
    // @ts-ignore
    get: jest.fn().mockImplementation((_key: string): any | undefined => {
      return ["USD", "JPY", "GBP", "EUR"];
    }),
  },
};
