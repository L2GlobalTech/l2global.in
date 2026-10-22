import { supabase, isSupabaseConfigured } from '@/configs/supabase';
import { TestimonialRecord } from '@/types/cms';

export const defaultTestimonials: TestimonialRecord[] = [
  {
    id: '1',
    title: '“The most reliable design agency we’ve worked with”',
    desc: 'From initial brainstorming to final delivery, the team demonstrated exceptional creativity and attention to detail. Their ability to understand our brand and translate it into impactful digital designs truly set them apart.',
    name: 'Sophia Moore',
    role: 'Marketing Head at BrightEdge Solutions',
    img: '/assets/web/testimonials/sophia-moore.webp',
    rating: 5,
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    title: '“Exceptional quality and innovative ideas”',
    desc: 'The team consistently delivered high-quality designs backed by innovative thinking. Their structured approach, clear communication, and commitment to deadlines made the entire collaboration smooth and efficient.',
    name: 'Adam Smith',
    role: 'Founder of TechNova Labs',
    img: '/assets/web/testimonials/adam-smith.webp',
    rating: 5,
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    title: '“Professional, creative, and easy to collaborate with”',
    desc: 'Working with L2 Global was a seamless experience. They took the time to understand our requirements and delivered creative solutions that aligned perfectly with our business goals and long-term vision.',
    name: 'Mike Warren',
    role: 'CEO of NextWave Technologies',
    img: '/assets/web/testimonials/mike-warren.webp',
    rating: 5,
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    title: '“A partner we can truly rely on”',
    desc: 'Their team brought clarity and confidence to our project by combining technical expertise with strong design sensibilities. The results exceeded our expectations and significantly improved user engagement.',
    name: 'Emily Carter',
    role: 'Product Manager at Innovex Corp',
    img: '/assets/web/testimonials/emily-carter.webp',
    rating: 5,
    display_order: 4,
    is_active: true,
  },
  {
    id: '5',
    title: '“Outstanding collaboration and execution”',
    desc: 'From planning to execution, every stage of the project was handled with professionalism. The team was responsive, adaptable, and delivered solutions that were both functional and visually impressive.',
    name: 'Daniel Roberts',
    role: 'Operations Director at CloudSphere',
    img: '/assets/web/testimonials/daniel-roberts.webp',
    rating: 5,
    display_order: 5,
    is_active: true,
  },
  {
    id: '6',
    title: '“Creative solutions backed by strong expertise”',
    desc: 'L2 Global combined creative thinking with technical excellence to deliver a product that truly reflected our brand values. Their proactive approach and attention to detail made a noticeable difference.',
    name: 'Rachel Thompson',
    role: 'Head of Digital Strategy at Elevate Studios',
    img: '/assets/web/testimonials/rachel-thompson.webp',
    rating: 5,
    display_order: 6,
    is_active: true,
  },
];

/**
 * Fetches active public testimonials from Supabase `testimonials` table.
 * Falls back to default hardcoded testimonials if Supabase is offline or empty.
 */
export async function fetchPublicTestimonials(): Promise<TestimonialRecord[]> {
  try {
    if (!isSupabaseConfigured()) {
      return defaultTestimonials;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Could not fetch testimonials from Supabase, using defaults:', error.message);
      return defaultTestimonials;
    }

    if (!data || data.length === 0) {
      return defaultTestimonials;
    }

    return data as TestimonialRecord[];
  } catch (err) {
    console.warn('Unexpected error in fetchPublicTestimonials, falling back to defaults:', err);
    return defaultTestimonials;
  }
}
