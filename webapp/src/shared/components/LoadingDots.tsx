import { SpringValue, animated, useSpring } from '@react-spring/web';
import { css } from '@styles/css';
import { useEffect } from 'react';

const Dot: React.FC<{ springs: { y: SpringValue<number> } }> = ({ springs }) => {
  return (
    <animated.span style={springs} className={css({ fontSize: 'content.md', margin: '0 4px', })}>o</animated.span>
  );
}

const LoadingDots: React.FC = () => {

  const useAnimate = () => {
    const [springs, api] = useSpring(() => ({ y: 0 }), [])
    return {
      springs,
      api
    }
  }

  const animate = (index: number) => {
    const localDot = dotsAnimations[index];
    if (!localDot) return;

    localDot.api.start({
      y: -0.05,
      config: {
        mass: 1,
        tension: 170,
        friction: 20,
        velocity: -0.25
      },
      onRest: () => localDot.api.start({
        y: 0,
        config: {
          duration: 50
        }
      })
    });
  }

  const dotsAnimations = [useAnimate(), useAnimate(), useAnimate()];
  useEffect(() => {
    const delay = 150;
    const dots = 8;
    let index = 0;
    const interval = setInterval(() => {
      animate(index % dots);
      index++;
    }, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={css({
      display: 'flex'
    })}>
      <Dot springs={dotsAnimations[0].springs} />
      <Dot springs={dotsAnimations[1].springs} />
      <Dot springs={dotsAnimations[2].springs} />
    </div>
  );
};

export default LoadingDots;
