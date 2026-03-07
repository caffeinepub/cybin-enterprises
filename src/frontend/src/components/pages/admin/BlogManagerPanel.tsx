import { useActor } from "@/hooks/useActor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Edit3,
  Eye,
  EyeOff,
  Link2,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

const BLOG_CATEGORIES = [
  "Payment Infrastructure",
  "High-Risk Industries",
  "Chargebacks & Fraud",
  "Compliance",
  "Business Growth",
  "International Payments",
];

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface BlogPost {
  id: bigint;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  author: string;
  readTime: string;
  publishDate: string;
  published: boolean;
  timestamp: bigint;
}

interface PostFormData {
  title: string;
  category: string;
  excerpt: string;
  body: string;
  author: string;
  readTime: string;
  publishDate: string;
}

const defaultForm: PostFormData = {
  title: "",
  category: BLOG_CATEGORIES[0],
  excerpt: "",
  body: "",
  author: "Cybin Enterprises",
  readTime: "5 min read",
  publishDate: new Date().toISOString().slice(0, 10),
};

function PostForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  submitLabel,
}: {
  initial: PostFormData;
  onSubmit: (data: PostFormData) => void;
  onCancel: () => void;
  isPending: boolean;
  submitLabel: string;
}) {
  const [form, setForm] = useState<PostFormData>(initial);

  const set = <K extends keyof PostFormData>(key: K, value: PostFormData[K]) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "rgba(232,237,248,0.55)",
    marginBottom: "6px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    fontSize: "13px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1.5px solid rgba(255,255,255,0.1)",
    color: "#e8edf8",
    outline: "none",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="blog-title" style={labelStyle}>
            Title *
          </label>
          <input
            id="blog-title"
            type="text"
            required
            maxLength={300}
            data-ocid="blog.title.input"
            style={inputStyle}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Article title"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
        </div>
        <div>
          <label htmlFor="blog-category" style={labelStyle}>
            Category *
          </label>
          <select
            id="blog-category"
            required
            data-ocid="blog.category.select"
            style={{
              ...inputStyle,
              cursor: "pointer",
            }}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            {BLOG_CATEGORIES.map((c) => (
              <option key={c} value={c} style={{ backgroundColor: "#0a0f1e" }}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="blog-author" style={labelStyle}>
            Author
          </label>
          <input
            id="blog-author"
            type="text"
            maxLength={100}
            data-ocid="blog.author.input"
            style={inputStyle}
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="Author name"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
        </div>
        <div>
          <label htmlFor="blog-readtime" style={labelStyle}>
            Read Time
          </label>
          <input
            id="blog-readtime"
            type="text"
            maxLength={20}
            data-ocid="blog.read_time.input"
            style={inputStyle}
            value={form.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            placeholder="5 min read"
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
        </div>
        <div>
          <label htmlFor="blog-publishdate" style={labelStyle}>
            Publish Date
          </label>
          <input
            id="blog-publishdate"
            type="date"
            data-ocid="blog.publish_date.input"
            style={inputStyle}
            value={form.publishDate}
            onChange={(e) => set("publishDate", e.target.value)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="blog-excerpt" style={labelStyle}>
          Excerpt *
        </label>
        <textarea
          id="blog-excerpt"
          required
          maxLength={500}
          rows={2}
          data-ocid="blog.excerpt.textarea"
          style={{ ...inputStyle, resize: "vertical" }}
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="Short description of the article (max 500 chars)"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        />
      </div>

      <div>
        <label htmlFor="blog-body" style={labelStyle}>
          Body *
        </label>
        <textarea
          id="blog-body"
          required
          maxLength={20000}
          rows={10}
          data-ocid="blog.body.textarea"
          style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace" }}
          value={form.body}
          onChange={(e) => set("body", e.target.value)}
          placeholder="Full article body — supports plain text or Markdown"
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,212,184,0.5)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          data-ocid="blog.form.submit_button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: "linear-gradient(135deg, #00d4b8, #00b89a)",
            color: "#0a0f1e",
            border: "none",
            opacity: isPending ? 0.6 : 1,
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending && <Loader2 size={14} className="animate-spin" />}
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={onCancel}
          data-ocid="blog.form.cancel_button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(232,237,248,0.6)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#e8edf8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(232,237,248,0.6)";
          }}
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </form>
  );
}

// ─── Blog Manager Panel ───────────────────────────────────────────────────────

export default function BlogManagerPanel() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [deletingId, setDeletingId] = useState<bigint | null>(null);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);
  const [showIntegrations, setShowIntegrations] = useState(false);

  const postsQuery = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.getAllBlogPosts();
    },
    enabled: !!actor,
    staleTime: 15_000,
  });

  const createMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      if (!actor) throw new Error("Not connected");
      return actor.createBlogPost(
        data.title,
        data.category,
        data.excerpt,
        data.body,
        data.author,
        data.readTime,
        data.publishDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
      setCreating(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: bigint; data: PostFormData }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBlogPost(
        id,
        data.title,
        data.category,
        data.excerpt,
        data.body,
        data.author,
        data.readTime,
        data.publishDate,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
      setEditingId(null);
    },
  });

  const publishMutation = useMutation({
    mutationFn: async ({
      id,
      published,
    }: {
      id: bigint;
      published: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return published
        ? actor.unpublishBlogPost(id)
        : actor.publishBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["published-blog-posts"] });
      setDeletingId(null);
    },
  });

  const posts: BlogPost[] = postsQuery.data ?? [];

  if (postsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2
          size={28}
          className="animate-spin"
          style={{ color: "#00d4b8" }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: "Sora, sans-serif", color: "#e8edf8" }}
          >
            Blog Manager
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(232,237,248,0.4)" }}
          >
            {posts.length} post{posts.length !== 1 ? "s" : ""} ·{" "}
            {posts.filter((p) => p.published).length} published
          </p>
        </div>
        {!creating && (
          <button
            type="button"
            data-ocid="blog.new_post.button"
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #00d4b8, #00b89a)",
              color: "#0a0f1e",
              border: "none",
            }}
          >
            <Plus size={15} />
            New Post
          </button>
        )}
      </div>

      {/* Create form */}
      {creating && (
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "rgba(0,212,184,0.03)",
            border: "1.5px solid rgba(0,212,184,0.2)",
          }}
        >
          <h3
            className="text-base font-bold mb-5"
            style={{ fontFamily: "Sora, sans-serif", color: "#00d4b8" }}
          >
            New Blog Post
          </h3>
          <PostForm
            initial={defaultForm}
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setCreating(false)}
            isPending={createMutation.isPending}
            submitLabel="Create Post"
          />
        </div>
      )}

      {/* Posts list */}
      {posts.length === 0 && !creating && (
        <div
          className="text-center py-16 rounded-2xl"
          data-ocid="blog.empty_state"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <BookOpen
            size={36}
            style={{ color: "rgba(232,237,248,0.15)", margin: "0 auto 12px" }}
          />
          <p
            className="font-semibold"
            style={{ color: "rgba(232,237,248,0.45)" }}
          >
            No blog posts yet
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: "rgba(232,237,248,0.25)" }}
          >
            Click "New Post" to create your first article.
          </p>
        </div>
      )}

      <div className="space-y-4" data-ocid="blog.posts.list">
        {[...posts].reverse().map((post, i) => {
          const isEditing = editingId === post.id;
          const isExpanded = expandedId === post.id;
          const isDeleting = deletingId === post.id;

          return (
            <div
              key={Number(post.id)}
              data-ocid={`blog.posts.item.${i + 1}`}
              className="rounded-xl overflow-hidden"
              style={{
                backgroundColor: post.published
                  ? "rgba(0,212,184,0.03)"
                  : "rgba(255,255,255,0.02)",
                border: post.published
                  ? "1px solid rgba(0,212,184,0.15)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {isEditing ? (
                <div className="p-5">
                  <h4
                    className="text-sm font-bold mb-4"
                    style={{ color: "#ffc832" }}
                  >
                    Editing: {post.title}
                  </h4>
                  <PostForm
                    initial={{
                      title: post.title,
                      category: post.category,
                      excerpt: post.excerpt,
                      body: post.body,
                      author: post.author,
                      readTime: post.readTime,
                      publishDate: post.publishDate,
                    }}
                    onSubmit={(data) =>
                      updateMutation.mutate({ id: post.id, data })
                    }
                    onCancel={() => setEditingId(null)}
                    isPending={updateMutation.isPending}
                    submitLabel="Save Changes"
                  />
                </div>
              ) : (
                <>
                  {/* Header row */}
                  <div className="flex items-start gap-3 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: post.published
                              ? "rgba(0,212,184,0.12)"
                              : "rgba(255,255,255,0.06)",
                            color: post.published
                              ? "#00d4b8"
                              : "rgba(232,237,248,0.4)",
                            border: post.published
                              ? "1px solid rgba(0,212,184,0.25)"
                              : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "rgba(168,126,245,0.1)",
                            color: "#a87ef5",
                          }}
                        >
                          {post.category}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "rgba(232,237,248,0.3)" }}
                        >
                          {formatDate(post.timestamp)}
                        </span>
                      </div>
                      <h3
                        className="text-sm font-bold leading-snug"
                        style={{ color: "#e8edf8" }}
                      >
                        {post.title}
                      </h3>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        title="Expand"
                        data-ocid={`blog.expand.toggle.${i + 1}`}
                        onClick={() =>
                          setExpandedId(isExpanded ? null : post.id)
                        }
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          color: "rgba(232,237,248,0.4)",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.07)";
                          e.currentTarget.style.color = "#e8edf8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "rgba(232,237,248,0.4)";
                        }}
                      >
                        {isExpanded ? (
                          <ChevronUp size={14} />
                        ) : (
                          <ChevronDown size={14} />
                        )}
                      </button>

                      <button
                        type="button"
                        title="Edit"
                        data-ocid={`blog.edit_button.${i + 1}`}
                        onClick={() => setEditingId(post.id)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          color: "rgba(232,237,248,0.4)",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,200,50,0.1)";
                          e.currentTarget.style.color = "#ffc832";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "rgba(232,237,248,0.4)";
                        }}
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        type="button"
                        title={post.published ? "Unpublish" : "Publish"}
                        data-ocid={`blog.publish.toggle.${i + 1}`}
                        onClick={() =>
                          publishMutation.mutate({
                            id: post.id,
                            published: post.published,
                          })
                        }
                        disabled={publishMutation.isPending}
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          color: post.published
                            ? "#00d4b8"
                            : "rgba(232,237,248,0.4)",
                          backgroundColor: post.published
                            ? "rgba(0,212,184,0.08)"
                            : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(0,212,184,0.12)";
                          e.currentTarget.style.color = "#00d4b8";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = post.published
                            ? "rgba(0,212,184,0.08)"
                            : "transparent";
                          e.currentTarget.style.color = post.published
                            ? "#00d4b8"
                            : "rgba(232,237,248,0.4)";
                        }}
                      >
                        {publishMutation.isPending ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : post.published ? (
                          <Eye size={14} />
                        ) : (
                          <EyeOff size={14} />
                        )}
                      </button>

                      <button
                        type="button"
                        title="Delete"
                        data-ocid={`blog.delete_button.${i + 1}`}
                        onClick={() =>
                          setDeletingId(isDeleting ? null : post.id)
                        }
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          color: "rgba(232,237,248,0.4)",
                          backgroundColor: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            "rgba(255,107,107,0.12)";
                          e.currentTarget.style.color = "#ff6b6b";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "rgba(232,237,248,0.4)";
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Delete confirmation */}
                  {isDeleting && (
                    <div
                      className="mx-4 mb-4 p-3 rounded-xl flex items-center justify-between gap-4"
                      data-ocid={`blog.delete_confirm.${i + 1}`}
                      style={{
                        backgroundColor: "rgba(255,107,107,0.08)",
                        border: "1px solid rgba(255,107,107,0.2)",
                      }}
                    >
                      <p className="text-xs" style={{ color: "#ff6b6b" }}>
                        Delete this post? This cannot be undone.
                      </p>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          type="button"
                          data-ocid={`blog.delete_confirm.confirm_button.${i + 1}`}
                          onClick={() => deleteMutation.mutate(post.id)}
                          disabled={deleteMutation.isPending}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{
                            backgroundColor: "rgba(255,107,107,0.2)",
                            color: "#ff6b6b",
                            border: "none",
                          }}
                        >
                          {deleteMutation.isPending ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            "Delete"
                          )}
                        </button>
                        <button
                          type="button"
                          data-ocid={`blog.delete_confirm.cancel_button.${i + 1}`}
                          onClick={() => setDeletingId(null)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "rgba(232,237,248,0.6)",
                            border: "none",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Expanded excerpt/body */}
                  {isExpanded && (
                    <div
                      className="mx-4 mb-4 p-4 rounded-xl"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(232,237,248,0.35)" }}
                      >
                        Excerpt
                      </p>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "rgba(232,237,248,0.65)" }}
                      >
                        {post.excerpt}
                      </p>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(232,237,248,0.35)" }}
                      >
                        Body (first 400 chars)
                      </p>
                      <p
                        className="text-xs leading-relaxed"
                        style={{
                          color: "rgba(232,237,248,0.5)",
                          fontFamily: "monospace",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {post.body.slice(0, 400)}
                        {post.body.length > 400 ? "…" : ""}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Blog Integrations Section */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(168,126,245,0.2)" }}
      >
        <button
          type="button"
          data-ocid="blog.integrations.toggle"
          onClick={() => setShowIntegrations(!showIntegrations)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left transition-all"
          style={{
            backgroundColor: showIntegrations
              ? "rgba(168,126,245,0.06)"
              : "rgba(168,126,245,0.03)",
          }}
        >
          <div className="flex items-center gap-3">
            <Link2 size={16} style={{ color: "#a87ef5" }} />
            <span
              className="text-sm font-semibold"
              style={{ color: "#a87ef5" }}
            >
              Blog Integrations & Automation
            </span>
          </div>
          {showIntegrations ? (
            <ChevronUp size={14} style={{ color: "#a87ef5" }} />
          ) : (
            <ChevronDown size={14} style={{ color: "rgba(232,237,248,0.4)" }} />
          )}
        </button>

        {showIntegrations && (
          <div
            className="p-6 space-y-6"
            style={{ borderTop: "1px solid rgba(168,126,245,0.15)" }}
          >
            {/* Webhook URL */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "rgba(232,237,248,0.4)" }}
              >
                Webhook Endpoint (Informational)
              </p>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <code
                  className="text-xs flex-1"
                  style={{ color: "#00d4b8", wordBreak: "break-all" }}
                >
                  https://cybinenterprises.com/api/blog
                </code>
                <button
                  type="button"
                  data-ocid="blog.webhook.copy_button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://cybinenterprises.com/api/blog",
                    );
                  }}
                  className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: "rgba(0,212,184,0.08)",
                    color: "#00d4b8",
                    border: "1px solid rgba(0,212,184,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0,212,184,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0,212,184,0.08)";
                  }}
                >
                  Copy
                </button>
              </div>
              <p
                className="text-xs mt-2"
                style={{ color: "rgba(232,237,248,0.3)" }}
              >
                Note: This endpoint requires developer setup to activate.
                Contact your web development team.
              </p>
            </div>

            {/* Zapier/Make Instructions */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-3"
                style={{ color: "rgba(232,237,248,0.4)" }}
              >
                Connecting via Zapier or Make
              </p>
              <ol
                className="space-y-2"
                style={{ listStyleType: "decimal", paddingLeft: "20px" }}
              >
                {[
                  "Create a Zapier or Make account at zapier.com or make.com",
                  'Set up a new Zap/Scenario with a trigger (e.g., "New Row in Google Sheets")',
                  'Add an action step: "Webhooks by Zapier" → POST to the endpoint above',
                  "Map your fields: title, category, excerpt, body, author, publishDate",
                  "Enable the automation to publish blog posts automatically",
                ].map((step, idx) => (
                  <li
                    key={step}
                    className="text-xs"
                    style={{ color: "rgba(232,237,248,0.55)" }}
                  >
                    <span style={{ color: "#a87ef5", fontWeight: 600 }}>
                      {idx + 1}.
                    </span>{" "}
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* AI Blog Automation */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255,200,50,0.04)",
                border: "1px solid rgba(255,200,50,0.15)",
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: "#ffc832" }}
              >
                AI Blog Automation (ChatGPT / Claude / Grok)
              </p>
              <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: "rgba(232,237,248,0.55)" }}
              >
                To automate blog content generation with AI assistants, your
                developer needs to:
              </p>
              <ol
                className="space-y-1.5"
                style={{ listStyleType: "decimal", paddingLeft: "18px" }}
              >
                {[
                  "Obtain API keys from OpenAI (ChatGPT), Anthropic (Claude), or xAI (Grok)",
                  "Create a server-side function that calls the AI API with a prompt",
                  "POST the generated content to the blog webhook endpoint above",
                  "Set up a cron job or Zapier schedule to run the automation",
                ].map((step, idx) => (
                  <li
                    key={step}
                    className="text-xs"
                    style={{ color: "rgba(232,237,248,0.5)" }}
                  >
                    <span style={{ color: "#ffc832", fontWeight: 600 }}>
                      {idx + 1}.
                    </span>{" "}
                    {step}
                  </li>
                ))}
              </ol>
              <p
                className="text-xs mt-3"
                style={{ color: "rgba(232,237,248,0.3)" }}
              >
                ⚠️ Requires developer setup with server-side code. API keys must
                never be stored in the frontend browser application.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
