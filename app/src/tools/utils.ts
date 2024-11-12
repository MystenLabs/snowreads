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
  replace: '<i>$1</i>'
}];

// Quick and easy way to replace some latex text to html
export function latexToHtml(text: string): string {
  for (const matcher of MATCHERS) {
    text = text.replace(matcher.pattern, matcher.replace);
  }
  return text
}
