import { groq } from 'next-sanity';

const programmeFields = groq`
  _id,
  title,
  slug,
  summary,
  description,
  thumbnail,
  category,
  hosts,
  isFeatured
`;

export const allProgrammesQuery = groq`
  *[_type == "programme" && defined(slug.current)] | order(title asc) {
    ${programmeFields}
  }
`;

export const programmeBySlugQuery = groq`
  *[_type == "programme" && slug.current == $slug][0] {
    ${programmeFields}
  }
`;

export const allProgrammeSlugsQuery = groq`
  *[_type == "programme" && defined(slug.current)].slug.current
`;

export const weeklyScheduleQuery = groq`
  *[_type == "scheduleSlot"] | order(day asc, startTime asc) {
    _id,
    day,
    startTime,
    endTime,
    isLive,
    notes,
    title,
    category,
    programme-> {
      title,
      slug,
      category,
      thumbnail
    }
  }
`;
