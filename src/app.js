 console.log('Server Starting...');

 import { formatDate, validateTask, mergeTaskUpdate } from './utils.js';

const dateSample = formatDate(new Date("2026-07-22"));
console.log("formatDate: ", dateSample); 

const validationSample = validateTask();
console.log("validateTask: ", validationSample); 

const mergeSample = mergeTaskUpdate({ title: "Old" }, { title: "GT3" });
console.log("mergeTaskUpdate: ", mergeSample); 