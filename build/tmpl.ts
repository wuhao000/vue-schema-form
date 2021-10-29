import fs from 'fs';

export const createFromTmpl = (tmplPath: string,
                               data: { [key: string]: string },
                               newPath: string) => {
  let tmpl = fs.readFileSync(tmplPath).toString();
  const keys = Object.keys(data);
  keys.forEach(key => {
    while (tmpl.includes(`{{{${key}}}}`)) {
      tmpl = tmpl.replace(`{{{${key}}}}`, data[key]);
    }
  });
  fs.writeFileSync(newPath, tmpl);
  return tmpl;
};
