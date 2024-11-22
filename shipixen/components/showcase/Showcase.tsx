'use client';
import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { allBlogs, Blog } from 'shipixen-contentlayer/generated';
import { slug } from 'github-slugger';

import './css/embla.css';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import { cn } from '@/lib/utils';

const OPTIONS: EmblaOptionsType = { loop: true };

export const Showcase = ({
  className,
  bundle,
  autoplayOnHover = false,
}: {
  className?: string;
  bundle: {
    name: string;
    description: string;
    apps: string[];
  };
  autoplayOnHover?: boolean;
}) => {
  const apps = bundle.apps
    .map((appName) =>
      allBlogs.find((post) => {
        return slug(post.title) === slug(appName);
      }),
    )
    .filter(Boolean) as CoreContent<Blog>[];

  return (
    <div
      className={cn(
        'flex flex-col max-w-4xl 2xl:max-w-7xl w-full bg-primary-100/10 rounded-xl py-6',
        className,
      )}
    >
      <div className="flex flex-col gap-1 px-6">
        <h2 className="text-2xl font-bold">{bundle.name}</h2>
        <p className="text-sm mb-8">{bundle.description}</p>
      </div>

      <EmblaCarousel
        apps={apps}
        options={OPTIONS}
        autoplayOnHover={autoplayOnHover}
      />
    </div>
  );
};
