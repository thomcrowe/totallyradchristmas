import { Container } from '@/components/Container'
import { RecipeList } from '@/components/RecipeList'
import { recipes as staticRecipes } from '@/lib/recipes'

const SITE_URL = 'https://totallyradchristmas.com'

export const metadata = {
  title: 'Recipes',
  description:
    "Retro holiday recipes straight from the '80s — some delicious, some deeply questionable, all totally rad.",
  openGraph: {
    title: 'Recipes - Totally Rad Christmas!',
    description:
      "Retro holiday recipes straight from the '80s — some delicious, some deeply questionable, all totally rad.",
    images: [{ url: '/og-image.jpg', width: 1400, height: 1400 }],
  },
}

function buildJsonLd(recipes) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: "Totally Rad Christmas! '80s Holiday Recipes",
    description:
      "Retro holiday recipes straight from the '80s — some delicious, some deeply questionable, all totally rad.",
    url: `${SITE_URL}/recipes`,
    numberOfItems: recipes.length,
    itemListElement: recipes.map((recipe, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Recipe',
        name: recipe.title,
        url: `${SITE_URL}/recipes`,
        description: recipe.description ?? recipe.tagline ?? undefined,
        ...(recipe.image ? { image: recipe.image } : {}),
        author: {
          '@type': 'Person',
          name: recipe.contributor?.name ?? 'Gerry D',
          url: 'https://totallyradchristmas.com/about',
        },
        recipeCategory: recipe.category ?? 'Holiday',
      },
    })),
  }
}

export const revalidate = 60

async function getRecipes() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticRecipes
  }
  try {
    const { getAllRecipes } = await import('@/sanity/lib/queries')
    const data = await getAllRecipes()
    return data?.length ? data : staticRecipes
  } catch {
    return staticRecipes
  }
}

export default async function RecipesPage() {
  const recipes = await getRecipes()
  const jsonLd = buildJsonLd(recipes)

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="mb-10">
          <h1 className="text-2xl/7 font-bold text-slate-900">Recipes</h1>
          <p className="mt-2 text-base leading-7 text-slate-600">
            Retro holiday recipes from the &apos;80s and beyond — some delicious,
            some deeply questionable, all totally rad. Cooking these is entirely
            at your own risk. 🎄
          </p>
        </div>
        <RecipeList recipes={recipes} />
      </Container>
    </div>
  )
}
