import Link from 'next/link';

export default function PartnerNav({ isAdmin }: { isAdmin: boolean }) {
  const items = [
    { href: '/partners/dashboard', label: 'Dashboard' },
    { href: '/partners/students', label: 'Students' },
    { href: '/partners/attendance', label: 'Attendance' },
    { href: '/partners/reports/weekly', label: 'Weekly Reports' },
    { href: '/partners/documents', label: 'Documents' },
    { href: '/partners/support', label: 'Support' },
  ];

  const adminItems = [
    { href: '/partners/admin/shops', label: 'Admin: Shops' },
    { href: '/partners/admin/placements', label: 'Admin: Placements' },
  ];

  return (
    <aside className="space-y-2">
      <div className="rounded-2xl border p-3">
        <div className="text-xs text-gray-500 mb-2">Navigation</div>
        <div className="flex flex-col gap-1">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="rounded-xl px-3 py-2 hover:bg-gray-50"
            >
              {i.label}
            </Link>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="rounded-2xl border p-3">
          <div className="text-xs text-gray-500 mb-2">Admin</div>
          <div className="flex flex-col gap-1">
            {adminItems.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="rounded-xl px-3 py-2 hover:bg-gray-50"
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
