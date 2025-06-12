// app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/getBlogPosts";

export const revalidate = 60; // تحديث البيانات كل 60 ثانية

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main id="distinct" className="p-8 mx-auto mt-5 rounded-2xl">
      <h1 className="text-4xl font-bold mb-8">مقالات الألعاب</h1>
      <ul className="space-y-6">
        {posts.map(({ slug, title, publishedAt }) => (
          <li key={slug} className="border-b pb-4">
            <Link href={`/blog/${slug}`}>
              <div className="text-2xl text-blue-600 hover:underline">{title}</div> 
            </Link>
            <p className="text-gray-500 mt-1">{new Date(publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
