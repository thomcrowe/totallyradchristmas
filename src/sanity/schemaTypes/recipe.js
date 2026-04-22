export const recipeSchema = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Main Dishes', value: 'Main Dishes' },
          { title: 'Sides & Salads', value: 'Sides & Salads' },
          { title: 'Desserts', value: 'Desserts' },
          { title: 'Drinks & Cocktails', value: 'Drinks & Cocktails' },
          { title: 'Appetizers', value: 'Appetizers' },
          { title: 'Questionable Classics', value: 'Questionable Classics' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Era / Year',
      description: 'e.g. "1980s" or "1985"',
      type: 'string',
    },
    {
      name: 'servings',
      title: 'Servings',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    },
    {
      name: 'tagline',
      title: 'Tagline',
      description: 'Short fun line shown under the title on the card',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'steps',
      title: 'Steps / Instructions',
      type: 'array',
      of: [{ type: 'text' }],
    },
    {
      name: 'notes',
      title: 'Notes',
      description: 'Extra tips, Gerry commentary, warnings, etc.',
      type: 'text',
      rows: 3,
    },
    {
      name: 'contributor',
      title: 'Contributor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Name',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}
