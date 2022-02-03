import { useCallback, useEffect, useRef } from 'react';

import { StyleUtils } from './utils';

interface InjectStyleHandler {
  /**
   * Injects a css style rule to stylesheet
   * @param {string | string[]} style - Style rule
   */
  inject: (style: string | string[]) => void;

  /**
   * Extracts (Removes) a css style rule from stylesheet
   * @param {string} style - Style rule
   */
  extract: (style: string) => void;

  /**
   * Removes stylesheet
   */
  remove: () => void;
}

/**
 * A hook to inject style element
 * @param {string} elementId Style element id
 * @returns {InjectStyleHandler} Inject style handler
 */
export function useInjectStyle(elementId: string): InjectStyleHandler {
  // style element ref
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  /**
   * Handles injecting a style rule to a stylesheet
   */
  const handleInjectStyle = useCallback(
    (style: string | string[]) => {
      // check browser context
      if (typeof window === 'undefined') return;

      if (styleElementRef.current && styleElementRef.current.sheet) {
        // element found set style rules
        if (Array.isArray(style)) {
          const styleElement = styleElementRef.current;
          style.forEach((styleItem) => {
            StyleUtils.injectStyleRule(styleElement, styleItem);
          });
        } else {
          StyleUtils.injectStyleRule(styleElementRef.current, style);
        }
      } else {
        // element not found create new one
        const styleElement = document.createElement('style');
        styleElement.id = elementId;

        // insert new style element
        document.head.appendChild(styleElement);

        // set style rules
        if (Array.isArray(style)) {
          style.forEach((styleItem) => {
            StyleUtils.injectStyleRule(styleElement, styleItem);
          });
        } else {
          StyleUtils.injectStyleRule(styleElement, style);
        }

        // set ref
        styleElementRef.current = styleElement;
      }
    },
    [elementId],
  );

  /**
   * Handles extracting a style rule from a stylesheet
   */
  const handleExtractStyle = useCallback((style: string) => {
    // check browser context
    if (typeof window === 'undefined') return;

    // try to find an element with the same id
    if (!styleElementRef.current || !styleElementRef.current.sheet) return;

    // check sheet for existing rule
    const foundRuleIndex = StyleUtils.findRuleIndex(
      styleElementRef.current.sheet,
      style,
    );
    if (foundRuleIndex === -1) return;

    // remove rule
    styleElementRef.current.sheet.deleteRule(foundRuleIndex);
    styleElementRef.current.innerHTML =
      styleElementRef.current.innerHTML.replace(style, '');
  }, []);

  /**
   * Handles removing a stylesheet
   */
  const handleRemove = useCallback(() => {
    if (!styleElementRef.current) return;

    styleElementRef.current.parentElement?.removeChild(styleElementRef.current);
  }, []);

  /**
   * Effect to update stylesheet element reference
   */
  useEffect(() => {
    // do nothing if ref currently set
    if (styleElementRef.current) return;

    // try to find an element with the same id
    const element = document.querySelector<HTMLStyleElement>(
      `style#${elementId}`,
    );

    // set element ref if found
    if (element) styleElementRef.current = element;
  }, [elementId]);

  return {
    /**
     * Injects a css style rule to stylesheet
     * @param {string | string[]} style - Style rule
     */
    inject: handleInjectStyle,
    /**
     * Extracts (Removes) a css style rule from stylesheet
     * @param {string} style - Style rule
     */
    extract: handleExtractStyle,
    /**
     * Removes stylesheet
     */
    remove: handleRemove,
  };
}
