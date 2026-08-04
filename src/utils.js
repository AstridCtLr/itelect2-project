export const tasks = [
    { id: 1, title: "Finish GT3", dueDate: "2026-07-22", completed: true },
    { id: 2, title: "Finish GT4", dueDate: "2026-07-29", completed: false },
    { id: 3, title: "Finish GT5", dueDate: "2026-08-05", completed: false },
    { id: 4, title: "Review pull requests", dueDate: "2026-08-06", completed: false }
];

export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`;

export const validateTask = ({ title, dueDate } = {}) => !!(title && dueDate);

export const mergeTaskUpdate = (original, ...updates) => Object.assign({}, original, ...updates);

export class TaskValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "TaskValidationError";
    }
}

export function createTask(taskData) {
    if (!validateTask(taskData)) {
        throw new TaskValidationError("Invalid task data");
    }

    return {
        id: Date.now(),
        completed: false,
        ...taskData
    };
}