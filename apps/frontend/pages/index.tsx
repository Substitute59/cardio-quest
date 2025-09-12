import { useState, useEffect } from 'react';

export default function Home() {
  const [duration, setDuration] = useState('');
  const [sport, setSport] = useState('');
  const [result, setResult] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration: Number(duration), sport }),
    });
    const data = await res.json();
    setResult(data);
    fetchActivities();
  };

  const fetchActivities = async () => {
    const res = await fetch('http://localhost:3001/activities');
    const data = await res.json();
    setActivities(data);
  };

  useEffect(() => {
    fetchActivities();
  }, []);


  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Ajouter une activité</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="number"
          placeholder="Durée (min)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Sport (run, bike, swim)"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Envoyer</button>
      </form>
      {result && <pre className="mt-4">{JSON.stringify(result, null, 2)}</pre>}
      <h2 className="text-xl font-bold mt-8 mb-2">Activités enregistrées</h2>
      <ul>
        {activities.map((activity, idx) => (
          <li key={idx} className="mb-1">
            {activity.sport} - {activity.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}
