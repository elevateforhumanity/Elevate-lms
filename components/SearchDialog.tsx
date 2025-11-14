'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const searchableContent = [
  { title: 'Barber Apprenticeship', href: '/programs/barber', category: 'Program' },
  { title: 'Building Services Technician', href: '/programs/building-tech', category: 'Program' },
  { title: 'CNA Training', href: '/programs/cna', category: 'Program' },
  { title: 'HVAC & Welding', href: '/programs/hvac', category: 'Program' },
  { title: 'Digital Skills Training', href: '/programs/digital-skills', category: 'Program' },
  { title: 'About Us', href: '/about', category: 'Page' },
  { title: 'Contact', href: '/contact', category: 'Page' },
  { title: 'Apply Now', href: '/apply', category: 'Page' },
  { title: 'Student Portal', href: '/student-portal', category: 'Page' },
  { title: 'All Programs', href: '/programs', category: 'Page' },
];

export function SearchDialog() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const filteredResults = React.useMemo(() => {
    if (!query) return [];
    return searchableContent.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:flex gap-2">
          <Search className="h-4 w-4" />
          <span className="hidden lg:inline">Search...</span>
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Search programs, pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-12"
            autoFocus
          />
          {query && (
            <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={() => {
                      setOpen(false);
                      setQuery('');
                    }}
                    className="flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors"
                  >
                    <div>
                      <div className="font-medium">{result.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.category}
                      </div>
                    </div>
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
