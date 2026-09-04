'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Outdent,
  Indent,
  RemoveFormatting,
  HelpCircle,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Code,
  Maximize2,
  Minimize2,
  ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface RichTextEditorProps {
  value?: string | null;
  onChange: (htmlContent: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Write your article body here...',
  minHeight = '320px',
  className = '',
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormat, setActiveFormat] = useState('p');
  const [wordCount, setWordCount] = useState(0);
  const [currentPath, setCurrentPath] = useState('p');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHtmlSource, setShowHtmlSource] = useState(false);
  const [sourceCode, setSourceCode] = useState(value || '');
  const [textColor, setTextColor] = useState('#000000');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Synchronize initial & external value
  useEffect(() => {
    if (editorRef.current && !showHtmlSource) {
      if (editorRef.current.innerHTML !== (value || '')) {
        editorRef.current.innerHTML = value || '';
        updateWordCount(value || '');
      }
    }
    setSourceCode(value || '');
  }, [value, showHtmlSource]);

  // Update word count
  const updateWordCount = (html: string) => {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const count = text ? text.split(/\s+/).length : 0;
    setWordCount(count);
  };

  // Execute standard formatting command
  const execCmd = (command: string, val: string | undefined = undefined) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, val);
      handleEditorChange();
    }
  };

  // Handle content change inside contentEditable
  const handleEditorChange = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    updateWordCount(html);
    onChange(html);
    setSourceCode(html);
    updateCurrentPath();
  };

  // Update element hierarchy in footer (e.g. p > strong)
  const updateCurrentPath = () => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode || !editorRef.current) {
      setCurrentPath('p');
      return;
    }

    let node: Node | null = selection.anchorNode;
    const pathList: string[] = [];

    while (node && node !== editorRef.current && node.parentNode) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        pathList.unshift((node as HTMLElement).tagName.toLowerCase());
      }
      node = node.parentNode;
    }

    setCurrentPath(pathList.length > 0 ? pathList.join(' > ') : 'p');
  };

  // Heading / Format dropdown handler
  const handleBlockFormat = (tag: string) => {
    setActiveFormat(tag);
    if (tag === 'p') {
      execCmd('formatBlock', '<p>');
    } else if (tag.startsWith('h')) {
      execCmd('formatBlock', `<${tag}>`);
    } else if (tag === 'blockquote') {
      execCmd('formatBlock', '<blockquote>');
    } else if (tag === 'pre') {
      execCmd('formatBlock', '<pre>');
    }
  };

  // Insert Link
  const handleInsertLink = () => {
    const url = prompt('Enter hyperlink URL:', 'https://');
    if (url && url.trim()) {
      execCmd('createLink', url.trim());
    }
  };

  // Insert Image
  const handleInsertImage = () => {
    const url = prompt('Enter image URL:', 'https://');
    if (url && url.trim()) {
      execCmd('insertImage', url.trim());
    }
  };

  // Insert Table
  const handleInsertTable = (rows = 3, cols = 3) => {
    let tableHtml = '<table class="border-collapse border border-slate-300 w-full my-3">';
    for (let r = 0; r < rows; r++) {
      tableHtml += '<tr>';
      for (let c = 0; c < cols; c++) {
        tableHtml += `<td class="border border-slate-300 p-2 text-xs">${r === 0 ? 'Header' : 'Data'}</td>`;
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table><p></p>';
    execCmd('insertHTML', tableHtml);
  };

  // Toggle Source Code
  const handleToggleSource = () => {
    if (showHtmlSource) {
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceCode;
      }
      onChange(sourceCode);
      setShowHtmlSource(false);
    } else {
      setSourceCode(editorRef.current?.innerHTML || '');
      setShowHtmlSource(true);
    }
  };

  return (
    <div
      className={`border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden flex flex-col font-sans transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''
      } ${className}`}
    >
      {/* 1. Menu Bar (File, Edit, View, Insert, Format, Tools, Table, Help) */}
      <div className="flex items-center gap-4 px-3 py-1.5 border-b border-slate-100 bg-white text-xs text-slate-600 select-none">
        <button
          type="button"
          onClick={() => execCmd('insertHTML', '<p></p>')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          File
        </button>
        <button
          type="button"
          onClick={() => execCmd('undo')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleToggleSource}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          View
        </button>
        <button
          type="button"
          onClick={handleInsertLink}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Insert
        </button>
        <button
          type="button"
          onClick={() => execCmd('bold')}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Format
        </button>
        <button
          type="button"
          onClick={handleToggleSource}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Tools
        </button>
        <button
          type="button"
          onClick={() => handleInsertTable(3, 3)}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Table
        </button>
        <button
          type="button"
          onClick={() =>
            toast(
              'Shortcuts:\nCtrl+B: Bold\nCtrl+I: Italic\nCtrl+U: Underline\nCtrl+Z: Undo\nCtrl+Y: Redo',
              { icon: 'ℹ️' }
            )
          }
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          Help
        </button>
      </div>

      {/* 2. Main Icon Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 border-b border-slate-200 bg-slate-50/70 text-slate-700 select-none">
        {/* Undo & Redo */}
        <button
          type="button"
          onClick={() => execCmd('undo')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Undo (Ctrl+Z)"
        >
          <Undo size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('redo')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Redo (Ctrl+Y)"
        >
          <Redo size={15} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Paragraph / Heading Dropdown */}
        <div className="relative">
          <select
            value={activeFormat}
            onChange={(e) => handleBlockFormat(e.target.value)}
            className="text-xs bg-white border border-slate-200 rounded-md px-2 py-1 pr-6 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer appearance-none"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Blockquote</option>
            <option value="pre">Preformatted</option>
          </select>
          <ChevronDown
            size={12}
            className="absolute right-1.5 top-2.5 text-slate-400 pointer-events-none"
          />
        </div>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Bold & Italic */}
        <button
          type="button"
          onClick={() => execCmd('bold')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-700 font-bold"
          title="Bold (Ctrl+B)"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('italic')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-700 italic"
          title="Italic (Ctrl+I)"
        >
          <Italic size={15} />
        </button>

        {/* Text Color Picker */}
        <label
          className="relative flex items-center p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-700"
          title="Text Color"
        >
          <span className="font-serif font-bold text-xs">A</span>
          <span
            className="w-2.5 h-1 ml-0.5 rounded-xs"
            style={{ backgroundColor: textColor }}
          />
          <input
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              execCmd('foreColor', e.target.value);
            }}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
        </label>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => execCmd('justifyLeft')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Align Left"
        >
          <AlignLeft size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyCenter')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Align Center"
        >
          <AlignCenter size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyRight')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Align Right"
        >
          <AlignRight size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyFull')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Justify"
        >
          <AlignJustify size={15} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Lists & Indent */}
        <button
          type="button"
          onClick={() => execCmd('insertUnorderedList')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Bullet List"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('insertOrderedList')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Numbered List"
        >
          <ListOrdered size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('outdent')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Decrease Indent"
        >
          <Outdent size={15} />
        </button>
        <button
          type="button"
          onClick={() => execCmd('indent')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Increase Indent"
        >
          <Indent size={15} />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* Clear Formatting */}
        <button
          type="button"
          onClick={() => execCmd('removeFormat')}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600"
          title="Clear Formatting"
        >
          <RemoveFormatting size={15} />
        </button>

        {/* Source Code View Toggle */}
        <button
          type="button"
          onClick={handleToggleSource}
          className={`p-1.5 rounded-md transition-colors cursor-pointer ${
            showHtmlSource
              ? 'bg-indigo-100 text-indigo-700'
              : 'hover:bg-slate-200/80 text-slate-600'
          }`}
          title="Toggle HTML Source Code"
        >
          <Code size={15} />
        </button>

        {/* Fullscreen Toggle */}
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 hover:bg-slate-200/80 rounded-md transition-colors cursor-pointer text-slate-600 ml-auto"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* 3. Content Editable Area or HTML Source Code */}
      <div className="flex-1 relative overflow-y-auto bg-white">
        {showHtmlSource ? (
          <textarea
            value={sourceCode}
            onChange={(e) => {
              setSourceCode(e.target.value);
              onChange(e.target.value);
              updateWordCount(e.target.value);
            }}
            style={{ minHeight }}
            className="w-full h-full p-4 font-mono text-xs text-slate-900 bg-slate-900/5 focus:outline-none resize-none"
            placeholder="Edit raw HTML source code..."
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleEditorChange}
            onKeyUp={updateCurrentPath}
            onMouseUp={updateCurrentPath}
            style={{ minHeight }}
            className="p-5 text-sm text-slate-900 leading-relaxed focus:outline-none prose prose-slate max-w-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none"
            data-placeholder={placeholder}
          />
        )}
      </div>

      {/* 4. Bottom Status Bar (p, Press Alt+0 for help, Word Count, Powered by HugeRTE) */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between select-none">
        <div className="font-mono text-slate-600">{currentPath}</div>

        <div className="hidden sm:block text-slate-400">
          Press <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded-sm font-mono text-[10px]">Alt+0</kbd> for help
        </div>

        <div className="flex items-center gap-2">
          <span>{wordCount} words</span>
          <span>&bull;</span>
          <span className="text-slate-400 font-medium">Powered by HugeRTE</span>
        </div>
      </div>
    </div>
  );
};
