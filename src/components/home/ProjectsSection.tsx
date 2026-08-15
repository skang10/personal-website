'use client';

import { motion } from 'framer-motion';

export interface ProjectEntry {
  name: string;
  description: string;
  chips?: string[];
  github?: string;
  demo?: string;
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
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-semibold text-primary text-[0.97rem] leading-snug">
                {project.name}
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
