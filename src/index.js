import EASINGS from './easings';
import getScrollTo from './bezier';

const smoothScroll = ({
  scrollableDomEle,
  callback,
  direction,
  onRefUpdateCallback,
  duration
}) => {


  let startTime;
  const initialScrollLeftPosition = scrollableDomEle.scrollLeft;
  const totalScroll = scrollableDomEle.scrollWidth - initialScrollLeftPosition;


  const scrollOnNextTick = (timestamp) => {
    const runTime = timestamp - startTime;
    const progress = getScrollTo({
      'percentageCompletion': runTime / duration,
      'C1': 0,
      'C2': 0.25,
      'C3': 0.25,
      'C4': 1
    });
    const scrollAmt = progress * totalScroll;
    const scrollToForThisTick = (
      direction === 'right' ? scrollAmt + initialScrollLeftPosition : totalScroll - scrollAmt - initialScrollLeftPosition
    );
    if (runTime < duration) {
      scrollableDomEle.scrollLeft = scrollToForThisTick;
      if (onRefUpdateCallback) {
        onRefUpdateCallback(requestAnimationFrame(scrollOnNextTick));
      } else {
        requestAnimationFrame(scrollOnNextTick);
      }
    } else if (callback) {
      callback();
    }
  }


  requestAnimationFrame((timestamp) => {
    startTime = timestamp;
    scrollOnNextTick(timestamp);
  });
}

export default smoothScroll;