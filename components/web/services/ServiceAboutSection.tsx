'use client';

import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './ServiceHeroSection.module.css';
import PrimaryButton from '@/components/shared/PrimaryButton';
import { StaticImageData } from 'next/image';
import { renderFormattedTitle } from '@/utils/highlightText';
import { renderHighlightIcon } from '@/utils/serviceHighlightIcons';
import { ServiceHighlightItem } from '@/types/cms';

interface IProps {
  badge?: string;
  title?: string;
  titleBefore?: string;
  titleAfter?: string;
  linearText?: string;
  description: string;
  features?: (string | ServiceHighlightItem | any)[];
  image?: StaticImageData | string;
  onCtaClick?: () => void;
  ctaText?: string;
  ctaUrl?: string;
}

interface NormalizedHighlight {
  id: string;
  title: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

const ServiceAboutSection: React.FC<IProps> = ({
  badge = 'About the Service',
  description,
  features,
  title,
  linearText,
  titleAfter,
  titleBefore,
  image,
  onCtaClick,
  ctaText = 'Get a quote',
  ctaUrl = '/contact-us',
}) => {
  const router = useRouter();
  const imgSrc = typeof image === 'string' ? image : image?.src || '';

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  // Parse and normalize highlights: supports both structured objects and legacy strings
  const normalizedHighlights = useMemo<NormalizedHighlight[]>(() => {
    if (!Array.isArray(features)) return [];

    const list: NormalizedHighlight[] = [];

    features.forEach((item: any, idx: number) => {
      if (!item) return;

      if (typeof item === 'string') {
        const text = item.trim();
        if (!text) return;

        // If the string contains a delimiter like "CRM Integration: Description", split it gracefully
        const colonIdx = text.indexOf(':');
        if (colonIdx > 2 && colonIdx < 35) {
          list.push({
            id: `hl-legacy-${idx}`,
            title: text.slice(0, colonIdx).trim(),
            description: text.slice(colonIdx + 1).trim(),
            icon: 'Sparkles',
            display_order: idx + 1,
            is_active: true,
          });
        } else {
          list.push({
            id: `hl-legacy-${idx}`,
            title: '',
            description: text,
            icon: 'CheckCircle2',
            display_order: idx + 1,
            is_active: true,
          });
        }
        return;
      }

      if (typeof item === 'object') {
        // If explicitly marked inactive, exclude from public view
        if (item.is_active === false) return;

        const desc = String(item.description || item.text || item.desc || '').trim();
        const itemTitle = String(item.title || item.heading || '').trim();

        if (!desc && !itemTitle) return;

        list.push({
          id: String(item.id || `hl-${idx}`),
          title: itemTitle,
          description: desc || itemTitle,
          icon: String(item.icon || 'Sparkles'),
          display_order: typeof item.display_order === 'number' ? item.display_order : idx + 1,
          is_active: true,
        });
      }
    });

    return list.sort((a, b) => a.display_order - b.display_order);
  }, [features]);

  const handleCta = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      router.push(ctaUrl || '/contact-us');
    }
  };

  return (
    <section className="bg-[#F7F9FD] overflow-hidden">
      <div className="py-16 md:py-20 container mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Description, Highlights Cards, CTA */}
          <div>
            {/* Eyebrow Label */}
            <div className="flex pb-4 sm:pb-5 px-1" data-aos="fade-up">
              <div className="text-xs sm:text-sm font-semibold bg-white px-3.5 py-1.5 rounded-full flex items-center gap-2 text-slate-800 shadow-2xs border border-slate-200/60">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                {badge || 'About the Service'}
                <span className="w-2 h-2 bg-orange-500 rounded-full" />
              </div>
            </div>

            <div className="px-1">
              {/* Main Section Heading */}
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1526] leading-tight tracking-tight"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {renderFormattedTitle({
                  title,
                  titleBefore,
                  linearText,
                  titleAfter,
                  customClassName: styles.gradientText,
                })}
              </h2>

              {/* Introductory Description */}
              {description && (
                <p
                  className="text-sm sm:text-base text-[#707A8F] mt-3.5 sm:mt-4 font-normal leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay="150"
                >
                  {description}
                </p>
              )}

              {/* Service Highlights Card Grid */}
              {normalizedHighlights.length > 0 && (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 my-6 sm:my-8"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  {normalizedHighlights.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="group relative bg-white hover:bg-slate-50/70 border border-slate-200/90 hover:border-indigo-300 rounded-xl p-3.5 sm:p-4 transition-all duration-200 hover:shadow-xs flex items-start gap-3 select-none"
                    >
                      {/* Icon Container */}
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 mt-0.5">
                        {renderHighlightIcon(item.icon, 'w-4 h-4')}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        {item.title ? (
                          <>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-950 transition-colors leading-snug line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[12px] sm:text-xs text-slate-600 leading-relaxed mt-1 line-clamp-3">
                              {item.description}
                            </p>
                          </>
                        ) : (
                          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              <div
                className="mt-6 md:mt-8 flex justify-start items-center"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <PrimaryButton
                  onClick={handleCta}
                  label={ctaText}
                  icon={
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path
                        d="M11.25 14L9.64687 12.3667L13.6969 8.16667H0V5.83333H13.6969L9.675 1.63333L11.25 0L18 7L11.25 14Z"
                        fill="white"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>

          {/* Right Column: Service Image */}
          <div data-aos="fade-up" data-aos-delay="250" className="flex items-center justify-center">
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={linearText || title || 'Service Highlights'}
                className="rounded-2xl border border-slate-200/80 shadow-md max-h-[500px] w-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <span className="text-sm font-medium">Service Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAboutSection;