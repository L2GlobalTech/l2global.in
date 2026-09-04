'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Edit2,
  Trash2,
  Filter,
  RefreshCw,
  FileText,
  Calendar,
  Eye,
  Star,
  Tag,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { AsgardLayout } from '@/components/asgard/AsgardLayout';
import { AsgardPageHeader } from '@/components/asgard/AsgardPageHeader';
import { LoadingState } from '@/components/asgard/LoadingState';
import { EmptyState } from '@/components/asgard/EmptyState';
import { DeleteModal } from '@/components/asgard/DeleteModal';
import { BlogPreviewModal } from '@/components/asgard/BlogPreviewModal';
import { DataTablePagination } from '@/components/asgard/DataTablePagination';
import { BlogImageThumbnail } from '@/components/asgard/BlogImageThumbnail';
import { deleteMedia } from '@/actions/mediaAction';
import {
  getBlogs,
  getBlogTags,
  deleteBlog,
  toggleBlogFeaturedStatus,
  BlogRecord,
} from '@/app/(asgard)/asgard/blogs/action';

export const BlogsContainer: React.FC = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  // Server-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Delete modal state
  const [deletingBlog, setDeletingBlog] = useState<BlogRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preview drawer state
  const [previewBlog, setPreviewBlog] = useState<BlogRecord | null>(null);

  // Debounce search input (400ms) and reset page to 1
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // When debounced search changes, reset page to 1
  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setCurrentPage(1);
  }, [debouncedSearch]);

  // Load available tags once on mount from Supabase
  useEffect(() => {
    async function loadTags() {
      const tags = await getBlogTags();
      setAvailableTags(tags);
    }
    loadTags();
  }, []);

  // Fetch blogs directly from Supabase with server-side search and pagination
  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getBlogs({
        page: currentPage,
        pageSize: itemsPerPage,
        search: debouncedSearch,
        tag: tagFilter,
      });

      setBlogs(res.data || []);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);

      // Handle edge case: if current page is empty after deletion and previous pages exist
      if (res.data.length === 0 && currentPage > 1 && res.total > 0) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err: any) {
      console.error('Error querying blogs from Supabase:', err);
      toast.error('Failed to query blogs from Supabase');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, tagFilter]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  // Handle Toggle Featured Status
  const handleToggleFeatured = async (blog: BlogRecord) => {
    if (!blog.id) return;
    const res = await toggleBlogFeaturedStatus(blog.id, blog.is_featured ?? false);
    if (res.success) {
      toast.success(
        blog.is_featured
          ? `Blog removed from featured list`
          : `Blog marked as featured! ⭐`
      );
      await loadBlogs();
    } else {
      toast.error(res.error || 'Failed to toggle status');
    }
  };

  // Handle Delete via Action
  const handleConfirmDelete = async () => {
    if (!deletingBlog?.id) return;

    try {
      setIsDeleting(true);
      const mediaIdToDelete = deletingBlog.media_id;
      const res = await deleteBlog(deletingBlog.id);

      if (!res.success) {
        toast.error(res.error || 'Failed to delete blog');
        return;
      }

      // Safe cleanup of storage image after successful database delete
      if (mediaIdToDelete) {
        await deleteMedia(mediaIdToDelete);
      }

      toast.success(`Blog "${deletingBlog.title}" deleted.`);
      setDeletingBlog(null);
      await loadBlogs();
    } catch (err: any) {
      console.error('Error deleting blog:', err);
      toast.error(err.message || 'Failed to delete blog');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AsgardLayout>
      <AsgardPageHeader
        title="Blog Articles"
        description="Create, edit, organize and publish technical articles, case studies, and SEO content."
        breadcrumb={[
          { label: 'CMS', href: '/asgard/overview' },
          { label: 'Blogs' },
        ]}
        actionLabel="New Blog Post"
        onAction={() => router.push('/asgard/blogs/create')}
      />

      {/* Control Bar: Server-side Search, Tag Filter & Refresh */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, subtitle, tag or content..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9.5 pr-3.5 py-2 text-xs sm:text-sm bg-slate-100 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={tagFilter}
              onChange={(e) => {
                setTagFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent border-0 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">All Tags</option>
              {availableTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={loadBlogs}
            disabled={loading}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content: Table / Loading / Empty */}
      {loading ? (
        <LoadingState message="Fetching blogs from Supabase..." rows={6} />
      ) : blogs.length === 0 ? (
        <EmptyState
          title={searchInput || tagFilter !== 'all' ? 'No matching blogs found' : 'No blogs created yet'}
          description={
            searchInput || tagFilter !== 'all'
              ? 'Try adjusting your search query or tag filter to find matching articles.'
              : 'Get started by creating your very first blog article for the website.'
          }
          actionLabel="Create Blog"
          onAction={() => router.push('/asgard/blogs/create')}
          icon={<FileText className="w-6 h-6 stroke-[1.5]" />}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Article Details</th>
                  <th className="px-3.5 py-3">Category Tag</th>
                  <th className="px-3.5 py-3">Featured Status</th>
                  <th className="px-3.5 py-3">Created</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Article Details */}
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3 max-w-lg">
                        <BlogImageThumbnail
                          mediaId={blog.media_id}
                          alt={blog.alt_text || blog.title || ''}
                          className="w-12 h-12 rounded-lg shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-xs sm:text-sm line-clamp-1">
                            {blog.title}
                          </h4>
                          {blog.subtitle && (
                            <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                              {blog.subtitle}
                            </p>
                          )}
                          {blog.sub_description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {blog.sub_description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Tag */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      {blog.tag ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          <Tag className="w-2.5 h-2.5 text-slate-400" />
                          {blog.tag}
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">-</span>
                      )}
                    </td>

                    {/* Featured Status Toggle */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(blog)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          blog.is_featured
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                        title="Click to toggle featured status"
                      >
                        <Star
                          className={`w-3 h-3 ${
                            blog.is_featured
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-slate-400'
                          }`}
                        />
                        {blog.is_featured ? 'Featured' : 'Standard'}
                      </button>
                    </td>

                    {/* Created Date */}
                    <td className="px-3.5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>
                          {blog.created_at
                            ? new Date(blog.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '-'}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setPreviewBlog(blog)}
                          className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          href={`/asgard/blogs/edit?id=${blog.id}`}
                          className="p-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeletingBlog(blog)}
                          className="p-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Reusable Server-Side Pagination */}
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            itemName="blogs"
            onPageChange={(page: number) => setCurrentPage(page)}
            onItemsPerPageChange={(size: number) => {
              setItemsPerPage(size);
              setCurrentPage(1);
            }}
            pageSizeOptions={[5, 8, 10, 20]}
          />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deletingBlog)}
        title="Delete Blog Post"
        itemName={deletingBlog?.title || undefined}
        itemType="blog"
        isDeleting={isDeleting}
        onClose={() => setDeletingBlog(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Reusable Preview Modal */}
      <BlogPreviewModal
        blog={previewBlog}
        onClose={() => setPreviewBlog(null)}
      />
    </AsgardLayout>
  );
};
