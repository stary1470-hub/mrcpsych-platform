import { notFound } from 'next/navigation'
import { articles } from '../articles'
import ArticleClient from './ArticleClient'
import type { Metadata, ResolvingMetadata } from 'next'

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article' as const,
      publishedTime: article.date,
      authors: ['PsychStar'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
    },
    alternates: {
      canonical: `https://psychstar.io/blog/${article.slug}`,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find(a => a.slug === slug)
  if (!article) notFound()

  return <ArticleClient article={article} />
}
