import { Container } from '@/components/Container'
import { RecipeList } from '@/components/RecipeList'
import { recipes as staticRecipes } from '@/lib/recipes'

export const metadata = {
  title: 'Recipes',
  description:
    "Retro holiday recipes straight from the '80s — some delicious, some deeply questionable, all totally rad.",
  openGraph: {
    title: 'Recipes - Totally Rad Christmas!',
    description:
      "Retro holiday recipes straight from the '80s — some delicious, some deeply questionable, all totally rad.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
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

  return (
    <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
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
