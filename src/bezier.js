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
export default getScrollTo = ({ percentTimeElapsed, C1, C2, C3, C4 }) => {
  return 1 - (C1 * B1(percentTimeElapsed) + C2 * B2(percentTimeElapsed) + C3 * B3(percentTimeElapsed) + C4 * B4(percentTimeElapsed));
};