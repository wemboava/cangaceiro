import { log, timeoutPromise, retry } from './utils/promise-helpers.js';
import './utils/array-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js';


const operations = pipe(
	partialize(takeUntil, 3),
	partialize(debounceTime, 500)
);

// const operation1 = takeUntil(3, () => service.sumItems('2143').then(log).catch(log));
// const operation2 = debounceTime(500, operation1);
// OR

const action = operations(() =>
	retry(3, 3000, () => timeoutPromise(200, service.sumItems('2143')))
		.then(log)
		.catch(log)
	);

document.querySelector('#myButton').onclick = action;