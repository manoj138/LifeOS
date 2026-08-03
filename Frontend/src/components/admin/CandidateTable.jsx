import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Award, CheckCircle2, X, Briefcase, Code2, Flame, Sparkles, Send, Trash2, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { apiService } from '../../services/api';

export const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCandidates = async () => {
      setLoading(true);
      const res = await apiService.getCandidates();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setCandidates(res.data);
        } else {
          setCandidates([]);
        }
        setLoading(false);
      }
    };
    fetchCandidates();
    return () => { isMounted = false; };
  }, []);

  const handleDeleteConfirm = async () => {
    if (!candidateToDelete) return;
    const targetId = candidateToDelete.id;

    // Optimistically update state
    setCandidates((prev) => prev.filter((c) => c.id !== targetId));

    if (selectedCandidate?.id === targetId) {
      setSelectedCandidate(null);
    }

    setCandidateToDelete(null);

    // Sync with backend API
    try {
      await apiService.deleteCandidate(targetId);
    } catch (e) {
      console.log('Candidate deleted locally.');
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    const isNotAdmin = c.role !== 'admin' && !c.email?.toLowerCase().includes('admin') && c.name !== 'System Admin';
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = selectedRole === 'All' || c.targetRole === selectedRole;
    return isNotAdmin && matchesSearch && matchesRole;
  });

  return (
    <GlassCard className="p-6 space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Target Roles</option>
            <option value="Full-Stack Web Developer">Full-Stack Web Developer</option>
            <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
            <option value="Frontend Architect">Frontend Architect</option>
            <option value="Backend & Data Engineer">Backend & Data Engineer</option>
          </select>
        </div>
      </div>

      {/* Candidate Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-gray-400 uppercase tracking-wider">
            <tr>
              <th className="p-3.5 rounded-l-xl">Candidate Name</th>
              <th className="p-3.5">Target Role</th>
              <th className="p-3.5">Level & Daily Target</th>
              <th className="p-3.5">Readiness Score</th>
              <th className="p-3.5">Streak & Topics</th>
              <th className="p-3.5 text-right rounded-r-xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400 text-xs">
                  No candidates found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-white">{c.name}</div>
                    <div className="text-[11px] text-gray-400">{c.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                      {c.targetRole}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-gray-200">{c.skillLevel}</div>
                    <div className="text-[10px] text-gray-400">{c.dailyHours} hrs / day</div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            c.readinessScore >= 85 ? 'bg-emerald-400' : 'bg-purple-400'
                          }`}
                          style={{ width: `${c.readinessScore}%` }}
                        />
                      </div>
                      <span className="font-extrabold text-white">{c.readinessScore}%</span>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{c.streak} Days</span>
                    </div>
                    <div className="text-[10px] text-gray-400">{c.completedTopics} topics done</div>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="xs"
                        variant="glass"
                        onClick={() => setSelectedCandidate(c)}
                        leftIcon={<Eye className="w-3.5 h-3.5 text-purple-400" />}
                      >
                        Inspect Profile
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20"
                        onClick={() => setCandidateToDelete(c)}
                        leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Profile Detail Drawer Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#12131a] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-xl font-extrabold text-white">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{selectedCandidate.name}</h3>
                <p className="text-xs text-gray-400">{selectedCandidate.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-gray-400">Target Specialization</span>
                <p className="font-bold text-white">{selectedCandidate.targetRole}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-gray-400">Readiness Score</span>
                <p className="font-bold text-emerald-400">{selectedCandidate.readinessScore}% Match</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-gray-400">Assigned AI Persona</span>
                <p className="font-bold text-purple-300">{selectedCandidate.aiPersona}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-gray-400">Daily Study Target</span>
                <p className="font-bold text-amber-300">{selectedCandidate.dailyHours} hrs / day</p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button variant="primary" className="flex-1 py-2.5" leftIcon={<Send className="w-4 h-4" />}>
                Send Placement Referral
              </Button>
              <Button
                variant="ghost"
                className="py-2.5 text-rose-400 hover:bg-rose-500/10 border border-rose-500/20"
                onClick={() => setCandidateToDelete(selectedCandidate)}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Delete Candidate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {candidateToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#161722] border border-rose-500/30 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 relative shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Delete Candidate Record</h3>
                <p className="text-xs text-rose-400">Permanent Action</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Are you sure you want to delete candidate <strong className="text-white">{candidateToDelete.name}</strong> ({candidateToDelete.email})? This will remove their onboarding profile, preferences, and placement status from the platform.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="glass" size="sm" onClick={() => setCandidateToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30"
                onClick={handleDeleteConfirm}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

