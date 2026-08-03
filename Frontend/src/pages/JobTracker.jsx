import React, { useState, useEffect } from 'react';
import { Briefcase, Building, DollarSign, MapPin, Plus, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';
import { useUser } from '../context/UserContext';

const DEFAULT_JOBS = [
  { company: "Vercel", role: "Senior Staff Frontend Engineer", location: "Remote (US)", salary: "$220k - $260k", stage: "Interviewing", date: "Applied 3d ago" },
  { company: "Linear", role: "Lead UI/UX Product Engineer", location: "San Francisco, CA", salary: "$240k + Equity", stage: "Offer Received", date: "Applied 1w ago" },
  { company: "Stripe", role: "Principal Frontend Architect", location: "Remote", salary: "$280k", stage: "Applied", date: "Applied 1d ago" },
  { company: "Raycast", role: "Fullstack MERN Engineer", location: "Remote (EU)", salary: "€160k", stage: "Applied", date: "Applied 5d ago" }
];

export const JobTracker = () => {
  const { user, preferences } = useUser();
  const [jobs, setJobs] = useState(DEFAULT_JOBS);

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      const res = await apiService.getJobApplications();
      if (isMounted && res?.success && res.data && res.data.length > 0) {
        setJobs(res.data);
      }
    };
    fetchJobs();
    return () => { isMounted = false; };
  }, []);


  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Career Pipeline"
        title="Job Application Tracker"
        subtitle="Track your applications for Staff/Lead engineering positions at elite SaaS companies."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add Target Position
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((j, i) => (
          <GlassCard key={i} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> {j.company}
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-1">{j.role}</h3>
              </div>
              <Badge variant={j.stage === 'Offer Received' ? 'emerald' : j.stage === 'Interviewing' ? 'purple' : 'cyan'}>
                {j.stage}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
              <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {j.salary}</span>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
              <span>{j.date}</span>
              <Button size="xs" variant="ghost" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>View Details</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
