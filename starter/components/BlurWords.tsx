import { Fragment } from "react";

/*
 * A headline that is on screen at load, blurring into focus word by word in
 * pure CSS (the `focus-in` class in app/globals.css), so it runs before any
 * script and needs none. Each line is set on its own row.
 *
 *   <h1><BlurWords lines={["Every email read.", "Before you have."]} /></h1>
 *
 * Titles further down the page use `data-title` instead (see Motion).
 */
export function BlurWords({ lines, step = 90, delay = 0 }: { lines: string[]; step?: number; delay?: number }) {
  let n = 0;
  return (
    <>
      {lines.map((line, l) => (
        <span key={l} className="block">
          {line.split(" ").map((word, i) => (
            <Fragment key={i}>
              {i > 0 && " "}
              <span className="focus-in inline-block" style={{ animationDelay: `${delay + n++ * step}ms` }}>
                {word}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </>
  );
}
