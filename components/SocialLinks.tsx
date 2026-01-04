export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="https://www.facebook.com/elevateforhumanity"
        target="_blank"
        rel="noreferrer"
        className="rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-800 hover:bg-gray-50"
      >
        Facebook <span className="text-gray-400">↗</span>
      </a>

      <a
        href="https://www.youtube.com/@elevateforhumanity"
        target="_blank"
        rel="noreferrer"
        className="rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-800 hover:bg-gray-50"
      >
        YouTube <span className="text-gray-400">↗</span>
      </a>

      <a
        href="https://www.linkedin.com/company/elevate-for-humanity"
        target="_blank"
        rel="noreferrer"
        className="rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-800 hover:bg-gray-50"
      >
        LinkedIn <span className="text-gray-400">↗</span>
      </a>
    </div>
  );
}
