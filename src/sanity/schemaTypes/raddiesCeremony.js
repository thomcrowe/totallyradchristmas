export const raddiesCeremonySchema = {
  name: 'raddiesCeremony',
  title: 'Raddies Ceremony',
  type: 'document',
  orderings: [
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  fields: [
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'edition',
      title: 'Edition',
      description: 'e.g. "1st", "2nd", "6th"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ordinal',
      title: 'Ordinal Number',
      description: 'Used for sorting (1, 2, 3 …)',
      type: 'number',
    },
    {
      name: 'president',
      title: 'Academy President',
      type: 'string',
    },
    {
      name: 'honorary',
      title: 'Honorary Raddies Recipients',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'award',
          fields: [
            {
              name: 'category',
              title: 'Award Category',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'winner',
              title: 'Winner',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'episode',
              title: 'Episode (optional)',
              description: 'The episode this award relates to',
              type: 'string',
            },
            {
              name: 'special',
              title: 'Special Award?',
              description: 'Highlights this as a special/named award (gold star treatment)',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: { title: 'category', subtitle: 'winner' },
          },
        },
      ],
    },
  ],
  preview: {
    select: { edition: 'edition', year: 'year' },
    prepare({ edition, year }) {
      return {
        title: `${edition} Annual Raddies`,
        subtitle: String(year ?? ''),
      }
    },
  },
}
