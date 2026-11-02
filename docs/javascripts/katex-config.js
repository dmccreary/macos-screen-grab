/* Currency-safe KaTeX configuration for MkDocs Material.
 * Only backslash delimiters are recognized, so dollar amounts such as
 * $9 and $30 are never mistaken for math:
 *   inline:  \( ... \)
 *   display: \[ ... \]
 * pymdownx.arithmatex (generic: true) wraps the math in
 * <span class="arithmatex"> / <div class="arithmatex"> and KaTeX renders it.
 */
document$.subscribe(({ body }) => {
  renderMathInElement(body, {
    delimiters: [
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true }
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
    ignoredClasses: ["no-katex"],
    throwOnError: false
  });
});
