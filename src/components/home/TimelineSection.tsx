'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export interface TimelineEntry {
  period: string;
  /** Legacy narrative — still rendered inline when no `title` is provided. */
  content?: string;
  /** New structured fields (Option A). */
  category?: 'work' | 'education';
  title?: string;
  org?: string;
  chips?: string[];
  /** Reflection shown on hover / focus / tap. Markdown-enabled. */
  detail?: string;
}

interface TimelineSectionProps {
  entries: TimelineEntry[];
  title?: string;
}

const CATEGORY = {
  work: {
    label: 'Work',
    dot: 'bg-accent',
    node: 'bg-accent/10 text-accent',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
  },
  education: {
    label: 'Education',
    dot: 'bg-[#3f6b7d] dark:bg-[#6ea3b8]',
    node: 'bg-[#3f6b7d]/10 text-[#3f6b7d] dark:text-[#6ea3b8]',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
      </svg>
    ),
  },
} as const;

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-accent">{children}</strong>
  ),
};

export default function TimelineSection({ entries, title = 'Timeline' }: TimelineSectionProps) {
  if (!entries || entries.length === 0) return null;

  const showLegend = entries.some((e) => e.category);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>

      {showLegend && (
        <div className="flex gap-5 mb-6 ml-24">
          {(['work', 'education'] as const).map((cat) => (
            <span key={cat} className="inline-flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
              <span className={`w-2.5 h-2.5 rounded-full ${CATEGORY[cat].dot}`} />
              {CATEGORY[cat].label}
            </span>
          ))}
        </div>
      )}

      <div className="relative">
        {/* Vertical line — passes through the node centers */}
        <div className="absolute left-[6.875rem] top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800" />

        <div className="space-y-5">
          {entries.map((entry, i) => {
            const cat = entry.category ? CATEGORY[entry.category] : null;
            const heading = entry.title ?? entry.content ?? '';
            const detail = entry.detail ?? (entry.title ? undefined : entry.content);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="group flex gap-4 items-start"
              >
                {/* Period label */}
                <span className="w-20 flex-shrink-0 text-xs font-medium text-neutral-400 dark:text-neutral-500 text-right pt-1.5 leading-tight tabular-nums">
                  {entry.period}
                </span>

                {/* Icon node (falls back to a small dot for legacy entries) */}
                {cat ? (
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full grid place-items-center ring-4 ring-background relative z-10 ${cat.node}`}>
                    {cat.icon}
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-accent mt-1.5 ring-4 ring-background relative z-10" />
                )}

                {/* Body */}
                <div className="flex-1 min-w-0 pt-0.5">
                  {entry.title ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={detail ? false : undefined}
                        className={`text-left w-full ${detail ? 'cursor-pointer' : 'cursor-default'} focus:outline-none`}
                        tabIndex={detail ? 0 : -1}
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <span className="font-semibold text-primary text-[0.97rem] leading-snug">
                            {heading}
                          </span>
                          {detail && (
                            <svg
                              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                              strokeLinecap="round" strokeLinejoin="round"
                              className="w-3 h-3 text-neutral-400 transition-transform duration-300 group-hover:rotate-90 group-focus-within:rotate-90 motion-reduce:transition-none"
                              aria-hidden="true"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          )}
                        </span>
                        {entry.org && (
                          <span className="block text-sm text-neutral-600 dark:text-neutral-400">{entry.org}</span>
                        )}
                      </button>

                      {entry.chips && entry.chips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {entry.chips.map((chip, ci) => (
                            <span
                              key={ci}
                              className="text-[0.7rem] text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-full px-2 py-0.5 whitespace-nowrap"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // Legacy inline rendering
                    <div className="text-sm text-neutral-700 dark:text-neutral-400 leading-relaxed">
                      <ReactMarkdown components={markdownComponents}>{heading}</ReactMarkdown>
                    </div>
                  )}

                  {/* Hover / focus reveal */}
                  {entry.title && detail && (
                    <div
                      className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-300 ease-out
                                 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-2
                                 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 group-focus-within:mt-2
                                 motion-reduce:transition-none"
                    >
                      <div className="overflow-hidden min-h-0">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-l-2 border-neutral-200 dark:border-neutral-800 pl-3">
                          <ReactMarkdown components={markdownComponents}>{detail}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
