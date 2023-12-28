/**
 * Style element parsing utilities
 * @class
 * @abstract
 */
export abstract class StyleUtils {
  /**
   * Parses a style rule
   * @param {string} rule - Style rule
   * @returns {string} - Parsed style rule
   * @static
   */
  static parseRule(rule: string): string {
    return rule.trim().replaceAll(' ', '').replaceAll('\n', '');
  }

  /**
   * Tries to find index of the style rule and returns index
   * @param {CSSStyleSheet} sheet - CSS stylesheet
   * @param {string} rule - Style rule
   * @returns {number | -1} - Index result or '-1' if no rule matches
   * @static
   */
  static findRuleIndex(sheet: CSSStyleSheet, rule: string): number | -1 {
    // initialize index as not found
    let index: number | -1 = -1;

    // iterate rules
    for (let i = 0; i < sheet.cssRules.length; i++) {
      const cssRule = sheet.cssRules[i];

      // check rule
      if (cssRule && this.parseRule(cssRule.cssText) === this.parseRule(rule)) {
        // store found index
        index = i;

        // break unnecessary iterations
        break;
      }
    }

    return index;
  }

  /**
   * Inject a style rule to a html style element
   * @param {HTMLStyleElement} styleElement - HTML style element
   * @param {string} rule - Style rule
   * @static
   */
  static injectStyleRule(styleElement: HTMLStyleElement, rule: string): void {
    if (!styleElement.sheet) return;

    const foundRuleIndex = this.findRuleIndex(styleElement.sheet, rule);
    if (foundRuleIndex !== -1) return;

    styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length);
    styleElement.innerHTML += rule;
  }
}
