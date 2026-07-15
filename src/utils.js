export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = ({ title, dueDate} = {}) => !title && !dueDate;

export const mergeTaskUpdate = (original, ...updates) => Object.assign({}, original, ...updates);