import EASINGS from './easings';
import getScrollTo from './bezier';

const getProgress = ({
  easingPreset, 
  cubicBezierPoints,
  duration,
  runTime
}) => {
  const percentTimeElapsed = runTime / duration;

  if (EASINGS.hasOwnProperty(easingPreset)) {
    return EASINGS[easingPreset](percentTimeElapsed);
  } else if (
    cubicBezierPoints
    && !isNaN(cubicBezierPoints.x1) 
    && !isNaN(cubicBezierPoints.y1) 
    && !isNaN(cubicBezierPoints.x2) 
    && !isNaN(cubicBezierPoints.y2)
    && cubicBezierPoints.x1 >= 0
    && cubicBezierPoints.x2 >= 0) {
    return getScrollTo({
      percentTimeElapsed,
      'x1': cubicBezierPoints.x1,
      'x2': cubicBezierPoints.x2,
      'y1': cubicBezierPoints.y1,
      'y2': cubicBezierPoints.y2
    });    
  } else {
    console.error('Please enter a valid easing value');
  }
  return false;
}

const getTotalScroll = ({
  isWindow,
  scrollableDomEle,
  elementLengthProp,
  initialScrollPosition,
  isHorizontalDirection,
  scrollLengthProp
}) => {
  let totalScroll;
  
  if (isWindow) {
    const documentElement = document.documentElement;
    totalScroll = isHorizontalDirection ? documentElement.offsetWidth : documentElement.offsetHeight;
  } else {
    totalScroll = scrollableDomEle[scrollLengthProp] - scrollableDomEle[elementLengthProp];
  }
  return totalScroll - initialScrollPosition;
}

const easyScroll = ({
  scrollableDomEle,
  onAnimationCompleteCallback,
  direction,
  onRefUpdateCallback,
  duration,
  cubicBezierPoints,
  easingPreset
}) => {

  let startTime               = null,
      scrollDirectionProp     = null,
      scrollLengthProp        = null,
      elementLengthProp       = null,
      isWindow                = scrollableDomEle === window,
      isHorizontalDirection   = ['left', 'right'].indexOf(direction) > -1,
      isToBottomOrToRight     = ['right', 'bottom'].indexOf(direction) > -1;


  if (isHorizontalDirection) {
    scrollDirectionProp = isWindow ? 'scrollX' : 'scrollLeft';
    elementLengthProp = isWindow ? 'innerWidth' : 'clientWidth';
    scrollLengthProp = 'scrollWidth';
  } else {
    scrollDirectionProp = isWindow ? 'scrollY' : 'scrollTop';
    elementLengthProp = isWindow ? 'innerHeight' : 'clientHeight';
    scrollLengthProp = 'scrollHeight';
  }

  const initialScrollPosition = scrollableDomEle[scrollDirectionProp];
  const totalScroll = getTotalScroll({
    isWindow,
    scrollableDomEle,
    elementLengthProp,
    initialScrollPosition,
    isHorizontalDirection,
    scrollLengthProp
  });

  const scrollOnNextTick = (timestamp) => {
    const runTime = timestamp - startTime;
    const progress = getProgress({
      easingPreset, 
      cubicBezierPoints,
      runTime,
      duration
    });

    if (!isNaN(progress)) {
      const scrollAmt = progress * totalScroll;
      const scrollToForThisTick = (
        isToBottomOrToRight ? 
        scrollAmt + initialScrollPosition : 
        totalScroll - scrollAmt - initialScrollPosition
      );

      if (runTime < duration) {
        if (isWindow) {
          const xScrollTo = isHorizontalDirection ? scrollToForThisTick : 0;
          const yScrollTo = isHorizontalDirection ? 0 : scrollToForThisTick;
          window.scrollTo(xScrollTo, yScrollTo);
        } else {
          scrollableDomEle[scrollDirectionProp] = scrollToForThisTick;        
        }
        if (onRefUpdateCallback) {
          onRefUpdateCallback(requestAnimationFrame(scrollOnNextTick));
        } else {
          requestAnimationFrame(scrollOnNextTick);
        }
      } else if (onAnimationCompleteCallback) {
        onAnimationCompleteCallback();
      }
    }
  }


  requestAnimationFrame((timestamp) => {
    startTime = timestamp;
    scrollOnNextTick(timestamp);
  });
}

export default easyScroll;