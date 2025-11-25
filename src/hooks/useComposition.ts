import { useState } from "react";
import * as React from "react";

interface UseCompositionOptions<T extends HTMLElement> {
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onCompositionStart?: (e: React.CompositionEvent<T>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<T>) => void;
}

export function useComposition<T extends HTMLElement>(
  options?: UseCompositionOptions<T>
) {
  const [isComposing, setIsComposing] = useState(false);

  const onCompositionStart = (e: React.CompositionEvent<T>) => {
    setIsComposing(true);
    options?.onCompositionStart?.(e);
  };

  const onCompositionEnd = (e: React.CompositionEvent<T>) => {
    setIsComposing(false);
    options?.onCompositionEnd?.(e);
  };

  const onKeyDown = (e: React.KeyboardEvent<T>) => {
    if (!isComposing && options?.onKeyDown) {
      options.onKeyDown(e);
    }
  };

  return {
    isComposing,
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
  };
}
