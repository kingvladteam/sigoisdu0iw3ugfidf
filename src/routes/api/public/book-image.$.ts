import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/**
 * Public read-only proxy for images stored in the private `book-images` bucket.
 * Storage RLS allows anonymous reads for that bucket, so this only exposes book photos.
 */
export const Route = createFileRoute("/api/public/book-image/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = (params as { _splat?: string })._splat ?? "";
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }

        const { data, error } = await supabase.storage.from("book-images").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(data, {
          headers: {
            "content-type": data.type || "application/octet-stream",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
