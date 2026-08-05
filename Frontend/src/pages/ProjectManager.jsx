import React, { useState, useEffect } from 'react';
import { FolderKanban, Plus, MoreHorizontal } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { apiService } from '../services/api';

export const ProjectManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [status, setStatus] = useState('Backlog');
  const [priority, setPriority] = useState('High');
  const [tag, setTag] = useState('Architecture');

  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      setLoading(true);
      const res = await apiService.getProjects();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          setTasks([]);
        }
        setLoading(false);
      }
    };
    fetchProjects();
    return () => { isMounted = false; };
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask = {
      id: `p_${Date.now()}`,
      title: taskTitle.trim(),
      status,
      priority,
      tag,
    };

    setTasks([...tasks, newTask]);
    await apiService.createProject(newTask);
    setTaskTitle('');
    setIsModalOpen(false);
  };

  const columns = [
    { title: "Backlog", status: "Backlog", color: "border-gray-500/30" },
    { title: "In Progress", status: "In Progress", color: "border-purple-500/30" },
    { title: "Completed", status: "Completed", color: "border-emerald-500/30" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Sprint & Agile Matrix"
        title="Project Manager & Kanban Board"
        subtitle="Manage engineering projects, sprint backlog items, and architectural releases."
        actions={
          <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            New Project Task
          </Button>
        }
      />

      {loading ? (
        <GlassCard className="p-8 text-center text-gray-400 text-xs">
          Loading project tasks...
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => {
            const colCards = tasks.filter((t) => (t.status || 'Backlog') === col.status);

            return (
              <div key={col.status} className="space-y-4">
                <div className={`p-4 rounded-2xl bg-white/[0.02] border ${col.color} flex items-center justify-between`}>
                  <span className="font-bold text-sm text-white tracking-tight">{col.title}</span>
                  <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
                    {colCards.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colCards.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] space-y-2">
                      <FolderKanban className="w-8 h-8 text-gray-500 mx-auto" />
                      <p className="text-xs font-medium text-gray-400">No tasks in {col.title}</p>
                    </div>
                  ) : (
                    colCards.map((card, cIdx) => (
                      <GlassCard key={card.id || cIdx} className="p-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant={card.priority === 'Urgent' ? 'rose' : card.priority === 'High' ? 'amber' : 'purple'}>
                            {card.priority || 'Normal'}
                          </Badge>
                          <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </div>

                        <h4 className="text-sm font-bold text-white tracking-tight">{card.title}</h4>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                          <span className="font-mono">{card.tag || 'General'}</span>
                        </div>
                      </GlassCard>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Project Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Sprint Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <Input
            label="Task Title"
            required
            placeholder="e.g. Implement Distributed Caching Layer"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Sprint Stage</label>
              <select
                className="w-full bg-[#121218] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Backlog">Backlog</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Priority Level</label>
              <select
                className="w-full bg-[#121218] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Urgent">Urgent 🔥</option>
                <option value="High">High ⚡</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
          </div>

          <Input
            label="Category Tag"
            placeholder="e.g. Backend, Frontend, DevOps"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
