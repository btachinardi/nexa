import useResizeObserver from "@react-hook/resize-observer";
import { MutableRefObject, useCallback, useLayoutEffect, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

export interface SizeSnapshot {
  width: ValueSnapshot;
  height: ValueSnapshot;
}

export interface ValueSnapshot {
  value: number;
  delta: number;
}

export default function useElementSize<T extends HTMLElement = HTMLDivElement>(): [MutableRefObject<T | null>, SizeSnapshot | undefined] {
  const target = useRef<T | null>(null);
  const [size, setSize] = useState<SizeSnapshot | undefined>(undefined);

  const setResize = useCallback(({ width, height }: Size) => {
    if (!size) {
      setSize({
        width: { value: width, delta: 0 },
        height: { value: height, delta: 0 },
      });
      return;
    }

    if (size.width.value === width && size.height.value === height) return;
    setSize({
      width: {
        value: width, delta: width - size.width.value
      },
      height: {
        value: height, delta: height - size.height.value
      }
    });
  }, [size]);

  useLayoutEffect(() => {
    target.current && setResize(target.current.getBoundingClientRect())
  }, [target, setResize]);

  useResizeObserver(target, entry => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setResize({ width, height });
  });

  return [target, size]
}

