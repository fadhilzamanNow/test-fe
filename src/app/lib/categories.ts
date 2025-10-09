interface CategoryType {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  data: CategoryType[];
  totalData: number;
  currentPage: number;
  totalPages: number;
}

export async function getCategories(
  currentPage = 1,
  search = "",
): Promise<CategoryResponse | void> {
  try {
    const params = new URLSearchParams();
    if (currentPage) params.append("page", currentPage.toString());
    if (search) params.append("search", search);

    const response = await fetch(`/api/categories?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to get categories");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Get categories error:", err);
  }
}

export async function createCategory(name: string) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create category");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Create category error:", err);
    throw err;
  }
}

export async function updateCategory(id: string, name: string) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update category");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Update category error:", err);
    throw err;
  }
}

export async function deleteCategory(id: string) {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete category");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Delete category error:", err);
    throw err;
  }
}

export type { CategoryType, CategoryResponse };
