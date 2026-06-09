import { notFound } from 'next/navigation'
import { articles } from '../articles'
import ArticleClient from './ArticleClient'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
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

export default function ArticlePage({ params }: Props) {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) notFound()

  return <ArticleClient article={article} />
}
