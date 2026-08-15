'use client';

import { motion } from 'framer-motion';

export interface ProjectEntry {
  name: string;
  /** Named stroke icon shown left of the name — see ICONS below. */
  icon?: string;
  /** Fallback: a literal emoji, used only when `icon` is unset. */
  emoji?: string;
  description: string;
  chips?: string[];
  github?: string;
  demo?: string;
}

/** Stroke icons in the same visual language as the timeline nodes. */
const ICONS: Record<string, React.ReactNode> = {
  battery: (
    <>
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <path d="M22 11v2" />
      <path d="m11 9-2 3h3l-2 3" />
    </>
  ),
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8" />
      <path d="m15.6 15.6 2.8 2.8" />
      <path d="m18.4 5.6-2.8 2.8" />
      <path d="m8.4 15.6-2.8 2.8" />
    </>
  ),
};

function ProjectIcon({ name }: { name: string }) {
  const paths = ICONS[name];
  if (!paths) return null;
  return (
    <span className="flex-shrink-0 w-7 h-7 rounded-lg grid place-items-center bg-accent/10 text-accent">
      <svg
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5" aria-hidden="true"
      >
        {paths}
      </svg>
    </span>
  );
}

interface ProjectsSectionProps {
  projects: ProjectEntry[];
  title?: string;
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-accent transition-colors"
    >
      {label}
      <svg
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3" aria-hidden="true"
      >
        <path d="M7 17 17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </a>
  );
}

export default function ProjectsSection({ projects, title = 'Projects' }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * i }}
            className="flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 p-5
                       transition-colors hover:border-accent/40 dark:hover:border-accent/40"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2.5 min-w-0">
                {project.icon ? (
                  <ProjectIcon name={project.icon} />
                ) : project.emoji ? (
                  <span aria-hidden="true">{project.emoji}</span>
                ) : null}
                <span className="font-semibold text-primary text-[0.97rem] leading-snug truncate">
                  {project.name}
                </span>
              </span>
              <span className="flex items-center gap-3 flex-shrink-0">
                {project.github && <ExternalLink href={project.github} label="GitHub" />}
                {project.demo && <ExternalLink href={project.demo} label="Demo" />}
              </span>
            </div>

            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
              {project.description}
            </p>

            {project.chips && project.chips.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.chips.map((chip, ci) => (
                  <span
                    key={ci}
                    className="text-[0.7rem] text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded-full px-2 py-0.5 whitespace-nowrap"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
