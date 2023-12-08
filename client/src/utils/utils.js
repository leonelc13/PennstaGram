export const PORT = process.env.PORT || 3000;
export const serverURL = process.env.NODE_ENV === 'production' ? '' : `http://localhost:${PORT}`;
export const rootURL = process.env.NODE_ENV === 'production' ? '' : `http://localhost:${PORT}`;
export const socketURL = process.env.NODE_ENV === 'production' ? '' : `ws://localhost:${PORT}`;
