'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockValue {
  _type: 'code';
  code: string;
  language?: string;
}

interface CodeBlockComponentProps {
  value: CodeBlockValue;
}

export default function CodeBlockComponent({ value }: CodeBlockComponentProps) {
  if (!value?.code) {
    // Fallback rendering if code is missing
    return (
      <div className="bg-gray-800 text-gray-100 rounded p-4 my-4 overflow-x-auto">
        <pre className="font-mono text-sm">
          <code>{JSON.stringify(value, null, 2)}</code>
        </pre>
      </div>
    );
  }

  // Use a data attribute to help with Speedreader compatibility
  return (
    <div data-code-block="true" className="my-4">
      <div className="bg-gray-800 text-gray-100 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-gray-700 text-xs font-mono">
          {value.language || 'code'}
        </div>
        <SyntaxHighlighter
          language={value.language || 'javascript'}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
          }}
          wrapLines={true}
          showLineNumbers={false}
        >
          {value.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
} 