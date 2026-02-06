'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import Logo from '@/components/ui/Logo';
import SocialShareLinks from '@/components/ui/SocialShareLinks';

const loadingMessages = [
  'Reading between the lines of your values...',
  'Mapping your beliefs into a coherent worldview...',
  'Drafting your preamble...',
  'Structuring your articles of identity...',
  'Weaving your principles into prose...',
  'Capturing your aspirations and vision...',
  'Integrating the unfiltered truths...',
  'Polishing your Personal Constitution...',
];

export default function GeneratingStep() {
  const { state, dispatch } = useWizard();
  const [messageIndex, setMessageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!state.isGenerating) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [state.isGenerating]);

  const generate = useCallback(async () => {
    dispatch({ type: 'START_GENERATING' });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: state.answers,
          email: state.email,
          firstName: state.firstName,
          lastName: state.lastName,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate constitution');
      }

      dispatch({ type: 'SET_DOCUMENT', document: data.document });

      if (state.email) {
        fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: state.email,
            firstName: state.firstName,
            document: data.document,
          }),
        }).catch(() => {});
      }
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        error: err instanceof Error ? err.message : 'Something went wrong',
      });
    }
  }, [dispatch, state.answers, state.email, state.firstName, state.lastName]);

  useEffect(() => {
    if (!hasStartedRef.current && !state.isComplete && !state.generatedDocument) {
      hasStartedRef.current = true;
      generate();
    }
  }, [generate, state.isComplete, state.generatedDocument]);

  const copyToClipboard = async () => {
    if (!state.generatedDocument) return;
    try {
      await navigator.clipboard.writeText(state.generatedDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = state.generatedDocument;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadMarkdown = () => {
    if (!state.generatedDocument) return;
    const blob = new Blob([state.generatedDocument], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personal-constitution-${state.firstName?.toLowerCase() || 'document'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!state.generatedDocument) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Personal Constitution - ${state.firstName || ''} ${state.lastName || ''}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Outfit:wght@300;400;500&display=swap');
            body {
              font-family: 'Outfit', system-ui, sans-serif;
              max-width: 700px;
              margin: 40px auto;
              padding: 20px;
              color: #16161d;
              line-height: 1.8;
              font-weight: 300;
            }
            h1 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; text-align: center; margin-bottom: 30px; font-weight: 300; }
            h2 { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; margin-top: 30px; border-bottom: 1px solid #b08d57; padding-bottom: 5px; font-weight: 400; }
            h3 { font-size: 16px; margin-top: 20px; font-weight: 500; }
            p { margin: 10px 0; }
            ul, ol { padding-left: 24px; }
            li { margin: 4px 0; }
            blockquote { border-left: 3px solid #b08d57; margin: 16px 0; padding: 8px 16px; color: #4a4a5a; font-style: italic; }
            .footer { text-align: center; margin-top: 40px; color: #8e8e99; font-size: 12px; border-top: 1px solid #b08d57; padding-top: 20px; }
          </style>
        </head>
        <body>
          ${markdownToHtml(state.generatedDocument)}
          <div class="footer">Created with WeTheMe.app</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // ─── Loading State ───
  if (state.isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-4 bg-ink relative overflow-hidden"
      >
        {/* Atmospheric gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(176,141,87,0.06),transparent)]" />

        <div className="text-center max-w-md relative z-10">
          {/* Animated quill */}
          <motion.div className="mb-10 animate-writing">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-accent mx-auto"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-paper/60 text-lg mb-10 font-display font-light italic"
            >
              {loadingMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>

          {/* Shimmer line */}
          <div className="w-48 h-0.5 mx-auto rounded-full animate-shimmer" />
        </div>
      </motion.div>
    );
  }

  // ─── Error State ───
  if (state.error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>

          <h2 className="text-2xl font-display font-light text-ink mb-3">Something went wrong</h2>
          <p className="text-ink-light mb-8 font-body">{state.error}</p>

          <button
            onClick={() => {
              hasStartedRef.current = false;
              generate();
            }}
            className="bg-ink text-paper px-8 py-3 rounded-full text-sm font-medium font-body hover:bg-ink-light shadow-elevated"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── Success State ───
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col bg-cream"
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-4 max-w-3xl mx-auto w-full">
        <Logo
          size="sm"
          onClick={() => dispatch({ type: 'RESET' })}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-6 max-w-3xl mx-auto w-full py-8">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-light text-ink mb-3">
            Your Constitution is Ready
          </h2>
          <p className="text-ink-light max-w-lg mx-auto text-lg font-body font-light">
            Download it. Upload it to any AI. Every interaction just became personal.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-ink text-paper px-8 py-3 rounded-full text-sm font-medium font-body hover:bg-ink-light shadow-elevated"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </button>

          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-2 bg-paper border border-ink/15 text-ink px-8 py-3 rounded-full text-sm font-medium font-body hover:border-ink/30 hover:shadow-elevated"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Download Markdown
          </button>

          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-paper border border-ink/15 text-ink px-8 py-3 rounded-full text-sm font-medium font-body hover:border-ink/30 hover:shadow-elevated"
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy Text
              </>
            )}
          </button>
        </motion.div>

        {/* Document Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full bg-paper rounded-2xl p-8 md:p-10 mb-8 shadow-elevated-lg border border-muted/10"
        >
          <div className="prose prose-sm max-w-none text-ink-light leading-relaxed whitespace-pre-wrap font-body text-sm font-light">
            {state.generatedDocument && state.generatedDocument.length > 2000
              ? state.generatedDocument.slice(0, 2000) + '\n\n...'
              : state.generatedDocument}
          </div>
          {state.generatedDocument && state.generatedDocument.length > 2000 && (
            <p className="text-[11px] text-muted mt-6 text-center font-body">
              Preview &mdash; download for the full document
            </p>
          )}
        </motion.div>

        {/* How to use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full bg-ink rounded-2xl p-8 mb-8 text-paper relative overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(176,141,87,0.06),transparent)]" />

          <div className="relative z-10">
            <p className="text-[11px] font-medium text-accent mb-5 uppercase tracking-[0.2em] font-body">How to use your constitution</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Upload to ChatGPT, Claude, or Gemini as a context document',
                'Add it to custom GPTs, Claude Projects, or AI workflows',
                'Reference it before any AI conversation that matters',
                'Update it quarterly as you grow and evolve',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5 text-sm font-body">0{i + 1}</span>
                  <p className="text-paper/60 text-sm leading-relaxed font-body font-light">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Share + Donate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-6 mb-8"
        >
          <SocialShareLinks label="Spread the word:" />

          <div>
            <p className="text-sm text-muted mb-2 font-body">
              Did this change how you use AI?
            </p>
            <a
              href="https://buymeacoffee.com/chadn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover text-sm font-medium font-body"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                <line x1="6" x2="6" y1="2" y2="4" />
                <line x1="10" x2="10" y1="2" y2="4" />
                <line x1="14" x2="14" y1="2" y2="4" />
              </svg>
              Buy Me a Coffee
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.*)$/gm, (line) => {
      if (
        line.startsWith('<h') ||
        line.startsWith('<ul') ||
        line.startsWith('<li') ||
        line.startsWith('<blockquote') ||
        line.startsWith('<p') ||
        line.startsWith('</p') ||
        line.trim() === ''
      ) {
        return line;
      }
      return `<p>${line}</p>`;
    });
}
