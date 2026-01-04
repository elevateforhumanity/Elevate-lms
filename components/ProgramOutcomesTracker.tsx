"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ProgramOutcome {
  id: string;
  program: string;
  completionRate: number;
  employmentRate: number;
  avgSalary: number;
  studentSatisfaction: number;
}

export default function ProgramOutcomesTracker() {
  const [outcomes, setOutcomes] = useState<ProgramOutcome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setOutcomes([
        {
          id: '1',
          program: 'CNA Training',
          completionRate: 92,
          employmentRate: 88,
          avgSalary: 35000,
          studentSatisfaction: 4.5,
        },
        {
          id: '2',
          program: 'CDL Training',
          completionRate: 85,
          employmentRate: 95,
          avgSalary: 48000,
          studentSatisfaction: 4.7,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading outcomes...</div>;
  }

  return (
    <div className="space-y-6">
      {outcomes.map((outcome) => (
        <Card key={outcome.id} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{outcome.program}</h3>
            <Badge variant="success">Active</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold">{outcome.completionRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Employment Rate</p>
              <p className="text-2xl font-bold">{outcome.employmentRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Salary</p>
              <p className="text-2xl font-bold">
                ${outcome.avgSalary.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Satisfaction</p>
              <p className="text-2xl font-bold">{outcome.studentSatisfaction}/5</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
