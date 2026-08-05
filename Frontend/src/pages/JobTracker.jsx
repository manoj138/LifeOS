import React, { useState, useEffect } from 'react';
import { Briefcase, Building, DollarSign, MapPin, Plus, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { apiService } from '../services/api';
import { useUser } from '../context/UserContext';

export const JobTracker = () => {
  const { user, preferences } = useUser();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [stage, setStage] = useState('Applied');
  const [location, setLocation] = useState('Remote');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchJobs = async () => {
      setLoading(true);
      const res = await apiService.getJobApplications();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setJobs(res.data);
        } else {
          setJobs([]);
        }
        setLoading(false);
      }
    };
    fetchJobs();
    return () => { isMounted = false; };
  }, []);

  const handleAddJob = async (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newJob = {
      id: `j_${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      stage,
      location: location.trim() || 'Remote',
      salary: salary.trim() || 'Competitive',
      date: new Date().toISOString().split('T')[0],
    };

    setJobs([newJob, ...jobs]);
    await apiService.createJobApplication(newJob);
    setCompany('');
    setRole('');
    setSalary('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Career Pipeline"
        title="Job Application Tracker"
        subtitle="Track your applications for Staff/Lead engineering positions at elite SaaS companies."
        actions={
          <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Target Position
          </Button>
        }
      />

      {loading ? (
        <GlassCard className="p-8 text-center text-gray-400 text-xs">
          Loading target job applications...
        </GlassCard>
      ) : jobs.length === 0 ? (
        <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5 space-y-4">
          <Briefcase className="w-12 h-12 text-cyan-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">No Job Applications Tracked Yet</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
              Add your target companies, applied roles, interview stages, and offered salaries to manage your hiring pipeline.
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Add Your First Application
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((j, i) => (
            <GlassCard key={j.id || i} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> {j.company}
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-1">{j.role}</h3>
                </div>
                <Badge variant={j.stage === 'Offer Received' ? 'emerald' : j.stage === 'Interviewing' ? 'purple' : 'cyan'}>
                  {j.stage || 'Applied'}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location || 'Remote'}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {j.salary || 'Competitive'}</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                <span>{j.date || 'Recently Applied'}</span>
                <Button size="xs" variant="ghost" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>View Details</Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {/* Add Job Application Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Track Target Job Position">
        <form onSubmit={handleAddJob} className="space-y-4">
          <Input
            label="Company Name"
            required
            placeholder="e.g. Google, Stripe, Microsoft"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Input
            label="Target Role"
            required
            placeholder="e.g. Senior Full-Stack Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Application Stage</label>
              <select
                className="w-full bg-[#121218] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              >
                <option value="Applied">Applied 📝</option>
                <option value="Interviewing">Interviewing 🎙️</option>
                <option value="Offer Received">Offer Received 🎉</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <Input
              label="Location"
              placeholder="e.g. Remote / Hybrid"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <Input
            label="Offered / Target Salary"
            placeholder="e.g. $180,000 / yr"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
