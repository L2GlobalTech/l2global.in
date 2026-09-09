import React from 'react';

/**
 * Parses a string containing `{...}` brackets and renders the text inside
 * the curly braces with gradient highlight styling.
 *
 * Example:
 * "Why {AWS Cloud} Services Matter"
 * -> "Why " + <span className="...">AWS Cloud</span> + " Services Matter"
 */
export function renderHighlightedText(
  text: any,
  customClassName: string = 'bg-gradient-to-r from-[#195DF0] to-[#8152E0] bg-clip-text text-transparent inline'
): React.ReactNode {
  if (text === null || text === undefined) return null;

  let raw = '';
  if (typeof text === 'string') {
    raw = text;
  } else if (typeof text === 'number') {
    raw = String(text);
  } else if (typeof text === 'object') {
    raw = text.text ?? text.title ?? text.label ?? text.name ?? text.value ?? '';
  }

  if (!raw) return null;

  // Split by `{...}`
  const parts = raw.split(/(\{.*?\})/g);

  return parts.map((part, index) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const highlighted = part.slice(1, -1);
      return (
        <span key={index} className={customClassName}>
          {highlighted}
        </span>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export interface FormatTitleOptions {
  title?: any;
  titleBefore?: any;
  linearText?: any;
  titleAfter?: any;
  customClassName?: string;
}

/**
 * Combines and renders titles whether provided as a single string with `{}`
 * or as segmented props (titleBefore, linearText, titleAfter).
 */
export function renderFormattedTitle({
  title,
  titleBefore,
  linearText,
  titleAfter,
  customClassName = 'bg-gradient-to-r from-[#195DF0] to-[#8152E0] bg-clip-text text-transparent inline',
}: FormatTitleOptions): React.ReactNode {
  const extract = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return String(val);
    if (typeof val === 'object') return val.text ?? val.title ?? val.label ?? '';
    return '';
  };

  const titleStr = extract(title);
  const beforeStr = extract(titleBefore);
  const linearStr = extract(linearText);
  const afterStr = extract(titleAfter);

  // If a unified title is passed
  if (titleStr) {
    // If title has `{...}`, render it with curly brace highlighting
    if (titleStr.includes('{') && titleStr.includes('}')) {
      return renderHighlightedText(titleStr, customClassName);
    }

    // If linearStr is also provided separately and not inside titleStr
    if (linearStr && !titleStr.includes(linearStr)) {
      return (
        <>
          {titleStr}{' '}
          <span className={customClassName}>{linearStr}</span>
          {afterStr ? ` ${afterStr}` : ''}
        </>
      );
    }

    return titleStr;
  }

  // If beforeStr or afterStr has `{...}`
  if ((beforeStr && beforeStr.includes('{') && beforeStr.includes('}')) || (afterStr && afterStr.includes('{') && afterStr.includes('}'))) {
    return (
      <>
        {beforeStr && renderHighlightedText(beforeStr, customClassName)}
        {linearStr && <span className={customClassName}> {linearStr} </span>}
        {afterStr && renderHighlightedText(afterStr, customClassName)}
      </>
    );
  }

  // Fallback: Segmented render with linearText highlighted
  if (linearStr) {
    return (
      <>
        {beforeStr ? `${beforeStr} ` : ''}
        <span className={customClassName}>{linearStr}</span>
        {afterStr ? ` ${afterStr}` : ''}
      </>
    );
  }

  // Plain combination
  return (
    <>
      {beforeStr ? `${beforeStr} ` : ''}
      {afterStr}
    </>
  );
}
