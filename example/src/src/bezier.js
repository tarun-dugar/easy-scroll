const B1 = (t) => {
  return Math.pow(t, 3);
};

const B2 = (t) => {
  return 3 * t * t * (1 - t);
};

const B3 = (t) => {
  return 3 * t * Math.pow((1 - t), 2);
};

const B4 = (t) => {
  return Math.pow((1 - t), 3);
};

/* explanation:
http://13thparallel.com/archive/bezier-curves/
http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
*/
const getScrollTo = ({ percentTimeElapsed, x1, y1, x2, y2 }) => {
  return 1 - (x1 * B1(percentTimeElapsed) + y1 * B2(percentTimeElapsed) + x2 * B3(percentTimeElapsed) + y2 * B4(percentTimeElapsed));
};

export default getScrollTo;