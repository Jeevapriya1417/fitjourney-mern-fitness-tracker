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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-bold text-black mb-4">Progress Tracker</h1>
                <p className="text-xl text-gray-700">
                  Track your fitness journey and visualize your improvements
                </p>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white">
                    <Plus className="h-5 w-5 mr-2" />
                    Log Progress
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="text-black">Log Today's Progress</DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Enter your current measurements and notes
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="date" className="text-black">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight" className="text-black">Weight (kg) *</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        placeholder="70.5"
                        value={newEntry.weight}
                        onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="waist" className="text-black">Waist (cm)</Label>
                        <Input
                          id="waist"
                          type="number"
                          step="0.1"
                          placeholder="80"
                          value={newEntry.waist}
                          onChange={(e) => setNewEntry({ ...newEntry, waist: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="chest" className="text-black">Chest (cm)</Label>
                        <Input
                          id="chest"
                          type="number"
                          step="0.1"
                          placeholder="95"
                          value={newEntry.chest}
                          onChange={(e) => setNewEntry({ ...newEntry, chest: e.target.value })}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-black">Notes</Label>
                      <Input
                        id="notes"
                        placeholder="Feeling great today!"
                        value={newEntry.notes}
                        onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      onClick={saveEntry}
                      className="w-full bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white"
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
                <Card className="bg-[#5F9EA0] border-none text-white">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Weight className="h-8 w-8" />
                      <CardTitle className="text-white">Current Weight</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{latestEntry?.weight} kg</div>
                    {weightChange !== 0 && (
                      <p className="text-gray-100 mt-2">
                        {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg from start
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-[#5F9EA0] border-none text-white">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-8 w-8" />
                      <CardTitle className="text-white">Total Entries</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">{entries.length}</div>
                    <p className="text-gray-100 mt-2">Days tracked</p>
                  </CardContent>
                </Card>

                <Card className="bg-[#5F9EA0] border-none text-white">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-8 w-8" />
                      <CardTitle className="text-white">Progress</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold">
                      {weightChange < 0 ? 'Losing' : weightChange > 0 ? 'Gaining' : 'Maintaining'}
                    </div>
                    <p className="text-gray-100 mt-2">Overall trend</p>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-black text-2xl">Weight Progress</CardTitle>
                  <CardDescription className="text-gray-600">
                    Your weight changes over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="weight" stroke="#5F9EA0" strokeWidth={2} name="Weight (kg)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {entries.some(e => e.waist || e.chest) && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-black text-2xl">Body Measurements</CardTitle>
                    <CardDescription className="text-gray-600">
                      Track your body composition changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {entries.some(e => e.waist) && (
                          <Line type="monotone" dataKey="waist" stroke="#82ca9d" strokeWidth={2} name="Waist (cm)" />
                        )}
                        {entries.some(e => e.chest) && (
                          <Line type="monotone" dataKey="chest" stroke="#8884d8" strokeWidth={2} name="Chest (cm)" />
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
              <Card className="bg-gray-50">
                <CardContent className="py-12">
                  <TrendingUp className="h-16 w-16 text-[#5F9EA0] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-2">Keep Tracking!</h3>
                  <p className="text-gray-600">
                    Log one more entry to see your progress charts
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : (
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
              <Card className="bg-gray-50">
                <CardContent className="py-12">
                  <Calendar className="h-16 w-16 text-[#5F9EA0] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-black mb-2">Start Tracking Your Progress</h3>
                  <p className="text-gray-600 mb-6">
                    Log your first entry to begin visualizing your fitness journey
                  </p>
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#5F9EA0] hover:bg-[#4A8A8D] text-white"
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
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-6">Recent Entries</h2>
              <div className="space-y-4">
                {[...entries].reverse().slice(0, 5).map((entry, index) => (
                  <Card key={index}>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-black">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <div className="flex gap-4 mt-2 text-gray-600">
                            <span>Weight: {entry.weight} kg</span>
                            {entry.waist && <span>Waist: {entry.waist} cm</span>}
                            {entry.chest && <span>Chest: {entry.chest} cm</span>}
                          </div>
                          {entry.notes && (
                            <p className="text-gray-500 text-sm mt-2">{entry.notes}</p>
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
