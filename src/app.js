 console.log('Server Starting...');

 import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

 import { fetchSampleUsers } from './api.js';

const dateSample = formatDate(new Date("2026-07-22"));
console.log("formatDate: ", dateSample); 

const validationSample = validateTask();
console.log("validateTask: ", validationSample); 

const mergeSample = mergeTaskUpdate({ title: "Old" }, { title: "GT3" });
console.log("mergeTaskUpdate: ", mergeSample); 

try {
    const users = await fetchSampleUsers();
    console.log("Users:", users);

    const task = createTask({
        title: "Finish GT4",
        dueDate: new Date("2026-07-29")
    });

    console.log("Task:", task);

} catch (error) {
    console.error(error);
}