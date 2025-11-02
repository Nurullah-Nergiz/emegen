"use client";

import { updatePost } from "@/services/post";
import { useFormState } from "react-dom";

export default function EditForm({ post }) {
  const [state, formAction] = useFormState(updatePost, {
    errors: {},
  });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={post.id} />
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Başlık
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {state.errors.title && (
          <p className="text-red-500 text-xs mt-1">{state.errors.title.join(", ")}</p>
        )}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          İçerik
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={post.content}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {state.errors.content && (
          <p className="text-red-500 text-xs mt-1">{state.errors.content.join(", ")}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Güncelle
        </button>
      </div>
    </form>
  );
}
