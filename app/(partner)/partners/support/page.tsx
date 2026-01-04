export default function PartnerSupportPage() {
  return (
    <div className="rounded-2xl border p-5 space-y-3">
      <div className="font-semibold">Support</div>
      <div className="text-sm text-gray-600">
        If something isn't working, submit a callback request and we'll follow
        up.
      </div>
      <div className="rounded-xl border p-4 text-sm">
        Tip: If a page "looks logged in but won't load data," it's almost always
        an RLS policy mismatch or the user isn't assigned to a shop.
      </div>
      <div className="rounded-xl border p-4">
        <div className="font-medium mb-2">Contact Information</div>
        <div className="text-sm space-y-1">
          <div>
            Email:{' '}
            <a
              href="mailto:support@elevateforhumanity.org"
              className="text-blue-600"
            >
              support@elevateforhumanity.org
            </a>
          </div>
          <div>
            Phone:{' '}
            <a href="tel:+13173143757" className="text-blue-600">
              317-314-3757
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
