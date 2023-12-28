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
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  const handleInjectStyle = useCallback(
    (style: string | string[]) => {
      if (typeof window === 'undefined') return;

      if (styleElementRef.current && styleElementRef.current.sheet) {
        if (Array.isArray(style)) {
          const styleElement = styleElementRef.current;
          style.forEach((styleItem) => {
            StyleUtils.injectStyleRule(styleElement, styleItem);
          });
        } else {
          StyleUtils.injectStyleRule(styleElementRef.current, style);
        }
      } else {
        const styleElement = document.createElement('style');
        styleElement.id = elementId;

        document.head.appendChild(styleElement);

        if (Array.isArray(style)) {
          style.forEach((styleItem) => {
            StyleUtils.injectStyleRule(styleElement, styleItem);
          });
        } else {
          StyleUtils.injectStyleRule(styleElement, style);
        }

        styleElementRef.current = styleElement;
      }
    },
    [elementId],
  );

  const handleExtractStyle = useCallback((style: string) => {
    if (typeof window === 'undefined') return;
    if (!styleElementRef.current || !styleElementRef.current.sheet) return;

    const foundRuleIndex = StyleUtils.findRuleIndex(
      styleElementRef.current.sheet,
      style,
    );
    if (foundRuleIndex === -1) return;

    styleElementRef.current.sheet.deleteRule(foundRuleIndex);
    styleElementRef.current.innerHTML =
      styleElementRef.current.innerHTML.replace(style, '');
  }, []);

  const handleRemove = useCallback(() => {
    if (!styleElementRef.current) return;

    styleElementRef.current.parentElement?.removeChild(styleElementRef.current);
  }, []);

  useEffect(() => {
    if (styleElementRef.current) return;

    const element = document.querySelector<HTMLStyleElement>(
      `style#${elementId}`,
    );
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
