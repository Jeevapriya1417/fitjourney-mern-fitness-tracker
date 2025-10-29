"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Plus, TrendingUp, Calendar, Weight, Ruler } from 'lucide-react';

interface ProgressEntry {
  date: string;
  weight: number;
  waist?: number;
  chest?: number;
  notes?: string;
}

export default function ProgressPage() {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    waist: '',
    chest: '',
    notes: ''
  });

  useEffect(() => {
    // Load saved progress from localStorage
    const saved = localStorage.getItem('fitjourney_progress');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    if (!newEntry.weight) return;

    const entry: ProgressEntry = {
      date: newEntry.date,
      weight: parseFloat(newEntry.weight),
      waist: newEntry.waist ? parseFloat(newEntry.waist) : undefined,
      chest: newEntry.chest ? parseFloat(newEntry.chest) : undefined,
      notes: newEntry.notes || undefined
    };

    const updatedEntries = [...entries, entry].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    setEntries(updatedEntries);
    localStorage.setItem('fitjourney_progress', JSON.stringify(updatedEntries));
    
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      waist: '',
      chest: '',
      notes: ''
    });
    setIsOpen(false);
  };

  const chartData = entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: entry.weight,
    waist: entry.waist || null,
    chest: entry.chest || null
  }));

  const latestEntry = entries[entries.length - 1];
  const firstEntry = entries[0];
  const weightChange = latestEntry && firstEntry ? latestEntry.weight - firstEntry.weight : 0;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-blue-50/40">
        {/* Header */}
        <section className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-blue-100/30 to-white -z-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Progress Tracker
                </h1>
                <p className="text-xl text-gray-700 font-medium">
                  Track your fitness journey and visualize your improvements
                </p>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/50 text-white transition-all duration-300 font-semibold border-0">
                    <Plus className="h-5 w-5 mr-2" />
                    Log Progress
                  </Button>
                </DialogTrigger>
                <DialogContent className="backdrop-blur-xl bg-white/95 border-2 border-purple-200/50">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Log Today's Progress
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 font-medium">
                      Enter your current measurements and notes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="date" className="text-gray-800 font-semibold">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                        className="mt-2 border-purple-200 focus:border-purple-600 focus:ring-purple-600 transition-all"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-gray-800 font-semibold">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="70.5"
                        value={newEntry.weight}
                        onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                        className="mt-2 border-purple-200 focus:border-purple-600 focus:ring-purple-600 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="waist" className="text-gray-800 font-semibold">Waist (cm)</Label>
                        <Input
                          id="waist"
                          type="number"
                          step="0.1"
                          placeholder="80"
                          value={newEntry.waist}
                          onChange={(e) => setNewEntry({ ...newEntry, waist: e.target.value })}
                          className="mt-2 border-purple-200 focus:border-purple-600 focus:ring-purple-600 transition-all"
                        />
                      </div>
                      <div>
                        <Label htmlFor="chest" className="text-gray-800 font-semibold">Chest (cm)</Label>
                        <Input
                          id="chest"
                          type="number"
                          step="0.1"
                          placeholder="95"
                          value={newEntry.chest}
                          onChange={(e) => setNewEntry({ ...newEntry, chest: e.target.value })}
                          className="mt-2 border-purple-200 focus:border-purple-600 focus:ring-purple-600 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-gray-800 font-semibold">Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Feeling great today!"
                        value={newEntry.notes}
                        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                        className="mt-2 border-purple-200 focus:border-purple-600 focus:ring-purple-600 transition-all"
                      />
                    </div>
                    <Button
                      onClick={saveEntry}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50 text-white transition-all duration-300 font-semibold border-0"
                      disabled={!newEntry.weight}
                    >
                      Save Entry
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Stats Summary */}
        {entries.length > 0 && (
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-500/90 via-purple-600/90 to-blue-600/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 cursor-pointer group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                        <Weight className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white text-xl font-bold">Current Weight</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-4xl font-extrabold">{latestEntry?.weight} kg</div>
                    {weightChange !== 0 && (
                      <p className="text-purple-100 mt-2 font-medium">
                        {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg from start
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-blue-500/90 via-blue-600/90 to-purple-600/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 hover:-translate-y-2 cursor-pointer group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white text-xl font-bold">Total Entries</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-4xl font-extrabold">{entries.length}</div>
                    <p className="text-blue-100 mt-2 font-medium">Days tracked</p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden backdrop-blur-xl bg-gradient-to-br from-purple-600/90 via-blue-500/90 to-purple-500/90 border-white/20 border-2 text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-2 cursor-pointer group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-lg">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-white text-xl font-bold">Progress</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-4xl font-extrabold">
                      {weightChange < 0 ? 'Losing' : weightChange > 0 ? 'Gaining' : 'Maintaining'}
                    </div>
                    <p className="text-purple-100 mt-2 font-medium">Overall trend</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Charts */}
        {entries.length > 1 ? (
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <Card className="backdrop-blur-xl bg-white/90 border-2 border-purple-200/50 shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Weight Progress
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-medium">
                    Your weight changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
                      <XAxis dataKey="date" stroke="#9333EA" />
                      <YAxis stroke="#9333EA" />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(255, 255, 255, 0.95)', 
                          border: '2px solid #E9D5FF',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)'
                        }} 
                      />
                      <Legend />
                      <Line type="monotone" dataKey="weight" stroke="url(#colorGradient)" strokeWidth={3} name="Weight (kg)" dot={{ fill: '#9333EA', r: 5 }} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#9333EA" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {entries.some(e => e.waist || e.chest) && (
                <Card className="mt-6 backdrop-blur-xl bg-white/90 border-2 border-purple-200/50 shadow-2xl shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 hover:scale-[1.01]">
                  <CardHeader>
                    <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Body Measurements
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-medium">
                      Track your body composition changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E9D5FF" />
                        <XAxis dataKey="date" stroke="#9333EA" />
                        <YAxis stroke="#9333EA" />
                        <Tooltip 
                          contentStyle={{ 
                            background: 'rgba(255, 255, 255, 0.95)', 
                            border: '2px solid #E9D5FF',
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)'
                          }} 
                        />
                        <Legend />
                        {entries.some(e => e.waist) && (
                          <Line type="monotone" dataKey="waist" stroke="#8B5CF6" strokeWidth={3} name="Waist (cm)" dot={{ fill: '#8B5CF6', r: 5 }} />
                        )}
                        {entries.some(e => e.chest) && (
                          <Line type="monotone" dataKey="chest" stroke="#3B82F6" strokeWidth={3} name="Chest (cm)" dot={{ fill: '#3B82F6', r: 5 }} />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        ) : entries.length === 1 ? (
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 border-2 border-purple-200/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <CardContent className="py-12">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Keep Tracking!
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">
                    Log one more entry to see your progress charts
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 border-2 border-purple-200/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
                <CardContent className="py-12">
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                    <Calendar className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    Start Tracking Your Progress
                  </h3>
                  <p className="text-gray-600 mb-6 font-medium text-lg">
                    Log your first entry to begin visualizing your fitness journey
                  </p>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/50 text-white transition-all duration-300 font-semibold px-8 py-6 text-lg border-0"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add First Entry
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Recent Entries */}
        {entries.length > 0 && (
          <section className="py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-blue-100/20 to-purple-100/30 -z-10"></div>
            
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Recent Entries
              </h2>
              <div className="space-y-4">
                {[...entries].reverse().slice(0, 5).map((entry, index) => (
                  <Card key={index} className="backdrop-blur-xl bg-white/90 border-2 border-purple-200/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-[1.02] hover:border-purple-400/50 cursor-pointer group">
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <div className="flex gap-4 mt-2 text-gray-600 font-medium">
                            <span>Weight: {entry.weight} kg</span>
                            {entry.waist && <span>Waist: {entry.waist} cm</span>}
                            {entry.chest && <span>Chest: {entry.chest} cm</span>}
                          </div>
                          {entry.notes && (
                            <p className="text-gray-500 text-sm mt-2 font-medium">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <AIAssistant />
    </ProtectedRoute>
  );
}