interface CategoryType {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface UserType {
  id: string;
  username: string;
  role: string;
}

interface ArticlesType {
  id: string;
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryType;
  user: UserType;
  imageUrl: string;
  categoryName?: string;
}

interface ArticleResponse {
  data: ArticlesType[];
  limit: number;
  page: number;
  total: number;
}

export async function getArticles(
  title: string = "",
  page: number = 1,
  category: string = "",
): Promise<ArticleResponse | void> {
  try {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (page) params.append("page", page.toString());
    if (category) params.append("category", category);

    const response = await fetch(`/api/articles?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get articles");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Get articles error:", err);
  }
}

export async function getArticle(id: string): Promise<ArticlesType | void> {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get article");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Get article error:", err);
  }
}

export async function createArticle(
  title: string,
  content: string,
  imageUrl: string,
  categoryId: string,
) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        content,
        imageUrl,
        categoryId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create article");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Create article error:", err);
    throw err;
  }
}

export async function updateArticle(
  id: string,
  title?: string,
  content?: string,
  imageUrl?: string,
  categoryId?: string,
) {
  try {
    const token = localStorage.getItem("authToken");

    const body: any = {};
    if (title) body.title = title;
    if (content) body.content = content;
    if (imageUrl) body.imageUrl = imageUrl;
    if (categoryId) body.categoryId = categoryId;

    const response = await fetch(`/api/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update article");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Update article error:", err);
    throw err;
  }
}

export async function deleteArticle(id: string) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete article");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Delete article error:", err);
    throw err;
  }
}

export type { ArticlesType, ArticleResponse };
