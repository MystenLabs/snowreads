import katex from "katex";

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// Currently only supports simple-textit
const MATCHERS = [{
  name: 'simple-textit',
  pattern: /\$\\textit{([^}]+)}\$/g,
  replace: (match: RegExpExecArray) => `<i>${match[1]}</i>`
}, {
  name: 'katex-mathml',
  pattern: /\$([^$^ ]+)\$/g,
  replace: (match: RegExpExecArray) =>
    katex.renderToString(match[1], { throwOnError: false, strict: true, output: 'mathml' })
}];

// Quick and way to replace some latex text to html
// as react-latex-next or react-katex messed up the css
export function latexToHtml(text: string): string {
  for (const matcher of MATCHERS) {
    let matches = 0;
    let currentIndex = 0;
    let result = [];
    let match: RegExpExecArray | null = null;
    while ((match = matcher.pattern.exec(text)) !== null) {
      matches++;
      result.push(text.slice(currentIndex, match.index));
      result.push(matcher.replace(match));
      currentIndex = match.index + match[0].length;
    }
    result.push(text.slice(currentIndex));
    text = result.join('');
  }
  return text;
}
