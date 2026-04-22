import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'totally-rad-christmas',
  title: 'Totally Rad Christmas!',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('🏆 Raddies Ceremonies')
              .child(
                S.documentTypeList('raddiesCeremony')
                  .title('Raddies Ceremonies')
                  .defaultOrdering([{ field: 'year', direction: 'desc' }])
              ),
            S.divider(),
            S.listItem()
              .title('🍽️ Recipes')
              .child(
                S.documentTypeList('recipe')
                  .title('All Recipes')
              ),
            S.listItem()
              .title('🎁 Resources')
              .child(
                S.documentTypeList('resource')
                  .title('All Resources')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
