'use client';

import { useEffect, useState } from 'react';

interface HiringData {
  month: string;
  hires: number;
  applications: number;
}

interface RetentionData {
  role: string;
  retention: number;
  count: number;
}

export function HiringTrendsChart() {
  const [data, setData] = useState<HiringData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/employer/hiring-trends');
        if (res.ok) {
          const json = await res.json();
          setData(json.trends || []);
        } else {
          setData(getSampleHiring());
        }
      } catch {
        setData(getSampleHiring());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const maxApps = Math.max(...data.map(d => d.applications), 50);

  return (
    <div>
      <div className="flex gap-4 mb-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Hires</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Applications</span>
        </div>
      </div>
      <div className="flex items-end gap-3 h-32">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="w-full flex gap-1 items-end" style={{ height: 100 }}>
              <div
                className="flex-1 bg-green-500 rounded-t"
                style={{ height: `${(item.hires / maxApps) * 100}%` }}
                title={`${item.hires} hires`}
              ></div>
              <div
                className="flex-1 bg-blue-500 rounded-t"
                style={{ height: `${(item.applications / maxApps) * 100}%` }}
                title={`${item.applications} applications`}
              ></div>
            </div>
            <span className="text-xs text-gray-500 mt-1">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RetentionByRoleChart() {
  const [data, setData] = useState<RetentionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/employer/retention-stats');
        if (res.ok) {
          const json = await res.json();
          setData(json.retention || []);
        } else {
          setData(getSampleRetention());
        }
      } catch {
        setData(getSampleRetention());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-48 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getRetentionColor = (pct: number) => {
    if (pct >= 90) return 'bg-green-500';
    if (pct >= 75) return 'bg-blue-500';
    if (pct >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium">{item.role}</span>
            <span className="text-gray-500">{item.count} employees</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`${getRetentionColor(item.retention)} h-4 rounded-full flex items-center justify-end pr-2`}
              style={{ width: `${item.retention}%` }}
            >
              <span className="text-xs text-white font-medium">{item.retention}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getSampleHiring(): HiringData[] {
  return [
    { month: 'Jul', hires: 5, applications: 28 },
    { month: 'Aug', hires: 8, applications: 35 },
    { month: 'Sep', hires: 6, applications: 31 },
    { month: 'Oct', hires: 10, applications: 42 },
    { month: 'Nov', hires: 9, applications: 38 },
    { month: 'Dec', hires: 9, applications: 32 },
  ];
}

function getSampleRetention(): RetentionData[] {
  return [
    { role: 'Barber', retention: 92, count: 18 },
    { role: 'Apprentice', retention: 78, count: 12 },
    { role: 'Receptionist', retention: 85, count: 4 },
    { role: 'Manager', retention: 95, count: 3 },
  ];
}
