import { format, parseISO } from "date-fns";
import { ArticlesType } from "../app/lib/articles";

interface ArticleBoxProps {
  article: ArticlesType;
}

export default function ArticleBox({ article }: ArticleBoxProps) {
  const formatDate = format(
    parseISO(article?.updatedAt as string),
    "MMMM d, yyyy",
  );

  return (
    <main className="w-full h-full py-10 px-5 sm:px-15 md:px-20 flex flex-col gap-5 items-center ">
      <p className="text-slate-600 text-sm flex justify-center items-center gap-2 ">
        <span>{formatDate}</span>
        <span>·</span>
        <span>Created by Admin</span>
      </p>
      <h1 className="text-2xl font-semibold text-slate-900 flex justify-center items-center ">
        {article.title}
      </h1>

      <img
        src={article.imageUrl}
        className="w-full h-60  md:h-80 lg:h-120 object-cover rounded-xl "
      />
      <p className="w-full h-screen">{article.content}</p>
    </main>
  );
}
