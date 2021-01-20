import { log } from './utils/promise-helpers.js';
import { notasService as service } from './nota/service.js';
import { takeUntil, debounceTime } from './utils/operators.js';

import './utils/array-helpers.js';

// const operation1 = takeUntil(3, () => service.sumItems('2143').then(log).catch(log));
// const operation2 = debounceTime(500, operation1);
// OR

const action = debounceTime(500, takeUntil(3, () =>
	service
		.sumItems('2143')
		.then(log)
		.catch(log))
	);

document.querySelector('#myButton').onclick = action;
